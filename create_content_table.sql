CREATE TABLE public.page_contents (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    page_key text NOT NULL, -- e.g. 'about_us_mission', 'home_hero_title'
    section text NOT NULL, -- e.g. 'About', 'Home'
    content_tr text,
    content_en text,
    content_fr text,
    content_ar text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE (page_key)
);

ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.page_contents
FOR SELECT USING (true);

CREATE POLICY "Allow admin full access" ON public.page_contents
FOR ALL USING (auth.role() = 'authenticated'); -- Logic simplified for now, assumes only admins are authenticated users

-- Insert Initial Data (Migration from JSON logic to DB)
INSERT INTO public.page_contents (page_key, section, content_tr, content_en, content_fr, content_ar) VALUES
('about_mission', 'About', 'Misyonumuz, kimya sektöründe yenilikçi çözümler üretmektir.', 'Our mission is to provide innovative solutions in the chemical industry.', 'Notre mission est de fournir des solutions innovantes.', 'مهمتنا هي توفير حلول مبتكرة في الصناعة الكيميائية.'),
('about_vision', 'About', 'Vizyonumuz, global pazarda lider bir oyuncu olmaktır.', 'Our vision is to become a leading player in the global market.', 'Notre vision est de devenir un acteur majeur.', 'رؤيتنا هي أن نصبح لاعباً رائداً في السوق العالمية.'),
('home_hero_title', 'Home', 'Endüstriyel Kimyasallarda Güvenilir Çözüm Ortağınız', 'Your Reliable Solution Partner in Industrial Chemicals', 'Votre partenaire de solutions fiable', 'شريك الحل الموثوق به في المواد الكيميائية الصناعية'),
('home_hero_subtitle', 'Home', 'Grohn Kimya olarak, en yüksek kalitede kimyasal hammaddeleri tedarik ediyoruz.', 'As Grohn Kimya, we supply the highest quality chemical raw materials.', 'En tant que Grohn Kimya, nous fournissons des matières premières.', 'بصفتنا Grohn Kimya ، نقوم بتوريد مواد خام كيميائية عالية الجودة.');
