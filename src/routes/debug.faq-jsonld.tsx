import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/debug/faq-jsonld")({
  component: FaqJsonLdInspector,
  head: () => ({
    meta: [
      { title: "FAQ JSON-LD Inspector - Debug" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const ROUTES = [
  { label: "Home (/)", alias: "home", path: "/" },
  { label: "About (/about)", alias: "about", path: "/about" },
  { label: "Audit (/audit)", alias: "audit", path: "/audit" },
  { label: "Contact (/contact)", alias: "contact", path: "/contact" },
  { label: "Services (/services)", alias: "services", path: "/services" },
  { label: "Case Studies (/case-studies)", alias: "casestudies", path: "/case-studies" },
];

interface ApiResponse {
  requestedPath?: string;
  canonicalPath?: string;
  questionCount?: number;
  scriptTag?: string;
  jsonld?: unknown;
  validation?: {
    valid: boolean;
    errorCount: number;
    errors: string[];
    schema: string;
  };
  error?: string;
}

interface DiffLine {
  kind: "same" | "add" | "del";
  text: string;
}

function diffLines(prev: string, next: string): DiffLine[] {
  // LCS-based line diff. Small inputs so O(n*m) is fine.
  const a = prev.split("\n");
  const b = next.split("\n");
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      out.push({ kind: "same", text: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      out.push({ kind: "del", text: a[i] });
      i++;
    } else {
      out.push({ kind: "add", text: b[j] });
      j++;
    }
  }
  while (i < n) out.push({ kind: "del", text: a[i++] });
  while (j < m) out.push({ kind: "add", text: b[j++] });
  return out;
}

function FaqJsonLdInspector() {
  const [selected, setSelected] = useState(ROUTES[0].alias);
  const [useAlias, setUseAlias] = useState(true);
  const [validate, setValidate] = useState(true);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const previousRef = useRef<string | null>(null);
  const [diff, setDiff] = useState<DiffLine[] | null>(null);

  const route = ROUTES.find((r) => r.alias === selected) ?? ROUTES[0];

  const fetchIt = async () => {
    setLoading(true);
    setError(null);
    try {
      const param = useAlias ? route.alias : route.path;
      const qs = new URLSearchParams({ path: param });
      if (validate) qs.set("debug", "1");
      const res = await fetch(`/api/public/debug/faq-jsonld?${qs.toString()}`, { cache: "no-store" });
      const json: ApiResponse = await res.json();
      if (!res.ok) {
        setError(json.error ?? `HTTP ${res.status}`);
        setData(json);
      } else {
        const nextStr = JSON.stringify(json.jsonld, null, 2);
        if (previousRef.current && previousRef.current !== nextStr) {
          setDiff(diffLines(previousRef.current, nextStr));
        } else {
          setDiff(null);
        }
        previousRef.current = nextStr;
        setData(json);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch once on mount and when route changes
  useEffect(() => {
    fetchIt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, useAlias, validate]);

  const pretty = useMemo(() => (data?.jsonld ? JSON.stringify(data.jsonld, null, 2) : ""), [data]);

  const copy = async () => {
    if (!pretty) return;
    await navigator.clipboard.writeText(pretty);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">FAQ JSON-LD Inspector</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Debug tool for <code className="text-xs bg-secondary px-1.5 py-0.5 rounded">/api/public/debug/faq-jsonld</code>.
            Not indexed. Not linked from the public site.
          </p>
        </header>

        <div className="card-surface p-5 mb-6">
          <div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto] md:items-end">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Route</span>
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
              >
                {ROUTES.map((r) => (
                  <option key={r.alias} value={r.alias}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={useAlias} onChange={(e) => setUseAlias(e.target.checked)} />
              Use alias
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={validate} onChange={(e) => setValidate(e.target.checked)} />
              Validate
            </label>
            <button
              onClick={fetchIt}
              disabled={loading}
              className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold disabled:opacity-50"
            >
              {loading ? "Fetching…" : "Refetch"}
            </button>
          </div>

          <div className="mt-3 text-xs text-muted-foreground font-mono break-all">
            GET /api/public/debug/faq-jsonld?path={useAlias ? route.alias : route.path}
            {validate ? "&debug=1" : ""}
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {data && !error && (
          <>
            <div className="grid gap-3 sm:grid-cols-3 mb-4">
              <Stat label="Requested" value={data.requestedPath ?? "-"} />
              <Stat label="Canonical" value={data.canonicalPath ?? "-"} />
              <Stat label="Questions" value={String(data.questionCount ?? "-")} />
            </div>

            {data.validation && (
              <div
                className={`mb-4 rounded-lg border p-4 text-sm ${
                  data.validation.valid
                    ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-700"
                    : "border-destructive/30 bg-destructive/5 text-destructive"
                }`}
              >
                <div className="font-semibold">
                  {data.validation.valid
                    ? "✓ Valid against schema.org/FAQPage"
                    : `✗ ${data.validation.errorCount} schema error(s)`}
                </div>
                {!data.validation.valid && (
                  <ul className="mt-2 list-disc pl-5 space-y-1">
                    {data.validation.errors.map((e, i) => (
                      <li key={i} className="font-mono text-xs">
                        {e}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="card-surface overflow-hidden mb-6">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-secondary/40">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  JSON-LD
                </span>
                <button
                  onClick={copy}
                  className="text-xs font-semibold px-2.5 py-1 rounded bg-primary text-primary-foreground"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="text-xs leading-relaxed overflow-auto p-4 max-h-[480px] font-mono">{pretty}</pre>
            </div>

            <div className="card-surface overflow-hidden">
              <div className="px-4 py-2 border-b border-border bg-secondary/40">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Diff vs previous fetch
                </span>
              </div>
              {diff ? (
                <pre className="text-xs leading-relaxed overflow-auto p-4 max-h-[360px] font-mono">
                  {diff.map((l, i) => (
                    <div
                      key={i}
                      className={
                        l.kind === "add"
                          ? "bg-emerald-500/10 text-emerald-700"
                          : l.kind === "del"
                            ? "bg-destructive/10 text-destructive"
                            : "text-muted-foreground"
                      }
                    >
                      <span className="select-none mr-2">
                        {l.kind === "add" ? "+" : l.kind === "del" ? "-" : " "}
                      </span>
                      {l.text}
                    </div>
                  ))}
                </pre>
              ) : (
                <div className="p-4 text-xs text-muted-foreground">
                  No previous fetch to diff against - change the route or refetch after edits to compare.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-surface p-3">
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-mono text-sm break-all">{value}</div>
    </div>
  );
}
