const fs = require('fs');
const path = require('path');

const newChemicals = [
    {
        id: "chem-15",
        slug: "sulfurik-asit",
        cas_number: "7664-93-9",
        formula: "H2SO4",
        category: "general",
        name_tr: "Sülfürik Asit",
        name_en: "Sulfuric Acid",
        name_fr: "Acide Sulfurique",
        name_ar: "حمض الكبريتيك",
        description_tr: "Sülfürik asit, dünyada en çok üretilen ve sanayinin her alanında (gübre, petrol rafinasyonu, atıksu arıtma) temel girdi olarak kullanılan son derece güçlü bir mineral asididir.",
        description_en: "Sulfuric acid is the most widely produced chemical in the world, used as a fundamental input in almost all industries (fertilizers, petroleum refining, wastewater treatment).",
        description_fr: "L'acide sulfurique est le produit chimique le plus produit au monde, utilisé comme intrant fondamental dans presque toutes les industries.",
        description_ar: "حمض الكبريتيك هو المادة الكيميائية الأكثر إنتاجًا في العالم، ويستخدم كمدخل أساسي في جميع الصناعات تقريبًا.",
        usage_areas_tr: ["Gübre Üretimi", "Atıksu Arıtma", "Petrol Rafinasyonu", "Akü Sıvısı"],
        usage_areas_en: ["Fertilizer Production", "Wastewater Treatment", "Petroleum Refining", "Battery Acid"],
        usage_areas_fr: ["Production d'engrais", "Traitement des eaux usées", "Raffinage du pétrole", "Acide de batterie"],
        usage_areas_ar: ["إنتاج الأسمدة", "معالجة مياه الصرف الصحي", "تكرير البترول", "حمض البطارية"],
        ec_number: "231-639-5",
        molecular_weight: "98.08",
        synonyms_tr: "SÜLFÜRİK ASİT=Zaç yağı=Hidrojen sülfat",
        synonyms_en: "SULFURIC ACID=Oil of vitriol=Hydrogen sulfate",
        synonyms_fr: "ACIDE SULFURIQUE=Huile de vitriol=Sulfate d'hydrogène",
        synonyms_ar: "حمض الكبريتيك=زيت الزاج=كبريتات الهيدروجين",
        definition_tr: [
            "Sülfürik asit (H2SO4), oda sıcaklığında renksiz, yağımsı, son derece aşındırıcı (korozif) ve ağır bir sıvıdır.",
            "Dünya kimya endüstrisinin hacimsel olarak bir numaralı ürünüdür; öyle ki bir ülkenin sanayileşme seviyesi sülfürik asit tüketimiyle ölçülebilir.",
            "Suda çözündüğünde muazzam miktarda ısı açığa çıkarır (ekzotermik reaksiyon), bu nedenle asit daima yavaşça suya eklenmeli, asla su asite eklenmemelidir."
        ],
        definition_en: [
            "Sulfuric acid (H2SO4) is a colorless, oily, extremely corrosive, and heavy liquid at room temperature.",
            "It is the number one product of the global chemical industry by volume; so much so that a nation's industrialization level can be measured by its sulfuric acid consumption.",
            "It releases an enormous amount of heat when dissolved in water (exothermic reaction), therefore acid must always be slowly added to water, never water to acid."
        ],
        definition_fr: [
            "L'acide sulfurique (H2SO4) est un liquide incolore, huileux, extrêmement corrosif et lourd à température ambiante.",
            "C'est le produit numéro un de l'industrie chimique mondiale en volume.",
            "Il libère une énorme quantité de chaleur lorsqu'il est dissous dans l'eau (réaction exothermique)."
        ],
        definition_ar: [
            "حمض الكبريتيك (H2SO4) سائل عديم اللون وزيتي ومسبب للتآكل بشدة وثقيل في درجة حرارة الغرفة.",
            "إنه المنتج الأول في الصناعة الكيميائية العالمية من حيث الحجم.",
            "يطلق كمية هائلة من الحرارة عند إذابته في الماء (تفاعل طارد للحرارة)."
        ],
        uses_benefits_tr: [
            "Güçlü bir dehidrasyon (su çekici) ajanıdır; şeker, kağıt ve pamuk gibi karbonhidrat bazlı maddelerle temas ettiğinde içlerindeki suyu anında emerek karbonlaşmalarını sağlar.",
            "Endüstriyel atıksu arıtma tesislerinde aşırı bazik (yüksek pH'lı) suların pH'ını nötralize etmek için kullanılır."
        ],
        applications_tr: [
            "Fosfatlı gübrelerin (özellikle süperfosfat) üretiminde inorganik kayaların çözülmesinde ana kimyasaldır.",
            "Otomobil akülerinde elektrolit (akü sıvısı) olarak %33 konsantrasyonda kullanılır.",
            "Çelik sanayisinde metallerin yüzeyindeki oksitlerin ve pasların temizlenmesi (dekapaj/pickling) işlemlerinde yoğun tüketilir."
        ],
        uses_benefits_en: [
            "It is a strong dehydrating agent; when in contact with carbohydrate-based materials like sugar, paper, and cotton, it instantly absorbs their water, causing them to carbonize.",
            "Used to neutralize highly basic (high pH) water in industrial wastewater treatment plants."
        ],
        applications_en: [
            "The main chemical used to dissolve inorganic rocks in the production of phosphate fertilizers (especially superphosphate).",
            "Used as the electrolyte (battery acid) in automobile lead-acid batteries at ~33% concentration.",
            "Heavily consumed in the steel industry for cleaning oxides and rust from metal surfaces (pickling)."
        ]
    },
    {
        id: "chem-16",
        slug: "gliserin",
        cas_number: "56-81-5",
        formula: "C3H8O3",
        category: "general",
        name_tr: "Gliserin",
        name_en: "Glycerin",
        name_fr: "Glycérine",
        name_ar: "الجلسرين",
        description_tr: "Gliserin, bitkisel ve hayvansal yağlardan elde edilen şurup kıvamında, tatlı, nem tutucu (higroskopik) organik bir bileşiktir. Kozmetikte ve gıdada yoğun olarak kullanılır.",
        description_en: "Glycerin is a syrupy, sweet, moisture-retaining (hygroscopic) organic compound derived from plant and animal fats. It is heavily used in cosmetics and food.",
        description_fr: "La glycérine est un composé organique visqueux, doux et hygroscopique dérivé de graisses végétales et animales.",
        description_ar: "الجلسرين مركب عضوي لزج وحلو ومحتفظ بالرطوبة مشتق من الدهون النباتية والحيوانية.",
        usage_areas_tr: ["Kozmetik ve Cilt Bakımı", "Gıda Tatlandırıcısı", "İlaç Sanayisi", "Antifriz (Geçmişte)"],
        usage_areas_en: ["Cosmetics and Skincare", "Food Sweetener", "Pharmaceuticals", "Antifreeze (Historical)"],
        usage_areas_fr: ["Cosmétiques et Soins de la peau", "Édulcorant alimentaire", "Produits pharmaceutiques", "Antigel (Historique)"],
        usage_areas_ar: ["مستحضرات التجميل والعناية بالبشرة", "محلي غذائي", "الأدوية", "مضاد التجمد (تاريخي)"],
        ec_number: "200-289-5",
        molecular_weight: "92.09",
        synonyms_tr: "GLİSERİN=Gliserol=1,2,3-propantriol",
        synonyms_en: "GLYCERIN=Glycerol=1,2,3-Propanetriol",
        definition_tr: [
            "Gliserin (veya gliserol), renksiz, kokusuz, viskoz (kıvamlı) ve toksik olmayan poliol (alkol) yapılı bir sıvıdır.",
            "Havadaki nemi emme özelliği (higroskopik) sayesinde kozmetik sektöründe cildin nem bariyerini koruyan en önemli aktif maddedir.",
            "Günümüzde biyodizel üretim süreçlerinde yan ürün olarak devasa miktarlarda sentezlenmektedir."
        ],
        definition_en: [
            "Glycerin (or glycerol) is a colorless, odorless, viscous, and non-toxic polyol (alcohol) structured liquid.",
            "Thanks to its ability to absorb moisture from the air (hygroscopic), it is the most important active ingredient in the cosmetics industry for protecting the skin's moisture barrier.",
            "Today, it is synthesized in massive quantities as a byproduct in biodiesel production processes."
        ],
        uses_benefits_tr: [
            "Kozmetik ürünlerde cildi derinlemesine nemlendirir, esnekliğini artırır ve kuruluğu engeller.",
            "Sulu çözeltilerinin donma noktası çok düşük olduğu için kış aylarında koruyucu bir tabaka veya antifriz ajanı olarak kullanılabilir."
        ],
        applications_tr: [
            "Gıda sektöründe (E422) fırıncılık ürünlerinin çabuk bayatlamasını ve kurumasını engellemek için hümektan olarak kullanılır.",
            "Dudak kremleri, el losyonları, tıraş köpükleri ve sabunlarda pürüzsüzleştirici baz maddedir.",
            "Tıp ve ilaç endüstrisinde öksürük şuruplarının, fitillerin (suppozituvar) ve kapsüllerin üretiminde tatlandırıcı ve hacim verici olarak kullanılır."
        ],
        uses_benefits_en: [
            "Deeply moisturizes the skin in cosmetic products, increases its elasticity, and prevents dryness.",
            "Since the freezing point of its aqueous solutions is very low, it can be used as a protective layer or antifreeze agent in winter."
        ],
        applications_en: [
            "Used as a humectant in the food industry (E422) to prevent bakery products from quickly going stale and drying out.",
            "A smoothing base ingredient in lip balms, hand lotions, shaving creams, and soaps.",
            "Used in the medical and pharmaceutical industry as a sweetener and bulking agent in the production of cough syrups, suppositories, and capsules."
        ]
    },
    {
        id: "chem-17",
        slug: "sodyum-bikarbonat",
        cas_number: "144-55-8",
        formula: "NaHCO3",
        category: "general",
        name_tr: "Sodyum Bikarbonat",
        name_en: "Sodium Bicarbonate",
        name_fr: "Bicarbonate de Sodium",
        name_ar: "بيكربونات الصوديوم",
        description_tr: "Sodyum bikarbonat, yaygın adıyla karbonat veya kabartma tozu; gıda, temizlik ve sağlık sektörlerinde kullanılan beyaz, suda çözünebilen hafif alkali bir tozdur.",
        description_en: "Sodium bicarbonate, commonly known as baking soda, is a white, water-soluble, mildly alkaline powder used in the food, cleaning, and health sectors.",
        description_fr: "Le bicarbonate de sodium, communément appelé bicarbonate de soude, est une poudre blanche alcaline soluble dans l'eau.",
        description_ar: "بيكربونات الصوديوم، والمعروفة باسم صودا الخبز، عبارة عن مسحوق قلوي أبيض قابل للذوبان في الماء.",
        usage_areas_tr: ["Gıda ve Kabartma Tozları", "Koku Giderici", "Diş ve Kişisel Bakım", "Yangın Söndürücüler"],
        usage_areas_en: ["Food and Baking Powder", "Odor Absorber", "Dental and Personal Care", "Fire Extinguishers"],
        usage_areas_fr: ["Alimentation et levure chimique", "Absorbeur d'odeurs", "Soins dentaires", "Extincteurs"],
        usage_areas_ar: ["الأغذية ومسحوق الخبز", "مزيل الرائحة", "العناية بالأسنان", "طفايات الحريق"],
        ec_number: "205-633-8",
        molecular_weight: "84.01",
        synonyms_tr: "SODYUM BİKARBONAT=Karbonat=Kabartma tozu=Sodyum hidrojen karbonat",
        synonyms_en: "SODIUM BICARBONATE=Baking soda=Sodium hydrogen carbonate",
        definition_tr: [
            "Sodyum bikarbonat (NaHCO3), hafif asidik ortamlarda reaksiyona girerek karbondioksit gazı (CO2) açığa çıkaran ince kristal yapılı inorganik bir tuzdur.",
            "Asitlerle nötralizasyon reaksiyonuna girmesi onu mükemmel bir pH dengeleyici ve temizleyici yapar.",
            "Trona mineralinden elde edilebilir veya endüstriyel olarak Solvay prosesinin bir ara ürünü olarak sentezlenir."
        ],
        definition_en: [
            "Sodium bicarbonate (NaHCO3) is a fine crystalline inorganic salt that releases carbon dioxide gas (CO2) upon reacting in mildly acidic environments.",
            "Its ability to undergo neutralization reactions with acids makes it an excellent pH balancer and cleaner.",
            "It can be derived from the mineral trona or industrially synthesized as an intermediate product of the Solvay process."
        ],
        uses_benefits_tr: [
            "Kötü kokulara neden olan asidik molekülleri nötralize ederek hapsedici (koku giderici) etki gösterir.",
            "Sıcaklık gördüğünde veya aside maruz kaldığında karbondioksit gazı üreterek hamurun kabarmasını sağlar."
        ],
        applications_tr: [
            "Fırıncılık ürünlerinde (kek, ekmek) E500(ii) koduyla asıl kabartıcı ajan olarak kullanılır.",
            "Ev yapımı doğal temizlik deterjanlarında, halı ve buzdolabı kokularının giderilmesinde aktif maddedir.",
            "Tıpta asit hazımsızlığı ve mide ekşimesini gidermek (antasit) için ilaç formülasyonlarına eklenir.",
            "Kuru kimyevi tozlu (BC tipi) yangın söndürme tüplerinin temel bileşenidir."
        ],
        uses_benefits_en: [
            "Exhibits a trapping (odor-removing) effect by neutralizing acidic molecules that cause bad odors.",
            "Causes dough to rise by producing carbon dioxide gas when exposed to heat or acid."
        ],
        applications_en: [
            "Used as the primary leavening agent in bakery products (cake, bread) under the code E500(ii).",
            "The active ingredient in homemade natural cleaning detergents and for removing carpet and refrigerator odors.",
            "Added to pharmaceutical formulations in medicine to relieve acid indigestion and heartburn (antacid).",
            "A key component of dry chemical powder (BC type) fire extinguishers."
        ]
    },
    {
        id: "chem-18",
        slug: "karbon-siyahi",
        cas_number: "1333-86-4",
        formula: "C",
        category: "general",
        name_tr: "Karbon Siyahı",
        name_en: "Carbon Black",
        name_fr: "Noir de Carbone",
        name_ar: "أسود الكربون",
        description_tr: "Karbon siyahı, ağır petrol ürünlerinin eksik yanmasıyla elde edilen ince toz halinde bir maddedir. Lastik sektöründe güçlendirici ve mürekkep sektöründe siyah pigment olarak devasa miktarlarda tüketilir.",
        description_en: "Carbon black is a fine powder substance obtained by the incomplete combustion of heavy petroleum products. It is consumed in massive quantities as a reinforcing agent in tires and a black pigment in inks.",
        description_fr: "Le noir de carbone est une fine poudre obtenue par combustion incomplète de produits pétroliers lourds.",
        description_ar: "أسود الكربون مادة مسحوقية ناعمة يتم الحصول عليها عن طريق الاحتراق غير الكامل للمنتجات البترولية الثقيلة.",
        usage_areas_tr: ["Otomobil Lastikleri", "Plastik Siyahlaştırma", "Mürekkep ve Boyalar", "Kablolar ve Kauçuk"],
        usage_areas_en: ["Automobile Tires", "Plastic Blackening", "Inks and Paints", "Cables and Rubber"],
        usage_areas_fr: ["Pneus", "Plastiques", "Encres et Peintures", "Caoutchouc"],
        usage_areas_ar: ["إطارات السيارات", "تسويد البلاستيك", "الأحبار والدهانات", "المطاط"],
        ec_number: "215-609-9",
        molecular_weight: "12.01",
        synonyms_tr: "KARBON SİYAHI=İs=Fırın siyahı=Lamba siyahı",
        synonyms_en: "CARBON BLACK=Furnace black=Lamp black",
        definition_tr: [
            "Karbon siyahı (C), büyük ölçüde elementel karbondan oluşan ancak yüksek yüzey alanı hacim oranına sahip, saf siyah renkte ince mikroskobik parçacıklardır.",
            "Oksijenin kısıtlı tutulduğu özel fırınlarda hidrokarbonların (petrol, kömür katranı) yakılmasıyla 'Furnace Black' prosesi kullanılarak sentezlenir.",
            "İsten veya kömürden çok farklıdır; tamamen mühendislik hesaplamalarıyla boyutları ve yüzey aktivitesi belirlenmiş fonksiyonel bir malzemedir."
        ],
        definition_en: [
            "Carbon black (C) consists of fine microscopic particles largely composed of elemental carbon but with a high surface-area-to-volume ratio, in a pure black color.",
            "It is synthesized using the 'Furnace Black' process by burning hydrocarbons (petroleum, coal tar) in special furnaces where oxygen is restricted.",
            "It is very different from soot or coal; it is a functional material whose dimensions and surface activity are determined entirely by engineering calculations."
        ],
        uses_benefits_tr: [
            "Kauçuk polimer zincirleriyle çapraz bağ kurarak mekanik dayanıklılığı, aşınma direncini ve yırtılma mukavemetini olağanüstü derecede artırır.",
            "Plastik borularda (örn: damlama sulama boruları) UV ışınlarını bloke ederek plastiğin güneş altında çatlamasını önler."
        ],
        applications_tr: [
            "Dünyada üretilen karbon siyahının %70'inden fazlası otomobil ve uçak lastiklerinde güçlendirici dolgu maddesi olarak kullanılır.",
            "Fotokopi ve yazıcı tonerlerinde (mürekkep kartuşları) siyah rengi veren ana pigmenttir.",
            "Otomotiv hortumları, sızdırmazlık contaları ve endüstriyel taşıma bantları (konveyör) gibi kauçuk türevlerinde ana katkı maddesidir."
        ],
        uses_benefits_en: [
            "Extraordinarily increases mechanical durability, abrasion resistance, and tear strength by cross-linking with rubber polymer chains.",
            "Blocks UV rays in plastic pipes (e.g., drip irrigation pipes) to prevent the plastic from cracking under the sun."
        ],
        applications_en: [
            "Over 70% of the carbon black produced globally is used as a reinforcing filler in automobile and aircraft tires.",
            "It is the main pigment that gives the black color in photocopier and printer toners (ink cartridges).",
            "The main additive in rubber derivatives such as automotive hoses, sealing gaskets, and industrial conveyor belts."
        ]
    }
];

const dbPath = path.join(__dirname, '../src/data/chemicals.json');
const currentData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Check for duplicates before appending
const existingSlugs = currentData.map(c => c.slug);
const safeNewChemicals = newChemicals.filter(c => !existingSlugs.includes(c.slug));

const mergedData = [...currentData, ...safeNewChemicals];

fs.writeFileSync(dbPath, JSON.stringify(mergedData, null, 4), 'utf8');

console.log(`src/data/chemicals.json updated successfully. Added ${safeNewChemicals.length} items. Now contains ${mergedData.length} heavy chemicals!`);
