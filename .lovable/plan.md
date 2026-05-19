## What I'll build

### 1. Backend (Lovable Cloud)
- Enable Lovable Cloud
- New table `case_studies` with columns: id, slug, title, brand, category (ads/seo/cro), website_url, hero_metric, hero_label, problem, strategy (text[]), takeaway, results (jsonb — array of {label, value, sub}), ad_metrics (jsonb — {spend, roas, cpa, purchases, ctr, conv_rate}), before_image_url, after_image_url, screenshot_url, published, created_at
- `app_role` enum + `user_roles` table + `has_role()` SECURITY DEFINER function (per security best practice — no role on profiles)
- RLS: public can SELECT published rows; only admins can insert/update/delete
- Storage bucket `case-study-media` (public read, admin-only write) for before/after screenshots and site previews

### 2. Admin
- Email/password auth (sign in only — you'll seed your admin via SQL)
- Route `/admin/case-studies` (protected via `_authenticated` layout + admin role check)
- Form to create/edit: paste real metrics, website URL, problem/strategy/takeaway, dynamic results blocks (min 3), ad metrics fields, upload before/after/screenshot images
- List view with edit/delete + published toggle
- Login page at `/admin/login`

### 3. Case studies page upgrades
- Fetch DB case studies + merge with the existing 39 hardcoded seeds (seeds stay)
- Pagination: 39 per page with Prev/Next + page numbers
- Each card shows a clickable mini website preview (iframe thumbnail with hover overlay → opens site in new tab)
- Details modal expanded:
  - Always renders ≥3 result blocks per category (Ads / SEO / CRO sections inside one modal as relevant)
  - Clickable "Visit live site" button with favicon + domain
  - Before/After image comparison when present (slider or side-by-side)

### 4. Realistic ad metrics dashboard
Rebuild `CaseStudyExtras` Ads Performance section to look like a real ad-platform dashboard:
- Top KPI row: Spend, Revenue, Blended ROAS, CPA, Purchases, AOV (all internally consistent — Revenue = Spend × ROAS, CPA = Spend / Purchases, etc.)
- Channel breakdown table (Meta, Google, TikTok) with consistent math per row
- 14-day spend vs revenue line chart (SVG, smooth, with grid + tooltips)
- Funnel: Impressions → Clicks → ATC → Checkout → Purchase with realistic drop-offs

## Technical notes

- TanStack file routes: `src/routes/admin.login.tsx`, `src/routes/_authenticated/admin.case-studies.tsx`, `src/routes/_authenticated/admin.case-studies.$id.tsx`
- Server fns in `src/lib/case-studies.functions.ts` (list/get public; admin CRUD gated by `requireSupabaseAuth` + `has_role` check)
- Storage uploads via signed admin uploads from the admin form
- Pagination uses URL search params (`?page=2`) so it's shareable/SEO-friendly
- Website preview: `<iframe sandbox loading="lazy">` scaled-down + pointer-events-none overlay, link wraps it

## What you'll do after I ship
1. Sign up at `/admin/login` with your email
2. I'll give you a SQL snippet to run that grants your user the `admin` role
3. Start adding real case studies

Confirm and I'll build it.