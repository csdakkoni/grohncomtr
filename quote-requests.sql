-- Quote requests / lead log
-- Web form submissions (/api/quote) and leads entered by hand in the admin panel
-- (WhatsApp, e-mail, phone). Run once in the Supabase SQL Editor.

CREATE TABLE IF NOT EXISTS quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    source TEXT NOT NULL DEFAULT 'web',      -- web | whatsapp | email | phone | other
    product TEXT NOT NULL,
    product_slug TEXT,
    quantity NUMERIC,
    unit TEXT,                               -- kg | ton | ibc | container
    country TEXT,
    port TEXT,
    incoterm TEXT,
    target_price TEXT,
    name TEXT,
    company TEXT,
    email TEXT,
    phone TEXT,
    message TEXT,
    page_url TEXT,
    locale TEXT,
    status TEXT NOT NULL DEFAULT 'new',      -- new | quoted | won | lost
    quoted_price TEXT,
    notes TEXT
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit quote requests" ON quote_requests
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Admins read quote requests" ON quote_requests
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Admins update quote requests" ON quote_requests
    FOR UPDATE TO authenticated
    USING (true);

CREATE POLICY "Admins delete quote requests" ON quote_requests
    FOR DELETE TO authenticated
    USING (true);
