const fs = require('fs');
const path = require('path');

const newChemicals = [
    {
        id: "chem-62",
        slug: "monoetanolamin-mea",
        cas_number: "141-43-5",
        formula: "C2H7NO",
        category: "general",
        name_tr: "Monoetanolamin (MEA)",
        name_en: "Monoethanolamine (MEA)",
        name_fr: "Monoéthanalomine (MEA)",
        name_ar: "مونو إيثانول أمين (MEA)",
        description_tr: "MEA, gaz arıtma proseslerinde karbondioksit ve hidrojen sülfürü yakalamak için, ayrıca deterjan, sabun ve tarım ilacı formülasyonlarında yaygın olarak kullanılan organik bir amindir.",
        description_en: "MEA is an organic amine widely used in gas treating processes to capture carbon dioxide and hydrogen sulfide, as well as in detergent, soap, and agrochemical formulations.",
        description_fr: "La MEA est une amine organique largement utilisée dans les procédés de traitement des gaz pour capter le dioxyde de carbone et le sulfure d'hydrogène, ainsi que dans les formulations de détergents.",
        description_ar: "مونو إيثانول أمين هو أمين عضوي يستخدم على نطاق واسع في عمليات معالجة الغاز لالتقاط ثاني أكسيد الكربون وكبريتيد الهيدروجين، وكذلك في تركيبات المنظفات والصابون.",
        usage_areas_tr: ["Gaz Arıtma (CO2/H2S Alımı)", "Deterjan ve Kozmetik", "Tarımsal Kimyasallar", "Metal İşleme Sıvıları"],
        usage_areas_en: ["Gas Treating (CO2/H2S Scavenging)", "Detergents and Cosmetics", "Agrochemicals", "Metalworking Fluids"],
        usage_areas_fr: ["Traitement des gaz", "Détergents et cosmétiques", "Produits agrochimiques", "Fluides de coupe"],
        usage_areas_ar: ["معالجة الغاز", "المنظفات ومستحضرات التجميل", "الكيماويات الزراعية", "سوائل تشغيل المعادن"],
        ec_number: "205-483-3",
        molecular_weight: "61.08",
        synonyms_tr: "MONOETANOLAMİN=MEA=2-Aminoetanol=Etanolamin",
        synonyms_en: "MONOETHANOLAMINE=MEA=2-Aminoethanol=Ethanolamine",
        synonyms_fr: "MONOÉTHANOLAMINE=MEA=2-Aminoéthanol=Éthanolamine",
        synonyms_ar: "مونو إيثانول أمين=MEA=2-أمينوإيثانول=إيثانولامين",
        definition_tr: [
            "Monoetanolamin (MEA), hem bir birincil amin hem de bir birincil alkol olan bifonksiyonel bir organik bileşiktir.",
            "Renksiz, viskoz ve amonyak benzeri hafif bir kokuya sahip sıvı bir maddedir.",
            "Asidik gazlarla (CO2, H2S) tersinir reaksiyonlar vererek onları solüsyon içinde tutma yeteneğine sahiptir."
        ],
        definition_en: [
            "Monoethanolamine (MEA) is a bifunctional organic compound that is both a primary amine and a primary alcohol.",
            "It is a colorless, viscous liquid with a mild, ammonia-like odor.",
            "It has the ability to undergo reversible reactions with acidic gases (CO2, H2S) to hold them in solution."
        ],
        uses_benefits_tr: [
            "Rafinelerde ve doğalgaz tesislerinde asidik kirleticileri gaz akışından yüksek verimle temizler.",
            "Sürfaktan üretiminde ara madde olarak sabun köpüğü kararlılığını artırır."
        ],
        uses_benefits_en: [
            "Efficiently scrubs acidic contaminants from gas streams in refineries and natural gas plants.",
            "Acts as an intermediate in surfactant manufacturing, enhancing soap foam stability."
        ],
        applications_tr: [
            "Doğalgaz tatlandırma (sweetening) ünitelerinde ve CO2 yakalama (carbon capture) tesislerinde emici solvent olarak.",
            "Kişisel bakım ürünlerinde emülgatör ve pH ayarlayıcı olarak kullanılan kokamid MEA üretiminde."
        ],
        applications_en: [
            "As an absorbent solvent in natural gas sweetening units and carbon dioxide capture plants.",
            "In the production of cocamide MEA, used as an emulsifier and pH adjuster in personal care products."
        ]
    },
    {
        id: "chem-63",
        slug: "sodyum-benzoat",
        cas_number: "532-32-1",
        formula: "C7H5NaO2",
        category: "general",
        name_tr: "Sodyum Benzoat",
        name_en: "Sodium Benzoate",
        name_fr: "Benzoate de Sodium",
        name_ar: "بنزوات الصوديوم",
        description_tr: "Sodyum benzoat, asidik gıdalarda bakteri ve küf gelişimini engellemek için yaygın kullanılan organik bir koruyucudur. Kozmetikte ve endüstriyel korozyon önleyicilerde de yer alır.",
        description_en: "Sodium benzoate is an organic preservative widely used to inhibit bacterial and mold growth in acidic foods. It is also used in cosmetics and industrial corrosion inhibitors.",
        description_fr: "Le benzoate de sodium est un conservateur organique largement utilisé pour inhiber la croissance bactérienne dans les aliments acides.",
        description_ar: "بنزوات الصوديوم هي مادة حافظة عضوية تستخدم على نطاق واسع لمنع نمو البكتيريا والعفن في الأطعمة الحمضية. وتستخدم أيضًا في مستحضرات التجميل.",
        usage_areas_tr: ["Gıda Koruyucu (E211)", "İlaç Endüstrisi", "Korozyon Önleyici", "Kozmetik Koruyucu"],
        usage_areas_en: ["Food Preservative (E211)", "Pharmaceuticals", "Corrosion Inhibitor", "Cosmetic Preservative"],
        usage_areas_fr: ["Conservateur alimentaire (E211)", "Pharmacie", "Inhibiteur de corrosion", "Conservateur cosmétique"],
        usage_areas_ar: ["مادة حافظة للأغذية (E211)", "المستحضرات الصيدلانية", "مانع التآكل", "مادة حافظة لمستحضرات التجميل"],
        ec_number: "208-534-8",
        molecular_weight: "144.10",
        synonyms_tr: "SODYUM BENZOAT=Benzoik asit sodyum tuzu=E211",
        synonyms_en: "SODIUM BENZOATE=Benzoic acid sodium salt=E211",
        synonyms_fr: "BENZOATE DE SODIUM=Sel de sodium de l'acide benzoïque=E211",
        synonyms_ar: "بنزوات الصوديوم=ملح الصوديوم لحمض البنزويك=E211",
        definition_tr: [
            "Sodyum benzoat (C7H5NaO2), benzoik asidin sodyum hidroksit ile nötrleştirilmesiyle üretilen aromatik organik bir tuzdur.",
            "Beyaz kristal veya toz halinde bulunur, suda çok çözünür ve asidik ortamlarda aktif benzoik aside dönüşerek koruma sağlar."
        ],
        definition_en: [
            "Sodium benzoate (C7H5NaO2) is an aromatic organic salt produced by neutralizing benzoic acid with sodium hydroxide.",
            "It is a white crystalline powder, highly soluble in water, converting into active benzoic acid in acidic environments to provide preservation."
        ],
        uses_benefits_tr: [
            "Asidik içeceklerde ve gıdalarda (pH < 4.5) küf ve maya oluşumunu durdurarak raf ömrünü uzatır.",
            "Otomotiv antifrizlerinde metalleri korozyondan korumak amacıyla güvenle kullanılır."
        ],
        uses_benefits_en: [
            "Extends shelf life by preventing mold and yeast formation in acidic beverages and foods (pH < 4.5).",
            "Safely used in automotive antifreezes to protect metals from corrosion."
        ],
        applications_tr: [
            "Gazlı içecekler, meyve suları, turşu ve soslarda koruyucu katkı maddesi olarak.",
            "Tablet ilaçlarda ve öksürük şuruplarında mikrobiyolojik stabiliteyi sağlamak amacıyla."
        ],
        applications_en: [
            "As a preservative additive in carbonated drinks, fruit juices, pickles, and sauces.",
            "To ensure microbiological stability in tablet formulations and cough syrups."
        ]
    },
    {
        id: "chem-64",
        slug: "borik-asit",
        cas_number: "10043-35-3",
        formula: "H3BO3",
        category: "general",
        name_tr: "Borik Asit",
        name_en: "Boric Acid",
        name_fr: "Acide Borique",
        name_ar: "حمض البوريك",
        description_tr: "Borik asit; özel cam, seramik glayörleri ve alev geciktirici üretiminde bor kaynağı olarak kullanılan, hafif antiseptik ve böcek ilacı özelliklerine de sahip zayıf bir asittir.",
        description_en: "Boric acid is a weak acid used as a boron source in the production of specialty glass, ceramic glazes, and flame retardants. It also features mild antiseptic and insecticide properties.",
        description_fr: "L'acide borique est un acide faible utilisé comme source de bore dans la production de verre spécial, de glaçures céramiques et d'ignifuges.",
        description_ar: "حمض البوريك هو حمض ضعيف يستخدم كمصدر للبورون في إنتاج الزجاج الخاص، والطلاء الخزفي، ومؤخرات اللهب. ويتميز أيضًا بخصائص مطهرة خفيفة.",
        usage_areas_tr: ["Cam ve Seramik Üretimi", "Tarım ve Gübre", "Alev Geciktiriciler", "Ahşap Koruma"],
        usage_areas_en: ["Glass and Ceramics", "Agriculture and Fertilizers", "Flame Retardants", "Wood Preservation"],
        usage_areas_fr: ["Verre et céramique", "Agriculture et engrais", "Ignifuges", "Préservation du bois"],
        usage_areas_ar: ["الزجاج والسيراميك", "الزراعة والأسمدة", "مؤخرات اللهب", "حفظ الخشب"],
        ec_number: "233-139-2",
        molecular_weight: "61.83",
        synonyms_tr: "BORİK ASİT=Ortoborik asit=Borasin asit",
        synonyms_en: "BORIC ACID=Orthoboric acid=Boracic acid",
        synonyms_fr: "ACIDE BORIQUE=Acide orthoborique=Acide boracique",
        synonyms_ar: "حمض البوريك=حمض الأرثوبوريك",
        definition_tr: [
            "Borik asit (H3BO3), doğada sassolit minerali olarak bulunan beyaz, kokusuz pulsu kristallerden oluşan inorganik bir bor bileşiğidir.",
            "Su arıtımında, nükleer reaktörlerde nötron yutucu olarak ve çeşitli metalurji işlemlerinde akışkanlaştırıcı (flux) olarak kullanılır."
        ],
        definition_en: [
            "Boric acid (H3BO3) is an inorganic boron compound occurring naturally as the mineral sassolite, consisting of white, odorless, flaky crystals.",
            "It is used in water treatment, as a neutron absorber in nuclear reactors, and as a fluxing agent in metallurgy."
        ],
        uses_benefits_tr: [
            "Cam liflerinin ve borosilikat camların erime sıcaklığını düşürürken ısıya ve kimyasallara karşı direncini artırır.",
            "Bitkilerin bor ihtiyacını karşılayarak çiçek ve meyve gelişimini destekler."
        ],
        uses_benefits_en: [
            "Lowers the melting temperature of glass fibers and borosilicate glass while increasing thermal and chemical resistance.",
            "Meets the boron requirements of plants to support flower and fruit development."
        ],
        applications_tr: [
            "Isıya dayanıklı mutfak camları (Pyrex) ve fiberglas yalıtım malzemeleri üretiminde.",
            "Ahşap malzemeleri mantar ve böcek çürümesine karşı koruyan emprenye solüsyonlarında."
        ],
        applications_en: [
            "In the production of heat-resistant kitchen glass (Pyrex) and fiberglass insulation materials.",
            "In impregnation solutions protecting wood materials against fungal decay and insect attacks."
        ]
    },
    {
        id: "chem-65",
        slug: "polietilen-glikol-peg",
        cas_number: "25322-68-3",
        formula: "H(OCH2CH2)nOH",
        category: "general",
        name_tr: "Polietilen Glikol (PEG)",
        name_en: "Polyethylene Glycol (PEG)",
        name_fr: "Polyéthylène Glycol (PEG)",
        name_ar: "بولي إيثيلين جليكol (PEG)",
        description_tr: "PEG, düşük toksisitesi ve yüksek su çözünürlüğü sayesinde kozmetikte nemlendirici, ilaçta bağlayıcı ve endüstriyel proseslerde yağlayıcı olarak kullanılan çok yönlü bir polimerdir.",
        description_en: "PEG is a versatile polymer used as a moisturizer in cosmetics, a binder in pharmaceuticals, and a lubricant in industrial processes, valued for its low toxicity and high solubility.",
        description_fr: "Le PEG est un polymère polyvalent utilisé comme hydratant dans les cosmétiques, liant dans l'industrie pharmaceutique et lubrifiant.",
        description_ar: "بولي إيثيلين جليكول هو بوليمر متعدد الاستخدامات يستخدم كمرطب في مستحضرات التجميل، ورابط في الأدوية، ومشحم في العمليات الصناعية.",
        usage_areas_tr: ["Kozmetik ve Nemlendirici", "İlaç ve Tablet Kaplama", "Endüstriyel Yağlayıcılar", "Tekstil ve Kağıt"],
        usage_areas_en: ["Cosmetics and Moisturizers", "Pharmaceuticals and Coatings", "Industrial Lubricants", "Textiles and Paper"],
        usage_areas_fr: ["Cosmétiques et hydratants", "Pharmacie et enrobage de comprimés", "Lubrifiants industriels", "Textile et papier"],
        usage_areas_ar: ["مستحضرات التجميل والمرطبات", "الصناعات الدوائية وطلاء الأقراص", "المزلقات الصناعية", "المنسوجات والورق"],
        ec_number: "500-038-2",
        molecular_weight: "Variable (e.g., 400, 1500, 4000, 6000)",
        synonyms_tr: "POLİETİLEN GLİKOL=PEG=Makrogol=Polioksietilen",
        synonyms_en: "POLYETHYLENE GLYCOL=PEG=Macrogol=Polyoxyethylene",
        synonyms_fr: "POLYÉTHYLÈNE GLYCOL=PEG=Macrogol=Polyoxyéthylène",
        synonyms_ar: "بولي إيثيلين جليكول=PEG=ماكروغول=بولي أوكسي إيثيلين",
        definition_tr: [
            "Polietilen glikol (PEG), etilen oksitin polimerizasyonu ile elde edilen polieter yapısında hidrofilik bir polimerdir.",
            "Molekül ağırlığına bağlı olarak berrak bir sıvıdan (PEG-400) sert mumsu bir katıya (PEG-6000) kadar değişen formlarda bulunur."
        ],
        definition_en: [
            "Polyethylene glycol (PEG) is a hydrophilic polyether polymer obtained by the polymerization of ethylene oxide.",
            "Depending on its molecular weight, it is available in forms ranging from a clear liquid (PEG-400) to a hard waxy solid (PEG-6000)."
        ],
        uses_benefits_tr: [
            "Krem ve losyonların viskozitesini düzenler ve cilde nem çeken yapısıyla kuruluğu önler.",
            "İlaç tabletlerinin yutulmasını kolaylaştıran pürüzsüz dış kaplama filmleri oluşturur."
        ],
        uses_benefits_en: [
            "Regulates the viscosity of creams and lotions, preventing dryness with its humectant structure.",
            "Creates smooth outer coating films making pharmaceutical tablets easier to swallow."
        ],
        applications_tr: [
            "Cilt bakım kremleri, diş macunları ve şampuanlarda nem tutucu ve kıvamlaştırıcı ajan olarak.",
            "Tekstil liflerinde yumuşaklık ve antistatik özellik sağlamak amacıyla terbiye işlemlerinde."
        ],
        applications_en: [
            "As a humectant and thickening agent in skin care creams, toothpastes, and shampoos.",
            "In textile finishing processes to provide softness and antistatic properties to fibers."
        ]
    },
    {
        id: "chem-66",
        slug: "sodyum-nitrit",
        cas_number: "7632-00-0",
        formula: "NaNO2",
        category: "general",
        name_tr: "Sodyum Nitrit",
        name_en: "Sodium Nitrite",
        name_fr: "Nitrite de Sodium",
        name_ar: "نيتريت الصوديوم",
        description_tr: "Sodyum nitrit, gıda endüstrisinde şarküteri ürünlerinin korunması ve renk alması için, ayrıca metal işleme, korozyon önleme ve boya sentezinde kullanılan inorganik bir tuzdur.",
        description_en: "Sodium nitrite is an inorganic salt used in the food industry for preserving and coloring cured meats, as well as in metalworking, corrosion inhibition, and dye synthesis.",
        description_fr: "Le nitrite de sodium est un sel inorganique utilisé dans l'industrie alimentaire pour conserver la charcuterie et dans les inhibiteurs de corrosion.",
        description_ar: "نيتريت الصوديوم هو ملح غير عضوي يستخدم في صناعة الأغذية لحفظ وتلوين اللحوم المصنعة، وكذلك في تشغيل المعادن ومنع التآكل وتخليق الأصباغ.",
        usage_areas_tr: ["Gıda Koruyucu (Şarküteri)", "Metal Isıl İşlem", "Boyarmadde Sentezi", "Korozyon İnhibitörü"],
        usage_areas_en: ["Food Preservative (Cured Meats)", "Metal Heat Treatment", "Dye Synthesis", "Corrosion Inhibitor"],
        usage_areas_fr: ["Conservateur (Charcuterie)", "Traitement thermique des métaux", "Synthèse de colorants", "Inhibiteur de corrosion"],
        usage_areas_ar: ["مادة حافظة للأغذية", "المعالجة الحرارية للمعادن", "تخليق الأصباغ", "مانع التآكل"],
        ec_number: "231-555-9",
        molecular_weight: "69.00",
        synonyms_tr: "SODYUM NİTRİT=E250=Nitroz asit sodyum tuzu",
        synonyms_en: "SODIUM NITRITE=E250=Nitrous acid sodium salt",
        synonyms_fr: "NITRITE DE SODIUM=E250=Sel de sodium de l'acide nitreux",
        synonyms_ar: "نيتريت الصوديوم=E250=ملح الصوديوم لحمض النيتروز",
        definition_tr: [
            "Sodyum nitrit (NaNO2), beyaz veya hafif sarımsı kristal formda bulunan, havadan nem çekebilen güçlü bir oksitleyici inorganik bileşiktir.",
            "Endüstride azot oksit gazlarının sodyum karbonat veya sodyum hidroksit çözeltisinden geçirilmesiyle elde edilir."
        ],
        definition_en: [
            "Sodium nitrite (NaNO2) is a strong oxidizing inorganic compound in the form of white or slightly yellowish crystals that can absorb moisture from the air.",
            "Industrially, it is obtained by passing nitrogen oxide gases through sodium carbonate or sodium hydroxide solutions."
        ],
        uses_benefits_tr: [
            "Et ürünlerinde ölümcül botulizm bakterisinin (Clostridium botulinum) üremesini güçlü şekilde bloke eder.",
            "Demir ve çelik yüzeylerde koruyucu bir pasif katman oluşturarak metal korozyonunu geciktirir."
        ],
        uses_benefits_en: [
            "Strongly blocks the growth of lethal botulism bacteria (Clostridium botulinum) in meat products.",
            "Delays metal corrosion by creating a protective passive layer on iron and steel surfaces."
        ],
        applications_tr: [
            "Sosis, salam ve pastırma gibi şarküteri ürünlerinde koruyucu ve renk sabitleyici (E250) olarak.",
            "Azo boyarmaddelerinin eldesinde kullanılan diazo bileşiklerinin sentezlenmesinde."
        ],
        applications_en: [
            "As a preservative and color fixative (E250) in cured meat products like sausages, salami, and bacon.",
            "In synthesizing diazo compounds used in obtaining azo dyes."
        ]
    },
    {
        id: "chem-67",
        slug: "magnezyum-sulfat",
        cas_number: "7487-88-9",
        formula: "MgSO4",
        category: "general",
        name_tr: "Magnezyum Sülfat",
        name_en: "Magnesium Sulfate",
        name_fr: "Sulfate de Magnésium",
        name_ar: "كبريتات المغنيسيوم",
        description_tr: "Epsom tuzu olarak da bilinen magnezyum sülfat; tarımda magnezyum eksikliğini gidermek, kozmetikte banyo tuzu yapmak ve tekstilde boya sabitlemek için kullanılan inorganik bir tuzdur.",
        description_en: "Also known as Epsom salt, magnesium sulfate is an inorganic salt used to correct magnesium deficiency in agriculture, formulate bath salts in cosmetics, and fix dyes in textiles.",
        description_fr: "Aussi connu sous le nom de sel d'Epsom, le sulfate de magnésium est utilisé pour corriger les carences en magnésium en agriculture et en cosmétique.",
        description_ar: "كبريتات المغنيسيوم، المعروفة أيضًا باسم ملح إبسوم، هي ملح غير عضوي يستخدم لتصحيح نقص المغنيسيوم في الزراعة، وتركيب أملاح الاستحمام في مستحضرات التجميل.",
        usage_areas_tr: ["Tarım ve Gübreleme", "Kozmetik ve Banyo Tuzları", "Tekstil Terbiye", "İlaç ve Tıp"],
        usage_areas_en: ["Agriculture and Fertilizers", "Cosmetics and Bath Salts", "Textile Finishing", "Medicine and Pharma"],
        usage_areas_fr: ["Agriculture et engrais", "Cosmétiques et sels de bain", "Apprêt textile", "Médecine"],
        usage_areas_ar: ["الزراعة والأسمدة", "مستحضرات التجميل وأملاح الاستحمام", "تشطيب المنسوجات", "الطب"],
        ec_number: "231-298-2",
        molecular_weight: "120.37",
        synonyms_tr: "MAGNEZYUM SÜLFAT=Epsom tuzu=İngiliz tuzu",
        synonyms_en: "MAGNESIUM SULFATE=Epsom salt=Bitter salt",
        synonyms_fr: "SULFATE DE MAGNÉSIUM=Sel d'Epsom=Sel d'Angleterre",
        synonyms_ar: "كبريتات المغنيسيوم=ملح إبسوم=الملح الإنجليزي",
        definition_tr: [
            "Magnezyum sülfat (MgSO4), genellikle heptahidrat formunda (MgSO4·7H2O) iğnemsi kristaller halinde bulunan kimyasal bir bileşiktir.",
            "Suda yüksek çözünürlüğe sahiptir ve magnezyum ile kükürt elementlerinin mükemmel bir kaynağıdır."
        ],
        definition_en: [
            "Magnesium sulfate (MgSO4) is a chemical compound commonly found in the heptahydrate form (MgSO4·7H2O) as needle-like crystals.",
            "It has high water solubility and is an excellent source of magnesium and sulfur elements."
        ],
        uses_benefits_tr: [
            "Klorofilin temel bileşeni olan magnezyumu sağlayarak bitkilerde fotosentez kapasitesini artırır.",
            "Cilt tarafından kolayca emilir; kas ağrılarını yatıştırır ve stresi azaltmaya yardımcı olur."
        ],
        uses_benefits_en: [
            "Increases photosynthesis capacity in plants by providing magnesium, a core component of chlorophyll.",
            "Easily absorbed by the skin; soothes muscle soreness and helps reduce stress."
        ],
        applications_tr: [
            "Domates, biber ve patates gibi yüksek magnezyum talep eden bitkilerin gübre formülasyonlarında.",
            "Tekstil boyama havuzlarında elyafın şişmesini sağlayarak boya absorbsiyonunu artırmada."
        ],
        applications_en: [
            "In fertilizer formulations for crops demanding high magnesium, such as tomatoes, peppers, and potatoes.",
            "In textile dye baths to swell fibers and improve dye absorption."
        ]
    },
    {
        id: "chem-68",
        slug: "kalsiyum-hipoklorit",
        cas_number: "7778-54-3",
        formula: "Ca(ClO)2",
        category: "water-treatment",
        name_tr: "Kalsiyum Hipoklorit (Toz Klor)",
        name_en: "Calcium Hypochlorite",
        name_fr: "Hypochlorite de Calcium",
        name_ar: "هيبوكلوريت الكالسيوم",
        description_tr: "Kalsiyum hipoklorit, içme suyu ve havuz sularının dezenfeksiyonunda, ayrıca tekstil ve kağıt hamuru ağartma işlemlerinde yoğun olarak kullanılan güçlü, katı formda bir klorlama ajanıdır.",
        description_en: "Calcium hypochlorite is a strong, solid chlorinating agent heavily used in the disinfection of drinking and pool water, as well as in textile and wood pulp bleaching.",
        description_fr: "L'hypochlorite de calcium est un agent de chloration solide puissant, largement utilisé pour la désinfection de l'eau et le blanchiment.",
        description_ar: "هيبوكلوريت الكالسيوم هو عامل كلورة قوي وصلب يستخدم بكثافة في تطهير مياه الشرب والمسابح، وكذلك في تبييض المنسوجات ولب الورق.",
        usage_areas_tr: ["İçme Suyu Dezenfeksiyonu", "Havuz Klorlama", "Tekstil ve Kağıt Ağartma", "Endüstriyel Sanitasyon"],
        usage_areas_en: ["Drinking Water Disinfection", "Pool Chlorination", "Textile and Paper Bleaching", "Industrial Sanitation"],
        usage_areas_fr: ["Désinfection de l'eau", "Chloration des piscines", "Blanchiment textile et papier", "Sanitation industrielle"],
        usage_areas_ar: ["تطهير مياه الشرب", "كلورة المسابح", "تبييض المensوجات والورق", "التطهير الصناعي"],
        ec_number: "231-908-7",
        molecular_weight: "142.98",
        synonyms_tr: "KALSİYUM HİPOKLORİT=Klor kireci=Toz klor=Stabilize klor",
        synonyms_en: "CALCIUM HYPOCHLORITE=Bleaching powder=Calcium oxychloride",
        synonyms_fr: "HYPOCHLORITE DE CALCIUM=Poudre de blanchiment=Oxychlorure de calcium",
        synonyms_ar: "هيبوكلوريت الكالسيوم=مسحوق التبييض",
        definition_tr: [
            "Kalsiyum hipoklorit (Ca(ClO)2), halk arasında klor kireci olarak bilinen, sodyum hipoklorite göre daha stabil olan ve daha yüksek aktif klor (%65-70) içeren inorganik bir katıdır.",
            "Kalsiyum hidroksitin (sönmüş kireç) klor gazı ile reaksiyona sokulmasıyla üretilir."
        ],
        definition_en: [
            "Calcium hypochlorite (Ca(ClO)2) is an inorganic solid popularly known as bleaching powder, which is more stable than sodium hypochlorite and contains higher active chlorine (65-70%).",
            "It is produced by reacting calcium hydroxide (slaked lime) with chlorine gas."
        ],
        uses_benefits_tr: [
            "Katı formu sayesinde taşıması, depolanması ve dozajlanması sıvı klordan çok daha kolay ve güvenlidir.",
            "Sudaki patojen bakterileri, algleri ve virüsleri saniyeler içinde etkisiz hale getirir."
        ],
        uses_benefits_en: [
            "Thanks to its solid form, it is much easier and safer to transport, store, and dose compared to liquid chlorine.",
            "Inactivates pathogenic bacteria, algae, and viruses in water within seconds."
        ],
        applications_tr: [
            "Belediye su arıtma tesislerinde şebeke sularının dezenfeksiyonu için klorlama ünitelerinde.",
            "Yüzme havuzlarında şok klorlama işlemlerinde alg oluşumunu engellemek amacıyla."
        ],
        applications_en: [
            "In chlorination units for disinfecting municipal water supplies at treatment plants.",
            "For shock chlorination in swimming pools to prevent algae growth."
        ]
    },
    {
        id: "chem-69",
        slug: "cinko-sulfat",
        cas_number: "7733-02-0",
        formula: "ZnSO4",
        category: "general",
        name_tr: "Çinko Sülfat",
        name_en: "Zinc Sulfate",
        name_fr: "Sulfate de Zinc",
        name_ar: "كبريتات الزنك",
        description_tr: "Çinko sülfat; tarımda toprağın çinko eksikliğini gidermek, hayvan yemlerini zenginleştirmek, ayrıca tekstil boyamada renk sabitleyici olarak kullanılan beyaz kristal yapılı bir tuzdur.",
        description_en: "Zinc sulfate is a white crystalline salt used to correct soil zinc deficiency in agriculture, fortify animal feeds, and act as a mordant in textile dyeing.",
        description_fr: "Le sulfate de zinc est un sel cristallin blanc utilisé pour corriger les carences en zinc du sol en agriculture et enrichir les aliments pour animaux.",
        description_ar: "كبريتات الزنك هي ملح بلوري أبيض يستخدم لتصحيح نقص الزنك في التربة في الزراعة، وإثراء أعلاف الحيوانات، وتعمل كمثبت للألوان في صباغة المensوجات.",
        usage_areas_tr: ["Tarım (Çinko Eksikliği)", "Hayvan Yemi Katkısı", "Tekstil ve Boyama", "Su Şartlandırma"],
        usage_areas_en: ["Agriculture (Zinc Deficiency)", "Animal Feed Additive", "Textiles and Dyeing", "Water Treatment"],
        usage_areas_fr: ["Agriculture", "Additif pour alimentation animale", "Textile et teinture", "Traitement de l'eau"],
        usage_areas_ar: ["الزراعة", "إضافات أعلاف الحيوانات", "المنسوجات والصباغة", "معالجة المياه"],
        ec_number: "231-793-3",
        molecular_weight: "161.47",
        synonyms_tr: "ÇİNKO SÜLFAT=Saçıkıbrıs=Beyaz vitriol",
        synonyms_en: "ZINC SULFATE=White vitriol=Zinc vitriol",
        synonyms_fr: "SULFATE DE ZINC=Vitriol blanc",
        synonyms_ar: "كبريتات الزنك=الزاج الأبيض",
        definition_tr: [
            "Çinko sülfat (ZnSO4), doğada goslarit minerali olarak da bulunan, suda çok iyi çözünen inorganik bir bileşiktir.",
            "Endüstride çinko içeren malzemelerin sülfürik asit ile reaksiyonu sonucu kristalleştirilerek elde edilir."
        ],
        definition_en: [
            "Zinc sulfate (ZnSO4) is an inorganic compound occurring naturally as the mineral goslarite, which is highly soluble in water.",
            "Industrially, it is obtained by reacting zinc-containing materials with sulfuric acid followed by crystallization."
        ],
        uses_benefits_tr: [
            "Meyve ağaçlarında yaprak dökümünü engeller, meyve tutumunu ve tomurcuk gelişimini doğrudan artırır.",
            "Deri koruma işlemlerinde antiseptik ve koruyucu olarak deri liflerini sertleştirir."
        ],
        uses_benefits_en: [
            "Prevents leaf drop in fruit trees, directly improving fruit set and bud development.",
            "Acts as an antiseptic and preservative in leather processing, hardening the leather fibers."
        ],
        applications_tr: [
            "Narenciye ve mısır tarımında yapraktan veya topraktan uygulanan mikro element gübrelerinde.",
            "Viskon rayon ipeği üretim süreçlerinde pıhtılaştırma banyolarının bir bileşeni olarak."
        ],
        applications_en: [
            "In foliar or soil-applied micro-nutrient fertilizers for citrus and corn agriculture.",
            "As a component of coagulation baths in the production process of viscose rayon fiber."
        ]
    },
    {
        id: "chem-70",
        slug: "magnezyum-klorur",
        cas_number: "7786-30-3",
        formula: "MgCl2",
        category: "general",
        name_tr: "Magnezyum Klorür",
        name_en: "Magnesium Chloride",
        name_fr: "Chlorure de Magnésium",
        name_ar: "كلوريد المغنيسيوم",
        description_tr: "Magnezyum klorür; yollarda buz oluşumunu engellemek, şantiyelerde tozu bastırmak, endüstriyel zemin çimentoları yapmak ve gıdada kıvamlaştırmak için kullanılan nem çekici bir tuzdur.",
        description_en: "Magnesium chloride is a hygroscopic salt used for road de-icing, dust suppression on construction sites, industrial cement flooring, and food coagulation.",
        description_fr: "Le chlorure de magnésium est un sel hygroscopique utilisé pour le déglaçage des routes, l'abattage des poussières et les ciments industriels.",
        description_ar: "كلوريد المغنيسيوم هو ملح جاذب للرطوبة يستخدم لإزالة الجليد من الطرق، والسيطرة على الغبار في مواقع البناء، والأسمنت الأرضي الصناعي.",
        usage_areas_tr: ["Yol Buz Çözücü", "Toz Kontrolü", "Çimento ve Yapı Malzemeleri", "Gıda (Tofu Pıhtılaştırıcı)"],
        usage_areas_en: ["Road De-icing", "Dust Suppression", "Cement and Building Materials", "Food (Tofu Coagulant)"],
        usage_areas_fr: ["Déglaçage des routes", "Abattage des poussières", "Ciment et matériaux de construction", "Coagulant alimentaire"],
        usage_areas_ar: ["إزالة الجليد من الطرق", "مكافحة الغبار", "الأسمنت ومواد البناء", "مخثر للأغذية (التوفو)"],
        ec_number: "232-094-6",
        molecular_weight: "95.211",
        synonyms_tr: "MAGNEZYUM KLORÜR=Bishofit=Deniz tuzu türevi",
        synonyms_en: "MAGNESIUM CHLORIDE=Bischofite=Magnesium dichloride",
        synonyms_fr: "CHLORURE DE MAGNÉSIUM=Bischofite",
        synonyms_ar: "كلوريد المغنيسيوم",
        definition_tr: [
            "Magnezyum klorür (MgCl2), deniz suyu veya yeraltı tuzlu sularından (brine) kristalleştirilerek elde edilen oldukça higroskopik (nem çekici) organik olmayan bir tuzdur.",
            "Genellikle hekzahidrat formunda (MgCl2·6H2O) şeffaf pullar veya kristaller halinde pazarlanır."
        ],
        definition_en: [
            "Magnesium chloride (MgCl2) is a highly hygroscopic inorganic salt obtained by crystallization from seawater or underground brines.",
            "It is typically marketed as transparent flakes or crystals in its hexahydrate form (MgCl2·6H2O)."
        ],
        uses_benefits_tr: [
            "Sodyum klorüre (kaya tuzu) kıyasla çok daha düşük sıcaklıklarda (-15°C'ye kadar) buzu eritebilir ve yola daha iyi tutunur.",
            "Havadaki nemi çekerek toprak yolları nemli tutar ve toz kalkmasını önler."
        ],
        uses_benefits_en: [
            "Melts ice at much lower temperatures (down to -15°C) and adheres better to roads compared to sodium chloride (rock salt).",
            "Attracts moisture from the air to keep unpaved roads damp, preventing dust emissions."
        ],
        applications_tr: [
            "Kış aylarında otoyollarda buzlanmaya karşı sıvı püskürtme veya tuzlama işlemlerinde.",
            "Sorel çimentosu olarak bilinen, aşınmaya dayanıklı endüstriyel zemin kaplama betonlarında."
        ],
        applications_en: [
            "In liquid spraying or salting operations against icing on highways during winter.",
            "In wear-resistant industrial flooring concrete known as Sorel cement."
        ]
    },
    {
        id: "chem-71",
        slug: "potasyum-nitrat",
        cas_number: "7757-79-1",
        formula: "KNO3",
        category: "general",
        name_tr: "Potasyum Nitrat",
        name_en: "Potassium Nitrate",
        name_fr: "Nitrate de Potassium",
        name_ar: "نترات البوتاسيوم",
        description_tr: "Potasyum nitrat (güherçile), tarımda bitkiler için azot ve potasyum kaynağı olan azotlu bir gübre, ayrıca cam sanayi, pirotekni ve erimiş tuz güneş enerjisi tesislerinde kullanılır.",
        description_en: "Potassium nitrate is a nitrogenous fertilizer providing nitrogen and potassium to plants, also used in glass manufacturing, pyrotechnics, and molten salt solar power systems.",
        description_fr: "Le nitrate de potassium est un engrais azoté fournissant de l'azote et du potassium aux plantes, également utilisé dans le verre et la pyrotechnie.",
        description_ar: "نترات البوتاسيوم هي سماد نيتروجيني يوفر النيتروجين والبوتاسيوم للنباتات، وتستخدم أيضًا في صناعة الزجاج، والألعاب النارية، ومحطات الطاقة الشمسية.",
        usage_areas_tr: ["Tarım ve Gübre (NPK)", "Gıda Koruyucu", "Cam Sanayi", "Isı Depolama (Erimiş Tuz)"],
        usage_areas_en: ["Agriculture and Fertilizers (NPK)", "Food Preservative", "Glass Industry", "Thermal Storage (Molten Salt)"],
        usage_areas_fr: ["Agriculture (Engrais NPK)", "Conservateur alimentaire", "Industrie du verre", "Stockage thermique"],
        usage_areas_ar: ["الزراعة والأسمدة (NPK)", "مادة حافظة للأغذية", "صناعة الزجاج", "التخزين الحراري"],
        ec_number: "231-818-8",
        molecular_weight: "101.10",
        synonyms_tr: "POTASYUM NİTRAT=Güherçile=Nitrat asidi potasyum tuzu",
        synonyms_en: "POTASSIUM NITRATE=Saltpeter=Niter",
        synonyms_fr: "NITRATE DE POTASSIUM=Salpêtre=Nitrate de potasse",
        synonyms_ar: "نترات البوتاسيوم=ملح البارود",
        definition_tr: [
            "Potasyum nitrat (KNO3), doğada kaya oyuklarında güherçile olarak biriken, suda kolay çözünen kristal yapıda inorganik bir nitrat tuzudur.",
            "Güçlü bir oksitleyici ajandır, ısıtıldığında oksijen gazı açığa çıkararak yanma reaksiyonlarını şiddetlendirir."
        ],
        definition_en: [
            "Potassium nitrate (KNO3) is a crystalline inorganic nitrate salt that occurs naturally as saltpeter in rock cavities, dissolving easily in water.",
            "It is a strong oxidizing agent, releasing oxygen gas when heated to accelerate combustion reactions."
        ],
        uses_benefits_tr: [
            "Klor içermez; bu sayede tütün, patates ve narenciye gibi klora duyarlı değerli bitkiler için en ideal potasyum gübresidir.",
            "Erimiş halde kararlı yapısı ve yüksek ısı kapasitesi ile güneş enerjisi santrallerinde ısıyı depolar."
        ],
        uses_benefits_en: [
            "Chlorine-free; making it the ideal potassium fertilizer for chlorine-sensitive high-value crops like tobacco, potatoes, and citrus.",
            "Stores heat in solar power plants due to its stable molten state and high heat capacity."
        ],
        applications_tr: [
            "Damlama sulama sistemlerinde kullanılan suda tamamen eriyen NPK gübrelerinin üretiminde.",
            "Televizyon ve mobil cihaz ekranlarında kullanılan dayanıklı kimyasal camların temperlenmesinde."
        ],
        applications_en: [
            "In producing fully water-soluble NPK fertilizers used in drip irrigation systems.",
            "In tempering durable chemical glasses used for television and mobile device screens."
        ]
    },
    {
        id: "chem-72",
        slug: "sodyum-glukonat",
        cas_number: "527-07-1",
        formula: "C6H11NaO7",
        category: "general",
        name_tr: "Sodyum Glukonat",
        name_en: "Sodium Gluconate",
        name_fr: "Gluconate de Sodium",
        name_ar: "غلوكونات الصوديوم",
        description_tr: "Sodyum glukonat; yapı kimyasallarında harika bir beton priz geciktirici ve su azaltıcı, endüstride ise pas, kireç ve boya sökücü temizlik formülasyonlarında şelatör olarak kullanılır.",
        description_en: "Sodium gluconate is an outstanding concrete set retarder and water reducer in building chemicals, and acts as a chelator in industrial rust, scale, and paint stripping formulations.",
        description_fr: "Le gluconate de sodium est un excellent retardateur de prise pour le béton et un agent chélateur industriel contre la rouille.",
        description_ar: "غلوكونات الصوديوم هي خيار رائع كمؤخر لشك الخرسانة ومخفض للمياه في مواد البناء الكيميائية، وتستخدم كعامل مخلبي في تركيبات التنظيف الصناعي.",
        usage_areas_tr: ["Beton Katkısı (Priz Geciktirici)", "Metal Temizleme", "Şişe ve Ekipman Yıkama", "Tekstil Yardımcı Kimyasalı"],
        usage_areas_en: ["Concrete Admixture (Set Retarder)", "Metal Cleaning", "Bottle and Equipment Washing", "Textile Auxiliary"],
        usage_areas_fr: ["Adjuvant pour béton", "Nettoyage des métaux", "Lavage des bouteilles", "Auxiliaire textile"],
        usage_areas_ar: ["خلطة الخرسانة (مؤخر الشك)", "تنظيف المعادن", "غسيل الزجاجات والمعدات", "مساعد نسيجي"],
        ec_number: "208-407-7",
        molecular_weight: "218.14",
        synonyms_tr: "SODYUM GLUKONAT=Glukonik asit sodyum tuzu",
        synonyms_en: "SODIUM GLUCONATE=Gluconic acid sodium salt",
        synonyms_fr: "GLUCONATE DE SODIUM=Sel de sodium de l'acide gluconique",
        synonyms_ar: "غلوكونات الصوديوم=ملح الصوديوم لحمض الغلوكونيك",
        definition_tr: [
            "Sodyum glukonat (C6H11NaO7), glukozun fermantasyonuyla elde edilen glukonik asidin sodyum tuzu olan beyaz ila esmerimsi granül bir tozdur.",
            "Çok iyi bir şelatlama (metal bağlama) gücüne sahiptir; özellikle alkali ortamlarda kalsiyum, magnezyum ve demir iyonlarını mükemmel şekilde bağlar."
        ],
        definition_en: [
            "Sodium gluconate (C6H11NaO7) is the sodium salt of gluconic acid, produced by the fermentation of glucose, appearing as a white to brownish granular powder.",
            "It has excellent chelating (metal-binding) power, effectively binding calcium, magnesium, and iron ions, especially in alkaline solutions."
        ],
        uses_benefits_tr: [
            "Betonun donma süresini geciktirerek uzun mesafeli taşımalarda betonun işlenebilir kalmasını sağlar.",
            "Cam şişe yıkama makinelerinde kalsiyum kirecinin makine nozullarına yapışmasını engeller."
        ],
        uses_benefits_en: [
            "Retards the setting time of concrete, keeping it workable during long-distance transportation.",
            "Prevents calcium scale from adhering to machine nozzles in glass bottle washing plants."
        ],
        applications_tr: [
            "Hazır beton tesislerinde sıcak havalarda betonun erken kurumasını önleyen katkı formüllerinde.",
            "Tekstil boyama işlemlerinde sudaki ağır metalleri bağlayarak boyanın kumaşa düzgün dağılmasında."
        ],
        applications_en: [
            "In ready-mix concrete formulations to prevent early drying of concrete during hot weather.",
            "In textile dyeing processes to bind heavy metals in water, ensuring even distribution of dyes on the fabric."
        ]
    },
    {
        id: "chem-73",
        slug: "maleik-anhidrit",
        cas_number: "108-31-6",
        formula: "C4H2O3",
        category: "general",
        name_tr: "Maleik Anhidrit",
        name_en: "Maleic Anhydride",
        name_fr: "Anhydride Maléique",
        name_ar: "بلا أندريت المالييك",
        description_tr: "Maleik anhidrit, doymamış polyester reçineleri (fiberglas), alkid boyalar, tarım ilaçları ve plastikleştiricilerin sentezinde temel bir reaktif olarak kullanılan inorganik halkalı bir anhidrittir.",
        description_en: "Maleic anhydride is an inorganic cyclic anhydride used as a core reactant in synthesizing unsaturated polyester resins (fiberglass), alkyd paints, agrochemicals, and plasticizers.",
        description_fr: "L'anhydride maléique est un anhydride cyclique utilisé comme réactif de base dans la synthèse de résines polyesters insaturées et d'alkydes.",
        description_ar: "بلا أندريت المالييك هو بلا أندريت حلقي غير عضوي يستخدم كتفاعل أساسي في تخليق راتنجات البوليستر غير المشبعة (الألياف الزجاجية)، ودهانات الألكيد.",
        usage_areas_tr: ["Doymamış Polyester Reçineleri", "Kaplamalar ve Boyalar", "Tarımsal İlaçlar", "Copolymer Üretimi"],
        usage_areas_en: ["Unsaturated Polyester Resins (UPR)", "Coatings and Paints", "Agricultural Chemicals", "Copolymer Production"],
        usage_areas_fr: ["Résines de polyester insaturé", "Revêtements et peintures", "Produits agrochimiques", "Production de copolymères"],
        usage_areas_ar: ["راتنجات البوليستر غير المشبعة (UPR)", "الطلاء والدهانات", "الكيماويات الزراعية", "إنتاج البوليمرات المشتركة"],
        ec_number: "203-571-6",
        molecular_weight: "98.06",
        synonyms_tr: "MALEİK ANHİDRİT=2,5-Furandiyon=Maleik asit anhidriti",
        synonyms_en: "MALEIC ANHYDRIDE=2,5-Furandione=Maleic acid anhydride",
        synonyms_fr: "ANHYDRIDE MALÉIQUE=2,5-Furandione=Anhydride de l'acide maléique",
        synonyms_ar: "بلا أندريت المالييك=2,5-فورانديون",
        definition_tr: [
            "Maleik anhidrit (C4H2O3), oda sıcaklığında beyaz renkli, keskin kokulu, iğnemsi kristaller veya briketler halinde bulunan organik bir bileşiktir.",
            "Endüstride n-butan veya benzenin katalitik olarak gaz fazında oksitlenmesiyle üretilir."
        ],
        definition_en: [
            "Maleic anhydride (C4H2O3) is an organic compound that appears at room temperature as white, sharp-smelling, needle-like crystals or briquettes.",
            "Industrially, it is produced by the catalytic vapor-phase oxidation of n-butane or benzene."
        ],
        uses_benefits_tr: [
            "Kompozit sanayinin omurgası olan fiberglas takviyeli doymamış polyester reçinelerin eldesinde mukavemet ve esneklik sağlar.",
            "Yağlama yağı katkı maddelerinde motor aşınmasını azaltan kopolimerler oluşturur."
        ],
        uses_benefits_en: [
            "Provides strength and flexibility in obtaining fiberglass-reinforced unsaturated polyester resins, the backbone of the composite industry.",
            "Forms copolymers in lubricating oil additives to reduce engine wear."
        ],
        applications_tr: [
            "Tekne gövdeleri, rüzgar türbini kanatları ve otomotiv kompozit parçalarının reçine matrislerinde.",
            "Tarım sektöründe yabani ot öldürücüler ve mantar ilaçları (pestisit) üretiminde."
        ],
        applications_en: [
            "In resin matrices for boat hulls, wind turbine blades, and automotive composite parts.",
            "In the agricultural sector for manufacturing weed killers and fungicides (pesticides)."
        ]
    },
    {
        id: "chem-74",
        slug: "fitalik-anhidrit",
        cas_number: "85-44-9",
        formula: "C8H4O3",
        category: "general",
        name_tr: "Fitalik Anhidrit",
        name_en: "Phthalic Anhydride",
        name_fr: "Anhydride Phtalique",
        name_ar: "بلا أندريد الفثاليك",
        description_tr: "Fitalik anhidrit; PVC plastiklere esneklik veren ftalat ester plastikleştiricilerin (DOP/DINP), alkid boya reçinelerinin ve bazı organik boyarmaddelerin üretiminde kullanılan devasa tonajlı bir kimyasaldır.",
        description_en: "Phthalic anhydride is a large-tonnage chemical used in manufacturing phthalate ester plasticizers (DOP/DINP) that give flexibility to PVC, alkyd paint resins, and organic dyes.",
        description_fr: "L'anhydride phtalique est un produit chimique à fort tonnage utilisé dans la fabrication de plastifiants esters phtaliques (DOP/DINP) et de résines alkydes.",
        description_ar: "بلا أندريد الفثاليك هو مادة كيميائية ذات حمولة ضخمة تستخدم في تصنيع ملدنات إستر الفثاليت (DOP/DINP) التي تمنح المرونة لـ PVC وراتنجات دهان الألكيد.",
        usage_areas_tr: ["Plastikleştiriciler (DOP/DINP)", "Alkild Reçineleri", "Polyester Reçineleri", "Boya ve Pigmentler"],
        usage_areas_en: ["Plasticizers (DOP/DINP)", "Alkyd Resins", "Polyester Resins", "Dyes and Pigments"],
        usage_areas_fr: ["Plastifiants (DOP/DINP)", "Résines alkydes", "Résines polyesters", "Colorants et pigments"],
        usage_areas_ar: ["الملدنات (DOP/DINP)", "راتنجات الألكيد", "راتنجات البوليستر", "الأصباغ والملونات"],
        ec_number: "201-607-5",
        molecular_weight: "148.12",
        synonyms_tr: "FİTALİK ANHİDRİT=1,3-İzobenzofurandiyon=Ftalik anhidrit",
        synonyms_en: "PHTHALIC ANHYDRIDE=1,3-Isobenzofurandione=Phthalic anhydride",
        synonyms_fr: "ANHYDRIDE PHTALIQUE=1,3-Isobenzofurandione=Anhydride phtalique",
        synonyms_ar: "بلا أندريد الفثاليك=1,3-إيزوبنزوفورانديون",
        definition_tr: [
            "Fitalik anhidrit (C8H4O3), oda sıcaklığında beyaz, iğnemsi kristaller formunda bulunan aromatik organik bir bileşiktir.",
            "Endüstride orto-ksilen veya naftalinin vanadyum pentoksit katalizörlüğünde hava ile gaz fazında oksitlenmesiyle üretilir."
        ],
        definition_en: [
            "Phthalic anhydride (C8H4O3) is an aromatic organic compound in the form of white, needle-like crystals at room temperature.",
            "Industrially, it is produced by the catalytic vapor-phase oxidation of ortho-xylene or naphthalene with air using a vanadium pentoxide catalyst."
        ],
        uses_benefits_tr: [
            "Sert PVC plastikleri esnek, bükülebilir kablolara ve suni deri kaplamalara dönüştüren plastikleştiricilerin ana girdisidir.",
            "İnşaat boyalarında kullanılan alkid reçinelerine hızlı kuruma ve yüksek parlaklık kazandırır."
        ],
        uses_benefits_en: [
            "The main input for plasticizers that convert rigid PVC plastics into flexible, bendable cables and synthetic leather coatings.",
            "Imparts fast drying and high gloss to alkyd resins used in architectural paints."
        ],
        applications_tr: [
            "Kablo kılıfları, suni deri, zemin kaplamaları (linolyum) ve tıbbi hortumlar için PVC formülasyonlarında.",
            "Doymamış polyester reçineleri ve çeşitli boya pigmentlerinin (örneğin ftalocyanine mavisi) sentezinde."
        ],
        applications_en: [
            "In PVC formulations for cable sheathing, synthetic leather, floor coverings (linoleum), and medical tubing.",
            "In synthesizing unsaturated polyester resins and various paint pigments (e.g., phthalocyanine blue)."
        ]
    },
    {
        id: "chem-75",
        slug: "butil-glikol",
        cas_number: "111-76-2",
        formula: "C6H14O2",
        category: "general",
        name_tr: "Butil Glikol",
        name_en: "Butyl Glycol",
        name_fr: "Butyl Glycol",
        name_ar: "بوتيل جليكول",
        description_tr: "Butil glikol, hem su hem de organik solventlerle karışabilen amfifilik yapısıyla boyalarda, verniklerde ve endüstriyel yüzey temizleyicilerde kullanılan yüksek kaynama noktalı, yavaş buharlaşan güçlü bir solventtir.",
        description_en: "Butyl glycol is a high-boiling, slow-evaporating strong solvent used in paints, varnishes, and industrial surface cleaners, featuring an amphiphilic structure miscible with both water and organic solvents.",
        description_fr: "Le butyl glycol est un solvant fort à point d'ébullition élevé utilisé dans les peintures et les nettoyants industriels.",
        description_ar: "بوتيل جليكول هو مذيب قوي ذو درجة غليان عالية وتبخر بطيء يستخدم في الدهانات والورنيش ومنظفات الأسطح الصناعية، ويتميز بتركيبته البرمائية القابلة للامتزاج مع الماء والمذيبات العضوية.",
        usage_areas_tr: ["Boya ve Vernik Çözücü", "Endüstriyel Yüzey Temizleyiciler", "Matbaa Mürekkepleri", "Tekstil ve Deri Yardımcıları"],
        usage_areas_en: ["Paint and Varnish Solvent", "Industrial Surface Cleaners", "Printing Inks", "Textile and Leather Auxiliaries"],
        usage_areas_fr: ["Solvant de peinture et vernis", "Nettoyants industriels de surface", "Encres d'imprimerie", "Auxiliaires de textile et cuir"],
        usage_areas_ar: ["مذيب دهانات وورنيش", "منظفات الأسطح الصناعية", "أحبار الطباعة", "مساعدات النسيج والجلود"],
        ec_number: "203-905-0",
        molecular_weight: "118.17",
        synonyms_tr: "BUTİL GLİKOL=2-Bütoksietanol=Etilen glikol monobütil eter=BG",
        synonyms_en: "BUTYL GLYCOL=2-Butoxyethanol=Ethylene glycol monobutyl ether=BG",
        synonyms_fr: "BUTYL GLYCOL=2-Butoxyéthanol=Éther monobutylique d'éthylène glycol=BG",
        synonyms_ar: "بوتيل جليكول=2-بوتوكسي إيثانول=إيثر أحادي بوتيل إيثيلين جليكول=BG",
        definition_tr: [
            "Butil glikol (2-bütoksietanol), glikol eter sınıfından renksiz, hoş ve hafif tatlı bir kokuya sahip sıvı bir organik bileşiktir.",
            "Hem su hem de yağ fazıyla etkileşime girebilen eter ve alkol fonksiyonel gruplarını aynı molekülde birleştirir."
        ],
        definition_en: [
            "Butyl glycol (2-butoxyethanol) is a liquid organic compound from the glycol ether family, colorless with a pleasant, mild sweet odor.",
            "It combines ether and alcohol functional groups in the same molecule, allowing it to interact with both aqueous and oil phases."
        ],
        uses_benefits_tr: [
            "Su bazlı endüstriyel boyalarda latex filminin birleşmesini (coalescing) kolaylaştırarak pürüzsüz boya katmanı oluşturur.",
            "Ağır yağları ve makine greslerini yüzeyden kolayca söküp emülsifiye eden güçlü temizleme gücüne sahiptir."
        ],
        uses_benefits_en: [
            "Facilitates the coalescence of latex films in water-based industrial coatings, creating a smooth paint layer.",
            "Possesses powerful cleaning performance to easily strip and emulsify heavy oils and machinery greases from surfaces."
        ],
        applications_tr: [
            "Endüstriyel yağ ve kir çözücü sprey formülasyonlarında ve oto yıkama şampuanlarında çözücü katkı olarak.",
            "Serigrafi ve flekso baskı mürekkeplerinde kuruma hızını kontrol altında tutmak amacıyla."
        ],
        applications_en: [
            "As a solvent additive in industrial degreasing spray formulations and automotive wash shampoos.",
            "In screen and flexographic printing inks to keep the drying speed under control."
        ]
    }
];

const dbPath = path.join(__dirname, '../src/data/chemicals.json');
const currentData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const existingSlugs = currentData.map(c => c.slug);
const safeNewChemicals = newChemicals.filter(c => !existingSlugs.includes(c.slug));

const mergedData = [...currentData, ...safeNewChemicals];

fs.writeFileSync(dbPath, JSON.stringify(mergedData, null, 4), 'utf8');

console.log(`src/data/chemicals.json updated successfully. Added Batch 8 of ${safeNewChemicals.length} items. Now contains ${mergedData.length} heavy chemicals!`);
