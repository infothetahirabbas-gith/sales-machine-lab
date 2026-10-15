// CTR-optimized meta title + description per location page.
// - Variant A: authority + service list (default, current champion).
// - Variant B: benefit-led / proof-point angle for A/B test (28-day window).
// Assignment is per-browser sticky (see location-attribution.ts).
// Target: title ≤ 60 chars, description ≤ 158 chars.
// Baseline (2026-07-22) captured in gsc-location-baseline.json.

export type LocationMeta = { title: string; description: string };

export const LOCATION_META_A: Record<string, LocationMeta> = {
  london: {
    title: "Ecommerce Agency London | Shopify, SEO & Paid Ads",
    description:
      "London ecommerce agency for Shopify & WooCommerce brands: SEO, Google Shopping, Meta & TikTok ads, Klaviyo and CRO. Senior team, no lock-ins. Free audit.",
  },
  manchester: {
    title: "Ecommerce Agency Manchester | SEO, Design & Shopify",
    description:
      "Manchester ecommerce agency: ecommerce SEO, Shopify design & builds, content, paid social and Klaviyo for Greater Manchester brands. Free growth audit.",
  },
  birmingham: {
    title: "Ecommerce Agency Birmingham | Shopify & Ecommerce SEO",
    description:
      "Birmingham ecommerce agency for Shopify brands and Jewellery Quarter makers: ecommerce SEO, Google Shopping, Meta ads, Klaviyo & CRO. Free audit.",
  },
  glasgow: {
    title: "Shopify & Ecommerce Agency Glasgow | Websites & Growth",
    description:
      "Glasgow Shopify agency: ecommerce websites, migrations, SEO, paid social and Klaviyo email for Scottish brands. Senior UK team. Free growth audit.",
  },
  bristol: {
    title: "Ecommerce Agency Bristol | Shopify, Klaviyo & SEO",
    description:
      "Bristol ecommerce agency for independent & sustainable brands: Shopify builds, Klaviyo email, ecommerce SEO, paid ads and CRO. Free growth audit.",
  },
  leeds: {
    title: "Ecommerce Agency Leeds | Shopify, CRO & Magento Migration",
    description:
      "Leeds ecommerce agency: Shopify builds, CRO, ecommerce SEO and paid ads for Yorkshire brands - plus safe Magento to Shopify migrations. Free audit.",
  },
  liverpool: {
    title: "Ecommerce Agency Liverpool | Measurable Shopify Growth",
    description:
      "Liverpool ecommerce agency. Clean GA4 tracking, SEO, Google Ads, Meta Ads & Klaviyo for Merseyside Shopify & WooCommerce brands. Free audit.",
  },
  leicester: {
    title: "Ecommerce Marketing Agency Leicester | SEO, AEO & Ads",
    description:
      "Leicester marketing agency for online shops: ecommerce SEO, AEO for AI search, Google Shopping, Meta & TikTok ads and Klaviyo. Free growth audit.",
  },
  nottingham: {
    title: "Ecommerce & Shopify SEO Agency Nottingham | WooCommerce",
    description:
      "Nottingham ecommerce SEO agency for Shopify & WooCommerce stores: technical SEO, content, paid ads, Klaviyo & CRO for East Midlands brands. Free audit.",
  },
  edinburgh: {
    title: "Ecommerce Agency Edinburgh | WooCommerce & Shopify SEO",
    description:
      "Edinburgh ecommerce agency: WooCommerce & Shopify SEO, store development, paid social and Klaviyo for premium Scottish brands. Free growth audit.",
  },
  poole: {
    title: "Ecommerce SEO & Social Ads Agency Poole, Dorset",
    description:
      "SEO and social media ads in Poole for businesses that sell online: ecommerce SEO, Meta & Instagram ads and Shopify stores across Dorset. Free audit.",
  },
  sheffield: {
    title: "Ecommerce Marketing Agency Sheffield | Content & TikTok",
    description:
      "Sheffield ecommerce marketing for makers & outdoor brands: content-led SEO, TikTok & Meta ads, Google Shopping and Klaviyo. Free growth audit.",
  },
  "newcastle-upon-tyne": {
    title: "Ecommerce Agency Newcastle | WooCommerce & Shopify",
    description:
      "Newcastle ecommerce agency for North East brands: WooCommerce & Shopify development, ecommerce SEO, paid ads and Klaviyo. Free growth audit.",
  },
  bradford: {
    title: "Ecommerce SEO & PPC Agency Bradford | West Yorkshire",
    description:
      "Bradford ecommerce agency: SEO, Google Ads & PPC, paid social and Klaviyo for West Yorkshire businesses selling online. Free growth audit.",
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
  sheffield: {
    title: "Sheffield Shopify Growth Agency | Free 45-min Audit",
    description:
      "South Yorkshire DTC brand? We scale Sheffield Shopify & WooCommerce stores with paid ads, SEO, Klaviyo & CRO. Book a free 45-min audit.",
  },
  "newcastle-upon-tyne": {
    title: "Newcastle Shopify Growth Agency | Free 45-min Audit",
    description:
      "North East DTC brand? We scale Newcastle Shopify & WooCommerce stores with paid ads, SEO, Klaviyo & CRO. Book a free 45-min audit.",
  },
};

// Back-compat: LOCATION_META still exported (variant A).
export const LOCATION_META = LOCATION_META_A;

// A/B experiment cohort: which variant each city serves to Google + users.
// Half serve A, half serve B for a 28-day CTR test. After the window closes,
// admin dashboard reports CTR by variant and we roll the winner globally.
// Started 2026-07-22; ended 2026-08-19. All cities serve variant A since
// 2026-10-15: A titles were rewritten from the GSC query export so each title
// carries the city's highest-impression query cluster (see location-local-guide.ts).
export const EXPERIMENT_START = "2026-07-22";
export const EXPERIMENT_END = "2026-08-19";
export const EXPERIMENT_ASSIGNMENT: Record<string, "A" | "B"> = {
  london: "A",
  manchester: "A",
  birmingham: "A",
  glasgow: "A",
  bristol: "A",
  leeds: "A",
  liverpool: "A",
  leicester: "A",
  nottingham: "A",
  edinburgh: "A",
  poole: "A",
  bradford: "A",
};

export function variantForSlug(slug: string): "A" | "B" {
  return EXPERIMENT_ASSIGNMENT[slug] ?? "A";
}

export function metaFor(slug: string, city: string, region: string): LocationMeta {
  return metaForVariant(slug, city, region, variantForSlug(slug));
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

