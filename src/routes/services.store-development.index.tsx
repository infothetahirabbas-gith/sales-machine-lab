// Leaf route for /services/store-development.
// Split from services.store-development.tsx (now a pure layout) so this
// canonical/head only emits on the exact URL and does not leak into
// /services/store-development/shopify or /woocommerce.
export { Route } from "./services.store-development";
