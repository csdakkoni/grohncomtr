"use client";

import { useEffect, useState } from "react";
import CategoryForm from "@/components/admin/CategoryForm";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function EditCategoryPage() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchCategory = async () => {
            const { data } = await supabase.from('categories').select('*').eq('id', id).single();
            setCategory(data);
            setLoading(false);
        };
        fetchCategory();
    }, [id]);

    if (loading) return <div className="p-10 font-medium">Yükleniyor...</div>;
    return <CategoryForm mode="edit" initialData={category} />;
}
