import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// ----------------------------------------------------------------------------
// Security headers — applied to every response. Defense-in-depth against
// clickjacking, MIME sniffing, mixed content, referrer leakage, and a
// hardened-but-compatible CSP (frame-ancestors is the only CSP directive that
// can't be set via <meta>, so it lives here).
// ----------------------------------------------------------------------------
const SECURITY_HEADERS: Record<string, string> = {
  "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy":
    "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), interest-cohort=()",
  "cross-origin-opener-policy": "same-origin",
  "cross-origin-resource-policy": "same-site",
  "x-dns-prefetch-control": "off",
  "x-permitted-cross-domain-policies": "none",
  // Tightened CSP. 'unsafe-inline' kept for styles (Tailwind/JIT) and scripts
  // (TanStack hydration + JSON-LD). Tighten further with nonces if needed.
  "content-security-policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "script-src 'self' 'unsafe-inline'",
    "connect-src 'self' https:",
    "media-src 'self' data: blob:",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join("; "),
};

function applySecurityHeaders(response: Response): Response {
  // Some upstream responses use immutable headers; clone safely.
  const headers = new Headers(response.headers);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(k)) headers.set(k, v);
  }
  // Remove fingerprinting headers if present.
  headers.delete("server");
  headers.delete("x-powered-by");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Block obviously hostile requests at the edge: oversized bodies, malformed
// hosts, classic injection probe paths. Cheap pre-filter before SSR runs.
const BLOCKED_PATH_PATTERNS = [
  /\.(php|asp|aspx|jsp|cgi|env|git|sql|bak|old|swp|DS_Store)(\?|$)/i,
  /\/wp-(admin|login|content|includes)/i,
  /\/(phpmyadmin|xmlrpc|wlwmanifest|adminer)/i,
  /\/\.(git|env|aws|ssh|htaccess|htpasswd)/i,
];
const MAX_BODY_BYTES = 1_000_000; // 1 MB ceiling for any POST/PUT

function rejectIfHostile(request: Request): Response | null {
  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return new Response("Bad Request", { status: 400 });
  }
  // Path probes
  for (const re of BLOCKED_PATH_PATTERNS) {
    if (re.test(url.pathname)) {
      return new Response("Not Found", { status: 404 });
    }
  }
  // Oversized body
  const len = request.headers.get("content-length");
  if (len && Number(len) > MAX_BODY_BYTES) {
    return new Response("Payload Too Large", { status: 413 });
  }
  return null;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const blocked = rejectIfHostile(request);
    if (blocked) return applySecurityHeaders(blocked);
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return applySecurityHeaders(normalized);
    } catch (error) {
      console.error(error);
      return applySecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
