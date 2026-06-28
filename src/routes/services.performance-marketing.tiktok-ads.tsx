import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd } from "../lib/seo";

export const Route = createFileRoute("/services/performance-marketing/tiktok-ads")({
  head: () => ({
    meta: [
      { title: "TikTok Ads Agency UK — UGC, Spark Ads & Creator Media | BeingEcom" },
      { name: "description", content: "UK TikTok Ads agency. Creator-led UGC, Spark Ads and hook-first scripting that drives top-funnel virality and profitable ecommerce sales." },
      { name: "keywords", content: "tiktok ads agency uk, tiktok shop ads, spark ads agency, ugc ads agency, creator media buying, tiktok ecommerce" },
      { property: "og:title", content: "TikTok Ads Agency UK | BeingEcom" },
      { property: "og:description", content: "Creator UGC and Spark Ads that scale top-funnel virality into real revenue." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/tiktok-ads" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/performance-marketing/tiktok-ads" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/tiktok-ads", name: "TikTok Ads", description: "Creator UGC, Spark Ads and hook-first scripting for ecommerce." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "TikTok Ads", path: "/services/performance-marketing/tiktok-ads" }])) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "tiktok-ads",
      eyebrow: "TikTok Ads",
      heroTitle: "TikTok ads that look like content, not ads.",
      heroSub: "Creator-led UGC, Spark Ads and hook-first scripting — native virality that drives real ecommerce sales.",
      problemTitle: "Why most TikTok accounts flop.",
      problemBullets: [
        "Repurposing Meta creative — dies in 3 seconds.",
        "No creator pipeline, no native voice.",
        "Optimising for views instead of purchases.",
      ],
      whatIsTitle: "TikTok rewards native creative.",
      whatIsBody: "Hooks win the first 1.5 seconds. We script for scroll, brief creators, and structure Spark Ads so winners scale fast — and losers die faster.",
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
    }} />
  ),
});
