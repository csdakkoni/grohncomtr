"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactForm() {
    const t = useTranslations('ContactPage.form');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
        setTimeout(() => setStatus('idle'), 4000);
    };

    return (
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 md:p-10 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">{t('name')}</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                        placeholder={t('name')}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">{t('email')}</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                        placeholder={t('email')}
                    />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">{t('company')}</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                        placeholder={t('company')}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">{t('subject')}</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                        placeholder={t('subject')}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">{t('message')}</label>
                <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                    placeholder={t('message')}
                />
            </div>

            {/* Status Messages */}
            {status === 'success' && (
                <div className="flex items-center gap-2 text-emerald-400 text-sm p-3 rounded-lg bg-emerald-400/10 border border-emerald-400/20">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    {t('success')}
                </div>
            )}
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
