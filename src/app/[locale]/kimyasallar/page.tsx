import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BookOpen, Search, ArrowRight } from 'lucide-react';
import { getPageMetadata } from '@/lib/metadata';
import { CHEMICAL_DICTIONARY } from '@/lib/chemicals-db';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getPageMetadata(locale, '/kimyasallar', {
        title: 'Endüstriyel Kimya Sözlüğü ve Hammadde Kataloğu | Grohn Kimya',
        description: 'Yüzlerce endüstriyel kimyasal hammadde, CAS numaraları, formülleri ve kullanım alanları hakkında detaylı bilgi alabileceğiniz geniş kapsamlı Kimya Sözlüğü.'
    });
}

export default async function ChemicalsIndexPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    const getLocalized = (obj: any, field: string) => {
        return obj[`${field}_${locale}`] || obj[`${field}_en`] || obj[`${field}_tr`];
    };

    return (
        <div className="pt-20 min-h-screen bg-primary">
            {/* Header */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
                    <span className="badge-glass inline-flex items-center gap-2 mb-6">
                        <BookOpen className="w-4 h-4 text-accent" />
                        A'dan Z'ye Hammadde Ansiklopedisi
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Kimya Sözlüğü
                    </h1>
                    <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                        Endüstriyel üretimde kullanılan temel kimyasalların özelliklerini, formüllerini ve kullanım alanlarını keşfedin.
                    </p>
                </div>
            </div>

            {/* List */}
            <div className="container mx-auto px-4 md:px-8 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CHEMICAL_DICTIONARY.map((chemical) => (
                        <Link 
                            key={chemical.id} 
                            href={`/kimyasallar/${chemical.slug}`}
                            className="glass rounded-2xl p-6 group hover:border-accent/50 transition-colors flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-mono text-text-muted">CAS: {chemical.cas_number}</span>
                                <span className="badge-glass text-accent text-[10px] uppercase">{chemical.category}</span>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                                {getLocalized(chemical, 'name')}
                            </h2>
                            <p className="text-sm text-text-secondary line-clamp-3 mb-6 flex-grow">
                                {getLocalized(chemical, 'description')}
                            </p>
                            <div className="flex items-center text-accent text-sm font-medium mt-auto group-hover:translate-x-1 transition-transform">
                                İncele <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
