CREATE TABLE public.news_cache (
  id text PRIMARY KEY DEFAULT 'top40',
  payload jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.news_cache TO anon, authenticated;
GRANT ALL ON public.news_cache TO service_role;
ALTER TABLE public.news_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leitura publica news_cache" ON public.news_cache FOR SELECT USING (true);