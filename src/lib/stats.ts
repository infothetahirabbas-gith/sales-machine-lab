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
  caseStudies: { v: "30+", l: "case studies published" },
  adSpend: { v: "£120M+", l: "ad spend managed" },
  retentionLift: { v: "+38%", l: "avg retention lift" },
} as const;

/**
 * Canonical experience claims. Every page must reference these - never
 * invent a new "X+ years" figure. Founder = individual, avg = team-wide
 * average, tiers = role structure documented on /company/team.
 */
export const EXPERIENCE = {
  founder: { v: "10+", label: "years founder operating experience", noun: "a decade" },
  avgOperator: { v: "7+", label: "yrs avg operator experience" },
  tiers: {
    director: "10+ years ecommerce",
    lead: "6+ years in the discipline",
    seniorSpecialist: "4+ years in the discipline",
    specialist: "2+ years, always paired",
  },
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
