import { createFileRoute, redirect } from "@tanstack/react-router";

// Consolidated to canonical founder page.
export const Route = createFileRoute("/company/founder")({
  beforeLoad: () => {
    throw redirect({ to: "/about/tahir-abbas", statusCode: 301 });
  },
  component: () => null,
});
