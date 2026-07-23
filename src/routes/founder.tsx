import { createFileRoute, redirect } from "@tanstack/react-router";

// Consolidated to canonical founder page to eliminate cannibalization.
export const Route = createFileRoute("/founder")({
  beforeLoad: () => {
    throw redirect({ to: "/about/tahir-abbas", statusCode: 301 });
  },
  component: () => null,
});
