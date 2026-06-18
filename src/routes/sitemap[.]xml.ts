import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { LOCATIONS } from "@/content/locations";
import { SERVICES } from "@/content/services";
import { KEYWORDS } from "@/content/keywords";

const BASE_URL = "https://centauri-web-guild.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const servicePaths: string[] = [];
        for (const hub of SERVICES) {
          servicePaths.push(`/services/${hub.slug}`);
          for (const child of hub.children) {
            servicePaths.push(`/services/${hub.slug}/${child.slug}`);
          }
        }
        const keywordPaths: string[] = [];
        for (const kw of KEYWORDS) {
          keywordPaths.push(`/${kw.slug}`);
          for (const c of LOCATIONS) {
            keywordPaths.push(`/${kw.slug}/${c.slug}`);
          }
        }
        const paths = [
          "/", "/services", "/industries", "/locations", "/pricing",
          "/case-studies", "/resources", "/about", "/contact",
          ...servicePaths,
          ...LOCATIONS.map((c) => `/locations/${c.slug}`),
          ...keywordPaths,
        ];
        const urls = paths.map((p) =>
          `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});