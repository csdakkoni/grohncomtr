"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, ShieldCheck, Globe, FlaskConical, HeadphonesIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
};

function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
    return (
        <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
        >
            <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                {value}
            </div>
            <div className="text-sm text-text-muted font-medium uppercase tracking-wider">
                {label}
            </div>
        </motion.div>
    );
}

const featureIcons = [
    <ShieldCheck key="q" className="w-6 h-6" />,
    <Globe key="g" className="w-6 h-6" />,
    <FlaskConical key="i" className="w-6 h-6" />,
    <HeadphonesIcon key="s" className="w-6 h-6" />,
];

const featureKeys = ['quality', 'global', 'innovation', 'support'] as const;

export default function HomePage() {
    const t = useTranslations('HomePage');

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="gradient-hero relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent-dark/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
                </div>

                <div className="container mx-auto px-4 md:px-8 pt-20 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left — Text */}
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={stagger}
                        >
                            <motion.div variants={fadeInUp}>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-accent text-sm font-medium mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                    Textile Chemical Solutions
                                </span>
                            </motion.div>

                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white tracking-tighter leading-[1.1]"
                                variants={fadeInUp}
                            >
                                {t('heroTitle')}
                            </motion.h1>

                            <motion.p
                                className="text-base md:text-lg text-text-secondary mb-10 leading-relaxed max-w-lg font-light"
                                variants={fadeInUp}
                            >
                                {t('heroSubtitle')}
                            </motion.p>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                variants={fadeInUp}
                            >
                                <Link
                                    href="/products"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 gradient-accent text-white font-semibold rounded-full hover:opacity-90 transition-all shadow-lg shadow-accent/20 group"
                                >
                                    {t('ctaProducts')}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 glass text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                                >
                                    {t('ctaContact')}
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right — Hero Image */}
                        <motion.div
                            className="hidden lg:block relative"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <div className="relative">
                                {/* Glow behind image */}
                                <div className="absolute -inset-8 bg-accent/10 rounded-3xl blur-3xl" />
                                {/* Image */}
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/hero.png"
                                        alt="Grohn Kimya — Industrial Chemical Solutions"
                                        className="w-full h-[450px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20 bg-primary-light border-y border-white/5">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <StatItem value="15+" label={t('stats.years')} delay={0} />
                        <StatItem value="30+" label={t('stats.countries')} delay={0.1} />
                        <StatItem value="100+" label={t('stats.products')} delay={0.2} />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                            {t('featuresTitle')}
                        </h2>
                        <p className="text-text-muted max-w-xl mx-auto">
                            {t('featuresSubtitle')}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featureKeys.map((key, index) => (
                            <motion.div
                                key={key}
                                className="glass rounded-2xl p-8 hover:bg-white/[0.06] transition-all duration-500 group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-6 text-white shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform duration-300">
                                    {featureIcons[index]}
                                </div>
                                <h3 className="text-lg font-bold mb-3 text-white">
                                    {t(`features.${key}.title`)}
                                </h3>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    {t(`features.${key}.desc`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero" />
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
                            {t('ctaBanner.title')}
                        </h2>
                        <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
                            {t('ctaBanner.subtitle')}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-10 py-4 gradient-accent text-white font-semibold rounded-full hover:opacity-90 transition-all shadow-lg shadow-accent/20 text-lg group"
                        >
                            {t('ctaBanner.button')}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
