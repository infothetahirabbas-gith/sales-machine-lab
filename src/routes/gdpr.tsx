import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/site/PageLayout";
import { CTA } from "@/components/site/Section";
import { SITE_URL, ORG_INFO } from "@/lib/seo";

const TITLE = "GDPR Compliance | BeingEcom";
const DESC = "How BeingEcom implements UK GDPR and EU GDPR lawful basis, data subject rights, sub-processors, transfers and how to submit a request.";
const URL = `${SITE_URL}/gdpr`;

export const Route = createFileRoute("/gdpr")({
  head: () => ({
    meta: [
      { title: TITLE }, { name: "description", content: DESC },
      { property: "og:title", content: TITLE }, { property: "og:description", content: DESC },
      { property: "og:url", content: URL }, { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: GdprPage,
});

function GdprPage() {
  return (
    <PageLayout>
      <section className="pt-16 pb-10">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="text-xs text-muted-foreground"><Link to="/">Home</Link> · <Link to="/company/legal">Legal</Link> · GDPR</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-ink">GDPR compliance</h1>
          <p className="mt-4 text-muted-foreground">Maintained by {ORG_INFO.name}. Last updated {new Date().toISOString().slice(0, 10)}. Applies to UK GDPR and, where relevant, EU GDPR obligations.</p>
          <div className="prose-body mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <h2 className="text-xl font-bold text-ink">Who we are</h2>
            <p>{ORG_INFO.legalName}, {ORG_INFO.address.streetAddress}, {ORG_INFO.address.addressLocality}, {ORG_INFO.address.postalCode}, {ORG_INFO.address.addressCountry}. Contact: <a href={`mailto:${ORG_INFO.email}`} className="text-primary underline">{ORG_INFO.email}</a>.</p>
            <h2 className="text-xl font-bold text-ink">Our role</h2>
            <p>We act as a <strong>data controller</strong> for personal data you submit to us directly (e.g. contact form). We act as a <strong>data processor</strong> for personal data you instruct us to process on your behalf as part of a client engagement (e.g. Klaviyo lists, Meta audiences).</p>
            <h2 className="text-xl font-bold text-ink">Lawful basis</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Contract</strong> to deliver services to clients under a signed agreement.</li>
              <li><strong>Legitimate interests</strong> to respond to enquiries, run our website and secure our systems.</li>
              <li><strong>Consent</strong> for marketing communications and non-essential cookies.</li>
              <li><strong>Legal obligation</strong> for tax, accounting and regulatory record-keeping.</li>
            </ul>
            <h2 className="text-xl font-bold text-ink">Your rights</h2>
            <p>Under UK/EU GDPR you have the right to access, rectify, erase, restrict processing of, port, and object to processing of your personal data, as well as the right to withdraw consent and to complain to a supervisory authority (ICO in the UK).</p>
            <h2 className="text-xl font-bold text-ink">How to make a request</h2>
            <p>Email <a href={`mailto:${ORG_INFO.email}?subject=Data%20subject%20request`} className="text-primary underline">{ORG_INFO.email}</a> with the subject "Data subject request". Include enough information to identify you and describe the right you're exercising. We respond within one calendar month and will tell you within 5 working days if we need to extend that (permitted under Article 12(3) where a request is complex).</p>
            <h2 className="text-xl font-bold text-ink">Sub-processors</h2>
            <p>When we act as your processor, our sub-processors include: cloud hosting providers, email/SMS platforms (Klaviyo, Postscript where in scope), analytics platforms (GA4, Microsoft Clarity), and productivity tools (Google Workspace). A current list is provided in your DPA on request.</p>
            <h2 className="text-xl font-bold text-ink">International transfers</h2>
            <p>Where personal data leaves the UK/EEA, we rely on the UK IDTA / EU Standard Contractual Clauses and complete transfer risk assessments where required.</p>
            <h2 className="text-xl font-bold text-ink">Data Processing Agreement</h2>
            <p>Every client engagement that involves us processing personal data is covered by a DPA signed at onboarding. We're also happy to counter-sign your DPA if you provide one.</p>
            <h2 className="text-xl font-bold text-ink">Breach notification</h2>
            <p>Where we identify a personal data breach, we notify affected controllers without undue delay and, where required, within 72 hours in line with Article 33 GDPR.</p>
          </div>
        </div>
      </section>
      <CTA heading="Need our DPA or sub-processor list?" sub="Email info@beingecom.com and we'll send the current version." />
    </PageLayout>
  );
}
