// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [imagetools()],
    build: {
      rollupOptions: {
        output: {
          /**
           * Large content-data modules are imported by more than one route, so
           * Rollup hoists them into the shared entry chunk and every visitor
           * downloads the copy for every page. Pinning them to named chunks
           * keeps them out of the critical path — they load only on the routes
           * that actually import them.
           */
          manualChunks(id: string) {
            if (!id.includes("/src/lib/")) return;
            if (id.includes("location-content")) return "content-locations";
            if (id.includes("pillar-pages")) return "content-pillars";
            if (id.includes("compare-content")) return "content-compare";
            if (id.includes("index-editorial")) return "content-editorial";
            if (id.includes("hub-content")) return "content-hub";
            if (id.includes("glossary-terms")) return "content-glossary";
            if (id.includes("industry-content")) return "content-industries";
            if (id.includes("calculators")) return "content-calculators";
            if (id.includes("home-faqs")) return "content-home-faqs";
            return;
          },
        },
      },
    },
  },

});
