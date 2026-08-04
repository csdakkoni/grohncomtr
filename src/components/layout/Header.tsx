"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Menu, X, ChevronDown, Beaker, Factory, Sparkles, Droplets, Layers, ShieldCheck, Flame } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { MOCK_CATEGORIES, MOCK_SUBGROUPS, MOCK_PRODUCTS } from "@/lib/mock";

function getLocalized(obj: any, field: string, locale: string) {
    return obj[`${field}_${locale}`] || obj[`${field}_en`] || obj[`${field}_tr`];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    "deterjan": <Layers className="w-4 h-4 text-sky-400" />,
    "kagit": <Layers className="w-4 h-4 text-amber-400" />,
    "aritma": <Droplets className="w-4 h-4 text-blue-400" />,
    "tarim-gida": <Sparkles className="w-4 h-4 text-emerald-400" />,
    "boya-solvent": <Flame className="w-4 h-4 text-rose-400" />,
    "metal-yuzey": <ShieldCheck className="w-4 h-4 text-purple-400" />,
    "tekstil": <Sparkles className="w-4 h-4 text-accent" />
};

export default function Header() {
    const t = useTranslations("Navigation");
    const locale = useLocale();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'industrial' | 'textile'>('industrial');
    
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsProductsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsProductsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setIsProductsOpen(false), 250);
    };

    const simpleLinks = [
        { key: "home", href: "/" },
        { key: "about", href: "/about" },
        { key: "contact", href: "/contact" },
    ];

    const industrialCats = MOCK_CATEGORIES.filter(c => c.domain === 'industrial');
    const textileCats = MOCK_CATEGORIES.filter(c => c.domain === 'textile');

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled
                ? "bg-primary/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-baseline gap-1.5 group">
                    <span className="text-2xl md:text-3xl font-black text-white tracking-tighter group-hover:text-accent transition-colors duration-300">
                        GROHN
                    </span>
                    <span className="text-sm md:text-base font-light text-accent tracking-[0.25em]">
                        KİMYA
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {/* Home & About */}
                    {simpleLinks.slice(0, 2).map((link) => (
                        <Link
                            key={link.key}
                            href={link.href}
                            className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5 group"
                        >
                            {t(link.key)}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] gradient-accent rounded-full group-hover:w-6 transition-all duration-300" />
                        </Link>
                    ))}

                    {/* Products — Mega Menu */}
                    <div
                        ref={dropdownRef}
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link
                            href="/products"
                            className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5 group flex items-center gap-1"
                        >
                            {t("products")}
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`} />
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] gradient-accent rounded-full group-hover:w-6 transition-all duration-300" />
                        </Link>

                        {/* Dropdown Card */}
                        <div
                            className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 transition-all duration-300 ${isProductsOpen
                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 -translate-y-2 pointer-events-none'
                                }`}
                        >
                            <div className="rounded-2xl p-6 w-[940px] shadow-2xl shadow-black/80 bg-[#0b172a] border border-white/10 backdrop-blur-2xl">
                                {/* Pillar Tabs Header */}
                                <div className="flex items-center gap-2 p-1.5 bg-white/5 rounded-xl border border-white/5 mb-6">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('industrial')}
                                        onMouseEnter={() => setActiveTab('industrial')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'industrial' ? 'bg-accent text-white shadow-lg shadow-accent/25' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
                                    >
                                        <Factory className="w-4 h-4" />
                                        {locale === 'tr' ? 'Endüstriyel Hammadde Sektörleri' : 'Industrial Chemical Sectors'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('textile')}
                                        onMouseEnter={() => setActiveTab('textile')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'textile' ? 'bg-white/10 text-white shadow-lg' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        {t('textileAuxiliaries')}
                                    </button>
                                </div>

                                {/* Active Tab Content */}
                                {activeTab === 'industrial' ? (
                                    <div className="grid grid-cols-3 gap-4">
                                        {industrialCats.map((cat) => {
                                            const catCount = MOCK_PRODUCTS.filter(p => p.category_id === cat.id).length;
                                            const catSubgroups = MOCK_SUBGROUPS.filter(s => s.category_id === cat.id);
                                            return (
                                                <div key={cat.id} className="glass rounded-xl p-4 hover:bg-white/[0.06] transition-all border border-white/5 group flex flex-col justify-between">
                                                    <div>
                                                        <Link
                                                            href={`/products?category=${cat.id}`}
                                                            onClick={() => setIsProductsOpen(false)}
                                                            className="flex items-center justify-between mb-2"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {CATEGORY_ICONS[cat.id] || <Factory className="w-4 h-4 text-accent" />}
                                                                <span className="font-bold text-white group-hover:text-accent transition-colors text-sm">
                                                                    {getLocalized(cat, 'name', locale)}
                                                                </span>
                                                            </div>
                                                            <span className="text-[10px] text-text-muted font-mono">({catCount})</span>
                                                        </Link>
                                                        {catSubgroups.length > 0 && (
                                                            <div className="space-y-1 border-t border-white/5 pt-2">
                                                                {catSubgroups.map((sub) => (
                                                                    <Link
                                                                        key={sub.id}
                                                                        href={`/products?category=${cat.id}&subgroup=${sub.id}`}
                                                                        onClick={() => setIsProductsOpen(false)}
                                                                        className="flex items-center gap-1.5 text-[11px] text-text-muted hover:text-white py-0.5 transition-colors"
                                                                    >
                                                                        <Beaker className="w-2.5 h-2.5 text-accent/40 shrink-0" />
                                                                        <span className="truncate">{getLocalized(sub, 'name', locale)}</span>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-3 gap-3 max-h-[55vh] overflow-y-auto pr-1">
                                        {textileCats.map((cat) => {
                                            const catCount = MOCK_PRODUCTS.filter(p => p.category_id === cat.id).length;
                                            const catSubgroups = MOCK_SUBGROUPS.filter(s => s.category_id === cat.id);
                                            return (
                                                <div key={cat.id} className="glass rounded-xl p-4 hover:bg-white/[0.06] transition-all border border-white/5 group">
                                                    <Link
                                                        href={`/products?category=${cat.id}`}
                                                        onClick={() => setIsProductsOpen(false)}
                                                        className="flex items-center justify-between mb-2"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Sparkles className="w-4 h-4 text-accent" />
                                                            <span className="font-bold text-white group-hover:text-accent transition-colors text-base">
                                                                {getLocalized(cat, 'name', locale)}
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-text-muted font-mono">({catCount})</span>
                                                    </Link>
                                                    {catSubgroups.length > 0 && (
                                                        <div className="space-y-1.5 border-t border-white/5 pt-2">
                                                            {catSubgroups.map((sub) => (
                                                                <Link
                                                                    key={sub.id}
                                                                    href={`/products?category=${cat.id}&subgroup=${sub.id}`}
                                                                    onClick={() => setIsProductsOpen(false)}
                                                                    className="flex items-center gap-2 text-xs text-text-muted hover:text-white py-1 transition-colors"
                                                                >
                                                                    <Beaker className="w-3 h-3 text-accent/50 shrink-0" />
                                                                    <span>{getLocalized(sub, 'name', locale)}</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Footer CTA */}
                                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                                    <span className="text-xs text-text-muted">
                                        {locale === 'tr' ? 'Endüstriyel Hammadde & Sektörel Kimyasal İhracatçısı' : 'Industrial Chemical Raw Material Exporter'}
                                    </span>
                                    <Link
                                        href="/products"
                                        onClick={() => setIsProductsOpen(false)}
                                        className="text-xs font-bold text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1"
                                    >
                                        {locale === 'tr' ? 'Tüm Ürün Kataloğunu İncele →' : 'View Full Catalog →'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blog */}
                    <Link
                        href="/blog"
                        className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5 group"
                    >
                        {t("blog")}
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] gradient-accent rounded-full group-hover:w-6 transition-all duration-300" />
                    </Link>

                    {/* FAQ */}
                    <Link
                        href="/faq"
                        className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5 group"
                    >
                        {t("faq")}
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] gradient-accent rounded-full group-hover:w-6 transition-all duration-300" />
                    </Link>

                    {/* Chemical Dictionary */}
                    <Link
                        href="/kimyasallar"
                        className="relative px-4 py-2 text-sm font-medium text-accent hover:text-accent-light transition-colors duration-300 rounded-lg hover:bg-white/5 group"
                    >
                        {locale === 'tr' ? 'Kimya Sözlüğü' : 'Chem Dictionary'}
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] gradient-accent rounded-full group-hover:w-6 transition-all duration-300" />
                    </Link>

                    {/* Contact */}
                    <Link
                        href="/contact"
                        className="relative px-4 py-2 text-sm font-medium text-text-secondary hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5 group"
                    >
                        {t("contact")}
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] gradient-accent rounded-full group-hover:w-6 transition-all duration-300" />
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <Link
                        href="/contact"
                        className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full gradient-accent text-white hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
                    >
                        {t("contact")}
                    </Link>
                    <button
                        className="md:hidden p-2 text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="bg-primary/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 flex flex-col gap-1 overflow-y-auto max-h-[75vh]">
                    <Link href="/" className="text-base font-medium text-text-secondary hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMenuOpen(false)}>
                        {t("home")}
                    </Link>
                    <Link href="/about" className="text-base font-medium text-text-secondary hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMenuOpen(false)}>
                        {t("about")}
                    </Link>

                    {/* Products — Mobile Accordion */}
                    <button
                        onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        className="flex items-center justify-between text-base font-medium text-text-secondary hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 transition-all w-full text-left"
                    >
                        {t("products")}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {mobileProductsOpen && (
                        <div className="ms-4 space-y-4 mb-2 py-2">
                            {/* Industrial Sectors */}
                            <div>
                                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest px-3 py-1.5 bg-white/5 rounded-md mb-3">
                                    {locale === 'tr' ? 'Endüstriyel Hammadde Sektörleri' : 'Industrial Chemical Sectors'}
                                </div>
                                {industrialCats.map((cat) => {
                                    const subs = MOCK_SUBGROUPS.filter(s => s.category_id === cat.id);
                                    return (
                                        <div key={cat.id} className="mb-3">
                                            <Link
                                                href={`/products?category=${cat.id}`}
                                                className="text-xs font-bold text-white/90 px-4 py-1 block hover:text-accent"
                                                onClick={() => { setIsMenuOpen(false); setMobileProductsOpen(false); }}
                                            >
                                                {getLocalized(cat, 'name', locale)}
                                            </Link>
                                            {subs.map((sub) => (
                                                <Link
                                                    key={sub.id}
                                                    href={`/products?category=${cat.id}&subgroup=${sub.id}`}
                                                    className="flex items-center gap-2 text-sm text-text-muted hover:text-white py-1.5 px-4 ms-2 rounded-lg hover:bg-white/5 transition-all"
                                                    onClick={() => { setIsMenuOpen(false); setMobileProductsOpen(false); }}
                                                >
                                                    <Beaker className="w-3 h-3 text-accent/40" />
                                                    {getLocalized(sub, 'name', locale)}
                                                </Link>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Textile */}
                            <div>
                                <div className="text-[10px] font-black text-accent/60 uppercase tracking-widest px-3 py-1.5 bg-accent/10 rounded-md mb-3 mt-4">
                                    {t('textileAuxiliaries')}
                                </div>
                                {textileCats.map((cat) => {
                                    const subs = MOCK_SUBGROUPS.filter(s => s.category_id === cat.id);
                                    return (
                                        <div key={cat.id} className="mb-3">
                                            <Link
                                                href={`/products?category=${cat.id}`}
                                                className="text-xs font-bold text-white/90 px-4 py-1 block hover:text-accent"
                                                onClick={() => { setIsMenuOpen(false); setMobileProductsOpen(false); }}
                                            >
                                                {getLocalized(cat, 'name', locale)}
                                            </Link>
                                            {subs.map((sub) => (
                                                <Link
                                                    key={sub.id}
                                                    href={`/products?category=${cat.id}&subgroup=${sub.id}`}
                                                    className="flex items-center gap-2 text-sm text-text-muted hover:text-white py-1.5 px-4 ms-2 rounded-lg hover:bg-white/5 transition-all"
                                                    onClick={() => { setIsMenuOpen(false); setMobileProductsOpen(false); }}
                                                >
                                                    <Beaker className="w-3 h-3 text-accent/40" />
                                                    {getLocalized(sub, 'name', locale)}
                                                </Link>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <Link href="/blog" className="text-base font-medium text-text-secondary hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMenuOpen(false)}>
                        {t("blog")}
                    </Link>
                    <Link href="/faq" className="text-base font-medium text-text-secondary hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMenuOpen(false)}>
                        {t("faq")}
                    </Link>
                    <Link href="/kimyasallar" className="text-base font-medium text-accent hover:text-accent-light py-3 px-4 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMenuOpen(false)}>
                        {locale === 'tr' ? 'Kimya Sözlüğü' : 'Chem Dictionary'}
                    </Link>
                    <Link href="/contact" className="text-base font-medium text-text-secondary hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 transition-all" onClick={() => setIsMenuOpen(false)}>
                        {t("contact")}
                    </Link>
                </div>
            </div>
        </header>
    );
}
