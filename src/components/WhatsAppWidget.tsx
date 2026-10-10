"use client";

import { MessageCircle } from 'lucide-react';
import { useLocale } from 'next-intl';

const PHONE_NUMBER = '905398802346';

// Prefilled message per locale; {page} is the page the visitor writes from
const GREETINGS: Record<string, string> = {
    tr: 'Merhaba, web sitenizden yazıyorum. Şu sayfayla ilgili bilgi almak istiyorum: {page}',
    en: 'Hello, I am writing from your website. I would like more information about: {page}',
    fr: 'Bonjour, je vous écris depuis votre site web. Je souhaite plus d\'informations sur : {page}',
    ar: 'مرحباً، أكتب إليكم من موقعكم الإلكتروني. أود الحصول على مزيد من المعلومات حول: {page}',
    ru: 'Здравствуйте, пишу с вашего сайта. Хотел бы получить информацию о: {page}',
    es: 'Hola, les escribo desde su sitio web. Quisiera más información sobre: {page}',
    pt: 'Olá, estou escrevendo pelo seu site. Gostaria de mais informações sobre: {page}',
};

export default function WhatsAppWidget() {
    const locale = useLocale();

    const handleClick = () => {
        // Page title without the " | Grohn Kimya ..." suffix, plus the URL so the source page is visible
        const pageTitle = document.title.split(' | ')[0].trim();
        const page = `${pageTitle} (${window.location.href})`;
        const template = GREETINGS[locale] || GREETINGS.en;
        const message = encodeURIComponent(template.replace('{page}', page));
        window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            aria-label="Contact us on WhatsApp"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300 group"
        >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping" />
        </button>
    );
}
