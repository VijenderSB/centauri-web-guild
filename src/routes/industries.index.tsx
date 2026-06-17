import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES } from "@/content/industries";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries — Healthcare, Legal, eCommerce | WebCentauri" },
      { name: "description", content: "Web, SEO, and support for healthcare, legal, real estate, eCommerce, accounting, manufacturing and more across USA & Canada." },
      { property: "og:title", content: "Industries We Serve — WebCentauri" },
      { property: "og:description", content: "Deep experience across regulated and service industries." },
      { property: "og:url", content: "https://centauri-web-guild.lovable.app/industries" },
    ],
    links: [{ rel: "canonical", href: "https://centauri-web-guild.lovable.app/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Industries"
        title="Deep expertise across the industries we serve."
        subtitle="500+ projects across regulated, service, retail, and B2B verticals — we speak your industry's language."
      />
      <Section>
        <SectionHeading
          eyebrow="Verticals"
          title="Specialized solutions for the industries we serve"
          subtitle="Pick your industry to see how we apply our development, SEO, and support expertise to your sector."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map(({ icon: Icon, name, tagline, slug }) => (
            <Link to="/industries/$slug" params={{ slug }} key={slug} className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="grid h-12 w-12 place-items-center rounded-xl mb-4 bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Explore solutions <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </PageShell>
  );
}