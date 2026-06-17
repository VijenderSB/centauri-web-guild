import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICES } from "@/content/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Web, SEO & Dedicated Teams | WebCentauri" },
      { name: "description", content: "Website development, maintenance, WordPress, eCommerce, SEO, performance, and dedicated developers for USA & Canada businesses." },
      { property: "og:title", content: "WebCentauri Services — Web, SEO & Teams" },
      { property: "og:description", content: "Eight integrated service lines, one accountable partner." },
      { property: "og:url", content: "https://centauri-web-guild.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://centauri-web-guild.lovable.app/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "Service",
            position: i + 1,
            name: s.title,
            description: s.desc,
            provider: { "@type": "Organization", name: "WebCentauri Technologies" },
            areaServed: ["United States", "Canada"],
          })),
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Services"
        title="Everything you need to build, run, and grow your digital presence."
        subtitle="One accountable partner across development, maintenance, SEO, performance, security, and dedicated engineering."
      />
      <Section>
        <div className="grid lg:grid-cols-2 gap-6">
          {SERVICES.map(({ icon: Icon, title, desc, items, slug }) => (
            <div key={slug} className="p-7 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl shrink-0" style={{ background: "var(--gradient-primary)" }}>
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
              <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
                {items.map((i) => (
                  <li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>{i}</span></li>
                ))}
              </ul>
              <Link to="/services/$slug" params={{ slug }} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                View service details <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>
      <Section bg="muted">
        <SectionHeading eyebrow="Our Process" title="Discovery → Growth, every time" subtitle="A consistent 8-step methodology built over 15+ years and 500+ projects." />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Discovery","Audit","Planning","Development","Testing","Launch","Support","Growth"].map((s, i) => (
            <div key={s} className="p-5 rounded-xl border border-border bg-card">
              <div className="text-3xl font-bold text-primary/30">{String(i+1).padStart(2,"0")}</div>
              <div className="font-semibold mt-2">{s}</div>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </PageShell>
  );
}