import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus, Sparkles, ShieldCheck, BadgeCheck, LineChart, Clock3, Users, Globe2, Award, Lock, FileText, Headphones, Quote } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section } from "../components/site/Section";
import FaqSection from "../components/site/FaqSection";
import { faqJsonLd, breadcrumbJsonLd, SITE_URL } from "../lib/seo";
import { PRICING_TIERS } from "../lib/pricing";
import { SITE_STATS } from "../lib/stats";
import { trackEvent, AnalyticsEvents } from "../lib/analytics";

const pricingFaqs = [
  { q: "How does the onboarding process work?", a: "Once you pick a plan, you'll book a 30-minute discovery call. We audit your store, ads and analytics, then deliver a written 90-day plan tied to specific P&L lines. Access is set up in the first 5-7 days and execution starts immediately after." },
  { q: "What happens after I choose a plan?", a: "You're routed to a booking form with your selected package pre-filled. We reply within one business day, confirm scope, sign a short MSA, and open a shared workspace so onboarding can begin the same week." },
  { q: "How long does onboarding take?", a: "Full onboarding takes 5-7 business days: tool access, tracking hardening, baselines, creative audit and a written 90-day plan. Quick wins usually ship inside the first two weeks." },
  { q: "What is included each month?", a: "Every plan includes a dedicated account manager, weekly execution, a weekly scorecard tied to your P&L, monthly strategy call, transparent reporting and unlimited Slack/email support during UK business hours." },
  { q: "Are there any setup fees?", a: "No. Every plan is a flat monthly fee no setup fees, no hidden onboarding charges, no per-user costs." },
  { q: "Is there a minimum commitment?", a: "Yes a 90-day initial engagement so we can properly execute a system. After that you're month-to-month with a 30-day notice. No 12-month lock-ins, ever." },
  { q: "Can I upgrade my package later?", a: "Yes you can move up a tier at any time and the change takes effect the following month. Most clients start on Growth and move to Enterprise or Business as their revenue scales." },
  { q: "Can I downgrade my package?", a: "Yes after the initial 90-day engagement you can move down a tier with 30 days' notice. We'll rescope deliverables so nothing important gets dropped." },
  { q: "Which ecommerce platforms do you support?", a: "Shopify, Shopify Plus and WooCommerce natively. We also support headless builds (Hydrogen, Next.js commerce) and can operate on BigCommerce or Magento for larger engagements." },
  { q: "Do you work internationally?", a: "Yes. We're based in London and work with brands across the UK, EU, US, Canada, UAE and Australia. All calls run on your working hours." },
  { q: "Will I have a dedicated account manager?", a: "Yes. Every plan includes a named account manager who owns your roadmap, weekly reporting and communication no ticket queues, no rotating juniors." },
  { q: "How often will I receive reports?", a: "A live dashboard updates daily, a written scorecard lands weekly, and a strategic review deck lands monthly. Enterprise and Business get bi-weekly and weekly strategy calls respectively." },
  { q: "How are meetings and communication handled?", a: "Async by default via a shared Slack or Teams channel, plus a monthly strategy call as standard. Enterprise adds bi-weekly and Business adds weekly strategy sessions with the growth lead." },
  { q: "Do you provide custom strategies?", a: "Every engagement is bespoke. Plans define what's included, but the strategy, creative, keyword targets and CRO roadmap are built specifically for your brand, category and margins." },
  { q: "Can you migrate my existing campaigns?", a: "Yes. We take a full handover from your previous agency or in-house team, audit account structure, keep what's working and rebuild what isn't with zero downtime on live spend." },
  { q: "How do I get started?", a: "Pick the plan that matches your stage and click Get Started. You'll land on a booking form with your package pre-selected. We reply within one business day to schedule your discovery call." },
];

const TITLE = "Ecommerce Marketing Agency Pricing UK | Growth Packages | BeingEcom";
const DESC = "Transparent Ecommerce Marketing Agency pricing UK. Starter, Growth and Scale packages for Shopify and WooCommerce brands SEO, paid ads, CRO and Klaviyo email included.";
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
  { n: "02", t: "Discovery call", body: "30-minute call with a senior operator. We confirm fit, scope and timeline no sales theatre." },
  { n: "03", t: "Onboarding (5-7 days)", body: "Access, tracking, baselines and a written 90-day plan tied to your P&L." },
  { n: "04", t: "Weekly execution", body: "Weekly ship reviews, weekly scorecards, monthly strategy calls. Full transparency, always." },
];

const caseStudyHighlights = [
  {
    brand: "Luxe Skin Co.",
    sector: "Beauty & Skincare · DTC",
    plan: "Growth",
    quote: "Inside 6 months BeingEcom rebuilt our funnel end-to-end. We finally have a growth engine instead of guesswork.",
    author: "Priya S., Co-founder",
    before: { label: "Monthly revenue", value: "£80K" },
    after: { label: "Monthly revenue", value: "£330K" },
    delta: "+312%",
  },
  {
    brand: "Northline Apparel",
    sector: "Fashion · Shopify Plus",
    plan: "Enterprise",
    quote: "Blended ROAS went from 1.6× to 7.7×. The creative + landing page rebuild paid for a full year of retainer in the first quarter.",
    author: "James T., Head of Ecommerce",
    before: { label: "Blended ROAS", value: "1.6×" },
    after: { label: "Blended ROAS", value: "7.7×" },
    delta: "4.8× ROAS lift",
  },
  {
    brand: "Hearth & Grove",
    sector: "Home & Living · WooCommerce",
    plan: "Business",
    quote: "Non-brand organic doubled in 6 months and CRO lifted PDPs to a level our in-house team couldn't hit for two years.",
    author: "Amelia R., Founder & CEO",
    before: { label: "Organic sessions / mo", value: "42K" },
    after: { label: "Organic sessions / mo", value: "119K" },
    delta: "+184% traffic",
  },
];

type CompareRow = { feature: string; values: [string | boolean, string | boolean, string | boolean, string | boolean] };

const compareRows: CompareRow[] = [
  { feature: "Monthly investment", values: ["£500", "£1,000", "£1,500", "£2,000+"] },
  { feature: "Initial engagement", values: ["90 days", "90 days", "90 days", "90 days"] },
  { feature: "Dedicated account manager", values: [true, true, true, true] },
  { feature: "Ecommerce audit & 90-day plan", values: [true, true, true, true] },
  { feature: "Technical & on-page SEO", values: ["Setup", "Advanced", "Advanced+", "Full technical"] },
  { feature: "Product & collection page CRO", values: ["Basic", "Ongoing", "Advanced funnel", "Unlimited CRO"] },
  { feature: "Paid ads management", values: [false, "Meta + Google", "Meta + Google + TikTok", "Full multi-channel"] },
  { feature: "Email & SMS (Klaviyo)", values: [false, "Email flows", "Email + SMS", "Retention system"] },
  { feature: "Digital PR & authority", values: [false, false, true, "Campaign-led"] },
  { feature: "Creative production", values: [false, false, "Strategy + review", "Full production mgmt"] },
  { feature: "AI marketing automation", values: [false, false, true, "AI workflows"] },
  { feature: "Fractional Ecommerce CMO", values: [false, false, false, true] },
  { feature: "Strategy cadence", values: ["Monthly", "Weekly report", "Bi-weekly call", "Weekly call"] },
  { feature: "Reporting", values: ["Monthly", "Weekly", "Executive dashboard", "Custom exec reporting"] },
  { feature: "Support", values: ["Business hours", "Priority", "Priority", "VIP priority"] },
];

const objectionFaqs: { tag: string; q: string; a: string }[] = [
  { tag: "⏱", q: "How fast will I see results after signing?", a: "Onboarding wraps in 5-7 business days. Quick wins (tracking fixes, PDP tweaks, ad account cleanup) usually land inside the first two weeks. Meaningful revenue movement typically shows in weeks 4-8, with the full 90-day plan compounding from there." },
  { tag: "📦", q: "What exactly will you ship each month?", a: "A written weekly scorecard tied to your P&L, ad + email + SEO + CRO execution per your plan, a monthly strategy deck, and a live dashboard that updates daily. Every deliverable in your tier is scoped in writing before we start nothing hides behind vague retainers." },
  { tag: "🚀", q: "How does onboarding actually work?", a: "Day 0: kickoff call and access checklist. Days 1-3: audit + tracking hardening across GA4, Meta, Google and your store. Days 4-7: written 90-day plan mapped to revenue, ROAS and retention targets. Week 2: execution begins with a named senior operator, not a rotating junior." },
  { tag: "🛡", q: "Do you offer any guarantees?", a: "Yes three. (1) A 90-day performance plan with named KPIs before we invoice month two. (2) Month-to-month after the initial engagement with 30 days' notice, no lock-ins. (3) If we miss the 90-day plan's committed baseline and it's on us, the next month is on the house. Full terms shared before you sign." },
];

const planPicker: { stage: string; revenue: string; plan: string; why: string; cta: string }[] = [
  { stage: "Just launched", revenue: "£0-£25k / month", plan: "Starter", why: "Foundations first: tracking, one paid channel, welcome + abandoned flows, and monthly reporting. Prove unit economics before layering channels.", cta: "Starter" },
  { stage: "Finding product-market fit", revenue: "£25k-£100k / month", plan: "Growth", why: "Meta + Google managed together, Klaviyo flows live, ongoing CRO, and weekly scorecards - the fastest path from 5-figure to 6-figure months.", cta: "Growth" },
  { stage: "Scaling profitably", revenue: "£100k-£500k / month", plan: "Enterprise", why: "Add TikTok, SMS, digital PR, advanced CRO and AI marketing automation. Bi-weekly strategy calls with a senior growth lead.", cta: "Enterprise" },
  { stage: "8-figure operator", revenue: "£500k+ / month", plan: "Business", why: "Fractional ecommerce CMO, full multi-channel media, creative production management, VIP priority support and custom exec reporting.", cta: "Business" },
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
            Ecommerce growth pricing <span className="text-gradient">built for scale, not surprises</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Four transparent monthly retainers. No setup fees. No 12-month lock-ins. A dedicated account manager on every plan from £500/mo to £2,000+/mo.
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

      {/* PLAN PICKER - decision helper */}
      <Section
        eyebrow="Which plan fits?"
        title="Pick by revenue stage, not by feature list"
        intro="Four decision paths - matched to your monthly revenue and growth priority. If you're between two tiers, always start on the lower one; upgrades are painless, downgrades cost momentum."
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {planPicker.map((p) => (
            <div key={p.plan} className="card-surface p-6 flex flex-col rounded-3xl">
              <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{p.stage}</div>
              <div className="mt-1 text-lg font-bold text-ink">{p.revenue}</div>
              <div className="mt-4 inline-flex self-start items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                Recommended: {p.plan}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">{p.why}</p>
              <Link
                to="/contact"
                search={{ plan: p.cta }}
                onClick={() => trackEvent(AnalyticsEvents.PricingPlanCtaClick, { plan: p.cta, source: "plan_picker" })}
                className="mt-5 btn btn-ghost border border-border justify-center text-sm"
              >
                Start with {p.plan} →
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* PRICING TIERS */}
      <Section
        eyebrow="Engagement models"
        title="Four transparent plans. No setup fees. No lock-ins."
        intro="Every plan is month-to-month after the 90-day initial engagement - upgrade, downgrade or pause with 30 days' notice. Prices are in GBP and include a named senior operator on your account from day one."
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`group relative p-7 flex flex-col rounded-3xl transition-all duration-500 ${
                t.popular
                  ? "tier-featured md:scale-[1.03]"
                  : "card-premium hover-lift"
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-premium">
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
                search={{ plan: t.name }}
                onClick={() => trackEvent(AnalyticsEvents.PricingPlanCtaClick, { plan: t.name, price: t.priceNumeric, currency: t.currency, popular: !!t.popular })}
                className="mt-7 btn btn-primary btn-shimmer justify-center w-full"
                style={{
                  backgroundColor: "var(--primary, #2563eb)",
                  color: "var(--primary-foreground, #ffffff)",
                  minHeight: 48,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 20px",
                  borderRadius: 9999,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
                aria-label={`Get started with the ${t.name} plan opens the booking form`}
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

      {/* COMPARISON TABLE */}
      <Section
        alt
        eyebrow="Compare plans"
        title="See exactly what changes between tiers"
        intro="Every row below matches the deliverables inside your monthly retainer no asterisks, no fine print."
      >
        <div className="overflow-x-auto rounded-3xl border border-border bg-card/70">
          <table className="w-full min-w-[720px] text-sm">
            <caption className="sr-only">Comparison of BeingEcom pricing plans: Starter, Growth, Enterprise and Business.</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="text-left px-4 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Feature</th>
                {tiers.map((t) => (
                  <th key={t.name} scope="col" className={`px-4 py-4 text-left ${t.popular ? "bg-primary/5" : ""}`}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink">{t.name}</span>
                      {t.popular && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary-foreground">Popular</span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground font-normal">{t.price}<span className="opacity-70">/mo</span></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, ri) => (
                <tr key={row.feature} className={ri % 2 === 0 ? "bg-transparent" : "bg-secondary/20"}>
                  <th scope="row" className="text-left px-4 py-3 font-medium text-ink/85 align-top">{row.feature}</th>
                  {row.values.map((v, i) => (
                    <td key={i} className={`px-4 py-3 align-top text-ink/85 ${tiers[i].popular ? "bg-primary/5" : ""}`}>
                      {v === true ? (
                        <span className="inline-flex items-center gap-1.5 text-primary"><Check className="w-4 h-4" aria-label="Included" /><span className="sr-only">Included</span></span>
                      ) : v === false ? (
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground/70"><Minus className="w-4 h-4" aria-label="Not included" /><span className="sr-only">Not included</span></span>
                      ) : (
                        <span>{v}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="px-4 py-4"></td>
                {tiers.map((t) => (
                  <td key={t.name} className={`px-4 py-4 ${t.popular ? "bg-primary/5" : ""}`}>
                    <Link
                      to="/contact"
                      search={{ plan: t.name }}
                      onClick={() => trackEvent(AnalyticsEvents.PricingPlanCtaClick, { plan: t.name, price: t.priceNumeric, currency: t.currency, source: "comparison_table" })}
                      className="btn btn-primary justify-center w-full text-xs"
                      style={{
                        backgroundColor: "var(--primary, #2563eb)",
                        color: "var(--primary-foreground, #ffffff)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px 14px",
                        borderRadius: 9999,
                        fontWeight: 700,
                        textDecoration: "none",
                        minHeight: 40,
                        width: "100%",
                      }}
                      aria-label={`Get started with the ${t.name} plan opens the booking form`}
                    >
                      Get Started {t.name}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
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
            <p className="mt-2 text-sm text-muted-foreground">Every plan is staffed by senior operators never a junior running your account unsupervised.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <Headphones className="w-5 h-5 text-primary" />
            <h3 className="mt-3 font-semibold text-ink">92% client retention</h3>
            <p className="mt-2 text-sm text-muted-foreground">Most clients stay well past the initial 90-day engagement. Renewals are earned monthly, not locked in.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/case-studies" className="btn btn-dark">View case studies →</Link>
          <Link to="/company/reviews" className="btn btn-ghost">Read client reviews</Link>
          <Link to="/audit" className="btn btn-ghost">Run a free growth audit</Link>
        </div>
      </Section>

      {/* WHAT HAPPENS NEXT */}
      <Section
        eyebrow="What happens after you pick a plan"
        title="A calm, structured onboarding no chaos"
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

      {/* OBJECTIONS MINI-FAQ */}
      <Section
        eyebrow="Before you book"
        title="Straight answers to the four questions founders always ask"
        intro="Timeline, deliverables, onboarding and guarantees the objections that usually sit between you and the discovery call."
      >
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {objectionFaqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-card/70 p-5 open:border-primary/40 open:bg-primary/[0.03] transition-colors">
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold" aria-hidden="true">{f.tag}</span>
                  <h3 className="font-semibold text-ink leading-snug">{f.q}</h3>
                </div>
                <span className="mt-1 text-primary text-xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 pl-9 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/contact"
            onClick={() => trackEvent(AnalyticsEvents.PricingPlanCtaClick, { plan: "unspecified", source: "objections_faq" })}
            className="btn btn-primary btn-shimmer"
          >
            Book Discovery Call →
          </Link>
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
              <Link to="/audit" className="btn btn-ghost">Or run the free audit first</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY HIGHLIGHTS */}
      <Section
        alt
        eyebrow="Case study highlights"
        title="Founders who picked a plan and the numbers they shipped"
        intro="Three recent engagements, with before/after metrics pulled straight from GA4, Shopify and ad platforms."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudyHighlights.map((c) => (
            <article key={c.brand} className="card-surface p-6 rounded-3xl flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-ink text-lg leading-tight">{c.brand}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.sector}</p>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shrink-0">
                  {c.plan} plan
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-secondary/30 px-3 py-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Before</div>
                  <div className="mt-1 text-lg font-bold text-ink/80 line-through decoration-muted-foreground/50">{c.before.value}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{c.before.label}</div>
                </div>
                <div className="rounded-xl border border-primary/30 bg-primary/5 px-3 py-3">
                  <div className="text-[10px] uppercase tracking-widest text-primary font-bold">After</div>
                  <div className="mt-1 text-lg font-bold text-gradient">{c.after.value}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{c.after.label}</div>
                </div>
              </div>

              <div className="mt-3 inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {c.delta}
              </div>

              <blockquote className="mt-5 flex-1 text-sm text-ink/85 leading-relaxed relative pl-6">
                <Quote className="w-4 h-4 text-primary absolute left-0 top-1" aria-hidden="true" />
                {c.quote}
              </blockquote>
              <footer className="mt-3 text-xs text-muted-foreground">{c.author}</footer>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/case-studies" className="btn btn-dark">See all case studies →</Link>
          <Link to="/company/reviews" className="btn btn-ghost">Read verified reviews</Link>
        </div>
      </Section>

      <FaqSection
        faqs={pricingFaqs}
        title="Pricing"
        highlight="everything founders ask before signing"
        intro="16 straight answers on onboarding, deliverables, contracts and how to actually get started."
      />
    </PageLayout>
  );
}
