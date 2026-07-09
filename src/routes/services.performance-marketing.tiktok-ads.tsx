import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-performance-marketing.jpg";

const FAQ_LIST: FAQ[] = [
  {
    "q": "Does TikTok actually work for ecommerce?",
    "a": "Yes, if your product is visual and the creative looks native. Polished brand ads die; creator UGC scales."
  },
  {
    "q": "What's the minimum spend on TikTok ads?",
    "a": "£2–3k/mo for a real test across 6–8 creatives. Below that, you'll never see daylight."
  },
  {
    "q": "Spark Ads vs in-feed - what's the difference?",
    "a": "Spark Ads run from a real creator handle and earn 1.4–2× CTR. We use Spark whenever the creator allows it."
  },
  {
    "q": "How fast does creative fatigue hit on TikTok?",
    "a": "Fast - usually 7–10 days at meaningful spend. Weekly creator drops are non-negotiable."
  },
  {
    "q": "Do you handle creator sourcing?",
    "a": "Yes - full UGC pipeline: casting, briefs, shipping, footage review and editing."
  }
];

export const Route = createFileRoute("/services/performance-marketing/tiktok-ads")({
  head: () => ({
    meta: [
      { title: "TikTok Ads Agency UK - Spark Ads, Creator UGC & TikTok Shop for Ecommerce | BeingEcom" },
      { name: "description", content: "Best TikTok Ads agency UK for Shopify and DTC ecommerce brands. Creator-led UGC, Spark Ads, TikTok Shop and hook-first scripting that turn TikTok into a profitable revenue channel." },
      { name: "keywords", content: "TikTok Ads agency UK, TikTok Ads management UK, Spark Ads agency, TikTok Shop agency, ecommerce TikTok Ads, Shopify TikTok Ads, creator UGC agency" },
      { property: "og:title", content: "TikTok Ads Agency UK - Spark Ads, Creator UGC & TikTok Shop | BeingEcom" },
      { property: "og:description", content: "UK TikTok Ads agency for Shopify and DTC brands. Creator-led UGC, Spark Ads and hook-first scripting that turn TikTok into a profitable revenue channel." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/tiktok-ads" },
    ],
    links: [
      { rel: "canonical", href: "https://beingecom.com/services/performance-marketing/tiktok-ads" },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/tiktok-ads", name: "TikTok Ads", description: "Creator UGC, Spark Ads and hook-first scripting for ecommerce." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "TikTok Ads", path: "/services/performance-marketing/tiktok-ads" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing/tiktok-ads")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "tiktok-ads",
      eyebrow: "TikTok Ads",
      heroImage: heroImg,
      heroTitle: "TikTok Ads agency UK - content-native ads that convert.",
      heroSub: "Creator-led UGC, Spark Ads and hook-first scripting for Shopify and DTC brands - native virality that drives real ecommerce sales.",
      problemTitle: "Why most TikTok accounts flop.",
      problemBullets: [
        "Repurposing Meta creative - dies in 3 seconds.",
        "No creator pipeline, no native voice.",
        "Optimising for views instead of purchases.",
      ],
      whatIsTitle: "TikTok rewards native creative.",
      whatIsBody: "Hooks win the first 1.5 seconds. We script for scroll, brief creators, and structure Spark Ads so winners scale fast - and losers die faster.",
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
      ctaTitle: "Want TikTok to be a real revenue channel?",
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
    }} />
  ),
});
