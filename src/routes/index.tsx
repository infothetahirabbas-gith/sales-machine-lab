import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Megaphone, MousePointerClick, Search, Rocket, ClipboardCheck, Wrench, ShoppingCart, TrendingUp, Mail, Palette, Magnet, BarChart3, Sparkles } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, Card, CTA, NumberedList } from "../components/site/Section";



import { homeFaqs } from "../lib/home-faqs";
import { faqJsonLd, professionalServiceJsonLd } from "../lib/seo";
import { HERO_STATS } from "../lib/stats";
import { Reveal } from "../hooks/useReveal";
import { SafeImg } from "../components/SafeImg";
import { HERO_PHONE, HOME_BENTO, CASE_STUDY_IMG, FOUNDER_PHOTOS } from "../lib/home-images";
import caseStudyGrowth from "../assets/case-study-growth-v2.jpg.asset.json";

// WebP variants generated at build time by vite-imagetools - ~60-70% smaller than the JPGs.
// Displayed at max ~578 CSS px on mobile, ~480 CSS px on desktop.
// Capped at 800w (retina-safe for 400px CSS) with tighter quality to cut hero payload ~30%.
import heroShopifyCommerce from "../assets/hero-shopify-commerce.jpg?format=webp&quality=60&w=800";
import heroWoocommerceStore from "../assets/hero-woocommerce-store.jpg?format=webp&quality=60&w=800";
import heroSeoGrowth from "../assets/hero-seo-growth.jpg?format=webp&quality=60&w=800";
import heroPaidAds from "../assets/hero-paid-ads.jpg?format=webp&quality=60&w=800";
import heroCroTesting from "../assets/hero-cro-testing.jpg?format=webp&quality=60&w=800";
import heroShopifyCommerceSm from "../assets/hero-shopify-commerce.jpg?format=webp&quality=55&w=480";
import heroShopifyCommerceMd from "../assets/hero-shopify-commerce.jpg?format=webp&quality=58&w=640";



// Below-the-fold - never in the critical bundle.
const BeforeAfter = lazy(() => import("../components/site/BeforeAfter"));
const RevenueLossCalculator = lazy(() => import("../components/site/RevenueLossCalculator"));
const GrowthPathPlanner = lazy(() => import("../components/site/GrowthPathPlanner"));
const ContactFaq = lazy(() => import("../components/site/ContactFaq"));
const FaqSection = lazy(() => import("../components/site/FaqSection"));
const GrowthChart = lazy(() => import("../components/site/GrowthChart"));
const FeaturedStoresSection = lazy(() =>
  import("../components/site/CaseStudyExtras").then((module) => ({
    default: module.FeaturedStoresSection,
  })),
);

function WhenVisible({ children, minHeight = 360 }: { children: ReactNode; minHeight?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px 0px", threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} style={!visible ? { minHeight } : undefined}>
      {visible ? children : null}
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Ecommerce Marketing Agency UK | Shopify & WooCommerce Growth | BeingEcom" },
      { name: "description", content: "BeingEcom is an Ecommerce Marketing Agency UK helping Shopify and WooCommerce brands grow with SEO, paid ads, CRO, email marketing and AI-powered ecommerce strategies." },
      { property: "og:title", content: "Ecommerce Marketing Agency UK | Shopify & WooCommerce Growth | BeingEcom" },
      { property: "og:description", content: "BeingEcom is an Ecommerce Marketing Agency UK helping Shopify and WooCommerce brands grow with SEO, paid ads, CRO, email marketing and AI-powered ecommerce strategies." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://beingecom.com/" },
      { property: "og:image", content: "https://beingecom.com/og-image.png" },
      { property: "og:image:alt", content: "BeingEcom - Ecommerce Marketing Agency UK for Shopify and WooCommerce brands" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://beingecom.com/og-image.png" },
      { name: "twitter:image:alt", content: "BeingEcom - Ecommerce Marketing Agency UK for Shopify and WooCommerce brands" },
    ],
    links: [
      { rel: "canonical", href: "https://beingecom.com/" },
      { rel: "preload", as: "image", href: heroShopifyCommerceSm, fetchpriority: "high", media: "(min-width: 768px)", imagesrcset: `${heroShopifyCommerceSm} 480w, ${heroShopifyCommerceMd} 640w`, imagesizes: "(min-width: 1024px) 400px, (min-width: 768px) 480px, 400px" } as never,
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
  { to: "/services/ai-automation", title: "AI Automation", body: "Agentic workflows that cut manual work and lift LTV.", Icon: Sparkles },
  { to: "/services/funnel", title: "Funnel & Landing Pages", body: "High-converting funnels for launches and offers.", Icon: Magnet },
  { to: "/services/analytics", title: "Analytics & Tracking", body: "GA4, Pixel, CAPI and dashboards - set up correctly.", Icon: BarChart3 },
  { to: "/services/scaling", title: "Scaling & Retention", body: "Systems to scale from 6 to 7 figures and keep customers.", Icon: Rocket },
];

const rotatingPhrases = [
  "UK Ecommerce Brands",
  "Shopify Stores in the UK",
  "WooCommerce Stores in the UK",
  "Ecommerce Stores in the UK",
];


// Vite hashes bundled asset filenames, so no query-string cache-buster is
// needed - appending `?v=` actually defeats immutable long-term caching.
const dashboards = [
  { key: "shopify", title: "Shopify · Store Growth", badge: "+312%", img: heroShopifyCommerce, imgMd: heroShopifyCommerceMd, imgSm: heroShopifyCommerceSm, alt: "Shopify ecommerce store operations with products, orders, and revenue growth dashboard", focal: "center 35%", metrics: [{l:"Sessions",v:"284K"},{l:"CR",v:"4.8%"},{l:"AOV",v:"£72"}] },
  { key: "woocommerce", title: "WooCommerce · Orders", badge: "+264%", img: heroWoocommerceStore, imgMd: heroWoocommerceStore, imgSm: heroWoocommerceStore, alt: "WooCommerce online store management with product catalog, orders, and revenue dashboard", focal: "center 40%", metrics: [{l:"Orders",v:"12.4K"},{l:"CR",v:"4.2%"},{l:"AOV",v:"£68"}] },
  { key: "seo", title: "SEO · Organic Traffic", badge: "+218%", img: heroSeoGrowth, imgMd: heroSeoGrowth, imgSm: heroSeoGrowth, alt: "SEO growth strategy workspace with organic traffic, keyword, and ranking analytics", focal: "center 45%", metrics: [{l:"Keywords",v:"1,840"},{l:"Top 3",v:"126"},{l:"Clicks",v:"96K"}] },
  { key: "ads", title: "Paid Ads · Meta + Google", badge: "3.8× ROAS", img: heroPaidAds, imgMd: heroPaidAds, imgSm: heroPaidAds, alt: "Paid advertising campaign dashboard with audience targeting, creative testing, and ROAS analytics", focal: "center 40%", metrics: [{l:"Spend",v:"£48K"},{l:"Revenue",v:"£182K"},{l:"CPA",v:"£21"}] },
  { key: "cro", title: "CRO · Checkout Uplift", badge: "+186% CR", img: heroCroTesting, imgMd: heroCroTesting, imgSm: heroCroTesting, alt: "Conversion rate optimisation A/B test with ecommerce heatmaps and checkout funnel analytics", focal: "center 40%", metrics: [{l:"CR",v:"4.8%"},{l:"AOV",v:"£84"},{l:"Bounce",v:"-32%"}] },
] as const;

function Home() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [dashIdx, setDashIdx] = useState(0);
  useEffect(() => {
    let phraseTimer: number | undefined;
    let dashTimer: number | undefined;
    const startTimer = window.setTimeout(() => {
      phraseTimer = window.setInterval(() => setPhraseIdx((i) => (i + 1) % rotatingPhrases.length), 4000);
      dashTimer = window.setInterval(() => setDashIdx((i) => (i + 1) % dashboards.length), 4500);
    }, 3000);
    return () => {
      window.clearTimeout(startTimer);
      if (phraseTimer !== undefined) window.clearInterval(phraseTimer);
      if (dashTimer !== undefined) window.clearInterval(dashTimer);
    };
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
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Authority strip - 5-star trust + top-line proof, above H1 */}
            <div className="mb-4 flex flex-col items-center lg:items-start gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 shadow-sm">
                <span aria-hidden="true" className="tracking-tight text-amber-500">★★★★★</span>
                <span>Trusted by UK Ecommerce Brands</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <span className="text-ink">500+ Growth Campaigns</span>
                <span className="text-primary/40">·</span>
                <span className="text-ink">Avg ROAS 4.1×</span>
                <span className="text-primary/40">·</span>
                <span className="text-ink">£48M+ Tracked Revenue</span>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="relative w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
              Ecommerce Marketing Agency · UK-based Growth Team
            </div>
            <h1 className="hero-headline mt-5 font-black tracking-tight">
              <span className="hero-mobile text-primary">Ecommerce Growth</span>
              <span className="hero-mobile text-primary">Marketing Agency UK</span>
              <span className="hero-mobile text-ink mt-1">Driving More Traffic,</span>
              <span className="hero-mobile text-ink">Sales &amp; Revenue for</span>
              <span className="hero-mobile text-primary">Shopify &amp; WooCommerce Brands</span>
              <span className="hero-desktop text-primary">Ecommerce Growth</span>
              <span className="hero-desktop text-primary">Marketing Agency UK</span>
              <span className="hero-desktop text-ink mt-1">Driving More Traffic,</span>
              <span className="hero-desktop text-ink">Sales &amp; Revenue for</span>
              <span className="hero-desktop text-primary">Shopify &amp; WooCommerce Brands</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              BeingEcom runs SEO, paid media, CRO, Klaviyo and analytics for UK Shopify and WooCommerce stores as one team on one revenue P&amp;L. Senior operators only, weekly Loom reporting against contribution margin, and a 90-day fixed engagement before anything rolls month-to-month.
            </p>
            <div className="mt-8 btn-pair justify-center lg:justify-start">

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
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0">
              {HERO_STATS.map((s) => (
                <div key={s.l}>
                  <div className="text-2xl md:text-3xl font-bold text-sky-gradient tabular-nums">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            {/* Real ecommerce photo behind the animated dashboard for warmth + realism */}
            <div className="absolute -top-6 -right-4 lg:-right-8 w-40 h-52 md:w-52 md:h-64 rotate-6 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/40 hidden md:block">
              <SafeImg
                src={HERO_PHONE}
                alt="Shopify product page shown on a phone during a UK ecommerce growth sprint"
                width={520}
                height={640}
                loading="lazy"
                fetchPriority="low"
                skeleton
                brandOverlay
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full"
              />
            </div>
            {/* Floating premium metric chips - desktop only, decorative */}
            <div aria-hidden="true" className="pointer-events-none hidden lg:block absolute -left-8 top-8 z-20 rounded-2xl border border-border bg-white/95 backdrop-blur px-4 py-3 shadow-[0_20px_50px_-20px_oklch(0.65_0.18_245/0.45)] float-slow">
              <div className="flex items-center gap-2">
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold">↑</span>
                <div>
                  <div className="text-lg font-bold text-ink tabular-nums leading-none">+312%</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Revenue Growth</div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="pointer-events-none hidden lg:block absolute -left-4 -bottom-6 z-20 rounded-2xl border border-border bg-white/95 backdrop-blur px-4 py-3 shadow-[0_20px_50px_-20px_oklch(0.65_0.18_245/0.45)] float">
              <div className="flex items-center gap-2">
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">£</span>
                <div>
                  <div className="text-lg font-bold text-ink tabular-nums leading-none">£18M+</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Revenue Generated</div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="pointer-events-none hidden lg:block absolute -right-4 bottom-16 z-20 rounded-2xl border border-border bg-white/95 backdrop-blur px-4 py-3 shadow-[0_20px_50px_-20px_oklch(0.65_0.18_245/0.45)] float-slow">
              <div className="flex items-center gap-2">
                <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold">↓</span>
                <div>
                  <div className="text-lg font-bold text-ink tabular-nums leading-none">−48%</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">CPA Reduced</div>
                </div>
              </div>
            </div>
            <div className="relative card-surface card-tilt p-5 shadow-[0_40px_80px_-30px_oklch(0.65_0.18_245/0.4)]">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-2">
                  <span className="relative w-2 h-2 rounded-full bg-primary pulse-dot" />
                  <span key={`t-${dash.key}`}>{dash.title}</span>
                </div>
                <span key={`b-${dash.key}`} className="text-foreground font-bold">{dash.badge}</span>
              </div>
              <div key={dash.key} className="relative rounded-xl overflow-hidden ring-1 ring-border bg-black/40">

                <img
                  src={dash.imgSm}
                  srcSet={dash.imgSm !== dash.img ? `${dash.imgSm} 480w, ${dash.imgMd} 640w` : undefined}
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 480px, 400px"
                  alt={dash.alt}
                  width={900}
                  height={560}
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                  style={{ objectPosition: dash.focal }}
                  className="block w-full h-56 md:h-64 object-cover"
                />
                {/* Dark contrast gradient for readable badges */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
                {/* Brand tint */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-accent/20 mix-blend-overlay" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/15" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                  {dash.key}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {dash.metrics.map((m)=>(
                  <div key={`${dash.key}-${m.l}`} className="rounded-xl bg-secondary p-3 transition hover:bg-accent/10 hover:-translate-y-0.5">
                    <div className="text-xs text-muted-foreground">{m.l}</div>
                    <div className="font-bold text-ink">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* 2. TRUST BAR - running marquee with brand logos in original colors */}
      <section className="border-y border-border bg-card/30 py-8 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex flex-col items-center gap-5">
          <div className="text-xs uppercase tracking-widest text-muted-foreground text-center">
            Tools & platforms we work with daily
          </div>
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="marquee-track marquee-fast whitespace-nowrap">
              {Array.from({ length: 2 }).flatMap((_, k) =>
                ([
                  { name: "Shopify",       slug: "shopify",           color: "#95BF47" },
                  { name: "WooCommerce",   slug: "woocommerce",       color: "#7F54B3" },
                  { name: "Meta Ads",      slug: "meta",              color: "#0866FF" },
                  { name: "Google Ads",    slug: "googleads",         color: "#4285F4" },
                  { name: "Klaviyo",       slug: null,                color: "#232323" },
                  { name: "GA4",           slug: "googleanalytics",   color: "#E37400" },
                  { name: "TikTok Ads",    slug: "tiktok",            color: "#000000" },
                  { name: "Triple Whale",  slug: null,                color: "#7C3AED" },
                  { name: "Recharge",      slug: null,                color: "#0F62FE" },
                  { name: "Yotpo",         slug: null,                color: "#3B47D1" },
                  { name: "Hotjar",        slug: "hotjar",            color: "#FD3A5C" },
                  { name: "Shogun",        slug: null,                color: "#722ED1" },
                ]).map((b, i) => (
                  <span key={`${k}-${i}`} className="inline-flex items-center gap-3 mx-6 align-middle group">
                    <span
                      aria-hidden="true"
                      className="inline-block h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                      style={{ backgroundColor: b.color }}
                    />
                    <span
                      className="text-base font-bold tracking-tight transition-colors"
                      style={{ color: b.color }}
                    >
                      {b.name}
                    </span>
                    <span className="text-primary/30 ml-3">•</span>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>



      {/* 3. PROBLEM */}

      <Section className="section-band--alt" center eyebrow="Why most stores fail" title="Traffic isn't your problem. Conversion is." intro="Most founders don't need more paid ads - they need to fix the leaks in their funnel before scaling spend.">
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
      <WhenVisible minHeight={400}>
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <RevenueLossCalculator />
        </Suspense>
      </WhenVisible>

      {/* 4. SOLUTION - 4 PILLARS */}
      <Section
        className="section-band--cool"
        center
        eyebrow="The system"
        title={<>The 4 pillars that fix what's <span className="text-sky-gradient">stopping your store from selling</span></>}
        intro="One integrated ecommerce growth team &mdash; Shopify and WooCommerce specialists working from a single plan. No more disconnected agencies blaming each other."
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            { t: "Traffic", b: "Profitable paid ads across Meta, Google & TikTok - managed by a paid ads agency UK that knows ecommerce.", Icon: Megaphone },
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
      <WhenVisible minHeight={300}>
        <Suspense fallback={<div className="min-h-[300px]" />}>
          <GrowthPathPlanner />
        </Suspense>
      </WhenVisible>

      {/* 5. SERVICES PREVIEW GRID */}
      <Section
        className="section-band--warm"
        center
        eyebrow="Ecommerce SEO · Shopify · WooCommerce · Paid Ads · CRO · Automation"
        title="One senior team. Nine growth services. Every operator owns your P&L."
        intro="We are your Ecommerce Marketing Agency UK under one roof: SEO that compounds, Shopify and WooCommerce builds that convert, Meta and Google Ads managed for profit, CRO that lifts revenue per session, and AI automation that removes the busywork. No hand-offs, no vanity metrics, just one accountable team moving your numbers every week."
      >
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-4 justify-items-stretch mx-auto">
          {services.map((s, i) => (
            <Link key={s.to} to={s.to} className={`w-full ${i === services.length - 1 && services.length % 2 === 1 ? "col-span-2 lg:col-span-1 max-w-full lg:max-w-none" : ""}`}>
              <Card className="p-3 md:p-6 h-full flex flex-col">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto md:mx-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 shrink-0"><s.Icon className="w-4 h-4 md:w-6 md:h-6" strokeWidth={2.2} /></div>
                <h3 className="mt-2 md:mt-3 font-semibold text-[13px] leading-snug md:text-lg md:leading-tight text-center md:text-left break-words hyphens-none">{s.title}</h3>
                <p className="text-[11px] leading-snug md:text-sm md:leading-normal text-muted-foreground mt-1 text-center md:text-left break-words hyphens-none">{s.body}</p>
                <div className="mt-3 md:mt-4 text-[11px] md:text-sm font-semibold text-primary text-center md:text-left">Explore →</div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center text-sm">
          <Link to="/services" className="font-semibold text-primary hover:underline">See all 9 services →</Link>
          <span className="mx-2 text-muted-foreground">·</span>
          <Link to="/services/paid-ads" className="font-semibold text-primary hover:underline">Ecommerce paid ads →</Link>
        </div>

        {/* Money-page internal linking block with exact-match anchors */}
        <div className="mt-10 rounded-2xl border border-border bg-card/40 p-5 md:p-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
            Explore our specialist pages
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm md:text-base">
            <Link to="/services/seo" className="font-semibold text-ink hover:text-primary hover:underline">Ecommerce SEO</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/services/paid-ads" className="font-semibold text-ink hover:text-primary hover:underline">Ecommerce Paid Ads Agency</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/services/store-development/shopify" className="font-semibold text-ink hover:text-primary hover:underline">Shopify Marketing Agency UK</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/services/store-development/woocommerce" className="font-semibold text-ink hover:text-primary hover:underline">WooCommerce Marketing Agency UK</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/services/cro" className="font-semibold text-ink hover:text-primary hover:underline">Ecommerce CRO Agency UK</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/pricing" className="font-semibold text-ink hover:text-primary hover:underline">View Growth Plans</Link>
          </div>
        </div>

        {/* Topical hubs & comparison guides - strengthens crawl paths to /hub and /compare clusters */}
        <div className="mt-6 rounded-2xl border border-border bg-card/40 p-5 md:p-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 text-center">
            Deep dives & buyer guides
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm md:text-base">
            <Link to="/hub/ecommerce-strategy" className="font-semibold text-ink hover:text-primary hover:underline">Ecommerce Strategy Hub</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/hub/shopify-growth" className="font-semibold text-ink hover:text-primary hover:underline">Shopify Growth Playbook</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/hub/customer-retention" className="font-semibold text-ink hover:text-primary hover:underline">Customer Retention Guide</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/compare/seo-vs-paid-ads" className="font-semibold text-ink hover:text-primary hover:underline">SEO vs Paid Ads</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/compare/shopify-plus-vs-bigcommerce" className="font-semibold text-ink hover:text-primary hover:underline">Shopify Plus vs BigCommerce</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/compare/klaviyo-vs-mailchimp" className="font-semibold text-ink hover:text-primary hover:underline">Klaviyo vs Mailchimp</Link>
            <span className="text-muted-foreground">·</span>
            <Link to="/compare" className="font-semibold text-ink hover:text-primary hover:underline">All comparison guides →</Link>
          </div>
        </div>
      </Section>

      {/* 6. BEFORE / AFTER - interactive slider */}
      <Section
        className="section-band--slate"
        center
        eyebrow="Before vs After"
        title={<>What a <span className="text-sky-gradient">real store transformation</span> looks like</>}
        intro="Drag the slider. Same store, same product, same audience - different system. This is what conversion rate optimisation looks like when it's wired into a Shopify build."
      >
        <Reveal>
          <WhenVisible minHeight={300}>
            <Suspense fallback={<div className="min-h-[300px]" />}>
              <BeforeAfter />
            </Suspense>
          </WhenVisible>
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
      <Section className="section-band--mint" center eyebrow="Real result" title="From £18K to £214K/month in 6 months.">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-2xl border border-border bg-card/60 p-3 overflow-hidden">
            <img
              src={caseStudyGrowth.url}
              alt="UK Shopify apparel brand case study - dashboard showing revenue growth from £18K to £214K with 11.9× revenue, 3.8× ROAS and +285% conversion rate uplift"
              width={1280}
              height={960}
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-xl"
            />
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
            <p className="mt-4 text-xs text-muted-foreground italic">
              Methodology: results based on client-reported Shopify and GA4 data over a 6-month engagement (months 1-6 post-onboarding). Individual results vary by category, margin and starting baseline. Client name withheld under NDA - anonymised case study available on request.
            </p>
            <Link to="/case-studies" className="inline-block mt-6 text-foreground font-semibold underline-offset-4 hover:text-brand hover:underline">
              See full case studies →
            </Link>

          </div>
        </div>
      </Section>

      {/* 7b. FEATURED CASE STUDIES - direct links to distribute equity to case-study pages */}
      <Section
        eyebrow="More client wins"
        title={<>Featured <span className="text-sky-gradient">case studies</span></>}
        intro="Six recent Shopify and WooCommerce engagements across apparel, beauty, supplements, home, coffee and pet supplies. Each links straight to the full teardown."
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: "a1",  brand: "UK Shopify apparel brand",   category: "Ads", metric: "11.9×", label: "Revenue",       blurb: "Rebuilt PDP + Meta funnel to lift revenue 11.9× in 6 months." },
            { id: "s1",  brand: "UK skincare brand",          category: "SEO", metric: "84K",   label: "Visits/mo",     blurb: "From zero organic to 84K monthly visits with a full content engine." },
            { id: "a4",  brand: "UK beauty DTC brand",        category: "Ads", metric: "4.1×",  label: "TikTok ROAS",   blurb: "Creator-led TikTok Spark Ads hit 4.1× ROAS in 60 days." },
            { id: "a7",  brand: "UK supplements brand",       category: "Ads", metric: "£180k", label: "MRR",           blurb: "Scaled £25k → £180k/mo by fixing the offer, not the creative." },
            { id: "a10", brand: "UK coffee subscription",     category: "Ads", metric: "3.9×",  label: "LTV",           blurb: "Subscription-only funnel tripled LTV and dropped CAC 22%." },
            { id: "a5",  brand: "UK pet supplies brand",      category: "Ads", metric: "£94k",  label: "PMax MRR",      blurb: "Fixed the feed first, then PMax scaled to £94k/mo." },
          ].map((c) => (
            <Link
              key={c.id}
              to="/case-studies/$id"
              params={{ id: c.id }}
              className="card-surface card-hover p-5 flex flex-col group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{c.category}</span>
                <div className="text-right">
                  <div className="text-xl font-bold text-foreground tabular-nums">{c.metric}</div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{c.label}</div>
                </div>
              </div>
              <div className="mt-3 text-sm font-semibold text-foreground">{c.brand}</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed flex-1">{c.blurb}</p>
              <span className="mt-4 text-sm font-semibold text-primary group-hover:underline">Read the case study →</span>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/case-studies" className="btn btn-outline">Browse all case studies →</Link>
        </div>
      </Section>


      {/* 8. HOW IT WORKS */}
      <Section
        className="section-band--lavender"
        center
        eyebrow="The process"
        title={<>3 steps to a store that <span className="text-sky-gradient">prints revenue</span></>}
        intro="The same 3-step system we run for every Shopify and WooCommerce brand we onboard."

      >
        <div className="relative grid md:grid-cols-3 gap-4">
          {/* connector line */}
          <div className="hidden md:block absolute top-[68px] left-[16%] right-[16%] h-px bg-primary/20" />
          {[
            { step: "Step 1", title: "Audit", body: "We tear down funnel, ads, analytics & product pages - find every leak in your ecommerce funnel optimisation.", Icon: ClipboardCheck },
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

      {/* 9. TOOLS - grouped by job-to-be-done */}
      <Section
        className="section-band--alt"
        center
        eyebrow="Stack"
        title="The tools we run on every store."
        intro="One integrated stack - platform, paid media, analytics, retention and automation wired together so revenue, spend and LTV live in the same view."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              group: "Ecommerce platforms",
              body: "We build, theme, and optimise directly inside your store - fast PDPs, clean checkout, headless when it earns its keep.",
              tools: [
                { name: "Shopify", color: "#95BF47", initial: "S" },
                { name: "WooCommerce", color: "#7F54B3", initial: "W" },
                { name: "Shogun", color: "#1F2937", initial: "Sh" },
              ],
            },
            {
              group: "Paid media & tracking",
              body: "Full-funnel ad buying across Meta, Google, and TikTok - with server-side events and GA4 so every click is attributed.",
              tools: [
                { name: "Meta Ads", color: "#1877F2", initial: "M" },
                { name: "Google Ads", color: "#4285F4", initial: "G" },
                { name: "TikTok Ads", color: "#000000", initial: "T" },
                { name: "GA4", color: "#F9AB00", initial: "GA" },
              ],
            },
            {
              group: "CRO & behaviour analytics",
              body: "Heatmaps, session replays, and structured A/B tests turn traffic into conversion rate you can actually forecast.",
              tools: [
                { name: "Hotjar", color: "#FD3A5C", initial: "H" },
                { name: "Triple Whale", color: "#0B0B0B", initial: "TW" },
              ],
            },
            {
              group: "Email, SMS & retention",
              body: "Klaviyo flows, subscription revenue, and reviews stack into 25-35% of monthly revenue - on autopilot.",
              tools: [
                { name: "Klaviyo", color: "#1E1E1E", initial: "K" },
                { name: "Recharge", color: "#3D1D72", initial: "R" },
                { name: "Yotpo", color: "#0042E4", initial: "Y" },
              ],
            },
          ].map((cat, i) => (
            <Reveal key={cat.group} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Card className="h-full text-left">
                <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-primary">
                  {cat.group}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{cat.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2" role="list">
                  {cat.tools.map((t) => (
                    <li key={t.name}>
                      <div className="group inline-flex items-center gap-2 rounded-full border border-border bg-white pl-1 pr-3 py-1 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_10px_24px_-14px_oklch(0.65_0.18_245/0.5)]">
                        <span
                          aria-hidden="true"
                          className="inline-flex w-6 h-6 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm ring-1 ring-black/5"
                          style={{ backgroundColor: t.color }}
                        >
                          {t.initial}
                        </span>
                        <span>{t.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 9.5 WHY UK BRANDS CHOOSE BEINGECOM */}
      <Section
        className="section-band--cool"
        center
        eyebrow="Why UK brands choose BeingEcom"
        title={<>The <span className="text-sky-gradient">Ecommerce Marketing Agency UK</span> founders actually recommend</>}
        intro="Senior operators, transparent reporting and one integrated growth system - not siloed retainers. Here's what UK Shopify and WooCommerce brands hire us for."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: "Ecommerce specialists, not generalists", b: "Every strategist, media buyer and CRO lead has scaled Shopify or WooCommerce stores. No B2B side-quests, no learning curve on your budget.", kpi: "120+ stores scaled" },
            { t: "One team, one revenue P&L", b: "Ecommerce SEO, Google Ads, Meta Ads, CRO, Klaviyo and analytics report to a single lead - so channels compound instead of competing.", kpi: "1 revenue owner" },
            { t: "UK-native, globally scalable", b: "Built for UK compliance, VAT, GBP margins and consumer behaviour, with international SEO and Shopify Markets when you're ready to expand.", kpi: "UK + 14 markets" },
            { t: "Transparent reporting", b: "Live dashboards across GA4, Meta Ads, Google Ads and Klaviyo - plus a weekly Loom and monthly strategy call. No black boxes.", kpi: "Weekly Loom + live dashboards" },
            { t: "Senior team on every account", b: "You work directly with the people running your account - no junior handovers, no rotating account managers. Founder-led by Tahir Abbas with 10+ years operating DTC brands; team-wide average is 7+ years per operator.", kpi: "10+ yrs founder-led / 7+ yrs avg operator" },
            { t: "Month-to-month after 90 days", b: "One focused 90-day sprint to build the system, then flexible month-to-month. We stay because the numbers earn it.", kpi: "94% retain past 90 days" },
          ].map((p, i) => (
            <Reveal key={p.t} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
              <Card className="h-full">
                <h3 className="font-semibold text-lg text-ink">{p.t}</h3>
                <p className="text-sm text-muted-foreground mt-2">{p.b}</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                  <span aria-hidden="true">✓</span>{p.kpi}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 9.6 INDUSTRIES WE SERVE */}
      <Section
        className="section-band--warm"
        center
        eyebrow="Industries we serve"
        title="Ecommerce marketing built around your category."
        intro="As a category-fluent ecommerce digital agency, we've scaled Shopify and WooCommerce brands across the verticals British consumers spend on most. Each niche gets its own SEO map, creative playbook and retention model."

      >
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {[
            { slug: "fashion-apparel", label: "Fashion & Apparel" },
            { slug: "beauty-cosmetics", label: "Beauty & Cosmetics" },
            { slug: "health-wellness", label: "Health & Wellness" },
            { slug: "home-garden", label: "Home & Garden" },
            { slug: "food-beverage", label: "Food & Beverage" },
            { slug: "electronics", label: "Electronics" },
            { slug: "jewelry-accessories", label: "Jewellery & Accessories" },
            { slug: "supplements", label: "Supplements" },
          ].map((v) => (
            <Link
              key={v.slug}
              to="/industries/$slug"
              params={{ slug: v.slug }}
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
            >
              {v.label} →
            </Link>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't see your niche? <Link to="/contact" className="text-primary font-semibold hover:underline">Talk to our ecommerce experts UK</Link>.
        </p>
      </Section>

      {/* 9b. FEATURED STORES - one-line marquee of live store showcases */}
      <WhenVisible minHeight={520}>
        <Suspense fallback={<div className="min-h-[520px]" />}>
          <FeaturedStoresSection />
        </Suspense>
      </WhenVisible>

      {/* 10. TESTIMONIALS - visual marquee (duplicate track is aria-hidden so
          screen readers and crawlers only see each quote once). */}
      <Section className="section-band--slate" center eyebrow="What store owners say" title="Operators. Not influencers." intro="Real quotes from British founders who hired us for Shopify builds, WooCommerce migrations and paid-media scaling.">
        <div className="relative overflow-hidden">
          <ul role="list" className="marquee-track" style={{ animationDuration: "44s" }}>
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
                const isClone = k > 0;
                return (
                  <li
                    key={`${k}-${i}`}
                    className="w-[320px] md:w-[360px] shrink-0 list-none"
                    aria-hidden={isClone ? "true" : undefined}
                    {...(isClone ? { "data-nosnippet": "true" } : {})}
                    {...(isClone ? { inert: true } : {})}
                  >
                    <figure className="card-surface card-hover p-6 h-full mx-2">
                      <div className="text-primary text-3xl font-display leading-none" aria-hidden="true">“</div>
                      <blockquote className="text-sm text-ink mt-2 min-h-[88px]">{t.q}</blockquote>
                      <figcaption className="mt-5 flex items-center gap-3">
                        <SafeImg
                          src={photo}
                          alt=""
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
                      </figcaption>
                    </figure>
                  </li>
                );
              })
            )}
          </ul>
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
                A senior team reviews your store, ads and analytics, then sends back a 12-point loss-recovery plan covering CRO fixes, SEO gaps, wasted PPC spend and automation opportunities. No pitch deck.
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
      <WhenVisible minHeight={400}>
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <ContactFaq />
        </Suspense>
      </WhenVisible>

      {/* 13. FINAL CTA */}
      <CTA
        heading={
          <>
            <span className="block text-ink">Ready to scale your store?</span>
            <span className="block text-primary mt-1 md:mt-2">Let's build your revenue engine.</span>
          </>
        }
        sub="Book a free strategy call with our senior Shopify and WooCommerce team. We'll show you exactly how to scale revenue across paid, SEO, CRO and email."
      />

      {/* 14. HOMEPAGE FAQ - AI Overview & LLM optimised */}
      <WhenVisible minHeight={400}>
        <Suspense fallback={<div className="min-h-[400px]" />}>
          <FaqSection
            faqs={homeFaqs}
            eyebrow="Frequently asked"
            title="Ecommerce marketing questions,"
            highlight="answered"
            intro="Everything UK Shopify & WooCommerce founders ask before hiring an ecommerce marketing agency - SEO, paid ads, CRO, Klaviyo email and analytics."
          />
        </Suspense>
      </WhenVisible>
    </PageLayout>
  );
}
