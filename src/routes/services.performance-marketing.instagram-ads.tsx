import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-performance-marketing.jpg?format=webp&quality=56&w=640";

const FAQ_LIST: FAQ[] = [
  { q: "Are Instagram ads different from Facebook ads?", a: "Same Meta Ads Manager, but different creative rules. Reels, Stories and feed-native content dramatically outperform repurposed Facebook assets. A specialist Ecommerce Marketing Agency UK will always produce IG-native versions, never cross-post." },
  { q: "What ad formats work best on Instagram in 2026?", a: "Reels first, then Stories, then feed. Static single-image ads are dead - motion and creator content dominate." },
  { q: "Do I need influencers to run Instagram ads?", a: "Not required, but creator-style UGC outperforms brand-shot content by 2-3× on cost-per-acquisition." },
  { q: "How much do Instagram ads cost in the UK?", a: "£4-£12 CPM for cold prospecting depending on niche. Blended £3k-£30k/mo budgets are typical for scaling DTC brands." },
  { q: "Can Instagram ads scale to £100k/mo?", a: "Yes - with 15+ fresh creatives per month, ASC+ integration and Reels-first creative strategy, our Ecommerce Growth Agency clients regularly cross £100k/mo IG-attributed revenue." },
  { q: "Instagram Ads vs TikTok Ads - which should I run first?", a: "If your creative library is polished, start Instagram. If your product is visual/native-first, TikTok will scale faster. Most Ecommerce Agency UK clients run both." },
  { q: "How is Instagram Ads ROAS measured?", a: "Blended MER + Meta reported ROAS + post-purchase surveys. Platform ROAS alone is misleading with iOS signal loss." },
  { q: "Do you set up Instagram Shopping and product tags?", a: "Yes - Shopping tags in Reels, Stories and feed, plus catalogue sync via Shopify Meta channel or Woo Meta plugin." },
  { q: "What's the difference between Reels ads and Stories ads?", a: "Reels ads sit in the discovery feed (top-of-funnel scale); Stories ads are consumed by existing followers or lookalikes (high intent, faster action)." },
  { q: "How often should Instagram creative be refreshed?", a: "Every 7-14 days at meaningful spend. Fatigue is faster on IG than Facebook because the feed is smaller." },
  { q: "Do Instagram ads work for older audiences?", a: "Yes - 35-54 is now IG's fastest-growing cohort. Match creative to audience style, not stereotype." },
  { q: "Can Instagram drive branded search?", a: "Yes - this is why our in-house SEO team measures branded impression lift alongside platform ROAS to capture the real halo effect." },
  { q: "Do you handle Reels editing and creator briefs?", a: "Yes - in-house UGC editing, creator sourcing, briefs, shipping and footage review." },
  { q: "What ROAS should I expect on IG?", a: "2.5-3.5× blended ROAS is healthy. 4×+ is exceptional and usually indicates strong branded-search halo." },
  { q: "What tools do you use for Instagram Ads?", a: "Meta Ads Manager, Motion, Foreplay, Triple Whale for attribution and Looker Studio dashboards." },
  { q: "How is BeingEcom different from other Instagram Ads agencies?", a: "We're a full-stack Ecommerce Marketing Agency UK, not a creative shop. Media buying, creative, SEO and CRO share one revenue P&L per client." },
];

export const Route = createFileRoute("/services/performance-marketing/instagram-ads")({
  head: () => ({
    meta: [
      { title: "No.1 Instagram Ads Agency UK | Reels & Stories for Ecommerce | BeingEcom" },
      { name: "description", content: "Specialist Instagram Ads Agency UK. As a specialist Ecommerce Marketing Agency UK we run Reels-first, Stories and creator UGC ads that scale Shopify and WooCommerce brands profitably." },
      { name: "keywords", content: "Instagram Ads agency UK, Ecommerce Marketing Agency UK, Ecommerce Agency UK, Ecommerce Growth Agency, Instagram Reels Ads, Stories Ads agency, Shopify Instagram Ads, creator UGC agency" },
      { property: "og:title", content: "No.1 Instagram Ads Agency UK | Reels & Stories for Ecommerce | BeingEcom" },
      { property: "og:description", content: "Specialist Ecommerce Agency UK for Instagram. Reels, Stories and creator UGC that scale Shopify and WooCommerce brands profitably." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/instagram-ads" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://beingecom.com/services/performance-marketing/instagram-ads" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/instagram-ads", name: "Instagram Ads Agency UK", description: "Instagram Ads for ecommerce - Reels, Stories, creator UGC and ASC+ scaling." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "Instagram Ads", path: "/services/performance-marketing/instagram-ads" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing/instagram-ads")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "instagram-ads",
      eyebrow: "Instagram Ads",
      heroImage: heroImg,
      heroTitle: "No.1 Instagram Ads Agency UK - scroll-stopping Reels that convert.",
      heroSub: "The specialist Ecommerce Marketing Agency UK for Reels-first creative, Stories placements and Advantage+ Shopping scaling - engineered for profitable Instagram ROAS on Shopify and DTC brands.",
      problemTitle: "Why most Instagram accounts stall.",
      problemBullets: [
        "Static feed ads in a Reels-native world.",
        "Facebook creatives cross-posted without IG-native reformat.",
        "Zero Stories or Reels ads - leaving the highest-intent placements empty.",
      ],
      whatIsTitle: "Instagram is a creative-native platform.",
      whatIsBody: "You don't win on IG with better targeting - you win with creative that feels native. As a specialist Ecommerce Growth Agency we ship Reels-first, creator UGC, 9:16, sound-on - and layer in our in-house SEO team to capture the branded-search halo IG creates.",
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
      comparison: {
        rows: [
          { criterion: "Format", us: "Reels + Stories 9:16", agency: "Search + Shopping feed", inhouse: "Native 9:16 UGC" },
          { criterion: "Typical ROAS", us: "2.5-3.5×", agency: "3.5-6×", inhouse: "1.8-3×" },
          { criterion: "Buyer intent", us: "Low-Med", agency: "High", inhouse: "Low" },
          { criterion: "Creative refresh", us: "Every 7-14 days", agency: "Every 4-6 weeks", inhouse: "Every 7-10 days" },
          { criterion: "Best for", us: "Fashion, beauty, lifestyle", agency: "Considered / catalogue products", inhouse: "Viral / Gen-Z products" },
          { criterion: "Min viable spend", us: "£3-5k/mo", agency: "£3k/mo", inhouse: "£2-3k/mo" },
        ],
      },
      mistakes: [
        { title: "Cross-posting Facebook creative", body: "Print-style images in a Reels feed = scroll past. Produce IG-native from day one." },
        { title: "Ignoring Stories", body: "Stories has some of the highest-intent placement. Skipping it costs you 15-25% of profitable spend." },
        { title: "No creator whitelisting", body: "Ads served from a creator handle earn 1.5-2× CTR vs brand handle." },
        { title: "Refreshing quarterly", body: "IG creative fatigues in 7-14 days at scale. Weekly drops are the minimum cadence." },
        { title: "Optimising for engagement not purchases", body: "Likes don't pay wages. Optimise for Complete Payment, always." },
      ],
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
      ctaTitle: "Want the UK's No.1 Instagram Ads Agency scaling your Reels?",
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
      relatedServices: [
        { to: "/services/paid-ads", title: "All Paid Ads Services", body: "Meta + Google + TikTok + YouTube - one revenue P&L." },
        { to: "/services/performance-marketing/facebook-ads", title: "Facebook Ads", body: "Same Meta stack, broader placements." },
        { to: "/services/seo", title: "Ecommerce SEO", body: "Capture the branded-search halo IG creates." },
        { to: "/services/cro", title: "Conversion Rate Optimisation", body: "Where IG traffic turns into revenue." },
        { to: "/services/creative", title: "Creative Production", body: "Reels-native UGC - 3 batches/week." },
        { to: "/pricing", title: "Pricing & Packages", body: "Transparent monthly retainers." },
        { to: "/audit", title: "Free Instagram Ads Audit", body: "Book a free 30-min audit of your IG account and creative." },
        { to: "/case-studies", title: "Instagram Ads Case Studies", body: "Real Shopify & Woo brands scaled on Instagram." },
      ],
    }} />
  ),
});
