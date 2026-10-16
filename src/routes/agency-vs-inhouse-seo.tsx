import { createFileRoute, redirect } from "@tanstack/react-router";

// SEO audit 2026-10-16: consolidated to one URL per search intent (cannibalisation fix).
export const Route = createFileRoute("/agency-vs-inhouse-seo")({
  beforeLoad: () => {
    throw redirect({ href: "/compare/in-house-vs-agency", statusCode: 301 });
  },
});
