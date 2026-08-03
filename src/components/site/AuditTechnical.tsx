import {
  Globe, ShieldCheck, Gauge, Share2, Megaphone, CheckCircle2, XCircle, MinusCircle, ExternalLink,
} from "lucide-react";
import type { TechnicalAudit } from "../../lib/store-audit.functions";

function Verdict({ ok, label, detail }: { ok: boolean | null; label: string; detail?: string }) {
  const Icon = ok === null ? MinusCircle : ok ? CheckCircle2 : XCircle;
  const tone = ok === null ? "text-muted-foreground" : ok ? "text-emerald-600" : "text-destructive";
  return (
    <div className="flex items-start gap-2 py-1.5">
      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${tone}`} />
      <div className="min-w-0">
        <div className="text-sm text-ink font-medium">{label}</div>
        {detail && <div className="text-xs text-muted-foreground break-words">{detail}</div>}
      </div>
    </div>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="p-3 rounded-xl bg-card border border-border">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-lg font-bold text-ink">{value}</div>
      {hint && <div className="text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

function Panel({ icon: Icon, title, kicker, children }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string; kicker?: string; children: React.ReactNode;
}) {
  return (
    <div className="card-surface p-5 lg:p-6">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-4.5 h-4.5 text-primary" />
        </div>
        <div>
          <h3 className="text-base font-bold text-ink leading-tight">{title}</h3>
          {kicker && <p className="text-xs text-muted-foreground">{kicker}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

const ms = (v: number | null) => (v === null ? "Not available" : `${(v / 1000).toFixed(2)}s`);

export default function AuditTechnical({ t }: { t: TechnicalAudit }) {
  const perf = t.performance;
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Panel icon={Globe} title="Domain & indexing" kicker="Live registry and crawl data">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Metric label="Domain" value={t.domain} />
          <Metric
            label="Domain age"
            value={t.domainAgeYears !== null ? `${t.domainAgeYears} yrs` : "Not published"}
            hint={t.domainCreated ? `Registered ${new Date(t.domainCreated).toLocaleDateString("en-GB")}` : undefined}
          />
        </div>
        <Verdict ok={t.indexable} label={t.indexable ? "Indexable by search engines" : "Blocked from indexing"} detail={t.noindexReason ?? undefined} />
        <Verdict ok={t.robotsTxt.exists} label="robots.txt present" detail={t.robotsTxt.blocksAll ? "Warning: disallows all crawlers" : t.robotsTxt.sitemapDirectives[0]} />
        <Verdict
          ok={t.sitemap.exists}
          label="XML sitemap"
          detail={t.sitemap.exists ? `${t.sitemap.urlCount} URLs at ${t.sitemap.url}` : "No sitemap found at the standard locations"}
        />
        <Verdict ok={t.custom404} label="Correct 404 handling" detail={t.custom404 === null ? "Could not be tested" : t.custom404 ? "Unknown URLs return a 404 status" : "Unknown URLs return a 200 status (soft 404)"} />
        {t.registrar && <p className="mt-2 text-xs text-muted-foreground">Registrar: {t.registrar}</p>}
      </Panel>

      <Panel icon={ShieldCheck} title="Technical SEO & security" kicker={`${t.crawledPages} pages crawled · ${t.checkedLinks} links verified`}>
        <Verdict ok={t.https} label="Served over HTTPS" detail={`Final URL ${t.finalUrl}`} />
        <Verdict ok={t.httpRedirectsToHttps} label="HTTP redirects to HTTPS" detail={t.httpRedirectsToHttps === null ? "No response on plain HTTP" : undefined} />
        <Verdict ok={t.hstsHeader} label="HSTS header set" />
        <Verdict
          ok={t.brokenLinks.length === 0}
          label={t.brokenLinks.length === 0 ? "No broken internal links in sample" : `${t.brokenLinks.length} broken internal link(s)`}
          detail={t.brokenLinks.slice(0, 3).map((l) => `${l.status || "no response"} · ${l.url}`).join(" | ") || undefined}
        />
        <Verdict
          ok={t.duplicateTitles.length === 0}
          label={t.duplicateTitles.length === 0 ? "No duplicate titles in sample" : `Duplicate title tag: "${t.duplicateTitles[0]}"`}
        />
        {(t.serverHeader || t.poweredBy) && (
          <p className="mt-2 text-xs text-muted-foreground">Hosting signals: {[t.serverHeader, t.poweredBy].filter(Boolean).join(" · ")}</p>
        )}
      </Panel>

      <Panel icon={Gauge} title="Performance & Core Web Vitals" kicker={perf.source}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Metric label="Performance" value={perf.performanceScore !== null ? `${perf.performanceScore}/100` : "n/a"} />
          <Metric label="LCP" value={ms(perf.lcpMs)} />
          <Metric label="FCP" value={ms(perf.fcpMs)} />
          <Metric label="CLS" value={perf.clsScore !== null ? perf.clsScore.toFixed(3) : "n/a"} />
          <Metric label="INP (field)" value={perf.inpMs !== null ? `${perf.inpMs}ms` : "n/a"} />
          <Metric label="Server response" value={perf.ttfbMs !== null ? `${perf.ttfbMs}ms` : "n/a"} />
          <Metric label="HTML weight" value={perf.transferKb !== null ? `${perf.transferKb} KB` : "n/a"} />
          <Metric label="Scripts" value={String(perf.scriptCount ?? 0)} hint="render-blocking risk" />
          <Metric label="Stylesheets" value={String(perf.stylesheetCount ?? 0)} />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{perf.note}</p>
      </Panel>

      <Panel icon={Share2} title="Social presence" kicker="Profiles linked from the site, verified live">
        {t.social.map((s) => (
          <Verdict
            key={s.platform}
            ok={s.found ? (s.reachable ?? true) : false}
            label={s.platform}
            detail={s.url ? s.url.replace(/^https?:\/\/(www\.)?/, "") : "No profile linked from the website"}
          />
        ))}
        <p className="mt-2 text-xs text-muted-foreground">
          {t.social.filter((s) => s.found).length}/{t.social.length} platforms linked. Missing platforms are unlinked from the site, which costs both referral traffic and brand entity signals.
        </p>
      </Panel>

      <Panel icon={Megaphone} title="Paid advertising signals" kicker="Detected from live tracking infrastructure">
        <Verdict ok={t.ads.googleAdsTag} label="Google Ads / remarketing tag" />
        <Verdict ok={t.ads.metaPixel} label="Meta Pixel" />
        <Verdict ok={t.ads.tiktokPixel} label="TikTok Pixel" />
        <Verdict ok={t.ads.pinterestTag} label="Pinterest tag" />
        <Verdict ok={t.ads.linkedinTag} label="LinkedIn Insight tag" />
        <p className="mt-2 text-sm text-ink leading-relaxed">{t.ads.verdict}</p>
        <a
          href={`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=GB&q=${encodeURIComponent(t.domain)}`}
          target="_blank" rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          Verify live creatives in the Meta Ads Library <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </Panel>
    </div>
  );
}
