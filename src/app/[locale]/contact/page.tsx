"use client";

import { useTranslations } from 'next-intl';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
    const t = useTranslations('ContactPage');

    const contactInfo = [
        { icon: <MapPin className="w-5 h-5" />, label: t('info.address'), value: 'Velimeşe OSB, Kervancı Tic. Mer. B12, Ergene / Tekirdağ, Türkiye', color: 'bg-accent/10 text-accent' },
        { icon: <Phone className="w-5 h-5" />, label: t('info.phone'), value: '+90 539 880 23 46', color: 'bg-emerald-500/10 text-emerald-400' },
        { icon: <MessageCircle className="w-5 h-5" />, label: 'WhatsApp / WeChat', value: '+90 539 880 23 46', color: 'bg-green-500/10 text-green-400' },
        { icon: <Mail className="w-5 h-5" />, label: t('info.email'), value: 'grohn@grohn.com.tr', color: 'bg-purple-500/10 text-purple-400' },
    ];

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="gradient-hero py-24">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        className="max-w-xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-lg text-text-secondary">
                            {t('subtitle')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 md:py-24 bg-primary">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Info Cards */}
                        <div className="lg:col-span-1 space-y-4">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    className="glass rounded-xl p-5 flex items-start gap-4 hover:bg-white/[0.06] transition-all"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                >
                                    <div className={`w-10 h-10 rounded-lg ${info.color} flex items-center justify-center shrink-0`}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-sm mb-1">{info.label}</h3>
                                        <p className="text-text-secondary text-sm">{info.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Form */}
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <ContactForm />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
