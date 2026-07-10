CREATE TABLE public.gsc_monitor_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  has_error BOOLEAN NOT NULL DEFAULT false,
  errors JSONB NOT NULL DEFAULT '[]'::jsonb,
  sitemaps JSONB NOT NULL DEFAULT '[]'::jsonb,
  pages JSONB NOT NULL DEFAULT '[]'::jsonb
);
GRANT SELECT ON public.gsc_monitor_log TO authenticated;
GRANT ALL ON public.gsc_monitor_log TO service_role;
ALTER TABLE public.gsc_monitor_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "authenticated can read gsc monitor log" ON public.gsc_monitor_log FOR SELECT TO authenticated USING (true);
CREATE INDEX gsc_monitor_log_created_at_idx ON public.gsc_monitor_log (created_at DESC);
CREATE INDEX gsc_monitor_log_has_error_idx ON public.gsc_monitor_log (created_at DESC) WHERE has_error;