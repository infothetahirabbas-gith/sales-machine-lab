import { createFileRoute, redirect } from "@tanstack/react-router";

// Consolidated to /services/performance-marketing as the canonical paid-media hub.
// Removes duplicate URL to consolidate authority and remove keyword cannibalisation.
export const Route = createFileRoute("/services/paid-ads")({
  beforeLoad: () => {
    throw redirect({ to: "/services/performance-marketing", statusCode: 301 });
  },
  component: () => null,
});
