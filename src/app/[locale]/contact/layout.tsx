import { getPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ContactPage' });
    return getPageMetadata(locale, '/contact', { title: t('title'), description: t('subtitle') });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
