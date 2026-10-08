import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { intlLocale } from '@/i18n/locales';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "../globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://grohn.com.tr';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        return {};
    }

    const titles: Record<string, string> = {
        tr: 'Grohn Kimya — Endüstriyel Kimyasallar ve Hammadde Tedarikçisi',
        en: 'Grohn Kimya — Industrial Chemicals & Raw Materials Supplier from Turkey',
        fr: 'Grohn Kimya — Fournisseur de produits chimiques industriels et matières premières, Turquie',
        ar: 'Grohn Kimya — مورد الكيماويات الصناعية والمواد الخام من تركيا',
        ru: 'Grohn Kimya — поставщик промышленной химии и сырья из Турции',
        es: 'Grohn Kimya — Proveedor de químicos industriales y materias primas de Turquía',
        pt: 'Grohn Kimya — Fornecedor de produtos químicos industriais e matérias-primas da Turquia',
    };

    const descriptions: Record<string, string> = {
        tr: 'Grohn Kimya — Deterjan, kağıt, su arıtma, boya-kaplama ve tekstil sektörleri için endüstriyel kimyasal hammadde tedariki ve ihracatı. Velimeşe OSB, Tekirdağ.',
        en: 'Grohn Kimya — Industrial chemical raw materials supplier and exporter from Turkey for detergent, paper, water treatment, coatings and textile industries.',
        fr: 'Grohn Kimya — Fournisseur et exportateur turc de matières premières chimiques pour les détergents, le papier, le traitement de l\'eau, les revêtements et le textile.',
        ar: 'Grohn Kimya — مورد ومصدر للمواد الخام الكيميائية الصناعية من تركيا لصناعات المنظفات والورق ومعالجة المياه والطلاءات والنسيج.',
        ru: 'Grohn Kimya — поставщик и экспортёр промышленного химического сырья из Турции для производства моющих средств, бумаги, водоподготовки, ЛКМ и текстиля.',
        es: 'Grohn Kimya — Proveedor y exportador turco de materias primas químicas industriales para detergentes, papel, tratamiento de agua, recubrimientos y textiles.',
        pt: 'Grohn Kimya — Fornecedor e exportador turco de matérias-primas químicas industriais para detergentes, papel, tratamento de água, revestimentos e têxteis.',
    };

    const keywords: Record<string, string> = {
        tr: 'endüstriyel kimyasallar, kimyasal hammadde, deterjan hammaddeleri, su arıtma kimyasalları, tekstil kimyasalları, grohn kimya',
        en: 'industrial chemicals supplier, chemical raw materials, detergent raw materials, water treatment chemicals, textile chemicals, chemical exporter turkey, grohn kimya',
        fr: 'fournisseur produits chimiques industriels, matières premières chimiques, produits chimiques traitement de l\'eau, exportateur turquie',
        ar: 'مورد كيماويات صناعية, مواد خام كيميائية, كيماويات معالجة المياه, مواد خام المنظفات, تركيا',
        ru: 'промышленная химия, химическое сырьё, сырьё для моющих средств, химия для водоподготовки, поставщик из Турции',
        es: 'proveedor de químicos industriales, materias primas químicas, químicos para tratamiento de agua, materias primas para detergentes, exportador turquía',
        pt: 'fornecedor de produtos químicos industriais, matérias-primas químicas, químicos para tratamento de água, matérias-primas para detergentes, exportador turquia',
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
            locale: intlLocale(locale).replace('-', '_'),
            type: 'website',
            images: [{
                url: `${BASE_URL}/images/logo.png`,
                width: 1200,
                height: 630,
                alt: 'Grohn Kimya - Industrial Chemicals Supplier',
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
        description: 'Industrial chemicals and raw materials supplier and exporter from Turkey',
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
            availableLanguage: ['Turkish', 'English', 'French', 'Arabic', 'Russian', 'Spanish', 'Portuguese'],
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
