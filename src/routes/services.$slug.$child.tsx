import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero, Section, CtaBand, SectionHeading } from "@/components/site/PageShell";
import { findChild, findHub } from "@/content/services";
import { CheckCircle2, ArrowRight, Sparkles, AlertTriangle, HelpCircle, ChevronRight, Home } from "lucide-react";

export const Route = createFileRoute("/services/$slug/$child")({
  loader: ({ params }) => {
    const found = findChild(params.slug, params.child);
    if (!found) throw notFound();
    return { slug: params.slug, child: params.child };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const found = findChild(loaderData.slug, loaderData.child);
    if (!found) return {};
    const url = `https://www.webcentauri.com/services/${loaderData.slug}/${loaderData.child}`;
    return {
      meta: [
        { title: found.child.metaTitle },
        { name: "description", content: found.child.metaDesc },
        { property: "og:title", content: found.child.metaTitle },
        { property: "og:description", content: found.child.metaDesc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: found.child.title,
            description: found.child.metaDesc,
            provider: { "@type": "Organization", name: "WebCentauri Technologies" },
            areaServed: ["United States", "Canada"],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: found.child.faqs.map((f) => ({
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
              { "@type": "ListItem", position: 2, name: "Services", item: "https://www.webcentauri.com/services" },
              { "@type": "ListItem", position: 3, name: found.hub.title, item: `https://www.webcentauri.com/services/${loaderData.slug}` },
              { "@type": "ListItem", position: 4, name: found.child.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <PageHero title="Sub-service not found" subtitle="The sub-service you're looking for doesn't exist." />
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell>
      <PageHero title="Something went wrong" subtitle="Please try again or contact support." />
    </PageShell>
  ),
  component: ChildPageView,
});

function ChildPageView() {
  const { slug, child } = Route.useLoaderData();
  const { hub, child: page } = findChild(slug, child)!;
  const siblings = hub.children.filter((c) => c.slug !== page.slug).slice(0, 4);

  return (
    <PageShell>
      {/* Breadcrumb */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 text-xs text-muted-foreground flex flex-wrap items-center gap-1">
          <Link to="/" className="hover:text-foreground inline-flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/services" className="hover:text-foreground">Services</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/services/$slug" params={{ slug: hub.slug }} className="hover:text-foreground">{hub.title}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{page.title}</span>
        </div>
      </div>

      <PageHero eyebrow={hub.title} title={page.title} subtitle={page.short} />

      {/* Intro */}
      <Section>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {page.intro.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">{p}</p>
            ))}
          </div>
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <h2 className="font-semibold">Get this on your roadmap</h2>
              <p className="text-sm text-muted-foreground mt-2">Free 30-minute scoping call — senior engineer, not a sales rep.</p>
              <Link to="/contact" className="mt-4 inline-flex w-full justify-center px-4 py-3 rounded-md font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                Book consultation
              </Link>
              <Link to="/contact" className="mt-3 inline-flex w-full justify-center px-4 py-3 rounded-md font-semibold border border-border text-foreground hover:bg-secondary">
                Request audit
              </Link>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="font-semibold text-sm">Part of</h2>
              <Link to="/services/$slug" params={{ slug: hub.slug }} className="block mt-2 text-primary font-semibold hover:underline">
                {hub.title} →
              </Link>
              <p className="text-xs text-muted-foreground mt-2">{hub.short}</p>
            </div>
          </aside>
        </div>
      </Section>

      {/* Problems / Deliverables */}
      <Section bg="muted">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-primary" /> Common problems
            </h2>
            <ul className="space-y-3">
              {page.problems.map((p) => (
                <li key={p} className="p-4 rounded-xl border border-border bg-card text-sm">{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-primary" /> What's included
            </h2>
            <ul className="space-y-2">
              {page.deliverables.map((d) => (
                <li key={d} className="flex gap-2 text-sm p-3 rounded-lg bg-card border border-border"><CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" /><span>{d}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading eyebrow="Process" title="How we deliver" subtitle="The same disciplined process across every engagement." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {page.process.map((step, i) => (
            <div key={step.step} className="p-6 rounded-xl border border-border bg-card">
              <div className="text-3xl font-bold text-primary/30">{String(i + 1).padStart(2, "0")}</div>
              <div className="font-semibold mt-2">{step.step}</div>
              <p className="text-sm text-muted-foreground mt-2">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Outcomes */}
      <Section bg="navy">
        <SectionHeading eyebrow="Outcomes" title="What you can expect" light />
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {page.outcomes.map((o) => (
            <div key={o} className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur flex gap-3">
              <Sparkles className="h-5 w-5 text-cyan-300 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-200">{o}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Section>
        <SectionHeading eyebrow="FAQs" title="Frequently asked" />
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {page.faqs.map((f) => (
            <div key={f.q} className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="font-semibold flex gap-2"><HelpCircle className="h-5 w-5 text-primary shrink-0" /> {f.q}</h2>
              <p className="text-sm text-muted-foreground mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sibling sub-services */}
      {siblings.length > 0 && (
        <Section bg="muted">
          <h2 className="text-2xl font-bold mb-6">More within {hub.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug/$child"
                params={{ slug: hub.slug, child: s.slug }}
                className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition"
              >
                <h2 className="font-semibold text-sm group-hover:text-primary">{s.title}</h2>
                <p className="text-xs text-muted-foreground mt-2">{s.short}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  View <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </PageShell>
  );
}