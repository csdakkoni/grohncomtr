import { getProductBySlug } from '@/lib/api';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ArrowLeft, FileText, Send } from 'lucide-react';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/SEOSchemas';
import { getPageMetadata } from '@/lib/metadata';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const { locale, slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) return {};
    
    const getLocalizedField = (obj: any, field: string) => obj[`${field}_${locale}`] || obj[`${field}_en`] || obj[`${field}_tr`];
    return getPageMetadata(locale, `/products/${slug}`, { 
        title: getLocalizedField(product, 'title'),
        description: getLocalizedField(product, 'description')
    });
}

export default async function ProductDetailPage({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const product = await getProductBySlug(slug);
    const t = await getTranslations('Products');

    if (!product) {
        notFound();
    }

    const getLocalized = (obj: any, field: string) => {
        return obj[`${field}_${locale}`] || obj[`${field}_en`] || obj[`${field}_tr`];
    };

    const specs = [
        { label: t('chemicalFormula'), value: product.chemical_formula || '-' },
        { label: t('purity'), value: product.purity || '-' },
        { label: 'CAS No', value: product.cas_number || '-' },
        { label: 'EINECS No', value: product.einecs_number || '-' },
    ];

    return (
        <div className="pt-20 min-h-screen bg-primary">
            <ProductJsonLd
                name={getLocalized(product, 'title')}
                description={getLocalized(product, 'description')}
                image={product.image_url}
                category={product.category_name}
                slug={slug}
                locale={locale}
            />
            <BreadcrumbJsonLd
                items={[
                    { name: 'Home', href: '/' },
                    { name: 'Products', href: '/products' },
                    { name: getLocalized(product, 'title'), href: `/products/${slug}` },
                ]}
                locale={locale}
            />
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-20">
                {/* Back */}
                <Link
                    href="/products"
                    className="inline-flex items-center text-text-muted hover:text-accent mb-10 transition-colors gap-2 text-sm group"
                >
                    <ArrowLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
                    {t('backToProducts')}
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image */}
                    <div className="rounded-2xl overflow-hidden glass h-[350px] lg:h-[450px] relative">
                        <Image
                            src={product.image_url}
                            alt={getLocalized(product, 'title')}
                            fill
                            className="object-cover opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div>
                        <span className="text-accent font-mono text-sm tracking-wider">
                            CAS: {product.cas_number || 'N/A'}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6 tracking-tight">
                            {getLocalized(product, 'title')}
                        </h1>
                        <p className="text-lg text-text-secondary leading-relaxed mb-10">
                            {getLocalized(product, 'description')}
                        </p>

                        {/* Technical Specs */}
                        <div className="glass rounded-2xl p-6 md:p-8 mb-8">
                            <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-accent" />
                                {t('technicalSpecs')}
                            </h3>
                            <div className="grid grid-cols-2 gap-y-5 gap-x-8">
                                {specs.map((spec, i) => (
                                    <div key={i}>
                                        <span className="block text-text-muted text-xs uppercase tracking-wider mb-1">
                                            {spec.label}
                                        </span>
                                        <span className="font-medium text-white font-mono text-sm">
                                            {spec.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/contact"
                                className="flex-1 py-4 gradient-accent text-white rounded-xl font-semibold hover:opacity-90 transition-all text-center shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                {t('requestQuote')}
                            </Link>
                            <button className="flex-1 py-4 glass text-white rounded-xl font-semibold hover:bg-white/[0.08] transition-all text-center flex items-center justify-center gap-2">
                                <FileText className="w-4 h-4" />
                                MSDS / TDS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
