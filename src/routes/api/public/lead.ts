import { createFileRoute } from "@tanstack/react-router";

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  pageUrl?: unknown;
  pageTitle?: unknown;
  context?: unknown;
};

function isNonEmptyString(v: unknown, max = 2000): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

export const Route = createFileRoute("/api/public/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: LeadPayload;
        try {
          body = (await request.json()) as LeadPayload;
        } catch {
          return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const name = isNonEmptyString(body.name, 120) ? (body.name as string).trim() : null;
        const email = isNonEmptyString(body.email, 240) ? (body.email as string).trim() : null;
        const phone = isNonEmptyString(body.phone, 40) ? (body.phone as string).trim() : null;
        const message = isNonEmptyString(body.message, 2000)
          ? (body.message as string).trim()
          : null;

        const emailOk = !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!name || !emailOk || !phone || !message) {
          return new Response(
            JSON.stringify({ ok: false, error: "Please fill in all fields with valid details." }),
            { status: 400, headers: { "content-type": "application/json" } },
          );
        }

        // Log the lead. Enable Lovable Cloud + Resend to persist and email automatically.
        console.log("[lead]", {
          ts: new Date().toISOString(),
          name,
          email,
          phone,
          message,
          pageUrl: typeof body.pageUrl === "string" ? body.pageUrl : null,
          pageTitle: typeof body.pageTitle === "string" ? body.pageTitle : null,
          context: typeof body.context === "string" ? body.context : null,
        });

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});