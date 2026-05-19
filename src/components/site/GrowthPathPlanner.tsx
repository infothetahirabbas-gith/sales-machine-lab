import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Zap, Search, TrendingUp, DollarSign, Target, ArrowRight } from "lucide-react";

type Path = "ads" | "seo" | null;
type Goal = "sales" | "mrr" | "revenue";

const goals: { key: Goal; label: string; unit: string }[] = [
  { key: "sales", label: "More Sales / month", unit: "orders" },
  { key: "mrr", label: "Recurring Revenue (MRR)", unit: "$/mo" },
  { key: "revenue", label: "Total Revenue / month", unit: "$/mo" },
];

export default function GrowthPathPlanner() {
  const [path, setPath] = useState<Path>(null);
  const [goal, setGoal] = useState<Goal>("revenue");
  const [target, setTarget] = useState(50000); // target $/mo or orders
  const [budget, setBudget] = useState(5000);

  const plan = useMemo(() => {
    if (!path) return null;
    // Normalize target to revenue $
    const aov = 75;
    const targetRevenue = goal === "sales" ? target * aov : target;

    if (path === "ads") {
      const roas = 3.2; // conservative blended
      const requiredSpend = Math.round(targetRevenue / roas);
      const months = requiredSpend <= budget ? 1 : Math.ceil(requiredSpend / budget);
      const cac = 28;
      const newCustomers = Math.round(budget / cac);
      return {
        timeline: months <= 1 ? "30 days" : `${months} months`,
        spend: requiredSpend,
        monthlySpend: Math.min(budget, requiredSpend),
        kpi: `${roas}× ROAS`,
        sub: `~${newCustomers} new customers / month at $${cac} CAC`,
        speed: "Fast - results in weeks",
        warning: requiredSpend > budget ? `Budget is $${budget.toLocaleString()}/mo. You'll need ${months} months to hit $${targetRevenue.toLocaleString()}/mo.` : null,
      };
    }
    // SEO
    const cpc = 1.8;
    const monthlyClicks = Math.round(targetRevenue / (0.03 * aov)); // 3% CR
    const adEquivalent = Math.round(monthlyClicks * cpc);
    const months = 6;
    const investment = budget * months;
    return {
      timeline: `${months} months to rank, lifetime traffic`,
      spend: investment,
      monthlySpend: budget,
      kpi: `${monthlyClicks.toLocaleString()} clicks/mo`,
      sub: `Worth ~$${adEquivalent.toLocaleString()}/mo in free traffic`,
      speed: "Slow start - compounds forever",
      warning: null,
    };
  }, [path, goal, target, budget]);

  return (
    <section className="relative py-20 lg:py-28">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-6xl px-5 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            <Target className="w-3.5 h-3.5" /> Growth Path Planner
          </div>
          <h2 className="mt-5 text-3xl md:text-5xl font-bold text-ink">
            Want to grow your business? <span className="text-gradient">It's your choice.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Pick a path, set your goal, see what it really takes.
          </p>
        </div>

        {/* STEP 1: Path */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Step 1 · Choose your growth engine</div>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setPath("ads")}
              className={`text-left card-surface p-6 transition-all hover:-translate-y-1 ${path === "ads" ? "ring-2 ring-primary shadow-[0_20px_50px_-20px_oklch(0.65_0.18_245/0.5)]" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Zap className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-ink text-lg">Paid Ads</div>
                  <div className="text-xs text-muted-foreground">Quick · Costly · Results in weeks</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Buy traffic. Test creatives. Scale winners. Sales start flowing in 7-30 days.</p>
              <div className="mt-3 flex gap-2 text-[11px] font-semibold">
                <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5">⚡ Fast</span>
                <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5">$$$ Spend-driven</span>
              </div>
            </button>
            <button
              onClick={() => setPath("seo")}
              className={`text-left card-surface p-6 transition-all hover:-translate-y-1 ${path === "seo" ? "ring-2 ring-primary shadow-[0_20px_50px_-20px_oklch(0.65_0.18_245/0.5)]" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Search className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-ink text-lg">SEO</div>
                  <div className="text-xs text-muted-foreground">Slow · Affordable · Lifetime traffic</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Rank on Google. Compound free traffic. Takes 3-6 months but pays forever.</p>
              <div className="mt-3 flex gap-2 text-[11px] font-semibold">
                <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5">∞ Lifetime</span>
                <span className="rounded-full bg-secondary text-muted-foreground px-2 py-0.5">⏳ Patient</span>
              </div>
            </button>
          </div>
        </div>

        {path && (
          <div className="space-y-6" style={{ animation: "rise 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
            {/* STEP 2: Goal */}
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Step 2 · What do you want to grow?</div>
              <div className="grid grid-cols-3 gap-3">
                {goals.map((g) => (
                  <button
                    key={g.key}
                    onClick={() => setGoal(g.key)}
                    className={`card-surface p-4 text-sm font-semibold transition-all ${goal === g.key ? "ring-2 ring-primary text-primary" : "text-ink hover:-translate-y-0.5"}`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: Target on curve */}
            <div className="card-surface p-6">
              <div className="flex items-end justify-between mb-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Step 3 · Your target</div>
                  <div className="text-sm text-muted-foreground mt-1">Where on the growth curve do you want to be?</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-bold text-sky-gradient">
                    {goal === "sales" ? target.toLocaleString() : `$${target.toLocaleString()}`}
                  </div>
                  <div className="text-xs text-muted-foreground">{goals.find(g => g.key === goal)?.unit}</div>
                </div>
              </div>
              {/* Visual curve */}
              <div className="relative h-32 mb-4">
                <svg viewBox="0 0 400 120" className="w-full h-full">
                  <defs>
                    <linearGradient id="gpFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.65 0.18 245)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="oklch(0.65 0.18 245)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 110 C 100 105, 180 80, 260 55 S 360 15, 400 5 L 400 120 L 0 120 Z" fill="url(#gpFill)" />
                  <path d="M0 110 C 100 105, 180 80, 260 55 S 360 15, 400 5" stroke="oklch(0.55 0.2 248)" strokeWidth="2.5" fill="none" />
                  {(() => {
                    const max = goal === "sales" ? 5000 : 500000;
                    const min = goal === "sales" ? 100 : 5000;
                    const pct = (target - min) / (max - min);
                    const x = pct * 400;
                    // Approximate y on curve
                    const y = 110 - pct * pct * 105;
                    return (
                      <>
                        <line x1={x} y1={y} x2={x} y2={120} stroke="oklch(0.55 0.2 248)" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx={x} cy={y} r="7" fill="oklch(0.55 0.2 248)" />
                        <circle cx={x} cy={y} r="11" fill="oklch(0.55 0.2 248)" fillOpacity="0.2" />
                      </>
                    );
                  })()}
                </svg>
              </div>
              <input
                type="range"
                min={goal === "sales" ? 100 : 5000}
                max={goal === "sales" ? 5000 : 500000}
                step={goal === "sales" ? 50 : 1000}
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* STEP 4: Budget */}
            <div className="card-surface p-6">
              <div className="flex items-end justify-between mb-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    Step 4 · {path === "ads" ? "Monthly ad budget" : "Monthly SEO investment"}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {path === "ads" ? "How much can you spend on ads per month?" : "Content, links, technical SEO."}
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-sky-gradient">${budget.toLocaleString()}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
              </div>
              <input
                type="range"
                min={path === "ads" ? 500 : 1000}
                max={path === "ads" ? 50000 : 15000}
                step={path === "ads" ? 250 : 250}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* RESULT */}
            {plan && (
              <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/15 blur-[100px] rounded-full" />
                <div className="relative">
                  <div className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Your growth plan</div>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Timeline</div>
                      <div className="text-xl font-bold text-ink">{plan.timeline}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><DollarSign className="w-3 h-3" /> Total investment</div>
                      <div className="text-xl font-bold text-ink">${plan.spend.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Monthly spend</div>
                      <div className="text-xl font-bold text-ink">${plan.monthlySpend.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Projected outcome</div>
                      <div className="text-xl font-bold text-sky-gradient">{plan.kpi}</div>
                    </div>
                  </div>
                  <p className="mt-5 text-sm text-muted-foreground">{plan.sub} · <span className="text-ink font-semibold">{plan.speed}</span></p>
                  {plan.warning && (
                    <div className="mt-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 px-4 py-3 text-sm">
                      ⚠ {plan.warning}
                    </div>
                  )}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/contact" className="btn btn-primary btn-shimmer">
                      Book Strategy Call <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
