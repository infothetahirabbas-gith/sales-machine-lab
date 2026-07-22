// CTR-optimized meta title + description per location page.
// - Variant A: authority + service list (default, current champion).
// - Variant B: benefit-led / proof-point angle for A/B test (28-day window).
// Assignment is per-browser sticky (see location-attribution.ts).
// Target: title ≤ 60 chars, description ≤ 158 chars.
// Baseline (2026-07-22) captured in gsc-location-baseline.json.

export type LocationMeta = { title: string; description: string };

export const LOCATION_META_A: Record<string, LocationMeta> = {
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

// Variant B: benefit-led / outcome-first framing. Shorter, punchier, question hook.
export const LOCATION_META_B: Record<string, LocationMeta> = {
  london: {
    title: "London Shopify Growth Agency | £47M+ Revenue Scaled",
    description:
      "Struggling to scale profitably in London? BeingEcom has scaled 120+ Shopify & WooCommerce brands to £47M+. Book your free 45-min growth audit.",
  },
  manchester: {
    title: "Scale Your Manchester Shopify Store | Free Growth Audit",
    description:
      "Manchester DTC brand ready to grow? We cut CAC and lift AOV for Shopify & WooCommerce stores across the North West. Book a free 45-min audit.",
  },
  birmingham: {
    title: "Grow Your Birmingham Shopify Store Profitably | Free Audit",
    description:
      "West Midlands ecommerce brand? Our senior team scales Shopify & WooCommerce revenue without wasted ad spend. Get a free 45-min growth audit.",
  },
  glasgow: {
    title: "Glasgow Shopify Agency | Scale Scottish DTC Brands",
    description:
      "Scottish ecommerce brand? We help Glasgow Shopify & WooCommerce stores lower CAC, lift AOV and compound revenue. Free 45-min growth audit.",
  },
  bristol: {
    title: "Bristol Shopify Growth Partner | Free 45-min Audit",
    description:
      "South West DTC brand? We scale Bristol Shopify & WooCommerce stores through SEO, paid media, CRO & retention. Book your free growth audit.",
  },
  leeds: {
    title: "Leeds Shopify Growth Agency | Turn Traffic Into Revenue",
    description:
      "Yorkshire ecommerce brand? BeingEcom lifts repeat rate and AOV for Leeds Shopify & WooCommerce stores. Book a free 45-min growth audit.",
  },
  liverpool: {
    title: "Liverpool Ecommerce Growth Team | Free 45-min Audit",
    description:
      "Merseyside DTC brand? Our Liverpool team scales Shopify & WooCommerce revenue with clean tracking and senior operators. Free growth audit.",
  },
  leicester: {
    title: "Leicester Shopify Growth Agency | Free 45-min Audit",
    description:
      "East Midlands ecommerce brand? We scale Leicester Shopify & WooCommerce stores with creative-led paid social and Klaviyo. Free audit.",
  },
  nottingham: {
    title: "Nottingham Shopify Growth Agency | Lower CAC, Lift AOV",
    description:
      "Nottingham DTC brand? Our senior team lowers CAC and lifts AOV for East Midlands Shopify & WooCommerce stores. Free 45-min growth audit.",
  },
  edinburgh: {
    title: "Edinburgh Shopify Growth Agency | Premium DTC Team",
    description:
      "Premium Scottish DTC brand? We scale Edinburgh Shopify & WooCommerce stores with CRO, SEO and Klaviyo. Book a free 45-min growth audit.",
  },
  poole: {
    title: "Poole Ecommerce Growth Agency | Dorset Shopify Team",
    description:
      "Dorset or South Coast DTC brand? We scale Poole Shopify & WooCommerce stores across paid ads, SEO, Klaviyo & CRO. Free 45-min audit.",
  },
  bradford: {
    title: "Bradford Shopify Growth Agency | West Yorkshire DTC Team",
    description:
      "West Yorkshire ecommerce brand? BeingEcom scales Bradford Shopify & WooCommerce stores with paid ads, SEO and Klaviyo. Free growth audit.",
  },
};

// Back-compat: LOCATION_META still exported (variant A).
export const LOCATION_META = LOCATION_META_A;

export function metaFor(slug: string, city: string, region: string): LocationMeta {
  return metaForVariant(slug, city, region, "A");
}

export function metaForVariant(
  slug: string,
  city: string,
  region: string,
  variant: "A" | "B",
): LocationMeta {
  const map = variant === "B" ? LOCATION_META_B : LOCATION_META_A;
  const found = map[slug];
  if (found) return found;
  return {
    title:
      variant === "B"
        ? `${city} Shopify Growth Agency | Free 45-min Audit`
        : `Ecommerce Agency ${city} | Shopify & WooCommerce Growth`,
    description:
      variant === "B"
        ? `${city} DTC brand? We scale Shopify & WooCommerce revenue with SEO, paid ads, Klaviyo and CRO. Free 45-min growth audit.`
        : `${city} ecommerce agency for Shopify & WooCommerce brands. SEO, Google Ads, Meta Ads, Klaviyo & CRO run by senior UK operators. Free audit.`,
  };
}
