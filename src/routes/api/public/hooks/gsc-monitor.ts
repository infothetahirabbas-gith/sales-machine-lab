import { createFileRoute } from '@tanstack/react-router'

// Public monitor endpoint hit by pg_cron every 12 hours for 14 days.
// Pulls sitemap indexing progress + inspects the previously-pending pages
// from Google Search Console and writes a row into public.gsc_monitor_log.
// Rows with has_error=true are what the user should watch.

const SITE_URL = 'https://beingecom.com/'
const SITE_PROPERTY = encodeURIComponent(SITE_URL)
const SITEMAPS = [
  'https://beingecom.com/sitemap.xml',
  'https://beingecom.com/sitemap-pages.xml',
  'https://beingecom.com/sitemap-services.xml',
  'https://beingecom.com/sitemap-locations.xml',
  'https://beingecom.com/sitemap-industries.xml',
  'https://beingecom.com/sitemap-case-studies.xml',
]
const PAGES = [
  'https://beingecom.com/',
  'https://beingecom.com/services',
  'https://beingecom.com/services/paid-ads',
  'https://beingecom.com/services/seo',
  'https://beingecom.com/pricing',
  'https://beingecom.com/case-studies',
]

const GATEWAY = 'https://connector-gateway.lovable.dev/google_search_console'

async function gscFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.LOVABLE_API_KEY!}`,
      'X-Connection-Api-Key': process.env.GOOGLE_SEARCH_CONSOLE_API_KEY!,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  const body = await res.text()
  return { status: res.status, body }
}

export const Route = createFileRoute('/api/public/hooks/gsc-monitor')({
  server: {
    handlers: {
      POST: async () => {
        if (!process.env.LOVABLE_API_KEY || !process.env.GOOGLE_SEARCH_CONSOLE_API_KEY) {
          return new Response(JSON.stringify({ error: 'GSC connector not linked' }), { status: 500 })
        }

        const errors: string[] = []
        const sitemapReport: Record<string, unknown>[] = []
        const pageReport: Record<string, unknown>[] = []

        // Sitemaps
        for (const sm of SITEMAPS) {
          const r = await gscFetch(`/webmasters/v3/sites/${SITE_PROPERTY}/sitemaps/${encodeURIComponent(sm)}`)
          if (r.status !== 200) {
            errors.push(`sitemap ${sm}: HTTP ${r.status}`)
            sitemapReport.push({ sitemap: sm, status: r.status })
            continue
          }
          const j = JSON.parse(r.body)
          const submitted = (j.contents ?? []).reduce((n: number, x: any) => n + Number(x.submitted ?? 0), 0)
          const indexed = (j.contents ?? []).reduce((n: number, x: any) => n + Number(x.indexed ?? 0), 0)
          const w = Number(j.warnings ?? 0), e = Number(j.errors ?? 0)
          sitemapReport.push({ sitemap: sm, submitted, indexed, warnings: w, errors: e })
          if (e > 0) errors.push(`sitemap ${sm}: ${e} errors`)
        }

        // URL inspection
        for (const url of PAGES) {
          const r = await gscFetch('/v1/urlInspection/index:inspect', {
            method: 'POST',
            body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
          })
          if (r.status !== 200) {
            errors.push(`inspect ${url}: HTTP ${r.status}`)
            pageReport.push({ url, status: r.status })
            continue
          }
          const j = JSON.parse(r.body).inspectionResult ?? {}
          const s = j.indexStatusResult ?? {}
          pageReport.push({
            url,
            verdict: s.verdict,
            coverage: s.coverageState,
            googleCanonical: s.googleCanonical,
            userCanonical: s.userCanonical,
            lastCrawl: s.lastCrawlTime,
          })
          if (s.googleCanonical && s.userCanonical && s.googleCanonical !== s.userCanonical) {
            errors.push(`canonical mismatch ${url}: user=${s.userCanonical} google=${s.googleCanonical}`)
          }
          if (s.pageFetchState && !['PAGE_FETCH_STATE_UNSPECIFIED', 'SUCCESSFUL'].includes(s.pageFetchState)) {
            errors.push(`fetch state ${url}: ${s.pageFetchState}`)
          }
        }

        // Persist result via admin client
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
        const { error: insertErr } = await supabaseAdmin.from('gsc_monitor_log').insert({
          has_error: errors.length > 0,
          errors,
          sitemaps: sitemapReport,
          pages: pageReport,
        })
        if (insertErr) console.error('[gsc-monitor] insert failed:', insertErr)

        if (errors.length) console.error('[gsc-monitor] errors:', errors)
        else console.log('[gsc-monitor] ok — no errors')

        return new Response(
          JSON.stringify({ ok: true, has_error: errors.length > 0, errors, sitemaps: sitemapReport, pages: pageReport }),
          { headers: { 'Content-Type': 'application/json' } },
        )
      },
    },
  },
})
