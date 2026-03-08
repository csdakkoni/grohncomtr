"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/lib/api";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const { data: prodData } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        const catData = await getCategories();

        if (prodData) setProducts(prodData);
        if (catData) setCategories(catData);
        setLoading(false);
    };

    const deleteProduct = async (id: string) => {
        if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;

        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) {
            fetchData();
        } else {
            alert('Silme işlemi başarısız: ' + error.message);
        }
    };

    const filteredProducts = products.filter(p =>
        p.title_tr.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.includes(search.toLowerCase())
    );

    if (loading) return <div className="p-8">Yükleniyor...</div>;

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h1>
                <Link href="/admin/products/new" className="bg-primary text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary-dark transition">
                    <Plus className="w-5 h-5" />
                    Yeni Ürün Ekle
                </Link>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Ürün Ara..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-primary transition"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-700 text-sm">Resim</th>
                            <th className="p-4 font-semibold text-gray-700 text-sm">Ürün Adı (TR)</th>
                            <th className="p-4 font-semibold text-gray-700 text-sm">Kategori</th>
                            <th className="p-4 font-semibold text-gray-700 text-sm">CAS No</th>
                            <th className="p-4 font-semibold text-gray-700 text-sm text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredProducts.map((produ) => (
                            <tr key={produ.id} className="hover:bg-gray-50 transition">
                                <td className="p-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={produ.image_url} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="p-4 font-medium text-gray-900">{produ.title_tr}</td>
                                <td className="p-4 text-gray-600 text-sm">
                                    {categories.find(c => c.id === produ.category_id)?.name_tr || '-'}
                                </td>
                                <td className="p-4 text-gray-500 text-sm font-mono">{produ.cas_number}</td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/products/edit/${produ.id}`}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => deleteProduct(produ.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 && (
                    <div className="p-8 text-center text-gray-500">Ürün bulunamadı.</div>
                )}
            </div>
        </div>
    );
}
