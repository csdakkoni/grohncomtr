import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, company, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Lütfen zorunlu alanları doldurun.' },
                { status: 400 }
            );
        }

        // Try to store in Supabase
        const { error } = await supabase
            .from('contact_messages')
            .insert({
                name,
                email,
                company: company || null,
                subject,
                message,
                created_at: new Date().toISOString(),
            });

        if (error) {
            console.error('Supabase error:', error);
            // Even if Supabase fails, we don't want to lose the message
            // Log it for recovery
            console.log('CONTACT_FORM_FALLBACK:', JSON.stringify({ name, email, company, subject, message }));
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Contact form error:', err);
        return NextResponse.json(
            { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
            { status: 500 }
        );
    }
}
