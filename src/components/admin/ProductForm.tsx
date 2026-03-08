"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/lib/api";

interface ProductFormProps {
    initialData?: any;
    mode: 'create' | 'edit';
}

export default function ProductForm({ initialData, mode }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);

    // Form States
    const [formData, setFormData] = useState({
        title_tr: '', title_en: '', description_tr: '', description_en: '',
        title_fr: '', title_ar: '', description_fr: '', description_ar: '', // Added for FR and AR
        category_id: '', slug: '', image_url: '',
        cas_number: '', chemical_formula: '', purity: '',
        ...initialData
    });

    const [activeTab, setActiveTab] = useState<'tr' | 'en' | 'fr' | 'ar'>('tr');

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));

        // Auto-generate slug from TR title if creating and slug is empty
        if (name === 'title_tr' && mode === 'create' && !formData.slug) {
            setFormData((prev: any) => ({
                ...prev,
                slug: value.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
            }));
        }
    };

    const handleAutoTranslate = () => {
        // Simulating Auto Translation (In production, call Google/OpenAI API)
        if (!formData.title_tr) return alert('Lütfen önce Türkçe başlığı girin.');

        const confirmTrans = confirm('Türkçe içerikler diğer dillere otomatik (taslak olarak) çevrilsin mi? Mevcut çeviriler ezilebilir.');
        if (!confirmTrans) return;

        setFormData((prev: any) => ({
            ...prev,
            title_en: prev.title_en || `[EN] ${prev.title_tr}`,
            title_fr: prev.title_fr || `[FR] ${prev.title_tr}`,
            title_ar: prev.title_ar || `[AR] ${prev.title_tr}`,
            description_en: prev.description_en || `[EN] ${prev.description_tr}`,
            description_fr: prev.description_fr || `[FR] ${prev.description_tr}`,
            description_ar: prev.description_ar || `[AR] ${prev.description_tr}`,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = { ...formData };
        delete payload.id; // Don't update ID
        delete payload.created_at;

        let error;
        if (mode === 'create') {
            const { error: err } = await supabase.from('products').insert([payload]);
            error = err;
        } else {
            const { error: err } = await supabase.from('products').update(payload).eq('id', initialData.id);
            error = err;
        }

        if (error) {
            alert('Hata: ' + error.message);
            setLoading(false);
        } else {
            router.push('/admin/products');
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="p-2 hover:bg-white rounded-full transition">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{mode === 'create' ? 'Yeni Ürün Ekle' : 'Ürünü Düzenle'}</h1>
                        <p className="text-sm text-gray-500">Tüm dillerde içerik girişi yapabilirsiniz.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleAutoTranslate}
                        className="bg-white border border-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-50 transition"
                    >
                        ✨ Otomatik Çevir
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="md:col-span-2 space-y-6">
                    {/* Language Tabs */}
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                        {(['tr', 'en', 'fr', 'ar'] as const).map((lang) => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => setActiveTab(lang)}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${activeTab === lang ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {lang === 'tr' && '🇹🇷 Türkçe'}
                                {lang === 'en' && '🇬🇧 English'}
                                {lang === 'fr' && '🇫🇷 Français'}
                                {lang === 'ar' && '🇸🇦 العربية'}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-4">
                            <h3 className="font-semibold text-gray-900">
                                {activeTab === 'tr' && 'Ürün Bilgileri (Türkçe)'}
                                {activeTab === 'en' && 'Product Info (English)'}
                                {activeTab === 'fr' && 'Informations (Français)'}
                                {activeTab === 'ar' && 'معلومات المنتج (العربية)'}
                            </h3>
                            <span className="text-xs text-gray-400 uppercase tracking-widest">{activeTab}</span>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Başlığı</label>
                            <input
                                name={`title_${activeTab}`}
                                // @ts-ignore
                                value={formData[`title_${activeTab}`] || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                placeholder={activeTab === 'tr' ? 'Örn: Sodyum Hipoklorit' : 'Translated title...'}
                                dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                            <textarea
                                rows={6}
                                name={`description_${activeTab}`}
                                // @ts-ignore
                                value={formData[`description_${activeTab}`] || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4">Ayarlar</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                            <select required name="category_id" value={formData.category_id} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-white">
                                <option value="">Seçiniz...</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name_tr}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                            <input required name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none font-mono text-sm" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Resim URL</label>
                            <input required name="image_url" value={formData.image_url} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" placeholder="https://..." />
                            {formData.image_url && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={formData.image_url} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg border border-gray-200" />
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4">Teknik Veriler</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CAS Number</label>
                            <input name="cas_number" value={formData.cas_number || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kimyasal Formül</label>
                            <input name="chemical_formula" value={formData.chemical_formula || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Saflık</label>
                            <input name="purity" value={formData.purity || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
