REVOKE ALL ON public.audit_cache FROM anon, authenticated;
GRANT ALL ON public.audit_cache TO service_role;
ALTER TABLE public.audit_cache ENABLE ROW LEVEL SECURITY;