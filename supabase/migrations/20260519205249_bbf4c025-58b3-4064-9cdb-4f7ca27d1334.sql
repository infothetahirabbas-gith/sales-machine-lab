
-- Restrict EXECUTE on has_role; RLS policies invoke it via the postgres role internally.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

-- Tighten storage SELECT: drop the broad public-read policy.
-- Direct file URLs still resolve because Supabase Storage serves public buckets at the /object/public/ path.
DROP POLICY IF EXISTS "Public can read case study media" ON storage.objects;

CREATE POLICY "Admins can list case study media"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'case-study-media' AND public.has_role(auth.uid(), 'admin'));
