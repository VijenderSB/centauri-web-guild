import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { BookOpen, FileText, ListChecks, Shield, Gauge, TrendingUp, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Guides & Checklists | WebCentauri" },
      { name: "description", content: "Practical guides, checklists, and insights on website maintenance, SEO, security, performance, and growth." },
      { property: "og:title", content: "Resources — WebCentauri" },
      { property: "og:description", content: "Guides, checklists, and insights for growing businesses." },
      { property: "og:url", content: "https://centauri-web-guild.lovable.app/resources" },
    ],
    links: [{ rel: "canonical", href: "https://centauri-web-guild.lovable.app/resources" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      },
    ],
  }),
  component: ResourcesPage,
});

const FAQS = [
  ["How quickly can you start a project?", "Most new engagements kick off within 5–10 business days of signing. Emergency support starts in under 60 minutes."],
  ["Do you work with existing websites?", "Yes — most of our work is improving, scaling, and maintaining sites that already exist."],
  ["What platforms do you specialize in?", "WordPress, WooCommerce, Shopify, headless React/Next.js, and custom Node/PHP applications."],
  ["Where are your developers based?", "Our senior engineering team supports clients across USA & Canada with overlapping working hours."],
  ["Do you offer SLAs?", "Yes. Business and Enterprise care plans include same-day and 1-hour SLAs respectively."],
  ["How does the dedicated developer model work?", "You get a senior engineer embedded in your stack, attending standups and reporting directly to you."],
  ["Can you take over from another agency?", "Absolutely. Agency takeovers are one of our most common engagements."],
  ["Do you do SEO and paid ads together?", "Yes — our growth team runs integrated SEO + Google/Meta Ads programs."],
  ["What's included in a website audit?", "Technical SEO, performance, accessibility, security, conversion, and competitive analysis."],
  ["Do you handle hosting?", "We recommend and manage hosting on Cloudflare, WP Engine, Kinsta, Vercel, and AWS depending on need."],
  ["What if my site gets hacked?", "Our emergency team isolates, cleans, hardens, and restores. Most recoveries complete in under 24 hours."],
  ["How do you bill — hourly or fixed?", "Projects are fixed-scope. Retainers are flat monthly. Emergency support is hourly or on retainer."],
  ["Do you sign NDAs?", "Yes — mutual NDAs are standard before discovery."],
  ["Are you HIPAA / PIPEDA aware?", "Yes — we regularly build for regulated industries with appropriate safeguards."],
  ["How do you communicate?", "Slack, email, weekly status calls, and a shared Notion or ClickUp workspace."],
  ["What's your refund policy?", "Care plans cancel anytime. Projects are milestone-based; unfinished milestones are refundable."],
  ["Do you provide training?", "Yes — every launch includes CMS training and recorded walkthroughs."],
  ["Can you integrate with our CRM?", "Yes — HubSpot, Salesforce, Pipedrive, Zoho, custom — we handle them all."],
  ["How long does a typical project take?", "Business sites: 3–5 weeks. Corporate: 6–10 weeks. Custom: 8–16 weeks."],
  ["Do you work on weekends?", "Emergency support is 24/7. Standard engagements run business hours."],
  ["What CMS do you recommend?", "Depends on use case — WordPress for content sites, Shopify for stores, headless for custom apps."],
  ["Do you do mobile apps?", "We focus on web platforms; we partner with trusted mobile specialists when needed."],
  ["Will you sign a long-term contract?", "Retainers are month-to-month. We earn the relationship every month."],
  ["What's your team size?", "20+ engineers, designers, SEO strategists, and PMs."],
  ["Do you do paid social management?", "Yes — Meta, LinkedIn, TikTok, and Google Ads are part of our growth offering."],
  ["Can you migrate from Wix/Squarespace/Webflow?", "Yes — we migrate from any platform with content, SEO, and redirects preserved."],
  ["Do you offer accessibility (WCAG) compliance?", "Yes — AA compliance is included in our corporate builds."],
  ["What if I outgrow my plan?", "Upgrade anytime. We'll prorate and migrate without downtime."],
  ["Do you provide written reports?", "Monthly performance, security, and growth reports are included in care plans."],
  ["How do I get started?", "Book a free 30-minute consultation — we'll discuss goals, scope, and next steps."],
];

const CATEGORIES = [
  [BookOpen, "Blog", "Insights from our team on web, SEO, and growth."],
  [FileText, "Case Studies", "Real outcomes for real clients."],
  [ListChecks, "Guides & Checklists", "Practical playbooks you can act on today."],
  [Shield, "Security Resources", "Keep your site safe in 2026 and beyond."],
  [Gauge, "Performance", "Core Web Vitals, Cloudflare, and hosting deep-dives."],
  [TrendingUp, "SEO Resources", "Local, technical, and content SEO playbooks."],
];

function ResourcesPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Resources" title="Guides, checklists, and insights." subtitle="Practical resources from our team — built from real client work." />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map(([Icon, t, d]) => (
            <div key={t as string} className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="grid h-11 w-11 place-items-center rounded-lg mb-3 bg-primary/10">
                {/* @ts-ignore */}
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{t as string}</h3>
              <p className="text-sm text-muted-foreground mt-1">{d as string}</p>
              <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </Section>
      <Section bg="muted">
        <SectionHeading eyebrow="FAQs" title="30 questions we get asked the most" />
        <div className="grid md:grid-cols-2 gap-4">
          {FAQS.map(([q, a]) => (
            <details key={q} className="group p-5 rounded-xl border border-border bg-card">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between gap-3">
                <span>{q}</span>
                <span className="text-primary text-lg transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </Section>
      <CtaBand />
    </PageShell>
  );
}