import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "../lib/seo";
import {
  PERFORMANCE_MARKETING_FAQS,
  PerformanceMarketingPage,
} from "./services.performance-marketing.index";

export const Route = createFileRoute("/services/paid-ads")({
  head: () => ({
    meta: [
      { title: "Paid Ads Agency UK | Meta, Google & TikTok | BeingEcom" },
      {
        name: "description",
        content:
          "UK paid ads agency managing Meta, Google, TikTok and YouTube as one profitable P&L for Shopify and WooCommerce brands.",
      },
      { property: "og:title", content: "Paid Ads Agency UK | Meta, Google & TikTok | BeingEcom" },
      {
        property: "og:description",
        content: "Profit-focused paid media management for UK Shopify and WooCommerce brands.",
      },
      { property: "og:url", content: "https://beingecom.com/services/paid-ads" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://beingecom.com/services/paid-ads" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceJsonLd({
            slug: "paid-ads",
            name: "Paid Ads Management",
            description: "Meta, Google, TikTok and YouTube paid media management for ecommerce brands.",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Paid Ads", path: "/services/paid-ads" },
          ]),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd(PERFORMANCE_MARKETING_FAQS, "/services/paid-ads")),
      },
    ],
  }),
  component: PerformanceMarketingPage,
});
