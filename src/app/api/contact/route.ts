import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { scheduleLeadNotification } from '@/lib/lead-notifications';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body || typeof body !== 'object' || Array.isArray(body)) {
            return NextResponse.json({ error: 'Geçersiz istek.' }, { status: 400 });
        }
        const { name, email, company, subject, message } = body;

        if (![name, email, subject, message].every(value => typeof value === 'string' && value.trim()) ||
            (company != null && typeof company !== 'string')) {
            return NextResponse.json(
                { error: 'Lütfen zorunlu alanları doldurun.' },
                { status: 400 }
            );
        }

        // contact_messages has full_name and no company column; fold company into the message
        const { error } = await supabase
            .from('contact_messages')
            .insert({
                full_name: name,
                email,
                subject,
                message: company ? `Company: ${company}\n\n${message}` : message,
            });

        if (error) {
            console.error('Supabase error:', error);
            // Log it for recovery, and tell the sender it did not go through
            console.error('CONTACT_FORM_FALLBACK:', JSON.stringify({ name, email, company, subject, message }));
            return NextResponse.json(
                { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
                { status: 500 }
            );
        }

        scheduleLeadNotification({ kind: 'contact', name, email, company, subject, message, savedTo: 'messages' });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Contact form error:', err);
        return NextResponse.json(
            { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
            { status: 500 }
        );
    }
}
