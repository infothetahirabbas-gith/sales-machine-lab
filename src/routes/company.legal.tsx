import { createFileRoute } from "@tanstack/react-router";
import CompanyPage, { companyHead } from "@/components/site/CompanyPage";

const SLUG = "legal";
const TITLE = "Legal & Policies — Privacy, Terms, Cookies | BeingEcom";
const DESC = "Every BeingEcom legal document in one place — privacy policy, terms of service, cookie policy, GDPR compliance, accessibility statement and disclaimer.";

const POLICIES = [
  { title: "Privacy Policy",         to: "/privacy",       body: "How we collect, use, store and share personal data across the site and client engagements." },
  { title: "Terms & Conditions",     to: "/terms",         body: "The commercial terms that govern using this website and engaging BeingEcom as a service provider." },
  { title: "Cookie Policy",          to: "/cookies",       body: "What cookies we set, why, and how you can control them via the cookie consent banner." },
  { title: "GDPR Compliance",        to: "/gdpr",          body: "How we implement UK GDPR and EU GDPR obligations, and how to exercise your data subject rights." },
  { title: "Accessibility Statement", to: "/accessibility", body: "Our commitment to WCAG 2.2 AA on this site and what to do if you hit a barrier." },
  { title: "Disclaimer",             to: "/disclaimer",    body: "General disclaimers about the content on this site, third-party links and results claims." },
];

export const Route = createFileRoute("/company/legal")({
  head: () => companyHead({ slug: SLUG, title: TITLE, description: DESC }),
  component: () => (
    <CompanyPage
      slug={SLUG}
      h1="Legal & policies"
      eyebrow="Legal"
      intro="Every BeingEcom policy in one place. If you can't find what you need, email us at info@beingecom.com and we'll direct you to the right document or the right person."
      sections={[
        {
          type: "cards",
          id: "policies",
          heading: "All policies",
          items: POLICIES.map((p) => ({ title: p.title, body: p.body, to: p.to })),
        },
        {
          type: "paragraph",
          id: "notes",
          heading: "About these documents",
          body: (
            <p>
              These policies are maintained by BeingEcom and reflect our current operating practices. They are not a substitute for
              tailored legal advice. If you are engaging BeingEcom as a supplier and require a mutual NDA, DPA or bespoke terms, we're
              happy to sign them — email us via the contact page.
            </p>
          ),
        },
      ]}
      faqs={[
        { q: "Where's the privacy policy?", a: "Linked on this page, in the footer, and on every form on the site." },
        { q: "Do you sign NDAs?", a: "Yes — happy to sign a mutual NDA before sharing sensitive numbers. Send yours or ask us to send our template." },
        { q: "Do you have a Data Processing Agreement?", a: "Yes — we sign a DPA for every engagement where we access client personal data. Requested during onboarding." },
        { q: "How do I make a data subject request?", a: "Email info@beingecom.com with the subject 'Data subject request' — see the GDPR page for the full procedure and response timeline." },
      ]}
    />
  ),
});
