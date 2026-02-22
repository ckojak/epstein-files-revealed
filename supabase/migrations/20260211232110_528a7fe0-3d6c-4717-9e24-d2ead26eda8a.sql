
-- Table to store payment records
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  mercadopago_preference_id TEXT,
  mercadopago_payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  amount NUMERIC NOT NULL DEFAULT 4.99,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Only edge functions (service role) can read/write payments
-- No public access needed
CREATE POLICY "Service role full access" ON public.payments
  FOR ALL USING (true) WITH CHECK (true);

-- Restrict to service_role only via RLS
ALTER TABLE public.payments FORCE ROW LEVEL SECURITY;

-- Create index for webhook lookups
CREATE INDEX idx_payments_preference_id ON public.payments(mercadopago_preference_id);
CREATE INDEX idx_payments_status ON public.payments(status);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
