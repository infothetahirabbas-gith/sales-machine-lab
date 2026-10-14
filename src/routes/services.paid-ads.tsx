import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Legacy /services/paid-ads path — the offer now lives under Performance
 * Marketing. Previously this route rendered the same page component as
 * /services/performance-marketing with its own self-canonical, which split
 * the paid-media page into two duplicate URLs. A single 301 consolidates
 * ranking signals and matches scripts/check-redirects-canonicals.mjs, which
 * already expects this redirect. Not listed in sitemap-services.xml.
 */
export const Route = createFileRoute("/services/paid-ads")({
  beforeLoad: () => {
    throw redirect({ to: "/services/performance-marketing", statusCode: 301 });
  },
});
