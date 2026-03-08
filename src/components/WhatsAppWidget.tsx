"use client";

import { MessageCircle } from 'lucide-react';

const PHONE_NUMBER = '905398802346';

export default function WhatsAppWidget() {
    const handleClick = () => {
        const message = encodeURIComponent(
            'Hello, I am interested in your textile chemical products. Can you provide more information?'
        );
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
