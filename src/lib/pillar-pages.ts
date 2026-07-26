// Phase 4-5 pillar pages: authority + BOFU capture surfaces.
// Data-driven so all 12 routes share one component and one FAQ/schema pipeline.

export type PillarSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type PillarLink = { label: string; to: string; note?: string };

export type PillarPage = {
  slug: string;                // used in canonical + breadcrumb
  path: string;                // route path (with leading /)
  title: string;               // <title>
  metaTitle: string;           // og:title (can equal title)
  description: string;         // <meta description>
  eyebrow: string;             // hero eyebrow
  h1: string;
  intro: string;               // hero paragraph
  summary: string;             // AISummary block, entity-first ≤60 words
  pills?: string[];            // hero pill labels
  sections: PillarSection[];
  highlights?: { label: string; value: string }[];
  related: PillarLink[];       // internal linking
  faqs: { q: string; a: string }[];
  ctaHeading?: string;
  ctaSub?: string;
};

// ---------- helpers ----------
const STANDARD_RELATED: PillarLink[] = [
  { label: "Methodology", to: "/methodology" },
  { label: "Case studies", to: "/case-studies" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

// ---------- content ----------
export const PILLAR_PAGES: PillarPage[] = [
  {
    slug: "academy",
    path: "/academy",
    title: "Ecommerce SEO Academy | Free Learning Hub for Shopify & DTC",
    metaTitle: "Ecommerce SEO Academy - Free Learning Hub | BeingEcom",
    description:
      "The BeingEcom Academy: free, in-depth lessons on ecommerce SEO, Shopify growth, paid media, CRO, retention and AI search - written by practitioners running live UK stores.",
    eyebrow: "Learning hub",
    h1: "The Ecommerce Growth Academy",
    intro:
      "A structured library of ecommerce lessons - product SEO, Shopify technicals, paid media, CRO, retention, and AI search - written by the same senior operators who run our client accounts.",
    summary:
      "The BeingEcom Academy is a free ecommerce learning hub covering Shopify SEO, WooCommerce SEO, paid media, CRO, retention and AI search. Every lesson is written by senior practitioners who run live UK ecommerce accounts, not junior content writers.",
    pills: ["Free", "Practitioner-written", "UK-first"],
    sections: [
      {
        heading: "Ecommerce SEO track",
        body: "Foundations of organic growth for product-led stores. Category and PDP structure, faceted URL control, internal linking at catalogue scale, and how to keep rankings through platform migrations.",
        bullets: [
          "Ecommerce SEO fundamentals",
          "Product page optimisation",
          "Category page optimisation",
          "Faceted & duplicate content control",
        ],
      },
      {
        heading: "Shopify track",
        body: "Every lesson specific to Shopify and Shopify Plus - the technicals that theme docs skip, the apps that quietly hurt SEO, and how to run replatforms without losing traffic.",
        bullets: [
          "Shopify technical SEO",
          "Shopify Plus migrations",
          "App SEO impact audit",
          "International Shopify SEO",
        ],
      },
      {
        heading: "Growth marketing track",
        body: "Paid media, CRO and retention treated as one system rather than three silos. Media-buyer thinking, PDP experimentation, and Klaviyo flows that pay for themselves inside a month.",
        bullets: [
          "Paid media playbooks",
          "CRO test frameworks",
          "Email & SMS retention",
          "Landing page systems",
        ],
      },
      {
        heading: "AI search track",
        body: "GEO, AEO and how ecommerce brands surface inside ChatGPT, Perplexity, Gemini and Google AI Overviews. Entity signals, extractable answer blocks, and citation-earning content.",
        bullets: [
          "Generative Engine Optimisation",
          "Answer Engine Optimisation",
          "ChatGPT & Perplexity visibility",
          "AI Overviews for ecommerce",
        ],
      },
    ],
    related: [
      { label: "Blog", to: "/blog" },
      { label: "Free tools", to: "/tools" },
      { label: "Benchmarks", to: "/benchmarks" },
      { label: "Glossary", to: "/glossary" },
    ],
    faqs: [
      { q: "Is the academy free?", a: "Yes. Every lesson, guide and template inside the academy is free. It's how we prove capability before anyone considers hiring us." },
      { q: "Who writes the lessons?", a: "Senior practitioners inside BeingEcom - people who run live Shopify and WooCommerce accounts every day. Nothing is outsourced to freelance content mills." },
      { q: "Do you cover WooCommerce as well as Shopify?", a: "Yes. Roughly a third of the lessons are platform-agnostic, half focus on Shopify or Shopify Plus, and the remainder cover WooCommerce, headless and enterprise stacks." },
      { q: "How often is new content published?", a: "New long-form lessons ship every 2-3 weeks. Existing lessons are re-audited quarterly against fresh SERP and AI-search data." },
    ],
    ctaHeading: "Want the academy applied to your store?",
    ctaSub: "Book a strategy call and we'll walk you through the exact lessons your store needs to work through first.",
  },
  {
    slug: "ecommerce-seo-pricing",
    path: "/ecommerce-seo-pricing",
    title: "Ecommerce SEO Pricing UK | Costs, Retainers & What Affects Price",
    metaTitle: "Ecommerce SEO Pricing UK 2026 | BeingEcom",
    description:
      "UK ecommerce SEO pricing explained: monthly retainers, project fees, what actually drives cost, realistic timelines and how to compare quotes without getting burned.",
    eyebrow: "Investment guide",
    h1: "Ecommerce SEO Pricing in the UK",
    intro:
      "A transparent breakdown of what ecommerce SEO actually costs in the UK, what drives the difference between a £1,500 retainer and a £6,000 one, and how to spot proposals that will never work.",
    summary:
      "Serious ecommerce SEO in the UK typically runs £2,000-£8,000+ per month depending on catalogue size, platform, competition and international scope. Cost is driven by senior time - not tools, reports or offshore volume - and outcomes usually take 4-9 months to fully materialise.",
    pills: ["UK pricing", "Retainer + project", "Transparent"],
    sections: [
      {
        heading: "Typical UK ecommerce SEO investment levels",
        body: "Real ranges we see across UK ecommerce accounts, based on catalogue size, competitive intensity and internal capability.",
        bullets: [
          "Starter (small catalogue, low competition): £1,500-£2,500 per month",
          "Growth (Shopify / WooCommerce, competitive niche): £3,000-£5,000 per month",
          "Scale (Shopify Plus, enterprise catalogue, international): £6,000-£12,000 per month",
          "One-off technical audit: £2,500-£6,000",
          "Migration SEO project: £4,000-£15,000",
        ],
      },
      {
        heading: "What actually drives ecommerce SEO cost",
        body: "Price differences almost never come from tools - they come from senior hours, technical scope and how much manual work the catalogue needs.",
        bullets: [
          "Catalogue size (1k vs 20k SKUs is a different problem)",
          "Platform (Shopify Plus and headless take longer)",
          "Competition intensity in your niche",
          "International or multi-region requirements",
          "Whether content production is included",
          "Reporting depth and stakeholder cadence",
        ],
      },
      {
        heading: "Realistic timelines",
        body: "Ecommerce SEO does not produce meaningful revenue in 30 days. Anyone promising that is running a report, not an SEO programme.",
        bullets: [
          "Months 1-2: technical foundation and diagnostics",
          "Months 3-4: content and structural fixes indexed",
          "Months 5-6: measurable non-brand traffic lift",
          "Months 7-9: compounding revenue impact",
        ],
      },
      {
        heading: "How to compare proposals without getting burned",
        body: "Most bad SEO retainers look identical to good ones on paper. These are the four things that separate them in practice.",
        bullets: [
          "Who does the work - senior or offshore team?",
          "Deliverables tied to revenue, not activity",
          "Named owner on your account",
          "Reporting that shows non-brand organic revenue, not just traffic",
        ],
      },
    ],
    related: [
      { label: "Pricing", to: "/pricing" },
      { label: "Ecommerce SEO service", to: "/services/seo" },
      { label: "Shopify SEO packages", to: "/shopify-seo-packages" },
      { label: "Ecommerce SEO consultant", to: "/ecommerce-seo-consultant" },
    ],
    faqs: [
      { q: "What's the minimum realistic ecommerce SEO budget?", a: "For a small UK Shopify store in a low-competition niche, £1,500-£2,500 per month can produce measurable progress. Below that you're buying reports, not results." },
      { q: "Why do prices vary so much between agencies?", a: "The variance is almost entirely people. Cheap retainers use offshore juniors; senior UK operators cost more per hour but need far fewer hours to move the needle." },
      { q: "How long before I see revenue impact?", a: "On most Shopify stores we see non-brand organic revenue lift between month 5 and month 7, with compounding growth from month 9 onwards." },
      { q: "Do you offer performance-based pricing?", a: "For a small subset of stores that clear our qualification criteria, yes - typically as a hybrid of retainer plus revenue share. Most engagements are fixed retainer." },
      { q: "Is SEO cheaper than paid ads?", a: "Cheaper per acquisition once it compounds - but slower to start. Most scaling brands run both, with SEO carrying long-term margin and ads carrying short-term volume." },
    ],
  },
  {
    slug: "shopify-seo-packages",
    path: "/shopify-seo-packages",
    title: "Shopify SEO Packages UK | Retainers, Audits & Migration",
    metaTitle: "Shopify SEO Packages UK | BeingEcom",
    description:
      "Shopify SEO packages built for UK DTC brands: technical audits, growth retainers, Shopify Plus migration SEO and international rollouts - transparent scope and deliverables.",
    eyebrow: "Shopify SEO",
    h1: "Shopify SEO Packages for UK Brands",
    intro:
      "Four Shopify SEO packages, each with a defined scope, deliverables and expected outcome. Built for Shopify, Shopify Plus, and headless Shopify stores.",
    summary:
      "BeingEcom's Shopify SEO packages cover four scopes: technical audit, growth retainer, Plus migration SEO and international rollout. All are delivered by senior UK operators, use the same six-stage Growth System™, and produce measurable non-brand organic revenue - not just traffic.",
    pills: ["Shopify & Shopify Plus", "Senior UK team", "Fixed scope"],
    sections: [
      {
        heading: "Package 1 - Shopify Technical Audit",
        body: "A deep, indexation-first audit of your Shopify store. Ideal for stores that have never had a specialist review or are about to invest in growth.",
        bullets: [
          "Crawl, index & log-file review",
          "Faceted URL and duplicate content mapping",
          "Theme, app and speed audit",
          "60-90 day prioritised fix roadmap",
        ],
      },
      {
        heading: "Package 2 - Shopify Growth Retainer",
        body: "Ongoing SEO programme for Shopify and Shopify Plus stores serious about organic revenue growth. Runs on the six-stage Growth System™.",
        bullets: [
          "Monthly technical + content sprints",
          "Category and PDP optimisation cycle",
          "Content briefing and internal linking",
          "Non-brand organic revenue reporting",
        ],
      },
      {
        heading: "Package 3 - Shopify Plus Migration SEO",
        body: "Rank-safe migrations from Magento, WooCommerce, BigCommerce or legacy Shopify themes into Shopify Plus. Zero-loss URL and content strategy.",
        bullets: [
          "Pre-migration crawl and revenue baseline",
          "URL mapping and 301 strategy",
          "Content, schema and tracking parity",
          "Post-launch monitoring and recovery",
        ],
      },
      {
        heading: "Package 4 - International Shopify SEO",
        body: "Rollouts into US, EU or Commonwealth markets. Market selection, subfolder vs subdomain, hreflang, currency, and localised content.",
        bullets: [
          "Market prioritisation and feasibility",
          "Hreflang and canonical architecture",
          "Localised keyword and content plans",
          "Local link and PR seeding",
        ],
      },
    ],
    highlights: [
      { label: "Retainer range", value: "£2k-£12k/mo" },
      { label: "Migration project", value: "£4k-£15k" },
      { label: "Audit turnaround", value: "3-4 weeks" },
    ],
    related: [
      { label: "Shopify growth hub", to: "/hub/shopify-growth" },
      { label: "Ecommerce SEO service", to: "/services/seo" },
      { label: "Migration SEO", to: "/ecommerce-migration-seo" },
      { label: "Pricing", to: "/ecommerce-seo-pricing" },
    ],
    faqs: [
      { q: "Do you only work with Shopify?", a: "No - most of our Shopify work is Shopify or Shopify Plus, but we also work on WooCommerce, headless Shopify and enterprise stacks." },
      { q: "Can you handle Shopify Plus migrations?", a: "Yes - migration SEO is a core specialism. We've protected 6- and 7-figure organic revenue lines through Plus migrations." },
      { q: "Do you write the content or brief it?", a: "Both, depending on the package. Growth retainers include full content briefing; production is either in-house or with a vetted network of UK ecommerce writers." },
      { q: "How fast can you start?", a: "Onboarding for the audit package is 5-7 days. Retainers typically start within 2 weeks of contract sign." },
    ],
  },
  {
    slug: "ecommerce-seo-consultant",
    path: "/ecommerce-seo-consultant",
    title: "Ecommerce SEO Consultant UK | Independent Senior Advice",
    metaTitle: "Ecommerce SEO Consultant UK | BeingEcom",
    description:
      "Independent, senior ecommerce SEO consulting for UK Shopify and WooCommerce brands - strategy, audits, migration oversight and fractional SEO leadership.",
    eyebrow: "Consulting",
    h1: "Ecommerce SEO Consulting for UK Brands",
    intro:
      "Consulting engagements for founders and marketing directors who need senior ecommerce SEO thinking - not a junior team, not a 200-slide report.",
    summary:
      "BeingEcom's ecommerce SEO consulting gives UK founders direct access to senior operators for strategy, audits, migration oversight and fractional SEO leadership. Consulting is billed as fixed-scope projects or as a monthly retainer of senior hours, not as a delegated agency service.",
    pills: ["Senior only", "Fractional", "UK-based"],
    sections: [
      {
        heading: "Strategy consulting",
        body: "For founders and directors deciding where to invest next. Six-week engagements that turn ambiguity into a costed 12-month ecommerce growth plan.",
        bullets: [
          "Growth diagnosis across SEO, ads, CRO, retention",
          "Prioritised 12-month roadmap",
          "Budget model and expected outcomes",
          "Vendor and hiring recommendations",
        ],
      },
      {
        heading: "Migration & replatform oversight",
        body: "Independent SEO oversight for teams already working with a developer or design agency but needing senior migration SEO to protect revenue.",
        bullets: [
          "Pre-migration risk assessment",
          "URL, redirect and schema QA",
          "Post-launch monitoring",
          "Rollback and recovery planning",
        ],
      },
      {
        heading: "Fractional SEO leadership",
        body: "Ongoing senior SEO leadership for in-house teams that need a head of SEO but not a full-time hire.",
        bullets: [
          "Monthly strategic direction",
          "Roadmap and OKR ownership",
          "Team upskilling and reviews",
          "Vendor management",
        ],
      },
    ],
    related: [
      { label: "About the founder", to: "/about/tahir-abbas" },
      { label: "Methodology", to: "/methodology" },
      { label: "Ecommerce SEO pricing", to: "/ecommerce-seo-pricing" },
      { label: "Case studies", to: "/case-studies" },
    ],
    faqs: [
      { q: "Is consulting different from your retainer?", a: "Yes. Consulting is senior time and thinking; retainers include execution. Some clients use consulting first, then move into retainer once the plan is agreed." },
      { q: "Who leads the engagement?", a: "Consulting engagements are led personally by Tahir Abbas, BeingEcom's founder, with 10+ years in ecommerce SEO." },
      { q: "What's the minimum engagement?", a: "Six weeks for strategy work. Fractional leadership is a rolling 3-month minimum." },
      { q: "Do you sign NDAs?", a: "Yes - always, before any strategic work begins." },
    ],
  },
  {
    slug: "ecommerce-growth-agency-uk",
    path: "/ecommerce-growth-agency-uk",
    title: "Ecommerce Growth Agency UK | Shopify & DTC Growth Partner",
    metaTitle: "Ecommerce Growth Agency UK | BeingEcom",
    description:
      "BeingEcom is a UK ecommerce growth agency helping Shopify and WooCommerce brands scale profitably across SEO, paid media, CRO and retention - one integrated growth system.",
    eyebrow: "Growth partner",
    h1: "The UK Ecommerce Growth Agency for Scaling DTC Brands",
    intro:
      "One growth partner for the levers that actually compound revenue - SEO, paid media, CRO and retention - run as one system, not four silos.",
    summary:
      "BeingEcom is a UK ecommerce growth agency for Shopify and WooCommerce brands scaling from six to seven figures. It runs SEO, paid media, CRO and retention as one connected system - the six-stage Growth System™ - with senior operators owning each account.",
    pills: ["Shopify & WooCommerce", "UK-based", "Retainer only"],
    sections: [
      {
        heading: "Why 'growth agency' - not 'SEO agency'",
        body: "Growth doesn't come from any single channel. It comes from the sequence: fix foundations, acquire traffic, convert it, retain customers, then automate. Silo agencies can only ever fix a fraction of that.",
      },
      {
        heading: "What we own",
        body: "The full ecommerce revenue equation - visibility, conversion, and lifetime value.",
        bullets: [
          "Ecommerce SEO",
          "Google, Meta and TikTok ads",
          "Conversion rate optimisation",
          "Email & SMS retention",
          "AI search and AI automation",
        ],
      },
      {
        heading: "Who we work with",
        body: "Scaling UK Shopify and WooCommerce brands doing £1m-£30m in revenue, ready to invest in senior operators and long-term compounding growth - not last-click hacks.",
      },
    ],
    related: [
      { label: "Methodology", to: "/methodology" },
      { label: "Who we help", to: "/who-we-help" },
      { label: "Case studies", to: "/case-studies" },
      { label: "Revenue optimisation", to: "/ecommerce-revenue-optimisation" },
    ],
    faqs: [
      { q: "How is a growth agency different from a marketing agency?", a: "A marketing agency executes channels. A growth agency owns the equation - visibility, conversion, retention - and sequences those channels for compounding revenue." },
      { q: "Do you work only with Shopify?", a: "No - Shopify and Shopify Plus are our majority, but we also work with WooCommerce, headless, and enterprise stacks." },
      { q: "What size brands do you work with?", a: "Scaling UK brands typically doing £1m-£30m in annual online revenue." },
      { q: "Is there a minimum retainer?", a: "Yes - our smallest growth retainer starts at £3,000/mo. Below that we recommend our audit or consulting products." },
    ],
  },
  {
    slug: "ecommerce-marketing-agency-uk",
    path: "/ecommerce-marketing-agency-uk",
    title: "Ecommerce Marketing Agency UK | Full-Funnel DTC Growth",
    metaTitle: "Ecommerce Marketing Agency UK | BeingEcom",
    description:
      "UK ecommerce marketing agency running full-funnel growth for Shopify and DTC brands - SEO, paid ads, CRO, email and creative under one senior team.",
    eyebrow: "Full-funnel",
    h1: "The UK Ecommerce Marketing Agency for DTC Brands",
    intro:
      "One senior team, one growth plan - covering everything from first impression to repeat purchase across SEO, paid, creative, CRO and email.",
    summary:
      "BeingEcom is a UK ecommerce marketing agency running full-funnel growth for Shopify and DTC brands. It combines SEO, Google & Meta ads, CRO and email retention under one senior team so acquisition, conversion and repeat revenue are optimised together, not in isolation.",
    pills: ["Full-funnel", "Senior operators", "Weekly cadence"],
    sections: [
      {
        heading: "What full-funnel actually means",
        body: "Not 'we run ads and SEO'. Full-funnel means owning the entire ecommerce revenue equation - awareness, consideration, conversion, retention - and optimising the trade-offs between them.",
      },
      {
        heading: "Channels we run",
        body: "Each channel is treated as a lever, not a service line. Weekly cadence, monthly reviews, quarterly strategic resets.",
        bullets: [
          "Ecommerce SEO",
          "Google Ads (Search, Shopping, PMax)",
          "Meta & TikTok paid social",
          "Creative & UGC production",
          "Klaviyo email & SMS",
          "Landing page and PDP CRO",
        ],
      },
      {
        heading: "How we measure",
        body: "We measure marketing on the two numbers that actually determine survival: contribution margin per new customer, and customer lifetime value - not last-click ROAS.",
      },
    ],
    related: [
      { label: "Performance marketing", to: "/services/performance-marketing" },
      { label: "CRO", to: "/services/cro" },
      { label: "Email & SMS", to: "/services/email-sms" },
      { label: "Growth agency UK", to: "/ecommerce-growth-agency-uk" },
    ],
    faqs: [
      { q: "Do you specialise in one channel or all of them?", a: "We're deliberately full-funnel. Single-channel agencies can only ever optimise inside their box; ecommerce growth lives in the trade-offs between channels." },
      { q: "What platforms do you work on?", a: "Shopify, Shopify Plus, WooCommerce, headless stores, and enterprise ecommerce." },
      { q: "What's the typical engagement length?", a: "12-month minimum. Real ecommerce marketing outcomes take a full year to compound across seasons." },
      { q: "Do you white-label for other agencies?", a: "Yes - we run selective white-label programmes for design and web agencies without an in-house growth function." },
    ],
  },
  {
    slug: "ecommerce-revenue-optimisation",
    path: "/ecommerce-revenue-optimisation",
    title: "Ecommerce Revenue Optimisation | Grow Store Revenue Without New Traffic",
    metaTitle: "Ecommerce Revenue Optimisation | BeingEcom",
    description:
      "A revenue optimisation programme for Shopify and DTC brands - turning existing traffic into more revenue via CRO, PDP experimentation, checkout, pricing and retention.",
    eyebrow: "Revenue engine",
    h1: "Ecommerce Revenue Optimisation",
    intro:
      "Most stores have all the traffic they need - they just leak revenue at every step. Revenue optimisation is the programme that plugs those leaks systematically.",
    summary:
      "BeingEcom's ecommerce revenue optimisation programme grows Shopify and DTC store revenue without buying new traffic. It combines CRO, PDP experimentation, checkout tuning, pricing and merchandising, and lifecycle email into one structured monthly cadence measured against contribution margin.",
    pills: ["No new traffic needed", "Contribution margin", "Monthly cadence"],
    sections: [
      {
        heading: "Where revenue leaks",
        body: "Most stores lose 30-50% of possible revenue at four points: product pages, cart, checkout, and post-purchase. Fixing those is faster and cheaper than buying more traffic.",
        bullets: [
          "PDP: unclear value, weak trust signals",
          "Cart: friction, upsell gaps",
          "Checkout: forced accounts, delivery ambiguity",
          "Post-purchase: no retention loop",
        ],
      },
      {
        heading: "What the programme does",
        body: "A structured monthly cadence of hypotheses, tests, and shipped changes - measured on real revenue, not vanity metrics.",
        bullets: [
          "Hypothesis backlog from data + heuristics",
          "2-4 shipped tests per month",
          "PDP, cart, checkout, thank-you page scope",
          "Contribution margin reporting",
        ],
      },
      {
        heading: "Where it fits",
        body: "Revenue optimisation runs alongside acquisition. Every extra 1% of conversion is roughly equivalent to a 1% traffic increase - at zero marginal ad cost.",
      },
    ],
    related: [
      { label: "CRO", to: "/services/cro" },
      { label: "Analytics", to: "/services/analytics" },
      { label: "Growth agency UK", to: "/ecommerce-growth-agency-uk" },
      { label: "Free tools", to: "/tools" },
    ],
    faqs: [
      { q: "Do we need a certain traffic volume for revenue optimisation to work?", a: "Yes - meaningful A/B testing needs 20,000+ monthly sessions. Below that we use qualitative heuristics and full-page redesigns instead of split tests." },
      { q: "How is this different from CRO?", a: "CRO is a subset. Revenue optimisation also includes pricing, merchandising, upsell architecture, and post-purchase flows." },
      { q: "How fast do we see results?", a: "First shipped changes go live in month 1. Meaningful revenue impact typically shows in months 2-3." },
      { q: "Do you work Shopify-only?", a: "Shopify and Shopify Plus are majority, but the programme runs equally well on WooCommerce and headless stores." },
    ],
  },
  {
    slug: "enterprise-ecommerce-seo",
    path: "/enterprise-ecommerce-seo",
    title: "Enterprise Ecommerce SEO Agency UK | Shopify Plus & Large Catalogues",
    metaTitle: "Enterprise Ecommerce SEO Agency UK | BeingEcom",
    description:
      "Enterprise ecommerce SEO for UK Shopify Plus and large-catalogue brands - technical scale, international, migration and reporting systems senior enough for exec stakeholders.",
    eyebrow: "Enterprise",
    h1: "Enterprise Ecommerce SEO",
    intro:
      "SEO for large ecommerce estates: 10k+ SKUs, Shopify Plus and headless, international markets, and executive-grade reporting.",
    summary:
      "BeingEcom's enterprise ecommerce SEO service supports UK brands running Shopify Plus, headless, or large-catalogue ecommerce estates. Scope covers technical SEO at scale, international rollouts, migration protection, log-file analysis, and executive-grade reporting for CFO and CMO stakeholders.",
    pills: ["Shopify Plus", "10k+ SKUs", "Multi-market"],
    sections: [
      {
        heading: "Large-catalogue technical SEO",
        body: "Faceted URL control, crawl budget management, template-level fixes, and log-file work - the technical work that only matters once your catalogue is large enough to break the standard playbook.",
        bullets: [
          "Log-file and crawl analysis",
          "Faceted & filter URL strategy",
          "Template-level schema and content",
          "Automated internal linking",
        ],
      },
      {
        heading: "International SEO",
        body: "Structured expansion into US, EU and Commonwealth markets - hreflang, currency, localisation, and local link acquisition.",
      },
      {
        heading: "Migration & replatforming",
        body: "Enterprise-grade SEO oversight through Shopify Plus migrations, headless rebuilds, and multi-brand consolidations.",
      },
      {
        heading: "Executive reporting",
        body: "Reporting that answers boardroom questions - contribution margin, non-brand revenue, and market share - not just impressions and clicks.",
      },
    ],
    related: [
      { label: "Migration SEO", to: "/ecommerce-migration-seo" },
      { label: "Ecommerce analytics", to: "/ecommerce-analytics" },
      { label: "Shopify SEO packages", to: "/shopify-seo-packages" },
      { label: "Consulting", to: "/ecommerce-seo-consultant" },
    ],
    faqs: [
      { q: "What size brand is enterprise for you?", a: "Typically UK ecommerce brands doing £5m-£100m+ in revenue, running Shopify Plus, headless, or enterprise platforms with catalogues of 10,000+ SKUs." },
      { q: "Do you handle multi-brand estates?", a: "Yes - including consolidation and separation projects across multiple domains and platforms." },
      { q: "What's the typical investment level?", a: "Enterprise retainers run £6,000-£20,000/mo depending on scope and international coverage." },
      { q: "Do you provide SLAs?", a: "Yes - contractual SLAs on response times, deliverables and reporting cadence are standard on enterprise engagements." },
    ],
  },
  {
    slug: "ecommerce-migration-seo",
    path: "/ecommerce-migration-seo",
    title: "Ecommerce Migration SEO UK | Rank-Safe Shopify, WooCommerce & Magento Migrations",
    metaTitle: "Ecommerce Migration SEO UK | BeingEcom",
    description:
      "Rank-safe ecommerce migration SEO for Shopify Plus, WooCommerce and Magento moves - URL mapping, 301 strategy, ranking protection and post-launch recovery.",
    eyebrow: "Migration SEO",
    h1: "Ecommerce Migration SEO",
    intro:
      "Replatforming is the single largest SEO risk an ecommerce brand takes. This service exists to make that risk almost zero.",
    summary:
      "BeingEcom's ecommerce migration SEO service protects organic revenue through platform moves - Shopify Plus, WooCommerce, Magento and headless. It covers pre-migration baselining, URL and 301 strategy, schema and tracking parity, and post-launch monitoring with a documented rollback plan.",
    pills: ["Shopify Plus", "WooCommerce", "Magento", "Headless"],
    sections: [
      {
        heading: "Pre-migration baseline",
        body: "Before you move a single URL, we baseline everything worth protecting - traffic, revenue, rankings, backlinks and schema footprint.",
        bullets: [
          "Full crawl and index snapshot",
          "12-month revenue and ranking baseline",
          "Backlink and internal link mapping",
          "Schema and tracking inventory",
        ],
      },
      {
        heading: "URL & 301 strategy",
        body: "Every high-value URL gets a one-to-one mapping. No lazy category-level catch-all redirects. Documented, reviewed, and QA'd before go-live.",
      },
      {
        heading: "Parity checks",
        body: "Content, schema, tracking, meta and internal links must land on the new platform with parity - or better. We check every template and every high-revenue URL.",
      },
      {
        heading: "Post-launch monitoring & recovery",
        body: "First 30 days after launch: daily monitoring, weekly reporting, and a documented recovery plan for any drop above a defined threshold.",
      },
    ],
    related: [
      { label: "Enterprise SEO", to: "/enterprise-ecommerce-seo" },
      { label: "Shopify SEO packages", to: "/shopify-seo-packages" },
      { label: "Shopify Plus migration blog", to: "/blog/shopify-plus-migration-uk" },
      { label: "Case studies", to: "/case-studies" },
    ],
    faqs: [
      { q: "How much traffic loss is normal during a migration?", a: "Zero is the target. Well-executed Shopify Plus migrations should hold non-brand organic revenue within +/- 5% inside the first 60 days." },
      { q: "What platforms do you cover?", a: "Shopify, Shopify Plus, WooCommerce, Magento, BigCommerce and headless commerce stacks." },
      { q: "How long is a typical migration engagement?", a: "8-16 weeks depending on catalogue size and platform complexity." },
      { q: "Can you audit a migration that's already happened?", a: "Yes - post-migration recovery audits are one of our most common inbound requests." },
    ],
  },
  {
    slug: "ecommerce-analytics",
    path: "/ecommerce-analytics",
    title: "Ecommerce Analytics & Tracking Agency UK | GA4, Server-Side & Attribution",
    metaTitle: "Ecommerce Analytics UK | BeingEcom",
    description:
      "Ecommerce analytics and tracking for UK Shopify and DTC brands - GA4, server-side tracking, attribution, LTV modelling and revenue dashboards decisions can actually be made from.",
    eyebrow: "Measurement",
    h1: "Ecommerce Analytics & Tracking",
    intro:
      "The measurement layer under every growth decision - GA4, server-side tracking, attribution and revenue dashboards - built for teams that need to make decisions, not just look at numbers.",
    summary:
      "BeingEcom's ecommerce analytics service builds the measurement layer under Shopify and DTC growth: GA4 ecommerce tracking, server-side events, consent-safe attribution, LTV modelling, and executive revenue dashboards. The goal is decisions - not more charts.",
    pills: ["GA4", "Server-side", "Attribution"],
    sections: [
      {
        heading: "GA4 ecommerce done properly",
        body: "Enhanced ecommerce, purchase attribution, and correct consent-mode configuration - the way Google intended it, not the way most Shopify stores end up with it.",
      },
      {
        heading: "Server-side tracking",
        body: "First-party tracking pipelines (GTM Server, Stape, or bespoke) so signal survives iOS restrictions, ad blockers and consent decisions.",
      },
      {
        heading: "Attribution & LTV",
        body: "MER, incremental attribution, and cohort-based LTV modelling - so acquisition decisions are made on truth, not last-click illusion.",
      },
      {
        heading: "Dashboards for decisions",
        body: "Executive dashboards designed around the four numbers that matter: contribution margin, MER, LTV, and repeat purchase rate.",
      },
    ],
    related: [
      { label: "Analytics service", to: "/services/analytics" },
      { label: "Free tools", to: "/tools" },
      { label: "Benchmarks", to: "/benchmarks" },
      { label: "Enterprise SEO", to: "/enterprise-ecommerce-seo" },
    ],
    faqs: [
      { q: "Do we need server-side tracking?", a: "If you're spending materially on paid ads on a UK Shopify store post-2024, yes - or you're making acquisition decisions on missing data." },
      { q: "Is this a project or a retainer?", a: "Setup is a project (typically 6-10 weeks). Ongoing tag governance and reporting is best done on retainer or via your in-house analyst." },
      { q: "Do you work with our existing agency?", a: "Yes - analytics and tracking is often the piece that unlocks better decisions across SEO and paid teams." },
      { q: "Which server-side stack do you prefer?", a: "GTM Server on Google Cloud for most Shopify Plus stores; Stape for smaller catalogues that want a managed option." },
    ],
  },
  {
    slug: "ai-ecommerce-growth",
    path: "/ai-ecommerce-growth",
    title: "AI Ecommerce Growth | AI Search, Automation & CRO for Shopify",
    metaTitle: "AI Ecommerce Growth | BeingEcom",
    description:
      "AI ecommerce growth for Shopify and DTC brands - AI search visibility (ChatGPT, Perplexity, Gemini, AI Overviews), AI automation, and AI-driven conversion optimisation.",
    eyebrow: "AI-native growth",
    h1: "AI Ecommerce Growth",
    intro:
      "The AI layer of ecommerce growth - visibility inside AI answer engines, automation of repeatable work, and personalisation that lifts conversion.",
    summary:
      "BeingEcom's AI ecommerce growth practice covers three surfaces: AI search visibility (ChatGPT, Perplexity, Gemini and Google AI Overviews), AI automation of repeatable ecommerce work (content, feeds, reporting), and AI-driven CRO - personalisation, recommendations and testing.",
    pills: ["AI search", "AI automation", "AI CRO"],
    sections: [
      {
        heading: "AI search visibility (GEO / AEO)",
        body: "Getting your brand and product answers cited inside ChatGPT, Perplexity, Gemini and Google AI Overviews - through entity signals, extractable answer blocks, and citation-earning content.",
        bullets: [
          "Entity graph & schema optimisation",
          "Extractable answer blocks",
          "Citation-earning content design",
          "Brand mention monitoring",
        ],
      },
      {
        heading: "AI automation",
        body: "The repeatable, expensive parts of ecommerce marketing - product content, feed enrichment, creative variants, reporting - automated with AI pipelines that stay on-brand.",
        bullets: [
          "AI product content pipelines",
          "Feed and PDP enrichment",
          "Creative variant generation",
          "Automated reporting",
        ],
      },
      {
        heading: "AI conversion optimisation",
        body: "Personalised recommendations, dynamic PDP content, and AI-driven test prioritisation - applied to Shopify and headless stores.",
      },
    ],
    related: [
      { label: "AI automation service", to: "/services/ai-automation" },
      { label: "AI automation hub", to: "/hub/ai-automation" },
      { label: "Academy - AI search track", to: "/academy" },
      { label: "Analytics", to: "/ecommerce-analytics" },
    ],
    faqs: [
      { q: "Is AI search actually driving traffic yet?", a: "For UK ecommerce, AI-source traffic is 1-6% of organic depending on category. It's growing fast enough to be a strategic priority, not yet large enough to be the only priority." },
      { q: "What's the difference between GEO and AEO?", a: "GEO (Generative Engine Optimisation) targets generative AI search engines. AEO (Answer Engine Optimisation) targets any surface that returns answers, including Google's AI Overviews." },
      { q: "Can you automate content without hurting quality?", a: "Yes - by using AI for enrichment and templated production, and keeping humans on strategy, editorial voice, and QA." },
      { q: "Which AI CRO tools do you use?", a: "We use different stacks for personalisation, recommendations and testing depending on platform - Shopify natively supports several, headless stores use dedicated engines." },
    ],
  },
  {
    slug: "partners",
    path: "/partners",
    title: "Partner With BeingEcom | Ecommerce Growth Agency Partnerships",
    metaTitle: "Partner With BeingEcom | UK Ecommerce Growth",
    description:
      "Partner with BeingEcom - referral, white-label and strategic partnerships for Shopify developers, design agencies, branding studios and ecommerce SaaS platforms.",
    eyebrow: "Partnerships",
    h1: "Partner With BeingEcom",
    intro:
      "Four ways to work with BeingEcom without competing with us - referral, white-label, integration and co-marketing partnerships built for UK ecommerce.",
    summary:
      "BeingEcom runs four partnership programmes: referral partners (design and Shopify agencies), white-label growth for agencies without an in-house team, SaaS and platform integrations, and co-marketing with complementary ecommerce vendors. All partnerships are UK-first and revenue-sharing.",
    pills: ["Referral", "White-label", "Integrations", "Co-marketing"],
    sections: [
      {
        heading: "Referral partners",
        body: "For Shopify developers, branding studios, and web design agencies whose clients need SEO, paid or CRO help. Straight revenue-share on any client that becomes a retainer.",
        bullets: [
          "20% revenue-share on year 1",
          "Named partner manager",
          "Co-branded proposals if you want them",
        ],
      },
      {
        heading: "White-label growth",
        body: "For agencies without an in-house growth team who want to offer SEO, paid media, CRO or email under their own brand. Fully delivered by our senior UK team.",
        bullets: [
          "Delivered under your brand",
          "Fixed monthly cost per client",
          "Dedicated Slack channel",
        ],
      },
      {
        heading: "SaaS & platform integrations",
        body: "For ecommerce SaaS platforms (analytics, feed, review, subscription, retention tools) looking for a UK growth-agency implementation partner. We integrate, certify and refer.",
      },
      {
        heading: "Co-marketing",
        body: "Joint research, webinars, and reports with complementary vendors serving UK ecommerce.",
      },
    ],
    related: [
      { label: "About", to: "/about" },
      { label: "Growth agency UK", to: "/ecommerce-growth-agency-uk" },
      { label: "Contact", to: "/contact" },
      { label: "Case studies", to: "/case-studies" },
    ],
    faqs: [
      { q: "How much do you pay referral partners?", a: "20% of year-1 retainer revenue, paid monthly for the first 12 months a referred client is with us." },
      { q: "Can we white-label your services?", a: "Yes - for a small number of vetted UK partners. Client relationships stay with you; delivery is fully staffed by our team." },
      { q: "Do you sign exclusivity?", a: "For white-label partnerships, yes - we cap the number of white-label partners per specialism in the UK." },
      { q: "Who's the right first contact?", a: "The founder, Tahir Abbas, personally reviews all partnership enquiries." },
    ],
    ctaHeading: "Let's talk partnerships",
    ctaSub: "Send a note and Tahir will personally reply within two working days.",
  },
  {
    slug: "why-beingecom",
    path: "/why-beingecom",
    title: "Why BeingEcom | UK Ecommerce Growth Agency Differentiators",
    metaTitle: "Why BeingEcom - UK Ecommerce Growth Agency",
    description:
      "Why UK ecommerce brands pick BeingEcom: senior-only pods, a documented Growth System, revenue-linked reporting, and 10+ years running Shopify and WooCommerce stores.",
    eyebrow: "Why us",
    h1: "Why BeingEcom",
    intro:
      "The specific, checkable reasons UK ecommerce brands choose BeingEcom over other agencies, freelancers, or building in-house.",
    summary:
      "BeingEcom is a UK ecommerce growth agency built around senior-only pods, a documented six-stage Growth System, and revenue-linked reporting. Founded by Tahir Abbas with 10+ years running Shopify and WooCommerce brands, the team average is 7+ years - no juniors staffed on client work.",
    pills: ["Senior-only pods", "Documented system", "UK ecommerce focus"],
    highlights: [
      { label: "Team average", value: "7+ yrs" },
      { label: "Founder experience", value: "10+ yrs" },
      { label: "Case studies", value: "30+" },
    ],
    sections: [
      {
        heading: "Senior-only pods, no juniors on your account",
        body: "Every retainer is delivered by a pod of senior operators - SEO lead, paid lead, CRO lead, analytics lead - who each have 7+ years running ecommerce accounts. No juniors, no shadow-staffing.",
        bullets: [
          "Named pod for every retainer",
          "Direct Slack access to the operators",
          "Founder-reviewed strategy each quarter",
        ],
      },
      {
        heading: "A documented Growth System, not a monthly to-do list",
        body: "The BeingEcom Growth System is a six-stage engagement model - Diagnose, Prioritise, Prototype, Ship, Measure, Compound. Every deliverable maps to a stage, and every stage has a written exit bar.",
        bullets: [
          "Same system across SEO, paid, CRO, email",
          "Written exit criteria per stage",
          "Public methodology at /methodology",
        ],
      },
      {
        heading: "Revenue-linked reporting",
        body: "Reports tie work back to store revenue, not vanity metrics. Assisted conversions, incremental sessions, and margin-adjusted ROAS - not screenshots of impressions.",
        bullets: [
          "GA4 + Shopify + ad-platform stitched",
          "Margin-adjusted ROAS by product line",
          "Board-ready summary each month",
        ],
      },
      {
        heading: "UK ecommerce first",
        body: "GBP pricing, UK VAT logic, UK courier and returns realities, and case studies from UK Shopify and WooCommerce brands. Not a US shop pretending to understand UK conditions.",
      },
    ],
    related: [
      { label: "Methodology", to: "/methodology" },
      { label: "Who we help", to: "/who-we-help" },
      { label: "Case studies", to: "/case-studies" },
      { label: "About the founder", to: "/about/tahir-abbas" },
    ],
    faqs: [
      { q: "How is BeingEcom different from a big agency?", a: "No juniors are staffed on client work. Every deliverable is produced by an operator with 7+ years running ecommerce accounts, and the founder personally reviews strategy each quarter." },
      { q: "How is BeingEcom different from a freelancer?", a: "You get a pod - SEO, paid, CRO, and analytics leads working from the same Growth System - rather than one person context-switching between disciplines." },
      { q: "Do you guarantee results?", a: "We guarantee the process and the exit bar per stage of the Growth System. We do not guarantee revenue - anyone who does is either lying or working from your data." },
      { q: "Who's the right client for BeingEcom?", a: "UK Shopify or WooCommerce brands doing £500k-£25m in annual revenue who want a senior partner, not a junior-staffed retainer. See /who-we-help for the full profile." },
      { q: "Who is not a good fit?", a: "Pre-revenue stores, non-ecommerce businesses, sub-£3k budgets for paid media, and brands looking to buy a rank-and-forget cheap SEO package." },
    ],
    ctaHeading: "See if we're the right fit",
    ctaSub: "Book a 30-minute call with the founder - we'll tell you honestly whether BeingEcom is the right partner.",
  },
  {
    slug: "customer-journey",
    path: "/customer-journey",
    title: "Customer Journey | Pick the Right Path for Your Ecommerce Stage",
    metaTitle: "Customer Journey - Path by Stage | BeingEcom",
    description:
      "Three tailored paths through BeingEcom based on where your ecommerce brand is today: new store owner, growing brand, or established brand ready for enterprise SEO.",
    eyebrow: "Start here",
    h1: "Pick the path that matches your stage",
    intro:
      "Every ecommerce brand is at a different stage. Rather than a single funnel, we run three - education for new stores, strategy for growing brands, and enterprise growth for established brands.",
    summary:
      "BeingEcom runs three customer paths: new store owners get free education, checklists, and a starter consultation; growing brands get case studies and a strategy call; established brands get enterprise SEO and a growth assessment. Pick the path that matches your annual revenue and growth stage.",
    pills: ["New store", "Growing brand", "Established brand"],
    sections: [
      {
        heading: "New store owner (£0-£250k / yr)",
        body: "You are launching or in the first year. What you need is education, a working checklist, and a short consultation - not a big retainer. Start with the free Academy and the Shopify SEO checklist.",
        bullets: [
          "Start: /academy",
          "Tool: /tools/shopify-seo-checklist",
          "Then: /contact for a starter consultation",
        ],
      },
      {
        heading: "Growing brand (£250k-£3m / yr)",
        body: "You have product-market fit and want to compound growth. What you need is proof and a plan - real case studies at your revenue band and a strategy call with a senior operator.",
        bullets: [
          "Read: /case-studies",
          "Review: /methodology",
          "Then: book a strategy call at /contact",
        ],
      },
      {
        heading: "Established brand (£3m+ / yr)",
        body: "You have scale, teams, and complexity. What you need is enterprise SEO and a growth assessment - not a template retainer. Start with the enterprise SEO page and the growth agency page.",
        bullets: [
          "Read: /enterprise-ecommerce-seo",
          "Read: /ecommerce-growth-agency-uk",
          "Then: request a growth assessment at /contact",
        ],
      },
    ],
    related: [
      { label: "Who we help", to: "/who-we-help" },
      { label: "Pricing", to: "/pricing" },
      { label: "Case studies", to: "/case-studies" },
      { label: "Contact", to: "/contact" },
    ],
    faqs: [
      { q: "Which path is right if I'm between stages?", a: "Pick the higher stage - the guidance still applies and the strategy call will resolve any ambiguity in 30 minutes." },
      { q: "Do you work with pre-revenue stores?", a: "Not on retainers. We point pre-revenue founders to the free Academy and the Shopify SEO checklist until they have data to work with." },
      { q: "Can established brands still use the Academy?", a: "Yes - most of our enterprise clients send junior team members through the Academy tracks to level them up." },
    ],
    ctaHeading: "Not sure which path fits?",
    ctaSub: "Book a 20-minute triage call - we'll point you to the right next step in one conversation.",
  },

  // ---------- BOFU objection pages ----------
  {
    slug: "how-long-does-ecommerce-seo-take",
    path: "/how-long-does-ecommerce-seo-take",
    title: "How Long Does Ecommerce SEO Take to Show Results? (UK, 2026)",
    metaTitle: "How Long Does Ecommerce SEO Take? Realistic UK Timelines | BeingEcom",
    description:
      "Realistic UK ecommerce SEO timelines: what happens in months 1-3, 4-6, 7-12, and beyond. Written by senior operators who run live Shopify and WooCommerce accounts.",
    eyebrow: "Buyer question",
    h1: "How long does ecommerce SEO take?",
    intro:
      "The honest answer: most UK ecommerce stores see meaningful movement in 90-120 days on technical + on-page work, with compounding revenue impact from month 6 onwards. Here's what actually happens month by month.",
    summary:
      "Ecommerce SEO usually shows early technical wins in 30-60 days, meaningful ranking movement in 90-120 days, and compounding revenue growth from month 6 onwards. Timelines depend on domain authority, technical debt, catalogue size, and content maturity - not on how much you spend.",
    pills: ["30-day wins", "90-day movement", "6-month compounding"],
    sections: [
      {
        heading: "Month 1: audit, fixes, foundations",
        body: "The first 30 days are almost never about rankings. It's technical audit, crawl analysis, indexation cleanup, faceted URL rules, and killing whatever is silently blocking growth. You'll usually see impressions climb before positions do.",
        bullets: [
          "Full technical + on-page audit",
          "Indexation and crawl budget cleanup",
          "Faceted URL and canonical fixes",
          "Baseline analytics and tracking check",
        ],
      },
      {
        heading: "Months 2-3: on-page + content velocity",
        body: "This is where movement starts. Category and PDP rewrites, internal linking at catalogue scale, schema, and the first cohort of supporting content. Most stores see the first ranking shifts here on medium-competition terms.",
      },
      {
        heading: "Months 4-6: authority + conversion compounding",
        body: "Digital PR, link acquisition, and CRO experiments layer on top of the technical base. This is when revenue attributable to organic starts to visibly compound - not linear, closer to a hockey stick if the fundamentals are right.",
      },
      {
        heading: "Months 7-12: category ownership",
        body: "By month 7 the SEO investment should be paying for itself and then some. From here it's about defending positions, expanding into adjacent keyword clusters, and pushing into AI Overviews and answer engines.",
      },
    ],
    highlights: [
      { label: "First technical wins", value: "30-60 days" },
      { label: "Ranking movement", value: "90-120 days" },
      { label: "Revenue compounding", value: "6+ months" },
    ],
    related: [
      { label: "How much does ecommerce SEO cost?", to: "/how-much-does-ecommerce-seo-cost" },
      { label: "Is SEO worth it for ecommerce?", to: "/is-seo-worth-it-for-ecommerce" },
      { label: "Methodology", to: "/methodology" },
      { label: "Case studies", to: "/case-studies" },
    ],
    faqs: [
      { q: "Can I see faster results with a bigger budget?", a: "Slightly - but not linearly. Doubling spend does not halve the timeline. It expands the number of pages and clusters you can attack in parallel, which matters more for large catalogues." },
      { q: "What if my site is new?", a: "New domains typically add 60-90 days to every milestone above. This is why we usually pair new stores with paid media until organic compounds." },
      { q: "Why do some agencies promise results in 30 days?", a: "They're usually either optimising branded search, running paid ads underneath, or overselling. Real organic movement on non-brand commercial terms takes longer." },
      { q: "What accelerates the timeline the most?", a: "In order: fixing technical debt first, having a strong internal linking model, publishing at real velocity (not one blog post a month), and building topical clusters instead of scattered pages." },
      { q: "When should I expect the retainer to pay for itself?", a: "For most mid-market UK ecommerce stores, month 6-9 is when the organic revenue delta covers the retainer. From there it's pure ROI." },
    ],
    ctaHeading: "Want a realistic timeline for your store?",
    ctaSub: "Send us your domain - we'll come back with a specific month-by-month forecast, not a template.",
  },
  {
    slug: "how-much-does-ecommerce-seo-cost",
    path: "/how-much-does-ecommerce-seo-cost",
    title: "How Much Does Ecommerce SEO Cost in the UK? (2026 Pricing Guide)",
    metaTitle: "Ecommerce SEO Cost UK 2026 - Realistic Pricing | BeingEcom",
    description:
      "Honest UK ecommerce SEO pricing: what a real retainer costs, what affects it, and what to expect at £1k, £2.5k, £5k, and £10k+ per month. No 'starts from £299' games.",
    eyebrow: "Buyer question",
    h1: "How much does ecommerce SEO cost in the UK?",
    intro:
      "Real UK ecommerce SEO retainers sit between £1,500 and £15,000 per month depending on catalogue size, competition, and scope. Here's what drives price up or down - and what you should expect at each tier.",
    summary:
      "UK ecommerce SEO typically costs £1,500-£15,000 per month. Price is driven by catalogue size, keyword competition, technical debt, content velocity, and whether digital PR is included. Anything under £1,000/mo is usually reporting or thin content, not real SEO delivery.",
    pills: ["£1.5k-£15k/mo", "UK market", "Retainer model"],
    sections: [
      {
        heading: "What actually drives the price",
        body: "Ecommerce SEO pricing is not arbitrary. Five variables set the tier: catalogue size, keyword competition, current technical debt, required content velocity, and whether digital PR is scoped in.",
        bullets: [
          "Catalogue size (100 vs 10,000 SKUs)",
          "Keyword competition (niche vs mainstream)",
          "Technical debt to unwind",
          "Content velocity per month",
          "Digital PR and link acquisition",
        ],
      },
      {
        heading: "The tiers, in plain English",
        body: "£1,500-£2,500/mo suits small stores with clean tech and a focused niche. £3,000-£5,000/mo is standard for growing DTC brands. £5,000-£10,000/mo covers Shopify Plus and mid-market. £10,000+ is enterprise or replatform-heavy scope.",
      },
      {
        heading: "What you should not pay for",
        body: "Retainers under £1,000/mo are almost always reporting dashboards plus a monthly blog post. That is not ecommerce SEO. Neither is any package priced without ever looking at your store.",
      },
    ],
    highlights: [
      { label: "Entry retainer", value: "£1.5k/mo" },
      { label: "Standard DTC", value: "£3-5k/mo" },
      { label: "Enterprise", value: "£10k+/mo" },
    ],
    related: [
      { label: "Ecommerce SEO pricing (full breakdown)", to: "/ecommerce-seo-pricing" },
      { label: "Shopify SEO packages", to: "/shopify-seo-packages" },
      { label: "How long does SEO take?", to: "/how-long-does-ecommerce-seo-take" },
      { label: "Agency vs in-house SEO", to: "/agency-vs-inhouse-seo" },
    ],
    faqs: [
      { q: "Why is there such a wide price range?", a: "Because 'ecommerce SEO' can mean anything from a small technical audit to a 15-person team running enterprise migrations. The scope makes the price, not the label." },
      { q: "Is a cheaper retainer just slower, or is it worse?", a: "Usually worse. Cheap retainers survive by cutting senior time and replacing it with junior writers and templated audits. You get output, not outcomes." },
      { q: "Do you charge setup fees?", a: "For most engagements no - onboarding and audit are baked into month one. Larger migrations or replatforms are quoted separately." },
      { q: "Can I pay per project instead?", a: "Yes for audits, migrations, and one-off technical work. No for ongoing SEO - it doesn't compound without continuity." },
      { q: "What's included at £3-5k/mo?", a: "Senior strategist, technical fixes, monthly on-page and content velocity, internal linking, analytics reporting, and 1-2 digital PR pitches per quarter." },
    ],
  },
  {
    slug: "is-seo-worth-it-for-ecommerce",
    path: "/is-seo-worth-it-for-ecommerce",
    title: "Is SEO Worth It for Ecommerce in 2026? (Honest UK Answer)",
    metaTitle: "Is Ecommerce SEO Worth It? Honest 2026 Answer | BeingEcom",
    description:
      "When ecommerce SEO is worth it, when it isn't, and how to tell the difference for your Shopify or WooCommerce store. No hype, no doom - written by UK operators.",
    eyebrow: "Buyer question",
    h1: "Is SEO worth it for ecommerce?",
    intro:
      "For most UK ecommerce stores with product-market fit and a 6-12 month horizon, yes. For pre-revenue stores, no. Here's the honest test we run before we recommend a retainer.",
    summary:
      "Ecommerce SEO is worth it when you have product-market fit, a 6-12 month horizon, and margin to reinvest. It is not worth it for pre-revenue stores, single-product hype launches, or brands that need cash-flow inside 30 days. Paid media suits that scenario better.",
    pills: ["Worth it when...", "Not worth it when...", "Honest test"],
    sections: [
      {
        heading: "When SEO is worth it",
        body: "You have consistent revenue (£30k/mo+), margins that support reinvestment, at least a 6-9 month horizon, and a real catalogue or category structure to optimise against. AI Overviews and answer engines are also rewarding brands with clear entities - if you fit, the compounding is meaningful.",
        bullets: [
          "Consistent £30k+/mo revenue",
          "Healthy contribution margin",
          "6-12 month planning horizon",
          "Real catalogue or category structure",
        ],
      },
      {
        heading: "When SEO is not worth it (yet)",
        body: "Pre-revenue, single-product hype drops, brands that need cash inside 30 days, or stores with fundamental positioning or CRO problems. In all these cases paid media (or fixing conversion) will beat SEO on ROI for 6-12 months.",
      },
      {
        heading: "The honest test we run",
        body: "Before recommending a retainer we check: is search demand large enough to move revenue, is the site technically capable of ranking, and do you have the margin to fund 6 months. If any answer is no we say so and refer you to paid media or CRO first.",
      },
    ],
    related: [
      { label: "How long does SEO take?", to: "/how-long-does-ecommerce-seo-take" },
      { label: "How much does SEO cost?", to: "/how-much-does-ecommerce-seo-cost" },
      { label: "SEO vs paid ads", to: "/compare/seo-vs-paid-ads" },
      { label: "Case studies", to: "/case-studies" },
    ],
    faqs: [
      { q: "Is SEO dead because of AI search?", a: "No. AI Overviews still pull from indexed, ranking content - brands that own their category in traditional SERPs also dominate AI answers. SEO evolved, it didn't die." },
      { q: "Should I do SEO or paid ads first?", a: "If you're pre-£30k/mo revenue, paid ads first - you need cash-flow proof. Above that, both in parallel, weighted to your margin structure." },
      { q: "Can I do SEO in-house instead?", a: "Yes if you have a senior operator internally. See our agency vs in-house comparison for the honest trade-offs." },
      { q: "What ROI should I expect from SEO?", a: "For UK ecommerce stores that stick with the plan for 12 months, a 3-6x return on retainer spend is typical. Some verticals compound to 10x+ by year two." },
      { q: "What if my niche is tiny?", a: "SEO scales with search demand. If your niche has under 5,000 monthly searches sitewide, SEO is a supporting channel, not a lead one." },
    ],
  },
  {
    slug: "agency-vs-inhouse-seo",
    path: "/agency-vs-inhouse-seo",
    title: "Ecommerce SEO Agency vs In-House Team: Honest UK Comparison",
    metaTitle: "SEO Agency vs In-House for Ecommerce (2026) | BeingEcom",
    description:
      "When to hire an ecommerce SEO agency, when to build in-house, and when to do both. Real cost, speed, and risk trade-offs for UK Shopify and WooCommerce brands.",
    eyebrow: "Buyer question",
    h1: "Ecommerce SEO agency vs in-house: which wins?",
    intro:
      "Both work. The question is which is cheaper, faster, and lower-risk for your specific stage. Here's the honest trade-off matrix we walk clients through before they sign.",
    summary:
      "An ecommerce SEO agency is faster to results and lower fixed cost, but you rent the expertise. An in-house team is cheaper long-term at £5m+ revenue but slower to build and higher management overhead. Most mid-market UK brands run a hybrid: senior agency + one in-house SEO manager.",
    pills: ["Cost", "Speed", "Risk"],
    sections: [
      {
        heading: "Agency: what you actually get",
        body: "Senior operator time from day one, exposure to patterns across 30+ ecommerce accounts, and no NI/pension/leave overhead. Trade-off: shared attention, and you rent the knowledge - it walks out at the end of the contract.",
        bullets: [
          "Senior strategist from day one",
          "Pattern-matched across many stores",
          "No employment overhead",
          "Rented knowledge (walks out with contract)",
        ],
      },
      {
        heading: "In-house: what you actually get",
        body: "Full attention, deep product knowledge, and long-term compounding of institutional knowledge. Trade-off: 6-9 months to hire a real senior, £70k-£110k fully-loaded cost, and one person cannot cover technical + content + digital PR + analytics.",
      },
      {
        heading: "The hybrid model most winners use",
        body: "Senior agency running strategy, technical, and digital PR. In-house SEO manager owning content, internal briefs, and stakeholder alignment. Costs less than a full in-house team, moves faster than either alone, and de-risks succession.",
      },
    ],
    highlights: [
      { label: "Agency cost", value: "£3-10k/mo" },
      { label: "In-house cost", value: "£70-110k/yr" },
      { label: "Time to results", value: "Agency wins" },
    ],
    related: [
      { label: "In-house vs agency (full comparison)", to: "/compare/in-house-vs-agency" },
      { label: "How much does ecommerce SEO cost?", to: "/how-much-does-ecommerce-seo-cost" },
      { label: "How long does SEO take?", to: "/how-long-does-ecommerce-seo-take" },
      { label: "Methodology", to: "/methodology" },
    ],
    faqs: [
      { q: "When should I go in-house?", a: "When you're consistently £5m+ in revenue, SEO is a top-three channel, and you can afford both a senior hire and 6-9 months to find them." },
      { q: "When should I stay with an agency?", a: "Under £5m revenue, when speed matters more than long-term cost, when the internal management overhead of hiring is too high, or when you need multi-discipline coverage." },
      { q: "Do agencies really move faster?", a: "Yes on day one. In-house teams eventually catch up on institutional knowledge, but the first 6 months are almost always slower in-house." },
      { q: "What about a freelancer instead?", a: "Freelancers work for narrow scopes - a technical audit, one migration. For ongoing multi-discipline SEO, either agency or in-house team wins." },
      { q: "How do you make hybrid work in practice?", a: "Agency runs strategy and technical, in-house manager owns execution and stakeholder alignment. Weekly sync, shared roadmap, and one source of truth for reporting." },
    ],
  },

  // ---------- Persona pages ----------
  {
    slug: "for-founders",
    path: "/for-founders",
    title: "Ecommerce SEO & Growth for Founders | BeingEcom",
    metaTitle: "Ecommerce Growth for Founders - UK Agency | BeingEcom",
    description:
      "Ecommerce growth built for founders: strategic, senior-led, no jargon, no fluff dashboards. Own the plan, delegate the execution, protect your time.",
    eyebrow: "For founders",
    h1: "Growth partnership built for founders",
    intro:
      "You built the brand. You don't have time to review 40-page audits or manage juniors. Here's how we work with founder-led UK ecommerce brands - senior operators, one weekly call, ownership of outcomes.",
    summary:
      "BeingEcom works with founder-led UK ecommerce brands as a senior growth partner. One senior strategist, one weekly call, a shared quarterly plan, and reporting that answers 'what changed and what's next' - not 40-page dashboards. You own strategy, we own execution.",
    pills: ["Senior-led", "One weekly call", "No fluff dashboards"],
    sections: [
      {
        heading: "What founders actually get",
        body: "A senior operator who has grown other ecommerce brands, on your calendar weekly. Quarterly plan you approve once, not weekly nagging. Reporting focused on decisions, not vanity metrics.",
        bullets: [
          "Senior strategist as primary contact",
          "One 60-minute weekly call",
          "Quarterly plan you approve once",
          "Decision-focused reporting",
        ],
      },
      {
        heading: "What we protect you from",
        body: "Junior account managers, opaque timesheets, template audits, and 'strategy decks' that just describe what happened. Founders don't need those; you need outcomes.",
      },
      {
        heading: "When we're a fit",
        body: "Founder-led UK brands doing £30k-£3m/mo, past product-market fit, ready to reinvest into a real growth engine. If you want a big agency with account layers, we're the wrong fit and we'll tell you.",
      },
    ],
    related: [
      { label: "Who we help", to: "/who-we-help" },
      { label: "Methodology", to: "/methodology" },
      { label: "Case studies", to: "/case-studies" },
      { label: "Pricing", to: "/pricing" },
    ],
    faqs: [
      { q: "How much of my time will this take?", a: "One weekly 60-minute call, plus async approval on quarterly plans. Most founders spend 60-90 minutes a week on us." },
      { q: "Who is my main contact?", a: "A senior operator who has run growth for other UK ecommerce brands. Not a junior AM." },
      { q: "Do you work with pre-revenue founders?", a: "No. Below £30k/mo we recommend the free Academy and Shopify SEO checklist until you have data to work with." },
      { q: "Can you work with my in-house team?", a: "Yes - the hybrid model (see /agency-vs-inhouse-seo) works well for founder-led brands scaling past £3m." },
    ],
  },
  {
    slug: "for-marketing-managers",
    path: "/for-marketing-managers",
    title: "Ecommerce Growth Partner for Marketing Managers | BeingEcom",
    metaTitle: "Ecommerce Agency for Marketing Managers | BeingEcom",
    description:
      "An ecommerce growth partner that makes marketing managers look good: clear reporting, on-time delivery, stakeholder-ready decks, and senior operators on every call.",
    eyebrow: "For marketing managers",
    h1: "The agency that makes marketing managers look good",
    intro:
      "You need delivery you can present, forecasts your CFO trusts, and no fires on Friday afternoon. Here's how we work with UK ecommerce marketing managers - predictable output, senior thinking, stakeholder-ready reporting.",
    summary:
      "BeingEcom works with UK ecommerce marketing managers as a predictable delivery partner. Senior operators on every call, on-time content and reporting, and stakeholder-ready quarterly decks. Built to make you the person who gets promoted, not the one chasing the agency.",
    pills: ["Predictable delivery", "Board-ready reporting", "No fires"],
    sections: [
      {
        heading: "What marketing managers actually need",
        body: "Delivery calendars that don't slip, reporting your board understands, and forecasts you can defend. That's what we build the engagement around - not another dashboard nobody opens.",
        bullets: [
          "Fixed monthly deliverables",
          "Board-ready quarterly decks",
          "Defensible forecasts",
          "One escalation line",
        ],
      },
      {
        heading: "What we handle so you don't",
        body: "Technical SEO scoping with devs, content briefs and QA, digital PR outreach, and reporting narrative. You review and approve; we execute.",
      },
      {
        heading: "How the engagement runs",
        body: "Weekly delivery stand-up, monthly performance review, quarterly strategy session with stakeholders invited. One senior lead, one project lead, no revolving door.",
      },
    ],
    related: [
      { label: "Methodology", to: "/methodology" },
      { label: "Case studies", to: "/case-studies" },
      { label: "Pricing", to: "/pricing" },
      { label: "Who we help", to: "/who-we-help" },
    ],
    faqs: [
      { q: "Will you attend board meetings?", a: "Yes for quarterly strategy sessions and any milestone review your board requests. Included in mid-market and enterprise retainers." },
      { q: "Do you provide the reporting narrative or just the numbers?", a: "Both. Every monthly report includes a written 'what changed and why' section your board can quote directly." },
      { q: "Can you brief and manage our copywriters?", a: "Yes - either brief your in-house writers or handle production end-to-end. Whichever is cheaper for you." },
      { q: "How do you handle escalations?", a: "One senior lead, direct line, response within 4 working hours. No ticket queues." },
    ],
  },
  {
    slug: "for-ecommerce-teams",
    path: "/for-ecommerce-teams",
    title: "Ecommerce SEO & Growth Support for In-House Teams | BeingEcom",
    metaTitle: "Ecommerce Growth Partner for In-House Teams | BeingEcom",
    description:
      "Bolt-on senior expertise for in-house ecommerce teams: SEO, paid, CRO, and analytics support without replacing your team. UK-based, senior-only.",
    eyebrow: "For in-house teams",
    h1: "Senior expertise, on tap, for in-house ecommerce teams",
    intro:
      "You have a strong in-house team. You need senior specialists in the gaps - technical SEO, digital PR, CRO experimentation, or analytics - without hiring another five people. That's exactly what we do.",
    summary:
      "BeingEcom bolts on to in-house UK ecommerce teams as a senior specialist layer. Fill gaps in technical SEO, digital PR, CRO experimentation, or analytics without replacing your team. Retained monthly, project-based, or as fractional CMO support.",
    pills: ["Bolt-on model", "Senior only", "No junior overlap"],
    sections: [
      {
        heading: "How the bolt-on model works",
        body: "Your team owns day-to-day execution and channel management. We plug in as the senior specialist layer for scoped disciplines - technical SEO, digital PR, CRO, or analytics - via retainer or project.",
        bullets: [
          "Technical SEO specialist",
          "Digital PR / link acquisition",
          "CRO experimentation lead",
          "Analytics + attribution",
        ],
      },
      {
        heading: "What we don't do",
        body: "Compete with your in-house team, or duplicate junior work you already have covered. We come in for the senior gaps, do the work, and hand back knowledge documented for your team.",
      },
      {
        heading: "Knowledge transfer built in",
        body: "Every engagement includes documentation, playbooks, and (if you want) direct upskilling of your team. When we leave, your team is stronger than when we arrived.",
      },
    ],
    related: [
      { label: "Agency vs in-house SEO", to: "/agency-vs-inhouse-seo" },
      { label: "Enterprise ecommerce SEO", to: "/enterprise-ecommerce-seo" },
      { label: "Methodology", to: "/methodology" },
      { label: "Contact", to: "/contact" },
    ],
    faqs: [
      { q: "Will you replace roles on my team?", a: "No. We're built to fill senior gaps, not to threaten existing hires. In practice we usually make in-house teams look better, not worse." },
      { q: "Can we scope a single discipline?", a: "Yes - technical SEO only, digital PR only, or CRO only are all common scopes. Retainer or fixed project." },
      { q: "Do you upskill our team?", a: "Yes if you want it. Every playbook and framework is documented, and we offer optional monthly upskilling sessions." },
      { q: "How do you avoid overlap with our team?", a: "Kickoff includes a joint RACI so every workstream has one owner. No duplicated work, no political friction." },
    ],
  },
  {
    slug: "for-enterprise-brands",
    path: "/for-enterprise-brands",
    title: "Enterprise Ecommerce SEO & Growth Partner (UK) | BeingEcom",
    metaTitle: "Enterprise Ecommerce Growth Agency UK | BeingEcom",
    description:
      "Enterprise ecommerce growth for UK brands £5m+: senior-only team, replatform experience, board-level reporting, and a partner that operates at your governance standard.",
    eyebrow: "For enterprise brands",
    h1: "Enterprise ecommerce growth, without the enterprise agency bloat",
    intro:
      "You need senior operators, not account layers. Board-level reporting, not template decks. A partner that can survive a replatform, a leadership change, and a bad quarter without losing pace. That's who we are.",
    summary:
      "BeingEcom works with enterprise UK ecommerce brands (£5m+) as a senior-only growth partner. Replatform-experienced, board-comfortable, procurement-friendly, and structured to move faster than large agencies without the account-management tax.",
    pills: ["£5m+ brands", "Senior only", "Board-ready"],
    sections: [
      {
        heading: "What enterprise buyers actually need",
        body: "Governance-grade process, senior operators end-to-end, and the ability to run alongside big agency partners (Shopify Plus solution partners, media agencies, PR firms) without political friction.",
        bullets: [
          "Governance-grade process",
          "Senior-only delivery team",
          "Fits alongside existing agency partners",
          "Board-ready quarterly reporting",
        ],
      },
      {
        heading: "Replatform and migration experience",
        body: "We've moved brands on and off Shopify Plus, Magento, and BigCommerce without losing organic traffic. Migration is the enterprise moment where the wrong partner costs 30-60% of organic revenue. We're that partner done right.",
      },
      {
        heading: "How we plug into enterprise governance",
        body: "Procurement-friendly MSA templates, ISO-aligned data handling, named senior lead with escalation SLA, and reporting that fits your existing board pack format.",
      },
    ],
    related: [
      { label: "Enterprise ecommerce SEO", to: "/enterprise-ecommerce-seo" },
      { label: "Migration SEO", to: "/ecommerce-migration-seo" },
      { label: "Methodology", to: "/methodology" },
      { label: "Case studies", to: "/case-studies" },
    ],
    faqs: [
      { q: "Do you sign enterprise MSAs?", a: "Yes - either yours or ours. We've been through procurement at Shopify Plus and enterprise retailers." },
      { q: "How do you handle data and security?", a: "GDPR-compliant, ISO-aligned data handling, named DPO contact, and access controls documented per engagement." },
      { q: "Can you work alongside our existing agencies?", a: "Yes - we regularly work alongside Shopify Plus solution partners, PR firms, and media agencies. RACI is agreed in the first two weeks." },
      { q: "What's the minimum engagement?", a: "£8,000/mo retained or a scoped project starting at £15,000. Below that, the enterprise fit is usually wrong." },
    ],
    ctaHeading: "Request a growth assessment",
    ctaSub: "A senior partner will scope your opportunity and reply within two working days.",
  },
];

export function findPillar(slug: string): PillarPage | undefined {
  return PILLAR_PAGES.find((p) => p.slug === slug);
}
