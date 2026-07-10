import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { ORG_INFO, SITE_URL, articleJsonLd } from "@/lib/seo";

const SLUG = "methodology";
const TITLE = "Our Growth Methodology — 13 Phases | BeingEcom";
const DESC = "The 13-phase ecommerce growth methodology BeingEcom uses on every Shopify and WooCommerce engagement — from discovery through continuous optimisation.";
const URL = `${SITE_URL}/company/methodology`;

const articleLd = articleJsonLd({
  url: URL,
  headline: "The BeingEcom 13-Phase Ecommerce Growth Methodology",
  description: DESC,
  about: "Ecommerce growth framework",
});

export const Route = createFileRoute("/company/methodology")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC, ogType: "article", jsonLd: [articleLd] }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="The BeingEcom Growth Methodology"
      eyebrow="Methodology"
      intro={`Every engagement — Shopify or WooCommerce, £30k/month or £3M/month — moves through the same 13 phases. It's the framework ${ORG_INFO.name} uses to make growth deliberate, measurable and repeatable.`}
      readingTime="11 min read"
      author="Tahir Abbas"
      extraJsonLd={[articleLd]}
      sections={[
        {
          type: "paragraph",
          id: "why",
          heading: "Why a fixed methodology",
          body: (
            <p>
              Ad-hoc growth work rewards whoever shouts loudest that quarter. A fixed methodology forces the plan to start from the P&L,
              routes work through the same review gates, and makes it possible to compare wins and losses across accounts. Every phase below
              has a defined input, output, owner and success criterion — nothing is left to interpretation.
            </p>
          ),
        },
        {
          type: "table",
          id: "framework",
          heading: "The 13-phase framework",
          columns: ["#", "Phase", "Output", "Typical duration"],
          rows: [
            ["01", "Discovery",              "Current-state summary, primary bottlenecks, growth thesis.", "Week 1"],
            ["02", "Business audit",         "Unit economics, contribution margin, cohort behaviour.",     "Week 1–2"],
            ["03", "Market research",        "Category demand map, competitor positioning, SERP shape.",   "Week 2"],
            ["04", "Technical SEO",          "Crawl, index and Core Web Vitals baseline + fix list.",      "Week 2–3"],
            ["05", "On-page SEO",            "Template and content rewrite plan, entity model.",           "Week 3–5"],
            ["06", "Content strategy",       "Topical map, brief pipeline, editorial calendar.",           "Week 3–6"],
            ["07", "Paid advertising",       "Channel mix, creative pipeline, MER + CM3 targets.",         "Week 3+"],
            ["08", "Conversion optimisation","Experiment backlog, sample-size plan, guardrails.",          "Week 4+"],
            ["09", "Email & retention",      "Klaviyo flow map, list hygiene, LTV programme.",             "Week 4+"],
            ["10", "AI automation",          "Internal automations for reporting + creative + research.", "Week 5+"],
            ["11", "Reporting",              "Weekly scorecard tied to P&L, monthly written narrative.",   "Ongoing"],
            ["12", "Continuous optimisation","Rolling 30-day backlog, weekly ship review.",                "Ongoing"],
            ["13", "Growth roadmap",         "Quarterly roadmap and priorities re-cut every 90 days.",     "Quarterly"],
          ],
        },
        {
          type: "cards",
          id: "phase-detail",
          heading: "How each phase runs",
          items: [
            { title: "01 · Discovery",             body: "Structured interviews with founder + heads of marketing/ops. We surface the constraint that's really limiting growth, not just the loudest complaint." },
            { title: "02 · Business audit",        body: "Blended MER, contribution margin, cohort retention, product-level P&L. We refuse to plan against blended ROAS alone." },
            { title: "03 · Market research",       body: "Category demand, SERP composition, competitor spend, positioning matrix. Anchors every downstream channel plan." },
            { title: "04 · Technical SEO",         body: "Screaming Frog crawl, Search Console + GSC review, Core Web Vitals, robots, sitemap, structured data. Fix list is scored by traffic delta." },
            { title: "05 · On-page SEO",           body: "Template rewrites for PDPs/PLPs, entity model, internal linking, content briefs. Ships in batches; measured by cluster-level impressions." },
            { title: "06 · Content strategy",      body: "Topical map, brief pipeline, editorial calendar, information gain review. Each piece has an owner, a target keyword cluster and a distribution plan." },
            { title: "07 · Paid advertising",      body: "Channel mix by margin contribution, creative velocity plan, structured account rebuild if warranted. Targets set on MER and CM3 — not platform ROAS.", to: "/services/performance-marketing" },
            { title: "08 · CRO",                   body: "Experiment backlog scored by ICE, sample size pre-calculated, guardrail metrics agreed. Losses are shipped as learnings, not hidden." },
            { title: "09 · Email & retention",     body: "Klaviyo flow map, welcome/abandon/win-back rebuilds, segmentation by profitability. LTV as the north star." },
            { title: "10 · AI automation",         body: "Internal automations that free operator time — reporting, keyword clustering, creative variant generation, forecast modelling. Never opaque." },
            { title: "11 · Reporting",             body: "Weekly scorecard mapped to the client's P&L. Monthly narrative in plain English. Full data access, never gated behind a dashboard login." },
            { title: "12 · Continuous optimisation", body: "Rolling 30-day backlog, weekly ship review with the client, priorities re-scored monthly." },
            { title: "13 · Growth roadmap",        body: "Every 90 days we re-cut the roadmap against actual results. Old assumptions get killed; new ones are named." },
          ],
        },
        {
          type: "list",
          id: "principles",
          heading: "Operating principles",
          items: [
            "If a task can't be tied to a P&L line, it doesn't ship.",
            "Every experiment has a hypothesis, a sample-size plan, and a guardrail metric.",
            "Reports name losses; wins are attributed to the real cause.",
            "Weekly ritual is non-negotiable — no monthly-only accounts.",
            "AI accelerates the work; it doesn't replace judgement.",
          ],
        },
      ]}
      faqs={[
        { q: "Do you use the same methodology on every client?", a: "Yes — the 13 phases are constant, but the depth of each phase flexes to the client's stage and constraints. A £3M/month brand and a £30k/month brand hit the same gates, just at different scale." },
        { q: "How long before the methodology produces results?", a: "CRO and email lift usually shows in 2–4 weeks. Paid media stabilises in 30–60 days. SEO compounds over 3–6 months. We stage the plan so early wins fund the longer horizon work." },
        { q: "Can you run just part of the methodology?", a: "Yes. Common starts are (a) audit + technical SEO + on-page SEO or (b) paid + CRO. We only recommend the full 13 phases when your team has the capacity to execute against the full plan." },
        { q: "Do you share the actual methodology playbook?", a: "Clients get the full playbook, including SOPs, templates and internal checklists, on day one. It's part of what you're paying for." },
        { q: "How is progress measured?", a: "Weekly scorecard against the client's P&L, monthly written narrative, quarterly roadmap review. All three tie back to the same north-star metric agreed in phase 01." },
      ]}
    />
  ),
});
