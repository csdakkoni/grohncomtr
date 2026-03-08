"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CategoryFormProps {
    initialData?: any;
    mode: 'create' | 'edit';
}

export default function CategoryForm({ initialData, mode }: CategoryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'tr' | 'en' | 'fr' | 'ar'>('tr');

    // Form States
    const [formData, setFormData] = useState({
        name_tr: '', name_en: '', name_fr: '', name_ar: '',
        slug: '', image_url: '',
        ...initialData
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));

        if (name === 'name_tr' && mode === 'create' && !formData.slug) {
            setFormData((prev: any) => ({
                ...prev,
                slug: value.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
            }));
        }
    };

    const handleAutoTranslate = () => {
        if (!formData.name_tr) return alert('Lütfen önce Türkçe kategori adını girin.');
        setFormData((prev: any) => ({
            ...prev,
            name_en: prev.name_en || `[EN] ${prev.name_tr}`,
            name_fr: prev.name_fr || `[FR] ${prev.name_tr}`,
            name_ar: prev.name_ar || `[AR] ${prev.name_tr}`,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const payload = { ...formData };
        delete payload.id;
        delete payload.created_at;

        let error;
        if (mode === 'create') {
            const { error: err } = await supabase.from('categories').insert([payload]);
            error = err;
        } else {
            const { error: err } = await supabase.from('categories').update(payload).eq('id', initialData.id);
            error = err;
        }

        if (error) {
            alert('Hata: ' + error.message);
            setLoading(false);
        } else {
            router.push('/admin/categories');
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/categories" className="p-2 hover:bg-white rounded-full transition">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{mode === 'create' ? 'Yeni Kategori' : 'Kategori Düzenle'}</h1>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleAutoTranslate}
                        className="bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-50 transition"
                    >
                        ✨ Çevir
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary-dark transition disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Kaydet
                    </button>
                </div>
            </div>

            <div className="grid gap-6">
                {/* Language Tabs */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                    {(['tr', 'en', 'fr', 'ar'] as const).map((lang) => (
                        <button
                            key={lang}
                            type="button"
                            onClick={() => setActiveTab(lang)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${activeTab === lang ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {lang === 'tr' && '🇹🇷'}
                            {lang === 'en' && '🇬🇧'}
                            {lang === 'fr' && '🇫🇷'}
                            {lang === 'ar' && '🇸🇦'}
                        </button>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Adı ({activeTab.toUpperCase()})</label>
                        <input
                            name={`name_${activeTab}`}
                            // @ts-ignore
                            value={formData[`name_${activeTab}`] || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                            dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug (Otomatik)</label>
                        <input required name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm bg-gray-50" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Resim URL</label>
                        <input required name="image_url" value={formData.image_url || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                    </div>
                </div>
            </div>
        </form>
    );
}
