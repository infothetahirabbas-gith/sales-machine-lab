import { useEffect, useState } from "react";
import { ArrowUpRight, TrendingUp, TrendingDown, Facebook, Instagram, MousePointerClick, Eye, DollarSign, Target, Award, Quote, Globe, ShoppingBag, Shirt, Coffee, Watch, Sparkles, Dog, Sofa, Dumbbell } from "lucide-react";
import showcaseApparel from "@/assets/showcase-apparel.jpg";
import showcaseCoffee from "@/assets/showcase-coffee.jpg";
import showcaseJewelry from "@/assets/showcase-jewelry.jpg";
import showcaseBeauty from "@/assets/showcase-beauty.jpg";
import showcaseFurniture from "@/assets/showcase-furniture.jpg";
import showcaseActivewear from "@/assets/showcase-activewear.jpg";
import showcasePet from "@/assets/showcase-pet.jpg";
import showcaseEyewear from "@/assets/showcase-eyewear.jpg";
import showcaseSupplements from "@/assets/showcase-supplements.jpg";

/* ------------------- 1. FEATURED STORE WEBSITES (auto-running carousel) ------------------- */
const featuredStores = [
  { img: showcaseApparel, metrics: [{ v: "11.9×", l: "Revenue lift" }, { v: "3.8×", l: "Blended ROAS" }, { v: "4.6%", l: "Conv. rate" }], live: "3.8×", summary: "Rebuilt PDP, restructured Meta funnel, launched 9 Klaviyo flows — $18K → $214K MRR." },
  { img: showcaseCoffee, metrics: [{ v: "3.9×", l: "LTV growth" }, { v: "68%", l: "Sub-rate" }, { v: "+88%", l: "Page CR" }], live: "4.2×", summary: "Subscription-only funnel + new sub-page design — 68% of new buyers convert to recurring." },
  { img: showcaseJewelry, metrics: [{ v: "5.6×", l: "BFCM ROAS" }, { v: "$420K", l: "Q4 revenue" }, { v: "+56%", l: "AOV" }], live: "5.6×", summary: "90-day pre-warm + gifting CRO — Q4 grew 212% YoY with 5.6× ROAS during BFCM." },
  { img: showcaseBeauty, metrics: [{ v: "4.1×", l: "TikTok ROAS" }, { v: "+62%", l: "New customers" }, { v: "-28%", l: "CPM" }], live: "4.1×", summary: "Creator-led UGC stack on TikTok with 1:1 landing pages per angle — Meta no longer the only channel." },
  { img: showcaseFurniture, metrics: [{ v: "$310K", l: "MRR" }, { v: "4.1×", l: "ROAS" }, { v: "$1.2K", l: "AOV" }], live: "4.1×", summary: "High-AOV Meta funnel with 21-day attribution and showroom-style video — scaled to $310K/mo." },
  { img: showcaseActivewear, metrics: [{ v: "+$71K", l: "New rev" }, { v: "3.4×", l: "Affiliate ROAS" }, { v: "62", l: "Creators" }], live: "3.4×", summary: "TikTok Shop seeding + affiliate program — monetized massive organic into +$71K/mo." },
  { img: showcasePet, metrics: [{ v: "$94K", l: "MRR" }, { v: "5.2×", l: "ROAS" }, { v: "+340%", l: "Non-brand" }], live: "5.2×", summary: "Google PMax + Standard Shopping split with weekly negative pruning — non-brand traffic up 340%." },
  { img: showcaseEyewear, metrics: [{ v: "+180%", l: "CTR" }, { v: "-34%", l: "CPC" }, { v: "+71%", l: "ROAS" }], live: "4.7×", summary: "Hook-first creative storyboards, 30 hooks tested per concept — CTR up 180% and CPC down 34%." },
  { img: showcaseSupplements, metrics: [{ v: "$180K", l: "MRR" }, { v: "3.1×", l: "ROAS" }, { v: "+44%", l: "AOV" }], live: "3.1×", summary: "Bundle-focused offer architecture + subscription upsell — broke through $25K plateau to $180K/mo." },
];

function StoreCard({ s }: { s: typeof featuredStores[number] }) {
  return (
    <div className="group w-full">
      <div className="rounded-2xl overflow-hidden border border-border shadow-xl bg-white relative">
        {/* Browser chrome (no URL) */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#f1f3f5] border-b border-border">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        {/* Website screenshot */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={s.img}
            alt="Live store showcase"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {/* Floating live ROAS */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur rounded-xl shadow-xl border border-border px-3 py-2 group-hover:-translate-y-1 transition-transform">
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Live ROAS</div>
            <div className="text-sm font-bold text-primary flex items-center gap-1">
              {s.live} <TrendingUp className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{s.summary}</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {s.metrics.map((m) => (
            <div key={m.l} className="rounded-xl border border-border bg-white p-2.5 text-center">
              <div className="text-base font-bold text-gradient">{m.v}</div>
              <div className="text-[9px] uppercase tracking-wide text-muted-foreground mt-0.5">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturedStoresSection() {
  // 9 stores → 3 pages of 3, auto-advance every 4s
  const pageSize = 3;
  const pages = Math.ceil(featuredStores.length / pageSize);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPage((p) => (p + 1) % pages), 4000);
    return () => clearInterval(id);
  }, [pages]);

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[oklch(0.98_0.01_245)] to-white" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/10 blur-[140px] rounded-full" />
      <div className="relative">
        <div className="text-center max-w-2xl mx-auto mb-14 px-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Featured Stores
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink leading-tight">
            The websites <span className="text-gradient">behind the numbers</span>
          </h2>
        </div>

        {/* Paginated slider — 3 at a time, 3 pages */}
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {Array.from({ length: pages }).map((_: unknown, p: number) => (
                <div key={p} className="w-full shrink-0 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredStores.slice(p * pageSize, p * pageSize + pageSize).map((s, i) => (
                    <StoreCard key={`${p}-${i}`} s={s} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



/* ------------------- 2. ADS DASHBOARD ------------------- */
const adsRows = [
  { name: "ASC | Apparel | Broad", platform: "meta", status: "Active", spend: "$8,420", roas: "4.32×", purchases: 412, cpa: "$20.43", delta: "+38%" },
  { name: "PMax | Spring Collection", platform: "google", status: "Active", spend: "$6,180", roas: "6.12×", purchases: 287, cpa: "$21.53", delta: "+62%" },
  { name: "Retargeting | 14D View", platform: "meta", status: "Active", spend: "$1,840", roas: "8.41×", purchases: 156, cpa: "$11.79", delta: "+24%" },
  { name: "TikTok Spark | UGC Stack", platform: "tiktok", status: "Active", spend: "$3,210", roas: "3.88×", purchases: 198, cpa: "$16.21", delta: "+91%" },
  { name: "IG Reels | Hero SKU", platform: "ig", status: "Active", spend: "$2,640", roas: "4.96×", purchases: 174, cpa: "$15.17", delta: "+44%" },
  { name: "Shopping | Top Margin", platform: "google", status: "Active", spend: "$4,810", roas: "5.71×", purchases: 312, cpa: "$15.42", delta: "+28%" },
];

function PlatformBadge({ p }: { p: string }) {
  const map: Record<string, { Icon: typeof Facebook; bg: string; label: string }> = {
    meta: { Icon: Facebook, bg: "bg-[#1877F2]", label: "Meta" },
    google: { Icon: Target, bg: "bg-[#34A853]", label: "Google" },
    tiktok: { Icon: MousePointerClick, bg: "bg-ink", label: "TikTok" },
    ig: { Icon: Instagram, bg: "bg-gradient-to-br from-[#feda75] via-[#fa7e1e] to-[#d62976]", label: "Instagram" },
  };
  const c = map[p];
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink/80">
      <span className={`w-5 h-5 rounded-md flex items-center justify-center text-white ${c.bg}`}>
        <c.Icon className="w-3 h-3" />
      </span>
      {c.label}
    </span>
  );
}

function MiniBars({ count = 14, accent = "bg-primary" }: { count?: number; accent?: string }) {
  const heights = Array.from({ length: count }, (_, i) => 30 + ((i * 37) % 70));
  return (
    <div className="flex items-end gap-1 h-10">
      {heights.map((h, i) => (
        <div key={i} className={`w-1.5 rounded-sm ${accent} opacity-70`} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

export function AdsDashboardSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0a0d14] relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[420px] h-[420px] bg-primary/20 blur-[140px] rounded-full" />
      <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] bg-[#7c5cff]/20 blur-[140px] rounded-full" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Ads Performance
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight">
            What our paid accounts <span className="text-gradient">actually look like</span>
          </h2>
          <p className="mt-3 text-white/60">Live snapshot from one of our managed Shopify accounts. Numbers blurred for client privacy.</p>
        </div>

        {/* KPI cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { l: "Spend (30D)", v: "$127,840", d: "+18%", Icon: DollarSign, up: true },
            { l: "Revenue (30D)", v: "$612,440", d: "+62%", Icon: TrendingUp, up: true },
            { l: "Blended ROAS", v: "4.79×", d: "+1.4×", Icon: Target, up: true },
            { l: "Blended CAC", v: "$24.12", d: "-31%", Icon: TrendingDown, up: false },
          ].map((k) => (
            <div key={k.l} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-widest text-white/50">{k.l}</div>
                <k.Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{k.v}</div>
              <div className={`mt-2 inline-flex items-center gap-1 text-[11px] font-semibold ${k.up ? "text-[#4ade80]" : "text-[#4ade80]"}`}>
                {k.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {k.d} vs prior 30D
              </div>
              <div className="mt-3 text-primary">
                <MiniBars accent={k.up ? "bg-primary" : "bg-[#4ade80]"} />
              </div>
            </div>
          ))}
        </div>

        {/* Campaign table */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div>
              <div className="text-sm font-bold text-white">Top campaigns · last 30 days</div>
              <div className="text-[11px] text-white/50">Cross-platform unified view</div>
            </div>
            <div className="flex gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-full bg-[#4ade80]/10 text-[#4ade80] font-semibold inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" /> Live
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-white/40 text-left">
                  <th className="px-5 py-3 font-semibold">Campaign</th>
                  <th className="px-3 py-3 font-semibold">Platform</th>
                  <th className="px-3 py-3 font-semibold text-right">Spend</th>
                  <th className="px-3 py-3 font-semibold text-right">ROAS</th>
                  <th className="px-3 py-3 font-semibold text-right hidden md:table-cell">Purchases</th>
                  <th className="px-3 py-3 font-semibold text-right hidden md:table-cell">CPA</th>
                  <th className="px-5 py-3 font-semibold text-right">Δ ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {adsRows.map((r) => (
                  <tr key={r.name} className="hover:bg-white/[0.03] transition">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-white">{r.name}</div>
                      <div className="text-[10px] text-[#4ade80] mt-0.5 inline-flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#4ade80]" /> {r.status}
                      </div>
                    </td>
                    <td className="px-3 py-4"><PlatformBadge p={r.platform} /></td>
                    <td className="px-3 py-4 text-right text-white/90 font-mono">{r.spend}</td>
                    <td className="px-3 py-4 text-right font-bold text-primary font-mono">{r.roas}</td>
                    <td className="px-3 py-4 text-right text-white/70 font-mono hidden md:table-cell">{r.purchases}</td>
                    <td className="px-3 py-4 text-right text-white/70 font-mono hidden md:table-cell">{r.cpa}</td>
                    <td className="px-5 py-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[#4ade80] font-semibold text-xs">
                        <TrendingUp className="w-3 h-3" /> {r.delta}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------- 3. CONVERSION FUNNEL BEFORE/AFTER ------------------- */
const funnels = [
  {
    label: "Apparel store",
    before: [{ l: "Visitors", v: 100, n: "100,000" }, { l: "PDP views", v: 38, n: "38,000" }, { l: "Add to cart", v: 8, n: "8,000" }, { l: "Checkout", v: 3.2, n: "3,200" }, { l: "Purchase", v: 1.1, n: "1,100" }],
    after: [{ l: "Visitors", v: 100, n: "100,000" }, { l: "PDP views", v: 52, n: "52,000" }, { l: "Add to cart", v: 19, n: "19,000" }, { l: "Checkout", v: 9.1, n: "9,100" }, { l: "Purchase", v: 4.6, n: "4,600" }],
  },
];

function FunnelBar({ steps, accent }: { steps: { l: string; v: number; n: string }[]; accent: string }) {
  return (
    <div className="space-y-2.5">
      {steps.map((s) => (
        <div key={s.l}>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="font-semibold text-ink/80">{s.l}</span>
            <span className="font-mono text-muted-foreground">{s.n} · {s.v}%</span>
          </div>
          <div className="h-7 rounded-full bg-secondary/60 overflow-hidden">
            <div className={`h-full rounded-full ${accent} flex items-center px-3`} style={{ width: `${s.v}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FunnelSection() {
  const f = funnels[0];
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Conversion Funnel
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink leading-tight">
            Same traffic. <span className="text-gradient">4× more revenue.</span>
          </h2>
          <p className="mt-3 text-muted-foreground">{f.label} — every step of the funnel rebuilt with CRO + UX.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card-surface p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Before</div>
              <div className="text-[11px] text-muted-foreground">CR: <span className="text-ink font-bold">1.1%</span></div>
            </div>
            <FunnelBar steps={f.before} accent="bg-gradient-to-r from-[oklch(0.85_0.03_30)] to-[oklch(0.7_0.06_30)]" />
          </div>
          <div className="card-surface p-6 md:p-8 ring-2 ring-primary/30 relative">
            <div className="absolute -top-3 right-6 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">After BeingEcom</div>
            <div className="flex items-center justify-between mb-5">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">After</div>
              <div className="text-[11px] text-muted-foreground">CR: <span className="text-primary font-bold">4.6%</span></div>
            </div>
            <FunnelBar steps={f.after} accent="bg-gradient-to-r from-primary to-[oklch(0.55_0.2_265)]" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { v: "+4.2×", l: "Conversion rate" },
            { v: "+138%", l: "Add-to-cart" },
            { v: "+184%", l: "Checkouts" },
            { v: "+318%", l: "Net purchases" },
          ].map((m) => (
            <div key={m.l} className="card-surface p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-gradient">{m.v}</div>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------- 4. REVENUE GROWTH TIMELINE ------------------- */
const timeline = [
  { m: "Month 1", t: "Audit + foundations", d: "Tech audit, GA4 / Pixel cleanup, baseline reporting locked in.", v: "$22K MRR" },
  { m: "Month 2", t: "Quick CRO wins", d: "PDP rebuild, cart drawer, trust signals — first CR lift visible.", v: "$41K MRR" },
  { m: "Month 3", t: "Creative engine live", d: "25+ ads/week pipeline. ASC consolidation. CAC starts dropping.", v: "$78K MRR" },
  { m: "Month 4", t: "Email + SMS flows", d: "9 Klaviyo flows live. Email share of revenue jumps to 22%.", v: "$118K MRR" },
  { m: "Month 5", t: "Scaling phase", d: "Daily spend up 3.1× at same blended CAC. SEO content shipping weekly.", v: "$162K MRR" },
  { m: "Month 6", t: "Profitable scale", d: "Subscription layer launched. Blended ROAS 3.8×. New peak month.", v: "$214K MRR" },
];

export function TimelineSection() {
  return (
    <section className="py-20 lg:py-28 bg-[oklch(0.98_0.01_245)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Growth Timeline
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink leading-tight">
            How $18K MRR became <span className="text-gradient">$214K MRR</span>
          </h2>
          <p className="mt-3 text-muted-foreground">A real 6-month engagement broken down month-by-month.</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <div key={t.m} className={`grid md:grid-cols-2 gap-6 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className={`card-surface p-6 ${i % 2 ? "md:text-right" : ""}`}>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{t.m}</div>
                  <h3 className="mt-1 font-bold text-ink text-lg">{t.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.d}</p>
                </div>
                <div className={`relative flex ${i % 2 ? "md:justify-end" : "md:justify-start"}`}>
                  <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-primary shadow-lg" />
                  <div className="inline-flex items-baseline gap-2 bg-gradient-to-br from-primary to-[oklch(0.55_0.2_265)] text-white px-5 py-3 rounded-2xl shadow-xl">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-2xl font-bold">{t.v}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------- 5. INDUSTRIES WE'VE SCALED ------------------- */
const industries = [
  { Icon: Shirt, name: "Apparel & Fashion", count: 28 },
  { Icon: Sparkles, name: "Beauty & Skincare", count: 19 },
  { Icon: Coffee, name: "Food & Beverage", count: 14 },
  { Icon: Dog, name: "Pet Care", count: 11 },
  { Icon: Watch, name: "Jewelry & Accessories", count: 16 },
  { Icon: Dumbbell, name: "Supplements & Wellness", count: 13 },
  { Icon: Sofa, name: "Home & Furniture", count: 9 },
  { Icon: ShoppingBag, name: "Niche DTC", count: 22 },
];

export function IndustriesSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Categories
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-ink leading-tight">
            Industries we've <span className="text-gradient">scaled profitably</span>
          </h2>
          <p className="mt-3 text-muted-foreground">132+ stores across 8 categories. Ecom only, never SaaS or B2B.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((i) => (
            <div key={i.name} className="card-surface card-hover p-6 text-center group">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <i.Icon className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <h3 className="mt-4 font-bold text-ink">{i.name}</h3>
              <div className="mt-1 text-xs text-muted-foreground">{i.count} stores scaled</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------- 6. AWARDS & CLIENT QUOTES ------------------- */
const quotes = [
  { q: "We finally have a growth team that talks revenue, not impressions. CAC down, MRR up, every month.", n: "Priya R.", r: "Founder, Pure Botanica" },
  { q: "They rebuilt our PDP and conversion went from 1.2% to 3.6% overnight. Our biggest unlock in 3 years.", n: "Jonas W.", r: "CEO, GearLoop" },
  { q: "Honest reporting, senior team, weekly shipping. The opposite of every agency we've worked with before.", n: "Sara K.", r: "CMO, Lumen Beauty" },
];

export function ProofSection() {
  return (
    <section className="py-20 lg:py-28 bg-[oklch(0.98_0.01_245)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              Recognition
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-ink leading-tight">
              Trusted by operators. <span className="text-gradient">Backed by results.</span>
            </h2>
            <p className="mt-3 text-muted-foreground">A small selection of recent recognition and feedback.</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { v: "Top 1%", l: "Meta Agency Partner" },
                { v: "5.0★", l: "Avg Clutch rating" },
                { v: "Premier", l: "Google Partner" },
                { v: "Klaviyo", l: "Master Partner" },
              ].map((a) => (
                <div key={a.l} className="card-surface p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink leading-tight">{a.v}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{a.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 grid gap-5">
            {quotes.map((q, i) => (
              <div key={q.n} className="card-surface p-6 md:p-8 relative">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />
                <p className="text-lg md:text-xl text-ink leading-relaxed font-medium">"{q.q}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${i === 0 ? "from-[oklch(0.72_0.15_160)] to-[oklch(0.5_0.18_160)]" : i === 1 ? "from-[oklch(0.7_0.16_245)] to-[oklch(0.55_0.2_265)]" : "from-[oklch(0.72_0.15_330)] to-[oklch(0.55_0.2_320)]"} text-white font-bold flex items-center justify-center text-sm shadow-md ring-2 ring-white`}>
                    {q.n.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ink">{q.n}</div>
                    <div className="text-[11px] text-muted-foreground">{q.r}</div>
                  </div>
                  <a className="ml-auto text-xs font-bold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Read story <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------- BARREL EXPORT ------------------- */
export default function CaseStudyExtras() {
  return (
    <>
      <FeaturedStoresSection />
      <AdsDashboardSection />
      <FunnelSection />
      <TimelineSection />
      <IndustriesSection />
      <ProofSection />
    </>
  );
}
