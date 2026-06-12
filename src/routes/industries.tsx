import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, CtaBand } from "@/components/site/PageShell";
import { Stethoscope, Scale, Building2, Hammer, Calculator, Factory, Briefcase, HomeIcon, ShoppingCart, Heart, Wrench, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — Healthcare, Legal, eCommerce, Real Estate & More | WebCentauri" },
      { name: "description", content: "Specialized web, SEO, and support solutions for healthcare, dental, legal, real estate, construction, eCommerce, accounting, manufacturing and more across USA & Canada." },
      { property: "og:title", content: "Industries — WebCentauri" },
      { property: "og:description", content: "Deep experience across regulated and service industries." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

const INDUSTRIES = [
  [Stethoscope, "Healthcare", "HIPAA-aware sites for clinics, hospitals, and providers."],
  [Stethoscope, "Dental", "Booking-optimized dental practice websites + local SEO."],
  [Scale, "Legal", "Authoritative law firm websites with practice-area depth."],
  [HomeIcon, "Real Estate", "IDX-ready agent and brokerage sites that convert leads."],
  [Hammer, "Construction", "Portfolio-driven sites for contractors and builders."],
  [Wrench, "Home Services", "Local SEO and lead-gen for plumbers, HVAC, electricians."],
  [Building2, "Finance", "Compliant, trustworthy sites for advisors and firms."],
  [Calculator, "Accounting", "Client-portal-ready websites for CPAs and bookkeepers."],
  [Factory, "Manufacturing", "B2B websites with deep product and capability content."],
  [ShoppingCart, "eCommerce", "Shopify and WooCommerce stores built to scale."],
  [Briefcase, "Professional Services", "Lead-gen sites for agencies, consultants, coaches."],
  [Heart, "Nonprofits", "Donation-ready websites for mission-driven orgs."],
] as const;

function IndustriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Industries"
        title="Deep expertise across the industries we serve."
        subtitle="500+ projects across regulated, service, retail, and B2B verticals — we speak your industry's language."
      />
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map(([Icon, name, desc]) => (
            <Link to="/contact" key={name as string} className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="grid h-12 w-12 place-items-center rounded-xl mb-4 bg-primary/10">
                {/* @ts-ignore */}
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{name as string}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc as string}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                Explore solutions <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </PageShell>
  );
}