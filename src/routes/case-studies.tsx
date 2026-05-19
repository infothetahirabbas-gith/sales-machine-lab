import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA } from "../components/site/Section";
import GrowthChart from "../components/site/GrowthChart";

export const Route = createFileRoute("/case-studies")({
  component: CaseStudies,
});

const studies = [
  {
    title: "Shopify Apparel Brand · $18K → $214K/mo",
    industry: "Shopify · Apparel",
    problem: "Stuck at 1.2% CR, ROAS hovering at 1.5×, no retention engine.",
    strategy: "Rebuilt PDP, restructured Meta funnel, launched 9 Klaviyo flows.",
    result: "11.9× revenue in 6 months, 3.8× blended ROAS.",
    metrics: [{ v: "11.9×", l: "Revenue" }, { v: "3.8×", l: "ROAS" }, { v: "+285%", l: "CR" }],
  },
  {
    title: "Dropshipping Gadget Store · 0 → $62K/mo",
    industry: "Shopify · Dropshipping",
    problem: "Cold launch, no offer-audience fit, creatives flat.",
    strategy: "Tight creative testing framework, UGC angles, ASC scaling.",
    result: "62K/mo in 90 days, 2.6× ROAS at scale.",
    metrics: [{ v: "$62K", l: "MRR" }, { v: "2.6×", l: "ROAS" }, { v: "90d", l: "to scale" }],
  },
  {
    title: "DTC Skincare Brand · 2.4× LTV Lift",
    industry: "Shopify · Beauty",
    problem: "Heavy ad dependency, no repeat purchase loop.",
    strategy: "Post-purchase flows, SMS welcome, subscription nudge.",
    result: "Email/SMS share of revenue from 6% to 34%.",
    metrics: [{ v: "2.4×", l: "LTV" }, { v: "34%", l: "Email rev" }, { v: "-31%", l: "CAC" }],
  },
];

function CaseStudies() {
  return (
    <PageLayout>
      <section className="relative pt-20 pb-12 lg:pt-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Case Studies</div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl leading-[1.04]">
            Real <span className="text-gradient">ecommerce growth</span> results.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            No vanity metrics. Just revenue, ROAS, and CR - before and after.
          </p>
        </div>
      </section>

      <Section eyebrow="Before / After Gallery" title="Same store. Different operating system.">
        <div className="grid md:grid-cols-3 gap-4">
          {studies.map((s) => (
            <Card key={s.title}>
              <div className="text-xs text-muted-foreground">{s.industry}</div>
              <h3 className="mt-1 font-semibold">{s.title}</h3>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {s.metrics.map((m) => (
                  <div key={m.l} className="text-center">
                    <div className="text-lg font-bold text-gradient">{m.v}</div>
                    <div className="text-[10px] uppercase text-muted-foreground">{m.l}</div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {studies.map((s, i) => (
        <Section key={s.title} eyebrow={`Case Study ${String(i + 1).padStart(2, "0")}`} title={s.title}>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold uppercase text-muted-foreground">Problem</div>
                <p className="mt-1">{s.problem}</p>
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-muted-foreground">Strategy</div>
                <p className="mt-1">{s.strategy}</p>
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-muted-foreground">Result</div>
                <p className="mt-1">{s.result}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 p-4">
              <GrowthChart className="w-full h-auto" />
            </div>
          </div>
        </Section>
      ))}

      <Section eyebrow="Ad Performance" title="Lower CAC. Higher ROAS.">
        <div className="grid md:grid-cols-3 gap-4">
          {[{v:"-42%",l:"CAC"},{v:"+168%",l:"ROAS"},{v:"+3.1×",l:"Spend at same CAC"}].map(m=>(
            <Card key={m.l}><div className="text-3xl font-bold text-gradient">{m.v}</div><div className="text-sm text-muted-foreground mt-1">{m.l}</div></Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="CR Improvements" title="The biggest unlock is on-site.">
        <div className="grid md:grid-cols-3 gap-4">
          {[{v:"1.1% → 4.6%",l:"Apparel"},{v:"0.8% → 3.2%",l:"Gadgets"},{v:"2.1% → 5.4%",l:"Skincare"}].map(m=>(
            <Card key={m.l}><div className="text-2xl font-bold text-gradient">{m.v}</div><div className="text-sm text-muted-foreground mt-1">{m.l}</div></Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="SEO traffic" title="Compounding free traffic.">
        <div className="rounded-2xl border border-border bg-card/60 p-4">
          <GrowthChart className="w-full h-auto" />
        </div>
      </Section>

      <Section eyebrow="Video Testimonials" title="In their own words.">
        <div className="grid md:grid-cols-3 gap-4">
          {[1,2,3].map(i=>(
            <Card key={i}>
              <div className="aspect-video rounded-xl bg-secondary/60 flex items-center justify-center text-3xl">▶</div>
              <p className="text-sm mt-3">Founder testimonial #{i}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Lessons learned" title="Patterns we see in every winning store.">
        <ul className="grid md:grid-cols-2 gap-3 text-sm">
          {["Hero PDP beats a hero homepage every time.","Creatives carry 80% of paid performance.","Email/SMS adds 25-35% of revenue when done right.","Offers > optimization. Fix the offer first.","Reviews on PDP move CR more than any A/B test."].map(x=>(
            <li key={x} className="rounded-xl border border-border bg-card/60 p-4">✓ {x}</li>
          ))}
        </ul>
      </Section>

      <CTA heading="Want your store to be the next case study?" />
    </PageLayout>
  );
}
