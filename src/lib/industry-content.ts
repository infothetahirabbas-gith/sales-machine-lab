// Rich per-industry content for /industries/$slug and its sub-pages.
// Every Unsplash ID here is checked at prebuild by scripts/check-location-images.mjs.

export const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type IndustryContent = {
  hero: string;              // one-line hero tagline
  vibe: string;              // 1–2 sentence positioning
  images: {
    hero: string;
    buyers: string;
    creative: string;
    funnel: string;
    caseStudy: string;
    process: string;
    tech: string;
  };
  categories: { name: string; body: string }[];   // 4–6 sub-verticals
  buyerPsychology: { title: string; body: string }[]; // 3–4
  painPoints: { title: string; body: string }[]; // 4
  creativeAngles: string[];                       // 6–8
  seasonalMoments: { month: string; play: string }[]; // 4–6
  kpiTargets: { label: string; value: string; note: string }[]; // 4
  caseStudy: {
    brand: string;
    headline: string;
    fromRev: string;
    toRev: string;
    growthPct: number;
    roas: number;
    months: number;
  };
  testimonial: { name: string; role: string; quote: string };
  offers: string[]; // 3 offer angles that work in this vertical
  faqs: { q: string; a: string }[]; // 6
};

// ── shared visual pools (all IDs verified in home-images/location-content) ──
const COMMON = {
  creative: u("photo-1558655146-9f40138edfeb"),
  funnel: u("photo-1460925895917-afdab827c52f"),
  process: u("photo-1454165804606-c3d57bc86b40"),
  tech: u("photo-1543286386-713bdd548da4"),
  caseStudy: u("photo-1483985988355-763728e1935b"),
};

// per-industry hero + secondary imagery (verified IDs from existing pool)
const IMG: Record<string, { hero: string; buyers: string }> = {
  "fashion-apparel":        { hero: u("photo-1490578474895-699cd4e2cf59"), buyers: u("photo-1483985988355-763728e1935b") },
  "beauty-personal-care":   { hero: u("photo-1522337360788-8b13dee7a37e", 1600) || u("photo-1494790108377-be9c29b29330"), buyers: u("photo-1522337660859-02fbefca4702", 1600) || u("photo-1487412720507-e7ab37603c6f") },
  "electronics-technology": { hero: u("photo-1518770660439-4636190af475"), buyers: u("photo-1516035069371-29a1b244cc32") },
  "home-garden":            { hero: u("photo-1493663284031-b7e3aefcae8e", 1600) || u("photo-1449034446853-66c86144b0ad"), buyers: u("photo-1519710164239-da123dc03ef4", 1600) || u("photo-1470309864661-68328b2cd0a5") },
  "food-beverage":          { hero: u("photo-1504674900247-0877df9cc836", 1600) || u("photo-1481437156560-3205f6a55735"), buyers: u("photo-1414235077428-338989a2e8c0", 1600) || u("photo-1504384308090-c894fdcc538d") },
  "health-wellness":        { hero: u("photo-1490645935967-10de6ba17061", 1600) || u("photo-1502786129293-79981df4e689"), buyers: u("photo-1512621776951-a57141f2eefd", 1600) || u("photo-1499750310107-5fef28a66643") },
  "sports-fitness":         { hero: u("photo-1517836357463-d25dfeac3438", 1600) || u("photo-1517245386807-bb43f82c33c4"), buyers: u("photo-1517245386807-bb43f82c33c4", 1600) || u("photo-1502378735452-bc7d86632805") },
  "furniture-interiors":    { hero: u("photo-1555041469-a586c61ea9bc", 1600) || u("photo-1449034446853-66c86144b0ad"), buyers: u("photo-1493663284031-b7e3aefcae8e", 1600) || u("photo-1519389950473-47ba0277781c") },
  "baby-kids":              { hero: u("photo-1519689680058-324335c77eba", 1600) || u("photo-1519389950473-47ba0277781c"), buyers: u("photo-1476703993599-0035a21b17a9", 1600) || u("photo-1503428593586-e225b39bddfe") },
  "jewellery-watches":      { hero: u("photo-1515562141207-7a88fb7ce338", 1600) || u("photo-1493612276216-ee3925520721"), buyers: u("photo-1523275335684-37898b6baf30", 1600) || u("photo-1493612276216-ee3925520721") },
  "pets-supplies":          { hero: u("photo-1450778869180-41d0601e046e", 1600) || u("photo-1518020382113-a7e8fc38eac9"), buyers: u("photo-1548199973-03cce0bbc87b", 1600) || u("photo-1583337130417-3346a1be7dee") },
  "arts-prints-stationery": { hero: u("photo-1513116476489-7635e79feb27", 1600) || u("photo-1500462918059-b1a0cb512f1d"), buyers: u("photo-1499336315816-097655dcfbda", 1600) || u("photo-1518791841217-8f162f1e1131") },
};

const SEASONS_UK: { month: string; play: string }[] = [
  { month: "Jan", play: "Post-holiday retention push — winback flows + loyalty relaunch" },
  { month: "Mar", play: "Mother's Day + Spring collection creative sprint" },
  { month: "May", play: "Bank holiday promo windows + testing new hooks" },
  { month: "Aug", play: "Back-to-life / autumn drop teasers, list building" },
  { month: "Oct", play: "Black Friday warm-up: creative library + audiences ready" },
  { month: "Nov", play: "BFCM live: hourly bid ops, hero creatives, VIP early access" },
];

const KPI_DEFAULT = [
  { label: "Blended ROAS lift", value: "+62%", note: "avg 90 days in" },
  { label: "CAC reduction",     value: "-31%", note: "vs. pre-engagement" },
  { label: "Email revenue %",   value: "38%",  note: "of total store revenue" },
  { label: "Time to first win", value: "17 days", note: "from kickoff" },
];

const FAQ_BASE = (name: string) => [
  { q: `Do you specialise in ${name.toLowerCase()} brands?`, a: `Yes. We ring-fence a senior pod that only works on ${name.toLowerCase()} accounts, so creative, media and CRO are all tuned to how your customers actually shop.` },
  { q: `How fast can we see results?`, a: `Most ${name.toLowerCase()} clients see meaningful ROAS lift within 30–60 days as tracking, creative and offers are rebuilt. Compound gains land months 3–6.` },
  { q: `What size of ${name.toLowerCase()} brand do you work with?`, a: `We're a fit from £30k/month revenue up to £3M/month. Below that we recommend our free growth audit and DIY playbooks first.` },
  { q: `Which platforms do you run?`, a: `Shopify & Shopify Plus by default, WooCommerce migrations when needed, plus Meta, Google, TikTok, Klaviyo, GA4 and Triple Whale.` },
  { q: `Do you provide creative production?`, a: `Yes — in-house UGC, studio product photography and motion graphics. No waiting on external agencies to ship new ad variants.` },
  { q: `What does pricing look like?`, a: `Transparent retainers from £2,500/month for single-channel work up to £10k+/month for full growth-engine engagements. See the /pricing page for detail.` },
];

// ── per-industry content ──
export const INDUSTRY_CONTENT: Record<string, IndustryContent> = {
  "fashion-apparel": {
    hero: "Scale UK fashion & apparel without discounting your brand into the floor.",
    vibe: "Fashion buyers decide in seconds and return 30–40% of what they buy. Winning requires ruthless creative velocity, PDP CRO and a retention engine that lifts LTV — not perpetual sales.",
    images: { hero: IMG["fashion-apparel"].hero, buyers: IMG["fashion-apparel"].buyers, ...COMMON },
    categories: [
      { name: "Women's Fashion",       body: "Contemporary, occasion and everyday collections scaling on Meta + Pinterest." },
      { name: "Men's Fashion",         body: "Considered basics, tailoring and premium streetwear with strong AOV." },
      { name: "Streetwear & Sportswear", body: "Drop-driven brands using TikTok, waitlists and hype-loop launches." },
      { name: "Luxury Fashion",        body: "High-consideration paid growth with polished creative and Google brand defence." },
      { name: "Footwear & Accessories", body: "Cross-sell engines, Google Shopping and lifecycle sizing flows." },
      { name: "Kids & Modest Fashion",  body: "Community-led paid social and lifecycle marketing tuned to purchase cycles." },
    ],
    buyerPsychology: [
      { title: "Fit anxiety is #1 blocker", body: "Size charts, model-on-me imagery and video try-on lift PDP conversion 15–25%." },
      { title: "Discovery = social proof",  body: "UGC + reviews decide the click; static product shots alone under-perform." },
      { title: "Returns fear kills AOV",    body: "Free-return + size-guarantee messaging in-checkout adds 6–10% AOV." },
    ],
    painPoints: [
      { title: "Creative burnout in 7 days",       body: "We ship 3 UGC batches a week so ad fatigue never breaks scale." },
      { title: "Discounting-addicted CAC",         body: "Rebuild offers around bundles and gifting — margin comes back." },
      { title: "PDPs designed like catalogues",     body: "Rewire PDPs around fit, social proof, and next-day-delivery reassurance." },
      { title: "Klaviyo left on defaults",         body: "Segmented flows by size, category and repeat behaviour — 30%+ email rev share." },
    ],
    creativeAngles: [
      "Founder POV drop teasers",
      "TikTok-native fit checks",
      "UGC 'get ready with me' hooks",
      "Editorial motion sizzle for premium tiers",
      "Before/after styling reels",
      "Waitlist + urgency drops",
      "Ambassador collab UGC",
      "Care & longevity story ads",
    ],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: "Manchester streetwear label", headline: "£58k → £340k monthly across Meta + TikTok in 6 months", fromRev: "£58k", toRev: "£340k", growthPct: 486, roas: 4.2, months: 6 },
    testimonial: { name: "Sara J.", role: "Founder, women's occasion brand", quote: "Ad fatigue used to break us in a week. Now we get three UGC batches a week and ROAS holds through the drop." },
    offers: ["Bundle & save (2-for / 3-for AOV lifts)", "Free shipping threshold tied to AOV target", "First-order gift with purchase for new-customer CAC"],
    faqs: FAQ_BASE("Fashion & Apparel"),
  },

  "beauty-personal-care": {
    hero: "Beauty growth that survives ASA, iOS 17 and rising CPMs.",
    vibe: "Beauty is won on repeat rate. We rebuild the full funnel around review velocity, subscription, and creative built for how UK shoppers actually browse.",
    images: { hero: IMG["beauty-personal-care"].hero, buyers: IMG["beauty-personal-care"].buyers, ...COMMON },
    categories: [
      { name: "Skincare",     body: "Routine-led PDPs, before/after UGC, ingredient education." },
      { name: "Haircare",     body: "Concern-based funnels (frizz, damage, growth) with quiz-led CRO." },
      { name: "Makeup",       body: "Shade-match tooling, TikTok Shop, creator-led launches." },
      { name: "Men's Grooming", body: "Subscription-first, retention-heavy media buying." },
      { name: "Fragrance",     body: "Sampling programmes + storytelling for consideration lift." },
    ],
    buyerPsychology: [
      { title: "Reviews > everything",    body: "Under 200 reviews = under-performing PDP. We plug in review-gen flows day one." },
      { title: "Routine framing sells",   body: "AM/PM routine PDPs outperform single-hero SKUs on new customer AOV." },
      { title: "Compliance eats claims",  body: "ASA-safe creative that still converts — we own the rewrite process." },
    ],
    painPoints: [
      { title: "Meta rejections stalling scale", body: "Compliant creative library shipped weekly." },
      { title: "No subscription lever",         body: "Rebuild recurring flows and win-back to lift LTV 40–60%." },
      { title: "Klaviyo flows generic",         body: "Segment by routine step, skin type and category." },
      { title: "Google Shopping starved",       body: "Feed and structure for beauty verticals — high-intent volume unlocked." },
    ],
    creativeAngles: [
      "Founder-story origin ads",
      "Ingredient deep-dives",
      "Before/after routine reels",
      "TikTok POV skincare rituals",
      "Dermatologist / expert POV",
      "UGC review compilations",
      "Bundle unboxings",
      "Sampling / try-before-you-commit",
    ],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: "London skincare brand", headline: "£68k → £412k monthly in 8 months", fromRev: "£68k", toRev: "£412k", growthPct: 506, roas: 4.6, months: 8 },
    testimonial: { name: "Amelia H.", role: "Founder, Shoreditch skincare", quote: "Compliant, converting creative shipped weekly. Meta ROAS jumped 1.9 → 4.3 in 90 days." },
    offers: ["Free sample with first order", "Routine bundle at 15% off (raises AOV)", "Subscribe & save with cancel-anytime"],
    faqs: FAQ_BASE("Beauty & Personal Care"),
  },

  "electronics-technology": {
    hero: "Sell higher-consideration tech without burning margin on brand-defence Google.",
    vibe: "Electronics buyers research hard. We build the PDP, review, comparison and remarketing infrastructure that converts research into orders.",
    images: { hero: IMG["electronics-technology"].hero, buyers: IMG["electronics-technology"].buyers, ...COMMON },
    categories: [
      { name: "Consumer Electronics",  body: "Hero-SKU launches with Meta + Google Shopping." },
      { name: "Audio & Wearables",     body: "Creator-led launches, TikTok demo content." },
      { name: "Mobile & Computer Accessories", body: "High-velocity Shopping campaigns + PDP CRO." },
      { name: "Gaming & Smart Home",   body: "Community-led launches and pre-order funnels." },
    ],
    buyerPsychology: [
      { title: "Comparison shopping is default", body: "PDPs must beat Amazon reviews in trust density." },
      { title: "Video demo > static",           body: "60-second demo reels lift ATC 20%+ on Meta." },
      { title: "Spec anxiety",                  body: "Clear feature tables + 'is this right for me' calculators." },
    ],
    painPoints: [
      { title: "Google spend on own brand",  body: "Rebuild Search hierarchy: capture non-brand intent." },
      { title: "Weak review UGC",            body: "Post-purchase flows and creator seeding fix the trust gap." },
      { title: "Shopping feed neglected",    body: "Feed optimisation + custom labels = 30–50% Shopping lift." },
      { title: "Retargeting stuck",          body: "MOF flows built around 'consideration' content, not offers." },
    ],
    creativeAngles: [
      "Unboxing / first-30-seconds",
      "Feature spotlight demos",
      "Creator vs. competitor comparisons",
      "Real-life use-case skits",
      "Setup / how-easy content",
      "Reviewer roundups",
      "Bundle / accessory upsell",
      "Warranty + support reassurance",
    ],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: "UK audio brand", headline: "£110k → £520k monthly in 9 months, ROAS 4.1x", fromRev: "£110k", toRev: "£520k", growthPct: 373, roas: 4.1, months: 9 },
    testimonial: { name: "Daniel R.", role: "Founder, wearables startup", quote: "They rebuilt our Google Shopping account in three weeks. Non-brand Search finally became a profit centre." },
    offers: ["30-day money-back trial", "Free accessory bundle with hero SKU", "0% finance via Klarna to raise AOV"],
    faqs: FAQ_BASE("Electronics & Technology"),
  },

  "home-garden": {
    hero: "Higher-AOV home & garden growth using Shopping, Pinterest and premium CRO.",
    vibe: "Home is a considered purchase built on inspiration. We connect Pinterest + Google discovery to Shopify PDPs designed to convert big baskets.",
    images: { hero: IMG["home-garden"].hero, buyers: IMG["home-garden"].buyers, ...COMMON },
    categories: [
      { name: "Homeware & Décor",  body: "Pinterest-led inspiration to conversion funnels." },
      { name: "Kitchen & Dining",  body: "Gifting angles + bundle CRO." },
      { name: "Garden & Outdoor",  body: "Seasonal ramp planning and Shopping saturation." },
      { name: "DIY & Improvement", body: "Long-tail SEO + how-to content engine." },
    ],
    buyerPsychology: [
      { title: "Inspiration first, brand second", body: "Pinterest + lifestyle-shot PDPs drive discovery." },
      { title: "Room-context matters",           body: "Product-in-room imagery lifts ATC on Meta." },
      { title: "Basket-size lever",              body: "Bundle + free-shipping-threshold routinely add 10–15% AOV." },
    ],
    painPoints: [
      { title: "Weak Shopping account structure", body: "Feed + hierarchy rebuild." },
      { title: "Ignoring Pinterest",              body: "Massive missed distribution for home verticals." },
      { title: "PDPs feel like SKUs",             body: "Rebuild around rooms, styles and use." },
      { title: "No seasonal ramp",                body: "Q2 garden / Q4 gifting demand plans." },
    ],
    creativeAngles: [
      "Room styling reveals",
      "Before/after room transforms",
      "Founder styling POV",
      "Gift-guide compilations",
      "'How I use it' UGC",
      "Product-in-hand demos",
      "Small-space hacks",
      "Sustainability / materials",
    ],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: "UK homeware brand", headline: "£42k → £280k monthly in 7 months", fromRev: "£42k", toRev: "£280k", growthPct: 566, roas: 4.4, months: 7 },
    testimonial: { name: "Isla M.", role: "Founder, home décor", quote: "Google Shopping went from an afterthought to our biggest channel in eight weeks." },
    offers: ["Free UK delivery over £75", "Bundle any 3, save 15%", "Trade / interior-designer pricing tier"],
    faqs: FAQ_BASE("Home & Garden"),
  },

  "food-beverage": {
    hero: "DTC food & drink growth built around subscription, not one-off orders.",
    vibe: "Food is a habit business. We build retention systems, subscription CRO and creative that turns first-order buyers into 6+ month subscribers.",
    images: { hero: IMG["food-beverage"].hero, buyers: IMG["food-beverage"].buyers, ...COMMON },
    categories: [
      { name: "Coffee & Tea",       body: "Subscription-first funnels + taste-guide onboarding." },
      { name: "Health / Organic",   body: "Compliant claims + goal-based funnels." },
      { name: "Subscription Meal Kits", body: "First-box CAC + churn management." },
      { name: "Wine & Spirits",     body: "Age-gated funnels + gifting angles." },
    ],
    buyerPsychology: [
      { title: "First order = trial", body: "Subscription-first offers convert 2x better than one-off SKUs." },
      { title: "Habit-loop matters",  body: "First 30 days decide LTV — we build onboarding flows around that." },
      { title: "Taste anxiety",       body: "Sampler packs + guarantees drive first-purchase conversion." },
    ],
    painPoints: [
      { title: "Churn is invisible",    body: "Recharge + Klaviyo integration exposes and fixes churn." },
      { title: "First-box CAC too high", body: "Rebuild landing pages around subscription value, not SKU price." },
      { title: "Compliance blocks ads",  body: "Compliant claim library + ASA-safe creative." },
      { title: "No referral engine",    body: "Referral + gifting programmes lift LTV 20%+." },
    ],
    creativeAngles: [
      "First-brew / first-pour UGC",
      "Behind-the-supply-chain",
      "Founder taste tests",
      "Subscription unboxing rituals",
      "Recipe / pairing content",
      "Gifting stories",
      "Health / benefit reels",
      "Referral / community",
    ],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: "UK specialty coffee", headline: "£38k → £215k monthly, 62% subs share", fromRev: "£38k", toRev: "£215k", growthPct: 465, roas: 3.8, months: 8 },
    testimonial: { name: "Ollie K.", role: "Founder, DTC coffee", quote: "They rebuilt our subscription funnel and 6-month LTV jumped 40%. Meta finally scales without pain." },
    offers: ["First subscription box 40% off, cancel anytime", "Free brewing gear with 3-month plan", "Gift-a-friend referral credit"],
    faqs: FAQ_BASE("Food & Beverage"),
  },

  "health-wellness": {
    hero: "Compliant, subscription-first growth for UK health & wellness brands.",
    vibe: "MHRA + ASA rules make health growth a minefield. We ship compliant creative weekly, run subscription-first funnels, and treat LTV as the KPI.",
    images: { hero: IMG["health-wellness"].hero, buyers: IMG["health-wellness"].buyers, ...COMMON },
    categories: [
      { name: "Vitamins & Supplements", body: "Goal-based funnels + subscription CRO." },
      { name: "Sports Nutrition",       body: "Community-led paid social + creator UGC." },
      { name: "CBD & Wellness",         body: "Compliant Meta + Google workarounds, whitelisted domains." },
      { name: "Functional Foods",       body: "Habit-loop onboarding and sampler-first offers." },
    ],
    buyerPsychology: [
      { title: "Proof beats claims",   body: "3rd-party studies + creator testimonials outperform brand claims." },
      { title: "Ritual-driven",        body: "Daily/weekly rituals lift subscription conversion." },
      { title: "Trust density",        body: "Certifications, lab tests and reviews are non-negotiable on PDP." },
    ],
    painPoints: [
      { title: "Meta account bans",    body: "Compliance-first creative + backup ad accounts strategy." },
      { title: "Under-priced LTV",     body: "Subscription + bundle CRO to lift 90-day LTV." },
      { title: "Weak reviews",         body: "Post-purchase review generation and UGC seeding." },
      { title: "No lifecycle flows",   body: "Klaviyo journeys tuned to consumption cycles." },
    ],
    creativeAngles: [
      "Daily-ritual routines",
      "Expert / GP POV",
      "Before / after journey UGC",
      "Ingredient breakdowns",
      "Compliant benefit hooks",
      "Founder mission stories",
      "Community transformation reels",
      "Subscription convenience angle",
    ],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: "UK supplement brand", headline: "£82k → £460k monthly, LTV +48%", fromRev: "£82k", toRev: "£460k", growthPct: 461, roas: 3.9, months: 9 },
    testimonial: { name: "Nadia P.", role: "Founder, wellness DTC", quote: "Compliant creative shipped weekly, subscription share doubled, and Meta account is finally stable." },
    offers: ["Subscribe & save 20% with skip-anytime", "First-month sampler at cost", "Bundle stack for 90-day results"],
    faqs: FAQ_BASE("Health & Wellness"),
  },

  "sports-fitness": {
    hero: "Community-led sports & fitness scaling built on UGC velocity and lifecycle.",
    vibe: "Sports brands live and die on community. We ship athlete UGC weekly, run TikTok-native creative, and build retention flows around training cycles.",
    images: { hero: IMG["sports-fitness"].hero, buyers: IMG["sports-fitness"].buyers, ...COMMON },
    categories: [
      { name: "Fitness Equipment",  body: "High-AOV funnels + finance options." },
      { name: "Activewear",         body: "Fit + fabric-story creative, PDP CRO." },
      { name: "Running & Cycling",  body: "Community-led launches, event marketing." },
      { name: "Yoga & Outdoor",     body: "Lifestyle-led paid social + Pinterest." },
    ],
    buyerPsychology: [
      { title: "Community proof",     body: "Athlete UGC and community reviews outperform brand content." },
      { title: "Fit anxiety",         body: "Video try-on and detailed sizing reduce returns." },
      { title: "Progress motivation", body: "Content around training progression fuels repeat purchase." },
    ],
    painPoints: [
      { title: "No athlete UGC pipeline", body: "Creator seeding + monthly content packs." },
      { title: "TikTok neglected",        body: "TikTok Shop + creator-affiliate strategy." },
      { title: "PDP feels catalogue",     body: "Rebuild around activity, fit and fabric story." },
      { title: "Weak retention",          body: "Lifecycle flows tied to training cycles." },
    ],
    creativeAngles: [
      "Athlete POV workouts",
      "Fit / try-on reels",
      "Fabric tech deep-dives",
      "Training progression stories",
      "Community challenge UGC",
      "Founder POV brand ethos",
      "Race-day / event content",
      "Recovery / wellness angles",
    ],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: "UK activewear label", headline: "£46k → £310k monthly, ROAS 4.5x", fromRev: "£46k", toRev: "£310k", growthPct: 574, roas: 4.5, months: 7 },
    testimonial: { name: "Ryan D.", role: "Founder, running brand", quote: "TikTok became our #2 channel in 60 days. Community-led creative just works." },
    offers: ["Free returns + fit guarantee", "Bundle sets for training kit", "Loyalty tier for repeat buyers"],
    faqs: FAQ_BASE("Sports & Fitness"),
  },

  "furniture-interiors": {
    hero: "High-AOV furniture growth without discounting the brand.",
    vibe: "Furniture is a considered, high-basket purchase. We invest in premium PDP CRO, Pinterest / Google discovery and 0% finance to unlock scale.",
    images: { hero: IMG["furniture-interiors"].hero, buyers: IMG["furniture-interiors"].buyers, ...COMMON },
    categories: [
      { name: "Living & Bedroom",  body: "Room-context PDPs, Pinterest discovery." },
      { name: "Office Furniture",  body: "B2B + B2C funnels, remote-work angles." },
      { name: "Outdoor Furniture", body: "Seasonal ramp Q1-Q2, weather-triggered creative." },
      { name: "Soft Furnishings",  body: "Bundle CRO + swatch programmes." },
    ],
    buyerPsychology: [
      { title: "Long consideration",   body: "Retargeting + email nurture is the difference between browse and buy." },
      { title: "Room context sells",   body: "Product-in-room imagery > studio-only shots." },
      { title: "Finance unlocks size", body: "Klarna / 0% finance materially widens the buying audience." },
    ],
    painPoints: [
      { title: "Retargeting stops at 7 days", body: "60-day nurture flows for high-AOV." },
      { title: "No finance offering",         body: "Add Klarna/PayPal Pay in 3 with clear PDP messaging." },
      { title: "Weak lifestyle imagery",       body: "Shoot day + monthly refresh." },
      { title: "No swatch/sample flow",         body: "Sample-first funnel cuts return anxiety." },
    ],
    creativeAngles: [
      "Room reveals + styling",
      "Founder POV design story",
      "Delivery / white-glove UGC",
      "Space transformation reels",
      "Material / craftsmanship",
      "Finance-friendly hook",
      "Interior-designer collabs",
      "Sustainability + longevity",
    ],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: "UK furniture brand", headline: "£120k → £540k monthly, AOV +38%", fromRev: "£120k", toRev: "£540k", growthPct: 350, roas: 3.6, months: 10 },
    testimonial: { name: "Chris L.", role: "Founder, furniture DTC", quote: "0% finance + a rebuilt PDP added 38% to AOV. Meta finally scales at healthy CPMs." },
    offers: ["0% finance with Klarna", "Free swatch pack + £10 credit", "White-glove delivery included over £500"],
    faqs: FAQ_BASE("Furniture & Interiors"),
  },

  "baby-kids": {
    hero: "Trust-led baby & kids growth tuned to parent buying cycles.",
    vibe: "Parents buy on trust, safety and reviews. We build the review engine, community UGC and lifecycle flows that turn one purchase into three years of AOV.",
    images: { hero: IMG["baby-kids"].hero, buyers: IMG["baby-kids"].buyers, ...COMMON },
    categories: [
      { name: "Baby Clothing & Gear", body: "Gift-first funnels + parent-community UGC." },
      { name: "Kids Fashion",         body: "Size-progression flows, back-to-school ramps." },
      { name: "Toys & Educational",   body: "Age-based funnels + gifting angles." },
      { name: "Maternity",            body: "Trimester-based lifecycle, community content." },
    ],
    buyerPsychology: [
      { title: "Safety + trust are gates", body: "Certifications and reviews on PDP are non-negotiable." },
      { title: "Gifting is huge",          body: "Grandparents + friends are secondary buyers to convert." },
      { title: "Community sells",          body: "Parent-to-parent UGC beats brand copy." },
    ],
    painPoints: [
      { title: "No age-based segmentation", body: "Klaviyo segmented by child age powers lifecycle scale." },
      { title: "Weak gifting funnel",       body: "Add gift-mode CRO + gift-card upsell." },
      { title: "Under-invested reviews",    body: "Post-purchase review + photo-review flows." },
      { title: "Seasonal blind spots",       body: "Back-to-school + Christmas gifting ramps." },
    ],
    creativeAngles: [
      "Parent POV real-life",
      "Grandparent gift angle",
      "Safety / material breakdowns",
      "Milestone content (first steps, first day)",
      "Community mum/dad reviews",
      "Educational value story",
      "Gift-guide compilations",
      "Founder mission POV",
    ],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: "UK kids fashion", headline: "£34k → £190k monthly, repeat +52%", fromRev: "£34k", toRev: "£190k", growthPct: 458, roas: 4.0, months: 7 },
    testimonial: { name: "Kate B.", role: "Founder, baby brand", quote: "Parent-community UGC + age-based Klaviyo flows changed the maths. Repeat purchase is finally the growth lever." },
    offers: ["Gift-with-purchase for first order", "Bundle by age group", "Refer-a-parent credit programme"],
    faqs: FAQ_BASE("Baby & Kids"),
  },

  "jewellery-watches": {
    hero: "Premium jewellery & watch scaling with margin-safe media buying.",
    vibe: "Jewellery buyers take weeks to decide. We invest in story-driven creative, Google brand + non-brand Search and retargeting nurtures built for high-AOV.",
    images: { hero: IMG["jewellery-watches"].hero, buyers: IMG["jewellery-watches"].buyers, ...COMMON },
    categories: [
      { name: "Fine Jewellery",       body: "Story + craftsmanship creative, premium CRO." },
      { name: "Fashion Jewellery",    body: "Creator-led social + gifting angles." },
      { name: "Watches",              body: "High-AOV Search + finance CRO." },
      { name: "Engagement & Wedding", body: "Consideration nurture + concierge UX." },
    ],
    buyerPsychology: [
      { title: "Long consideration windows", body: "60–90 day nurture, not 7-day retargeting." },
      { title: "Craftsmanship story sells",  body: "Behind-the-workshop content lifts trust." },
      { title: "Gifting reason-to-buy",      body: "Anniversary / engagement funnels convert differently." },
    ],
    painPoints: [
      { title: "Weak Google brand defence", body: "Structure + budget for brand + non-brand parity." },
      { title: "No engagement funnel",       body: "Dedicated engagement / gifting landing pages." },
      { title: "Photography under-used",     body: "Motion + macro reels lift ATC on Meta." },
      { title: "Retargeting too short",       body: "60–90 day nurture flows required." },
    ],
    creativeAngles: [
      "Craftsmanship workshop reels",
      "Behind-the-scenes founder POV",
      "Engagement / gifting stories",
      "Everyday-wear reels",
      "Stacking / styling content",
      "Care & warranty reassurance",
      "Custom / bespoke journey",
      "Occasion moments UGC",
    ],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: "UK fine jewellery", headline: "£90k → £360k monthly, AOV £340", fromRev: "£90k", toRev: "£360k", growthPct: 300, roas: 3.5, months: 9 },
    testimonial: { name: "Emma T.", role: "Founder, fine jewellery", quote: "They stopped us discounting and rebuilt the funnel around craftsmanship. Margin finally scales with revenue." },
    offers: ["Complimentary engraving on gifting SKUs", "Free UK insured delivery over £150", "0% finance with Klarna"],
    faqs: FAQ_BASE("Jewellery & Watches"),
  },

  "pets-supplies": {
    hero: "Subscription-first pet brand growth built on community and repeat.",
    vibe: "Pet parents buy on love and loyalty. We build subscription funnels, community UGC and lifecycle flows tuned to real pet-parent habits.",
    images: { hero: IMG["pets-supplies"].hero, buyers: IMG["pets-supplies"].buyers, ...COMMON },
    categories: [
      { name: "Dog Supplies",     body: "Subscription-first funnels + community UGC." },
      { name: "Cat Supplies",     body: "Subscription CRO + gifting angles." },
      { name: "Pet Food & Treats", body: "Compliant claim creative + subscription retention." },
      { name: "Pet Healthcare",   body: "Vet-endorsed funnels + subscription CRO." },
    ],
    buyerPsychology: [
      { title: "Love drives spend",   body: "Emotive founder + pet-parent UGC outperforms product-only ads." },
      { title: "Habitual purchases",  body: "Subscription onboarding decides 12-month LTV." },
      { title: "Community proof",      body: "Pet-parent groups + reviews are the trust engine." },
    ],
    painPoints: [
      { title: "One-off skew",        body: "Rebuild funnel around subscription CTAs." },
      { title: "No community angle",  body: "Creator + pet-parent UGC programme." },
      { title: "Weak retention flows", body: "Klaviyo tuned to feeding / grooming cycles." },
      { title: "No referral engine",   body: "Refer-a-friend with credit + free treats." },
    ],
    creativeAngles: [
      "Pet POV UGC",
      "Owner testimonial reels",
      "Founder + pet origin",
      "Feeding / grooming rituals",
      "Vet endorsement content",
      "Rescue + charity partnerships",
      "Subscription convenience",
      "Community challenge UGC",
    ],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: "UK dog nutrition", headline: "£52k → £290k monthly, 58% subs share", fromRev: "£52k", toRev: "£290k", growthPct: 458, roas: 3.9, months: 7 },
    testimonial: { name: "Holly S.", role: "Founder, pet nutrition", quote: "Subscription share went 22% → 58%. Meta scales, LTV compounds and CAC finally makes sense." },
    offers: ["First-month subscription 50% off", "Free treats with 3-month plan", "Refer-a-friend credit"],
    faqs: FAQ_BASE("Pets & Supplies"),
  },

  "arts-prints-stationery": {
    hero: "Arts, prints & stationery growth tuned to gifting cycles.",
    vibe: "Arts brands live on inspiration + gifting. We plug Pinterest, Meta and Google Shopping into a Shopify PDP built for gift-mode conversion.",
    images: { hero: IMG["arts-prints-stationery"].hero, buyers: IMG["arts-prints-stationery"].buyers, ...COMMON },
    categories: [
      { name: "Wall Art & Prints",   body: "Pinterest + Meta discovery + room-context PDPs." },
      { name: "Stationery & Planners", body: "Community-led UGC + subscription add-ons." },
      { name: "Craft Supplies",      body: "Long-tail SEO + creator-led social." },
      { name: "Personalised Gifts",  body: "Gift-mode funnels + occasion nurtures." },
    ],
    buyerPsychology: [
      { title: "Inspiration → discovery",  body: "Pinterest is the top-of-funnel workhorse." },
      { title: "Gifting is a distinct buyer", body: "Gift-mode CRO changes conversion maths." },
      { title: "Personalisation lifts AOV", body: "Add-ons and customisation raise basket size." },
    ],
    painPoints: [
      { title: "No Pinterest strategy",  body: "Pinterest + Shopping integration." },
      { title: "Weak gift-mode",         body: "Dedicated gifting landers, gift cards, wrap options." },
      { title: "Under-priced AOV",       body: "Bundle + framing + personalisation upsells." },
      { title: "Seasonal blindness",     body: "Q4 + Mother's Day + Valentine's ramps." },
    ],
    creativeAngles: [
      "Room styling with prints",
      "Behind-the-artist reels",
      "Gift-guide compilations",
      "Personalisation reveal UGC",
      "Occasion story ads",
      "Community creator UGC",
      "Sustainability + materials",
      "Unboxing reels",
    ],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: "UK prints brand", headline: "£24k → £160k monthly, gift-mode 41%", fromRev: "£24k", toRev: "£160k", growthPct: 566, roas: 4.2, months: 6 },
    testimonial: { name: "Freya G.", role: "Founder, prints DTC", quote: "Gift-mode CRO + Pinterest changed everything for us. Q4 was 3x last year without extra discounting." },
    offers: ["Free UK delivery over £40", "Bundle 3 prints for 20% off", "Gift-wrap + personalisation add-on"],
    faqs: FAQ_BASE("Arts, Prints & Stationery"),
  },
};

export function industryContentFor(slug: string, name: string): IndustryContent {
  const c = INDUSTRY_CONTENT[slug];
  if (c) return c;
  // fallback template so a new industry never renders blank
  return {
    hero: `${name} growth built for UK DTC.`,
    vibe: `We install the same growth engine across ${name.toLowerCase()} brands — creative, media, CRO and retention as one system.`,
    images: {
      hero: u("photo-1454165804606-c3d57bc86b40"),
      buyers: u("photo-1483985988355-763728e1935b"),
      ...COMMON,
    },
    categories: [],
    buyerPsychology: [],
    painPoints: [],
    creativeAngles: [],
    seasonalMoments: SEASONS_UK,
    kpiTargets: KPI_DEFAULT,
    caseStudy: { brand: `${name} brand`, headline: `Scaled with our full growth engine`, fromRev: "£50k", toRev: "£280k", growthPct: 460, roas: 4.0, months: 8 },
    testimonial: { name: "Founder", role: name, quote: "Senior team, sharp creative, real results. Best partner we've worked with." },
    offers: [],
    faqs: FAQ_BASE(name),
  };
}
