// BCP 47 tags used for date formatting and Open Graph locale per site locale
export const INTL_LOCALES: Record<string, string> = {
    tr: 'tr-TR',
    en: 'en-US',
    fr: 'fr-FR',
    ar: 'ar-SA',
    ru: 'ru-RU',
    es: 'es-ES',
    pt: 'pt-BR',
};

export function intlLocale(locale: string) {
    return INTL_LOCALES[locale] || 'en-US';
}
