import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "../components/site/PageLayout";
import { Section } from "../components/site/Section";
import { breadcrumbJsonLd } from "../lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service - BeingEcom UK" },
      { name: "description", content: "Terms governing use of BeingEcom’s website and services." },
      { property: "og:title", content: "Terms of Service - BeingEcom UK" },
      { property: "og:description", content: "Terms governing use of BeingEcom’s website and services." },
      { property: "og:url", content: "https://beingecom.com/terms" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/terms" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }])) },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <PageLayout>
      <h1 className="sr-only">Terms of Service</h1>
      <Section eyebrow="Legal" title="Terms of Service">

        <div className="prose prose-slate max-w-3xl">
          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
          <h2>Use of the site</h2>
          <p>By using beingecom.com you agree to use it lawfully and not to attempt to disrupt or reverse-engineer the service.</p>
          <h2>Content</h2>
          <p>All content, case studies, brand marks and copy are owned by BeingEcom or its licensors. Results shown are historical and not a guarantee of future performance.</p>
          <h2>Services</h2>
          <p>Any engagement is governed by a separate signed statement of work. This site does not itself form a service contract.</p>
          <h2>Liability</h2>
          <p>We provide the site “as is” without warranties. To the extent permitted by law, our liability for use of the site is limited to £100.</p>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws of England and Wales.</p>
          <h2>Contact</h2>
          <p><a href="mailto:info@beingecom.com">info@beingecom.com</a></p>
        </div>
      </Section>
    </PageLayout>
  );
}
