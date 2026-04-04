import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/urunler',
                destination: '/tr/products',
                permanent: true,
            },
            {
                source: '/urunler/:path*',
                destination: '/tr/products/:path*',
                permanent: true,
            },
            {
                source: '/portfolio/:path*',
                destination: '/tr/products',
                permanent: true,
            },
            {
                source: '/urun-kategorileri/:path*',
                destination: '/tr/products',
                permanent: true,
            },
            {
                source: '/author/:path*',
                destination: '/tr/about',
                permanent: true,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
