import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getMyAdminStatus } from "@/lib/case-studies.functions";
import { fetchCurrentLocationGsc, type GscRow } from "@/lib/gsc-monitor.functions";
import { buildLocationDigest } from "@/lib/gsc-digest.functions";
import { LOCATION_META } from "@/lib/location-seo-meta";
import { LOCATIONS } from "@/lib/locations-industries";
import baseline from "@/lib/gsc-location-baseline.json";
import { ArrowUpRight, ArrowDownRight, Minus, RefreshCcw, LogOut, Mail } from "lucide-react";
import { toast } from "sonner";

type BaselineRow = { clicks: number; impressions: number; ctr: number; position: number };
type BaselineFile = {
  capturedAt: string;
  windowStart: string;
  windowEnd: string;
  windowDays: number;
  pages: Record<string, BaselineRow>;
};

const BASELINE = baseline as unknown as BaselineFile;

export const Route = createFileRoute("/admin/location-performance")({
  head: () => ({
    meta: [
      { title: "Admin · Location Performance" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LocationPerformanceDashboard,
});

function fmtPct(n: number) {
  return `${(n * 100).toFixed(2)}%`;
}
function fmtPos(n: number) {
  return n ? n.toFixed(1) : "—";
}
type Tone = "up" | "down" | "neutral";
function delta(current: number, base: number, higherIsBetter = true): { label: string; tone: Tone } {
  if (!base && !current) return { label: "—", tone: "neutral" };
  const diff = current - base;
  if (!diff) return { label: "0", tone: "neutral" };
  const good = higherIsBetter ? diff > 0 : diff < 0;
  const sign = diff > 0 ? "+" : "";
  return { label: `${sign}${diff.toFixed(2)}`, tone: good ? "up" : "down" };
}

function DeltaCell({ value, tone }: { value: string; tone: "up" | "down" | "neutral" }) {
  const Icon = tone === "up" ? ArrowUpRight : tone === "down" ? ArrowDownRight : Minus;
  const color =
    tone === "up" ? "text-emerald-600" : tone === "down" ? "text-red-600" : "text-muted-foreground";
  return (
    <span className={`inline-flex items-center gap-1 font-semibold ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      {value}
    </span>
  );
}

function LocationPerformanceDashboard() {
  const navigate = useNavigate();
  const checkAdmin = useServerFn(getMyAdminStatus);
  const fetchCurrent = useServerFn(fetchCurrentLocationGsc);

  const [status, setStatus] = useState<"checking" | "not-admin" | "ready">("checking");
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<{ startDate: string; endDate: string; rows: GscRow[] } | null>(null);

  const slugs = useMemo(() => Object.keys(BASELINE.pages), []);

  const loadCurrent = async () => {
    setLoading(true);
    try {
      const res = await fetchCurrent({ data: { slugs, days: BASELINE.windowDays } });
      setCurrent(res);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to fetch Search Console data";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      try {
        const me = await checkAdmin();
        if (!me.isAdmin) {
          setStatus("not-admin");
          return;
        }
        setStatus("ready");
        void loadCurrent();
      } catch {
        setStatus("not-admin");
      }
    };
    void init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "checking") {
    return <div className="mx-auto max-w-5xl px-6 py-24 text-muted-foreground">Checking access…</div>;
  }
  if (status === "not-admin") {
    return (
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-2xl font-bold">Not authorised</h1>
        <p className="mt-2 text-muted-foreground">You need an admin role to view this dashboard.</p>
        <Link to="/admin/login" className="mt-4 inline-block text-primary underline">
          Back to admin login
        </Link>
      </div>
    );
  }

  const currentBySlug: Record<string, GscRow | undefined> = {};
  current?.rows.forEach((r) => (currentBySlug[r.slug] = r));

  const totals = slugs.reduce(
    (acc, s) => {
      const b = BASELINE.pages[s];
      const c = currentBySlug[s];
      acc.baseClicks += b?.clicks ?? 0;
      acc.baseImpr += b?.impressions ?? 0;
      acc.curClicks += c?.clicks ?? 0;
      acc.curImpr += c?.impressions ?? 0;
      return acc;
    },
    { baseClicks: 0, baseImpr: 0, curClicks: 0, curImpr: 0 },
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink">Location page performance</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Baseline captured {BASELINE.capturedAt} ({BASELINE.windowStart} → {BASELINE.windowEnd}, {BASELINE.windowDays} days).
            {current && (
              <> Current window: {current.startDate} → {current.endDate}.</>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => void loadCurrent()}
            disabled={loading}
            className="btn btn-primary"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Loading…" : "Refresh Search Console"}
          </button>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/admin/login" });
            }}
            className="btn btn-ghost border border-border"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <SummaryCard label="Baseline clicks" value={totals.baseClicks} />
        <SummaryCard label="Current clicks" value={totals.curClicks} highlight />
        <SummaryCard label="Baseline impressions" value={totals.baseImpr} />
        <SummaryCard label="Current impressions" value={totals.curImpr} highlight />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="py-3 px-3">City</th>
              <th className="py-3 px-3">Clicks (base → now)</th>
              <th className="py-3 px-3">Δ clicks</th>
              <th className="py-3 px-3">Impr. (base → now)</th>
              <th className="py-3 px-3">CTR (base → now)</th>
              <th className="py-3 px-3">Position (base → now)</th>
              <th className="py-3 px-3">Δ pos.</th>
            </tr>
          </thead>
          <tbody>
            {slugs.map((slug) => {
              const loc = LOCATIONS.find((l) => l.slug === slug);
              const b = BASELINE.pages[slug];
              const c = currentBySlug[slug];
              const meta = LOCATION_META[slug];
              const dClicks = delta(c?.clicks ?? 0, b.clicks, true);
              const dPos = delta(c?.position ?? 0, b.position, false); // lower position = better
              return (
                <tr key={slug} className="border-t border-border align-top">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-ink">{loc?.city ?? slug}</div>
                    <a
                      href={`/locations/${slug}`}
                      className="text-xs text-primary hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      /locations/{slug}
                    </a>
                    {meta && (
                      <div className="mt-1 text-[11px] text-muted-foreground max-w-xs" title={meta.title}>
                        {meta.title.length}c title · {meta.description.length}c desc
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-muted-foreground">{b.clicks}</span>
                    <span className="mx-1">→</span>
                    <span className="font-bold text-ink">{c ? c.clicks : "…"}</span>
                  </td>
                  <td className="py-3 px-3">
                    {c ? <DeltaCell value={dClicks.label} tone={dClicks.tone} /> : "…"}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-muted-foreground">{b.impressions}</span>
                    <span className="mx-1">→</span>
                    <span className="font-bold text-ink">{c ? c.impressions : "…"}</span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="text-muted-foreground">{fmtPct(b.ctr)}</span>
                    <span className="mx-1">→</span>
                    <span className="font-bold text-ink">{c ? fmtPct(c.ctr) : "…"}</span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="text-muted-foreground">{fmtPos(b.position)}</span>
                    <span className="mx-1">→</span>
                    <span className="font-bold text-ink">{c ? fmtPos(c.position) : "…"}</span>
                  </td>
                  <td className="py-3 px-3">
                    {c ? <DeltaCell value={dPos.label} tone={dPos.tone} /> : "…"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Position delta uses lower-is-better colouring. Data comes from Google Search Console via the connector gateway and skips the last 3 days to avoid GSC lag.
      </p>
    </div>
  );
}

function SummaryCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? "border-primary/40 bg-primary/5" : "border-border bg-white"}`}>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold text-ink">{value.toLocaleString("en-GB")}</div>
    </div>
  );
}
