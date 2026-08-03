import { createFileRoute, Link } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import { ORG_ID, ORG_INFO, SITE_URL } from "@/lib/seo";

const SLUG = "corrections";
const TITLE = "Corrections & Fact-Check Policy | BeingEcom";
const DESC = "How to report an error on BeingEcom.com, how fast we respond, how corrections are logged, and the public log of substantive changes we've made.";

type Correction = { date: string; page: string; to: string; what: string; how: string };

const LOG: Correction[] = [
  {
    date: "2026-08-03",
    page: "Sitewide organisation details",
    to: "/contact",
    what: "Legacy contact details and a non-GBP price reference persisted on some pages after our UK-only repositioning.",
    how: "Standardised every page on the London registered address, info@beingecom.com and GBP-only pricing; added automated checks so a non-GBP symbol fails review.",
  },
  {
    date: "2026-07-20",
    page: "Service pricing pages",
    to: "/pricing",
    what: "Entry pricing for paid media was inconsistent between the pricing page and individual service pages.",
    how: "Aligned all service pages to the £3,000/month minimum for paid media retainers and made pricing.ts the single source of truth.",
  },
  {
    date: "2026-07-06",
    page: "Industry and location pages",
    to: "/industries",
    what: "Several industry links pointed at slugs that no longer existed, producing 404s.",
    how: "Repointed the links to live pages and added permanent redirects for the retired slugs so external links still resolve.",
  },
];

const FAQS = [
  { q: "How do I report an error?", a: `Email ${ORG_INFO.email} with the subject 'Correction' and include the page URL, the specific claim you believe is wrong, and a source if you have one. A named person reviews every report.` },
  { q: "How quickly do you respond?", a: "We acknowledge within one UK business day. Factual errors that could mislead a reader are corrected within two business days. Everything else is corrected at the next scheduled review of that page." },
  { q: "Do you delete pages that turn out to be wrong?", a: "Rarely. We correct in place and note the change, because silently deleting a page hides the error. We only remove a page when it is wholly wrong and cannot be salvaged and even then the URL redirects rather than 404s." },
  { q: "What counts as a substantive correction?", a: "Any change to a statistic, a claim about how a platform behaves, a price, a client result, an attribution, or a recommendation. Typos, formatting and wording improvements are not logged." },
  { q: "Will you say publicly that you were wrong?", a: "Yes. Substantive corrections appear in the log on this page with the date, what was wrong and what we changed." },
  { q: "What if I disagree with a recommendation rather than a fact?", a: "Send it anyway. We won't log an opinion as a correction, but if your argument is better than ours we'll rewrite the page and credit the challenge." },
  { q: "Who is accountable for accuracy?", a: "The named author or reviewing service lead on each page, with the founder accountable overall. See our editorial policy for the full workflow." },
];

export const Route = createFileRoute("/company/corrections")({
  head: () =>
    companyHead({
      slug: SLUG,
      title: TITLE,
      description: DESC,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/company/corrections#corrections-policy`,
          name: "BeingEcom Corrections Policy",
          url: `${SITE_URL}/company/corrections`,
          about: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
        },
      ],
    }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Corrections and fact-check policy"
      eyebrow="Trust"
      lastUpdated="2026-08-03"
      intro="We publish a lot of numbers, and some of them will eventually be wrong platforms change, data ages, and people make mistakes. This page explains how to tell us, what we do about it, how fast, and what we've already corrected."
      aiSummary={
        <>
          To report an error on BeingEcom.com, email <strong>{ORG_INFO.email}</strong> with the subject "Correction", the page URL and the disputed claim. We acknowledge within one UK business day and fix misleading factual errors within two. Substantive corrections are logged publicly on this page. See also our{" "}
          <Link to="/company/editorial-policy" className="text-primary underline">editorial policy</Link> and{" "}
          <Link to="/company/review-methodology" className="text-primary underline">review methodology</Link>.
        </>
      }
      sections={[
        {
          type: "list",
          id: "report",
          heading: "How to report something we've got wrong",
          intro: `Email ${ORG_INFO.email} with the subject line "Correction". Include as much of this as you can:`,
          items: [
            "The exact URL of the page.",
            "The specific sentence or figure you believe is wrong quote it if you can.",
            "Why you think it's wrong, and a source if you have one.",
            "Whether you'd like to be credited if the correction is published.",
            "A reply address a named person will respond, not an autoresponder.",
          ],
        },
        {
          type: "table",
          id: "response",
          heading: "What happens next, and how fast",
          intro: "Our commitments once a report lands. UK business days, Monday to Friday.",
          columns: ["Severity", "Example", "Our response time"],
          rows: [
            ["Misleading factual error", "A wrong statistic, price, or claim about how a platform works", "Acknowledged in 1 day, corrected within 2 days, logged publicly"],
            ["Outdated but not misleading", "A platform feature renamed since we published", "Corrected at the next scheduled review, within 90 days"],
            ["Attribution or credit issue", "A source, study or contributor not properly credited", "Acknowledged in 1 day, corrected within 2 days"],
            ["Client data dispute", "A client disputes how their result is described", "Page unpublished within 1 day pending review, then corrected or removed"],
            ["Disagreement on judgement", "You think our recommendation is wrong", "Reviewed by the service lead; rewritten if your case is stronger, answered either way"],
            ["Typo or formatting", "Spelling, spacing, broken layout", "Fixed on the next deploy, not logged"],
          ],
        },
        {
          type: "custom",
          id: "log",
          heading: "Public corrections log",
          render: () => (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground max-w-3xl">
                Every substantive correction we've made, newest first. Typos and wording changes are excluded see the policy above for what counts.
              </p>
              <ol className="space-y-4">
                {LOG.map((c) => (
                  <li key={c.date + c.page} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <time dateTime={c.date} className="text-[11px] font-bold uppercase tracking-widest text-primary">{c.date}</time>
                      <Link to={c.to} className="text-sm font-semibold text-ink underline decoration-border underline-offset-4 hover:text-primary">
                        {c.page}
                      </Link>
                    </div>
                    <p className="mt-2 text-sm text-foreground/85"><strong>What was wrong:</strong> {c.what}</p>
                    <p className="mt-1.5 text-sm text-foreground/85"><strong>What we changed:</strong> {c.how}</p>
                  </li>
                ))}
              </ol>
            </div>
          ),
        },
        {
          type: "list",
          id: "principles",
          heading: "The principles behind this policy",
          intro: "Why we correct in public rather than quietly editing pages.",
          items: [
            "Correct in place, don't delete. A retracted claim you can still see is more trustworthy than a page that vanished.",
            "Date the change. Readers should be able to tell what a page said when they last read it.",
            "Name the mistake plainly. No 'clarifications' that are really corrections in disguise.",
            "Fix the category, not just the instance. If one page had a wrong figure, we check every page using that figure.",
            "Credit the reporter when they want it including competitors.",
            "Escalate client-data disputes immediately: unpublish first, review second.",
          ],
        },
        {
          type: "cards",
          id: "related-trust",
          heading: "Related trust documentation",
          items: [
            { title: "Editorial policy", body: "Who writes here, how content is reviewed, and how we use AI.", to: "/company/editorial-policy" },
            { title: "Review methodology", body: "Test setup, sample thresholds and the scoring model behind our recommendations.", to: "/company/review-methodology" },
            { title: "Contact us", body: "Every way to reach a real person at BeingEcom.", to: "/contact" },
            { title: "Meet the founder", body: "Who is ultimately accountable for what's published here.", to: "/about/tahir-abbas" },
            { title: "Legal & policies", body: "Privacy, terms, cookies, GDPR, accessibility and disclaimer.", to: "/company/legal" },
            { title: "Reviews", body: "What clients say, and how we handle critical feedback.", to: "/company/reviews" },
          ],
        },
      ]}
      faqs={FAQS}
    />
  ),
});
