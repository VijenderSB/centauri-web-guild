import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/pricing", label: "Pricing" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
            <Zap className="h-5 w-5 text-primary-foreground" />
          </span>
          <span>WebCentauri</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-secondary transition-colors"
              activeProps={{ className: "px-3 py-2 text-sm font-medium text-foreground rounded-md bg-secondary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/contact" className="px-4 py-2 text-sm font-semibold rounded-md text-foreground hover:bg-secondary transition">
            Emergency Support
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 text-sm font-semibold rounded-md text-primary-foreground shadow-sm transition hover:opacity-90"
            style={{ background: "var(--gradient-primary)" }}
          >
            Book Consultation
          </Link>
        </div>
        <button className="lg:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary">
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 px-3 py-2 rounded-md text-sm font-semibold text-primary-foreground text-center" style={{ background: "var(--gradient-primary)" }}>
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}