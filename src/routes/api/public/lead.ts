import { createFileRoute } from "@tanstack/react-router";
import process from "node:process";
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

// Email the lead via SMTP (nodemailer). Configured entirely by env vars so any
// provider works (Hostinger mailbox, Gmail App Password, etc.). If SMTP isn't
// configured, this no-ops — the lead is still captured in the server log.
async function sendLeadEmail(lead: Lead): Promise<void> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEAD_NOTIFY_EMAIL || user;
  if (!host || !user || !pass || !to) {
    console.warn("[lead] SMTP not configured — email skipped (lead logged above).");
    return;
  }
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;
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

  const text = [
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

  await transporter.sendMail({
    from,
    to,
    replyTo: lead.email,
    subject: `New lead: ${lead.name}${lead.context ? ` — ${lead.context}` : ""}`,
    text,
  });
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