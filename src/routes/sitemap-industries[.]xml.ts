import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { INDUSTRIES, LOCATIONS } from "../lib/locations-industries";

const BASE_URL = "https://beingecom.com";

export const Route = createFileRoute("/sitemap-industries.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls: string[] = [
        ];
        for (const ind of INDUSTRIES) {
          urls.push(
          );
          urls.push(
          );
        }
        // Optional: lang × location × industry × service - kept out to avoid
        // an exponential sitemap. Add only when those routes are ready.
        void LOCATIONS;
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
            "X-Robots-Tag": "index, follow",
          },
        });
      },
    },
  },
});
