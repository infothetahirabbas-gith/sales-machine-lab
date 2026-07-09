// Single source of truth for headline stats shown across the site.
// Every hero, trust bar, footer or "about" number must import from here.
// Update once — updates everywhere. Numbers must be verifiable.

export const GLOBAL_STATS = {
  storesScaled: { v: "120+", l: "stores scaled" },
  trackedRevenue: { v: "£48M+", l: "tracked revenue" },
  abTests: { v: "400+", l: "A/B tests run" },
  avgRoasLift: { v: "4.1×", l: "avg ROAS lift" },
} as const;

export const HERO_STATS = [
  GLOBAL_STATS.storesScaled,
  GLOBAL_STATS.trackedRevenue,
  GLOBAL_STATS.abTests,
  GLOBAL_STATS.avgRoasLift,
];
