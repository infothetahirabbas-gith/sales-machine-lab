import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Database, Briefcase, Users, TrendingUp, BarChart3, Zap, DollarSign, HandshakeIcon, Shield } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, Card } from "../components/site/Section";
import teamAR from "@/assets/team-ar.jpg";
import teamSP from "@/assets/team-sp.jpg";
import teamJK from "@/assets/team-jk.jpg";
import teamMN from "@/assets/team-mn.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BeingEcom - Ecommerce Growth Operators" },
      { name: "description", content: "We build ecommerce growth systems for Shopify & WooCommerce brands. Operators, not talkers." },
      { property: "og:title", content: "About BeingEcom" },
      { property: "og:description", content: "An ecommerce-only growth team operating like a CMO + CRO + Head of Performance for your store." },
    ],
  }),
  component: About,
});

const differentiators = [
  { Icon: Target, t: "Ecommerce only", d: "We don't take SaaS, agency or B2B clients. Ecom math is different." },
  { Icon: Database, t: "Data-first", d: "Every decision tied to a number. No 'we feel like' strategy decks." },
  { Icon: Briefcase, t: "Operator mindset", d: "We act like equity-aligned co-founders, not vendors selling hours." },
  { Icon: Users, t: "Senior teams only", d: "No juniors learning on your account. The work is done by operators." },
  { Icon: TrendingUp, t: "Revenue as scoreboard", d: "If it doesn't move revenue, it doesn't go into the plan." },
  { Icon: BarChart3, t: "Transparent reporting", d: "Live dashboards. Weekly numbers. Zero spin." },
];

const values = [
  { n: "01", t: "Speed", d: "Ship weekly, not quarterly." },
  { n: "02", t: "Profit", d: "ROAS, not vanity ROAS." },
  { n: "03", t: "Ownership", d: "Your numbers are our numbers." },
  { n: "04", t: "Honesty", d: "Hard truths beat soft sales decks." },
];

const team = [
  { i: "AR", r: "Growth Strategy Lead", n: "Ex-DTC founder", img: teamAR },
  { i: "SP", r: "Performance Ads Lead", n: "$120M+ spend managed", img: teamSP },
  { i: "JK", r: "CRO & UX Director", n: "400+ A/B tests", img: teamJK },
  { i: "MN", r: "SEO & Content Lead", n: "Ranked 800+ products", img: teamMN },
];

function About() {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] bg-primary/15 blur-[140px] rounded-full float-slow" />
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] bg-accent/25 blur-[140px] rounded-full float" />

        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            About BeingEcom
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.04] text-ink max-w-4xl">
            We build <span className="text-gradient">ecommerce growth systems</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Not an SEO agency. Not a Facebook ads shop. An ecommerce-only growth team operating like a CMO + CRO + Head of Performance for your store.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary btn-shimmer">Book Strategy Call <span>→</span></Link>
            <Link to="/case-studies" className="btn btn-dark btn-shimmer">See Case Studies</Link>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <Section eyebrow="Our Story" title="Built by operators, not by talkers">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              BeingEcom started inside ecommerce, not outside it. We ran stores, lost money on ads, fixed funnels, scaled brands and got tired of agencies that didn't understand the math of a real DTC business.
            </p>
            <p>
              So we built the thing we wished existed: a single growth team that owns ads, CRO, SEO and retention as one connected system, with revenue as the only scoreboard.
            </p>
            <p>
              Today we work with Shopify & WooCommerce brands that want to scale profitably not just spin up vanity metrics.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "100+", v: "Stores scaled" },
              { k: "$48M+", v: "Tracked revenue" },
              { k: "400+", v: "A/B tests" },
              { k: "12+", v: "Senior operators" },
            ].map((s) => (
              <div key={s.k} className="card-surface p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">{s.k}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* MISSION & VISION */}
      <Section eyebrow="Mission & Vision" title="What we're building toward">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-surface p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/15 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">Mission</div>
              <p className="mt-3 text-xl md:text-2xl font-semibold text-ink leading-snug">
                Help 1,000 ecommerce stores scale profitably with a real growth system not guesses.
              </p>
            </div>
          </div>
          <div className="card-surface p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/40 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">Vision</div>
              <p className="mt-3 text-xl md:text-2xl font-semibold text-ink leading-snug">
                Become the default growth partner for Shopify and WooCommerce founders worldwide.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT MAKES US DIFFERENT */}
      <Section eyebrow="What makes us different" title="No theory. Just systems that ship revenue.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((d) => (
            <div key={d.t} className="card-surface card-hover p-6 group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                <d.Icon className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <h3 className="mt-4 font-bold text-ink text-lg">{d.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CORE VALUES */}
      <Section eyebrow="Core Values" title="The operating principles">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div key={v.n} className="card-surface card-hover p-7 relative overflow-hidden">
              <div className="text-6xl font-display font-bold text-primary/15 leading-none">{v.n}</div>
              <h3 className="mt-3 text-xl font-bold text-ink">{v.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* THE TEAM */}
      <Section eyebrow="The Team" title="A small, senior, ecommerce-only crew">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((m) => (
            <div key={m.i} className="card-surface card-hover p-6 text-center">
              <img
                src={m.img}
                alt={`${m.r} headshot`}
                loading="lazy"
                width={640}
                height={640}
                className="mx-auto w-24 h-24 rounded-full object-cover shadow-lg ring-4 ring-white"
              />
              <h3 className="mt-4 font-bold text-ink">{m.r}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{m.n}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-white to-accent/20 p-10 lg:p-14 text-center">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-primary/15 blur-3xl rounded-full float" />
            <h3 className="relative text-3xl md:text-4xl font-bold text-ink">Ready to scale profitably?</h3>
            <p className="relative mt-3 text-muted-foreground max-w-xl mx-auto">
              Get a free 12-point growth audit. No pitch deck, no obligations.
            </p>
            <Link to="/audit" className="relative inline-flex mt-6 btn btn-primary btn-shimmer">
              Book Free Audit <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
