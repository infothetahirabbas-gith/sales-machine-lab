CREATE TABLE public.audit_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  website TEXT NOT NULL,
  goal TEXT,
  overall_score INTEGER,
  source TEXT NOT NULL DEFAULT 'audit-tool'
);
GRANT ALL ON public.audit_leads TO service_role;
ALTER TABLE public.audit_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read audit leads" ON public.audit_leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
GRANT SELECT ON public.audit_leads TO authenticated;

CREATE TABLE public.audit_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  cache_key TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  payload JSONB NOT NULL
);
CREATE INDEX audit_cache_created_at_idx ON public.audit_cache (created_at DESC);
GRANT ALL ON public.audit_cache TO service_role;
ALTER TABLE public.audit_cache ENABLE ROW LEVEL SECURITY;