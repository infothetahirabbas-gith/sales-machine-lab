import { createFileRoute, Link } from "@tanstack/react-router";
import PageLayout from "@/components/site/PageLayout";
import { CTA } from "@/components/site/Section";
import { SITE_URL, ORG_INFO } from "@/lib/seo";

const TITLE = "Disclaimer | BeingEcom";
const DESC = "General disclaimer for beingecom.com accuracy of content, third-party links, results claims and professional advice.";
const URL = `${SITE_URL}/disclaimer`;

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: TITLE }, { name: "description", content: DESC },
      { property: "og:title", content: TITLE }, { property: "og:description", content: DESC },
      { property: "og:url", content: URL }, { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <PageLayout>
      <section className="pt-16 pb-10">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <p className="text-xs text-muted-foreground"><Link to="/">Home</Link> · <Link to="/company/legal">Legal</Link> · Disclaimer</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-ink">Disclaimer</h1>
          <p className="mt-4 text-muted-foreground">Maintained by {ORG_INFO.name}. Last updated {new Date().toISOString().slice(0, 10)}.</p>
          <div className="prose-body mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <h2 className="text-xl font-bold text-ink">General information only</h2>
            <p>Content on this website is provided for general information about ecommerce growth practices and about {ORG_INFO.name}. It is not tailored advice for your specific business, and should not be relied on as such. Before acting on anything you read here, consider consulting a professional who understands your context.</p>
            <h2 className="text-xl font-bold text-ink">Results claims</h2>
            <p>Where we describe past client outcomes in case studies, blog posts, testimonials or elsewhere they represent real engagements but are anonymised where NDAs require. Past results are never a prediction of future outcomes for your business. Ecommerce results depend on your product, market, unit economics, execution capacity and many factors outside our control.</p>
            <h2 className="text-xl font-bold text-ink">Third-party links and brands</h2>
            <p>We link to third-party websites, tools and brands (Shopify, WooCommerce, Google, Meta, Klaviyo and others). We don't control those sites and are not responsible for their content, availability or practices. Brand names and logos are the property of their respective owners; mention does not imply endorsement of {ORG_INFO.name} by those companies unless explicitly stated on our Certifications & Partnerships page.</p>
            <h2 className="text-xl font-bold text-ink">No professional advice</h2>
            <p>Nothing on this website constitutes legal, accounting, tax, or regulated financial advice. Where the topic overlaps with regulated advice (data protection, advertising claims, product compliance), seek qualified professional help.</p>
            <h2 className="text-xl font-bold text-ink">Content accuracy</h2>
            <p>We work to keep content accurate and up to date, but the ecommerce landscape changes fast. If you spot an error, please email <a className="text-primary underline" href={`mailto:${ORG_INFO.email}`}>{ORG_INFO.email}</a>.</p>
          </div>
        </div>
      </section>
      <CTA />
    </PageLayout>
  );
}
