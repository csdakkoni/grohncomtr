import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BookOpen, ArrowRight, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog';

function getLocalized(obj: any, field: string, locale: string) {
    return obj[`${field}_${locale}`] || obj[`${field}_en`] || obj[`${field}_tr`];
}

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
    technical: { tr: 'Teknik', en: 'Technical', fr: 'Technique', ar: 'تقني' },
    sustainability: { tr: 'Sürdürülebilirlik', en: 'Sustainability', fr: 'Durabilité', ar: 'الاستدامة' },
    guide: { tr: 'Rehber', en: 'Guide', fr: 'Guide', ar: 'دليل' },
    industry: { tr: 'Sektör', en: 'Industry', fr: 'Industrie', ar: 'صناعة' },
};

const CATEGORY_COLORS: Record<string, string> = {
    technical: 'bg-sky-500/15 text-sky-300 border-sky-500/20',
    sustainability: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    guide: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
    industry: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
};

export default async function BlogPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations('Blog');

    return (
        <div className="pt-20 min-h-screen">
            {/* Hero */}
            <section className="gradient-hero py-20 md:py-28">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center p-3 rounded-xl bg-accent/10 mb-6">
                            <BookOpen className="w-6 h-6 text-accent" />
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

            {/* Blog Grid */}
            <section className="py-16 md:py-24 bg-primary">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {BLOG_POSTS.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="glass rounded-2xl overflow-hidden hover:bg-white/[0.06] transition-all duration-300 group flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={post.image_url}
                                        alt=""
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                                    <span className={`absolute top-3 left-3 text-[10px] px-2.5 py-1 rounded-full border font-medium ${CATEGORY_COLORS[post.category]}`}>
                                        {CATEGORY_LABELS[post.category]?.[locale] || post.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : locale === 'fr' ? 'fr-FR' : locale === 'ar' ? 'ar-SA' : 'en-US', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </div>
                                    <h2 className="text-lg font-bold text-white mb-3 group-hover:text-accent transition-colors leading-tight">
                                        {getLocalized(post, 'title', locale)}
                                    </h2>
                                    <p className="text-sm text-text-muted leading-relaxed flex-1 line-clamp-3">
                                        {getLocalized(post, 'excerpt', locale)}
                                    </p>
                                    <div className="mt-4 flex items-center gap-1 text-accent text-sm font-medium">
                                        {t('readMore')}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
