import { Link } from "@tanstack/react-router";
import { CLUSTERS, findClusterForSlug } from "@/lib/blog-clusters";

interface ClusterNavProps {
  currentSlug: string;
  titles: Record<string, string>;
}

// Interlinks pillar <-> supporting posts inside the article body.
// Placed once near the top of each article, giving both users and Google
// a visible topical cluster signal.
export default function ClusterNav({ currentSlug, titles }: ClusterNavProps) {
  const match = findClusterForSlug(currentSlug);
  if (!match) return null;
  const { cluster, role } = match;
  const pillarTitle = titles[cluster.pillarSlug] ?? cluster.name;
  const siblings = cluster.supportingSlugs.filter((s) => s !== currentSlug);

  return (
    <aside
      className="not-prose my-8 rounded-2xl border border-border bg-muted/40 p-6"
      aria-labelledby={`cluster-nav-${cluster.id}`}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Part of the {cluster.name} guide
      </div>
      <h2 id={`cluster-nav-${cluster.id}`} className="mt-2 text-lg font-bold text-ink">
        {role === "pillar" ? "In this guide" : (
          <>
            Read the pillar:{" "}
            <Link
              to="/blog/$slug"
              params={{ slug: cluster.pillarSlug }}
              className="text-primary underline"
            >
              {pillarTitle}
            </Link>
          </>
        )}
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {role === "pillar" && (
          <li className="text-sm font-semibold text-ink">
            You're reading the pillar guide.
          </li>
        )}
        {(role === "pillar" ? cluster.supportingSlugs : siblings).map((s) => (
          <li key={s}>
            <Link
              to="/blog/$slug"
              params={{ slug: s }}
              className="text-sm text-ink hover:text-primary underline underline-offset-4"
            >
              {titles[s] ?? s}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-sm text-muted-foreground">
        Working on this in your store?{" "}
        <Link to={cluster.relatedServicePath} className="text-primary underline">
          See our {cluster.relatedServiceLabel}
        </Link>
        .
      </div>
    </aside>
  );
}

// Convenience export: build a titles map from a POSTS record shape.
export function buildTitlesMap<T extends { slug: string; title: string }>(
  posts: Record<string, T>,
): Record<string, string> {
  const m: Record<string, string> = {};
  for (const p of Object.values(posts)) m[p.slug] = p.title;
  return m;
}

export { CLUSTERS };
