import { createFileRoute } from "@tanstack/react-router";
import PillarPageView from "@/components/site/PillarPage";
import { findPillar } from "@/lib/pillar-pages";
import { breadcrumbJsonLd, faqJsonLd, SITE_URL } from "@/lib/seo";

const SLUG = "enterprise-ecommerce-seo";
const page = findPillar(SLUG)!;
const URL = `${SITE_URL}/enterprise-ecommerce-seo`;

export const Route = createFileRoute("/enterprise-ecommerce-seo")({
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
            { name: page.h1, path: "/enterprise-ecommerce-seo" },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(page.faqs, "/enterprise-ecommerce-seo")) },
    ],
  }),
  component: () => <PillarPageView page={page} />,
});
