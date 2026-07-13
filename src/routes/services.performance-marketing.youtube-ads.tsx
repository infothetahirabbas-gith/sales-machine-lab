import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-performance-marketing.jpg?format=webp&quality=56&w=640";

const FAQ_LIST: FAQ[] = [
  { q: "Do YouTube ads work for ecommerce?", a: "Yes — Video Action Campaigns and Demand Gen convert profitably for DTC brands with the right creative and CAPI-clean tracking. A specialist Ecommerce Marketing Agency UK will run YouTube alongside Google Shopping for maximum incremental lift." },
  { q: "What's the minimum spend to test YouTube?", a: "£3k–£5k/mo for a 30-day read. Below that, YouTube's learning can't stabilise." },
  { q: "Which YouTube ad formats do you run?", a: "Video Action Campaigns (VAC), Demand Gen, Shorts ads, and In-stream skippable — matched to funnel stage." },
  { q: "How long should a YouTube ad be?", a: "15–60s for cold prospecting VAC; 6s bumpers for retargeting; 15–30s vertical Shorts for mobile-first reach." },
  { q: "Do I need a Google Ads account already?", a: "Yes — YouTube ads run through Google Ads. We set up Merchant Center, GA4, enhanced conversions and CAPI where needed." },
  { q: "YouTube Ads vs Meta or TikTok — where does it fit?", a: "YouTube is the biggest under-priced DR channel. It complements Meta (demand creation) and Google Search (harvest). A serious Ecommerce Growth Agency uses YouTube for incremental reach at Meta-beating CPMs." },
  { q: "What ROAS should I expect on YouTube?", a: "2.8–3.5× on VAC once creative dials in. Demand Gen commonly compounds branded search — measured by our Ecommerce SEO Agency UK team through query-level lift, not platform ROAS alone." },
  { q: "How fast will YouTube Ads see results?", a: "30–45 days to stabilise VAC learning. Real scale from month 2 with 3–5 concept refreshes." },
  { q: "Do you handle YouTube ad creative production?", a: "Yes — in-house video production, editing, hooks, voiceover and Shorts adaptations." },
  { q: "Can YouTube Shorts drive ecommerce sales?", a: "Yes — 9:16 vertical Shorts inventory is undervalued and mobile-first. Our Ecommerce Agency UK team ships Shorts adaptations of every VAC concept." },
  { q: "What about YouTube for Shopify and WooCommerce?", a: "Yes — VAC integrates with Merchant Center feeds for Shopping-adjacent product ads. Full Shopify Google channel and Woo feed management included." },
  { q: "How do you measure YouTube incrementality?", a: "Geo holdouts, conversion lift studies, branded-search lift and post-purchase surveys. Platform-attributed ROAS is only one signal." },
  { q: "What targeting works best on YouTube?", a: "Custom Intent (based on Google searches), Similar Audiences, In-Market and life events. Interest targeting is largely deprecated by Demand Gen." },
  { q: "Does YouTube work at low budgets?", a: "Marginally — below £3k/mo YouTube's learning can't stabilise. For sub-£3k budgets, focus on Meta or Google Shopping first." },
  { q: "What tools do you use for YouTube Ads?", a: "Google Ads, GA4, Merchant Center, Motion for editing, Triple Whale and Looker Studio dashboards." },
  { q: "How is BeingEcom different from other YouTube Ads agencies?", a: "We're a specialist Ecommerce Marketing Agency UK — video production, media buying, feed engineering and Ecommerce SEO Agency UK measurement share one P&L per client." },
];

export const Route = createFileRoute("/services/performance-marketing/youtube-ads")({
  head: () => ({
    meta: [
      { title: "No.1 YouTube Ads Agency UK | Video, Shorts & Demand Gen | BeingEcom" },
      { name: "description", content: "Award-winning YouTube Ads Agency UK. As a specialist Ecommerce Marketing Agency UK we run Video Action, Demand Gen and Shorts campaigns that grow Shopify and WooCommerce brands profitably." },
      { name: "keywords", content: "YouTube Ads agency UK, Ecommerce Marketing Agency UK, Ecommerce Agency UK, Ecommerce Growth Agency, Video Action Campaigns agency, Demand Gen YouTube, YouTube Shorts Ads, Shopify YouTube Ads" },
      { property: "og:title", content: "No.1 YouTube Ads Agency UK | Video, Shorts & Demand Gen | BeingEcom" },
      { property: "og:description", content: "Specialist Ecommerce Agency UK for YouTube Ads. Video Action, Demand Gen and Shorts campaigns for Shopify and WooCommerce brands." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/youtube-ads" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://beingecom.com/services/performance-marketing/youtube-ads" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/youtube-ads", name: "YouTube Ads Agency UK", description: "YouTube Ads for ecommerce — VAC, Demand Gen, Shorts and skippable in-stream." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "YouTube Ads", path: "/services/performance-marketing/youtube-ads" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing/youtube-ads")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "youtube-ads",
      eyebrow: "YouTube Ads",
      heroImage: heroImg,
      heroTitle: "No.1 YouTube Ads Agency UK — engineered for revenue, not just views.",
      heroSub: "The UK's leading Ecommerce Marketing Agency UK for Video Action Campaigns, Demand Gen and YouTube Shorts — profitable, measurable YouTube growth for Shopify and DTC brands.",
      problemTitle: "Why most YouTube ad accounts burn cash.",
      problemBullets: [
        "Boosted brand videos with no direct-response structure.",
        "Zero Shorts creative in a Shorts-first algorithm.",
        "Broken enhanced conversions and no offline import.",
      ],
      whatIsTitle: "YouTube is the biggest untapped DR channel.",
      whatIsBody: "Meta and Google Search are crowded and expensive. YouTube's inventory is huge, CPMs still competitive, and Video Action Campaigns can print acquisition when the creative is right — which is why every serious Ecommerce Growth Agency layers YouTube on top of Meta and Google, then measures branded-search lift with an Ecommerce SEO Agency UK team.",
      systemTitle: "Our YouTube Ads system.",
      systemSteps: [
        { title: "Account & tracking audit", body: "Google Ads, GA4, Merchant Center, enhanced conversions, CAPI." },
        { title: "Creative engine", body: "Weekly 15/30/60s hooks + 6s bumpers + 9:16 Shorts." },
        { title: "VAC + Demand Gen", body: "Video Action for lower funnel, Demand Gen for scale." },
        { title: "Retargeting & sequencing", body: "Bumper stacks and DR sequences after first view." },
      ],
      pillarsTitle: "What we run on YouTube.",
      pillars: [
        { title: "Video Action Campaigns", body: "Google's core DR video product — scales with the right creative." },
        { title: "Demand Gen", body: "YouTube + Discover + Gmail unified across the ecosystem." },
        { title: "Shorts ads", body: "9:16 vertical inventory Meta doesn't own." },
        { title: "Retargeting", body: "6s bumpers + skippable stacks to warm audiences." },
      ],
      deepBlocks: [
        { title: "Video Action Campaigns", body: "Skippable in-stream + in-feed + Shorts — bidding for conversions.", tags: ["VAC","In-stream","In-feed"] },
        { title: "Demand Gen", body: "Cross-surface Google DG for reach + conversion at scale.", tags: ["Demand Gen","YouTube","Discover"] },
        { title: "Shorts creative", body: "9:16 vertical, hook in 2s, native to the Shorts feed.", tags: ["Shorts","9:16","Hook"] },
        { title: "Tracking & attribution", body: "Enhanced conversions, GA4, Merchant Center, offline import.", tags: ["Enhanced","GA4","Offline"] },
      ],
      triggersTitle: "YouTube creative angles that convert.",
      triggers: ["Problem-solution","Founder story","Product demo","Review compilation","UGC testimonial","Comparison","Explainer","Native Shorts"],
      comparison: {
        rows: [
          { criterion: "Format", us: "15–60s video + Shorts", agency: "Static feed + RSA", inhouse: "9:16 UGC" },
          { criterion: "Typical ROAS", us: "2.8–3.5×", agency: "3.5–6× (Shopping)", inhouse: "1.8–3× (TikTok)" },
          { criterion: "Buyer intent", us: "Med (custom intent)", agency: "High (search)", inhouse: "Low (discovery)" },
          { criterion: "CPM efficiency", us: "Low (video inventory undervalued)", agency: "High", inhouse: "Very low" },
          { criterion: "Best funnel stage", us: "TOF + MOF DR", agency: "BOF harvest", inhouse: "TOF demand" },
          { criterion: "Min viable spend", us: "£3–5k/mo", agency: "£3k/mo", inhouse: "£2–3k/mo" },
        ],
      },
      mistakes: [
        { title: "Only running 30-second brand videos", body: "Cold VAC needs a real DR hook in the first 5 seconds. Cinematic brand content dies on skippable in-stream." },
        { title: "No Shorts creative", body: "Shorts inventory is huge and undervalued. Skipping it leaves 20–40% of YouTube reach on the table." },
        { title: "Broken enhanced conversions", body: "Without Enhanced Conversions, VAC signal is weak. It's the highest-leverage tracking fix on YouTube." },
        { title: "Cutting spend before learning", body: "VAC needs 30–45 days to stabilise. Judging on week one wastes the learning window." },
        { title: "Ignoring branded search lift", body: "YouTube's true value shows in branded-search volume. Measure it via GA4 + Ecommerce SEO Agency UK reporting." },
      ],
      beforeAfter: {
        before: ["No YouTube presence","Boosted brand video only","No Shorts creative","Broken tracking"],
        after: ["3.1× VAC ROAS","Full-funnel DR structure","Weekly Shorts assets","Enhanced conv. + CAPI clean"],
      },
      caseStudy: {
        title: "Wellness brand: £0 → £68K/mo on YouTube in 90 days",
        problem: "Never run YouTube ads, no video creative, no tracking.",
        strategy: "5 VAC creatives + Shorts batch + Demand Gen retargeting + enhanced conv.",
        result: "£68K MRR at 3.1× ROAS in 90 days, incremental to Meta.",
        metrics: [{ label: "MRR", value: "£68K" }, { label: "ROAS", value: "3.1×" }, { label: "Days", value: "90" }],
      },
      ctaTitle: "Turn YouTube into a profitable channel with the UK's No.1 YouTube Ads Agency.",
      impactStats: [
        { value: "3.1×", label: "VAC ROAS" },
        { value: "£68K", label: "New MRR" },
        { value: "90d", label: "To scale" },
      ],
      metricBars: [
        { label: "ROAS", before: 0.9, after: 3.1, unit: "×", description: "Revenue ÷ YouTube ad spend." },
        { label: "CPA", before: 92, after: 34, unit: "£", description: "Cost per acquisition from VAC." },
        { label: "View-through rate", before: 18, after: 42, unit: "%", description: "VTR on skippable in-stream." },
        { label: "Monthly ad revenue", before: 0, after: 68, unit: "£k", description: "Top-line YouTube-attributed revenue." },
      ],
      faqs: FAQ_LIST,
      relatedServices: [
        { to: "/services/paid-ads", title: "All Paid Ads Services", body: "Meta + Google + TikTok + YouTube — one revenue P&L." },
        { to: "/services/performance-marketing/google-ads", title: "Google Ads", body: "VAC lives inside Google Ads — pair with Shopping and Search." },
        { to: "/services/seo", title: "Ecommerce SEO Agency UK", body: "Capture the branded-search lift YouTube generates." },
        { to: "/services/creative", title: "Creative Production", body: "Video + Shorts production in-house." },
        { to: "/services/analytics", title: "Analytics & Tracking", body: "Enhanced Conversions, GA4 and offline imports." },
        { to: "/pricing", title: "Pricing & Packages", body: "Transparent monthly retainers." },
        { to: "/free-audit", title: "Free YouTube Ads Audit", body: "Book a free 30-min audit of your VAC account and tracking." },
        { to: "/case-studies", title: "YouTube Ads Case Studies", body: "Real Shopify & Woo brands scaled on YouTube." },
      ],
    }} />
  ),
});
