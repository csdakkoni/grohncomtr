import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowLeft, BookOpen, FileText, Beaker } from 'lucide-react';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/SEOSchemas';
import { getPageMetadata } from '@/lib/metadata';
import { CHEMICAL_DICTIONARY } from '@/lib/chemicals-db';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const chemical = CHEMICAL_DICTIONARY.find(c => c.slug === slug);
    if (!chemical) return {};
    
    const getLocalizedField = (obj: any, field: string) => obj[`${field}_${locale}`] || obj[`${field}_en`] || obj[`${field}_tr`];
    
    // Programmatic SEO title: specific, keyword-rich
    const name = getLocalizedField(chemical, 'name');
    const cas = chemical.cas_number;
    const synonyms = chemical.synonyms_tr ? `${chemical.synonyms_tr}` : '';
    const ec = chemical.ec_number ? `(EC: ${chemical.ec_number})` : '';
    
    return getPageMetadata(locale, `/kimyasallar/${slug}`, { 
        title: `${name} ${ec} (CAS: ${cas}) Özellikleri, Kullanım Alanları ve Fiyatı | Grohn Kimya Sözlüğü`,
        description: `${name} ${synonyms}. CAS: ${cas}, Formül: ${chemical.formula}. ${getLocalizedField(chemical, 'description')} Satın al, tedarik et.`
    });
}

export default async function ChemicalDetailPage({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const chemical = CHEMICAL_DICTIONARY.find(c => c.slug === slug);

    if (!chemical) {
        notFound();
    }

    const t = await getTranslations('Products'); // Reuse some translations

    const getLocalized = (obj: any, field: string) => {
        return obj[`${field}_${locale}`] || obj[`${field}_en`] || obj[`${field}_tr`];
    };

    const name = getLocalized(chemical, 'name');
    const description = getLocalized(chemical, 'description');
    const usageAreas: string[] = chemical[`usage_areas_${locale}` as keyof typeof chemical] as string[] || chemical.usage_areas_en;

    return (
        <div className="pt-20 min-h-screen bg-primary">
            {/* Programmatic SEO: JSON-LD Structured Data */}
            <ProductJsonLd
                name={name}
                description={description}
                image="https://grohn.com.tr/images/chemical-placeholder.jpg" // Add a generic or specific image
                category="Industrial Chemical"
                slug={`kimyasallar/${slug}`}
                locale={locale}
            />
            <BreadcrumbJsonLd
                items={[
                    { name: 'Home', href: '/' },
                    { name: 'Kimya Sözlüğü', href: '/kimyasallar' },
                    { name: name, href: `/kimyasallar/${slug}` },
                ]}
                locale={locale}
            />

            <div className="container mx-auto px-4 md:px-8 py-12 md:py-20">
                <Link
                    href="/kimyasallar"
                    className="inline-flex items-center text-text-muted hover:text-accent mb-10 transition-colors gap-2 text-sm group"
                >
                    <ArrowLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
                    Kimya Sözlüğüne Dön
                </Link>

                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="badge-glass flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-accent" />
                                Kimya Sözlüğü
                            </span>
                            <span className="badge-glass text-accent font-mono">
                                CAS: {chemical.cas_number}
                            </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-2 tracking-tight">
                            {name}
                        </h1>
                        
                        {chemical.synonyms_tr && (
                            <p className="text-accent/80 text-sm font-medium mb-6 uppercase tracking-wider">
                                {chemical.synonyms_tr}
                            </p>
                        )}

                        {chemical.definition_tr && chemical.definition_tr.length > 0 ? (
                            <div className="glass rounded-2xl p-6 md:p-8 mb-8">
                                <h2 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-accent" />
                                    {name} Tanımı
                                </h2>
                                <div className="space-y-4">
                                    {chemical.definition_tr.map((paragraph, idx) => (
                                        <p key={idx} className="text-base text-text-secondary leading-relaxed">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="glass rounded-2xl p-6 md:p-8 mb-8">
                                <h2 className="text-xl font-semibold text-white mb-4">Genel Bilgi</h2>
                                <p className="text-lg text-text-secondary leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        )}

                        {chemical.uses_benefits_tr && chemical.uses_benefits_tr.length > 0 ? (
                            <div className="glass rounded-2xl p-6 md:p-8 mb-8">
                                <h2 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-accent" />
                                    {name} Kullanımları ve Faydaları
                                </h2>
                                <div className="space-y-4">
                                    {chemical.uses_benefits_tr.map((paragraph, idx) => (
                                        <p key={idx} className="text-base text-text-secondary leading-relaxed flex gap-3">
                                            <span className="text-accent mt-1.5">•</span>
                                            <span>{paragraph}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="glass rounded-2xl p-6 md:p-8 mb-8">
                                <h2 className="text-xl font-semibold text-white mb-4">Kullanım Alanları</h2>
                                <ul className="grid sm:grid-cols-2 gap-4">
                                    {usageAreas.map((area, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-text-secondary">
                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                            {area}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {chemical.applications_tr && chemical.applications_tr.length > 0 && (
                            <div className="glass rounded-2xl p-6 md:p-8 mb-8">
                                <h2 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-2">
                                    <Beaker className="w-5 h-5 text-accent" />
                                    {name} Uygulamaları
                                </h2>
                                <div className="space-y-4">
                                    {chemical.applications_tr.map((paragraph, idx) => (
                                        <p key={idx} className="text-base text-text-secondary leading-relaxed flex gap-3">
                                            <span className="text-accent mt-1.5">✓</span>
                                            <span>{paragraph}</span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Technical Specs */}
                    <div className="lg:col-span-1">
                        <div className="glass rounded-2xl p-6 md:p-8 sticky top-32">
                            <h3 className="font-semibold text-white mb-6 flex items-center gap-2">
                                <Beaker className="w-5 h-5 text-accent" />
                                Teknik Kimlik
                            </h3>
                            <div className="space-y-5">
                                <div>
                                    <span className="block text-text-muted text-xs uppercase tracking-wider mb-1">
                                        IUPAC / Ticari Adı
                                    </span>
                                    <span className="font-medium text-white text-sm">
                                        {name}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-text-muted text-xs uppercase tracking-wider mb-1">
                                        Kimyasal Formül
                                    </span>
                                    <span className="font-medium text-accent font-mono text-lg">
                                        {chemical.formula}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-text-muted text-xs uppercase tracking-wider mb-1">
                                        CAS Numarası
                                    </span>
                                    <span className="font-medium text-white font-mono text-sm">
                                        {chemical.cas_number}
                                    </span>
                                </div>
                                {chemical.ec_number && (
                                    <div>
                                        <span className="block text-text-muted text-xs uppercase tracking-wider mb-1">
                                            AT Numarası (EC)
                                        </span>
                                        <span className="font-medium text-white font-mono text-sm">
                                            {chemical.ec_number}
                                        </span>
                                    </div>
                                )}
                                {chemical.molecular_weight && (
                                    <div>
                                        <span className="block text-text-muted text-xs uppercase tracking-wider mb-1">
                                            Molekül Ağırlığı
                                        </span>
                                        <span className="font-medium text-white font-mono text-sm">
                                            {chemical.molecular_weight}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <span className="block text-text-muted text-xs uppercase tracking-wider mb-1">
                                        Sektörel Kategori
                                    </span>
                                    <span className="font-medium text-white text-sm capitalize">
                                        {chemical.category.replace('-', ' ')}
                                    </span>
                                </div>
                            </div>

                            <hr className="border-white/10 my-6" />
                            
                            <p className="text-xs text-text-muted mb-6 leading-relaxed">
                                * Bu sayfa, endüstriyel kimyasallar hakkında bilgi vermek amacıyla Programatik SEO altyapısı ile oluşturulmuştur. Bu hammaddeyi tedarik etmek veya muadillerini öğrenmek için bizimle iletişime geçebilirsiniz.
                            </p>

                            <Link
                                href="/contact"
                                className="w-full py-4 gradient-accent text-white rounded-xl font-semibold hover:opacity-90 transition-all text-center shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                            >
                                Fiyat ve Tedarik Bilgisi Al
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
