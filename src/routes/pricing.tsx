import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, ShieldCheck, BadgeCheck, LineChart, Clock3, Users, Globe2, Award, Lock, FileText, Headphones } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section } from "../components/site/Section";
import FaqSection from "../components/site/FaqSection";
import { faqJsonLd, breadcrumbJsonLd, SITE_URL } from "../lib/seo";
import { PRICING_TIERS } from "../lib/pricing";
import { SITE_STATS } from "../lib/stats";

const pricingFaqs = [
  { q: "How does the onboarding process work?", a: "Once you pick a plan, you'll book a 30-minute discovery call. We audit your store, ads and analytics, then deliver a written 90-day plan tied to specific P&L lines. Access is set up in the first 5–7 days and execution starts immediately after." },
  { q: "What happens after I choose a plan?", a: "You're routed to a booking form with your selected package pre-filled. We reply within one business day, confirm scope, sign a short MSA, and open a shared workspace so onboarding can begin the same week." },
  { q: "How long does onboarding take?", a: "Full onboarding takes 5–7 business days: tool access, tracking hardening, baselines, creative audit and a written 90-day plan. Quick wins usually ship inside the first two weeks." },
  { q: "What is included each month?", a: "Every plan includes a dedicated account manager, weekly execution, a weekly scorecard tied to your P&L, monthly strategy call, transparent reporting and unlimited Slack/email support during UK business hours." },
  { q: "Are there any setup fees?", a: "No. Every plan is a flat monthly fee — no setup fees, no hidden onboarding charges, no per-user costs." },
  { q: "Is there a minimum commitment?", a: "Yes — a 90-day initial engagement so we can properly execute a system. After that you're month-to-month with a 30-day notice. No 12-month lock-ins, ever." },
  { q: "Can I upgrade my package later?", a: "Yes — you can move up a tier at any time and the change takes effect the following month. Most clients start on Growth and move to Enterprise or Business as their revenue scales." },
  { q: "Can I downgrade my package?", a: "Yes — after the initial 90-day engagement you can move down a tier with 30 days' notice. We'll rescope deliverables so nothing important gets dropped." },
  { q: "Which ecommerce platforms do you support?", a: "Shopify, Shopify Plus and WooCommerce natively. We also support headless builds (Hydrogen, Next.js commerce) and can operate on BigCommerce or Magento for larger engagements." },
  { q: "Do you work internationally?", a: "Yes. We're based in London and work with brands across the UK, EU, US, Canada, UAE and Australia. All calls run on your working hours." },
  { q: "Will I have a dedicated account manager?", a: "Yes. Every plan includes a named account manager who owns your roadmap, weekly reporting and communication — no ticket queues, no rotating juniors." },
  { q: "How often will I receive reports?", a: "A live dashboard updates daily, a written scorecard lands weekly, and a strategic review deck lands monthly. Enterprise and Business get bi-weekly and weekly strategy calls respectively." },
  { q: "How are meetings and communication handled?", a: "Async by default via a shared Slack or Teams channel, plus a monthly strategy call as standard. Enterprise adds bi-weekly and Business adds weekly strategy sessions with the growth lead." },
  { q: "Do you provide custom strategies?", a: "Every engagement is bespoke. Plans define what's included, but the strategy, creative, keyword targets and CRO roadmap are built specifically for your brand, category and margins." },
  { q: "Can you migrate my existing campaigns?", a: "Yes. We take a full handover from your previous agency or in-house team, audit account structure, keep what's working and rebuild what isn't — with zero downtime on live spend." },
  { q: "How do I get started?", a: "Pick the plan that matches your stage and click Get Started. You'll land on a booking form with your package pre-selected. We reply within one business day to schedule your discovery call." },
];

const TITLE = "Ecommerce Agency Pricing UK — Shopify & WooCommerce Retainers | BeingEcom";
const DESC = "Transparent ecommerce agency pricing. Four monthly retainers from £500 to £2,000+, no setup fees, no lock-ins, dedicated account manager on every plan.";
const URL = `${SITE_URL}/pricing`;

const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: PRICING_TIERS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: `BeingEcom ${t.name} plan`,
      description: t.best,
      provider: { "@type": "Organization", name: "BeingEcom" },
      areaServed: "GB",
      offers: {
        "@type": "Offer",
        price: t.priceNumeric,
        priceCurrency: t.currency,
        priceSpecification: { "@type": "UnitPriceSpecification", price: t.priceNumeric, priceCurrency: t.currency, unitCode: "MON" },
        url: `${SITE_URL}/contact?plan=${encodeURIComponent(t.name)}`,
        availability: "https://schema.org/InStock",
      },
    },
  })),
};

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(pricingFaqs, "/pricing")) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])) },
      { type: "application/ld+json", children: JSON.stringify(offersJsonLd) },
    ],
  }),
  component: PricingPage,
});

const tiers = PRICING_TIERS;

const trustBadges = [
  { icon: ShieldCheck, label: "No hidden fees" },
  { icon: FileText, label: "Transparent reporting" },
  { icon: Users, label: "Dedicated account manager" },
  { icon: LineChart, label: "Data-driven strategy" },
  { icon: BadgeCheck, label: "Clear monthly deliverables" },
  { icon: Clock3, label: "Cancel after initial engagement" },
  { icon: Lock, label: "Secure & confidential (NDA-ready)" },
  { icon: Award, label: "Trusted by growing DTC brands" },
];

const heroStats = [
  { v: SITE_STATS.trackedRevenue.v, l: "Revenue tracked for clients" },
  { v: SITE_STATS.storesScaled.v, l: "Ecommerce stores scaled" },
  { v: SITE_STATS.avgRoasLift.v, l: "Average ROAS lift" },
  { v: SITE_STATS.retentionLift.v, l: "Average retention lift" },
  { v: "25+", l: "Ecommerce specialists" },
  { v: "18+", l: "Countries served" },
];

const proofHighlights = [
  { metric: "+312%", label: "Revenue growth", body: "Beauty DTC brand scaled from £80k to £330k/mo in 9 months across paid + email." },
  { metric: "4.8×", label: "ROAS improvement", body: "Fashion retailer moved from 1.6× to 7.7× blended ROAS after a full creative + funnel rebuild." },
  { metric: "+184%", label: "Organic traffic", body: "Home & living brand doubled non-brand organic sessions in 6 months via technical + content SEO." },
  { metric: "+2.1pp", label: "Conversion rate uplift", body: "Supplements store lifted site-wide CVR from 1.9% to 4.0% through CRO + PDP rebuilds." },
];

const stagesOfEngagement = [
  { n: "01", t: "Pick your plan", body: "Choose the tier that matches your stage. Your selection is passed straight into the booking form." },
  { n: "02", t: "Discovery call", body: "30-minute call with a senior operator. We confirm fit, scope and timeline — no sales theatre." },
  { n: "03", t: "Onboarding (5–7 days)", body: "Access, tracking, baselines and a written 90-day plan tied to your P&L." },
  { n: "04", t: "Weekly execution", body: "Weekly ship reviews, weekly scorecards, monthly strategy calls. Full transparency, always." },
];

function PricingPage() {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative pt-20 pb-12 lg:pt-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] bg-primary/15 blur-[140px] rounded-full float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Pricing & engagements
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-[1.04] text-ink">
            Ecommerce growth pricing — <span className="text-gradient">built for scale, not surprises</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Four transparent monthly retainers. No setup fees. No 12-month lock-ins. A dedicated account manager on every plan — from £500/mo to £2,000+/mo.
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-3 max-w-5xl mx-auto">
            {heroStats.map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-card/70 backdrop-blur px-3 py-4">
                <div className="text-2xl font-bold text-gradient">{s.v}</div>
                <div className="mt-1 text-[11px] text-muted-foreground leading-tight">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TIERS */}
      <Section
        eyebrow="Engagement models"
        title="Choose the plan that matches your stage"
        intro="Every plan is month-to-month after a 90-day initial engagement. Upgrade, downgrade or pause with 30 days' notice."
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative card-surface p-7 flex flex-col rounded-3xl ${
                t.popular ? "ring-2 ring-primary shadow-xl scale-[1.02]" : ""
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}
              <h3 className="font-bold text-xl text-ink">{t.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-ink/80">Best for:</span> {t.best}
              </p>

              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-widest text-primary font-bold">Starting from</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gradient">{t.price}</span>
                  <span className="text-sm text-muted-foreground">{t.period === "month" ? "/mo" : " fixed"}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{t.duration}</div>
              </div>

              <ul className="mt-6 space-y-2.5 flex-1">
                {t.includes.map((i) => (
                  <li key={i} className="flex gap-2 text-sm text-ink/85">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                search={(prev) => ({ ...prev, plan: t.name })}
                className={`mt-7 btn justify-center ${t.popular ? "btn-primary btn-shimmer" : "btn-dark btn-shimmer"}`}
                aria-label={`Get started with the ${t.name} plan`}
                data-plan={t.name}
              >
                Get Started →
              </Link>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                Booking form opens with <strong>{t.name}</strong> pre-selected.
              </p>
            </div>
          ))}
        </div>

        {/* Trust badges strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 rounded-xl border border-border bg-card/60 px-3 py-3">
              <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
              <span className="text-xs font-medium text-ink/85 leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* PROOF / TRUST */}
      <Section
        alt
        eyebrow="Proof, not promises"
        title="Real numbers from real ecommerce engagements"
        intro="A snapshot of the outcomes we've delivered for Shopify and WooCommerce brands over the last 24 months."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {proofHighlights.map((p) => (
            <div key={p.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="text-3xl font-bold text-gradient">{p.metric}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-widest text-primary">{p.label}</div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <Globe2 className="w-5 h-5 text-primary" />
            <h3 className="mt-3 font-semibold text-ink">Global track record</h3>
            <p className="mt-2 text-sm text-muted-foreground">Delivered work across 18+ countries in beauty, fashion, health, home, F&amp;B and more.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="mt-3 font-semibold text-ink">Senior-only pod</h3>
            <p className="mt-2 text-sm text-muted-foreground">Every plan is staffed by senior operators — never a junior running your account unsupervised.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <Headphones className="w-5 h-5 text-primary" />
            <h3 className="mt-3 font-semibold text-ink">92% client retention</h3>
            <p className="mt-2 text-sm text-muted-foreground">Most clients stay well past the initial 90-day engagement. Renewals are earned monthly, not locked in.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/case-studies" className="btn btn-dark">View case studies →</Link>
          <Link to="/company/reviews" className="btn btn-outline">Read client reviews</Link>
          <Link to="/audit" className="btn btn-outline">Run a free growth audit</Link>
        </div>
      </Section>

      {/* WHAT HAPPENS NEXT */}
      <Section
        eyebrow="What happens after you pick a plan"
        title="A calm, structured onboarding — no chaos"
        intro="From clicking Get Started to live execution takes about a week."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stagesOfEngagement.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card p-5">
              <div className="text-[11px] font-bold text-primary/70 tracking-widest">{s.n}</div>
              <h3 className="mt-2 font-semibold text-ink">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA BAND */}
      <section className="relative py-14">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-ink">Still not sure which plan fits?</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Book a free 30-minute discovery call. We'll audit your store live and recommend the smallest plan that actually moves your P&amp;L.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn btn-primary btn-shimmer">Book Discovery Call →</Link>
              <Link to="/audit" className="btn btn-outline">Or run the free audit first</Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        faqs={pricingFaqs}
        title="Pricing —"
        highlight="everything founders ask before signing"
        intro="16 straight answers on onboarding, deliverables, contracts and how to actually get started."
      />
    </PageLayout>
  );
}
