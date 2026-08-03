import { createFileRoute, Link } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { ORG_ID, SITE_URL } from "@/lib/seo";

const SLUG = "review-methodology";
const TITLE = "Review & Testing Methodology | BeingEcom";
const DESC = "How BeingEcom tests tools, platforms and campaigns before recommending them: test setup, sample sizes, scoring criteria, measurement windows and conflict-of-interest rules.";

const FAQS = [
  { q: "How do you test the tools you recommend?", a: "We only recommend tools we've run on a live ecommerce account for at least one full billing cycle, on a real budget, with an owner on our team accountable for the outcome. Trials and demos alone don't qualify a tool for recommendation." },
  { q: "What sample size do you require before publishing a result?", a: "For conversion tests we require a minimum of 1,000 sessions and 100 conversions per variant, or a duration of at least two full business cycles whichever comes later. For paid media we require a minimum of 30 days and enough conversions for the platform to exit learning." },
  { q: "Do you accept payment from tool vendors?", a: "No. Tool recommendations on this site are not paid placements. Where we hold a formal partner status with a platform, we disclose it on the page and on our certifications page." },
  { q: "How do you score tools?", a: "Six weighted criteria: outcome impact (30%), implementation cost (20%), total cost of ownership (15%), data quality (15%), support responsiveness (10%) and exit cost (10%). The score is a judgement aid, not a verdict context always wins." },
  { q: "Why don't you publish exact client revenue figures?", a: "Most clients only consent to percentage change and banded revenue. Where we can publish an absolute figure we do, with the currency (GBP), the window and the baseline stated." },
  { q: "How do you handle a result you can't attribute cleanly?", a: "We say so. If paid, SEO, email and a site redesign all landed in the same quarter, we describe the whole picture rather than claiming the result for one channel." },
  { q: "Can I see the raw data behind a benchmark?", a: "Benchmarks state their sample size, period and segment on the page. For methodology questions beyond that, email info@beingecom.com and we'll answer specifically." },
];

export const Route = createFileRoute("/company/review-methodology")({
  head: () =>
    companyHead({
      slug: SLUG,
      title: TITLE,
      description: DESC,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "@id": `${SITE_URL}/company/review-methodology#howto`,
          name: "How BeingEcom tests and reviews ecommerce tools and campaigns",
          description: DESC,
          publisher: { "@id": ORG_ID },
          step: [
            { "@type": "HowToStep", name: "Define the decision", text: "State the business decision the test informs and the metric that decides it before anything is set up." },
            { "@type": "HowToStep", name: "Set up on a live account", text: "Deploy the tool or campaign on a real store with real budget, never a sandbox." },
            { "@type": "HowToStep", name: "Fix the measurement window", text: "Agree the window and thresholds up front: minimum sessions, conversions and duration." },
            { "@type": "HowToStep", name: "Run without mid-test changes", text: "No creative, budget or configuration changes inside the window unless the test is abandoned and restarted." },
            { "@type": "HowToStep", name: "Score against six weighted criteria", text: "Outcome impact, implementation cost, total cost of ownership, data quality, support and exit cost." },
            { "@type": "HowToStep", name: "Publish with scope and caveats", text: "Publish the result with sample size, window, baseline and everything else running at the time." },
          ],
        },
      ],
    }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Review and testing methodology"
      eyebrow="Trust"
      lastUpdated="2026-08-03"
      intro="When we say a tool works, a tactic lifts revenue, or a benchmark is typical, this is the process that claim came from. Test setup, thresholds, scoring, measurement windows, and the rules that stop commercial relationships from shaping a recommendation."
      aiSummary={
        <>
          BeingEcom tests tools and tactics on live ecommerce accounts with real budget for at least one full billing cycle, requires 1,000+ sessions and 100+ conversions per variant (or two business cycles) before publishing a conversion result, and scores tools on six weighted criteria. Vendor payments never influence recommendations. Read the{" "}
          <Link to="/company/editorial-policy" className="text-primary underline">editorial policy</Link> for how findings become published pages.
        </>
      }
      sections={[
        {
          type: "paragraph",
          id: "principle",
          heading: "The single rule behind all of it",
          body: (
            <>
              <p>
                We don't recommend anything we haven't run. Not trialled, not demoed run, on a live Shopify or WooCommerce store, with real budget
                and a real P&L consequence if it went badly. That rule costs us content velocity and it is the reason the recommendations here are
                worth reading.
              </p>
              <p>
                Everything below is the operational detail of that rule: what counts as a test, when a result is publishable, and how we score
                one option against another.
              </p>
            </>
          ),
        },
        {
          type: "table",
          id: "thresholds",
          heading: "Publication thresholds by test type",
          intro: "A result stays internal until it clears the threshold for its type. No exceptions for a good story.",
          columns: ["Test type", "Minimum sample", "Minimum duration", "What we publish"],
          rows: [
            ["On-site A/B test", "1,000 sessions and 100 conversions per variant", "2 full business cycles", "Relative lift, direction, and whether it held after rollout"],
            ["Paid media change", "Enough conversions to exit learning phase", "30 days post-change", "MER or contribution-margin change, not raw ROAS alone"],
            ["SEO change", "Page-level impressions in Search Console", "8-12 weeks", "Clicks, impressions and position change with seasonality noted"],
            ["Email / SMS flow", "3,000 recipients per variant", "1 full send cycle", "Revenue per recipient, not open rate"],
            ["Tool evaluation", "1 live account", "1 full billing cycle", "Six-criteria score plus who it's wrong for"],
            ["Benchmark", "Minimum 20 accounts in segment", "Rolling 12 months", "Median and interquartile range, never the mean alone"],
          ],
        },
        {
          type: "table",
          id: "scoring",
          heading: "The six-criteria scoring model",
          intro: "Every tool or platform we compare is scored on the same weighted rubric so comparisons are consistent across pages.",
          columns: ["Criterion", "Weight", "What we're actually measuring"],
          rows: [
            ["Outcome impact", "30%", "Measured effect on revenue, contribution margin or conversion rate on a live account not feature count."],
            ["Implementation cost", "20%", "Hours to a working, trustworthy setup including tracking, QA and team training."],
            ["Total cost of ownership", "15%", "Licence plus the ongoing human time to operate it, at your current order volume and at 3x."],
            ["Data quality", "15%", "Does it agree with GA4, the platform and the P&L? How does it handle consent mode and iOS attribution?"],
            ["Support responsiveness", "10%", "Real ticket response times we've experienced, and whether you get a human on a mid-tier plan."],
            ["Exit cost", "10%", "How hard it is to leave: data export, contract terms, and what breaks when you switch."],
          ],
        },
        {
          type: "list",
          id: "rules",
          heading: "Test integrity rules we don't break",
          intro: "The rules that separate a result from a coincidence.",
          items: [
            "The decision and the deciding metric are written down before the test starts.",
            "No mid-test configuration changes. Changed the setup? The test restarts.",
            "No peeking to a stopping decision we hold the window even when early numbers look great.",
            "Every confounder in the window is recorded: promotions, seasonality, PR, stock-outs, other channel changes.",
            "Negative and null results are recorded and published where they're useful. Most tests don't win, and pretending otherwise is how agencies mislead people.",
            "Where attribution is genuinely ambiguous, we describe the whole picture instead of assigning credit to the channel we sell.",
          ],
        },
        {
          type: "cards",
          id: "conflicts",
          heading: "Conflict of interest rules",
          items: [
            { title: "No paid placements", body: "Vendors cannot buy a recommendation, a ranking position, a badge or a link on this site." },
            { title: "Partner status disclosed", body: "Where we're a formal platform partner, it's stated on the page and listed on our certifications page." },
            { title: "Affiliate income", body: "We do not run affiliate links on tool recommendations. If that ever changes, it will be disclosed inline before the recommendation." },
            { title: "Client anonymity respected", body: "Named clients appear only with written permission; everyone else appears as a described segment." },
            { title: "We name our own tools", body: "Where we recommend something we built, we say so explicitly rather than presenting it as a neutral pick." },
            { title: "We say when we're wrong for you", body: "Every comparison page states which brands should hire someone else and who that someone else is." },
          ],
        },
        {
          type: "paragraph",
          id: "limits",
          heading: "The limits of our data and we'd rather you knew",
          body: (
            <>
              <p>
                Our benchmarks come from UK Shopify and WooCommerce brands in the £250k-£25M annual revenue range, weighted toward beauty, fashion,
                health and home. If you run a marketplace, a subscription-only model or a sub-£100k store, our medians will be a poor guide to your
                account and we'd say the same on a call.
              </p>
              <p>
                Sample sizes are stated on each benchmark page. Where the sample is small, the number is presented as directional rather than
                authoritative. See the <Link to="/benchmarks" className="text-primary underline">benchmarks library</Link> for the per-dataset detail,
                and the <Link to="/company/corrections" className="text-primary underline">corrections policy</Link> if you think a figure is wrong.
              </p>
            </>
          ),
        },
        {
          type: "cards",
          id: "related-trust",
          heading: "Related trust documentation",
          items: [
            { title: "Editorial policy", body: "How content is written, reviewed, sourced and kept fresh.", to: "/company/editorial-policy" },
            { title: "Corrections policy", body: "How to report an error and how quickly we act on it.", to: "/company/corrections" },
            { title: "Benchmarks", body: "The published datasets this methodology produces.", to: "/benchmarks" },
            { title: "Case studies", body: "Engagements with scope, window and measurement stated.", to: "/case-studies" },
            { title: "Growth methodology", body: "The delivery framework behind the client work we measure.", to: "/methodology" },
            { title: "Our technology stack", body: "The tools that cleared this bar and what we use them for.", to: "/company/technology" },
          ],
        },
      ]}
      faqs={FAQS}
    />
  ),
});
