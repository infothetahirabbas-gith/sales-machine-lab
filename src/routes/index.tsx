import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { Megaphone, MousePointerClick, Search, Rocket, ClipboardCheck, Wrench, ShoppingCart, TrendingUp, Mail, Palette, Magnet, BarChart3 } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA, NumberedList } from "../components/site/Section";
import GrowthChart from "../components/site/GrowthChart";
import { faqs as homeFaqs } from "../components/site/faqs-data";
import { faqJsonLd, professionalServiceJsonLd } from "../lib/seo";
import CountUp from "../components/site/CountUp";
import { Reveal } from "../hooks/useReveal";
import { SafeImg } from "../components/SafeImg";
import { HERO_LAPTOP, HERO_PHONE, HOME_BENTO, CASE_STUDY_IMG, FOUNDER_PHOTOS } from "../lib/home-images";



// Below-the-fold — never in the critical bundle.
const BeforeAfter = lazy(() => import("../components/site/BeforeAfter"));
const RevenueLossCalculator = lazy(() => import("../components/site/RevenueLossCalculator"));
const GrowthPathPlanner = lazy(() => import("../components/site/GrowthPathPlanner"));
const ContactFaq = lazy(() => import("../components/site/ContactFaq"));

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Ecommerce Agency UK — Shopify, WooCommerce Growth & AI Search SEO | BeingEcom" },
      { name: "description", content: "UK ecommerce growth agency for Shopify and WooCommerce brands. SEO, Google AI Overview optimisation, paid ads, CRO and Klaviyo email that drive revenue." },
      { property: "og:title", content: "Ecommerce Agency UK — Shopify, WooCommerce Growth & AI Search SEO | BeingEcom" },
      { property: "og:description", content: "UK ecommerce growth agency for Shopify and WooCommerce brands. SEO, Google AI Overview optimisation, paid ads, CRO and Klaviyo email that drive revenue." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://beingecom.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://beingecom.com/" },
      { rel: "preload", as: "image", href: HERO_LAPTOP, fetchpriority: "high" },
    ],

    scripts: [
      { type: "application/ld+json", children: JSON.stringify(professionalServiceJsonLd()) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(homeFaqs, "/")) },
    ],
  }),
});

const services = [
  { to: "/services/store-development", title: "Store Development", body: "Shopify & WooCommerce stores engineered for conversion.", Icon: ShoppingCart },
  { to: "/services/cro", title: "Conversion Rate Optimisation", body: "Turn existing traffic into 2-3× more sales.", Icon: TrendingUp },
  { to: "/services/performance-marketing", title: "Performance Marketing", body: "Meta, Google & TikTok ads built to scale profitably.", Icon: Megaphone },
  { to: "/services/seo", title: "Ecommerce SEO", body: "Rank products and collections on Google - free traffic forever.", Icon: Search },
  { to: "/services/email-sms", title: "Email Marketing Automation", body: "Recover lost sales. Multiply repeat customers.", Icon: Mail },
  { to: "/services/creative", title: "Creative Production", body: "Scroll-stopping ad creatives that actually sell.", Icon: Palette },
  { to: "/services/funnel", title: "Funnel & Landing Pages", body: "High-converting funnels for launches and offers.", Icon: Magnet },
  { to: "/services/analytics", title: "Analytics & Tracking", body: "GA4, Pixel, CAPI and dashboards - set up correctly.", Icon: BarChart3 },
  { to: "/services/scaling", title: "Scaling & Retention", body: "Systems to scale from 6 to 7 figures and keep customers.", Icon: Rocket },
];

const rotatingPhrases = [
  "Ecommerce Digital Marketing Agency UK",
  "Shopify Agency UK",
  "WooCommerce Agency UK",
  "Ecommerce Growth Agency",
];

const dashboards = [
  { key: "revenue", title: "Revenue · Last 30 days", badge: "+312%", metrics: [{l:"Sessions",v:"284K"},{l:"CR",v:"4.8%"},{l:"AOV",v:"£72"}] },
  { key: "seo", title: "SEO · Organic traffic", badge: "+218%", metrics: [{l:"Keywords",v:"1,840"},{l:"Top 3",v:"126"},{l:"Clicks",v:"96K"}] },
  { key: "ads", title: "Paid Ads · Meta + Google", badge: "3.8× ROAS", metrics: [{l:"Spend",v:"£48K"},{l:"Revenue",v:"£182K"},{l:"CPA",v:"£21"}] },
  { key: "email", title: "Email · Klaviyo flows", badge: "+41% rev", metrics: [{l:"Open",v:"52%"},{l:"Click",v:"6.4%"},{l:"Rev/Recip",v:"£2.10"}] },
  { key: "cro", title: "Store CRO · Shopify", badge: "+186% CR", metrics: [{l:"CR",v:"4.8%"},{l:"AOV",v:"£84"},{l:"Bounce",v:"-32%"}] },
] as const;

function Home() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [dashIdx, setDashIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhraseIdx((i) => (i + 1) % rotatingPhrases.length), 3000);
    const id2 = setInterval(() => setDashIdx((i) => (i + 1) % dashboards.length), 3500);
    return () => { clearInterval(id); clearInterval(id2); };
  }, []);
  const dash = dashboards[dashIdx];

  return (
    <PageLayout>
      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="absolute inset-0 grid-bg opacity-70 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] bg-primary/15 blur-[140px] rounded-full float-slow" />
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] bg-accent/25 blur-[140px] rounded-full float" />

        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 text-center lg:text-left" style={{ animation: "rise 0.9s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary mx-auto lg:mx-0">
              <span className="relative w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
              Ecommerce Growth System
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-ink">
              <span className="block">We Help UK Brands</span>
              <span key={phraseIdx} className="block text-brand my-1 md:my-2" style={{ animation: "rise 0.6s cubic-bezier(0.16,1,0.3,1) both", fontSize: "0.85em" }}>
                {rotatingPhrases[phraseIdx]}
              </span>
              <span className="block">Grow Revenue & Dominate AI Search</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0" style={{ animation: "rise 0.9s 0.15s cubic-bezier(0.16,1,0.3,1) both" }}>
              UK's top Shopify agency & WooCommerce agency for paid ads, CRO, ecommerce SEO services & email automation. Built for store owners who want sales, not theory.
            </p>
            <div className="mt-8 btn-pair" style={{ animation: "rise 0.9s 0.3s cubic-bezier(0.16,1,0.3,1) both" }}>
              <Link to="/contact" className="btn btn-primary btn-shimmer">
                Book Strategy Call <span>→</span>
              </Link>
              <Link to="/audit" className="btn btn-ghost btn-shimmer group">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Free Store Audit
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0" style={{ animation: "rise 0.9s 0.45s cubic-bezier(0.16,1,0.3,1) both" }}>
              {[
                { v: "120+", l: "stores scaled" },
                { v: "£48M+", l: "tracked revenue" },
                { v: "400+", l: "A/B tests run" },
                { v: "4.1×", l: "avg ROAS lift" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl md:text-3xl font-bold text-sky-gradient tabular-nums">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 relative" style={{ animation: "scaleIn 0.9s 0.2s cubic-bezier(0.16,1,0.3,1) both" }}>
            {/* Real ecommerce photo behind the animated dashboard for warmth + realism */}
            <div className="absolute -top-6 -right-4 lg:-right-8 w-40 h-52 md:w-52 md:h-64 rotate-6 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/40 hidden md:block">
              <SafeImg
                src={HERO_PHONE}
                alt="Shopify product page shown on a phone during a UK ecommerce growth sprint"
                width={520}
                height={640}
                loading="eager"
                fetchPriority="high"
                skeleton
                brandOverlay
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full"
              />
            </div>
            <div className="relative card-surface card-tilt p-5 shadow-[0_40px_80px_-30px_oklch(0.65_0.18_245/0.4)] float">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-2">
                  <span className="relative w-2 h-2 rounded-full bg-primary pulse-dot" />
                  <span key={`t-${dash.key}`} style={{ animation: "rise 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>{dash.title}</span>
                </div>
                <span key={`b-${dash.key}`} className="text-foreground font-bold" style={{ animation: "rise 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>{dash.badge}</span>
              </div>
              <GrowthChart key={dash.key} className="w-full h-auto" variant={dash.key} />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {dash.metrics.map((m)=>(
                  <div key={`${dash.key}-${m.l}`} className="rounded-xl bg-secondary p-3 transition hover:bg-accent/10 hover:-translate-y-0.5" style={{ animation: "rise 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
                    <div className="text-xs text-muted-foreground">{m.l}</div>
                    <div className="font-bold text-ink">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* 2. TRUST BAR - running marquee */}
      <section className="border-y border-border bg-card/30 py-8 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex flex-col items-center gap-4">
          <div className="text-xs uppercase tracking-widest text-muted-foreground text-center">
            Trusted by UK ecommerce operators on
          </div>
          <div
            className="relative w-full overflow-hidden"
          >
            <div className="marquee-track marquee-fast text-muted-foreground font-semibold whitespace-nowrap">
              {Array.from({ length: 2 }).flatMap((_, k) =>
                ["Shopify","WooCommerce","Meta Ads","Google Ads","Klaviyo","GA4","TikTok Ads","Triple Whale","Recharge","Yotpo","Hotjar","Shogun"].map((t, i) => (
                  <span key={`${k}-${i}`} className="inline-flex items-center gap-8">
                    <span className="hover:text-primary transition-colors">{t}</span>
                    <span className="text-primary/40">•</span>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM */}
      <Section center eyebrow="Why most stores fail" title="Traffic isn't your problem. Conversion is.">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            { t: "No sales despite traffic", b: "Visitors land, browse, leave. Funnel is leaking everywhere." },
            { t: "High ad spend, low ROAS", b: "You're burning budget on bad creatives and lazy targeting." },
            { t: "Poor conversion rate", b: "Product pages don't sell. Checkout drops 70%+." },
            { t: "Weak branding", b: "Looks generic. Feels untrustworthy. People bounce on instinct." },
          ].map((p) => (
            <Card key={p.t}>
              <div className="text-2xl">⚠️</div>
              <h3 className="mt-3 font-semibold">{p.t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.b}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* REVENUE LOSS CALCULATOR */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <RevenueLossCalculator />
      </Suspense>

      {/* 4. SOLUTION - 4 PILLARS */}
      <Section
        center
        eyebrow="The system"
        title={<>The 4 pillars that fix what's <span className="text-sky-gradient">stopping your store from selling</span></>}
        intro="One integrated ecommerce growth agency. No more disconnected teams blaming each other."
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            { t: "Traffic", b: "Profitable paid ads across Meta, Google & TikTok — managed by a paid ads agency UK that knows ecommerce.", Icon: Megaphone },
            { t: "Conversion", b: "Store, product page & checkout optimised for sales with proven CRO services UK.", Icon: MousePointerClick },
            { t: "Organic", b: "Ecommerce SEO services UK that compound free revenue and dominate AI search overviews.", Icon: Search },
            { t: "Scale", b: "Email, retention & data systems that multiply LTV through Klaviyo email marketing automation.", Icon: Rocket },
          ].map((p, i) => (
            <Reveal key={p.t} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Card className="relative overflow-hidden h-full">
                <div className="absolute top-4 right-5 font-display font-bold text-5xl text-primary/10 select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                  <p.Icon className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <h3 className="mt-6 font-semibold text-lg text-ink">{p.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.b}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4.5 GROWTH PATH PLANNER */}
      <Suspense fallback={<div className="min-h-[300px]" />}>
        <GrowthPathPlanner />
      </Suspense>

      {/* 5. SERVICES PREVIEW GRID */}
      <Section center eyebrow="What we do" title="Nine growth services, one operating system.">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 justify-items-center mx-auto">
          {services.map((s, i) => (
            <Link key={s.to} to={s.to} className={`w-full ${i === services.length - 1 && services.length % 2 === 1 ? "col-span-2 lg:col-span-1 max-w-[50%] lg:max-w-none mx-auto" : ""}`}>
              <Card>
                <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"><s.Icon className="w-6 h-6" strokeWidth={2.2} /></div>
                <h3 className="mt-3 font-semibold text-lg text-center">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 text-center">{s.body}</p>
                <div className="mt-4 text-sm font-semibold text-primary text-center">Explore →</div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/services" className="text-sm font-semibold text-primary hover:underline">See all 9 services →</Link>
        </div>
      </Section>

      {/* 6. BEFORE / AFTER - interactive slider */}
      <Section
        center
        eyebrow="Before vs After"
        title={<>What a <span className="text-sky-gradient">real store transformation</span> looks like</>}
        intro="Drag the slider. Same store, same product, same audience - different system."
      >
        <Reveal>
          <Suspense fallback={<div className="min-h-[300px]" />}>
            <BeforeAfter />
          </Suspense>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
            <div className="text-xs font-bold uppercase text-destructive mb-2">Before</div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>- 1.1% conversion rate</li>
              <li>- ROAS stuck at 1.4×</li>
              <li>- 70% checkout abandonment</li>
              <li>- Zero organic ranking</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/40 bg-primary/5 p-5">
            <div className="text-xs font-bold uppercase text-primary mb-2">After 90 days</div>
            <ul className="space-y-1.5 text-sm">
              <li>✓ 4.6% conversion rate</li>
              <li>✓ 3.8× blended ROAS</li>
              <li>✓ 32% revenue from email marketing</li>
              <li>✓ Top-3 rankings on core products</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 7. CASE STUDY */}
      <Section center eyebrow="Real result" title="From £18K to £214K/month in 6 months.">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-2xl border border-border bg-card/60 p-4 overflow-hidden">
            <SafeImg
              src={CASE_STUDY_IMG}
              alt="UK Shopify apparel brand product page shown on a laptop — 11.9× revenue case study"
              loading="lazy"
              decoding="async"
              width={1200}
              height={800}
              className="w-full h-56 md:h-64 object-cover rounded-xl"
            />
            <div className="mt-4">
              <GrowthChart className="w-full h-auto" />
            </div>
          </div>

          <div>
            <p className="text-lg text-muted-foreground">
              A UK Shopify apparel brand stuck at 1.2% CR and 1.5× ROAS. As their ecommerce digital marketing agency UK,
              we rebuilt the product page system with conversion rate optimisation services UK, restructured Meta & Google
              ads into a proper funnel, and shipped Klaviyo email marketing automation flows from scratch.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { v: "11.9×", l: "Revenue" },
                { v: "3.8×", l: "Blended ROAS" },
                { v: "+285%", l: "CR uplift" },
              ].map((m) => (
                <div key={m.l} className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="text-2xl font-bold text-foreground">{m.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.l}</div>
                </div>
              ))}
            </div>
            <Link to="/case-studies" className="inline-block mt-6 text-foreground font-semibold underline-offset-4 hover:text-brand hover:underline">
              See full case studies →
            </Link>
          </div>
        </div>
      </Section>

      {/* 8. HOW IT WORKS */}
      <Section
        center
        eyebrow="The process"
        title={<>3 steps to a store that <span className="text-sky-gradient">prints revenue</span></>}
      >
        <div className="relative grid md:grid-cols-3 gap-4">
          {/* connector line */}
          <div className="hidden md:block absolute top-[68px] left-[16%] right-[16%] h-px bg-primary/20" />
          {[
            { step: "Step 1", title: "Audit", body: "We tear down funnel, ads, analytics & product pages — find every leak in your ecommerce funnel optimisation.", Icon: ClipboardCheck },
            { step: "Step 2", title: "Fix", body: "Rebuild the highest-impact pieces: PDP, checkout, ad funnel, and Klaviyo email marketing automation flows.", Icon: Wrench },
            { step: "Step 3", title: "Scale", body: "Once unit economics work, we scale spend, channels & retention together as your dedicated ecommerce growth agency.", Icon: Rocket },
          ].map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Card className="relative text-center h-full">
                <div className="mx-auto w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_10px_30px_-10px_oklch(0.65_0.18_245/0.55)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                  <s.Icon className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <div className="mt-4 text-[10px] font-bold tracking-[0.18em] uppercase text-primary">{s.step}</div>
                <h3 className="mt-1 font-bold text-xl text-ink">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 9. TOOLS */}
      <Section center eyebrow="Stack" title="The tools we run on every store.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {["Shopify","WooCommerce","Meta Ads","Google Ads","TikTok Ads","GA4","Hotjar","Klaviyo","Triple Whale","Recharge","Yotpo","Shogun"].map((t)=>(
            <div key={t} className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-center text-ink transition hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-[0_12px_30px_-15px_oklch(0.65_0.18_245/0.5)]">{t}</div>
          ))}
        </div>
      </Section>

      {/* 10. TESTIMONIALS - running marquee */}
      <Section center eyebrow="What store owners say" title="Operators. Not influencers.">
        <div
          className="relative overflow-hidden"
        >
          <div className="marquee-track" style={{ animationDuration: "44s" }}>
            {Array.from({ length: 2 }).flatMap((_, k) =>
              [
                { q: "We went from praying for sales to forecasting them. CRO work paid for itself in 3 weeks.", n: "Arjun M.", r: "Founder, Velo Apparel" },
                { q: "Their ad funnel cut our CAC almost in half. Email flows added 28% in pure revenue.", n: "Sara K.", r: "CMO, Lumen Beauty" },
                { q: "Finally an agency that understands ecommerce - not just 'digital marketing'. Numbers speak.", n: "David L.", r: "Owner, Hearthline Home" },
                { q: "ROAS jumped from 1.8x to 4.2x in 60 days without raising budget. Wild.", n: "Priya R.", r: "Founder, Pure Botanica" },
                { q: "Checkout abandonment dropped 38%. They actually know ecommerce under the hood.", n: "Marco T.", r: "CEO, Stridelab Footwear" },
                { q: "Klaviyo flows alone added £42K MRR. Set up in 3 weeks, not 3 months.", n: "Elena V.", r: "Growth Lead, Velour Skincare" },
                { q: "We finally have one dashboard, one team, one P&L. No more agency blame games.", n: "Tom B.", r: "Owner, Ridgeline Outdoors" },
                { q: "Scaled from £30K to £180K/mo in 5 months. Unit economics still healthy.", n: "Aisha N.", r: "Founder, Aurum Jewelry" },
                { q: "They rebuilt our PDP and conversion went from 1.2% to 3.6% overnight.", n: "Jonas W.", r: "CEO, GearLoop Electronics" },
              ].map((t, i) => {
                const photo = FOUNDER_PHOTOS[(k * 10 + i) % FOUNDER_PHOTOS.length];
                return (
                  <div key={`${k}-${i}`} className="w-[320px] md:w-[360px] shrink-0">
                    <div className="card-surface card-hover p-6 h-full mx-2">
                      <div className="text-primary text-3xl font-display leading-none">“</div>
                      <p className="text-sm text-ink mt-2 min-h-[88px]">{t.q}</p>
                      <div className="mt-5 flex items-center gap-3">
                        <SafeImg
                          src={photo}
                          alt={`${t.n} — ${t.r}`}
                          loading="lazy"
                          decoding="async"
                          width={88}
                          height={88}
                          className="w-11 h-11 rounded-full object-cover shadow-md ring-2 ring-white shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-ink truncate">{t.n}</div>
                          <div className="text-[11px] text-muted-foreground truncate">{t.r}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                );
              })
            )}
          </div>
        </div>
      </Section>

      {/* 11. OFFER */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-8 lg:p-12 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-primary/15 blur-3xl rounded-full float" />
            <div className="relative">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">Limited Offer</div>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold text-ink">Free Ecommerce Growth Audit</h3>
              <p className="mt-2 text-muted-foreground max-w-xl">
                UK's best ecommerce digital marketing agency reviews your store, ads, and analytics — and sends back a 12-point loss-recovery plan with CRO, SEO & paid ads recommendations. No pitch deck.
              </p>
            </div>
            <Link to="/audit" className="relative flex shrink-0 btn btn-primary btn-shimmer">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />
              <span className="relative">Claim Audit →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 12. CONTACT + FAQ */}
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ContactFaq />
      </Suspense>

      {/* 13. FINAL CTA */}
      <CTA
        heading="Ready to Grow? Work With the Best Ecommerce Digital Marketing Agency UK"
        sub="Book a free strategy call with our Shopify agency UK & WooCommerce agency UK team. We'll show you exactly how to scale revenue and dominate AI search."
      />
    </PageLayout>
  );
}
