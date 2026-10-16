import { createFileRoute, redirect } from "@tanstack/react-router";

// SEO audit 2026-10-16: consolidated to one URL per search intent (cannibalisation fix).
export const Route = createFileRoute("/enterprise-ecommerce-seo")({
  beforeLoad: () => {
    throw redirect({ href: "/services/seo", statusCode: 301 });
  },
});
