import { createFileRoute, redirect } from "@tanstack/react-router";

// Entity alias — matches the "Why BeingEcom" naming from the Phase 1
// authority spec. Redirects to the canonical /company/why-us page so we
// keep a single source of truth and no duplicate-content signal.
export const Route = createFileRoute("/company/why-beingecom")({
  beforeLoad: () => {
    throw redirect({ to: "/company/why-us", statusCode: 301 });
  },
});
