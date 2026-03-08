import { MetadataRoute } from 'next';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mock';
import { BLOG_POSTS } from '@/lib/blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://grohn.com.tr';
const LOCALES = ['tr', 'en', 'fr', 'ar'];

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    // Static pages
    const staticPages = ['', '/about', '/contact', '/products'];

    for (const page of staticPages) {
        for (const locale of LOCALES) {
            entries.push({
                url: `${BASE_URL}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === '' ? 'weekly' : 'monthly',
                priority: page === '' ? 1.0 : page === '/products' ? 0.9 : 0.7,
                alternates: {
                    languages: Object.fromEntries(
                        LOCALES.map(l => [l, `${BASE_URL}/${l}${page}`])
                    ),
                },
            });
        }
    }

    // Product pages
    for (const product of MOCK_PRODUCTS) {
        for (const locale of LOCALES) {
            entries.push({
                url: `${BASE_URL}/${locale}/products/${product.slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: {
                    languages: Object.fromEntries(
                        LOCALES.map(l => [l, `${BASE_URL}/${l}/products/${product.slug}`])
                    ),
                },
            });
        }
    }
    // Blog pages
    // Blog listing
    for (const locale of LOCALES) {
        entries.push({
            url: `${BASE_URL}/${locale}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
                languages: Object.fromEntries(
                    LOCALES.map(l => [l, `${BASE_URL}/${l}/blog`])
                ),
            },
        });
    }
    // Blog posts
    for (const post of BLOG_POSTS) {
        for (const locale of LOCALES) {
            entries.push({
                url: `${BASE_URL}/${locale}/blog/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: 'monthly',
                priority: 0.7,
                alternates: {
                    languages: Object.fromEntries(
                        LOCALES.map(l => [l, `${BASE_URL}/${l}/blog/${post.slug}`])
                    ),
                },
            });
        }
    }

    return entries;
}
