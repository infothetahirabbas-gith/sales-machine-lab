import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { SITE_URL, professionalServiceJsonLd } from "@/lib/seo";
import { SITE_STATS } from "@/lib/stats";

const SLUG = "why-us";
const TITLE = "Why Choose BeingEcom — 8 Reasons | UK Ecommerce Agency";
const DESC = "Eight concrete reasons founders pick BeingEcom over other agencies, freelancers and in-house teams — senior operators, revenue-first plans, and honest reporting.";

const orgLd = professionalServiceJsonLd();

export const Route = createFileRoute("/company/why-us")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC, jsonLd: [orgLd] }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Why choose BeingEcom"
      eyebrow="Why us"
      intro="You have real options — agencies, freelancers, in-house hires, growth communities. Here's what you actually get with BeingEcom, and where we're not the right fit."
      extraJsonLd={[orgLd]}
      sections={[
        {
          type: "cards",
          id: "advantages",
          heading: "Eight reasons brands pick us",
          items: [
            { title: "Ecommerce-only", body: "We only serve Shopify and WooCommerce brands. No SaaS side-projects, no lead-gen distractions." },
            { title: "Senior-only pods", body: "Every discipline on your account is led by someone who has actually scaled a store — no juniors put on the P&L." },
            { title: "Revenue-first plans", body: "Every task ties to a specific P&L line. If we can't defend the revenue link, we don't ship it." },
            { title: "Honest reporting", body: "Losses are named. Wins are attributed to their real cause. You get raw data access, not a curated dashboard." },
            { title: "AI as leverage", body: "Internal automations for reporting, creative, and research — so our operators spend time on judgement, not repetition." },
            { title: "One accountable pod", body: "No shifting cast of account managers. Same team from kickoff to quarterly review." },
            { title: "Weekly execution", body: "We don't run monthly-only accounts. Weekly ship review is non-negotiable." },
            { title: "90-day fixed then flexible", body: "A defined 90-day engagement then month-to-month. No 12-month lock-in." },
          ],
        },
        {
          type: "table",
          id: "vs",
          heading: "BeingEcom vs a typical agency",
          intro: "Side by side, honestly.",
          columns: ["Dimension", "Typical agency", "BeingEcom"],
          rows: [
            ["Who's on your account", "AM + juniors, seniors on pitch calls only", "Senior operators end to end"],
            ["Category focus", "Everyone welcome", "Shopify & WooCommerce, 12 verticals"],
            ["Reporting", "Dashboard behind a login", "Weekly scorecard tied to your P&L + raw data access"],
            ["Contract", "12-month minimum", "90-day fixed, then month-to-month"],
            ["Measurement", "Platform ROAS", "MER, contribution margin, LTV"],
            ["Experiment rigour", "A/B when convenient", "Hypothesis, sample size, guardrails"],
            ["Wins vs losses", "Only wins reported", "Both reported with attribution"],
            ["AI", "Marketing buzzword", "Auditable internal automations"],
          ],
        },
        {
          type: "custom",
          id: "proof",
          heading: "Numbers we can back up",
          render: () => (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.values(SITE_STATS).map((s) => (
                <div key={s.l} className="card-surface rounded-2xl p-5 text-center">
                  <div className="text-3xl font-bold text-primary">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          ),
        },
        {
          type: "list",
          id: "not-fit",
          heading: "When we're not the right fit",
          items: [
            "You want a low-cost freelancer replacement — our senior-only model is priced accordingly.",
            "You don't have the ops capacity to ship the changes we recommend.",
            "You want opaque black-box reporting — we insist on raw data access.",
            "Your product is outside ecommerce (SaaS, lead-gen, marketplaces).",
            "You need a 12-month lock-in — we don't offer them.",
          ],
        },
      ]}
      faqs={[
        { q: "What makes BeingEcom different from other agencies?", a: "Three things: we're ecommerce-only, we're senior-only, and we tie every deliverable to a P&L line. Most agencies do at most one of those." },
        { q: "How do I know your claims are real?", a: "We publish anonymised case studies with real scope and numbers, and we're happy to backchannel-reference with previous clients on request during discovery." },
        { q: "Are you more expensive than a freelancer?", a: "Per hour, yes — because you're getting senior operators. Per outcome, usually less, because you're not paying to train someone on your account or to redo work that shipped wrong." },
        { q: "What's your typical engagement length?", a: "90-day fixed to install the plan and land initial wins, then month-to-month. Most brands stay 12–24 months voluntarily; we don't hold anyone in a contract." },
        { q: "Do you replace or augment an in-house team?", a: "Either. We can be the full growth stack for a lean brand or the senior strategy layer over an existing in-house executor." },
      ]}
    />
  ),
});
