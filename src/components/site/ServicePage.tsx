import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Sparkles,
  Layers,
  Rocket,
  Target,
  TrendingUp,
  Shield,
  Zap,
  Star,
  MessageCircle as WaIcon,
  Calendar,
  Package,
  Wrench,
  Award,
  Quote,
  Ban,
  Minus,
} from "lucide-react";
import PageLayout from "./PageLayout";
import { Section, Pill, CTA } from "./Section";
import { Reveal } from "../../hooks/useReveal";
import GrowthChart from "./GrowthChart";
import { CountUp } from "../../hooks/useCountUp";
import RevenueBars, { type Bar } from "./RevenueBars";
import type { FAQ } from "../../lib/seo";
import { SafeImg } from "../SafeImg";
import { whatsappUrl } from "../../lib/whatsapp";
import { INDUSTRIES } from "../../lib/locations-industries";
import { PRICING_TIERS } from "../../lib/pricing";
import { getRelatedServices, RESOURCE_LINKS } from "../../lib/service-catalog";

export type ServiceConfig = {
  slug: string;
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  /** Optional hero image (Unsplash URL). Rendered eagerly for fast LCP. */
  heroImage?: string;
  problemTitle: string;
  problemBullets: string[];
  whatIsTitle: string;
  whatIsBody: string;
  systemTitle: string;
  systemSteps: { title: string; body: string }[];
  pillarsTitle: string;
  pillars: { title: string; body: string }[];
  deepBlocks: { title: string; body: string; tags?: string[] }[];
  triggersTitle?: string;
  triggers?: string[];
  beforeAfter: { before: string[]; after: string[] };
  caseStudy: {
    title: string;
    problem: string;
    strategy: string;
    result: string;
    metrics: { label: string; value: string }[];
  };
  ctaTitle?: string;
  impactStats?: { value: string; label: string }[];
  metricBars?: Bar[];
  faqs?: FAQ[];
  /** Section 17 — sub-service pages this service links out to. */
  subServices?: { title: string; body: string; to: string }[];
  /** Section 20 — deliverables you get. Falls back to a smart default. */
  deliverables?: { title: string; body: string }[];
  /** Section 21 — tech stack pills. Falls back to sensible defaults. */
  techStack?: string[];
  /** Section 22 — pricing tiers. Falls back to Starter/Growth/Scale defaults. */
  packages?: { tier: string; price: string; body: string; features: string[]; featured?: boolean }[];
  /** Section 23 — testimonials. Falls back to a rotating default set. */
  testimonials?: { quote: string; name: string; role: string }[];
  /** Section 25 — related sibling services (title + href). */
  relatedServices?: { title: string; body: string; to: string }[];
  /** Common mistakes list — "5 mistakes killing your X". */
  mistakes?: { title: string; body: string }[];
  /** Comparison table — us vs typical agency vs in-house. */
  comparison?: {
    rows: { criterion: string; us: string; agency: string; inhouse: string }[];
  };
  /** Optional mid-page CTA block (rendered after deep blocks). */
  midCta?: { title: string; body: string; primary: string; secondary?: string };
  /** Optional configurable timeline (falls back to default 90-day plan). */
  timeline?: { w: string; t: string; b: string }[];
  /** Optional industry-impact grid — pain × outcome per vertical. */
  industryImpact?: { industry: string; pain: string; outcome: string }[];
};

const moduleIcons = [Layers, Target, Rocket, TrendingUp, Shield, Zap, Sparkles, Star];

export default function ServicePage({ cfg }: { cfg: ServiceConfig }) {
  return (
    <PageLayout>
      {/* 1. HERO */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary/20 blur-[140px] float" />
        <div className="absolute top-40 -left-32 w-[420px] h-[420px] rounded-full bg-accent/30 blur-[120px] float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative text-center lg:text-left">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
              {cfg.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold max-w-5xl mx-auto lg:mx-0 leading-[1.02] text-ink">
              {cfg.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {cfg.heroSub}
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-9 btn-pair">
              <Link to="/contact" className="btn btn-primary btn-shimmer group">
                Book Strategy Call
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/case-studies"
                className="btn btn-ghost group border border-border bg-white/60 backdrop-blur hover:bg-white hover:-translate-y-0.5"
              >
                See Real Results
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>

          {/* Floating proof strip */}
          <Reveal delay={4}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto lg:mx-0">
              {[
                { v: "120+", l: "Stores scaled" },
                { v: "£48M+", l: "Tracked revenue" },
                { v: "4.1×", l: "Avg ROAS lift" },
                { v: "10+ yrs", l: "Ecom operating" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="card-surface card-hover p-4 text-center group"
                >
                  <div className="text-2xl font-bold text-gradient">{s.v}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1 font-semibold">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. PROBLEM AWARENESS */}
      <Section eyebrow="The Problem" title={cfg.problemTitle} alt>
        <div className="grid md:grid-cols-3 gap-5">
          {cfg.problemBullets.map((b, i) => (
            <Reveal key={i} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="group relative h-full rounded-2xl border border-destructive/25 bg-destructive/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_oklch(0.55_0.22_25/0.35)]">
                <div className="w-11 h-11 rounded-xl bg-destructive/15 text-destructive flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <p className="mt-4 text-ink font-medium leading-relaxed">{b}</p>
                <div className="absolute inset-x-6 bottom-4 h-px bg-gradient-to-r from-transparent via-destructive/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3. WHY MOST FAIL (uses same bullets, framed as failure modes) */}
      <Section eyebrow="Why most stores fail" title="The pattern repeats - and it's fixable.">
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
          {[
            "No conversion structure - just a theme",
            "Weak UX, no buyer psychology baked in",
            "Zero focus on the metrics that actually move revenue",
            "Random tactics instead of one operating system",
          ].map((t, i) => (
            <Reveal key={i} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 transition-all hover:border-destructive/40 hover:bg-destructive/5">
                <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-ink">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. WHAT WE BUILD */}
      <Section eyebrow="What it actually means" title={cfg.whatIsTitle} alt>
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3">
            <p className="text-lg md:text-xl text-ink/80 leading-relaxed">{cfg.whatIsBody}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Strategy", "Build", "Optimise", "Scale"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5"
                >
                  <CheckCircle2 className="w-3 h-3" /> {t}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="relative rounded-3xl border border-border bg-gradient-to-br from-primary/8 via-white to-accent/15 p-6 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/15 blur-2xl" />
              <div className="relative space-y-3">
                {cfg.systemSteps.slice(0, 4).map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl bg-white/80 backdrop-blur border border-border p-3 transition hover:translate-x-1"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[oklch(0.55_0.2_265)] text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="text-sm font-semibold text-ink">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. SYSTEM STEPS */}
      <Section eyebrow="The system" title={cfg.systemTitle}>
        <ol className="grid md:grid-cols-2 gap-5">
          {cfg.systemSteps.map((it, i) => (
            <Reveal key={i} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <li className="group relative card-surface card-hover p-6 flex gap-5 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary font-display font-bold flex items-center justify-center text-xl border border-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h4 className="font-bold text-ink text-lg">{it.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{it.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 6. PILLARS */}
      <Section eyebrow="Core pillars" title={cfg.pillarsTitle} alt>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {cfg.pillars.map((p, i) => {
            const Icon = [Shield, Target, Zap, Sparkles][i % 4];
            return (
              <Reveal key={i} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="group relative card-surface card-hover p-6 h-full overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-primary/8 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.55_0.2_265)] text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="mt-5 font-bold text-ink">{p.title}</h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 7-12. DEEP BLOCKS (alternating layout with icons + tags) */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
                <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
                Inside the system
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-[1.05] text-ink">
                Every module, engineered to compound.
              </h2>
            </div>
          </Reveal>

          <div className="space-y-5">
            {cfg.deepBlocks.map((b, i) => {
              const Icon = moduleIcons[i % moduleIcons.length];
              const reverse = i % 2 === 1;
              return (
                <Reveal key={i}>
                  <div
                    className={`group relative grid lg:grid-cols-12 gap-6 items-stretch card-surface card-hover overflow-hidden p-6 md:p-8 ${
                      reverse ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Visual block */}
                    <div className="lg:col-span-4 relative rounded-2xl bg-gradient-to-br from-primary/8 via-white to-accent/20 border border-border p-6 overflow-hidden min-h-[180px] flex items-center justify-center">
                      <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-primary/15 blur-2xl group-hover:scale-125 transition-transform duration-700" />
                      <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-accent/25 blur-2xl group-hover:scale-125 transition-transform duration-700" />
                      <div className="relative flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.55_0.2_265)] text-white flex items-center justify-center shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                          Module {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-8 flex flex-col justify-center">
                      <h3 className="text-xl md:text-2xl font-bold text-ink leading-snug">
                        {b.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">{b.body}</p>
                      {b.tags && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {b.tags.map((t) => (
                            <Pill key={t}>{t}</Pill>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12b. MID-PAGE CTA (optional) */}
      {cfg.midCta && (
        <Section>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/10 via-white to-accent/15 p-8 md:p-12 text-center">
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl float" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/25 blur-3xl float-slow" />
              <div className="relative max-w-3xl mx-auto">
                <h3 className="text-2xl md:text-4xl font-bold text-ink leading-tight">{cfg.midCta.title}</h3>
                <p className="mt-4 text-lg text-muted-foreground">{cfg.midCta.body}</p>
                <div className="mt-8 btn-pair justify-center">
                  <Link to="/contact" className="btn btn-primary btn-shimmer group">
                    {cfg.midCta.primary}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  {cfg.midCta.secondary && (
                    <Link to="/audit" className="btn btn-ghost border border-border bg-white/60 backdrop-blur">
                      {cfg.midCta.secondary}
                    </Link>
                  )}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">No lock-ins · UK-based senior operators · Reply within 1 business day</p>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      {/* 12c. MISTAKES (optional) */}
      {cfg.mistakes && cfg.mistakes.length > 0 && (
        <Section eyebrow="Avoid these" title={`Mistakes that quietly kill ${cfg.eyebrow.toLowerCase()} performance.`} alt>
          <div className="grid md:grid-cols-2 gap-4">
            {cfg.mistakes.map((m, i) => (
              <Reveal key={m.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="group relative flex gap-4 rounded-2xl border border-destructive/25 bg-destructive/5 p-5 transition hover:-translate-y-1 hover:shadow-md">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-destructive/15 text-destructive flex items-center justify-center font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-destructive">
                      <Ban className="w-3 h-3" /> Mistake
                    </div>
                    <h4 className="mt-1 font-bold text-ink">{m.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{m.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* 12d. COMPARISON TABLE (optional) */}
      {cfg.comparison && cfg.comparison.rows.length > 0 && (
        <Section eyebrow="How we compare" title="BeingEcom vs typical agency vs in-house.">
          <Reveal>
            <div className="overflow-x-auto rounded-3xl border border-border bg-white">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-primary/8 to-accent/12 border-b border-border">
                    <th className="text-left p-4 font-bold text-ink w-1/3">What matters</th>
                    <th className="text-left p-4 font-bold text-primary">BeingEcom</th>
                    <th className="text-left p-4 font-bold text-muted-foreground">Typical agency</th>
                    <th className="text-left p-4 font-bold text-muted-foreground">In-house hire</th>
                  </tr>
                </thead>
                <tbody>
                  {cfg.comparison.rows.map((r, i) => (
                    <tr key={r.criterion} className={i % 2 === 0 ? "bg-white" : "bg-secondary/30"}>
                      <td className="p-4 font-semibold text-ink border-t border-border">{r.criterion}</td>
                      <td className="p-4 border-t border-border">
                        <span className="inline-flex items-start gap-2 text-ink">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {r.us}
                        </span>
                      </td>
                      <td className="p-4 border-t border-border text-muted-foreground">
                        <span className="inline-flex items-start gap-2">
                          <Minus className="w-4 h-4 text-muted-foreground/60 shrink-0 mt-0.5" /> {r.agency}
                        </span>
                      </td>
                      <td className="p-4 border-t border-border text-muted-foreground">
                        <span className="inline-flex items-start gap-2">
                          <Minus className="w-4 h-4 text-muted-foreground/60 shrink-0 mt-0.5" /> {r.inhouse}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Section>
      )}

      {/* 12e. INDUSTRY IMPACT (optional) */}
      {cfg.industryImpact && cfg.industryImpact.length > 0 && (
        <Section eyebrow="Vertical impact" title={`How ${cfg.eyebrow.toLowerCase()} moves the needle in your industry.`} alt>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cfg.industryImpact.map((it, i) => (
              <Reveal key={it.industry} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="card-surface card-hover p-6 h-full">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{it.industry}</div>
                  <div className="mt-3">
                    <div className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      <p className="text-muted-foreground leading-relaxed"><span className="font-semibold text-ink">Pain:</span> {it.pain}</p>
                    </div>
                    <div className="mt-3 flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-ink leading-relaxed"><span className="font-semibold">Outcome:</span> {it.outcome}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}


      {cfg.triggers && cfg.triggersTitle && (
        <Section eyebrow="Conversion levers" title={cfg.triggersTitle} alt>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {cfg.triggers.map((t, i) => (
              <Reveal key={t} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="group flex items-center gap-3 rounded-2xl border border-border bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-accent/25 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-ink leading-snug">{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* 14. BEFORE vs AFTER */}
      <Section eyebrow="Before vs After" title="What changes when the system runs.">
        <div className="grid md:grid-cols-2 gap-5">
          <Reveal>
            <div className="group relative h-full rounded-3xl border border-destructive/30 bg-gradient-to-br from-destructive/8 to-destructive/[0.03] p-7 overflow-hidden transition hover:-translate-y-1">
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-destructive/15 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-destructive">
                  <XCircle className="w-4 h-4" /> Before
                </div>
                <ul className="mt-5 space-y-3">
                  {cfg.beforeAfter.before.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      <span className="text-ink/70 line-through decoration-destructive/40">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="group relative h-full rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 via-white to-accent/15 p-7 overflow-hidden transition hover:-translate-y-1 shadow-lg shadow-primary/10">
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/20 blur-3xl float-slow" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary">
                  <CheckCircle2 className="w-4 h-4" /> After
                </div>
                <ul className="mt-5 space-y-3">
                  {cfg.beforeAfter.after.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-ink font-medium">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 14b. WHY IT MATTERS FOR SALES — animated revenue impact */}
      <Section eyebrow="Why this matters for sales" title="Small shifts compound into big revenue." alt>
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          <Reveal className="lg:col-span-2">
            <div className="card-surface p-6 md:p-7 h-full">
              <p className="text-ink/80 leading-relaxed">
                A 1% conversion lift on a store doing <span className="font-bold text-ink">£100K/mo</span> is not 1% more sales — it's
                <span className="text-gradient font-bold"> compounding revenue </span>
                every month, on the same ad spend. That's why every module in this system is engineered to move the metrics that print money.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-6">
                {(cfg.impactStats ?? [
                  { value: "+34%", label: "Avg revenue lift" },
                  { value: "2.7×", label: "ROAS improvement" },
                  { value: "62%", label: "Repeat buyer rate" },
                ]).map((s) => (
                  <div key={s.label} className="rounded-2xl border border-border bg-gradient-to-br from-white to-secondary/40 p-3 text-center">
                    <div className="text-xl md:text-2xl font-bold text-gradient">
                      {s.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 font-semibold">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-3">
            <div className="card-surface p-6 md:p-8 h-full">
              <div className="flex items-center justify-between mb-5">
                <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Revenue impact — Before vs After
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider">
                  <span className="inline-flex items-center gap-1.5 text-destructive/80">
                    <span className="w-2 h-2 rounded-full bg-destructive/40" /> Before
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary" /> After
                  </span>
                </div>
              </div>
              <RevenueBars
                bars={cfg.metricBars ?? [
                  { label: "Conversion rate", before: 1.4, after: 3.8, unit: "%", description: "Share of visitors who complete a purchase. Benchmark: top-quartile DTC stores hit 3.5–4.5%." },
                  { label: "ROAS", before: 1.9, after: 4.2, unit: "×", description: "Revenue ÷ ad spend. Healthy paid-social ROAS for scaling brands sits at 3–4×." },
                  { label: "AOV", before: 42, after: 71, unit: "£", description: "Average order value. Lifted via bundles, upsells, and post-purchase offers." },
                  { label: "Repeat rate", before: 18, after: 47, unit: "%", description: "Customers who buy again within 90 days. The single biggest LTV lever." },
                  { label: "Monthly revenue", before: 38, after: 142, unit: "£k", description: "Top-line monthly revenue once the full growth system is operating." },
                ]}
              />
              <p className="mt-4 text-[11px] text-muted-foreground leading-relaxed">
                Benchmarks based on 120+ Shopify &amp; WooCommerce stores we've scaled. Hover any metric for the definition.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 15. CASE STUDY */}
      <Section eyebrow="Case study" title={cfg.caseStudy.title} alt>
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          <Reveal className="lg:col-span-3">
            <div className="card-surface p-7 md:p-9 h-full">
              <div className="space-y-6">
                {[
                  { l: "Problem", v: cfg.caseStudy.problem, c: "text-destructive" },
                  { l: "Strategy", v: cfg.caseStudy.strategy, c: "text-primary" },
                  { l: "Result", v: cfg.caseStudy.result, c: "text-emerald-600" },
                ].map((b) => (
                  <div key={b.l}>
                    <div className={`text-[11px] font-bold uppercase tracking-widest ${b.c}`}>
                      {b.l}
                    </div>
                    <p className="mt-1.5 text-ink leading-relaxed">{b.v}</p>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {cfg.caseStudy.metrics.map((m, i) => (
                    <Reveal key={m.label} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                      <div className="group rounded-2xl border border-border bg-gradient-to-br from-white to-secondary/40 p-4 text-center transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                        <div className="text-2xl md:text-3xl font-bold text-gradient">{m.value}</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 font-semibold">
                          {m.label}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-2">
            <div className="relative card-surface p-6 h-full overflow-hidden">
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-primary/10 blur-3xl float" />
              <div className="relative">
                <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Growth trajectory
                </div>
                <GrowthChart className="w-full h-auto" />
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Month 1</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                    <TrendingUp className="w-3.5 h-3.5" /> Compounding
                  </span>
                  <span className="text-muted-foreground">Month 12</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 15.5 FAQ — content mirrors faqJsonLd in the route head */}
      {cfg.faqs && cfg.faqs.length > 0 && (
        <Section eyebrow="FAQ" title="Questions we get asked all the time.">
          <div className="mx-auto max-w-3xl space-y-4">
            {cfg.faqs.map((f, i) => (
              <Reveal key={f.q} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <details className="group rounded-2xl border border-border bg-card/60 backdrop-blur p-5 open:bg-card transition-colors">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-semibold text-ink">
                    <span>{f.q}</span>
                    <span className="mt-1 inline-flex shrink-0 w-6 h-6 items-center justify-center rounded-full border border-border text-primary group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* 16. HERO SHOWCASE IMAGE — eager load for perceived speed */}
      {cfg.heroImage && (
        <Section>
          <Reveal>
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-xl group">
              <SafeImg
                src={cfg.heroImage}
                alt={`${cfg.eyebrow} — Being Ecom growth engine`}
                width={1920}
                height={900}
                className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                brandOverlay
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent text-white">
                <div className="max-w-2xl">
                  <div className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white/80">{cfg.eyebrow}</div>
                  <div className="mt-2 text-lg sm:text-2xl md:text-3xl font-bold leading-tight">One integrated growth engine, executed by senior operators.</div>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>
      )}

      {/* 17. SUB-SERVICES — linked out to child service pages */}
      {cfg.subServices && cfg.subServices.length > 0 && (
        <Section eyebrow="Go deeper" title={`Everything inside ${cfg.eyebrow.toLowerCase()}`} alt>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cfg.subServices.map((s, i) => (
              <Reveal key={s.to} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <Link to={s.to} className="card-surface card-hover p-6 group block h-full">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Layers className="size-5" />
                  </div>
                  <h3 className="text-lg font-bold text-ink">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.body}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-semibold group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* 18. WHAT YOU GET — deliverables checklist */}
      <Section eyebrow="What you get" title="Deliverables in every engagement">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(cfg.deliverables ?? [
            { title: "Senior operator on your account", body: "Ex-DTC founders and CMOs — no juniors, ever." },
            { title: "Weekly Loom performance review", body: "What worked, what failed, what's next — plain English." },
            { title: "Live Triple Whale dashboard", body: "Real revenue, MER and CAC — not platform fiction." },
            { title: "3 creative batches per week", body: "UGC + motion tests shipped, with named hypotheses." },
            { title: "Founder Slack access", body: "Direct line to your pod — replies in hours, not days." },
            { title: "Full asset ownership", body: "You own every ad, flow, creative and integration on day one." },
          ]).map((d, i) => (
            <Reveal key={d.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-5 flex gap-3 group hover:border-primary/40 transition-colors">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="size-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-ink">{d.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{d.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 19. 90-DAY KICKOFF TIMELINE */}
      <Section eyebrow="First 90 days" title="From signed contract to compounding revenue" alt>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(cfg.timeline ?? [
            { w: "Week 1", t: "Audit + strategy", b: "Full baseline audit, GA4 review, competitor teardown, 90-day plan agreed." },
            { w: "Week 2-3", t: "Tracking rebuilt", b: "Server-side, CAPI, Enhanced Conversions and Triple Whale wired." },
            { w: "Week 4-6", t: "First wins shipped", b: "New creative live, PDPs rewired, flows rebuilt — first ROAS lift lands." },
            { w: "Week 7-12", t: "Scale + retention", b: "Winners scaled hard, subscription + VIP flows live, forecast on track." },
          ]).map((s, i) => (
            <Reveal key={s.w} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-5 relative overflow-hidden group">
                <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-primary/10 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                    <Calendar className="size-3" /> {s.w}
                  </div>
                  <h4 className="mt-3 font-bold text-ink">{s.t}</h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.b}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 20. TECH STACK */}
      <Section eyebrow="Stack" title="The tools we deploy and manage for you">
        <div className="flex flex-wrap gap-2">
          {(cfg.techStack ?? [
            "Shopify Plus", "Klaviyo", "Meta Ads Manager", "Google Ads + GMC", "TikTok Ads + Shop",
            "GA4 + server-side", "Triple Whale", "Recharge", "Yotpo / Okendo", "Postscript", "Attentive", "Fondue",
          ]).map((t, i) => (
            <Reveal key={t} delay={Math.min(i % 4, 3) as 0 | 1 | 2 | 3}>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-primary/40 hover:bg-primary/5 transition-all hover-scale">
                <Wrench className="size-3.5 text-primary" /> {t}
              </span>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 21. INDUSTRIES WE SERVE */}
      <Section eyebrow="Industries" title={`${cfg.eyebrow} for every ecommerce vertical`} alt>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INDUSTRIES.slice(0, 8).map((ind, i) => (
            <Reveal key={ind.slug} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Link to="/industries/$slug" params={{ slug: ind.slug }} className="card-surface card-hover p-5 block group">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Layers className="size-4" />
                </div>
                <h4 className="font-bold text-ink text-sm">{ind.name}</h4>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-semibold">
                  {cfg.eyebrow} <ArrowRight className="size-3" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/industries" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            See all 12 industries we scale <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      {/* 22. TESTIMONIALS */}
      <Section eyebrow="Real founders" title="What our clients actually say">
        <div className="grid md:grid-cols-3 gap-5">
          {(cfg.testimonials ?? [
            { quote: "Blended ROAS 1.9 → 4.3 in 90 days. Compliant, converting creative shipped weekly.", name: "Amelia H.", role: "Founder, Shoreditch skincare" },
            { quote: "They rebuilt our Google Shopping in three weeks. Non-brand Search finally became a profit centre.", name: "Daniel R.", role: "Founder, wearables startup" },
            { quote: "Ad fatigue used to break us in a week. Now we get three UGC batches a week and ROAS holds.", name: "Sara J.", role: "Founder, women's fashion" },
          ]).map((t, i) => (
            <Reveal key={t.name} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface p-6 h-full relative group hover:shadow-xl transition-shadow">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                <div className="flex gap-1 text-primary mb-3">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-ink leading-relaxed">"{t.quote}"</p>
                <footer className="mt-5 pt-4 border-t border-border">
                  <div className="font-semibold text-ink text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </footer>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 23. PACKAGES / PRICING TIERS */}
      <Section eyebrow="Investment" title="Simple, transparent packages" alt>
        <div className="grid md:grid-cols-3 gap-5">
          {(cfg.packages ?? PRICING_TIERS.map((t) => ({
            tier: t.name,
            price: `${t.price}${t.period === "month" ? "/mo" : " fixed"}`,
            body: t.best,
            features: t.includes,
            featured: t.popular,
          }))).map((p, i) => (
            <Reveal key={p.tier} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className={`card-surface p-6 h-full relative overflow-hidden group ${p.featured ? "ring-2 ring-primary shadow-xl" : ""}`}>
                {p.featured && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-2xl">Most popular</div>
                )}
                <div className="flex items-center gap-2">
                  <Award className="size-4 text-primary" />
                  <div className="text-sm font-bold uppercase tracking-widest text-primary">{p.tier}</div>
                </div>
                <div className="mt-3 text-3xl font-bold text-ink">{p.price}</div>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                <ul className="mt-5 space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`mt-6 w-full btn ${p.featured ? "btn-primary" : "btn-ghost border border-border"} hover-scale`}>
                  Get started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 24. WHATSAPP QUICK BAR */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-[#25D366]/10 via-primary/5 to-accent/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 animate-pulse">
                <WaIcon className="size-6" />
              </div>
              <div>
                <div className="font-bold text-ink text-lg">Ask a senior {cfg.eyebrow.toLowerCase()} operator on WhatsApp</div>
                <div className="text-sm text-muted-foreground">Average reply time <span className="font-bold text-ink"><CountUp value="7 minutes" /></span> on UK business hours. No forms, no juniors.</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl(`Hi BeingEcom — I want to talk about ${cfg.eyebrow.toLowerCase()} for my ecommerce store.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn hover-scale bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-md"
              >
                <WaIcon className="w-4 h-4" /> Message on WhatsApp
              </a>
              <Link to="/contact" className="btn btn-ghost border border-border hover-scale">Book a call</Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 25. RELATED SERVICES */}
      {cfg.relatedServices && cfg.relatedServices.length > 0 && (
        <Section eyebrow="Also explore" title="Related services we ship together" alt>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cfg.relatedServices.map((r, i) => (
              <Reveal key={r.to} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <Link to={r.to} className="card-surface card-hover p-5 group block h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowUpRight className="size-5" />
                  </div>
                  <h4 className="font-bold text-ink">{r.title}</h4>
                  <p className="text-sm text-muted-foreground mt-2">{r.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* 26. FINAL CTA */}
      <CTA heading={cfg.ctaTitle ?? "Ready to fix this for your store?"} />
    </PageLayout>
  );
}
