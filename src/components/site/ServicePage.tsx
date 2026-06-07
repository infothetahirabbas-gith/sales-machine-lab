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
} from "lucide-react";
import PageLayout from "./PageLayout";
import { Section, Pill, CTA } from "./Section";
import { Reveal } from "../../hooks/useReveal";
import GrowthChart from "./GrowthChart";
import { CountUp } from "../../hooks/useCountUp";
import RevenueBars, { type Bar } from "./RevenueBars";

export type ServiceConfig = {
  slug: string;
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
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
  /** Per-service "Why this matters" headline metrics (animated count-up). */
  impactStats?: { value: string; label: string }[];
  /** Per-service Before vs After benchmark bars with tooltips. */
  metricBars?: Bar[];
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
                { v: "$48M+", l: "Tracked revenue" },
                { v: "4.1×", l: "Avg ROAS lift" },
                { v: "5.0/5", l: "Client rating" },
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
              {["Strategy", "Build", "Optimize", "Scale"].map((t) => (
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
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </div>
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

      {/* 13. TRIGGERS */}
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
                A 1% conversion lift on a store doing <span className="font-bold text-ink">$100K/mo</span> is not 1% more sales — it's
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
                      <CountUp value={s.value} />
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
                  { label: "AOV", before: 42, after: 71, unit: "$", description: "Average order value. Lifted via bundles, upsells, and post-purchase offers." },
                  { label: "Repeat rate", before: 18, after: 47, unit: "%", description: "Customers who buy again within 90 days. The single biggest LTV lever." },
                  { label: "Monthly revenue", before: 38, after: 142, unit: "$k", description: "Top-line monthly revenue once the full growth system is operating." },
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
                        <div className="text-2xl md:text-3xl font-bold text-gradient"><CountUp value={m.value} /></div>
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

      {/* 16. CTA */}
      <CTA heading={cfg.ctaTitle ?? "Ready to fix this for your store?"} />
    </PageLayout>
  );
}
