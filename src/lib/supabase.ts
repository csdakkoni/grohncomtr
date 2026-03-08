import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('Supabase URL missing. Falling back to placeholder for Mock Mode.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
