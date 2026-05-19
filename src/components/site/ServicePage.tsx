import { Link } from "@tanstack/react-router";
import PageLayout from "./PageLayout";
import { Section, Card, Pill, NumberedList, CTA } from "./Section";
import GrowthChart from "./GrowthChart";

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
  deepBlocks: { title: string; body: string; tags?: string[] }[]; // 4-6 deeper sub-services
  triggersTitle?: string;
  triggers?: string[];
  beforeAfter: { before: string[]; after: string[] };
  caseStudy: { title: string; problem: string; strategy: string; result: string; metrics: { label: string; value: string }[] };
  ctaTitle?: string;
};

export default function ServicePage({ cfg }: { cfg: ServiceConfig }) {
  return (
    <PageLayout>
      {/* 1. Hero */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            {cfg.eyebrow}
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold max-w-4xl leading-[1.03]">
            {cfg.heroTitle}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{cfg.heroSub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold">Get Free Audit →</Link>
            <Link to="/case-studies" className="rounded-full border border-border px-6 py-3 font-semibold hover:bg-card">See Results</Link>
          </div>
        </div>
      </section>

      {/* 2. Problem Awareness */}
      <Section eyebrow="The Problem" title={cfg.problemTitle}>
        <div className="grid md:grid-cols-3 gap-4">
          {cfg.problemBullets.map((b, i) => (
            <Card key={i}>
              <div className="text-2xl">⚠️</div>
              <p className="mt-3 text-sm">{b}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 3. What It Is */}
      <Section eyebrow="What it actually means" title={cfg.whatIsTitle}>
        <p className="text-lg text-muted-foreground max-w-3xl">{cfg.whatIsBody}</p>
      </Section>

      {/* 4. System Steps */}
      <Section eyebrow="The system" title={cfg.systemTitle}>
        <NumberedList items={cfg.systemSteps} />
      </Section>

      {/* 5. Pillars */}
      <Section eyebrow="Core pillars" title={cfg.pillarsTitle}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cfg.pillars.map((p, i) => (
            <Card key={i}>
              <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-display font-bold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h4 className="mt-4 font-semibold">{p.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* 6-10. Deep blocks (4-6 detailed mini-sections) */}
      {cfg.deepBlocks.map((b, i) => (
        <Section
          key={i}
          eyebrow={`Module ${String(i + 1).padStart(2, "0")}`}
          title={b.title}
          intro={b.body}
        >
          {b.tags && (
            <div className="flex flex-wrap gap-2">
              {b.tags.map((t) => <Pill key={t}>{t}</Pill>)}
            </div>
          )}
        </Section>
      ))}

      {/* Triggers (psychological / trust) */}
      {cfg.triggers && cfg.triggersTitle && (
        <Section eyebrow="Conversion levers" title={cfg.triggersTitle}>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {cfg.triggers.map((t) => (
              <Card key={t}><p className="text-sm">{t}</p></Card>
            ))}
          </div>
        </Section>
      )}

      {/* Before vs After */}
      <Section eyebrow="Before vs After" title="What changes when the system runs">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
            <div className="text-xs font-bold uppercase text-destructive">Before</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {cfg.beforeAfter.before.map((b, i) => <li key={i}>- {b}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/40 bg-primary/5 p-6">
            <div className="text-xs font-bold uppercase text-primary">After</div>
            <ul className="mt-3 space-y-2 text-sm">
              {cfg.beforeAfter.after.map((a, i) => <li key={i}>✓ {a}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      {/* Case Study */}
      <Section eyebrow="Case study" title={cfg.caseStudy.title}>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-bold uppercase text-muted-foreground">Problem</div>
              <p className="mt-1">{cfg.caseStudy.problem}</p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-muted-foreground">Strategy</div>
              <p className="mt-1">{cfg.caseStudy.strategy}</p>
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-muted-foreground">Result</div>
              <p className="mt-1">{cfg.caseStudy.result}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {cfg.caseStudy.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="text-2xl font-bold text-gradient">{m.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-4">
            <GrowthChart className="w-full h-auto" />
          </div>
        </div>
      </Section>

      <CTA heading={cfg.ctaTitle ?? "Ready to fix this for your store?"} />
    </PageLayout>
  );
}
