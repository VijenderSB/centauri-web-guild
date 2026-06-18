import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { ArrowRight, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Real Client Results | WebCentauri" },
      { name: "description", content: "Real projects, real results. See how WebCentauri delivers measurable outcomes across healthcare, eCommerce, legal, and more." },
      { property: "og:title", content: "Case Studies — WebCentauri" },
      { property: "og:description", content: "Outcome-driven case studies from across USA & Canada." },
      { property: "og:url", content: "https://centauri-web-guild.lovable.app/case-studies" },
    ],
    links: [{ rel: "canonical", href: "https://centauri-web-guild.lovable.app/case-studies" }],
  }),
  component: CaseStudiesPage,
});

const CASES = [
  ["Dental Practice", "Toronto, ON", "+38% online bookings", "Rebuilt a slow, outdated practice site into a fast, conversion-focused experience with online booking.", "Healthcare"],
  ["B2B SaaS", "San Francisco, CA", "+212% organic traffic", "Technical SEO overhaul plus content engine drove sustained growth in qualified pipeline.", "SaaS"],
  ["Shopify Store", "Austin, TX", "+47 min recovery", "Black Friday outage resolved end-to-end without losing the sales day.", "eCommerce"],
  ["Law Firm", "Vancouver, BC", "Top-3 for 18 keywords", "New site + local SEO program made the firm the dominant local result.", "Legal"],
  ["HVAC Company", "Chicago, IL", "3× lead volume", "Local SEO + landing page CRO tripled qualified service requests.", "Home Services"],
  ["Real Estate Brokerage", "Miami, FL", "+62% IDX engagement", "IDX-integrated platform with agent profiles and smart search.", "Real Estate"],
  ["Accounting Firm", "Calgary, AB", "+5× client portal use", "Modern portal replaced email-based document chaos.", "Accounting"],
  ["Manufacturer", "Detroit, MI", "+140% RFQ submissions", "Capability-driven B2B site with deep product taxonomy.", "Manufacturing"],
  ["Nonprofit", "New York, NY", "+88% online donations", "Donation flow redesign and monthly giving program.", "Nonprofit"],
  ["Custom Web App", "Boston, MA", "$0 → $2M ARR", "Built and scaled an internal-tool SaaS from idea to enterprise customers.", "SaaS"],
  ["WordPress Magazine", "Toronto, ON", "+91% page speed", "Core Web Vitals overhaul without compromising design.", "Publishing"],
  ["WooCommerce Retailer", "Portland, OR", "+27% checkout conv.", "Checkout rebuild and Cloudflare hardening.", "eCommerce"],
] as const;

function CaseStudiesPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Case Studies" title="Real projects. Real results." subtitle="A sample of the work we've shipped for clients across USA & Canada." />
      <Section>
        <SectionHeading
          eyebrow="Selected Work"
          title="Outcomes our clients can measure"
          subtitle="A cross-section of recent engagements with the metrics that mattered to each client."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map(([title, loc, metric, summary, tag]) => (
            <Link to="/contact" key={title} className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all flex flex-col" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wide text-primary">{tag}</span>
                <span className="text-muted-foreground">{loc}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold">{title}</h2>
              <div className="mt-3 inline-flex items-center gap-2 text-emerald-600 font-semibold">
                <TrendingUp className="h-4 w-4" /> {metric}
              </div>
              <p className="mt-3 text-sm text-muted-foreground flex-1">{summary}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Read case study <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </PageShell>
  );
}