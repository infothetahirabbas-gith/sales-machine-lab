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

// Friendly aliases → canonical paths. Aliases are matched case-insensitively
// after stripping non-alphanumeric chars, so "Case Studies", "case-studies",
// "caseStudies", and "case_studies" all resolve the same.
const ALIASES: Record<string, string> = {
  home: "/",
  index: "/",
  about: "/about",
  audit: "/audit",
  contact: "/contact",
  services: "/services",
  casestudies: "/case-studies",
  cases: "/case-studies",
};

function resolveCanonicalPath(raw: string): string | null {
  if (!raw) return null;
  // Already-canonical (starts with /)
  if (raw.startsWith("/")) {
    const normalized = raw.length > 1 ? raw.replace(/\/+$/, "") : "/";
    return REGISTRY[normalized] ? normalized : null;
  }
  // Alias lookup
  const key = raw.toLowerCase().replace(/[^a-z0-9]/g, "");
  return ALIASES[key] ?? null;
}

// Minimal schema.org FAQPage validator. Returns an array of human-readable
// errors. Empty array means valid.
export function validateFaqJsonLd(jsonld: unknown): string[] {
  const errors: string[] = [];
  if (!jsonld || typeof jsonld !== "object") {
    return ["Root is not an object"];
  }
  const obj = jsonld as Record<string, unknown>;

  if (obj["@context"] !== "https://schema.org") {
    errors.push(`@context must be "https://schema.org" (got ${JSON.stringify(obj["@context"])})`);
  }
  if (obj["@type"] !== "FAQPage") {
    errors.push(`@type must be "FAQPage" (got ${JSON.stringify(obj["@type"])})`);
  }

  const mainEntity = obj.mainEntity;
  if (!Array.isArray(mainEntity)) {
    errors.push("mainEntity must be an array of Question objects");
    return errors;
  }
  if (mainEntity.length === 0) {
    errors.push("mainEntity is empty — FAQPage requires at least one Question");
  }

  const seenIds = new Set<string>();
  mainEntity.forEach((q, i) => {
    if (!q || typeof q !== "object") {
      errors.push(`mainEntity[${i}] is not an object`);
      return;
    }
    const qq = q as Record<string, unknown>;
    const prefix = `mainEntity[${i}]`;

    if (qq["@type"] !== "Question") {
      errors.push(`${prefix}.@type must be "Question"`);
    }
    if (typeof qq.name !== "string" || !qq.name.trim()) {
      errors.push(`${prefix}.name must be a non-empty string`);
    }
    if (typeof qq["@id"] === "string") {
      if (seenIds.has(qq["@id"])) {
        errors.push(`${prefix}.@id duplicates another question (${qq["@id"]})`);
      }
      seenIds.add(qq["@id"]);
    }

    const a = qq.acceptedAnswer;
    if (!a || typeof a !== "object") {
      errors.push(`${prefix}.acceptedAnswer is missing or not an object`);
      return;
    }
    const aa = a as Record<string, unknown>;
    if (aa["@type"] !== "Answer") {
      errors.push(`${prefix}.acceptedAnswer.@type must be "Answer"`);
    }
    if (typeof aa.text !== "string" || !aa.text.trim()) {
      errors.push(`${prefix}.acceptedAnswer.text must be a non-empty string`);
    }
  });

  return errors;
}

export const Route = createFileRoute("/api/public/debug/faq-jsonld")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const rawPath = url.searchParams.get("path");
        const debug = url.searchParams.get("debug") === "1" || url.searchParams.get("validate") === "1";

        if (!rawPath) {
          return Response.json(
            {
              error: "Missing ?path query param",
              availablePaths: Object.keys(REGISTRY),
              aliases: Object.keys(ALIASES),
              example: "/api/public/debug/faq-jsonld?path=about&debug=1",
            },
            { status: 400 },
          );
        }

        const canonicalPath = resolveCanonicalPath(rawPath);
        if (!canonicalPath) {
          return Response.json(
            {
              error: `No FAQ JSON-LD registered for "${rawPath}"`,
              availablePaths: Object.keys(REGISTRY),
              aliases: Object.keys(ALIASES),
            },
            { status: 404 },
          );
        }

        const faqs = REGISTRY[canonicalPath];
        const jsonld = faqJsonLd(faqs, canonicalPath);

        const body: Record<string, unknown> = {
          requestedPath: rawPath,
          canonicalPath,
          questionCount: faqs.length,
          scriptTag: `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`,
          jsonld,
        };

        if (debug) {
          const errors = validateFaqJsonLd(jsonld);
          body.validation = {
            valid: errors.length === 0,
            errorCount: errors.length,
            errors,
            schema: "https://schema.org/FAQPage",
          };
        }

        return Response.json(body, {
          headers: {
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*",
          },
        });
      },
    },
  },
});
