export type LocationData = {
  slug: string;
  city: string;
  region: string;
  intro: string;
  highlights: string[];
};

export const LOCATIONS: LocationData[] = [
  {
    slug: "london",
    city: "London",
    region: "Greater London",
    intro: "We help London-based DTC brands scale profitably with performance marketing, CRO, and Shopify growth systems tuned for the UK's most competitive market.",
    highlights: ["Meta & Google Ads for London DTC", "Shopify Plus CRO", "Klaviyo email & SMS", "Local UK creative production"],
  },
  {
    slug: "manchester",
    city: "Manchester",
    region: "North West England",
    intro: "Manchester ecommerce brands trust us to scale ROAS, cut CAC, and build a system that compounds every month — without agency fluff.",
    highlights: ["Paid social growth", "SEO for UK ecommerce", "Landing page CRO", "Retention automations"],
  },
  {
    slug: "birmingham",
    city: "Birmingham",
    region: "West Midlands",
    intro: "Birmingham-based Shopify and WooCommerce brands scaling into 6- and 7-figure monthly revenue with our full growth engine.",
    highlights: ["Performance marketing", "Google Shopping", "Creative testing", "Analytics & attribution"],
  },
  {
    slug: "leeds",
    city: "Leeds",
    region: "West Yorkshire",
    intro: "From Leeds startups to established Yorkshire brands, we install the same scaling system used by 120+ UK ecommerce operators.",
    highlights: ["Meta Ads scaling", "TikTok Shop growth", "CRO & UX", "Email revenue lift"],
  },
  {
    slug: "bristol",
    city: "Bristol",
    region: "South West England",
    intro: "Bristol ecommerce founders working with us get UK-first creative, sharp media buying and a Shopify build that actually converts.",
    highlights: ["Shopify build & optimisation", "Google Ads", "Content & SEO", "Weekly growth reviews"],
  },
  {
    slug: "liverpool",
    city: "Liverpool",
    region: "Merseyside",
    intro: "Liverpool DTC brands scaling with a lean, senior team — no juniors, no reporting theatre, just revenue and margin.",
    highlights: ["Media buying", "Landing page CRO", "Klaviyo flows", "Ad creative production"],
  },
  {
    slug: "glasgow",
    city: "Glasgow",
    region: "Scotland",
    intro: "Glasgow ecommerce brands use our system to fix CAC, unlock margin and build predictable monthly revenue growth.",
    highlights: ["Paid ads for Scottish brands", "SEO & content", "Retention marketing", "Analytics stack"],
  },
  {
    slug: "edinburgh",
    city: "Edinburgh",
    region: "Scotland",
    intro: "Edinburgh Shopify and premium DTC brands scale profitably with a senior operator team focused on real revenue outcomes.",
    highlights: ["Premium brand paid growth", "CRO for AOV lift", "Email/SMS lifecycle", "UK creative studio"],
  },
];

export type IndustryData = {
  slug: string;
  name: string;
  intro: string;
  highlights: string[];
};

export const INDUSTRIES: IndustryData[] = [
  {
    slug: "fashion-apparel",
    name: "Fashion & Apparel",
    intro: "We scale UK fashion and apparel brands with creative-led paid social, TikTok Shop and lifecycle marketing that lifts LTV without discounting.",
    highlights: ["Meta & TikTok creative testing", "Size-quiz CRO", "Klaviyo winback flows", "Influencer-led UGC"],
  },
  {
    slug: "beauty-skincare",
    name: "Beauty & Skincare",
    intro: "Beauty and skincare brands need a full-funnel system — we build one that reduces CAC, protects margin and grows repeat purchase rate.",
    highlights: ["Founder-led UGC ads", "Bundle & subscription CRO", "SEO for skincare queries", "Retention emails"],
  },
  {
    slug: "health-supplements",
    name: "Health & Supplements",
    intro: "UK supplement brands use our compliant creative and subscription-first CRO to scale profitably under ASA and MHRA rules.",
    highlights: ["ASA-compliant ad creative", "Subscription CRO", "LTV modelling", "Google/Meta scaling"],
  },
  {
    slug: "home-garden",
    name: "Home & Garden",
    intro: "Home, garden and interiors brands scaling higher AOV baskets with Google Shopping, Pinterest and premium landing page CRO.",
    highlights: ["Google Shopping feeds", "Pinterest ads", "AOV-focused CRO", "Content-led SEO"],
  },
  {
    slug: "electronics",
    name: "Electronics & Gadgets",
    intro: "Electronics and gadget brands scale with performance marketing, structured PDP CRO and a review engine that lifts conversion.",
    highlights: ["Google Ads & Shopping", "PDP CRO", "Review & UGC engine", "Retargeting automation"],
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage",
    intro: "DTC food and drink brands scale subscription revenue with our creative, retention and lifecycle system built for repeat purchase.",
    highlights: ["Subscription-first CRO", "Lifecycle email", "Meta & TikTok creative", "Attribution setup"],
  },
  {
    slug: "jewellery",
    name: "Jewellery & Watches",
    intro: "Premium UK jewellery and watch brands trust us for high-consideration paid social, story-driven creative and margin-safe scaling.",
    highlights: ["Story-led creative", "Meta & Pinterest ads", "AOV CRO", "Email/SMS lifecycle"],
  },
  {
    slug: "pets",
    name: "Pets & Accessories",
    intro: "UK pet brands scale with subscription CRO, community-led creative and full-funnel media buying built around real retention.",
    highlights: ["Subscription growth", "Community UGC ads", "Klaviyo flows", "Meta & TikTok scaling"],
  },
];
