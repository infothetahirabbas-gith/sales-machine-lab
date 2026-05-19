import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Sparkles, Loader2, AlertTriangle, TrendingUp, Search, Megaphone, MousePointerClick, ShoppingBag, Smartphone, ShieldCheck, Target, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { runStoreAudit, type AuditReport } from "../lib/store-audit.functions";

export const Route = createFileRoute("/audit")({
  component: AuditPage,
  head: () => ({
    meta: [
      { title: "BeingEcom Store Audit — Free AI Ecommerce Growth Report" },
      { name: "description", content: "Get a free AI-powered audit of your Shopify or WooCommerce store. Traffic, Ads, CRO, SEO, and a clear action plan in 60 seconds." },
    ],
  }),
});

const loadingSteps = [
  "Scanning your store...",
  "Analyzing traffic signals...",
  "Auditing paid ads readiness...",
  "Inspecting CRO & checkout...",
  "Checking SEO health...",
  "Benchmarking against industry...",
  "Building your growth action plan...",
];

function ScoreRing({ value, size = 120, label }: { value: number; size?: number; label?: string }) {
  const radius = (size - 14) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (Math.max(0, Math.min(100, value)) / 100) * circ;
  const color = value >= 75 ? "hsl(var(--primary))" : value >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="hsl(var(--secondary))" strokeWidth="10" fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth="10" fill="none" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold tabular-nums" style={{ color }}>{Math.round(value)}</div>
        {label && <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{label}</div>}
      </div>
    </div>
  );
}

function Bar({ label, value, color = "from-primary to-accent" }: { label: string; value: number; color?: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="font-semibold text-muted-foreground">{label}</span>
        <span className="font-bold text-ink tabular-nums">{value}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function SectionCard({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary"><Icon className="w-4 h-4" /></div>
        <h3 className="font-bold text-ink">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function List({ items, accent = "primary" }: { items: string[]; accent?: "primary" | "destructive" | "success" }) {
  const dot = accent === "destructive" ? "bg-destructive" : accent === "success" ? "bg-emerald-500" : "bg-primary";
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function AuditPage() {
  const fetchAudit = useServerFn(runStoreAudit);
  const [url, setUrl] = useState("");
  const [revenue, setRevenue] = useState("");
  const [adSpend, setAdSpend] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [auditedUrl, setAuditedUrl] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setReport(null); setLoading(true); setStepIdx(0);
    const stepTimer = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, loadingSteps.length - 1));
    }, 1800);
    try {
      const result = await fetchAudit({ data: { url, revenue: revenue || null, adSpend: adSpend || null, country: country || null } });
      setReport(result.report);
      setAuditedUrl(result.url);
      setTimeout(() => document.getElementById("audit-results")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      clearInterval(stepTimer);
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      {/* HERO + FORM */}
      <section className="relative overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-16">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary/15 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-accent/20 blur-[140px] rounded-full" />

        <div className="relative mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            BeingEcom Store Audit
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] text-ink">
            Get a <span className="text-sky-gradient">free AI audit</span> of your ecommerce store
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            We analyze your store across Traffic, Ads, CRO and SEO - then hand you a clear action plan to grow revenue. No signup. 60-second report.
          </p>

          <form onSubmit={onSubmit} className="mt-8 card-surface p-5 lg:p-7 text-left">
            <label className="text-sm font-semibold text-ink">Your store URL <span className="text-destructive">*</span></label>
            <input
              type="text" required value={url} onChange={(e) => setUrl(e.target.value)}
              placeholder="yourstore.com"
              className="mt-2 w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition text-base"
              disabled={loading}
            />
            <div className="grid sm:grid-cols-3 gap-3 mt-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Monthly revenue <span className="text-muted-foreground/60">(optional)</span></label>
                <input type="text" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="e.g. $20k - $50k" disabled={loading}
                  className="mt-1.5 w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary outline-none text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Monthly ad spend <span className="text-muted-foreground/60">(optional)</span></label>
                <input type="text" value={adSpend} onChange={(e) => setAdSpend(e.target.value)} placeholder="e.g. $8,000" disabled={loading}
                  className="mt-1.5 w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary outline-none text-sm" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Target country <span className="text-muted-foreground/60">(optional)</span></label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. United States" disabled={loading}
                  className="mt-1.5 w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary outline-none text-sm" />
              </div>
            </div>
            <button type="submit" disabled={loading || !url} className="btn btn-primary btn-shimmer mt-5 w-full sm:w-auto disabled:opacity-60">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : <>Run free audit <ArrowRight className="w-4 h-4" /></>}
            </button>
            {error && (
              <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> {error}
              </div>
            )}
          </form>

          {loading && (
            <div className="mt-8 card-surface p-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="font-semibold text-ink">Analyzing your store...</span>
              </div>
              <div className="space-y-2">
                {loadingSteps.map((s, i) => (
                  <div key={i} className={`flex items-center gap-2 text-sm transition-opacity ${i <= stepIdx ? "opacity-100" : "opacity-30"}`}>
                    {i < stepIdx ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      : i === stepIdx ? <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      : <div className="w-4 h-4 rounded-full border border-border" />}
                    <span className={i <= stepIdx ? "text-ink" : "text-muted-foreground"}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RESULTS */}
      {report && (
        <section id="audit-results" className="relative py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-8">
            {/* Executive Summary */}
            <div className="card-surface p-6 lg:p-8 bg-gradient-to-br from-primary/5 via-card to-card border-primary/30">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                <div className="text-center shrink-0">
                  <ScoreRing value={report.executiveSummary.overallScore} size={160} label="Growth Score" />
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">Executive Summary</div>
                  <h2 className="mt-2 text-2xl md:text-3xl font-bold text-ink">{report.storeName}</h2>
                  <p className="text-sm text-muted-foreground">{auditedUrl} · {report.platformGuess}</p>
                  <p className="mt-4 text-base text-ink">{report.executiveSummary.headline}</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                    {[
                      { l: "Traffic", v: report.executiveSummary.diagnosis.traffic },
                      { l: "Conversion", v: report.executiveSummary.diagnosis.conversion },
                      { l: "Ads", v: report.executiveSummary.diagnosis.ads },
                    ].map((d) => {
                      const bad = d.v === "Weak" || d.v === "Inefficient";
                      const good = d.v === "Strong" || d.v === "Efficient";
                      return (
                        <span key={d.l} className={`text-xs font-semibold px-3 py-1 rounded-full border ${good ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" : bad ? "bg-destructive/10 text-destructive border-destructive/30" : "bg-amber-500/10 text-amber-600 border-amber-500/30"}`}>
                          {d.l}: {d.v}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-6 grid md:grid-cols-3 gap-3">
                {report.executiveSummary.keyOpportunities.map((o, i) => (
                  <div key={i} className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-xs font-bold text-primary mb-1">Opportunity {i + 1}</div>
                    <div className="text-sm text-ink">{o}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scorecard */}
            <div className="card-surface p-6 lg:p-8">
              <h3 className="text-xl font-bold text-ink mb-6">Final Scorecard</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-items-center">
                <ScoreRing value={report.scorecard.traffic} label="Traffic" />
                <ScoreRing value={report.scorecard.ads} label="Ads" />
                <ScoreRing value={report.scorecard.cro} label="CRO" />
                <ScoreRing value={report.scorecard.seo} label="SEO" />
                <ScoreRing value={report.scorecard.overall} label="Overall" />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Traffic */}
              <SectionCard icon={TrendingUp} title="Traffic Analysis">
                <p className="text-sm text-muted-foreground mb-4">{report.traffic.quality}</p>
                <div className="space-y-2.5 mb-4">
                  <Bar label="Organic search" value={report.traffic.sources.organic} />
                  <Bar label="Paid ads" value={report.traffic.sources.paid} color="from-amber-500 to-orange-500" />
                  <Bar label="Social" value={report.traffic.sources.social} color="from-pink-500 to-purple-500" />
                  <Bar label="Direct" value={report.traffic.sources.direct} color="from-emerald-500 to-teal-500" />
                </div>
                <div className="text-xs text-muted-foreground"><span className="font-semibold text-ink">Top markets:</span> {report.traffic.topCountries.join(", ") || "—"}</div>
                <div className="text-xs text-muted-foreground mt-2 flex gap-1.5"><Smartphone className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary" />{report.traffic.mobileVsDesktop}</div>
              </SectionCard>

              {/* Ads */}
              <SectionCard icon={Megaphone} title="Paid Ads Performance">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-secondary/40">
                    <div className="text-xs text-muted-foreground">Meta Ads</div>
                    <div className="text-xl font-bold text-ink">{report.ads.metaHealth.score}/100</div>
                    <div className="text-[11px] text-muted-foreground mt-1">{report.ads.metaHealth.verdict}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/40">
                    <div className="text-xs text-muted-foreground">Google Ads</div>
                    <div className="text-xl font-bold text-ink">{report.ads.googleHealth.score}/100</div>
                    <div className="text-[11px] text-muted-foreground mt-1">{report.ads.googleHealth.verdict}</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Estimated ROAS</span>
                  <span className="font-bold text-primary">{report.ads.estimatedRoas}</span>
                </div>
                <Bar label="Retargeting setup" value={report.ads.retargetingScore} color="from-amber-500 to-orange-500" />
                <div className="mt-4 text-xs font-semibold text-ink mb-2">Funnel leaks</div>
                <List items={report.ads.funnelLeaks} accent="destructive" />
                {report.ads.wasteIndicators.length > 0 && (
                  <>
                    <div className="mt-4 text-xs font-semibold text-ink mb-2">Ad spend waste</div>
                    <List items={report.ads.wasteIndicators} accent="destructive" />
                  </>
                )}
              </SectionCard>

              {/* CRO */}
              <SectionCard icon={MousePointerClick} title="Conversion Rate Optimization">
                <div className="flex justify-between text-sm mb-4 p-3 rounded-lg bg-secondary/40">
                  <span className="text-muted-foreground">Estimated CR</span>
                  <span className="font-bold text-primary">{report.cro.benchmarkCr}</span>
                </div>
                <div className="text-xs font-semibold text-ink mb-2">Product page issues</div>
                <List items={report.cro.productPageIssues} accent="destructive" />
                <div className="mt-4 text-xs font-semibold text-ink mb-2">Checkout issues</div>
                <List items={report.cro.checkoutIssues} accent="destructive" />
                <div className="mt-4 text-xs font-semibold text-ink mb-2">UX wins</div>
                <List items={report.cro.uxSuggestions} accent="success" />
              </SectionCard>

              {/* SEO */}
              <SectionCard icon={Search} title="SEO Performance">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="p-3 rounded-lg bg-secondary/40 text-center">
                    <div className="text-[10px] text-muted-foreground uppercase">Product</div>
                    <div className="text-lg font-bold text-ink">{report.seo.productSeo.score}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/40 text-center">
                    <div className="text-[10px] text-muted-foreground uppercase">Collection</div>
                    <div className="text-lg font-bold text-ink">{report.seo.collectionSeo.score}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/40 text-center">
                    <div className="text-[10px] text-muted-foreground uppercase">Blog</div>
                    <div className="text-lg font-bold text-ink">{report.seo.blogOpportunity.score}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{report.seo.keywordPotential}</p>
                <div className="text-xs font-semibold text-ink mb-2">Technical issues</div>
                <List items={report.seo.technicalIssues} accent="destructive" />
              </SectionCard>

              {/* Experience */}
              <SectionCard icon={ShieldCheck} title="Store Experience & Design">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-secondary/40">
                    <div className="text-xs text-muted-foreground">UI/UX</div>
                    <div className="text-xl font-bold text-ink">{report.experience.uiUxScore}/100</div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/40">
                    <div className="text-xs text-muted-foreground">Mobile</div>
                    <div className="text-xl font-bold text-ink">{report.experience.mobileScore}/100</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-ink mb-2">Trust elements detected</div>
                <List items={report.experience.trustElements} accent="success" />
                <p className="text-xs text-muted-foreground mt-3"><span className="font-semibold text-ink">Navigation:</span> {report.experience.navigationClarity}</p>
                <p className="text-xs text-muted-foreground mt-2"><span className="font-semibold text-ink">Branding:</span> {report.experience.brandingConsistency}</p>
              </SectionCard>

              {/* Behavior */}
              <SectionCard icon={ShoppingBag} title="Customer Behavior">
                <p className="text-sm text-muted-foreground mb-3">{report.behavior.journey}</p>
                <div className="text-xs font-semibold text-ink mb-2">Bounce risks</div>
                <List items={report.behavior.bounceRisks} accent="destructive" />
                <div className="mt-4 text-xs font-semibold text-ink mb-2">Drop-off points</div>
                <List items={report.behavior.dropoffPoints} accent="destructive" />
                <p className="text-xs text-muted-foreground mt-3"><span className="font-semibold text-ink">Purchase intent:</span> {report.behavior.purchaseIntent}</p>
              </SectionCard>
            </div>

            {/* Growth */}
            <SectionCard icon={Rocket} title="Revenue Growth Opportunities">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Quick wins (0-7 days)</div>
                  <List items={report.growth.quickWins} accent="success" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Mid-term (7-30 days)</div>
                  <List items={report.growth.midTerm} />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">Long-term (30+ days)</div>
                  <List items={report.growth.longTerm} accent="primary" />
                </div>
              </div>
              <div className="mt-5 p-4 rounded-lg bg-primary/10 border border-primary/30 text-sm">
                <span className="font-bold text-primary">Revenue impact: </span>
                <span className="text-ink">{report.growth.revenueImpact}</span>
              </div>
            </SectionCard>

            {/* Competitors */}
            <SectionCard icon={Target} title="Competitor Gap Analysis">
              <p className="text-sm text-muted-foreground mb-4">{report.competitors.industryComparison}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-semibold text-ink mb-2">Missing features competitors have</div>
                  <List items={report.competitors.missingFeatures} accent="destructive" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-ink mb-2">Ways to outperform them</div>
                  <List items={report.competitors.outperformOpportunities} accent="success" />
                </div>
              </div>
            </SectionCard>

            {/* Action Plan */}
            <div className="card-surface p-6 lg:p-8 bg-gradient-to-br from-accent/5 via-card to-card border-accent/30">
              <h3 className="text-2xl font-bold text-ink mb-1">Your Action Plan</h3>
              <p className="text-sm text-muted-foreground mb-6">The 10 highest-leverage moves to grow this store - prioritized.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm font-bold text-destructive mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Top 5 urgent fixes</div>
                  <ol className="space-y-2.5">
                    {report.actionPlan.urgentFixes.map((f, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-destructive/15 text-destructive font-bold text-xs flex items-center justify-center">{i + 1}</span>
                        <span className="text-ink">{f}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <div className="text-sm font-bold text-primary mb-3 flex items-center gap-2"><Rocket className="w-4 h-4" /> Top 5 growth strategies</div>
                  <ol className="space-y-2.5">
                    {report.actionPlan.growthStrategies.map((f, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary font-bold text-xs flex items-center justify-center">{i + 1}</span>
                        <span className="text-ink">{f}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {report.actionPlan.prioritizedChecklist.length > 0 && (
                <div className="mt-6">
                  <div className="text-sm font-bold text-ink mb-3">Prioritized checklist</div>
                  <div className="space-y-2">
                    {report.actionPlan.prioritizedChecklist.map((c, i) => {
                      const tone = c.priority === "High" ? "bg-destructive/10 text-destructive border-destructive/30"
                        : c.priority === "Medium" ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                        : "bg-emerald-500/10 text-emerald-600 border-emerald-500/30";
                      return (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${tone}`}>{c.priority}</span>
                          <span className="text-sm text-ink">{c.task}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="card-surface p-8 lg:p-12 text-center bg-gradient-to-br from-primary/10 via-card to-accent/10 border-primary/30">
              <h3 className="text-2xl md:text-4xl font-bold text-ink">Want us to <span className="text-sky-gradient">fix and scale</span> your store for you?</h3>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                BeingEcom turns audits like this into real revenue. Book a free 30-minute strategy call and we'll walk you through the exact plan to ship these fixes.
              </p>
              <div className="mt-6 btn-pair mx-auto justify-center">
                <a href="/contact" className="btn btn-primary btn-shimmer">Book Free Strategy Call <ArrowRight className="w-4 h-4" /></a>
                <a href="/services" className="btn btn-dark">Get Full Growth Service</a>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">Powered by BeingEcom · Ecommerce Growth & Scaling Agency</p>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
