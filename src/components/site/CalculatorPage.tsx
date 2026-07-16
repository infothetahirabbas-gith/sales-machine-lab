import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, CheckCircle2, Info, Sparkles, TrendingUp } from "lucide-react";
import PageLayout from "./PageLayout";
import AISummary from "./AISummary";
import FaqSection from "./FaqSection";
import {
  formatCalcValue,
  type CalcConfig,
  type CalcInput,
  type CalcOutput,
} from "@/lib/calculators";

function InputRow({
  input,
  value,
  onChange,
}: {
  input: CalcInput;
  value: number;
  onChange: (n: number) => void;
}) {
  const prefix = input.type === "currency" ? "£" : undefined;
  const suffix = input.type === "percent" ? "%" : undefined;
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{input.label}</span>
      {input.help && (
        <span className="mt-1 flex items-start gap-1.5 text-xs text-muted-foreground">
          <Info className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
          <span>{input.help}</span>
        </span>
      )}
      <div className="mt-2 flex items-stretch overflow-hidden rounded-lg border border-border bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        {prefix && (
          <span className="flex items-center px-3 text-sm font-semibold text-muted-foreground bg-secondary/40 border-r border-border">
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={input.min}
          max={input.max}
          step={input.step ?? (input.type === "int" ? 1 : 0.01)}
          onChange={(e) => {
            const n = parseFloat(e.target.value);
            onChange(Number.isFinite(n) ? n : 0);
          }}
          className="w-full px-3 py-2.5 text-base font-medium text-ink outline-none"
          aria-label={input.label}
        />
        {suffix && (
          <span className="flex items-center px-3 text-sm font-semibold text-muted-foreground bg-secondary/40 border-l border-border">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function OutputCard({ output }: { output: CalcOutput }) {
  const toneClass =
    output.tone === "positive"
      ? "text-emerald-600"
      : output.tone === "negative"
        ? "text-destructive"
        : "text-primary";
  return (
    <div
      className={`rounded-xl border p-4 ${
        output.emphasis
          ? "border-primary/30 bg-gradient-to-br from-primary/5 via-white to-accent/10 shadow-sm"
          : "border-border bg-white"
      }`}
    >
      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {output.label}
      </div>
      <div className={`mt-1.5 text-2xl md:text-3xl font-bold tabular-nums ${output.emphasis ? toneClass : "text-ink"}`}>
        {formatCalcValue(output.value, output.format)}
      </div>
      {output.help && <div className="mt-1.5 text-xs text-muted-foreground leading-snug">{output.help}</div>}
    </div>
  );
}

export default function CalculatorPage({ cfg }: { cfg: CalcConfig }) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(cfg.inputs.map((i) => [i.key, i.default])),
  );

  const outputs = useMemo(() => cfg.compute(values), [cfg, values]);

  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary/15 blur-[140px] float" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <Calculator className="size-3.5" /> {cfg.eyebrow}
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-ink max-w-4xl">
            {cfg.h1}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {cfg.quickAnswer}
          </p>
        </div>
      </section>

      <AISummary eyebrow="Quick answer">{cfg.quickAnswer}</AISummary>

      {/* CALCULATOR */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Inputs */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-4">
                  Your numbers
                </div>
                <div className="space-y-5">
                  {cfg.inputs.map((input) => (
                    <InputRow
                      key={input.key}
                      input={input}
                      value={values[input.key]}
                      onChange={(n) => setValues((v) => ({ ...v, [input.key]: n }))}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setValues(Object.fromEntries(cfg.inputs.map((i) => [i.key, i.default])))
                  }
                  className="mt-5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
                >
                  ↺ Reset to example values
                </button>
              </div>
            </div>

            {/* Outputs */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-secondary/30 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    Results
                  </div>
                  <div className="text-xs text-muted-foreground">Updates live</div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {outputs.map((o) => (
                    <OutputCard key={o.key} output={o} />
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-primary/20 bg-white p-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary flex items-center gap-1.5">
                    <Sparkles className="size-3" /> Formula
                  </div>
                  <pre className="mt-2 whitespace-pre-wrap font-mono text-sm text-ink leading-relaxed">
{cfg.formulaCode}
                  </pre>
                  <div className="mt-2 text-xs text-muted-foreground">{cfg.example}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="pb-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-3 flex items-center gap-1.5">
                <TrendingUp className="size-3" /> Why it matters
              </div>
              <ul className="space-y-3">
                {cfg.whyItMatters.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-[15px] text-ink/80 leading-relaxed">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-3 flex items-center gap-1.5">
                <Sparkles className="size-3" /> How to improve it
              </div>
              <ul className="space-y-3">
                {cfg.howToImprove.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-[15px] text-ink/80 leading-relaxed">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection eyebrow="FAQ" title={`${cfg.name} — questions founders ask`} faqs={cfg.faqs} />

      {/* CTA + related */}
      <section className="py-16 border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Next step</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-ink leading-tight">
            Want the operator team behind these numbers?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            BeingEcom runs {cfg.relatedService?.title ?? "ecommerce growth"} for UK Shopify and WooCommerce brands. Book a free strategy call and we'll model the same numbers against your real store.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn btn-primary btn-shimmer">
              Book Strategy Call <ArrowRight className="w-4 h-4" />
            </Link>
            {cfg.relatedService && (
              <Link to={cfg.relatedService.to} className="btn btn-ghost border border-border">
                {cfg.relatedService.title}
              </Link>
            )}
            <Link to="/tools" className="btn btn-ghost border border-border">
              All Free Tools
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
