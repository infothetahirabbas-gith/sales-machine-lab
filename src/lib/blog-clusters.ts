// Topical authority clusters. Each cluster owns 1 pillar + 5 supporting posts.
// ClusterNav renders "Part of the {name} guide" boxes to interlink them.
export type ClusterId = "ecom-seo" | "paid-media" | "cro" | "email-retention";

export interface Cluster {
  id: ClusterId;
  name: string;
  intro: string;
  pillarSlug: string;
  supportingSlugs: string[];
  relatedServicePath: string;
  relatedServiceLabel: string;
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
  },
  "paid-media": {
    id: "paid-media",
    name: "UK DTC Paid Media",
    intro: "Meta, Google and TikTok playbook for UK direct-to-consumer brands.",
    pillarSlug: "uk-dtc-paid-media-playbook",
    supportingSlugs: [],
    relatedServicePath: "/services/paid-ads",
    relatedServiceLabel: "Paid media service",
  },
  cro: {
    id: "cro",
    name: "Ecommerce CRO",
    intro: "Conversion rate optimisation playbook for UK Shopify stores.",
    pillarSlug: "uk-ecommerce-cro-playbook-shopify",
    supportingSlugs: [],
    relatedServicePath: "/services/cro",
    relatedServiceLabel: "CRO service",
  },
  "email-retention": {
    id: "email-retention",
    name: "Ecommerce Email & Retention",
    intro: "Klaviyo playbook for UK DTC brands.",
    pillarSlug: "uk-ecommerce-email-retention-klaviyo",
    supportingSlugs: [],
    relatedServicePath: "/services/email-sms",
    relatedServiceLabel: "Email & SMS service",
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
