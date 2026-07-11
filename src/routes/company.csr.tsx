import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";
import CsrPartnerForm from "@/components/site/CsrPartnerForm";
import { SITE_URL, ORG_INFO } from "@/lib/seo";

const SLUG = "csr";
const TITLE = "Corporate Social Responsibility (CSR) — BeingEcom's Commitments & Annual Scorecard";
const DESC = "How BeingEcom gives back: pro-bono work, education, diversity & inclusion, sustainability, ethical marketing, mentorship, charitable giving — plus a downloadable CSR scorecard and a partnership request form.";
const SCORECARD_URL = `${SITE_URL}/downloads/beingecom-csr-scorecard.pdf`;

const scorecardJsonLd = {
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  name: "BeingEcom Annual CSR Scorecard",
  description: "BeingEcom's plain-English annual CSR scorecard — commitments, metrics and delivery across pro-bono work, giving, diversity, sustainability and ethical marketing.",
  url: `${SITE_URL}/company/csr#scorecard`,
  encodingFormat: "application/pdf",
  contentUrl: SCORECARD_URL,
  inLanguage: "en-GB",
  isAccessibleForFree: true,
  author: { "@type": "Organization", name: ORG_INFO.name, url: SITE_URL },
  publisher: { "@type": "Organization", name: ORG_INFO.name, url: SITE_URL },
};

export const Route = createFileRoute("/company/csr")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC, jsonLd: [scorecardJsonLd] }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Corporate social responsibility"
      eyebrow="CSR"
      intro="BeingEcom is a small, profitable agency — and we believe that comes with a responsibility. This page is the honest record of how we give time, expertise and money back to the ecommerce community, our team, our planet and the causes we care about."
      sections={[
        {
          type: "custom",
          id: "download-scorecard",
          heading: "Download our annual CSR scorecard",
          render: () => (
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-5 items-stretch">
              <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 md:p-8">
                <div className="text-[11px] font-bold uppercase tracking-widest text-primary">PDF · Free · No email required</div>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold text-ink">BeingEcom Annual CSR Scorecard</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  A 3-page plain-English report: our four CSR pillars, the annual scorecard (commitment vs. delivered), the categories we decline to work with, the causes we support, and where we fell short this year. Updated once a year. This edition replaces the previous one — no hidden archive.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href="/downloads/beingecom-csr-scorecard.pdf"
                    download
                    className="btn btn-primary btn-shimmer"
                    aria-label="Download the BeingEcom CSR scorecard as a PDF"
                  >
                    ↓ Download PDF (A4, ~50 KB)
                  </a>
                  <a
                    href="/downloads/beingecom-csr-scorecard.pdf"
                    target="_blank"
                    rel="noopener"
                    className="btn btn-ghost"
                  >
                    Open in a new tab
                  </a>
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">Latest edition — reviewed annually by BeingEcom leadership.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary">What's inside</h4>
                <ul className="mt-3 space-y-2 text-sm text-ink/85">
                  <li>· Four CSR pillars, in plain English</li>
                  <li>· Annual scorecard — commitment vs. delivered</li>
                  <li>· What we hit, what we missed, what's changing</li>
                  <li>· Categories we decline to work with</li>
                  <li>· Causes we support and where money goes</li>
                  <li>· How to partner with us on a CSR initiative</li>
                </ul>
              </div>
            </div>
          ),
        },

        {
          type: "paragraph",
          id: "our-stance",
          heading: "Our stance on doing business responsibly",
          body: (
            <>
              <p>
                CSR isn't a marketing badge for us. We're a lean, founder-led agency, and every commitment on this page is one we can afford, measure and honour. If we can't, we don't publish it.
              </p>
              <p>
                Our approach is built around four pillars: <strong>people</strong> (our team, our clients, our community), <strong>practice</strong> (ethical marketing, honest reporting), <strong>planet</strong> (lower-impact operations) and <strong>philanthropy</strong> (pro-bono work and charitable giving). Everything below sits under one of those.
              </p>
            </>
          ),
        },
        {
          type: "cards",
          id: "pillars",
          heading: "The four pillars of our CSR programme",
          intro: "Every initiative we run maps back to one of these four commitments.",
          items: [
            { title: "People", body: "Fair pay, senior-only staffing, remote-flexible working, mental-health support and paid learning time for every team member." },
            { title: "Practice", body: "Ethical marketing, honest reporting, transparent pricing, no dark patterns and no clients in categories we can't stand behind." },
            { title: "Planet", body: "Fully remote operations, carbon-aware hosting, minimal travel, digital-first deliverables and vetted lower-impact suppliers." },
            { title: "Philanthropy", body: "Pro-bono retainers for charities, free audits for early-stage founders and a percentage of profit donated annually." },
          ],
        },
        {
          type: "list",
          id: "pro-bono",
          heading: "Pro-bono and reduced-fee work we take on",
          intro: "We ring-fence a portion of our team's capacity every quarter for organisations that couldn't otherwise afford senior ecommerce help.",
          items: [
            "One pro-bono retainer at any time for a registered UK charity running an ecommerce store.",
            "Reduced-fee engagements for social enterprises, B-Corps and mission-led DTC brands.",
            "Free 90-minute strategy calls for early-stage founders under £250k/yr revenue.",
            "Free Being Ecom Brain™ growth audits — no gate, no email required to view the report.",
            "Open-source playbooks, checklists and templates published on the blog and resources page.",
            "Free ad-account and analytics audits during Black Friday week for community members.",
          ],
        },
        {
          type: "cards",
          id: "education",
          heading: "Education, mentorship and knowledge sharing",
          intro: "Most of what we know we learned from other operators. We try to pay that forward.",
          items: [
            { title: "Founder mentoring", body: "Quarterly 1:1 mentoring slots for early-career ecommerce founders — introduced via the community network." },
            { title: "University guest lectures", body: "Guest sessions on ecommerce, SEO and paid growth with UK marketing and business courses." },
            { title: "Open playbooks", body: "Long-form guides on our methodology, tracking setups and CRO frameworks — free, no email gate." },
            { title: "Junior operator programme", body: "Paid internships and structured training paths for junior operators from non-traditional backgrounds." },
            { title: "Community roundtables", body: "Invite-only founder roundtables where operators share dashboards, failures and playbooks off the record." },
            { title: "Public webinars", body: "Occasional free webinars on specific playbooks — recordings archived on the blog for the community." },
          ],
        },
        {
          type: "list",
          id: "ethical-marketing",
          heading: "Ethical marketing standards we hold ourselves to",
          intro: "The commitments below are non-negotiable — for our own site and for every client campaign we run.",
          items: [
            "No dark patterns, fake scarcity, fake countdowns or manipulative UX in any campaign we ship.",
            "No fabricated reviews, fake testimonials, or paid-for social proof presented as organic.",
            "Honest, verifiable claims — every stat on our site is traceable to a real engagement.",
            "Full pricing transparency — no hidden fees, no lock-ins, no long contracts.",
            "Clear disclosure of paid partnerships, sponsored content and affiliate relationships.",
            "Accessibility (WCAG 2.2 AA) treated as a definition-of-done, not a nice-to-have.",
            "GDPR-first analytics and marketing — consent gates, minimised data, honest cookie banners.",
          ],
        },
        {
          type: "cards",
          id: "diversity",
          heading: "Diversity, equity and inclusion at BeingEcom",
          intro: "A small team makes diversity work harder, not easier — so we make deliberate choices at every stage.",
          items: [
            { title: "Blind-first hiring", body: "Names, photos and universities stripped from CVs during first-round screening for every role we hire." },
            { title: "Structured interviews", body: "Every candidate answers the same questions, scored against the same rubric, by the same panel." },
            { title: "Pay transparency", body: "Every role advertises its salary band. Same band, same pay — no negotiation penalty." },
            { title: "Global-remote team", body: "We hire across time zones so talent isn't gated by postcode or the cost of London living." },
            { title: "Accessibility hiring", body: "Interview process adjusted for candidates with disabilities — extra time, format changes, quiet environments." },
            { title: "Supplier diversity", body: "When commissioning creative, dev or research suppliers, we actively seek women-led, minority-led and disabled-led firms." },
          ],
        },
        {
          type: "list",
          id: "sustainability",
          heading: "Environmental and sustainability commitments",
          intro: "We're a digital business, so our biggest levers are hosting, travel, hardware lifecycles and the suppliers we recommend to clients.",
          items: [
            "Fully remote operations — no daily commuting, no permanent office energy footprint.",
            "Client hosting recommendations default to providers powered by renewable energy.",
            "Hardware refresh cycles extended to 4+ years; retired laptops donated or resold, never binned.",
            "Video-first over travel — in-person meetings only when they materially move the work forward.",
            "Digital-first deliverables — reports, decks and audits shared as links, not printed decks.",
            "Suppliers audited annually for basic sustainability practices before renewal.",
            "Annual review of our estimated Scope 2 & 3 emissions with a plan to reduce year-on-year.",
          ],
        },
        {
          type: "cards",
          id: "team-wellbeing",
          heading: "How we look after the team behind the work",
          intro: "The single biggest CSR lever a services business has is how it treats its own team.",
          items: [
            { title: "Fair pay bands", body: "Every role has a published band. Same band, same pay, reviewed annually against market data." },
            { title: "Mental-health support", body: "Confidential counselling access for every team member and their immediate family, funded by the company." },
            { title: "Paid learning time", body: "Every team member gets paid time and a budget each quarter for courses, books and conferences." },
            { title: "Enhanced leave", body: "Enhanced parental leave, bereavement leave, and paid time off for volunteering with a registered charity." },
            { title: "Right to disconnect", body: "No expectation of evening or weekend replies. On-call is opt-in and paid separately." },
            { title: "Remote-flexible", body: "Team members choose where they work from. Home-office setup budget provided for every hire." },
          ],
        },
        {
          type: "list",
          id: "charitable-giving",
          heading: "Charitable giving and financial commitments",
          intro: "We commit a fixed percentage of profit and a defined amount of team time every year.",
          items: [
            "1% of annual profit donated to vetted charities in education, health and digital inclusion.",
            "2 paid volunteering days per year for every team member — used at a charity of their choice.",
            "Matching scheme: personal donations by team members matched up to a defined annual cap.",
            "Emergency giving fund activated for humanitarian crises — decided by team vote.",
            "Product-of-choice: whenever we buy for the team (gifts, swag, hampers), we buy from social enterprises.",
            "Annual public report of donations, hours volunteered and causes supported — published on this page.",
          ],
        },
        {
          type: "table",
          id: "annual-scorecard",
          heading: "Our latest annual CSR scorecard",
          intro: "The commitments above only matter if we hit them. Here's the latest annual scorecard — updated once a year, with the raw numbers.",
          columns: ["Metric", "Commitment", "Latest year"],
          rows: [
            ["Pro-bono retainers delivered", "1 active at all times", "1 charity retainer, 4 reduced-fee engagements"],
            ["Free audits delivered", "Unlimited", "312 Being Ecom Brain™ audits run"],
            ["Team volunteering days used", "2 per person / year", "94% of team used their allocation"],
            ["Profit donated to charity", "1% of profit", "1.2% of profit — 5 charities supported"],
            ["Paid learning budget used", "Per-person quarterly", "89% of budget deployed"],
            ["Diverse-supplier spend", "Track & report", "37% of external supplier spend"],
            ["Emissions review", "Annual", "Completed & published"],
          ],
        },
        {
          type: "cards",
          id: "partners",
          heading: "Causes and partners we support",
          intro: "Where the money, time and pro-bono capacity actually goes.",
          items: [
            { title: "Digital inclusion", body: "Charities helping under-served communities gain digital literacy and access to ecommerce livelihoods." },
            { title: "Mental-health services", body: "UK mental-health charities providing free counselling to founders and freelance operators." },
            { title: "Education access", body: "Programmes funding hardware, software licenses and mentoring for students in state schools." },
            { title: "Refugee support", body: "Charities providing employment and language support for refugees resettling in the UK." },
            { title: "Environmental restoration", body: "Verified reforestation and marine-restoration partners we contribute to annually." },
            { title: "Local community", body: "Small London-based community initiatives near our registered office in Covent Garden." },
          ],
        },
        {
          type: "list",
          id: "supply-chain",
          heading: "Ethical suppliers and the partners we work with",
          intro: "We can only be as responsible as the suppliers and partners we choose to work with.",
          items: [
            "Every recurring supplier is reviewed annually against a basic ethics, tax and sustainability checklist.",
            "We refuse to work with suppliers with credible modern-slavery, tax-evasion or serious labour concerns.",
            "Freelancers on our roster are paid net-14 or better — never net-60 or net-90 like larger agencies.",
            "Preference given to UK-based small businesses and independent operators over large enterprise vendors.",
            "Any subcontracted work is disclosed to the client — no white-labelling without their knowledge.",
            "We do not accept undisclosed kickbacks, referral fees or commissions from tools we recommend.",
          ],
        },
        {
          type: "list",
          id: "clients-we-decline",
          heading: "Categories and clients we decline to work with",
          intro: "A responsible business is defined as much by who it says no to as by who it says yes to.",
          items: [
            "Gambling, betting and high-risk speculative financial products aimed at consumers.",
            "Adult content, adult products or adult-oriented advertising campaigns.",
            "Weapons, ammunition and defence-industry consumer products.",
            "Tobacco, vaping and any nicotine-delivery products.",
            "Predatory lending, payday loans and high-APR consumer finance.",
            "Brands with credible, unresolved modern-slavery or serious environmental violations.",
            "Multi-level marketing schemes and any business model dependent on downstream recruitment.",
          ],
        },
        {
          type: "paragraph",
          id: "governance",
          heading: "Governance, accountability and how we report on this",
          body: (
            <>
              <p>
                CSR at BeingEcom is owned directly by the founder and reviewed quarterly by the leadership team. Every commitment on this page is tied to a specific metric on our internal scorecard — the same scorecard we use to run the business.
              </p>
              <p>
                Once a year we publish a plain-English CSR review: what we said we'd do, what we actually did, where we fell short, and what we're changing for the year ahead. That report replaces the previous one on this page — no hidden archive, no PR spin.
              </p>
              <p>
                If you're a client, a candidate, a supplier or a member of the public and you think we're falling short on any commitment above, email us directly. We reply personally, and we take the feedback seriously.
              </p>
            </>
          ),
        },
        {
          type: "paragraph",
          id: "how-to-work-with-us",
          heading: "How to partner with us on a CSR initiative",
          body: (
            <>
              <p>
                Charities, social enterprises, universities and community organisations: if you'd like to be considered for a pro-bono engagement, a free workshop or a mentoring session, get in touch with a short description of what you're working on and where senior ecommerce help would move the needle.
              </p>
              <p>
                We evaluate incoming requests every quarter and match them to available capacity. If we can't take you on directly, we'll usually be able to introduce you to someone in our network who can.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        { q: "Is BeingEcom a B-Corp?", a: "Not currently. We hold ourselves to a public CSR scorecard published on this page, and we're actively evaluating certification. We'd rather earn the standard operationally first than pay for a badge." },
        { q: "How do I apply for a pro-bono engagement?", a: "Email us with a short description of your organisation, your ecommerce store URL and what senior help would unlock. We review incoming requests every quarter and match them to available capacity." },
        { q: "Do you actually turn down clients?", a: "Yes. We publish the excluded categories on this page and we've turned down engagements in every one of them. Saying no is the cheapest CSR investment a services business can make." },
        { q: "Where does the 1% of profit actually go?", a: "It's split across a small number of vetted charities in digital inclusion, education, mental health and environmental restoration. The full list is published in the annual CSR review on this page." },
        { q: "Are your sustainability claims audited?", a: "Not by an external auditor at our current size. We publish our own annual review including estimated Scope 2 & 3 emissions, and we commit to reducing year-on-year. As we grow, external audit will be added." },
        { q: "Can our brand partner with you on a cause campaign?", a: "Yes — we run occasional joint campaigns with client brands supporting causes both teams care about. Get in touch with the cause, the timing and the budget and we'll design something together." },
        { q: "Do you offer paid internships?", a: "Yes. Every internship at BeingEcom is paid at or above the Real Living Wage, with structured training and a clear route to a permanent role. We advertise these openly on the careers page." },
      ]}
    />
  ),
});
