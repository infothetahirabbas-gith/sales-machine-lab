import { useMemo, useState } from "react";
import { TrendingDown, AlertTriangle, DollarSign, ShoppingCart, Target } from "lucide-react";

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

function Slider({
  label, value, onChange, min, max, step, suffix, prefix,
}: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; suffix?: string; prefix?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-ink">{label}</label>
        <span className="text-sm font-bold text-primary tabular-nums">
          {prefix}{value.toLocaleString()}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-secondary accent-primary"
      />
    </div>
  );
}

export default function RevenueLossCalculator() {
  const [traffic, setTraffic] = useState(20000);
  const [cr, setCr] = useState(1.4);
  const [aov, setAov] = useState(65);
  const [adSpend, setAdSpend] = useState(8000);
  const [roas, setRoas] = useState(1.6);

  const targetCr = 3.2;
  const targetRoas = 3.5;

  const calc = useMemo(() => {
    const currentSales = traffic * (cr / 100) * aov;
    const potentialSales = traffic * (targetCr / 100) * aov;
    const monthlyMiss = Math.max(0, potentialSales - currentSales);

    const currentAdRevenue = adSpend * roas;
    const potentialAdRevenue = adSpend * targetRoas;
    const adRevenueMiss = Math.max(0, potentialAdRevenue - currentAdRevenue);

    const wastedAdSpend = adSpend * Math.max(0, (targetRoas - roas) / targetRoas);

    const yearlyMiss = (monthlyMiss + adRevenueMiss) * 12;

    return {
      currentSales,
      monthlyMiss,
      adRevenueMiss,
      wastedAdSpend,
      yearlyMiss,
      totalMonthlyMiss: monthlyMiss + adRevenueMiss,
    };
  }, [traffic, cr, aov, adSpend, roas]);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-destructive/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 blur-[140px] rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-destructive">
            <AlertTriangle className="w-3.5 h-3.5" />
            Revenue Loss Calculator
          </div>
          <h2 className="mt-5 text-[26px] sm:text-3xl md:text-5xl font-bold leading-tight text-ink break-words">
            How much is your store <span className="text-sky-gradient">leaving on the table</span> every month?
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Move the sliders to match your store. We'll show the exact monthly sales you're missing, the ad budget you're burning, and the yearly revenue gap - all because there's no proven growth system in place.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Inputs */}
          <div className="lg:col-span-2 card-surface p-5 sm:p-6 lg:p-8 space-y-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <ShoppingCart className="w-4 h-4 text-primary" />
              Your store today
            </div>
            <Slider label="Monthly store visitors" value={traffic} onChange={setTraffic} min={1000} max={500000} step={1000} />
            <Slider label="Current conversion rate" value={cr} onChange={setCr} min={0.2} max={5} step={0.1} suffix="%" />
            <Slider label="Average order value" value={aov} onChange={setAov} min={20} max={500} step={5} prefix="$" />

            <div className="pt-4 border-t border-border/60 flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <Target className="w-4 h-4 text-primary" />
              Your paid ads
            </div>
            <Slider label="Monthly ad spend" value={adSpend} onChange={setAdSpend} min={500} max={100000} step={500} prefix="$" />
            <Slider label="Current ROAS" value={roas} onChange={setRoas} min={0.5} max={5} step={0.1} suffix="×" />

            <div className="text-xs text-muted-foreground bg-secondary/50 rounded-lg p-3 border border-border/40">
              Benchmark targets used: <span className="font-semibold text-ink">{targetCr}% CR</span> and <span className="font-semibold text-ink">{targetRoas}× ROAS</span> - the level our growth system consistently delivers for Shopify & WooCommerce stores.
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">
            <div className="card-surface p-5 sm:p-6 lg:p-8 bg-gradient-to-br from-destructive/5 via-card to-card border-destructive/30">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-destructive">
                <TrendingDown className="w-4 h-4" />
                Total revenue you're losing
              </div>
              <div className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold text-destructive tabular-nums break-words">
                {fmt(calc.totalMonthlyMiss)}<span className="text-xl sm:text-2xl text-muted-foreground font-semibold">/month</span>
              </div>
              <div className="mt-2 text-sm sm:text-base text-muted-foreground">
                That's <span className="font-bold text-ink">{fmt(calc.yearlyMiss)}</span> walking out the door every year.
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="card-surface p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <ShoppingCart className="w-3.5 h-3.5 text-primary" />
                  Missed sales
                </div>
                <div className="mt-2 text-2xl font-bold text-ink tabular-nums">{fmt(calc.monthlyMiss)}</div>
                <div className="text-xs text-muted-foreground mt-1">From low conversion rate</div>
              </div>
              <div className="card-surface p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <DollarSign className="w-3.5 h-3.5 text-primary" />
                  Wasted ad spend
                </div>
                <div className="mt-2 text-2xl font-bold text-ink tabular-nums">{fmt(calc.wastedAdSpend)}</div>
                <div className="text-xs text-muted-foreground mt-1">Burned on weak ROAS</div>
              </div>
              <div className="card-surface p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Target className="w-3.5 h-3.5 text-primary" />
                  Ad revenue gap
                </div>
                <div className="mt-2 text-2xl font-bold text-ink tabular-nums">{fmt(calc.adRevenueMiss)}</div>
                <div className="text-xs text-muted-foreground mt-1">vs {targetRoas}× ROAS benchmark</div>
              </div>
            </div>

            <div className="card-surface p-5 sm:p-6 lg:p-8">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Current vs Potential monthly revenue
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-semibold text-muted-foreground">Current store</span>
                    <span className="font-bold text-ink tabular-nums">{fmt(calc.currentSales)}</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-muted-foreground/50 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (calc.currentSales / (calc.currentSales + calc.totalMonthlyMiss + 1)) * 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-semibold text-primary">With our growth system</span>
                    <span className="font-bold text-primary tabular-nums">{fmt(calc.currentSales + calc.totalMonthlyMiss)}</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              <a href="/contact" className="btn btn-primary btn-shimmer mt-6 w-full text-center text-sm sm:text-base whitespace-normal leading-snug px-4 py-3 break-words">
                Stop losing {fmt(calc.totalMonthlyMiss)}/mo — Book Strategy Call →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
