-- Insert Sample Categories
INSERT INTO public.categories (slug, name_tr, name_en, name_fr, name_ar, image_url)
VALUES
('endustriyel-kimyasallar', 'Endüstriyel Kimyasallar', 'Industrial Chemicals', 'Produits Chimiques Industriels', 'المواد الكيميائية الصناعية', 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800'),
('su-aritma', 'Su Arıtma Kimyasalları', 'Water Treatment Chemicals', 'Produits de Traitement de l Eau', 'مواد معالجة المياه', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800');

-- Insert Sample Products
-- Note: We need to get the Category IDs dynamically or assume they are the first ones inserted.
-- For simplicity in SQL Editor, we can use a subquery to find the category ID.

INSERT INTO public.products (
  category_id,
  slug,
  title_tr, title_en, title_fr, title_ar,
  description_tr, description_en, description_fr, description_ar,
  cas_number, einecs_number, chemical_formula, purity,
  image_url, is_featured
)
VALUES
(
  (SELECT id FROM public.categories WHERE slug = 'endustriyel-kimyasallar' LIMIT 1),
  'sodyum-hipoklorit',
  'Sodyum Hipoklorit', 'Sodium Hypochlorite', 'Hypochlorite de Sodium', 'هيبوكلوريت الصوديوم',
  'Güçlü bir dezenfektan ve ağartıcı. Su arıtma ve tekstil sektöründe yaygın kullanılır.',
  'A strong disinfectant and bleaching agent. Widely used in water treatment and textile industries.',
  'Un désinfectant et agent de blanchiment puissant.',
  'مطهر قوي ومبيض.',
  '7681-52-9', '231-668-3', 'NaClO', '%15 - %16',
  'https://images.unsplash.com/photo-1624835656248-262483565624?auto=format&fit=crop&q=80&w=800',
  true
),
(
  (SELECT id FROM public.categories WHERE slug = 'su-aritma' LIMIT 1),
  'polialuminyum-klorur',
  'Polialüminyum Klorür (PAC)', 'Polyaluminium Chloride (PAC)', 'Chlorure de Polyaluminium', 'كلوريد البولي ألومنيوم',
  'İçme suyu ve atık su arıtımında kullanılan etkili bir koagülant.',
  'An effective coagulant used in drinking water and waste water treatment.',
  'Un coagulant efficace utilisé dans le traitement de l eau potable.',
  'تخثر فعال يستخدم في معالجة مياه الشرب.',
  '1327-41-9', '215-477-2', 'Aln(OH)mCl3n-m', '%17',
  'https://images.unsplash.com/photo-1624908993245-0d2557j71234?auto=format&fit=crop&q=80&w=800', -- Placeholder URL
  true
);
