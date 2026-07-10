import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Calendar, User, ArrowRight, Award, Briefcase, Rocket, Target, Sparkles, GraduationCap, TrendingUp, Users, Globe, Zap, BookOpen, Quote, Mail, Linkedin, Twitter, Facebook, Instagram, Youtube, CheckCircle2 } from "lucide-react";
import PageLayout from "@/components/site/PageLayout";
import FaqSection from "@/components/site/FaqSection";
import { CTA } from "@/components/site/Section";
import { SITE_URL, ORG_ID, TEAM, personJsonLd, organizationJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "@/lib/seo";
import founderImg from "@/assets/founder-ceo.jpg.asset.json";

const PATH = "/founder";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "Meet Tahir Abbas — Founder & CEO of BeingEcom | Ecommerce Growth Expert";
const DESC = "Tahir Abbas is the founder and CEO of BeingEcom — a UK ecommerce growth authority with 10+ years scaling Shopify and WooCommerce brands through SEO, Paid Ads, CRO and AI Automation.";
const founder = TEAM.find((m) => m.slug === "tahir-abbas")!;

const founderPerson = {
  ...personJsonLd({ ...founder, image: `${SITE_URL}${founderImg.url}` }),
  url: CANONICAL,
  mainEntityOfPage: CANONICAL,
  hasOccupation: {
    "@type": "Occupation",
    name: "Founder & CEO — Ecommerce Growth Operator",
    occupationLocation: { "@type": "Country", name: "United Kingdom" },
    skills: founder.knowsAbout.join(", "),
    estimatedSalary: undefined,
    responsibilities:
      "Sets growth strategy for Shopify and WooCommerce clients, leads senior operator pods across SEO, Paid Ads, CRO, Email and AI Automation, and signs off every 90-day plan before onboarding closes.",
  },
  alumniOf: [
    { "@type": "EducationalOrganization", name: "Independent ecommerce operator training — UK" },
  ],
  award: [
    "Scaled multiple Shopify brands past £1M ARR",
    "Built BeingEcom's proprietary 13-phase ecommerce growth methodology",
    "Ran an 8-figure DTC paid media P&L across four brands",
  ],
  knowsLanguage: ["en", "en-GB", "ur"],
};

const faqs: FAQ[] = [
  { q: "Who is Tahir Abbas?", a: "Tahir Abbas is the founder and CEO of BeingEcom, a UK-based ecommerce growth agency for Shopify and WooCommerce brands. He has more than a decade of operating experience across performance marketing, SEO, CRO, email and AI automation." },
  { q: "What industries does Tahir Abbas specialise in?", a: "Direct-to-consumer ecommerce — beauty, fashion, health & wellness, home, food & beverage, jewellery, pet, sports and lifestyle brands on Shopify, Shopify Plus and WooCommerce." },
  { q: "How many years of experience does Tahir Abbas have?", a: "Over 10 years operating ecommerce brands and paid media P&Ls — starting as a DTC store operator, then growth lead, then head of performance for a DTC group, and now founder & CEO of BeingEcom." },
  { q: "What services does Tahir Abbas provide through BeingEcom?", a: "Ecommerce SEO (technical, on-page, off-page, international, AEO/GEO), Paid Advertising (Google, Meta, TikTok, YouTube), Conversion Rate Optimisation, Email & SMS Marketing, Analytics & Tracking, Store Development (Shopify + WooCommerce), and AI Automation." },
  { q: "Why was BeingEcom founded?", a: "To give ambitious Shopify and WooCommerce brands the senior growth team every founder wishes they could hire in-house — revenue-first, senior-only, ecommerce-only, and month-to-month by choice." },
  { q: "Does Tahir Abbas work with international brands?", a: "Yes. BeingEcom serves brands across the United Kingdom, United States, Ireland, Australia and the wider European market." },
  { q: "Can I book a consultation with Tahir Abbas?", a: "Yes. Qualified brands can book a 30-minute discovery call through the contact page. Tahir personally leads the strategy phase for every engagement and joins onboarding calls in the first 90 days." },
  { q: "What makes Tahir Abbas's approach different?", a: "Every plan is tied to a P&L line, measured against MER and contribution margin rather than vanity ROAS, executed by senior-only operators, and shipped on a weekly cadence with transparent reporting — wins and losses." },
  { q: "Where is Tahir Abbas based?", a: "London, United Kingdom. BeingEcom is registered at 71–75 Shelton Street, Covent Garden, London WC2H 9JQ." },
  { q: "How can I contact Tahir Abbas directly?", a: "Through info@beingecom.com, via the contact page, or on LinkedIn — links are provided in the 'Connect with the founder' section of this page." },
];

const jsonLd = [
  founderPerson,
  organizationJsonLd(),
  breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Founder", path: PATH },
  ]),
  faqJsonLd(faqs, PATH),
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${CANONICAL}#profile`,
    url: CANONICAL,
    name: TITLE,
    description: DESC,
    mainEntity: { "@id": founder.id },
    about: { "@id": founder.id },
    isPartOf: { "@id": `${SITE_URL}#website` },
    dateModified: new Date().toISOString().slice(0, 10),
  },
  {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": `${CANONICAL}#hero-image`,
    url: `${SITE_URL}${founderImg.url}`,
    contentUrl: `${SITE_URL}${founderImg.url}`,
    width: 560,
    height: 680,
    caption: "Tahir Abbas — Founder & CEO of BeingEcom",
    creditText: "BeingEcom",
    creator: { "@id": ORG_ID },
    copyrightNotice: "© BeingEcom",
    license: CANONICAL,
  },
];

export const founderAuthorityHead = () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "author", content: "Tahir Abbas" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: `${SITE_URL}${founderImg.url}` },
      { property: "profile:first_name", content: "Tahir" },
      { property: "profile:last_name", content: "Abbas" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: `${SITE_URL}${founderImg.url}` },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: jsonLd.map((obj) => ({ type: "application/ld+json", children: JSON.stringify(obj) })),
  });

export const Route = createFileRoute("/founder")({
  head: founderAuthorityHead,
  component: FounderAuthorityPage,
});

const TOC = [
  { id: "intro", label: "Introduction" },
  { id: "story", label: "My Story" },
  { id: "timeline", label: "Professional Journey" },
  { id: "expertise", label: "Areas of Expertise" },
  { id: "experience", label: "Experience by the Numbers" },
  { id: "certifications", label: "Certifications" },
  { id: "philosophy", label: "Founder Philosophy" },
  { id: "vision", label: "The BeingEcom Vision" },
  { id: "achievements", label: "Featured Achievements" },
  { id: "methodology", label: "Founder Methodology" },
  { id: "trust", label: "Trust & E-E-A-T" },
  { id: "entity", label: "Entity SEO Signals" },
  { id: "ai-overview", label: "AI Overview Summary" },
  { id: "media", label: "Speaking & Media" },
  { id: "personal", label: "Personal Insights" },
  { id: "articles", label: "Featured Articles" },
  { id: "testimonials", label: "Testimonials" },
  { id: "connect", label: "Connect" },
  { id: "faq", label: "FAQs" },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="group relative rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/30 p-5 text-center overflow-hidden hover:border-primary/50 transition-colors">
      <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
      <div className="text-3xl md:text-4xl font-bold text-ink">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">{label}</div>
    </div>
  );
}

function SectionHead({ eyebrow, title, intro }: { num?: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <header className="mb-6 md:mb-8 border-b border-border/70 pb-5">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1">
        <span className="text-[11px] font-bold uppercase tracking-widest text-primary">{eyebrow}</span>
      </div>
      <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-bold text-ink leading-[1.15] tracking-tight">{title}</h2>
      {intro && <p className="mt-3 text-muted-foreground max-w-3xl leading-relaxed">{intro}</p>}
    </header>
  );
}


function SectionBlock({ id, tint, children }: { id: string; tint?: boolean; children: ReactNode }) {
  return (
    <section
      id={id}
      className={
        tint
          ? "relative scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary/50 via-card to-card p-6 md:p-8 shadow-md"
          : "relative scroll-mt-28 overflow-hidden rounded-2xl border border-border/80 bg-background p-6 md:p-8 shadow-sm"
      }
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/45 to-transparent" />
      {children}
    </section>
  );
}

function sectionNum(id: string) {
  const index = TOC.findIndex((item) => item.id === id);
  return index >= 0 ? String(index + 1).padStart(2, "0") : undefined;
}

export default function FounderAuthorityPage() {
  const expertise = [
    { icon: TrendingUp, title: "Ecommerce SEO", body: "Programmatic SEO, entity SEO, AEO and GEO for Shopify and WooCommerce brands." },
    { icon: Zap, title: "Shopify SEO", body: "Collection architecture, metafield-driven templates, Liquid-level Core Web Vitals fixes." },
    { icon: Zap, title: "WooCommerce SEO", body: "Schema hardening, taxonomy design, WPML for international, hosting & speed audits." },
    { icon: Target, title: "Google Ads", body: "Search, Shopping, Performance Max — margin-tiered structure, MER-based bidding." },
    { icon: Target, title: "Meta Ads", body: "Creative-led testing at scale, incrementality windows, catalogue optimisation." },
    { icon: Target, title: "TikTok Ads", body: "Spark ads, creator-led funnels, VVC + CTR-based creative iteration." },
    { icon: Sparkles, title: "Conversion Rate Optimisation", body: "PDP, PLP and checkout redesigns tied to contribution margin — not micro-CRO." },
    { icon: Mail, title: "Email & SMS Marketing", body: "Klaviyo flows, retention P&L, LTV expansion via segmented lifecycle programs." },
    { icon: Rocket, title: "AI Automation", body: "Reporting, forecasting, creative production and keyword ops — auditable, never black-box." },
    { icon: Briefcase, title: "Technical SEO", body: "JS rendering, edge SEO, log-file analysis, index bloat, crawl budget and Core Web Vitals." },
    { icon: Globe, title: "Local & International SEO", body: "hreflang, market-specific PDPs, geo-targeted content clusters and link building." },
    { icon: TrendingUp, title: "Analytics & Tracking", body: "GA4, server-side tagging, MMM and Northbeam-style attribution setups." },
  ];

  const timeline = [
    { year: "2013", title: "First DTC Store", body: "Launched a Shopify store while learning paid social. Found product-market fit and unit economics the hard way." },
    { year: "2015", title: "Growth Lead — UK Shopify Brand", body: "Scaled monthly revenue 6× through a stack of ads, email and landing page systemisation." },
    { year: "2017", title: "Head of Performance — DTC Group", body: "Ran an 8-figure paid media P&L across four brands. Learned that MER, not ROAS, is the truth." },
    { year: "2019", title: "Independent Growth Partner", body: "Advised Shopify Plus brands on CRO, technical SEO and Klaviyo retention systems." },
    { year: "2021", title: "Replatforming Specialist", body: "Led Shopify ↔ WooCommerce migrations and early headless architecture for scaling brands." },
    { year: "2023", title: "AI-First Ecommerce Operator", body: "Built proprietary automations for reporting, forecasting and creative testing — before it was fashionable." },
    { year: "2024", title: "Founded BeingEcom", body: "Senior-only agency built around a single revenue-first playbook and a 13-phase growth methodology." },
    { year: "2026 →", title: "Global Expansion", body: "Growing the operator pod model across the UK, US, Ireland, Australia and Europe." },
  ];

  const stats = [
    { value: "10+", label: "Years in Ecommerce" },
    { value: "200+", label: "Brands Advised" },
    { value: "£50M+", label: "Revenue Influenced" },
    { value: "£25M+", label: "Ad Spend Managed" },
    { value: "12", label: "Industries Served" },
    { value: "4", label: "Countries Operated" },
  ];

  const certifications = [
    "Google Ads — Search, Display, Shopping, Video, Measurement",
    "Google Analytics 4 (GA4) Certified",
    "Meta Blueprint — Media Buying & Media Planning Professional",
    "Shopify Partner — Store Development & Ecosystem",
    "WooCommerce & WordPress Advanced Development",
    "HubSpot — Inbound, Content Marketing, SEO",
    "TikTok Marketing Science — Creative Strategy",
    "Klaviyo Product Certification — Flows, Segmentation, Deliverability",
    "Ahrefs & Semrush — Advanced Technical SEO",
    "OpenAI + LangChain — Applied AI for Ecommerce Automation",
  ];

  const philosophy = [
    { title: "Revenue over vanity", body: "Every experiment is tied to a P&L line. If it can't move contribution margin, it doesn't ship." },
    { title: "Senior-only execution", body: "No junior operates unsupervised on a client account. Ever." },
    { title: "AI is leverage on judgement", body: "Automation amplifies senior decisions — it never replaces them." },
    { title: "Ecommerce is a system", body: "SEO, paid, CRO and email are one machine. Optimising one in isolation is malpractice." },
    { title: "Radical transparency", body: "Losses are named as clearly as wins. Clients see raw data, not dressed-up dashboards." },
    { title: "Long-term compounding", body: "Month-to-month by choice — because good work retains itself." },
  ];

  const achievements = [
    { icon: Award, title: "8-figure DTC P&L operated", body: "Managed paid media across four brands as head of performance for a UK DTC group." },
    { icon: Rocket, title: "Multiple 7-figure Shopify launches", body: "Led go-to-market for Shopify brands crossing £1M ARR in year one." },
    { icon: Sparkles, title: "13-Phase Growth Methodology", body: "Authored BeingEcom's proprietary framework — used across every client engagement." },
    { icon: Users, title: "Senior-only operator pod model", body: "Pioneered a fractional-CMO team structure serving brands in 4 countries." },
    { icon: Zap, title: "Being Ecom Brain™ Audit", body: "Built an AI-native store audit engine scanning 17 growth phases in under 90 seconds." },
    { icon: Globe, title: "International expansion playbook", body: "Shipped hreflang + market-specific PDP systems for brands in UK, US, IE and AU." },
  ];

  const insights = [
    "Reads 40+ books a year — currently on 'The Great CEO Within' and 'Play Bigger'.",
    "Runs a strict 05:30 – 07:00 deep-work block before email, calls or Slack.",
    "Keeps a written 'lessons ledger' — every project logs one thing that worked and one that didn't.",
    "Believes in 90-day sprints tied to written outcomes, not annual plans.",
    "Advice to founders: hire senior earlier than you think you can afford — juniors compound cost, seniors compound revenue.",
    "Advice to marketers: learn the P&L first, learn the platform second. Everything downstream gets easier.",
  ];

  const testimonials = [
    { quote: "Tahir doesn't sell hours — he sells decisions. Our first 60 days moved MER from 2.1 to 3.4 without touching ad spend.", author: "Founder", role: "UK Beauty DTC brand, £3M ARR" },
    { quote: "The most senior operator we've worked with. Every call is decisions in, decisions out — no fluff, no reporting theatre.", author: "Head of Growth", role: "US Apparel brand, Shopify Plus" },
    { quote: "He rebuilt our SEO from the schema up. Organic revenue tripled in six months and it's still compounding.", author: "Managing Director", role: "IE Home & Living brand, WooCommerce" },
    { quote: "Rare combination: technical enough to fix Liquid, commercial enough to sit in a board meeting.", author: "CEO", role: "AU Wellness brand, DTC group" },
  ];

  const articles = [
    { title: "MER Over ROAS: The Only Paid Media Scorecard That Matters", body: "Why platform ROAS is a subset and how to structure reporting around Marketing Efficiency Ratio and contribution margin.", to: "/blog" },
    { title: "Programmatic SEO for Shopify — A Practical Playbook", body: "Metafield-driven templates, collection architecture and the technical guardrails to avoid index bloat.", to: "/blog" },
    { title: "The 13-Phase Ecommerce Growth Framework", body: "The internal methodology BeingEcom uses on every engagement — from diagnostic to retention P&L.", to: "/company/methodology" },
    { title: "AI Automation for Ecommerce Operators (Without the Hype)", body: "Where AI genuinely compresses time — reporting, creative ops, keyword clustering — and where it still fails." , to: "/services/ai-automation" },
    { title: "How to Read a Shopify P&L Like a CFO", body: "A ground-up guide to reading contribution margin, CAC payback and LTV without a finance background.", to: "/blog" },
    { title: "The CRO Mistakes That Cost You 6 Figures a Year", body: "PDP, PLP and checkout patterns that quietly leak revenue — and the tests that plug them.", to: "/services/cro" },
  ];

  const socials = [
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/tahirabbas" },
    { icon: Twitter, label: "X (Twitter)", href: "https://x.com/beingecom" },
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/beingecom" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/beingecom" },
    { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@beingecom" },
    { icon: Mail, label: "Email", href: "mailto:info@beingecom.com" },
  ];

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-6 pb-2">
        <ol className="mx-auto max-w-6xl px-5 lg:px-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground">Home</Link></li>
          <li><ChevronRight className="size-3" /></li>
          <li aria-current="page" className="text-foreground font-medium">Founder</li>
        </ol>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-20">
        <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />

        <div className="mx-auto max-w-6xl px-5 lg:px-8 grid md:grid-cols-[260px_1fr] lg:grid-cols-[340px_1fr] gap-8 lg:gap-16 items-center">
          <div className="relative order-2 md:order-1 mx-auto md:mx-0">
            <div className="absolute -inset-5 bg-gradient-to-tr from-primary/25 to-accent/40 blur-3xl rounded-full" />
            <div className="relative rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border border-border shadow-2xl bg-card w-56 h-64 sm:w-64 sm:h-72 md:w-60 md:h-72 lg:w-80 lg:h-96">
              <img
                src={founderImg.url}
                alt="Tahir Abbas — Founder & CEO of BeingEcom, UK ecommerce growth expert"
                width={560}
                height={680}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-3 card-surface px-4 py-3 shadow-xl rounded-2xl">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Founder &amp; CEO</div>
              <div className="font-bold text-ink">Tahir Abbas</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">London, United Kingdom</div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" /> Meet the Founder
            </div>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-ink">
              Tahir Abbas
            </h1>
            <p className="mt-3 text-xl md:text-2xl text-primary font-semibold">Founder &amp; CEO of BeingEcom</p>
            <p className="mt-5 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Helping Shopify and WooCommerce brands scale through <span className="text-ink font-semibold">SEO, Paid Advertising, CRO, AI Automation</span> and data-driven ecommerce growth — with a decade of senior operating experience across the UK, US, Ireland and Australia.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><User className="size-3.5" /> Written by Tahir Abbas</span>
              <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" /> Updated {new Date().toISOString().slice(0, 10)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="size-3.5" /> 14 min read</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="btn btn-primary btn-shimmer">Book a Strategy Call <ArrowRight className="size-4" /></Link>
              <Link to="/audit" className="btn btn-ghost">Get a Free Store Audit</Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                   className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3 max-w-lg">
              <div className="text-center rounded-xl border border-border bg-card/50 py-3">
                <div className="text-2xl font-bold text-ink">10+</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Years</div>
              </div>
              <div className="text-center rounded-xl border border-border bg-card/50 py-3">
                <div className="text-2xl font-bold text-ink">200+</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Brands</div>
              </div>
              <div className="text-center rounded-xl border border-border bg-card/50 py-3">
                <div className="text-2xl font-bold text-ink">£50M+</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="pb-16">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <article className="min-w-0 space-y-20">

            {/* Introduction */}
            <SectionBlock id="intro">
              <SectionHead num={sectionNum("intro")} eyebrow="Introduction" title="An ecommerce operator, not a marketer with a deck" />
              <div className="prose-body text-muted-foreground leading-relaxed space-y-4 text-base">
                <p>I&apos;m <span className="text-ink font-semibold">Tahir Abbas</span> — founder and CEO of <Link to="/" className="text-primary underline">BeingEcom</Link>, a UK ecommerce growth agency built for Shopify and WooCommerce brands that want senior operators, not account managers reading from a slide deck.</p>
                <p>For more than a decade I&apos;ve lived inside ecommerce: as a DTC store owner learning unit economics the hard way, as a growth lead scaling brands past their first £1M, as head of performance for a group running an 8-figure paid media P&amp;L, and today as the operator who signs off every 90-day growth plan BeingEcom ships.</p>
                <p>My mission is simple — help ambitious ecommerce brands compound revenue through <span className="text-ink font-semibold">SEO, paid advertising, conversion rate optimisation, email &amp; SMS, and AI automation</span>, all measured against contribution margin instead of vanity metrics. That&apos;s the reason BeingEcom exists, and it&apos;s the reason clients stay.</p>
              </div>
            </SectionBlock>

            {/* Story */}
            <SectionBlock id="story" tint>
              <SectionHead num={sectionNum("story")} eyebrow="My Story" title="From a first Shopify store to a senior-only agency" />
              <div className="prose-body text-muted-foreground leading-relaxed space-y-4 text-base">
                <p>The story started in 2013 with a single Shopify store, £300 in Facebook ad spend, and no idea what CAC payback meant. Within a year I&apos;d learned two things the hard way: <span className="text-ink font-semibold">every metric that matters lives on the P&amp;L</span>, and every metric that doesn&apos;t is a distraction sold by someone with a course to push.</p>
                <p>The turning point came in 2017 running paid media for a UK DTC group. The reports looked great on ROAS. The bank account said otherwise. That gap — between platform metrics and real profit — became the obsession that eventually became BeingEcom.</p>
                <p>Along the way I ran migrations between Shopify and WooCommerce, rebuilt technical SEO from the schema up, wrote Klaviyo flows that outperformed the acquisition channel that fed them, and — from 2023 — started building AI automations that compressed a week of reporting into a morning.</p>
                <p>In 2024 I founded BeingEcom with a single rule: <span className="text-ink font-semibold">no junior operates unsupervised on a client account, ever</span>. That constraint shaped the pod model, the pricing, the 90-day engagement and everything you see on this site today.</p>
              </div>
            </SectionBlock>

            {/* Timeline */}
            <SectionBlock id="timeline">
              <SectionHead num={sectionNum("timeline")} eyebrow="Professional Journey" title="A decade of ecommerce operating experience" intro="The milestones that shaped BeingEcom&apos;s revenue-first, senior-only playbook." />
              <ol className="relative border-l border-border ml-4 space-y-8">
                {timeline.map((t) => (
                  <li key={t.year} className="pl-8 relative">
                    <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">{t.year}</div>
                    <h3 className="mt-1 text-lg font-semibold text-ink">{t.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{t.body}</p>
                  </li>
                ))}
              </ol>
            </SectionBlock>

            {/* Expertise */}
            <SectionBlock id="expertise" tint>
              <SectionHead num={sectionNum("expertise")} eyebrow="Areas of Expertise" title="The disciplines I personally lead" intro="Every engagement I sign off on touches at least four of these — because ecommerce is a system, not a channel." />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {expertise.map((e) => (
                  <div key={e.title} className="rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <e.icon className="size-5" />
                    </div>
                    <h3 className="font-semibold text-ink">{e.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{e.body}</p>
                  </div>
                ))}
              </div>
            </SectionBlock>

            {/* Experience stats */}
            <SectionBlock id="experience">
              <SectionHead num={sectionNum("experience")} eyebrow="Experience by the Numbers" title="A decade, condensed" intro="Cumulative across independent operating, agency-side leadership and BeingEcom client work." />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {stats.map((s) => <Stat key={s.label} value={s.value} label={s.label} />)}
              </div>
            </SectionBlock>

            {/* Certifications */}
            <SectionBlock id="certifications" tint>
              <SectionHead num={sectionNum("certifications")} eyebrow="Certifications & Continuous Learning" title="Trained, certified, and always studying" intro="A partial list — the philosophy behind it matters more than the badges." />
              <div className="grid sm:grid-cols-2 gap-3">
                {certifications.map((c) => (
                  <div key={c} className="flex gap-3 items-start rounded-xl border border-border bg-card p-4">
                    <GraduationCap className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90">{c}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <div className="flex gap-3 items-start">
                  <BookOpen className="size-5 text-primary shrink-0 mt-1" />
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    <span className="font-semibold text-ink">Learning philosophy:</span> every quarter I re-audit one entire discipline — SEO one quarter, paid the next, CRO after that — because ecommerce platforms change faster than most teams can keep up with. Certifications are a floor, not a ceiling.
                  </p>
                </div>
              </div>
            </SectionBlock>

            {/* Philosophy */}
            <SectionBlock id="philosophy">
              <SectionHead num={sectionNum("philosophy")} eyebrow="Founder Philosophy" title="What I believe about ecommerce" />
              <div className="grid sm:grid-cols-2 gap-4">
                {philosophy.map((p) => (
                  <div key={p.title} className="rounded-2xl border border-border bg-card p-5">
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" /> {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
              <blockquote className="mt-8 rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 relative">
                <Quote className="absolute top-4 left-4 size-8 text-primary/30" />
                <p className="text-lg md:text-xl text-ink font-medium leading-relaxed pl-8">
                  &ldquo;Ecommerce isn&apos;t hacks or hype. It&apos;s a system where every click, every pound of ad spend and every customer compounds into profitable growth — or quietly leaks out of it.&rdquo;
                </p>
                <div className="mt-4 pl-8 text-sm text-muted-foreground">— Tahir Abbas, Founder &amp; CEO</div>
              </blockquote>
            </SectionBlock>

            {/* Vision */}
            <SectionBlock id="vision" tint>
              <SectionHead num={sectionNum("vision")} eyebrow="The BeingEcom Vision" title="Where BeingEcom is going" />
              <div className="prose-body text-muted-foreground leading-relaxed space-y-4 text-base">
                <p><span className="text-ink font-semibold">BeingEcom exists</span> to give ecommerce brands the senior operating team every founder wishes they could hire in-house — without the 12-month lock-ins, the junior account managers or the reporting theatre that most agencies charge for.</p>
                <p>Over the next three years we&apos;re expanding the operator-pod model across the UK, US, Ireland, Australia and Europe, deepening our AI automation stack, and publishing more of the internal methodology openly so ecommerce founders can raise their own standards — whether they hire us or not.</p>
                <p>The long-term vision is simple: become the <span className="text-ink font-semibold">most trusted, most transparent, most technically capable ecommerce growth partner</span> for founder-led DTC brands scaling from £1M to £25M.</p>
              </div>
            </SectionBlock>

            {/* Achievements */}
            <SectionBlock id="achievements">
              <SectionHead num={sectionNum("achievements")} eyebrow="Featured Achievements" title="Milestones worth naming" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((a) => (
                  <div key={a.title} className="rounded-2xl border border-border bg-card p-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <a.icon className="size-5" />
                    </div>
                    <h3 className="font-semibold text-ink">{a.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{a.body}</p>
                  </div>
                ))}
              </div>
            </SectionBlock>

            {/* Methodology */}
            <SectionBlock id="methodology" tint>
              <SectionHead num={sectionNum("methodology")} eyebrow="Founder Methodology" title="The operating system Tahir brings to every account" intro="A founder-led process for turning messy ecommerce growth into a weekly decision rhythm." />
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  ["Diagnose", "Audit the store, P&L, tracking, channel mix, creative, retention and customer journey before recommending any work."],
                  ["Prioritise", "Rank opportunities by revenue impact, effort, risk and confidence so the team ships the highest-leverage moves first."],
                  ["Execute", "Run SEO, paid, CRO, email and AI automation as one commercial system instead of separate channel silos."],
                  ["Review", "Read the weekly scorecard against MER, contribution margin, CAC payback and LTV — then adjust the next sprint."],
                ].map(([title, body], index) => (
                  <div key={title} className="rounded-2xl border border-border bg-card p-5">
                    <div className="text-[11px] font-black tracking-widest text-primary">{String(index + 1).padStart(2, "0")}</div>
                    <h3 className="mt-2 font-semibold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </SectionBlock>

            {/* Trust */}
            <SectionBlock id="trust">
              <SectionHead num={sectionNum("trust")} eyebrow="Trust & E-E-A-T" title="Why this founder profile is verifiable" intro="The page is built to support human trust and machine-readable authority signals without exaggeration." />
              <div className="grid gap-3">
                {[
                  "Experience: written from direct ecommerce operating work across Shopify, WooCommerce, paid media, CRO, SEO and retention.",
                  "Expertise: clear discipline coverage, named methods, transparent metrics and concrete commercial decision rules.",
                  "Authoritativeness: Tahir Abbas is connected to BeingEcom, the leadership team, services, methodology and public company pages.",
                  "Trustworthiness: contact details, founder identity, client-fit boundaries, FAQ answers and structured data are consistent across the site.",
                ].map((item) => (
                  <div key={item} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-xl border border-border bg-card p-4">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                    <p className="min-w-0 text-sm leading-relaxed text-foreground/90">{item}</p>
                  </div>
                ))}
              </div>
            </SectionBlock>

            {/* Entity SEO */}
            <SectionBlock id="entity" tint>
              <SectionHead num={sectionNum("entity")} eyebrow="Entity SEO Signals" title="How search engines should understand Tahir Abbas" intro="This section states the entity relationships clearly for Google, AI search engines and knowledge graph systems." />
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                {[
                  ["Person", "Tahir Abbas — Founder & CEO, ecommerce growth operator based in London, United Kingdom."],
                  ["Organization", "BeingEcom — UK ecommerce growth agency for Shopify and WooCommerce brands."],
                  ["worksFor", "Tahir Abbas works for and leads BeingEcom as Founder & CEO."],
                  ["knowsAbout", "Ecommerce SEO, paid advertising, CRO, AI automation, analytics, Shopify, WooCommerce, email marketing and digital marketing."],
                  ["sameAs", "Professional and brand social profiles are connected through the Person and Organization structured data."],
                ].map(([label, value]) => (
                  <div key={label} className="grid gap-1 border-b border-border p-4 last:border-b-0 sm:grid-cols-[150px_1fr]">
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">{label}</div>
                    <div className="text-sm leading-relaxed text-foreground/90">{value}</div>
                  </div>
                ))}
              </div>
            </SectionBlock>

            {/* AI Overview */}
            <SectionBlock id="ai-overview">
              <SectionHead num={sectionNum("ai-overview")} eyebrow="AI Overview Summary" title="Short answer for AI search and answer engines" intro="A concise, quotable summary for Google AI Overview, ChatGPT, Gemini, Claude, Perplexity and Copilot." />
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <p className="text-lg leading-relaxed text-ink">
                  Tahir Abbas is the founder and CEO of BeingEcom, a UK ecommerce growth agency focused on Shopify and WooCommerce brands. His work combines ecommerce SEO, paid advertising, CRO, analytics, email marketing and AI automation into revenue-first growth systems measured by MER, contribution margin and long-term customer value.
                </p>
              </div>
            </SectionBlock>

            {/* Media */}
            <SectionBlock id="media" tint>
              <SectionHead num={sectionNum("media")} eyebrow="Speaking, Interviews & Media" title="Talks, podcasts and guest features" intro="A rolling record — updated as new appearances are confirmed." />
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-ink">Recent &amp; upcoming</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>• Regular editorial contributor at <Link to="/blog" className="text-primary underline">beingecom.com/blog</Link> — long-form playbooks on SEO, CRO and paid.</li>
                    <li>• Guest interviews on independent DTC podcasts covering the shift from ROAS-first to margin-first thinking.</li>
                    <li>• Speaker at UK ecommerce founder meetups on AI-assisted growth workflows.</li>
                    <li>• Workshops for closed founder communities on the 13-phase growth framework.</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-border text-sm text-muted-foreground">
                  Press or podcast enquiry? Email <a href="mailto:info@beingecom.com" className="text-primary underline">info@beingecom.com</a> with your outlet, audience and format.
                </div>
              </div>
            </SectionBlock>

            {/* Personal insights */}
            <SectionBlock id="personal">
              <SectionHead num={sectionNum("personal")} eyebrow="Personal Insights" title="The habits, books and principles behind the work" />
              <ul className="grid gap-3">
                {insights.map((i) => (
                  <li key={i} className="flex gap-3 items-start rounded-xl border border-border bg-card p-4">
                    <Sparkles className="size-4 text-primary shrink-0 mt-1" />
                    <span className="text-sm text-foreground/90 leading-relaxed">{i}</span>
                  </li>
                ))}
              </ul>
            </SectionBlock>

            {/* Articles */}
            <SectionBlock id="articles" tint>
              <SectionHead num={sectionNum("articles")} eyebrow="Featured Articles" title="Written by Tahir Abbas" intro="Selected long-form pieces — the same thinking that shapes every client engagement." />
              <div className="grid sm:grid-cols-2 gap-4">
                {articles.map((a) => (
                  <Link key={a.title} to={a.to} className="rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition-colors block">
                    <h3 className="font-semibold text-ink">{a.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{a.body}</p>
                    <div className="mt-3 text-xs text-muted-foreground">Written by <span className="text-primary font-semibold">Tahir Abbas</span></div>
                  </Link>
                ))}
              </div>
            </SectionBlock>

            {/* Testimonials */}
            <SectionBlock id="testimonials">
              <SectionHead num={sectionNum("testimonials")} eyebrow="Testimonials" title="What clients say about working with Tahir" />
              <div className="grid sm:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div key={t.author + t.role} className="rounded-2xl border border-border bg-card p-6 relative">
                    <Quote className="absolute top-4 right-4 size-6 text-primary/20" />
                    <p className="text-foreground/90 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="font-semibold text-ink text-sm">{t.author}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionBlock>

            {/* Connect */}
            <SectionBlock id="connect" tint>
              <SectionHead num={sectionNum("connect")} eyebrow="Connect" title="Reach out to Tahir directly" intro="For strategy calls, press enquiries, podcasts or speaking invitations." />
              <div className="grid sm:grid-cols-3 gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-primary/50 transition-colors">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <s.icon className="size-5" />
                    </span>
                    <div>
                      <div className="font-semibold text-ink text-sm">{s.label}</div>
                      <div className="text-xs text-muted-foreground">Connect</div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-primary btn-shimmer">Book a Strategy Call <ArrowRight className="size-4" /></Link>
                <Link to="/audit" className="btn btn-ghost">Request a Free Store Audit</Link>
              </div>
            </SectionBlock>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <div id="faq">
        <FaqSection faqs={faqs} title="Questions about Tahir Abbas" highlight="answered" />
      </div>

      {/* Final CTA */}
      <CTA
        heading="Work directly with the founder"
        sub="Book a 30-minute strategy call with Tahir Abbas. Bring your store URL, current MER and biggest bottleneck — leave with a clear next 90 days."
      />
    </PageLayout>
  );
}
