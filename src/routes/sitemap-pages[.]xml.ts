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
  { path: "/blog/uk-ecommerce-seo-playbook-shopify", changefreq: "monthly", priority: "0.9" },
  { path: "/blog/shopify-duplicate-content-faceted-urls", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/shopify-product-page-seo-uk", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/shopify-collection-page-seo", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/shopify-plus-technical-seo-checklist", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/local-seo-multi-location-uk-ecommerce", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/uk-dtc-paid-media-playbook", changefreq: "monthly", priority: "0.9" },
  { path: "/blog/meta-ads-creative-testing-uk-dtc", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/google-shopping-feed-optimisation-shopify-uk", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/tiktok-ads-uk-beauty-fashion-brands", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/ios17-attribution-uk-ecommerce", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/mer-vs-roas-uk-dtc-founders", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/uk-ecommerce-cro-playbook-shopify", changefreq: "monthly", priority: "0.9" },
  { path: "/blog/pdp-cro-14-tests-that-move-revenue", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/cart-checkout-cro-shopify-uk", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/mobile-cro-fixing-mobile-dropoff", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/site-search-cro-uk-ecommerce", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/trust-signals-that-convert-uk-shoppers", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/uk-ecommerce-email-retention-klaviyo", changefreq: "monthly", priority: "0.9" },
  { path: "/blog/klaviyo-welcome-flow-uk-dtc-template", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/abandoned-cart-flows-that-recover-15-percent", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/post-purchase-flows-for-repeat-revenue", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/winback-flows-for-lapsed-uk-customers", changefreq: "monthly", priority: "0.8" },
  { path: "/blog/sms-email-uk-compliance-safe-combo", changefreq: "monthly", priority: "0.8" },

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
  { path: "/compare/shopify-vs-woocommerce", changefreq: "monthly", priority: "0.8" },
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
  { path: "/research", changefreq: "monthly", priority: "0.7" },
  { path: "/tools", changefreq: "monthly", priority: "0.8" },
  { path: "/tools/roas-calculator", changefreq: "monthly", priority: "0.8" },
  { path: "/tools/cac-calculator", changefreq: "monthly", priority: "0.8" },
  { path: "/tools/ltv-calculator", changefreq: "monthly", priority: "0.8" },
  { path: "/tools/profit-margin-calculator", changefreq: "monthly", priority: "0.8" },
  { path: "/tools/break-even-calculator", changefreq: "monthly", priority: "0.8" },
  { path: "/author/tahir-abbas", changefreq: "monthly", priority: "0.8" },
  { path: "/about/tahir-abbas", changefreq: "monthly", priority: "0.8" },
  { path: "/methodology", changefreq: "monthly", priority: "0.9" },
  { path: "/benchmarks", changefreq: "monthly", priority: "0.8" },
  { path: "/benchmarks/ecommerce-conversion-rates", changefreq: "monthly", priority: "0.8" },
  { path: "/benchmarks/paid-ads", changefreq: "monthly", priority: "0.8" },
  { path: "/benchmarks/email-marketing", changefreq: "monthly", priority: "0.8" },
  { path: "/clients", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap-pages.xml")({
  server: {
    handlers: {
      GET: async () => {
        const LASTMOD = "2026-07-22";
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            `    <lastmod>${LASTMOD}</lastmod>`,
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
