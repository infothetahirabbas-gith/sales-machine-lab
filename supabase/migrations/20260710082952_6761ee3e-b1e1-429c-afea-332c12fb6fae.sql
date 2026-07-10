DROP POLICY IF EXISTS "Authenticated users can read gsc_monitor_log" ON public.gsc_monitor_log;
DROP POLICY IF EXISTS "Anyone authenticated can read gsc_monitor_log" ON public.gsc_monitor_log;
DROP POLICY IF EXISTS "Read gsc_monitor_log" ON public.gsc_monitor_log;
DROP POLICY IF EXISTS "gsc_monitor_log_select" ON public.gsc_monitor_log;

CREATE POLICY "Admins can read gsc_monitor_log"
ON public.gsc_monitor_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));