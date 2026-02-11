
-- Remove overly permissive policy - service_role bypasses RLS by default
DROP POLICY "Service role full access" ON public.payments;
