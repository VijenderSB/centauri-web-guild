import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { US_CITIES, CA_CITIES } from "@/content/locations";
import { MapPin, ArrowRight, Flag } from "lucide-react";

const TITLE = "Web Design, SEO & Support Across USA & Canada | WebCentauri";
const DESC = "Local website design, SEO, and ongoing technical support for businesses in every major US state and Canadian province. Find your city.";
const URL = "https://www.webcentauri.com/locations";

export const Route = createFileRoute("/locations/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: LocationsIndex,
});

function LocationsIndex() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Locations"
        title="Serving prominent cities across the USA & Canada"
        subtitle="Local context, local search, local accountability — backed by a senior North American team. Pick your city to see how we help businesses near you."
      />

      <Section>
        <SectionHeading
          eyebrow="USA"
          title="United States city landing pages"
          subtitle="From New York to Los Angeles, we partner with US businesses on web, SEO, and long-term technical support."
        />
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Flag className="h-4 w-4 text-primary" /> {US_CITIES.length} US cities covered
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {US_CITIES.map((c) => (
            <Link
              key={c.slug}
              to="/locations/$slug"
              params={{ slug: c.slug }}
              className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/50 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h2 className="font-semibold group-hover:text-primary">{c.city}, {c.regionCode}</h2>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{c.metro} · {c.region}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
              </div>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section bg="muted">
        <SectionHeading
          eyebrow="Canada"
          title="Canadian city landing pages"
          subtitle="Bilingual-friendly, accessibility-aware websites for Canadian businesses from Vancouver to St. John's."
        />
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Flag className="h-4 w-4 text-primary" /> {CA_CITIES.length} Canadian cities covered
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CA_CITIES.map((c) => (
            <Link
              key={c.slug}
              to="/locations/$slug"
              params={{ slug: c.slug }}
              className="group p-5 rounded-2xl border border-border bg-card hover:border-primary/50 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h2 className="font-semibold group-hover:text-primary">{c.city}, {c.regionCode}</h2>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{c.metro} · {c.region}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
              </div>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand />
    </PageShell>
  );
}