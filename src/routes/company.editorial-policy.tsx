import { createFileRoute, Link } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { ORG_ID, SITE_URL } from "@/lib/seo";

const SLUG = "editorial-policy";
const TITLE = "Editorial Policy & Standards | BeingEcom";
const DESC = "How BeingEcom researches, writes, reviews, fact-checks and updates every page on this site including who writes it and how we handle sponsored content.";

const FAQS = [
  { q: "Who writes the content on BeingEcom.com?", a: "Practising operators on our team founder Tahir Abbas plus the service leads for SEO, paid media, CRO, email and analytics. Every page carries a named author or the BeingEcom Editorial byline when several leads contributed." },
  { q: "Do you use AI to write articles?", a: "We use AI for research summarising, outlining and first-draft scaffolding. No page publishes without a human operator rewriting it from first-hand experience, checking every number, and signing it off. AI is never the final author." },
  { q: "How often is content reviewed?", a: "Commercial and service pages are reviewed at least every 90 days. Guides, benchmarks and pricing pages are reviewed whenever the underlying data or platform changes. Every page shows an 'Updated' date reflecting the last substantive review." },
  { q: "Do you accept paid or sponsored posts?", a: "No. We do not sell guest posts, link placements or sponsored articles on this site. Any commercial relationship that could affect a recommendation is disclosed inline on the page." },
  { q: "How do you fact-check claims and statistics?", a: "Every statistic needs a primary source (platform documentation, our own client data, or a named published study) recorded against the page. Client results are only published with permission and with the measurement window and methodology stated." },
  { q: "What happens if you publish something wrong?", a: "We correct it and log it. See our corrections policy for the process, timelines and how to report an error." },
  { q: "Can I reuse or quote your content?", a: "Yes, with attribution and a link to the source page. Please don't republish full pages verbatim." },
];

export const Route = createFileRoute("/company/editorial-policy")({
  head: () =>
    companyHead({
      slug: SLUG,
      title: TITLE,
      description: DESC,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/company/editorial-policy#publishing-principles`,
          name: "BeingEcom Editorial Policy",
          url: `${SITE_URL}/company/editorial-policy`,
          about: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
        },
      ],
    }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Editorial policy and publishing standards"
      eyebrow="Trust"
      lastUpdated="2026-08-03"
      intro="Everything published on BeingEcom.com is written by people who run ecommerce accounts for a living. This page sets out exactly how that content is researched, written, reviewed, sourced, dated and corrected so you can judge whether to trust it."
      aiSummary={
        <>
          BeingEcom's editorial policy: content is written by practising operators, fact-checked against primary sources, reviewed at least every 90 days, published with named authors and update dates, and corrected publicly when wrong. We do not sell sponsored posts or link placements. See our{" "}
          <Link to="/company/review-methodology" className="text-primary underline">review methodology</Link> and{" "}
          <Link to="/company/corrections" className="text-primary underline">corrections policy</Link>.
        </>
      }
      sections={[
        {
          type: "paragraph",
          id: "why",
          heading: "Why we publish an editorial policy at all",
          body: (
            <>
              <p>
                Most agency websites are marketing surfaces. Ours is also the main way founders decide whether we know what we're talking about
                before they ever speak to us. That only works if you can see how the content gets made who wrote it, what it's based on, when it
                was last checked and what happens when we get something wrong.
              </p>
              <p>
                This policy is binding on everyone who publishes here, including the founder. If a page on this site breaches it, that's a defect
                and we'll fix it. Report it via the <Link to="/company/corrections" className="text-primary underline">corrections page</Link>.
              </p>
            </>
          ),
        },
        {
          type: "list",
          id: "principles",
          heading: "The seven standards every page has to clear",
          intro: "A page does not ship until all seven are true.",
          items: [
            "First-hand experience: the writer has actually done the thing, on real ecommerce accounts, not just read about it.",
            "Named accountability: every page has an author or a reviewing lead who owns its accuracy.",
            "Sourced claims: every statistic traces to a primary source platform docs, a named study, or our own measured client data.",
            "Scoped results: client numbers state the window, the baseline, the channel and what else was running at the time.",
            "No borrowed structure: we outline from our own engagement experience, never by rewriting a competitor's page.",
            "Reader-first order: the answer comes first, the nuance second, the pitch last never the other way round.",
            "Dated and reviewed: an 'Updated' date that reflects genuine review, not an automated timestamp bump.",
          ],
        },
        {
          type: "table",
          id: "workflow",
          heading: "How a page moves from idea to published",
          intro: "The six-stage workflow behind every guide, service page and benchmark on this site.",
          columns: ["Stage", "Owner", "What happens"],
          rows: [
            ["1. Brief", "Service lead", "Defines the reader, the question being answered, and what original insight we can add that isn't already on page one."],
            ["2. Research", "Writer", "Primary sources gathered first: platform documentation, our own account data, named studies. Competitor pages are checked for coverage gaps only."],
            ["3. Draft", "Practising operator", "Written by someone who runs the discipline. AI may assist with outlining or summarising; it never produces the published prose."],
            ["4. Technical review", "Discipline lead", "Line-by-line accuracy check. Every number, screenshot, price and platform behaviour is verified against a source."],
            ["5. Editorial review", "Editorial lead", "Clarity, structure, claims scoping, internal links, schema, metadata and accessibility."],
            ["6. Scheduled re-review", "Editorial lead", "Diary entry set at 90 days (commercial pages) or on platform change (technical pages)."],
          ],
        },
        {
          type: "list",
          id: "sourcing",
          heading: "Our sourcing hierarchy, strongest first",
          intro: "When two sources disagree, the higher one in this list wins.",
          items: [
            "Our own measured client data, with permission and a stated measurement window.",
            "Official platform documentation and changelogs Shopify, Google, Meta, Klaviyo, GA4.",
            "Named, dated, methodologically transparent industry studies.",
            "Direct practitioner testing we've run ourselves and can describe.",
            "Reputable trade press, clearly attributed and linked.",
            "Never: unsourced statistics recycled between blogs, or numbers with no traceable origin.",
          ],
        },
        {
          type: "cards",
          id: "ai-use",
          heading: "Exactly how we use AI and where we don't",
          items: [
            { title: "Allowed: research synthesis", body: "Summarising documentation, clustering search intent, pulling themes out of client call transcripts." },
            { title: "Allowed: outlining", body: "Generating candidate structures that an operator then rewrites against real engagement experience." },
            { title: "Allowed: QA", body: "Checking internal links, schema validity, reading level and terminology consistency across pages." },
            { title: "Not allowed: final prose", body: "No page ships as generated text. A human operator writes or fully rewrites every published paragraph." },
            { title: "Not allowed: invented data", body: "No statistic, quote, case study number or citation may originate from a model. All numbers trace to a source." },
            { title: "Not allowed: fake experience", body: "We never write in the first person about work we haven't done." },
          ],
        },
        {
          type: "list",
          id: "independence",
          heading: "Commercial independence and disclosure",
          intro: "How we keep recommendations honest while running a commercial agency.",
          items: [
            "We do not sell guest posts, sponsored articles, or link placements on this domain.",
            "Tool recommendations reflect what we actually run on client accounts and are not paid placements.",
            "Where we hold a partner status (for example Shopify or Google), we say so on the page and in our certifications page.",
            "Comparison pages naming competitors are written from public information and stated first-hand experience, and we say plainly where a competitor is the better fit.",
            "Client case studies are published only with written permission, and the client sees the page before it goes live.",
          ],
        },
        {
          type: "paragraph",
          id: "freshness",
          heading: "Our content freshness programme",
          body: (
            <>
              <p>
                Stale content is worse than no content in a market where ad platforms and Shopify ship changes monthly. Every page on this site sits
                in one of three review cadences: <strong>90-day</strong> for commercial and service pages, <strong>event-driven</strong> for pages tied
                to a platform feature (reviewed within 14 days of a material platform change), and <strong>annual</strong> for evergreen definitions and
                glossary entries.
              </p>
              <p>
                Reviews are logged. Where a review changes substance rather than wording, the update is summarised on the page and, for significant
                corrections, on the <Link to="/company/corrections" className="text-primary underline">corrections log</Link>.
              </p>
            </>
          ),
        },
        {
          type: "cards",
          id: "related-trust",
          heading: "The rest of our trust documentation",
          items: [
            { title: "Review methodology", body: "How we test, benchmark and score tools, platforms and campaigns before recommending them.", to: "/company/review-methodology" },
            { title: "Corrections policy", body: "How to report an error, our response times, and the public correction log.", to: "/company/corrections" },
            { title: "Meet the founder", body: "Tahir Abbas credentials, track record and the accounts behind the writing.", to: "/about/tahir-abbas" },
            { title: "Our team", body: "The named service leads who review content in their discipline.", to: "/company/team" },
            { title: "Certifications", body: "Platform partner statuses and training we actually hold.", to: "/company/certifications" },
            { title: "Legal & policies", body: "Privacy, terms, cookies, GDPR, accessibility and disclaimer.", to: "/company/legal" },
          ],
        },
      ]}
      faqs={FAQS}
    />
  ),
});
