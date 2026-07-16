import { createFileRoute, notFound } from "@tanstack/react-router";
import CalculatorPage from "../components/site/CalculatorPage";
import { calcBySlug, CALCULATORS } from "../lib/calculators";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from "../lib/seo";

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }) => {
    const cfg = calcBySlug(params.slug);
    if (!cfg) throw notFound();
    return { cfg };
  },
  head: ({ loaderData, params }) => {
    const cfg = loaderData?.cfg ?? calcBySlug(params.slug);
    if (!cfg) {
      return {
        meta: [
          { title: "Tool not found | BeingEcom" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const url = `${SITE_URL}/tools/${cfg.slug}`;
    const webAppJsonLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: cfg.name,
      url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: cfg.metaDescription,
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      provider: { "@type": "Organization", name: "BeingEcom", url: SITE_URL },
    };
    return {
      meta: [
        { title: cfg.metaTitle },
        { name: "description", content: cfg.metaDescription },
        { property: "og:title", content: cfg.metaTitle },
        { property: "og:description", content: cfg.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(webAppJsonLd) },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqJsonLd(cfg.faqs, `/tools/${cfg.slug}`)),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free Ecommerce Tools", path: "/tools" },
              { name: cfg.name, path: `/tools/${cfg.slug}` },
            ]),
          ),
        },
      ],
    };
  },
  component: ToolRoute,
  notFoundComponent: ToolNotFound,
});

function ToolRoute() {
  const { cfg } = Route.useLoaderData();
  return <CalculatorPage cfg={cfg} />;
}

function ToolNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-3xl font-bold text-ink">Tool not found</h1>
        <p className="mt-3 text-muted-foreground max-w-md">
          The calculator you're looking for doesn't exist. Try one of the {CALCULATORS.length} free tools.
        </p>
        <a href="/tools" className="btn btn-primary mt-6 inline-flex">
          All Free Tools
        </a>
      </div>
    </div>
  );
}
