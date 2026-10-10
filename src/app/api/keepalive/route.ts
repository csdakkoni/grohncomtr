import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Called daily by Vercel Cron (vercel.json). Supabase free projects pause after
// a week without activity, which silently breaks the contact form and catalog.
export const dynamic = 'force-dynamic';

export async function GET() {
    const { error } = await supabase.from('categories').select('id').limit(1);
    if (error) {
        console.error('Keepalive query failed:', error);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
}
