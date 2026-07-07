import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import PageSkeleton from "./components/site/PageSkeleton";

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
    // Preload on viewport entry AND on intent — links visible on screen are
    // fetched proactively so clicks feel instant (nano-second perceived).
    defaultPreload: "viewport",
    // Let TanStack Query own freshness; router just triggers the fetch.
    defaultPreloadStaleTime: 0,
    // Fire preload immediately on hover/focus for near-zero click latency.
    defaultPreloadDelay: 0,
    // Only show the skeleton if the next route takes >150ms to be ready —
    // instant/preloaded navigations never flash it. Once shown, keep it up
    // for at least 300ms so it doesn't blink.
    defaultPendingMs: 150,
    defaultPendingMinMs: 300,
    defaultPendingComponent: PageSkeleton,
  });


  return router;
};
