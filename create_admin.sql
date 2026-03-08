-- Enable pgcrypto for password hashing
create extension if not exists "pgcrypto";

-- Insert Admin User
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  uuid_generate_v4(),
  'authenticated',
  'authenticated',
  'admin@grohn.com',
  crypt('admin123', gen_salt('bf')), -- Şifre: admin123
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now()
);

-- Insert Identity (Required for some Supabase checks)
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT
  id,
  id,
  format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
  'email',
  id,
  now(),
  now(),
  now()
FROM auth.users
WHERE email = 'admin@grohn.com';

