import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero, Section, CtaBand, SectionHeading } from "@/components/site/PageShell";
import { findHub, SERVICES } from "@/content/services";
import { CheckCircle2, ArrowRight, Sparkles, AlertTriangle, HelpCircle, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/services/$slug/")({
  loader: ({ params }) => {
    const hub = findHub(params.slug);
    if (!hub) throw notFound();
    return { slug: hub.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? findHub(loaderData.slug) : undefined;
    if (!s) return {};
    const url = `https://centauri-web-guild.lovable.app/services/${s.slug}`;
    return {
      meta: [
        { title: s.metaTitle },
        { name: "description", content: s.metaDesc },
        { property: "og:title", content: s.metaTitle },
        { property: "og:description", content: s.metaDesc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            description: s.metaDesc,
            provider: { "@type": "Organization", name: "WebCentauri Technologies" },
            areaServed: ["United States", "Canada"],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: s.faqs.map((f) => ({
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
      <PageHero title="Service not found" subtitle="The service you're looking for doesn't exist." />
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell>
      <PageHero title="Something went wrong" subtitle="Please try again or contact support." />
    </PageShell>
  ),
  component: HubPage,
});

function HubPage() {
  const { slug } = Route.useLoaderData();
  const hub = findHub(slug)!;
  const Icon = hub.icon;
  const related = SERVICES.filter((s) => s.slug !== hub.slug).slice(0, 3);

  return (
    <PageShell>
      <PageHero eyebrow="Service" title={hub.title} subtitle={hub.desc} />

      {/* Intro */}
      <Section>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <Icon className="h-7 w-7" />
              <span className="text-xs font-semibold uppercase tracking-widest">Overview</span>
            </div>
            {hub.intro.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">{p}</p>
            ))}
          </div>
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <h2 className="font-semibold">Talk to a specialist</h2>
              <p className="text-sm text-muted-foreground mt-2">Free 30-minute scoping call. No pressure, no sales script.</p>
              <Link to="/contact" className="mt-4 inline-flex w-full justify-center px-4 py-3 rounded-md font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                Book consultation
              </Link>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="font-semibold">Industries we serve here</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {hub.industries.map((ind) => (
                  <li key={ind} className="flex gap-2"><ArrowRight className="h-4 w-4 text-primary mt-0.5" />{ind}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* Sub-services list */}
      <Section bg="muted">
        <SectionHeading eyebrow="Sub-services" title={`Everything inside ${hub.title}`} subtitle="Each sub-service runs on the same senior team with the same standards." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {hub.children.map((c) => (
            <Link
              key={c.slug}
              to="/services/$slug/$child"
              params={{ slug: hub.slug, child: c.slug }}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition flex flex-col"
            >
              <h2 className="font-semibold group-hover:text-primary">{c.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 flex-1">{c.short}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                View details <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Problems */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-primary" /> Problems we solve
            </h2>
            <ul className="space-y-3">
              {hub.problems.map((p) => (
                <li key={p} className="p-4 rounded-xl border border-border bg-card text-sm">{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-primary" /> What we deliver
            </h2>
            <ul className="space-y-3">
              {hub.deliverables.map((d) => (
                <li key={d} className="flex gap-2 text-sm p-3"><CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" /><span>{d}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section bg="muted">
        <SectionHeading eyebrow="Process" title="How we work" subtitle="A consistent methodology built across 500+ engagements." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hub.process.map((step, i) => (
            <div key={step.step} className="p-6 rounded-xl border border-border bg-card">
              <div className="text-3xl font-bold text-primary/30">{String(i + 1).padStart(2, "0")}</div>
              <div className="font-semibold mt-2">{step.step}</div>
              <p className="text-sm text-muted-foreground mt-2">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Outcomes */}
      <Section>
        <SectionHeading eyebrow="Outcomes" title="What you can expect" />
        <div className="grid md:grid-cols-2 gap-4">
          {hub.outcomes.map((o) => (
            <div key={o} className="p-5 rounded-2xl border border-border bg-card flex gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">{o}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section bg="muted">
        <SectionHeading eyebrow="FAQs" title="Common questions" />
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {hub.faqs.map((f) => (
            <div key={f.q} className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="font-semibold flex gap-2"><HelpCircle className="h-5 w-5 text-primary shrink-0" /> {f.q}</h2>
              <p className="text-sm text-muted-foreground mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Related */}
      <Section>
        <h2 className="text-2xl font-bold mb-6">Related services</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {related.map((r) => {
            const RI = r.icon;
            return (
              <Link key={r.slug} to="/services/$slug" params={{ slug: r.slug }} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition">
                <RI className="h-6 w-6 text-primary" />
                <h2 className="font-semibold mt-3">{r.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{r.short}</p>
              </Link>
            );
          })}
        </div>
      </Section>
      <CtaBand />
    </PageShell>
  );
}