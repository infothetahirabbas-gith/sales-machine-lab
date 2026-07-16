import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BarChart3, TrendingUp, ArrowRight } from "lucide-react";
import PageLayout from "./PageLayout";
import { Section, Card, CTA } from "./Section";
import AISummary from "./AISummary";
import FaqSection from "./FaqSection";
import type { FAQ } from "@/lib/seo";

export type BenchmarkRow = {
  label: string;
  values: (string | number)[];
};

export type BenchmarkTable = {
  title: string;
  note?: string;
  columns: string[]; // first column is the row label header
  rows: BenchmarkRow[];
};

export type BenchmarkConfig = {
  slug: string;
  eyebrow: string;
  title: string;
  heroSub: string;
  aiSummary: string;
  quickAnswer: string;
  keyTakeaways: string[];
  tables: BenchmarkTable[];
  howToImprove: { title: string; body: string }[];
  faqs: FaqItem[];
  relatedServiceHref: string;
  relatedServiceLabel: string;
};

export function BenchmarkPage({ cfg }: { cfg: BenchmarkConfig }) {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative pt-20 pb-10 lg:pt-28 lg:pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-5xl px-5 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <BarChart3 className="w-3.5 h-3.5" /> {cfg.eyebrow}
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.06] text-ink">
            {cfg.title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">{cfg.heroSub}</p>
        </div>
      </section>

      {/* AI SUMMARY */}
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <AISummary>{cfg.aiSummary}</AISummary>
      </div>

      {/* QUICK ANSWER */}
      <Section eyebrow="Quick answer" title="What the data shows">
        <div className="max-w-3xl mx-auto">
          <Card>
            <p className="text-ink leading-relaxed">{cfg.quickAnswer}</p>
          </Card>
        </div>
      </Section>

      {/* KEY TAKEAWAYS */}
      <Section eyebrow="Key takeaways" title="At a glance" alt>
        <ul className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {cfg.keyTakeaways.map((t, i) => (
            <li key={i} className="card-surface p-5 flex gap-3 items-start">
              <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* TABLES */}
      {cfg.tables.map((tbl, ti) => (
        <Section key={ti} eyebrow={`Benchmark table ${ti + 1}`} title={tbl.title}>
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-ink">
                <tr>
                  {tbl.columns.map((c, i) => (
                    <th key={i} className="text-left font-semibold px-4 py-3 whitespace-nowrap">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tbl.rows.map((r, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-ink whitespace-nowrap">{r.label}</td>
                    {r.values.map((v, j) => (
                      <td key={j} className="px-4 py-3 text-muted-foreground whitespace-nowrap">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {tbl.note && <p className="mt-3 text-xs text-muted-foreground">{tbl.note}</p>}
        </Section>
      ))}

      {/* HOW TO IMPROVE */}
      <Section eyebrow="How to improve" title="Beating the benchmark" alt>
        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {cfg.howToImprove.map((it, i) => (
            <Card key={i}>
              <h3 className="font-semibold text-ink">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to={cfg.relatedServiceHref as ReactNode as string} className="btn btn-ghost inline-flex items-center gap-2">
            {cfg.relatedServiceLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      {/* FAQ */}
      <FaqSection faqs={cfg.faqs} />

      <CTA
        heading="Want benchmarks for your store?"
        sub="Get a free growth audit that compares your Shopify or WooCommerce store to industry medians across SEO, ads, CRO, and email."
      />
    </PageLayout>
  );
}

/** Build a Dataset JSON-LD from a BenchmarkConfig */
export function benchmarkDatasetJsonLd(cfg: BenchmarkConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: cfg.title,
    description: cfg.aiSummary,
    url: `https://beingecom.com/benchmarks/${cfg.slug}`,
    creator: {
      "@type": "Organization",
      name: "BeingEcom",
      url: "https://beingecom.com",
    },
    keywords: [cfg.eyebrow, "ecommerce benchmarks", "Shopify", "WooCommerce"].join(", "),
    variableMeasured: cfg.tables.flatMap((t) => t.columns.slice(1)),
    license: "https://beingecom.com/terms",
  };
}
