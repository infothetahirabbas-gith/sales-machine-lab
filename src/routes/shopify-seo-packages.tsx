import { createFileRoute, redirect } from "@tanstack/react-router";

// SEO audit 2026-10-16: consolidated to one URL per search intent (cannibalisation fix).
export const Route = createFileRoute("/shopify-seo-packages")({
  beforeLoad: () => {
    throw redirect({ href: "/shopify-seo-agency-uk", statusCode: 301 });
  },
});
