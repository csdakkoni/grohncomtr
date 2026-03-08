-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CATEGORIES TABLE
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  slug text not null unique,
  name_tr text not null,
  name_en text,
  name_fr text,
  name_ar text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PRODUCTS TABLE
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  category_id uuid references public.categories(id) on delete set null,
  slug text not null unique,
  
  -- Multilingual Content
  title_tr text not null,
  title_en text,
  title_fr text,
  title_ar text,
  
  description_tr text,
  description_en text,
  description_fr text,
  description_ar text,
  
  -- Technical Data
  cas_number text,
  einecs_number text,
  chemical_formula text,
  purity text,
  
  -- Metadata
  is_featured boolean default false,
  image_url text, -- Main image
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. PRODUCT DOCUMENTS (TDS/MSDS)
create table public.product_documents (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  title text not null,
  file_url text not null,
  doc_type text check (doc_type in ('TDS', 'MSDS', 'CERTIFICATE', 'OTHER')),
  language text default 'tr',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. CONTACT MESSAGES
create table public.contact_messages (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES (Row Level Security)
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_documents enable row level security;
alter table public.contact_messages enable row level security;

-- Public Read Access (Catalog is public)
create policy "Allow public read access on categories" on public.categories for select using (true);
create policy "Allow public read access on products" on public.products for select using (true);
create policy "Allow public read access on product_documents" on public.product_documents for select using (true);

-- Insert Access for Contact Form (Anyone can submit)
create policy "Allow anon insert on contact_messages" on public.contact_messages for insert with check (true);

-- Storage Buckets (Execute this via Supabase Dashboard usually, but defining logic here)
-- Bucket: 'products' (Public)
-- Bucket: 'documents' (Public)
