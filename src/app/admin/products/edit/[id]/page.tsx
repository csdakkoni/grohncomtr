"use client";

import { useEffect, useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function EditProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            const { data } = await supabase.from('products').select('*').eq('id', id).single();
            setProduct(data);
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="p-10 font-medium text-gray-500">Yükleniyor...</div>;
    if (!product) return <div className="p-10 text-red-500">Ürün bulunamadı.</div>;

    return <ProductForm mode="edit" initialData={product} />;
}
