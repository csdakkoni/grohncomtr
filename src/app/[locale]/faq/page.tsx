"use client";

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/SEOSchemas';

const FAQ_KEYS = [
    'whatProducts',
    'exportCountries',
    'minOrder',
    'sampleAvailable',
    'deliveryTime',
    'customFormulation',
    'certifications',
    'technicalSupport',
] as const;

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="border-b border-white/5 last:border-0"
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-5 px-1 text-left group"
            >
                <span className="font-medium text-white group-hover:text-accent transition pr-4">
                    {question}
                </span>
                <ChevronDown className={`w-5 h-5 text-text-muted shrink-0 transition-transform ${open ? 'rotate-180 text-accent' : ''}`} />
            </button>
            {open && (
                <div className="pb-5 px-1 text-text-secondary leading-relaxed">
                    {answer}
                </div>
            )}
        </motion.div>
    );
}

export default function FAQPage() {
    const t = useTranslations('FAQPage');
    const locale = useLocale();

    const faqItems = FAQ_KEYS.map(key => ({
        question: t(`items.${key}.q`),
        answer: t(`items.${key}.a`),
    }));

    return (
        <div className="pt-20 min-h-screen">
            <FAQJsonLd items={faqItems} />
            <BreadcrumbJsonLd
                items={[
                    { name: 'Home', href: '/' },
                    { name: 'FAQ', href: '/faq' },
                ]}
                locale={locale}
            />

            {/* Hero */}
            <section className="gradient-hero py-24 md:py-32">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-accent/10 mb-6">
                            <HelpCircle className="w-6 h-6 text-accent" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                            {t('title')}
                        </h1>
                        <p className="text-lg text-text-secondary">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Items */}
            <section className="py-24 bg-primary">
                <div className="container mx-auto px-4 md:px-8 max-w-3xl">
                    <div className="glass rounded-2xl p-6 md:p-10">
                        {faqItems.map((item, i) => (
                            <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center">
                        <p className="text-text-muted mb-4">{t('ctaText')}</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-7 py-3.5 gradient-accent text-white font-semibold rounded-full hover:opacity-90 transition-all"
                        >
                            {t('ctaButton')}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
