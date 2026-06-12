import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Link
        to="/contact"
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 px-4 py-3 rounded-full text-sm font-semibold text-primary-foreground shadow-lg hover:scale-105 transition"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
      >
        <AlertTriangle className="h-4 w-4" /> Emergency Support
      </Link>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden text-white" style={{ background: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(120,180,255,0.25), transparent 40%), radial-gradient(circle at 80% 70%, rgba(80,140,255,0.25), transparent 40%)" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {eyebrow && (
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-300 mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold max-w-4xl leading-[1.05]">{title}</h1>
        {subtitle && <p className="mt-6 max-w-2xl text-lg text-slate-300">{subtitle}</p>}
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
  bg,
}: {
  children: ReactNode;
  className?: string;
  bg?: "muted" | "white" | "navy";
}) {
  const bgClass =
    bg === "muted" ? "bg-secondary" : bg === "navy" ? "text-white" : "bg-background";
  const style = bg === "navy" ? { background: "var(--gradient-hero)" } : undefined;
  return (
    <section className={`${bgClass} ${className}`} style={style}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-12`}>
      {eyebrow && (
        <span className={`inline-block text-xs font-semibold uppercase tracking-widest mb-3 ${light ? "text-cyan-300" : "text-primary"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${light ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg ${light ? "text-slate-300" : "text-muted-foreground"}`}>{subtitle}</p>
      )}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="text-white" style={{ background: "var(--gradient-hero)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-3xl lg:text-4xl font-bold max-w-2xl">
            Ready to make your website a reliable growth engine?
          </h3>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Book a free 30-minute consultation. We'll audit your site, identify wins, and map out a clear plan.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link to="/contact" className="px-6 py-3 rounded-md font-semibold bg-white text-primary hover:bg-slate-100 transition">
            Book Consultation
          </Link>
          <Link to="/contact" className="px-6 py-3 rounded-md font-semibold border border-white/30 hover:bg-white/10 transition">
            Request Audit
          </Link>
        </div>
      </div>
    </section>
  );
}