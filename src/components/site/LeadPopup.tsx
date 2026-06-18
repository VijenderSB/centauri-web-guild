import { useEffect, useMemo, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import {
  X,
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  Flame,
  BadgeCheck,
} from "lucide-react";
import { findKeyword } from "@/content/keywords";
import { findCity } from "@/content/locations";
import { findHub, findChild } from "@/content/services";

type PageContext = {
  eyebrow: string;
  title: string;
  subtitle: string;
  service?: string;
  city?: string;
  contextKey: string;
};

const STORAGE_KEY = "wc_lead_popup_v1";

function detectContext(pathname: string): PageContext {
  const parts = pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);

  // /services/:hub or /services/:hub/:child
  if (parts[0] === "services" && parts[1]) {
    const hub = findHub(parts[1]);
    const found = parts[2] ? findChild(parts[1], parts[2]) : undefined;
    if (found && hub) {
      const child = found.child;
      return {
        eyebrow: `${hub.title}`,
        title: `Need help with ${child.title.toLowerCase()}?`,
        subtitle: `A senior ${hub.title.toLowerCase()} engineer can review your situation in the next few minutes — free, no obligation.`,
        service: child.title,
        contextKey: `service:${parts[1]}/${parts[2]}`,
      };
    }
    if (hub) {
      return {
        eyebrow: hub.title,
        title: `Talk to a ${hub.title.toLowerCase()} expert`,
        subtitle: `Get a free 30-minute consult. We'll diagnose the issue and outline a fix — no sales pitch.`,
        service: hub.title,
        contextKey: `service:${parts[1]}`,
      };
    }
  }

  // /locations/:city
  if (parts[0] === "locations" && parts[1]) {
    const city = findCity(parts[1]);
    if (city) {
      return {
        eyebrow: `${city.city}, ${city.regionCode}`,
        title: `Local web & tech support in ${city.city}`,
        subtitle: `Trusted by ${city.industries.slice(0, 2).join(" & ")} teams across ${city.metro ?? city.city}. Tell us what's broken — we'll respond within the hour.`,
        city: `${city.city}, ${city.regionCode}`,
        contextKey: `city:${parts[1]}`,
      };
    }
  }

  // /:keyword or /:keyword/:city
  if (parts.length >= 1) {
    const kw = findKeyword(parts[0]);
    if (kw) {
      const city = parts[1] ? findCity(parts[1]) : undefined;
      if (city) {
        return {
          eyebrow: `${kw.title} — ${city.city}, ${city.regionCode}`,
          title: `Need ${kw.label} in ${city.city} right now?`,
          subtitle: `${kw.responseSLA ?? "A senior engineer can be on a call within 30 minutes."} Share a few details and we'll respond fast.`,
          service: kw.title,
          city: `${city.city}, ${city.regionCode}`,
          contextKey: `kw:${parts[0]}/${parts[1]}`,
        };
      }
      return {
        eyebrow: kw.category,
        title: `Need ${kw.label}?`,
        subtitle: `${kw.short} Tell us your situation — a senior engineer will reply with next steps.`,
        service: kw.title,
        contextKey: `kw:${parts[0]}`,
      };
    }
  }

  // Fallbacks for known static pages
  if (parts[0] === "pricing") {
    return {
      eyebrow: "Pricing",
      title: "Want a tailored quote?",
      subtitle: "Tell us about your project and we'll send a custom proposal within one business day.",
      contextKey: "pricing",
    };
  }
  if (parts[0] === "contact") {
    return {
      eyebrow: "Talk to us",
      title: "Prefer a quick reply by email?",
      subtitle: "Drop your details and a senior engineer will get back to you shortly.",
      contextKey: "contact",
    };
  }

  // Home / default
  return {
    eyebrow: "WebCentauri",
    title: "Website down, slow, or hacked?",
    subtitle: "Get a free 30-minute consult with a senior engineer. We cover emergencies, builds, recovery, email, Shopify, WordPress, and more.",
    contextKey: "home",
  };
}

export function LeadPopup() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ctx = useMemo(() => detectContext(pathname), [pathname]);

  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  // Stage 1: trigger after 5s. Stage 2 (FOMO): trigger 30s after stage 1 is dismissed without submitting.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let state: string | null = null;
    try {
      state = sessionStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    if (state === "submitted" || state === "stage2-shown") return;

    const delay = state === "stage1-dismissed" ? 30000 : 5000;
    const nextStage: 1 | 2 = state === "stage1-dismissed" ? 2 : 1;

    const t = window.setTimeout(() => {
      setStage(nextStage);
      setOpen(true);
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          nextStage === 2 ? "stage2-shown" : "stage1-shown",
        );
      } catch {
        /* ignore */
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, []);

  function dismiss() {
    setOpen(false);
    if (submitted) return;
    try {
      const state = sessionStorage.getItem(STORAGE_KEY);
      if (state === "stage1-shown") {
        sessionStorage.setItem(STORAGE_KEY, "stage1-dismissed");
        // Schedule the FOMO follow-up popup in 30s
        window.setTimeout(() => {
          try {
            if (sessionStorage.getItem(STORAGE_KEY) !== "stage1-dismissed") return;
            sessionStorage.setItem(STORAGE_KEY, "stage2-shown");
          } catch {
            /* ignore */
          }
          setStage(2);
          setOpen(true);
        }, 30000);
      } else if (state === "stage2-shown") {
        sessionStorage.setItem(STORAGE_KEY, "stage2-dismissed");
      }
    } catch {
      /* ignore */
    }
  }

  // Lock scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const placeholderMsg = ctx.city
    ? `e.g. "Our Shopify site in ${ctx.city.split(",")[0]} is down since this morning…"`
    : ctx.service
      ? `e.g. "We need ${ctx.service.toLowerCase()} — here's what's happening…"`
      : `Briefly describe the issue or what you're looking for.`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || form.name.length > 120) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return setError("Please enter a valid email address.");
    if (form.phone.trim().replace(/\D/g, "").length < 7)
      return setError("Please enter a valid mobile number.");
    if (!form.message.trim()) return setError("Please describe your problem briefly.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/public/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          pageTitle: typeof document !== "undefined" ? document.title : "",
          context: ctx.contextKey,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "submitted");
      } catch {
        /* ignore */
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
      onClick={dismiss}
    >
      <div
        className="relative w-full sm:max-w-lg bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-7 w-7 text-primary" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-foreground">Thanks, {form.name.split(" ")[0]}!</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              You'll receive a support email from one of our experts shortly with next steps for your
              {ctx.service ? ` ${ctx.service.toLowerCase()}` : ""} request
              {ctx.city ? ` in ${ctx.city.split(",")[0]}` : ""}.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Your details are kept confidential and never shared.
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="mt-6 inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {stage === 2 ? (
              <div
                className="px-6 pt-6 pb-5 text-white"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(0 72% 45%) 0%, hsl(14 80% 48%) 55%, hsl(28 90% 52%) 100%)",
                }}
              >
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide animate-pulse">
                  <Flame className="h-3 w-3" /> Last chance — don't lose another hour
                </div>
                <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/25 backdrop-blur px-3 py-1.5 border border-white/30">
                  <BadgeCheck className="h-5 w-5 text-white" />
                  <span className="text-sm font-extrabold tracking-wide">70% DISCOUNT</span>
                  <span className="text-[11px] font-medium opacity-90">on first rescue fix</span>
                </div>
                <h2
                  id="lead-popup-title"
                  className="mt-3 text-xl sm:text-2xl font-bold leading-tight"
                >
                  Wait — every minute your{" "}
                  {ctx.service ? ctx.service.toLowerCase() : "website"} issue stays unresolved
                  costs you real money{ctx.city ? ` in ${ctx.city.split(",")[0]}` : ""}.
                </h2>
                <p className="mt-2 text-sm text-white/95 leading-relaxed">
                  We hear you — you've seen too many agencies overpromise and disappear. So here's
                  our word: share your details now and a senior engineer will reach out personally.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                  <div className="rounded-lg bg-white/15 backdrop-blur p-2 flex flex-col items-center text-center">
                    <Clock className="h-4 w-4 mb-1" />
                    <span className="font-bold">60-min</span>
                    <span className="opacity-90">resolution guarantee*</span>
                  </div>
                  <div className="rounded-lg bg-white/15 backdrop-blur p-2 flex flex-col items-center text-center">
                    <BadgeCheck className="h-4 w-4 mb-1" />
                    <span className="font-bold">No-fix,</span>
                    <span className="opacity-90">no-fee promise</span>
                  </div>
                  <div className="rounded-lg bg-white/15 backdrop-blur p-2 flex flex-col items-center text-center">
                    <ShieldCheck className="h-4 w-4 mb-1" />
                    <span className="font-bold">100%</span>
                    <span className="opacity-90">confidential</span>
                  </div>
                </div>
                <p className="mt-3 text-[10px] text-white/80 leading-snug">
                  *We commit to a senior engineer on a call within 60 minutes and a clear
                  resolution path the same hour for in-scope emergencies.
                </p>
              </div>
            ) : (
              <div
              className="px-6 pt-6 pb-5 text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
                {ctx.city ? <MapPin className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
                {ctx.eyebrow}
              </div>
              <h2 id="lead-popup-title" className="mt-3 text-xl sm:text-2xl font-bold leading-tight">
                {ctx.title}
              </h2>
              <p className="mt-2 text-sm text-white/90 leading-relaxed">{ctx.subtitle}</p>
            </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="lp-name" className="text-xs font-semibold text-foreground">
                    Your name
                  </label>
                  <input
                    id="lp-name"
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={120}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label htmlFor="lp-phone" className="text-xs font-semibold text-foreground">
                    Mobile number
                  </label>
                  <input
                    id="lp-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    maxLength={40}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="+1 555 123 4567"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lp-email" className="text-xs font-semibold text-foreground">
                  Email address
                </label>
                <input
                  id="lp-email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={240}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="jane@company.com"
                />
              </div>
              <div>
                <label htmlFor="lp-message" className="text-xs font-semibold text-foreground">
                  Describe your problem
                </label>
                <textarea
                  id="lp-message"
                  required
                  rows={3}
                  maxLength={2000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  placeholder={placeholderMsg}
                />
              </div>

              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm disabled:opacity-70"
                style={{ background: "var(--gradient-primary)" }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />{" "}
                    {stage === 2 ? "Claim my 60-min resolution" : "Get expert help"}
                  </>
                )}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3 w-3 text-primary" />
                Your details are kept strictly confidential and never shared with anyone.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default LeadPopup;