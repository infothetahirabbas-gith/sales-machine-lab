import { createFileRoute } from "@tanstack/react-router";
import PillarPageView from "@/components/site/PillarPage";
import { findPillar } from "@/lib/pillar-pages";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";

const SLUG = "ai-ecommerce-growth";
const page = findPillar(SLUG)!;
const URL = `${SITE_URL}/ai-ecommerce-growth`;

export const Route = createFileRoute("/ai-ecommerce-growth")({
  head: () => ({
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:title", content: page.metaTitle },
      { property: "og:description", content: page.description },
      { property: "og:url", content: URL },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: page.h1, path: "/ai-ecommerce-growth" },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(page.faqs, "/ai-ecommerce-growth")) },
    ],
  }),
  component: () => <PillarPageView page={page} />,
});
