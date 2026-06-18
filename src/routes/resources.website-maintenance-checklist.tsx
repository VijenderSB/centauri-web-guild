import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, CtaBand } from "@/components/site/PageShell";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/resources/website-maintenance-checklist")({
  head: () => ({
    meta: [
      { title: "Website Maintenance Checklist (Daily, Weekly, Monthly)" },
      { name: "description", content: "A complete website maintenance checklist for North American business owners — daily, weekly, monthly, and quarterly tasks to keep your site fast, secure, and reliable." },
      { property: "og:title", content: "Website Maintenance Checklist | WebCentauri" },
      { property: "og:description", content: "Daily, weekly, monthly, and quarterly website maintenance tasks." },
      { property: "og:url", content: "https://www.webcentauri.com/resources/website-maintenance-checklist" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "https://www.webcentauri.com/resources/website-maintenance-checklist" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Website Maintenance Checklist (Daily, Weekly, Monthly)",
          author: { "@type": "Organization", name: "WebCentauri Technologies" },
        }),
      },
    ],
  }),
  component: ChecklistPage,
});

const GROUPS: { title: string; cadence: string; items: string[] }[] = [
  {
    title: "Daily Tasks",
    cadence: "Every day",
    items: [
      "Confirm uptime monitoring shows all systems normal",
      "Review security alerts (firewall, malware scanner, login attempts)",
      "Verify automated daily backups completed successfully",
      "Check critical conversion paths (checkout, contact form, signup)",
      "Scan error logs for new 500/404 spikes",
    ],
  },
  {
    title: "Weekly Tasks",
    cadence: "Every 7 days",
    items: [
      "Apply WordPress / plugin / theme security updates in a staging environment",
      "Run a malware and vulnerability scan",
      "Review Core Web Vitals (LCP, INP, CLS) in PageSpeed Insights",
      "Check broken links across primary navigation and landing pages",
      "Test forms, integrations, and webhooks",
      "Review Google Search Console for new crawl errors",
    ],
  },
  {
    title: "Monthly Tasks",
    cadence: "Every 30 days",
    items: [
      "Full site backup verified by restoring to staging",
      "Database optimization and cleanup (transients, revisions, spam)",
      "Image and asset optimization sweep",
      "Update SSL/TLS certificates and review HTTPS configuration",
      "Review analytics for traffic, engagement, and conversion trends",
      "Audit user accounts, roles, and admin access",
      "Send client-facing performance & security report",
    ],
  },
  {
    title: "Quarterly Tasks",
    cadence: "Every 90 days",
    items: [
      "Comprehensive security audit and penetration testing",
      "Hosting plan review (capacity, region, CDN, caching)",
      "Full SEO audit — technical, on-page, off-page",
      "Accessibility review against WCAG 2.2 AA",
      "Review and update privacy policy, cookie banner, and terms",
      "Disaster-recovery drill: full site restore from backups",
    ],
  },
];

function ChecklistPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Guide"
        title="The complete website maintenance checklist."
        subtitle="A practical daily, weekly, monthly, and quarterly playbook for keeping business websites fast, secure, and reliable."
      />
      <Section>
        <div className="prose-none max-w-3xl mx-auto text-foreground">
          <h2 className="text-2xl font-bold">Why website maintenance matters</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Most outages, hacks, and traffic drops trace back to skipped maintenance — outdated plugins,
            forgotten backups, expired certificates, or unmonitored performance regressions. The checklist
            below is the same one our team runs against client sites every day across the USA and Canada.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {GROUPS.map((g) => (
            <div key={g.title} className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold">{g.title}</h2>
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">{g.cadence}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </PageShell>
  );
}