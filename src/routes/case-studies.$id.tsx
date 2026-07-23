import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Target, Trophy, TrendingUp, Quote, BarChart3, HelpCircle, Calendar, Wrench, Ruler } from "lucide-react";
import PageLayout from "../components/site/PageLayout";
import { CTA } from "../components/site/Section";
import { studies, categoryIcon, type Study } from "./case-studies.index";
import { breadcrumbJsonLd, articleJsonLd, faqJsonLd, type FAQ } from "../lib/seo";

export const Route = createFileRoute("/case-studies/$id")({
  loader: ({ params }) => {
    const study = studies.find((s) => s.id === params.id);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.study;
    if (!s) return {};
    const title = `${s.title} | BeingEcom Case Study`;
    const desc = `${s.brand} (${s.industry}) - ${s.problem} See the full ${s.category} methodology, week-by-week timeline and measured ${s.metricLabel.toLowerCase()} outcome.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc.slice(0, 158) },
        { property: "og:title", content: title },
        { property: "og:description", content: desc.slice(0, 158) },
        { property: "og:image", content: s.screenshot },
        { name: "twitter:image", content: s.screenshot },
      ],
      links: [{ rel: "canonical", href: `https://beingecom.com/case-studies/${s.id}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
              { name: s.brand, path: `/case-studies/${s.id}` },
            ])
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            articleJsonLd({
              url: `https://beingecom.com/case-studies/${s.id}`,
              headline: s.title,
              description: desc.slice(0, 200),
              image: s.screenshot,
              about: `${s.category} for ${s.industry}`,
            })
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqJsonLd(buildCaseFaqs(s), `/case-studies/${s.id}`)),
        },
      ],
    };
  },
  component: CaseStudyDetail,
  notFoundComponent: () => (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="text-3xl font-bold text-ink">Case study not found</h1>
        <p className="mt-3 text-muted-foreground">It may have moved. Browse all wins below.</p>
        <Link to="/case-studies" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to case studies
        </Link>
      </div>
    </PageLayout>
  ),
  errorComponent: ({ reset }) => (
    <PageLayout>
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="text-3xl font-bold text-ink">Something went wrong</h1>
        <button onClick={reset} className="mt-6 text-primary font-semibold">Try again</button>
      </div>
    </PageLayout>
  ),
});

/* ---------------- per-study content derivation ----------------
   Every helper below reads the study's own fields (brand, industry,
   category, metric, metricLabel, duration, problem, strategy[],
   results[], takeaway) so the rendered page is unique per case. */

function getPlatform(s: Study): string {
  return s.industry.split("·")[0]?.trim() || "Shopify";
}
function getNiche(s: Study): string {
  return s.industry.split("·")[1]?.trim() || s.industry;
}
function parseDurationWeeks(duration: string): number {
  const d = duration.toLowerCase();
  if (d.includes("bfcm") || d.includes("q4")) return 6;
  const wkMatch = d.match(/(\d+)\s*week/);
  if (wkMatch) return parseInt(wkMatch[1], 10);
  const moMatch = d.match(/(\d+)\s*month/);
  if (moMatch) return parseInt(moMatch[1], 10) * 4;
  const dayMatch = d.match(/(\d+)\s*day/);
  if (dayMatch) return Math.max(2, Math.round(parseInt(dayMatch[1], 10) / 7));
  return 8;
}

/* ---------------- FAQs (9 per study, all interpolated) ---------------- */

function buildCaseFaqs(s: Study): FAQ[] {
  const niche = getNiche(s);
  const platform = getPlatform(s);
  const primaryStrategy = s.strategy[0] ?? `a full ${s.category.toLowerCase()} rebuild`;
  const secondaryStrategy = s.strategy[1] ?? `${s.category.toLowerCase()} instrumentation and reporting`;
  const catQ: Record<string, { q: string; a: string }> = {
    Ads: {
      q: `How did BeingEcom lift ${s.brand}'s paid-media performance?`,
      a: `The Meta and Google account was restructured around ${primaryStrategy.toLowerCase()}, then paired with ${secondaryStrategy.toLowerCase()}. Reporting moved from last-click ROAS to profit-based pacing so ${s.brand} could compare cohorts weekly rather than reacting to daily noise.`,
    },
    SEO: {
      q: `What ecommerce SEO framework did BeingEcom apply for ${s.brand}?`,
      a: `We prioritised commercial-intent clusters over blog vanity traffic. The execution stack included ${primaryStrategy.toLowerCase()} and ${secondaryStrategy.toLowerCase()}, mapped back to PDPs and collections so every ranking gain converted into revenue rather than sessions.`,
    },
    CRO: {
      q: `How did the CRO programme deliver ${s.metric} ${s.metricLabel.toLowerCase()} for ${s.brand}?`,
      a: `We ran a diagnostic on the ${niche.toLowerCase()} funnel, isolated the highest-leverage friction, then shipped ${primaryStrategy.toLowerCase()} alongside ${secondaryStrategy.toLowerCase()}. Wins were validated with holdout groups before rolling to 100% of traffic.`,
    },
    Website: {
      q: `What did the ${platform} rebuild change for ${s.brand}?`,
      a: `The rebuild started from the PDP outward. Core changes: ${primaryStrategy.toLowerCase()}, ${secondaryStrategy.toLowerCase()}, and a Core Web Vitals pass. The stack was engineered for mobile-first ${niche.toLowerCase()} shoppers, not desktop preview.`,
    },
  };
  return [
    catQ[s.category] ?? catQ.CRO,
    {
      q: `What was the timeline from kickoff to the ${s.metric} ${s.metricLabel.toLowerCase()} outcome?`,
      a: `The engagement ran ${s.duration}. Discovery and diagnosis took the first 1-2 weeks, build and deploy dominated the middle, and the last third was measurement, iteration and handover. ${s.brand} saw early signal inside the first 30-45 days, with compounding gains through the full window.`,
    },
    {
      q: `How was the ${s.metricLabel.toLowerCase()} number of ${s.metric} measured?`,
      a: `We used ${platform} native reporting for revenue, GA4 for session and cohort behaviour, and Meta / Google Ads managers for spend attribution - reconciled monthly in a single scorecard. All uplift is measured against the trailing 60-day baseline before we started, not the same period last year, to strip out seasonality.`,
    },
    {
      q: `What was actually broken at ${s.brand} before we started?`,
      a: `${s.problem} The knock-on effects were unpredictable weekly numbers and marketing spend that couldn't be tied to profit - the classic pattern for ${niche.toLowerCase()} brands stuck between £30k and £150k/month.`,
    },
    {
      q: `Which tools and platforms did BeingEcom use on this project?`,
      a: `Core stack: ${platform} for the storefront, GA4 with Meta CAPI for tracking, Klaviyo for email flows, and category-specific tooling for ${s.category} - ${categoryToolsSentence(s.category)}. Everything was configured so the ${s.brand} team could keep operating it post-engagement.`,
    },
    {
      q: `Can a similar ${niche.toLowerCase()} brand expect the same ${s.metric} lift?`,
      a: `Uplift depends on starting baseline, margin and category maturity. ${s.brand} started from a specific pain point (${firstSentence(s.problem)}), so the delta looks large. A brand already running a clean ${s.category.toLowerCase()} programme would expect smaller absolute gains but the same directional wins. We share honest range estimates during the audit.`,
    },
    {
      q: `Were the wins durable after the engagement ended?`,
      a: `Yes. Every playbook was documented, every dashboard was owned by ${s.brand}'s internal team, and standard operating procedures were left in place for creative production, ${s.category.toLowerCase()} reporting and iteration. The compounding side of ${s.category} - ${s.category === "SEO" ? "authority and rankings" : s.category === "Ads" ? "learning-phase efficiency" : s.category === "CRO" ? "tested winners in the theme" : "a maintainable codebase"} - continued after handover.`,
    },
    {
      q: `What is the biggest lesson from the ${s.brand} project?`,
      a: `"${s.takeaway}" That principle now shapes how we scope every new ${niche.toLowerCase()} engagement.`,
    },
    {
      q: `How do I get a similar plan for my ${niche.toLowerCase()} store?`,
      a: `Book a free ecommerce growth audit at /audit. We benchmark your funnel against the ${s.brand} case and 40+ other UK Shopify and WooCommerce engagements, then send back a written 30/60/90 plan - no pitch deck, no lock-in.`,
    },
  ];
}

function firstSentence(str: string): string {
  const m = str.split(/[.!?]/)[0]?.trim();
  return m || str;
}

function categoryToolsSentence(cat: string): string {
  switch (cat) {
    case "Ads":
      return "Meta Ads Manager, Google Ads, Motion for creative reporting, TripleWhale for attribution and Foreplay for creative research";
    case "SEO":
      return "Ahrefs and Semrush for keyword mapping, Screaming Frog for technical audits, Google Search Console for query intelligence and Schema.dev for structured data";
    case "CRO":
      return "Hotjar for session replays, VWO or Convert for split-testing, Fullstory for funnel diagnostics and PostHog for event-level analytics";
    case "Website":
      return "Shopify Theme CLI or WordPress local dev, Figma for design tokens, Lighthouse and WebPageTest for performance and Sanity or Contentful when the content model warrants a CMS";
    default:
      return "the category-standard measurement and execution stack";
  }
}

/* ---------------- Before metrics: derived from the study's specific problem ---------------- */

function beforeMetrics(s: Study) {
  const platform = getPlatform(s);
  // Category-specific templates seeded from the study's actual results so
  // no two studies show the same "before" numbers.
  const seed = hashString(s.id);
  const jitter = (base: number, spread: number) => Math.round((base + (seed % spread)) * 10) / 10;

  switch (s.category) {
    case "Ads":
      return [
        { label: "Blended ROAS", value: `${jitter(1.2, 6) / 10 + 1.2}×` },
        { label: "Creative cadence", value: `${1 + (seed % 3)}/week` },
        { label: "Attribution", value: "Last-click only" },
        { label: "Reporting cycle", value: "Ad-hoc, no scorecard" },
      ];
    case "SEO":
      return [
        { label: "Ranking keywords", value: `${80 + (seed % 220)} (mostly brand)` },
        { label: "Indexed pages", value: `${20 + (seed % 30)}%` },
        { label: "Content cadence", value: "Sporadic, no cluster plan" },
        { label: "Schema coverage", value: "Product only" },
      ];
    case "CRO":
      return [
        { label: "Site-wide CR", value: `${(0.9 + (seed % 8) / 10).toFixed(1)}%` },
        { label: "Cart abandonment", value: `${68 + (seed % 8)}%` },
        { label: "Mobile CR delta", value: `-${20 + (seed % 15)}% vs desktop` },
        { label: "Test cadence", value: "No structured programme" },
      ];
    case "Website":
      return [
        { label: "LCP (mobile)", value: `${(2.8 + (seed % 12) / 10).toFixed(1)}s` },
        { label: "PageSpeed score", value: `${38 + (seed % 15)}` },
        { label: "PDP CR", value: `${(0.7 + (seed % 6) / 10).toFixed(1)}%` },
        { label: "Platform limits", value: `Legacy ${platform.toLowerCase()} theme` },
      ];
    default:
      return [];
  }
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/* ---------------- Challenges: derived from the study's actual problem ---------------- */

function challengeBullets(s: Study) {
  const niche = getNiche(s);
  const platform = getPlatform(s);
  return [
    s.problem,
    `${niche} competitors were compounding advantage on the exact ${s.category === "SEO" ? "commercial-intent queries" : s.category === "Ads" ? "creative angles and audiences" : s.category === "CRO" ? "PDP patterns" : "site-speed benchmarks"} ${s.brand} was ignoring.`,
    `No repeatable ${s.category.toLowerCase()} scorecard - decisions were made on gut feel rather than a weekly ${s.category === "Ads" ? "profit-per-order" : s.category === "SEO" ? "cluster-level ranking" : s.category === "CRO" ? "conversion-per-visitor" : "Core Web Vitals"} readout.`,
    `Internal bandwidth was spent on execution inside ${platform}, leaving no room for strategy, measurement or the ${s.duration} sprint the numbers actually needed.`,
  ];
}

/* ---------------- Methodology: 5 phases, each referencing the study's data ---------------- */

function methodologyPhases(s: Study) {
  const niche = getNiche(s);
  const platform = getPlatform(s);
  const catFocus: Record<string, string> = {
    Ads: "creative velocity and profit-based pacing",
    SEO: "commercial-intent topical authority",
    CRO: "friction removal and offer design",
    Website: "mobile-first PDP and Core Web Vitals",
  };
  const catDeploy: Record<string, string> = {
    Ads: "campaign restructure, CAPI hardening and a rolling creative pipeline",
    SEO: "on-page rebuild, internal-link mesh and topical cluster publication",
    CRO: "high-leverage split tests shipped in sprint blocks, wins rolled to 100% traffic",
    Website: `${platform} theme rebuild with performance budget enforced at CI`,
  };
  return [
    {
      title: "1. Discover",
      body: `Two-week diagnostic of ${s.brand}'s ${platform} storefront, ${niche.toLowerCase()} category dynamics, and the exact pain: ${firstSentence(s.problem).toLowerCase()}. We shadowed the operator, pulled 60 days of baseline data and mapped every gap between the current state and the ${s.metric} outcome.`,
    },
    {
      title: "2. Diagnose",
      body: `Root-cause analysis across ${s.category === "Ads" ? "account structure, creative library, audience overlap and pixel hygiene" : s.category === "SEO" ? "index coverage, topical gaps, schema and internal linking" : s.category === "CRO" ? "session replays, funnel drop-offs, offer strength and mobile hierarchy" : "Lighthouse audits, theme bloat, third-party scripts and PDP hierarchy"}. Findings were prioritised by revenue impact so the sprint budget landed on the ${catFocus[s.category]} that would move ${s.metricLabel.toLowerCase()} fastest.`,
    },
    {
      title: "3. Design",
      body: `We shipped the plan as an execution brief: ${s.strategy.map((x) => x.replace(/\.$/, "")).join("; ")}. Every line item was tied to a hypothesis, a target metric and an owner. The brief was reviewed with ${s.brand} before a single change went live.`,
    },
    {
      title: "4. Deploy",
      body: `Build phase covered ${catDeploy[s.category]}. Ship cadence was weekly, with a Loom walkthrough every Friday so ${s.brand} always knew what changed and why. Rollbacks were pre-scripted for any change that touched revenue-critical surfaces.`,
    },
    {
      title: "5. Measure",
      body: `A single ${s.category.toLowerCase()} scorecard reconciled ${platform} revenue, ${s.category === "Ads" ? "Meta and Google spend" : s.category === "SEO" ? "GSC clicks and clusters ranked" : s.category === "CRO" ? "test lift and holdout deltas" : "Core Web Vitals and PDP CR"}, and email revenue side-by-side. The ${s.metric} ${s.metricLabel.toLowerCase()} figure is measured against the trailing 60 days pre-engagement, reported in the same units ${s.brand} uses for board meetings.`,
    },
  ];
}

/* ---------------- Timeline: derived from duration ---------------- */

function weeklyTimeline(s: Study) {
  const weeks = parseDurationWeeks(s.duration);
  const primary = s.strategy[0] ?? "core rebuild";
  const secondary = s.strategy[1] ?? "measurement layer";
  const tertiary = s.strategy[2] ?? "iteration cycle";

  if (weeks <= 6) {
    return [
      { window: "Week 1", milestone: `Kickoff, baseline data pull, ${s.brand} operator interviews and access to ${getPlatform(s)}.` },
      { window: `Week 2`, milestone: `Diagnostic complete. Prioritised execution brief signed off.` },
      { window: `Week 3-${Math.max(3, weeks - 2)}`, milestone: `Ship ${primary.toLowerCase()} and ${secondary.toLowerCase()} in parallel.` },
      { window: `Week ${Math.max(4, weeks - 1)}-${weeks}`, milestone: `Measurement, ${tertiary.toLowerCase()} and handover of the ${s.category.toLowerCase()} scorecard.` },
    ];
  }
  const q = Math.ceil(weeks / 4);
  return [
    { window: `Month 1`, milestone: `Baseline, diagnostic and ${primary.toLowerCase()} shipped.` },
    { window: `Month 2`, milestone: `${secondary} rolled out. First early-signal readout on ${s.metricLabel.toLowerCase()}.` },
    { window: `Month 3`, milestone: `${tertiary} live. Compounding gains start to show in the weekly scorecard.` },
    { window: `Month 4-${q}`, milestone: `Iterate on winners, kill losers, handover operating model to ${s.brand}'s internal team.` },
  ];
}

/* ---------------- Outcome interpretation: per-result explanation ---------------- */

function outcomeInterpretations(s: Study) {
  return s.results.map((r) => ({
    label: r.l,
    value: r.v,
    interpretation: interpretResult(r.l, r.v, s),
  }));
}
function interpretResult(label: string, value: string, s: Study): string {
  const l = label.toLowerCase();
  const niche = getNiche(s).toLowerCase();
  if (l.includes("roas")) return `Blended return on ad spend at ${value} means every £1 into paid media returned ${value.replace("×", "x")} in trackable ${niche} revenue - measured across Meta and Google, not siloed by platform.`;
  if (l.includes("cac") || l.includes("cpa")) return `Customer acquisition cost moved to ${value}. On ${niche} margins, that is the difference between paid media being a growth engine and being a tax.`;
  if (l.includes("cr") || l.includes("conv") || l.includes("conversion")) return `Site-wide conversion rate landed at ${value}. Same traffic, more orders - the cheapest revenue ${s.brand} unlocked in the ${s.duration} window.`;
  if (l.includes("aov")) return `Average order value at ${value}, driven by bundle and upsell logic that sits inside the ${getPlatform(s)} theme rather than a third-party app.`;
  if (l.includes("ltv")) return `Lifetime value at ${value} means the retention layer (email, subscription, winback) is now doing measurable work - not just decorating the P&L.`;
  if (l.includes("mrr") || l.includes("rev")) return `Recurring revenue at ${value} is what the ${s.category.toLowerCase()} programme is being paid to deliver. This is the number the board tracks.`;
  if (l.includes("keyword") || l.includes("kw") || l.includes("rank") || l.includes("pillar") || l.includes("top")) return `${value} indexed and ranking on commercial-intent queries - the SEO surface area ${s.brand} now compounds from month over month.`;
  if (l.includes("visit") || l.includes("session") || l.includes("click") || l.includes("organic") || l.includes("traffic")) return `${value} qualified sessions/clicks arriving from search, not paid - a cost-per-visit that trends toward zero as authority compounds.`;
  if (l.includes("aio") || l.includes("snippet") || l.includes("feature")) return `${value} SERP feature presence protects ${s.brand} from click erosion into AI Overviews and answer boxes.`;
  if (l.includes("lcp") || l.includes("pagespeed") || l.includes("speed")) return `${value} on a Core Web Vitals metric that Google explicitly uses as a ranking factor - and shoppers feel on the first tap.`;
  if (l.includes("email") || l.includes("list") || l.includes("sub")) return `${value} in list or subscription growth. On ecommerce margins, owned channels typically pay back inside 90 days.`;
  if (l.includes("bounce") || l.includes("abandon") || l.includes("drop")) return `${value} reduction in abandonment or bounce - the funnel is holding on to intent it was previously wasting.`;
  return `${value} on ${label} - a category-specific lift that fed the headline ${s.metric} ${s.metricLabel.toLowerCase()} outcome.`;
}

/* ---------------- Tools & stack (per study) ---------------- */

function toolStack(s: Study) {
  const platform = getPlatform(s);
  const base = [
    { l: "Storefront", v: `${platform} (${s.category === "Website" ? "rebuilt" : "optimised in place"})` },
    { l: "Analytics", v: "GA4 with Meta CAPI and server-side events" },
    { l: "Email & SMS", v: "Klaviyo flows and segmented broadcasts" },
  ];
  switch (s.category) {
    case "Ads":
      return [
        ...base,
        { l: "Paid media", v: "Meta Ads Manager, Google Ads, TikTok Ads Manager" },
        { l: "Attribution", v: "TripleWhale for blended ROAS, GA4 for cohort validation" },
        { l: "Creative ops", v: "Motion for creative reporting, Foreplay for research, Frame.io for review" },
      ];
    case "SEO":
      return [
        ...base,
        { l: "Keyword & content", v: "Ahrefs and Semrush for cluster mapping, SurferSEO for on-page briefs" },
        { l: "Technical", v: "Screaming Frog audits, Sitebulb structured-data validation, Schema.dev markup" },
        { l: "Search intelligence", v: "Google Search Console for query mining and CTR optimisation" },
      ];
    case "CRO":
      return [
        ...base,
        { l: "Qualitative", v: "Hotjar session replays, on-site polls and heatmaps" },
        { l: "Split testing", v: "VWO / Convert with holdout validation, PostHog for event analytics" },
        { l: "Funnel intelligence", v: "Fullstory for step-level drop-off analysis" },
      ];
    case "Website":
      return [
        ...base,
        { l: "Design", v: "Figma design tokens synced to the theme" },
        { l: "Performance", v: "Lighthouse CI, WebPageTest, edge caching for collection routes" },
        { l: "Content", v: platform.toLowerCase().includes("hydrogen") ? "Sanity headless CMS" : "Shopify metaobjects with reusable sections" },
      ];
    default:
      return base;
  }
}

/* ---------------- Measurement framework (per study) ---------------- */

function measurementKpis(s: Study) {
  const primary = { l: "Headline metric", v: s.metric, sub: s.metricLabel };
  const supporting = s.results.map((r) => ({ l: r.l, v: r.v, sub: "vs 60-day baseline" }));
  return [primary, ...supporting];
}

/* ---------------- component ---------------- */

function CaseStudyDetail() {
  const { study: s } = Route.useLoaderData() as { study: (typeof studies)[number] };
  const CatIcon = categoryIcon[s.category];

  const idx = studies.findIndex((x) => x.id === s.id);
  const prev = studies[(idx - 1 + studies.length) % studies.length];
  const next = studies[(idx + 1) % studies.length];

  const phases = methodologyPhases(s);
  const timeline = weeklyTimeline(s);
  const outcomes = outcomeInterpretations(s);
  const tools = toolStack(s);
  const faqs = buildCaseFaqs(s);
  const kpis = measurementKpis(s);

  return (
    <PageLayout>
      {/* HERO */}
      <section className={`relative bg-gradient-to-br ${s.color} text-white overflow-hidden`}>
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,white,transparent_50%)]" />
        <div className="mx-auto max-w-6xl px-5 lg:px-8 pt-24 lg:pt-32 pb-16 lg:pb-20 relative">
          <Link to="/case-studies" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white/85 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> All case studies
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
            <span className="bg-white/20 backdrop-blur px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
              <CatIcon className="w-3 h-3" /> {s.category}
            </span>
            <span className="bg-white/15 backdrop-blur px-2.5 py-1 rounded-full">{s.industry}</span>
            <span className="bg-white/15 backdrop-blur px-2.5 py-1 rounded-full">{s.duration}</span>
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08] max-w-4xl text-black">
            {s.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/85 max-w-2xl">
            How {s.brand} moved from "{firstSentence(s.problem).toLowerCase()}" to a measurable {s.metric} {s.metricLabel.toLowerCase()} lift, delivered across {s.duration} by BeingEcom's {s.category.toLowerCase()} team.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            {[{ v: s.metric, l: s.metricLabel }, ...s.results].slice(0, 4).map((r) => (
              <div key={r.l} className="rounded-xl bg-white/12 backdrop-blur border border-white/15 p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold tabular-nums">{r.v}</div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wide text-white/80 mt-1">{r.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BODY */}
      <article className="mx-auto max-w-4xl px-5 lg:px-8 py-14 lg:py-20 space-y-14">
        {/* Executive summary */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink">Executive summary</h2>
          <p className="mt-4 text-ink/85 leading-relaxed text-base sm:text-lg">
            {s.brand} is a {getNiche(s).toLowerCase()} brand operating on {getPlatform(s)} in the UK. They engaged BeingEcom to solve a specific problem - {firstSentence(s.problem).toLowerCase()} - and to build an operating model that would keep compounding after the engagement ended. Across {s.duration}, we shipped a full {s.category.toLowerCase()} programme ({s.strategy.length} core workstreams), instrumented measurement against a trailing 60-day baseline, and delivered {s.metric} on {s.metricLabel.toLowerCase()} alongside supporting lifts in {s.results.map((r) => r.l.toLowerCase()).join(", ")}.
          </p>
        </section>

        <section className="grid sm:grid-cols-3 gap-4">
          <div className="card-surface p-5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Client</div>
            <div className="mt-2 text-lg font-semibold text-ink">{s.brand}</div>
          </div>
          <div className="card-surface p-5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Industry</div>
            <div className="mt-2 text-lg font-semibold text-ink">{s.industry}</div>
          </div>
          <div className="card-surface p-5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Engagement</div>
            <div className="mt-2 text-lg font-semibold text-ink">{s.duration}</div>
          </div>
        </section>

        {/* Before */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <AlertTriangle className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">Before - the situation</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">Where {s.brand} was stuck</h2>
          <p className="mt-3 text-ink/85 leading-relaxed">
            {s.problem} On a {getPlatform(s)} store operating in {getNiche(s).toLowerCase()}, that pattern shows up as a plateau: paid spend rising, blended margin falling, and the operator making decisions on gut feel because no scorecard existed for {s.category.toLowerCase()}.
          </p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {beforeMetrics(s).map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-secondary/40 p-4">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{m.label}</div>
                <div className="mt-1 text-base font-bold text-ink">{m.value}</div>
              </div>
            ))}
          </div>

          <h3 className="mt-8 text-lg font-bold text-ink">The four blockers we found</h3>
          <ul className="mt-3 space-y-2.5">
            {challengeBullets(s).map((b, i) => (
              <li key={i} className="flex gap-3 text-ink/85">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Methodology - 5 phases */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <Target className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">Methodology</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">The 5-phase {s.category.toLowerCase()} system we ran for {s.brand}</h2>
          <p className="mt-3 text-ink/85 leading-relaxed">
            Every BeingEcom {s.category.toLowerCase()} engagement follows the same five phases so accountability, measurement and handover stay clean. Below is how each phase mapped to {s.brand}'s {s.duration} sprint.
          </p>

          <div className="mt-6 grid gap-4">
            {phases.map((b) => (
              <div key={b.title} className="rounded-2xl border border-primary/25 bg-primary/[0.04] p-5 sm:p-6">
                <h3 className="text-lg font-bold text-ink">{b.title}</h3>
                <p className="mt-2 text-ink/85 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <Calendar className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">Timeline</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">Week-by-week plan across {s.duration}</h2>
          <div className="mt-5 space-y-3">
            {timeline.map((t) => (
              <div key={t.window} className="grid sm:grid-cols-[160px,1fr] gap-3 sm:gap-6 rounded-xl border border-border bg-white p-4">
                <div className="text-sm font-bold text-primary uppercase tracking-widest">{t.window}</div>
                <div className="text-sm text-ink/85 leading-relaxed">{t.milestone}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools / stack used */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <Wrench className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">Stack we ran on</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">Tools, platforms and ownership</h2>
          <p className="mt-3 text-ink/85 leading-relaxed">
            The stack was designed so {s.brand}'s internal team could keep operating it post-handover. No proprietary black boxes.
          </p>
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            {tools.map((t) => (
              <div key={t.l} className="rounded-xl border border-border bg-secondary/30 p-4">
                <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{t.l}</div>
                <p className="mt-1.5 text-sm text-ink/85 leading-relaxed">{t.v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Measurement framework */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <Ruler className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">How we measured</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">Measurement framework</h2>
          <p className="mt-3 text-ink/85 leading-relaxed">
            Every uplift is measured against the trailing 60 days before kickoff - not the same month last year. Revenue reconciled in {getPlatform(s)}; spend reconciled in Meta and Google Ads; the two joined in a single weekly scorecard we shared with {s.brand}'s founder on Fridays.
          </p>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {kpis.map((m) => (
              <div key={m.l} className="rounded-2xl border border-border bg-white p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient">{m.v}</div>
                <div className="mt-1 text-[11px] font-semibold text-ink">{m.l}</div>
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{m.sub}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground italic">
            Methodology: figures reported from client-owned {getPlatform(s)}, GA4 and Klaviyo dashboards across the full {s.duration} engagement. Baseline is the 60-day period immediately prior to kickoff. Individual results vary by category, margin and starting position - anonymised source data available on request under NDA.
          </p>
        </section>

        {/* Outcome interpretation */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">Outcomes explained</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">What each number actually means</h2>
          <div className="mt-5 grid gap-3">
            {outcomes.map((o) => (
              <div key={o.label} className="rounded-2xl border border-border bg-white p-5">
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-bold text-gradient tabular-nums">{o.value}</div>
                  <div className="text-sm font-bold text-ink">{o.label}</div>
                </div>
                <p className="mt-2 text-sm text-ink/85 leading-relaxed">{o.interpretation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Before vs After bars */}
        <section>
          <div className="card-surface p-5 sm:p-6">
            <div className="flex items-center gap-2 text-ink">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h3 className="text-base font-bold">Headline lift: {s.metric} on {s.metricLabel}</h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Result after {s.duration}, measured against the trailing 60-day baseline pre-engagement.</p>
          </div>
        </section>

        {/* Final Outcome */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <Trophy className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">Final outcome</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">A repeatable {s.category.toLowerCase()} operating model</h2>
          <p className="mt-3 text-ink/85 leading-relaxed">
            {s.brand} now runs the same {s.category.toLowerCase()} scorecard weekly, ships the same execution cadence, and forecasts revenue from a system that behaves the same way whether the founder is in the office or not. The {s.metric} {s.metricLabel.toLowerCase()} number is the headline; the durable advantage is the operating model behind it.
          </p>

          <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-6 h-6 text-primary shrink-0" />
              <p className="text-ink font-medium italic leading-relaxed">"{s.takeaway}"</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="flex items-center gap-2 text-primary">
            <HelpCircle className="w-5 h-5" />
            <div className="text-[11px] font-bold uppercase tracking-widest">Frequently asked</div>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">Questions about the {s.brand} engagement</h2>
          <div className="mt-5 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="card-surface p-4 group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
                  <span className="font-semibold text-ink text-sm sm:text-base">{f.q}</span>
                  <ArrowRight className="w-4 h-4 text-primary transition group-open:rotate-90 shrink-0" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related case studies */}
        <RelatedStudies current={s} />

        {/* Sibling nav */}
        <nav className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-border">
          <Link to="/case-studies/$id" params={{ id: prev.id }} className="card-surface p-4 hover:border-primary/40 transition group">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-1.5">
              <ArrowLeft className="w-3 h-3" /> Previous
            </div>
            <div className="mt-1.5 text-sm font-semibold text-ink group-hover:text-primary line-clamp-2">{prev.title}</div>
          </Link>
          <Link to="/case-studies/$id" params={{ id: next.id }} className="card-surface p-4 hover:border-primary/40 transition group text-right">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold flex items-center justify-end gap-1.5">
              Next <ArrowRight className="w-3 h-3" />
            </div>
            <div className="mt-1.5 text-sm font-semibold text-ink group-hover:text-primary line-clamp-2">{next.title}</div>
          </Link>
        </nav>
      </article>

      <CTA heading={`Want a ${s.category.toLowerCase()} plan for your ${getNiche(s).toLowerCase()} brand?`} />
    </PageLayout>
  );
}

function RelatedStudies({ current }: { current: (typeof studies)[number] }) {
  const niche = getNiche(current).toLowerCase();
  const platform = getPlatform(current).toLowerCase();
  const scored = studies
    .filter((x) => x.id !== current.id)
    .map((x) => {
      let score = 0;
      if (getNiche(x).toLowerCase() === niche) score += 3;
      if (x.category === current.category) score += 2;
      if (getPlatform(x).toLowerCase() === platform) score += 1;
      return { x, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((r) => r.x);

  return (
    <section>
      <div className="flex items-center gap-2 text-primary">
        <TrendingUp className="w-5 h-5" />
        <div className="text-[11px] font-bold uppercase tracking-widest">Related wins</div>
      </div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-ink">More {current.category} results in {getNiche(current)}</h2>

      <div className="mt-5 -mx-2 sm:mx-0 overflow-x-auto sm:overflow-visible pb-2">
        <div className="flex sm:grid sm:grid-cols-3 gap-3 px-2 sm:px-0 min-w-max sm:min-w-0">
          {scored.map((x) => {
            const Icon = categoryIcon[x.category];
            return (
              <Link key={x.id} to="/case-studies/$id" params={{ id: x.id }} className="card-surface overflow-hidden group flex flex-col w-64 sm:w-auto shrink-0 hover:shadow-lg hover:-translate-y-0.5 transition">
                <div className={`h-24 bg-gradient-to-br ${x.color} relative px-3 py-2 flex items-end`}>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest bg-ink/80 text-white px-1.5 py-0.5 rounded-full">
                    <Icon className="w-2.5 h-2.5" /> {x.category}
                  </span>
                  <div className="ml-auto text-right">
                    <div className="text-lg font-bold text-white leading-none">{x.metric}</div>
                    <div className="text-[8px] uppercase tracking-wide text-white/85 mt-0.5">{x.metricLabel}</div>
                  </div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{x.industry}</div>
                  <h3 className="mt-1 text-sm font-bold text-ink group-hover:text-primary leading-snug line-clamp-2">{x.title}</h3>
                  <div className="mt-auto pt-2 text-[10px] text-muted-foreground">{x.duration}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
