import { supabase } from './supabase';
import { MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_SUBGROUPS } from './mock';

// Force mock mode until Supabase tables are populated with real data.
// Set NEXT_PUBLIC_USE_LIVE_DATA=true in Vercel env to switch to live DB.
const IS_MOCK_MODE = process.env.NEXT_PUBLIC_USE_LIVE_DATA !== 'true';

export async function getSubgroups(categoryId?: string) {
    if (IS_MOCK_MODE) {
        if (categoryId) return MOCK_SUBGROUPS.filter(s => s.category_id === categoryId);
        return MOCK_SUBGROUPS;
    }
    // When Supabase is connected, fetch from subgroups table
    let query = supabase.from('subgroups').select('*');
    if (categoryId) query = query.eq('category_id', categoryId);
    const { data, error } = await query;
    if (error) { console.error('Error fetching subgroups:', error); return []; }
    return data;
}

export async function getCategories() {
    if (IS_MOCK_MODE) return MOCK_CATEGORIES;

    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
    return data;
}

export async function getProducts(categoryId?: string) {
    if (IS_MOCK_MODE) {
        if (categoryId) return MOCK_PRODUCTS.filter(p => p.category_id === categoryId);
        return MOCK_PRODUCTS;
    }

    let query = supabase.from('products').select('*');
    if (categoryId) query = query.eq('category_id', categoryId);

    const { data, error } = await query;
    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    return data;
}

export async function getProductBySlug(slug: string) {
    if (IS_MOCK_MODE) return MOCK_PRODUCTS.find(p => p.slug === slug);

    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }
    return data;
}

export async function submitContactMessage(formData: {
    full_name: string;
    email: string;
    subject: string;
    message: string;
}) {
    if (IS_MOCK_MODE) {
        console.log('MOCK SUBMISSION:', formData);
        return { success: true };
    }

    const { error } = await supabase.from('contact_messages').insert([formData]);

    if (error) {
        console.error('Error submitting contact form:', error);
        return { success: false, error };
    }

    return { success: true };
}
