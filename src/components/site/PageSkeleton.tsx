/**
 * Lightweight skeleton shown as the router's defaultPendingComponent.
 * Only visible when a route takes longer than `defaultPendingMs` to load -
 * for cached / preloaded routes it never appears.
 */
export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-24 pb-16 animate-pulse">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="mt-6 h-12 w-3/4 rounded-lg bg-muted" />
        <div className="mt-4 h-12 w-2/3 rounded-lg bg-muted" />
        <div className="mt-8 h-5 w-1/2 rounded bg-muted/70" />
        <div className="mt-3 h-5 w-2/5 rounded bg-muted/70" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl border border-border/60 p-6">
              <div className="h-40 rounded-xl bg-muted" />
              <div className="mt-4 h-4 w-2/3 rounded bg-muted" />
              <div className="mt-2 h-4 w-1/2 rounded bg-muted/70" />
              <div className="mt-4 h-3 w-full rounded bg-muted/60" />
              <div className="mt-2 h-3 w-4/5 rounded bg-muted/60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
