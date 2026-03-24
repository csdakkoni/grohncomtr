import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/SEOSchemas';
import { getPageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const { locale, slug } = await params;
    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (!post) return {};
    
    const getLocalizedField = (obj: any, field: string) => obj[`${field}_${locale}`] || obj[`${field}_en`] || obj[`${field}_tr`];
    return getPageMetadata(locale, `/blog/${slug}`, { 
        title: getLocalizedField(post, 'title'),
        description: getLocalizedField(post, 'excerpt')
    });
}

function getLocalized(obj: any, field: string, locale: string) {
    return obj[`${field}_${locale}`] || obj[`${field}_en`] || obj[`${field}_tr`];
}

export default async function BlogPostPage({
    params
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    const t = await getTranslations('Blog');

    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (!post) notFound();

    const content = getLocalized(post, 'content', locale);
    const title = getLocalized(post, 'title', locale);

    return (
        <div className="pt-20 min-h-screen">
            <ArticleJsonLd
                title={title}
                description={getLocalized(post, 'excerpt', locale)}
                image={post.image_url}
                author={post.author}
                datePublished={post.date}
                slug={slug}
                locale={locale}
            />
            <BreadcrumbJsonLd
                items={[
                    { name: 'Home', href: '/' },
                    { name: 'Blog', href: '/blog' },
                    { name: title, href: `/blog/${slug}` },
                ]}
                locale={locale}
            />
            {/* Hero */}
            <section className="gradient-hero py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-text-muted hover:text-accent text-sm mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                        {t('backToBlog')}
                    </Link>

                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
                        {title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                        <span className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            {post.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : locale === 'fr' ? 'fr-FR' : locale === 'ar' ? 'ar-SA' : 'en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </span>
                    </div>

                    {/* Tags */}
                    {post.tags_en.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags_en.map(tag => (
                                <span key={tag} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-primary">
                <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                    <div className="glass rounded-2xl p-6 md:p-10">
                        <article className="prose prose-invert prose-lg max-w-none
                            prose-headings:text-white prose-headings:font-bold
                            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
                            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-accent
                            prose-p:text-text-secondary prose-p:leading-relaxed
                            prose-strong:text-white
                            prose-li:text-text-secondary
                            prose-table:border-collapse
                            prose-th:text-white prose-th:bg-white/5 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:border prose-th:border-white/10
                            prose-td:px-4 prose-td:py-2 prose-td:text-text-secondary prose-td:border prose-td:border-white/10
                            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                            prose-code:text-accent prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                            prose-em:text-text-muted
                            prose-ol:text-text-secondary prose-ul:text-text-secondary
                        ">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </article>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 text-center">
                        <div className="glass rounded-2xl p-8 md:p-12">
                            <h3 className="text-2xl font-bold text-white mb-3">
                                {t('ctaTitle')}
                            </h3>
                            <p className="text-text-muted mb-6 max-w-lg mx-auto">
                                {t('ctaDescription')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 gradient-accent text-white font-semibold rounded-full hover:opacity-90 transition-all"
                                >
                                    {t('ctaButton')}
                                </Link>
                                <Link
                                    href="/products"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 glass text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                                >
                                    {t('ctaProducts')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
