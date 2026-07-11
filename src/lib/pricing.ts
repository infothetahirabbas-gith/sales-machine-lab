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
    price: "£500",
    priceNumeric: 500,
    currency: "GBP",
    period: "month",
    best: "New ecommerce stores building a strong foundation for sustainable growth.",
    duration: "90-day initial engagement, then month-to-month",
    includes: [
      "Comprehensive Ecommerce Store Audit",
      "Technical SEO Setup & Optimization",
      "On-Page SEO Optimization",
      "Product Page (PDP) Optimization",
      "Collection & Category Page Optimization",
      "Basic Conversion Rate Optimization (CRO)",
      "GA4, GTM & Meta Pixel Setup",
      "Conversion Tracking Configuration",
      "Website Speed Optimization",
      "Monthly Performance Report",
      "Dedicated Account Manager",
    ],
  },
  {
    name: "Growth",
    price: "£1,000",
    priceNumeric: 1000,
    currency: "GBP",
    period: "month",
    best: "Growing ecommerce brands ready to increase traffic, conversions, and revenue.",
    duration: "90-day onboarding, then month-to-month",
    includes: [
      "Everything in Starter",
      "Meta Ads Management",
      "Google Ads Management",
      "Advanced Ecommerce SEO",
      "Keyword Research & Content Strategy",
      "Landing Page Optimization",
      "Ongoing CRO Improvements",
      "Klaviyo Email Marketing",
      "Automated Email Flows",
      "Monthly A/B Testing",
      "Competitor Analysis",
      "Weekly Performance Reports",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "£1,500",
    priceNumeric: 1500,
    currency: "GBP",
    period: "month",
    best: "Established ecommerce brands scaling across multiple channels and markets.",
    duration: "90-day onboarding, then month-to-month",
    includes: [
      "Everything in Growth",
      "Multi-Channel Advertising (Meta, Google & TikTok)",
      "Advanced SEO Strategy",
      "Digital PR & Authority Building",
      "Advanced Funnel Optimization",
      "Custom Landing Page Creation",
      "Creative Strategy & Ad Reviews",
      "Klaviyo Email & SMS Automation",
      "Customer Retention & Loyalty Strategy",
      "AI Marketing Automation",
      "Bi-Weekly Strategy Sessions",
      "Dedicated Growth Manager",
      "Executive Performance Dashboard",
    ],
  },
  {
    name: "Business",
    price: "£2,000",
    priceNumeric: 2000,
    currency: "GBP",
    period: "month",
    best: "High-growth ecommerce brands seeking a fully managed growth partner.",
    duration: "90-day onboarding, then month-to-month",
    includes: [
      "Everything in Enterprise",
      "Dedicated Ecommerce Growth Team",
      "Fractional Ecommerce CMO",
      "Full-Funnel Growth Strategy",
      "Advanced Technical SEO",
      "Digital PR Campaigns",
      "Creative Production Management",
      "Unlimited CRO Recommendations",
      "AI Automation & Business Workflows",
      "Custom Executive Reporting",
      "Weekly Strategy Meetings",
      "Quarterly Business Growth Planning",
      "VIP Priority Support",
    ],
  },
];

export const PRICING_MIN_LABEL = "£500";
export const PRICING_MAX_LABEL = "£2,000+";
export const PRICING_MIN_AD_SPEND = "£3K+/mo";
