// CTR-optimized meta title + description per location page.
// Formulas: benefit-led headline, proof point (120+ brands / £47M+), brackets or
// pipe separator for visual scan, target keyword up front, natural CTA in desc.
// Target: title ≤ 60 chars, description ≤ 158 chars.
// Baseline (2026-07-22) captured in gsc-location-baseline.json for before/after.

export type LocationMeta = { title: string; description: string };

export const LOCATION_META: Record<string, LocationMeta> = {
  london: {
    title: "Ecommerce Agency London | Shopify Growth · 120+ Brands",
    description:
      "London ecommerce agency scaling Shopify & WooCommerce brands. 120+ UK brands, £47M+ revenue driven. Free 45-min audit, no sales pitch.",
  },
  manchester: {
    title: "Ecommerce Agency Manchester | Shopify & WooCommerce Growth",
    description:
      "Manchester ecommerce agency growing Shopify & WooCommerce revenue with SEO, Google Ads, Meta Ads, Klaviyo & CRO. Senior operators. Free audit.",
  },
  birmingham: {
    title: "Ecommerce Agency Birmingham | Scale Shopify Profitably",
    description:
      "Birmingham ecommerce agency for Shopify & WooCommerce brands. Google Ads, Meta Ads, SEO, CRO & Klaviyo run by senior UK operators. Free audit.",
  },
  glasgow: {
    title: "Ecommerce Agency Glasgow | Scotland Shopify Growth Team",
    description:
      "Glasgow ecommerce agency for Scottish Shopify & WooCommerce brands. Paid ads, SEO, Klaviyo & CRO by senior operators. Free 45-min growth audit.",
  },
  bristol: {
    title: "Ecommerce Agency Bristol | Shopify & WooCommerce Growth",
    description:
      "Bristol ecommerce agency scaling sustainable Shopify & WooCommerce brands. SEO, Google Ads, Meta Ads, Klaviyo & CRO. Free 45-min growth audit.",
  },
  leeds: {
    title: "Ecommerce Agency Leeds | Yorkshire Shopify Growth Team",
    description:
      "Leeds ecommerce agency turning traffic into repeat revenue. SEO, Klaviyo, Meta Ads, Google Ads & CRO for Yorkshire DTC brands. Free audit.",
  },
  liverpool: {
    title: "Ecommerce Agency Liverpool | Measurable Shopify Growth",
    description:
      "Liverpool ecommerce agency. Clean GA4 tracking, SEO, Google Ads, Meta Ads & Klaviyo for Merseyside Shopify & WooCommerce brands. Free audit.",
  },
  leicester: {
    title: "Ecommerce Agency Leicester | Midlands Shopify Growth",
    description:
      "Leicester ecommerce agency for East Midlands Shopify & WooCommerce brands. Creative-led paid social, CRO, Klaviyo & UK creative. Free audit.",
  },
  nottingham: {
    title: "Ecommerce Agency Nottingham | Shopify & WooCommerce",
    description:
      "Nottingham ecommerce agency lowering CAC and lifting AOV for East Midlands DTC brands. Paid ads, SEO, Klaviyo & CRO. Free 45-min growth audit.",
  },
  edinburgh: {
    title: "Ecommerce Agency Edinburgh | Scotland DTC Growth Team",
    description:
      "Edinburgh ecommerce agency for premium Shopify & WooCommerce brands. CRO, SEO, Google Ads, Meta Ads & Klaviyo. Senior operators. Free audit.",
  },
  poole: {
    title: "Ecommerce Agency Poole | Dorset Shopify Growth Team",
    description:
      "Poole ecommerce agency scaling Dorset & South Coast Shopify & WooCommerce brands. Paid ads, SEO, Klaviyo & CRO. Free 45-min growth audit.",
  },
  bradford: {
    title: "Ecommerce Agency Bradford | Yorkshire DTC Growth Team",
    description:
      "Bradford ecommerce agency for West Yorkshire Shopify & WooCommerce brands. Google Ads, Meta Ads, SEO, Klaviyo & CRO. Free 45-min audit.",
  },
};

export function metaFor(slug: string, city: string, region: string): LocationMeta {
  const found = LOCATION_META[slug];
  if (found) return found;
  return {
    title: `Ecommerce Agency ${city} | Shopify & WooCommerce Growth`,
    description: `${city} ecommerce agency for Shopify & WooCommerce brands. SEO, Google Ads, Meta Ads, Klaviyo & CRO run by senior UK operators. Free audit.`,
  };
}
