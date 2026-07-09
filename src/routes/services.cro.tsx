import { createFileRoute } from "@tanstack/react-router";
import ServicePage from "../components/site/ServicePage";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, type FAQ } from "../lib/seo";

const FAQ_LIST: FAQ[] = [
  { q: "What conversion rate should a Shopify store be hitting?", a: "Healthy UK DTC stores run 2.5–4% on cold traffic and 6–9% on warm. Below 1.8% almost always means PDP, offer or trust issues — not a traffic problem. We diagnose which of the three is killing you in the first two weeks." },
  { q: "How long until I see CRO results?", o: "", a: "Quick wins (PDP, checkout, trust signals) land in 2–4 weeks. Compounded gains from A/B testing show in 60–90 days. Full system uplift compounds over 6 months." },
  { q: "Do you actually run A/B tests, or just make 'best-practice' changes?", a: "Both. On Shopify we use Intelligems or Convert; on WooCommerce we use VWO or Optimizely. Every test carries a written hypothesis, sample-size target and pre-agreed stop rule. Best-practice changes only ship on validated foundations." },
  { q: "What's the difference between CRO and UX design?", a: "UX makes the experience nicer. CRO makes it convert. We do both — but every decision is graded on revenue per visitor, not opinion or aesthetics." },
  { q: "Do you need access to my analytics?", a: "Yes — GA4, Shopify analytics, Hotjar or Microsoft Clarity, and ideally session replays. If any of those are missing or misconfigured, we install and configure them properly (server-side included) in week one." },
  { q: "How much does CRO cost in the UK?", a: "Real CRO retainers start around £2,500/mo and scale with test velocity and store complexity. Below that you're paying for reports, not experiments — and reports don't compound." },
  { q: "Can you work directly in our Shopify theme?", a: "Yes. Our devs work in Shopify Liquid, React (Hydrogen), and any headless stack. We can ship inside your existing theme or run experiments through a testing tool without a code touch." },
  { q: "Do you replace our in-house designer?", a: "No — we amplify them. We ship the hypothesis, wireframe and copy; your designer executes brand-perfect visuals; our dev QA the launch. Ideal partnership." },
  { q: "What's the biggest CRO win you've delivered?", a: "A UK beauty brand went from 1.4% to 4.1% conversion in 60 days by rewiring one page: the PDP. Same traffic, same spend, +192% CR, +228% revenue." },
];

export const Route = createFileRoute("/services/cro")({
  head: () => ({
    meta: [
      { title: "CRO Agency UK — Shopify Conversion Optimisation | BeingEcom" },
      { name: "description", content: "UK Conversion Rate Optimisation agency for Shopify and WooCommerce. Turn existing traffic into 2-3× more sales with weekly A/B testing, PDP rewrites and checkout optimisation — no extra ad spend required." },
      { property: "og:title", content: "CRO Agency UK — Shopify Conversion Optimisation | BeingEcom" },
      { property: "og:description", content: "Turn the traffic you already have into 2-3× more sales. UK-focused CRO for Shopify & WooCommerce stores." },
      { property: "og:url", content: "https://beingecom.com/services/cro" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/cro" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd({ slug: "cro", name: "Conversion Rate Optimisation", description: "Funnel audits, A/B testing, PDP and checkout optimisation for Shopify and WooCommerce." })) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Conversion Rate Optimisation", path: "/services/cro" }])) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(FAQ_LIST, "/services/cro")) },
    ],
  }),
  component: () => (
    <ServicePage cfg={{
      slug: "cro",
      eyebrow: "Conversion Rate Optimisation",
      heroTitle: "Same traffic. Same spend. 2-3× the revenue.",
      heroSub: "UK Conversion Rate Optimisation for Shopify and WooCommerce stores — weekly A/B tests, PDP rewrites, checkout surgery and behavioural research that unlocks the revenue already inside your funnel.",
      problemTitle: "Your store leaks revenue at every step.",
      problemBullets: [
        "Site-wide conversion rate stuck below 2% — a full percentage point beneath the DTC benchmark.",
        "Checkout abandonment above 70% because form friction, express-pay gaps and hidden shipping wreck the last step.",
        "PDP visitors who never add-to-cart because copy, proof and offer are indistinguishable from every competitor.",
      ],
      whatIsTitle: "CRO isn't A/B testing button colours.",
      whatIsBody: "It's a systematic process of finding where buyers drop off, understanding why they leave, and engineering the next version of your funnel to close the gap. Data + psychology + engineering — shipped weekly. Every experiment carries a hypothesis, a stop rule, and a revenue impact estimate before it goes live.",
      systemTitle: "Our 4-phase CRO operating system.",
      systemSteps: [
        { title: "Conversion audit", body: "Funnel teardown, GA4 review, checkout event mapping, revenue-leak diagnosis by device and traffic source." },
        { title: "Behaviour research", body: "Heatmaps, session replays, exit surveys, 5-second tests and on-page polls to understand the 'why'." },
        { title: "Hypothesise & ship", body: "Revenue-impact-prioritised backlog, written test docs, one or two experiments launched per week." },
        { title: "Validate & compound", body: "A/B test with statistical significance, lock winners permanently into the theme, feed learnings into the library." },
      ],
      pillarsTitle: "The four pillars of the CRO engine.",
      pillars: [
        { title: "Diagnose", body: "Find the real leak — quantitative + qualitative — not the obvious one." },
        { title: "Prioritise", body: "PIE score by potential, importance and ease. Ship revenue impact first." },
        { title: "Ship", body: "Bias toward action. Test small, test fast, kill fast." },
        { title: "Lock", body: "Winners become permanent theme upgrades — no lost learnings." },
      ],
      deepBlocks: [
        { title: "Heatmap + session-replay analysis", body: "Hotjar and Microsoft Clarity installed and monitored weekly. Where users click, scroll, rage-tap and dead-click — mapped by device.", tags: ["Hotjar","Clarity","Session replay","Rage clicks"] },
        { title: "Product page optimisation (PDP)", body: "Hero rewrite, gallery order, USP strip, review widget placement, sticky add-to-cart, bundle module, size guide, delivery estimator, trust badges.", tags: ["PDP","Sticky ATC","Reviews","Bundles"] },
        { title: "Checkout funnel surgery", body: "Reduce steps, surface Apple Pay + Shop Pay + PayPal above the fold, address autocomplete, real-time validation, guest checkout parity.", tags: ["Express pay","Autocomplete","Guest checkout"] },
        { title: "Cart abandonment recovery", body: "Exit-intent overlays, cart-drawer redesign, abandonment browser notifications, post-cart email/SMS flows, retargeting sequences.", tags: ["Exit intent","Klaviyo flow","Retargeting"] },
        { title: "A/B testing infrastructure", body: "Intelligems / Convert / VWO configured properly. Hypothesis doc, MDE calculation, sample-size gate, statistical stop rule, learning library.", tags: ["Intelligems","MDE","Stat sig"] },
        { title: "Mobile-first UX refactor", body: "70% of your traffic is mobile — and mobile CR is usually half desktop. We rebuild the mobile nav, filters, PDP and checkout for thumb-first buyers.", tags: ["Mobile","Nav","Thumb zone"] },
        { title: "Persuasion + psychology layer", body: "Urgency, scarcity, anchoring, social proof, risk reversal, reciprocity — applied ethically, with data behind every claim.", tags: ["Cialdini","Anchoring","Loss aversion"] },
        { title: "Post-purchase optimisation", body: "Thank-you page upsells, subscription conversion, review-request timing, referral trigger — turning every buyer into more revenue.", tags: ["Upsell","Subscription","Referral"] },
      ],
      midCta: {
        title: "Curious how much revenue your funnel is quietly leaking?",
        body: "Get a free 30-minute conversion audit — we'll walk your Shopify or Woo store live and identify the 3 highest-impact fixes waiting inside your funnel.",
        primary: "Get my free conversion audit",
        secondary: "See our CRO case studies",
      },
      triggersTitle: "The psychological triggers we test the most.",
      triggers: ["Urgency","Scarcity","Social proof","Risk reversal","Anchoring","Reciprocity","Authority","Specificity","Loss aversion","Commitment","Reciprocation","Unity"],
      mistakes: [
        { title: "Testing on low-traffic pages", body: "You need statistical significance. Running an A/B test on a page getting 400 visits/month will finish in 8 months — by which point the season, offer and store are all different." },
        { title: "Copying competitor 'best practices' blindly", body: "Their audience isn't yours. What converts at Gymshark won't convert at a niche skincare brand — validate every borrowed idea." },
        { title: "Redesigning the whole site at once", body: "Full redesigns tank CR 30–40% on launch because nothing about them is validated. We change one thing at a time." },
        { title: "Only testing button colour and copy", body: "The 20% wins are in offer, PDP structure and trust — not in swapping 'Buy now' for 'Add to bag'." },
        { title: "Stopping tests early because you 'saw a pattern'", body: "Early results lie. Every test hits its pre-agreed sample size before we call a winner — no exceptions." },
        { title: "Not shipping the winner permanently", body: "Winning variants that stay inside the testing tool die when the tool licence lapses. Lock every winner into the theme." },
      ],
      comparison: {
        rows: [
          { criterion: "Test velocity", us: "1–2 rigorous experiments live every week", agency: "1 test per month, no post-mortem", inhouse: "Ad-hoc, whenever there's time" },
          { criterion: "Statistical rigour", us: "MDE, sample size and stop rule set before launch", agency: "'Looks like a winner' calls", inhouse: "Best-guess intuition" },
          { criterion: "Research inputs", us: "Heatmaps + session replays + surveys + GA4 funnel", agency: "GA4 export only", inhouse: "Whatever the tool suggests" },
          { criterion: "Winner implementation", us: "Locked permanently into theme, added to learning library", agency: "Stays in the testing tool", inhouse: "Forgotten after 3 months" },
          { criterion: "Mobile focus", us: "Mobile-first, tested on real device labs", agency: "Desktop-first, mobile as afterthought", inhouse: "Chrome DevTools only" },
          { criterion: "Reporting cadence", us: "Weekly Loom + monthly revenue-impact deck", agency: "Monthly PDF nobody reads", inhouse: "Verbal update in stand-up" },
        ],
      },
      beforeAfter: {
        before: ["1.4% site-wide CR","72% checkout abandonment","Zero behavioural research","Ad-hoc random theme edits","Mobile CR half of desktop"],
        after: ["3.9% site-wide CR","48% checkout abandonment","Weekly research + test cycle","Learning library of 40+ wins","Mobile CR matching desktop"],
      },
      caseStudy: {
        title: "UK beauty brand: +192% conversion rate in 60 days",
        problem: "Heavy paid traffic burning £30K/mo, site-wide CR stuck at 1.4%, ROAS collapsing below breakeven.",
        strategy: "Full PDP rewrite (hero, USPs, sticky ATC, review injection), checkout reduced from 4 steps to 2, Apple Pay + Shop Pay elevated above fold, exit-intent + cart-recovery flows launched.",
        result: "Conversion rate jumped from 1.4% to 4.1% in 60 days. ROAS climbed from 1.9× to 3.6×. Total revenue up 228% on the same ad spend.",
        metrics: [{ label: "CR", value: "+192%" }, { label: "ROAS", value: "1.9× → 3.6×" }, { label: "Revenue", value: "+228%" }],
      },
      timeline: [
        { w: "Week 1-2", t: "Diagnostic audit", b: "Funnel teardown, GA4 event mapping, Hotjar install, first-round session replays, revenue-leak diagnosis." },
        { w: "Week 3-4", t: "Quick wins live", b: "PDP + checkout quick-fix pass ships. Sticky ATC, trust badges, express-pay, form validation — first CR lift lands." },
        { w: "Month 2", t: "A/B testing engine", b: "Testing tool configured, hypothesis backlog live, first 2-3 experiments running with pre-agreed stop rules." },
        { w: "Month 3+", t: "Compounding wins", b: "Weekly test velocity, winners locked into theme, learning library growing — CR compounds monthly." },
      ],
      industryImpact: [
        { industry: "Fashion & apparel", pain: "Size uncertainty kills conversion; returns eat margin.", outcome: "Size-guide overlays + fit-quiz + review-based sizing signal cut returns and lift PDP CR." },
        { industry: "Beauty & skincare", pain: "Shoppers research obsessively; PDPs fail to answer the 'is this for me?' question.", outcome: "Ingredient breakdowns, skin-type filters and UGC-heavy PDPs convert research traffic." },
        { industry: "Home & garden", pain: "High-consideration purchases with long deliberation cycles.", outcome: "Save-for-later, delivery estimator and configurator flows shorten the decision loop." },
        { industry: "Electronics & tech", pain: "Spec confusion drives abandonment to Amazon.", outcome: "Comparison tables, spec explainers and finance calculators keep buyers on-site." },
        { industry: "Health & wellness", pain: "Subscription-heavy models with poor trial-to-paid conversion.", outcome: "Onboarding funnels and quiz-based prescription flows lift trial-conversion 40-60%." },
        { industry: "Baby & kids", pain: "Trust hurdles slow first purchase; parents research heavily.", outcome: "Founder-story blocks, safety credentials and real-parent UGC unlock first order." },
      ],
      ctaTitle: "Ready to turn your existing traffic into 2-3× more revenue?",
      impactStats: [
        { value: "+192%", label: "Avg CR lift" },
        { value: "3.6×", label: "Blended ROAS" },
        { value: "-32%", label: "Cart abandonment" },
      ],
      metricBars: [
        { label: "Conversion rate", before: 1.4, after: 4.1, unit: "%", description: "Visitor → buyer rate after PDP, social proof and checkout rebuild." },
        { label: "Checkout completion", before: 28, after: 64, unit: "%", description: "Share of started checkouts that complete payment. Target: 60%+." },
        { label: "AOV", before: 48, after: 79, unit: "£", description: "Average order value lifted via bundles, sticky ATC and post-purchase upsells." },
        { label: "Mobile CR", before: 1.1, after: 3.4, unit: "%", description: "Mobile conversion rate — where 70% of ecommerce traffic buys." },
        { label: "Revenue / visitor", before: 0.62, after: 2.41, unit: "£", description: "RPV — the truest single measure of CRO impact." },
      ],
      faqs: FAQ_LIST,
      relatedServices: [
        { to: "/services/analytics", title: "Analytics & Tracking", body: "GA4, server-side and Triple Whale set up so every experiment can be trusted." },
        { to: "/services/funnel", title: "Funnels & Landing Pages", body: "Standalone landing pages that convert paid traffic without touching the core theme." },
        { to: "/services/email-sms", title: "Email Marketing Automation", body: "Cart-recovery, browse-abandon and post-purchase flows that finish the sale." },
      ],
    }} />
  ),
});
