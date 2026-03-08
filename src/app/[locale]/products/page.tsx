import { getTranslations } from 'next-intl/server';
import { getCategories, getProducts, getSubgroups } from '@/lib/api';
import { FlaskConical } from 'lucide-react';
import ProductCatalog from '@/components/ProductCatalog';

export default async function ProductsPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations('Products');

    const categories = await getCategories();
    const subgroups = await getSubgroups();
    const products = await getProducts();

    return (
        <div className="pt-20 min-h-screen">
            {/* Hero */}
            <section className="gradient-hero py-20 md:py-28">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-accent/10 mb-6">
                            <FlaskConical className="w-6 h-6 text-accent" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-lg text-text-secondary max-w-xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Catalog */}
            <section className="py-16 md:py-24 bg-primary">
                <div className="container mx-auto px-4 md:px-8">
                    <ProductCatalog
                        categories={categories}
                        subgroups={subgroups}
                        products={products}
                        locale={locale}
                    />
                </div>
            </section>
        </div>
    );
}
