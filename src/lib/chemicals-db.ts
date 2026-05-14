export interface ChemicalEntry {
    id: string;
    slug: string;
    cas_number: string;
    formula: string;
    category: string; // e.g., 'water-treatment', 'textile', 'general'
    name_tr: string;
    name_en: string;
    name_fr: string;
    name_ar: string;
    description_tr: string;
    description_en: string;
    description_fr: string;
    description_ar: string;
    usage_areas_tr: string[];
    usage_areas_en: string[];
    usage_areas_fr: string[];
    usage_areas_ar: string[];
}

export const CHEMICAL_DICTIONARY: ChemicalEntry[] = [
    {
        id: "chem-1",
        slug: "sodyum-hidroksit",
        cas_number: "1310-73-2",
        formula: "NaOH",
        category: "general",
        name_tr: "Sodyum Hidroksit (Kostik Soda)",
        name_en: "Sodium Hydroxide (Caustic Soda)",
        name_fr: "Hydroxyde de Sodium (Soude Caustique)",
        name_ar: "هيدروكسيد الصوديوم (الصودا الكاوية)",
        description_tr: "Sodyum hidroksit, kimya endüstrisinde yaygın olarak kullanılan güçlü bir bazdır. Su arıtma, tekstil, sabun ve deterjan üretiminde pH düzenleyici ve temizleyici olarak kullanılır.",
        description_en: "Sodium hydroxide is a strong base widely used in the chemical industry. It is used as a pH regulator and cleaner in water treatment, textiles, soap, and detergent manufacturing.",
        description_fr: "L'hydroxyde de sodium est une base forte largement utilisée dans l'industrie chimique. Il est utilisé comme régulateur de pH dans le traitement de l'eau, le textile et la fabrication de savons.",
        description_ar: "هيدروكسيد الصوديوم هو قاعدة قوية تستخدم على نطاق واسع في الصناعة الكيميائية. يستخدم كمنظم لدرجة الحموضة ومنظف في معالجة المياه والمنسوجات وتصنيع الصابون.",
        usage_areas_tr: ["Su Şartlandırma", "Tekstil Ön İşlem", "Sabun ve Deterjan", "Kağıt Endüstrisi"],
        usage_areas_en: ["Water Treatment", "Textile Pre-treatment", "Soap and Detergents", "Paper Industry"],
        usage_areas_fr: ["Traitement de l'eau", "Prétraitement textile", "Savons et détergents", "Industrie du papier"],
        usage_areas_ar: ["معالجة المياه", "المعالجة المسبقة للمنسوجات", "الصابون والمنظفات", "صناعة الورق"]
    },
    {
        id: "chem-2",
        slug: "hidrojen-peroksit",
        cas_number: "7722-84-1",
        formula: "H2O2",
        category: "textile",
        name_tr: "Hidrojen Peroksit",
        name_en: "Hydrogen Peroxide",
        name_fr: "Peroxyde d'Hydrogène",
        name_ar: "بيروكسيد الهيدروجين",
        description_tr: "Hidrojen peroksit, çevre dostu ve güçlü bir oksitleyici ajandır. Tekstilde ağartma (bleaching) işlemlerinde, kağıt endüstrisinde ve atıksu arıtmada dezenfektan olarak yoğunlukla tercih edilir.",
        description_en: "Hydrogen peroxide is an eco-friendly and strong oxidizing agent. It is heavily preferred in textile bleaching, the paper industry, and as a disinfectant in wastewater treatment.",
        description_fr: "Le peroxyde d'hydrogène est un agent oxydant puissant et respectueux de l'environnement. Très utilisé pour le blanchiment textile.",
        description_ar: "بيروكسيد الهيدروجين هو عامل مؤكسد قوي وصديق للبيئة. يفضل استخدامه في تبييض المنسوجات.",
        usage_areas_tr: ["Tekstil Ağartma (Kasar)", "Dezenfeksiyon", "Atıksu Arıtma", "Kağıt Ağartma"],
        usage_areas_en: ["Textile Bleaching", "Disinfection", "Wastewater Treatment", "Paper Bleaching"],
        usage_areas_fr: ["Blanchiment textile", "Désinfection", "Traitement des eaux usées", "Blanchiment du papier"],
        usage_areas_ar: ["تبييض المنسوجات", "التطهير", "معالجة مياه الصرف الصحي", "تبييض الورق"]
    },
    {
        id: "chem-3",
        slug: "sodyum-hipoklorit",
        cas_number: "7681-52-9",
        formula: "NaClO",
        category: "water-treatment",
        name_tr: "Sodyum Hipoklorit",
        name_en: "Sodium Hypochlorite",
        name_fr: "Hypochlorite de Sodium",
        name_ar: "هيبوكلوريت الصوديوم",
        description_tr: "Sodyum hipoklorit, mükemmel bir dezenfektan ve ağartıcıdır. Su arıtma tesislerinde klorlama işleminde, yüzme havuzlarında ve genel sanitasyonda kullanılır.",
        description_en: "Sodium hypochlorite is an excellent disinfectant and bleaching agent. It is used in chlorination in water treatment plants, swimming pools, and general sanitation.",
        description_fr: "L'hypochlorite de sodium est un excellent désinfectant et agent de blanchiment. Utilisé dans le traitement de l'eau.",
        description_ar: "هيبوكلوريت الصوديوم مطهر ومبيض ممتاز. يستخدم في معالجة المياه.",
        usage_areas_tr: ["İçme Suyu Dezenfeksiyonu", "Havuz Kimyasalları", "Tekstil Ağartma", "Temizlik Kimyasalları"],
        usage_areas_en: ["Drinking Water Disinfection", "Pool Chemicals", "Textile Bleaching", "Cleaning Chemicals"],
        usage_areas_fr: ["Désinfection de l'eau", "Produits pour piscine", "Blanchiment textile", "Produits de nettoyage"],
        usage_areas_ar: ["تطهير مياه الشرب", "كيماويات المسابح", "تبييض المنسوجات", "كيماويات التنظيف"]
    },
    {
        id: "chem-4",
        slug: "polialuminyum-klorur-pac",
        cas_number: "1327-41-9",
        formula: "Aln(OH)mCl(3n-m)",
        category: "water-treatment",
        name_tr: "Polialüminyum Klorür (PAC)",
        name_en: "Polyaluminum Chloride (PAC)",
        name_fr: "Polychlorure d'Aluminium (PAC)",
        name_ar: "بولي كلوريد الألومنيوم (PAC)",
        description_tr: "PAC, atıksu ve içme suyu arıtımında kullanılan oldukça etkili bir inorganik polimer koagülanttır. Düşük sıcaklıklarda ve geniş pH aralığında çalışabilir.",
        description_en: "PAC is a highly effective inorganic polymer coagulant used in wastewater and drinking water treatment. It can operate at low temperatures and across a wide pH range.",
        description_fr: "Le PAC est un coagulant polymère inorganique très efficace utilisé dans le traitement de l'eau.",
        description_ar: "PAC هو مخثر بوليمر غير عضوي فعال للغاية يستخدم في معالجة مياه الصرف الصحي.",
        usage_areas_tr: ["Atıksu Arıtma", "İçme Suyu Arıtma", "Kağıt Endüstrisi", "Tekstil Atıksu Rengi Giderme"],
        usage_areas_en: ["Wastewater Treatment", "Drinking Water Treatment", "Paper Industry", "Textile Decolorization"],
        usage_areas_fr: ["Traitement des eaux usées", "Eau potable", "Industrie du papier", "Décoloration textile"],
        usage_areas_ar: ["معالجة مياه الصرف", "معالجة مياه الشرب", "صناعة الورق", "إزالة ألوان المنسوجات"]
    },
    {
        id: "chem-5",
        slug: "sodyum-metabisulfit",
        cas_number: "7681-57-4",
        formula: "Na2S2O5",
        category: "general",
        name_tr: "Sodyum Metabisülfit (SMBS)",
        name_en: "Sodium Metabisulfite (SMBS)",
        name_fr: "Métabisulfite de Sodium",
        name_ar: "ميتابيسلفيت الصوديوم",
        description_tr: "Güçlü bir indirgeyici (redüktör) ajandır. Tekstilde antiklor işleminde, su arıtmada klor giderici olarak ve gıda sektöründe koruyucu olarak kullanılır.",
        description_en: "A strong reducing agent. It is used as an antichlor in textiles, a chlorine scavenger in water treatment, and a preservative in the food industry.",
        description_fr: "Agent réducteur fort. Utilisé comme antichlore dans le textile et le traitement de l'eau.",
        description_ar: "عامل اختزال قوي. يستخدم كمضاد للكلور في المنسوجات.",
        usage_areas_tr: ["Tekstil Antiklor İşlemi", "Ters Osmoz (RO) Sistemleri", "Maden Endüstrisi", "Gıda Koruyucu"],
        usage_areas_en: ["Textile Antichlor Process", "Reverse Osmosis (RO) Systems", "Mining Industry", "Food Preservative"],
        usage_areas_fr: ["Processus antichlore", "Systèmes RO", "Industrie minière", "Conservateur alimentaire"],
        usage_areas_ar: ["عملية مضاد للكلور", "أنظمة التناضح العكسي", "صناعة التعدين", "مواد حافظة"]
    }
];
