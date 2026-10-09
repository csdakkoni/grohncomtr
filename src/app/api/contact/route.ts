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

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Contact form error:', err);
        return NextResponse.json(
            { error: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
            { status: 500 }
        );
    }
}
