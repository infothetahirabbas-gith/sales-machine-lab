import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BLOG_POSTS } from "@/lib/blog-posts";

const BASE_URL = "https://beingecom.com";

// SEO audit 2026-10-16: blog posts get their own sitemap so GSC indexing coverage
// for editorial content can be read separately. lastmod uses each post's real
// dateModified/datePublished instead of one shared static date.
export const Route = createFileRoute("/sitemap-blog.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = [
          `  <url>\n    <loc>${BASE_URL}/blog</loc>\n  </url>`,
          ...BLOG_POSTS.map((p) => {
            const meta = p as { slug: string; datePublished?: string; dateModified?: string };
            const lastmod = meta.dateModified ?? meta.datePublished;
            return [
              `  <url>`,
              `    <loc>${BASE_URL}/blog/${meta.slug}</loc>`,
              lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
              `  </url>`,
            ]
              .filter(Boolean)
              .join("\n");
          }),
        ];
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
