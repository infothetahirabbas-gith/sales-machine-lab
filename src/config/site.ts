// Canonical single source of truth for contact, address, socials, hours,
// and legal identity. Every page/component that renders any of these
// values MUST import from here - never hardcode.
//
// Re-exported from `src/lib/seo.ts` so schema (Organization/LocalBusiness)
// and UI (Footer/Contact) stay in lock-step.

import { ORG_INFO, SITE_URL } from "@/lib/seo";

export { ORG_INFO, SITE_URL };

export const SITE = {
  url: SITE_URL,
  name: ORG_INFO.name,
  legalName: ORG_INFO.legalName,
  description: ORG_INFO.description,

  // Contact
  email: ORG_INFO.email,
  phone: ORG_INFO.telephone,
  phoneHref: `tel:${ORG_INFO.telephone.replace(/[^+\d]/g, "")}`,
  emailHref: `mailto:${ORG_INFO.email}`,

  // Address
  address: ORG_INFO.address,
  addressLines: [
    "71-75 Shelton Street",
    "Covent Garden, London",
    "WC2H 9JQ, United Kingdom",
  ],
  addressOneLine:
    "71-75 Shelton Street, Covent Garden, London WC2H 9JQ, United Kingdom",

  // Hours
  hours: "Mon-Fri, 09:00-18:00 GMT/BST",

  // Socials
  socials: {
    linkedin: "https://www.linkedin.com/company/beingecom",
    instagram: "https://www.instagram.com/beingecom",
    twitter: "https://x.com/beingecom",
  },
  sameAs: ORG_INFO.sameAs,
} as const;

export type SiteConfig = typeof SITE;
