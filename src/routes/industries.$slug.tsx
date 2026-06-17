import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero, Section, CtaBand } from "@/components/site/PageShell";
import { INDUSTRIES, type IndustryEntry } from "@/content/industries";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = INDUSTRIES.find((i) => i.slug === params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    const i = loaderData?.industry;
    if (!i) return {};
    const url = `https://centauri-web-guild.lovable.app/industries/${i.slug}`;
    return {
      meta: [
        { title: i.metaTitle },
        { name: "description", content: i.metaDesc },
        { property: "og:title", content: i.metaTitle },
        { property: "og:description", content: i.metaDesc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <PageHero title="Industry not found" subtitle="The industry page you're looking for doesn't exist." />
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell>
      <PageHero title="Something went wrong" subtitle="Please try again or contact support." />
    </PageShell>
  ),
  component: IndustryDetailPage,
});

function IndustryDetailPage() {
  const { industry } = Route.useLoaderData() as { industry: IndustryEntry };
  const Icon = industry.icon;
  const related = INDUSTRIES.filter((i) => i.slug !== industry.slug).slice(0, 3);

  return (
    <PageShell>
      <PageHero eyebrow="Industry" title={`${industry.name} websites & support`} subtitle={industry.tagline} />
      <Section>
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <p className="text-lg text-muted-foreground leading-relaxed">{industry.intro}</p>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-primary" /> Common challenges</h2>
              <ul className="space-y-3">
                {industry.challenges.map((c) => (
                  <li key={c} className="p-4 rounded-xl border border-border bg-card text-sm">{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="h-6 w-6 text-primary" /> How we help</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {industry.solutions.map((s) => (
                  <li key={s} className="flex gap-2 text-sm"><CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" /><span>{s}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 mb-3"><Icon className="h-6 w-6 text-primary" /></div>
              <h3 className="font-semibold">Get an industry-specific plan</h3>
              <p className="text-sm text-muted-foreground mt-2">Tell us about your {industry.name.toLowerCase()} business — we'll send a tailored plan within 24 hours.</p>
              <Link to="/contact" className="mt-4 inline-flex w-full justify-center px-4 py-3 rounded-md font-semibold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                Request a plan
              </Link>
            </div>
          </aside>
        </div>
      </Section>
      <Section bg="muted">
        <h2 className="text-2xl font-bold mb-6">Other industries we serve</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {related.map((r) => {
            const RI = r.icon;
            return (
              <Link key={r.slug} to="/industries/$slug" params={{ slug: r.slug }} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition">
                <RI className="h-6 w-6 text-primary" />
                <h3 className="font-semibold mt-3">{r.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{r.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">View industry <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            );
          })}
        </div>
      </Section>
      <CtaBand />
    </PageShell>
  );
}