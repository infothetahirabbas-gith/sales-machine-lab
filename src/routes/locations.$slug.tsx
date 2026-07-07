import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight, MapPin, CheckCircle2, TrendingUp, Target, Zap, Users,
  BarChart3, Rocket, ShieldCheck, Sparkles, Star, Clock, Award,
  Phone, Mail, Calendar, LineChart, ShoppingBag, Search, Megaphone,
  Layers, PieChart, Globe2, Handshake, Play,
} from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, SplitHeading, Card, Pill, NumberedList, CTA } from "../components/site/Section";
import { Reveal } from "../hooks/useReveal";
import CountUp from "../components/site/CountUp";
import FaqSection from "../components/site/FaqSection";
import { LOCATIONS } from "../lib/locations-industries";
import type { FAQ } from "../lib/seo";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const loc = LOCATIONS.find((l) => l.slug === params.slug);
    if (!loc) throw notFound();
    return { loc };
  },
  head: ({ loaderData }) => {
    const loc = loaderData?.loc;
    const title = loc
      ? `Ecommerce Agency in ${loc.city} | Shopify, SEO, Paid Ads — Being Ecom`
      : "Location — Being Ecom";
    const desc = loc
      ? `Award-winning ecommerce agency in ${loc.city}, ${loc.region}. Shopify development, SEO, Google & Meta Ads, CRO and email marketing for DTC brands scaling in ${loc.city}.`
      : "UK ecommerce growth agency locations.";
    const kw = loc
      ? `ecommerce agency ${loc.city}, Shopify agency ${loc.city}, SEO ${loc.city}, digital marketing ${loc.city}, PPC ${loc.city}, Meta ads ${loc.city}, ecommerce experts ${loc.region}`
      : "ecommerce agency UK";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: kw },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: LocationPage,
  notFoundComponent: () => (
    <PageLayout>
      <Section title="Location not found" intro="We couldn't find that city. Explore our other UK locations.">
        <Link to="/locations" className="text-primary underline">View all locations</Link>
      </Section>
    </PageLayout>
  ),
});

// Curated Unsplash imagery — stable, free to hot-link.
const IMG = {
  hero: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80",
  skyline: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
  strategy: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  ads: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1600&q=80",
  seo: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
  cro: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
  email: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?auto=format&fit=crop&w=1600&q=80",
  creative: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=80",
  analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
  shopify: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
  meeting: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  founder: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  founder2: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  founder3: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  process: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
};

function LocationPage() {
  const { loc } = Route.useLoaderData();
  const city = loc.city;

  const services = [
    { icon: Megaphone, title: `Paid Ads in ${city}`, desc: `Meta, Google, TikTok & YouTube ads managed by senior media buyers for ${city} DTC brands.`, kw: `PPC agency ${city}` },
    { icon: Search, title: `SEO for ${city} Brands`, desc: `Technical, on-page and local SEO to rank ${city} stores for high-intent buyer keywords.`, kw: `SEO agency ${city}` },
    { icon: ShoppingBag, title: `Shopify Development`, desc: `Shopify Plus builds, migrations & CRO tuned for ${city} ecommerce conversion rates.`, kw: `Shopify experts ${city}` },
    { icon: LineChart, title: `CRO & UX`, desc: `Landing page, PDP and checkout optimisation for ${city} stores leaking revenue.`, kw: `CRO ${city}` },
    { icon: Mail, title: `Email & SMS`, desc: `Klaviyo flows, campaigns and lifecycle marketing driving 30–45% of revenue.`, kw: `Klaviyo agency ${city}` },
    { icon: Sparkles, title: `Creative Studio`, desc: `UGC, static, motion & video ad creative built in-house for ${city} brands.`, kw: `creative agency ${city}` },
    { icon: PieChart, title: `Analytics & Attribution`, desc: `GA4, server-side tracking and blended CAC/ROAS dashboards you actually understand.`, kw: `analytics ${city}` },
    { icon: Zap, title: `AI Automation`, desc: `AI-driven workflows for support, ops and ad iteration built for lean ${city} teams.`, kw: `AI agency ${city}` },
  ];

  const stats = [
    { end: 120, suffix: "+", label: "UK DTC brands scaled" },
    { end: 47, suffix: "M+", prefix: "£", label: "Client revenue driven" },
    { end: 4.9, decimals: 1, suffix: "/5", label: "Average client rating" },
    { end: 12, suffix: "×", label: "Best ROAS achieved" },
  ];

  const process = [
    { title: "Discovery & Audit", body: `We deep-dive into your ${city} store, ad accounts, analytics and funnel to find the real growth blockers.` },
    { title: "Strategy Blueprint", body: `A custom 90-day roadmap: channels, budgets, offers, creative angles and KPIs — no templated decks.` },
    { title: "Rapid Sprint Setup", body: `Tracking, pixels, feeds, flows and creative production spun up in the first two weeks.` },
    { title: "Scale & Test", body: `We launch, measure daily and scale winning creative, audiences and pages compounding week over week.` },
    { title: "Optimise & Retain", body: `CRO, email/SMS and post-purchase automations lift LTV so paid keeps working profitably.` },
    { title: "Report & Iterate", body: `Weekly Loom updates, monthly strategy calls and a live dashboard — no reporting theatre.` },
  ];

  const industries = [
    "Fashion & Apparel", "Beauty & Skincare", "Health & Supplements", "Home & Furniture",
    "Food & Beverage", "Jewellery & Accessories", "Fitness & Sports", "Baby & Kids",
    "Pet Products", "Tech & Gadgets", "Sustainable Brands", "Premium & Luxury",
  ];

  const tech = [
    "Shopify Plus", "WooCommerce", "Klaviyo", "Meta Ads", "Google Ads", "TikTok Ads",
    "GA4", "Triple Whale", "Northbeam", "Recharge", "Yotpo", "Gorgias",
  ];

  const testimonials = [
    { name: "Sophie R.", role: `Founder, ${city} beauty brand`, img: IMG.founder, quote: `We tripled monthly revenue in 6 months. The ${city} team feel like an in-house growth department, not an agency.`, rating: 5 },
    { name: "James P.", role: `CEO, Shopify Plus apparel`, img: IMG.founder2, quote: `Finally an agency that speaks P&L, not vanity metrics. Our blended ROAS is up 62% since onboarding.`, rating: 5 },
    { name: "Aisha K.", role: `Marketing Lead, DTC supplements`, img: IMG.founder3, quote: `Their creative team alone is worth the retainer. Weekly UGC batches keep our ${city} Meta account fresh.`, rating: 5 },
  ];

  const faqs: FAQ[] = [
    { q: `Are you actually based in ${city}?`, a: `We serve ${city} and ${loc.region} clients daily with UK-based senior operators. We run in-person strategy days across the UK and full-remote sprints for day-to-day execution.` },
    { q: `How much does an ecommerce agency in ${city} cost?`, a: `Our ${city} retainers start at £2,500/mo for focused single-channel work and scale to £10k+/mo for full growth-engine engagements. We publish transparent pricing on our pricing page.` },
    { q: `Which platforms do you work with?`, a: `Primarily Shopify and Shopify Plus for ${city} DTC brands, plus WooCommerce migrations. On paid we cover Meta, Google, TikTok, YouTube and Pinterest.` },
    { q: `How fast do you typically see results?`, a: `Most ${city} clients see meaningful ROAS lift within 30–60 days as we rebuild tracking, creative and offers. Compounding SEO and retention gains follow in months 3–6.` },
    { q: `Do you offer a free audit?`, a: `Yes. Book a free ecommerce audit and we'll review your ${city} store, ads, analytics and email — no obligation, no sales pitch.` },
    { q: `Do you work with new or pre-revenue brands?`, a: `We specialise in brands doing £30k/mo+ already. If you're pre-launch, our store development team can build the foundation first.` },
  ];

  return (
    <PageLayout>
      {/* 1. HERO */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl float" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/30 blur-3xl float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <MapPin className="size-3.5" /> {city}, {loc.region}
              </div>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05] text-ink">
                <SplitHeading value={`Ecommerce Growth Agency in ${city}`} />
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">{loc.intro}</p>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-primary btn-shimmer hover-scale">
                  Book Free {city} Strategy Call <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/audit" className="btn btn-ghost border border-border hover-scale">
                  <Play className="w-4 h-4" /> Get Free Audit
                </Link>
                <Link to="/case-studies" className="btn btn-ghost border border-border hover-scale">
                  See Case Studies
                </Link>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Star className="w-4 h-4 fill-primary text-primary" /> 4.9/5 rating</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Shopify Partner</div>
                <div className="flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> Meta Business Partner</div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <div className="relative">
              <img src={IMG.hero} alt={`Ecommerce team working with brands in ${city}`}
                className="rounded-3xl shadow-2xl w-full h-[460px] object-cover" loading="eager" />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-border animate-fade-in">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><TrendingUp className="w-6 h-6 text-primary" /></div>
                <div><div className="text-2xl font-bold text-ink"><CountUp end={347} suffix="%" /></div><div className="text-xs text-muted-foreground">Avg. revenue lift</div></div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-border animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary"><span className="w-2 h-2 rounded-full bg-primary pulse-dot" /> LIVE {city} clients</div>
                <div className="mt-1 text-lg font-bold text-ink">18 brands scaling</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. LOGO BAR / TRUST */}
      <section className="border-y border-border bg-secondary/40 py-8">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-muted-foreground">
            <span className="font-semibold text-ink">Trusted by {city} ecommerce brands</span>
            <div className="flex flex-wrap gap-6 opacity-80">
              {["Shopify Plus", "Klaviyo Master", "Meta Partner", "Google Partner", "TikTok Partner", "GA4 Certified"].map(x => (
                <span key={x} className="font-semibold tracking-wide">{x}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS */}
      <Section eyebrow={`${city} results`} title={`Numbers ${city} founders care about`} intro={`Real outcomes from real brands scaling across ${city} and ${loc.region}.`} center>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <div className="card-surface card-hover p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient">
                  <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4. WHY CITY */}
      <Section eyebrow={`Why ${city}`} title={`${city} is one of the UK's fastest ecommerce markets`} alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <img src={IMG.skyline} alt={`${city} skyline representing ecommerce growth`} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" />
          </Reveal>
          <div className="space-y-4">
            {[
              { icon: Globe2, t: `A ${loc.region} customer base ready to buy online`, b: `${city} shoppers over-index on mobile commerce and repeat purchase behaviour.` },
              { icon: Users, t: `Deep talent pool of ${city} operators`, b: `We hire senior ex-brand marketers — no juniors on your account.` },
              { icon: Rocket, t: `Rising DTC scene`, b: `${city} is home to a new wave of 7- and 8-figure Shopify Plus brands scaling nationally.` },
              { icon: Handshake, t: `In-person strategy days`, b: `We fly to ${city} quarterly for workshops, offsites and creative shoots with your team.` },
            ].map((f, i) => (
              <Reveal key={i} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="flex gap-4 p-5 card-surface card-hover">
                  <f.icon className="w-6 h-6 text-primary shrink-0" />
                  <div><h4 className="font-semibold text-ink">{f.t}</h4><p className="text-sm text-muted-foreground mt-1">{f.b}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 5. SERVICES GRID */}
      <Section eyebrow="Services" title={`Full-stack ecommerce services in ${city}`} intro={`Every channel you need to scale profitably — under one senior team in ${city}.`}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i % 4, 3) as 0 | 1 | 2 | 3}>
              <Card>
                <s.icon className="w-8 h-8 text-primary" />
                <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-4 text-xs font-semibold text-primary/70 uppercase tracking-wide">{s.kw}</div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6. HIGHLIGHTS (existing) */}
      <Section eyebrow={`What we do in ${city}`} title={`Your ${city} growth engine`} alt>
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl">
          {loc.highlights.map((h: string, i: number) => (
            <Reveal key={h} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5 card-hover">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-ink font-medium">{h}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7. PAID ADS DEEP DIVE */}
      <Section eyebrow="Paid Media" title={`Meta, Google & TikTok Ads for ${city} brands`}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal><img src={IMG.ads} alt={`Paid ads dashboard for ${city} ecommerce`} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" /></Reveal>
          <div>
            <p className="text-lg text-muted-foreground">Our senior media buyers manage 8-figure annual ad spend for {city} DTC brands. Every campaign is built to a blended profit target, not a platform ROAS vanity metric.</p>
            <ul className="mt-6 space-y-3">
              {[`Meta Ads scaling with UGC-first creative`, `Google Search, Shopping & Performance Max`, `TikTok Spark Ads & Shop integrations`, `YouTube pre-roll and DR video`, `Retargeting & post-purchase funnels`].map((x, i) => (
                <Reveal key={x} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <li className="flex items-center gap-3 text-ink"><CheckCircle2 className="w-5 h-5 text-primary" />{x}</li>
                </Reveal>
              ))}
            </ul>
            <Link to="/services/paid-ads" className="btn btn-primary mt-8">Explore paid ads <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </Section>

      {/* 8. SEO DEEP DIVE */}
      <Section eyebrow="Search" title={`SEO agency in ${city} that ranks stores fast`} alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-lg text-muted-foreground">We combine technical SEO, product-led content and authority link building to grow organic revenue for {city} brands compounding month over month.</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {[`Local SEO for ${city}`, `Technical Shopify SEO`, `Programmatic collection pages`, `Digital PR & link building`, `AEO / AI search optimisation`, `Content strategy & briefs`].map((x) => (
                <div key={x} className="flex items-center gap-2 text-sm text-ink"><Target className="w-4 h-4 text-primary" />{x}</div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Link to="/services/seo" className="btn btn-primary">SEO services <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/services/seo/local" className="btn btn-ghost border border-border">Local SEO</Link>
            </div>
          </div>
          <Reveal><img src={IMG.seo} alt={`SEO strategy for ${city} ecommerce`} className="rounded-3xl shadow-xl w-full h-[380px] object-cover order-1 lg:order-2" /></Reveal>
        </div>
      </Section>

      {/* 9. SHOPIFY / DEV */}
      <Section eyebrow="Store development" title={`Shopify & WooCommerce experts in ${city}`}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal><img src={IMG.shopify} alt={`Shopify build for ${city} brand`} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" /></Reveal>
          <div>
            <p className="text-lg text-muted-foreground">From migrations to headless builds, our {city} Shopify Plus team delivers fast, conversion-obsessed stores that make your paid spend work harder.</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[`Shopify Plus builds`, `Theme customisation`, `Headless (Hydrogen)`, `App development`, `Migrations`, `Speed optimisation`].map(x => (
                <div key={x} className="p-4 rounded-xl border border-border bg-white text-sm font-medium text-ink card-hover">{x}</div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Link to="/services/store-development/shopify" className="btn btn-primary">Shopify services <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/services/store-development/woocommerce" className="btn btn-ghost border border-border">WooCommerce</Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 10. CRO */}
      <Section eyebrow="CRO" title={`Conversion optimisation for ${city} stores`} alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-lg text-muted-foreground">Turn more of your existing {city} traffic into revenue. We run structured A/B testing across PDPs, landing pages and checkout to lift AOV and CVR month over month.</p>
            <NumberedList items={[
              { title: "Heuristic + data audit", body: "GA4, Hotjar, session replays and revenue-per-visit analysis." },
              { title: "Hypothesis backlog", body: "Prioritised test roadmap by impact, confidence and effort." },
              { title: "Design & build", body: "Figma variants, developer-ready builds and QA across devices." },
              { title: "Launch & measure", body: "Statistically valid A/B tests with revenue-level significance." },
            ]} />
          </div>
          <Reveal><img src={IMG.cro} alt={`CRO testing for ${city} ecommerce`} className="rounded-3xl shadow-xl w-full h-[420px] object-cover" /></Reveal>
        </div>
      </Section>

      {/* 11. EMAIL / RETENTION */}
      <Section eyebrow="Retention" title={`Klaviyo email & SMS for ${city} DTC`}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal><img src={IMG.email} alt={`Klaviyo automations for ${city}`} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" /></Reveal>
          <div>
            <p className="text-lg text-muted-foreground">Email and SMS drive 30–45% of revenue for our {city} clients — automations, campaigns and lifecycle flows built to compound LTV.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Welcome flow", "Abandoned cart", "Browse abandonment", "Post-purchase", "Winback", "VIP loyalty", "SMS campaigns", "Segmentation"].map(x => <Pill key={x}>{x}</Pill>)}
            </div>
            <Link to="/services/email-sms" className="btn btn-primary mt-8">Email & SMS <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </Section>

      {/* 12. CREATIVE STUDIO */}
      <Section eyebrow="Creative" title={`In-house creative studio serving ${city}`} alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-lg text-muted-foreground">Static, motion, UGC and video ad creative built for the scroll — batches shipped weekly for your {city} Meta and TikTok accounts.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[`UGC creator network`, `Motion graphics`, `Product photography`, `Ad script writing`, `Static ad design`, `Video editing`].map(x => (
                <div key={x} className="flex items-center gap-2 text-sm text-ink"><Sparkles className="w-4 h-4 text-primary" />{x}</div>
              ))}
            </div>
            <Link to="/services/creative" className="btn btn-primary mt-8">Creative services <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <Reveal><img src={IMG.creative} alt={`Creative studio ${city}`} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" /></Reveal>
        </div>
      </Section>

      {/* 13. ANALYTICS */}
      <Section eyebrow="Analytics" title={`Attribution & analytics for ${city} founders`}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal><img src={IMG.analytics} alt={`Analytics dashboard for ${city} ecommerce`} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" /></Reveal>
          <div>
            <p className="text-lg text-muted-foreground">Blended CAC, contribution margin, cohort LTV — dashboards designed for {city} operators making real budget decisions, not platform-only ROAS.</p>
            <ul className="mt-6 space-y-3">
              {[`GA4 & server-side tracking`, `Triple Whale / Northbeam setup`, `Consent Mode v2`, `Meta CAPI & Google Enhanced`, `Custom Looker dashboards`].map(x => (
                <li key={x} className="flex items-center gap-3 text-ink"><BarChart3 className="w-5 h-5 text-primary" />{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 14. PROCESS */}
      <Section eyebrow="Process" title={`How we scale ${city} ecommerce brands`} intro="A repeatable 6-step system built from 120+ UK engagements." alt>
        <NumberedList items={process} />
      </Section>

      {/* 15. INDUSTRIES */}
      <Section eyebrow="Industries" title={`${city} brands we work with`} intro="Category depth compounds — here's where we've shipped the most wins.">
        <div className="flex flex-wrap gap-3">
          {industries.map(x => <Pill key={x}>{x}</Pill>)}
        </div>
      </Section>

      {/* 16. TECH STACK */}
      <Section eyebrow="Tech stack" title={`The tools we run for ${city} clients`} alt>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {tech.map((t, i) => (
            <Reveal key={t} delay={Math.min(i % 4, 3) as 0 | 1 | 2 | 3}>
              <div className="p-4 rounded-xl border border-border bg-white text-center text-sm font-semibold text-ink card-hover">
                <Layers className="w-5 h-5 text-primary mx-auto mb-2" />{t}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 17. TESTIMONIALS */}
      <Section eyebrow="Loved by founders" title={`What ${city} clients say`}>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <div className="card-surface card-hover p-6 h-full flex flex-col">
                <div className="flex gap-1 mb-3">{Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="w-4 h-4 fill-primary text-primary" />)}</div>
                <p className="text-ink flex-1">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div><div className="font-semibold text-ink text-sm">{t.name}</div><div className="text-xs text-muted-foreground">{t.role}</div></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 18. CASE STUDY TEASER */}
      <Section eyebrow="Case study" title={`A ${city} brand doing 7 figures on Shopify`} alt>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <img src={IMG.strategy} alt={`Case study ${city}`} className="w-full h-[420px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-widest">{city} · Fashion DTC</div>
              <h3 className="mt-3 text-2xl md:text-4xl font-bold max-w-2xl">From £42k → £310k monthly revenue in 9 months</h3>
              <div className="mt-6 flex flex-wrap gap-6 text-sm">
                <div><div className="text-2xl font-bold"><CountUp end={638} suffix="%" /></div><div className="opacity-80">Revenue growth</div></div>
                <div><div className="text-2xl font-bold"><CountUp end={4.2} decimals={1} suffix="×" /></div><div className="opacity-80">Blended ROAS</div></div>
                <div><div className="text-2xl font-bold"><CountUp end={52} suffix="%" /></div><div className="opacity-80">Email revenue</div></div>
              </div>
              <Link to="/case-studies" className="btn btn-primary mt-6 inline-flex">Read case studies <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 19. PRICING TEASER */}
      <Section eyebrow="Pricing" title={`Transparent ecommerce agency pricing in ${city}`}>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { name: "Launch", price: "£2,500", desc: `Single-channel focus for smaller ${city} brands.`, features: ["1 growth channel", "Weekly reporting", "Creative refresh", "Slack support"] },
            { name: "Scale", price: "£5,500", desc: `Multi-channel engine for growing ${city} DTC brands.`, features: ["3 channels", "CRO sprints", "Email + SMS", "Bi-weekly strategy"], featured: true },
            { name: "Growth Engine", price: "£10k+", desc: `Full-stack team for 7-figure ${city} operators.`, features: ["All channels", "Dedicated pod", "Creative studio", "Weekly leadership call"] },
          ].map((p) => (
            <Reveal key={p.name}>
              <div className={`card-surface card-hover p-8 h-full flex flex-col ${p.featured ? "ring-2 ring-primary" : ""}`}>
                {p.featured && <div className="inline-flex items-center gap-1 text-xs font-bold text-primary mb-2"><Sparkles className="w-3.5 h-3.5" /> MOST POPULAR</div>}
                <h3 className="text-xl font-bold text-ink">{p.name}</h3>
                <div className="mt-3 text-3xl font-bold text-gradient">{p.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-5 space-y-2 flex-1">
                  {p.features.map(f => <li key={f} className="flex gap-2 text-sm text-ink"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />{f}</li>)}
                </ul>
                <Link to="/pricing" className="btn btn-primary mt-6">Get started <ArrowRight className="w-4 h-4" /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 20. LOCAL FAQS */}
      <FaqSection faqs={faqs} title={`FAQs about our ${city} ecommerce`} highlight="agency" intro={`Common questions from ${city} and ${loc.region} founders.`} />

      {/* 21. CONTACT / QUICK FORM */}
      <Section eyebrow="Talk to us" title={`Book your free ${city} strategy call`} alt>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <img src={IMG.meeting} alt={`Strategy call with ${city} ecommerce team`} className="rounded-3xl shadow-xl w-full h-[380px] object-cover" />
          </Reveal>
          <div className="space-y-4">
            {[
              { icon: Calendar, t: "45-minute strategy call", b: `Live audit of your ${city} store, ads and funnel.` },
              { icon: Clock, t: "No sales pitch", b: "Actionable ideas even if we never work together." },
              { icon: Phone, t: "Direct with senior operators", b: "You'll speak with the people who'd run the account." },
            ].map((x, i) => (
              <Reveal key={i} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                <div className="flex gap-4 p-5 card-surface card-hover">
                  <x.icon className="w-6 h-6 text-primary shrink-0" />
                  <div><h4 className="font-semibold text-ink">{x.t}</h4><p className="text-sm text-muted-foreground mt-1">{x.b}</p></div>
                </div>
              </Reveal>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/contact" className="btn btn-primary btn-shimmer hover-scale">Book strategy call <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/audit" className="btn btn-ghost border border-border hover-scale">Free audit</Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 22. FINAL CTA */}
      <CTA
        heading={`Grow your ${city} ecommerce brand — starting this week`}
        sub={`Join 120+ UK DTC brands scaling with Being Ecom. Free ${city} audit, no commitment.`}
      />
    </PageLayout>
  );
}
