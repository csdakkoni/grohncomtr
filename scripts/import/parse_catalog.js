
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

// Regex patterns
const CATEGORY_PATTERN_TR = /^(?:Bölüm|Part)\s+\d+(?:\.\d+)?/;
const PRODUCT_PATTERN = /^Gro[a-z]+\s+[A-Z0-9]+/;

const TR_CATALOG_PATH = './scripts/import/GrohnKatalog-TR.pdf';
const EN_CATALOG_PATH = './scripts/import/Grohn Chemical Katalog.pdf';

const productsMap = new Map();
const categoriesMap = new Map(); // slug -> { id, name_tr, name_en, ... }

function normalizeName(name) {
    return name.trim().replace(/\s+/g, ' ');
}

// Map known generic categories to IDs for consistency if needed, 
// or just slugify the extracted name.
function slugify(text) {
    return text.toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

async function parsePdf(filePath, isTurkish) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    const lines = data.text.split('\n').map(l => l.trim()).filter(l => l);

    let currentCategoryId = 'general';
    // Initialize default category
    if (!categoriesMap.has('general')) {
        categoriesMap.set('general', {
            id: 'general', slug: 'general',
            name_tr: 'Genel Kimyasallar', name_en: 'General Chemicals',
            name_fr: 'Général', name_ar: 'عام'
        });
    }

    let currentProduct = null;
    let nextLineIsCategoryName = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (/^\d+$/.test(line) || line.includes('INDEX') || line.includes('İÇİNDEKİLER')) continue;

        // Category Detection
        // Pattern: "Bölüm 1" (newline) "Ön İşlem Kimyasalları"
        if (CATEGORY_PATTERN_TR.test(line)) {
            // Found "Bölüm X". The NEXT line is likely the category name.
            nextLineIsCategoryName = true;
            continue;
        }

        if (nextLineIsCategoryName) {
            // This line *should* be the category name
            // Unless it looks like a product or junk
            if (!PRODUCT_PATTERN.test(line) && line.length > 5) {
                const catName = normalizeName(line);
                const catSlug = slugify(catName);

                currentCategoryId = catSlug;

                if (!categoriesMap.has(catSlug)) {
                    categoriesMap.set(catSlug, {
                        id: catSlug,
                        slug: catSlug,
                        name_tr: isTurkish ? catName : '',
                        name_en: !isTurkish ? catName : '',
                        // Placeholders
                        name_fr: catName,
                        name_ar: catName
                    });
                } else {
                    // Update existing category with translation
                    const cat = categoriesMap.get(catSlug);
                    if (isTurkish) cat.name_tr = catName;
                    else cat.name_en = catName;
                }
            }
            nextLineIsCategoryName = false;
            // Don't continue, simpler logic: treat it as category change line, done.
            continue;
        }

        // Product Detection
        if (isTurkish) {
            if (PRODUCT_PATTERN.test(line)) {
                currentProduct = normalizeName(line);
                if (!productsMap.has(currentProduct)) {
                    productsMap.set(currentProduct, {
                        name: currentProduct,
                        category_id: currentCategoryId, // Link to current category
                        desc_tr: '',
                        desc_en: '',
                        slug: slugify(currentProduct)
                    });
                } else {
                    // If seen before (maybe in index?), update category
                    productsMap.get(currentProduct).category_id = currentCategoryId;
                }
                continue;
            }
        }
        else {
            // English - fuzzy match or new
            // For now, simple fuzzy logic from before
            // If we match a product, ensure we don't overwrite the category if it was "General" before but now specific?
            // Actually, trust TR catalog structure more.
            if (PRODUCT_PATTERN.test(line)) {
                const name = normalizeName(line);
                // Try to match existing
                const existing = productsMap.get(name);
                if (existing) {
                    currentProduct = name;
                    // Only update category if we desire
                } else {
                    // New product found in English catalog?
                    // Maybe Add? 
                    // For safety, let's skip adding NEW products from EN catalog to avoid dups if names differ slightly
                    // Just try to find match
                }

                // If we didn't match exactly, try fuzzy
                // (Omitted for brevity, assuming names match mostly)
            }
        }

        // Description Accumulation
        if (currentProduct && productsMap.has(currentProduct)) {
            // Stop conditions
            if (CATEGORY_PATTERN_TR.test(line)) {
                currentProduct = null;
                nextLineIsCategoryName = true; // Handle case where "Part 2" appears immediately
                continue;
            }

            const product = productsMap.get(currentProduct);
            if (isTurkish) product.desc_tr += (product.desc_tr ? ' ' : '') + line;
            else product.desc_en += (product.desc_en ? ' ' : '') + line;
        }
    }
}

async function main() {
    console.log('Parsing TR...');
    await parsePdf(TR_CATALOG_PATH, true);

    //console.log('Parsing EN...'); // Skip EN structure parsing for now to rely on TR categories?
    // User said "katalogta gruplara ayrılmıstı". TR catalog is likely the reference.
    // But we need EN descriptions.
    await parsePdf(EN_CATALOG_PATH, false);

    // Finalize Categories
    const categories = Array.from(categoriesMap.values()).map(c => {
        // Fallback names
        if (!c.name_en) c.name_en = c.name_tr;
        if (!c.name_tr) c.name_tr = c.name_en;
        c.name_fr = `[FR] ${c.name_en}`;
        c.name_ar = `[AR] ${c.name_en}`;
        // Image
        c.image_url = 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop';
        return c;
    });

    // Finalize Products
    let products = Array.from(productsMap.values()).filter(p => p.desc_tr || p.desc_en);
    products = products.map(p => {
        if (!p.desc_en) p.desc_en = p.desc_tr;
        if (!p.desc_tr) p.desc_tr = p.desc_en;
        p.desc_fr = `[FR] ${p.desc_en}`;
        p.desc_ar = `[AR] ${p.desc_en}`;
        return p;
    });

    const output = {
        categories,
        products
    };

    console.log(`Found ${categories.length} categories and ${products.length} products.`);
    fs.writeFileSync('scripts/import/parsed_full.json', JSON.stringify(output, null, 2));
}

main().catch(console.error);
