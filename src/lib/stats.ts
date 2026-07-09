// Single source of truth for headline stats shown across the site.
// Every hero, trust bar, footer, "about" number or schema field MUST
// import from here. Update once - updates everywhere.
//
// Numbers must be verifiable and match the wording on /about and /contact.
// Currency is always GBP (£). The parity guard rejects any `$\d` currency
// literal in the source tree outside a small allowlist.

export const SITE_STATS = {
  storesScaled: { v: "120+", l: "stores scaled" },
  trackedRevenue: { v: "£48M+", l: "tracked revenue" },
  abTests: { v: "400+", l: "A/B tests run" },
  avgRoasLift: { v: "4.1×", l: "avg ROAS lift" },
  caseStudies: { v: "53", l: "case studies published" },
  adSpend: { v: "£120M+", l: "ad spend managed" },
  retentionLift: { v: "+38%", l: "avg retention lift" },
} as const;

/** Backward-compatible alias. Prefer `SITE_STATS` in new code. */
export const GLOBAL_STATS = SITE_STATS;

export const HERO_STATS = [
  SITE_STATS.storesScaled,
  SITE_STATS.trackedRevenue,
  SITE_STATS.abTests,
  SITE_STATS.avgRoasLift,
];

export type SiteStats = typeof SITE_STATS;
