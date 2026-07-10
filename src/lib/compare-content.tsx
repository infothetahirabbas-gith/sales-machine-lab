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
