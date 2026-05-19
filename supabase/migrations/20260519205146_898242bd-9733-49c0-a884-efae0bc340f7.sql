
-- 1. Roles enum + table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 2. has_role security definer function (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 3. user_roles policies
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4. case_studies table
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  industry TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('Ads','SEO','CRO')),
  website_url TEXT,
  hero_metric TEXT NOT NULL,
  hero_metric_label TEXT NOT NULL,
  duration TEXT NOT NULL DEFAULT '',
  problem TEXT NOT NULL DEFAULT '',
  strategy JSONB NOT NULL DEFAULT '[]'::jsonb,    -- string[]
  takeaway TEXT NOT NULL DEFAULT '',
  results JSONB NOT NULL DEFAULT '[]'::jsonb,     -- {v,l,sub?}[]
  ad_metrics JSONB,                                -- {spend,roas,cpa,purchases,ctr,conv_rate,aov}
  before_image_url TEXT,
  after_image_url TEXT,
  screenshot_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_case_studies_published ON public.case_studies(published, sort_order DESC, created_at DESC);
CREATE INDEX idx_case_studies_category ON public.case_studies(category);

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published case studies"
  ON public.case_studies FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can view all case studies"
  ON public.case_studies FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert case studies"
  ON public.case_studies FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update case studies"
  ON public.case_studies FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete case studies"
  ON public.case_studies FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER case_studies_updated_at
  BEFORE UPDATE ON public.case_studies
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- 5. Storage bucket for case study media
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-study-media', 'case-study-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read case study media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'case-study-media');

CREATE POLICY "Admins can upload case study media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'case-study-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update case study media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'case-study-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete case study media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'case-study-media' AND public.has_role(auth.uid(), 'admin'));
