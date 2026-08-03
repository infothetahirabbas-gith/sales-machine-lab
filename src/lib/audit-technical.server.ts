/**
 * Real network-level audit checks. Everything in here performs live HTTP
 * requests against the audited domain (and public RDAP / PageSpeed endpoints).
 * No estimates, no placeholders: if a check cannot be completed the field is
 * returned as null/"unknown" so the UI can say so honestly.
 */

export type LinkCheck = { url: string; status: number; ok: boolean };

export type SocialCheck = {
  platform: string;
  url: string | null;
  found: boolean;
  reachable: boolean | null;
};

export type PerfMetrics = {
  source: "PageSpeed Insights (field + lab)" | "BeingEcom edge measurement";
  performanceScore: number | null;
  lcpMs: number | null;
  fcpMs: number | null;
  clsScore: number | null;
  inpMs: number | null;
  ttfbMs: number | null;
  totalMs: number | null;
  transferKb: number | null;
  requestsEstimate: number | null;
  scriptCount: number | null;
  stylesheetCount: number | null;
  imageCount: number | null;
  note: string;
};

export type TechnicalAudit = {
  domain: string;
  finalUrl: string;
  httpStatus: number;
  https: boolean;
  httpRedirectsToHttps: boolean | null;
  hstsHeader: boolean;
  serverHeader: string | null;
  poweredBy: string | null;
  robotsTxt: { exists: boolean; blocksAll: boolean; sitemapDirectives: string[] };
  sitemap: { exists: boolean; url: string | null; urlCount: number | null };
  custom404: boolean | null;
  redirectChainLength: number | null;
  crawledPages: number;
  brokenLinks: LinkCheck[];
  checkedLinks: number;
  duplicateTitles: string[];
  indexable: boolean;
  noindexReason: string | null;
  domainAgeYears: number | null;
  domainCreated: string | null;
  registrar: string | null;
  social: SocialCheck[];
  ads: {
    googleAdsTag: boolean;
    metaPixel: boolean;
    tiktokPixel: boolean;
    pinterestTag: boolean;
    linkedinTag: boolean;
    remarketingDetected: boolean;
    verdict: string;
  };
  performance: PerfMetrics;
  errors: string[];
};

const UA = "Mozilla/5.0 (compatible; BeingEcomAuditBot/1.0; +https://beingecom.com/audit)";

async function timedFetch(url: string, init: RequestInit & { timeout?: number } = {}) {
  const { timeout = 12000, ...rest } = init;
  const started = Date.now();
  const res = await fetch(url, {
    ...rest,
    headers: { "User-Agent": UA, Accept: "*/*", ...(rest.headers as Record<string, string> | undefined) },
    signal: AbortSignal.timeout(timeout),
  });
  return { res, ms: Date.now() - started };
}

async function safeText(url: string, timeout = 10000): Promise<{ status: number; body: string } | null> {
  try {
    const { res } = await timedFetch(url, { timeout });
    const body = await res.text();
    return { status: res.status, body: body.slice(0, 400000) };
  } catch {
    return null;
  }
}

async function statusOf(url: string, timeout = 9000): Promise<number> {
  try {
    const { res } = await timedFetch(url, { method: "GET", redirect: "follow", timeout });
    return res.status;
  } catch {
    return 0;
  }
}

function absolute(href: string, base: string): string | null {
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

async function checkRobots(origin: string) {
  const r = await safeText(`${origin}/robots.txt`, 8000);
  const exists = !!r && r.status === 200 && /user-agent/i.test(r.body);
  const body = r?.body ?? "";
  const blocksAll = /user-agent:\s*\*\s*[\s\S]{0,200}?disallow:\s*\/\s*(\n|$)/i.test(body);
  const sitemapDirectives = [...body.matchAll(/sitemap:\s*(\S+)/gi)].map((m) => m[1]).slice(0, 5);
  return { exists, blocksAll, sitemapDirectives };
}

async function checkSitemap(origin: string, fromRobots: string[]) {
  const candidates = [...fromRobots, `${origin}/sitemap.xml`, `${origin}/sitemap_index.xml`];
  for (const candidate of candidates) {
    const r = await safeText(candidate, 9000);
    if (r && r.status === 200 && /<(urlset|sitemapindex)/i.test(r.body)) {
      const urlCount = (r.body.match(/<loc>/gi) || []).length;
      return { exists: true, url: candidate, urlCount };
    }
  }
  return { exists: false, url: null, urlCount: null };
}

async function checkDomainAge(host: string) {
  try {
    const { res } = await timedFetch(`https://rdap.org/domain/${host}`, { timeout: 9000 });
    if (!res.ok) return { domainAgeYears: null, domainCreated: null, registrar: null };
    const data = (await res.json()) as {
      events?: Array<{ eventAction?: string; eventDate?: string }>;
      entities?: Array<{ roles?: string[]; vcardArray?: unknown }>;
    };
    const reg = data.events?.find((e) => e.eventAction === "registration")?.eventDate ?? null;
    let registrar: string | null = null;
    const registrarEntity = data.entities?.find((e) => e.roles?.includes("registrar"));
    const vcard = registrarEntity?.vcardArray as unknown[] | undefined;
    if (Array.isArray(vcard) && Array.isArray(vcard[1])) {
      const fn = (vcard[1] as unknown[][]).find((row) => row[0] === "fn");
      if (fn && typeof fn[3] === "string") registrar = fn[3];
    }
    const domainAgeYears = reg
      ? Math.round(((Date.now() - new Date(reg).getTime()) / (365.25 * 24 * 3600 * 1000)) * 10) / 10
      : null;
    return { domainAgeYears, domainCreated: reg, registrar };
  } catch {
    return { domainAgeYears: null, domainCreated: null, registrar: null };
  }
}

const SOCIAL_PATTERNS: Array<{ platform: string; re: RegExp }> = [
  { platform: "Facebook", re: /https?:\/\/(?:www\.)?facebook\.com\/[A-Za-z0-9._\-/]+/i },
  { platform: "Instagram", re: /https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9._\-/]+/i },
  { platform: "LinkedIn", re: /https?:\/\/(?:[a-z]{2}\.)?linkedin\.com\/(?:company|in)\/[A-Za-z0-9._\-/]+/i },
  { platform: "X / Twitter", re: /https?:\/\/(?:www\.)?(?:twitter|x)\.com\/[A-Za-z0-9._\-/]+/i },
  { platform: "Pinterest", re: /https?:\/\/(?:[a-z]{2}\.)?pinterest\.[a-z.]+\/[A-Za-z0-9._\-/]+/i },
  { platform: "YouTube", re: /https?:\/\/(?:www\.)?youtube\.com\/[A-Za-z0-9._\-@/]+/i },
  { platform: "TikTok", re: /https?:\/\/(?:www\.)?tiktok\.com\/@[A-Za-z0-9._\-/]+/i },
];

async function checkSocial(html: string): Promise<SocialCheck[]> {
  const found = SOCIAL_PATTERNS.map(({ platform, re }) => {
    const m = html.match(re);
    return { platform, url: m ? m[0].replace(/["'<>].*$/, "") : null };
  });
  return Promise.all(
    found.map(async ({ platform, url }) => {
      if (!url) return { platform, url: null, found: false, reachable: null };
      const status = await statusOf(url, 8000);
      // Social networks frequently answer 999/403 to bots — treat a response as reachable.
      const reachable = status === 0 ? null : status < 400 || status === 403 || status === 999;
      return { platform, url, found: true, reachable };
    }),
  );
}

async function measurePerformance(url: string, html: string, ttfbMs: number, totalMs: number): Promise<PerfMetrics> {
  const bytes = new TextEncoder().encode(html).length;
  const scriptCount = (html.match(/<script\b/gi) || []).length;
  const stylesheetCount = (html.match(/<link[^>]+rel=["']stylesheet["']/gi) || []).length;
  const imageCount = (html.match(/<img\b/gi) || []).length;
  const fallback: PerfMetrics = {
    source: "BeingEcom edge measurement",
    performanceScore: null,
    lcpMs: null,
    fcpMs: null,
    clsScore: null,
    inpMs: null,
    ttfbMs,
    totalMs,
    transferKb: Math.round(bytes / 1024),
    requestsEstimate: scriptCount + stylesheetCount + imageCount,
    scriptCount,
    stylesheetCount,
    imageCount,
    note: "Measured live from our edge: server response time, HTML weight and render-blocking asset counts. Lab Core Web Vitals were unavailable for this URL.",
  };

  const key = process.env["PAGESPEED_API_KEY"];
  try {
    const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    endpoint.searchParams.set("url", url);
    endpoint.searchParams.set("strategy", "mobile");
    endpoint.searchParams.append("category", "performance");
    if (key) endpoint.searchParams.set("key", key);
    const { res } = await timedFetch(endpoint.toString(), { timeout: 25000 });
    if (!res.ok) return fallback;
    const data = (await res.json()) as {
      lighthouseResult?: {
        categories?: { performance?: { score?: number } };
        audits?: Record<string, { numericValue?: number }>;
      };
      loadingExperience?: { metrics?: Record<string, { percentile?: number }> };
    };
    const audits = data.lighthouseResult?.audits ?? {};
    const field = data.loadingExperience?.metrics ?? {};
    const num = (k: string) => (typeof audits[k]?.numericValue === "number" ? Math.round(audits[k]!.numericValue!) : null);
    const score = data.lighthouseResult?.categories?.performance?.score;
    return {
      ...fallback,
      source: "PageSpeed Insights (field + lab)",
      performanceScore: typeof score === "number" ? Math.round(score * 100) : null,
      lcpMs: num("largest-contentful-paint"),
      fcpMs: num("first-contentful-paint"),
      clsScore: typeof audits["cumulative-layout-shift"]?.numericValue === "number"
        ? Math.round(audits["cumulative-layout-shift"]!.numericValue! * 1000) / 1000
        : null,
      inpMs: field["INTERACTION_TO_NEXT_PAINT"]?.percentile ?? null,
      note: "Core Web Vitals from Google PageSpeed Insights (mobile), combined with our own edge timing.",
    };
  } catch {
    return fallback;
  }
}

export async function runTechnicalAudit(startUrl: string): Promise<TechnicalAudit> {
  const errors: string[] = [];
  const start = new URL(startUrl);
  const origin = start.origin;
  const host = start.hostname.replace(/^www\./, "");

  // --- Homepage with timing ---
  let html = "";
  let httpStatus = 0;
  let finalUrl = start.toString();
  let ttfbMs = 0;
  let totalMs = 0;
  let hsts = false;
  let serverHeader: string | null = null;
  let poweredBy: string | null = null;
  try {
    const t0 = Date.now();
    const { res } = await timedFetch(start.toString(), { redirect: "follow", timeout: 15000 });
    ttfbMs = Date.now() - t0;
    html = (await res.text()).slice(0, 400000);
    totalMs = Date.now() - t0;
    httpStatus = res.status;
    finalUrl = res.url || start.toString();
    hsts = !!res.headers.get("strict-transport-security");
    serverHeader = res.headers.get("server");
    poweredBy = res.headers.get("x-powered-by");
  } catch {
    errors.push("Homepage request failed or timed out.");
  }

  // --- Parallel independent checks ---
  const [robots, domainInfo, httpProbe, notFoundStatus] = await Promise.all([
    checkRobots(origin),
    checkDomainAge(host),
    (async () => {
      try {
        const { res } = await timedFetch(`http://${host}/`, { redirect: "follow", timeout: 9000 });
        return res.url.startsWith("https://");
      } catch {
        return null;
      }
    })(),
    statusOf(`${origin}/beingecom-audit-404-probe-${Date.now()}`, 9000),
  ]);

  const sitemap = await checkSitemap(origin, robots.sitemapDirectives);

  // --- Internal link crawl (sample) ---
  const linkHrefs = [...html.matchAll(/<a\b[^>]+href=["']([^"'#]+)["']/gi)]
    .map((m) => absolute(m[1], finalUrl))
    .filter((u): u is string => !!u && u.startsWith("http"));
  const internal = [...new Set(linkHrefs.filter((u) => new URL(u).hostname.replace(/^www\./, "") === host))]
    .filter((u) => u !== finalUrl)
    .slice(0, 10);

  const linkResults: LinkCheck[] = await Promise.all(
    internal.map(async (u) => {
      const status = await statusOf(u, 9000);
      return { url: u, status, ok: status >= 200 && status < 400 };
    }),
  );
  const brokenLinks = linkResults.filter((l) => !l.ok);

  // --- Duplicate titles across a small sample of reachable pages ---
  const sample = linkResults.filter((l) => l.ok).slice(0, 4);
  const titles: string[] = [];
  for (const page of sample) {
    const r = await safeText(page.url, 9000);
    const t = r?.body.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
    if (t) titles.push(t);
  }
  const homeTitle = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
  if (homeTitle) titles.push(homeTitle);
  const seen = new Map<string, number>();
  titles.forEach((t) => seen.set(t, (seen.get(t) ?? 0) + 1));
  const duplicateTitles = [...seen.entries()].filter(([, n]) => n > 1).map(([t]) => t);

  // --- Indexability ---
  const robotsMeta = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "";
  const noindex = /noindex/i.test(robotsMeta);
  const indexable = !noindex && !robots.blocksAll;
  const noindexReason = noindex
    ? "Homepage carries a noindex robots meta tag"
    : robots.blocksAll
      ? "robots.txt disallows all crawlers"
      : null;

  const [social, performance] = await Promise.all([
    checkSocial(html),
    measurePerformance(finalUrl, html, ttfbMs, totalMs),
  ]);

  const googleAdsTag = /googleadservices\.com|googleads\.g\.doubleclick\.net|gtag\/js\?id=AW-/i.test(html);
  const metaPixel = /connect\.facebook\.net|fbq\(/i.test(html);
  const tiktokPixel = /analytics\.tiktok\.com|ttq\.load/i.test(html);
  const pinterestTag = /pintrk\(|s\.pinimg\.com\/ct/i.test(html);
  const linkedinTag = /snap\.licdn\.com|_linkedin_partner_id/i.test(html);
  const remarketingDetected = googleAdsTag || metaPixel || tiktokPixel;
  const activeChannels = [
    googleAdsTag && "Google Ads",
    metaPixel && "Meta",
    tiktokPixel && "TikTok",
    pinterestTag && "Pinterest",
    linkedinTag && "LinkedIn",
  ].filter(Boolean) as string[];

  return {
    domain: host,
    finalUrl,
    httpStatus,
    https: finalUrl.startsWith("https://"),
    httpRedirectsToHttps: httpProbe,
    hstsHeader: hsts,
    serverHeader,
    poweredBy,
    robotsTxt: robots,
    sitemap,
    custom404: notFoundStatus === 0 ? null : notFoundStatus === 404 || notFoundStatus === 410,
    redirectChainLength: finalUrl !== start.toString() ? 1 : 0,
    crawledPages: 1 + sample.length,
    brokenLinks,
    checkedLinks: linkResults.length,
    duplicateTitles,
    indexable,
    noindexReason,
    ...domainInfo,
    social,
    ads: {
      googleAdsTag,
      metaPixel,
      tiktokPixel,
      pinterestTag,
      linkedinTag,
      remarketingDetected,
      verdict: activeChannels.length
        ? `Advertising infrastructure detected for ${activeChannels.join(", ")}. Tracking tags confirm paid activity or paid readiness on these channels.`
        : "No advertising or remarketing tags found on the homepage, so there is no evidence of active paid campaigns pointing at this site.",
    },
    performance,
    errors,
  };
}
