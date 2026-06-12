import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Website, SEO & Dev Teams (USD) | WebCentauri" },
      { name: "description", content: "Transparent USD pricing for website development, maintenance, SEO retainers, and dedicated developers. No hidden fees." },
      { property: "og:title", content: "Pricing — WebCentauri" },
      { property: "og:description", content: "Predictable USD pricing for projects, retainers, and teams." },
      { property: "og:url", content: "https://centauri-web-guild.lovable.app/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://centauri-web-guild.lovable.app/pricing" }],
  }),
  component: PricingPage,
});

function Tier({ name, price, per, features, featured }: { name: string; price: string; per?: string; features: string[]; featured?: boolean }) {
  return (
    <div className={`p-6 rounded-2xl border ${featured ? "border-primary" : "border-border"} bg-card flex flex-col`} style={featured ? { boxShadow: "var(--shadow-elegant)" } : { boxShadow: "var(--shadow-card)" }}>
      {featured && <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Most Popular</div>}
      <div className="text-lg font-semibold">{name}</div>
      <div className="mt-3 flex items-end gap-1">
        <span className="text-4xl font-bold">{price}</span>
        {per && <span className="text-sm text-muted-foreground mb-1">{per}</span>}
      </div>
      <ul className="mt-5 space-y-2 text-sm flex-1">
        {features.map((f) => <li key={f} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{f}</li>)}
      </ul>
      <Link to="/contact" className={`mt-6 text-center py-2.5 rounded-md text-sm font-semibold ${featured ? "text-primary-foreground" : "bg-secondary hover:bg-secondary/80"}`} style={featured ? { background: "var(--gradient-primary)" } : {}}>
        Get Started
      </Link>
    </div>
  );
}

function PricingPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Pricing" title="Transparent pricing. Real numbers. No surprises." subtitle="All prices in USD. Custom enterprise quotes available." />

      <Section>
        <SectionHeading eyebrow="Website Development" title="One-time project pricing" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Tier name="Business Website" price="$1,500+" features={["5–10 pages","Mobile responsive","Basic SEO","Contact forms","CMS"]} />
          <Tier name="Corporate Website" price="$3,500+" features={["10–25 pages","Custom design","Advanced SEO","Integrations","Analytics"]} featured />
          <Tier name="Custom Development" price="$7,500+" features={["Custom features","API integrations","Custom CMS","Performance tuning","Advanced security"]} />
          <Tier name="Enterprise Solutions" price="Custom" features={["Headless / custom","SLA-backed","Dedicated team","Compliance ready","Long-term roadmap"]} />
        </div>
      </Section>

      <Section bg="muted">
        <SectionHeading eyebrow="Care Plans" title="Monthly website maintenance" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Tier name="Starter" price="$99" per="/mo" features={["Daily backups","Security updates","Uptime monitoring","Email support"]} />
          <Tier name="Growth" price="$249" per="/mo" features={["Everything in Starter","2 hrs dev/month","Speed optimization","Priority support"]} featured />
          <Tier name="Business" price="$499" per="/mo" features={["Everything in Growth","6 hrs dev/month","Monthly reports","Same-day response"]} />
          <Tier name="Enterprise" price="Custom" features={["Dedicated team","SLA-backed","Custom integrations","24/7 support"]} />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="SEO Plans" title="Monthly SEO retainers" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Tier name="Local SEO" price="$399" per="/mo" features={["Google Business","Local citations","On-page SEO","Monthly reports"]} />
          <Tier name="Growth SEO" price="$799" per="/mo" features={["Everything in Local","Content (4/mo)","Technical SEO","Link building"]} featured />
          <Tier name="Authority SEO" price="$1,499" per="/mo" features={["Content (8/mo)","Advanced link building","Digital PR","CRO experiments"]} />
          <Tier name="Enterprise SEO" price="Custom" features={["Multi-location","Multi-language","Dedicated strategist","Custom KPIs"]} />
        </div>
      </Section>

      <Section bg="muted">
        <SectionHeading eyebrow="Dedicated Developers" title="Embedded engineering teams" />
        <div className="grid md:grid-cols-3 gap-5">
          <Tier name="Dedicated Developer" price="$1,499+" per="/mo" features={["Full-time senior dev","Embedded in your stack","Daily standups","Code ownership"]} />
          <Tier name="Senior Developer" price="$2,499+" per="/mo" features={["Lead-level engineer","Architecture & mentoring","Complex builds","Ownership of outcomes"]} featured />
          <Tier name="Custom Team" price="Custom" features={["PM + designers + devs","Multiple engineers","Fully managed","Scalable up or down"]} />
        </div>
      </Section>

      <CtaBand />
    </PageShell>
  );
}