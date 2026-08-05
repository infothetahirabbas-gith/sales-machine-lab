import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-performance-marketing.jpg?format=webp&quality=56&w=640";

const FAQ_LIST: FAQ[] = [
  { q: "What does an ecommerce media buyer actually do?", a: "Owns spend allocation across Meta, Google and TikTok, balances ROAS vs MER, controls creative testing budgets, and protects margin as you scale. A specialist Ecommerce Marketing Agency UK will treat media buying as capital allocation, not campaign management." },
  { q: "How is media buying different from running ads?", a: "Running ads is tactical. Media buying is strategic - channel mix, daypart, audience, creative refresh, and scaling math under one P&L view - which is why serious Ecommerce Agency UK teams staff a dedicated media buyer per client." },
  { q: "How do you decide channel mix?", a: "Margin, AOV, audience and creative supply. We rebalance weekly based on MER, not platform ROAS." },
  { q: "What dashboards do I get?", a: "Daily blended MER, contribution margin, new-customer CAC and creative-level performance - usually in Triple Whale, Hyros or a custom Looker dashboard." },
  { q: "Is this a fixed retainer or % of spend?", a: "Hybrid - fixed retainer up to a spend threshold, then a small % of spend above it. Aligns incentives without billing surprises." },
  { q: "How does media buying differ across Google, Meta and TikTok?", a: "Google harvests demand (BOF); Meta creates demand at scale (TOF/MOF); TikTok creates viral demand (TOF). A real Ecommerce Growth Agency runs all three against one blended MER target." },
  { q: "What MER should I aim for?", a: "Depends on contribution margin and payback window. Beauty/skincare 2.8-3.5×, apparel 3.5-4.5×, low-margin gadgets 4.5×+. We model the target before spending." },
  { q: "How often do you reallocate budget?", a: "Weekly, based on marginal MER by channel. Static budgets are how brands overspend on yesterday's winner." },
  { q: "Do you do incrementality testing?", a: "Yes - geo holdouts, conversion lift studies and brand-spend pauses. Platform ROAS alone doesn't prove incremental revenue." },
  { q: "Can media buying scale a brand past £500k/mo?", a: "Yes - most of our >£500k/mo clients are managed on a portfolio MER, not per-channel ROAS. It's the only way to protect margin at scale." },
  { q: "How is this different from a PPC agency?", a: "PPC agencies run ads. A media-buying-led Ecommerce Marketing Agency UK runs a P&L - including creative velocity, attribution, CRO and SEO handoffs." },
  { q: "Do you handle attribution and tracking?", a: "Yes - GA4, server-side GTM, CAPI, Enhanced Conversions and (optionally) Triple Whale or Northbeam. Attribution is our first project week." },
  { q: "Do you work with brands running only one channel today?", a: "Yes - half our new clients start Meta-only. We add Google or TikTok once creative velocity supports the second channel." },
  { q: "Can you integrate with our in-house team?", a: "Yes - many clients use us as their strategic media-buying layer while in-house handles copy, brand and community." },
  { q: "How do you protect margin as spend scales?", a: "Contribution-margin reporting, per-channel MER floors, incrementality validation and SEO collaboration so paid demand compounds into organic." },
  { q: "What tools do you use?", a: "Triple Whale, Northbeam, Hyros, Meta Ads Manager, Google Ads, TikTok Ads Manager, GA4, Looker Studio dashboards you can log into." },
  { q: "How is BeingEcom different from other media-buying agencies?", a: "We're a specialist Ecommerce Growth Agency - creative, media buying, tracking and SEO share one revenue P&L per client, with a senior media buyer owning your account personally." },
];

export const Route = createFileRoute("/services/performance-marketing/media-buying")({
  head: () => ({
    meta: [
      { title: "Ecommerce Media Buying Agency UK | One Ad P&L" },
      { name: "description", content: "Meta, Google, TikTok and YouTube managed as a single revenue P&L for UK Shopify and WooCommerce brands. Senior buyers, blended MER accountability." },
      { name: "keywords", content: "media buying agency UK, Ecommerce Marketing Agency UK, Ecommerce Agency UK, Ecommerce Growth Agency, cross-channel media buying, blended ROAS agency, MER media buying, Shopify media buying" },
      { property: "og:title", content: "Ecommerce Media Buying Agency UK | One Ad P&L" },
      { property: "og:description", content: "Meta, Google, TikTok and YouTube managed as a single revenue P&L for UK Shopify and WooCommerce brands. Senior buyers, blended MER accountability." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/media-buying" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://beingecom.com/services/performance-marketing/media-buying" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/media-buying", name: "Ecommerce Media Buying Agency UK", description: "Cross-channel media buying across Meta, Google, TikTok and YouTube for Shopify & WooCommerce brands." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "Media Buying", path: "/services/performance-marketing/media-buying" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing/media-buying")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "media-buying",
      eyebrow: "Media Buying",
      heroImage: heroImg,
      heroTitle: "No.1 Ecommerce Media Buying Agency UK - engineered for blended ROAS.",
      heroSub: "The specialist Ecommerce Marketing Agency UK for cross-channel media buying - Meta, Google, TikTok and YouTube run as one P&L, with MER targets, full-funnel allocation and weekly capital reallocation.",
      problemTitle: "Why single-channel buyers cap your scale.",
      problemBullets: [
        "Optimising per-channel ROAS instead of blended MER.",
        "No cross-channel attribution - double-counting revenue.",
        "Budgets stuck where last quarter worked.",
      ],
      whatIsTitle: "Media buying is capital allocation.",
      whatIsBody: "Every channel earns or loses its budget weekly. As a specialist Ecommerce Growth Agency we manage Meta, Google, TikTok and YouTube as one portfolio against MER, incrementality and contribution margin - with our in-house SEO team compounding branded demand as paid scales.",
      systemTitle: "Our media buying system.",
      systemSteps: [
        { title: "Portfolio audit", body: "Channel mix, MER baseline, attribution sanity." },
        { title: "Funnel mapping", body: "TOF/MOF/BOF split, channel role, budget bands." },
        { title: "Weekly reallocation", body: "Capital flows to highest marginal MER." },
        { title: "Incrementality testing", body: "Geo holdouts, conversion lift, brand defence audits." },
      ],
      pillarsTitle: "How we manage the portfolio.",
      pillars: [
        { title: "Blended MER", body: "Revenue ÷ total spend - the only number that matters." },
        { title: "Contribution margin", body: "After COGS + shipping + fees, not just ROAS." },
        { title: "Incrementality", body: "Geo holdouts and lift studies, not platform ROAS." },
        { title: "Capital reallocation", body: "Weekly budget shifts to highest marginal return." },
      ],
      deepBlocks: [
        { title: "MER framework", body: "Set MER target from contribution margin, payback window and LTV.", tags: ["MER","CM","LTV"] },
        { title: "Channel roles", body: "TikTok = demand creation, Meta = scale, Google = harvest, YouTube = incremental DR.", tags: ["TOF","MOF","BOF"] },
        { title: "Attribution stack", body: "GA4 + platform + post-purchase survey triangulation.", tags: ["GA4","Survey","Triangulation"] },
        { title: "Incrementality tests", body: "Geo holdouts, conversion lift, brand-spend pauses.", tags: ["Geo","Lift","Holdout"] },
      ],
      triggersTitle: "Levers a real media buyer pulls.",
      triggers: ["MER target","Contribution margin","Geo holdout","Brand defence audit","Payback window","Channel role","Budget bands","Incrementality"],
      comparison: {
        rows: [
          { criterion: "Role in the funnel", us: "Demand harvest (BOF)", agency: "Demand creation (TOF/MOF)", inhouse: "Viral demand (TOF)" },
          { criterion: "Typical channel ROAS", us: "3.5-6× Google", agency: "2.5-3.5× Meta", inhouse: "1.8-3× TikTok" },
          { criterion: "Budget share (typical)", us: "35-45%", agency: "40-50%", inhouse: "10-20%" },
          { criterion: "Attribution risk", us: "Low", agency: "Medium (iOS)", inhouse: "High (native)" },
          { criterion: "Creative velocity", us: "Low (feed + RSA)", agency: "10-20/mo", inhouse: "15-25/mo" },
          { criterion: "Best combined role", us: "Harvest branded + non-branded", agency: "Fill the funnel", inhouse: "Ignite new demand" },
        ],
      },
      mistakes: [
        { title: "Optimising per-channel ROAS", body: "Meta reports 6×, Google 8×, but blended MER is 1.9×. Manage the portfolio, not the platforms." },
        { title: "Ignoring contribution margin", body: "ROAS is a vanity number without COGS, shipping and fees. Report CM% weekly." },
        { title: "Static budgets", body: "Weekly reallocation is the difference between 1.8× and 3.5× MER. Yesterday's winner is often today's loser." },
        { title: "No incrementality testing", body: "Platform ROAS overstates paid contribution. Geo holdouts prove what's actually incremental." },
        { title: "Skipping SEO handoffs", body: "Paid demand compounds into organic - but only if the SEO team is capturing branded lift." },
      ],
      beforeAfter: {
        before: ["Per-channel ROAS focus","Static budgets","Double-counted revenue","Spend stuck on Meta"],
        after: ["Blended MER target","Weekly reallocation","Triangulated attribution","Multi-channel scale"],
      },
      caseStudy: {
        title: "Apparel brand: £140K → £420K/mo in 6 months",
        problem: "All spend on Meta, ROAS dropping, no Google or TikTok.",
        strategy: "Rebuilt as 3-channel portfolio with MER target and weekly reallocation.",
        result: "3× monthly revenue at improved contribution margin.",
        metrics: [{ label: "MRR", value: "£420K" }, { label: "MER", value: "3.4×" }, { label: "Months", value: "6" }],
      },
      ctaTitle: "Want a UK media buyer who manages a P&L, not a dashboard?",
      impactStats: [
        { value: "3.4×", label: "Blended MER" },
        { value: "+38%", label: "Contribution margin" },
        { value: "3×", label: "Revenue at scale" },
      ],
      metricBars: [
        { label: "Blended MER", before: 1.9, after: 3.4, unit: "×", description: "Total revenue ÷ total ad spend across all channels." },
        { label: "Contribution margin", before: 18, after: 32, unit: "%", description: "Margin after COGS, shipping, fees and ad spend." },
        { label: "Channel diversification", before: 1, after: 3, unit: "ch", description: "Number of channels carrying meaningful spend." },
        { label: "Monthly revenue", before: 140, after: 420, unit: "£k", description: "Top-line revenue across the media portfolio." },
      ],
      faqs: FAQ_LIST,
      relatedServices: [
        { to: "/services/performance-marketing", title: "All Paid Ads Services", body: "Meta + Google + TikTok + YouTube - one revenue P&L." },
        { to: "/services/performance-marketing/google-ads", title: "Google Ads", body: "Demand harvest inside your portfolio." },
        { to: "/services/performance-marketing/facebook-ads", title: "Facebook Ads", body: "Demand creation at scale." },
        { to: "/services/seo", title: "Ecommerce SEO", body: "Compound paid demand into organic revenue." },
        { to: "/services/analytics", title: "Analytics & Tracking", body: "Attribution, MER dashboards and incrementality tests." },
        { to: "/pricing", title: "Pricing & Packages", body: "Transparent hybrid retainer + % of spend." },
        { to: "/audit", title: "Free Media Buying Audit", body: "Book a free 30-min audit of your portfolio and MER." },
        { to: "/case-studies", title: "Media Buying Case Studies", body: "Real Shopify & Woo brands scaled by our Ecommerce Growth Agency." },
      ],
    }} />
  ),
});
