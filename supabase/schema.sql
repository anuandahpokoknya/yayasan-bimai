-- ============================================================================
-- SKEMA DATABASE SUPABASE: WEBSITE BIMAI PEDULI (yayasan-bimai)
-- ============================================================================
-- Database ini khusus untuk portal donasi publik (bimaipeduli.id), terpisah
-- dari database internal CRM (crm-bimai) agar analisis leads website vs
-- leads iklan CTWA tetap bersih dan terisolasi.
--
-- Pastikan di Environment Variables production Anda mengisi:
-- - NEXT_PUBLIC_SUPABASE_URL
-- - NEXT_PUBLIC_SUPABASE_ANON_KEY
-- - SUPABASE_SERVICE_ROLE_KEY (wajib untuk API route server-side agar RLS aman)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS public.donations (
  id BIGSERIAL PRIMARY KEY,
  merchant_order_id TEXT NOT NULL UNIQUE,
  jenis_donasi TEXT NOT NULL DEFAULT 'sedekah-umum',
  donor_name TEXT NOT NULL DEFAULT 'Hamba Allah',
  phone TEXT,
  amount BIGINT NOT NULL CHECK (amount >= 10000),
  payment_method TEXT NOT NULL DEFAULT 'QRIS',
  wakif_name TEXT,
  niat TEXT,
  status_payment TEXT NOT NULL DEFAULT 'pending' CHECK (status_payment IN ('pending', 'success', 'failed')),
  payment_code TEXT,
  payment_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_donations_order_id ON public.donations(merchant_order_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations(status_payment);
CREATE INDEX IF NOT EXISTS idx_donations_jenis ON public.donations(jenis_donasi);
CREATE INDEX IF NOT EXISTS idx_donations_phone ON public.donations(phone);

DROP TRIGGER IF EXISTS set_donations_updated_at ON public.donations;
CREATE TRIGGER set_donations_updated_at
  BEFORE UPDATE ON public.donations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Row Level Security: Lindungi data pribadi donatur (nomor HP, dll.)
-- API Next.js (/api/donations/inquiry & callback) memakai SUPABASE_SERVICE_ROLE_KEY.
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can manage donations" ON public.donations;
CREATE POLICY "Authenticated users can manage donations"
  ON public.donations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
