import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const INCOTERMS = ['EXW', 'FOB', 'CFR', 'CIF', 'DAP', 'DDP', 'unsure'];
const UNITS = ['kg', 'ton', 'ibc', 'container'];

const clean = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Honeypot: real visitors never fill the hidden "website" field
        if (clean(body.website)) {
            return NextResponse.json({ success: true });
        }

        const row = {
            source: 'web',
            product: clean(body.product, 200),
            product_slug: clean(body.productSlug, 200) || null,
            quantity: Number(body.quantity) > 0 ? Number(body.quantity) : null,
            unit: UNITS.includes(body.unit) ? body.unit : null,
            country: clean(body.country, 100),
            port: clean(body.port, 200) || null,
            incoterm: INCOTERMS.includes(body.incoterm) ? body.incoterm : null,
            target_price: clean(body.targetPrice, 100) || null,
            name: clean(body.name, 200),
            company: clean(body.company, 200) || null,
            email: clean(body.email, 200),
            phone: clean(body.phone, 50) || null,
            message: clean(body.message, 3000) || null,
            page_url: clean(body.pageUrl, 500) || null,
            locale: clean(body.locale, 5) || null,
        };

        if (!row.product || !row.quantity || !row.country || !row.name || !row.email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { error } = await supabase.from('quote_requests').insert(row);
        if (!error) {
            return NextResponse.json({ success: true });
        }

        // quote_requests missing or unreachable: keep the lead in contact_messages instead of losing it
        console.error('Quote insert failed, falling back to contact_messages:', error);
        const summary = [
            `Product: ${row.product}`,
            `Quantity: ${row.quantity} ${row.unit ?? ''}`,
            `Country: ${row.country}${row.port ? ` / ${row.port}` : ''}`,
            `Incoterm: ${row.incoterm ?? '-'}`,
            `Target price: ${row.target_price ?? '-'}`,
            `Company: ${row.company ?? '-'}`,
            `Phone: ${row.phone ?? '-'}`,
            `Page: ${row.page_url ?? '-'}`,
            '',
            row.message ?? '',
        ].join('\n');
        const { error: fallbackError } = await supabase.from('contact_messages').insert({
            full_name: row.name,
            email: row.email,
            subject: `Quote request: ${row.product}`,
            message: summary,
        });
        if (fallbackError) {
            console.error('Quote fallback failed:', fallbackError);
            console.error('QUOTE_FORM_FALLBACK:', JSON.stringify(row));
            return NextResponse.json({ error: 'Could not save request' }, { status: 500 });
        }
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Quote API error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
