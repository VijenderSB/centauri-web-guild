import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  pageUrl?: unknown;
  pageTitle?: unknown;
  context?: unknown;
  website?: unknown; // honeypot — must stay empty
  formStartedAt?: unknown; // client timestamp ms
  recaptchaToken?: unknown; // reCAPTCHA v3 token
};

function isNonEmptyString(v: unknown, max = 2000): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

// Strip control chars and obvious HTML / script injection attempts.
function sanitize(s: string): string {
  return s
    // Remove NULs and other control chars except \n \r \t
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    // Neutralize tags
    .replace(/<[^>]*>/g, "")
    .trim();
}

// Lightweight spam classifier: link flood, common spam tokens, CJK/Cyrillic
// link spam, repeated chars. Conservative — only blocks high-confidence spam.
const SPAM_PATTERNS = [
  /\b(viagra|cialis|casino|porn|escort|xxx|crypto[\s-]?giveaway|forex[\s-]?signals)\b/i,
  /\b(seo[\s-]?services?|backlinks?|guest[\s-]?post|buy[\s-]?followers)\b/i,
  /https?:\/\/[^\s]+(\s|.)*https?:\/\/[^\s]+(\s|.)*https?:\/\/[^\s]+/i, // 3+ URLs
  /[\u0400-\u04FF]{20,}/, // long Cyrillic run
  /(.)\1{15,}/, // 15+ repeated chars
];

function looksLikeSpam(text: string): boolean {
  return SPAM_PATTERNS.some((re) => re.test(text));
}

// In-memory token-bucket rate limiter (per IP). On Cloudflare Workers each
// isolate keeps its own map — good for casual abuse mitigation. For strict
// global limits, move to Durable Objects or a KV-backed counter.
const RATE_LIMIT_MAX = 5; // requests
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes
const rateBucket = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const entry = rateBucket.get(ip);
  if (!entry || entry.resetAt < now) {
    rateBucket.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true };
}

function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

type Lead = {
  ts: string;
  ip: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  pageUrl: string | null;
  pageTitle: string | null;
  context: string | null;
};

function leadSubject(lead: Lead): string {
  return `New lead: ${lead.name}${lead.context ? ` — ${lead.context}` : ""}`;
}

function leadBody(lead: Lead): string {
  return [
    `Name:    ${lead.name}`,
    `Email:   ${lead.email}`,
    `Phone:   ${lead.phone}`,
    `Context: ${lead.context ?? "-"}`,
    `Page:    ${lead.pageTitle ?? "-"}${lead.pageUrl ? ` (${lead.pageUrl})` : ""}`,
    `IP:      ${lead.ip}`,
    `Time:    ${lead.ts}`,
    ``,
    `Message:`,
    lead.message,
  ].join("\n");
}

// RFC 2047 encoded-word for header values that contain non-ASCII characters.
function encodeHeader(s: string): string {
  return /^[\x00-\x7F]*$/.test(s)
    ? s
    : `=?UTF-8?B?${Buffer.from(s, "utf-8").toString("base64")}?=`;
}

// Send via the Gmail API over HTTPS (port 443). Works on hosts that block
// outbound SMTP (e.g. Hostinger/LiteSpeed), and Google trusts its own API.
// Needs a one-time OAuth2 setup: GMAIL_CLIENT_ID / GMAIL_CLIENT_SECRET /
// GMAIL_REFRESH_TOKEN (scope gmail.send) + GMAIL_SENDER (the gmail address).
async function sendViaGmailApi(lead: Lead): Promise<void> {
  const clientId = process.env.GMAIL_CLIENT_ID!;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET!;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN!;
  const sender = process.env.GMAIL_SENDER || process.env.SMTP_USER || "";
  const to = process.env.LEAD_NOTIFY_EMAIL || sender;

  // 1) Exchange the refresh token for a short-lived access token.
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }).toString(),
  });
  const tok = (await tokenRes.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };
  if (!tok.access_token) {
    throw new Error(`Gmail OAuth failed: ${tok.error ?? ""} ${tok.error_description ?? ""}`.trim());
  }

  // 2) Build the RFC822 message and base64url-encode it.
  const rfc822 = [
    `From: "WebCentauri Leads" <${sender}>`,
    `To: ${to}`,
    `Reply-To: ${lead.email}`,
    `Subject: ${encodeHeader(leadSubject(lead))}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    leadBody(lead),
  ].join("\r\n");
  const raw = Buffer.from(rfc822, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // 3) Send via the Gmail API.
  const sendRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${tok.access_token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ raw }),
    },
  );
  if (!sendRes.ok) {
    throw new Error(`Gmail API send failed (${sendRes.status}): ${await sendRes.text()}`);
  }
}

// SMTP fallback (nodemailer). Kept for hosts that don't block outbound SMTP.
async function sendViaSmtp(lead: Lead): Promise<void> {
  const host = process.env.SMTP_HOST!;
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const to = process.env.LEAD_NOTIFY_EMAIL || user;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  const from = process.env.MAIL_FROM || `WebCentauri Leads <${user}>`;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  await transporter.sendMail({
    from,
    to,
    replyTo: lead.email,
    subject: leadSubject(lead),
    text: leadBody(lead),
  });
}

// Deliver the lead. Prefers the Gmail HTTP API (works through SMTP-port blocks),
// falls back to SMTP, and no-ops if neither is configured (lead still logged).
async function sendLeadEmail(lead: Lead): Promise<void> {
  if (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REFRESH_TOKEN) {
    await sendViaGmailApi(lead);
    return;
  }
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    await sendViaSmtp(lead);
    return;
  }
  console.warn("[lead] email not configured — skipped (lead logged above).");
}

// Verify a reCAPTCHA v3 token with Google. Returns true if it passes OR if
// reCAPTCHA isn't configured (RECAPTCHA_SECRET_KEY unset). Fails OPEN on a
// network/Google error so an outage never blocks real leads; fails CLOSED on an
// explicit low score or invalid token.
async function verifyRecaptcha(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // not configured — skip
  if (typeof token !== "string" || token.length === 0) return false;
  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE) || 0.5;
  try {
    const params = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") params.set("remoteip", ip);
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = (await res.json()) as {
      success?: boolean;
      score?: number;
      hostname?: string;
      "error-codes"?: string[];
    };
    if (!data.success) {
      console.warn("[lead] recaptcha verification failed:", JSON.stringify(data));
      return false;
    }
    if (typeof data.score === "number" && data.score < minScore) {
      console.warn(`[lead] recaptcha low score: ${data.score} (min ${minScore}) host=${data.hostname ?? "?"}`);
      return false;
    }
    return true;
  } catch {
    return true; // fail open on infrastructure error
  }
}

export const Route = createFileRoute("/api/public/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // ---- 1. Same-origin / CSRF-lite check (block cross-site form posts)
        const origin = request.headers.get("origin");
        const host = request.headers.get("host");
        if (origin && host) {
          try {
            const originHost = new URL(origin).host;
            if (originHost !== host) {
              return new Response(
                JSON.stringify({ ok: false, error: "Forbidden" }),
                { status: 403, headers: { "content-type": "application/json" } },
              );
            }
          } catch {
            return new Response(JSON.stringify({ ok: false, error: "Bad origin" }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
          }
        }

        // ---- 2. Content-type guard
        const ct = request.headers.get("content-type") ?? "";
        if (!ct.includes("application/json")) {
          return new Response(JSON.stringify({ ok: false, error: "Unsupported media type" }), {
            status: 415,
            headers: { "content-type": "application/json" },
          });
        }

        // ---- 3. Body size guard (also enforced at server.ts edge)
        const len = request.headers.get("content-length");
        if (len && Number(len) > 20_000) {
          return new Response(JSON.stringify({ ok: false, error: "Payload too large" }), {
            status: 413,
            headers: { "content-type": "application/json" },
          });
        }

        // ---- 4. Rate limit per IP
        const ip = clientIp(request);
        const rl = rateLimit(ip);
        if (!rl.ok) {
          return new Response(
            JSON.stringify({ ok: false, error: "Too many requests. Please try again later." }),
            {
              status: 429,
              headers: {
                "content-type": "application/json",
                "retry-after": String(rl.retryAfter),
              },
            },
          );
        }

        let body: LeadPayload;
        try {
          body = (await request.json()) as LeadPayload;
        } catch {
          return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        // ---- 5. Honeypot — silent reject for bots that fill hidden field
        if (typeof body.website === "string" && body.website.trim().length > 0) {
          // Pretend success so bots don't retry / probe.
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        }

        // ---- 6. Time-to-submit — humans take >2s to fill the form
        if (typeof body.formStartedAt === "number") {
          const elapsed = Date.now() - body.formStartedAt;
          if (elapsed < 2000) {
            return new Response(JSON.stringify({ ok: true }), {
              status: 200,
              headers: { "content-type": "application/json" },
            });
          }
        }

        const name = isNonEmptyString(body.name, 120) ? sanitize(body.name as string) : null;
        const email = isNonEmptyString(body.email, 240) ? sanitize(body.email as string) : null;
        const phone = isNonEmptyString(body.phone, 40) ? sanitize(body.phone as string) : null;
        const message = isNonEmptyString(body.message, 2000)
          ? sanitize(body.message as string)
          : null;

        const emailOk = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const phoneOk = !!phone && phone.replace(/\D/g, "").length >= 7;

        if (!name || !emailOk || !phoneOk || !message) {
          return new Response(
            JSON.stringify({ ok: false, error: "Please fill in all fields with valid details." }),
            { status: 400, headers: { "content-type": "application/json" } },
          );
        }

        // ---- 7. Spam classifier
        const combined = `${name} ${email} ${message}`;
        if (looksLikeSpam(combined)) {
          // Silent drop — pretend success.
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "content-type": "application/json" },
          });
        }

        // ---- 8. reCAPTCHA v3 (skipped if RECAPTCHA_SECRET_KEY is unset)
        const captchaOk = await verifyRecaptcha(body.recaptchaToken, ip);
        if (!captchaOk) {
          return new Response(
            JSON.stringify({ ok: false, error: "Verification failed. Please refresh and try again." }),
            { status: 400, headers: { "content-type": "application/json" } },
          );
        }

        const lead: Lead = {
          ts: new Date().toISOString(),
          ip,
          name,
          email: email as string,
          phone: phone as string,
          message,
          pageUrl: typeof body.pageUrl === "string" ? body.pageUrl : null,
          pageTitle: typeof body.pageTitle === "string" ? body.pageTitle : null,
          context: typeof body.context === "string" ? body.context : null,
        };
        // Audit log — recoverable even if email delivery hiccups.
        console.log("[lead]", lead);
        // Deliver by email. Never fail the visitor's submission on a mail error;
        // the lead is already in the log above and can be recovered.
        try {
          await sendLeadEmail(lead);
        } catch (err) {
          console.error("[lead] email delivery failed:", err);
        }

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            "content-type": "application/json",
            "cache-control": "no-store",
            "x-content-type-options": "nosniff",
          },
        });
      },
    },
  },
});