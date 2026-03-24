"use client";

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { ChevronDown, ArrowRight, Beaker } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ProductCatalogProps {
    categories: any[];
    subgroups: any[];
    products: any[];
    locale: string;
}

const IONIC_LABELS: Record<string, { label: string; color: string }> = {
    nonionic: { label: 'Noniyonik', color: 'bg-sky-500/15 text-sky-300 border-sky-500/20' },
    anionic: { label: 'Anyonik', color: 'bg-rose-500/15 text-rose-300 border-rose-500/20' },
    cationic: { label: 'Katyonik', color: 'bg-violet-500/15 text-violet-300 border-violet-500/20' },
    amphoteric: { label: 'Amfoterik', color: 'bg-amber-500/15 text-amber-300 border-amber-500/20' },
};

function getLocalized(obj: any, field: string, locale: string) {
    return obj[`${field}_${locale}`] || obj[`${field}_en`] || obj[`${field}_tr`];
}

export default function ProductCatalog({ categories, subgroups, products, locale }: ProductCatalogProps) {
    const [openCategories, setOpenCategories] = useState<Set<string>>(
        new Set(categories.map(c => c.id)) // All open by default
    );
    const [openSubgroups, setOpenSubgroups] = useState<Set<string>>(new Set());

    const toggleCategory = (id: string) => {
        setOpenCategories(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const toggleSubgroup = (id: string) => {
        setOpenSubgroups(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-4">
            {categories.map((category) => {
                const categorySubgroups = subgroups.filter((s: any) => s.category_id === category.id);
                const categoryProducts = products.filter((p: any) => p.category_id === category.id);
                const isOpen = openCategories.has(category.id);

                if (categoryProducts.length === 0) return null;

                return (
                    <div key={category.id} className="glass rounded-2xl overflow-hidden">
                        {/* Category Header — Collapsible */}
                        <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full flex items-center gap-4 p-5 md:p-6 hover:bg-white/[0.03] transition-colors text-left"
                        >
                            {/* Category Image */}
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 relative">
                                <Image
                                    src={category.image_url}
                                    alt=""
                                    className="w-full h-full object-cover opacity-70"
                                    width={48}
                                    height={48}
                                />
                                <div className="absolute inset-0 bg-accent/10" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h2 className="text-lg md:text-xl font-bold text-white truncate">
                                    {getLocalized(category, 'name', locale)}
                                </h2>
                                <span className="text-xs text-text-muted">
                                    {categoryProducts.length} {locale === 'tr' ? 'ürün' : locale === 'fr' ? 'produits' : locale === 'ar' ? 'منتج' : 'products'}
                                </span>
                            </div>

                            <ChevronDown
                                className={`w-5 h-5 text-text-muted transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* Category Content */}
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-3">
                                        {categorySubgroups.map((subgroup: any) => {
                                            const subProducts = categoryProducts.filter((p: any) => p.subgroup_id === subgroup.id);
                                            const isSubOpen = openSubgroups.has(subgroup.id);

                                            if (subProducts.length === 0) return null;

                                            return (
                                                <div key={subgroup.id} className="rounded-xl border border-white/5 bg-white/[0.02]">
                                                    {/* Subgroup Header */}
                                                    <button
                                                        onClick={() => toggleSubgroup(subgroup.id)}
                                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors text-left rounded-xl"
                                                    >
                                                        <Beaker className="w-4 h-4 text-accent shrink-0" />
                                                        <div className="flex-1 min-w-0">
                                                            <span className="text-sm font-semibold text-white">
                                                                {getLocalized(subgroup, 'name', locale)}
                                                            </span>
                                                            <span className="text-xs text-accent/70 ms-2 font-mono">
                                                                {subgroup.prefix}®
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-text-muted me-2">
                                                            {subProducts.length}
                                                        </span>
                                                        <ChevronDown
                                                            className={`w-4 h-4 text-text-muted transition-transform duration-300 shrink-0 ${isSubOpen ? 'rotate-180' : ''}`}
                                                        />
                                                    </button>

                                                    {/* Products List */}
                                                    <AnimatePresence initial={false}>
                                                        {isSubOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="px-4 pb-4 space-y-2">
                                                                    {subProducts.map((product: any) => (
                                                                        <Link
                                                                            key={product.id}
                                                                            href={`/products/${product.slug}`}
                                                                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/[0.05] transition-all group"
                                                                        >
                                                                            <div className="flex-1 min-w-0">
                                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                                    <span className="font-semibold text-white text-sm group-hover:text-accent transition-colors">
                                                                                        {product.name}
                                                                                    </span>
                                                                                    {product.ionic_type && IONIC_LABELS[product.ionic_type] && (
                                                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${IONIC_LABELS[product.ionic_type].color}`}>
                                                                                            {IONIC_LABELS[product.ionic_type].label}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                                <p className="text-text-muted text-xs mt-0.5 line-clamp-1">
                                                                                    {getLocalized(product, 'description', locale)}
                                                                                </p>
                                                                            </div>
                                                                            <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent shrink-0 rtl:rotate-180 opacity-0 group-hover:opacity-100 transition-all" />
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
