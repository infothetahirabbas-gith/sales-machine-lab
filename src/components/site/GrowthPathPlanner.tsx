import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Zap, Search, TrendingUp, DollarSign, Target, ArrowRight, Check, Clock, Infinity as InfinityIcon, Flame } from "lucide-react";

type Path = "ads" | "seo" | null;
type Goal = "sales" | "mrr" | "revenue";

const goals: { key: Goal; label: string; sub: string }[] = [
  { key: "sales", label: "Sales", sub: "orders / month" },
  { key: "mrr", label: "MRR", sub: "recurring $ / mo" },
  { key: "revenue", label: "Revenue", sub: "total $ / mo" },
];

export default function GrowthPathPlanner() {
  const [path, setPath] = useState<Path>("ads");
  const [goal, setGoal] = useState<Goal>("revenue");
  const [target, setTarget] = useState(50000);
  const [budget, setBudget] = useState(5000);

  const step = !path ? 1 : 4;

  const plan = useMemo(() => {
    if (!path) return null;
    const aov = 75;
    const targetRevenue = goal === "sales" ? target * aov : target;
    if (path === "ads") {
      const roas = 3.2;
      const requiredSpend = Math.round(targetRevenue / roas);
      const months = requiredSpend <= budget ? 1 : Math.ceil(requiredSpend / budget);
      const cac = 28;
      const newCustomers = Math.round(budget / cac);
      return {
        timeline: months <= 1 ? "30 days" : `${months} mo`,
        spend: requiredSpend,
        monthlySpend: Math.min(budget, requiredSpend),
        kpi: `${roas}× ROAS`,
        sub: `~${newCustomers} new customers/mo at $${cac} CAC`,
        speed: "Fast - results in weeks",
        warning: requiredSpend > budget ? `Your ${budget.toLocaleString()}/mo budget needs ${months} months to hit $${targetRevenue.toLocaleString()}/mo.` : null,
      };
    }
    const cpc = 1.8;
    const monthlyClicks = Math.round(targetRevenue / (0.03 * aov));
    const adEquivalent = Math.round(monthlyClicks * cpc);
    const months = 6;
    return {
      timeline: `${months} mo to rank`,
      spend: budget * months,
      monthlySpend: budget,
      kpi: `${monthlyClicks.toLocaleString()} clicks/mo`,
      sub: `Worth ~$${adEquivalent.toLocaleString()}/mo in free traffic. Compounds forever.`,
      speed: "Slow start, lifetime asset",
      warning: null,
    };
  }, [path, goal, target, budget]);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[160px] rounded-full" />

      <div className="mx-auto max-w-6xl px-5 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            <Target className="w-3.5 h-3.5" /> Growth Path Planner
          </div>
          <h2 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] text-ink">
            Want to grow your business?<br />
            <span className="text-gradient">It's your choice.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Pick a path, set your goal, see what it actually takes.
          </p>
        </div>

        {/* Step pills */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {["Choose engine", "Set goal", "Pick target", "See plan"].map((label, i) => {
            const active = i + 1 <= step;
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${active ? "bg-foreground text-background shadow-sm" : "bg-secondary text-muted-foreground"}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${active ? "bg-white/20" : "bg-background"}`}>{active && i + 1 < step ? <Check className="w-3 h-3" /> : i + 1}</span>
                  {label}
                </div>
                {i < 3 && <div className={`w-6 h-px ${active && i + 1 < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            );
          })}
        </div>

        {/* STEP 1: Path */}
        <div className="grid md:grid-cols-2 gap-5">
          <button
            onClick={() => setPath("ads")}
            className={`group relative overflow-hidden rounded-3xl p-7 text-left transition-all duration-500 ${path === "ads" ? "bg-gradient-to-br from-orange-500/15 via-card to-card ring-2 ring-orange-500/60 shadow-[0_30px_80px_-30px_oklch(0.7_0.2_35/0.5)] -translate-y-1" : "card-surface hover:-translate-y-1 hover:shadow-xl"}`}
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-orange-500/20 blur-3xl group-hover:bg-orange-500/40 transition-colors" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/15 text-orange-500 flex items-center justify-center shadow-inner">
                  <Zap className="w-7 h-7" strokeWidth={2.2} />
                </div>
                <div className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${path === "ads" ? "bg-orange-500 text-white" : "bg-orange-500/10 text-orange-500"}`}>Quick</div>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-ink">Paid Ads</h3>
              <p className="mt-1 text-sm text-muted-foreground">Costly, but sales start flowing in days.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Results in 7-30 days", "Meta · Google · TikTok", "Scales with your budget"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-ink/80"><Flame className="w-3.5 h-3.5 text-orange-500" />{t}</li>
                ))}
              </ul>
            </div>
          </button>

          <button
            onClick={() => setPath("seo")}
            className={`group relative overflow-hidden rounded-3xl p-7 text-left transition-all duration-500 ${path === "seo" ? "bg-gradient-to-br from-primary/15 via-card to-card ring-2 ring-primary/60 shadow-[0_30px_80px_-30px_oklch(0.55_0.2_248/0.5)] -translate-y-1" : "card-surface hover:-translate-y-1 hover:shadow-xl"}`}
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/20 blur-3xl group-hover:bg-primary/40 transition-colors" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center shadow-inner">
                  <Search className="w-7 h-7" strokeWidth={2.2} />
                </div>
                <div className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${path === "seo" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>Lifetime</div>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-ink">SEO</h3>
              <p className="mt-1 text-sm text-muted-foreground">Patient. Affordable. Pays you forever.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["Compounds for years", "Free traffic from Google", "3-6 mo to break through"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-ink/80"><InfinityIcon className="w-3.5 h-3.5 text-primary" />{t}</li>
                ))}
              </ul>
            </div>
          </button>
        </div>

        {path && (
          <div className="mt-10 grid lg:grid-cols-5 gap-6" style={{ animation: "rise 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
            {/* Left: Configurator */}
            <div className="lg:col-span-3 space-y-5">
              {/* Goal selector */}
              <div className="card-surface p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Step 2</div>
                    <div className="font-semibold text-ink mt-0.5">What do you want to grow?</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {goals.map((g) => (
                    <button
                      key={g.key}
                      onClick={() => setGoal(g.key)}
                     className={`relative rounded-xl border p-3 text-left transition-all ${goal === g.key ? "bg-foreground text-background border-foreground shadow-md" : "bg-background text-ink border-border hover:border-accent hover:bg-accent/10"}`}
                    >
                      <div className="font-bold text-sm">{g.label}</div>
                       <div className={`text-[10px] ${goal === g.key ? "text-background/70" : "text-muted-foreground"} mt-0.5`}>{g.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Target slider with curve */}
              <div className="card-surface p-6">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Step 3</div>
                    <div className="font-semibold text-ink mt-0.5">Your monthly target</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-sky-gradient leading-none">
                      {goal === "sales" ? target.toLocaleString() : `$${(target / 1000).toFixed(0)}K`}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{goals.find(g => g.key === goal)?.sub}</div>
                  </div>
                </div>
                <div className="relative h-28 mb-3">
                  <svg viewBox="0 0 400 110" className="w-full h-full" preserveAspectRatio="none">
                    <path d="M0 100 C 100 95, 180 75, 260 50 S 360 12, 400 4 L 400 110 L 0 110 Z" fill="var(--ink)" fillOpacity="0.1" />
                    <path d="M0 100 C 100 95, 180 75, 260 50 S 360 12, 400 4" stroke="var(--ink)" strokeWidth="2.5" fill="none" className="draw-line" />
                    {(() => {
                      const max = goal === "sales" ? 5000 : 500000;
                      const min = goal === "sales" ? 100 : 5000;
                      const pct = (target - min) / (max - min);
                      const x = pct * 400;
                      const y = 100 - pct * pct * 96;
                      return (
                        <>
                          <line x1={x} y1={y} x2={x} y2={110} stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
                          <circle cx={x} cy={y} r="14" fill="var(--ink)" fillOpacity="0.12">
                            <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle cx={x} cy={y} r="6" fill="var(--ink)" stroke="white" strokeWidth="2" />
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
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-mono">
                  <span>{goal === "sales" ? "100" : "$5K"}</span>
                  <span>{goal === "sales" ? "5K orders" : "$500K"}</span>
                </div>
              </div>

              {/* Budget slider */}
              <div className="card-surface p-6">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Step 4</div>
                    <div className="font-semibold text-ink mt-0.5">{path === "ads" ? "Monthly ad budget" : "Monthly SEO investment"}</div>
                  </div>
                  <div className="text-3xl font-bold text-sky-gradient leading-none">${budget.toLocaleString()}<span className="text-xs text-muted-foreground font-normal">/mo</span></div>
                </div>
                <input
                  type="range"
                  min={path === "ads" ? 500 : 1000}
                  max={path === "ads" ? 50000 : 15000}
                  step={250}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-mono">
                  <span>${(path === "ads" ? 500 : 1000).toLocaleString()}</span>
                  <span>${(path === "ads" ? 50000 : 15000).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Right: Sticky result */}
            <div className="lg:col-span-2">
               <div className="sticky top-24 relative overflow-hidden rounded-3xl p-7 bg-foreground text-background shadow-[0_40px_100px_-30px_oklch(0.16_0.02_250/0.6)]">
                <div className="relative">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold opacity-70">
                     <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse" />
                    Your growth plan
                  </div>
                  <div className="mt-5 space-y-5">
                    <div>
                      <div className="text-xs opacity-60 flex items-center gap-1.5"><Clock className="w-3 h-3" /> Timeline</div>
                      <div className="text-3xl font-bold mt-1">{plan?.timeline}</div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs opacity-60 flex items-center gap-1.5"><DollarSign className="w-3 h-3" /> Total spend</div>
                        <div className="text-xl font-bold mt-1">${plan?.spend.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-60">Monthly</div>
                        <div className="text-xl font-bold mt-1">${plan?.monthlySpend.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div>
                      <div className="text-xs opacity-60 flex items-center gap-1.5"><TrendingUp className="w-3 h-3" /> Projected outcome</div>
                       <div className="text-2xl font-bold mt-1 text-background">{plan?.kpi}</div>
                      <div className="text-xs opacity-70 mt-1.5">{plan?.sub}</div>
                    </div>
                  </div>
                  {plan?.warning && (
                    <div className="mt-5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 px-3 py-2.5 text-xs">
                      ⚠ {plan.warning}
                    </div>
                  )}
                   <Link to="/contact" className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-background text-foreground font-semibold py-3 px-5 hover:bg-accent hover:text-accent-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl">
                    Book Strategy Call <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
