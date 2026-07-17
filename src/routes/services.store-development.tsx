import { createFileRoute, Outlet } from "@tanstack/react-router";

// Pure layout: no head() so the parent canonical does NOT leak into
// /services/store-development/shopify or /woocommerce. Leaf head/component
// lives in services.store-development.index.tsx.
export const Route = createFileRoute("/services/store-development")({
  component: () => <Outlet />,
});
