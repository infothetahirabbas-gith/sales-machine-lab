// Location page attribution helpers.
// - Auto-appends city-specific UTM params to every outbound link on /locations/*.
// - Persists city + variant in sessionStorage so /contact and /audit can fire
//   conversion events attributed back to the city that referred them.
// - Deterministic A/B assignment for the meta title/description experiment
//   (28-day window, sticky per browser).

const STORAGE_CITY = "be_source_city";
const STORAGE_VARIANT_PREFIX = "be_loc_variant_";
const STORAGE_VARIANT_EXP = "be_loc_variant_exp";

// Experiment window: 28 days from first assignment.
const VARIANT_TTL_MS = 28 * 24 * 60 * 60 * 1000;

export type LocationCtx = {
  city: string;
  slug: string;
  region: string;
  placement: string;
  variant?: "A" | "B";
};

/** Build a UTM-tagged URL for a same-origin path. */
export function buildLocationLink(path: string, ctx: LocationCtx): string {
  const params = new URLSearchParams({
    utm_source: "beingecom",
    utm_medium: "location_page",
    utm_campaign: `location_${ctx.slug}`,
    utm_content: ctx.placement,
  });
  if (ctx.variant) params.set("utm_term", `meta_${ctx.variant.toLowerCase()}`);
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}${params.toString()}`;
}

/** Append UTM params to an external URL (e.g. WhatsApp wa.me). */
export function withLocationUtm(url: string, ctx: LocationCtx): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "beingecom");
    u.searchParams.set("utm_medium", "location_page");
    u.searchParams.set("utm_campaign", `location_${ctx.slug}`);
    u.searchParams.set("utm_content", ctx.placement);
    if (ctx.variant) u.searchParams.set("utm_term", `meta_${ctx.variant.toLowerCase()}`);
    return u.toString();
  } catch {
    return url;
  }
}

/** Persist attribution so /contact and /audit can read it on submit. */
export function stashLocationAttribution(ctx: LocationCtx): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      STORAGE_CITY,
      JSON.stringify({
        city: ctx.city,
        slug: ctx.slug,
        region: ctx.region,
        placement: ctx.placement,
        variant: ctx.variant ?? null,
        ts: Date.now(),
      }),
    );
  } catch { /* no-op */ }
}

export type StashedAttribution = {
  city: string;
  slug: string;
  region: string;
  placement: string;
  variant: "A" | "B" | null;
  ts: number;
};

/** Read attribution (falls back to UTM in current URL, then null). */
export function readLocationAttribution(): StashedAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_CITY);
    if (raw) return JSON.parse(raw) as StashedAttribution;
  } catch { /* no-op */ }
  // Fallback: parse ?utm_campaign=location_{slug} from current URL.
  try {
    const p = new URLSearchParams(window.location.search);
    const camp = p.get("utm_campaign");
    if (camp?.startsWith("location_")) {
      return {
        city: "",
        slug: camp.replace("location_", ""),
        region: "",
        placement: p.get("utm_content") ?? "",
        variant: (p.get("utm_term")?.replace("meta_", "").toUpperCase() as "A" | "B") ?? null,
        ts: Date.now(),
      };
    }
  } catch { /* no-op */ }
  return null;
}

/**
 * Deterministic 50/50 variant assignment for the meta A/B test.
 * Persists per browser for a 28-day window. Query override `?ab=A|B`.
 */
export function assignMetaVariant(slug: string): "A" | "B" {
  if (typeof window === "undefined") return "A";
  try {
    const p = new URLSearchParams(window.location.search);
    const override = p.get("ab");
    if (override === "A" || override === "B") return override;

    const expRaw = window.localStorage.getItem(STORAGE_VARIANT_EXP);
    const exp = expRaw ? parseInt(expRaw, 10) : 0;
    if (exp && Date.now() > exp) {
      // Window closed - clear all variant assignments.
      Object.keys(window.localStorage)
        .filter((k) => k.startsWith(STORAGE_VARIANT_PREFIX))
        .forEach((k) => window.localStorage.removeItem(k));
      window.localStorage.removeItem(STORAGE_VARIANT_EXP);
    }

    const key = STORAGE_VARIANT_PREFIX + slug;
    const existing = window.localStorage.getItem(key);
    if (existing === "A" || existing === "B") return existing;

    const v: "A" | "B" = Math.random() < 0.5 ? "A" : "B";
    window.localStorage.setItem(key, v);
    if (!exp) {
      window.localStorage.setItem(STORAGE_VARIANT_EXP, String(Date.now() + VARIANT_TTL_MS));
    }
    return v;
  } catch {
    return "A";
  }
}
