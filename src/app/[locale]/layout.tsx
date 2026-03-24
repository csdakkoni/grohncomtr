import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "../globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://grohn.com.tr';
const LOCALES = ['tr', 'en', 'fr', 'ar'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        return {};
    }

    const titles: Record<string, string> = {
        tr: 'Grohn Kimya — Tekstil Kimyasalları Üreticisi',
        en: 'Grohn Kimya — Textile Chemical Manufacturer',
        fr: 'Grohn Kimya — Fabricant de Produits Chimiques Textiles',
        ar: 'Grohn Kimya — الشركة المصنعة للمواد الكيميائية النسيجية',
    };

    const descriptions: Record<string, string> = {
        tr: 'Grohn Kimya — Tekstil kimyasalları üretimi ve ihracatı. Ön işlem, boyama yardımcıları, yumuşatıcılar, enzimler ve apre kimyasalları. Velimeşe OSB, Tekirdağ.',
        en: 'Grohn Kimya — Textile chemical manufacturer and exporter from Turkey. Pre-treatment, dyeing auxiliaries, softeners, enzymes and finishing chemicals.',
        fr: 'Grohn Kimya — Fabricant et exportateur de produits chimiques textiles de Turquie. Prétraitement, auxiliaires de teinture, adoucissants, enzymes.',
        ar: 'Grohn Kimya — شركة تصنيع وتصدير المواد الكيميائية النسيجية من تركيا. المعالجة المسبقة، مساعدات الصباغة، المنعمات، الإنزيمات.',
    };

    const keywords: Record<string, string> = {
        tr: 'tekstil kimyasalları, boyama yardımcıları, silikon yumuşatıcı, enzim haşıl sökme, reaktif boyama, grohn kimya',
        en: 'textile chemicals, dyeing auxiliaries, silicone softener, enzyme desizing, reactive dyeing, grohn kimya, turkey textile chemicals',
        fr: 'produits chimiques textiles, auxiliaires de teinture, adoucissant silicone, enzymes textiles, grohn kimya turquie',
        ar: 'مواد كيميائية نسيجية, مساعدات صباغة, منعمات سيليكون, إنزيمات نسيجية, تركيا',
    };

    return {
        title: titles[locale] || titles.en,
        description: descriptions[locale] || descriptions.en,
        keywords: keywords[locale] || keywords.en,
        metadataBase: new URL(BASE_URL),
        openGraph: {
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
            url: `${BASE_URL}/${locale}`,
            siteName: 'Grohn Kimya',
            locale: locale === 'ar' ? 'ar_SA' : locale === 'fr' ? 'fr_FR' : locale === 'tr' ? 'tr_TR' : 'en_US',
            type: 'website',
            images: [{
                url: `${BASE_URL}/images/logo.png`,
                width: 1200,
                height: 630,
                alt: 'Grohn Kimya - Textile Chemical Manufacturer',
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: titles[locale] || titles.en,
            description: descriptions[locale] || descriptions.en,
        },
        icons: {
            icon: '/favicon.png',
            apple: '/favicon.png',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large' as const,
                'max-snippet': -1,
            },
        },
        verification: {
            google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
            other: {
                ...(process.env.BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } : {}),
                ...(process.env.YANDEX_SITE_VERIFICATION ? { 'yandex-verification': process.env.YANDEX_SITE_VERIFICATION } : {}),
            },
        },
        other: {
            'geo.region': 'TR-59',
            'geo.placename': 'Tekirdağ, Turkey',
            'geo.position': '41.2;27.5',
            'ICBM': '41.2, 27.5',
        },
    };
}

// JSON-LD Structured Data
function OrganizationJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Grohn Kimya',
        url: BASE_URL,
        logo: `${BASE_URL}/images/logo.png`,
        description: 'Textile chemical manufacturer and exporter from Turkey',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Velimeşe OSB, Kervancı Tic. Mer. B12',
            addressLocality: 'Ergene',
            addressRegion: 'Tekirdağ',
            addressCountry: 'TR',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+90-539-880-2346',
            email: 'grohn@grohn.com.tr',
            contactType: 'sales',
            availableLanguage: ['Turkish', 'English', 'French', 'Arabic'],
        },
        sameAs: [],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <html lang={locale} dir={dir}>
            <head>
                <OrganizationJsonLd />
            </head>
            <body className="min-h-screen bg-primary text-text-primary antialiased flex flex-col">
                <GoogleAnalytics />
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                    <WhatsAppWidget />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
