import { createFileRoute, redirect } from "@tanstack/react-router";

// Canonicalised to the new top-level /why-beingecom pillar page so there
// is a single source of truth for the "Why us" entity across the site.
export const Route = createFileRoute("/company/why-beingecom")({
  beforeLoad: () => {
    throw redirect({ to: "/why-beingecom", statusCode: 301 });
  },
});
