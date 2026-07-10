import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://beingecom.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/case-studies", changefreq: "weekly", priority: "0.9" },
  { path: "/audit", changefreq: "monthly", priority: "0.9" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/glossary", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.9" },
  { path: "/blog/shopify-vs-woocommerce-uk", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/shopify-plus-migration-uk", changefreq: "monthly", priority: "0.8" },
  { path: "/hub", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/shopify-growth", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/woocommerce-growth", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/ecommerce-seo", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/paid-media", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/cro", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/ai-automation", changefreq: "weekly", priority: "0.9" },
  { path: "/compare", changefreq: "weekly", priority: "0.8" },
  { path: "/compare/shopify-vs-woocommerce", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/shopify-agency-vs-freelancer", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/seo-vs-paid-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/meta-ads-vs-google-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/klaviyo-vs-mailchimp", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/ai-automation-vs-manual-marketing", changefreq: "monthly", priority: "0.8" },
  { path: "/research", changefreq: "monthly", priority: "0.7" },
  { path: "/author/tahir-abbas", changefreq: "monthly", priority: "0.8" },
  { path: "/clients", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap-pages.xml")({
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
            "X-Robots-Tag": "index, follow",
          },
        });
      },
    },
  },
});
