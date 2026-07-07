import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section } from "../components/site/Section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — BeingEcom UK" },
      { name: "description", content: "How BeingEcom collects, uses and protects your data under UK GDPR." },
      { property: "og:title", content: "Privacy Policy — BeingEcom UK" },
      { property: "og:description", content: "How BeingEcom collects, uses and protects your data under UK GDPR." },
      { property: "og:url", content: "https://beingecom.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/privacy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <PageLayout>
      <Section eyebrow="Legal" title="Privacy Policy">
        <div className="prose prose-slate max-w-3xl">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
          <h2>Who we are</h2>
          <p>BeingEcom (“we”, “us”, “our”) is an ecommerce growth agency serving UK and international clients. Contact: <a href="mailto:info@beingecom.com">info@beingecom.com</a>.</p>
          <h2>What we collect</h2>
          <ul>
            <li>Contact form data: name, email, store URL, revenue range, message.</li>
            <li>Analytics: aggregated page and event data via GA4 (IP anonymised).</li>
            <li>Chat assistant messages you send us for support and qualification.</li>
          </ul>
          <h2>Lawful basis (UK GDPR)</h2>
          <p>We process contact enquiries on the basis of your consent and our legitimate interest in responding to your request. Analytics is only loaded after cookie consent.</p>
          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry and deliver services you request.</li>
            <li>To improve our website, content and offering.</li>
            <li>We do not sell your data. We do not share it with third parties for marketing.</li>
          </ul>
          <h2>Your rights</h2>
          <p>You have the right to access, correct, delete or export your data, and to withdraw consent at any time. Email <a href="mailto:info@beingecom.com">info@beingecom.com</a> and we’ll action it within 30 days. You can also complain to the ICO (ico.org.uk).</p>
          <h2>Retention</h2>
          <p>Contact-form data is retained for up to 24 months from your last interaction, unless you request earlier deletion.</p>
          <h2>Cookies</h2>
          <p>See our <a href="/cookies">Cookie Policy</a> for the categories used and how to manage them.</p>
        </div>
      </Section>
    </PageLayout>
  );
}
