import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { findKeyword, KEYWORDS } from "@/content/keywords";
import { findCity, LOCATIONS } from "@/content/locations";
import { findHub } from "@/content/services";
import { generateTestimonials, generateCityFaqs, generateIntro, generateMetaDesc } from "@/lib/page-content";
import { ArrowRight, MapPin, CheckCircle2, AlertTriangle, Sparkles, HelpCircle, ChevronRight, Home, Zap, Building2, Quote, Star } from "lucide-react";

export const Route = createFileRoute("/$keyword/$city")({
  loader: ({ params }) => {
    const kw = findKeyword(params.keyword);
    const city = findCity(params.city);
    if (!kw || !city) throw notFound();
    return { keyword: kw.slug, city: city.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const kw = findKeyword(loaderData.keyword);
    const city = findCity(loaderData.city);
    if (!kw || !city) return {};
    const url = `https://www.webcentauri.com/${kw.slug}/${city.slug}`;
    const title = `${kw.title} in ${city.city}, ${city.regionCode} | WebCentauri`;
    const desc = generateMetaDesc(kw, city);
    const baseFaq = kw.faqs[(city.slug.length + kw.slug.length) % kw.faqs.length]!;
    const faqs = [baseFaq, ...generateCityFaqs(kw, city, 3)];
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
            name: `${kw.title} in ${city.city}, ${city.regionCode}`,
            description: desc,
            provider: { "@type": "Organization", name: "WebCentauri Technologies" },
            areaServed: {
              "@type": "City",
              name: city.city,
              containedInPlace: {
                "@type": city.country === "USA" ? "State" : "AdministrativeArea",
                name: city.region,
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: city.city,
                addressRegion: city.regionCode,
                addressCountry: city.country === "USA" ? "US" : "CA",
              },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.webcentauri.com/" },
              { "@type": "ListItem", position: 2, name: kw.title, item: `https://www.webcentauri.com/${kw.slug}` },
              { "@type": "ListItem", position: 3, name: `${city.city}, ${city.regionCode}`, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <PageHero title="Page not found" subtitle="That service + city combination doesn't exist." />
    </PageShell>
  ),
  component: KeywordCityPage,
});

function KeywordCityPage() {
  const { keyword, city } = Route.useLoaderData();
  const kw = findKeyword(keyword)!;
  const c = findCity(city)!;
  const hub = kw.relatedServiceHub ? findHub(kw.relatedServiceHub) : undefined;

  // Other keywords for this city (cross-link)
  const otherKeywords = KEYWORDS.filter((k) => k.slug !== kw.slug).slice(0, 8);

  // Nearby cities in same region
  const nearby = LOCATIONS
    .filter((other) => other.regionCode === c.regionCode && other.slug !== c.slug)
    .slice(0, 6);

  // Distinct per-page content
  const intro = generateIntro(kw, c);
  const testimonials = generateTestimonials(kw, c, 3);
  const cityFaqs = generateCityFaqs(kw, c, 3);
  // Mix one base service FAQ with three city-specific FAQs so the set is unique per page
  const baseFaq = kw.faqs[(c.slug.length + kw.slug.length) % kw.faqs.length]!;
  const faqs = [baseFaq, ...cityFaqs];

  return (
    <PageShell>
      {/* Breadcrumb */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 text-xs text-muted-foreground flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:text-foreground inline-flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/$keyword" params={{ keyword: kw.slug }} className="hover:text-foreground">{kw.title}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{c.city}, {c.regionCode}</span>
        </div>
      </div>

      <PageHero
        eyebrow={`${kw.category} · ${c.city}, ${c.regionCode}`}
        title={`${kw.title} in ${c.city}, ${c.regionCode}`}
        subtitle={`${kw.short} Serving ${c.metro ?? c.city} businesses across ${c.region}.`}
      />

      {/* Intro + sidebar */}
      <Section>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">{intro.opener} {kw.intro}</p>
            <p className="text-base leading-relaxed text-muted-foreground">{intro.reason} {c.blurb}</p>
            <p className="text-base leading-relaxed text-muted-foreground">{intro.closer}</p>
            {kw.responseSLA && (
              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-sm">Response SLA for {c.city}</div>
                  <div className="text-sm text-muted-foreground">{kw.responseSLA}</div>
                </div>
              </div>
            )}
            <div className="p-5 rounded-2xl border border-border bg-card">
              <h2 className="font-semibold text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Industries we serve in {c.city}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.industries.map((ind) => (
                  <span key={ind} className="px-3 py-1 rounded-full bg-secondary text-xs font-medium">{ind}</span>
                ))}
              </div>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <h2 className="font-semibold">Talk to {c.city}'s {kw.title} team</h2>
              <p className="text-sm text-muted-foreground mt-2">Free 30-minute consult with a senior engineer — same day for emergencies.</p>
              <Link to="/contact" className="mt-4 inline-flex w-full justify-center px-4 py-3 rounded-md font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                Get help now
              </Link>
              <Link to="/locations/$slug" params={{ slug: c.slug }} className="mt-3 inline-flex w-full justify-center px-4 py-3 rounded-md font-semibold border border-border text-foreground hover:bg-secondary">
                More about {c.city}
              </Link>
            </div>
            {hub && (
              <div className="p-6 rounded-2xl border border-border bg-card">
                <h2 className="font-semibold text-sm">Full service detail</h2>
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
              <AlertTriangle className="h-6 w-6 text-primary" /> Problems {c.city} businesses bring us
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
        <SectionHeading eyebrow="Outcomes" title={`What ${c.city} clients can expect`} light />
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {kw.outcomes.map((o) => (
            <div key={o} className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur flex gap-3">
              <Sparkles className="h-5 w-5 text-cyan-300 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-200">{o}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section>
        <SectionHeading eyebrow="FAQs" title={`${kw.title} questions from ${c.city}`} />
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {faqs.map((f) => (
            <div key={f.q} className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="font-semibold flex gap-2"><HelpCircle className="h-5 w-5 text-primary shrink-0" /> {f.q}</h2>
              <p className="text-sm text-muted-foreground mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials (distinct per city + keyword) */}
      <Section bg="muted">
        <SectionHeading
          eyebrow="Local proof"
          title={`What ${c.city} clients say about our ${kw.title.toLowerCase()}`}
        />
        <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <figure key={t.name + t.company} className="p-6 rounded-2xl border border-border bg-card flex flex-col">
              <Quote className="h-6 w-6 text-primary/40" />
              <blockquote className="mt-3 text-sm text-foreground/90 leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <div className="mt-4 flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <figcaption className="mt-3 text-xs">
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-muted-foreground">{t.role}, {t.company}</div>
                <div className="text-muted-foreground">{c.city}, {c.regionCode}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Other services in this city */}
      <Section>
        <SectionHeading
          eyebrow={c.city}
          title={`Other services we deliver in ${c.city}`}
          subtitle="Same senior team, same standards — across every service we offer."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherKeywords.map((k) => (
            <Link
              key={k.slug}
              to="/$keyword/$city"
              params={{ keyword: k.slug, city: c.slug }}
              className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition"
            >
              <div className="text-xs font-semibold text-primary uppercase tracking-wide">{k.category}</div>
              <h2 className="font-semibold mt-1 group-hover:text-primary text-sm">{k.title} in {c.city}</h2>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                View <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Nearby cities */}
      {nearby.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow={c.region}
            title={`${kw.title} in nearby ${c.region} cities`}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearby.map((other) => (
              <Link
                key={other.slug}
                to="/$keyword/$city"
                params={{ keyword: kw.slug, city: other.slug }}
                className="group p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h2 className="font-semibold text-sm group-hover:text-primary">{other.city}, {other.regionCode}</h2>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{kw.title} in {other.city}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </PageShell>
  );
}