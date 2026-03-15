"use client";

import { useState } from "react";
import { Save, Loader2, Upload, Image as ImageIcon } from "lucide-react";

interface BlogEditorProps {
    initialData?: Record<string, unknown>;
    onSave: (data: Record<string, unknown>) => Promise<void>;
    saving: boolean;
}

const CATEGORIES = [
    { value: "technical", label: "Teknik" },
    { value: "sustainability", label: "Sürdürülebilirlik" },
    { value: "guide", label: "Rehber" },
    { value: "industry", label: "Sektör" },
];

const LANGS = [
    { code: "tr", label: "🇹🇷 Türkçe" },
    { code: "en", label: "🇬🇧 English" },
    { code: "fr", label: "🇫🇷 Français" },
    { code: "ar", label: "🇸🇦 العربية" },
];

export default function BlogEditor({ initialData, onSave, saving }: BlogEditorProps) {
    const [activeLang, setActiveLang] = useState("tr");
    const [uploading, setUploading] = useState(false);

    const [form, setForm] = useState({
        slug: (initialData?.slug as string) || "",
        category: (initialData?.category as string) || "technical",
        author: (initialData?.author as string) || "Grohn Kimya R&D",
        date: (initialData?.date as string) || new Date().toISOString().split("T")[0],
        image_url: (initialData?.image_url as string) || "",
        published: (initialData?.published as boolean) ?? false,
        tags_en: ((initialData?.tags_en as string[]) || []).join(", "),
        // Multi-lang fields
        title_tr: (initialData?.title_tr as string) || "",
        title_en: (initialData?.title_en as string) || "",
        title_fr: (initialData?.title_fr as string) || "",
        title_ar: (initialData?.title_ar as string) || "",
        excerpt_tr: (initialData?.excerpt_tr as string) || "",
        excerpt_en: (initialData?.excerpt_en as string) || "",
        excerpt_fr: (initialData?.excerpt_fr as string) || "",
        excerpt_ar: (initialData?.excerpt_ar as string) || "",
        content_tr: (initialData?.content_tr as string) || "",
        content_en: (initialData?.content_en as string) || "",
        content_fr: (initialData?.content_fr as string) || "",
        content_ar: (initialData?.content_ar as string) || "",
    });

    const handleChange = (field: string, value: string | boolean) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "blog");

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await res.json();
            if (data.success) {
                handleChange("image_url", data.url);
            } else {
                alert(data.error || "Yükleme hatası");
            }
        } catch {
            alert("Yükleme sırasında hata oluştu.");
        }
        setUploading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Auto-generate slug from TR title if empty
        const slug = form.slug || form.title_tr
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        await onSave({
            ...form,
            slug,
            tags_en: form.tags_en.split(",").map(t => t.trim()).filter(Boolean),
        });
    };

    const inputClass = "w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 outline-none transition text-sm";
    const labelClass = "block text-xs font-semibold text-gray-500 uppercase mb-1.5";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Meta Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Genel Bilgiler</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className={labelClass}>Slug (URL)</label>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={e => handleChange("slug", e.target.value)}
                            placeholder="otomatik oluşturulur"
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Kategori</label>
                        <select value={form.category} onChange={e => handleChange("category", e.target.value)} className={inputClass}>
                            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Tarih</label>
                        <input type="date" value={form.date} onChange={e => handleChange("date", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Yazar</label>
                        <input type="text" value={form.author} onChange={e => handleChange("author", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Etiketler (EN, virgülle)</label>
                        <input type="text" value={form.tags_en} onChange={e => handleChange("tags_en", e.target.value)} placeholder="textile, chemistry" className={inputClass} />
                    </div>
                    <div className="flex items-end">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.published}
                                onChange={e => handleChange("published", e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300"
                            />
                            <span className="text-sm font-medium text-gray-700">Yayınla</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Cover Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Kapak Görseli</h2>
                <div className="flex items-start gap-4">
                    {form.image_url ? (
                        <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-gray-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-48 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-gray-300" />
                        </div>
                    )}
                    <div>
                        <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition cursor-pointer text-sm font-medium">
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            Görsel Yükle
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                        <p className="text-xs text-gray-400 mt-2">veya URL girin:</p>
                        <input
                            type="text"
                            value={form.image_url}
                            onChange={e => handleChange("image_url", e.target.value)}
                            placeholder="https://..."
                            className="mt-1 w-64 px-3 py-2 rounded-lg border border-gray-200 text-xs"
                        />
                    </div>
                </div>
            </div>

            {/* Multi-language Content */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-900 mb-4">İçerik (Çok Dilli)</h2>

                {/* Language Tabs */}
                <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1">
                    {LANGS.map(lang => (
                        <button
                            key={lang.code}
                            type="button"
                            onClick={() => setActiveLang(lang.code)}
                            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                                activeLang === lang.code
                                    ? "bg-white shadow text-gray-900"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>
                            Başlık ({activeLang.toUpperCase()})
                            {activeLang !== "tr" && !form[`title_${activeLang}` as keyof typeof form] && (
                                <span className="text-amber-500 ml-1">• boş</span>
                            )}
                        </label>
                        <input
                            type="text"
                            value={form[`title_${activeLang}` as keyof typeof form] as string}
                            onChange={e => handleChange(`title_${activeLang}`, e.target.value)}
                            className={inputClass}
                            dir={activeLang === "ar" ? "rtl" : "ltr"}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>
                            Özet ({activeLang.toUpperCase()})
                        </label>
                        <textarea
                            rows={2}
                            value={form[`excerpt_${activeLang}` as keyof typeof form] as string}
                            onChange={e => handleChange(`excerpt_${activeLang}`, e.target.value)}
                            className={`${inputClass} resize-none`}
                            dir={activeLang === "ar" ? "rtl" : "ltr"}
                        />
                    </div>
                    <div>
                        <label className={labelClass}>
                            İçerik — Markdown ({activeLang.toUpperCase()})
                        </label>
                        <textarea
                            rows={16}
                            value={form[`content_${activeLang}` as keyof typeof form] as string}
                            onChange={e => handleChange(`content_${activeLang}`, e.target.value)}
                            className={`${inputClass} font-mono text-xs resize-y`}
                            dir={activeLang === "ar" ? "rtl" : "ltr"}
                        />
                    </div>
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={saving || !form.title_tr}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Kaydet
                </button>
            </div>
        </form>
    );
}
