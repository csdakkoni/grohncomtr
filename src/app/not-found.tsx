"use client";
import React from 'react';
import Link from 'next/link'; // Standard Next.js Link for 404 since we might not have locale

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <h1 className="text-6xl font-bold text-gray-300">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
            <p className="text-gray-600 mt-2 mb-8">Sayfa bulunamadı</p>
            <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Return Home
            </Link>
        </div>
    );
}
