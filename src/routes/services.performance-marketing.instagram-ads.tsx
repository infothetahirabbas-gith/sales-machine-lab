import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-performance-marketing.jpg?format=webp&quality=56&w=640";

const FAQ_LIST: FAQ[] = [
  { q: "Are Instagram ads different from Facebook ads?", a: "Same Meta Ads Manager, but different creative rules. Reels, Stories and feed-native content dramatically outperform repurposed Facebook assets." },
  { q: "What ad formats work best on Instagram?", a: "Reels first, then Stories, then feed. Static single-image ads are dead on IG in 2026 - motion and creator content dominate." },
  { q: "Do I need influencers to run Instagram ads?", a: "Not required, but creator-style UGC outperforms brand-shot content by 2–3× on cost-per-acquisition." },
  { q: "How much do Instagram ads cost in the UK?", a: "£4–£12 CPM for cold prospecting depending on niche. Blended £3k–£30k/mo budgets are typical for scaling DTC brands." },
  { q: "Can Instagram ads scale to £100k/mo?", a: "Yes - with 15+ fresh creatives per month, ASC+ integration and Reels-first creative strategy." },
];

export const Route = createFileRoute("/services/performance-marketing/instagram-ads")({
  head: () => ({
    meta: [
      { title: "Instagram Ads Agency UK | Reels & Stories for Ecommerce | BeingEcom" },
      { name: "description", content: "Instagram Ads Agency UK. Reels-first, Stories and creator UGC ads that scale Shopify and WooCommerce brands profitably across Meta." },
      { name: "keywords", content: "Instagram Ads agency UK, Instagram Reels Ads, Stories Ads agency, Shopify Instagram Ads, ecommerce Instagram marketing, creator UGC agency, ASC+ Shopping" },
      { property: "og:title", content: "Instagram Ads Agency UK | Reels & Stories for Ecommerce | BeingEcom" },
      { property: "og:description", content: "Instagram Ads Agency UK. Reels-first, Stories and creator UGC ads that scale Shopify and WooCommerce brands profitably across Meta." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/instagram-ads" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://beingecom.com/services/performance-marketing/instagram-ads" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/instagram-ads", name: "Instagram Ads", description: "Instagram Ads for ecommerce - Reels, Stories, creator UGC and ASC+ scaling." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "Instagram Ads", path: "/services/performance-marketing/instagram-ads" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing/instagram-ads")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "instagram-ads",
      eyebrow: "Instagram Ads",
      heroImage: heroImg,
      heroTitle: "Instagram Ads agency UK - scroll-stopping Reels that convert.",
      heroSub: "Reels-first creative, Stories placements and Advantage+ Shopping scaling for Shopify and DTC brands - engineered for profitable Instagram ROAS.",
      problemTitle: "Why most Instagram accounts stall.",
      problemBullets: [
        "Static feed ads in a Reels-native world.",
        "Facebook creatives cross-posted without IG-native reformat.",
        "Zero Stories or Reels ads - leaving the highest-intent placements empty.",
      ],
      whatIsTitle: "Instagram is a creative-native platform.",
      whatIsBody: "You don't win on IG with better targeting - you win with creative that feels native. Reels-first, creator UGC, 9:16, sound-on. Everything else is a discount coupon.",
      systemTitle: "Our Instagram Ads system.",
      systemSteps: [
        { title: "Placement audit", body: "Reels, Stories, feed, Explore - placement split by CPA + ROAS." },
        { title: "Reels creative engine", body: "Weekly batches of vertical 9:16 creator content." },
        { title: "ASC+ & manual scale", body: "ASC+ for cold, manual CBOs for angle testing." },
        { title: "Retargeting & DPA", body: "Story-native DPA and product tag retargeting." },
      ],
      pillarsTitle: "What we run on Instagram.",
      pillars: [
        { title: "Reels ads", body: "9:16 creator-led motion - highest CTR placement." },
        { title: "Stories ads", body: "Native 9:16 with sticker CTAs and swipe-up." },
        { title: "ASC+ Shopping", body: "Meta AI prospecting integrated with IG placements." },
        { title: "Creator UGC", body: "Whitelisted creator ads at scale." },
      ],
      deepBlocks: [
        { title: "Reels-first creative", body: "9:16 vertical, sound-on, hook in 1.5s, native to the feed.", tags: ["Reels","9:16","Hook"] },
        { title: "Stories ads", body: "Poll/sticker interactivity, swipe-up flow, high-intent placement.", tags: ["Stories","Stickers","Swipe"] },
        { title: "Creator whitelisting", body: "Ads served from creator handles for social proof + trust.", tags: ["Whitelisting","Creator","Social proof"] },
        { title: "IG-native DPA", body: "Dynamic product ads styled for Reels/Stories, not desktop feed.", tags: ["DPA","Stories","Reels"] },
      ],
      triggersTitle: "IG creative angles that scale.",
      triggers: ["Reels hooks","Creator try-on","GRWM","Before/after","Founder POV","Native testimonial","Trending audio","Comparison"],
      beforeAfter: {
        before: ["1.6× ROAS","Feed-only, static ads","£58 CAC","Stuck at £22K/mo"],
        after: ["3.4× ROAS","Reels + Stories dominant","£28 CAC","£110K/mo profitable"],
      },
      caseStudy: {
        title: "Fashion DTC: £22K → £110K/mo on IG",
        problem: "Static feed ads, no Reels, no creator content.",
        strategy: "Weekly creator Reels batches, Stories with polls, ASC+ integration.",
        result: "£110K MRR at 3.4× ROAS, CAC halved in 90 days.",
        metrics: [{ label: "MRR", value: "£110K" }, { label: "ROAS", value: "3.4×" }, { label: "Days", value: "90" }],
      },
      ctaTitle: "Want Instagram to actually scale profitably?",
      impactStats: [
        { value: "3.4×", label: "Avg ROAS" },
        { value: "-52%", label: "CAC reduction" },
        { value: "+400%", label: "Monthly revenue" },
      ],
      metricBars: [
        { label: "ROAS", before: 1.6, after: 3.4, unit: "×", description: "Revenue ÷ IG ad spend." },
        { label: "CAC", before: 58, after: 28, unit: "£", description: "Cost per acquired customer on IG." },
        { label: "Hook-rate (3s)", before: 12, after: 32, unit: "%", description: "3-second video view rate on Reels." },
        { label: "Monthly ad revenue", before: 22, after: 110, unit: "£k", description: "Top-line IG-attributed revenue." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
