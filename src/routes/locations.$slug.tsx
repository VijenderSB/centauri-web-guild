import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero, Section, CtaBand } from "@/components/site/PageShell";
import { LOCATIONS, findCity } from "@/content/locations";
import { SERVICES } from "@/content/services";
import { KEYWORDS } from "@/content/keywords";
import { generateCityTestimonials, generateCityOnlyFaqs } from "@/lib/page-content";
import { CheckCircle2, MapPin, ArrowRight, Building2, Clock, ShieldCheck, Search, Quote, Star, HelpCircle } from "lucide-react";
import { Siren, Activity, Zap } from "lucide-react";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const city = findCity(params.slug);
    if (!city) throw notFound();
    return { slug: city.slug };
  },
  head: ({ loaderData }) => {
    const c = loaderData ? findCity(loaderData.slug) : undefined;
    if (!c) return {};
    const title = `${c.city} Web Design, SEO & Website Support | WebCentauri`;
    const desc = `Trusted web design, SEO, and ongoing technical support for ${c.city}, ${c.regionCode} businesses. Senior team. ${c.country === "USA" ? "US-based" : "Canadian"} delivery. Free audit.`;
    const url = `https://www.webcentauri.com/locations/${c.slug}`;
    const cityFaqs = generateCityOnlyFaqs(c, 4);
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
            "@type": "FAQPage",
            mainEntity: cityFaqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <PageHero title="City not found" subtitle="The location page you're looking for doesn't exist." />
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell>
      <PageHero title="Something went wrong" subtitle="Please try again or contact support." />
    </PageShell>
  ),
  component: CityPage,
});

function CityPage() {
  const { slug } = Route.useLoaderData();
  const c = findCity(slug)!;
  const nearby = LOCATIONS.filter((x) => x.country === c.country && x.slug !== c.slug).slice(0, 6);
  const testimonials = generateCityTestimonials(c, 3);
  const cityFaqs = generateCityOnlyFaqs(c, 4);

  return (
    <PageShell>
      <PageHero
        eyebrow={`${c.country} · ${c.region}`}
        title={`Website design, SEO & support in ${c.city}, ${c.regionCode}`}
        subtitle={c.blurb}
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-3">Why {c.city} businesses choose WebCentauri</h2>
              <p className="text-muted-foreground leading-relaxed">
                We're a senior US/Canada-focused web partner serving the {c.metro} area and surrounding {c.region} markets.
                Our {c.city} clients work with us long-term because we treat their website like a critical business system —
                not a one-off project. Every engagement includes proactive monitoring, accessibility &amp; security maintenance,
                local SEO, and a senior strategist on call.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: MapPin, title: `Local to ${c.metro}`, body: `We understand ${c.city}-area buyers, competitors, and search intent.` },
                { icon: Clock, title: "Under-60-min response", body: "Emergency support during US/Canada business hours and beyond." },
                { icon: ShieldCheck, title: "SOC 2-aligned", body: "NDA & MSA ready — comfortable with procurement, legal, and IT review." },
                { icon: Search, title: `${c.city} local SEO`, body: "GBP, citations, schema, reviews, and local link-building." },
              ].map((b) => (
                <div key={b.title} className="p-5 rounded-xl border border-border bg-card">
                  <b.icon className="h-5 w-5 text-primary" />
                  <div className="font-semibold mt-2">{b.title}</div>
                  <p className="text-sm text-muted-foreground mt-1">{b.body}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Building2 className="h-6 w-6 text-primary" /> Industries we serve in {c.city}</h2>
              <div className="flex flex-wrap gap-2">
                {c.industries.map((ind) => (
                  <span key={ind} className="px-3 py-1.5 rounded-full text-sm border border-border bg-card">{ind}</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Whether you serve enterprise buyers downtown or run a multi-location business across {c.region},
                we tailor the website, content, and SEO to your audience.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">What we deliver for {c.city} clients</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  `Custom website design & development tailored to ${c.city} buyers`,
                  `Local SEO targeting "${c.city}" and surrounding ${c.regionCode} queries`,
                  "Performance, accessibility (WCAG 2.2 AA), and Core Web Vitals work",
                  "Conversion-rate optimization, A/B testing, and analytics",
                  "Ongoing maintenance, security patching, and uptime monitoring",
                  "Migrations, redesigns, and platform replatforming (WP, Webflow, Shopify, Next.js)",
                ].map((s) => (
                  <li key={s} className="flex gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">Free for {c.city}</div>
              <h2 className="font-bold mt-1">Local website audit</h2>
              <p className="text-sm text-muted-foreground mt-2">
                We'll audit your {c.city} site for SEO, speed, security, and conversion — and send findings within 48 hours.
              </p>
              <Link to="/contact" className="mt-4 inline-flex w-full justify-center px-4 py-3 rounded-md font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                Request free audit
              </Link>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-secondary/40">
              <h2 className="font-semibold">Talk to a senior strategist</h2>
              <p className="text-sm text-muted-foreground mt-2">No junior reps. Book a 30-minute consult to talk about your {c.city} goals.</p>
              <Link to="/contact" className="mt-4 inline-flex text-sm font-semibold text-primary">Book consultation →</Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section bg="muted">
        <h2 className="text-2xl font-bold mb-6">Popular services for {c.city} businesses</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {SERVICES.slice(0, 6).map((s) => {
            const SI = s.icon;
            return (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition">
                <SI className="h-6 w-6 text-primary" />
                <h2 className="font-semibold mt-3">{s.title}</h2>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s.short}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">Learn more <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section bg="navy">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-300 mb-3">
            {c.city} Emergency Response
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Site down in {c.city}? We're on it within 5 minutes.
          </h2>
          <p className="mt-4 text-slate-300">
            Our senior engineers respond to {c.metro}-area emergencies day or night.
            From issue reported to site live — here's exactly what happens.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            { t: "00:00", icon: Siren, title: "Issue Reported", body: `${c.city} client triggers emergency via phone, email, or portal. Ticket auto-routes to on-call senior engineer.` },
            { t: "05:00", icon: Activity, title: "Engineer Responds", body: "Senior engineer acknowledges, opens a war room, and begins live diagnosis — no junior triage layer." },
            { t: "60:00", icon: Zap, title: "Recovery Underway / Site Live", body: `Most ${c.city} incidents are resolved or mitigated within the hour. You get a full post-incident report.` },
          ].map((s) => (
            <div key={s.t} className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-cyan-300 tabular-nums">{s.t}</span>
                <s.icon className="h-6 w-6 text-cyan-300" />
              </div>
              <div className="mt-3 font-semibold text-white">{s.title}</div>
              <p className="mt-2 text-sm text-slate-300">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-cyan-300" /> 24/7 coverage across {c.country}</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300" /> Senior engineers only</span>
          <Link to="/contact" className="ml-2 px-5 py-2.5 rounded-md font-semibold bg-white text-primary hover:bg-slate-100 transition">
            Get emergency support
          </Link>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-6">Other {c.country === "USA" ? "US" : "Canadian"} cities we serve</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nearby.map((n) => (
            <Link key={n.slug} to="/locations/$slug" params={{ slug: n.slug }} className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-semibold">{n.city}, {n.regionCode}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.blurb}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link to="/locations" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">View all locations <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* City-specific testimonials */}
      <Section>
        <h2 className="text-2xl font-bold mb-2">What {c.city} clients say</h2>
        <p className="text-muted-foreground mb-6 max-w-3xl">Real feedback from {c.city} and {c.region} businesses we've delivered for. Names abbreviated for client privacy.</p>
        <div className="grid md:grid-cols-3 gap-5">
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
                <div className="text-muted-foreground">{c.city}, {c.regionCode}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* City-specific FAQs */}
      <Section bg="muted">
        <h2 className="text-2xl font-bold mb-2">FAQs from {c.city} buyers</h2>
        <p className="text-muted-foreground mb-6 max-w-3xl">Questions we hear most often from {c.city} and {c.metro ?? c.region} businesses before they engage.</p>
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
          {cityFaqs.map((f) => (
            <div key={f.q} className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="font-semibold flex gap-2"><HelpCircle className="h-5 w-5 text-primary shrink-0" /> {f.q}</h2>
              <p className="text-sm text-muted-foreground mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-2">All services available in {c.city}</h2>
        <p className="text-muted-foreground mb-6 max-w-3xl">Every WebCentauri service is delivered in {c.city}, {c.regionCode} by the same senior team — emergency response, recovery, development, and ongoing support.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {KEYWORDS.map((k) => (
            <Link
              key={k.slug}
              to="/$keyword/$city"
              params={{ keyword: k.slug, city: c.slug }}
              className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-primary uppercase tracking-wide">{k.category}</div>
                <h2 className="font-semibold text-sm group-hover:text-primary mt-0.5">{k.title} in {c.city}</h2>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition shrink-0 mt-0.5" />
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageShell>
  );
}