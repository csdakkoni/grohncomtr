/**
 * SEO Structured Data Components
 * JSON-LD schemas for Google Rich Results
 */

interface BreadcrumbItem {
    name: string;
    href: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    locale: string;
}

export function BreadcrumbJsonLd({ items, locale }: BreadcrumbProps) {
    const baseUrl = 'https://grohn.com.tr';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${baseUrl}/${locale}${item.href}`,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

interface ProductSchemaProps {
    name: string;
    description: string;
    image?: string;
    brand?: string;
    category?: string;
    slug: string;
    locale: string;
}

export function ProductJsonLd({ name, description, image, brand, category, slug, locale }: ProductSchemaProps) {
    const baseUrl = 'https://grohn.com.tr';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        image: image || `${baseUrl}/images/logo.png`,
        brand: {
            '@type': 'Brand',
            name: brand || 'Grohn Kimya',
        },
        category: category || 'Textile Chemicals',
        manufacturer: {
            '@type': 'Organization',
            name: 'Grohn Kimya',
            url: baseUrl,
        },
        url: `${baseUrl}/${locale}/products/${slug}`,
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'USD',
            seller: {
                '@type': 'Organization',
                name: 'Grohn Kimya',
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

interface ArticleSchemaProps {
    title: string;
    description: string;
    image?: string;
    author?: string;
    datePublished: string;
    slug: string;
    locale: string;
}

export function ArticleJsonLd({ title, description, image, author, datePublished, slug, locale }: ArticleSchemaProps) {
    const baseUrl = 'https://grohn.com.tr';
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: image || `${baseUrl}/images/logo.png`,
        author: {
            '@type': 'Organization',
            name: author || 'Grohn Kimya R&D',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Grohn Kimya',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/images/logo.png`,
            },
        },
        datePublished,
        dateModified: datePublished,
        url: `${baseUrl}/${locale}/blog/${slug}`,
        mainEntityOfPage: `${baseUrl}/${locale}/blog/${slug}`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSchemaProps {
    items: FAQItem[];
}

export function FAQJsonLd({ items }: FAQSchemaProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
