"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Plus, Edit3, Trash2, Eye, Loader2, FileText } from "lucide-react";

interface BlogPost {
    id: string;
    slug: string;
    title_tr: string;
    title_en: string;
    category: string;
    date: string;
    published: boolean;
    created_at: string;
}

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("blog_posts")
            .select("id, slug, title_tr, title_en, category, date, published, created_at")
            .order("date", { ascending: false });

        if (!error && data) {
            setPosts(data);
        }
        setLoading(false);
    };

    const deletePost = async (id: string) => {
        if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
        await supabase.from("blog_posts").delete().eq("id", id);
        loadPosts();
    };

    const togglePublish = async (id: string, current: boolean) => {
        await supabase.from("blog_posts").update({ published: !current }).eq("id", id);
        loadPosts();
    };

    const CATEGORY_LABELS: Record<string, string> = {
        technical: "Teknik",
        sustainability: "Sürdürülebilirlik",
        guide: "Rehber",
        industry: "Sektör",
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Blog Yönetimi</h1>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Yeni Yazı
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Henüz blog yazısı yok.</p>
                    <Link href="/admin/blog/new" className="text-blue-600 font-medium hover:underline">
                        İlk yazıyı ekle →
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Başlık</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Kategori</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Tarih</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Durum</th>
                                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{post.title_tr || post.title_en}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">/{post.slug}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                            {CATEGORY_LABELS[post.category] || post.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(post.date).toLocaleDateString("tr-TR")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => togglePublish(post.id, post.published)}
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                post.published
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {post.published ? "Yayında" : "Taslak"}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <a
                                                href={`/tr/blog/${post.slug}`}
                                                target="_blank"
                                                className="p-2 text-gray-400 hover:text-blue-600 transition"
                                                title="Görüntüle"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </a>
                                            <Link
                                                href={`/admin/blog/edit/${post.id}`}
                                                className="p-2 text-gray-400 hover:text-blue-600 transition"
                                                title="Düzenle"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => deletePost(post.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 transition"
                                                title="Sil"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
