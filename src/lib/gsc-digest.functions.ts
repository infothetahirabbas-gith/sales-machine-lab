import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// Baseline JSON is safe to import server-side.
import baseline from "./gsc-location-baseline.json";
import { LOCATIONS } from "./locations-industries";
import { LOCATION_META, LOCATION_META_B, EXPERIMENT_ASSIGNMENT } from "./location-seo-meta";

type BaselineRow = { clicks: number; impressions: number; ctr: number; position: number };
type BaselineFile = {
  capturedAt: string;
  windowStart: string;
  windowEnd: string;
  windowDays: number;
  pages: Record<string, BaselineRow>;
};

const BASELINE = baseline as unknown as BaselineFile;

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

async function gscPage(slug: string, startDate: string, endDate: string) {
  const url = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LOVABLE_API_KEY!}`,
      "X-Connection-Api-Key": process.env.GOOGLE_SEARCH_CONSOLE_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions: ["page"],
      dimensionFilterGroups: [{
        filters: [{ dimension: "page", operator: "equals", expression: `https://beingecom.com/locations/${slug}` }],
      }],
      rowLimit: 1,
    }),
  });
  if (!res.ok) throw new Error(`GSC ${slug} [${res.status}]: ${await res.text()}`);
  const json = (await res.json()) as { rows?: Array<BaselineRow> };
  const row = json.rows?.[0];
  return {
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

const fmtPct = (n: number) => `${(n * 100).toFixed(2)}%`;
const fmtPos = (n: number) => (n ? n.toFixed(1) : "-");
const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`);

export const buildLocationDigest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { days?: number }) => data ?? {})
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    if (!process.env.LOVABLE_API_KEY || !process.env.GOOGLE_SEARCH_CONSOLE_API_KEY) {
      throw new Error("Search Console connector not linked.");
    }
    const days = Math.min(Math.max(data.days ?? BASELINE.windowDays, 7), 90);
    const endDate = isoDaysAgo(3);
    const startDate = isoDaysAgo(3 + days);

    const slugs = Object.keys(BASELINE.pages);
    const rows = await Promise.all(
      slugs.map(async (slug) => {
        const b = BASELINE.pages[slug];
        const c = await gscPage(slug, startDate, endDate);
        const loc = LOCATIONS.find((l) => l.slug === slug);
        const variant = EXPERIMENT_ASSIGNMENT[slug] ?? "A";
        return {
          slug,
          city: loc?.city ?? slug,
          variant,
          baseline: b,
          current: c,
          dClicks: c.clicks - b.clicks,
          dImpr: c.impressions - b.impressions,
          dCtr: c.ctr - b.ctr,
          dPos: c.position - b.position,
        };
      }),
    );

    const totals = rows.reduce(
      (acc, r) => {
        acc.baseClicks += r.baseline.clicks;
        acc.curClicks += r.current.clicks;
        acc.baseImpr += r.baseline.impressions;
        acc.curImpr += r.current.impressions;
        return acc;
      },
      { baseClicks: 0, curClicks: 0, baseImpr: 0, curImpr: 0 },
    );

    // CTR winners per cohort (aggregate ctr weighted by impressions).
    const cohort = { A: { impr: 0, clicks: 0 }, B: { impr: 0, clicks: 0 } };
    rows.forEach((r) => {
      const key = r.variant === "B" ? "B" : "A";
      cohort[key].impr += r.current.impressions;
      cohort[key].clicks += r.current.clicks;
    });
    const ctrA = cohort.A.impr ? cohort.A.clicks / cohort.A.impr : 0;
    const ctrB = cohort.B.impr ? cohort.B.clicks / cohort.B.impr : 0;
    const winner = ctrA === ctrB ? "tie" : ctrA > ctrB ? "A" : "B";

    // Plain text digest.
    const lines: string[] = [];
    lines.push(`BeingEcom - Location page performance digest`);
    lines.push(`Baseline: ${BASELINE.windowStart} to ${BASELINE.windowEnd} (${BASELINE.windowDays}d)`);
    lines.push(`Current:  ${startDate} to ${endDate} (${days}d)`);
    lines.push("");
    lines.push(`Totals: clicks ${totals.baseClicks} -> ${totals.curClicks} (${sign(totals.curClicks - totals.baseClicks)}), impressions ${totals.baseImpr} -> ${totals.curImpr} (${sign(totals.curImpr - totals.baseImpr)})`);
    lines.push(`A/B CTR: cohort A ${fmtPct(ctrA)} vs cohort B ${fmtPct(ctrB)} -> winner: ${winner}`);
    lines.push("");
    lines.push(`Per-city:`);
    rows.forEach((r) => {
      lines.push(
        `- ${r.city} (${r.variant}): clicks ${r.baseline.clicks}->${r.current.clicks} (${sign(r.dClicks)}), CTR ${fmtPct(r.baseline.ctr)}->${fmtPct(r.current.ctr)}, pos ${fmtPos(r.baseline.position)}->${fmtPos(r.current.position)} (${r.dPos.toFixed(1)})`,
      );
    });
    const text = lines.join("\n");

    // HTML digest (simple table).
    const html = `<!doctype html><meta charset="utf-8"><title>Location digest</title>
<h2>Location page performance digest</h2>
<p>Baseline <b>${BASELINE.windowStart}</b> to <b>${BASELINE.windowEnd}</b>. Current <b>${startDate}</b> to <b>${endDate}</b>.</p>
<p><b>Totals</b> - clicks ${totals.baseClicks} &rarr; ${totals.curClicks} (${sign(totals.curClicks - totals.baseClicks)}), impressions ${totals.baseImpr} &rarr; ${totals.curImpr} (${sign(totals.curImpr - totals.baseImpr)}).</p>
<p><b>A/B CTR</b> - Cohort A ${fmtPct(ctrA)} vs Cohort B ${fmtPct(ctrB)} &rarr; winner: <b>${winner}</b>.</p>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:13px">
<thead><tr><th>City</th><th>Variant</th><th>Clicks</th><th>&Delta;</th><th>Impr.</th><th>CTR</th><th>Position</th><th>&Delta; pos</th></tr></thead>
<tbody>
${rows.map((r) => `<tr>
<td>${r.city}</td>
<td>${r.variant}</td>
<td>${r.baseline.clicks} &rarr; <b>${r.current.clicks}</b></td>
<td>${sign(r.dClicks)}</td>
<td>${r.baseline.impressions} &rarr; ${r.current.impressions}</td>
<td>${fmtPct(r.baseline.ctr)} &rarr; ${fmtPct(r.current.ctr)}</td>
<td>${fmtPos(r.baseline.position)} &rarr; ${fmtPos(r.current.position)}</td>
<td>${r.dPos.toFixed(1)}</td>
</tr>`).join("")}
</tbody></table>
<p style="color:#666;font-size:12px">Lower position is better. Positions delta shown as raw diff. Meta variant reference: A = ${Object.keys(LOCATION_META).length} entries; B = ${Object.keys(LOCATION_META_B).length} entries.</p>`;

    return { startDate, endDate, days, totals, ctrA, ctrB, winner, rows, text, html };
  });
