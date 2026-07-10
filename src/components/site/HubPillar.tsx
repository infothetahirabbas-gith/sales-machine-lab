import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import PageLayout from "./PageLayout";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

export type HubSubtopic = {
  title: string;
  summary: string;
  href: string;
  external?: boolean;
};

export type HubKeyFact = { label: string; value: string; source?: string };

export type HubPillarProps = {
  eyebrow: string;
  h1: string;
  answer: string; // 40-60 word answer-first paragraph
  intro: ReactNode;
  keyFacts: HubKeyFact[];
  subtopics: HubSubtopic[];
  playbook: { step: string; body: string }[];
  faqs: { q: string; a: string }[];
  ctaService: { label: string; to: string };
  relatedServices: { label: string; to: string }[];
};

export default function HubPillar(p: HubPillarProps) {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-background text-foreground">
        <div className="relative mx-auto max-w-5xl px-5 lg:px-8 pt-24 pb-14 lg:pt-32 lg:pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            {p.eyebrow}
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
            {p.h1}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/85 leading-relaxed max-w-3xl">
            {p.answer}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={p.ctaService.to}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {p.ctaService.label} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/audit"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-primary transition-colors"
            >
              Get a free store audit
            </Link>
          </div>
        </div>
      </section>

      {/* Key facts strip */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {p.keyFacts.map((k) => (
            <div key={k.label}>
              <div className="text-2xl md:text-3xl font-bold text-ink">{k.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
              {k.source && (
                <div className="text-[10px] text-muted-foreground/70 mt-0.5">{k.source}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Intro / context */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-14 lg:py-20 prose-style">
        <div className="space-y-5 text-[16px] leading-relaxed text-foreground/85">{p.intro}</div>
      </section>

      {/* Sub-topic grid */}
      <section className="mx-auto max-w-5xl px-5 lg:px-8 pb-16">
        <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
          Sub-topics in this hub
        </div>
        <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-8">
          Guides, playbooks and case studies
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {p.subtopics.map((s) => (
            <SubtopicCard key={s.href} s={s} />
          ))}
        </div>
      </section>

      {/* Playbook */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-16 lg:py-20">
          <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-8">
            The playbook, step by step
          </h2>
          <ol className="space-y-5">
            {p.playbook.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="inline-flex flex-none items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary text-sm font-bold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-semibold text-foreground">{step.step}</div>
                  <p className="text-foreground/80 mt-1 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-16 lg:py-20">
        <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-8">
          Frequently asked questions
        </h2>
        <div className="space-y-6">
          {p.faqs.map((f) => (
            <details key={f.q} className="rounded-2xl border bg-card p-5">
              <summary className="font-semibold cursor-pointer text-foreground">{f.q}</summary>
              <p className="mt-3 text-foreground/80 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related services */}
      <section className="border-t bg-muted/20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 py-14">
          <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Related services
          </div>
          <div className="flex flex-wrap gap-3">
            {p.relatedServices.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-primary" /> {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

function SubtopicCard({ s }: { s: HubSubtopic }) {
  const inner = (
    <>
      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
        {s.title}
      </div>
      <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{s.summary}</p>
      <div className="mt-4 text-xs font-semibold text-primary inline-flex items-center gap-1">
        Read more <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </>
  );
  if (s.external) {
    return (
      <a
        href={s.href}
        className="group block rounded-2xl border bg-card p-6 hover:border-primary transition-colors"
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      to={s.href}
      className="group block rounded-2xl border bg-card p-6 hover:border-primary transition-colors"
    >
      {inner}
    </Link>
  );
}
