// Topical authority clusters. Each cluster owns 1 pillar + 5 supporting posts.
// ClusterNav renders "Part of the {name} guide" boxes to interlink them.
export type ClusterId = "ecom-seo" | "paid-media" | "cro" | "email-retention";

export interface ClusterResource {
  to: string;
  label: string;
  kind: "tool" | "guide" | "glossary" | "research" | "clients";
}

export interface Cluster {
  id: ClusterId;
  name: string;
  intro: string;
  pillarSlug: string;
  supportingSlugs: string[];
  relatedServicePath: string;
  relatedServiceLabel: string;
  resources: ClusterResource[];
}

export const CLUSTERS: Record<ClusterId, Cluster> = {
  "ecom-seo": {
    id: "ecom-seo",
    name: "UK Ecommerce SEO for Shopify",
    intro: "The full playbook for ranking a UK Shopify store on Google - technical, on-page, content and local.",
    pillarSlug: "uk-ecommerce-seo-playbook-shopify",
    supportingSlugs: [
      "shopify-duplicate-content-faceted-urls",
      "shopify-product-page-seo-uk",
      "shopify-collection-page-seo",
      "shopify-plus-technical-seo-checklist",
      "local-seo-multi-location-uk-ecommerce",
    ],
    relatedServicePath: "/services/seo",
    relatedServiceLabel: "Ecommerce SEO service",
    resources: [
      { to: "/glossary", label: "Ecommerce SEO glossary", kind: "glossary" },
      { to: "/research", label: "UK ecommerce research & benchmarks", kind: "research" },
      { to: "/clients", label: "UK Shopify brands we've grown", kind: "clients" },
      { to: "/methodology", label: "The BeingEcom Growth System", kind: "guide" },
    ],
  },
  "paid-media": {
    id: "paid-media",
    name: "UK DTC Paid Media",
    intro: "Meta, Google and TikTok playbook for UK direct-to-consumer brands.",
    pillarSlug: "uk-dtc-paid-media-playbook",
    supportingSlugs: [
      "meta-ads-creative-testing-uk-dtc",
      "google-shopping-feed-optimisation-shopify-uk",
      "tiktok-ads-uk-beauty-fashion-brands",
      "ios17-attribution-uk-ecommerce",
      "mer-vs-roas-uk-dtc-founders",
    ],
    relatedServicePath: "/services/performance-marketing",
    relatedServiceLabel: "Paid media service",
    resources: [
      { to: "/tools/roas-calculator", label: "ROAS calculator", kind: "tool" },
      { to: "/tools/cac-calculator", label: "CAC calculator", kind: "tool" },
      { to: "/tools/break-even-calculator", label: "Break-even ROAS calculator", kind: "tool" },
      { to: "/glossary", label: "Paid media glossary (ROAS, MER, CAC)", kind: "glossary" },
      { to: "/clients", label: "UK DTC brands we run paid media for", kind: "clients" },
    ],
  },
  cro: {
    id: "cro",
    name: "Ecommerce CRO",
    intro: "Conversion rate optimisation playbook for UK Shopify stores.",
    pillarSlug: "uk-ecommerce-cro-playbook-shopify",
    supportingSlugs: [
      "pdp-cro-14-tests-that-move-revenue",
      "cart-checkout-cro-shopify-uk",
      "mobile-cro-fixing-mobile-dropoff",
      "site-search-cro-uk-ecommerce",
      "trust-signals-that-convert-uk-shoppers",
    ],
    relatedServicePath: "/services/cro",
    relatedServiceLabel: "CRO service",
    resources: [
      { to: "/tools/profit-margin-calculator", label: "Profit margin calculator", kind: "tool" },
      { to: "/tools/break-even-calculator", label: "Break-even calculator", kind: "tool" },
      { to: "/research", label: "UK ecommerce CRO benchmarks", kind: "research" },
      { to: "/glossary", label: "CRO glossary", kind: "glossary" },
      { to: "/clients", label: "Brands we've lifted conversion for", kind: "clients" },
    ],
  },
  "email-retention": {
    id: "email-retention",
    name: "Ecommerce Email & Retention",
    intro: "Klaviyo playbook for UK DTC brands.",
    pillarSlug: "uk-ecommerce-email-retention-klaviyo",
    supportingSlugs: [
      "klaviyo-welcome-flow-uk-dtc-template",
      "abandoned-cart-flows-that-recover-15-percent",
      "post-purchase-flows-for-repeat-revenue",
      "winback-flows-for-lapsed-uk-customers",
      "sms-email-uk-compliance-safe-combo",
    ],
    relatedServicePath: "/services/email-sms",
    relatedServiceLabel: "Email & SMS service",
    resources: [
      { to: "/tools/ltv-calculator", label: "LTV calculator", kind: "tool" },
      { to: "/tools/cac-calculator", label: "CAC calculator", kind: "tool" },
      { to: "/glossary", label: "Retention & lifecycle glossary", kind: "glossary" },
      { to: "/research", label: "UK retention benchmarks", kind: "research" },
      { to: "/clients", label: "Retention clients we work with", kind: "clients" },
    ],
  },
};

// Reverse lookup: which cluster does this slug belong to, and what role?
export function findClusterForSlug(slug: string):
  | { cluster: Cluster; role: "pillar" | "supporting" }
  | null {
  for (const cluster of Object.values(CLUSTERS)) {
    if (cluster.pillarSlug === slug) return { cluster, role: "pillar" };
    if (cluster.supportingSlugs.includes(slug)) return { cluster, role: "supporting" };
  }
  return null;
}
