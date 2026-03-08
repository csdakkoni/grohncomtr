
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

// Prefer Service Role Key if available for bypassing RLS, but Anon key works if policies allow Insert
// Given policies "Allow anon insert on contact_messages", but for products?
// "create policy "Allow public read access on products"
// We probably need to be authenticated or use Service Role key to insert products if RLS is on.
// Let's assume user has Service Key in env or we can sign in.
// If not, we might fail unless we turn off RLS or have a policy.
// Let's check if we have a SERVICE_ROLE_KEY in env, usually locally we do or we can just use the anon key if we add a policy (or if I'm "admin").
// Actually, let's try with what we have. If it fails, I'll ask user or disable RLS temporarily (can't do via script easily).
// However, I can use the `service_role` key if it's in .env.local.
console.log("Supabase URL:", supabaseUrl ? "Found" : "Missing");
console.log("Supabase Key:", supabaseKey ? "Found" : "Missing");

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    const products = JSON.parse(fs.readFileSync('scripts/import/parsed_products.json', 'utf8'));

    // 1. Ensure Category Exists
    let { data: categories, error: catError } = await supabase.from('categories').select('*');
    if (catError) {
        console.error('Error fetching categories:', catError);
        return;
    }

    let defaultCategory = categories.find(c => c.slug === 'industrial-chemicals');
    if (!defaultCategory) {
        console.log('Creating default category...');
        const newCat = {
            slug: 'industrial-chemicals',
            name_tr: 'Endüstriyel Kimyasallar',
            name_en: 'Industrial Chemicals',
            name_fr: 'Produits Chimiques Industriels',
            name_ar: 'مواد كيميائية صناعية',
            image_url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'
        };
        const { data, error } = await supabase.from('categories').insert([newCat]).select().single();
        if (error) {
            console.error('Failed to create category:', error);
            // Fallback to first existing or exit
            if (categories.length > 0) defaultCategory = categories[0];
            else return;
        } else {
            defaultCategory = data;
        }
    }

    console.log(`Using Category: ${defaultCategory.name_en} (${defaultCategory.id})`);

    // 2. Insert Products
    console.log(`Inserting ${products.length} products...`);

    // Prepare payload
    const payload = products.map(p => ({
        slug: p.slug,
        category_id: defaultCategory.id,
        title_tr: p.name,
        title_en: p.name, // Titles are same usually
        title_fr: p.name,
        title_ar: p.name,

        description_tr: p.desc_tr,
        description_en: p.desc_en,
        description_fr: p.desc_fr,
        description_ar: p.desc_ar,

        // Random image for now
        image_url: 'https://images.unsplash.com/photo-1622616233486-4fc2666cc632?q=80&w=2666&auto=format&fit=crop',

        is_featured: false
    }));

    // Chunk size 10 to avoid payload limits/timeouts
    const CHUNK_SIZE = 10;
    for (let i = 0; i < payload.length; i += CHUNK_SIZE) {
        const chunk = payload.slice(i, i + CHUNK_SIZE);
        const { error } = await supabase.from('products').upsert(chunk, { onConflict: 'slug' });
        if (error) {
            console.error(`Error inserting batch ${i}:`, error.message);
        } else {
            console.log(`Inserted batch ${i} - ${i + chunk.length}`);
        }
    }

    console.log('Seeding complete!');
}

seed().catch(console.error);
