import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-performance-marketing.jpg?format=webp&quality=56&w=640";

const FAQ_LIST: FAQ[] = [
  { q: "Does TikTok actually work for ecommerce?", a: "Yes, if your product is visual and the creative looks native. Polished brand ads die; creator UGC scales. Every serious Ecommerce Marketing Agency UK now runs TikTok alongside Meta and Google." },
  { q: "What's the minimum spend on TikTok ads?", a: "£2-3k/mo for a real test across 6-8 creatives. Below that, you'll never see daylight." },
  { q: "Spark Ads vs in-feed - what's the difference?", a: "Spark Ads run from a real creator handle and earn 1.4-2× CTR. Our Ecommerce Agency UK team uses Spark whenever the creator allows it." },
  { q: "How fast does creative fatigue hit on TikTok?", a: "Fast - usually 7-10 days at meaningful spend. Weekly creator drops are non-negotiable." },
  { q: "Do you handle creator sourcing?", a: "Yes - full UGC pipeline: casting, briefs, shipping, footage review and editing." },
  { q: "What ROAS is realistic on TikTok?", a: "1.8-3.2× typical, 4×+ on breakout products. TikTok is usually a top-funnel channel that lifts branded search - which is why our in-house SEO team measures it against MER, not platform ROAS." },
  { q: "TikTok Ads vs Meta Ads - which converts better?", a: "Meta wins for direct conversion. TikTok wins for demand creation and viral scale. A real Ecommerce Growth Agency runs both to compound each other." },
  { q: "Does TikTok work for older audiences?", a: "Yes - TikTok's 35-54 audience has grown fastest. It's no longer just a Gen-Z platform." },
  { q: "Do you set up TikTok Pixel and Events 2.0?", a: "Yes - Events 2.0, deduplication, EMQ tuning and server-side where the stack allows. Signal quality is now the difference between profit and loss on TikTok." },
  { q: "Can you run TikTok Shop for us?", a: "Yes - TikTok Shop setup, catalogue sync, LIVE Shopping and creator affiliate programme management for Shopify and Woo stores." },
  { q: "How many creatives do I need per week on TikTok?", a: "3-5 fresh concepts per week, each with 3-5 hook variants. That's the minimum for sustained scale." },
  { q: "What content styles work best on TikTok Ads?", a: "POV, day-in-the-life, unboxing, problem/solution and native reviews. Anything that looks like an ad dies in 3 seconds." },
  { q: "How fast can TikTok Ads see results?", a: "7-14 days to hit stable performance once creative velocity is running. Real scale usually within 30-45 days." },
  { q: "Can TikTok Ads scale to £100k/mo?", a: "Yes - with 15+ fresh creator concepts per month, Spark Ads whitelisting and disciplined creative kill rules." },
  { q: "What tools do you use?", a: "TikTok Ads Manager, Motion, Foreplay, Triple Whale for attribution and Looker Studio dashboards you can log into." },
  { q: "How is BeingEcom different from other TikTok agencies?", a: "We're a specialist Ecommerce Marketing Agency UK with an in-house UGC production and creator pipeline - not a media-buying reseller." },
];

export const Route = createFileRoute("/services/performance-marketing/tiktok-ads")({
  head: () => ({
    meta: [
      { title: "No.1 TikTok Ads Agency UK | Spark Ads, TikTok Shop & UGC | BeingEcom" },
      { name: "description", content: "Specialist TikTok Ads Agency UK. As a specialist Ecommerce Marketing Agency UK we run native TikTok creative, Spark Ads and TikTok Shop that scale Shopify and WooCommerce brands profitably." },
      { name: "keywords", content: "TikTok Ads agency UK, Ecommerce Marketing Agency UK, Ecommerce Agency UK, Ecommerce Growth Agency, Spark Ads agency, TikTok Shop agency, Shopify TikTok Ads, creator UGC agency" },
      { property: "og:title", content: "No.1 TikTok Ads Agency UK | Spark Ads & TikTok Shop | BeingEcom" },
      { property: "og:description", content: "Specialist Ecommerce Agency UK for TikTok Ads. Native TikTok creative, Spark Ads and TikTok Shop for Shopify and WooCommerce brands." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/tiktok-ads" },
    ],
    links: [
      { rel: "canonical", href: "https://beingecom.com/services/performance-marketing/tiktok-ads" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/tiktok-ads", name: "TikTok Ads Agency UK", description: "Creator UGC, Spark Ads and hook-first scripting for Shopify & WooCommerce brands." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "TikTok Ads", path: "/services/performance-marketing/tiktok-ads" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing/tiktok-ads")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "tiktok-ads",
      eyebrow: "TikTok Ads",
      heroImage: heroImg,
      heroTitle: "No.1 TikTok Ads Agency UK - content-native ads that convert.",
      heroSub: "The specialist Ecommerce Marketing Agency UK for creator-led UGC, Spark Ads and hook-first scripting - native virality that drives real Shopify and DTC sales.",
      problemTitle: "Why most TikTok accounts flop.",
      problemBullets: [
        "Repurposing Meta creative - dies in 3 seconds.",
        "No creator pipeline, no native voice.",
        "Optimising for views instead of purchases.",
      ],
      whatIsTitle: "TikTok rewards native creative.",
      whatIsBody: "Hooks win the first 1.5 seconds. As a specialist Ecommerce Growth Agency we script for scroll, brief creators and structure Spark Ads so winners scale fast - then measure lift with our in-house SEO team via branded-search uplift, not just platform ROAS.",
      systemTitle: "Our TikTok Ads system.",
      systemSteps: [
        { title: "Pixel & events audit", body: "Events 2.0, deduplication, attribution settings." },
        { title: "Creator pipeline", body: "Sourcing, briefs, scripts, weekly UGC delivery." },
        { title: "Spark Ads scaling", body: "Whitelisted creator handles, organic boost." },
        { title: "Hook iteration", body: "Hook variant testing, kill rules, winner scale." },
      ],
      pillarsTitle: "What we run inside TikTok.",
      pillars: [
        { title: "Spark Ads", body: "Whitelist creator posts for native authority." },
        { title: "UGC scripting", body: "Hook-first scripts written for the algorithm." },
        { title: "Hook testing", body: "5+ hook variants per concept, weekly cycles." },
        { title: "Retargeting", body: "VV/VV2 audiences, web visitors, ATC layers." },
      ],
      deepBlocks: [
        { title: "Creator sourcing", body: "Vetted creator network with niche + format match.", tags: ["Creators","UGC","Briefs"] },
        { title: "Hook framework", body: "Pattern interrupts, problem-stack, demo cold-open.", tags: ["Hooks","Scripts","Scroll-stop"] },
        { title: "Spark Ads", body: "Whitelisted handles, organic + paid amplification.", tags: ["Spark","Whitelist","Authority"] },
        { title: "Events 2.0", body: "Web events, deduplication, attribution alignment.", tags: ["Pixel","Events 2.0","CAPI"] },
      ],
      triggersTitle: "Hooks that win on TikTok.",
      triggers: ["POV","Pattern interrupt","Problem stack","Demo cold-open","Stitch / duet","Voiceover reveal","Caption hook","Founder POV"],
      comparison: {
        rows: [
          { criterion: "Buyer intent", us: "Low (native discovery)", agency: "High (active search)", inhouse: "Low-Med (interruption)" },
          { criterion: "Typical ROAS", us: "1.8-3×", agency: "3.5-6×", inhouse: "2.5-3.5×" },
          { criterion: "Best funnel stage", us: "TOF demand creation", agency: "BOF harvest", inhouse: "TOF + MOF prospecting" },
          { criterion: "Creative volume", us: "15-25/mo creator UGC", agency: "Low (feed + RSA)", inhouse: "10-20/mo mixed" },
          { criterion: "Min viable spend", us: "£2-3k/mo", agency: "£3k/mo", inhouse: "£3-5k/mo" },
          { criterion: "Best for", us: "Viral / visual products", agency: "Established SKUs", inhouse: "Broad DTC" },
        ],
      },
      mistakes: [
        { title: "Uploading Meta creative", body: "TikTok algorithm sniffs it out. Ship native-feeling, sound-on, unpolished creator UGC." },
        { title: "One hook per concept", body: "Every concept needs 5+ hook variants. Hook decides everything." },
        { title: "Ignoring Spark Ads", body: "Spark Ads earn 1.4-2× CTR of manual uploads. Always negotiate whitelisting rights." },
        { title: "Optimising for views not purchases", body: "TikTok Ads Manager loves view-based objectives. Optimise for Complete Payment from day one." },
        { title: "Killing ads too early", body: "TikTok's learning is slower than Meta. Give a concept 3-5 days and £150+ spend before judging." },
      ],
      beforeAfter: {
        before: ["0.9× ROAS","Repurposed Meta clips","£90 CAC","Spend cut after 30 days"],
        after: ["2.8× ROAS","Native creator UGC","£34 CAC","£48K/mo at stable ROAS"],
      },
      caseStudy: {
        title: "Gadget brand: 0 → £48K/mo on TikTok in 90 days",
        problem: "Cold launch on TikTok, no creator pipeline.",
        strategy: "10 creator UGC concepts, Spark Ads scaling, hook iteration.",
        result: "£48K MRR at 2.8× ROAS in 90 days.",
        metrics: [{ label: "MRR", value: "£48K" }, { label: "ROAS", value: "2.8×" }, { label: "Days", value: "90" }],
      },
      ctaTitle: "Want the UK's No.1 TikTok Ads Agency running your account?",
      impactStats: [
        { value: "2.8×", label: "Avg ROAS" },
        { value: "-62%", label: "CAC reduction" },
        { value: "+380%", label: "Monthly revenue" },
      ],
      metricBars: [
        { label: "ROAS", before: 0.9, after: 2.8, unit: "×", description: "Revenue ÷ TikTok ad spend." },
        { label: "CAC", before: 90, after: 34, unit: "£", description: "Cost per acquired customer on TikTok." },
        { label: "Hook rate", before: 12, after: 32, unit: "%", description: "% of viewers past 3 seconds." },
        { label: "Monthly ad revenue", before: 8, after: 48, unit: "£k", description: "Top-line TikTok-attributed revenue." },
      ],
      faqs: FAQ_LIST,
      relatedServices: [
        { to: "/services/performance-marketing", title: "All Paid Ads Services", body: "Meta + Google + TikTok + YouTube - one revenue P&L." },
        { to: "/services/performance-marketing/facebook-ads", title: "Facebook Ads", body: "Meta demand-creation to pair with TikTok virality." },
        { to: "/services/seo", title: "Ecommerce SEO", body: "Convert branded search lift from TikTok into organic revenue." },
        { to: "/services/creative", title: "Creative Production", body: "UGC and creator video - 3 batches/week." },
        { to: "/services/cro", title: "Conversion Rate Optimisation", body: "Where TikTok traffic turns into revenue." },
        { to: "/pricing", title: "Pricing & Packages", body: "Transparent monthly retainers." },
        { to: "/audit", title: "Free TikTok Ads Audit", body: "Book a free 30-min audit of your account and creative." },
        { to: "/case-studies", title: "TikTok Ads Case Studies", body: "Real Shopify & Woo brands scaled on TikTok." },
      ],
    }} />
  ),
});
