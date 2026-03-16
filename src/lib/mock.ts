
// ═══════════════════════════════════════════════════
// GROHN KİMYA — Hierarchical Product Catalog
// Category → Subgroup → Product (with ionic type tags)
// ═══════════════════════════════════════════════════

export interface Category {
    id: string;
    slug: string;
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
    prefix: string; // e.g. "Growet", "Groseq"
}

export interface Product {
    id: string;
    category_id: string;
    subgroup_id: string;
    slug: string;
    name: string;
    ionic_type?: string; // "nonionic" | "anionic" | "cationic" | "amphoteric" | null
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
    cas_number?: string;
    chemical_formula?: string;
    purity?: string;
    einecs_number?: string;
}


// ═══════════════════════════════════════════════════
// CATEGORIES (Ana Kategoriler)
// ═══════════════════════════════════════════════════

export const MOCK_CATEGORIES: Category[] = [
    {
        id: "on-islem", slug: "on-islem",
        name_tr: "Ön İşlem Kimyasalları", name_en: "Pre-Treatment Auxiliaries",
        name_fr: "Auxiliaires de Prétraitement", name_ar: "مساعدات المعالجة المسبقة",
        image_url: "/images/pretreatment.png"
    },
    {
        id: "boyama", slug: "boyama",
        name_tr: "Boyama Yardımcıları", name_en: "Dyeing Auxiliaries",
        name_fr: "Auxiliaires de Teinture", name_ar: "مساعدات الصباغة",
        image_url: "/images/dyeing.png"
    },
    {
        id: "yikama", slug: "yikama",
        name_tr: "Yıkama ve Sabunlama", name_en: "Washing & Soaping",
        name_fr: "Lavage et Savonnage", name_ar: "الغسيل والتصبين",
        image_url: "/images/washing.png"
    },
    {
        id: "yumusaticilar", slug: "yumusaticilar",
        name_tr: "Yumuşatıcılar", name_en: "Softeners",
        name_fr: "Adoucissants", name_ar: "المنعمات",
        image_url: "/images/softeners.png"
    },
    {
        id: "enzimler", slug: "enzimler",
        name_tr: "Enzimler", name_en: "Enzymes",
        name_fr: "Enzymes", name_ar: "الإنزيمات",
        image_url: "/images/enzymes.png"
    },
    {
        id: "apre", slug: "apre",
        name_tr: "Apre ve Terbiye", name_en: "Finishing Auxiliaries",
        name_fr: "Auxiliaires de Finition", name_ar: "مساعدات التشطيب",
        image_url: "/images/finishing.png"
    },
    {
        id: "aritma", slug: "aritma",
        name_tr: "Arıtma Kimyasalları", name_en: "Water Treatment Chemicals",
        name_fr: "Produits de Traitement de l'Eau", name_ar: "كيماويات معالجة المياه",
        image_url: "/images/water-treatment.png"
    },
];


// ═══════════════════════════════════════════════════
// SUBGROUPS (Alt Gruplar)
// ═══════════════════════════════════════════════════

export const MOCK_SUBGROUPS: Subgroup[] = [
    // — Ön İşlem —
    {
        id: "islaticilar", category_id: "on-islem", slug: "islaticilar", prefix: "Growet",
        name_tr: "Islatıcılar", name_en: "Wetting Agents", name_fr: "Agents Mouillants", name_ar: "عوامل الترطيب"
    },
    {
        id: "iyon-tutucular", category_id: "on-islem", slug: "iyon-tutucular", prefix: "Groseq",
        name_tr: "İyon Tutucu & Şelatlama Ajanları", name_en: "Sequestering & Chelating Agents", name_fr: "Agents Séquestrants et Chélatants", name_ar: "عوامل العزل والمخلبة"
    },
    {
        id: "stabilizatorler", category_id: "on-islem", slug: "stabilizatorler", prefix: "Grostab",
        name_tr: "Peroksit Stabilizatörleri", name_en: "Peroxide Stabilizers", name_fr: "Stabilisateurs de Peroxyde", name_ar: "مثبتات البيروكسيد"
    },
    {
        id: "yag-sokuculer", category_id: "on-islem", slug: "yag-sokuculer", prefix: "Grosol",
        name_tr: "Yağ ve Leke Sökücüler", name_en: "Oil & Stain Removers", name_fr: "Détachants et Dégraissants", name_ar: "مزيلات الزيت والبقع"
    },
    {
        id: "tampon-asitler", category_id: "on-islem", slug: "tampon-asitler", prefix: "Grocid",
        name_tr: "Tampon Asitler", name_en: "Buffering Acids", name_fr: "Acides Tampons", name_ar: "أحماض عازلة"
    },

    // — Boyama —
    {
        id: "dispergatorler", category_id: "boyama", slug: "dispergatorler", prefix: "Grogal",
        name_tr: "Dispergatör & Egalizatörler", name_en: "Dispersing & Levelling Agents", name_fr: "Agents Dispersants et Égalisants", name_ar: "عوامل التشتت والمساواة"
    },
    {
        id: "dispers-yardimcilari", category_id: "boyama", slug: "dispers-yardimcilari", prefix: "Gropers",
        name_tr: "Dispers Boya Yardımcıları", name_en: "Disperse Dyeing Auxiliaries", name_fr: "Auxiliaires de Teinture Dispersée", name_ar: "مساعدات الصباغة المشتتة"
    },
    {
        id: "carrier", category_id: "boyama", slug: "carrier", prefix: "Grocarrier",
        name_tr: "Carrier'lar", name_en: "Carriers", name_fr: "Carriers", name_ar: "الناقلات"
    },

    // — Yıkama —
    {
        id: "yikama-ajanlari", category_id: "yikama", slug: "yikama-ajanlari", prefix: "Growash",
        name_tr: "Yıkama ve Sabunlama Ajanları", name_en: "Washing & Soaping Agents", name_fr: "Agents de Lavage et Savonnage", name_ar: "عوامل الغسيل والتصبين"
    },

    // — Yumuşatıcılar —
    {
        id: "silikon-yumusaticilar", category_id: "yumusaticilar", slug: "silikon-yumusaticilar", prefix: "Grosil",
        name_tr: "Silikon Yumuşatıcılar", name_en: "Silicone Softeners", name_fr: "Adoucissants Siliconés", name_ar: "منعمات السيليكون"
    },
    {
        id: "silikonsuz-yumusaticilar", category_id: "yumusaticilar", slug: "silikonsuz-yumusaticilar", prefix: "Grosoft",
        name_tr: "Silikonsuz Yumuşatıcılar", name_en: "Non-Silicone Softeners", name_fr: "Adoucissants Non-Siliconés", name_ar: "منعمات بدون سيليكون"
    },

    // — Enzimler —
    {
        id: "enzim-cesitleri", category_id: "enzimler", slug: "enzim-cesitleri", prefix: "Grozyme",
        name_tr: "Tekstil Enzimleri", name_en: "Textile Enzymes", name_fr: "Enzymes Textiles", name_ar: "إنزيمات النسيج"
    },

    // — Apre —
    {
        id: "kenar-kolalar", category_id: "apre", slug: "kenar-kolalar", prefix: "Grofab",
        name_tr: "Kenar Kolalar", name_en: "Edge Hardeners", name_fr: "Durcisseurs de Bords", name_ar: "مقويات الحواف"
    },
    {
        id: "fonksiyonel-apreler", category_id: "apre", slug: "fonksiyonel-apreler", prefix: "Grofix",
        name_tr: "Fonksiyonel Apreler", name_en: "Functional Finishes", name_fr: "Finitions Fonctionnelles", name_ar: "التشطيبات الوظيفية"
    },
    {
        id: "antistatik", category_id: "apre", slug: "antistatik", prefix: "Grostat",
        name_tr: "Antistatik Ajanlar", name_en: "Antistatic Agents", name_fr: "Agents Antistatiques", name_ar: "عوامل مضادة للكهرباء الساكنة"
    },

    // — Arıtma —
    {
        id: "flokkulan-koagulan", category_id: "aritma", slug: "flokkulan-koagulan", prefix: "Growat",
        name_tr: "Flokülasyon & Koagülasyon", name_en: "Flocculation & Coagulation", name_fr: "Floculation et Coagulation", name_ar: "التلبد والتخثر"
    },
    {
        id: "renk-giderme", category_id: "aritma", slug: "renk-giderme", prefix: "Growat",
        name_tr: "Renk Giderme & Dekolorizasyon", name_en: "Color Removal & Decolorization", name_fr: "Élimination de la Couleur", name_ar: "إزالة اللون"
    },
];


// ═══════════════════════════════════════════════════
// PRODUCTS (Ürünler)
// ═══════════════════════════════════════════════════

export const MOCK_PRODUCTS: Product[] = [

    // ──────────────────────────────────────────────
    // ÖN İŞLEM → Islatıcılar (Growet)
    // ──────────────────────────────────────────────
    {
        id: "1", category_id: "on-islem", subgroup_id: "islaticilar", slug: "growet-elf",
        name: "Growet ELF", ionic_type: "nonionic",
        title_tr: "Growet ELF", title_en: "Growet ELF", title_fr: "Growet ELF", title_ar: "Growet ELF",
        description_tr: "Noniyonik ıslatıcı. Kasar, ağartma ve yıkama proseslerinde yüksek verimlilik.",
        description_en: "Nonionic wetting agent. High efficiency in scouring, bleaching and washing processes.",
        description_fr: "Agent mouillant non ionique. Haute efficacité dans les procédés de débouillissage et blanchiment.",
        description_ar: "عامل ترطيب غير أيوني. كفاءة عالية في عمليات الغلي والتبييض والغسيل.",
        image_url: "/images/pretreatment.png", is_featured: true
    },
    {
        id: "2", category_id: "on-islem", subgroup_id: "islaticilar", slug: "growet-cmb",
        name: "Growet CMB", ionic_type: "nonionic",
        title_tr: "Growet CMB", title_en: "Growet CMB", title_fr: "Growet CMB", title_ar: "Growet CMB",
        description_tr: "Noniyonik kombin kasar ıslatıcısı. Tek banyoda ıslatma ve yağ sökme.",
        description_en: "Nonionic combined scouring wetting agent. Single-bath wetting and degreasing.",
        description_fr: "Agent mouillant combiné non ionique pour débouillissage.",
        description_ar: "عامل ترطيب مشترك غير أيوني للغلي.",
        image_url: "/images/pretreatment.png", is_featured: false
    },
    {
        id: "3", category_id: "on-islem", subgroup_id: "islaticilar", slug: "growet-lfn",
        name: "Growet LFN", ionic_type: "nonionic",
        title_tr: "Growet LFN", title_en: "Growet LFN", title_fr: "Growet LFN", title_ar: "Growet LFN",
        description_tr: "Düşük köpüklü noniyonik ıslatıcı. Jet boyama makineleri için ideal.",
        description_en: "Low-foaming nonionic wetting agent. Ideal for jet dyeing machines.",
        description_fr: "Agent mouillant non ionique à faible mousse. Idéal pour machines jet.",
        description_ar: "عامل ترطيب غير أيوني منخفض الرغوة. مثالي لآلات الصباغة النفاثة.",
        image_url: "/images/pretreatment.png", is_featured: false
    },
    {
        id: "4", category_id: "on-islem", subgroup_id: "islaticilar", slug: "growet-anx",
        name: "Growet ANX", ionic_type: "anionic",
        title_tr: "Growet ANX", title_en: "Growet ANX", title_fr: "Growet ANX", title_ar: "Growet ANX",
        description_tr: "Anyonik ıslatıcı. Alkali ortamlarda yüksek ıslatma performansı.",
        description_en: "Anionic wetting agent. Excellent wetting performance in alkaline conditions.",
        description_fr: "Agent mouillant anionique. Excellentes performances en milieu alcalin.",
        description_ar: "عامل ترطيب أنيوني. أداء ترطيب ممتاز في الظروف القلوية.",
        image_url: "/images/pretreatment.png", is_featured: false
    },
    {
        id: "5", category_id: "on-islem", subgroup_id: "islaticilar", slug: "growet-hts",
        name: "Growet HTS", ionic_type: "anionic",
        title_tr: "Growet HTS", title_en: "Growet HTS", title_fr: "Growet HTS", title_ar: "Growet HTS",
        description_tr: "Anyonik ıslatıcı. Yüksek sıcaklık stabilitesi, HT proseslere uygun.",
        description_en: "Anionic wetting agent. High temperature stability, suitable for HT processes.",
        description_fr: "Agent mouillant anionique. Stabilité haute température, pour procédés HT.",
        description_ar: "عامل ترطيب أنيوني. ثبات درجات الحرارة العالية.",
        image_url: "/images/pretreatment.png", is_featured: false
    },

    // ──────────────────────────────────────────────
    // ÖN İŞLEM → İyon Tutucular (Groseq)
    // ──────────────────────────────────────────────
    {
        id: "6", category_id: "on-islem", subgroup_id: "iyon-tutucular", slug: "groseq-pff",
        name: "Groseq PFF", ionic_type: "anionic",
        title_tr: "Groseq PFF", title_en: "Groseq PFF", title_fr: "Groseq PFF", title_ar: "Groseq PFF",
        description_tr: "Konsantre iyon tutucu ve şelatlama ajanı. Ca²⁺, Mg²⁺ ve Fe³⁺ iyonlarını bağlar.",
        description_en: "Concentrated sequestering and chelating agent. Binds Ca²⁺, Mg²⁺ and Fe³⁺ ions.",
        description_fr: "Agent séquestrant et chélatant concentré. Lie les ions Ca²⁺, Mg²⁺ et Fe³⁺.",
        description_ar: "عامل عزل ومخلب مركز. يربط أيونات الكالسيوم والمغنيسيوم والحديد.",
        image_url: "/images/pretreatment.png", is_featured: false
    },
    {
        id: "7", category_id: "on-islem", subgroup_id: "iyon-tutucular", slug: "groseq-acr",
        name: "Groseq ACR", ionic_type: "anionic",
        title_tr: "Groseq ACR", title_en: "Groseq ACR", title_fr: "Groseq ACR", title_ar: "Groseq ACR",
        description_tr: "Reaktif boya banyosu için özel iyon tutucu. Sert su etkisini nötralize eder.",
        description_en: "Sequestering agent for reactive dye baths. Neutralizes hard water effects.",
        description_fr: "Agent séquestrant pour bains de teinture réactifs.",
        description_ar: "عامل عزل لحمامات الصباغة التفاعلية.",
        image_url: "/images/pretreatment.png", is_featured: false
    },
    {
        id: "8", category_id: "on-islem", subgroup_id: "iyon-tutucular", slug: "groseq-dtpa",
        name: "Groseq DTPA", ionic_type: "anionic",
        title_tr: "Groseq DTPA", title_en: "Groseq DTPA", title_fr: "Groseq DTPA", title_ar: "Groseq DTPA",
        description_tr: "DTPA bazlı güçlü şelatlama ajanı. Demir iyonlarının kontrolünde üstün performans.",
        description_en: "DTPA-based strong chelating agent. Superior performance in iron ion control.",
        description_fr: "Agent chélatant puissant à base de DTPA.",
        description_ar: "عامل مخلب قوي أساسه DTPA.",
        image_url: "/images/pretreatment.png", is_featured: false
    },

    // ──────────────────────────────────────────────
    // ÖN İŞLEM → Stabilizatörler (Grostab)
    // ──────────────────────────────────────────────
    {
        id: "9", category_id: "on-islem", subgroup_id: "stabilizatorler", slug: "grostab-pl",
        name: "Grostab PL", ionic_type: "anionic",
        title_tr: "Grostab PL", title_en: "Grostab PL", title_fr: "Grostab PL", title_ar: "Grostab PL",
        description_tr: "Konsantre peroksit stabilizatörü. Ağartma banyosunda H₂O₂ kontrolü.",
        description_en: "Concentrated peroxide stabilizer. H₂O₂ control in bleaching baths.",
        description_fr: "Stabilisateur de peroxyde concentré. Contrôle du H₂O₂.",
        description_ar: "مثبت بيروكسيد مركز. التحكم في بيروكسيد الهيدروجين.",
        image_url: "/images/pretreatment.png", is_featured: false
    },
    {
        id: "10", category_id: "on-islem", subgroup_id: "stabilizatorler", slug: "grostab-slk",
        name: "Grostab SLK", ionic_type: "anionic",
        title_tr: "Grostab SLK", title_en: "Grostab SLK", title_fr: "Grostab SLK", title_ar: "Grostab SLK",
        description_tr: "Silikat bazlı peroksit stabilizatörü. Alkali ağartma prosesleri için.",
        description_en: "Silicate-based peroxide stabilizer. For alkaline bleaching processes.",
        description_fr: "Stabilisateur de peroxyde à base de silicate.",
        description_ar: "مثبت بيروكسيد أساسه السيليكات.",
        image_url: "/images/pretreatment.png", is_featured: false
    },

    // ──────────────────────────────────────────────
    // ÖN İŞLEM → Yağ Sökücüler (Grosol)
    // ──────────────────────────────────────────────
    {
        id: "11", category_id: "on-islem", subgroup_id: "yag-sokuculer", slug: "grosol-bnk",
        name: "Grosol BNK", ionic_type: "nonionic",
        title_tr: "Grosol BNK", title_en: "Grosol BNK", title_fr: "Grosol BNK", title_ar: "Grosol BNK",
        description_tr: "Noniyonik yağ ve leke sökücü. Mineral ve doğal yağların uzaklaştırılması.",
        description_en: "Nonionic oil and stain removing agent. Removes mineral and natural oils.",
        description_fr: "Agent d'élimination d'huile et de taches non ionique.",
        description_ar: "عامل إزالة الزيت والبقع غير الأيوني.",
        image_url: "/images/pretreatment.png", is_featured: false
    },
    {
        id: "12", category_id: "on-islem", subgroup_id: "yag-sokuculer", slug: "grosol-khl",
        name: "Grosol KHL", ionic_type: "nonionic",
        title_tr: "Grosol KHL", title_en: "Grosol KHL", title_fr: "Grosol KHL", title_ar: "Grosol KHL",
        description_tr: "Solventli yağ sökücü. Ağır mineral yağ lekeleri için yüksek performans.",
        description_en: "Solvent-based oil remover. High performance for heavy mineral oil stains.",
        description_fr: "Détachant haute performance à base de solvant.",
        description_ar: "مزيل زيت بالمذيبات عالي الأداء.",
        image_url: "/images/pretreatment.png", is_featured: false
    },
    {
        id: "13", category_id: "on-islem", subgroup_id: "yag-sokuculer", slug: "grosol-emr",
        name: "Grosol EMR", ionic_type: "nonionic",
        title_tr: "Grosol EMR", title_en: "Grosol EMR", title_fr: "Grosol EMR", title_ar: "Grosol EMR",
        description_tr: "Emülsifiye edici yağ sökücü. Geniş pH ve sıcaklık aralığında etkili.",
        description_en: "Emulsifying oil remover. Effective across wide pH and temperature ranges.",
        description_fr: "Dégraissant émulsifiant. Efficace sur une large plage de pH.",
        description_ar: "مزيل زيت مستحلب. فعال في نطاقات واسعة.",
        image_url: "/images/pretreatment.png", is_featured: false
    },

    // ──────────────────────────────────────────────
    // ÖN İŞLEM → Tampon Asitler (Grocid)
    // ──────────────────────────────────────────────
    {
        id: "14", category_id: "on-islem", subgroup_id: "tampon-asitler", slug: "grocid-gfy",
        name: "Grocid GFY", ionic_type: "anionic",
        title_tr: "Grocid GFY", title_en: "Grocid GFY", title_fr: "Grocid GFY", title_ar: "Grocid GFY",
        description_tr: "Konsantre tampon asit. Boyama ve ağartma proseslerinde pH sabitlemesi.",
        description_en: "Concentrated buffering acid. pH stabilization in dyeing and bleaching.",
        description_fr: "Acide tampon concentré. Stabilisation du pH.",
        description_ar: "حمض عازل مركز. استقرار الأس الهيدروجيني.",
        image_url: "/images/pretreatment.png", is_featured: false
    },
    {
        id: "15", category_id: "on-islem", subgroup_id: "tampon-asitler", slug: "grocid-ntr",
        name: "Grocid NTR", ionic_type: "anionic",
        title_tr: "Grocid NTR", title_en: "Grocid NTR", title_fr: "Grocid NTR", title_ar: "Grocid NTR",
        description_tr: "Nötralizasyon asidi. Ağartma sonrası alkali nötralizasyonu.",
        description_en: "Neutralization acid. Post-bleaching alkali neutralization.",
        description_fr: "Acide de neutralisation. Neutralisation alcaline post-blanchiment.",
        description_ar: "حمض المعادلة. معادلة القلوية بعد التبييض.",
        image_url: "/images/pretreatment.png", is_featured: false
    },
    {
        id: "16", category_id: "on-islem", subgroup_id: "tampon-asitler", slug: "grocid-bff",
        name: "Grocid BFF", ionic_type: "anionic",
        title_tr: "Grocid BFF", title_en: "Grocid BFF", title_fr: "Grocid BFF", title_ar: "Grocid BFF",
        description_tr: "Yüksek tamponlama kapasiteli organik asit. Reaktif boyama pH kontrolü.",
        description_en: "High buffering capacity organic acid. Reactive dyeing pH control.",
        description_fr: "Acide organique à haute capacité tampon.",
        description_ar: "حمض عضوي عالي القدرة التخزينية.",
        image_url: "/images/pretreatment.png", is_featured: false
    },

    // ══════════════════════════════════════════════
    // BOYAMA → Dispergatörler (Grogal)
    // ══════════════════════════════════════════════
    {
        id: "17", category_id: "boyama", subgroup_id: "dispergatorler", slug: "grogal-ls",
        name: "Grogal LS", ionic_type: "anionic",
        title_tr: "Grogal LS", title_en: "Grogal LS", title_fr: "Grogal LS", title_ar: "Grogal LS",
        description_tr: "Anyonik dispergatör ve egalizatör. Reaktif boyamada düzgün renk dağılımı.",
        description_en: "Anionic dispersing and levelling agent. Uniform color in reactive dyeing.",
        description_fr: "Agent dispersant et égalisant anionique pour teinture réactive.",
        description_ar: "عامل تشتت ومساواة أنيوني للصباغة التفاعلية.",
        image_url: "/images/dyeing.png", is_featured: true
    },
    {
        id: "18", category_id: "boyama", subgroup_id: "dispergatorler", slug: "grogal-rbn",
        name: "Grogal RBN", ionic_type: "anionic",
        title_tr: "Grogal RBN", title_en: "Grogal RBN", title_fr: "Grogal RBN", title_ar: "Grogal RBN",
        description_tr: "Yüksek performanslı egalizatör. Koyu renklerde oligomer dispersiyonu.",
        description_en: "High-performance levelling agent. Oligomer dispersion in dark shades.",
        description_fr: "Agent égalisant haute performance. Dispersion des oligomères.",
        description_ar: "عامل مساواة عالي الأداء. تشتت الأوليغومر في الألوان الداكنة.",
        image_url: "/images/dyeing.png", is_featured: false
    },
    {
        id: "19", category_id: "boyama", subgroup_id: "dispergatorler", slug: "grogal-ns",
        name: "Grogal NS", ionic_type: "nonionic",
        title_tr: "Grogal NS", title_en: "Grogal NS", title_fr: "Grogal NS", title_ar: "Grogal NS",
        description_tr: "Noniyonik toz dispergatör. Su sertliğine dayanıklı, geniş kullanım alanı.",
        description_en: "Nonionic powder dispersant. Resistant to water hardness, versatile use.",
        description_fr: "Dispersant en poudre non ionique. Résistant à la dureté de l'eau.",
        description_ar: "مشتت مسحوق غير أيوني. مقاوم لعسر الماء.",
        image_url: "/images/dyeing.png", is_featured: false
    },

    // BOYAMA → Dispers Yardımcıları (Gropers)
    {
        id: "20", category_id: "boyama", subgroup_id: "dispers-yardimcilari", slug: "gropers-erd",
        name: "Gropers ERD", ionic_type: "anionic",
        title_tr: "Gropers ERD", title_en: "Gropers ERD", title_fr: "Gropers ERD", title_ar: "Gropers ERD",
        description_tr: "Dispers boyama için anyonik dispergatör ve egalizatör.",
        description_en: "Anionic dispersing and levelling agent for disperse dyeing.",
        description_fr: "Agent dispersant anionique pour teinture dispersée.",
        description_ar: "عامل تشتت أنيوني للصباغة المشتتة.",
        image_url: "/images/dyeing.png", is_featured: false
    },
    {
        id: "21", category_id: "boyama", subgroup_id: "dispers-yardimcilari", slug: "gropers-hpd",
        name: "Gropers HPD", ionic_type: "nonionic",
        title_tr: "Gropers HPD", title_en: "Gropers HPD", title_fr: "Gropers HPD", title_ar: "Gropers HPD",
        description_tr: "HT boyama için noniyonik dispers yardımcı. 130°C'ye kadar stabil.",
        description_en: "Nonionic disperse auxiliary for HT dyeing. Stable up to 130°C.",
        description_fr: "Auxiliaire disperse non ionique pour teinture HT. Stable jusqu'à 130°C.",
        description_ar: "مساعد تشتت غير أيوني. مستقر حتى 130 درجة مئوية.",
        image_url: "/images/dyeing.png", is_featured: false
    },

    // BOYAMA → Carrier (Grocarrier)
    {
        id: "22", category_id: "boyama", subgroup_id: "carrier", slug: "grocarrier-taf",
        name: "Grocarrier TAF", ionic_type: "nonionic",
        title_tr: "Grocarrier TAF", title_en: "Grocarrier TAF", title_fr: "Grocarrier TAF", title_ar: "Grocarrier TAF",
        description_tr: "Ekolojik carrier. Poliester boyamada 100°C'de renk verimini artırır.",
        description_en: "Ecological carrier. Increases color yield at 100°C for polyester dyeing.",
        description_fr: "Carrier écologique pour teinture polyester.",
        description_ar: "ناقل بيئي. يزيد كفاءة اللون عند 100 درجة مئوية.",
        image_url: "/images/dyeing.png", is_featured: false
    },
    {
        id: "23", category_id: "boyama", subgroup_id: "carrier", slug: "grocarrier-ngs",
        name: "Grocarrier NGS", ionic_type: "nonionic",
        title_tr: "Grocarrier NGS", title_en: "Grocarrier NGS", title_fr: "Grocarrier NGS", title_ar: "Grocarrier NGS",
        description_tr: "Yeni nesil APEO-free carrier. Düşük VOC, çevre dostu formülasyon.",
        description_en: "Next-gen APEO-free carrier. Low VOC, eco-friendly formulation.",
        description_fr: "Carrier nouvelle génération sans APEO. Faible COV.",
        description_ar: "ناقل خالٍ من APEO من الجيل الجديد.",
        image_url: "/images/dyeing.png", is_featured: false
    },

    // ══════════════════════════════════════════════
    // YIKAMA → Growash
    // ══════════════════════════════════════════════
    {
        id: "24", category_id: "yikama", subgroup_id: "yikama-ajanlari", slug: "growash-rct",
        name: "Growash RCT", ionic_type: "anionic",
        title_tr: "Growash RCT", title_en: "Growash RCT", title_fr: "Growash RCT", title_ar: "Growash RCT",
        description_tr: "Reaktif boyama sonrası yıkama ajanı. Hidrolize boyanın hızlı uzaklaştırılması.",
        description_en: "Post-reactive dyeing washing agent. Rapid hydrolyzed dye removal.",
        description_fr: "Agent de lavage post-teinture réactive.",
        description_ar: "عامل غسيل بعد الصباغة التفاعلية.",
        image_url: "/images/washing.png", is_featured: true
    },
    {
        id: "25", category_id: "yikama", subgroup_id: "yikama-ajanlari", slug: "growash-spr",
        name: "Growash SPR", ionic_type: "nonionic",
        title_tr: "Growash SPR", title_en: "Growash SPR", title_fr: "Growash SPR", title_ar: "Growash SPR",
        description_tr: "Sabunlama ajanı. Yüzeydeki fazla boyanın temizlenmesi, renk haslığı artışı.",
        description_en: "Soaping agent. Surface dye removal, improved color fastness.",
        description_fr: "Agent de savonnage. Nettoyage de surface.",
        description_ar: "عامل تصبين. إزالة الصبغة السطحية.",
        image_url: "/images/washing.png", is_featured: false
    },
    {
        id: "26", category_id: "yikama", subgroup_id: "yikama-ajanlari", slug: "growash-enz",
        name: "Growash ENZ", ionic_type: "nonionic",
        title_tr: "Growash ENZ", title_en: "Growash ENZ", title_fr: "Growash ENZ", title_ar: "Growash ENZ",
        description_tr: "Enzimatik yıkama ajanı. 40-60°C'de etkili, enerji tasarrufu.",
        description_en: "Enzymatic washing agent. Effective at 40-60°C, energy saving.",
        description_fr: "Agent de lavage enzymatique. Efficace à 40-60°C.",
        description_ar: "عامل غسيل إنزيمي. فعال في 40-60 درجة مئوية.",
        image_url: "/images/washing.png", is_featured: false
    },
    {
        id: "27", category_id: "yikama", subgroup_id: "yikama-ajanlari", slug: "growash-red",
        name: "Growash RED", ionic_type: "anionic",
        title_tr: "Growash RED", title_en: "Growash RED", title_fr: "Growash RED", title_ar: "Growash RED",
        description_tr: "Redüktif yıkama ajanı. Dispers boyama sonrası yüzey temizliği.",
        description_en: "Reductive washing agent. Post-disperse dyeing surface cleaning.",
        description_fr: "Agent de lavage réductif.",
        description_ar: "عامل غسيل اختزالي.",
        image_url: "/images/washing.png", is_featured: false
    },

    // ══════════════════════════════════════════════
    // YUMUŞATICILAR → Silikon (Grosil)
    // ══════════════════════════════════════════════
    {
        id: "28", category_id: "yumusaticilar", subgroup_id: "silikon-yumusaticilar", slug: "grosil-mkr",
        name: "Grosil MKR", ionic_type: "nonionic",
        title_tr: "Grosil MKR", title_en: "Grosil MKR", title_fr: "Grosil MKR", title_ar: "Grosil MKR",
        description_tr: "Mikro emülsiyon silikon yumuşatıcı. Parlak, kaygan ve elastik tuşe.",
        description_en: "Micro emulsion silicone softener. Bright, slippery and elastic hand feel.",
        description_fr: "Adoucissant silicone micro-émulsion. Toucher brillant et glissant.",
        description_ar: "منعم سيليكون مستحلب دقيق. ملمس لامع وزلق ومرن.",
        image_url: "/images/softeners.png", is_featured: true
    },
    {
        id: "29", category_id: "yumusaticilar", subgroup_id: "silikon-yumusaticilar", slug: "grosil-amn",
        name: "Grosil AMN", ionic_type: "cationic",
        title_tr: "Grosil AMN", title_en: "Grosil AMN", title_fr: "Grosil AMN", title_ar: "Grosil AMN",
        description_tr: "Amino fonksiyonlu silikon makro emülsiyon. Dolgun, kalıcı yumuşak tuşe.",
        description_en: "Amino-functional silicone macro emulsion. Full, lasting soft hand feel.",
        description_fr: "Macro-émulsion silicone amino-fonctionnelle.",
        description_ar: "مستحلب سيليكون كبير بوظيفة أمينية.",
        image_url: "/images/softeners.png", is_featured: false
    },
    {
        id: "30", category_id: "yumusaticilar", subgroup_id: "silikon-yumusaticilar", slug: "grosil-hyd",
        name: "Grosil HYD", ionic_type: "nonionic",
        title_tr: "Grosil HYD", title_en: "Grosil HYD", title_fr: "Grosil HYD", title_ar: "Grosil HYD",
        description_tr: "Hidrofilik silikon yumuşatıcı. Yumuşaklık + su emicilik dengesi.",
        description_en: "Hydrophilic silicone softener. Softness + water absorption balance.",
        description_fr: "Adoucissant silicone hydrophile.",
        description_ar: "منعم سيليكون محب للماء.",
        image_url: "/images/softeners.png", is_featured: false
    },
    {
        id: "31", category_id: "yumusaticilar", subgroup_id: "silikon-yumusaticilar", slug: "grosil-pes",
        name: "Grosil PES", ionic_type: "nonionic",
        title_tr: "Grosil PES", title_en: "Grosil PES", title_fr: "Grosil PES", title_ar: "Grosil PES",
        description_tr: "Polyester için özel silikon. Süblimasyon haslığını etkilemez.",
        description_en: "Special silicone for polyester. Does not affect sublimation fastness.",
        description_fr: "Silicone spécial pour polyester.",
        description_ar: "سيليكون خاص للبوليستر.",
        image_url: "/images/softeners.png", is_featured: false
    },

    // YUMUŞATICILAR → Silikonsuz (Grosoft)
    {
        id: "32", category_id: "yumusaticilar", subgroup_id: "silikonsuz-yumusaticilar", slug: "grosoft-pe",
        name: "Grosoft PE", ionic_type: "nonionic",
        title_tr: "Grosoft PE", title_en: "Grosoft PE", title_fr: "Grosoft PE", title_ar: "Grosoft PE",
        description_tr: "Polietilen emülsiyon yumuşatıcı. Ekonomik, düz ve kaygan tuşe.",
        description_en: "Polyethylene emulsion softener. Economical, smooth and slippery feel.",
        description_fr: "Adoucissant émulsion polyéthylène. Économique.",
        description_ar: "منعم مستحلب البولي إيثيلين.",
        image_url: "/images/softeners.png", is_featured: false
    },
    {
        id: "33", category_id: "yumusaticilar", subgroup_id: "silikonsuz-yumusaticilar", slug: "grosoft-ctn",
        name: "Grosoft CTN", ionic_type: "cationic",
        title_tr: "Grosoft CTN", title_en: "Grosoft CTN", title_fr: "Grosoft CTN", title_ar: "Grosoft CTN",
        description_tr: "Katyonik yumuşatıcı. Pamuk ve karışımlarında doğal tuşe.",
        description_en: "Cationic softener. Natural hand feel on cotton and blends.",
        description_fr: "Adoucissant cationique. Toucher naturel sur coton.",
        description_ar: "منعم كاتيوني. ملمس طبيعي على القطن.",
        image_url: "/images/softeners.png", is_featured: false
    },
    {
        id: "34", category_id: "yumusaticilar", subgroup_id: "silikonsuz-yumusaticilar", slug: "grosoft-trk",
        name: "Grosoft TRK", ionic_type: "cationic",
        title_tr: "Grosoft TRK", title_en: "Grosoft TRK", title_fr: "Grosoft TRK", title_ar: "Grosoft TRK",
        description_tr: "Trikotaj kumaşlar için özel yumuşatıcı. Sürtünme haslığını artırır.",
        description_en: "Softener for knitted fabrics. Improves rubbing fastness.",
        description_fr: "Adoucissant pour tricots. Améliore la solidité.",
        description_ar: "منعم للأقمشة المحبوكة.",
        image_url: "/images/softeners.png", is_featured: false
    },

    // ══════════════════════════════════════════════
    // ENZİMLER → Grozyme
    // ══════════════════════════════════════════════
    {
        id: "35", category_id: "enzimler", subgroup_id: "enzim-cesitleri", slug: "grozyme-aml",
        name: "Grozyme AML", ionic_type: undefined,
        title_tr: "Grozyme AML", title_en: "Grozyme AML", title_fr: "Grozyme AML", title_ar: "Grozyme AML",
        description_tr: "Amilaz enzimi. Haşıl sökme proseslerinde nişasta parçalama.",
        description_en: "Amylase enzyme. Starch breakdown in desizing processes.",
        description_fr: "Enzyme amylase. Dégradation de l'amidon.",
        description_ar: "إنزيم الأميليز. تحلل النشا.",
        image_url: "/images/enzymes.png", is_featured: true
    },
    {
        id: "36", category_id: "enzimler", subgroup_id: "enzim-cesitleri", slug: "grozyme-cel",
        name: "Grozyme CEL", ionic_type: undefined,
        title_tr: "Grozyme CEL", title_en: "Grozyme CEL", title_fr: "Grozyme CEL", title_ar: "Grozyme CEL",
        description_tr: "Selülaz enzimi. Biopolishing ve denim yıkama efektleri.",
        description_en: "Cellulase enzyme. Biopolishing and denim wash effects.",
        description_fr: "Enzyme cellulase. Bio-polissage et effets denim.",
        description_ar: "إنزيم السيلولاز. التلميع الحيوي وتأثيرات الدنيم.",
        image_url: "/images/enzymes.png", is_featured: false
    },
    {
        id: "37", category_id: "enzimler", subgroup_id: "enzim-cesitleri", slug: "grozyme-lac",
        name: "Grozyme LAC", ionic_type: undefined,
        title_tr: "Grozyme LAC", title_en: "Grozyme LAC", title_fr: "Grozyme LAC", title_ar: "Grozyme LAC",
        description_tr: "Lakkaz enzimi. Denim indigo dekolorizasyonu. Çevre dostu ağartma.",
        description_en: "Laccase enzyme. Denim indigo decolorization. Eco-friendly bleaching.",
        description_fr: "Enzyme laccase. Décoloration de l'indigo.",
        description_ar: "إنزيم اللاكاز. إزالة لون الإنديغو.",
        image_url: "/images/enzymes.png", is_featured: false
    },
    {
        id: "38", category_id: "enzimler", subgroup_id: "enzim-cesitleri", slug: "grozyme-pec",
        name: "Grozyme PEC", ionic_type: undefined,
        title_tr: "Grozyme PEC", title_en: "Grozyme PEC", title_fr: "Grozyme PEC", title_ar: "Grozyme PEC",
        description_tr: "Pektinaz enzimi. Pamuk ön işleminde doğal pektin uzaklaştırma.",
        description_en: "Pectinase enzyme. Natural pectin removal in cotton pretreatment.",
        description_fr: "Enzyme pectinase. Élimination de la pectine.",
        description_ar: "إنزيم البكتيناز. إزالة البكتين.",
        image_url: "/images/enzymes.png", is_featured: false
    },

    // ══════════════════════════════════════════════
    // APRE → Kenar Kolalar (Grofab)
    // ══════════════════════════════════════════════
    {
        id: "39", category_id: "apre", subgroup_id: "kenar-kolalar", slug: "grofab-pv",
        name: "Grofab PV", ionic_type: "nonionic",
        title_tr: "Grofab PV", title_en: "Grofab PV", title_fr: "Grofab PV", title_ar: "Grofab PV",
        description_tr: "Toz kenar kola. PVA bazlı, hızlı kuruyan.",
        description_en: "Powder edge hardener. PVA-based, fast-drying.",
        description_fr: "Durcisseur de bords en poudre.",
        description_ar: "مقوي حواف مسحوق.",
        image_url: "/images/finishing.png", is_featured: false
    },
    {
        id: "40", category_id: "apre", subgroup_id: "kenar-kolalar", slug: "grofab-liq",
        name: "Grofab LIQ", ionic_type: "nonionic",
        title_tr: "Grofab LIQ", title_en: "Grofab LIQ", title_fr: "Grofab LIQ", title_ar: "Grofab LIQ",
        description_tr: "Sıvı kenar kola. Kolay uygulama, şeffaf kuruma.",
        description_en: "Liquid edge hardener. Easy application, transparent drying.",
        description_fr: "Durcisseur de bords liquide.",
        description_ar: "مقوي حواف سائل.",
        image_url: "/images/finishing.png", is_featured: false
    },

    // APRE → Fonksiyonel Apreler (Grofix)
    {
        id: "41", category_id: "apre", subgroup_id: "fonksiyonel-apreler", slug: "grofix-wrp",
        name: "Grofix WRP", ionic_type: "nonionic",
        title_tr: "Grofix WRP", title_en: "Grofix WRP", title_fr: "Grofix WRP", title_ar: "Grofix WRP",
        description_tr: "Su itici (water repellent) apre. C6 fluorokarbon bazlı.",
        description_en: "Water repellent finishing agent. C6 fluorocarbon-based.",
        description_fr: "Agent hydrofuge. Base fluorocarbone C6.",
        description_ar: "عامل طارد للماء. أساس فلوروكربون C6.",
        image_url: "/images/finishing.png", is_featured: true
    },
    {
        id: "42", category_id: "apre", subgroup_id: "fonksiyonel-apreler", slug: "grofix-flm",
        name: "Grofix FLM", ionic_type: "nonionic",
        title_tr: "Grofix FLM", title_en: "Grofix FLM", title_fr: "Grofix FLM", title_ar: "Grofix FLM",
        description_tr: "Alev geciktirici apre. Halojensiz, REACH uyumlu.",
        description_en: "Flame retardant finish. Halogen-free, REACH compliant.",
        description_fr: "Finition ignifuge. Sans halogène.",
        description_ar: "تشطيب مثبط للهب. خالٍ من الهالوجين.",
        image_url: "/images/finishing.png", is_featured: false
    },
    {
        id: "43", category_id: "apre", subgroup_id: "fonksiyonel-apreler", slug: "grofix-anb",
        name: "Grofix ANB", ionic_type: "nonionic",
        title_tr: "Grofix ANB", title_en: "Grofix ANB", title_fr: "Grofix ANB", title_ar: "Grofix ANB",
        description_tr: "Antibakteriyel apre. Gümüş iyon bazlı, kalıcı etki.",
        description_en: "Antibacterial finish. Silver ion-based, lasting effect.",
        description_fr: "Finition antibactérienne. Base ions d'argent.",
        description_ar: "تشطيب مضاد للبكتيريا. أساس أيونات الفضة.",
        image_url: "/images/finishing.png", is_featured: false
    },

    // APRE → Antistatik (Grostat)
    {
        id: "44", category_id: "apre", subgroup_id: "antistatik", slug: "grostat-plf",
        name: "Grostat PLF", ionic_type: "cationic",
        title_tr: "Grostat PLF", title_en: "Grostat PLF", title_fr: "Grostat PLF", title_ar: "Grostat PLF",
        description_tr: "Katyonik antistatik apre. Sentetik kumaşlarda statik elektrik önleme.",
        description_en: "Cationic antistatic finishing agent. Static prevention for synthetics.",
        description_fr: "Agent antistatique cationique.",
        description_ar: "عامل مضاد للكهرباء الساكنة الكاتيوني.",
        image_url: "/images/finishing.png", is_featured: false
    },

    // ══════════════════════════════════════════════
    // ARITMA → Flokülasyon & Koagülasyon (Growat)
    // ══════════════════════════════════════════════
    {
        id: "45", category_id: "aritma", subgroup_id: "flokkulan-koagulan", slug: "growat-flk",
        name: "Growat FLK", ionic_type: "anionic",
        title_tr: "Growat FLK", title_en: "Growat FLK", title_fr: "Growat FLK", title_ar: "Growat FLK",
        description_tr: "Anyonik polielektrolit flokülant. Tekstil atıksuyunda askıdaki katı maddelerin çöktürülmesi.",
        description_en: "Anionic polyelectrolyte flocculant. Settling suspended solids in textile wastewater.",
        description_fr: "Floculant polyélectrolyte anionique pour eaux usées textiles.",
        description_ar: "ملبد بولي إلكتروليت أنيوني لمياه الصرف النسيجية.",
        image_url: "/images/water-treatment.png", is_featured: true
    },
    {
        id: "46", category_id: "aritma", subgroup_id: "flokkulan-koagulan", slug: "growat-cog",
        name: "Growat COG", ionic_type: "cationic",
        title_tr: "Growat COG", title_en: "Growat COG", title_fr: "Growat COG", title_ar: "Growat COG",
        description_tr: "Katyonik koagülant. Boyahane atıksuyunda hızlı flok oluşumu ve çöktürme.",
        description_en: "Cationic coagulant. Rapid floc formation and settling in dyehouse wastewater.",
        description_fr: "Coagulant cationique. Formation rapide de flocs.",
        description_ar: "مخثر كاتيوني. تكوين سريع للندف في مياه صرف المصبغة.",
        image_url: "/images/water-treatment.png", is_featured: false
    },
    {
        id: "47", category_id: "aritma", subgroup_id: "flokkulan-koagulan", slug: "growat-pac",
        name: "Growat PAC", ionic_type: "cationic",
        title_tr: "Growat PAC", title_en: "Growat PAC", title_fr: "Growat PAC", title_ar: "Growat PAC",
        description_tr: "Polialüminyum klorür bazlı koagülant. Geniş pH aralığında etkili, düşük çamur hacmi.",
        description_en: "Polyaluminum chloride coagulant. Effective across wide pH range, low sludge volume.",
        description_fr: "Coagulant à base de polychlorure d'aluminium.",
        description_ar: "مخثر كلوريد بولي ألومنيوم. فعال في نطاق واسع.",
        image_url: "/images/water-treatment.png", is_featured: false
    },
    {
        id: "48", category_id: "aritma", subgroup_id: "flokkulan-koagulan", slug: "growat-flk-cons",
        name: "Growat FLK Cons", ionic_type: "anionic",
        title_tr: "Growat FLK Cons", title_en: "Growat FLK Cons", title_fr: "Growat FLK Cons", title_ar: "Growat FLK Cons",
        description_tr: "Konsantre flokülant. Yüksek molekül ağırlıklı, düşük dozla maksimum performans.",
        description_en: "Concentrated flocculant. High molecular weight, maximum performance at low dosage.",
        description_fr: "Floculant concentré. Haut poids moléculaire.",
        description_ar: "ملبد مركز. وزن جزيئي عالي، أداء أقصى بجرعة منخفضة.",
        image_url: "/images/water-treatment.png", is_featured: false
    },

    // ARITMA → Renk Giderme & Dekolorizasyon (Growat)
    {
        id: "49", category_id: "aritma", subgroup_id: "renk-giderme", slug: "growat-dcl",
        name: "Growat DCL", ionic_type: "cationic",
        title_tr: "Growat DCL", title_en: "Growat DCL", title_fr: "Growat DCL", title_ar: "Growat DCL",
        description_tr: "Katyonik renk giderici. Reaktif ve direkt boya atıksularında yüksek renk giderme oranı.",
        description_en: "Cationic decolorizer. High color removal rate for reactive and direct dye wastewater.",
        description_fr: "Décolorant cationique. Élimination efficace des colorants réactifs.",
        description_ar: "مزيل لون كاتيوني. معدل عالٍ لإزالة لون مياه الصرف.",
        image_url: "/images/water-treatment.png", is_featured: true
    },
    {
        id: "50", category_id: "aritma", subgroup_id: "renk-giderme", slug: "growat-dcl-cons",
        name: "Growat DCL Cons", ionic_type: "cationic",
        title_tr: "Growat DCL Cons", title_en: "Growat DCL Cons", title_fr: "Growat DCL Cons", title_ar: "Growat DCL Cons",
        description_tr: "Konsantre renk giderici. %50 aktif madde, düşük dozda etkili dekolorizasyon.",
        description_en: "Concentrated decolorizer. 50% active content, effective decolorization at low dosage.",
        description_fr: "Décolorant concentré. 50% de matière active.",
        description_ar: "مزيل لون مركز. 50% مادة فعالة.",
        image_url: "/images/water-treatment.png", is_featured: false
    },
    {
        id: "51", category_id: "aritma", subgroup_id: "renk-giderme", slug: "growat-oxi",
        name: "Growat OXI", ionic_type: undefined,
        title_tr: "Growat OXI", title_en: "Growat OXI", title_fr: "Growat OXI", title_ar: "Growat OXI",
        description_tr: "Oksidatif renk giderici. İleri oksidasyon ile dirençli boyaların parçalanması.",
        description_en: "Oxidative decolorizer. Advanced oxidation for breaking down resistant dyes.",
        description_fr: "Décolorant oxydatif. Oxydation avancée des colorants résistants.",
        description_ar: "مزيل لون تأكسدي. أكسدة متقدمة لتحلل الأصباغ المقاومة.",
        image_url: "/images/water-treatment.png", is_featured: false
    },
    {
        id: "52", category_id: "aritma", subgroup_id: "renk-giderme", slug: "growat-phc",
        name: "Growat PHC", ionic_type: undefined,
        title_tr: "Growat PHC", title_en: "Growat PHC", title_fr: "Growat PHC", title_ar: "Growat PHC",
        description_tr: "pH düzenleyici. Arıtma prosesinde optimum pH dengesi, nötralizasyon.",
        description_en: "pH adjuster. Optimal pH balance and neutralization in treatment processes.",
        description_fr: "Régulateur de pH. Équilibre optimal du pH.",
        description_ar: "منظم الأس الهيدروجيني. توازن مثالي في عمليات المعالجة.",
        image_url: "/images/water-treatment.png", is_featured: false
    },
];
