import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES, INDUSTRY_CATEGORIES } from "@/content/industries";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — Full Directory | WebCentauri" },
      { name: "description", content: "Full directory of 70+ industries we serve — healthcare, legal, SaaS, eCommerce, manufacturing, real estate, hospitality, education and more across USA & Canada." },
      { property: "og:title", content: "Industries We Serve — Full Directory | WebCentauri" },
      { property: "og:description", content: "70+ industries served across USA & Canada." },
      { property: "og:url", content: "https://centauri-web-guild.lovable.app/industries" },
    ],
    links: [{ rel: "canonical", href: "https://centauri-web-guild.lovable.app/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const total = INDUSTRIES.length;
  return (
    <PageShell>
      <PageHero
        eyebrow="Industry Directory"
        title={`${total}+ industries. One dependable technology partner.`}
        subtitle="A complete directory of the industries we build, maintain, secure, and grow for — from regulated healthcare and finance to eCommerce, SaaS, hospitality, trades, and public sector."
      />
      <Section>
        <SectionHeading
          eyebrow="Browse by category"
          title="Every industry, organized for you"
          subtitle="Jump to a category, or explore the full directory below. Each vertical has its own dedicated page with specific challenges, solutions, and outcomes."
        />
        <div className="mb-12 flex flex-wrap gap-2">
          {INDUSTRY_CATEGORIES.map((cat) => {
            const id = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const count = INDUSTRIES.filter((i) => i.category === cat).length;
            return (
              <a
                key={cat}
                href={`#${id}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/50 hover:text-primary transition"
              >
                {cat}
                <span className="text-xs text-muted-foreground">{count}</span>
              </a>
            );
          })}
        </div>
        <div className="space-y-14">
          {INDUSTRY_CATEGORIES.map((cat) => {
            const id = cat.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const items = INDUSTRIES.filter((i) => i.category === cat);
            return (
              <div key={cat} id={id} className="scroll-mt-28">
                <div className="flex items-end justify-between border-b border-border pb-3 mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{cat}</h2>
                  <span className="text-sm text-muted-foreground">{items.length} verticals</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map(({ icon: Icon, name, tagline, slug }) => (
                    <Link
                      to="/industries/$slug"
                      params={{ slug }}
                      key={slug}
                      className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all"
                      style={{ boxShadow: "var(--shadow-card)" }}
                    >
                      <div className="grid h-12 w-12 place-items-center rounded-xl mb-4 bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-lg font-semibold">{name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        Explore solutions <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-14 text-center text-sm text-muted-foreground">
          Don&apos;t see your industry? We&apos;ve likely shipped for an adjacent vertical.{" "}
          <Link to="/contact" className="text-primary font-medium hover:underline">Talk to us →</Link>
        </p>
      </Section>
      <CtaBand />
    </PageShell>
  );
}