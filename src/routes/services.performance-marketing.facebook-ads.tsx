import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-performance-marketing.jpg?format=webp&quality=56&w=640";

const FAQ_LIST: FAQ[] = [
  { q: "How much should I spend on Facebook ads to start?", a: "Minimum £3–5k/mo for meaningful testing. Below that, Meta's learning phase never settles. A specialist Ecommerce Marketing Agency UK will normally recommend batching creative before scaling spend." },
  { q: "What ROAS should I expect from Facebook Ads?", a: "2.5–3.5× blended ROAS is healthy for most DTC brands; 4×+ is exceptional. Our Ecommerce Agency UK team optimises for MER and contribution margin, not platform ROAS only." },
  { q: "How many creatives do I need each month?", a: "10–20 net-new creatives is the floor for ASC+ to keep finding winners. Fewer than that, you stall." },
  { q: "Do you set up Conversions API and pixel?", a: "Yes — full CAPI via Shopify, GTM server-side or custom — with EMQ above 8 and proper deduplication." },
  { q: "What's ASC+ and should I be using it?", a: "Advantage+ Shopping Campaigns — Meta's broad-targeting AI engine. Yes, for most ecommerce accounts above £8k/mo it outperforms manual." },
  { q: "Facebook Ads vs Google Ads — which should I run first?", a: "If you have budget for only one channel and no brand awareness, start Google Shopping (harvest). Add Facebook when you're ready to create demand. A real Ecommerce Growth Agency runs both together." },
  { q: "How fast will Facebook Ads see results?", a: "14–21 days to break out of Meta's learning phase with proper creative velocity. Real scale compounds from month 2 onward." },
  { q: "Do you handle creative production?", a: "Yes — UGC, statics, motion and Reels in-house with 3 batches shipped weekly. Creative wins more than targeting on Meta." },
  { q: "What's the difference between ASC+ and CBO?", a: "ASC+ uses Meta AI to blend prospecting + retargeting into one campaign; CBO gives you manual budget control across ad sets for granular testing." },
  { q: "Can Facebook Ads work for Shopify and WooCommerce?", a: "Yes — we build DPA feeds via Shopify Meta channel or Woo Product Feed Manager, with server-side CAPI wired through GTM." },
  { q: "How do you deal with iOS 14+ tracking loss?", a: "Server-side CAPI + Enhanced Match + Aggregated Event Measurement + post-purchase surveys to triangulate signal. We won't run an account without server-side." },
  { q: "Do you run Instagram Ads too?", a: "Yes — Instagram sits inside Meta Ads Manager. Reels and Stories placements are managed by the same team." },
  { q: "How much of my ad spend should go to retargeting?", a: "10–20% at healthy prospecting scale. If retargeting is more than 30%, you're not creating enough net-new demand." },
  { q: "What targeting works best in 2026?", a: "Broad ASC+ with strong creative signals beats interest stacks 8/10 times. The Ecommerce SEO Agency UK team also helps identify branded intent to layer in." },
  { q: "What tools do you use?", a: "Meta Ads Manager, Motion, Foreplay, Triple Whale, Northbeam, GA4 and server-side GTM." },
  { q: "How is BeingEcom different from other Facebook Ads agencies?", a: "We're a full-stack Ecommerce Marketing Agency UK — not a media-buying box. Our creative, CRO and SEO teams share one P&L per client." },
];

export const Route = createFileRoute("/services/performance-marketing/facebook-ads")({
  head: () => ({
    meta: [
      { title: "No.1 Facebook Ads Agency UK | Meta Ads for Shopify & Woo | BeingEcom" },
      { name: "description", content: "Specialist Facebook Ads Agency UK. As a specialist Ecommerce Marketing Agency UK we run ASC+, UGC creative and CAPI-clean Meta scaling for Shopify and WooCommerce brands." },
      { name: "keywords", content: "Facebook Ads agency UK, Ecommerce Marketing Agency UK, Ecommerce Agency UK, Ecommerce Growth Agency, Meta Ads agency, Shopify Facebook Ads, Advantage+ Shopping, Meta Conversions API" },
      { property: "og:title", content: "No.1 Facebook Ads Agency UK | Meta Ads for Shopify & Woo | BeingEcom" },
      { property: "og:description", content: "Specialist Ecommerce Agency UK for Meta Ads. ASC+, UGC creative and CAPI-clean scaling for Shopify and WooCommerce brands." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/facebook-ads" },
    ],
    links: [
      { rel: "canonical", href: "https://beingecom.com/services/performance-marketing/facebook-ads" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/facebook-ads", name: "Facebook Ads Agency UK", description: "Meta & Instagram ads engineered to scale ROAS for Shopify & WooCommerce brands." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "Facebook Ads", path: "/services/performance-marketing/facebook-ads" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing/facebook-ads")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "facebook-ads",
      eyebrow: "Facebook Ads",
      heroImage: heroImg,
      heroTitle: "No.1 Facebook Ads Agency UK — Meta ads that print revenue.",
      heroSub: "Shopify and DTC Facebook Ads management by the specialist Ecommerce Marketing Agency UK. Creative volume, Advantage+ scaling and Conversions API engineered for profitable ecommerce ROAS.",
      problemTitle: "Why most Meta accounts stop scaling.",
      problemBullets: [
        "2–3 creatives in rotation, fatigue every 14 days.",
        "Boosting posts instead of a real campaign structure.",
        "Scaling spend without break-even unit economics.",
      ],
      whatIsTitle: "Meta is a creative testing machine.",
      whatIsBody: "Account structure matters, but creative wins. As a specialist Ecommerce Growth Agency we ship weekly batches of hooks, angles and formats, then scale only what crosses break-even — and pair Meta with our Ecommerce SEO Agency UK team so paid demand keeps compounding into organic.",
      systemTitle: "Our Facebook Ads system.",
      systemSteps: [
        { title: "Account & pixel audit", body: "CAPI, attribution, exclusions, asset library." },
        { title: "Creative engine", body: "Weekly batches of UGC, statics, founder, demo." },
        { title: "ASC+ & manual scale", body: "ASC+ for prospecting, manual for control." },
        { title: "Retargeting & DPA", body: "Dynamic catalogue, post-purchase exclusions." },
      ],
      pillarsTitle: "What we run inside Meta.",
      pillars: [
        { title: "ASC+ Shopping", body: "Advantage+ for cold prospecting at scale." },
        { title: "CBO prospecting", body: "Manual structure for category & angle tests." },
        { title: "DPA retargeting", body: "Dynamic product ads with smart exclusions." },
        { title: "UGC creative", body: "Creator-driven hooks and Spark-style assets." },
      ],
      deepBlocks: [
        { title: "Campaign structure", body: "ASC+ for scale, CBO for control, separated by margin tier.", tags: ["ASC+","CBO","Margin"] },
        { title: "Creative testing", body: "Hooks, angles, formats — weekly batches with win/kill rules.", tags: ["Hooks","UGC","Iteration"] },
        { title: "CAPI & attribution", body: "Conversions API, deduplication, EMQ score >8.", tags: ["CAPI","EMQ","Server-side"] },
        { title: "DPA & retargeting", body: "Dynamic catalogue, layered audiences, exclusion logic.", tags: ["DPA","Exclusion","Cross-sell"] },
      ],
      triggersTitle: "Creative angles that scale on Meta.",
      triggers: ["Problem-solution UGC","Founder story","Before/after","Product demo","Testimonial stack","List/Top-X","Native review","Comparison"],
      comparison: {
        rows: [
          { criterion: "Buyer intent", us: "Low–Medium (interruption)", agency: "High (active search)", inhouse: "Low (native discovery)" },
          { criterion: "Typical ROAS", us: "2.5–3.5×", agency: "3.5–6×", inhouse: "1.8–3×" },
          { criterion: "Best funnel stage", us: "TOF + MOF prospecting", agency: "BOF harvest", inhouse: "TOF demand creation" },
          { criterion: "Creative volume", us: "10–20/mo minimum", agency: "Low (feed + RSA)", inhouse: "15–25/mo creator UGC" },
          { criterion: "Min viable spend", us: "£3–5k/mo", agency: "£3k/mo", inhouse: "£2–3k/mo" },
          { criterion: "Best for", us: "New product launches", agency: "Established SKUs", inhouse: "Viral / Gen-Z products" },
        ],
      },
      mistakes: [
        { title: "Two creatives on rotation", body: "ASC+ needs 10–20 new assets/mo to keep finding winners. Otherwise fatigue kills ROAS in 14 days." },
        { title: "Fragmented CBO structure", body: "10 ad sets with £5/day each = no learning. Consolidate into 2–3 CBOs with meaningful budget." },
        { title: "No server-side CAPI", body: "iOS 14+ signal loss without CAPI = you're flying blind. Fix EMQ >8 before scaling spend." },
        { title: "Repurposed static creative", body: "Meta rewards native-feeling motion, sound-on, 9:16. Stop uploading print ads." },
        { title: "Scaling before break-even", body: "Doubling budget on a losing funnel doubles losses. Fix AOV, CVR and margin first." },
      ],
      beforeAfter: {
        before: ["1.4× ROAS","2 creatives, no testing","£72 CAC","Stuck at £18K/mo"],
        after: ["3.2× ROAS","12+ creatives in rotation","£36 CAC","£92K/mo with stable ROAS"],
      },
      caseStudy: {
        title: "Beauty brand: £18K → £92K/mo in 120 days",
        problem: "Creative fatigue, no testing pipeline, ASC+ never adopted.",
        strategy: "Weekly creator UGC batches, ASC+ scaling, CAPI cleanup.",
        result: "£92K MRR at 3.2× ROAS in 120 days.",
        metrics: [{ label: "MRR", value: "£92K" }, { label: "ROAS", value: "3.2×" }, { label: "Days", value: "120" }],
      },
      ctaTitle: "Want the UK's No.1 Facebook Ads Agency to scale Meta profitably?",
      impactStats: [
        { value: "3.2×", label: "Avg ROAS" },
        { value: "-50%", label: "CAC reduction" },
        { value: "+410%", label: "Monthly revenue" },
      ],
      metricBars: [
        { label: "ROAS", before: 1.4, after: 3.2, unit: "×", description: "Revenue ÷ Meta ad spend." },
        { label: "CAC", before: 72, after: 36, unit: "£", description: "Cost per acquired customer on Meta." },
        { label: "CTR", before: 0.8, after: 2.3, unit: "%", description: "Click-through rate on cold creatives." },
        { label: "Monthly ad revenue", before: 18, after: 92, unit: "£k", description: "Top-line Meta-attributed revenue." },
      ],
      faqs: FAQ_LIST,
      relatedServices: [
        { to: "/services/paid-ads", title: "All Paid Ads Services", body: "Meta + Google + TikTok + YouTube — one revenue P&L." },
        { to: "/services/performance-marketing/instagram-ads", title: "Instagram Ads", body: "Reels & Stories inside the same Meta account." },
        { to: "/services/seo", title: "Ecommerce SEO Agency UK", body: "Compound Meta demand with organic search coverage." },
        { to: "/services/cro", title: "Conversion Rate Optimisation", body: "Where Meta traffic actually turns into revenue." },
        { to: "/services/creative", title: "Creative Production", body: "UGC, motion and statics — 3 batches/week." },
        { to: "/pricing", title: "Pricing & Packages", body: "Transparent monthly retainers." },
        { to: "/audit", title: "Free Facebook Ads Audit", body: "Book a free 30-min audit of your Meta account and tracking." },
        { to: "/case-studies", title: "Meta Ads Case Studies", body: "Real Shopify & Woo brands scaled by our Ecommerce Growth Agency." },
      ],
    }} />
  ),
});
