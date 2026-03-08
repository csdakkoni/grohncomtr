-- ================================================
-- Grohn Kimya — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ================================================

-- 1. Contact Messages (form submissions)
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the public contact form)
CREATE POLICY "Allow anonymous insert" ON contact_messages
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow authenticated reads (for admin panel)
CREATE POLICY "Allow authenticated read" ON contact_messages
    FOR SELECT TO authenticated
    USING (true);

-- 2. Categories
CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name_tr TEXT,
    name_en TEXT,
    name_fr TEXT,
    name_ar TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories" ON categories
    FOR SELECT TO anon, authenticated
    USING (true);

-- 3. Subgroups
CREATE TABLE IF NOT EXISTS subgroups (
    id TEXT PRIMARY KEY,
    category_id TEXT REFERENCES categories(id),
    slug TEXT UNIQUE NOT NULL,
    name_tr TEXT,
    name_en TEXT,
    name_fr TEXT,
    name_ar TEXT,
    prefix TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE subgroups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read subgroups" ON subgroups
    FOR SELECT TO anon, authenticated
    USING (true);

-- 4. Products
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    category_id TEXT REFERENCES categories(id),
    subgroup_id TEXT REFERENCES subgroups(id),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    ionic_type TEXT,
    title_tr TEXT,
    title_en TEXT,
    title_fr TEXT,
    title_ar TEXT,
    description_tr TEXT,
    description_en TEXT,
    description_fr TEXT,
    description_ar TEXT,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    cas_number TEXT,
    chemical_formula TEXT,
    purity TEXT,
    einecs_number TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON products
    FOR SELECT TO anon, authenticated
    USING (true);
