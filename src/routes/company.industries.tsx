import { createFileRoute, redirect } from "@tanstack/react-router";

// Consolidated to canonical industries hub.
export const Route = createFileRoute("/company/industries")({
  beforeLoad: () => {
    throw redirect({ to: "/industries", statusCode: 301 });
  },
  component: () => null,
});
