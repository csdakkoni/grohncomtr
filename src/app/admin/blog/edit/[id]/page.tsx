"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";
import { Loader2 } from "lucide-react";

export default function EditBlogPost() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [post, setPost] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            const { data, error } = await supabase
                .from("blog_posts")
                .select("*")
                .eq("id", id)
                .single();

            if (error || !data) {
                alert("Yazı bulunamadı.");
                router.push("/admin/blog");
                return;
            }
            setPost(data);
            setLoading(false);
        };
        load();
    }, [id, router]);

    const handleSave = async (data: Record<string, unknown>) => {
        setSaving(true);
        const { error } = await supabase.from("blog_posts").update(data).eq("id", id);
        setSaving(false);

        if (error) {
            alert("Hata: " + error.message);
            return;
        }
        router.push("/admin/blog");
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Blog Yazısı Düzenle</h1>
            <BlogEditor initialData={post!} onSave={handleSave} saving={saving} />
        </div>
    );
}
