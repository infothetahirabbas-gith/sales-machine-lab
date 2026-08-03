// Lightweight, build-time index of every indexable page on the site.
// Powers /search (and the schema.org SearchAction target declared in seo.ts).

import { SERVICE_CATALOG } from "./service-catalog";
import { PILLAR_PAGES } from "./pillar-pages";
import { LOCATIONS, INDUSTRIES } from "./locations-industries";
import { CALCULATORS } from "./calculators";
import { BLOG_POSTS } from "./blog-posts";

export type SiteIndexSection =
  | "Services"
  | "Guides"
  | "Blog"
  | "Locations"
  | "Industries"
  | "Tools"
  | "Company"
  | "Case studies";

export type SiteIndexEntry = {
  title: string;
  description: string;
  to: string;
  section: SiteIndexSection;
  keywords?: string;
};

const CORE: SiteIndexEntry[] = [
  { title: "Ecommerce growth agency (home)", description: "Shopify and WooCommerce growth systems for UK DTC brands - SEO, paid media, CRO, retention and automation.", to: "/", section: "Company" },
  { title: "Services overview", description: "Every BeingEcom service in one place: SEO, performance marketing, store development, CRO, email and analytics.", to: "/services", section: "Services" },
  { title: "Pricing and packages", description: "Transparent monthly retainers by growth stage, in GBP, with what is included at each tier.", to: "/pricing", section: "Company", keywords: "cost price retainer budget" },
  { title: "Case studies", description: "UK Shopify and WooCommerce brands we have grown, with the strategy, timeline and measured outcome for each.", to: "/case-studies", section: "Case studies" },
  { title: "Free growth audit", description: "Request a teardown of your store, ads and funnel with prioritised fixes.", to: "/audit", section: "Company", keywords: "audit review teardown free" },
  { title: "Contact BeingEcom", description: "Talk to the team about ecommerce growth - London office, UK-wide clients.", to: "/contact", section: "Company" },
  { title: "The BeingEcom Growth System", description: "Our six-stage methodology for taking a store from leaky to compounding.", to: "/methodology", section: "Company", keywords: "process framework methodology" },
  { title: "About BeingEcom", description: "Who we are, how we work, and the standards we hold our work to.", to: "/about", section: "Company" },
  { title: "Tahir Abbas, founder", description: "Founder profile: background, operating principles and published work.", to: "/company/founder", section: "Company" },
  { title: "Our team", description: "The senior practitioners who run BeingEcom client accounts.", to: "/company/team", section: "Company" },
  { title: "Editorial policy", description: "How we research, source, review and update everything we publish.", to: "/company/editorial-policy", section: "Company" },
  { title: "Review methodology", description: "How we test tools and platforms, score them, and handle conflicts of interest.", to: "/company/review-methodology", section: "Company" },
  { title: "Corrections policy", description: "How to report an error and how we log and publish corrections.", to: "/company/corrections", section: "Company" },
  { title: "Ecommerce glossary", description: "Plain-English definitions of the ecommerce and SEO terms we use.", to: "/glossary", section: "Guides" },
  { title: "Benchmarks", description: "UK ecommerce benchmarks by channel and category, updated from live accounts.", to: "/benchmarks", section: "Guides", keywords: "data research benchmark" },
  { title: "Original research", description: "Our published research studies on UK ecommerce performance.", to: "/research", section: "Guides" },
  { title: "Resources hub", description: "Free tools, checklists, templates and guides for ecommerce operators.", to: "/resources", section: "Guides" },
  { title: "Blog", description: "Playbooks, teardowns and field notes for UK Shopify and WooCommerce brands.", to: "/blog", section: "Blog" },
  { title: "Locations we serve", description: "Ecommerce growth support across UK cities and regions.", to: "/locations", section: "Locations" },
  { title: "Industries we serve", description: "Ecommerce sectors we specialise in, from fashion to electronics.", to: "/industries", section: "Industries" },
  { title: "Free growth tools", description: "ROAS, CAC, LTV, margin and break-even calculators.", to: "/tools", section: "Tools" },
  { title: "Compare agencies", description: "Honest comparisons between BeingEcom and other ways of resourcing growth.", to: "/compare", section: "Company" },
  { title: "Who we help", description: "Our ideal client profile - stage, revenue, platform and appetite.", to: "/who-we-help", section: "Company" },
];

export const SITE_INDEX: SiteIndexEntry[] = [
  ...CORE,
  ...SERVICE_CATALOG.map((s) => ({
    title: s.title,
    description: s.body,
    to: s.to,
    section: "Services" as const,
  })),
  ...PILLAR_PAGES.map((p) => ({
    title: p.h1,
    description: p.description,
    to: p.path,
    section: "Guides" as const,
  })),
  ...BLOG_POSTS.map((p) => ({
    title: p.title,
    description: p.description,
    to: `/blog/${p.slug}`,
    section: "Blog" as const,
    keywords: p.category,
  })),
  ...LOCATIONS.map((l) => ({
    title: `Ecommerce agency in ${l.city}`,
    description: l.intro,
    to: `/locations/${l.slug}`,
    section: "Locations" as const,
    keywords: l.region,
  })),
  ...INDUSTRIES.map((i) => ({
    title: `${i.name} ecommerce growth`,
    description: i.intro,
    to: `/industries/${i.slug}`,
    section: "Industries" as const,
    keywords: i.highlights.join(" "),
  })),
  ...CALCULATORS.map((c) => ({
    title: c.title,
    description: c.description,
    to: `/tools/${c.slug}`,
    section: "Tools" as const,
    keywords: "calculator tool free",
  })),
];

/** Simple token-overlap ranking - no dependency, runs fine during SSR. */
export function searchSite(query: string, limit = 40): SiteIndexEntry[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = SITE_INDEX.map((entry) => {
    const title = entry.title.toLowerCase();
    const haystack = `${title} ${entry.description.toLowerCase()} ${(entry.keywords ?? "").toLowerCase()} ${entry.to.toLowerCase()}`;
    let score = 0;
    if (title.includes(q)) score += 12;
    if (haystack.includes(q)) score += 6;
    for (const t of tokens) {
      if (title.includes(t)) score += 4;
      else if (haystack.includes(t)) score += 1;
    }
    return { entry, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  return scored.slice(0, limit).map((r) => r.entry);
}
