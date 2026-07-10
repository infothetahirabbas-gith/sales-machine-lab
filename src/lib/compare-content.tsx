import type { ReactNode } from "react";

export type ComparisonRow = {
  criterion: string;
  a: string;
  b: string;
  winner: "a" | "b" | "tie";
};

export type ComparisonEntry = {
  slug: string;
  a: string;
  b: string;
  eyebrow: string;
  h1: string;
  // 40-60 word answer-first paragraph optimised for AI answer engines
  verdict: string;
  bestFor: { a: string; b: string };
  rows: ComparisonRow[];
  pros: { a: string[]; b: string[] };
  cons: { a: string[]; b: string[] };
  when: { a: string; b: string };
  bottomLine: ReactNode;
  faqs: { q: string; a: string }[];
  meta: { title: string; description: string };
  relatedServices: { label: string; to: string }[];
};

const COMPARE: Record<string, ComparisonEntry> = {
  "shopify-vs-woocommerce": {
    slug: "shopify-vs-woocommerce",
    a: "Shopify",
    b: "WooCommerce",
    eyebrow: "Platform comparison",
    h1: "Shopify vs WooCommerce (UK, 2026)",
    verdict:
      "For most UK DTC brands doing £0–£10M/year, Shopify wins on speed-to-launch, checkout conversion, PSD2/Strong Customer Authentication handling and total cost of ownership. WooCommerce wins for content-led, high-margin niches that need deep customisation and already run WordPress engineering.",
    bestFor: {
      a: "DTC brands £0–£10M scaling paid + email without a dev team.",
      b: "Content-led, high-margin brands with WordPress and dev in-house.",
    },
    rows: [
      { criterion: "Speed to launch", a: "1–4 weeks", b: "4–12 weeks", winner: "a" },
      { criterion: "Monthly platform cost", a: "£25–£2,300", b: "£30–£400 (hosting + plugins)", winner: "b" },
      { criterion: "Checkout conversion", a: "Best-in-class, PSD2 handled", b: "Plugin-dependent", winner: "a" },
      { criterion: "Design freedom", a: "Themes + sections", b: "Total freedom (dev needed)", winner: "b" },
      { criterion: "Plugin/app ecosystem", a: "8,000+ curated apps", b: "60,000+ plugins (quality varies)", winner: "a" },
      { criterion: "SEO ceiling", a: "High with proper setup", b: "Highest (with dev discipline)", winner: "b" },
      { criterion: "Scaling above £5M/yr", a: "Shopify Plus", b: "Requires infra + dev headcount", winner: "a" },
      { criterion: "Security & PCI", a: "Managed by Shopify", b: "Your responsibility", winner: "a" },
      { criterion: "Ownership", a: "Rented (SaaS)", b: "Fully owned", winner: "b" },
    ],
    pros: {
      a: [
        "Zero DevOps — Shopify handles hosting, security, PCI, uptime",
        "Best-in-class checkout with Shop Pay accelerator",
        "Enterprise checkout extensibility on Shopify Plus",
        "Native Shop Pay Instalments (BNPL) for UK shoppers",
      ],
      b: [
        "Full ownership of code, data and hosting",
        "Deep WordPress SEO ecosystem (Rank Math, Yoast)",
        "Any customisation is possible with dev budget",
        "Low fixed cost at small scale",
      ],
    },
    cons: {
      a: [
        "Monthly SaaS + app stack adds up (£300–£1,500/mo typical)",
        "Some checkout customisation still Plus-only",
        "Transaction fees if not using Shopify Payments",
      ],
      b: [
        "Plugin bloat destroys Core Web Vitals",
        "You own security, updates, backups, uptime",
        "Slower checkout conversion out of the box",
        "Scaling past ~£1M/month needs real infra",
      ],
    },
    when: {
      a: "You're a DTC brand under £10M/year that wants to spend engineering budget on growth, not infrastructure. Especially strong for apparel, beauty, supplements, food & drink.",
      b: "You're a content-led brand (media, publishing, membership + commerce) already on WordPress with dev capacity, or you need custom checkout logic Shopify Plus cannot deliver.",
    },
    bottomLine: (
      <>
        <p>
          If you're a UK DTC brand under ~£10M/year and hiring your first ops person, ship on Shopify.
          The compounding checkout conversion and eliminated DevOps overhead almost always beats the
          extra platform cost.
        </p>
        <p>
          Choose WooCommerce when you're content-led, already on WordPress, and have engineering
          capacity you'd otherwise waste. Above £3–5M/year the platform choice matters far less than
          your ops, creative and retention systems.
        </p>
      </>
    ),
    faqs: [
      { q: "Is Shopify or WooCommerce better for SEO in the UK?", a: "Both can rank equally well. WooCommerce has a higher technical ceiling because you own the stack, but Shopify's built-in structure (predictable URLs, fast global CDN, clean JSON-LD support via apps) means most brands rank faster on Shopify without needing a developer." },
      { q: "What's the real total cost of ownership?", a: "Shopify: platform + apps + payment fees typically £300–£1,500/month for a growing DTC brand. WooCommerce: hosting + plugins + maintenance dev retainer typically £250–£800/month, but a checkout or Core Web Vitals project can add £5k–£30k one-off." },
      { q: "Which converts better in the UK?", a: "Shopify's Shop Pay accelerator and PSD2/SCA-optimised checkout typically converts 5–15% higher on mobile than a default WooCommerce checkout. A custom Woo checkout can close the gap but rarely beats Shop Pay." },
      { q: "Can I migrate WooCommerce to Shopify later?", a: "Yes — products, customers, orders, historical data and blog content all migrate cleanly with tools like Matrixify or LitExtension. Redirects and SEO transfer are the make-or-break; plan 3–6 weeks with a specialist." },
    ],
    meta: {
      title: "Shopify vs WooCommerce (UK, 2026) — Honest Comparison | BeingEcom",
      description: "Shopify or WooCommerce for a UK DTC brand? Full comparison of cost, checkout conversion, SEO, scaling and total ownership — from an operator team that ships on both.",
    },
    relatedServices: [
      { label: "Shopify Development", to: "/services/store-development/shopify" },
      { label: "WooCommerce Development", to: "/services/store-development/woocommerce" },
    ],
  },

  "shopify-agency-vs-freelancer": {
    slug: "shopify-agency-vs-freelancer",
    a: "Shopify Agency",
    b: "Freelancer",
    eyebrow: "Hiring comparison",
    h1: "Shopify Agency vs Freelancer (UK, 2026)",
    verdict:
      "A specialist agency wins when you need multi-discipline execution — dev, CRO, paid, SEO, email — held to weekly rhythm and revenue accountability. A freelancer wins for a single scoped project (theme build, one migration, a checkout tweak) where dependency risk and continuity aren't critical.",
    bestFor: {
      a: "Brands £30k–£1M/month wanting a senior fractional growth team.",
      b: "Founders with a specific, scoped, one-off deliverable.",
    },
    rows: [
      { criterion: "Multi-discipline coverage", a: "Yes — dev, CRO, paid, SEO, email", b: "No — one specialism", winner: "a" },
      { criterion: "Speed on a single task", a: "Coordinated but slower", b: "Fast", winner: "b" },
      { criterion: "Cost", a: "£4k–£25k/month", b: "£300–£1,200/day", winner: "b" },
      { criterion: "Bus factor / continuity", a: "Team-backed", b: "Single point of failure", winner: "a" },
      { criterion: "Process & reporting", a: "Weekly cadence, dashboards", b: "Ad-hoc", winner: "a" },
      { criterion: "Accountability to revenue", a: "Usually contractual", b: "Rarely", winner: "a" },
      { criterion: "Onboarding friction", a: "1–2 weeks", b: "Days", winner: "b" },
    ],
    pros: {
      a: [
        "One accountable partner for the whole growth stack",
        "Weekly execution rhythm, monthly business review",
        "Bench of senior operators — no key-person risk",
        "Pattern library from 100+ similar brands",
      ],
      b: [
        "Cheaper for a single, well-scoped task",
        "Direct access to the person doing the work",
        "No agency overhead or account manager layer",
        "Fast to start on discrete deliverables",
      ],
    },
    cons: {
      a: [
        "Higher monthly commitment",
        "Weaker fit for a single one-off task",
        "Onboarding takes 1–2 weeks",
      ],
      b: [
        "Only covers one discipline",
        "No coverage if they get sick, quit or take on bigger clients",
        "Rarely accountable to revenue outcomes",
        "You do the integration between disciplines yourself",
      ],
    },
    when: {
      a: "You're doing £30k–£1M/month, don't want to hire a full in-house team, and need paid + CRO + SEO + email pulling in the same direction against one weekly plan.",
      b: "You have a scoped, one-off need — a theme build, a migration, a Klaviyo audit — and you already have a senior person to integrate their work into your overall strategy.",
    },
    bottomLine: (
      <>
        <p>
          If growth is your main constraint and you want one team accountable to revenue, an agency
          with a senior operator model wins nearly every time. If your only need is a single scoped
          deliverable, a freelancer is faster and cheaper.
        </p>
        <p>
          The failure mode most brands make is hiring three freelancers (dev, paid, email) and
          treating that as a growth team — nobody owns the outcome and the integration cost lands on
          the founder.
        </p>
      </>
    ),
    faqs: [
      { q: "How do I know if an agency is senior-only vs junior-heavy?", a: "Ask who will do the work day-to-day and see their LinkedIn. If the pitch team is senior but delivery is a 22-year-old account exec, it's junior-heavy. Senior-only agencies name their operators upfront and put them on discovery calls." },
      { q: "What retainer size is reasonable?", a: "In the UK, a serious senior growth retainer covering multiple disciplines runs £4k–£15k/month for £30k–£500k/month brands. Below £3k/month you're either buying junior time or a single specialism." },
      { q: "Can I combine agency + freelancer?", a: "Yes — many brands use an agency for strategy and continuous execution across disciplines, and a freelancer for a specialist one-off (headless dev, a particular integration). Make sure the agency owns the overall growth plan." },
    ],
    meta: {
      title: "Shopify Agency vs Freelancer (2026) — Which Is Right for Your Brand? | BeingEcom",
      description: "Agency or freelancer for your Shopify store? Cost, speed, coverage, continuity and revenue accountability compared for UK DTC brands £30k–£1M/month.",
    },
    relatedServices: [
      { label: "See our services", to: "/services" },
      { label: "Book a strategy call", to: "/contact" },
    ],
  },

  "seo-vs-paid-ads": {
    slug: "seo-vs-paid-ads",
    a: "SEO",
    b: "Paid Ads",
    eyebrow: "Channel comparison",
    h1: "SEO vs Paid Ads for Ecommerce (2026)",
    verdict:
      "Paid ads buy revenue this week; SEO compounds free revenue for years. Serious ecommerce brands run both — paid to fund acquisition inside CAC targets while SEO builds a durable moat. Choosing one over the other is a false trade-off outside the first 90 days.",
    bestFor: {
      a: "Brands wanting compounding, no-CPM revenue that survives ad platform outages.",
      b: "Brands needing predictable weekly revenue and fast validation of offers.",
    },
    rows: [
      { criterion: "Time to first revenue", a: "3–6 months", b: "Days", winner: "b" },
      { criterion: "Cost per incremental customer", a: "Falls over time", b: "Rises over time", winner: "a" },
      { criterion: "Compounding", a: "Yes", b: "No — spend stops = revenue stops", winner: "a" },
      { criterion: "Predictability week-to-week", a: "Low early, high after 12mo", b: "High", winner: "b" },
      { criterion: "Iteration speed on offers", a: "Slow (weeks)", b: "Fast (hours)", winner: "b" },
      { criterion: "Survives platform outages", a: "Yes", b: "No", winner: "a" },
      { criterion: "12-month blended CAC", a: "Lower", b: "Higher", winner: "a" },
    ],
    pros: {
      a: [
        "Compounds — every ranking is durable free traffic",
        "No CPM inflation, no platform account risk",
        "Highest-quality organic buyers, best 12-month LTV",
        "Powers AI Overview and LLM citations",
      ],
      b: [
        "Revenue this week, not this year",
        "Instant offer, creative and audience testing",
        "Scales fast with budget",
        "Directly attributable in most platforms",
      ],
    },
    cons: {
      a: [
        "Slow — meaningful traffic usually takes 4–9 months",
        "Requires content + engineering + link investment",
        "Google algorithm risk (though far lower than platform ad risk)",
      ],
      b: [
        "Spend stops = revenue stops",
        "CPMs rise every year; margins compress",
        "One account ban / policy strike can wipe the channel",
        "You never own the audience",
      ],
    },
    when: {
      a: "You're building a brand you'd like to sell or run for 5+ years. You want your CAC to fall not rise. You have 6–12 months of runway to invest before the payoff curve steepens.",
      b: "You're validating a new brand, launching a product, or need cash-generative revenue right now to fund the rest of the business. You accept the CAC ceiling in exchange for speed.",
    },
    bottomLine: (
      <>
        <p>
          The right question isn't SEO or paid — it's what percentage of the mix each channel should
          own at your current stage. A £30k/month brand should skew ~70% paid / 20% SEO / 10% email.
          A £500k/month brand should skew closer to 45% paid / 30% SEO / 25% email.
        </p>
        <p>
          Brands that only run paid hit a CPM ceiling by year 3 and can't grow profitably. Brands
          that only do SEO starve for cash before it compounds. Do both.
        </p>
      </>
    ),
    faqs: [
      { q: "How long until SEO pays back?", a: "For a UK Shopify or WooCommerce brand starting from scratch: 4–6 months to first meaningful traffic, 9–12 months to real revenue, 18 months to be a top-3 channel. Existing sites with authority can compress that by 40–60%." },
      { q: "What's the right paid : organic ratio?", a: "For growth-stage DTC (£30k–£300k/month): roughly 60–70% paid. For established brands (£500k+/month): closer to 40–50% paid, with SEO and email eating a bigger share. Zero paid is under-scaling; zero SEO is unsustainable." },
      { q: "Should I stop paid ads and 'just do SEO'?", a: "Only if your business can survive 6+ months of revenue drought. For most brands the answer is no — instead, tighten paid to profitable spend and reinvest saved margin into SEO content and links." },
    ],
    meta: {
      title: "SEO vs Paid Ads for Ecommerce (2026) — Which One First? | BeingEcom",
      description: "SEO or paid ads for your Shopify/WooCommerce brand? Speed, CAC, compounding, risk and 12-month economics compared — with mix recommendations by revenue stage.",
    },
    relatedServices: [
      { label: "Ecommerce SEO", to: "/services/seo" },
      { label: "Performance Marketing", to: "/services/performance-marketing" },
    ],
  },

  "meta-ads-vs-google-ads": {
    slug: "meta-ads-vs-google-ads",
    a: "Meta Ads",
    b: "Google Ads",
    eyebrow: "Paid media comparison",
    h1: "Meta Ads vs Google Ads for Ecommerce (2026)",
    verdict:
      "Meta creates demand from cold audiences using creative and interruption; Google captures existing demand from users already searching. Profitable ecommerce brands run both — Meta to fill the top-of-funnel and Google (Search, Shopping, PMax) to convert the intent that Meta and organic create.",
    bestFor: {
      a: "Visually-driven, category-creator or impulse-purchase products.",
      b: "Products with existing search demand, high-consideration purchases.",
    },
    rows: [
      { criterion: "Demand type", a: "Creates demand", b: "Captures demand", winner: "tie" },
      { criterion: "Creative dependency", a: "Extreme", b: "Moderate", winner: "b" },
      { criterion: "Weekly creative volume needed", a: "15–40 variants", b: "3–8 RSAs + assets", winner: "b" },
      { criterion: "Prospecting reach", a: "Excellent", b: "Limited (Shopping + PMax)", winner: "a" },
      { criterion: "Bottom-funnel conversion", a: "Moderate", b: "Excellent", winner: "b" },
      { criterion: "Tracking accuracy (2026)", a: "Requires CAPI + server-side", b: "More resilient", winner: "b" },
      { criterion: "CPM trend", a: "Rising sharply", b: "Rising moderately", winner: "b" },
    ],
    pros: {
      a: [
        "Only real prospecting channel at scale",
        "Best playground for creative-driven brand building",
        "Advantage+ Shopping automates targeting",
        "UGC + testimonial video compounds",
      ],
      b: [
        "Captures buyers already searching = highest intent",
        "Shopping ads dominate PDP-style queries",
        "PMax combines Search, Shopping, YouTube, Discover",
        "More resilient to iOS tracking issues",
      ],
    },
    cons: {
      a: [
        "Ferocious creative appetite (weekly refresh required)",
        "iOS / ATT-driven tracking loss without CAPI + server-side",
        "Rising CPMs compress ROAS every year",
        "Weak for pure bottom-funnel intent",
      ],
      b: [
        "Cannot generate demand that doesn't exist",
        "Brand keyword cannibalisation without proper structure",
        "PMax is a black box on placement + query data",
        "High CPCs in competitive UK retail categories",
      ],
    },
    when: {
      a: "You sell something visual, giftable or lifestyle-driven where a great video can create the demand. Fashion, beauty, home, food & drink, novel product categories.",
      b: "People already search for your product by category or SKU. High-consideration purchases (electronics, appliances, B2B, professional tools).",
    },
    bottomLine: (
      <>
        <p>
          Both channels together beat either alone. A healthy ecommerce paid mix typically runs
          55–70% Meta / 25–40% Google for lifestyle DTC, and flips (30% Meta / 60% Google) for
          high-intent search-first categories.
        </p>
        <p>
          The most common failure mode is optimising each channel in isolation. Measure with blended
          MER against contribution margin — not platform ROAS — and let the two channels play their
          different roles.
        </p>
      </>
    ),
    faqs: [
      { q: "Which platform should I start with?", a: "If people already search for your product (\"electric bike UK\", \"vitamin C serum\"), start Google Shopping + Search. If they don't (a new category, a novel product, a lifestyle brand), start Meta — you need to create demand before you can capture it." },
      { q: "What's a healthy Meta : Google split?", a: "For lifestyle DTC (fashion, beauty, home): 55–70% Meta, 25–40% Google, remainder on TikTok/YouTube. For high-intent search-first categories: flip to 30% Meta, 60% Google Shopping + Search, 10% remarketing." },
      { q: "Should I use Performance Max?", a: "Yes, but only after your Shopping and Search structure is dialled and after excluding brand terms. Fed poorly, PMax cannibalises brand + retargeting and reports inflated ROAS. Fed properly, it's one of the best incremental channels of the last 3 years." },
    ],
    meta: {
      title: "Meta Ads vs Google Ads for Ecommerce (2026) — Which First? | BeingEcom",
      description: "Meta or Google Ads for your Shopify/WooCommerce store? Prospecting vs demand-capture, creative burden, tracking, CPMs and profitable mix compared.",
    },
    relatedServices: [
      { label: "Meta Ads", to: "/services/performance-marketing/facebook-ads" },
      { label: "Google Ads", to: "/services/performance-marketing/google-ads" },
    ],
  },

  "klaviyo-vs-mailchimp": {
    slug: "klaviyo-vs-mailchimp",
    a: "Klaviyo",
    b: "Mailchimp",
    eyebrow: "Email platform comparison",
    h1: "Klaviyo vs Mailchimp for Ecommerce (2026)",
    verdict:
      "Klaviyo wins for any serious Shopify or WooCommerce brand — deeper ecommerce data model, faster flows, better segmentation, native SMS. Mailchimp is fine for newsletters and small businesses without ecommerce as the core, but it hits a ceiling fast on retention revenue.",
    bestFor: {
      a: "Shopify / WooCommerce brands where email + SMS retention is a serious revenue channel.",
      b: "Small businesses, content sites, mailing lists without ecommerce depth.",
    },
    rows: [
      { criterion: "Ecommerce integration depth", a: "Native, event-level", b: "Basic", winner: "a" },
      { criterion: "Flow builder", a: "Best-in-class", b: "Adequate", winner: "a" },
      { criterion: "Segmentation power", a: "Behavioural + predictive", b: "Basic", winner: "a" },
      { criterion: "Native SMS", a: "Yes (UK supported)", b: "Add-on", winner: "a" },
      { criterion: "Predictive analytics", a: "CLV, churn, next order", b: "No", winner: "a" },
      { criterion: "Ease of use for beginners", a: "Moderate", b: "Easier", winner: "b" },
      { criterion: "Price at 10k contacts", a: "~£120/mo", b: "~£75/mo", winner: "b" },
      { criterion: "Deliverability", a: "Very strong", b: "Strong", winner: "a" },
    ],
    pros: {
      a: [
        "Deep, event-level Shopify + WooCommerce integration",
        "Best-in-class flow builder (abandoned cart, browse, post-purchase, winback)",
        "Predictive analytics: CLV, churn risk, next order date",
        "Native SMS built into the same customer profile",
      ],
      b: [
        "Cheaper at small list sizes",
        "Simpler interface for first-time users",
        "Better for content-driven newsletters",
        "Long-established brand + support",
      ],
    },
    cons: {
      a: [
        "Learning curve is real — flows can get complex",
        "More expensive at scale",
        "SMS pricing adds up on top of email",
      ],
      b: [
        "Weak ecommerce data model — hard to segment by real behaviour",
        "Deliverability suffers on promotional heavy sends",
        "Flows are less powerful and slower to trigger",
        "You'll outgrow it above ~£30k/month DTC",
      ],
    },
    when: {
      a: "You're a Shopify or WooCommerce brand doing £15k+/month where email should be 20–35% of revenue. Migrate immediately if you're on Mailchimp — payback is usually under 60 days.",
      b: "You run a content site, newsletter or non-ecommerce business where segmentation depth doesn't matter and price does. Fine to stay.",
    },
    bottomLine: (
      <>
        <p>
          For ecommerce, the debate is largely over — Klaviyo is the default for a reason. The only
          real argument for staying on Mailchimp is a small list where the extra Klaviyo cost isn't
          justified.
        </p>
        <p>
          Moving from Mailchimp to Klaviyo typically lifts email revenue 40–120% within 90 days on
          the same list — from a better flow engine, deeper segmentation and predictive send-time.
        </p>
      </>
    ),
    faqs: [
      { q: "Is Klaviyo worth the extra cost?", a: "For a DTC brand doing £15k+/month, yes — the flow engine and segmentation typically add 15–35% to email revenue vs Mailchimp. Below £5k/month the extra cost isn't always justified until the list grows." },
      { q: "How hard is the migration?", a: "For a 10k–50k contact list with a Shopify or WooCommerce brand: 2–3 weeks. Historical data, segments, popup and flow rebuilds are all straightforward. The hard part is rewriting flows to actually use Klaviyo's features, not just copying Mailchimp." },
      { q: "Does Klaviyo work with WooCommerce?", a: "Yes — the WooCommerce integration is mature. Product catalogue sync, event tracking (checkout started, order placed, refunded), and dynamic product blocks all work. Set up the WooCommerce integration and Klaviyo webhooks together so events fire reliably." },
    ],
    meta: {
      title: "Klaviyo vs Mailchimp (2026) — Which for Shopify or WooCommerce? | BeingEcom",
      description: "Klaviyo or Mailchimp for your ecommerce brand? Flows, segmentation, predictive analytics, SMS, deliverability, pricing and migration compared for UK DTC.",
    },
    relatedServices: [
      { label: "Email & SMS Marketing", to: "/services/email-sms" },
    ],
  },

  "ai-automation-vs-manual-marketing": {
    slug: "ai-automation-vs-manual-marketing",
    a: "AI Automation",
    b: "Manual Marketing",
    eyebrow: "Ops comparison",
    h1: "AI Automation vs Manual Marketing (2026)",
    verdict:
      "AI automation wins for repeatable, judgement-light work — reporting, ad-copy variants, product descriptions, first-draft creative, support routing. Manual work wins for strategy, brand voice, creative direction and anything a wrong answer would embarrass the brand. Best-run ecommerce teams use both — AI does the boring 60%, senior humans direct the important 40%.",
    bestFor: {
      a: "Repeatable production work, first drafts, reporting, routing, personalisation at scale.",
      b: "Strategy, brand voice, senior creative direction, high-stakes decisions.",
    },
    rows: [
      { criterion: "Cost per unit of output", a: "Very low", b: "High", winner: "a" },
      { criterion: "Speed", a: "Seconds", b: "Hours to days", winner: "a" },
      { criterion: "Quality on judgement calls", a: "Weak", b: "Strong", winner: "b" },
      { criterion: "Brand voice consistency", a: "Depends on prompt", b: "Strong if senior-led", winner: "b" },
      { criterion: "Scalability", a: "Effectively unlimited", b: "Linear with headcount", winner: "a" },
      { criterion: "Risk on error", a: "High if unsupervised", b: "Low", winner: "b" },
      { criterion: "Best for first drafts", a: "Yes", b: "No", winner: "a" },
    ],
    pros: {
      a: [
        "Ships 10–50× more first-draft output per person",
        "Consistent formatting, structure, schema",
        "Cheap enough to try more experiments",
        "Handles reporting, monitoring and routing 24/7",
      ],
      b: [
        "Real strategic judgement",
        "Brand voice and creative taste",
        "Handles ambiguity, tradeoffs and stakeholder politics",
        "Accountability sits with a named human",
      ],
    },
    cons: {
      a: [
        "Confidently wrong on niche facts",
        "Bland output without careful prompting and brand context",
        "Zero accountability — a human must approve",
        "Content-farm penalties if used without human editorial",
      ],
      b: [
        "Doesn't scale — every extra piece needs headcount",
        "Slow first drafts eat senior time that should go to strategy",
        "Inconsistent formatting and structure",
        "Reporting and monitoring get skipped when things get busy",
      ],
    },
    when: {
      a: "Anywhere you have a template, repeatable pattern or first-draft need — product descriptions, ad copy variants, reporting summaries, tier-2 support triage, meta tags at scale.",
      b: "Anywhere the answer matters, the brand voice matters, or a mistake costs money — strategy, senior creative direction, offer design, PR, crisis response, exec-level decisions.",
    },
    bottomLine: (
      <>
        <p>
          The right pattern in 2026 is not \"AI replaces marketing\" — it's \"AI removes the boring
          60% so senior operators do 100% strategic work.\" Every marketing hire without an AI
          workflow is doing 3–5 hours a day a machine could do in minutes.
        </p>
        <p>
          Brands that ban AI look expensive by 2027. Brands that go fully AI without senior oversight
          get penalised by Google and abandoned by customers. The moat is the human editorial layer
          on top of high-leverage AI production.
        </p>
      </>
    ),
    faqs: [
      { q: "Will AI-generated content get penalised by Google?", a: "Only if it's unsupervised, generic and unhelpful. Google's stated policy penalises low-quality, low-effort content regardless of author (human or AI). AI content edited by a senior human, with unique data, examples and structure, ranks fine." },
      { q: "What should I automate first?", a: "Weekly reporting summaries, product description first drafts, ad copy variants, alt text at scale, meta title/description generation, tier-1 support routing. These have clear inputs, clear outputs and low risk on error." },
      { q: "Do I still need a human copywriter?", a: "Yes — for brand voice, campaign concepts, PR, high-stakes launches and editorial direction on AI output. But you probably need one senior copywriter, not three juniors — the AI takes the load the juniors used to." },
    ],
    meta: {
      title: "AI Automation vs Manual Marketing (2026) — Where to Use Each | BeingEcom",
      description: "Where AI automation beats manual marketing in ecommerce — and where senior humans still win. Cost, speed, quality, risk and the operating model that combines both.",
    },
    relatedServices: [
      { label: "AI Automation", to: "/services/ai-automation" },
    ],
  },
  "shopify-plus-vs-bigcommerce": {
    slug: "shopify-plus-vs-bigcommerce",
    a: "Shopify Plus",
    b: "BigCommerce Enterprise",
    eyebrow: "Enterprise platform",
    h1: "Shopify Plus vs BigCommerce Enterprise (2026)",
    verdict:
      "Shopify Plus wins for consumer DTC brands prioritising checkout conversion, app ecosystem and speed to launch. BigCommerce Enterprise wins for B2B and hybrid B2B/B2C catalogs needing native quote management, price lists and multi-storefront without heavy custom dev.",
    bestFor: {
      a: "Consumer DTC £2M+ scaling globally with best-in-class checkout.",
      b: "B2B, wholesale and hybrid catalogs with complex pricing rules.",
    },
    rows: [
      { criterion: "Checkout conversion", a: "Best-in-class (Shop Pay)", b: "Strong, no accelerator", winner: "a" },
      { criterion: "Native B2B", a: "Available (Plus tier)", b: "Deeper native B2B", winner: "b" },
      { criterion: "App ecosystem", a: "8,000+", b: "~1,200", winner: "a" },
      { criterion: "Multi-storefront", a: "Markets (limited)", b: "Native multi-storefront", winner: "b" },
      { criterion: "Transaction fees", a: "Yes off Shopify Payments", b: "None", winner: "b" },
      { criterion: "Total cost of ownership", a: "Higher SaaS cost", b: "Lower for large catalogs", winner: "b" },
      { criterion: "Speed to launch", a: "4–8 weeks", b: "6–12 weeks", winner: "a" },
      { criterion: "Ecosystem talent pool", a: "Very deep", b: "Smaller but capable", winner: "a" },
    ],
    pros: {
      a: ["Shop Pay accelerator + Shop Pay Instalments", "Deep app ecosystem for every use case", "Checkout extensibility via blocks", "Huge talent pool of Plus agencies and devs"],
      b: ["Native B2B, quote management, price lists", "Multi-storefront without extra tenancy fees", "No transaction fees regardless of processor", "Open API for headless without proprietary lock-in"],
    },
    cons: {
      a: ["Transaction fees off Shopify Payments", "Multi-storefront still limited via Markets", "Enterprise pricing not public"],
      b: ["Smaller app and agency ecosystem", "Weaker checkout conversion out of the box", "Fewer native retention/subscription options"],
    },
    when: {
      a: "Consumer DTC brand scaling internationally, prioritising checkout conversion and creative-led marketing.",
      b: "Wholesale or hybrid catalog business needing B2B pricing rules, quotes and multi-brand storefronts.",
    },
    bottomLine: (
      <>
        <p>
          For every consumer DTC brand we've reviewed above £2M, Shopify Plus wins on checkout,
          ecosystem and time-to-value. The gap only closes for genuine B2B or hybrid businesses
          where BigCommerce's native quote and pricing engine saves 6-figures of custom development.
        </p>
        <p>
          Choose Plus for margin-per-order + creative velocity; choose BigCommerce for pricing
          complexity + multi-storefront needs.
        </p>
      </>
    ),
    faqs: [
      { q: "Which is cheaper?", a: "BigCommerce Enterprise typically has a lower blended TCO for large catalogs — no transaction fees, no per-storefront tenancy fees. Shopify Plus wins on ROI when checkout conversion and app velocity matter more than platform fee." },
      { q: "Can Shopify Plus handle B2B?", a: "Yes, natively since 2023, and improving fast — but BigCommerce still leads on complex pricing rules, quotes and hybrid B2B/B2C at scale." },
      { q: "Which is better for international?", a: "Shopify Markets is easier to set up; BigCommerce Multi-Storefront is more flexible but requires more configuration. Sub-5 markets: Plus. 10+ markets with different catalogs: BigCommerce." },
    ],
    meta: {
      title: "Shopify Plus vs BigCommerce Enterprise (2026) — Full Comparison | BeingEcom",
      description: "Shopify Plus vs BigCommerce Enterprise for scaling ecommerce brands — checkout, B2B, multi-storefront, cost and ecosystem compared by senior operators.",
    },
    relatedServices: [
      { label: "Shopify development", to: "/services/store-development/shopify" },
      { label: "Consulting", to: "/services/consulting" },
    ],
  },
  "in-house-vs-agency": {
    slug: "in-house-vs-agency",
    a: "In-house team",
    b: "Ecommerce agency",
    eyebrow: "Team structure",
    h1: "In-house team vs ecommerce agency (2026)",
    verdict:
      "In-house wins for the strategic leadership layer (Head of Growth, Head of Retention) and brand-critical work. A senior agency wins for specialist execution — SEO, paid, CRO, dev — where hiring one senior per discipline costs 6× more than partnering with a team that already runs them.",
    bestFor: {
      a: "Strategic ownership, brand voice, product decisions, roadmap.",
      b: "Specialist execution across SEO, paid, CRO, email and development.",
    },
    rows: [
      { criterion: "Cost per senior specialist", a: "£70–£120k + benefits", b: "£3–£10k/month fractional", winner: "b" },
      { criterion: "Depth of expertise", a: "One area, deep", b: "Multiple areas, deep", winner: "b" },
      { criterion: "Brand ownership", a: "Full", b: "Partnered", winner: "a" },
      { criterion: "Ramp time", a: "3–6 months", b: "2–4 weeks", winner: "b" },
      { criterion: "Loss when someone leaves", a: "Total (3–6 months)", b: "Minimal (team pod)", winner: "b" },
      { criterion: "Alignment with business goals", a: "Highest", b: "Requires strong brief", winner: "a" },
      { criterion: "Access to tooling", a: "You pay for it all", b: "Included", winner: "b" },
    ],
    pros: {
      a: ["Full brand and IP ownership", "Deep product context over time", "Strategic decisions stay in-house", "Culture and voice control"],
      b: ["Multiple senior specialists for less than one hire", "Zero recruitment risk", "Access to cross-brand pattern recognition", "Faster to scale up or down"],
    },
    cons: {
      a: ["High fixed cost with no flexibility", "Recruitment risk and 3–6 month ramp", "Single point of failure per discipline", "Hard to keep pace with 4 platforms + 5 disciplines"],
      b: ["Requires strong internal owner to brief and QA", "Less deep on brand nuance without time", "Contracts and dependency risk if partner is weak"],
    },
    when: {
      a: "You have (or want) a Head of Growth or Head of Retention driving strategy and brief quality is high internally.",
      b: "You need best-in-class execution across 3+ disciplines without hiring 3+ seniors, or your in-house team is stretched.",
    },
    bottomLine: (
      <>
        <p>
          The right structure is almost never one or the other — it's a small senior in-house team
          owning strategy and brand, partnered with a senior agency handling specialist execution.
          That combination beats a large in-house team on cost, and beats agency-only on brand fidelity.
        </p>
        <p>
          Below £5M/year, agency-heavy usually wins on unit economics. Above £15M/year, the calculus
          shifts back to in-house for the disciplines closest to the product.
        </p>
      </>
    ),
    faqs: [
      { q: "Should I hire a Head of Growth in-house or use an agency?", a: "Hire the Head of Growth in-house — that's the strategy and brief layer. Use an agency for the specialist execution the Head of Growth then orchestrates." },
      { q: "When does in-house become cheaper?", a: "When you can fill 40+ hours a week of specialist work in a single discipline. Below that, fractional senior agency time is nearly always cheaper on outcomes." },
      { q: "How do I avoid getting a bad agency?", a: "Interview the senior operators, not the sales team. Ask to see three anonymised MER graphs from real clients, and reference-check with a founder who left them." },
    ],
    meta: {
      title: "In-house Ecommerce Team vs Agency (2026) — Cost, Speed & Depth | BeingEcom",
      description: "In-house ecommerce team vs agency — real cost comparison, ramp time, brand risk and the hybrid model most scaling brands actually use.",
    },
    relatedServices: [
      { label: "Consulting", to: "/services/consulting" },
      { label: "Why BeingEcom", to: "/company/why-us" },
    ],
  },
  "ga4-vs-shopify-analytics": {
    slug: "ga4-vs-shopify-analytics",
    a: "GA4",
    b: "Shopify Analytics",
    eyebrow: "Analytics stack",
    h1: "GA4 vs Shopify Analytics (2026)",
    verdict:
      "Shopify Analytics is the source of truth for orders and revenue; GA4 is the source of truth for behaviour, source and funnel. Every scaling Shopify brand needs both — reconciling to within 5% — plus server-side tagging on top.",
    bestFor: {
      a: "Behavioural, source and funnel analysis; audience building for paid.",
      b: "Order-level revenue reporting, cohort and merchandising analysis.",
    },
    rows: [
      { criterion: "Order accuracy", a: "±5–15% vs Shopify", b: "Source of truth", winner: "b" },
      { criterion: "Traffic source detail", a: "Full UTM + channel", b: "Basic", winner: "a" },
      { criterion: "Funnel analysis", a: "Full Enhanced Ecommerce", b: "Limited", winner: "a" },
      { criterion: "Cohort and LTV", a: "Requires BigQuery", b: "Native", winner: "b" },
      { criterion: "Audience export to ad platforms", a: "Yes", b: "Limited", winner: "a" },
      { criterion: "Setup complexity", a: "High (GTM, events)", b: "Zero", winner: "b" },
      { criterion: "Cost", a: "Free (BigQuery paid)", b: "Included", winner: "b" },
    ],
    pros: {
      a: ["Deepest behavioural analysis on the market", "First-class audience export to Google/Meta", "BigQuery export for custom reporting", "Free at the standard tier"],
      b: ["Zero setup — accurate from day one", "Native cohort and repeat-rate reporting", "Perfect order-level accuracy", "Merchandising insights out of the box"],
    },
    cons: {
      a: ["Order counts drift 5–15% from Shopify", "Requires proper GTM and event setup", "Steep learning curve for non-analysts"],
      b: ["No true funnel analysis", "Limited traffic source breakdown", "Weaker audience export", "Reports harder to customise"],
    },
    when: {
      a: "Any brand running paid media or serious SEO — GA4 is non-negotiable for source and funnel visibility.",
      b: "Any Shopify brand for order-level revenue, cohort and merchandising reporting — it's free and accurate.",
    },
    bottomLine: (
      <>
        <p>
          This isn't a choice. Every scaling Shopify brand runs both, plus GTM Server for signal
          restoration to Meta and Google. Shopify Analytics tells you what sold. GA4 tells you why
          and where from. The two together tell you what to do next.
        </p>
      </>
    ),
    faqs: [
      { q: "Which should I trust for revenue?", a: "Shopify — always. GA4 is directionally correct on revenue but will always show 5–15% variance vs Shopify because of consent, ad-blockers and cross-device gaps." },
      { q: "Do I need GA4 if I have Shopify?", a: "Yes, if you run any paid media or care about SEO. GA4 is the only place you see funnel drop-off, source attribution and cross-device journeys." },
      { q: "What about GA4 vs Northbeam/Triple Whale?", a: "GA4 covers behavioural + free forever. Northbeam/Triple Whale add MTA, MMM and paid-media-centric dashboards — worth the cost above ~£30k/mo ad spend, but don't replace GA4 for funnel analysis." },
    ],
    meta: {
      title: "GA4 vs Shopify Analytics (2026) — Which to Trust for What | BeingEcom",
      description: "GA4 vs Shopify Analytics compared for scaling ecommerce brands — order accuracy, funnel analysis, cohort reporting and the stack every serious brand runs.",
    },
    relatedServices: [
      { label: "Analytics", to: "/services/analytics" },
      { label: "Performance marketing", to: "/services/performance-marketing" },
    ],
  },
  "tiktok-ads-vs-meta-ads": {
    slug: "tiktok-ads-vs-meta-ads",
    a: "TikTok Ads",
    b: "Meta Ads",
    eyebrow: "Paid channel",
    h1: "TikTok Ads vs Meta Ads (2026)",
    verdict:
      "Meta remains the profitable scaling channel for most DTC brands — mature auction, best attribution, deepest audience targeting. TikTok wins for creator-led demand generation and Gen Z brands, and now competes on ROAS when the creative pipeline is built for it.",
    bestFor: {
      a: "Creator-driven demand generation, Gen Z reach, viral hook testing.",
      b: "Profitable scaling, retargeting, precise audience-led acquisition.",
    },
    rows: [
      { criterion: "Attribution maturity", a: "Improving", b: "Best-in-class (CAPI + AAM)", winner: "b" },
      { criterion: "Audience targeting depth", a: "Basic", b: "Deepest", winner: "b" },
      { criterion: "Creator content leverage", a: "Native, unmatched", b: "Growing (Reels)", winner: "a" },
      { criterion: "Gen Z / younger reach", a: "Highest", b: "Fair", winner: "a" },
      { criterion: "Retargeting", a: "Limited", b: "Strong", winner: "b" },
      { criterion: "CPMs (UK, 2026)", a: "£3–£8", b: "£8–£18", winner: "a" },
      { criterion: "Creative volume required", a: "Very high (20+ /week)", b: "High (15+ /week)", winner: "b" },
      { criterion: "Shop integration", a: "TikTok Shop", b: "Shop + catalog sales", winner: "b" },
    ],
    pros: {
      a: ["Lowest CPMs of any major channel", "Creator content compounds organically + paid", "Fastest hook-testing environment", "TikTok Shop closes the loop for Gen Z"],
      b: ["Advantage+ Shopping is the strongest DTC scaling product", "Deepest first-party + third-party targeting", "CAPI and Aggregated Attribution restore signal", "Retargeting still profitable at scale"],
    },
    cons: {
      a: ["Weak retargeting compared to Meta", "Attribution still catching up", "Creative burnout in 5–7 days"],
      b: ["Rising CPMs (+7% YoY)", "iOS signal loss even with CAPI", "Advantage+ can be a black box"],
    },
    when: {
      a: "Product with visual demonstration value, creator-led brand, or a Gen Z audience where Meta CPMs are inefficient.",
      b: "Any DTC brand focused on profitable scaling with existing brand equity and retargeting demand.",
    },
    bottomLine: (
      <>
        <p>
          The right answer for most DTC brands £250k+/year is both. Meta as the profitable scaling
          engine, TikTok as the creative and demand-generation lab — with the best-performing TikTok
          creators re-cut and served on Meta Reels for double coverage.
        </p>
      </>
    ),
    faqs: [
      { q: "Should we start with Meta or TikTok?", a: "Meta first, in almost every case. Attribution is more mature, audiences are richer, and scaling ROAS is more predictable. Layer TikTok once Meta is profitable at your target CAC." },
      { q: "Is TikTok Shop worth it?", a: "For Gen Z-focused, visual-demonstration-friendly categories (beauty, fashion, gadgets), yes. For considered purchases and premium brands, TikTok Shop still cannibalises DTC store margin." },
      { q: "How much creative do we need for TikTok?", a: "20–40 new variants per week to feed the algorithm and dodge creative fatigue. Below that, TikTok performance plateaus fast." },
    ],
    meta: {
      title: "TikTok Ads vs Meta Ads (2026) — ROAS, Reach & Creative Compared | BeingEcom",
      description: "TikTok Ads vs Meta Ads for scaling DTC brands — attribution, targeting, CPMs, creator content and the portfolio structure that beats both channels alone.",
    },
    relatedServices: [
      { label: "Performance marketing", to: "/services/performance-marketing" },
      { label: "TikTok Ads", to: "/services/performance-marketing/tiktok-ads" },
      { label: "Meta Ads", to: "/services/performance-marketing/facebook-ads" },
    ],
  },
  "headless-vs-shopify-theme": {
    slug: "headless-vs-shopify-theme",
    a: "Headless (Hydrogen)",
    b: "Shopify Theme (Liquid)",
    eyebrow: "Storefront architecture",
    h1: "Headless (Hydrogen) vs Shopify Theme (2026)",
    verdict:
      "Standard Shopify themes are the right answer for 95% of brands under £5M/year — faster to ship, cheaper to maintain, and modern themes now beat headless on TTFB with proper optimisation. Headless only wins for brands with real merchandising ceilings and in-house dev.",
    bestFor: {
      a: "£5M+ brands with in-house dev, custom merchandising, or content-heavy storefronts.",
      b: "Every brand under £5M/year, and most above who don't need custom composition.",
    },
    rows: [
      { criterion: "Time to launch", a: "12–24 weeks", b: "2–8 weeks", winner: "b" },
      { criterion: "Build cost (UK)", a: "£60k–£250k", b: "£8k–£40k", winner: "b" },
      { criterion: "Ongoing dev cost", a: "1–3 devs FTE", b: "Occasional agency", winner: "b" },
      { criterion: "Performance ceiling", a: "Highest", b: "High with discipline", winner: "a" },
      { criterion: "Design freedom", a: "Total", b: "Section + block based", winner: "a" },
      { criterion: "Access to Shopify apps", a: "Limited/custom integration", b: "Full app ecosystem", winner: "b" },
      { criterion: "Checkout access", a: "Shopify-hosted", b: "Shopify-hosted", winner: "tie" },
      { criterion: "SEO risk on migration", a: "High", b: "Low", winner: "b" },
    ],
    pros: {
      a: ["Best-in-class Core Web Vitals when done right", "Full design and composition freedom", "Superior content + commerce integration", "Bespoke merchandising unlocked"],
      b: ["Fast to ship, cheap to iterate", "Full Shopify app ecosystem works out of the box", "Modern themes hit sub-2s LCP with good ops", "Zero dev headcount required to operate"],
    },
    cons: {
      a: ["Requires 1–3 permanent devs", "Most Shopify apps need custom integration", "Migration risk (SEO, tracking, checkout)", "Total cost 5–10× a theme build"],
      b: ["Design ceiling on complex merchandising", "Section builder limits some composition needs", "Performance requires disciplined ops"],
    },
    when: {
      a: "£5M+/year brand with in-house dev, custom composition needs, or an SEO/content strategy that outgrows Liquid.",
      b: "Almost every other Shopify brand — including most Plus brands under £10M/year.",
    },
    bottomLine: (
      <>
        <p>
          Most \"we should go headless\" conversations come from agencies who bill by the sprint, not
          from brands with a real ceiling. The honest test: name three things a headless build would
          let you ship next quarter that your current theme cannot. If you can't, stay on theme.
        </p>
        <p>
          When you do move, migrate one high-value template at a time (PDP first, then PLP), never
          the whole store in one release — and expect a 60–90 day SEO recovery curve.
        </p>
      </>
    ),
    faqs: [
      { q: "Does headless make my site faster?", a: "Only if executed well. A modern Shopify theme with disciplined ops hits sub-2s LCP; a poorly built Hydrogen store can be slower. Speed is an ops discipline, not a platform choice." },
      { q: "Does headless hurt SEO?", a: "Not inherently, but migrations do. Every headless project we've reviewed loses 20–40% of organic traffic in the first 60 days without a disciplined redirect map and template-by-template rollout." },
      { q: "When is headless worth it?", a: "£5M+/year with in-house dev, custom composition needs and an SEO/content plan that outgrows Liquid. Below that, the numbers rarely justify it." },
    ],
    meta: {
      title: "Headless (Hydrogen) vs Shopify Theme (2026) — Cost, Speed, SEO | BeingEcom",
      description: "Headless Hydrogen vs Shopify Theme compared for scaling brands — real cost, ongoing dev, SEO risk, performance and the criteria that make headless worth it.",
    },
    relatedServices: [
      { label: "Shopify development", to: "/services/store-development/shopify" },
      { label: "Consulting", to: "/services/consulting" },
    ],
  },
};

export const COMPARE_INDEX = Object.values(COMPARE).map((c) => ({
  slug: c.slug,
  a: c.a,
  b: c.b,
  h1: c.h1,
  verdict: c.verdict,
}));

export function getComparison(slug: string): ComparisonEntry | undefined {
  return COMPARE[slug];
}
