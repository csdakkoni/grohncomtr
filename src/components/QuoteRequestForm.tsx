"use client";

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const INCOTERMS = ['FOB', 'CIF', 'CFR', 'EXW', 'DAP', 'DDP'];
const UNITS = ['ton', 'kg', 'ibc', 'container'] as const;

const EMPTY = {
    quantity: '',
    unit: 'ton',
    country: '',
    port: '',
    incoterm: 'unsure',
    targetPrice: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    website: '',
};

export default function QuoteRequestForm({ product, productSlug }: { product: string; productSlug?: string }) {
    const t = useTranslations('QuoteForm');
    const locale = useLocale();
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [productName, setProductName] = useState(product);
    const [form, setForm] = useState(EMPTY);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    product: productName,
                    productSlug,
                    locale,
                    pageUrl: window.location.href,
                }),
            });
            if (res.ok) {
                setStatus('success');
                setForm(EMPTY);
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all";
    const labelClass = "block text-sm font-medium text-text-secondary mb-2";

    if (status === 'success') {
        return (
            <div id="quote" className="glass rounded-2xl p-8 md:p-10 scroll-mt-28">
                <div className="flex items-start gap-3 text-emerald-400">
                    <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
                    <p className="text-lg">{t('success')}</p>
                </div>
            </div>
        );
    }

    return (
        <form id="quote" onSubmit={handleSubmit} className="glass rounded-2xl p-8 md:p-10 space-y-6 scroll-mt-28">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{t('title')}</h2>
                <p className="text-text-secondary mt-2">{t('subtitle')}</p>
            </div>

            {/* Honeypot, hidden from people */}
            <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
            />

            <div>
                <label className={labelClass}>{t('product')}</label>
                <input
                    type="text"
                    required
                    value={productName}
                    onChange={e => setProductName(e.target.value)}
                    className={inputClass}
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>{t('quantity')}</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="quantity"
                            required
                            min="0"
                            step="any"
                            value={form.quantity}
                            onChange={handleChange}
                            className={`${inputClass} min-w-0`}
                        />
                        <select name="unit" value={form.unit} onChange={handleChange} className={`${inputClass} w-auto`}>
                            {UNITS.map(u => (
                                <option key={u} value={u} className="bg-primary">{t(`units.${u}`)}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label className={labelClass}>{t('incoterm')}</label>
                    <select name="incoterm" value={form.incoterm} onChange={handleChange} className={inputClass}>
                        <option value="unsure" className="bg-primary">{t('incotermUnsure')}</option>
                        {INCOTERMS.map(i => (
                            <option key={i} value={i} className="bg-primary">{i}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>{t('country')}</label>
                    <input type="text" name="country" required value={form.country} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>{t('port')}</label>
                    <input type="text" name="port" value={form.port} onChange={handleChange} className={inputClass} />
                </div>
            </div>

            <div>
                <label className={labelClass}>{t('targetPrice')}</label>
                <input
                    type="text"
                    name="targetPrice"
                    value={form.targetPrice}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder={t('targetPricePlaceholder')}
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>{t('name')}</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>{t('company')}</label>
                    <input type="text" name="company" value={form.company} onChange={handleChange} className={inputClass} />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className={labelClass}>{t('email')}</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>{t('phone')}</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
                </div>
            </div>

            <div>
                <label className={labelClass}>{t('message')}</label>
                <textarea name="message" rows={3} value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
            </div>

            {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm p-3 rounded-lg bg-red-400/10 border border-red-400/20">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {t('error')}
                </div>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 gradient-accent text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        {t('send')}
                    </>
                )}
            </button>
        </form>
    );
}
