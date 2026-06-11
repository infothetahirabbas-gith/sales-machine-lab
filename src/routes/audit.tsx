import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  Sparkles, Loader2, AlertTriangle, TrendingUp, Search, Megaphone, MousePointerClick,
  ShoppingBag, ShieldCheck, Target, Rocket, CheckCircle2, ArrowRight, Brain, Building2,
  Crown, Users, Mail, Flame, Zap, Trophy, DollarSign, Lightbulb, Eye, Award, Repeat, Download, FileJson,
  FileText, FileSpreadsheet, FileType2,
} from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { runStoreAudit, type AuditReport } from "../lib/store-audit.functions";
import { downloadCSV, downloadXLSX, downloadPDF } from "../lib/audit-exports";
import { faqJsonLd, auditFaqs, breadcrumbJsonLd } from "../lib/seo";
import FaqSection from "../components/site/FaqSection";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";

export const Route = createFileRoute("/audit")({
  component: AuditPage,
  head: () => ({
    meta: [
      { title: "Free Ecommerce Store Audit — AI Shopify & WooCommerce Growth Report | BeingEcom" },
      { name: "description", content: "Get a free AI-powered Being Ecom Brain™ audit. SEO, ads, CRO, brand, psychology, competitors, revenue leakage and a 90-day action plan in 90 seconds." },
      { name: "keywords", content: "free Shopify audit, WooCommerce audit, ecommerce store audit, AI ecommerce audit, CRO audit, ecommerce SEO audit, store conversion audit, growth intelligence" },
      { property: "og:title", content: "Free AI Ecommerce Store Audit — Being Ecom Brain™" },
      { property: "og:description", content: "Board-level growth intelligence on your Shopify or WooCommerce store. 17-phase report in 90 seconds." },
      { property: "og:url", content: "https://beingecom.com/audit" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/audit" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(auditFaqs, "/audit")) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Free Store Audit", path: "/audit" }])) },
    ],
  }),
});

const loadingSteps = [
  "Scanning your store...",
  "Detecting tech stack & trust signals...",
  "Running SEO & content intelligence...",
  "Auditing ads & acquisition maturity...",
  "Inspecting CRO, mobile & checkout...",
  "Decoding brand & customer psychology...",
  "Mapping competitors & blue ocean...",
  "Tracing revenue leakage...",
  "Building your 90-day action plan...",
];

function triggerDownload(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function slugFromUrl(u: string): string {
  try { return new URL(u).hostname.replace(/^www\./, "").replace(/[^a-z0-9]+/gi, "-"); }
  catch { return "store-audit"; }
}

function downloadReportJson(report: AuditReport, url: string) {
  const payload = { url, generatedAt: new Date().toISOString(), report };
  triggerDownload(`${slugFromUrl(url)}-being-ecom-brain.json`, JSON.stringify(payload, null, 2), "application/json");
}

function downloadReportMarkdown(r: AuditReport, url: string) {
  const lines: string[] = [];
  const h = (t: string) => lines.push(`\n## ${t}\n`);
  const h3 = (t: string) => lines.push(`\n### ${t}\n`);
  const kv = (k: string, v: string | number) => lines.push(`- **${k}:** ${v}`);
  lines.push(`# Being Ecom Brain™ — Growth Intelligence Report`);
  lines.push(`\n**Store:** ${r.storeName}  `);
  lines.push(`**URL:** ${url}  `);
  lines.push(`**Generated:** ${new Date().toLocaleString()}  `);
  lines.push(`**Platform:** ${r.platformGuess}`);

  h("Executive Intelligence");
  lines.push(`> ${r.executiveIntelligence.headline}`);
  kv("Business Reality", r.executiveIntelligence.businessReality);
  kv("Biggest Opportunity", r.executiveIntelligence.biggestOpportunity);
  kv("Biggest Threat", r.executiveIntelligence.biggestThreat);
  kv("Revenue Potential", `${r.executiveIntelligence.revenuePotential} — ${r.executiveIntelligence.revenuePotentialReasoning}`);

  h("Business");
  Object.entries(r.business).forEach(([k, v]) => kv(k, String(v)));

  h("Scorecard (0–100)");
  Object.entries(r.scorecard).forEach(([k, v]) => kv(k, v));

  h("SEO Intelligence");
  (["technical","onPage","contentAuthority","commercialSeo"] as const).forEach(k => {
    const s = r.seoIntelligence[k]; kv(k, `${s.score}/100 — ${s.verdict}`);
  });
  h3("Technical Issues"); r.seoIntelligence.technicalIssues.forEach(i => lines.push(`- ${i}`));
  kv("Competitive SEO Gap", r.seoIntelligence.competitiveSeoGap);

  h("Ads Intelligence");
  Object.entries(r.adsIntelligence).forEach(([k, v]) => kv(k, String(v)));

  h("Conversion Intelligence");
  (["homepage","productPages","cartCheckout","mobile","ctaStrength"] as const).forEach(k => kv(k, r.conversionIntelligence[k]));
  h3("Friction"); r.conversionIntelligence.friction.forEach(i => lines.push(`- ${i}`));
  h3("Trust Gaps"); r.conversionIntelligence.trustGaps.forEach(i => lines.push(`- ${i}`));
  h3("Conversion Killers"); r.conversionIntelligence.conversionKillers.forEach(i => lines.push(`- ${i}`));

  h("Brand Intelligence");
  Object.entries(r.brandIntelligence).forEach(([k, v]) => kv(k, String(v)));

  h("Psychology Intelligence");
  Object.entries(r.psychologyIntelligence).forEach(([k, v]) => kv(k, String(v)));

  h("Acquisition Intelligence");
  Object.entries(r.acquisitionIntelligence).forEach(([k, v]) => kv(k, String(v)));

  h("Retention Intelligence");
  Object.entries(r.retentionIntelligence).forEach(([k, v]) => kv(k, String(v)));

  h("Competitors");
  r.competitors.forEach(c => {
    lines.push(`\n**${c.name}** (${c.tier}) — ${c.website}`);
    kv("Positioning", c.positioning); kv("Strengths", c.strengths);
    kv("Weaknesses", c.weaknesses); kv("USP", c.usp);
  });

  h("Competitive Gap");
  (["competitorAdvantages","missingFeatures","marketOpportunities","differentiationOpportunities","blueOcean"] as const).forEach(k => {
    h3(k); r.competitiveGap[k].forEach(i => lines.push(`- ${i}`));
  });

  h("Revenue Leakage");
  r.revenueLeakage.forEach(l => lines.push(`- **[${l.severity}] ${l.area}** — ${l.leak} → Impact: ${l.impact}`));

  h("Issues");
  (["superHot","hot","medium"] as const).forEach(tier => {
    h3(tier.toUpperCase());
    r.issueClassification[tier].forEach(i => lines.push(`- **${i.issue}** — Why: ${i.why} → Fix: ${i.fix}`));
  });

  h("Opportunities");
  r.opportunities.forEach(o => lines.push(`- **${o.title}** [${o.difficulty} / ROI: ${o.roi}] — ${o.expectedImpact} → ${o.action}`));

  h("90-Day Action Plan");
  h3("0–7 Days (Immediate)"); r.actionPlan.immediate.forEach(i => lines.push(`- ${i}`));
  h3("7–30 Days (Growth)"); r.actionPlan.growth.forEach(i => lines.push(`- ${i}`));
  h3("30–90 Days (Scale)"); r.actionPlan.scale.forEach(i => lines.push(`- ${i}`));

  h("Founder Insights");
  Object.entries(r.founderInsights).forEach(([k, v]) => kv(k, String(v)));

  triggerDownload(`${slugFromUrl(url)}-being-ecom-brain.md`, lines.join("\n"), "text/markdown");
}

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
      <div className="absolute inset-0 flex flex-col items-center justify-center px-1 text-center">
        <div className="text-3xl font-bold tabular-nums" style={{ color }}>{Math.round(value)}</div>
        {label && <div className="text-[9px] uppercase tracking-wider text-muted-foreground mt-0.5 leading-tight">{label}</div>}
      </div>
    </div>
  );
}

function MiniScore({ value, label }: { value: number; label: string }) {
  const color = value >= 75 ? "text-emerald-600 bg-emerald-500/10 border-emerald-500/30"
    : value >= 50 ? "text-amber-600 bg-amber-500/10 border-amber-500/30"
    : "text-destructive bg-destructive/10 border-destructive/30";
  return (
    <div className={`p-3 rounded-xl border ${color} text-center min-w-0`}>
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-wider mt-0.5 leading-tight font-semibold opacity-80 break-words">{label}</div>
    </div>
  );
}

function SectionCard({ icon: Icon, title, kicker, children }: { icon: React.ComponentType<{ className?: string }>; title: string; kicker?: string; children: React.ReactNode }) {
  return (
    <div className="card-surface p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0"><Icon className="w-4 h-4" /></div>
        <div className="min-w-0">
          {kicker && <div className="text-[10px] font-bold uppercase tracking-widest text-primary/80">{kicker}</div>}
          <h3 className="font-bold text-ink leading-tight">{title}</h3>
        </div>
      </div>
      {children}
    </div>
  );
}

function List({ items, accent = "primary" }: { items: string[]; accent?: "primary" | "destructive" | "success" }) {
  const dot = accent === "destructive" ? "bg-destructive" : accent === "success" ? "bg-emerald-500" : "bg-primary";
  if (!items || items.length === 0) return <p className="text-xs text-muted-foreground italic">None detected.</p>;
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

function Labeled({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{label}</div>
      <p className="text-sm text-ink leading-relaxed">{value}</p>
    </div>
  );
}

function ScoreLine({ label, score, verdict }: { label: string; score: number; verdict: string }) {
  const color = score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-destructive";
  return (
    <div>
      <div className="flex justify-between items-center text-xs mb-1.5">
        <span className="font-bold text-ink">{label}</span>
        <span className="font-bold tabular-nums text-ink">{score}/100</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-1.5">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
      <p className="text-xs text-muted-foreground">{verdict}</p>
    </div>
  );
}

function IssueCard({ issue, why, fix, tone }: { issue: string; why: string; fix: string; tone: "super" | "hot" | "medium" }) {
  const styles = tone === "super"
    ? { wrap: "border-destructive/40 bg-destructive/5", chip: "bg-destructive text-white", label: "🔴 Super Hot" }
    : tone === "hot"
    ? { wrap: "border-amber-500/40 bg-amber-500/5", chip: "bg-amber-500 text-white", label: "🟠 Hot" }
    : { wrap: "border-yellow-500/40 bg-yellow-500/5", chip: "bg-yellow-500 text-white", label: "🟡 Medium" };
  return (
    <div className={`rounded-xl border p-4 ${styles.wrap}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${styles.chip}`}>{styles.label}</span>
      </div>
      <div className="font-bold text-ink text-sm">{issue}</div>
      <p className="text-xs text-muted-foreground mt-1.5"><span className="font-semibold text-ink">Why it matters: </span>{why}</p>
      <p className="text-xs text-ink mt-1.5"><span className="font-semibold text-primary">Fix: </span>{fix}</p>
    </div>
  );
}

function severityChip(sev: "Critical" | "High" | "Medium" | "Low") {
  const map = {
    Critical: "bg-destructive text-white",
    High: "bg-amber-500 text-white",
    Medium: "bg-yellow-500 text-white",
    Low: "bg-emerald-500 text-white",
  } as const;
  return <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${map[sev]}`}>{sev}</span>;
}

function tierBadge(tier: "Tier 1" | "Tier 2" | "Tier 3") {
  const map = {
    "Tier 1": "bg-primary/15 text-primary border-primary/30",
    "Tier 2": "bg-amber-500/15 text-amber-700 border-amber-500/30",
    "Tier 3": "bg-secondary text-ink border-border",
  } as const;
  return <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${map[tier]}`}>{tier}</span>;
}

function AuditPage() {
  const fetchAudit = useServerFn(runStoreAudit);
  const [url, setUrl] = useState("");
  const [revenue, setRevenue] = useState("");
  const [adSpend, setAdSpend] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [timedOut, setTimedOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [auditedUrl, setAuditedUrl] = useState<string>("");

  const TIMEOUT_SECONDS = 95;
  const remaining = Math.max(0, TIMEOUT_SECONDS - elapsed);
  const progressPct = Math.min(100, (elapsed / TIMEOUT_SECONDS) * 100);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setReport(null); setLoading(true); setStepIdx(0); setElapsed(0); setTimedOut(false);
    const startedAt = Date.now();
    const stepTimer = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, loadingSteps.length - 1));
    }, 2200);
    const tickTimer = setInterval(() => {
      const sec = Math.floor((Date.now() - startedAt) / 1000);
      setElapsed(sec);
      if (sec >= TIMEOUT_SECONDS) setTimedOut(true);
    }, 250);
    try {
      const result = await fetchAudit({ data: { url, revenue: revenue || null, adSpend: adSpend || null, country: country || null } });
      setReport(result.report);
      setAuditedUrl(result.url);
      setTimeout(() => document.getElementById("audit-results")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) {
      const elapsedSec = Math.floor((Date.now() - startedAt) / 1000);
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      console.error("[audit:client] request failed", { url, revenue, adSpend, country, elapsedSec, error: msg });
      setError(elapsedSec >= TIMEOUT_SECONDS
        ? "The audit took longer than 90 seconds. The AI service may be busy right now — please try again in a moment."
        : msg);
    } finally {
      clearInterval(stepTimer);
      clearInterval(tickTimer);
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
            <Brain className="w-3.5 h-3.5" />
            Being Ecom Brain™ · Growth Intelligence
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] text-ink">
            The <span className="text-sky-gradient">board-level audit</span> your ecommerce store has been missing
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            17 phases. 15 growth scores. SEO, ads, CRO, brand, psychology, competitors, revenue leakage and a prioritized 90-day action plan — all powered by real signals from your live store. No signup. Free.
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
                <select value={revenue} onChange={(e) => setRevenue(e.target.value)} disabled={loading}
                  className="mt-1.5 w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary outline-none text-sm">
                  <option value="">Select revenue range</option>
                  <option value="Under $5k">Under $5k</option>
                  <option value="$5k - $20k">$5k - $20k</option>
                  <option value="$20k - $50k">$20k - $50k</option>
                  <option value="$50k - $100k">$50k - $100k</option>
                  <option value="$100k - $250k">$100k - $250k</option>
                  <option value="$250k - $500k">$250k - $500k</option>
                  <option value="$500k - $1M">$500k - $1M</option>
                  <option value="$1M - $5M">$1M - $5M</option>
                  <option value="$5M+">$5M+</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Monthly ad spend <span className="text-muted-foreground/60">(optional)</span></label>
                <select value={adSpend} onChange={(e) => setAdSpend(e.target.value)} disabled={loading}
                  className="mt-1.5 w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary outline-none text-sm">
                  <option value="">Select ad spend</option>
                  <option value="$0 (no ads)">$0 (no ads)</option>
                  <option value="Under $1k">Under $1k</option>
                  <option value="$1k - $5k">$1k - $5k</option>
                  <option value="$5k - $10k">$5k - $10k</option>
                  <option value="$10k - $25k">$10k - $25k</option>
                  <option value="$25k - $50k">$25k - $50k</option>
                  <option value="$50k - $100k">$50k - $100k</option>
                  <option value="$100k - $250k">$100k - $250k</option>
                  <option value="$250k+">$250k+</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Target country <span className="text-muted-foreground/60">(optional)</span></label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} disabled={loading}
                  className="mt-1.5 w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border focus:border-primary outline-none text-sm">
                  <option value="">Select target country</option>
                  <option value="Global">🌍 Global / Worldwide</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Spain">Spain</option>
                  <option value="Italy">Italy</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Finland">Finland</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Austria">Austria</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Poland">Poland</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Greece">Greece</option>
                  <option value="Turkey">Turkey</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Oman">Oman</option>
                  <option value="Israel">Israel</option>
                  <option value="Egypt">Egypt</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Taiwan">Taiwan</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="China">China</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Peru">Peru</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading || !url} className="flex btn btn-primary btn-shimmer mt-5 w-full sm:w-auto disabled:opacity-60">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing your store...</> : <>Request free audit <ArrowRight className="w-4 h-4" /></>}
            </button>
            {error && (
              <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" /> {error}
              </div>
            )}
          </form>

          {loading && (
            <div className="mt-8 card-surface p-6 text-left" data-testid="audit-progress">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Loader2 className="w-5 h-5 animate-spin text-primary shrink-0" />
                  <span className="font-semibold text-ink truncate">Being Ecom Brain™ is analyzing…</span>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-muted-foreground">Elapsed / Remaining</div>
                  <div className="text-sm font-bold tabular-nums text-ink">
                    {elapsed}s <span className="text-muted-foreground">/</span> ~{remaining}s
                  </div>
                </div>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${timedOut ? "bg-destructive" : "bg-gradient-to-r from-primary to-[oklch(0.6_0.18_245)]"}`}
                  style={{ width: `${progressPct}%` }}
                />
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
              {timedOut ? (
                <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>The audit is taking longer than 90s. The AI service may be busy — if no result appears shortly, please refresh and retry.</span>
                </div>
              ) : (
                <p className="mt-4 text-xs text-muted-foreground">Typical run: 20–40 seconds across 17 phases. Hard timeout at ~90s.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* RESULTS */}
      {report && (
        <section id="audit-results" className="relative py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-8">

            {/* EXPORT BAR */}
            <div className="flex flex-wrap items-center justify-between gap-3 card-surface p-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-ink">Report ready.</span> Export the full 17-phase intelligence in your preferred format.
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => downloadPDF(report, auditedUrl)} className="btn btn-primary inline-flex items-center gap-2">
                  <FileText className="w-4 h-4" /> PDF
                </button>
                <button onClick={() => downloadXLSX(report, auditedUrl)} className="btn btn-secondary inline-flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4" /> Excel
                </button>
                <button onClick={() => downloadCSV(report, auditedUrl)} className="btn btn-secondary inline-flex items-center gap-2">
                  <FileType2 className="w-4 h-4" /> CSV
                </button>
                <button onClick={() => downloadReportJson(report, auditedUrl)} className="btn btn-secondary inline-flex items-center gap-2">
                  <FileJson className="w-4 h-4" /> JSON
                </button>
                <button onClick={() => downloadReportMarkdown(report, auditedUrl)} className="btn btn-secondary inline-flex items-center gap-2">
                  <Download className="w-4 h-4" /> Markdown
                </button>
              </div>
            </div>

            {/* EXECUTIVE INTELLIGENCE SUMMARY */}
            <div className="card-surface p-6 lg:p-8 bg-gradient-to-br from-primary/5 via-card to-card border-primary/30">
              <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                <div className="text-center shrink-0">
                  <ScoreRing value={report.scorecard.overall} size={170} label="Overall Growth" />
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
                    <Crown className="w-3 h-3" /> Revenue potential: {report.executiveIntelligence.revenuePotential}
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">Executive Intelligence</div>
                  <h2 className="mt-2 text-2xl md:text-3xl font-bold text-ink break-words">{report.storeName}</h2>
                  <p className="text-sm text-muted-foreground break-words">{auditedUrl} · {report.platformGuess} · {report.business.industry} · {report.business.pricePositioning} · {report.business.businessModel}</p>
                  <p className="mt-4 text-base text-ink font-medium leading-relaxed">{report.executiveIntelligence.headline}</p>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary mb-1.5"><Eye className="w-3.5 h-3.5" /> Business Reality</div>
                  <p className="text-sm text-ink leading-relaxed">{report.executiveIntelligence.businessReality}</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/30">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-1.5"><Rocket className="w-3.5 h-3.5" /> Biggest Opportunity</div>
                  <p className="text-sm text-ink leading-relaxed">{report.executiveIntelligence.biggestOpportunity}</p>
                </div>
                <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/30">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-destructive mb-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Biggest Threat</div>
                  <p className="text-sm text-ink leading-relaxed">{report.executiveIntelligence.biggestThreat}</p>
                </div>
              </div>
              <div className="mt-3 p-3 rounded-lg bg-secondary/40 text-xs text-muted-foreground">
                <span className="font-semibold text-ink">Why {report.executiveIntelligence.revenuePotential} potential: </span>
                {report.executiveIntelligence.revenuePotentialReasoning}
              </div>
            </div>

            {/* VISUAL CHARTS — Radar + Issue Mix */}
            {(() => {
              const s = report.scorecard;
              const radarData = [
                { metric: "SEO", value: s.seo },
                { metric: "Ads", value: s.paidAds },
                { metric: "CRO", value: s.cro },
                { metric: "Brand", value: s.brandAuthority },
                { metric: "Trust", value: s.trust },
                { metric: "Acquisition", value: s.customerAcquisition },
                { metric: "Retention", value: s.retention },
                { metric: "CX", value: s.customerExperience },
                { metric: "Revenue Eff.", value: s.revenueEfficiency },
                { metric: "Scalability", value: s.scalability },
              ];
              const sh = report.issueClassification.superHot.length;
              const ho = report.issueClassification.hot.length;
              const me = report.issueClassification.medium.length;
              const total = sh + ho + me;
              const pieData = [
                { name: "Super Hot", value: sh, color: "hsl(0 84% 60%)" },
                { name: "Hot", value: ho, color: "hsl(35 92% 55%)" },
                { name: "Medium", value: me, color: "hsl(48 95% 55%)" },
              ].filter((d) => d.value > 0);
              const leakSum = report.revenueLeakage.reduce((acc, l) => {
                const w = l.severity === "Critical" ? 4 : l.severity === "High" ? 3 : l.severity === "Medium" ? 2 : 1;
                return acc + w;
              }, 0);
              return (
                <div className="grid lg:grid-cols-3 gap-4">
                  <SectionCard icon={Trophy} title="Performance Radar" kicker="10 growth dimensions">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData} outerRadius="75%">
                          <PolarGrid stroke="oklch(0.9 0.01 250)" />
                          <PolarAngleAxis dataKey="metric" tick={{ fill: "oklch(0.16 0.02 250)", fontSize: 10, fontWeight: 600 }} />
                          <Radar dataKey="value" stroke="oklch(0.65 0.18 245)" fill="oklch(0.65 0.18 245)" fillOpacity={0.35} strokeWidth={2} />
                          <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </SectionCard>

                  <SectionCard icon={Flame} title="Issue Mix" kicker={`${total} issues found`}>
                    <div className="h-64 flex items-center justify-center">
                      {total > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={3}>
                              {pieData.map((d) => <Cell key={d.name} fill={d.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                          </PieChart>
                        </ResponsiveContainer>
                      ) : <p className="text-sm text-muted-foreground">No issues detected.</p>}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="text-center"><div className="text-lg font-bold text-destructive tabular-nums">{sh}</div><div className="text-[9px] uppercase tracking-wider text-muted-foreground">Super</div></div>
                      <div className="text-center"><div className="text-lg font-bold text-amber-600 tabular-nums">{ho}</div><div className="text-[9px] uppercase tracking-wider text-muted-foreground">Hot</div></div>
                      <div className="text-center"><div className="text-lg font-bold text-yellow-600 tabular-nums">{me}</div><div className="text-[9px] uppercase tracking-wider text-muted-foreground">Medium</div></div>
                    </div>
                  </SectionCard>

                  <SectionCard icon={DollarSign} title="Key Numbers" kicker="At-a-glance KPIs">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center">
                        <div className="text-3xl font-bold text-primary tabular-nums">{s.overall}</div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mt-1">Health /100</div>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/30 text-center">
                        <div className="text-3xl font-bold text-emerald-600 tabular-nums">{report.opportunities.length}</div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mt-1">Opportunities</div>
                      </div>
                      <div className="p-3 rounded-xl bg-destructive/5 border border-destructive/30 text-center">
                        <div className="text-3xl font-bold text-destructive tabular-nums">{report.revenueLeakage.length}</div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mt-1">Revenue Leaks</div>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/30 text-center">
                        <div className="text-3xl font-bold text-amber-600 tabular-nums">{leakSum}</div>
                        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mt-1">Risk Score</div>
                      </div>
                      <div className="col-span-2 p-3 rounded-xl bg-card border border-border text-center">
                        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1">Revenue Potential</div>
                        <div className="text-xl font-bold text-ink">{report.executiveIntelligence.revenuePotential}</div>
                      </div>
                    </div>
                  </SectionCard>
                </div>
              );
            })()}

            {/* QUICK SUMMARY — bullet points at a glance */}
            <SectionCard icon={Zap} title="At a Glance" kicker="Top findings in 10 seconds">
              {(() => {
                const s = report.scorecard;
                const entries = [
                  ["SEO", s.seo], ["Paid Ads", s.paidAds], ["CRO", s.cro], ["Brand", s.brandAuthority],
                  ["Trust", s.trust], ["Acquisition", s.customerAcquisition], ["Retention", s.retention],
                  ["Revenue Efficiency", s.revenueEfficiency], ["Scalability", s.scalability], ["Maturity", s.businessMaturity],
                ] as [string, number][];
                const sorted = [...entries].sort((a, b) => a[1] - b[1]);
                const weakest = sorted.slice(0, 3);
                const strongest = [...entries].sort((a, b) => b[1] - a[1]).slice(0, 3);
                const sh = report.issueClassification.superHot.length;
                const ho = report.issueClassification.hot.length;
                const me = report.issueClassification.medium.length;
                const topOpps = report.opportunities.slice(0, 3);
                return (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-card border border-border">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Overall Health</div>
                      <div className="text-3xl font-bold text-ink tabular-nums">{s.overall}<span className="text-base text-muted-foreground">/100</span></div>
                      <div className="text-xs text-muted-foreground mt-1">Revenue potential: <span className="font-semibold text-ink">{report.executiveIntelligence.revenuePotential}</span></div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/30">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-2">Strongest Areas</div>
                      <ul className="space-y-1">
                        {strongest.map(([k, v]) => (
                          <li key={k} className="flex justify-between text-sm"><span className="text-ink">{k}</span><span className="font-bold tabular-nums text-emerald-600">{v}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-destructive/5 border border-destructive/30">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-destructive mb-2">Weakest Areas</div>
                      <ul className="space-y-1">
                        {weakest.map(([k, v]) => (
                          <li key={k} className="flex justify-between text-sm"><span className="text-ink">{k}</span><span className="font-bold tabular-nums text-destructive">{v}</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/30">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2">Issues Found</div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div><div className="text-xl font-bold text-destructive tabular-nums">{sh}</div><div className="text-[9px] uppercase tracking-wider text-muted-foreground">Super</div></div>
                        <div><div className="text-xl font-bold text-amber-600 tabular-nums">{ho}</div><div className="text-[9px] uppercase tracking-wider text-muted-foreground">Hot</div></div>
                        <div><div className="text-xl font-bold text-yellow-600 tabular-nums">{me}</div><div className="text-[9px] uppercase tracking-wider text-muted-foreground">Medium</div></div>
                      </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-4 p-3 rounded-xl bg-primary/5 border border-primary/20">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Top 3 ROI Opportunities</div>
                      <ul className="space-y-1.5">
                        {topOpps.map((o, i) => (
                          <li key={i} className="flex gap-2 text-sm text-ink">
                            <span className="font-bold text-primary shrink-0">#{i + 1}</span>
                            <span className="flex-1"><span className="font-semibold">{o.title}</span> <span className="text-muted-foreground">— ROI: {o.roi} · {o.difficulty}</span></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </SectionCard>

            {/* 15-METRIC GROWTH SCORECARD */}
            <SectionCard icon={Trophy} title="Growth Scorecard" kicker="Phase 3 · 15 metrics that decide your scale">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
                <MiniScore value={report.scorecard.seo} label="SEO" />
                <MiniScore value={report.scorecard.paidAds} label="Paid Ads" />
                <MiniScore value={report.scorecard.cro} label="CRO" />
                <MiniScore value={report.scorecard.brandAuthority} label="Brand Authority" />
                <MiniScore value={report.scorecard.trust} label="Trust" />
                <MiniScore value={report.scorecard.productPositioning} label="Positioning" />
                <MiniScore value={report.scorecard.customerAcquisition} label="Acquisition" />
                <MiniScore value={report.scorecard.retention} label="Retention" />
                <MiniScore value={report.scorecard.customerExperience} label="CX" />
                <MiniScore value={report.scorecard.marketPosition} label="Market Position" />
                <MiniScore value={report.scorecard.competitiveAdvantage} label="Moat" />
                <MiniScore value={report.scorecard.revenueEfficiency} label="Revenue Efficiency" />
                <MiniScore value={report.scorecard.scalability} label="Scalability" />
                <MiniScore value={report.scorecard.businessMaturity} label="Maturity" />
                <MiniScore value={report.scorecard.overall} label="Overall" />
              </div>
              {/* Horizontal bar chart */}
              <div className="border-t border-border pt-5 space-y-2">
                <div className="text-xs font-semibold text-ink mb-3">Performance breakdown</div>
                {([
                  ["SEO", report.scorecard.seo], ["Paid Ads", report.scorecard.paidAds], ["CRO", report.scorecard.cro],
                  ["Brand Authority", report.scorecard.brandAuthority], ["Trust", report.scorecard.trust],
                  ["Positioning", report.scorecard.productPositioning], ["Acquisition", report.scorecard.customerAcquisition],
                  ["Retention", report.scorecard.retention], ["CX", report.scorecard.customerExperience],
                  ["Market Position", report.scorecard.marketPosition], ["Moat", report.scorecard.competitiveAdvantage],
                  ["Revenue Efficiency", report.scorecard.revenueEfficiency], ["Scalability", report.scorecard.scalability],
                  ["Maturity", report.scorecard.businessMaturity],
                ] as [string, number][]).map(([label, v]) => {
                  const color = v >= 75 ? "bg-emerald-500" : v >= 50 ? "bg-amber-500" : "bg-destructive";
                  return (
                    <div key={label} className="grid grid-cols-[140px_1fr_44px] items-center gap-3">
                      <div className="text-xs text-ink truncate">{label}</div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${v}%` }} />
                      </div>
                      <div className="text-xs font-bold tabular-nums text-ink text-right">{v}</div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            {/* ISSUE CLASSIFICATION */}
            <SectionCard icon={Flame} title="Issue Classification" kicker="Phase 14 · What's actually killing your revenue">
              <div className="grid lg:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-sm font-bold text-destructive mb-3 flex items-center gap-2"><Flame className="w-4 h-4" /> Super Hot — Revenue Blockers</h4>
                  <div className="space-y-3">
                    {report.issueClassification.superHot.map((it, i) => <IssueCard key={i} {...it} tone="super" />)}
                    {report.issueClassification.superHot.length === 0 && <p className="text-xs text-muted-foreground italic">None detected.</p>}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-600 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Hot — Growth Blockers</h4>
                  <div className="space-y-3">
                    {report.issueClassification.hot.map((it, i) => <IssueCard key={i} {...it} tone="hot" />)}
                    {report.issueClassification.hot.length === 0 && <p className="text-xs text-muted-foreground italic">None detected.</p>}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-yellow-600 mb-3 flex items-center gap-2"><Zap className="w-4 h-4" /> Medium — Optimization</h4>
                  <div className="space-y-3">
                    {report.issueClassification.medium.map((it, i) => <IssueCard key={i} {...it} tone="medium" />)}
                    {report.issueClassification.medium.length === 0 && <p className="text-xs text-muted-foreground italic">None detected.</p>}
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* OPPORTUNITY ENGINE */}
            <SectionCard icon={Lightbulb} title="Opportunity Engine" kicker="Phase 15 · Ranked by ROI">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {report.opportunities.map((op, i) => {
                  const roiColor = op.roi === "Very High" ? "bg-emerald-500 text-white"
                    : op.roi === "High" ? "bg-primary text-white"
                    : op.roi === "Medium" ? "bg-amber-500 text-white"
                    : "bg-secondary text-ink";
                  const diffColor = op.difficulty === "Easy" ? "text-emerald-600"
                    : op.difficulty === "Medium" ? "text-amber-600" : "text-destructive";
                  return (
                    <div key={i} className="card-surface p-5 hover:border-primary/40 transition">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold text-primary">#{i + 1}</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${roiColor}`}>ROI: {op.roi}</span>
                        <span className={`text-[10px] font-bold uppercase ${diffColor}`}>· {op.difficulty}</span>
                      </div>
                      <h4 className="font-bold text-ink text-sm leading-snug">{op.title}</h4>
                      <p className="text-xs text-muted-foreground mt-2"><span className="font-semibold text-ink">Impact: </span>{op.expectedImpact}</p>
                      <p className="text-xs text-ink mt-2"><span className="font-semibold text-primary">Action: </span>{op.action}</p>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            {/* REVENUE LEAKAGE */}
            <SectionCard icon={DollarSign} title="Revenue Leakage Map" kicker="Phase 13 · Where money is bleeding out">
              <div className="space-y-2">
                {report.revenueLeakage.map((leak, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg bg-card border border-border">
                    <div className="flex items-center gap-2 shrink-0">
                      {severityChip(leak.severity)}
                      <span className="text-xs font-bold text-ink uppercase tracking-wider">{leak.area}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-ink">{leak.leak}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{leak.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* SEO + ADS */}
            <div className="grid lg:grid-cols-2 gap-6">
              <SectionCard icon={Search} title="SEO Intelligence" kicker="Phase 4">
                <div className="space-y-4">
                  <ScoreLine label="Technical SEO" score={report.seoIntelligence.technical.score} verdict={report.seoIntelligence.technical.verdict} />
                  <ScoreLine label="On-Page SEO" score={report.seoIntelligence.onPage.score} verdict={report.seoIntelligence.onPage.verdict} />
                  <ScoreLine label="Content Authority" score={report.seoIntelligence.contentAuthority.score} verdict={report.seoIntelligence.contentAuthority.verdict} />
                  <ScoreLine label="Commercial SEO" score={report.seoIntelligence.commercialSeo.score} verdict={report.seoIntelligence.commercialSeo.verdict} />
                </div>
                <div className="mt-5">
                  <div className="text-xs font-semibold text-ink mb-2">Technical issues</div>
                  <List items={report.seoIntelligence.technicalIssues} accent="destructive" />
                </div>
                <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Competitive SEO Gap</div>
                  <p className="text-sm text-ink">{report.seoIntelligence.competitiveSeoGap}</p>
                </div>
              </SectionCard>

              <SectionCard icon={Megaphone} title="Paid Ads Intelligence" kicker="Phase 5">
                <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Acquisition Maturity</div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="font-bold text-ink">{report.adsIntelligence.acquisitionMaturity}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{report.adsIntelligence.maturityReasoning}</p>
                </div>
                <div className="space-y-3">
                  <Labeled label="Meta Activity" value={report.adsIntelligence.metaActivity} />
                  <Labeled label="Google Activity" value={report.adsIntelligence.googleActivity} />
                  <Labeled label="Creative Strategy" value={report.adsIntelligence.creativeStrategy} />
                  <Labeled label="Offer Strategy" value={report.adsIntelligence.offerStrategy} />
                  <Labeled label="Hooks & Messaging" value={report.adsIntelligence.hooks} />
                </div>
              </SectionCard>
            </div>

            {/* CRO + BRAND */}
            <div className="grid lg:grid-cols-2 gap-6">
              <SectionCard icon={MousePointerClick} title="Conversion Intelligence" kicker="Phase 6">
                <div className="space-y-3 mb-4">
                  <Labeled label="Homepage" value={report.conversionIntelligence.homepage} />
                  <Labeled label="Product Pages" value={report.conversionIntelligence.productPages} />
                  <Labeled label="Cart & Checkout" value={report.conversionIntelligence.cartCheckout} />
                  <Labeled label="Mobile" value={report.conversionIntelligence.mobile} />
                  <Labeled label="CTA Strength" value={report.conversionIntelligence.ctaStrength} />
                </div>
                <div className="text-xs font-semibold text-ink mb-2">Friction points</div>
                <List items={report.conversionIntelligence.friction} accent="destructive" />
                <div className="mt-4 text-xs font-semibold text-ink mb-2">Trust gaps</div>
                <List items={report.conversionIntelligence.trustGaps} accent="destructive" />
                <div className="mt-4 text-xs font-semibold text-ink mb-2">Conversion killers</div>
                <List items={report.conversionIntelligence.conversionKillers} accent="destructive" />
              </SectionCard>

              <SectionCard icon={ShieldCheck} title="Brand Intelligence" kicker="Phase 7">
                <div className="space-y-3">
                  <Labeled label="Positioning" value={report.brandIntelligence.positioning} />
                  <Labeled label="Value Proposition" value={report.brandIntelligence.valueProposition} />
                  <Labeled label="Storytelling" value={report.brandIntelligence.storytelling} />
                  <Labeled label="Differentiation" value={report.brandIntelligence.differentiation} />
                  <Labeled label="Visual Identity" value={report.brandIntelligence.visualIdentity} />
                  <Labeled label="Premium Perception" value={report.brandIntelligence.premiumPerception} />
                </div>
                <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Why choose this brand?</div>
                  <p className="text-sm text-ink">{report.brandIntelligence.whyChooseThisBrand}</p>
                </div>
              </SectionCard>
            </div>

            {/* PSYCHOLOGY + ACQUISITION */}
            <div className="grid lg:grid-cols-2 gap-6">
              <SectionCard icon={Brain} title="Customer Psychology" kicker="Phase 8">
                <div className={`p-4 rounded-xl mb-4 border ${
                  report.psychologyIntelligence.firstTimeTrustVerdict === "Yes" ? "bg-emerald-500/10 border-emerald-500/30"
                  : report.psychologyIntelligence.firstTimeTrustVerdict === "Maybe" ? "bg-amber-500/10 border-amber-500/30"
                  : "bg-destructive/10 border-destructive/30"
                }`}>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-75">Would a first-time customer trust this store?</div>
                  <div className="text-2xl font-bold text-ink">{report.psychologyIntelligence.firstTimeTrustVerdict}</div>
                  <p className="text-xs text-ink mt-1.5">{report.psychologyIntelligence.trustReasoning}</p>
                </div>
                <div className="space-y-3">
                  <Labeled label="Trust" value={report.psychologyIntelligence.trust} />
                  <Labeled label="Risk Perception" value={report.psychologyIntelligence.riskPerception} />
                  <Labeled label="Buying Motivation" value={report.psychologyIntelligence.buyingMotivation} />
                  <Labeled label="Emotional Triggers" value={report.psychologyIntelligence.emotionalTriggers} />
                  <Labeled label="Social Proof" value={report.psychologyIntelligence.socialProof} />
                  <Labeled label="Authority Signals" value={report.psychologyIntelligence.authoritySignals} />
                </div>
              </SectionCard>

              <SectionCard icon={Users} title="Customer Acquisition" kicker="Phase 9">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Most likely growth</div>
                    <div className="text-sm font-bold text-ink mt-1">{report.acquisitionIntelligence.mostLikelyGrowthChannel}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-primary">Highest ROI</div>
                    <div className="text-sm font-bold text-ink mt-1">{report.acquisitionIntelligence.highestRoiChannel}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600">Most underutilized</div>
                    <div className="text-sm font-bold text-ink mt-1">{report.acquisitionIntelligence.mostUnderutilizedChannel}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Labeled label="Organic" value={report.acquisitionIntelligence.organic} />
                  <Labeled label="Paid" value={report.acquisitionIntelligence.paid} />
                  <Labeled label="Social" value={report.acquisitionIntelligence.social} />
                  <Labeled label="Influencer" value={report.acquisitionIntelligence.influencer} />
                  <Labeled label="Email & SMS" value={report.acquisitionIntelligence.emailSms} />
                </div>
              </SectionCard>
            </div>

            {/* RETENTION */}
            <SectionCard icon={Repeat} title="Retention Intelligence" kicker="Phase 10 · Where LTV is won or lost">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="text-center shrink-0">
                  <ScoreRing value={report.retentionIntelligence.retentionMaturityScore} label="Retention Maturity" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink mb-4 font-medium">{report.retentionIntelligence.retentionVerdict}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Labeled label="Email" value={report.retentionIntelligence.email} />
                    <Labeled label="SMS" value={report.retentionIntelligence.sms} />
                    <Labeled label="Loyalty" value={report.retentionIntelligence.loyalty} />
                    <Labeled label="Subscription" value={report.retentionIntelligence.subscription} />
                    <Labeled label="Repeat Purchase" value={report.retentionIntelligence.repeatPurchase} />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* COMPETITORS */}
            <SectionCard icon={Target} title="Competitor Intelligence" kicker="Phase 11 · The brands shaping your market">
              <div className="grid md:grid-cols-2 gap-3">
                {report.competitors.map((c, i) => (
                  <div key={i} className="card-surface p-4 hover:border-primary/40 transition">
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <div className="flex items-center gap-2 min-w-0">
                        <Building2 className="w-4 h-4 text-primary shrink-0" />
                        <h4 className="font-bold text-ink truncate">{c.name}</h4>
                      </div>
                      {tierBadge(c.tier)}
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate mb-2">{c.website}</p>
                    <div className="space-y-1.5 text-xs">
                      <p><span className="font-bold text-ink">Positioning: </span><span className="text-muted-foreground">{c.positioning}</span></p>
                      <p><span className="font-bold text-emerald-600">Strengths: </span><span className="text-muted-foreground">{c.strengths}</span></p>
                      <p><span className="font-bold text-destructive">Weaknesses: </span><span className="text-muted-foreground">{c.weaknesses}</span></p>
                      <p><span className="font-bold text-primary">USP: </span><span className="text-muted-foreground">{c.usp}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* COMPETITIVE GAP */}
            <SectionCard icon={ShoppingBag} title="Competitive Gap Analysis" kicker="Phase 12 · Where you can outflank the market">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <div className="text-xs font-semibold text-destructive mb-2">Competitor advantages</div>
                  <List items={report.competitiveGap.competitorAdvantages} accent="destructive" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-destructive mb-2">Missing features</div>
                  <List items={report.competitiveGap.missingFeatures} accent="destructive" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-primary mb-2">Market opportunities</div>
                  <List items={report.competitiveGap.marketOpportunities} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-600 mb-2">Differentiation plays</div>
                  <List items={report.competitiveGap.differentiationOpportunities} accent="success" />
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs font-semibold text-primary mb-2">🌊 Blue Ocean opportunities</div>
                  <List items={report.competitiveGap.blueOcean} />
                </div>
              </div>
            </SectionCard>

            {/* 90-DAY ACTION PLAN */}
            <div className="card-surface p-6 lg:p-8 bg-gradient-to-br from-accent/5 via-card to-card border-accent/30">
              <div className="flex items-start gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent/15 text-accent shrink-0"><Rocket className="w-4 h-4" /></div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-accent">Phase 16 · 90-Day Action Plan</div>
                  <h3 className="text-2xl font-bold text-ink leading-tight">Ship in this order</h3>
                </div>
              </div>
              <div className="grid lg:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-destructive mb-3"><Flame className="w-4 h-4" /> Immediate (0-7 days)</div>
                  <ol className="space-y-2.5">
                    {report.actionPlan.immediate.map((f, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-destructive/15 text-destructive font-bold text-xs flex items-center justify-center">{i + 1}</span>
                        <span className="text-ink">{f}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary mb-3"><Rocket className="w-4 h-4" /> Growth (7-30 days)</div>
                  <ol className="space-y-2.5">
                    {report.actionPlan.growth.map((f, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-primary/15 text-primary font-bold text-xs flex items-center justify-center">{i + 1}</span>
                        <span className="text-ink">{f}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-600 mb-3"><TrendingUp className="w-4 h-4" /> Scale (30-90 days)</div>
                  <ol className="space-y-2.5">
                    {report.actionPlan.scale.map((f, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-amber-500/15 text-amber-600 font-bold text-xs flex items-center justify-center">{i + 1}</span>
                        <span className="text-ink">{f}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* FOUNDER INSIGHTS */}
            <SectionCard icon={Crown} title="Founder Insights" kicker="Phase 17 · Five lenses, five priorities">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { label: "Private Equity Investor", text: report.founderInsights.privateEquity, icon: DollarSign },
                  { label: "CRO Expert", text: report.founderInsights.croExpert, icon: MousePointerClick },
                  { label: "Branding Expert", text: report.founderInsights.brandingExpert, icon: ShieldCheck },
                  { label: "Performance Marketer", text: report.founderInsights.performanceMarketer, icon: Megaphone },
                  { label: "CEO", text: report.founderInsights.ceo, icon: Crown },
                ].map((p) => (
                  <div key={p.label} className="p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition">
                    <div className="flex items-center gap-2 mb-2">
                      <p.icon className="w-4 h-4 text-primary" />
                      <div className="text-xs font-bold uppercase tracking-wider text-primary">{p.label}</div>
                    </div>
                    <p className="text-sm text-ink leading-relaxed">{p.text}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* CTA */}
            <div className="card-surface p-8 lg:p-12 text-center bg-gradient-to-br from-primary/10 via-card to-accent/10 border-primary/30">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Turn this report into revenue
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-ink">Want us to <span className="text-sky-gradient">fix and scale</span> your store for you?</h3>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                BeingEcom turns Being Ecom Brain™ reports like this into real revenue. Book a free 30-minute strategy call and we'll walk you through the exact plan to ship these fixes.
              </p>
              <div className="mt-6 btn-pair mx-auto justify-center">
                <a href="/contact" className="btn btn-primary btn-shimmer">Book Free Strategy Call <ArrowRight className="w-4 h-4" /></a>
                <a href="/services" className="btn btn-dark"><Mail className="w-4 h-4" /> See Growth Services</a>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">Generated by Being Ecom Brain™ · BeingEcom Growth & Scaling Agency</p>
          </div>
        </section>
      )}

      <FaqSection
        faqs={auditFaqs}
        title="Audit FAQ —"
        highlight="what to expect"
        intro="Everything founders ask before running the free Being Ecom Brain™ report."
      />
    </PageLayout>
  );
}
