import { createFileRoute } from "@tanstack/react-router";
import {
  faqJsonLd,
  aboutFaqs,
  auditFaqs,
  contactFaqs,
  servicesFaqs,
  caseStudyFaqs,
  type FAQ,
} from "@/lib/seo";
import { faqs as homeFaqs } from "@/components/site/ContactFaq";

const REGISTRY: Record<string, FAQ[]> = {
  "/": homeFaqs,
  "/about": aboutFaqs,
  "/audit": auditFaqs,
  "/contact": contactFaqs,
  "/services": servicesFaqs,
  "/case-studies": caseStudyFaqs,
};

export const Route = createFileRoute("/api/public/debug/faq-jsonld")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const rawPath = url.searchParams.get("path");

        if (!rawPath) {
          return Response.json(
            {
              error: "Missing ?path query param",
              availablePaths: Object.keys(REGISTRY),
              example: "/api/public/debug/faq-jsonld?path=/about",
            },
            { status: 400 },
          );
        }

        // Normalize: strip trailing slash except root
        const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, "") : "/";
        const faqs = REGISTRY[path];

        if (!faqs) {
          return Response.json(
            {
              error: `No FAQ JSON-LD registered for "${path}"`,
              availablePaths: Object.keys(REGISTRY),
            },
            { status: 404 },
          );
        }

        const jsonld = faqJsonLd(faqs, path);

        return Response.json(
          {
            path,
            questionCount: faqs.length,
            scriptTag: `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`,
            jsonld,
          },
          {
            headers: {
              "Cache-Control": "no-store",
              "Access-Control-Allow-Origin": "*",
            },
          },
        );
      },
    },
  },
});
