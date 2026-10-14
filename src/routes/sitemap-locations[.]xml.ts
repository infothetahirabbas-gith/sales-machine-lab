import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { LOCATIONS } from "../lib/locations-industries";

const BASE_URL = "https://beingecom.com";

export const Route = createFileRoute("/sitemap-locations.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls: string[] = [
          `  <url>\n    <loc>${BASE_URL}/locations</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`,
          `  <url>\n    <loc>${BASE_URL}/locations/regions/scotland</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
          `  <url>\n    <loc>${BASE_URL}/locations/regions/yorkshire</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
        ];
        for (const loc of LOCATIONS) {
          urls.push(
            `  <url>\n    <loc>${BASE_URL}/locations/${loc.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.75</priority>\n  </url>`,
          );
        }
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
