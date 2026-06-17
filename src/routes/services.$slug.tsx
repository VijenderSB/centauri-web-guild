import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero, Section, CtaBand } from "@/components/site/PageShell";
import { SERVICES } from "@/content/services";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? SERVICES.find((x) => x.slug === loaderData.slug) : undefined;
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
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useLoaderData();
  const service = SERVICES.find((s) => s.slug === slug)!;
  const Icon = service.icon;
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <PageShell>
      <PageHero eyebrow="Service" title={service.title} subtitle={service.desc} />
      <Section>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Icon className="h-6 w-6 text-primary" /> What's included</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {service.items.map((i) => (
                  <li key={i} className="flex gap-2 text-sm"><CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" /><span>{i}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Sparkles className="h-6 w-6 text-primary" /> Outcomes we deliver</h2>
              <ul className="space-y-3">
                {service.outcomes.map((o) => (
                  <li key={o} className="p-4 rounded-xl border border-border bg-card text-sm">{o}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">How we work</h2>
              <ol className="grid sm:grid-cols-2 gap-3 text-sm">
                {["Discovery & audit", "Scoping & proposal", "Kickoff & planning", "Build & QA", "Launch", "Ongoing support"].map((step, i) => (
                  <li key={step} className="p-4 rounded-xl border border-border bg-card">
                    <span className="text-primary font-bold">{String(i + 1).padStart(2, "0")}</span>
                    <div className="font-semibold mt-1">{step}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="font-semibold">Talk to a specialist</h3>
              <p className="text-sm text-muted-foreground mt-2">Free 30-minute scoping call. No pressure, no sales script.</p>
              <Link to="/contact" className="mt-4 inline-flex w-full justify-center px-4 py-3 rounded-md font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                Book consultation
              </Link>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-semibold">Industries we serve here</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {service.industries.map((ind) => (
                  <li key={ind} className="flex gap-2"><ArrowRight className="h-4 w-4 text-primary mt-0.5" />{ind}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
      <Section bg="muted">
        <h2 className="text-2xl font-bold mb-6">Related services</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {related.map((r) => {
            const RI = r.icon;
            return (
              <Link key={r.slug} to="/services/$slug" params={{ slug: r.slug }} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition">
                <RI className="h-6 w-6 text-primary" />
                <h3 className="font-semibold mt-3">{r.title}</h3>
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