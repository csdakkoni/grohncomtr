"use client";

import { useTranslations } from 'next-intl';
import { Target, Eye, Factory, Star, Leaf, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const valueIcons = [
    <Award key="r" className="w-5 h-5" />,
    <Leaf key="s" className="w-5 h-5" />,
    <Star key="e" className="w-5 h-5" />,
];

const valueKeys = ['reliability', 'sustainability', 'excellence'] as const;

export default function AboutPage() {
    const t = useTranslations('AboutPage');

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="gradient-hero py-24 md:py-32">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-accent/10 mb-6">
                            <Factory className="w-6 h-6 text-accent" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                            {t('title')}
                        </h1>
                        <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                            {t('description')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-primary">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <motion.div
                            className="glass rounded-2xl p-8 md:p-10 hover:bg-white/[0.06] transition-all duration-500"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                    <Target className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">{t('missionTitle')}</h2>
                            </div>
                            <p className="text-text-secondary leading-relaxed">
                                {t('missionDesc')}
                            </p>
                        </motion.div>

                        <motion.div
                            className="glass rounded-2xl p-8 md:p-10 hover:bg-white/[0.06] transition-all duration-500"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                    <Eye className="w-6 h-6 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">{t('visionTitle')}</h2>
                            </div>
                            <p className="text-text-secondary leading-relaxed">
                                {t('visionDesc')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-primary-light border-y border-white/5">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            {t('valuesTitle')}
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {valueKeys.map((key, index) => (
                            <motion.div
                                key={key}
                                className="text-center p-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <div className="w-14 h-14 rounded-full gradient-accent flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20">
                                    {valueIcons[index]}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">
                                    {t(`values.${key}.title`)}
                                </h3>
                                <p className="text-text-muted text-sm">
                                    {t(`values.${key}.desc`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
