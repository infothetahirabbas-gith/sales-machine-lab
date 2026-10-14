import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://beingecom.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/services/store-development", changefreq: "monthly", priority: "0.8" },
  { path: "/services/cro", changefreq: "monthly", priority: "0.8" },
  { path: "/services/performance-marketing", changefreq: "monthly", priority: "0.85" },
  { path: "/services/performance-marketing/facebook-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/services/performance-marketing/google-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/services/performance-marketing/tiktok-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/services/performance-marketing/media-buying", changefreq: "monthly", priority: "0.8" },
  { path: "/services/performance-marketing/instagram-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/services/performance-marketing/youtube-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/services/seo", changefreq: "monthly", priority: "0.8" },
  { path: "/services/seo/on-page", changefreq: "monthly", priority: "0.75" },
  { path: "/services/seo/off-page", changefreq: "monthly", priority: "0.75" },
  { path: "/services/seo/technical", changefreq: "monthly", priority: "0.75" },
  { path: "/services/seo/local", changefreq: "monthly", priority: "0.75" },
  { path: "/services/seo/international", changefreq: "monthly", priority: "0.75" },
  { path: "/services/seo/aeo", changefreq: "monthly", priority: "0.75" },
  { path: "/services/store-development/shopify", changefreq: "monthly", priority: "0.8" },
  { path: "/services/store-development/woocommerce", changefreq: "monthly", priority: "0.8" },
  { path: "/services/email-sms", changefreq: "monthly", priority: "0.8" },
  { path: "/services/creative", changefreq: "monthly", priority: "0.8" },
  { path: "/services/funnel", changefreq: "monthly", priority: "0.8" },
  { path: "/services/analytics", changefreq: "monthly", priority: "0.8" },
  { path: "/services/scaling", changefreq: "monthly", priority: "0.8" },
  { path: "/services/ai-automation", changefreq: "monthly", priority: "0.85" },
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
            "X-Robots-Tag": "index, follow",
          },
        });
      },
    },
  },
});
