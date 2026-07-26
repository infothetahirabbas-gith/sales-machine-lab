import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";
import heroImg from "../assets/hero-performance-marketing.jpg?format=webp&quality=56&w=640";

const FAQ_LIST: FAQ[] = [
  { q: "Is Google Ads worth it for ecommerce?", a: "Yes - Shopping and brand Search are usually the highest-ROAS channels in the account. As a specialist Ecommerce Marketing Agency UK we typically see Google carry 40-60% of profitable revenue for DTC brands." },
  { q: "Should I run Performance Max?", a: "Yes, with feed segmentation, asset groups and brand exclusions. Naked PMax wastes spend on brand - every serious Ecommerce Agency UK ring-fences brand terms before scaling PMax." },
  { q: "What about Google Shopping?", a: "Standard Shopping is still the cleanest data signal for diagnosing PMax. We often run both side-by-side to keep visibility on query-level performance." },
  { q: "Do you handle the Merchant Center feed?", a: "Yes - feed optimisation, GTIN/MPN fixes, custom labels and supplemental feeds for titles are core to any Ecommerce Growth Agency running Google properly." },
  { q: "Brand search - should I bid on my own name?", a: "Yes, if competitors do. Cheap, defends share, and the incremental revenue covers the spend many times over. Our Ecommerce SEO Agency UK team decides which terms rely on organic vs paid defence." },
  { q: "What ROAS is realistic on Google Ads?", a: "3.5-6× on Shopping and Search; 3-4.5× on PMax when properly segmented. Brand Search commonly returns 15-40× and should be reported separately." },
  { q: "How much should I spend on Google Ads to start?", a: "£3-5k/mo for meaningful Shopping + Search coverage. Below that budget you can't compete on Shopping impression share for competitive queries." },
  { q: "Google Ads vs Meta Ads - which is better?", a: "Different jobs. Google harvests existing demand (high intent, high ROAS). Meta creates demand (lower intent, higher volume). A real Ecommerce Marketing Agency UK runs both against blended MER." },
  { q: "How long does it take to see results?", a: "Google Shopping and Search stabilise in 30-45 days; PMax needs a full 45-60 day learning window before you can judge it fairly." },
  { q: "Do you set up Enhanced Conversions and server-side tracking?", a: "Yes - Enhanced Conversions, GA4, server-side GTM and offline conversion imports are our first-week deliverables on every Google account." },
  { q: "Can Google Ads work for Shopify and WooCommerce?", a: "Yes - we manage feeds via native Shopify Google channel, WooCommerce Product Feed Manager and DataFeedWatch, then optimise titles and custom labels for margin." },
  { q: "What's the difference between Search and Shopping?", a: "Search matches keywords to text ads; Shopping matches queries to product feeds with image + price. Both are essential for a healthy ecommerce Google account." },
  { q: "Do you handle YouTube Ads inside Google?", a: "Yes - Video Action Campaigns and Demand Gen are managed by the same team so budgets and creative align across YouTube, Shopping and Search." },
  { q: "How often do you refresh Google Ads creative?", a: "Search RSAs monthly, Shopping titles weekly, PMax asset groups every 3-4 weeks. Frequency depends on account velocity and seasonality." },
  { q: "What tools do you use?", a: "Google Ads Editor, Merchant Center, GA4, Optmyzr, DataFeedWatch and Looker Studio dashboards you can log into any time." },
  { q: "How is BeingEcom different from other Google Ads agencies?", a: "We're not a generalist PPC shop - we're a specialist Ecommerce Agency UK. Our media buyers, feed engineers and Ecommerce SEO Agency UK team share one revenue P&L per client." },
];

export const Route = createFileRoute("/services/performance-marketing/google-ads")({
  head: () => ({
    meta: [
      { title: "No.1 Google Ads Agency UK for Ecommerce | Search, Shopping & PMax | BeingEcom" },
      { name: "description", content: "Specialist Google Ads Agency UK for ecommerce. As a specialist Ecommerce Marketing Agency UK we run Search, Shopping and Performance Max with true incrementality for Shopify & WooCommerce brands." },
      { name: "keywords", content: "Google Ads agency UK, Ecommerce Marketing Agency UK, Ecommerce Agency UK, Ecommerce Growth Agency, Google Shopping agency, Performance Max agency, Shopify Google Ads, Merchant Center optimisation" },
      { property: "og:title", content: "No.1 Google Ads Agency UK for Ecommerce | Search, Shopping & PMax | BeingEcom" },
      { property: "og:description", content: "Specialist Ecommerce Agency UK running Search, Shopping and Performance Max with true incrementality for Shopify and WooCommerce brands." },
      { property: "og:url", content: "https://beingecom.com/services/performance-marketing/google-ads" },
    ],
    links: [
      { rel: "canonical", href: "https://beingecom.com/services/performance-marketing/google-ads" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "performance-marketing/google-ads", name: "Google Ads Agency UK", description: "Search, Shopping and Performance Max for Shopify & WooCommerce brands." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Performance Marketing", path: "/services/performance-marketing" }, { name: "Google Ads", path: "/services/performance-marketing/google-ads" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/performance-marketing/google-ads")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "google-ads",
      eyebrow: "Google Ads",
      heroImage: heroImg,
      heroTitle: "No.1 Google Ads Agency UK - capture every buying moment.",
      heroSub: "The specialist Ecommerce Marketing Agency UK for Google Shopping, Performance Max, Search and brand defence - Merchant Center feed optimisation engineered for profitable intent capture.",
      problemTitle: "Why most Google accounts leak budget.",
      problemBullets: [
        "PMax dumping spend into brand traffic.",
        "Shopping feeds with no titles, no segmentation.",
        "Search campaigns bleeding on broad match.",
      ],
      whatIsTitle: "Google ads are intent, not interruption.",
      whatIsBody: "Buyers are already searching. As a specialist Ecommerce Growth Agency we structure campaigns, clean the feed and ring-fence brand so every pound chases incremental revenue - then pair Google with our in-house SEO team so paid and organic compound instead of cannibalising.",
      systemTitle: "Our Google Ads system.",
      systemSteps: [
        { title: "Account & feed audit", body: "Structure, match types, feed health, conversions." },
        { title: "Feed optimisation", body: "Titles, attributes, segmentation, custom labels." },
        { title: "PMax + Search", body: "Asset groups, audience signals, brand exclusions." },
        { title: "Scale & defend", body: "Brand defence, competitor capture, geo expansion." },
      ],
      pillarsTitle: "What we run inside Google.",
      pillars: [
        { title: "Search", body: "Exact & phrase, branded vs non-branded split." },
        { title: "Shopping", body: "Standard & PMax, segmented by margin." },
        { title: "Performance Max", body: "Asset groups with audience signals." },
        { title: "Brand defence", body: "Capture brand intent at lowest CPC." },
      ],
      deepBlocks: [
        { title: "Feed optimisation", body: "Titles, GTINs, custom labels, supplemental feeds.", tags: ["Feed","GTIN","Labels"] },
        { title: "PMax structure", body: "Asset groups by margin tier with audience signals and brand exclusions.", tags: ["PMax","Asset groups","Signals"] },
        { title: "Search structure", body: "Branded vs non-branded, match-type discipline, negatives.", tags: ["Search","Negatives","Match types"] },
        { title: "Conversion tracking", body: "Enhanced conversions, server-side, offline imports.", tags: ["Enhanced","GA4","Offline"] },
      ],
      triggersTitle: "Levers that move Google ROAS.",
      triggers: ["Feed titles","Custom labels","Brand exclusion","Audience signals","Negative keywords","Bid strategy","Geo targeting","Device split"],
      comparison: {
        rows: [
          { criterion: "Buyer intent", us: "High (active search)", agency: "Low-Med (interruption)", inhouse: "Low (discovery feed)" },
          { criterion: "Typical ROAS", us: "3.5-6×", agency: "2.5-3.5×", inhouse: "1.8-3×" },
          { criterion: "Best funnel stage", us: "BOF harvest", agency: "TOF/MOF prospecting", inhouse: "TOF demand creation" },
          { criterion: "Creative volume", us: "Low (feed + RSA)", agency: "High (10-20/mo)", inhouse: "Very high (15-25/mo)" },
          { criterion: "Time to stabilise", us: "30-45 days", agency: "14-30 days", inhouse: "7-14 days" },
          { criterion: "Best for", us: "Established SKUs", agency: "New product launch", inhouse: "Gen-Z / viral products" },
        ],
      },
      mistakes: [
        { title: "One PMax campaign for everything", body: "Segment by margin tier and product category, or PMax will over-index low-margin bestsellers." },
        { title: "Not excluding brand from PMax", body: "PMax loves your brand terms because they convert cheap. Add a brand exclusion list day one." },
        { title: "Broad match without tROAS", body: "Broad match on manual CPC = donation to Google. Use it only with smart bidding + tight conversion signal." },
        { title: "Feed titles left as SKU codes", body: "Titles are the #1 Shopping lever. Rewrite to Brand + Product + Attribute + Use-case." },
        { title: "Ignoring offline conversion imports", body: "For high-AOV or considered products, upload sales data back into Google - smart bidding gets 10× smarter." },
      ],
      beforeAfter: {
        before: ["1.8× ROAS","Single PMax campaign","£62 CAC","Brand cannibalisation"],
        after: ["4.6× ROAS","Segmented PMax + Search","£28 CAC","Incremental only"],
      },
      caseStudy: {
        title: "Home goods: 1.8× → 4.6× ROAS in 60 days",
        problem: "PMax eating brand traffic, no feed segmentation.",
        strategy: "Brand exclusions, margin-segmented PMax, feed rebuild.",
        result: "4.6× ROAS at £28 CAC, 3.1× revenue lift.",
        metrics: [{ label: "ROAS", value: "4.6×" }, { label: "CAC", value: "£28" }, { label: "Days", value: "60" }],
      },
      ctaTitle: "Want the UK's No.1 Google Ads Agency to run your account?",
      impactStats: [
        { value: "4.6×", label: "Avg ROAS" },
        { value: "-55%", label: "CAC reduction" },
        { value: "+212%", label: "Incremental revenue" },
      ],
      metricBars: [
        { label: "ROAS", before: 1.8, after: 4.6, unit: "×", description: "Revenue ÷ Google ad spend." },
        { label: "CAC", before: 62, after: 28, unit: "£", description: "Cost per acquired customer on Google." },
        { label: "Impression share", before: 38, after: 72, unit: "%", description: "Share of available impressions on target queries." },
        { label: "Monthly ad revenue", before: 32, after: 142, unit: "£k", description: "Top-line Google-attributed revenue." },
      ],
      faqs: FAQ_LIST,
      relatedServices: [
        { to: "/services/seo", title: "Ecommerce SEO Agency UK", body: "Pair Google Ads with organic Shopping and Search coverage." },
        { to: "/services/paid-ads", title: "All Paid Ads Services", body: "Meta, TikTok and YouTube - one revenue P&L." },
        { to: "/services/cro", title: "Conversion Rate Optimisation", body: "Turn Google clicks into checkouts." },
        { to: "/services/analytics", title: "Analytics & Tracking", body: "Enhanced Conversions, GA4 and server-side GTM." },
        { to: "/pricing", title: "Pricing & Packages", body: "Transparent monthly retainers for every growth stage." },
        { to: "/audit", title: "Free Google Ads Audit", body: "Book a free 30-min audit of your account, feed and tracking." },
        { to: "/case-studies", title: "Google Ads Case Studies", body: "Real Shopify & Woo brands scaled by our Ecommerce Growth Agency." },
      ],
    }} />
  ),
});
