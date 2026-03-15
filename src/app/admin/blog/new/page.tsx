"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";

export default function NewBlogPost() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const handleSave = async (data: Record<string, unknown>) => {
        setSaving(true);
        const { error } = await supabase.from("blog_posts").insert(data);
        setSaving(false);

        if (error) {
            alert("Hata: " + error.message);
            return;
        }
        router.push("/admin/blog");
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Yeni Blog Yazısı</h1>
            <BlogEditor onSave={handleSave} saving={saving} />
        </div>
    );
}
