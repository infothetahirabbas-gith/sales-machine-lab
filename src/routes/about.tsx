import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA, NumberedList } from "../components/site/Section";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <PageLayout>
      <section className="relative pt-20 pb-12 lg:pt-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">About</div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl leading-[1.04]">
            We build <span className="text-gradient">ecommerce growth systems</span> — not marketing services.
          </h1>
        </div>
      </section>

      <Section eyebrow="Our story" title="BeingEcom started inside a Shopify store, not an agency.">
        <p className="text-lg text-muted-foreground max-w-3xl">
          We spent years scaling our own DTC brands. Every framework, dashboard, and playbook we use was forged from
          our own P&Ls. That's why our work is operator-grade — not generic agency theory.
        </p>
      </Section>

      <Section eyebrow="Mission" title="Help ecommerce stores scale profitably.">
        <p className="text-lg text-muted-foreground max-w-3xl">Make sustainable, profit-led growth the default for Shopify and WooCommerce brands — not the exception.</p>
      </Section>

      <Section eyebrow="Vision" title="Become the global ecommerce growth partner.">
        <p className="text-lg text-muted-foreground max-w-3xl">An operating system, not an agency. Owned by operators, built for operators.</p>
      </Section>

      <Section eyebrow="What makes us different" title="We obsess over revenue, not deliverables.">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Ecommerce-only", b: "We don't do SaaS, lead gen, or local. Only ecommerce." },
            { t: "Full stack", b: "Ads, CRO, SEO, retention, analytics — one team, one system." },
            { t: "Operator DNA", b: "Built by people who've actually scaled stores with their own money." },
          ].map((p) => (
            <Card key={p.t}>
              <h3 className="font-semibold text-lg">{p.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.b}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Our approach" title="Data-driven, no fluff.">
        <NumberedList items={[
          { title: "Diagnose", body: "Audit your funnel, ads, and unit economics in week one." },
          { title: "Prioritize", body: "Stack ranked by revenue impact. Quick wins first." },
          { title: "Execute", body: "Sprints, not 'strategies'. Things ship every week." },
          { title: "Compound", body: "Each module feeds the next. Growth becomes the default." },
        ]} />
      </Section>

      <Section eyebrow="Values" title="What we won't compromise on.">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Honesty over hype","Numbers over narratives","Systems over heroics","Compounding over chasing"].map(v=>(
            <Card key={v}><h3 className="font-semibold">{v}</h3></Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Team" title="The operators behind your store.">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: "Aman R.", r: "Founder · Growth Lead" },
            { n: "Priya S.", r: "CRO & Design" },
            { n: "Vikram T.", r: "Paid Media" },
            { n: "Neha K.", r: "Lifecycle & SEO" },
          ].map(m=>(
            <Card key={m.n}>
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/30 to-accent/30" />
              <div className="mt-3 font-semibold">{m.n}</div>
              <div className="text-xs text-muted-foreground">{m.r}</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Tools" title="Our daily stack.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {["Shopify","WooCommerce","Meta Ads","Google Ads","TikTok","GA4","Hotjar","Klaviyo","Triple Whale","Recharge","Yotpo","Shogun"].map(t=>(
            <div key={t} className="rounded-xl border border-border bg-card/60 px-4 py-3 text-sm font-medium text-center">{t}</div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Focus" title="Why ecommerce, only ecommerce.">
        <p className="text-lg text-muted-foreground max-w-3xl">
          Ecommerce is its own world: AOV, ROAS, CR, CAC, LTV, MER, post-purchase, inventory — none of it transfers from
          a SaaS or lead-gen playbook. We picked one lane so we'd be world-class in it.
        </p>
      </Section>

      <Section eyebrow="Proof" title="By the numbers.">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { v: "100+", l: "stores scaled" },
            { v: "$48M+", l: "tracked revenue" },
            { v: "3.2×", l: "avg ROAS lift" },
            { v: "+260%", l: "avg CR uplift" },
          ].map(s=>(
            <Card key={s.l}><div className="text-3xl font-bold text-gradient">{s.v}</div><div className="text-sm text-muted-foreground mt-1">{s.l}</div></Card>
          ))}
        </div>
      </Section>

      <CTA heading="Want operators on your team?" />
    </PageLayout>
  );
}
