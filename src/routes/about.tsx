import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { Target, Eye, Heart, Globe2, Users2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Long-Term Tech Partner | WebCentauri" },
      { name: "description", content: "WebCentauri is a long-term technology partner — not a web agency. Learn our mission, values, and why clients stay for years." },
      { property: "og:title", content: "About WebCentauri" },
      { property: "og:description", content: "A reliable, accountable technology partner — not a freelance shop." },
      { property: "og:url", content: "https://centauri-web-guild.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://centauri-web-guild.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="We're not a web agency. We're your long-term technology partner."
        subtitle="WebCentauri helps USA and Canada businesses build, maintain, secure, optimize, and grow their digital presence with senior expertise and dependable support."
      />
      <Section>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 text-foreground/90">
            <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              WebCentauri Technologies was founded to solve a problem most businesses know
              all too well: agencies that disappear after launch, freelancers who go silent
              when things break, and outsourcing shops that treat your business as a ticket
              number. We built WebCentauri to be different — a technology partner with the
              senior expertise of a top agency, the responsiveness of an in-house team, and
              the long-term mindset of a true business partner.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Over 15+ years and 500+ projects across the USA and Canada, we've earned a 95%
              client retention rate by doing the unglamorous things really well: showing up,
              communicating clearly, and delivering predictable, high-quality outcomes — month
              after month, year after year.
            </p>
          </div>
          <div className="space-y-4">
            {[
              ["15+", "Years experience"],
              ["500+", "Projects delivered"],
              ["95%", "Client retention"],
              ["4 yrs", "Average client tenure"],
            ].map(([n, l]) => (
              <div key={l} className="p-5 rounded-xl border border-border bg-card">
                <div className="text-3xl font-bold text-primary">{n}</div>
                <div className="text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section bg="muted">
        <SectionHeading eyebrow="What drives us" title="Mission, vision, values" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            [Target, "Mission", "Be the most dependable digital technology partner for North American businesses."],
            [Eye, "Vision", "A world where every growing business has a reliable technology team in its corner."],
            [Heart, "Values", "Accountability. Transparency. Craftsmanship. Long-term thinking."],
            [Globe2, "Reach", "Clients across all 50 US states and every Canadian province."],
            [Users2, "Team", "20+ senior engineers, strategists, designers, and PMs."],
            [ShieldCheck, "Trust", "NDAs, security, compliance — built into how we operate."],
          ].map(([Icon, t, d]) => (
            <div key={t as string} className="p-6 rounded-2xl bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="grid h-11 w-11 place-items-center rounded-lg mb-3" style={{ background: "var(--gradient-primary)" }}>
                {/* @ts-ignore */}
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="text-lg font-semibold">{t as string}</h2>
              <p className="text-sm text-muted-foreground mt-1">{d as string}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageShell>
  );
}