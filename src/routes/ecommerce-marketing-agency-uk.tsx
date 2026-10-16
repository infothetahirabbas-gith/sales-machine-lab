import { createFileRoute, redirect } from "@tanstack/react-router";

// SEO audit 2026-10-16: consolidated to one URL per search intent (cannibalisation fix).
export const Route = createFileRoute("/ecommerce-marketing-agency-uk")({
  beforeLoad: () => {
    throw redirect({ href: "/", statusCode: 301 });
  },
});
