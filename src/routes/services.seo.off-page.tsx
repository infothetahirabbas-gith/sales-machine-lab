import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-seo-growth.jpg";

const FAQ_LIST: FAQ[] = [
  { q: "What is off-page SEO for ecommerce?", a: "Everything Google sees about your store from outside it - backlinks, digital PR, brand mentions, reviews, citations and unlinked signals that build authority." },
  { q: "Do you build backlinks?", a: "Yes - digital PR, niche-edit outreach, HARO/Qwoted, product-review outreach and ecommerce-specific placements. No PBNs, no comment spam, no link schemes." },
  { q: "How many links per month?", a: "Quality over volume. 6-15 editorial DR40+ links is a realistic monthly range depending on niche and budget." },
  { q: "Will off-page SEO help my product pages rank?", a: "Yes - authority passes through internal links from your money-page tier. We build to hub pages and money PDPs deliberately." },
  { q: "Is off-page SEO safe post-2024 spam updates?", a: "Yes when it's editorial and topically relevant. We avoid every pattern Google's spam updates target." },
  { q: "What makes you the best Ecommerce SEO Agency UK for link building?", a: "We're a specialist Ecommerce Marketing Agency UK with in-house UK PR strategists and journalists on retainer - not offshored outreach VAs sending 500 spammy pitches a day." },
  { q: "What is digital PR and how does it help ecommerce SEO?", a: "Data-led, product-led press stories placed in national and vertical publications - earning editorial DR60+ backlinks, brand mentions and referral traffic. It's the fastest ethical way to grow Domain Rating." },
  { q: "Do you help with HARO or Qwoted?", a: "Yes - we run daily founder-expert outreach on HARO, Qwoted, ResponseSource and Featured.com, placing 4-8 quotes per month in DR60+ media." },
  { q: "What kind of anchor text strategy do you use?", a: "Natural mix: mostly branded (60-70%), then generic/URL (15-20%), then partial-match (10-15%), and only a small share exact-match. Anchor patterns are a Google spam trigger; we look natural because we are." },
  { q: "Do you build links to product pages or homepage?", a: "Both, but strategically. Editorial links to money-page tiers (hero collections, flagship PDPs, comparison hubs) with equity flowing through internal linking - not just to the homepage." },
  { q: "How is BeingEcom different from a generic Ecommerce Agency UK?", a: "Generic agencies buy bulk niche edits. We're an Ecommerce Growth Agency that treats off-page as brand equity - the links we earn are ones you'd be proud to show a journalist." },
  { q: "Do you handle brand mention reclamation?", a: "Yes - we monitor unlinked brand mentions with Ahrefs Alerts and Google Alerts, then reach out to convert them into followed links." },
  { q: "What niches do you cover?", a: "UK ecommerce: fashion, beauty, home & garden, electronics, sports & fitness, health & wellness, food & drink, and B2B ecommerce. Deep niche experience means better pitch angles and better placements." },
  { q: "Can you help with a Google penalty or manual action?", a: "Yes - full toxic-link audit, disavow file build, remediation plan and manual-action reconsideration if needed." },
  { q: "How do you measure off-page SEO success?", a: "Referring domains growth, Domain Rating growth, non-brand organic sessions, money-page keyword rankings, and referral traffic from placements. Not just 'links built'." },
  { q: "What reporting do you provide for off-page work?", a: "Monthly placement report with URL, DR, DA, topical relevance, referring traffic (Ahrefs) and target URL. Plus a quarterly authority-flow review." },
];

export const Route = createFileRoute("/services/seo/off-page")({
  head: () => ({
    meta: [
      { title: "Off-Page SEO Agency UK | No.1 Digital PR & Link Building | BeingEcom" },
      { name: "description", content: "BeingEcom is a leading Off-Page SEO Agency UK and specialist Ecommerce SEO Agency UK. Digital PR and editorial link building that grows Domain Rating and organic rankings for Shopify and WooCommerce brands." },
      { property: "og:title", content: "Off-Page SEO Agency UK | No.1 Digital PR & Link Building | BeingEcom" },
      { property: "og:description", content: "Off-Page SEO Agency UK. Digital PR and editorial link building that grows Domain Rating and organic rankings for Shopify and WooCommerce brands." },
      { property: "og:url", content: "https://beingecom.com/services/seo/off-page" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/seo/off-page" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "seo/off-page", name: "Off-Page SEO Agency UK", description: "Off-page SEO, digital PR and link building for ecommerce by an award-winning UK Ecommerce SEO Agency." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Ecommerce SEO", path: "/services/seo" }, { name: "Off-Page SEO", path: "/services/seo/off-page" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/seo/off-page")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "seo-off-page",
      eyebrow: "Off-Page SEO Agency UK",
      heroImage: heroImg,
      heroTitle: "No.1 Ecommerce Agency UK for authority that makes rankings stick.",
      heroSub: "Editorial digital PR, niche-edit link building and brand-signal off-page SEO from a specialist Ecommerce Marketing Agency UK - the kind of authority Google actually rewards.",
      problemTitle: "Why most ecommerce stores plateau in the SERP.",
      problemBullets: [
        "DR under 20 while competitors sit at DR 45+.",
        "Every backlink is on the homepage - money pages get nothing.",
        "PBNs, guest-post farms or 'link packages' from Fiverr.",
      ],
      whatIsTitle: "Off-page SEO is trust, at scale.",
      whatIsBody: "As the specialist Ecommerce Growth Agency for authority building, we earn backlinks and brand signals that pass real trust to the URLs that actually make you money - collections, hero PDPs and revenue blog hubs. Every link is editorial. Every placement is one you'd be proud to send to a journalist.",
      systemTitle: "Our off-page system.",
      systemSteps: [
        { title: "Link gap audit", body: "Competitor link profiles, DR gaps, target URLs mapped." },
        { title: "Digital PR angles", body: "Data studies, expert commentary, product-led hooks." },
        { title: "Outreach & placements", body: "Journalist and editor outreach - HARO, Qwoted, direct." },
        { title: "Money-page injection", body: "Anchor and target-URL strategy that flows equity where it counts." },
      ],
      pillarsTitle: "Off-page pillars.",
      pillars: [
        { title: "Digital PR", body: "National + niche editorial coverage." },
        { title: "Niche edits", body: "Contextual links in existing ranking articles." },
        { title: "Brand signals", body: "Unlinked mentions, reviews, citations." },
        { title: "Anchor strategy", body: "Branded, partial and exact mixed to look natural." },
      ],
      deepBlocks: [
        { title: "Digital PR campaigns", body: "Data-led stories pitched to national and vertical press.", tags: ["Data","Press","National"] },
        { title: "Niche-edit outreach", body: "In-content links placed in already-ranking, topically-relevant posts.", tags: ["Contextual","In-content"] },
        { title: "HARO / Qwoted", body: "Daily expert quotes from your founder placed in DR60+ media.", tags: ["Expert","HARO","Qwoted"] },
        { title: "Product-review outreach", body: "Reviewer, blogger and YouTube placements that pass link + traffic.", tags: ["Reviews","YouTube","Blog"] },
        { title: "Brand mentions", body: "Unlinked mention detection, cleanup and link reclamation.", tags: ["Mentions","Reclamation"] },
        { title: "Anchor & target strategy", body: "Money-page equity flow with safe anchor ratios.", tags: ["Anchors","Money page"] },
      ],
      triggersTitle: "Ecommerce link types that scale.",
      triggers: ["Digital PR feature","Niche edit","HARO quote","Product review","Gift guide","Comparison roundup","Alternative listicle","Founder interview"],
      beforeAfter: {
        before: ["DR 18","5 links a month, mostly homepage","No PR presence","Money pages ignored"],
        after: ["DR 47","12 editorial links/mo","Monthly PR features","Collections + hero PDPs ranked"],
      },
      caseStudy: {
        title: "Skincare brand: DR 18 → 47, non-brand organic +214%",
        problem: "Stalled at DR 18, no PR, no editorial links, hero collection stuck on page 3.",
        strategy: "6-month digital PR campaign + niche-edit programme to hero collection and hub content.",
        result: "DR 47, hero collection page 1 for 9 commercial terms, non-brand organic +214%.",
        metrics: [{ label: "DR", value: "47" }, { label: "Non-brand organic", value: "+214%" }, { label: "Months", value: "6" }],
      },
      ctaTitle: "Build the authority that finally moves rankings - with the specialist Ecommerce SEO Agency.",
      impactStats: [
        { value: "DR 47", label: "Average DR reached" },
        { value: "12/mo", label: "Editorial links" },
        { value: "+214%", label: "Non-brand organic" },
      ],
      metricBars: [
        { label: "Domain Rating", before: 18, after: 47, description: "Ahrefs DR after 6 months of off-page work." },
        { label: "Referring domains", before: 42, after: 186, description: "Unique linking root domains." },
        { label: "Non-brand organic", before: 100, after: 314, unit: "%", description: "Non-brand organic sessions vs baseline." },
        { label: "Money-page keywords", before: 6, after: 41, description: "Page-1 keywords on money collections + PDPs." },
      ],
      faqs: FAQ_LIST,
    }} />
  ),
});
