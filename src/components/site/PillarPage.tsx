import { Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import PageLayout from "./PageLayout";
import { Section, Card, CTA } from "./Section";
import AISummary from "./AISummary";
import FaqSection from "./FaqSection";
import type { PillarPage } from "@/lib/pillar-pages";

export default function PillarPageView({ page }: { page: PillarPage }) {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative pt-20 pb-10 lg:pt-28 lg:pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-5xl px-5 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="w-3.5 h-3.5" /> {page.eyebrow}
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.06] text-ink">
            {page.h1}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">
            {page.intro}
          </p>
          {page.pills && page.pills.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {page.pills.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-ink"
                >
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <AISummary eyebrow="Summary">{page.summary}</AISummary>
      </div>

      {page.highlights && page.highlights.length > 0 && (
        <Section>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {page.highlights.map((h) => (
              <div key={h.label} className="card-surface p-5 text-center">
                <div className="text-2xl md:text-3xl font-bold text-ink">{h.value}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{h.label}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* CORE SECTIONS */}
      <Section eyebrow="Detail" title="What's inside">
        <div className="grid gap-5 max-w-5xl mx-auto">
          {page.sections.map((s, i) => (
            <div key={i} className="card-surface p-6 lg:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-ink">{s.heading}</h3>
              <p className="mt-3 text-ink leading-relaxed">{s.body}</p>
              {s.bullets && s.bullets.length > 0 && (
                <ul className="mt-4 grid sm:grid-cols-2 gap-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* INTERNAL LINKS */}
      <Section eyebrow="Related" title="Explore more" alt>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {page.related.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="card-surface card-hover p-6 flex items-start gap-4"
            >
              <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div>
                <div className="font-semibold text-ink">{r.label}</div>
                {r.note && (
                  <div className="text-sm text-muted-foreground mt-1">{r.note}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <FaqSection title="Frequently asked questions" faqs={page.faqs} />

      <CTA
        heading={page.ctaHeading ?? "Let's turn your store into a growth engine"}
        sub={page.ctaSub ?? "Book a free strategy call - we'll walk your Shopify or WooCommerce store through the exact next move."}
      />
    </PageLayout>
  );
}
