import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy /services/consulting path - the offer now lives under Ecommerce Scaling. */
export const Route = createFileRoute("/services/consulting")({
  beforeLoad: () => {
    throw redirect({ to: "/services/scaling", statusCode: 301 });
  },
});
