import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Strategy-call lead capture (P0 fix, Oct 2026).
 *
 * The old contact form only fired analytics events and showed a success
 * message — lead data never left the browser. This server function is the
 * real pipeline: validate → dedupe → persist → confirm.
 *
 * Storage: Supabase `strategy_call_leads` table (see
 * supabase/migrations/20261014_strategy_call_leads.sql). The service-role
 * client bypasses RLS; there are intentionally NO public policies, so only
 * this server function can write.
 *
 * If the table does not exist yet (migration not applied), the function
 * throws a clear, honest error — the form shows a failure message, never
 * a false success.
 */

const REVENUE_OPTIONS = ["£0 - £5K", "£5K - £25K", "£25K - £100K", "£100K+"] as const;
const SPEND_OPTIONS = ["£0 - £1K", "£1K - £5K", "£5K - £25K", "£25K+"] as const;

const stripTags = (s: string) =>
  s
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const normalizeStoreUrl = (raw: string): string | null => {
  const v = raw.trim();
  if (!v) return null;
  try {
    const u = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
    if (!u.hostname.includes(".")) return null;
    return u.toString().slice(0, 300);
  } catch {
    return null;
  }
};

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  store: z.string().trim().min(4).max(300),
  revenue: z.enum(REVENUE_OPTIONS).optional().nullable(),
  spend: z.enum(SPEND_OPTIONS).optional().nullable(),
  message: z.string().trim().max(2000).optional().nullable(),
  plan: z.string().trim().max(60).optional().nullable(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please accept the privacy consent to send your enquiry." }),
  }),
  idempotencyKey: z.string().uuid(),
  // Honeypot — genuine browsers leave it empty; bots fill it.
  website: z.string().max(0).optional().nullable(),
  // Attribution (optional, from the location CTA that brought the visitor)
  city: z.string().trim().max(80).optional().nullable(),
  citySlug: z.string().trim().max(80).optional().nullable(),
  region: z.string().trim().max(80).optional().nullable(),
  placement: z.string().trim().max(80).optional().nullable(),
});

// --- Best-effort per-IP rate limiting (in-memory).
// NOTE: on Cloudflare Workers this is per-isolate, not global — it slows
// casual abuse but is not a distributed rate limiter. Cloudflare's edge
// bot management remains the primary abuse control.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

async function clientIp(): Promise<string> {
  try {
    const { getRequest } = await import("@tanstack/react-start/server");
    const req = getRequest() as Request;
    const fwd = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0].trim().slice(0, 64);
  } catch {
    /* request not available in this context — skip IP limiting */
  }
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  if (ip === "unknown") return true;
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (arr.length >= RATE_MAX) return false;
  arr.push(now);
  hits.set(ip, arr);
  // Prevent unbounded growth
  if (hits.size > 5000) {
    const oldest = [...hits.keys()][0];
    hits.delete(oldest);
  }
  return true;
}

export const saveStrategyCallLead = createServerFn({ method: "POST" })
  .inputValidator((data) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    // 1. Honeypot — silently accept (don't tip off bots), store nothing.
    if (data.website && data.website.length > 0) {
      return { ok: true as const, id: null as string | null, duplicate: false };
    }

    // 2. Rate limit.
    const ip = await clientIp();
    if (!checkRateLimit(ip)) {
      throw new Error(
        "Too many enquiries from your connection. Please wait a few minutes and try again.",
      );
    }

    // 3. Normalize + sanitize.
    const storeUrl = normalizeStoreUrl(data.store);
    if (!storeUrl) {
      throw new Error("Please enter a valid store URL.");
    }
    const message = data.message ? stripTags(data.message).slice(0, 2000) : null;

    // 4. Persist.
    let supabaseAdmin: typeof import("@/integrations/supabase/client.server").supabaseAdmin;
    try {
      supabaseAdmin = (await import("@/integrations/supabase/client.server")).supabaseAdmin;
    } catch (err) {
      console.error("[strategy-call] supabase client unavailable", err);
      throw new Error("Lead capture is not configured yet. Please email us directly instead.");
    }

    const row = {
      idempotency_key: data.idempotencyKey,
      name: stripTags(data.name).slice(0, 120),
      email: data.email.toLowerCase(),
      store_url: storeUrl,
      revenue: data.revenue ?? null,
      spend: data.spend ?? null,
      message,
      plan: data.plan ? stripTags(data.plan).slice(0, 60) : null,
      consent: true,
      city: data.city ? stripTags(data.city).slice(0, 80) : null,
      city_slug: data.citySlug ? stripTags(data.citySlug).slice(0, 80) : null,
      region: data.region ? stripTags(data.region).slice(0, 80) : null,
      placement: data.placement ? stripTags(data.placement).slice(0, 80) : null,
      source: "contact-form",
      notification_status: "pending",
    };

    const { data: inserted, error } = await supabaseAdmin
      .from("strategy_call_leads")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      // Idempotency: same key seen before → return the original lead, no duplicate.
      if (error.code === "23505") {
        const { data: existing } = await supabaseAdmin
          .from("strategy_call_leads")
          .select("id")
          .eq("idempotency_key", data.idempotencyKey)
          .single();
        return {
          ok: true as const,
          id: (existing?.id as string | undefined) ?? null,
          duplicate: true,
        };
      }
      console.error("[strategy-call] lead insert failed", {
        code: error.code,
        message: error.message,
      });
      // Missing table (migration not applied yet) → honest error, never false success.
      if (error.code === "42P01") {
        throw new Error("Lead capture is not configured yet. Please email us directly instead.");
      }
      throw new Error("We couldn't save your enquiry. Please try again in a moment.");
    }

    // 5. Notification is a best-effort channel, not the authority.
    // No email provider is configured yet — the lead is safely stored and
    // flagged `notification_status = 'pending'` for the owner to follow up.
    // (Owner: wire STRATEGY_CALL_NOTIFY_* / a Resend webhook when ready.)

    return {
      ok: true as const,
      id: (inserted?.id as string | undefined) ?? null,
      duplicate: false,
    };
  });
