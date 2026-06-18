import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Zap, ChevronDown, Siren, Phone, Mail } from "lucide-react";
import { SERVICES } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";

type Mega =
  | { kind: "services" }
  | { kind: "industries" }
  | { kind: "resources" }
  | { kind: "company" };

const SIMPLE_LINKS = [
  { to: "/pricing", label: "Pricing" },
  { to: "/locations", label: "Locations" },
  { to: "/case-studies", label: "Case Studies" },
] as const;

const RESOURCES = [
  { to: "/resources", title: "Resource Hub", desc: "All guides, blog posts, and tools." },
  { to: "/resources/website-maintenance-checklist", title: "Maintenance Checklist", desc: "Daily, weekly, monthly playbook." },
  { to: "/resources", title: "Blog & Insights", desc: "Web, SEO, security perspectives." },
  { to: "/resources", title: "FAQ", desc: "30 questions we're asked the most." },
] as const;

const COMPANY = [
  { to: "/about", title: "About WebCentauri", desc: "Who we are and what we stand for." },
  { to: "/case-studies", title: "Case Studies", desc: "Real outcomes for real clients." },
  { to: "/contact", title: "Contact", desc: "Talk to a senior strategist." },
  { to: "/contact", title: "Careers", desc: "Join the team." },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState<Mega["kind"] | null>(null);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md"
      onMouseLeave={() => setOpen(null)}
    >
      {/* Top utility bar */}
      <div className="hidden lg:block border-b border-border/60 bg-secondary/50 text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3" /> +1 (888) 555-0123</span>
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3 w-3" /> support@webcentauri.com</span>
            <span>USA · UK · Australia · Canada · India</span>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            <Siren className="h-3 w-3" /> 24/7 Emergency Support
          </Link>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
            <Zap className="h-5 w-5 text-primary-foreground" />
          </span>
          <span>WebCentauri</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/" className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-secondary" activeProps={{ className: "px-3 py-2 text-sm font-medium text-foreground rounded-md bg-secondary" }} activeOptions={{ exact: true }}>
            Home
          </Link>
          <TopButton label="Services" active={open === "services"} onEnter={() => setOpen("services")} />
          <TopButton label="Industries" active={open === "industries"} onEnter={() => setOpen("industries")} />
          {SIMPLE_LINKS.map((l) => (
            <Link key={l.to} to={l.to} onMouseEnter={() => setOpen(null)} className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-secondary" activeProps={{ className: "px-3 py-2 text-sm font-medium text-foreground rounded-md bg-secondary" }}>
              {l.label}
            </Link>
          ))}
          <TopButton label="Resources" active={open === "resources"} onEnter={() => setOpen("resources")} />
          <TopButton label="Company" active={open === "company"} onEnter={() => setOpen("company")} />
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link to="/contact" className="px-4 py-2 text-sm font-semibold rounded-md text-foreground hover:bg-secondary transition">
            Free Audit
          </Link>
          <Link to="/contact" className="px-4 py-2 text-sm font-semibold rounded-md text-primary-foreground shadow-sm transition hover:opacity-90" style={{ background: "var(--gradient-primary)" }}>
            Book Consultation
          </Link>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mega-menu panels */}
      {open && (
        <div className="hidden lg:block absolute inset-x-0 top-full border-t border-border bg-background shadow-xl" onMouseEnter={() => setOpen(open)}>
          <div className="mx-auto max-w-7xl px-6 py-8">
            {open === "services" && <ServicesMega close={() => setOpen(null)} />}
            {open === "industries" && <IndustriesMega close={() => setOpen(null)} />}
            {open === "resources" && <SimpleMega items={RESOURCES} close={() => setOpen(null)} title="Resources" />}
            {open === "company" && <SimpleMega items={COMPANY} close={() => setOpen(null)} title="Company" />}
          </div>
        </div>
      )}

      {/* Mobile */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">Home</Link>
            <MobileGroup label="Services">
              {SERVICES.map((s) => (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm hover:bg-secondary">
                  {s.title}
                </Link>
              ))}
              <Link to="/services" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm font-semibold text-primary">View all services →</Link>
            </MobileGroup>
            <MobileGroup label="Industries">
              {INDUSTRIES.map((i) => (
                <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }} onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm hover:bg-secondary">
                  {i.name}
                </Link>
              ))}
              <Link to="/industries" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm font-semibold text-primary">View all industries →</Link>
            </MobileGroup>
            <Link to="/pricing" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">Pricing</Link>
            <Link to="/case-studies" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">Case Studies</Link>
            <Link to="/resources" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">Resources</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">Contact</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="mt-2 px-3 py-2 rounded-md text-sm font-semibold text-primary-foreground text-center" style={{ background: "var(--gradient-primary)" }}>
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function TopButton({ label, active, onEnter }: { label: string; active: boolean; onEnter: () => void }) {
  return (
    <button
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition ${active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
      aria-expanded={active}
    >
      {label}
      <ChevronDown className={`h-3.5 w-3.5 transition ${active ? "rotate-180" : ""}`} />
    </button>
  );
}

function ServicesMega({ close }: { close: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-9 grid grid-cols-2 gap-x-6 gap-y-3">
        {SERVICES.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} onClick={close} className="group flex gap-3 p-3 rounded-lg hover:bg-secondary transition">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm group-hover:text-primary">{s.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.short}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="col-span-3 rounded-xl p-5 text-white" style={{ background: "var(--gradient-hero)" }}>
        <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300">Free</div>
        <div className="mt-1 text-lg font-bold leading-snug">Get a Free Website Audit</div>
        <p className="mt-2 text-sm text-slate-300">SEO, performance, security & UX — actionable findings in 48 hours.</p>
        <Link to="/contact" onClick={close} className="mt-4 inline-flex px-3 py-2 rounded-md text-xs font-semibold bg-white text-primary">
          Request audit →
        </Link>
      </div>
    </div>
  );
}

function IndustriesMega({ close }: { close: () => void }) {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-9 grid grid-cols-3 gap-x-6 gap-y-2">
        {INDUSTRIES.map((i) => {
          const Icon = i.icon;
          return (
            <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }} onClick={close} className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary transition">
              <Icon className="h-5 w-5 text-primary shrink-0" />
              <div>
                <div className="font-semibold text-sm group-hover:text-primary">{i.name}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{i.tagline}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="col-span-3 rounded-xl border border-border p-5 bg-secondary/40">
        <div className="text-xs font-semibold uppercase tracking-widest text-primary">All Verticals</div>
        <div className="mt-1 font-bold">Don't see your industry?</div>
        <p className="mt-2 text-sm text-muted-foreground">We work across 30+ industries — talk to us about yours.</p>
        <Link to="/contact" onClick={close} className="mt-4 inline-flex text-sm font-semibold text-primary">
          Get in touch →
        </Link>
      </div>
    </div>
  );
}

function SimpleMega({ items, close, title }: { items: ReadonlyArray<{ to: string; title: string; desc: string }>; close: () => void; title: string }) {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-9 grid grid-cols-2 gap-4">
        {items.map((it) => (
          <Link key={it.title} to={it.to} onClick={close} className="group p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-secondary transition">
            <div className="font-semibold text-sm group-hover:text-primary">{it.title}</div>
            <div className="text-xs text-muted-foreground mt-1">{it.desc}</div>
          </Link>
        ))}
      </div>
      <div className="col-span-3 rounded-xl p-5 border border-border bg-secondary/40">
        <div className="text-xs font-semibold uppercase tracking-widest text-primary">{title}</div>
        <div className="mt-1 font-bold">Need something specific?</div>
        <p className="mt-2 text-sm text-muted-foreground">Our team responds within one business hour.</p>
        <Link to="/contact" onClick={close} className="mt-4 inline-flex text-sm font-semibold text-primary">
          Contact us →
        </Link>
      </div>
    </div>
  );
}

function MobileGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/60 last:border-0">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold">
        {label}
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pl-3 pb-2 flex flex-col">{children}</div>}
    </div>
  );
}