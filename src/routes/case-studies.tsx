import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Megaphone, Search, MousePointerClick, TrendingUp, ArrowUpRight, X, Globe } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { Section, CTA } from "../components/site/Section";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";
import CaseStudyExtras from "../components/site/CaseStudyExtras";
import showcaseApparel from "@/assets/showcase-apparel.jpg";
import showcaseGadgets from "@/assets/showcase-gadgets.jpg";
import showcaseFootwear from "@/assets/showcase-footwear.jpg";
import showcaseBeauty from "@/assets/showcase-beauty.jpg";
import showcasePet from "@/assets/showcase-pet.jpg";
import showcaseHomegoods from "@/assets/showcase-homegoods.jpg";
import showcaseSupplements from "@/assets/showcase-supplements.jpg";
import showcaseJewelry from "@/assets/showcase-jewelry.jpg";
import showcaseActivewear from "@/assets/showcase-activewear.jpg";
import showcaseCoffee from "@/assets/showcase-coffee.jpg";
import showcaseFurniture from "@/assets/showcase-furniture.jpg";
import showcaseEyewear from "@/assets/showcase-eyewear.jpg";
import showcaseOutdoor from "@/assets/showcase-outdoor.jpg";
import showcaseToys from "@/assets/showcase-toys.jpg";
import showcaseCosmetics from "@/assets/showcase-cosmetics.jpg";
import showcaseSkincare from "@/assets/showcase-skincare.jpg";
import showcaseStreetwear from "@/assets/showcase-streetwear.jpg";
import showcaseVitamins from "@/assets/showcase-vitamins.jpg";
import showcaseDogfood from "@/assets/showcase-dogfood.jpg";
import showcaseSerum from "@/assets/showcase-serum.jpg";
import showcaseKitchen from "@/assets/showcase-kitchen.jpg";
import showcaseWatches from "@/assets/showcase-watches.jpg";
import showcaseRunners from "@/assets/showcase-runners.jpg";
import showcaseTea from "@/assets/showcase-tea.jpg";
import showcaseDesk from "@/assets/showcase-desk.jpg";
import showcaseBike from "@/assets/showcase-bike.jpg";
import showcaseSunglasses from "@/assets/showcase-sunglasses.jpg";
import showcaseDress from "@/assets/showcase-dress.jpg";
import showcaseHeadphones from "@/assets/showcase-headphones.jpg";
import showcaseCandles from "@/assets/showcase-candles.jpg";
import showcaseSneakerdrop from "@/assets/showcase-sneakerdrop.jpg";
import showcaseGrooming from "@/assets/showcase-grooming.jpg";
import showcaseYoga from "@/assets/showcase-yoga.jpg";
import showcaseChocolate from "@/assets/showcase-chocolate.jpg";
import showcaseBags from "@/assets/showcase-bags.jpg";
import showcasePlants from "@/assets/showcase-plants.jpg";
import showcaseWine from "@/assets/showcase-wine.jpg";
import showcaseBaby from "@/assets/showcase-baby.jpg";
import showcaseSurf from "@/assets/showcase-surf.jpg";
import { faqJsonLd, caseStudyFaqs, breadcrumbJsonLd } from "../lib/seo";
import FaqSection from "../components/site/FaqSection";



// One unique screenshot per case study, ordered to match RAW[] below (Ads a1-a15, SEO s1-s12, CRO c1-c12)
const showcaseImages = [
  // Ads (15)
  showcaseApparel, showcaseGadgets, showcaseFootwear, showcaseBeauty, showcasePet,
  showcaseHomegoods, showcaseSupplements, showcaseJewelry, showcaseActivewear, showcaseCoffee,
  showcaseFurniture, showcaseEyewear, showcaseOutdoor, showcaseToys, showcaseCosmetics,
  // SEO (12)
  showcaseSkincare, showcaseStreetwear, showcaseVitamins, showcaseDogfood, showcaseSerum,
  showcaseKitchen, showcaseWatches, showcaseRunners, showcaseTea, showcaseDesk,
  showcaseBike, showcaseSunglasses,
  // CRO (12)
  showcaseDress, showcaseHeadphones, showcaseCandles, showcaseSneakerdrop, showcaseGrooming,
  showcaseYoga, showcaseChocolate, showcaseBags, showcasePlants, showcaseWine,
  showcaseBaby, showcaseSurf,
];

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Ecommerce Case Studies — Shopify & WooCommerce Growth Results | BeingEcom" },
      { name: "description", content: "40+ real Shopify & WooCommerce case studies. See revenue, ROAS, SEO, and conversion lifts from BeingEcom's ecommerce growth system." },
      { name: "keywords", content: "ecommerce case studies, Shopify case studies, WooCommerce case studies, DTC growth results, ROAS case study, ecommerce SEO results, CRO case study" },
      { property: "og:title", content: "Ecommerce Case Studies — Real Shopify & WooCommerce Growth Results" },
      { property: "og:description", content: "40+ wins across Ads, SEO and CRO for Shopify & WooCommerce brands." },
      { property: "og:url", content: "https://beingecom.com/case-studies" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/case-studies" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(caseStudyFaqs, "/case-studies")) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }])) },
    ],
  }),
  component: CaseStudies,
});

type Category = "Ads" | "SEO" | "CRO" | "Website";

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
  { id: "s13", title: "Streetwear: core web vitals fix +51% organic", brand: "Cypher Drop", industry: "Shopify · Streetwear", category: "SEO", metric: "+51%", metricLabel: "Organic sessions", duration: "3 months", problem: "Poor LCP/CLS scores killing rankings post-update.", strategy: ["LCP under 1.8s via image preloading", "Eliminated CLS from lazy-loaded reviews", "Edge caching for collection pages"], results: [{ v: "+51%", l: "Sessions" }, { v: "92", l: "PageSpeed" }, { v: "+38%", l: "Rev" }], takeaway: "Core Web Vitals are now a ranking tax — pay it or fall." },
  { id: "s14", title: "Tea brand: 'best of' content +74K clicks", brand: "Steepwell", industry: "Shopify · Beverage", category: "SEO", metric: "+74K", metricLabel: "Clicks/mo", duration: "7 months", problem: "Invisible for commercial intent comparison queries.", strategy: ["48 'best X tea for Y' comparison posts", "Embedded product comparison tables", "Affiliate-style CTA into own PDPs"], results: [{ v: "+74K", l: "Clicks" }, { v: "12.3%", l: "CTR" }, { v: "$26K", l: "MRR" }], takeaway: "Bottom-funnel comparison content converts 8× higher than how-to posts." },
  { id: "s15", title: "Watches: GSC CTR optimization +44% clicks", brand: "Meridian Watch Co.", industry: "Shopify · Watches", category: "SEO", metric: "+44%", metricLabel: "GSC clicks", duration: "8 weeks", problem: "Ranking well but losing clicks to richer SERP snippets.", strategy: ["Rewrote 80 underperforming title tags via GSC data", "Power words + brackets + year in titles", "Meta descriptions with explicit benefit"], results: [{ v: "+44%", l: "Clicks" }, { v: "+18%", l: "Avg position" }, { v: "+29%", l: "Rev" }], takeaway: "Search Console is the highest-ROI SEO tool nobody fully uses." },
  { id: "s16", title: "Candles: AI Overviews citations on 22 queries", brand: "Hearthwax", industry: "Shopify · Home", category: "SEO", metric: "22", metricLabel: "AI cites", duration: "5 months", problem: "Losing traffic to Google AI Overviews with no presence inside them.", strategy: ["Restructured posts into question/answer chunks", "Added definition blocks + sourced statistics", "Implemented Article + HowTo schema"], results: [{ v: "22", l: "AIO cites" }, { v: "+38%", l: "Referral" }, { v: "Top 3", l: "Avg cited" }], takeaway: "In the AI Overviews era, structure and citations matter more than length." },

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

  // WEBSITE (10) — full-site builds / redesigns. Card preview = homepage screenshot.
  { id: "w1", title: "Apparel brand: full Shopify rebuild", brand: "Northwind Apparel", industry: "Shopify · Apparel", category: "Website", metric: "+182%", metricLabel: "Site CR", duration: "5 weeks", problem: "Old theme, slow PDP, no mobile-first design.", strategy: ["Custom Shopify 2.0 theme", "Mobile-first PDP with sticky ATC", "Speed: LCP under 1.6s"], results: [{ v: "+182%", l: "CR" }, { v: "+44%", l: "AOV" }, { v: "1.4s", l: "LCP" }], takeaway: "A fast, focused homepage is the single best CRO investment." },
  { id: "w2", title: "Gadgets store: headless storefront", brand: "GearLoop", industry: "Hydrogen · Gadgets", category: "Website", metric: "0.9s", metricLabel: "LCP", duration: "7 weeks", problem: "Liquid theme couldn't keep up with traffic spikes.", strategy: ["Hydrogen + Oxygen migration", "Edge-rendered PDPs", "Persistent cart drawer"], results: [{ v: "0.9s", l: "LCP" }, { v: "+71%", l: "Mobile CR" }, { v: "+38%", l: "Rev" }], takeaway: "Headless pays back when traffic and SKU count both scale." },
  { id: "w3", title: "Skincare: brand-led redesign", brand: "Pure Botanica", industry: "Shopify · Skincare", category: "Website", metric: "+96%", metricLabel: "AOV", duration: "6 weeks", problem: "Generic theme, no brand storytelling, weak hierarchy.", strategy: ["Editorial homepage with story sections", "Routine builder on collection page", "Press logo + ingredient deep dives"], results: [{ v: "+96%", l: "AOV" }, { v: "+62%", l: "CR" }, { v: "+44%", l: "Time on site" }], takeaway: "Brand storytelling on the homepage compounds every channel below it." },
  { id: "w4", title: "Footwear: PDP-first redesign", brand: "Stride Co.", industry: "Shopify · Footwear", category: "Website", metric: "+128%", metricLabel: "PDP CR", duration: "4 weeks", problem: "PDP buried features below the fold.", strategy: ["Above-fold size + reviews + ATC", "AI fit recommendation widget", "Inline video for each colorway"], results: [{ v: "+128%", l: "PDP CR" }, { v: "-22%", l: "Returns" }, { v: "+41%", l: "Rev" }], takeaway: "Footwear PDPs live or die above the fold on mobile." },
  { id: "w5", title: "Beauty DTC: quiz-driven homepage", brand: "Lumen Beauty", industry: "Shopify · Beauty", category: "Website", metric: "6.4%", metricLabel: "Site-wide CR", duration: "5 weeks", problem: "Too many SKUs, no clear entry path.", strategy: ["Quiz as primary homepage CTA", "Routine results page = personalized PLP", "Email + SMS capture mid-quiz"], results: [{ v: "6.4%", l: "CR" }, { v: "+88%", l: "Email list" }, { v: "+52%", l: "AOV" }], takeaway: "Quizzes turn the homepage into a sales associate that scales." },
  { id: "w6", title: "Pet brand: subscription site rebuild", brand: "Pawform", industry: "Shopify · Pet", category: "Website", metric: "+74%", metricLabel: "Sub starts", duration: "6 weeks", problem: "Subscription buried 3 clicks deep.", strategy: ["Subscription hero on homepage", "Visual delivery preview", "One-page subscription checkout"], results: [{ v: "+74%", l: "Subs" }, { v: "+62%", l: "LTV" }, { v: "+34%", l: "MRR" }], takeaway: "If subscription is the business model, it belongs on the homepage." },
  { id: "w7", title: "Furniture: 3D configurator site", brand: "Mason Living", industry: "WooCommerce · Furniture", category: "Website", metric: "+44%", metricLabel: "Rev", duration: "10 weeks", problem: "High AOV, no way to visualize options.", strategy: ["Three.js product configurator", "Live price + save-and-share", "AR view on mobile"], results: [{ v: "+44%", l: "Rev" }, { v: "+62%", l: "AOV" }, { v: "+28%", l: "Time on site" }], takeaway: "Visualization tools turn browsers into buyers in high-AOV verticals." },
  { id: "w8", title: "Jewelry: luxury Shopify Plus build", brand: "Auralune", industry: "Shopify Plus · Jewelry", category: "Website", metric: "+212%", metricLabel: "Q4 rev", duration: "8 weeks", problem: "Old Magento, slow, poor gifting flow.", strategy: ["Plus migration with custom checkout", "Gift toggle + free engraving widget", "Editorial homepage with collections"], results: [{ v: "+212%", l: "Q4 rev" }, { v: "+56%", l: "AOV" }, { v: "+91%", l: "Repeat" }], takeaway: "Luxury sites should feel like a flagship store, not a catalog." },
  { id: "w9", title: "Coffee brand: subscription-first site", brand: "Roast & Co.", industry: "Shopify · Beverage", category: "Website", metric: "+88%", metricLabel: "Sub CR", duration: "5 weeks", problem: "One-time purchase model, high CAC.", strategy: ["Subscription hero animation", "Roast quiz funneling into subs", "Customer photo grid throughout"], results: [{ v: "+88%", l: "Sub CR" }, { v: "+34%", l: "Sub starts" }, { v: "+22%", l: "MRR" }], takeaway: "Subscription sites need to feel like a product, not a contract." },
  { id: "w10", title: "Outdoor: speed + UX rebuild", brand: "TrailGear", industry: "Shopify · Outdoor", category: "Website", metric: "+51%", metricLabel: "Organic + CR", duration: "6 weeks", problem: "Poor Core Web Vitals + clumsy collection UX.", strategy: ["Edge-cached collection pages", "Inline left-rail filters", "Optimized hero LCP under 1.5s"], results: [{ v: "+51%", l: "Sessions" }, { v: "92", l: "PageSpeed" }, { v: "+38%", l: "Rev" }], takeaway: "Speed and UX compound across SEO, paid, and direct traffic." },
];

export const studies: (Study & { screenshot: string })[] = RAW.map((s, i) => ({
  ...s,
  color: gradients[i % gradients.length],
  chart: makeChart(i + 1, s.category === "Ads" ? 2.0 : s.category === "SEO" ? 1.4 : 1.7),
  screenshot: showcaseImages[i % showcaseImages.length],
}));

export const categoryIcon: Record<Category | "All", typeof Megaphone> = {
  All: TrendingUp,
  Ads: Megaphone,
  SEO: Search,
  CRO: MousePointerClick,
  Website: Globe,
};

export type { Study, Category };

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

/* ---------- Category-specific card previews ---------- */

function AdsPreview({ seed }: { seed: number }) {
  const r = rng(seed + 11);
  // Realistic Facebook Ads Manager-style row data
  const campaigns = [
    { name: "ASC — Broad", status: "Active", spend: 1200 + Math.floor(r() * 1800), results: 80 + Math.floor(r() * 140), roas: 2.6 + r() * 2.2 },
    { name: "Retargeting 7D", status: "Active", spend: 400 + Math.floor(r() * 600), results: 40 + Math.floor(r() * 90), roas: 5.1 + r() * 3.4 },
    { name: "Creative test — UGC", status: "Active", spend: 250 + Math.floor(r() * 350), results: 15 + Math.floor(r() * 40), roas: 1.8 + r() * 1.6 },
  ];
  return (
    <div className="h-full w-full bg-white flex flex-col text-ink">
      {/* FB Ads Manager-style header */}
      <div className="flex items-center justify-between px-3 pt-2 pb-2 border-b border-border/70 shrink-0">
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path fill="#1877F2" d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.96h-1.52c-1.49 0-1.96.93-1.96 1.88V12h3.33l-.53 3.47h-2.8v8.38A12 12 0 0 0 24 12Z"/></svg>
          <span className="text-[10px] font-semibold text-ink">Ads Manager</span>
          <span className="text-[8px] text-muted-foreground">· Last 7 days</span>
        </div>
        <span className="text-[8px] font-bold text-emerald-600 inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live
        </span>
      </div>

      {/* Account stats strip */}
      <div className="grid grid-cols-3 gap-2 px-3 py-1.5 border-b border-border/70 shrink-0 bg-[#f7f8fa]">
        <div>
          <div className="text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">Spend</div>
          <div className="text-[11px] font-bold tabular-nums">${(campaigns.reduce((a, c) => a + c.spend, 0) / 1000).toFixed(1)}K</div>
        </div>
        <div>
          <div className="text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">Purchases</div>
          <div className="text-[11px] font-bold tabular-nums">{campaigns.reduce((a, c) => a + c.results, 0)}</div>
        </div>
        <div>
          <div className="text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">ROAS</div>
          <div className="text-[11px] font-bold text-emerald-600 tabular-nums">
            {(campaigns.reduce((a, c) => a + c.roas * c.spend, 0) / campaigns.reduce((a, c) => a + c.spend, 0)).toFixed(2)}×
          </div>
        </div>
      </div>

      {/* Column header */}
      <div className="grid grid-cols-[1.6fr_0.7fr_0.8fr_0.7fr] gap-1 px-3 py-1 border-b border-border/70 text-[7.5px] uppercase tracking-wider text-muted-foreground font-semibold shrink-0">
        <span>Campaign</span>
        <span className="text-right">Spend</span>
        <span className="text-right">Results</span>
        <span className="text-right">ROAS</span>
      </div>

      {/* Campaign rows */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {campaigns.map((c, i) => (
          <div
            key={i}
            className="grid grid-cols-[1.6fr_0.7fr_0.8fr_0.7fr] gap-1 px-3 py-1.5 items-center border-b border-border/40 last:border-b-0 hover:bg-[#f0f6ff] transition-colors"
          >
            <div className="flex items-center gap-1 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[9px] font-semibold text-ink truncate">{c.name}</span>
            </div>
            <span className="text-[9px] tabular-nums text-right text-ink/80">${c.spend.toLocaleString()}</span>
            <span className="text-[9px] tabular-nums text-right text-ink/80">{c.results}</span>
            <span className="text-[9px] tabular-nums text-right font-bold text-emerald-600">{c.roas.toFixed(2)}×</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WebsitePreview({ screenshot }: { screenshot: string }) {
  return (
    <div className="h-full w-full bg-white overflow-hidden">
      <img
        src={screenshot}
        alt="Website homepage"
        loading="lazy"
        className="w-full h-full object-cover object-top transition-transform duration-[2400ms] ease-linear hover:[transform:translateY(-30%)]"
      />
    </div>
  );
}

function SeoPreview({ seed, metric, metricLabel }: { seed: number; metric: string; metricLabel: string }) {
  const r = rng(seed + 23);
  // Trend area chart
  const pts = Array.from({ length: 14 }, (_, i) => 20 + i * 4 + r() * 14);
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const w = 100, h = 40;
  const path = pts.map((v, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  const queries = [
    { kw: "best skincare routine", pos: 3, clicks: "2.4K" },
    { kw: "vitamin c serum benefits", pos: 5, clicks: "1.8K" },
    { kw: "anti aging cream review", pos: 2, clicks: "3.1K" },
  ];
  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-2.5 pb-2 border-b border-border/70 shrink-0">
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-3 h-3"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
          <span className="text-[10px] font-semibold text-ink">Search Console</span>
        </div>
        <span className="text-[8px] font-semibold text-muted-foreground">Last 28 days</span>
      </div>
      {/* Metric chips */}
      <div className="grid grid-cols-2 gap-2 px-3 py-2 border-b border-border/70 shrink-0">
        <div>
          <div className="text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">Clicks</div>
          <div className="text-xs font-bold text-ink tabular-nums">{(8 + (seed % 12)).toFixed(0)}.{seed % 10}K</div>
        </div>
        <div>
          <div className="text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">Impr.</div>
          <div className="text-xs font-bold text-ink tabular-nums">{(80 + (seed % 70))}.{seed % 10}K</div>
        </div>
      </div>
      {/* Mini trend chart */}
      <div className="px-3 pt-1.5 pb-1 shrink-0">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`seo-${seed}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4285F4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#4285F4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#seo-${seed})`} />
          <path d={path} fill="none" stroke="#4285F4" strokeWidth="1.5" />
        </svg>
      </div>
      {/* Top queries list */}
      <div className="flex-1 px-3 pb-2 space-y-0.5 min-h-0 overflow-hidden">
        {queries.map((q, i) => (
          <div key={i} className="flex items-center justify-between text-[9px]">
            <span className="truncate text-ink/80 flex-1">{q.kw}</span>
            <span className="text-emerald-600 font-bold tabular-nums ml-2">#{q.pos + (seed % 3)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CroPreview({ seed, metric, metricLabel }: { seed: number; metric: string; metricLabel: string }) {
  const r = rng(seed + 37);
  const visitors = 10000 + Math.floor(r() * 4000);
  const addToCart = Math.floor(visitors * (0.18 + r() * 0.08));
  const checkout = Math.floor(addToCart * (0.55 + r() * 0.15));
  const purchases = Math.floor(checkout * (0.42 + r() * 0.18));
  const before = (1 + r() * 0.6).toFixed(2);
  const after = (3.2 + r() * 1.6).toFixed(2);
  const steps = [
    { l: "Visitors", v: visitors.toLocaleString(), pct: 100 },
    { l: "Add to cart", v: addToCart.toLocaleString(), pct: (addToCart / visitors) * 100 },
    { l: "Checkout", v: checkout.toLocaleString(), pct: (checkout / visitors) * 100 },
    { l: "Purchased", v: purchases.toLocaleString(), pct: (purchases / visitors) * 100 },
  ];
  return (
    <div className="h-full w-full bg-white flex flex-col">
      {/* Header A/B */}
      <div className="flex items-center justify-between px-3 pt-2.5 pb-2 border-b border-border/70 shrink-0">
        <span className="text-[10px] font-semibold text-ink">Conversion funnel</span>
        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">A/B WIN</span>
      </div>
      {/* Before/After */}
      <div className="grid grid-cols-2 gap-2 px-3 py-2 border-b border-border/70 shrink-0">
        <div>
          <div className="text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">Before</div>
          <div className="text-xs font-bold text-ink/60 tabular-nums line-through">{before}%</div>
        </div>
        <div>
          <div className="text-[8px] uppercase tracking-wider text-muted-foreground font-semibold">After</div>
          <div className="text-xs font-bold text-emerald-600 tabular-nums">{after}%</div>
        </div>
      </div>
      {/* Funnel bars */}
      <div className="flex-1 flex flex-col justify-center gap-1 px-3 pb-2.5 min-h-0">
        {steps.map((s, i) => (
          <div key={i} className="space-y-0.5">
            <div className="flex items-center justify-between text-[8px] font-medium">
              <span className="text-ink/70">{s.l}</span>
              <span className="tabular-nums text-ink/60">{s.v}</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-[oklch(0.55_0.2_265)] rounded-full"
                style={{ width: `${Math.max(8, s.pct)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
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
    Website: studies.filter((s) => s.category === "Website").length,
  };

  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative pt-20 pb-12 lg:pt-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] bg-primary/15 blur-[140px] rounded-full float-slow" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 relative text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            Case Studies
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold max-w-3xl mx-auto lg:mx-0 leading-[1.04] text-ink">
            Real <span className="text-gradient">ecommerce growth</span> results.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            {studies.length}+ wins across Ads, SEO and CRO. Click any card to see the problem, strategy and full results.
          </p>

          {/* Stat strip */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto lg:mx-0">
            {[
              { v: "120+", l: "Stores scaled" },
              { v: "$48M+", l: "Tracked revenue" },
              { v: "400+", l: "A/B tests run" },
              { v: "4.1×", l: "Avg ROAS lift" },
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
          {/* Filter segmented control */}
          <div className="flex justify-center mb-10">
            <div className="flex flex-nowrap overflow-x-auto justify-center items-center gap-1 p-1.5 rounded-2xl bg-white border border-border shadow-sm w-full sm:flex-wrap sm:overflow-visible">
              {(["All", "Website", "Ads", "SEO", "CRO"] as const).map((f) => {
                const Icon = categoryIcon[f];
                const isActive = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`relative inline-flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0 ${
                      isActive
                        ? "bg-gradient-to-br from-primary to-[oklch(0.55_0.2_265)] text-white shadow-md shadow-primary/25"
                        : "text-ink/65 hover:text-ink hover:bg-secondary/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="whitespace-nowrap">{f}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md tabular-nums shrink-0 ${
                        isActive ? "bg-white/25 text-white" : "bg-primary/10 text-primary"
                      }`}
                    >
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s) => {
              const Icon = categoryIcon[s.category];
              return (
                <div
                  key={s.id}
                  className="text-left card-surface overflow-hidden group flex flex-col opacity-90"
                >
                  {/* Category-specific preview */}
                  <div className={`relative h-52 bg-gradient-to-br ${s.color} p-2.5 overflow-hidden`}>
                    <div className="relative h-full w-full rounded-lg bg-white shadow-xl overflow-hidden flex flex-col">
                      {/* App-style chrome */}
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f7f8fa] border-b border-border/70 shrink-0">
                        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        {s.category === "Ads" && <AdsPreview seed={parseInt(s.id.slice(1)) || 1} />}
                        {s.category === "SEO" && <SeoPreview seed={parseInt(s.id.slice(1)) || 1} metric={s.metric} metricLabel={s.metricLabel} />}
                        {s.category === "CRO" && <CroPreview seed={parseInt(s.id.slice(1)) || 1} metric={s.metric} metricLabel={s.metricLabel} />}
                        {s.category === "Website" && <WebsitePreview screenshot={s.screenshot} />}
                      </div>
                    </div>
                    <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-ink/85 text-white backdrop-blur px-2 py-1 rounded-full shadow-lg z-10">
                      <Icon className="w-3 h-3" /> {s.category}
                    </span>
                    <div className="absolute bottom-4 right-4 text-right bg-white/95 backdrop-blur rounded-lg px-2.5 py-1.5 shadow-lg z-10">
                      <div className="text-lg font-bold leading-none text-gradient">{s.metric}</div>
                      <div className="text-[9px] uppercase tracking-wide text-muted-foreground mt-0.5">{s.metricLabel}</div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-ink leading-snug">{s.title}</h3>
                    <div className="mt-auto pt-4 text-xs text-muted-foreground">{s.duration}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DETAILS DIALOG */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden max-h-[92vh] overflow-y-auto w-[calc(100vw-1.5rem)] sm:w-full rounded-2xl">
          {active && (
            <>
              <DialogTitle className="sr-only">{active.title}</DialogTitle>
              {/* Header banner */}
              <div className={`relative bg-gradient-to-br ${active.color} text-white p-5 sm:p-6 md:p-8 min-w-0`}>
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center backdrop-blur transition z-10"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <Sparkline data={active.chart} gradient={active.color + "lg"} />
                </div>
                <div className="relative min-w-0 pr-10">
                  <div className="flex items-center flex-wrap gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                    <span className="bg-white/20 backdrop-blur px-2 py-1 rounded-full inline-flex items-center gap-1.5">
                      {(() => {
                        const Icon = categoryIcon[active.category];
                        return <Icon className="w-3 h-3" />;
                      })()}
                      {active.category}
                    </span>
                    <span className="break-words">{active.industry}</span>
                    <span>·</span>
                    <span>{active.duration}</span>
                  </div>
                  <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold leading-tight break-words">{active.title}</h2>
                  <div className="mt-4 inline-flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold">{active.metric}</span>
                    <span className="text-xs sm:text-sm opacity-80 uppercase tracking-wide">{active.metricLabel}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 md:p-8 space-y-6 min-w-0">
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
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                    {active.results.map((r) => (
                      <div key={r.l} className="rounded-2xl border border-border bg-secondary/40 p-3 sm:p-4 text-center min-w-0">
                        <div className="text-base sm:text-xl md:text-2xl font-bold text-gradient break-words">{r.v}</div>
                        <div className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1 break-words">{r.l}</div>
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

      <CaseStudyExtras />

      <CTA heading="Want your store to be the next case study?" />

      <FaqSection
        faqs={caseStudyFaqs}
        title="Case study —"
        highlight="FAQ"
        intro="The questions founders ask after browsing our wins."
      />
    </PageLayout>

  );
}
