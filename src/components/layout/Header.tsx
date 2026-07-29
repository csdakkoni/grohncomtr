"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Menu, X, ChevronDown, Beaker } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { MOCK_CATEGORIES, MOCK_SUBGROUPS, MOCK_PRODUCTS } from "@/lib/mock";

function getLocalized(obj: any, field: string, locale: string) {
    return obj[`${field}_${locale}`] || obj[`${field}_en`] || obj[`${field}_tr`];
}

export default function Header() {
    const t = useTranslations("Navigation");
    const locale = useLocale();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown on outside click
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
        timeoutRef.current = setTimeout(() => setIsProductsOpen(false), 200);
    };

    const simpleLinks = [
        { key: "home", href: "/" },
        { key: "about", href: "/about" },
        { key: "contact", href: "/contact" },
    ];

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

                        {/* Dropdown */}
                        <div
                            className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 transition-all duration-300 ${isProductsOpen
                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 -translate-y-2 pointer-events-none'
                                }`}
                        >
                            <div className="rounded-2xl p-6 min-w-[800px] max-w-[900px] shadow-2xl shadow-black/50 bg-[#0d1b32] border border-white/10 backdrop-blur-xl max-h-[70vh] overflow-y-auto overscroll-contain">
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Industrial Column */}
                                    <div className="flex-1">
                                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4 border-b border-white/10 pb-3">
                                            {t('industrialRawMaterials')}
                                        </h3>
                                        <div className="space-y-4">
                                            {MOCK_CATEGORIES.filter(c => c.domain === 'industrial').map((category) => {
                                                const catCount = MOCK_PRODUCTS.filter(p => p.category_id === category.id).length;
                                                return (
                                                    <div key={category.id}>
                                                        <Link href="/products" onClick={() => setIsProductsOpen(false)} className="flex items-center gap-2 mb-2 group/cat">
                                                            <span className="text-base font-bold text-white group-hover/cat:text-accent transition-colors">
                                                                {getLocalized(category, 'name', locale)}
                                                            </span>
                                                            <span className="text-xs text-text-muted">({catCount})</span>
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    
                                    {/* Textile Column */}
                                    <div className="flex-[1.5] bg-white/5 rounded-xl p-5 border border-white/5">
                                        <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4 border-b border-white/10 pb-3">
                                            {t('textileChemicals')}
                                        </h3>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                                            {MOCK_CATEGORIES.filter(c => c.domain === 'textile').map((category) => {
                                                const catCount = MOCK_PRODUCTS.filter(p => p.category_id === category.id).length;
                                                return (
                                                    <div key={category.id}>
                                                        <Link href="/products" onClick={() => setIsProductsOpen(false)} className="flex items-center gap-2 mb-1.5 group/cat">
                                                            <span className="text-sm font-bold text-white group-hover/cat:text-accent transition-colors">
                                                                {getLocalized(category, 'name', locale)}
                                                            </span>
                                                            <span className="text-[10px] text-text-muted">({catCount})</span>
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/5 text-center">
                                    <Link href="/products" onClick={() => setIsProductsOpen(false)} className="text-sm text-white hover:text-accent transition-colors font-semibold">
                                        {locale === 'tr' ? 'Tüm Ürün Kataloğunu İncele →' : 'View Full Product Catalog →'}
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
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}>
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
                            {/* Industrial */}
                            <div>
                                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest px-3 py-1.5 bg-white/5 rounded-md mb-2">
                                    {t('industrialRawMaterials')}
                                </div>
                                {MOCK_CATEGORIES.filter(c => c.domain === 'industrial').map((cat) => (
                                    <Link key={cat.id} href="/products" className="block text-sm text-text-muted hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-all" onClick={() => { setIsMenuOpen(false); setMobileProductsOpen(false); }}>
                                        {getLocalized(cat, 'name', locale)}
                                    </Link>
                                ))}
                            </div>
                            
                            {/* Textile */}
                            <div>
                                <div className="text-[10px] font-black text-accent/60 uppercase tracking-widest px-3 py-1.5 bg-accent/10 rounded-md mb-2 mt-2">
                                    {t('textileChemicals')}
                                </div>
                                {MOCK_CATEGORIES.filter(c => c.domain === 'textile').map((cat) => (
                                    <Link key={cat.id} href="/products" className="block text-sm text-text-muted hover:text-white py-2 px-4 rounded-lg hover:bg-white/5 transition-all" onClick={() => { setIsMenuOpen(false); setMobileProductsOpen(false); }}>
                                        {getLocalized(cat, 'name', locale)}
                                    </Link>
                                ))}
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
