import { Metadata } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://grohn.com.tr';
const LOCALES = routing.locales;

export function getPageMetadata(
    locale: string,
    path: string, // e.g., '', '/about', '/products/123'
    overrides: Partial<Metadata> = {}
): Metadata {
    const alternateLanguages = Object.fromEntries(
        LOCALES.map(l => [l, `${BASE_URL}/${l}${path}`])
    );

    return {
        ...overrides,
        alternates: {
            canonical: `${BASE_URL}/${locale}${path}`,
            languages: alternateLanguages,
        },
    };
}
