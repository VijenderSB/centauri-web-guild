import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { CountUp } from "@/components/site/CountUp";
import heroImg from "@/assets/hero.jpg";
import {
  ArrowRight, Shield, Clock, MessageSquare, Layers, Wrench, Heart,
  Code2, ShoppingCart, TrendingUp, Gauge, Users2, Siren, CheckCircle2, Star,
  Stethoscope, Scale, Building2, Hammer, Calculator, Factory, Briefcase, HomeIcon,
  AlertTriangle, TrendingDown, ShoppingCart as CartIcon, UserX, AlertOctagon,
  Mail, MessageCircle, ArrowDown, ChevronDown, Activity, Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WebCentauri — Web, SEO & Support Partner (USA & Canada)" },
      { name: "description", content: "Trusted USA & Canada technology partner for web development, maintenance, SEO, dedicated developers, and emergency support." },
      { property: "og:title", content: "WebCentauri — Reliable Technology Partner" },
      { property: "og:description", content: "Web, SEO, and support built for long-term partnerships across USA & Canada." },
      { property: "og:url", content: "https://centauri-web-guild.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://centauri-web-guild.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "WebCentauri Technologies",
          url: "https://centauri-web-guild.lovable.app",
        }),
      },
    ],
  }),
  component: Index,
});

function useLiveCounter({
  start,
  increment,
  intervalMs,
}: {
  start: number;
  increment: number;
  intervalMs: number;
}) {
  const [count, setCount] = useState(start);
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef;
      const ticks = Math.floor(elapsed / intervalMs);
      setCount(start + ticks * increment);
    };
    const startTimeRef = Date.now();
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [start, increment, intervalMs]);
  return count;
}

function Index() {
  const clientCount = useLiveCounter({ start: 500, increment: 6, intervalMs: 3600000 });
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden text-white">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(10,18,38,0.92) 0%, rgba(15,30,60,0.82) 50%, rgba(20,40,80,0.6) 100%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" /> USA & Canada · Long-Term Technology Partner
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] max-w-4xl">
            Your reliable technology &<br />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">digital growth partner.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed">
            Helping businesses across the USA and Canada build, maintain, optimize, secure,
            and grow their digital presence — through dependable web development, ongoing support,
            SEO, performance, and dedicated technical teams.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-primary font-semibold hover:bg-slate-100 transition">
              Book Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/30 text-white font-semibold hover:bg-white/10 transition">
              Request Website Audit
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition">
              <Siren className="h-4 w-4" /> Emergency Support
            </Link>
          </div>
          {/* Trust bar with animated counters */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <CountUp end={15} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-wide text-slate-400 mt-1">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <CountUp end={500} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-wide text-slate-400 mt-1">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">USA / CA</div>
              <div className="text-xs uppercase tracking-wide text-slate-400 mt-1">Focused Coverage</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">&lt; 1 hr</div>
              <div className="text-xs uppercase tracking-wide text-slate-400 mt-1">Response Time</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <CountUp end={95} suffix="%" />
              </div>
              <div className="text-xs uppercase tracking-wide text-slate-400 mt-1">Client Retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <Section>
        <SectionHeading
          eyebrow="Why WebCentauri"
          title="A partner you can actually rely on"
          subtitle="We don't disappear after launch. We become the technical and digital team that keeps your business moving forward."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            [Shield, "Reliable Delivery", "On-time, on-spec, on-budget — backed by 15+ years of execution discipline."],
            [Clock, "Dedicated Support", "Real humans available when issues hit — not ticket queues that go silent."],
            [MessageSquare, "Transparent Communication", "Weekly reports, clear timelines, honest answers. No agency jargon."],
            [Layers, "Scalable Solutions", "Architected to grow with your business — from MVP to enterprise."],
            [Wrench, "Technical Expertise", "Senior engineers, not juniors. WordPress, Shopify, React, headless, custom."],
            [Heart, "Long-Term Partnership", "Our average client relationship is 4+ years. We're in it for the long run."],
          ].map(([Icon, title, desc]) => (
            <div key={title as string} className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="grid h-12 w-12 place-items-center rounded-xl mb-4" style={{ background: "var(--gradient-primary)" }}>
                {/* @ts-ignore */}
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title as string}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc as string}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section bg="muted">
        <SectionHeading
          eyebrow="Core Services"
          title="Everything your digital presence needs"
          subtitle="Eight integrated service lines — one accountable partner."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            [Code2, "Website Development", ["Custom websites", "Corporate sites", "Web applications", "Migrations"]],
            [Wrench, "Website Maintenance", ["Security updates", "Backups", "Bug fixes", "Monthly reports"]],
            [Layers, "WordPress Services", ["WooCommerce", "Custom plugins", "Speed", "Hardening"]],
            [ShoppingCart, "eCommerce Solutions", ["Shopify", "WooCommerce", "Magento", "CRO"]],
            [TrendingUp, "SEO & Growth", ["Technical SEO", "Local SEO", "Google Ads", "Meta Ads"]],
            [Gauge, "Performance & Security", ["Core Web Vitals", "Cloudflare", "Malware removal", "Audits"]],
            [Users2, "Dedicated Teams", ["Dedicated dev", "Senior engineer", "Project team", "Ongoing support"]],
            [Siren, "Emergency Support", ["Site down recovery", "Malware removal", "Critical fixes", "24/7"]],
          ].map(([Icon, title, items]) => (
            <Link to="/services" key={title as string} className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:-translate-y-1 transition-all" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="grid h-11 w-11 place-items-center rounded-lg mb-4 bg-primary/10">
                {/* @ts-ignore */}
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-base mb-3">{title as string}</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {(items as string[]).map((i) => (
                  <li key={i} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-primary/70" />{i}</li>
                ))}
              </ul>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                View service details <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* EMERGENCY RESPONSE TIMELINE */}
      <section className="relative overflow-hidden text-white" style={{ background: "linear-gradient(135deg, oklch(0.12 0.06 260) 0%, oklch(0.18 0.08 258) 50%, oklch(0.25 0.1 255) 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(80,160,255,0.3), transparent 45%), radial-gradient(circle at 20% 80%, rgba(60,130,255,0.2), transparent 40%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Headline */}
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-300">
              <Siren className="h-3 w-3" /> 24/7 Emergency Website Support
            </span>
            <h2 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
              Your business can't afford<br />
              <span className="text-red-400">downtime.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed">
              When your site goes down, every minute costs you leads, sales, and trust. Our emergency team responds fast and recovers faster.
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-2xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-cyan-500/20 shrink-0">
                  <Clock className="h-7 w-7 text-cyan-300" />
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-bold text-white">5<span className="text-lg font-semibold text-cyan-300 ml-1">MIN</span></div>
                  <div className="text-sm font-semibold text-slate-300 mt-0.5">RESPONSE</div>
                  <div className="text-xs text-slate-400">Chat, email or ticket — we reply within 5 minutes</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-cyan-500/20 shrink-0">
                  <Activity className="h-7 w-7 text-cyan-300" />
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-bold text-white">60<span className="text-lg font-semibold text-cyan-300 ml-1">MIN</span></div>
                  <div className="text-sm font-semibold text-slate-300 mt-0.5">RECOVERY</div>
                  <div className="text-xs text-slate-400">Website recovery initiated within 60 minutes</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-sm font-semibold">
            <Zap className="h-4 w-4" /> Fastest TAT in the industry
          </div>

          {/* Main content grid */}
          <div className="mt-14 grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Downtime costs */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6">Downtime costs you.</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  [TrendingDown, "Lost Leads", "Prospects bounce to competitors when your site is unreachable."],
                  [CartIcon, "Lost Sales", "Every hour offline is revenue walking out the door."],
                  [UserX, "Lost Customers", "Broken trust is harder to rebuild than a website."],
                  [AlertOctagon, "Damaged Reputation", "Search engines and visitors remember downtime."],
                ].map(([Icon, title, desc]) => (
                  <div key={title as string} className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                    <Icon className="h-6 w-6 text-red-400 mb-2" />
                    <div className="font-semibold text-sm">{title as string}</div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">{desc as string}</div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-slate-400 leading-relaxed">
                We act fast so your business stays protected and your revenue keeps flowing.
              </p>
            </div>

            {/* Right: Timeline */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-8">
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wide">Our Emergency Response Process</h3>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-px bg-cyan-500/30" />
                <div className="space-y-6">
                  {[
                    { time: "00:00", title: "Issue Reported", desc: "You reach out to us via chat, email or ticket.", icon: Mail },
                    { time: "05:00", title: "We Respond", desc: "Our team responds within 5 minutes, every time.", icon: MessageCircle },
                    { time: "15:00", title: "Engineer Assigned", desc: "A senior engineer reviews and starts working.", icon: Wrench },
                    { time: "60:00", title: "Recovery Underway", desc: "We bring your website back up and running.", icon: CheckCircle2 },
                  ].map((step) => (
                    <div key={step.title} className="relative flex items-start gap-5">
                      <div className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-cyan-500/20 border border-cyan-400/40 shrink-0">
                        <step.icon className="h-4 w-4 text-cyan-300" />
                      </div>
                      <div className="pt-0.5">
                        <div className="text-cyan-300 font-bold text-sm">{step.time}</div>
                        <div className="font-semibold text-white">{step.title}</div>
                        <div className="text-sm text-slate-400 mt-0.5">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final CTA within timeline card */}
              <div className="mt-6 rounded-xl bg-cyan-500/15 border border-cyan-400/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-cyan-500/30 shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Your site. Live again.</div>
                    <div className="text-cyan-300 font-semibold text-sm">Within 60 minutes.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom trust bar */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {[
                [Mail, "Email Response", "Within 5 minutes"],
                [MessageCircle, "Live Chat Response", "Within 5 minutes"],
                [Clock, "Website Recovery", "Started within 60 minutes"],
                [Users2, "Senior Engineers", "Handle every incident"],
                [Shield, "USA & Canada", "Full coverage"],
              ].map(([Icon, title, desc]) => (
                <div key={title as string}>
                  <Icon className="h-6 w-6 mx-auto text-slate-400 mb-2" />
                  <div className="text-xs font-semibold text-white uppercase tracking-wide">{title as string}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{desc as string}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <Section>
        <SectionHeading
          eyebrow="How We Work"
          title="A clear, proven 8-step process"
          subtitle="From discovery to ongoing growth — every engagement follows the same disciplined path."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Discovery","Audit","Planning","Development","Testing","Launch","Support","Growth"].map((s, i) => (
            <div key={s} className="p-5 rounded-xl border border-border bg-card relative">
              <div className="text-3xl font-bold text-primary/30">{String(i+1).padStart(2,"0")}</div>
              <div className="font-semibold mt-2">{s}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section bg="muted">
        <SectionHeading
          eyebrow="Industries"
          title="Deep experience across regulated & service industries"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            [Stethoscope, "Healthcare"],
            [Stethoscope, "Dental"],
            [Scale, "Legal"],
            [HomeIcon, "Real Estate"],
            [Hammer, "Construction"],
            [Wrench, "Home Services"],
            [Building2, "Finance"],
            [Calculator, "Accounting"],
            [Factory, "Manufacturing"],
            [ShoppingCart, "eCommerce"],
            [Briefcase, "Professional Services"],
            [Heart, "Nonprofits"],
          ].map(([Icon, label]) => (
            <Link to="/industries" key={label as string} className="p-5 rounded-xl bg-card border border-border hover:border-primary/40 text-center transition">
              {/* @ts-ignore */}
              <Icon className="h-6 w-6 mx-auto text-primary mb-2" />
              <div className="text-sm font-medium">{label as string}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* PRICING TEASER */}
      <Section>
        <SectionHeading
          eyebrow="Website Care Plans"
          title="Predictable monthly pricing"
          subtitle="USD pricing. Cancel anytime. All plans include monitoring, backups, and security."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            ["Starter", "$99", "/month", ["Daily backups","Security monitoring","Plugin updates","Email support"], false],
            ["Growth", "$249", "/month", ["Everything in Starter","2 hrs dev/month","Speed optimization","Priority support"], true],
            ["Business", "$499", "/month", ["Everything in Growth","6 hrs dev/month","Monthly reports","Same-day response"], false],
            ["Enterprise", "Custom", "", ["Dedicated team","SLA-backed","Custom integrations","24/7 support"], false],
          ].map(([name, price, per, feats, featured]) => (
            <div key={name as string} className={`p-6 rounded-2xl border ${featured ? "border-primary shadow-lg" : "border-border"} bg-card flex flex-col`} style={featured ? { boxShadow: "var(--shadow-elegant)" } : {}}>
              {featured && <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Most Popular</div>}
              <div className="text-lg font-semibold">{name as string}</div>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-bold">{price as string}</span>
                <span className="text-sm text-muted-foreground mb-1">{per as string}</span>
              </div>
              <ul className="mt-5 space-y-2 text-sm flex-1">
                {(feats as string[]).map((f) => (
                  <li key={f} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{f}</li>
                ))}
              </ul>
              <Link to="/pricing" className={`mt-6 text-center py-2.5 rounded-md text-sm font-semibold ${featured ? "text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`} style={featured ? { background: "var(--gradient-primary)" } : {}}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* DEDICATED DEVS */}
      <Section bg="navy">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Dedicated Teams</span>
            <h2 className="mt-3 text-3xl lg:text-5xl font-bold text-white leading-tight">
              Get a dedicated technology team — without hiring full-time.
            </h2>
            <p className="mt-4 text-slate-300 max-w-xl">
              Scale your engineering capacity with senior, vetted developers who operate as
              an extension of your team. Start in days, not months.
            </p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-md bg-white text-primary font-semibold hover:bg-slate-100 transition">
              Hire a Dedicated Developer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4">
            {[
              ["Dedicated Developer", "Starting at $1,499/month", "Full-time senior dev embedded in your stack."],
              ["Senior Developer", "Starting at $2,499/month", "Lead-level engineer for complex builds."],
              ["Development Team", "Custom pricing", "PM + designers + engineers ready to ship."],
            ].map(([t, p, d]) => (
              <div key={t} className="p-5 rounded-xl border border-white/15 bg-white/5 backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-semibold text-white">{t}</div>
                  <div className="text-cyan-300 text-sm font-semibold">{p}</div>
                </div>
                <p className="text-sm text-slate-300 mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <SectionHeading eyebrow="Client Voices" title="Trusted by businesses across North America" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["WebCentauri rebuilt our site in 6 weeks — bookings up 38% in the first quarter.","Dr. Allison R.","Dental Practice, Toronto"],
            ["They saved us when our store went down on Black Friday. Back online in 47 minutes.","Marcus L.","eCommerce Founder, Austin"],
            ["We replaced a 4-person agency with one WebCentauri retainer. Better, faster, cheaper.","Priya S.","Marketing Director, Boston"],
          ].map(([q, n, r]) => (
            <div key={n} className="p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex gap-0.5 mb-3 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-foreground leading-relaxed">"{q}"</p>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="font-semibold text-sm">{n}</div>
                <div className="text-xs text-muted-foreground">{r}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* EMERGENCY */}
      <section className="bg-red-950/95 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/30 text-red-200 text-xs font-semibold uppercase tracking-wider">
              <Siren className="h-3 w-3" /> 24/7 Emergency Response
            </div>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold">Website down? Hacked? Critical bug?</h2>
            <p className="mt-3 text-red-100/80 max-w-lg">
              Our emergency team responds in under 60 minutes — including weekends.
              Get your site recovered, secured, and back to business.
            </p>
          </div>
          <Link to="/contact" className="lg:justify-self-end inline-flex items-center gap-2 px-8 py-4 rounded-md bg-white text-red-700 font-bold text-lg hover:bg-red-50 transition">
            <Siren className="h-5 w-5" /> Request Emergency Support
          </Link>
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
