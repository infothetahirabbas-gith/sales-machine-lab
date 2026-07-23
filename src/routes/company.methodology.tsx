import { createFileRoute, redirect } from "@tanstack/react-router";

// Consolidated to /methodology (top-level Growth System™ page) to prevent duplicate content.
export const Route = createFileRoute("/company/methodology")({
  beforeLoad: () => {
    throw redirect({ to: "/methodology", statusCode: 301 });
  },
  component: () => null,
});
