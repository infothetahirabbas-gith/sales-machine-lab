import type { HubPillarProps } from "@/components/site/HubPillar";

export const HUB_PILLARS: Record<string, {
  meta: { title: string; description: string };
  props: Omit<HubPillarProps, "ctaService" | "relatedServices"> & {
    ctaService: HubPillarProps["ctaService"];
    relatedServices: HubPillarProps["relatedServices"];
  };
}> = {
  "shopify-growth": {
    meta: {
      title: "Shopify Growth Hub — SEO, CRO, Speed, Paid & Email | BeingEcom",
      description: "The complete Shopify growth playbook for UK brands — SEO, speed, CRO, paid ads, email flows, headless Hydrogen and scaling case studies. Written by senior Shopify Plus operators.",
    },
    props: {
      eyebrow: "Shopify Growth Hub",
      h1: "Shopify Growth: the playbook for compounding revenue",
      answer:
        "Shopify growth is the compounding lift you get when SEO, CRO, paid media, email, speed and headless architecture ship together on a weekly cadence — not the sum of siloed channels. This hub is the operating manual senior Shopify teams use.",
      intro: (
        <>
          <p>
            Shopify is the fastest way to launch an ecommerce brand and, past £50k/month, the fastest place to stall
            when work stays siloed. Growth stops being a channel problem and becomes an <strong>operating problem</strong>:
            who owns the PDP experiment, who signs off on the bid change, who cleans the theme JS before the next Meta push.
          </p>
          <p>
            This hub is the way we run Shopify accounts internally — from a technical SEO baseline through headless
            Hydrogen migrations. Every sub-topic below links to a longer guide, a linked case study, and the exact
            service page for teams that want us to run it.
          </p>
        </>
      ),
      keyFacts: [
        { label: "Shopify GMV 2024", value: "$292B+", source: "Shopify 2024 Annual Report" },
        { label: "Avg speed lift → conv.", value: "+7–12%", source: "Deloitte + BeingEcom benchmarks" },
        { label: "Email share of revenue", value: "20–30%", source: "Klaviyo benchmarks" },
        { label: "PDP tests / quarter", value: "6–10", source: "BeingEcom pod cadence" },
      ],
      subtopics: [
        { title: "Shopify SEO", summary: "Collection architecture, product schema, faceted URLs and crawl-budget control.", href: "/services/seo" },
        { title: "Shopify speed optimisation", summary: "LCP under 2.5s on 4G — theme JS, image pipeline, Liquid audits.", href: "/services/store-development/shopify" },
        { title: "Shopify CRO", summary: "Structured experimentation on PDP, cart drawer, and checkout upsells.", href: "/services/cro" },
        { title: "Shopify Google Ads", summary: "P-Max, Standard Shopping, feed hygiene and profit-first bidding.", href: "/services/performance-marketing/google-ads" },
        { title: "Shopify Meta Ads", summary: "Creative testing frameworks, CAPI, MMM and true incrementality.", href: "/services/performance-marketing/facebook-ads" },
        { title: "Shopify email & SMS", summary: "Klaviyo flows: welcome, browse, cart, post-purchase, winback, VIP.", href: "/services/email-sms" },
        { title: "Shopify headless (Hydrogen)", summary: "When to migrate, how to migrate, and the cost of getting it wrong.", href: "/services/store-development/shopify" },
        { title: "Shopify Plus vs Advanced", summary: "The revenue and stack signals that make Plus worth the price step.", href: "/services/store-development/shopify" },
      ],
      playbook: [
        { step: "Diagnose", body: "Two-week baseline audit across SEO, speed, tracking, CRO, ads and retention. Output: revenue-tied opportunity map with £ impact estimates." },
        { step: "Stabilise the foundation", body: "Fix tracking (GA4 + CAPI + server-side), theme JS, PDP schema and Klaviyo flow gaps before any channel spend increases." },
        { step: "90-day compounding plan", body: "One flagship SEO project, one CRO test track, one paid scaling lane, one retention flow build — running in parallel, reviewed weekly." },
        { step: "Weekly execution rhythm", body: "Monday plan, Wednesday build, Friday review. Every metric ties back to contribution margin, not vanity ROAS." },
        { step: "Quarterly step-change", body: "One structural bet per quarter — headless migration, subscription launch, new market, or a major creative overhaul." },
      ],
      faqs: [
        { q: "When is a Shopify brand ready to invest in growth infrastructure?", a: "Once you have product-market fit and ~£30k/month in revenue. Below that, spend on offer, product and creative before hiring an operator team." },
        { q: "How long before Shopify SEO shows revenue?", a: "Technical + on-page fixes on top 20 PDPs typically show organic revenue movement inside 60–90 days. Category-level authority compounds across 6–12 months." },
        { q: "Should we go headless with Hydrogen?", a: "Only if you have a real merchandising or performance ceiling on the standard Shopify theme layer — usually £5m+ GMV brands. Headless adds engineering cost most sub-£5m brands cannot justify." },
        { q: "Which channel should we scale first?", a: "The one closest to profitability on your last 90 days of data. We rank channels by contribution margin per £ spent, not attribution model." },
      ],
      ctaService: { label: "See our Shopify service", to: "/services/store-development/shopify" },
      relatedServices: [
        { label: "Ecommerce SEO", to: "/services/seo" },
        { label: "CRO", to: "/services/cro" },
        { label: "Performance marketing", to: "/services/performance-marketing" },
        { label: "Email & SMS", to: "/services/email-sms" },
        { label: "Analytics", to: "/services/analytics" },
      ],
    },
  },
  "woocommerce-growth": {
    meta: {
      title: "WooCommerce Growth Hub — Speed, SEO, Checkout & Scaling | BeingEcom",
      description: "The complete WooCommerce growth playbook — plugin audits, performance, checkout conversion, SEO, hosting choices and scaling past the WordPress bottleneck.",
    },
    props: {
      eyebrow: "WooCommerce Growth Hub",
      h1: "WooCommerce Growth: scaling past the plugin ceiling",
      answer:
        "WooCommerce growth is a discipline of pruning as much as building — hosting, plugin count, database bloat and checkout friction determine your revenue ceiling long before creative or bid strategy do. This hub is the operating manual for scaling Woo stores past £100k/month.",
      intro: (
        <>
          <p>
            WooCommerce is the most flexible ecommerce platform and the easiest to accidentally make slow. The average
            store past £100k/month runs 40+ plugins, an unoptimised database, and a checkout that loses 30% of paying
            intent before the thank-you page. Fixing those three things typically outperforms any new ad campaign.
          </p>
          <p>
            This hub covers the Woo-specific work — hosting stack, cart architecture, FSE theme choices, wpDataTables
            for reporting — that Shopify teams don't have to think about, plus the parts (SEO, paid, email) that
            transfer cleanly between the two platforms.
          </p>
        </>
      ),
      keyFacts: [
        { label: "WooCommerce market share (WP CMS)", value: "~28%", source: "BuiltWith 2025" },
        { label: "Avg plugin count", value: "42", source: "WP Engine benchmarks" },
        { label: "Checkout abandonment", value: "69.8%", source: "Baymard 2025" },
        { label: "Speed lift after prune", value: "+45% LCP", source: "BeingEcom Woo audits" },
      ],
      subtopics: [
        { title: "WooCommerce SEO", summary: "Yoast vs Rank Math, category → product internal linking, schema output.", href: "/services/seo" },
        { title: "WooCommerce speed", summary: "Object cache, query monkey-patching, CDN, image pipeline, plugin prune.", href: "/services/store-development/woocommerce" },
        { title: "WooCommerce checkout CRO", summary: "Blocks vs shortcode, single-page vs multi-step, express payments." , href: "/services/cro" },
        { title: "Hosting for Woo at scale", summary: "Cloudways vs WP Engine vs Kinsta vs Rocket — real cost/perf numbers.", href: "/services/store-development/woocommerce" },
        { title: "Woo → Shopify Plus migration", summary: "When it's worth it, and how to keep every 301 and canonical intact.", href: "/blog/shopify-plus-migration-uk" },
        { title: "Woo subscriptions", summary: "Stripe billing vs Woo Subs vs SureCart — pick the right stack for retention.", href: "/services/scaling" },
        { title: "Woo analytics", summary: "GA4 enhanced ecommerce, server-side tracking, and the classic Woo dupe order bug.", href: "/services/analytics" },
        { title: "Woo case studies", summary: "Real UK Woo stores we scaled, and the constraints that shaped each play.", href: "/case-studies" },
      ],
      playbook: [
        { step: "Diagnose", body: "Full plugin audit + query monitor trace + Baymard-style checkout walkthrough. Output: prune list, hosting recommendation, checkout fix list." },
        { step: "Prune", body: "Remove or replace redundant plugins, consolidate builders, kill zombie CPTs, and rebuild the database indexes." },
        { step: "Speed pass", body: "Object cache (Redis), Cloudflare Enterprise or similar, image pipeline, lazy-loaded JS blocks — targeting LCP < 2.5s on 4G." },
        { step: "Checkout overhaul", body: "Block-based checkout, express payments (Apple Pay + PayPal), address autocomplete, VAT clarity, guest checkout first." },
        { step: "Channel scaling", body: "Only after foundation: layer SEO, Google Shopping, Meta and retention — with clean server-side tracking feeding each." },
      ],
      faqs: [
        { q: "Is WooCommerce still worth it in 2026?", a: "Yes — for brands with heavy customisation, subscription complexity, or content-led SEO, Woo is often cheaper and more flexible than Shopify Plus. For pure DTC with standard checkout, Shopify wins on TCO." },
        { q: "How many plugins is too many?", a: "There is no magic number, but past ~30 active plugins we consistently see conflicts, security gaps, and admin slowdown. Audit twice a year." },
        { q: "Do we need managed WP hosting?", a: "Above £30k/month, yes. Managed hosting (WP Engine, Kinsta, Rocket, Cloudways) pays for itself in uptime, backups and the object cache alone." },
        { q: "When should we migrate to Shopify Plus?", a: "When engineering time on plugin conflicts and hosting exceeds ~1 day per week, or when your team wants to focus on merchandising rather than infrastructure." },
      ],
      ctaService: { label: "See our WooCommerce service", to: "/services/store-development/woocommerce" },
      relatedServices: [
        { label: "Ecommerce SEO", to: "/services/seo" },
        { label: "CRO", to: "/services/cro" },
        { label: "Store development", to: "/services/store-development" },
        { label: "Analytics", to: "/services/analytics" },
      ],
    },
  },
  "ecommerce-seo": {
    meta: {
      title: "Ecommerce SEO Hub — Technical, On-Page, Off-Page, Local, AEO | BeingEcom",
      description: "The complete ecommerce SEO stack — technical crawl and indexation, on-page optimisation, off-page authority, local, international and Answer Engine Optimisation.",
    },
    props: {
      eyebrow: "Ecommerce SEO Hub",
      h1: "Ecommerce SEO: the full-stack playbook",
      answer:
        "Ecommerce SEO is a stack: crawl and indexation at the base, then on-page optimisation of collections and PDPs, then off-page authority, then local, international and Answer Engine Optimisation for AI Overviews. Skip a layer and the layers above cap out.",
      intro: (
        <>
          <p>
            Most ecommerce SEO advice online is written for content sites. Product sites break the rules —
            faceted URLs, out-of-stock handling, variant canonicals, seasonal collections, review corpora — and need
            their own playbook.
          </p>
          <p>
            This hub is that playbook. Each layer of the stack has its own guide, its own service page for the teams
            who want us to run it, and its own set of measurable outcomes so you know when a layer is "done".
          </p>
        </>
      ),
      keyFacts: [
        { label: "Position 1 → 3 CTR", value: "27% → 11%", source: "Advanced Web Ranking 2025" },
        { label: "Pages needing indexation fixes", value: "50%+", source: "BeingEcom crawl data" },
        { label: "AI Overview coverage (US)", value: "~13% queries", source: "Semrush AI Overview study" },
        { label: "Avg SEO revenue lift (12mo)", value: "+120%", source: "BeingEcom client cohort" },
      ],
      subtopics: [
        { title: "Technical SEO", summary: "Crawl budget, indexation, log files, Core Web Vitals, faceted nav, canonicals.", href: "/services/seo/technical" },
        { title: "On-page SEO", summary: "Title, H1, PDP copy, schema, image alt, internal linking at scale.", href: "/services/seo/on-page" },
        { title: "Off-page SEO", summary: "Digital PR, HARO, brand mentions, unlinked mention recovery.", href: "/services/seo/off-page" },
        { title: "Local SEO", summary: "GBP, local landing pages, citations for click-and-collect and showroom brands.", href: "/services/seo/local" },
        { title: "International SEO", summary: "Hreflang, ccTLD vs subfolder, cross-market currency and stock signals.", href: "/services/seo/international" },
        { title: "AEO — Answer Engine Optimisation", summary: "Structuring pages to be quoted by ChatGPT, Perplexity, Google AI Overviews.", href: "/services/seo/aeo" },
        { title: "GEO — Generative Engine Optimisation", summary: "Verifiable stats, named authors, outbound citations — the LLM-friendly page shape.", href: "/services/seo/aeo" },
        { title: "Content architecture", summary: "Hub → guide → glossary → case study — the topical model AI search rewards.", href: "/hub" },
      ],
      playbook: [
        { step: "Crawl + index audit", body: "Baseline Sitebulb/Screaming Frog + GSC coverage export. Output: index-worthy vs waste-worthy URL list, canonical + noindex changes." },
        { step: "PDP + collection template pass", body: "Rebuild templates for the top 20% of pages driving 80% of the traffic. Schema, copy, review corpus, internal links, image alt." },
        { step: "Authority build", body: "Digital PR campaigns tied to data or opinion — never PBNs. Target 3–6 real editorial links per month, measured on referring domains." },
        { step: "Local + international layers", body: "Layer GBP, hreflang and market-specific stores only after the base layers hit target." },
        { step: "AEO + GEO layer", body: "Rewrite every commercial page to answer-first shape: ≤60-word direct answer, definitional block, named evidence, FAQ." },
      ],
      faqs: [
        { q: "How long does ecommerce SEO take to work?", a: "Technical fixes: 30–60 days. On-page rewrites on top pages: 60–90 days. Authority + category dominance: 6–12 months. This is normal — SEO compounds." },
        { q: "Do we still need backlinks in 2026?", a: "Yes. Links remain a top-3 ranking factor for commercial queries. What changed is the source quality bar — links from real editorial coverage still work; PBNs and directories don't." },
        { q: "What is Answer Engine Optimisation (AEO)?", a: "Structuring content so answer engines (Google AI Overviews, ChatGPT, Perplexity, Claude) can extract and cite it. Short direct answers, definitional blocks, named evidence, FAQ schema." },
        { q: "How is GEO different from AEO?", a: "AEO is about being extractable. GEO (Generative Engine Optimisation) is about being cited — verifiable stats, named authors, outbound source links, original research." },
      ],
      ctaService: { label: "See our SEO service", to: "/services/seo" },
      relatedServices: [
        { label: "Technical SEO", to: "/services/seo/technical" },
        { label: "On-page SEO", to: "/services/seo/on-page" },
        { label: "AEO", to: "/services/seo/aeo" },
        { label: "International SEO", to: "/services/seo/international" },
      ],
    },
  },
  "paid-media": {
    meta: {
      title: "Paid Media Hub — Meta, Google, TikTok, YouTube for Ecommerce | BeingEcom",
      description: "The complete paid media playbook for ecommerce — Meta, Google, TikTok, YouTube, creative testing, MMM, incrementality and contribution-margin bidding.",
    },
    props: {
      eyebrow: "Paid Media Hub",
      h1: "Paid Media: buying revenue, not clicks",
      answer:
        "Ecommerce paid media is a portfolio problem: Meta finds demand, Google captures it, TikTok seeds it, YouTube compounds it. The teams that scale profitably manage the portfolio against contribution margin and MER — not per-platform ROAS.",
      intro: (
        <>
          <p>
            Platform ROAS lies. It rewards the last click, ignores organic overlap, and hides the campaigns that
            actually grew the business. Every mature ecommerce brand eventually rebuilds their reporting against a
            north-star metric — contribution margin per pound spent, tracked through MER and incrementality tests.
          </p>
          <p>
            This hub covers the four channels that matter for DTC, plus the discipline that ties them together:
            creative testing volume, server-side tracking, MMM, and honest incrementality.
          </p>
        </>
      ),
      keyFacts: [
        { label: "Meta CPMs YoY", value: "+7%", source: "Skai 2025 Digital Marketing Report" },
        { label: "TikTok Shop GMV 2024", value: "$33B+", source: "TikTok Q4 2024 investor letter" },
        { label: "Google P-Max share of Shopping", value: "70%+", source: "Tinuiti 2025" },
        { label: "Avg creative testing needed", value: "20–40/mo", source: "BeingEcom paid pod cadence" },
      ],
      subtopics: [
        { title: "Meta Ads for ecommerce", summary: "Creative-first accounts, CBO vs ABO, Advantage+ Shopping, CAPI and MMM.", href: "/services/performance-marketing/facebook-ads" },
        { title: "Google Ads for ecommerce", summary: "P-Max, Standard Shopping, feed hygiene, brand vs non-brand attribution.", href: "/services/performance-marketing/google-ads" },
        { title: "TikTok Ads for ecommerce", summary: "Spark ads, creator content, TikTok Shop mechanics, and the UGC pipeline.", href: "/services/performance-marketing/tiktok-ads" },
        { title: "YouTube Ads for ecommerce", summary: "In-stream + shorts + demand-gen — why YouTube compounds ROAS for months.", href: "/services/performance-marketing/youtube-ads" },
        { title: "Media buying operating model", summary: "How a senior media buyer's week is structured — daily, weekly, monthly rituals.", href: "/services/performance-marketing/media-buying" },
        { title: "Instagram Ads", summary: "Reels, stories and creator whitelisting — the actual Instagram-native creative pipeline.", href: "/services/performance-marketing/instagram-ads" },
        { title: "Creative production", summary: "Statics, UGC, motion — the volume and rate you need to keep CPMs sane.", href: "/services/creative" },
        { title: "Attribution & MMM", summary: "GA4, CAPI, server-side, MMM tools, and how to sanity-check platform ROAS.", href: "/services/analytics" },
      ],
      playbook: [
        { step: "Set the north-star", body: "Contribution margin per £ spent, tracked at MER level. Everything else is a diagnostic, not a decision." },
        { step: "Fix tracking", body: "GA4 + Meta CAPI + Google Enhanced Conversions + server-side layer. No optimisation on broken data." },
        { step: "Creative supply chain", body: "20–40 fresh creatives / month minimum for accounts >£30k/month spend. UGC, statics, motion — testing matrix, not one-offs." },
        { step: "Channel allocation", body: "Rebalance monthly by contribution margin, not platform ROAS. Incrementality-test the biggest bets quarterly." },
        { step: "Scale", body: "Once winning ads + LTV curve support it, scale in 20% weekly increments — never doubling budget overnight." },
      ],
      faqs: [
        { q: "Meta or Google — which first?", a: "Google if you have existing branded demand (search volume for your name/product). Meta if you're seeding demand for a new or category-defining product." },
        { q: "Is TikTok worth it if we're not a Gen Z brand?", a: "Yes if your product has organic-content potential (before/after, demo, unboxing, comparison). No if your value prop only lands with founder-led long-form." },
        { q: "How much creative do we need?", a: "Match your CPM inflation curve. If Meta CPMs are up 30% YoY, your fresh-creative rate needs to be up ~30% to hold ROAS steady." },
        { q: "Do we need MMM at our size?", a: "Under £100k/month spend: skip formal MMM, use holdout tests. Over £200k/month: full MMM pays for itself in one channel-reallocation decision." },
      ],
      ctaService: { label: "See our performance marketing service", to: "/services/performance-marketing" },
      relatedServices: [
        { label: "Meta Ads", to: "/services/performance-marketing/facebook-ads" },
        { label: "Google Ads", to: "/services/performance-marketing/google-ads" },
        { label: "TikTok Ads", to: "/services/performance-marketing/tiktok-ads" },
        { label: "Creative production", to: "/services/creative" },
      ],
    },
  },
  "cro": {
    meta: {
      title: "CRO Hub — Ecommerce Experimentation, PDP, Cart & Checkout | BeingEcom",
      description: "The complete CRO playbook — user research, hypothesis writing, sample sizing, guardrails and the PDP, cart and checkout patterns that actually lift ecommerce revenue.",
    },
    props: {
      eyebrow: "CRO Hub",
      h1: "CRO: structured experimentation, not vibes",
      answer:
        "Ecommerce CRO is a research process: quantitative funnel analysis, qualitative user research, hypothesis backed by evidence, correctly sized A/B tests, and honest guardrails. Anyone who talks about tests before they've done the research is selling you vibes.",
      intro: (
        <>
          <p>
            The average Shopify or Woo store leaves 30–60% of revenue on the table between add-to-cart and thank-you.
            Finding that revenue is not about the latest checkout hack — it's about the right test, run at the right
            sample size, on the right page, in the right sequence.
          </p>
          <p>
            This hub is the CRO stack we run against every account: research → hypothesis → build → measure → next.
            Sub-topics cover PDP, cart, checkout, PLP, personalisation and the tooling that makes it repeatable.
          </p>
        </>
      ),
      keyFacts: [
        { label: "Avg ecommerce checkout abandonment", value: "69.8%", source: "Baymard Institute 2025" },
        { label: "Tests needed before 1 win", value: "~5", source: "Convert.com 2025 benchmarks" },
        { label: "Min sample per variant", value: "~5–10k users", source: "BeingEcom test protocol" },
        { label: "Avg PDP conv. lift (winning test)", value: "+9%", source: "BeingEcom experiment log" },
      ],
      subtopics: [
        { title: "Research → hypothesis", summary: "Heatmaps, session replay, on-site polls, GA4 funnels — what to measure before you test.", href: "/services/cro" },
        { title: "PDP CRO", summary: "Hero image, price framing, USP strip, sticky ATC, size guides, review pattern.", href: "/services/cro" },
        { title: "Cart CRO", summary: "Drawer vs page, express payments, upsell offers, shipping thresholds.", href: "/services/cro" },
        { title: "Checkout CRO", summary: "Guest-first, address autocomplete, error handling, trust markers, VAT clarity.", href: "/services/cro" },
        { title: "PLP CRO", summary: "Filter UX, out-of-stock handling, badge system, sort defaults.", href: "/services/cro" },
        { title: "Personalisation", summary: "Segment-based hero, category-based recommendations, returning-visitor journeys.", href: "/services/cro" },
        { title: "Experimentation tooling", summary: "Convert vs VWO vs GrowthBook — the trade-offs at each stage.", href: "/services/cro" },
        { title: "Test velocity", summary: "How to run 6–10 winning-or-learning tests per quarter without breaking the site.", href: "/services/cro" },
      ],
      playbook: [
        { step: "Baseline the funnel", body: "GA4 exploration + Shopify/Woo funnel export. Find the biggest drop-off in absolute revenue, not percentage." },
        { step: "Layer qualitative", body: "Heatmap + session replay + on-site poll on the two worst-performing steps. Look for confusion, not just clicks." },
        { step: "Write the hypothesis", body: "'Because X, we believe Y will move metric Z by W%.' No hypothesis, no test." },
        { step: "Size + guardrail", body: "Pre-calculate sample size for a realistic MDE. Set guardrails on revenue-per-visitor, refund rate, and mobile bounce." },
        { step: "Ship + document", body: "Winning tests roll out, losing tests are documented in the experiment log. The log is the moat — it's how tests get faster over time." },
      ],
      faqs: [
        { q: "How many tests do we need per quarter?", a: "6–10 well-designed experiments per quarter is a healthy cadence for a £100k–£1m/month brand. Volume above that adds cost faster than it adds learning." },
        { q: "What's a good conversion rate?", a: "Depends on category, price and traffic mix. Median UK Shopify ecommerce is ~2.1% (Littledata 2025). Anything above 3.5% is strong; above 5% is exceptional." },
        { q: "Should we do CRO before we scale ads?", a: "Yes. A 15% CRO lift multiplies against every future pound of ad spend. Skipping CRO to scale ads first is buying revenue at a permanent discount." },
        { q: "Which tool should we use?", a: "GrowthBook (open-source, cheap) up to ~£300k/month, Convert or VWO past that. Optimizely and Adobe Target only if you already run enterprise stacks." },
      ],
      ctaService: { label: "See our CRO service", to: "/services/cro" },
      relatedServices: [
        { label: "CRO", to: "/services/cro" },
        { label: "Analytics", to: "/services/analytics" },
        { label: "Store development", to: "/services/store-development" },
      ],
    },
  },
  "ai-automation": {
    meta: {
      title: "AI Automation Hub — Ecommerce Ops, Reporting, Creative & Support | BeingEcom",
      description: "How senior ecommerce teams use AI for reporting, creative testing, keyword research, customer support and internal ops — with the exact stacks and prompts that work.",
    },
    props: {
      eyebrow: "AI Automation Hub",
      h1: "AI Automation: leverage for senior ecommerce teams",
      answer:
        "AI automation in ecommerce is about giving senior operators leverage, not replacing them. The right pipelines free your team from reporting, keyword research, creative variants and Tier-1 support — so they spend hours on judgement, not on repetition.",
      intro: (
        <>
          <p>
            Most "AI for ecommerce" content is either wildly overpromised (autonomous agents running your ads) or
            wildly underused (a Chat window nobody opens). The middle ground — where AI actually earns its keep —
            is a set of small, boring automations wired into daily operator workflows.
          </p>
          <p>
            This hub covers the automations we run internally and for clients: automated weekly reporting, creative
            variant generation, keyword clustering, Tier-1 support triage, and the internal tooling that lets a small
            senior team serve dozens of accounts at real depth.
          </p>
        </>
      ),
      keyFacts: [
        { label: "Time saved / operator / week", value: "8–12h", source: "BeingEcom internal audit 2025" },
        { label: "Creative variants / prompt cycle", value: "20–40", source: "BeingEcom creative pipeline" },
        { label: "Support tickets AI-triaged", value: "60–80%", source: "Gorgias + BeingEcom benchmarks" },
        { label: "Reporting cycle time cut", value: "-70%", source: "BeingEcom Looker + LLM pipeline" },
      ],
      subtopics: [
        { title: "Automated weekly reporting", summary: "GA4 + Shopify + Meta + Klaviyo → one narrative report, LLM-generated, human-reviewed.", href: "/services/ai-automation" },
        { title: "AI creative testing", summary: "Prompt frameworks for hook variants, static ad copy, and UGC-style scripts.", href: "/services/ai-automation" },
        { title: "AI keyword research", summary: "Clustering, intent classification, SERP feature scanning — 10× faster than manual.", href: "/services/ai-automation" },
        { title: "AI-triaged customer support", summary: "Gorgias/Zendesk macros driven by classification, with escalation paths that respect brand voice.", href: "/services/ai-automation" },
        { title: "AI-assisted CRO research", summary: "Session-replay summarisation, poll clustering, and hypothesis draft generation.", href: "/services/ai-automation" },
        { title: "AI for merchandising", summary: "Product description generation, image tagging, and category page rewriting at scale.", href: "/services/ai-automation" },
        { title: "AI for retention", summary: "Segment-based flow copy, subject-line testing, and predictive churn scoring.", href: "/services/ai-automation" },
        { title: "AI governance", summary: "How to keep AI-generated content on-brand, factual, and off the wrong pages.", href: "/services/ai-automation" },
      ],
      playbook: [
        { step: "Map the operator week", body: "Log every recurring task by role. Anything under 4 hours per week is a candidate; anything requiring judgement is not." },
        { step: "Automate the reporting layer first", body: "Weekly reports are the highest-leverage automation — they touch every account, every week, and take hours." },
        { step: "Add creative variant generation", body: "Prompt frameworks for hook variants, ad copy and script drafts. Human reviews every variant before it ships." },
        { step: "Layer classification", body: "Support tickets, session-replay tags, keyword intent — anything that involves 'which bucket does this go into?'" },
        { step: "Governance + review", body: "Every AI output has a human owner and a sample-review cadence. No autonomous publishing on client-facing surfaces." },
      ],
      faqs: [
        { q: "Will AI replace our ecommerce team?", a: "No — it replaces the repetitive parts of their week. Judgement, taste, creative direction, and client relationships are still human." },
        { q: "Which LLM should we use internally?", a: "Portfolio: a strong general model (GPT/Claude) for judgement-heavy tasks, a fast model for classification, and a coding-tuned model for internal tooling." },
        { q: "Is AI-generated copy safe for SEO?", a: "Only when a named human edits and takes responsibility. Google's Helpful Content guidance doesn't ban AI — it bans unhelpful content, human or otherwise." },
        { q: "How do we start?", a: "Start with weekly reporting automation — highest leverage, lowest risk, easiest to measure the time saved." },
      ],
      ctaService: { label: "See our AI automation service", to: "/services/ai-automation" },
      relatedServices: [
        { label: "AI automation", to: "/services/ai-automation" },
        { label: "Analytics", to: "/services/analytics" },
        { label: "CRO", to: "/services/cro" },
      ],
    },
  },
};
