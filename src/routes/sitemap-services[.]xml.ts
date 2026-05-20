import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://sales-machine-lab.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/services/store-development", changefreq: "monthly", priority: "0.8" },
  { path: "/services/cro", changefreq: "monthly", priority: "0.8" },
  { path: "/services/paid-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/services/seo", changefreq: "monthly", priority: "0.8" },
  { path: "/services/email-sms", changefreq: "monthly", priority: "0.8" },
  { path: "/services/creative", changefreq: "monthly", priority: "0.8" },
  { path: "/services/funnel", changefreq: "monthly", priority: "0.8" },
  { path: "/services/analytics", changefreq: "monthly", priority: "0.8" },
  { path: "/services/scaling", changefreq: "monthly", priority: "0.8" },
];

export const Route = createFileRoute("/sitemap-services.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
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
          },
        });
      },
    },
  },
});
