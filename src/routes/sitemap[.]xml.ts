import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://beingecom.com";

const children = [
  { loc: `${BASE_URL}/sitemap-pages.xml` },
  { loc: `${BASE_URL}/sitemap-services.xml` },
  { loc: `${BASE_URL}/sitemap-locations.xml` },
  { loc: `${BASE_URL}/sitemap-industries.xml` },
  { loc: `${BASE_URL}/sitemap-case-studies.xml` },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const body = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...children.map(
            (c) => `  <sitemap>\n    <loc>${c.loc}</loc>\n  </sitemap>`,
          ),
          `</sitemapindex>`,
        ].join("\n");

        return new Response(body, {
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
