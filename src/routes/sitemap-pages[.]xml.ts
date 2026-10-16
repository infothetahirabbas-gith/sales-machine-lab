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

  { path: "/hub", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/shopify-growth", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/woocommerce-growth", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/ecommerce-seo", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/paid-media", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/cro", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/ai-automation", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/email-marketing", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/analytics-tracking", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/ecommerce-strategy", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/ecommerce-operations", changefreq: "weekly", priority: "0.9" },
  { path: "/hub/customer-retention", changefreq: "weekly", priority: "0.9" },
  { path: "/compare", changefreq: "weekly", priority: "0.8" },
  { path: "/compare/shopify-agency-vs-freelancer", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/seo-vs-paid-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/meta-ads-vs-google-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/klaviyo-vs-mailchimp", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/ai-automation-vs-manual-marketing", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/shopify-plus-vs-bigcommerce", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/in-house-vs-agency", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/ga4-vs-shopify-analytics", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/tiktok-ads-vs-meta-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/headless-vs-shopify-theme", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/beingecom-vs-social-shepherd", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/beingecom-vs-eastside-co", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/beingecom-vs-croud", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/beingecom-vs-genie-goals", changefreq: "monthly", priority: "0.8" },
  { path: "/compare/beingecom-vs-common-thread-collective", changefreq: "monthly", priority: "0.8" },
  { path: "/who-we-help", changefreq: "monthly", priority: "0.9" },
  { path: "/research", changefreq: "monthly", priority: "0.7" },
  { path: "/founder-notes", changefreq: "monthly", priority: "0.8" },
  { path: "/tools", changefreq: "monthly", priority: "0.8" },
  { path: "/tools/roas-calculator", changefreq: "monthly", priority: "0.8" },
  { path: "/tools/cac-calculator", changefreq: "monthly", priority: "0.8" },
  { path: "/tools/ltv-calculator", changefreq: "monthly", priority: "0.8" },
  { path: "/tools/profit-margin-calculator", changefreq: "monthly", priority: "0.8" },
  { path: "/tools/break-even-calculator", changefreq: "monthly", priority: "0.8" },
  { path: "/tools/shopify-seo-checklist", changefreq: "monthly", priority: "0.9" },
  { path: "/about/tahir-abbas", changefreq: "monthly", priority: "0.8" },
  { path: "/methodology", changefreq: "monthly", priority: "0.9" },
  { path: "/benchmarks", changefreq: "monthly", priority: "0.8" },
  { path: "/benchmarks/ecommerce-conversion-rates", changefreq: "monthly", priority: "0.8" },
  { path: "/benchmarks/paid-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/benchmarks/email-marketing", changefreq: "monthly", priority: "0.8" },
  { path: "/clients", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/academy", changefreq: "weekly", priority: "0.9" },
  { path: "/ecommerce-revenue-optimisation", changefreq: "monthly", priority: "0.9" },
  { path: "/ecommerce-migration-seo", changefreq: "monthly", priority: "0.9" },
  { path: "/ecommerce-analytics", changefreq: "monthly", priority: "0.8" },
  { path: "/ai-ecommerce-growth", changefreq: "monthly", priority: "0.9" },
  { path: "/partners", changefreq: "monthly", priority: "0.8" },
  { path: "/why-beingecom", changefreq: "monthly", priority: "0.9" },
  { path: "/customer-journey", changefreq: "monthly", priority: "0.8" },
  { path: "/how-long-does-ecommerce-seo-take", changefreq: "monthly", priority: "0.9" },
  { path: "/how-much-does-ecommerce-seo-cost", changefreq: "monthly", priority: "0.9" },
  { path: "/is-seo-worth-it-for-ecommerce", changefreq: "monthly", priority: "0.9" },
  { path: "/shopify-seo-agency-uk", changefreq: "monthly", priority: "0.9" },
  { path: "/woocommerce-seo-agency-uk", changefreq: "monthly", priority: "0.9" },
  { path: "/for-founders", changefreq: "monthly", priority: "0.8" },
  { path: "/for-marketing-managers", changefreq: "monthly", priority: "0.8" },
  { path: "/for-ecommerce-teams", changefreq: "monthly", priority: "0.8" },
  { path: "/for-enterprise-brands", changefreq: "monthly", priority: "0.8" },
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
