const fs = require('fs');
const path = require('path');

const newChemicals = [
    {
        id: "chem-10",
        slug: "fosforik-asit",
        cas_number: "7664-38-2",
        formula: "H3PO4",
        category: "general",
        name_tr: "Fosforik Asit",
        name_en: "Phosphoric Acid",
        name_fr: "Acide Phosphorique",
        name_ar: "حمض الفوسفوريك",
        description_tr: "Fosforik asit, gıda, tarım ve endüstriyel temizlik alanlarında yaygın olarak kullanılan zayıf bir asittir. Pas sökücü olarak metal yüzey işlemlerinde çok etkilidir.",
        description_en: "Phosphoric acid is a weak acid widely used in food, agriculture, and industrial cleaning. It is highly effective in metal surface treatment as a rust remover.",
        description_fr: "L'acide phosphorique est un acide faible largement utilisé dans l'alimentation, l'agriculture et le nettoyage industriel.",
        description_ar: "حمض الفوسفوريك هو حمض ضعيف يستخدم على نطاق واسع في الأغذية والزراعة والتنظيف الصناعي.",
        usage_areas_tr: ["Tarım ve Gübre", "Pas Sökücü", "Gıda (Kola Üretimi)", "Su Arıtma"],
        usage_areas_en: ["Agriculture and Fertilizers", "Rust Remover", "Food (Cola Production)", "Water Treatment"],
        usage_areas_fr: ["Agriculture et engrais", "Antirouille", "Alimentation", "Traitement de l'eau"],
        usage_areas_ar: ["الزراعة والأسمدة", "مزيل الصدأ", "الأغذية", "معالجة المياه"],
        ec_number: "231-633-2",
        molecular_weight: "98.00",
        synonyms_tr: "FOSFORİK ASİT=Ortopfosforik asit=Fosfor(V) asidi",
        synonyms_en: "PHOSPHORIC ACID=Orthophosphoric acid=Phosphorus(V) acid",
        definition_tr: [
            "Fosforik asit (H3PO4), inorganik bir mineral asididir ve endüstride çoğunlukla fosfat kayalarının sülfürik asit ile reaksiyona sokulmasıyla (ıslak proses) elde edilir.",
            "Saf formda oda sıcaklığında renksiz, kokusuz kristal bir katıdır, ancak genellikle ticari olarak %85 oranında sulu bir şurup kıvamında sıvı olarak bulunur.",
            "Zehirli veya tehlikeli buharlar yaymaz, ancak yüksek konsantrasyonlarda cilt ve metaller için aşındırıcıdır."
        ],
        definition_en: [
            "Phosphoric acid (H3PO4) is an inorganic mineral acid mostly produced in the industry by the reaction of phosphate rocks with sulfuric acid (wet process).",
            "In its pure form at room temperature, it is a colorless, odorless crystalline solid, but is usually found commercially as an 85% aqueous syrupy liquid.",
            "It does not emit toxic or hazardous vapors but is corrosive to skin and metals in high concentrations."
        ],
        uses_benefits_tr: [
            "Fosforik asit, paslanmış metal yüzeylere (demir oksit) doğrudan uygulandığında demiri fosfatlayarak koruyucu siyah renkli demir(III) fosfat tabakasına dönüştürür.",
            "Suları yumuşatmak ve deterjanlarda temizleme gücünü artırmak için fosfat tuzları (STPP) üretiminde birincil hammaddedir."
        ],
        applications_tr: [
            "Dünya fosforik asit üretiminin %90'ından fazlası fosforlu gübrelerin (DAP, MAP, TSP) üretiminde kullanılır.",
            "Gıda endüstrisinde (E338), özellikle kolalı içeceklerde keskin ve ekşi bir tat vermek ve bakteri/mantar oluşumunu engellemek için koruyucu olarak görev yapar.",
            "Diş hekimliğinde diş minesini pürüzlendirmek için asitle aşındırma işleminde kullanılır."
        ],
        uses_benefits_en: [
            "When applied directly to rusted metal surfaces (iron oxide), phosphoric acid converts the iron into a protective black iron(III) phosphate layer.",
            "It is the primary raw material in the production of phosphate salts (STPP) to soften water and increase cleaning power in detergents."
        ],
        applications_en: [
            "Over 90% of global phosphoric acid production is used in the manufacture of phosphorus fertilizers (DAP, MAP, TSP).",
            "In the food industry (E338), it is used as a preservative to give a sharp, sour taste, especially in cola beverages, and to prevent bacterial/fungal growth.",
            "Used in dentistry as an etching solution to roughen tooth enamel."
        ]
    },
    {
        id: "chem-11",
        slug: "ure",
        cas_number: "57-13-6",
        formula: "CH4N2O",
        category: "general",
        name_tr: "Üre",
        name_en: "Urea",
        name_fr: "Urée",
        name_ar: "اليوريا",
        description_tr: "Üre, dünyada en çok tüketilen azotlu gübre ve kimya sanayisinde polimer ön maddesi olarak kullanılan beyaz kristal formda bir bileşiktir.",
        description_en: "Urea is a white crystalline compound used as the world's most consumed nitrogen fertilizer and as a polymer precursor in the chemical industry.",
        description_fr: "L'urée est un composé cristallin blanc utilisé comme engrais azoté et comme précurseur de polymère.",
        description_ar: "اليوريا مركب بلوري أبيض يستخدم كأكثر الأسمدة النيتروجينية استهلاكًا في العالم وكبادئ للبوليمر في الصناعة الكيميائية.",
        usage_areas_tr: ["Tarım ve Gübre", "Otomotiv (AdBlue)", "Kozmetik", "Tutkal ve Reçine"],
        usage_areas_en: ["Agriculture and Fertilizers", "Automotive (AdBlue)", "Cosmetics", "Adhesives and Resins"],
        usage_areas_fr: ["Agriculture", "Automobile (AdBlue)", "Cosmétiques", "Adhésifs"],
        usage_areas_ar: ["الزراعة", "السيارات (AdBlue)", "مستحضرات التجميل", "المواد اللاصقة"],
        ec_number: "200-315-5",
        molecular_weight: "60.06",
        synonyms_tr: "ÜRE=Karbamid=Karbonil diamit",
        synonyms_en: "UREA=Carbamide=Carbonyl diamide",
        definition_tr: [
            "Üre (CH4N2O), azot metabolizmasının ana son ürünü olup laboratuvar ortamında yapay olarak sentezlenen ilk organik bileşik olma tarihi önemini taşır.",
            "Suda ve alkolde yüksek oranda çözünür, zehirli değildir ve doğada hızla bozunarak amonyağa dönüşür.",
            "Endüstriyel olarak amonyak ve karbondioksitin yüksek basınç ve sıcaklık altında reaksiyona sokulmasıyla (Bosch-Meiser prosesi) elde edilir."
        ],
        definition_en: [
            "Urea (CH4N2O) is the main end product of nitrogen metabolism and holds historical significance as the first organic compound artificially synthesized in a laboratory.",
            "It is highly soluble in water and alcohol, non-toxic, and rapidly degrades in nature into ammonia.",
            "Industrially, it is produced by the reaction of ammonia and carbon dioxide under high pressure and temperature (Bosch-Meiser process)."
        ],
        uses_benefits_tr: [
            "Bitkilere yüksek oranda ve doğrudan kullanılabilir azot (%46) sağlayarak tarımsal verimliliği devasa oranda artırır.",
            "Suyla karıştığında endotermik (ısı alan) bir reaksiyon verir, bu nedenle anlık soğuk kompres paketlerinde de kullanılır."
        ],
        applications_tr: [
            "Üre-formaldehit reçineleri ve melamin üretimi gibi yapı endüstrisinde kullanılan yapıştırıcıların ve kaplamaların ana girdisidir.",
            "Dizel motorlarda egzoz gazı emisyonunu (NOx) düşürmek için kullanılan AdBlue sıvısının (%32.5 Üre) etken maddesidir.",
            "Kozmetikte, özellikle dermatolojik kremlerde ciltteki suyu tutma özelliği (nemlendirici keratolitik etki) nedeniyle yoğunlukla tercih edilir."
        ],
        uses_benefits_en: [
            "Provides a high and directly usable source of nitrogen (46%) to plants, massively increasing agricultural yield.",
            "When mixed with water, it undergoes an endothermic (heat-absorbing) reaction, hence its use in instant cold compress packs."
        ],
        applications_en: [
            "The main input for adhesives and coatings used in the construction industry, such as urea-formaldehyde resins and melamine production.",
            "The active ingredient in AdBlue liquid (32.5% Urea) used to lower exhaust gas emissions (NOx) in diesel engines.",
            "In cosmetics, it is heavily preferred in dermatological creams due to its water-retaining (moisturizing keratolytic) properties on the skin."
        ]
    },
    {
        id: "chem-12",
        slug: "kalsiyum-klorur",
        cas_number: "10043-52-4",
        formula: "CaCl2",
        category: "water-treatment",
        name_tr: "Kalsiyum Klorür",
        name_en: "Calcium Chloride",
        name_fr: "Chlorure de Calcium",
        name_ar: "كلوريد الكالسيوم",
        description_tr: "Kalsiyum klorür, havadaki nemi çekme (higroskopik) kapasitesi olağanüstü yüksek olan inorganik bir tuzdur. Buz çözücü, toz tutucu ve beton hızlandırıcı olarak kullanılır.",
        description_en: "Calcium chloride is an inorganic salt with an exceptionally high capacity to absorb moisture from the air (hygroscopic). It is used as a deicer, dust control agent, and concrete accelerator.",
        description_fr: "Le chlorure de calcium est un sel inorganique hygroscopique utilisé comme agent de dégivrage et accélérateur de béton.",
        description_ar: "كلوريد الكالسيوم ملح غير عضوي يستخدم كمزيل للجليد، ومسرع للخرسانة.",
        usage_areas_tr: ["Buz Çözücü", "Toz Kontrolü", "Beton Katkısı", "Gıda (Peynir Yapımı)"],
        usage_areas_en: ["Deicer", "Dust Control", "Concrete Additive", "Food (Cheese Making)"],
        usage_areas_fr: ["Dégivrant", "Contrôle de la poussière", "Additif pour béton", "Alimentation"],
        usage_areas_ar: ["مزيل الجليد", "التحكم في الغبار", "مضافات الخرسانة", "الأغذية"],
        ec_number: "233-140-8",
        molecular_weight: "110.98",
        synonyms_tr: "KALSİYUM KLORÜR=Kalsiyum diklorür",
        synonyms_en: "CALCIUM CHLORIDE=Calcium dichloride",
        definition_tr: [
            "Kalsiyum klorür (CaCl2), kalsiyum ve klor elementlerinden oluşan iyonik bir bileşiktir. Suda çok kolay çözünür.",
            "Oda sıcaklığında katı formda, beyaz renklidir. Suyun dondurucu noktasını inanılmaz derecede düşürdüğü için kış aylarında sodyum klorüre (sofra tuzu) çok güçlü bir alternatiftir.",
            "Suyu çözerken ekzotermik reaksiyon verir (çevresine ısı yayar), bu özelliği buzla temasında erimeyi hızlandırır."
        ],
        definition_en: [
            "Calcium chloride (CaCl2) is an ionic compound composed of calcium and chlorine elements. It is highly soluble in water.",
            "At room temperature, it is a solid, white-colored salt. Since it lowers the freezing point of water incredibly well, it is a very strong alternative to sodium chloride (table salt) in winter.",
            "It exhibits an exothermic reaction when dissolving in water (releases heat), which accelerates melting when it comes into contact with ice."
        ],
        uses_benefits_tr: [
            "Nem çekici (dessicant) yapısı sayesinde sanayide gazları ve sıvıları kurutmak için kullanılır.",
            "Toprak yollarda tozu engellemek (toz kontrolü) için yola serpildiğinde havadaki nemi çekerek yolu sürekli nemli tutar."
        ],
        applications_tr: [
            "Soğuk hava depolarında soğutucu akışkan (brine) tuzlu su çözeltisi olarak kullanılır.",
            "İnşaat sektöründe çimentonun priz süresini hızlandırmak (betonun erken kurumasını sağlamak) için beton katkısıdır.",
            "Gıda sektöründe (E509) kalsiyum seviyesini artırmak için, özellikle peynir altı suyunda peynirin sertliğini korumak amacıyla yoğun kullanılır."
        ],
        uses_benefits_en: [
            "Due to its desiccant nature, it is used in industry to dry gases and liquids.",
            "When spread on unpaved dirt roads for dust control, it absorbs moisture from the air to keep the road constantly damp."
        ],
        applications_en: [
            "Used as a secondary cooling fluid (brine) solution in cold storage facilities.",
            "Acts as a concrete additive in the construction industry to accelerate the setting time of cement.",
            "Heavily used in the food industry (E509) to increase calcium levels, especially in cheese whey to maintain cheese firmness."
        ]
    },
    {
        id: "chem-13",
        slug: "sodyum-karbonat",
        cas_number: "497-19-8",
        formula: "Na2CO3",
        category: "general",
        name_tr: "Sodyum Karbonat (Soda Külü)",
        name_en: "Sodium Carbonate (Soda Ash)",
        name_fr: "Carbonate de Sodium (Cristaux de Soude)",
        name_ar: "كربونات الصوديوم (رماد الصودا)",
        description_tr: "Sodyum karbonat, halk arasında çamaşır sodası olarak bilinen; cam, deterjan ve kağıt endüstrisinin en temel inorganik yapı taşlarından biridir.",
        description_en: "Sodium carbonate, commonly known as washing soda, is one of the most fundamental inorganic building blocks of the glass, detergent, and paper industries.",
        description_fr: "Le carbonate de sodium est l'un des blocs de construction inorganiques fondamentaux des industries du verre, des détergents et du papier.",
        description_ar: "كربونات الصوديوم هي إحدى اللبنات الأساسية غير العضوية لصناعات الزجاج والمنظفات والورق.",
        usage_areas_tr: ["Cam Endüstrisi", "Deterjan", "Su Yumuşatma", "Tekstil ve Kağıt"],
        usage_areas_en: ["Glass Industry", "Detergent", "Water Softening", "Textile and Paper"],
        usage_areas_fr: ["Industrie du verre", "Détergents", "Adoucissement de l'eau", "Textile"],
        usage_areas_ar: ["صناعة الزجاج", "المنظفات", "تيسير المياه", "النسيج"],
        ec_number: "207-838-8",
        molecular_weight: "105.99",
        synonyms_tr: "SODYUM KARBONAT=Çamaşır sodası=Soda külü",
        synonyms_en: "SODIUM CARBONATE=Soda ash=Washing soda",
        definition_tr: [
            "Sodyum karbonat (Na2CO3), doğada trona cevherinden veya sentetik olarak Solvay prosesi ile üretilen suda çözünebilir sodyum tuzudur.",
            "Kokusuz, grimsi-beyaz renkte bir tozdur. Suda çözündüğünde kuvvetli alkali (bazik) bir çözelti oluşturur."
        ],
        definition_en: [
            "Sodium carbonate (Na2CO3) is a water-soluble sodium salt produced naturally from trona ore or synthetically via the Solvay process.",
            "It is an odorless, grayish-white powder. When dissolved in water, it forms a strongly alkaline (basic) solution."
        ],
        uses_benefits_tr: [
            "Sert sularda bulunan magnezyum ve kalsiyum iyonlarıyla reaksiyona girerek çökelmelerini (suyun yumuşamasını) sağlar.",
            "Güçlü bir yağ çözücüdür ve temizlik malzemelerinin alkalinitesini ayarlar."
        ],
        applications_tr: [
            "Dünya sodyum karbonat üretiminin yarısı cam imalatına (silika kumunun erime noktasını düşürmek için) gider.",
            "Kuru toz deterjan formülasyonlarında ve sabunlarda asit nötralizasyon ajanıdır.",
            "Tekstilde reaktif boyaların pamuğa tam olarak yapışmasını sağlamak için boyama pH'ını bazik yapar."
        ],
        uses_benefits_en: [
            "Reacts with magnesium and calcium ions found in hard water, causing them to precipitate out (softens water).",
            "It is a strong degreaser and adjusts the alkalinity of cleaning materials."
        ],
        applications_en: [
            "Half of the world's sodium carbonate production goes into glass manufacturing (to lower the melting point of silica sand).",
            "Acts as an acid neutralization agent in dry powder detergent formulations and soaps.",
            "In textiles, it makes the dyeing pH basic to ensure reactive dyes adhere fully to cotton."
        ]
    },
    {
        id: "chem-14",
        slug: "formik-asit",
        cas_number: "64-18-6",
        formula: "CH2O2",
        category: "textile",
        name_tr: "Formik Asit (Karınca Asidi)",
        name_en: "Formic Acid",
        name_fr: "Acide Formique",
        name_ar: "حمض الفورميك",
        description_tr: "Formik asit, en basit karboksilik asittir. Endüstride özellikle dericilikte tabaklama aşamasında, tekstilde ve hayvancılıkta çok güçlü bir antibakteriyel koruyucu olarak kullanılır.",
        description_en: "Formic acid is the simplest carboxylic acid. Industrially, it is used heavily in the leather tanning process, textiles, and as a very strong antibacterial preservative in agriculture.",
        description_fr: "L'acide formique est l'acide carboxylique le plus simple. Utilisé dans le tannage du cuir et comme conservateur.",
        description_ar: "حمض الفورميك هو أبسط حمض كربوكسيلي. يستخدم في دباغة الجلود والمنسوجات وكمادة حافظة.",
        usage_areas_tr: ["Deri Tabaklama", "Tekstil Boyama", "Hayvan Yemi", "Kauçuk Üretimi"],
        usage_areas_en: ["Leather Tanning", "Textile Dyeing", "Animal Feed", "Rubber Production"],
        usage_areas_fr: ["Tannage du cuir", "Teinture textile", "Alimentation animale", "Caoutchouc"],
        usage_areas_ar: ["دباغة الجلود", "صباغة المنسوجات", "علف الحيوانات", "إنتاج المطاط"],
        ec_number: "200-579-1",
        molecular_weight: "46.03",
        synonyms_tr: "FORMİK ASİT=Metanoik asit=Karınca asidi",
        synonyms_en: "FORMIC ACID=Methanoic acid",
        definition_tr: [
            "Formik asit (CH2O2 veya HCOOH), ismini Latince karınca anlamına gelen 'formica' kelimesinden alan, doğada bazı böceklerin savunma mekanizmasında bulunan en basit asittir.",
            "Renksiz, dumanlı ve oldukça tahriş edici keskin bir kokuya sahip bir sıvıdır.",
            "Su, metanol, etanol ve gliserol ile tamamen karışabilir."
        ],
        definition_en: [
            "Formic acid (CH2O2 or HCOOH), taking its name from the Latin word 'formica' for ant, is the simplest acid found in nature in the defense mechanisms of some insects.",
            "It is a colorless, fuming liquid with a highly irritating, pungent odor.",
            "It is completely miscible with water, methanol, ethanol, and glycerol."
        ],
        uses_benefits_tr: [
            "Doğadaki en güçlü antibakteriyel ajanlardan biridir, bozulmayı önler ve fermantasyon süreçlerini kontrol altında tutar.",
            "Asetik asitten daha kuvvetli bir asit olduğu için tekstil endüstrisinde pH ayarlamalarında çok daha az miktarla aynı işi görür."
        ],
        applications_tr: [
            "Deri endüstrisinde kireç giderme (delime) ve tabaklama işlemlerinin vazgeçilmezidir.",
            "Avrupa'da büyükbaş hayvan yemlerinde (silaj) kışlık depolama sırasında laktik asit fermantasyonunu desteklemek için kullanılır.",
            "Kauçuk üretiminde lateksin koagülasyonu (pıhtılaştırılması) aşamasında ana ajandır."
        ],
        uses_benefits_en: [
            "One of the strongest antibacterial agents in nature, it prevents spoilage and keeps fermentation processes under control.",
            "Because it is a stronger acid than acetic acid, it achieves the same pH adjustment in the textile industry using much less volume."
        ],
        applications_en: [
            "Indispensable in the leather industry for deliming and tanning processes.",
            "Widely used in Europe in animal feed (silage) to promote lactic acid fermentation during winter storage.",
            "The main agent in the coagulation stage of latex in rubber production."
        ]
    }
];

const dbPath = path.join(__dirname, '../src/data/chemicals.json');
const currentData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Append new entries
const mergedData = [...currentData, ...newChemicals];

fs.writeFileSync(dbPath, JSON.stringify(mergedData, null, 4), 'utf8');

console.log(`src/data/chemicals.json updated successfully. Now contains ${mergedData.length} heavy chemicals!`);
