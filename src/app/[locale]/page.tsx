import { getPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';
import HomePageClient from './HomePageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'HomePage' });
    return getPageMetadata(locale, '', { 
        title: t('heroTitle'), 
        description: t('heroSubtitle') 
    });
}

export default function HomePage() {
    return <HomePageClient />;
}
