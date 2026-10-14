/**
 * Deterministic UK city geography for the location pages (P1 fix, Oct 2026).
 *
 * Problem: the location template's "nearby cities" block listed the first N
 * locations in array order (so Poole showed London and Birmingham as "nearby"),
 * and a narrative-level `nearby` array was hand-maintained per city.
 *
 * Fix: coordinates below were verified with a geocoder (CITY-level match,
 * relevance 100, United Kingdom) on 2026-10-14 — never hand-written from
 * memory. `nearbySlugs()` computes the N nearest cities by haversine
 * distance, excluding the city itself, so the list is deterministic and
 * cannot drift.
 */

export interface CityGeo {
  slug: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface NearbyCity extends CityGeo {
  km: number;
}

export const CITY_GEO: CityGeo[] = [
  { slug: "london", city: "London", latitude: 51.50643, longitude: -0.12719 },
  { slug: "manchester", city: "Manchester", latitude: 53.47548, longitude: -2.25125 },
  { slug: "birmingham", city: "Birmingham", latitude: 52.47891, longitude: -1.90592 },
  { slug: "glasgow", city: "Glasgow", latitude: 55.85783, longitude: -4.24251 },
  { slug: "bristol", city: "Bristol", latitude: 51.45526, longitude: -2.59651 },
  { slug: "leeds", city: "Leeds", latitude: 53.7948, longitude: -1.54655 },
  { slug: "liverpool", city: "Liverpool", latitude: 53.41005, longitude: -2.9784 },
  { slug: "leicester", city: "Leicester", latitude: 52.63796, longitude: -1.14042 },
  { slug: "nottingham", city: "Nottingham", latitude: 52.94798, longitude: -1.15157 },
  { slug: "edinburgh", city: "Edinburgh", latitude: 55.95438, longitude: -3.20144 },
  { slug: "sheffield", city: "Sheffield", latitude: 53.38311, longitude: -1.46453 },
  { slug: "poole", city: "Poole", latitude: 50.71433, longitude: -1.98664 },
  { slug: "newcastle-upon-tyne", city: "Newcastle upon Tyne", latitude: 54.97789, longitude: -1.61162 },
  { slug: "bradford", city: "Bradford", latitude: 53.79572, longitude: -1.7583 },
];

const EARTH_KM = 6371;

function haversineKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const s1 = Math.sin(dLat / 2);
  const s2 = Math.sin(dLon / 2);
  const h =
    s1 * s1 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * s2 * s2;
  return 2 * EARTH_KM * Math.asin(Math.sqrt(h));
}

/**
 * The `count` nearest cities to `slug` (excluding itself), ordered by
 * great-circle distance. Deterministic: same input → same output.
 */
export function nearbySlugs(slug: string, count = 3): NearbyCity[] {
  const origin = CITY_GEO.find((c) => c.slug === slug);
  if (!origin) return [];
  return CITY_GEO.filter((c) => c.slug !== slug)
    .map((c) => ({
      ...c,
      km: haversineKm(origin.latitude, origin.longitude, c.latitude, c.longitude),
    }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count);
}

/** Distance in km between two city slugs (for tests / debugging). */
export function distanceKm(aSlug: string, bSlug: string): number | null {
  const a = CITY_GEO.find((c) => c.slug === aSlug);
  const b = CITY_GEO.find((c) => c.slug === bSlug);
  if (!a || !b) return null;
  return haversineKm(a.latitude, a.longitude, b.latitude, b.longitude);
}
