// Client-side Google reCAPTCHA v3 integration.
//
// The PUBLIC site key is fetched at runtime from /api/public/recaptcha-key
// (sourced from the RECAPTCHA_SITE_KEY env var on the server), so reCAPTCHA can
// be enabled/disabled purely via env — no rebuild. If no key is configured,
// every call no-ops and forms submit normally (the server then skips checking).

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let siteKeyPromise: Promise<string> | null = null;
let scriptPromise: Promise<void> | null = null;

function fetchSiteKey(): Promise<string> {
  if (!siteKeyPromise) {
    siteKeyPromise = fetch("/api/public/recaptcha-key")
      .then((r) => (r.ok ? r.json() : { siteKey: "" }))
      .then((d: { siteKey?: unknown }) => (typeof d.siteKey === "string" ? d.siteKey : ""))
      .catch(() => "");
  }
  return siteKeyPromise;
}

function loadScript(siteKey: string): Promise<void> {
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

// Returns a v3 token for the given action, or null if reCAPTCHA isn't configured
// or fails to load. The server treats a missing token as "not configured" when
// no secret is set, and as a failure when a secret IS set.
export async function getRecaptchaToken(action: string): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const siteKey = await fetchSiteKey();
    if (!siteKey) return null;
    await loadScript(siteKey);
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha?.execute) return null;
    return await new Promise<string | null>((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(siteKey, { action }).then(
          (token) => resolve(token),
          () => resolve(null),
        );
      });
    });
  } catch {
    return null;
  }
}
