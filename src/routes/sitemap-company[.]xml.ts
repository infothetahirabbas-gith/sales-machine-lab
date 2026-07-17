import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { COMPANY_LINKS } from "@/config/company";

const BASE_URL = "https://beingecom.com";

const extras = ["/accessibility", "/disclaimer", "/gdpr"];

export const Route = createFileRoute("/sitemap-company.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Exclude /company/founder: it renders the same component as /founder
        // and its canonical points to /founder, so listing it here duplicates
        // the canonical target in the sitemap.
        const paths: string[] = [
          "/company",
          ...COMPANY_LINKS.filter((c) => !c.external && c.to !== "/company/founder").map((c) => c.to),
          ...extras,
        ];
        const urls = paths.map(
          (p) =>
            `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${p === "/company" ? "0.9" : "0.7"}</priority>\n  </url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
            "X-Robots-Tag": "index, follow",
          },
        });
      },
    },
  },
});
