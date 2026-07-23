// Attaches contextual internal links to each FAQ answer by keyword-matching
// against a per-page link pool. Used to strengthen internal linking from
// service pages out to relevant industries, case studies and tools.

import type { FAQ, FAQLink } from "./seo";

export type FAQLinkRule = FAQLink & { match: string[] };

/**
 * For every FAQ, scan its question+answer for keyword matches and attach up
 * to `maxPerFaq` unique internal links from the pool. Order in the pool acts
 * as priority when a FAQ triggers multiple rules.
 */
export function linkFaqs(
  faqs: FAQ[],
  pool: FAQLinkRule[],
  maxPerFaq = 2,
): FAQ[] {
  return faqs.map((f) => {
    const hay = `${f.q} ${f.a}`.toLowerCase();
    const picked: FAQLink[] = [];
    const seen = new Set<string>();
    for (const rule of pool) {
      if (picked.length >= maxPerFaq) break;
      if (seen.has(rule.to)) continue;
      if (rule.match.some((k) => hay.includes(k.toLowerCase()))) {
        picked.push({ label: rule.label, to: rule.to });
        seen.add(rule.to);
      }
    }
    return picked.length > 0 ? { ...f, links: picked } : f;
  });
}

// ---- Shared pools ------------------------------------------------------

/** Links available on every service page (industries index, audit, pricing). */
export const BASE_POOL: FAQLinkRule[] = [
  { label: "Free Growth Audit", to: "/audit", match: ["audit", "free 30", "review"] },
  { label: "See pricing", to: "/pricing", match: ["price", "pricing", "budget", "retainer", "cost", "contract"] },
  { label: "Case studies", to: "/case-studies", match: ["result", "case stud", "example", "proof", "client"] },
  { label: "Industries we serve", to: "/industries", match: ["industry", "vertical", "beauty", "fashion", "supplement", "homeware", "wellness", "food & drink"] },
  { label: "Our methodology", to: "/methodology", match: ["method", "process", "how do you", "framework", "growth system"] },
];

/** Industry destinations for keyword-linking. */
export const INDUSTRY_LINKS: FAQLinkRule[] = [
  { label: "Fashion & apparel", to: "/industries/fashion-apparel", match: ["fashion", "apparel", "clothing"] },
  { label: "Beauty & personal care", to: "/industries/beauty-personal-care", match: ["beauty", "cosmetic", "skincare", "personal care"] },
  { label: "Health & wellness", to: "/industries/health-wellness", match: ["wellness", "supplement", "health"] },
  { label: "Home & garden", to: "/industries/home-garden", match: ["homeware", "home &", "garden"] },
  { label: "Food & beverage", to: "/industries/food-beverage", match: ["food", "beverage", "drink"] },
  { label: "Electronics & tech", to: "/industries/electronics-technology", match: ["electronic", "gadget", "tech"] },
  { label: "Sports & fitness", to: "/industries/sports-fitness", match: ["sport", "fitness"] },
  { label: "Furniture & interiors", to: "/industries/furniture-interiors", match: ["furniture", "interior"] },
  { label: "Jewellery & watches", to: "/industries/jewellery-watches", match: ["jewel", "watch", "luxury"] },
  { label: "Baby & kids", to: "/industries/baby-kids", match: ["baby", "kids", "children"] },
  { label: "Pets & supplies", to: "/industries/pets-supplies", match: ["pet"] },
];

/** Tool destinations. */
export const TOOL_LINKS: FAQLinkRule[] = [
  { label: "ROAS calculator", to: "/tools/roas-calculator", match: ["roas", "return on ad spend", "mer"] },
  { label: "CAC calculator", to: "/tools/cac-calculator", match: ["cac", "customer acquisition", "acquisition cost"] },
  { label: "LTV calculator", to: "/tools/ltv-calculator", match: ["ltv", "lifetime value", "cohort", "payback"] },
  { label: "Break-even calculator", to: "/tools/break-even-calculator", match: ["break-even", "break even", "breakeven"] },
  { label: "Profit margin calculator", to: "/tools/profit-margin-calculator", match: ["margin", "contribution", "profit"] },
  { label: "All growth tools", to: "/tools", match: ["calculator", "tools"] },
];

// ---- Per-service link priorities ---------------------------------------
// Each service page gets: its own cross-service links first (highest
// priority), then relevant industries, then tools, then base pool.

const CROSS_SERVICE: Record<string, FAQLinkRule[]> = {
  "paid-ads": [
    { label: "Creative Studio", to: "/services/creative", match: ["creative", "ugc", "video", "reels"] },
    { label: "Analytics & tracking", to: "/services/analytics", match: ["tracking", "capi", "attribution", "ga4", "server-side"] },
    { label: "Ecommerce SEO", to: "/services/seo", match: ["seo", "organic", "search"] },
    { label: "Google Ads deep-dive", to: "/services/performance-marketing/google-ads", match: ["google", "shopping", "pmax", "performance max"] },
    { label: "Meta Ads deep-dive", to: "/services/performance-marketing/facebook-ads", match: ["meta", "facebook"] },
    { label: "TikTok Ads deep-dive", to: "/services/performance-marketing/tiktok-ads", match: ["tiktok"] },
    { label: "CRO service", to: "/services/cro", match: ["conversion", "cro", "landing page", "checkout"] },
  ],
  creative: [
    { label: "Paid Ads service", to: "/services/paid-ads", match: ["ad", "paid", "meta", "tiktok", "google"] },
    { label: "CRO service", to: "/services/cro", match: ["landing page", "conversion"] },
    { label: "Email & SMS", to: "/services/email-sms", match: ["email", "klaviyo", "sms"] },
  ],
  cro: [
    { label: "Analytics & tracking", to: "/services/analytics", match: ["tracking", "ga4", "attribution", "data"] },
    { label: "Funnel design", to: "/services/funnel", match: ["funnel", "journey", "flow"] },
    { label: "Paid Ads service", to: "/services/paid-ads", match: ["ad", "paid", "traffic"] },
    { label: "Store development", to: "/services/store-development", match: ["shopify", "woocommerce", "theme", "build"] },
  ],
  funnel: [
    { label: "CRO service", to: "/services/cro", match: ["conversion", "test", "cro"] },
    { label: "Email & SMS", to: "/services/email-sms", match: ["email", "flow", "sms", "klaviyo"] },
    { label: "Paid Ads service", to: "/services/paid-ads", match: ["ad", "traffic", "paid"] },
    { label: "Creative Studio", to: "/services/creative", match: ["creative", "video", "ugc"] },
  ],
  "email-sms": [
    { label: "Klaviyo & flows", to: "/services/email-sms", match: ["klaviyo"] },
    { label: "CRO service", to: "/services/cro", match: ["conversion", "landing"] },
    { label: "Creative Studio", to: "/services/creative", match: ["creative", "design"] },
    { label: "Analytics & tracking", to: "/services/analytics", match: ["tracking", "attribution"] },
  ],
  scaling: [
    { label: "AI & automation", to: "/services/ai-automation", match: ["automation", "ai", "workflow", "ops"] },
    { label: "Analytics & tracking", to: "/services/analytics", match: ["data", "reporting", "dashboard"] },
    { label: "Paid Ads service", to: "/services/paid-ads", match: ["ad", "paid", "spend"] },
    { label: "Ecommerce SEO", to: "/services/seo", match: ["seo", "organic"] },
  ],
  analytics: [
    { label: "Paid Ads service", to: "/services/paid-ads", match: ["ad", "paid", "meta", "google", "roas"] },
    { label: "CRO service", to: "/services/cro", match: ["conversion", "test"] },
    { label: "AI & automation", to: "/services/ai-automation", match: ["automation", "workflow", "ai"] },
  ],
  "ai-automation": [
    { label: "Analytics & tracking", to: "/services/analytics", match: ["data", "tracking", "reporting"] },
    { label: "Scaling systems", to: "/services/scaling", match: ["scale", "ops", "team"] },
    { label: "Email & SMS", to: "/services/email-sms", match: ["email", "klaviyo", "sms"] },
  ],
  seo: [
    { label: "Technical SEO", to: "/services/seo/technical", match: ["technical", "core web vitals", "crawl", "index", "speed"] },
    { label: "On-page SEO", to: "/services/seo/on-page", match: ["on-page", "on page", "product page", "collection", "content"] },
    { label: "Off-page SEO", to: "/services/seo/off-page", match: ["backlink", "link building", "digital pr", "off-page"] },
    { label: "Local SEO", to: "/services/seo/local", match: ["local", "map pack", "google business"] },
    { label: "International SEO", to: "/services/seo/international", match: ["international", "hreflang", "multi-region"] },
    { label: "AEO / AI search", to: "/services/seo/aeo", match: ["aeo", "chatgpt", "perplexity", "ai search", "llm"] },
    { label: "Paid Ads service", to: "/services/paid-ads", match: ["paid", "ad", "ppc"] },
  ],
  "store-development": [
    { label: "Shopify builds", to: "/services/store-development/shopify", match: ["shopify"] },
    { label: "WooCommerce builds", to: "/services/store-development/woocommerce", match: ["woocommerce", "woo"] },
    { label: "CRO service", to: "/services/cro", match: ["conversion", "cro"] },
    { label: "Ecommerce SEO", to: "/services/seo", match: ["seo", "organic", "search"] },
    { label: "Analytics & tracking", to: "/services/analytics", match: ["tracking", "ga4", "analytics"] },
  ],
};

/** Convenience wrapper that assembles the right pool for a given service. */
export function linkServiceFaqs(faqs: FAQ[], serviceSlug: string, maxPerFaq = 2): FAQ[] {
  const own = CROSS_SERVICE[serviceSlug] ?? [];
  return linkFaqs(faqs, [...own, ...INDUSTRY_LINKS, ...TOOL_LINKS, ...BASE_POOL], maxPerFaq);
}
