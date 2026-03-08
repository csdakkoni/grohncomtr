"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/lib/api";

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await getCategories();
        if (data) setCategories(data);
        setLoading(false);
    };

    const deleteCategory = async (id: string) => {
        if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return;
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (!error) fetchData();
        else alert(error.message);
    };

    if (loading) return <div className="p-8">Yükleniyor...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Kategori Yönetimi</h1>
                <Link href="/admin/categories/new" className="bg-primary text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary-dark transition">
                    <Plus className="w-5 h-5" />
                    Yeni Kategori
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4">Resim</th>
                            <th className="p-4">Kategori (TR)</th>
                            <th className="p-4">Kategori (EN)</th>
                            <th className="p-4 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50 transition">
                                <td className="p-4">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={cat.image_url} alt="" className="w-10 h-10 rounded bg-gray-100 object-cover" />
                                </td>
                                <td className="p-4 font-medium">{cat.name_tr}</td>
                                <td className="p-4 text-gray-500">{cat.name_en}</td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/categories/edit/${cat.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></Link>
                                        <button onClick={() => deleteCategory(cat.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
