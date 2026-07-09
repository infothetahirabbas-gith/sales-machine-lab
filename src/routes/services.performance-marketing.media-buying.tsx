import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-performance-marketing.jpg";

const FAQ_LIST: FAQ[] = [
  {
    "q": "What does an ecommerce media buyer actually do?",
    "a": "Owns spend allocation across Meta, Google and TikTok, balances ROAS vs MER, controls creative testing budgets, and protects margin as you scale."
  },
  {
    "q": "How is media buying different from running ads?",
    "a": "Running ads is tactical. Media buying is strategic — channel mix, daypart, audience, creative refresh, and scaling math under one P&L view."
  },
  {
    "q": "How do you decide channel mix?",
    "a": "Margin, AOV, audience and creative supply. We rebalance weekly based on MER, not platform ROAS."
  },
  {
    "q": "What dashboards do I get?",
    "a": "Daily blended MER, contribution margin, new-customer CAC and creative-level performance — usually in Triple Whale, Hyros or a custom Looker dashboard."
  },
  {
    "q": "Is this a fixed retainer or % of spend?",
    "a": "Hybrid — fixed retainer up to a spend threshold, then a small % of spend above it. Aligns incentives without billing surprises."
  }
];

export const Route = createFileRoute("/services/performance-marketing/media-buying")({
  head: () => ({
    meta: [
      { title: "Media Buying Agency UK — Cross-Channel Ecommerce Media Buyers | BeingEcom" },
      { name: "description", content: "Cross-channel media buying agency in the UK. Blended ROAS, MER targets and full-funnel planning across Meta, Google, TikTok and programmatic for ecommerce." },
      { property: "og:title", content: "Media Buying Agency UK — Cross-Channel Ecommerce Media Buyers | BeingEcom" },
      { property: "og:description", content: "Cross-channel media buying agency in the UK. Blended ROAS, MER targets and full-funnel planning across Meta, Google, TikTok and programmatic for ecommerce." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/media-buying" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/performance-marketing/media-buying" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/media-buying", name: "Media Buying", description: "Cross-channel media buying across Meta, Google and TikTok for ecommerce." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "Media Buying", path: "/services/performance-marketing/media-buying" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing/media-buying")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "media-buying",
      eyebrow: "Media Buying",
      heroImage: heroImg,
      heroTitle: "Cross-channel media buying engineered for blended ROAS.",
      heroSub: "Meta, Google and TikTok run as one P&L — MER targets, full-funnel allocation and weekly capital reallocation.",
      problemTitle: "Why single-channel buyers cap your scale.",
      problemBullets: [
        "Optimising per-channel ROAS instead of blended MER.",
        "No cross-channel attribution — double-counting revenue.",
        "Budgets stuck where last quarter worked.",
      ],
      whatIsTitle: "Media buying is capital allocation.",
      whatIsBody: "Every channel earns or loses its budget weekly. We manage Meta, Google and TikTok as one portfolio against MER, incrementality and contribution margin — not vanity per-channel ROAS.",
      systemTitle: "Our media buying system.",
      systemSteps: [
        { title: "Portfolio audit", body: "Channel mix, MER baseline, attribution sanity." },
        { title: "Funnel mapping", body: "TOF/MOF/BOF split, channel role, budget bands." },
        { title: "Weekly reallocation", body: "Capital flows to highest marginal MER." },
        { title: "Incrementality testing", body: "Geo holdouts, conversion lift, brand defence audits." },
      ],
      pillarsTitle: "How we manage the portfolio.",
      pillars: [
        { title: "Blended MER", body: "Revenue ÷ total spend — the only number that matters." },
        { title: "Contribution margin", body: "After COGS + shipping + fees, not just ROAS." },
        { title: "Incrementality", body: "Geo holdouts and lift studies, not platform ROAS." },
        { title: "Capital reallocation", body: "Weekly budget shifts to highest marginal return." },
      ],
      deepBlocks: [
        { title: "MER framework", body: "Set MER target from contribution margin, payback window and LTV.", tags: ["MER","CM","LTV"] },
        { title: "Channel roles", body: "TikTok = demand creation, Meta = scale, Google = harvest.", tags: ["TOF","MOF","BOF"] },
        { title: "Attribution stack", body: "GA4 + platform + post-purchase survey triangulation.", tags: ["GA4","Survey","Triangulation"] },
        { title: "Incrementality tests", body: "Geo holdouts, conversion lift, brand-spend pauses.", tags: ["Geo","Lift","Holdout"] },
      ],
      triggersTitle: "Levers a real media buyer pulls.",
      triggers: ["MER target","Contribution margin","Geo holdout","Brand defence audit","Payback window","Channel role","Budget bands","Incrementality"],
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
      ctaTitle: "Want a media buyer who manages a P&L, not a dashboard?",
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
    }} />
  ),
});
