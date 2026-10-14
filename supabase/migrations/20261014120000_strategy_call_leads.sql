-- Strategy-call lead capture table (P0 fix, 2026-10-14).
--
-- The contact page "Book Strategy Call" form previously showed a success
-- message without storing anything. Leads are now persisted here by the
-- `saveStrategyCallLead` server function (src/lib/strategy-call.functions.ts)
-- using the service-role key.
--
-- HOW TO APPLY: run this file once in the Supabase Dashboard → SQL Editor
-- (or `supabase db push` if you use the CLI). Until it is applied, the form
-- shows an honest "not configured" error instead of a false success.
--
-- Row Level Security is ENABLED with no public policies: only the
-- service-role key (server side) can read/write. Do not add anon policies.

create table if not exists public.strategy_call_leads (
  id uuid primary key default gen_random_uuid(),
  -- Client-generated UUID per form instance; unique so retries and double
  -- submits never create duplicate leads.
  idempotency_key text not null unique,
  name text not null,
  email text not null,
  store_url text not null,
  revenue text,
  spend text,
  message text,
  plan text,
  consent boolean not null default true,
  -- Attribution: which location CTA (if any) brought the visitor.
  city text,
  city_slug text,
  region text,
  placement text,
  source text not null default 'contact-form',
  -- 'pending' until a notification channel (email/CRM webhook) is wired up.
  -- Storage is the authority; notification is best-effort.
  notification_status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.strategy_call_leads enable row level security;

create index if not exists strategy_call_leads_created_at_idx
  on public.strategy_call_leads (created_at desc);

create index if not exists strategy_call_leads_email_idx
  on public.strategy_call_leads (email);
