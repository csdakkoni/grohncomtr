// ═══════════════════════════════════════════════════
// GROHN KİMYA — Hierarchical Sectoral Product Catalog
// Category → Subgroup → Product
// ═══════════════════════════════════════════════════

export interface Category {
    id: string;
    slug: string;
    domain: 'industrial' | 'textile';
    name_tr: string;
    name_en: string;
    name_fr: string;
    name_ar: string;
    image_url: string;
}

export interface Subgroup {
    id: string;
    category_id: string;
    slug: string;
    name_tr: string;
    name_en: string;
    name_fr: string;
    name_ar: string;
    prefix: string; // e.g. "GRO", "Growat", "Growet"
}

export interface Product {
    id: string;
    category_id: string;
    subgroup_id: string;
    slug: string;
    name: string;
    cas_number?: string;
    ionic_type?: string | null;
    title_tr: string;
    title_en: string;
    title_fr: string;
    title_ar: string;
    description_tr: string;
    description_en: string;
    description_fr: string;
    description_ar: string;
    image_url: string;
    is_featured: boolean;
}

// ═══════════════════════════════════════════════════
// CATEGORIES (Sektörel Ana Kategoriler)
// ═══════════════════════════════════════════════════

export const MOCK_CATEGORIES: Category[] = [
    // INDUSTRIAL SECTORS
    {
        id: "deterjan", slug: "deterjan-ve-temizlik-kimyasallari", domain: "industrial",
        name_tr: "Deterjan & Temizlik Kimyasalları", name_en: "Detergent & Cleaning Raw Materials",
        name_fr: "Produits Chimiques pour Détergents", name_ar: "مواد خام المنظفات والتنظيف",
        image_url: "/images/washing.png"
    },
    {
        id: "kagit", slug: "kagit-ve-seluloz-kimyasallari", domain: "industrial",
        name_tr: "Kağıt & Selüloz Kimyasalları", name_en: "Pulp & Paper Processing Chemicals",
        name_fr: "Produits Chimiques pour Papier", name_ar: "كيماويات الورق والسيليلوز",
        image_url: "/images/finishing.png"
    },
    {
        id: "aritma", slug: "su-ve-atisu-aritma-kimyasallari", domain: "industrial",
        name_tr: "Su & Atıksu Arıtma Kimyasalları", name_en: "Water & Wastewater Treatment Chemicals",
        name_fr: "Produits de Traitement de l'Eau", name_ar: "كيماويات معالجة المياه والصرف",
        image_url: "/images/water-treatment.png"
    },
    {
        id: "tarim-gida", slug: "tarim-gida-ve-yem-kimyasallari", domain: "industrial",
        name_tr: "Tarım, Gıda & Yem Kimyasalları", name_en: "Agro, Food & Feed Raw Materials",
        name_fr: "Produits Chimiques Agro & Alimentaires", name_ar: "المواد الخام الزراعية والغذائية",
        image_url: "/images/enzymes.png"
    },
    {
        id: "boya-solvent", slug: "boya-kaplama-ve-solventler", domain: "industrial",
        name_tr: "Boya, Kaplama & Solventler", name_en: "Paints, Coatings & Solvents",
        name_fr: "Peintures, Revêtements & Solvants", name_ar: "المذيبات والدهانات والطلاء",
        image_url: "/images/dyeing.png"
    },
    {
        id: "metal-yuzey", slug: "metal-ve-yuzey-islem-kimyasallari", domain: "industrial",
        name_tr: "Metal & Yüzey İşlem Kimyasalları", name_en: "Metal & Surface Treatment Chemicals",
        name_fr: "Traitement des Métaux et Surfaces", name_ar: "كيماويات معالجة المعالجة والسطوح",
        image_url: "/images/pretreatment.png"
    },

    // TEXTILE SECTOR
    {
        id: "tekstil", slug: "tekstil-kimyasallari", domain: "textile",
        name_tr: "Tekstil Kimyasalları & Yardımcıları", name_en: "Textile Auxiliaries & Finishing",
        name_fr: "Auxiliaires Textiles & Finition", name_ar: "مساعدات النسيج والتشطيب",
        image_url: "/images/softeners.png"
    }
];

// ═══════════════════════════════════════════════════
// SUBGROUPS (Sektörel Alt Gruplar)
// ═══════════════════════════════════════════════════

export const MOCK_SUBGROUPS: Subgroup[] = [
    // — Deterjan & Temizlik —
    {
        id: "anyonik-surfaktanlar", category_id: "deterjan", slug: "anyonik-surfaktanlar", prefix: "GRO",
        name_tr: "Anyonik Sürfaktanlar (LABSA, SLES)", name_en: "Anionic Surfactants (LABSA, SLES)", name_fr: "Tensioactifs Anioniques", name_ar: "المنشطات السطحية الأنيونية"
    },
    {
        id: "dolgu-ve-sertlik-onleyiciler", category_id: "deterjan", slug: "dolgu-ve-sertlik-onleyiciler", prefix: "GRO",
        name_tr: "Dolgu Maddeleri & Su Sertlik Önleyiciler", name_en: "Fillers & Water Softeners (Soda, STPP)", name_fr: "Agents de Charge et Adoucissants", name_ar: "مواد الحشو ومنعمات المياه"
    },
    {
        id: "nonyonik-ve-yardimcilar", category_id: "deterjan", slug: "nonyonik-ve-yardimcilar", prefix: "GRO",
        name_tr: "Nonyonik Sürfaktanlar & Köpük Düzenleyiciler", name_en: "Nonionic Surfactants & Foam Regulators", name_fr: "Tensioactifs Non-Ioniques", name_ar: "المنشطات السطحية غير الأنيونية"
    },

    // — Kağıt & Selüloz —
    {
        id: "mukavemet-ve-baglayicilar", category_id: "kagit", slug: "mukavemet-ve-baglayicilar", prefix: "GRO",
        name_tr: "Mukavemet Ajanları & Nişasta Derivatları", name_en: "Strength Agents & Starch Derivatives", name_fr: "Agents de Résistance et Amidon", name_ar: "عوامل القوة ومشتشقات النشاط"
    },
    {
        id: "surec-yardimcilari", category_id: "kagit", slug: "surec-yardimcilari", prefix: "GRO",
        name_tr: "Kağıt Süreç Yardımcıları & Alüm", name_en: "Paper Process Auxiliaries & Alum", name_fr: "Auxiliaires de Procédé Papier", name_ar: "مساعدات عمليات الورق"
    },

    // — Su & Atıksu Arıtma —
    {
        id: "koagulan-ve-flokkulanlar", category_id: "aritma", slug: "koagulan-ve-flokkulanlar", prefix: "Growat",
        name_tr: "Koagülanlar & Polimer Flokülanlar (PAC)", name_en: "Coagulants & Flocculants (PAC, Polymers)", name_fr: "Coagulants et Floculants", name_ar: "المخثرات والملمعات"
    },
    {
        id: "renk-ve-kirec-giderme", category_id: "aritma", slug: "renk-ve-kirec-giderme", prefix: "Growat",
        name_tr: "Renk Gidericiler & RO Antiscalantlar", name_en: "Color Removers & RO Antiscalants", name_fr: "Décolorants & Anti-Tartre RO", name_ar: "مزيلات اللون وموانع الترسيب"
    },

    // — Tarım, Gıda & Yem —
    {
        id: "gida-asitligi-ve-koruyucular", category_id: "tarim-gida", slug: "gida-asitligi-ve-koruyucular", prefix: "GRO",
        name_tr: "Asitlik Düzenleyiciler & Koruyucular (Sitrik Asit)", name_en: "Acidulants & Preservatives (Citric Acid)", name_fr: "Acidifiants et Conservateurs", name_ar: "منظمات حموضة الأغذية والمواد الحافظة"
    },
    {
        id: "gubre-ve-yem-kimyasallari", category_id: "tarim-gida", slug: "gubre-ve-yem-kimyasallari", prefix: "GRO",
        name_tr: "Gübre & Yem Hammaddeleri (Üre, Fosforik Asit)", name_en: "Fertilizer & Feed Raw Materials (Urea, Phosphoric Acid)", name_fr: "Matières Premières pour Engrais", name_ar: "المواد الخام للأسمدة والأعلاف"
    },

    // — Boya, Kaplama & Solventler —
    {
        id: "organik-solventler", category_id: "boya-solvent", slug: "organik-solventler", prefix: "GRO",
        name_tr: "Organik Çözücüler (Aseton, Toluon, Ksilen)", name_en: "Organic Solvents (Acetone, Toluene, Xylene)", name_fr: "Solvants Organiques", name_ar: "المذيبات العضوية"
    },
    {
        id: "alkoller-ve-glikoller", category_id: "boya-solvent", slug: "alkoller-ve-glikoller", prefix: "GRO",
        name_tr: "Alkoller & Glikoller (IPA, MEG, DEG)", name_en: "Alcohols & Glycols (IPA, MEG, DEG)", name_fr: "Alcools et Glycols", name_ar: "الكحول والجليكول"
    },

    // — Metal & Yüzey İşlem —
    {
        id: "endustriyel-asitler", category_id: "metal-yuzey", slug: "endustriyel-asitler", prefix: "GRO",
        name_tr: "Endüstriyel Mineral Asitler (HCL, H2SO4, HNO3)", name_en: "Industrial Mineral Acids (HCl, H2SO4, HNO3)", name_fr: "Acides Minéraux Industriels", name_ar: "الأحماض المعدنية الصناعية"
    },
    {
        id: "yag-ve-pas-sokuculer", category_id: "metal-yuzey", slug: "yag-ve-pas-sokuculer", prefix: "GRO",
        name_tr: "Yağ Sökücüler & Yüzey Hazırlama", name_en: "Degreasers & Surface Cleaners", name_fr: "Dégraissants & Nettoyants de Surface", name_ar: "مزيلات الدهون وتنظيف السطوح"
    },

    // — Tekstil —
    {
        id: "on-islem-ve-boyama", category_id: "tekstil", slug: "on-islem-ve-boyama", prefix: "Growet",
        name_tr: "Ön İşlem & Boyama Yardımcıları", name_en: "Pre-Treatment & Dyeing Auxiliaries", name_fr: "Prétraitement & Teinture", name_ar: "المعالجة المسبقة والصباغة"
    },
    {
        id: "yumusatici-ve-apre", category_id: "tekstil", slug: "yumusatici-ve-apre", prefix: "Grosoft",
        name_tr: "Yumuşatıcılar & Apre Kimyasalları", name_en: "Softeners & Finishing Agents", name_fr: "Adoucissants & Finitions", name_ar: "المنعمات ومواد التشطيب"
    }
];

// ═══════════════════════════════════════════════════
// PRODUCTS (Sektörel Ürün Portföyü)
// ═══════════════════════════════════════════════════

export const MOCK_PRODUCTS: Product[] = [
    // --- DETERJAN & TEMİZLİK ---
    {
        id: "det-1", category_id: "deterjan", subgroup_id: "anyonik-surfaktanlar", slug: "labsa-linear-alkil-benzen-sulfonik-asit",
        name: "LABSA 96% (Linear Alkylbenzene Sulfonic Acid)", cas_number: "27176-87-0", ionic_type: "anionic",
        title_tr: "LABSA %96 (Lineer Alkil Benzen Sülfonik Asit)", title_en: "LABSA 96% (Linear Alkylbenzene Sulfonic Acid)",
        title_fr: "LABSA 96% (Acide Alkylbenzène Sulfonique)", title_ar: "حمض ألبا 96% (حمض سلفونيك بنزين ألكيل خطي)",
        description_tr: "Toz ve sıvı deterjanlar, bulaşık deterjanları ve endüstriyel temizleyicilerin ana köpük ve ana aktif maddesi.",
        description_en: "Primary active foaming and cleaning agent used in powder/liquid detergents and industrial cleaning formulations.",
        description_fr: "Matière active principale utilisée dans la fabrication de détergents en poudre et liquides.",
        description_ar: "المادة الفعالة الرئيسية الرغوية والمنظفة في مساحيق ومنظفات الغسيل والمنظفات الصناعية.",
        image_url: "/images/washing.png", is_featured: true
    },
    {
        id: "det-2", category_id: "deterjan", subgroup_id: "anyonik-surfaktanlar", slug: "sles-sodyum-lauril-eter-sulfat-70",
        name: "SLES 70% (Sodium Lauryl Ether Sulfate)", cas_number: "68891-38-3", ionic_type: "anionic",
        title_tr: "SLES %70 (Sodyum Lauril Eter Sülfat)", title_en: "SLES 70% (Sodium Lauryl Ether Sulfate)",
        title_fr: "SLES 70% (Lauryl Éther Sulfate de Sodium)", title_ar: "SLES 70% (كبريتات إيثر لوريل الصوديوم)",
        description_tr: "Şampuan, duş jeli, bulaşık deterjanı ve evsel temizlik ürünlerinde yüksek köpürme ve temizleme sağlayan sürfaktan.",
        description_en: "High-foaming primary surfactant widely used in shampoos, body washes, dishwashing liquids, and household cleaners.",
        description_fr: "Tensioactif primaire à fort pouvoir moussant utilisé dans les shampooings et détergents vaisselle.",
        description_ar: "مادة خافضة للتوتر السطحي عالي الرغوة تستخدم في الشامبو وسوائل غسيل الأواني.",
        image_url: "/images/washing.png", is_featured: true
    },
    {
        id: "det-3", category_id: "deterjan", subgroup_id: "dolgu-ve-sertlik-onleyiciler", slug: "stpp-sodyum-tripolifosfat",
        name: "STPP (Sodium Tripolyphosphate Tech Grade)", cas_number: "7758-29-4", ionic_type: undefined,
        title_tr: "STPP (Sodyum Tripolifosfat Teknik)", title_en: "STPP (Sodium Tripolyphosphate Tech Grade)",
        title_fr: "STPP (Tripolyphosphate de Sodium)", title_ar: "ثلاثي بوليفوسفات الصوديوم (STPP)",
        description_tr: "Deterjan formülasyonlarında su sertliğini bağlayan, kirin tekrar çökmesini önleyen builders (yapılandırıcı) hammadde.",
        description_en: "Essential detergent builder salt that sequesters hard water ions and prevents soil anti-redeposition.",
        description_fr: "Sel builder essentiel qui séquestre les ions de l'eau dure dans les détergents.",
        description_ar: "ملح بناء منظف أساسي ينقي أيونات الماء الصلب ويمنع إعاجة ترسيب الأوساخ.",
        image_url: "/images/washing.png", is_featured: false
    },
    {
        id: "det-4", category_id: "deterjan", subgroup_id: "dolgu-ve-sertlik-onleyiciler", slug: "soda-kulu-hafif-sodyum-karbonat",
        name: "Soda Ash Light (Sodium Carbonate)", cas_number: "497-19-8", ionic_type: undefined,
        title_tr: "Soda Külü Hafif (Sodyum Karbonat)", title_en: "Soda Ash Light (Sodium Carbonate)",
        title_fr: "Cendre de Soude Légère", title_ar: "رماد الصودا الخفيف (كربونات الصوديوم)",
        description_tr: "Deterjan tozu üretiminde alkali sağlayıcı, su yumuşatıcı ve pH aralığı düzenleyici temel mineral tuz.",
        description_en: "Core mineral salt acting as an alkalinity builder, water softener, and pH regulator in detergent manufacturing.",
        description_fr: "Sel minéral de base agissant comme régulateur d'alcalinité et adoucissant d'eau dans les détergents.",
        description_ar: "ملح معدني أساسي يعمل كبناء قلوي ومنعم للمياه ومنظم للرقم الهيدروجيني.",
        image_url: "/images/softeners.png", is_featured: true
    },

    // --- KAĞIT & SELÜLOZ ---
    {
        id: "pap-1", category_id: "kagit", subgroup_id: "mukavemet-ve-baglayicilar", slug: "katyonik-nisasta-kagit-grade",
        name: "Cationic Starch (Paper Grade)", cas_number: "9063-38-1", ionic_type: "cationic",
        title_tr: "Katyonik Nişasta (Kağıt Mukavemet Grade)", title_en: "Cationic Starch (Paper Strength Grade)",
        title_fr: "Amidon Cationique (Grade Papier)", title_ar: "النشا الكاتيوني (درجة قوة الورق)",
        description_tr: "Kağıt hamuru üretiminde Kuru Mukavemet artırıcı, dolgu maddesi tutucu ve yüzey kalitesi geliştirici nişasta derivatı.",
        description_en: "Cationic starch derivative boosting dry strength, filler retention, and surface printability in paper mills.",
        description_fr: "Dérivé d'amidon cationique améliorant la résistance à sec et la rétention de charge dans la pâte à papier.",
        description_ar: "مشتق النشا الكاتيوني الذي يعزز القوة الجافة واحتفاظ المواد الحاشية في مصانع الورق.",
        image_url: "/images/finishing.png", is_featured: true
    },
    {
        id: "pap-2", category_id: "kagit", subgroup_id: "surec-yardimcilari", slug: "aluminyum-sulfat-ulum-kagit",
        name: "Aluminium Sulfate 17% (Paper Alum)", cas_number: "10043-01-3", ionic_type: undefined,
        title_tr: "Alüminyum Sülfat %17 (Kağıtçı Alümü)", title_en: "Aluminium Sulfate 17% (Paper Maker's Alum)",
        title_fr: "Sulfate d'Aluminium 17% (Alun)", title_ar: "كبريتات الألومنيوم 17% (الشبة)",
        description_tr: "Kağıt üretiminde reçine tutkallaması (sizing), pH kontrolü ve дренаж (su süzme) kolaylaştırıcı inorganik tuz.",
        description_en: "Essential inorganic coagulant used for rosin sizing, pH control, and drainage improvement in paper machines.",
        description_fr: "Coagulant inorganique essentiel utilisé pour le collage à la colophane et le contrôle du pH.",
        description_ar: "مخثر غير عضوي أساسي يستخدم للتحجيم بالراتنج والتحكم في الرقم الهيدروجيني في صناعة الورق.",
        image_url: "/images/finishing.png", is_featured: false
    },

    // --- SU & ATIKSU ARITMA ---
    {
        id: "wat-1", category_id: "aritma", subgroup_id: "koagulan-ve-flokkulanlar", slug: "poli-aluminyum-klorur-pac-30",
        name: "Polyaluminium Chloride (PAC 30%)", cas_number: "1327-41-9", ionic_type: "cationic",
        title_tr: "Polialüminyum Klorür (PAC %30 İçme & Atıksu)", title_en: "Polyaluminium Chloride (PAC 30% Powder)",
        title_fr: "Chlorure de Polyaluminium (PAC 30%)", title_ar: "كلوريد البولي ألومنيوم (PAC 30%)",
        description_tr: "İçme suyu ve endüstriyel atıksu arıtımında yüksek hızlı çökeltme ve berraklaştırma sağlayan inorganik koagülan.",
        description_en: "High-efficiency inorganic coagulant providing rapid flocs formation and clarification in drinking and industrial wastewater.",
        description_fr: "Coagulant inorganique haute performance assurant une floculation rapide et la clarification de l'eau.",
        description_ar: "مخثر غير عضوي عالي الكفاءة يضمن التكتل السريع وتصفية المياه في مياه الشرب والصرف.",
        image_url: "/images/water-treatment.png", is_featured: true
    },
    {
        id: "wat-2", category_id: "aritma", subgroup_id: "koagulan-ve-flokkulanlar", slug: "anyonik-polielektrolit-flokkulan",
        name: "Anionic Polyelectrolyte Flocculant", cas_number: "9003-05-8", ionic_type: "anionic",
        title_tr: "Anyonik Polielektrolit (Toz Flokülan)", title_en: "Anionic Polyelectrolyte (Powder Flocculant)",
        title_fr: "Polyélectrolyte Anionique en Poudre", title_ar: "بوليمر أنيوني (ملمع كيميائي)",
        description_tr: "Maden, tekstil ve mermer atıksularında çamur susuzlaştırma ve hızlı katı-sıvı ayrıştırması sağlayan yüksek moleküler ağırlıklı polimer.",
        description_en: "High molecular weight acrylamide polymer for sludge dewatering and rapid solid-liquid separation in mining and industrial effluents.",
        description_fr: "Polymère de haut poids moléculaire pour la déshydratation des boues et la séparation solide-liquide.",
        description_ar: "بوليمر عالي الوزن الجزيئي لتجفيف الحمأة والفصل السريع بين الصلب والسائل في الفضلات الصناعية.",
        image_url: "/images/water-treatment.png", is_featured: true
    },
    {
        id: "wat-3", category_id: "aritma", subgroup_id: "renk-ve-kirec-giderme", slug: "growat-asc-100-antiscalant",
        name: "Growat ASC-100 (RO Membrane Antiscalant)", cas_number: "37971-36-1", ionic_type: "anionic",
        title_tr: "Growat ASC-100 (Ters Osmoz Antiscalant)", title_en: "Growat ASC-100 (Reverse Osmosis Antiscalant)",
        title_fr: "Growat ASC-100 (Anti-Tartre RO)", title_ar: "Growat ASC-100 (مانع ترسيب الأغشية)",
        description_tr: "Ters osmoz (RO) membranlarında kalsiyum sülfat, karbonat ve silis kireçlenmesini %100 önleyen sıvı antiscalant.",
        description_en: "Liquid antiscalant formulation preventing calcium carbonate, sulfate, and silica scaling on Reverse Osmosis (RO) membranes.",
        description_fr: "Formulation anti-tartre liquide empêchant l'entartrage par le carbonate de calcium sur les membranes d'osmose inverse.",
        description_ar: "تركيبة مائعة مانعة للترسيب تمنع تكتل كربونات الكالسيوم والسليكا على أغشية التناضح العكسي.",
        image_url: "/images/water-treatment.png", is_featured: false
    },

    // --- TARIM, GIDA & YEM ---
    {
        id: "agr-1", category_id: "tarim-gida", subgroup_id: "gida-asitligi-ve-koruyucular", slug: "sitrik-asit-anhidrus-gida-grade",
        name: "Citric Acid Anhydrous (Food Grade)", cas_number: "77-92-9", ionic_type: undefined,
        title_tr: "Sitrik Asit Anhidrus (Gıda & İçecek Grade)", title_en: "Citric Acid Anhydrous (Food & Beverage Grade)",
        title_fr: "Acide Citrique Anhydre (Grade Alimentaire)", title_ar: "حمض الستريك اللامائي (درجة غذائية)",
        description_tr: "Gıda, içecek, reçel ve temizlik ürünlerinde organik asitlik düzenleyici, lezzet artırıcı ve şelat maddesi.",
        description_en: "Organic acidulant, flavor enhancer, and natural chelating agent widely used in food, beverage, and cleaning industries.",
        description_fr: "Acidifiant biologique et réhausseur de goût largement utilisé dans l'industrie agroalimentaire.",
        description_ar: "محمض عضوي ومعزز للنكهة وعامل تخلب طبيعي يستخدم على نطاق واسع في الأغذية والمشروبات.",
        image_url: "/images/enzymes.png", is_featured: true
    },
    {
        id: "agr-2", category_id: "tarim-gida", subgroup_id: "gubre-ve-yem-kimyasallari", slug: "ure-46-n-teknik-ve-tarimsal",
        name: "Urea 46% N (Technical & Agri Grade)", cas_number: "57-13-6", ionic_type: undefined,
        title_tr: "Üre %46 Azot (Teknik & Tarımsal Grade)", title_en: "Urea 46% Nitrogen (Tech & Agricultural Grade)",
        title_fr: "Urée 46% Azote (Grade Technique & Agricole)", title_ar: "اليوريا 46% نيتروجين (درجة تقنية وزراعية)",
        description_tr: "Sıvı gübreler, AdBlue/DEF üretimi ve tekstil baskı patlarında çözündürücü olarak kullanılan yüksek azotlu prill bileşik.",
        description_en: "High-nitrogen organic compound used in solid/liquid fertilizers, AdBlue/DEF manufacturing, and textile printing pastes.",
        description_fr: "Composé organique hautement azoté utilisé dans les engrais et la production d'AdBlue.",
        description_ar: "مركب عضوي عالي النيتروجين يستخدم في الأسمدة الصلبة والسائلة وإنتاج AdBlue.",
        image_url: "/images/enzymes.png", is_featured: true
    },

    // --- BOYA, KAPLAMA & SOLVENTLER ---
    {
        id: "sol-1", category_id: "boya-solvent", subgroup_id: "organik-solventler", slug: "aseton-saf-teknik-solvent",
        name: "Acetone Pure Solvent Grade", cas_number: "67-64-1", ionic_type: undefined,
        title_tr: "Aseton (Saf Teknik Solvent)", title_en: "Acetone (Pure Technical Solvent Grade)",
        title_fr: "Acétone (Solvant Technique Pur)", title_ar: "الأسيتون (مذيب نقي درجة تقنية)",
        description_tr: "Boya, lak, reçine, epoksi ve inceltici üretiminde kullanılan uçucu ve güçlü organik solvent.",
        description_en: "Highly volatile and powerful organic solvent used in paints, lacquers, resins, epoxies, and thinners.",
        description_fr: "Solvant organique puissant et très volatil utilisé dans les peintures, laques et résines époxy.",
        description_ar: "مذيب عضوي شديد التطاير والقوة يستخدم في الدهانات والورنيش والراتنجات والراتنجات الإيبوكسية.",
        image_url: "/images/dyeing.png", is_featured: true
    },
    {
        id: "sol-2", category_id: "boya-solvent", subgroup_id: "alkoller-ve-glikoller", slug: "izopropil-alkol-ipa-99",
        name: "Isopropanol (IPA 99.9%)", cas_number: "67-63-0", ionic_type: undefined,
        title_tr: "İzopropil Alkol (IPA %99.9 Susuz)", title_en: "Isopropanol (IPA 99.9% Anhydrous)",
        title_fr: "Alcool Isopropylique (IPA 99.9%)", title_ar: "كحول الأيزوبروبيل (IPA 99.9% لا مائي)",
        description_tr: "Boya, mürekkep, dezenfektan, kozmetik ve yüzey temizleyicilerde kullanılan yüksek saflıkta susuz alkol.",
        description_en: "High-purity anhydrous alcohol widely used as a solvent in inks, paints, disinfectants, and electronics cleaners.",
        description_fr: "Alcool anhydre de haute pureté utilisé comme solvant dans les encres, peintures et désinfectants.",
        description_ar: "كحول لا مائي عالي النقاء يستخدم كمذيب في الأحبار والدهانات والمطهرات ومُنظفات الإلكترونيات.",
        image_url: "/images/dyeing.png", is_featured: true
    },
    {
        id: "sol-3", category_id: "boya-solvent", subgroup_id: "organik-solventler", slug: "ksilen-karisik-izomerler",
        name: "Xylene (Mixed Isomers Tech)", cas_number: "1330-20-7", ionic_type: undefined,
        title_tr: "Ksilen (Karma İzomerler Solvent)", title_en: "Xylene (Mixed Isomers Solvent)",
        title_fr: "Xylène (Mélange d'Isomères)", title_ar: "الزيلين (مزيج الأيزومرات)",
        description_tr: "Sanayi boyaları, otomotiv astarları, deri cilaları ve reçine çözeltilerinde kullanılan aromatik solvent.",
        description_en: "Aromatic hydrocarbon solvent utilized in industrial paints, automotive primers, leather coatings, and resins.",
        description_fr: "Solvant d'hydrocarbure aromatique utilisé dans les peintures industrielles et apprêts automobiles.",
        description_ar: "مذيب هيدروكربوني عطري يستخدم في الدهانات الصناعية والمواد الأولية للسيارات وراتنجات الطلاء.",
        image_url: "/images/dyeing.png", is_featured: false
    },

    // --- METAL & YÜZEY İŞLEM ---
    {
        id: "met-1", category_id: "metal-yuzey", subgroup_id: "endustriyel-asitler", slug: "sulfurik-asit-98-teknik",
        name: "Sulfuric Acid 98% (Technical Grade)", cas_number: "7664-93-9", ionic_type: undefined,
        title_tr: "Sülfürik Asit %98 (Teknik Mineral Asit)", title_en: "Sulfuric Acid 98% (Technical Grade H2SO4)",
        title_fr: "Acide Sulfurique 98% (Grade Technique)", title_ar: "حمض الكبريتيك 98% (درجة تقنية)",
        description_tr: "Metal dekapajı, anotleme, akü sanayii ve ağır kimya süreçlerinde kullanılan konsantre güçlü mineral asit.",
        description_en: "Concentrated strong mineral acid used in metal pickling, anodizing, battery manufacturing, and heavy chemical processing.",
        description_fr: "Acide minéral fort concentré utilisé dans le décapage des métaux, l'anodisation et les batteries.",
        description_ar: "حمض معدني قوي مركز يستخدم في تنظيف المعادن والتنقيط وتصنيع البطاريات والعمليات الكيميائية الثقيلة.",
        image_url: "/images/pretreatment.png", is_featured: true
    },
    {
        id: "met-2", category_id: "metal-yuzey", subgroup_id: "endustriyel-asitler", slug: "hidroklorik-asit-33-hcl",
        name: "Hydrochloric Acid 33% (HCl Pickling)", cas_number: "7647-01-0", ionic_type: undefined,
        title_tr: "Hidroklorik Asit %33 (Tuz Ruhu / Dekapaj Asidi)", title_en: "Hydrochloric Acid 33% (Metal Pickling Acid)",
        title_fr: "Acide Chlorhydrique 33% (Décapage)", title_ar: "حمض الهيدروكلوريك 33% (حمض تنظيف المعادن)",
        description_tr: "Demir-çelik pas ve tufal temizliği (dekapaj), pH düşürme ve rejenere süreçlerinde kullanılan mineral asit.",
        description_en: "Primary mineral acid used for steel rust/scale pickling, pH adjustment, and ion exchange regeneration.",
        description_fr: "Acide minéral primaire utilisé pour le décapage de la rouille de l'acier et l'ajustement du pH.",
        description_ar: "حمض معدني رئيسي يستخدم لتنظيف صدأ الفولاذ وتعديل الرقم الهيدروجيني واستعادة التبادل الأيوني.",
        image_url: "/images/pretreatment.png", is_featured: true
    },
    {
        id: "met-3", category_id: "metal-yuzey", subgroup_id: "endustriyel-asitler", slug: "kostik-soda-sıvı-50-naoh",
        name: "Caustic Soda Liquid 50% (NaOH)", cas_number: "1310-73-2", ionic_type: undefined,
        title_tr: "Kostik Soda Sıvı %50 (Sodyum Hidroksit Çözeltisi)", title_en: "Caustic Soda Liquid 50% (NaOH Solution)",
        title_fr: "Soude Caustique Liquide 50%", title_ar: "الصودا الكاوية السائلة 50% (محلول هيدروكسيد الصوديوم)",
        description_tr: "Metal yağ alma banyoları, pH yükseltme, nötralizasyon ve CIP temizlikte kullanılan sıvı güçlü alkali.",
        description_en: "Strong liquid alkaline solution used for metal degreasing baths, pH elevation, neutralization, and CIP cleaning.",
        description_fr: "Solution alcaline liquide forte utilisée pour les bains de dégraissage des métaux et la neutralisation.",
        description_ar: "محلول قلوي سائل قوي يستخدم لحمامات إزالة الدهون من المعادن ورفع الرقم الهيدروجيني والتعادل.",
        image_url: "/images/pretreatment.png", is_featured: false
    },

    // --- TEKSTİL (YARDIMCI KATEGORİ) ---
    {
        id: "tex-1", category_id: "tekstil", subgroup_id: "on-islem-ve-boyama", slug: "growet-elf-on-islem-islatici",
        name: "Growet ELF (Pre-Treatment Wetting Agent)", cas_number: undefined, ionic_type: "nonionic",
        title_tr: "Growet ELF (Düşük Köpüklü Ön İşlem Islatıcısı)", title_en: "Growet ELF (Low-Foaming Pre-Treatment Wetting Agent)",
        title_fr: "Growet ELF (Agent Mouillant de Prétraitement)", title_ar: "Growet ELF (عامل ترطيب منخفض الرغوة للمعالجة المسبقة)",
        description_tr: "Pamuk ve karışımlarının kasar ve ön işlem banyolarında hızlı ıslatma ve hidrofillik sağlayan noniyonik madde.",
        description_en: "Nonionic wetting agent providing rapid penetration and high hydrophilicity in cotton bleaching baths.",
        description_fr: "Agent mouillant non-ionique offrant une pénétration rapide et une forte hydrophilie dans le blanchiment du coton.",
        description_ar: "عامل ترطيب غير أيوني يوفر اختراقًا سريعًا ومائية عالية في حمامات تبييض القطن.",
        image_url: "/images/pretreatment.png", is_featured: true
    },
    {
        id: "tex-2", category_id: "tekstil", subgroup_id: "yumusatici-ve-apre", slug: "grosil-amn-silikon-yumusatici",
        name: "Grosil AMN (Micro Emulsion Silicone)", cas_number: undefined, ionic_type: "cationic",
        title_tr: "Grosil AMN (Mikro Emülsiyon Silikon Yumuşatıcı)", title_en: "Grosil AMN (Micro Emulsion Silicone Softener)",
        title_fr: "Grosil AMN (Adoucissant Silicone Micro Emulsion)", title_ar: "Grosil AMN (منعم سيليكون مايكرو)",
        description_tr: "Örme ve dokuma kumaşlara ipeksi, iç yumuşaklık ve kaygan tutum kazandıran katyonik silikon emülsiyonu.",
        description_en: "Cationic amino-functional silicone emulsion imparting a silky, inner soft handle to knitted and woven fabrics.",
        description_fr: "Émulsion de silicone cationique apportant un toucher doux et soyeux aux tricots et tissus.",
        description_ar: "مستحلب سيليكون كاتيوني يمنح ملمسًا حريريًا وناعمًا للأقمشة المحبوكة والمنسوجة.",
        image_url: "/images/softeners.png", is_featured: true
    }
];
