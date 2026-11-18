import { randomUUID } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { after } from 'next/server';

type Lead = {
    kind: 'contact' | 'quote';
    name: string;
    email: string;
    company?: string | null;
    message?: string | null;
    subject?: string;
    product?: string;
    quantity?: number | null;
    unit?: string | null;
    country?: string | null;
    port?: string | null;
    incoterm?: string | null;
    target_price?: string | null;
    phone?: string | null;
    page_url?: string | null;
    locale?: string | null;
    savedTo: 'messages' | 'quotes';
};

const EMAIL = /^[^\s@<>,;\r\n]+@[^\s@<>,;\r\n]+\.[^\s@<>,;\r\n]+$/;
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]!));

export function buildLeadEmail(lead: Lead) {
    const title = lead.kind === 'quote' ? 'Yeni teklif talebi' : 'Yeni iletişim mesajı';
    const detail = String(lead.product || lead.subject || lead.name).replace(/[\r\n]/g, ' ').slice(0, 160);
    const panelUrl = new URL(`/admin/${lead.savedTo}`, process.env.NEXT_PUBLIC_SITE_URL || 'https://grohn.com.tr').href;
    const fields: [string, unknown][] = [
        ['Ad soyad', lead.name], ['Firma', lead.company], ['E-posta', lead.email],
        ['Telefon', lead.phone], ['Ürün', lead.product],
        ['Miktar', lead.quantity == null ? null : `${lead.quantity} ${lead.unit || ''}`.trim()],
        ['Ülke', lead.country], ['Liman', lead.port], ['Teslim şekli', lead.incoterm],
        ['Hedef fiyat', lead.target_price], ['Konu', lead.subject],
        ['Mesaj', lead.message], ['Kaynak sayfa', lead.page_url], ['Dil', lead.locale],
        ['Kayıt yeri', lead.savedTo === 'quotes' ? 'Teklif Talepleri' : 'Mesajlar'],
    ];
    const rows = fields.filter(([, value]) => value !== undefined && value !== null && value !== '');
    return {
        subject: `[GROHN] ${title}: ${detail}`,
        ...(EMAIL.test(lead.email) ? { reply_to: lead.email } : {}),
        text: `${title}\n\n${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nPanelde görüntüle: ${panelUrl}`,
        html: `<!doctype html><html lang="tr"><body style="font:16px Arial,sans-serif;color:#172338;background:#f4f6f8;padding:24px"><div style="max-width:640px;margin:auto;background:white;padding:28px;border-radius:12px"><p style="font-weight:bold;color:#ea760a">GROHN KİMYA</p><h1 style="font-size:24px">${title}</h1><table style="width:100%;border-collapse:collapse">${rows.map(([label, value]) => `<tr><th style="padding:10px 12px 10px 0;text-align:left;vertical-align:top;border-bottom:1px solid #eee">${label}</th><td style="padding:10px 0;border-bottom:1px solid #eee;white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(String(value))}</td></tr>`).join('')}</table><p style="margin-top:24px"><a href="${escapeHtml(panelUrl)}" style="display:inline-block;background:#172338;color:white;padding:12px 20px;border-radius:6px;text-decoration:none">Panelde görüntüle</a></p><p style="color:#667085">Müşteriye dönmek için bu e-postayı yanıtlayabilirsiniz.</p></div></body></html>`,
    };
}

// Server-only configuration: never expose these values through NEXT_PUBLIC_*.
export async function sendLeadNotification(lead: Lead): Promise<'sent' | 'disabled' | 'failed'> {
    const key = process.env.RESEND_API_KEY?.trim();
    const from = process.env.LEAD_NOTIFICATION_FROM?.trim();
    const recipients = (process.env.LEAD_NOTIFICATION_TO ?? 'grohn@grohn.com.tr').split(',').map(value => value.trim()).filter(Boolean);
    if (!key || !from || !recipients.length || !recipients.every(value => EMAIL.test(value))) {
        console.warn('Lead email notification disabled: check RESEND_API_KEY, LEAD_NOTIFICATION_FROM and LEAD_NOTIFICATION_TO.');
        return 'disabled';
    }

    try {
        const body = JSON.stringify({ from, to: recipients, ...buildLeadEmail(lead) });
        const idempotencyKey = `lead-notification/${randomUUID()}`;
        for (let attempt = 0; attempt < 2; attempt++) {
            let retryDelay = 1000;
            try {
                const response = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
                    body,
                    signal: AbortSignal.timeout(5000),
                });
                if (response.ok) return 'sent';
                const retryable = response.status === 429 || response.status >= 500;
                if (!retryable || attempt === 1) {
                    console.error('Lead email delivery failed; request remains saved.', { status: response.status });
                    return 'failed';
                }
                const retryAfter = Number(response.headers.get('retry-after'));
                if (retryAfter > 0) retryDelay = Math.min(retryAfter * 1000, 5000);
            } catch {
                if (attempt === 1) {
                    console.error('Lead email connection failed; request remains saved.');
                    return 'failed';
                }
            }
            await delay(retryDelay);
        }
    } catch {
        console.error('Lead email preparation failed; request remains saved.');
    }
    return 'failed';
}

// Schedule only after a successful insert, using the serverless request lifecycle.
export function scheduleLeadNotification(lead: Lead) {
    after(async () => { await sendLeadNotification(lead); });
}
