import { createFileRoute, redirect } from "@tanstack/react-router";

/** /resources is a commonly guessed URL - send it permanently to the real hub. */
export const Route = createFileRoute("/resources")({
  beforeLoad: () => {
    throw redirect({ to: "/company/resources", statusCode: 301 });
  },
});
