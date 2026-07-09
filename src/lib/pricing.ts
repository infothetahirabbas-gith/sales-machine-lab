// Single source of truth for pricing tiers.
// Every page (pricing.tsx, locations, industries, service pages) MUST import from here.
// Never hardcode prices, tier names, or currencies anywhere else.

export type PricingTier = {
  name: string;
  price: string;
  priceNumeric: number;
  currency: "GBP";
  period: "month" | "fixed";
  best: string;
  duration: string;
  includes: string[];
  popular?: boolean;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: "£2,500",
    priceNumeric: 2500,
    currency: "GBP",
    period: "month",
    best: "Early-stage stores fixing foundations before scaling spend",
    duration: "90-day initial engagement, then month-to-month",
    includes: [
      "Store & CRO audit",
      "PDP + checkout optimisation sprint",
      "Ecommerce SEO foundations",
      "GA4 / Pixel / CAPI tracking setup",
      "Fortnightly reporting",
    ],
  },
  {
    name: "Growth",
    price: "£5,500",
    priceNumeric: 5500,
    currency: "GBP",
    period: "month",
    best: "Stores ready to scale profitably across ads + CRO + email",
    duration: "90-day onboarding, then month-to-month",
    includes: [
      "Paid ads management (Meta / Google)",
      "Ongoing conversion rate optimisation",
      "Klaviyo email & SMS flows",
      "Creative testing sprints",
      "Weekly reporting",
    ],
    popular: true,
  },
  {
    name: "Scale",
    price: "£10,000+",
    priceNumeric: 10000,
    currency: "GBP",
    period: "month",
    best: "6–7 figure stores wanting a full dedicated growth team",
    duration: "90-day onboarding, then month-to-month",
    includes: [
      "Everything in Growth",
      "Ecommerce SEO & digital PR",
      "Full creative production",
      "Retention & lifecycle systems",
      "Fractional CMO access",
    ],
  },
];

export const PRICING_MIN_LABEL = "£2,500";
export const PRICING_MAX_LABEL = "£10,000+";
export const PRICING_MIN_AD_SPEND = "£3K+/mo";
