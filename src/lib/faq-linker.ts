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
