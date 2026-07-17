// Config-driven ecommerce calculators. One entry per tool; each ships as a
// thin route file under src/routes/tools.* that renders <CalculatorPage>.
//
// Content is entity-first and AEO-friendly: every calculator carries a
// Quick Answer, formula, "why it matters", "how to improve", and 5+ FAQs
// so the pages double as citation-worthy reference material.

export type CalcInputType = "currency" | "percent" | "number" | "int";

export type CalcInput = {
  key: string;
  label: string;
  type: CalcInputType;
  default: number;
  min?: number;
  max?: number;
  step?: number;
  help?: string;
};

export type CalcOutputFormat = "currency" | "percent" | "multiplier" | "number" | "int";

export type CalcOutput = {
  key: string;
  label: string;
  format: CalcOutputFormat;
  value: number;
  help?: string;
  emphasis?: boolean;
  tone?: "positive" | "negative" | "neutral";
};

export type CalcConfig = {
  slug: string;
  name: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  quickAnswer: string;
  formula: string;
  formulaCode: string;
  example: string;
  inputs: CalcInput[];
  compute: (v: Record<string, number>) => CalcOutput[];
  whyItMatters: string[];
  howToImprove: string[];
  faqs: { q: string; a: string }[];
  relatedService?: { title: string; to: string };
};

// ---------- helpers ----------

const safeDiv = (a: number, b: number) => (b === 0 || !isFinite(b) ? 0 : a / b);

// ============================================================
// 1) ROAS Calculator
// ============================================================
export const roasCalc: CalcConfig = {
  slug: "roas-calculator",
  name: "ROAS Calculator",
  eyebrow: "Free Ecommerce Tool",
  h1: "ROAS Calculator",
  metaTitle: "ROAS Calculator - Return on Ad Spend for Ecommerce | BeingEcom",
  metaDescription:
    "Free ROAS calculator for Shopify and WooCommerce brands. Enter ad spend, revenue and gross margin to get ROAS, break-even ROAS and true profit - instantly.",
  quickAnswer:
    "ROAS (Return on Ad Spend) is revenue divided by ad spend. A ROAS of 4× means every £1 spent on ads returned £4 in revenue. Enter your numbers below to see your ROAS, break-even ROAS, and real profit after gross margin.",
  formula: "ROAS equals revenue from ads divided by the amount spent on those ads.",
  formulaCode: "ROAS = Revenue ÷ Ad Spend",
  example:
    "Example: £20,000 revenue from £5,000 ad spend → ROAS = 20,000 ÷ 5,000 = 4.0×. With 60% gross margin, gross profit is £12,000 and profit after ads is £7,000.",
  inputs: [
    { key: "revenue", label: "Revenue from ads", type: "currency", default: 20000, min: 0, step: 100 },
    { key: "spend", label: "Ad spend", type: "currency", default: 5000, min: 0, step: 50 },
    {
      key: "margin",
      label: "Gross margin",
      type: "percent",
      default: 60,
      min: 0,
      max: 100,
      step: 1,
      help: "Gross profit ÷ revenue. Typical DTC brands sit between 45% and 70%.",
    },
  ],
  compute: (v) => {
    const roas = safeDiv(v.revenue, v.spend);
    const marginRatio = v.margin / 100;
    const grossProfit = v.revenue * marginRatio;
    const profitAfterAds = grossProfit - v.spend;
    const breakevenRoas = marginRatio > 0 ? 1 / marginRatio : 0;
    const poas = safeDiv(profitAfterAds, v.spend);
    return [
      { key: "roas", label: "ROAS", format: "multiplier", value: roas, emphasis: true, help: "Revenue ÷ ad spend" },
      {
        key: "breakevenRoas",
        label: "Break-even ROAS",
        format: "multiplier",
        value: breakevenRoas,
        help: "Below this you lose money on gross profit alone",
      },
      {
        key: "profitAfterAds",
        label: "Profit after ads",
        format: "currency",
        value: profitAfterAds,
        emphasis: true,
        tone: profitAfterAds >= 0 ? "positive" : "negative",
        help: "Gross profit − ad spend",
      },
      { key: "poas", label: "POAS (Profit on Ad Spend)", format: "multiplier", value: poas, help: "Profit ÷ ad spend" },
    ];
  },
  whyItMatters: [
    "ROAS is the fastest way to compare campaign efficiency across Google, Meta, TikTok and Klaviyo.",
    "A 'good' ROAS is not universal - it depends entirely on your gross margin.",
    "Judging ads on ROAS alone hides losses when margin is thin or refund rates are high.",
  ],
  howToImprove: [
    "Raise AOV with bundles, thresholds for free shipping, and post-purchase upsells.",
    "Kill or cap creatives that spend heavily under break-even ROAS for 7+ days.",
    "Improve landing-page conversion - same traffic, more revenue, better ROAS.",
    "Lower CPCs with tighter audiences, negative keywords, and better creative hooks.",
    "Fix refund and cancellation leaks - they inflate revenue-based ROAS.",
  ],
  faqs: [
    {
      q: "What is a good ROAS for ecommerce?",
      a: "There is no universal number. A ROAS above your break-even ROAS (1 ÷ gross margin) is profitable. Most Shopify DTC brands aim for 3-5× on prospecting and 6-10× on retargeting, but a fashion brand at 45% margin and a supplement brand at 75% margin have very different targets.",
    },
    {
      q: "How is ROAS different from POAS?",
      a: "ROAS measures revenue per pound of ad spend. POAS (Profit on Ad Spend) measures gross profit per pound of ad spend. POAS is a better decision metric because it accounts for margin, shipping and refunds - a 4× ROAS at 25% margin is a loss, a 4× ROAS at 70% margin is very profitable.",
    },
    {
      q: "What is break-even ROAS?",
      a: "Break-even ROAS is the ROAS at which gross profit exactly equals ad spend. It equals 1 ÷ gross margin. A brand with 50% gross margin breaks even at 2× ROAS; a brand with 25% margin needs 4× just to cover the ad bill.",
    },
    {
      q: "Should I use blended or channel-level ROAS?",
      a: "Both. Channel-level ROAS (as reported in Meta Ads Manager or Google Ads) is useful for optimisation. Blended ROAS - total revenue ÷ total ad spend - is what you should judge overall growth by, because it can't be inflated by attribution overlap between platforms.",
    },
    {
      q: "Why is my Shopify revenue lower than my Meta reported ROAS?",
      a: "Meta reports view-through and click-through conversions across a 7-day window and often credits the same order as multiple platforms. Cross-check with Shopify order revenue in the same date range, or use GA4 with a data-driven attribution model, before making budget decisions.",
    },
  ],
  relatedService: { title: "Paid Ads & Performance Marketing", to: "/services/paid-ads" },
};

// ============================================================
// 2) CAC Calculator
// ============================================================
export const cacCalc: CalcConfig = {
  slug: "cac-calculator",
  name: "CAC Calculator",
  eyebrow: "Free Ecommerce Tool",
  h1: "Customer Acquisition Cost (CAC) Calculator",
  metaTitle: "CAC Calculator - Customer Acquisition Cost for Ecommerce | BeingEcom",
  metaDescription:
    "Free CAC calculator for Shopify and WooCommerce brands. Enter marketing spend, new customers and average LTV to get CAC, LTV:CAC ratio and payback signal.",
  quickAnswer:
    "CAC (Customer Acquisition Cost) is your total sales and marketing spend divided by the number of new customers acquired in the same period. It answers 'how much am I paying to win a new customer?' - the single most important efficiency metric in ecommerce.",
  formula: "CAC equals total sales and marketing spend divided by the number of new customers acquired.",
  formulaCode: "CAC = Marketing Spend ÷ New Customers",
  example:
    "Example: £12,000 marketing spend in a month, 240 new customers → CAC = £50. With an average LTV of £180, LTV:CAC = 3.6, which is a healthy ratio for a DTC brand.",
  inputs: [
    { key: "spend", label: "Total sales & marketing spend", type: "currency", default: 12000, min: 0, step: 100 },
    { key: "customers", label: "New customers acquired", type: "int", default: 240, min: 0, step: 1 },
    {
      key: "ltv",
      label: "Average customer LTV (optional)",
      type: "currency",
      default: 180,
      min: 0,
      step: 5,
      help: "Total gross profit expected from an average customer over their lifetime.",
    },
  ],
  compute: (v) => {
    const cac = safeDiv(v.spend, v.customers);
    const ratio = safeDiv(v.ltv, cac);
    const paybackHealthy = ratio >= 3;
    return [
      { key: "cac", label: "CAC", format: "currency", value: cac, emphasis: true, help: "Cost per new customer" },
      {
        key: "ratio",
        label: "LTV : CAC ratio",
        format: "multiplier",
        value: ratio,
        emphasis: true,
        tone: paybackHealthy ? "positive" : ratio >= 1 ? "neutral" : "negative",
        help: "Rule of thumb: 3.0 or higher is healthy",
      },
      {
        key: "budget",
        label: "Budget headroom per new customer",
        format: "currency",
        value: v.ltv - cac,
        help: "LTV − CAC - margin available for growth spend",
      },
    ];
  },
  whyItMatters: [
    "CAC tells you whether growth is profitable - a 3× ROAS with a rising CAC still means the business is getting worse.",
    "LTV:CAC below 1 means you lose money on every new customer; below 3 means growth is fragile.",
    "Investors and lenders benchmark ecommerce businesses on CAC and payback period, not vanity revenue.",
  ],
  howToImprove: [
    "Lift repeat-purchase rate - the fastest way to raise LTV without touching acquisition.",
    "Move budget from broad prospecting to retention (email/SMS, ads to existing customers).",
    "Invest in SEO and referral: near-zero marginal CAC once ranking and word-of-mouth compound.",
    "Improve landing-page and checkout CVR - same spend, more customers, lower CAC.",
    "Cut spend on channels where blended CAC exceeds first-order gross profit for 30+ days.",
  ],
  faqs: [
    {
      q: "What is a good CAC for ecommerce?",
      a: "There is no single number - a good CAC is any CAC where LTV divided by CAC is at least 3 and payback happens within 6-12 months. A £15 CAC on a £30 candle is fine only if the customer buys again; a £150 CAC on a £2,000 mattress is fine if margin covers it in one order.",
    },
    {
      q: "What should I include in marketing spend?",
      a: "Everything that drives acquisition: paid ads (platform spend), agency fees, influencer payments, affiliate commissions, content and SEO tooling, marketing salaries where relevant. Excluding ancillary costs makes CAC look artificially low and hides the real payback picture.",
    },
    {
      q: "What is LTV : CAC and what's a healthy ratio?",
      a: "LTV : CAC is the ratio of lifetime customer value to acquisition cost. 3:1 is the widely-used benchmark for a healthy DTC business. Above 5:1 usually means you're under-investing in growth; below 1:1 means every new customer loses money.",
    },
    {
      q: "How is CAC different from CPA?",
      a: "CPA (Cost Per Acquisition) is usually the platform-reported cost per purchase - one order, in-window, in-platform. CAC is the blended cost of acquiring one net-new customer across your entire marketing stack. CPA is a channel metric; CAC is a business metric.",
    },
    {
      q: "How often should I recalculate CAC?",
      a: "Monthly at minimum for most Shopify stores; weekly for brands scaling paid spend past £50k/month. iOS 14/17 attribution loss, Meta reporting lag and seasonality all mean single-day CAC snapshots are noisy - use rolling 28-day windows for decisions.",
    },
  ],
  relatedService: { title: "Ecommerce Analytics & Attribution", to: "/services/analytics" },
};

// ============================================================
// 3) LTV Calculator
// ============================================================
export const ltvCalc: CalcConfig = {
  slug: "ltv-calculator",
  name: "LTV Calculator",
  eyebrow: "Free Ecommerce Tool",
  h1: "Customer Lifetime Value (LTV) Calculator",
  metaTitle: "LTV Calculator - Customer Lifetime Value for Ecommerce | BeingEcom",
  metaDescription:
    "Free LTV calculator for ecommerce. Enter AOV, purchase frequency, customer lifespan and gross margin to get revenue LTV and profit LTV - the number you should really acquire against.",
  quickAnswer:
    "Customer Lifetime Value (LTV) is the total profit an average customer generates for your store across their entire relationship with your brand. It sets the ceiling on how much you can profitably spend to acquire each customer.",
  formula: "LTV equals average order value multiplied by purchase frequency, customer lifespan and gross margin.",
  formulaCode: "LTV = AOV × Orders per Year × Lifespan (years) × Gross Margin",
  example:
    "Example: AOV £65, 2.4 orders/year, 2.5-year lifespan, 55% margin → Revenue LTV = £390, Profit LTV = £214.50. That's the maximum CAC that would still break even long-term.",
  inputs: [
    { key: "aov", label: "Average order value (AOV)", type: "currency", default: 65, min: 0, step: 1 },
    { key: "freq", label: "Purchase frequency (orders/year)", type: "number", default: 2.4, min: 0, step: 0.1 },
    { key: "lifespan", label: "Customer lifespan (years)", type: "number", default: 2.5, min: 0, step: 0.1 },
    { key: "margin", label: "Gross margin", type: "percent", default: 55, min: 0, max: 100, step: 1 },
  ],
  compute: (v) => {
    const revenueLtv = v.aov * v.freq * v.lifespan;
    const profitLtv = revenueLtv * (v.margin / 100);
    return [
      { key: "revenueLtv", label: "Revenue LTV", format: "currency", value: revenueLtv, help: "AOV × orders/year × lifespan" },
      { key: "profitLtv", label: "Profit LTV", format: "currency", value: profitLtv, emphasis: true, help: "The one you acquire against" },
      { key: "annualRevenue", label: "Revenue per customer / year", format: "currency", value: v.aov * v.freq },
    ];
  },
  whyItMatters: [
    "LTV - not first-order profit - is the ceiling for a healthy CAC.",
    "Brands that lose the LTV lever compete on price and burn cash on acquisition.",
    "Small gains in repeat rate move LTV dramatically because the compounding is multiplicative.",
  ],
  howToImprove: [
    "Launch (or fix) a Klaviyo/Omnisend welcome, browse-abandon, post-purchase and winback flow set.",
    "Bundle complementary SKUs to lift AOV by 10-25% at zero extra acquisition cost.",
    "Introduce a subscription or replenishment option for consumables.",
    "Tighten the second-order window - email + SMS at day 14, 30 and 60 post-purchase.",
    "Fix product quality and CX - refunds and 1-star reviews cap lifespan hard.",
  ],
  faqs: [
    {
      q: "What is a good LTV for ecommerce?",
      a: "A good LTV is one that is at least 3× your fully-loaded CAC. For a DTC brand with £50 CAC, aim for £150+ profit LTV. Category matters - consumables (supplements, coffee, skincare) target £300-£800 LTV; considered purchases (mattresses, luxury fashion) rely on high first-order margin.",
    },
    {
      q: "Should I use revenue LTV or profit LTV?",
      a: "Use profit LTV to set your maximum acquisition cost. Revenue LTV is useful for cohort reporting, but it inflates the number you're 'allowed' to spend. Applying gross margin gives you the real ceiling on profitable CAC.",
    },
    {
      q: "How do I calculate LTV in Shopify?",
      a: "Shopify's Customers report shows repeat rate and AOV by cohort. Multiply the historical AOV by orders-per-customer-per-year and estimated lifespan (usually 1-3 years for DTC). For a live cohort view, use Lifetimely, Peel or Triple Whale, or query the Shopify Admin API directly.",
    },
    {
      q: "How is LTV different from AOV?",
      a: "AOV (Average Order Value) is the revenue from a single order. LTV is the total profit a customer generates across every order they place. AOV can be identical between two brands with wildly different LTVs - the one with better retention wins.",
    },
    {
      q: "How often should I update LTV?",
      a: "Recalculate quarterly for established brands, monthly for stores under 18 months old where cohorts are still forming. Update immediately when you launch a subscription, materially change pricing, or expand into a new category - all of these move LTV meaningfully.",
    },
  ],
  relatedService: { title: "Email & SMS Retention", to: "/services/email-sms" },
};

// ============================================================
// 4) Profit Margin Calculator
// ============================================================
export const marginCalc: CalcConfig = {
  slug: "profit-margin-calculator",
  name: "Profit Margin Calculator",
  eyebrow: "Free Ecommerce Tool",
  h1: "Profit Margin Calculator",
  metaTitle: "Profit Margin Calculator - Gross & Net Margin for Ecommerce | BeingEcom",
  metaDescription:
    "Free ecommerce profit margin calculator. Enter revenue, COGS and operating costs to get gross margin, net margin and profit per order for your Shopify or WooCommerce store.",
  quickAnswer:
    "Profit margin is the percentage of revenue you keep as profit. Gross margin is revenue minus cost of goods; net margin also subtracts operating costs (ads, staff, apps, shipping subsidies). Both matter, but net margin is what actually funds the business.",
  formula: "Gross margin = (Revenue − COGS) ÷ Revenue. Net margin = (Revenue − COGS − Operating Costs) ÷ Revenue.",
  formulaCode: "Gross Margin % = (Revenue − COGS) ÷ Revenue × 100\nNet Margin % = (Revenue − COGS − Opex) ÷ Revenue × 100",
  example:
    "Example: £50,000 revenue, £20,000 COGS, £18,000 operating costs → Gross Margin = 60%, Net Margin = 24%, Net Profit = £12,000.",
  inputs: [
    { key: "revenue", label: "Revenue", type: "currency", default: 50000, min: 0, step: 100 },
    { key: "cogs", label: "Cost of goods sold (COGS)", type: "currency", default: 20000, min: 0, step: 100 },
    {
      key: "opex",
      label: "Operating costs (optional)",
      type: "currency",
      default: 18000,
      min: 0,
      step: 100,
      help: "Ads, staff, apps, fulfilment, shipping subsidies, refunds, payment fees.",
    },
  ],
  compute: (v) => {
    const grossProfit = v.revenue - v.cogs;
    const netProfit = grossProfit - v.opex;
    const grossMargin = safeDiv(grossProfit, v.revenue) * 100;
    const netMargin = safeDiv(netProfit, v.revenue) * 100;
    return [
      { key: "grossProfit", label: "Gross profit", format: "currency", value: grossProfit, help: "Revenue − COGS" },
      { key: "grossMargin", label: "Gross margin", format: "percent", value: grossMargin, emphasis: true },
      { key: "netProfit", label: "Net profit", format: "currency", value: netProfit, emphasis: true, tone: netProfit >= 0 ? "positive" : "negative" },
      { key: "netMargin", label: "Net margin", format: "percent", value: netMargin, tone: netMargin >= 0 ? "positive" : "negative" },
    ];
  },
  whyItMatters: [
    "Gross margin sets the ceiling on how much you can spend on marketing and still be profitable.",
    "Two brands with identical revenue and different margins have completely different valuations.",
    "Margin discipline - not top-line growth - is what separates fundable ecommerce brands from cash-flow disasters.",
  ],
  howToImprove: [
    "Renegotiate supplier and fulfilment contracts once you clear £250k/year - most SMEs overpay.",
    "Cut the SKU tail: 20% of SKUs usually generate 80% of profit; the rest tie up cash and space.",
    "Reprice: a 5% price rise on inelastic products can double net margin - test it, don't guess.",
    "Reduce refund and return rate - sizing, product-page clarity and QC changes pay back fast.",
    "Move slow-moving inventory before it becomes dead stock and a write-off.",
  ],
  faqs: [
    {
      q: "What is a good profit margin for ecommerce?",
      a: "For DTC brands, aim for 60%+ gross margin and 10-20% net margin. Below 50% gross margin, paid acquisition becomes almost impossible to make profitable at scale. Below 5% net margin, you're one bad month away from cash-flow trouble.",
    },
    {
      q: "Is gross margin or net margin more important?",
      a: "Both. Gross margin decides whether the unit economics work - if it's too low, no marketing efficiency will save the business. Net margin decides whether the whole business works - you can have great unit economics and still lose money if opex is bloated.",
    },
    {
      q: "What counts as COGS in ecommerce?",
      a: "The direct cost to produce or acquire the product you sold: manufacturing/wholesale cost, inbound freight, direct packaging, per-unit fulfilment. Marketing, staff, apps and rent are operating costs, not COGS - mixing them makes gross margin unreliable.",
    },
    {
      q: "How do payment processing fees affect margin?",
      a: "Stripe, Shopify Payments and PayPal typically take 1.4-2.9% + a fixed fee per transaction. On a £30 AOV brand this can be 3-4% of revenue - a meaningful hit to gross margin. Model it into unit economics; don't leave it in 'other'.",
    },
    {
      q: "How is markup different from margin?",
      a: "Markup is profit divided by cost. Margin is profit divided by revenue. A £10 product marked up 100% sells for £20 - that's a 50% margin, not 100%. Confusing the two is one of the most common Shopify pricing mistakes.",
    },
  ],
  relatedService: { title: "Store Development & Optimisation", to: "/services/store-development" },
};

// ============================================================
// 5) Break-even Calculator
// ============================================================
export const breakevenCalc: CalcConfig = {
  slug: "break-even-calculator",
  name: "Break-even Calculator",
  eyebrow: "Free Ecommerce Tool",
  h1: "Break-even Calculator",
  metaTitle: "Break-even Calculator - Ecommerce Break-even Point | BeingEcom",
  metaDescription:
    "Free break-even calculator for ecommerce. Enter fixed costs, price and variable cost per unit to get contribution margin, break-even units and break-even revenue.",
  quickAnswer:
    "Break-even is the point at which total revenue equals total costs - the volume you need to sell to stop losing money. It answers 'how many units must I sell each month before I make a penny of profit?'",
  formula:
    "Break-even units = Fixed Costs ÷ (Price − Variable Cost per Unit). Break-even revenue = Break-even units × Price.",
  formulaCode:
    "Contribution Margin = Price − Variable Cost per Unit\nBreak-even Units = Fixed Costs ÷ Contribution Margin\nBreak-even Revenue = Break-even Units × Price",
  example:
    "Example: £8,000 fixed costs, £40 price, £16 variable cost per unit → Contribution margin = £24, Break-even = 334 units, Break-even revenue = £13,360.",
  inputs: [
    { key: "fixed", label: "Monthly fixed costs", type: "currency", default: 8000, min: 0, step: 100 },
    { key: "price", label: "Price per unit", type: "currency", default: 40, min: 0, step: 1 },
    {
      key: "variable",
      label: "Variable cost per unit",
      type: "currency",
      default: 16,
      min: 0,
      step: 1,
      help: "COGS + fulfilment + per-order shipping + payment fees.",
    },
  ],
  compute: (v) => {
    const contribution = v.price - v.variable;
    const contributionPct = safeDiv(contribution, v.price) * 100;
    const units = contribution > 0 ? v.fixed / contribution : 0;
    const revenue = units * v.price;
    return [
      {
        key: "contribution",
        label: "Contribution margin per unit",
        format: "currency",
        value: contribution,
        tone: contribution > 0 ? "positive" : "negative",
        help: "Every unit sold contributes this much toward fixed costs",
      },
      { key: "contributionPct", label: "Contribution margin %", format: "percent", value: contributionPct },
      {
        key: "units",
        label: "Break-even units / month",
        format: "int",
        value: Math.ceil(units),
        emphasis: true,
        help: "Ceiling'd so partial orders don't hide the true target",
      },
      { key: "revenue", label: "Break-even revenue / month", format: "currency", value: revenue, emphasis: true },
    ];
  },
  whyItMatters: [
    "Break-even is the sanity check every ecommerce founder should redo whenever costs, pricing or ad rates change.",
    "It exposes whether a growth plan is realistic - 'sell 2,000 units a month' is very different from 'sell 20,000'.",
    "Break-even reveals dangerous SKUs: if a product's contribution margin is negative, selling more makes losses worse.",
  ],
  howToImprove: [
    "Raise price if the market allows - even small increases move break-even sharply.",
    "Reduce variable cost per unit: better fulfilment rates, cheaper packaging, negotiated payment fees.",
    "Cut fixed costs by consolidating apps and rationalising staff/agency retainers.",
    "Improve mix - sell more high-contribution SKUs, deprioritise loss leaders.",
    "Bundle products to lift AOV without proportionally raising variable cost.",
  ],
  faqs: [
    {
      q: "What is the break-even point in ecommerce?",
      a: "The break-even point is the number of units - or the revenue level - at which your total revenue covers total costs and profit is exactly zero. Below it you lose money; above it every additional unit contributes profit at the contribution-margin rate.",
    },
    {
      q: "Should I include ad spend as fixed or variable cost?",
      a: "It depends on how you buy media. Fixed monthly budgets (retainers, always-on brand campaigns) belong in fixed costs. Performance budgets scaled per order - tROAS or CPA-capped campaigns - behave like variable costs and should be included in variable cost per unit for a realistic break-even.",
    },
    {
      q: "How is break-even different from break-even ROAS?",
      a: "Break-even (this calculator) is a business-level threshold - enough revenue to cover all costs. Break-even ROAS is an ad-account threshold - the ROAS at which gross profit equals ad spend. Both matter; the former protects the business, the latter protects the ad account.",
    },
    {
      q: "What if my contribution margin is negative?",
      a: "You have a structural problem: every unit sold makes losses worse. You cannot outgrow negative contribution margin - raise price, cut variable cost, or discontinue the SKU before scaling anything else.",
    },
    {
      q: "How often should I recalculate break-even?",
      a: "Every time a major cost line moves: supplier price change, fulfilment renegotiation, big app or headcount decision, new market launch. At minimum, revisit quarterly - ecommerce cost bases drift, and stale break-even numbers lead to confidently wrong growth plans.",
    },
  ],
  relatedService: { title: "Pricing, Scope & Engagement Models", to: "/pricing" },
};

// ============================================================
// Registry
// ============================================================
export const CALCULATORS: readonly CalcConfig[] = [
  roasCalc,
  cacCalc,
  ltvCalc,
  marginCalc,
  breakevenCalc,
] as const;

export function calcBySlug(slug: string): CalcConfig | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}

// ---------- formatting helpers used by the UI ----------

export function formatCalcValue(value: number, format: CalcOutputFormat): string {
  if (!isFinite(value) || isNaN(value)) return "-";
  switch (format) {
    case "currency":
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: Math.abs(value) >= 100 ? 0 : 2,
      }).format(value);
    case "percent":
      return `${value.toFixed(1)}%`;
    case "multiplier":
      return `${value.toFixed(2)}×`;
    case "int":
      return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(value);
    case "number":
    default:
      return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(value);
  }
}
