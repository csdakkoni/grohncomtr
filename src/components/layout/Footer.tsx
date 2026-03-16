"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

export default function Footer() {
    const t = useTranslations("Navigation");
    const tFooter = useTranslations("Footer");

    return (
        <footer className="relative bg-primary border-t border-white/5">
            {/* Gradient line at top */}
            <div className="gradient-line w-full" />

            <div className="container mx-auto px-4 md:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-baseline gap-1.5 mb-6 group">
                            <span className="text-2xl font-black text-white tracking-tighter group-hover:text-accent transition-colors">
                                GROHN
                            </span>
                            <span className="text-sm font-light text-accent tracking-[0.25em]">
                                KİMYA
                            </span>
                        </Link>
                        <p className="text-text-muted text-sm leading-relaxed max-w-xs">
                            {tFooter("tagline")}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-6">
                            {tFooter("quickLinks")}
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { key: "about", href: "/about" },
                                { key: "products", href: "/products" },
                                { key: "blog", href: "/blog" },
                                { key: "faq", href: "/faq" },
                                { key: "contact", href: "/contact" },
                            ].map((link) => (
                                <li key={link.key}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-text-secondary hover:text-accent transition-colors inline-flex items-center gap-1 group"
                                    >
                                        {t(link.key)}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted mb-6">
                            {tFooter("contactTitle")}
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                                    <MapPin className="w-4 h-4 text-accent" />
                                </div>
                                <span className="text-sm text-text-secondary leading-relaxed">
                                    Velimeşe OSB, Kervancı Tic. Mer. B12<br />Ergene / Tekirdağ, Türkiye
                                </span>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                                    <Phone className="w-4 h-4 text-accent" />
                                </div>
                                <span className="text-sm text-text-secondary">+90 539 880 23 46</span>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                                    <Mail className="w-4 h-4 text-accent" />
                                </div>
                                <span className="text-sm text-text-secondary">grohn@grohn.com.tr</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-text-muted">
                        &copy; {new Date().getFullYear()} Grohn Kimya. {tFooter("rights")}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {tFooter("madeIn")}
                    </div>
                </div>
            </div>
        </footer>
    );
}
