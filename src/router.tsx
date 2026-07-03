import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreload: "intent",
    // Let TanStack Query own freshness; router just triggers the fetch.
    defaultPreloadStaleTime: 0,
    // Fire preload immediately on hover/focus for near-zero click latency.
    defaultPreloadDelay: 0,
    defaultPendingMs: 0,
  });


  return router;
};
