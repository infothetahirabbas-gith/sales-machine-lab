import { createFileRoute, redirect } from "@tanstack/react-router";

// Consolidated to canonical case studies hub.
export const Route = createFileRoute("/company/success-stories")({
  beforeLoad: () => {
    throw redirect({ to: "/case-studies", statusCode: 301 });
  },
  component: () => null,
});
