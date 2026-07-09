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
    name: "CRO Sprint",
    price: "£2,500",
    priceNumeric: 2500,
    currency: "GBP",
    period: "fixed",
    best: "Stores with traffic but poor conversion",
    duration: "6-week fixed engagement",
    includes: [
      "Full CRO audit",
      "PDP rebuild",
      "Checkout optimisation",
      "A/B test setup",
    ],
  },
  {
    name: "Growth System",
    price: "£4,500",
    priceNumeric: 4500,
    currency: "GBP",
    period: "month",
    best: "Stores ready to scale profitably across ads + CRO + email",
    duration: "90-day onboarding, then month-to-month",
    includes: [
      "Paid ads management (Meta / Google)",
      "Conversion rate optimisation",
      "Klaviyo email flows",
      "Weekly reporting",
    ],
    popular: true,
  },
  {
    name: "Full Partnership",
    price: "£8,000",
    priceNumeric: 8000,
    currency: "GBP",
    period: "month",
    best: "6–7 figure stores wanting a dedicated growth team",
    duration: "90-day onboarding, then month-to-month",
    includes: [
      "Everything in Growth System",
      "Ecommerce SEO",
      "Creative production",
      "Analytics & tracking setup",
      "Fractional CMO access",
    ],
  },
];

export const PRICING_MIN_LABEL = "£2,500";
export const PRICING_MAX_LABEL = "£8,000+";
export const PRICING_MIN_AD_SPEND = "£3K+/mo";
