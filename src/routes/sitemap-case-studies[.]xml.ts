import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://beingecom.com";

// Case study IDs mirror the entries in src/routes/case-studies.index.tsx.
// Keep in sync when studies are added or removed.
const IDS: string[] = [
  ...Array.from({ length: 15 }, (_, i) => `a${i + 1}`),
  ...Array.from({ length: 16 }, (_, i) => `s${i + 1}`),
  ...Array.from({ length: 12 }, (_, i) => `c${i + 1}`),
  ...Array.from({ length: 10 }, (_, i) => `w${i + 1}`),
];

export const Route = createFileRoute("/sitemap-case-studies.xml")({
  server: {
    handlers: {
      GET: async () => {
        const LASTMOD = "2026-07-22";
        const urls: string[] = [
          `  <url>\n    <loc>${BASE_URL}/case-studies</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>`,
          ...IDS.map(
            (id) =>
              `  <url>\n    <loc>${BASE_URL}/case-studies/${id}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
          ),
        ];
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
