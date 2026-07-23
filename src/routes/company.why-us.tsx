import { createFileRoute, redirect } from "@tanstack/react-router";

// Consolidated to /company/why-beingecom as the canonical "why us" page.
export const Route = createFileRoute("/company/why-us")({
  beforeLoad: () => {
    throw redirect({ to: "/company/why-beingecom", statusCode: 301 });
  },
  component: () => null,
});
