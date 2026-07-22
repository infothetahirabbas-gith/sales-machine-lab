import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SITE = "https://beingecom.com/";
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

async function assertAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!data) throw new Error("Forbidden");
}

export type GscRow = {
  slug: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

async function fetchPage(slug: string, startDate: string, endDate: string): Promise<GscRow> {
  const url = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
  const body = {
    startDate,
    endDate,
    dimensions: ["page"],
    dimensionFilterGroups: [
      {
        filters: [
          {
            dimension: "page",
            operator: "equals",
            expression: `https://beingecom.com/locations/${slug}`,
          },
        ],
      },
    ],
    rowLimit: 1,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LOVABLE_API_KEY!}`,
      "X-Connection-Api-Key": process.env.GOOGLE_SEARCH_CONSOLE_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`GSC ${slug} failed [${res.status}]: ${t}`);
  }
  const json = (await res.json()) as { rows?: Array<{ clicks: number; impressions: number; ctr: number; position: number }> };
  const row = json.rows?.[0];
  return {
    slug,
    clicks: row?.clicks ?? 0,
    impressions: row?.impressions ?? 0,
    ctr: row?.ctr ?? 0,
    position: row?.position ?? 0,
  };
}

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

export const fetchCurrentLocationGsc = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { slugs: string[]; days?: number }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    if (!process.env.LOVABLE_API_KEY || !process.env.GOOGLE_SEARCH_CONSOLE_API_KEY) {
      throw new Error(
        "Search Console connector not linked. Link Google Search Console in project connectors first.",
      );
    }
    const days = Math.min(Math.max(data.days ?? 28, 7), 90);
    // GSC data lags 2-3 days; skip the last 3 for a clean window.
    const endDate = isoDaysAgo(3);
    const startDate = isoDaysAgo(3 + days);
    const rows = await Promise.all(data.slugs.map((s) => fetchPage(s, startDate, endDate)));
    return { startDate, endDate, days, rows };
  });
