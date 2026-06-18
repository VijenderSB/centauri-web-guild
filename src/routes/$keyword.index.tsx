import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { findKeyword, KEYWORDS } from "@/content/keywords";
import { US_CITIES, CA_CITIES } from "@/content/locations";
import { findHub } from "@/content/services";
import { generateKeywordTestimonials } from "@/lib/page-content";
import { ArrowRight, MapPin, CheckCircle2, AlertTriangle, Sparkles, HelpCircle, Flag, Zap, Quote, Star } from "lucide-react";

export const Route = createFileRoute("/$keyword/")({
  loader: ({ params }) => {
    const kw = findKeyword(params.keyword);
    if (!kw) throw notFound();
    return { keyword: kw.slug };
  },
  head: ({ loaderData }) => {
    const kw = loaderData ? findKeyword(loaderData.keyword) : undefined;
    if (!kw) return {};
    const url = `https://centauri-web-guild.lovable.app/${kw.slug}`;
    const title = `${kw.title} in USA & Canada — WebCentauri`;
    const desc = `${kw.short} Trusted ${kw.label} provider serving businesses across the United States and Canada.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: kw.title,
            description: kw.short,
            provider: { "@type": "Organization", name: "WebCentauri Technologies" },
            areaServed: ["United States", "Canada"],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <PageHero title="Page not found" subtitle="The page you're looking for doesn't exist." />
    </PageShell>
  ),
  component: KeywordHub,
});

function KeywordHub() {
  const { keyword } = Route.useLoaderData();
  const kw = findKeyword(keyword)!;
  const hub = kw.relatedServiceHub ? findHub(kw.relatedServiceHub) : undefined;
  const related = KEYWORDS.filter((k) => k.slug !== kw.slug).slice(0, 6);
  const testimonials = generateKeywordTestimonials(kw, 3);

  return (
    <PageShell>
      <PageHero
        eyebrow={kw.category}
        title={kw.title}
        subtitle={kw.short}
      />

      {/* Intro + sidebar */}
      <Section>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">{kw.intro}</p>
            {kw.responseSLA && (
              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-sm">Response SLA</div>
                  <div className="text-sm text-muted-foreground">{kw.responseSLA}</div>
                </div>
              </div>
            )}
          </div>
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <h2 className="font-semibold">Need this now?</h2>
              <p className="text-sm text-muted-foreground mt-2">Free 30-minute consult with a senior engineer.</p>
              <Link to="/contact" className="mt-4 inline-flex w-full justify-center px-4 py-3 rounded-md font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                Get help now
              </Link>
            </div>
            {hub && (
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h2 className="font-semibold text-sm">Full service hub</h2>
                <Link to="/services/$slug" params={{ slug: hub.slug }} className="block mt-2 text-primary font-semibold hover:underline">
                  {hub.title} →
                </Link>
                <p className="text-xs text-muted-foreground mt-2">{hub.short}</p>
              </div>
            )}
          </aside>
        </div>
      </Section>

      {/* Problems / Deliverables */}
      <Section bg="muted">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-primary" /> Problems we solve
            </h2>
            <ul className="space-y-3">
              {kw.problems.map((p) => (
                <li key={p} className="p-4 rounded-xl border border-border bg-card text-sm">{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-primary" /> What's included
            </h2>
            <ul className="space-y-2">
              {kw.deliverables.map((d) => (
                <li key={d} className="flex gap-2 text-sm p-3 rounded-lg bg-card border border-border"><CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" /><span>{d}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Outcomes */}
      <Section bg="navy">
        <SectionHeading eyebrow="Outcomes" title="What you can expect" light />
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {kw.outcomes.map((o) => (
            <div key={o} className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur flex gap-3">
              <Sparkles className="h-5 w-5 text-cyan-300 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-200">{o}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* US cities */}
      <Section>
        <SectionHeading
          eyebrow="USA"
          title={`${kw.title} across the United States`}
          subtitle={`Local ${kw.label} for every major US metro — same senior team, same standards.`}
        />
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Flag className="h-4 w-4 text-primary" /> {US_CITIES.length} US cities covered
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {US_CITIES.map((c) => (
            <Link
              key={c.slug}
              to="/$keyword/$city"
              params={{ keyword: kw.slug, city: c.slug }}
              className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <h2 className="font-semibold text-sm truncate group-hover:text-primary">{c.city}, {c.regionCode}</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">{kw.title} in {c.city}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition shrink-0 mt-0.5" />
            </Link>
          ))}
        </div>
      </Section>

      {/* CA cities */}
      <Section bg="muted">
        <SectionHeading
          eyebrow="Canada"
          title={`${kw.title} across Canada`}
          subtitle={`Bilingual-aware ${kw.label} for businesses from Vancouver to St. John's.`}
        />
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Flag className="h-4 w-4 text-primary" /> {CA_CITIES.length} Canadian cities covered
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {CA_CITIES.map((c) => (
            <Link
              key={c.slug}
              to="/$keyword/$city"
              params={{ keyword: kw.slug, city: c.slug }}
              className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <h2 className="font-semibold text-sm truncate group-hover:text-primary">{c.city}, {c.regionCode}</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">{kw.title} in {c.city}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition shrink-0 mt-0.5" />
            </Link>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section>
        <SectionHeading eyebrow="FAQs" title="Frequently asked" />
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {kw.faqs.map((f) => (
            <div key={f.q} className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="font-semibold flex gap-2"><HelpCircle className="h-5 w-5 text-primary shrink-0" /> {f.q}</h2>
              <p className="text-sm text-muted-foreground mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section bg="muted">
        <SectionHeading eyebrow="Client proof" title={`What clients say about our ${kw.title.toLowerCase()}`} />
        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <figure key={t.name + t.company} className="p-6 rounded-2xl border border-border bg-card flex flex-col">
              <Quote className="h-6 w-6 text-primary/40" />
              <blockquote className="mt-3 text-sm text-foreground/90 leading-relaxed flex-1">"{t.quote}"</blockquote>
              <div className="mt-4 flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <figcaption className="mt-3 text-xs">
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-muted-foreground">{t.role}, {t.company}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Related keywords */}
      <Section>
        <h2 className="text-2xl font-bold mb-6">Related services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map((r) => (
            <Link
              key={r.slug}
              to="/$keyword"
              params={{ keyword: r.slug }}
              className="p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition"
            >
              <div className="text-xs font-semibold text-primary uppercase tracking-wide">{r.category}</div>
              <h2 className="font-semibold mt-1">{r.title}</h2>
              <p className="text-sm text-muted-foreground mt-2">{r.short}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageShell>
  );
}