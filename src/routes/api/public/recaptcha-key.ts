import { createFileRoute } from "@tanstack/react-router";
import process from "node:process";

// Serves the PUBLIC reCAPTCHA v3 site key to the browser at runtime, so the key
// is env-driven (RECAPTCHA_SITE_KEY) and needs no rebuild to change or disable.
// The secret key never leaves the server.
export const Route = createFileRoute("/api/public/recaptcha-key")({
  server: {
    handlers: {
      GET: async () => {
        const siteKey = process.env.RECAPTCHA_SITE_KEY ?? "";
        return new Response(JSON.stringify({ siteKey }), {
          status: 200,
          headers: {
            "content-type": "application/json",
            "cache-control": "public, max-age=300",
          },
        });
      },
    },
  },
});
