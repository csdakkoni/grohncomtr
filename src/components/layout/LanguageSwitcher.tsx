"use client";

import { useState } from 'react';
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";

const locales = [
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
            >
                <Globe className="w-4 h-4" />
                <span className="uppercase text-xs tracking-wider">{locale}</span>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full end-0 mt-2 glass-strong rounded-xl overflow-hidden min-w-[160px] z-50">
                        <div className="py-1">
                            {locales.map((loc) => (
                                <button
                                    key={loc.code}
                                    onClick={() => handleLocaleChange(loc.code)}
                                    className={`block w-full text-start px-4 py-3 text-sm transition-all ${locale === loc.code
                                            ? 'text-accent font-semibold bg-accent/10'
                                            : 'text-text-secondary hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <span className="mr-2">{loc.flag}</span>
                                    {loc.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
