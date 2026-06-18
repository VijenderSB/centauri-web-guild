import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero, Section } from "@/components/site/PageShell";
import { Mail, Phone, MessageSquare, Siren, Calendar, CheckCircle2, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Book Consultation or Get Support | WebCentauri" },
      { name: "description", content: "Book a free consultation, request a website audit, or get 24/7 emergency support for downtime, hacks, or critical bugs." },
      { property: "og:title", content: "Contact WebCentauri" },
      { property: "og:description", content: "Book a consultation, request an audit, or get emergency support." },
      { property: "og:url", content: "https://www.webcentauri.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://www.webcentauri.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formStartedAt] = useState(() => Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const business = String(fd.get("business") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const websiteUrl = String(fd.get("websiteUrl") || "").trim();
    const priority = String(fd.get("priority") || "standard");
    const details = String(fd.get("message") || "").trim();

    if (!name) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email address.");
    if (phone.replace(/\D/g, "").length < 7) return setError("Please enter a valid phone number.");
    if (!details) return setError("Please tell us how we can help.");

    const message = [
      details,
      "",
      business ? `Business: ${business}` : "",
      websiteUrl ? `Website: ${websiteUrl}` : "",
      `Priority: ${priority}`,
    ]
      .filter(Boolean)
      .join("\n");

    setSubmitting(true);
    try {
      const res = await fetch("/api/public/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          website: "", // honeypot — real users leave it empty
          formStartedAt,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          pageTitle: typeof document !== "undefined" ? document.title : "",
          context: "contact-page",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell>
      <PageHero eyebrow="Contact" title="Let's talk about your project." subtitle="Free 30-minute consultation. Emergency support available 24/7." />
      <Section>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-8 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                <h2 className="mt-4 text-2xl font-bold">Thanks — we'll be in touch.</h2>
                <p className="mt-2 text-muted-foreground">A senior team member will respond within 1 business hour.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <h2 className="text-2xl font-bold">Tell us about your project</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Your Name" name="name" required />
                  <Field label="Business Name" name="business" />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" required />
                  <Field label="Website URL" name="websiteUrl" type="url" className="sm:col-span-2" />
                </div>
                <div>
                  <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                  <select id="priority" name="priority" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue="standard">
                    <option value="standard">Standard — general inquiry</option>
                    <option value="high">High — start within 2 weeks</option>
                    <option value="urgent">Urgent — site down / emergency</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium">How can we help?</label>
                  <textarea id="message" name="message" required rows={5} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Describe your project, issue, or goals…" />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <button type="submit" disabled={submitting} className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60" style={{ background: "var(--gradient-primary)" }}>
                  {submitting ? "Sending…" : "Send Message"}
                </button>
                <p className="text-xs text-muted-foreground">We respond within 1 business hour. Emergency requests are routed 24/7.</p>
              </form>
            )}
          </div>
          <div className="space-y-4">
            {[
              [Calendar, "Book Consultation", "Free 30-minute strategy call.", "Schedule"],
              [Siren, "Emergency Support", "Site down, hacked, or broken?", "Request now"],
              [Mail, "Email", "support@webcentauri.com"],
              [Phone, "Phone", "+1 (888) 555-0123"],
              [MessageSquare, "Live Chat / WhatsApp", "Mon–Fri, 9am–7pm ET"],
            ].map(([Icon, t, d, cta]) => (
              <div key={t as string} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 shrink-0">
                    {/* @ts-ignore */}
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{t as string}</div>
                    <div className="text-sm text-muted-foreground">{d as string}</div>
                    {cta && <div className="mt-2 text-sm text-primary font-medium">{cta as string} →</div>}
                  </div>
                </div>
              </div>
            ))}
            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Development Centres</div>
                  <div className="text-sm text-muted-foreground mt-1">Centre 1: A 78, Sector 4, Noida 201301</div>
                  <div className="text-sm text-muted-foreground">Centre 2: Suite 2303, Sector 110, Noida 201304</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}

function Field({ label, name, type = "text", required, className = "" }: { label: string; name: string; type?: string; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm font-medium">{label}{required && <span className="text-destructive"> *</span>}</label>
      <input id={name} name={name} type={type} required={required} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}