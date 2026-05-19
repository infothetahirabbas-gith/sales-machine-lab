import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Megaphone, Search, MousePointerClick, TrendingUp, ArrowUpRight, X } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, CTA } from "../components/site/Section";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies - BeingEcom Ecommerce Growth Results" },
      { name: "description", content: "40+ real ecommerce growth case studies across Ads, SEO and CRO. Revenue, ROAS and conversion lifts." },
    ],
  }),
  component: CaseStudies,
});

type Category = "Ads" | "SEO" | "CRO";

type Study = {
  id: string;
  title: string;
  brand: string;
  industry: string;
  category: Category;
  metric: string;
  metricLabel: string;
  duration: string;
  color: string;
  chart: number[];
  problem: string;
  strategy: string[];
  results: { v: string; l: string }[];
  takeaway: string;
};

const gradients = [
  "from-[oklch(0.7_0.16_245)] to-[oklch(0.55_0.2_265)]",
  "from-[oklch(0.72_0.15_330)] to-[oklch(0.55_0.2_320)]",
  "from-[oklch(0.72_0.15_160)] to-[oklch(0.5_0.18_160)]",
  "from-[oklch(0.7_0.16_30)] to-[oklch(0.55_0.2_25)]",
  "from-[oklch(0.72_0.15_60)] to-[oklch(0.55_0.18_50)]",
  "from-[oklch(0.7_0.16_270)] to-[oklch(0.5_0.2_290)]",
];

const rng = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const makeChart = (seed: number, growth = 1.6) => {
  const r = rng(seed);
  const arr: number[] = [];
  let v = 20 + r() * 20;
  for (let i = 0; i < 12; i++) {
    v += (r() - 0.3) * 8 + growth;
    arr.push(Math.max(8, v));
  }
  return arr;
};

const RAW: Omit<Study, "color" | "chart">[] = [
  // ADS (15)
  { id: "a1", title: "Apparel brand: $18K → $214K/mo in 6 months", brand: "Northwind Apparel", industry: "Shopify · Apparel", category: "Ads", metric: "11.9×", metricLabel: "Revenue", duration: "6 months", problem: "Stuck at 1.5× ROAS, no creative testing system, single audience.", strategy: ["Built a 30-creative/week production pipeline", "Restructured Meta funnel into ASC + manual retargeting", "Added TikTok Spark Ads as cold layer"], results: [{ v: "11.9×", l: "Revenue" }, { v: "3.8×", l: "ROAS" }, { v: "+285%", l: "CR" }], takeaway: "Creative volume beats audience tinkering 9 out of 10 times." },
  { id: "a2", title: "Dropshipping gadgets: 0 → $62K/mo cold launch", brand: "GearLoop", industry: "Shopify · Gadgets", category: "Ads", metric: "2.6×", metricLabel: "ROAS", duration: "90 days", problem: "Brand new store, no historical data, flat creatives.", strategy: ["UGC angle stack across 5 personas", "ASC with broad cold + lookalike layer", "Daily creative refresh on top 3 winners"], results: [{ v: "$62K", l: "MRR" }, { v: "2.6×", l: "ROAS" }, { v: "90d", l: "to scale" }], takeaway: "Speed of iteration matters more than perfection." },
  { id: "a3", title: "Footwear: cut CAC 42% while doubling spend", brand: "Stride Co.", industry: "Shopify · Footwear", category: "Ads", metric: "-42%", metricLabel: "CAC", duration: "4 months", problem: "Scaling broke unit economics, CAC bloated.", strategy: ["Consolidated 38 campaigns into 6 ASC", "Killed bottom-quartile creatives weekly", "Introduced CAPI for full attribution"], results: [{ v: "-42%", l: "CAC" }, { v: "2.1×", l: "Spend" }, { v: "+88%", l: "Revenue" }], takeaway: "Consolidation almost always beats fragmentation in 2024+ ad accounts." },
  { id: "a4", title: "Beauty DTC: 4.1× ROAS on TikTok in 60 days", brand: "Lumen Beauty", industry: "Shopify · Beauty", category: "Ads", metric: "4.1×", metricLabel: "TikTok ROAS", duration: "60 days", problem: "Meta-only, audience fatigue, no diversification.", strategy: ["Hired 4 niche creators for weekly UGC", "Spark Ads from organic-style content", "Built a 1:1 landing page per angle"], results: [{ v: "4.1×", l: "ROAS" }, { v: "+62%", l: "New customers" }, { v: "-28%", l: "CPM" }], takeaway: "TikTok rewards native-feeling content, not polished brand ads." },
  { id: "a5", title: "Pet supplies: Google PMax to $94K/mo", brand: "Pawform", industry: "Shopify · Pet", category: "Ads", metric: "$94K", metricLabel: "MRR via PMax", duration: "5 months", problem: "Search was 80% branded, no real prospecting.", strategy: ["Standard Shopping for control + PMax for scale", "Asset group per product collection", "Negative keyword pruning weekly"], results: [{ v: "$94K", l: "MRR" }, { v: "5.2×", l: "ROAS" }, { v: "+340%", l: "Non-brand" }], takeaway: "PMax works when feed quality and asset variety are dialed in." },
  { id: "a6", title: "Home goods: Meta retargeting recovered $38K", brand: "Hearthline", industry: "WooCommerce · Home", category: "Ads", metric: "$38K", metricLabel: "Recovered", duration: "30 days", problem: "Big top-funnel spend, no retargeting structure.", strategy: ["7/14/30/90 retargeting windows", "Dynamic product ads with reviews overlay", "Abandoned cart audience priority"], results: [{ v: "$38K", l: "Recovered" }, { v: "8.4×", l: "Retargeting ROAS" }, { v: "-19%", l: "Blended CAC" }], takeaway: "Most stores leave retargeting structure on Facebook defaults. Don't." },
  { id: "a7", title: "Supplements: scaled $25K → $180K/mo", brand: "VitalCore", industry: "Shopify · Supplements", category: "Ads", metric: "7.2×", metricLabel: "Spend growth", duration: "4 months", problem: "Plateaued at $25K/mo, single hero creative.", strategy: ["Tested 120 creatives in 60 days", "Bundle-focused offer structure", "Subscription upsell on checkout"], results: [{ v: "$180K", l: "MRR" }, { v: "3.1×", l: "ROAS" }, { v: "+44%", l: "AOV" }], takeaway: "Offer architecture lifts ROAS as much as creative does." },
  { id: "a8", title: "Jewelry brand: 5.6× ROAS on Black Friday", brand: "Auralune", industry: "Shopify · Jewelry", category: "Ads", metric: "5.6×", metricLabel: "BFCM ROAS", duration: "BFCM week", problem: "Last year's BFCM ROAS 1.9×, no warm audience pool.", strategy: ["90-day pre-warm campaign with content", "Tiered offer (gift, sitewide, VIP)", "SMS + ads synchronized timing"], results: [{ v: "5.6×", l: "ROAS" }, { v: "$420K", l: "BFCM rev" }, { v: "+212%", l: "vs LY" }], takeaway: "BFCM is won in October, not November." },
  { id: "a9", title: "Activewear: TikTok shop integration +$71K", brand: "Pulse Athletics", industry: "Shopify · Apparel", category: "Ads", metric: "+$71K", metricLabel: "From TikTok Shop", duration: "3 months", problem: "Massive organic on TikTok, zero monetization.", strategy: ["TikTok Shop product seeding to creators", "Affiliate program for top performers", "Boosted top-3 affiliate videos as ads"], results: [{ v: "+$71K", l: "Revenue" }, { v: "62", l: "Active affiliates" }, { v: "3.4×", l: "Affiliate ROAS" }], takeaway: "TikTok Shop is the new affiliate channel, not just an ads channel." },
  { id: "a10", title: "Coffee brand: subscription ads 3.9× LTV", brand: "Roast & Co.", industry: "Shopify · Beverage", category: "Ads", metric: "3.9×", metricLabel: "LTV", duration: "6 months", problem: "One-time purchase model, high CAC, low repeat.", strategy: ["Subscription-only ad funnel", "Free first bag offer with 2-month commit", "Cohort-based retention reporting"], results: [{ v: "3.9×", l: "LTV" }, { v: "68%", l: "Sub rate" }, { v: "-22%", l: "CAC" }], takeaway: "If LTV is the bottleneck, advertise the subscription, not the product." },
  { id: "a11", title: "Furniture: high-AOV Meta funnel to $310K/mo", brand: "Mason Living", industry: "WooCommerce · Furniture", category: "Ads", metric: "$310K", metricLabel: "MRR", duration: "5 months", problem: "$1,200 AOV, long sales cycle, weak nurture.", strategy: ["Multi-touch funnel with 21-day window", "Showroom-style video ads at TOFU", "Lead magnet for design consultations"], results: [{ v: "$310K", l: "MRR" }, { v: "4.1×", l: "ROAS" }, { v: "$1.2K", l: "AOV" }], takeaway: "High-AOV stores need longer attribution windows and more touchpoints." },
  { id: "a12", title: "Eyewear: prospecting CTR +180%", brand: "Frame & Co.", industry: "Shopify · Eyewear", category: "Ads", metric: "+180%", metricLabel: "CTR", duration: "2 months", problem: "Click-through tanking, creative fatigue across all sets.", strategy: ["Hook-first storyboards (3-sec rule)", "Pattern interrupts in first frame", "30 hooks tested per concept"], results: [{ v: "+180%", l: "CTR" }, { v: "-34%", l: "CPC" }, { v: "+71%", l: "ROAS" }], takeaway: "The first 3 seconds are 90% of ad performance." },
  { id: "a13", title: "Outdoor: 6.2× ROAS via Google Shopping", brand: "TrailGear", industry: "Shopify · Outdoor", category: "Ads", metric: "6.2×", metricLabel: "Shopping ROAS", duration: "4 months", problem: "Bad product feed, missing GTINs, low impression share.", strategy: ["Full feed audit and re-titling", "Custom labels for margin tiers", "Bid by product profitability"], results: [{ v: "6.2×", l: "ROAS" }, { v: "+85%", l: "Impressions" }, { v: "+44%", l: "Conv rate" }], takeaway: "Google Shopping is a feed game, not a campaign game." },
  { id: "a14", title: "Toys: holiday creative testing system", brand: "PlayLab", industry: "Shopify · Toys", category: "Ads", metric: "3.4×", metricLabel: "Q4 ROAS", duration: "Q4", problem: "Past Q4 burned by creative fatigue mid-November.", strategy: ["Weekly batch of 25 fresh creatives", "Killed bottom 50% every Monday", "Ran always-on hook contest with team"], results: [{ v: "3.4×", l: "ROAS" }, { v: "$540K", l: "Q4 rev" }, { v: "+91%", l: "vs LY" }], takeaway: "Q4 is a creative volume war." },
  { id: "a15", title: "Cosmetics: lookalike consolidation -38% CAC", brand: "Glow Lab", industry: "Shopify · Beauty", category: "Ads", metric: "-38%", metricLabel: "CAC", duration: "60 days", problem: "Too many overlapping lookalikes, audience cannibalization.", strategy: ["Killed all LALs, went broad with creative variants", "Used creative as targeting", "Reduced 14 ad sets to 3"], results: [{ v: "-38%", l: "CAC" }, { v: "+52%", l: "ROAS" }, { v: "+71%", l: "Reach" }], takeaway: "In Advantage+ era, creatives are the audience." },

  // SEO (12)
  { id: "s1", title: "Skincare: 0 → 84K organic visits/mo", brand: "Pure Botanica", industry: "Shopify · Skincare", category: "SEO", metric: "84K", metricLabel: "Visits/mo", duration: "9 months", problem: "Zero organic traffic, no content engine, weak product pages.", strategy: ["Topical cluster build: 120 articles", "Product page schema + reviews markup", "Internal linking framework"], results: [{ v: "84K", l: "Visits" }, { v: "1.2K", l: "Keywords" }, { v: "$31K", l: "Organic MRR" }], takeaway: "Topical authority compounds faster than backlinks for ecom." },
  { id: "s2", title: "Apparel: ranked 340 product pages page 1", brand: "Northwind Apparel", industry: "Shopify · Apparel", category: "SEO", metric: "340", metricLabel: "Page 1", duration: "12 months", problem: "Collection pages cannibalizing each other, no PDP SEO.", strategy: ["PDP template with FAQ schema", "Long-tail keyword per variant", "Programmatic SEO for 'X for Y' searches"], results: [{ v: "340", l: "Top 10" }, { v: "+412%", l: "Organic" }, { v: "$48K", l: "MRR" }], takeaway: "Programmatic SEO on ecom is underrated." },
  { id: "s3", title: "Supplements: featured snippet wins +220%", brand: "VitalCore", industry: "Shopify · Supplements", category: "SEO", metric: "+220%", metricLabel: "Featured snippets", duration: "6 months", problem: "Blog ranked but no SERP features.", strategy: ["Restructured H2s as question format", "40-60 word answer at top of each post", "Schema FAQPage on all blog posts"], results: [{ v: "+220%", l: "Snippets" }, { v: "+88%", l: "CTR" }, { v: "+52%", l: "Traffic" }], takeaway: "Format determines SERP feature wins more than authority does." },
  { id: "s4", title: "Pet brand: local SEO +14 cities ranked", brand: "Pawform", industry: "Shopify · Pet", category: "SEO", metric: "+14", metricLabel: "Cities ranked", duration: "5 months", problem: "Strong nationally, invisible in local pack.", strategy: ["City landing page template", "Local backlink outreach", "GMB optimization per region"], results: [{ v: "+14", l: "Cities" }, { v: "+62%", l: "Local rev" }, { v: "$22K", l: "Local MRR" }], takeaway: "Local SEO works for ecom when you have warehouse or pickup points." },
  { id: "s5", title: "Beauty: blog to revenue $84K attribution", brand: "Lumen Beauty", industry: "Shopify · Beauty", category: "SEO", metric: "$84K", metricLabel: "Blog rev", duration: "8 months", problem: "Blog traffic existed, but zero revenue attribution.", strategy: ["Tutorial-style content with embedded PDPs", "Email capture mid-article", "Exit-intent offers per category"], results: [{ v: "$84K", l: "Blog rev" }, { v: "12%", l: "Conv rate" }, { v: "+38%", l: "Email list" }], takeaway: "Top of funnel content needs commercial bridges, not just CTAs." },
  { id: "s6", title: "Home goods: technical SEO +180% crawl", brand: "Hearthline", industry: "WooCommerce · Home", category: "SEO", metric: "+180%", metricLabel: "Indexed pages", duration: "3 months", problem: "Only 22% of products indexed by Google.", strategy: ["Fixed canonical chains", "Removed faceted nav duplicates via robots", "XML sitemap segmented by type"], results: [{ v: "+180%", l: "Indexed" }, { v: "+94%", l: "Organic" }, { v: "+44%", l: "Revenue" }], takeaway: "Most ecom SEO problems are crawl problems, not content problems." },
  { id: "s7", title: "Jewelry: backlink campaign DR 22 → 51", brand: "Auralune", industry: "Shopify · Jewelry", category: "SEO", metric: "DR 51", metricLabel: "Domain Rating", duration: "10 months", problem: "Low authority, couldn't rank for category terms.", strategy: ["Digital PR with seasonal data studies", "HARO + Connectively outreach weekly", "Guest features in 14 niche publications"], results: [{ v: "DR 51", l: "Authority" }, { v: "+340", l: "Ref domains" }, { v: "Top 5", l: "Category KW" }], takeaway: "Earned links from PR outrank built links from outreach." },
  { id: "s8", title: "Footwear: schema markup +62% CTR", brand: "Stride Co.", industry: "Shopify · Footwear", category: "SEO", metric: "+62%", metricLabel: "Organic CTR", duration: "2 months", problem: "Page 1 rankings, anemic clicks.", strategy: ["Product schema with price + availability", "Review snippets enabled sitewide", "Breadcrumb schema for hierarchy"], results: [{ v: "+62%", l: "CTR" }, { v: "+44%", l: "Sessions" }, { v: "+31%", l: "Rev" }], takeaway: "Same rank, richer SERP = more clicks." },
  { id: "s9", title: "Coffee brand: long-tail empire 800 keywords", brand: "Roast & Co.", industry: "Shopify · Beverage", category: "SEO", metric: "800", metricLabel: "Keywords", duration: "12 months", problem: "Competing for big head terms, getting crushed.", strategy: ["Pivoted to long-tail (200+ blog posts)", "Comparison and 'best for' content", "Internal linking from posts to PDPs"], results: [{ v: "800", l: "KW ranked" }, { v: "62K", l: "Visits/mo" }, { v: "$28K", l: "MRR" }], takeaway: "100 long-tail keywords beat 1 head term — and they're easier to win." },
  { id: "s10", title: "Furniture: image SEO +28% organic", brand: "Mason Living", industry: "WooCommerce · Furniture", category: "SEO", metric: "+28%", metricLabel: "Image traffic", duration: "4 months", problem: "Massive product imagery, zero image search traffic.", strategy: ["Descriptive file names and alts", "Image sitemaps", "WebP + responsive sizes"], results: [{ v: "+28%", l: "Organic" }, { v: "12%", l: "From images" }, { v: "+19%", l: "Rev" }], takeaway: "Image search is free traffic furniture and decor brands ignore." },
  { id: "s11", title: "Outdoor: content cluster ranks 6 pillar terms", brand: "TrailGear", industry: "Shopify · Outdoor", category: "SEO", metric: "Top 3", metricLabel: "6 pillar terms", duration: "11 months", problem: "Random blog posts, no topical structure.", strategy: ["Mapped 6 pillar topics with 12 supporting articles each", "Hub-and-spoke internal linking", "Refreshed top 20 posts quarterly"], results: [{ v: "Top 3", l: "6 pillars" }, { v: "94K", l: "Visits" }, { v: "$36K", l: "MRR" }], takeaway: "Pillar pages need 10+ supporting articles to rank competitively." },
  { id: "s12", title: "Eyewear: international SEO 4 new markets", brand: "Frame & Co.", industry: "Shopify · Eyewear", category: "SEO", metric: "4", metricLabel: "New markets", duration: "9 months", problem: "US-only despite global demand.", strategy: ["Hreflang implementation for UK/AU/CA/DE", "Localized content per market", "Country-specific GMB profiles"], results: [{ v: "4", l: "Markets" }, { v: "+62%", l: "Global rev" }, { v: "$41K", l: "Intl MRR" }], takeaway: "Hreflang done right is the cheapest revenue unlock for global ecom." },

  // CRO (12)
  { id: "c1", title: "Apparel PDP rebuild: 1.1% → 4.6% CR", brand: "Northwind Apparel", industry: "Shopify · Apparel", category: "CRO", metric: "4.2×", metricLabel: "CR lift", duration: "8 weeks", problem: "Below-industry CR, flat PDP, no social proof above fold.", strategy: ["Hero PDP with sticky ATC", "Review carousel + UGC gallery", "Size guide as inline modal"], results: [{ v: "4.2×", l: "CR" }, { v: "+38%", l: "AOV" }, { v: "+170%", l: "Rev/visitor" }], takeaway: "PDP is the single highest-leverage page in ecom." },
  { id: "c2", title: "Gadgets: checkout abandonment -38%", brand: "GearLoop", industry: "Shopify · Gadgets", category: "CRO", metric: "-38%", metricLabel: "Abandonment", duration: "4 weeks", problem: "Express checkout missing, shipping shock at step 3.", strategy: ["Shop Pay + Apple Pay above fold", "Shipping cost in cart, not checkout", "Trust badges next to CTA"], results: [{ v: "-38%", l: "Abandon" }, { v: "+24%", l: "Conv" }, { v: "$32K", l: "Recovered" }], takeaway: "Show all costs in cart. Never surprise at checkout." },
  { id: "c3", title: "Skincare: bundle builder +41% AOV", brand: "Pure Botanica", industry: "Shopify · Skincare", category: "CRO", metric: "+41%", metricLabel: "AOV", duration: "6 weeks", problem: "Single-product purchases dominant, no bundling logic.", strategy: ["Build-your-own routine widget", "Tiered discount: 3 = 10%, 5 = 20%", "Subscription bundle CTA"], results: [{ v: "+41%", l: "AOV" }, { v: "+22%", l: "CR" }, { v: "44%", l: "Bundle rate" }], takeaway: "Bundles change unit economics more than discounts do." },
  { id: "c4", title: "Footwear: size confidence +28% CR", brand: "Stride Co.", industry: "Shopify · Footwear", category: "CRO", metric: "+28%", metricLabel: "CR", duration: "5 weeks", problem: "30% returns due to size, hesitation visible in heatmaps.", strategy: ["AI fit finder quiz", "True-to-size badge from reviews", "Free returns prominent"], results: [{ v: "+28%", l: "CR" }, { v: "-18%", l: "Returns" }, { v: "+34%", l: "Margin" }], takeaway: "Size anxiety kills footwear CR. Confidence widgets pay back instantly." },
  { id: "c5", title: "Beauty: quiz funnel 6.2% conversion", brand: "Lumen Beauty", industry: "Shopify · Beauty", category: "CRO", metric: "6.2%", metricLabel: "Quiz CR", duration: "8 weeks", problem: "Too many SKUs, decision paralysis on collection page.", strategy: ["6-question skin quiz", "Personalized routine result page", "Email capture mid-quiz"], results: [{ v: "6.2%", l: "Quiz CR" }, { v: "+88%", l: "AOV" }, { v: "+44%", l: "Email" }], takeaway: "Quizzes work because they reduce choice load and personalize." },
  { id: "c6", title: "Supplements: subscription opt-in +220%", brand: "VitalCore", industry: "Shopify · Supplements", category: "CRO", metric: "+220%", metricLabel: "Sub opt-in", duration: "4 weeks", problem: "Sub option buried, no visible benefit.", strategy: ["Sub as default selection", "Save % framing instead of dollar amount", "Cancel-anytime trust line under CTA"], results: [{ v: "+220%", l: "Sub" }, { v: "+62%", l: "LTV" }, { v: "+18%", l: "AOV" }], takeaway: "Defaults are the most powerful CRO lever." },
  { id: "c7", title: "Pet: cart drawer redesign +19% CR", brand: "Pawform", industry: "Shopify · Pet", category: "CRO", metric: "+19%", metricLabel: "CR", duration: "3 weeks", problem: "Cart page friction, lost users at edit step.", strategy: ["Slide-out cart drawer replaces cart page", "Free shipping progress bar", "Upsell carousel inside drawer"], results: [{ v: "+19%", l: "CR" }, { v: "+14%", l: "AOV" }, { v: "-22%", l: "Drop-off" }], takeaway: "Cart drawers consistently beat cart pages in modern ecom." },
  { id: "c8", title: "Home goods: reviews block +32% CR", brand: "Hearthline", industry: "WooCommerce · Home", category: "CRO", metric: "+32%", metricLabel: "CR", duration: "2 weeks", problem: "Reviews in footer, invisible above fold.", strategy: ["Pulled top-rated reviews above ATC", "Star rating in product title area", "Photo reviews gallery"], results: [{ v: "+32%", l: "CR" }, { v: "+11%", l: "AOV" }, { v: "+47%", l: "Rev" }], takeaway: "Social proof location matters more than social proof quantity." },
  { id: "c9", title: "Jewelry: gifting flow +56% Q4 AOV", brand: "Auralune", industry: "Shopify · Jewelry", category: "CRO", metric: "+56%", metricLabel: "Q4 AOV", duration: "Q4", problem: "Generic checkout, ignoring gifting intent.", strategy: ["Gift toggle on PDP and cart", "Free gift wrap + message card", "Gift card upsell post-purchase"], results: [{ v: "+56%", l: "AOV" }, { v: "+28%", l: "Q4 CR" }, { v: "+91%", l: "Repeat" }], takeaway: "Gifting features pay for themselves in November alone." },
  { id: "c10", title: "Coffee: subscription page +88% CR", brand: "Roast & Co.", industry: "Shopify · Beverage", category: "CRO", metric: "+88%", metricLabel: "CR", duration: "5 weeks", problem: "Subscription page text-heavy, no visual hierarchy.", strategy: ["Hero with delivery preview animation", "FAQ collapsed by default", "Customer photos throughout"], results: [{ v: "+88%", l: "CR" }, { v: "+34%", l: "Sub starts" }, { v: "+22%", l: "MRR" }], takeaway: "Subscription pages need to feel like a product, not a contract." },
  { id: "c11", title: "Furniture: configurator +44% rev", brand: "Mason Living", industry: "WooCommerce · Furniture", category: "CRO", metric: "+44%", metricLabel: "Rev", duration: "10 weeks", problem: "Customers couldn't visualize options.", strategy: ["3D product configurator", "Live price update", "Save-and-share design link"], results: [{ v: "+44%", l: "Rev" }, { v: "+62%", l: "AOV" }, { v: "+28%", l: "Time on site" }], takeaway: "Visualization tools turn browsers into buyers in high-AOV categories." },
  { id: "c12", title: "Outdoor: filter UX +24% collection CR", brand: "TrailGear", industry: "Shopify · Outdoor", category: "CRO", metric: "+24%", metricLabel: "CR", duration: "4 weeks", problem: "Filters opened modal, lost context, slow.", strategy: ["Inline left-rail filters", "Instant results (no apply button)", "Filter chips above grid"], results: [{ v: "+24%", l: "CR" }, { v: "-18%", l: "Bounce" }, { v: "+19%", l: "Rev" }], takeaway: "Filter friction is collection-page revenue leaving the building." },
];

const studies: Study[] = RAW.map((s, i) => ({
  ...s,
  color: gradients[i % gradients.length],
  chart: makeChart(i + 1, s.category === "Ads" ? 2.0 : s.category === "SEO" ? 1.4 : 1.7),
}));

const categoryIcon: Record<Category | "All", typeof Megaphone> = {
  All: TrendingUp,
  Ads: Megaphone,
  SEO: Search,
  CRO: MousePointerClick,
};

function Sparkline({ data, gradient }: { data: number[]; gradient: string }) {
  const w = 320;
  const h = 90;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i * step, h - ((v - min) / range) * (h - 10) - 5] as const);
  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  const id = `g-${gradient.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={path} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CaseStudies() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [active, setActive] = useState<Study | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? studies : studies.filter((s) => s.category === filter)),
    [filter]
  );

  const counts = {
    All: studies.length,
    Ads: studies.filter((s) => s.category === "Ads").length,
    SEO: studies.filter((s) => s.category === "SEO").length,
    CRO: studies.filter((s) => s.category === "CRO").length,
  };

  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative pt-20 pb-12 lg:pt-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] bg-primary/15 blur-[140px] rounded-full float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Case Studies
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl leading-[1.04] text-ink">
            Real <span className="text-gradient">ecommerce growth</span> results.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            {studies.length}+ wins across Ads, SEO and CRO. Click any card to see the problem, strategy and full results.
          </p>

          {/* Stat strip */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
            {[
              { v: "$48M+", l: "Tracked revenue" },
              { v: "120+", l: "Stores scaled" },
              { v: "400+", l: "A/B tests" },
              { v: "3.6×", l: "Avg ROAS lift" },
            ].map((s) => (
              <div key={s.l} className="card-surface p-4 text-center">
                <div className="text-xl md:text-2xl font-bold text-gradient">{s.v}</div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {(["All", "Ads", "SEO", "CRO"] as const).map((f) => {
              const Icon = categoryIcon[f];
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                      : "bg-white border border-border text-ink/70 hover:border-primary hover:text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {f}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-primary/10 text-primary"}`}>
                    {counts[f]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s) => {
              const Icon = categoryIcon[s.category];
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s)}
                  className="text-left card-surface card-hover overflow-hidden group flex flex-col"
                >
                  {/* Chart header */}
                  <div className={`relative h-32 bg-gradient-to-br ${s.color} text-white p-4 overflow-hidden`}>
                    <div className="absolute inset-0 opacity-40">
                      <Sparkline data={s.chart} gradient={s.color} />
                    </div>
                    <div className="relative flex items-start justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur px-2 py-1 rounded-full">
                        <Icon className="w-3 h-3" /> {s.category}
                      </span>
                      <span className="text-[10px] font-semibold opacity-80">{s.duration}</span>
                    </div>
                    <div className="relative mt-4">
                      <div className="text-3xl font-bold leading-none">{s.metric}</div>
                      <div className="text-[11px] uppercase tracking-wide opacity-80 mt-1">{s.metricLabel}</div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{s.industry}</div>
                    <h3 className="mt-1.5 font-bold text-ink leading-snug">{s.title}</h3>
                    <div className="mt-auto pt-4 flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink/60">{s.brand}</span>
                      <span className="inline-flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                        View details <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DETAILS DIALOG */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {active && (
            <>
              <DialogTitle className="sr-only">{active.title}</DialogTitle>
              {/* Header banner */}
              <div className={`relative bg-gradient-to-br ${active.color} text-white p-6 md:p-8`}>
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center backdrop-blur transition"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <Sparkline data={active.chart} gradient={active.color + "lg"} />
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
                    <span className="bg-white/20 backdrop-blur px-2 py-1 rounded-full inline-flex items-center gap-1.5">
                      {(() => {
                        const Icon = categoryIcon[active.category];
                        return <Icon className="w-3 h-3" />;
                      })()}
                      {active.category}
                    </span>
                    <span>{active.industry}</span>
                    <span>·</span>
                    <span>{active.duration}</span>
                  </div>
                  <h2 className="mt-3 text-2xl md:text-3xl font-bold leading-tight">{active.title}</h2>
                  <div className="mt-5 inline-flex items-baseline gap-2">
                    <span className="text-4xl md:text-5xl font-bold">{active.metric}</span>
                    <span className="text-sm opacity-80 uppercase tracking-wide">{active.metricLabel}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Problem</div>
                  <p className="mt-2 text-ink leading-relaxed">{active.problem}</p>
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Strategy</div>
                  <ul className="mt-2 space-y-2">
                    {active.strategy.map((st) => (
                      <li key={st} className="flex gap-2 text-ink">
                        <span className="text-primary mt-1">✓</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Results</div>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {active.results.map((r) => (
                      <div key={r.l} className="rounded-2xl border border-border bg-secondary/40 p-4 text-center">
                        <div className="text-xl md:text-2xl font-bold text-gradient">{r.v}</div>
                        <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1">{r.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Takeaway</div>
                  <p className="mt-2 text-ink font-medium italic">"{active.takeaway}"</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <CTA heading="Want your store to be the next case study?" />
    </PageLayout>
  );
}
