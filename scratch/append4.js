const fs = require('fs');
const path = require('path');

const newChemicals = [
    {
        id: "chem-19",
        slug: "monoetilen-glikol-meg",
        cas_number: "107-21-1",
        formula: "C2H6O2",
        category: "general",
        name_tr: "Monoetilen Glikol (MEG)",
        name_en: "Monoethylene Glycol (MEG)",
        name_fr: "Monoéthylène Glycol (MEG)",
        name_ar: "أحادي إيثيلين جلايكول (MEG)",
        description_tr: "Monoetilen glikol (MEG), polimer endüstrisinde polyester liflerin üretiminde ve otomotiv sektöründe antifriz üretiminde ana bileşen olarak kullanılan şeffaf ve renksiz bir organik sıvıdır.",
        description_en: "Monoethylene glycol (MEG) is a clear, colorless organic liquid used as the main ingredient in the production of polyester fibers in the polymer industry and antifreeze in the automotive sector.",
        description_fr: "Le monoéthylène glycol (MEG) est un liquide organique incolore utilisé dans la production de fibres de polyester et d'antigel.",
        description_ar: "أحادي إيثيلين جلايكول (MEG) هو سائل عضوي نقي وعديم اللون يستخدم في إنتاج ألياف البوليستر ومضاد التجمد.",
        usage_areas_tr: ["Polyester (PET) Üretimi", "Antifriz ve Soğutma", "Tekstil Endüstrisi", "Doğalgaz Kurutma"],
        usage_areas_en: ["Polyester (PET) Production", "Antifreeze and Cooling", "Textile Industry", "Natural Gas Drying"],
        usage_areas_fr: ["Production de Polyester (PET)", "Antigel et refroidissement", "Industrie textile", "Séchage du gaz naturel"],
        usage_areas_ar: ["إنتاج البوليستر (PET)", "مضاد للتجمد والتبريد", "صناعة النسيج", "تجفيف الغاز الطبيعي"],
        ec_number: "203-473-3",
        molecular_weight: "62.07",
        synonyms_tr: "MONOETİLEN GLİKOL=Etilen glikol=1,2-etandiol=MEG",
        synonyms_en: "MONOETHYLENE GLYCOL=Ethylene glycol=1,2-ethanediol=MEG",
        synonyms_fr: "MONOÉTHYLÈNE GLYCOL=Éthylène glycol=1,2-éthanediol=MEG",
        synonyms_ar: "أحادي إيثيلين جلايكول=إيثيلين جلايكول=1،2-إيثانيديول=MEG",
        definition_tr: [
            "Monoetilen glikol (MEG), kokusuz, tatlımsı bir tada sahip, renksiz ve viskoz (kıvamlı) bir sıvı organik bileşiktir. Etilen oksidin su ile reaksiyona sokulmasıyla üretilir.",
            "Son derece higroskopiktir (havadan nem çeker) ve su, alkol ve aseton ile tamamen karışabilir.",
            "Tatlımsı tadına rağmen yutulması halinde son derece toksiktir (zehirlidir)."
        ],
        definition_en: [
            "Monoethylene glycol (MEG) is an odorless, colorless, viscous organic liquid compound with a sweet taste. It is produced by the reaction of ethylene oxide with water.",
            "It is highly hygroscopic (absorbs moisture from the air) and is completely miscible with water, alcohol, and acetone.",
            "Despite its sweet taste, it is extremely toxic if ingested."
        ],
        definition_fr: [
            "Le monoéthylène glycol (MEG) est un composé liquide organique inodore, incolore et visqueux au goût sucré.",
            "Il est très hygroscopique et entièrement miscible avec l'eau, l'alcool et l'acétone.",
            "Malgré son goût sucré, il est extrêmement toxique en cas d'ingestion."
        ],
        definition_ar: [
            "أحادي إيثيلين جلايكول (MEG) هو مركب سائل عضوي لزج عديم اللون والرائحة وله طعم حلو.",
            "إنه شديد الاسترطاب (يمتص الرطوبة من الهواء) وقابل للامتزاج تمامًا بالماء والكحول والأسيتون.",
            "على الرغم من طعمه الحلو، إلا أنه شديد السمية إذا تم ابتلاعه."
        ],
        uses_benefits_tr: [
            "Suyun donma noktasını inanılmaz derecede düşürürken, kaynama noktasını yükseltir. Bu özelliği onu mükemmel bir ısı transfer sıvısı yapar.",
            "Polyester reçinelerin ve PET (Polietilen tereftalat) plastiklerinin sentezinde kritik bir monomerdir."
        ],
        applications_tr: [
            "Dünya MEG tüketiminin büyük çoğunluğu tekstil sektörü için polyester elyaf üretiminde ve gıda ambalajı için PET şişe yapımında kullanılır.",
            "Otomotiv sektöründe motor soğutma sıvılarının (antifriz) temel bileşenidir.",
            "Doğalgaz boru hatlarında hidrat (buz kristali) oluşumunu engellemek için kurutucu/inhibitör olarak tüketilir."
        ],
        uses_benefits_en: [
            "It lowers the freezing point of water incredibly well while raising its boiling point. This property makes it an excellent heat transfer fluid.",
            "It is a critical monomer in the synthesis of polyester resins and PET (Polyethylene terephthalate) plastics."
        ],
        applications_en: [
            "The vast majority of global MEG consumption is used in the production of polyester fibers for the textile industry and PET bottles for food packaging.",
            "It is the main component of engine coolants (antifreeze) in the automotive sector.",
            "Consumed as a desiccant/inhibitor to prevent hydrate (ice crystal) formation in natural gas pipelines."
        ]
    },
    {
        id: "chem-20",
        slug: "nitrik-asit",
        cas_number: "7697-37-2",
        formula: "HNO3",
        category: "general",
        name_tr: "Nitrik Asit (Kezzap)",
        name_en: "Nitric Acid",
        name_fr: "Acide Nitrique",
        name_ar: "حمض النيتريك",
        description_tr: "Nitrik asit, halk arasında kezzap olarak bilinen, oldukça aşındırıcı ve zehirli bir inorganik asittir. Endüstride özellikle azotlu gübrelerin ve patlayıcıların yapımında kullanılır.",
        description_en: "Nitric acid, commonly known as aqua fortis, is a highly corrosive and toxic inorganic acid. Industrially, it is used primarily in the manufacture of nitrogenous fertilizers and explosives.",
        description_fr: "L'acide nitrique est un acide inorganique très corrosif et toxique. Utilisé dans la fabrication d'engrais et d'explosifs.",
        description_ar: "حمض النيتريك هو حمض غير عضوي شديد التآكل والسمية. يستخدم في صناعة الأسمدة والمتفجرات.",
        usage_areas_tr: ["Gübre Üretimi", "Patlayıcı Madde", "Metal İşleme ve Gravür", "Temizlik Kimyasalları"],
        usage_areas_en: ["Fertilizer Production", "Explosives", "Metal Processing and Engraving", "Cleaning Chemicals"],
        usage_areas_fr: ["Production d'engrais", "Explosifs", "Travail des métaux", "Produits de nettoyage"],
        usage_areas_ar: ["إنتاج الأسمدة", "المتفجرات", "تشغيل المعادن", "كيماويات التنظيف"],
        ec_number: "231-714-2",
        molecular_weight: "63.01",
        synonyms_tr: "NİTRİK ASİT=Kezzap=Hidrojen nitrat",
        synonyms_en: "NITRIC ACID=Aqua fortis=Hydrogen nitrate",
        definition_tr: [
            "Nitrik asit (HNO3), saf formda renksiz olan, ancak zamanla azot oksitlerine bozunarak sarı veya kırmızımsı bir renk alan güçlü bir mineral asittir.",
            "Çok güçlü bir oksitleyici (yükseltgen) maddedir. Altın ve platin hariç hemen hemen tüm metallerle şiddetle reaksiyona girer.",
            "Endüstride büyük ölçüde Ostwald prosesi ile amonyağın katalitik oksidasyonu sonucu elde edilir."
        ],
        definition_en: [
            "Nitric acid (HNO3) is a strong mineral acid that is colorless in its pure form but takes on a yellow or reddish hue over time as it decomposes into nitrogen oxides.",
            "It is a very strong oxidizing agent. It reacts violently with almost all metals except gold and platinum.",
            "Industrially, it is largely produced by the catalytic oxidation of ammonia via the Ostwald process."
        ],
        uses_benefits_tr: [
            "Gümüş ve altını ayırmak (altın rafinasyonu) için kullanılır (kral suyu bileşenidir).",
            "Sert metalleri (özellikle paslanmaz çelik) temizlemek ve parlatmak için çok etkili bir korozyon gidericidir."
        ],
        applications_tr: [
            "Üretilen nitrik asidin en büyük kısmı, amonyum nitrat (çok güçlü bir tarım gübresi) sentezinde kullanılır.",
            "Naylon üretiminde kullanılan adipik asidin ara hammaddesidir.",
            "Savunma sanayisinde TNT, nitrogliserin ve RDX gibi güçlü patlayıcıların temel yapı taşıdır."
        ],
        uses_benefits_en: [
            "Used to separate silver and gold (gold refining) as it is a component of aqua regia.",
            "It is a very effective corrosion remover for cleaning and polishing hard metals (especially stainless steel)."
        ],
        applications_en: [
            "The vast majority of produced nitric acid is used in the synthesis of ammonium nitrate (a very potent agricultural fertilizer).",
            "It is an intermediate raw material for adipic acid used in nylon production.",
            "The fundamental building block of powerful explosives like TNT, nitroglycerin, and RDX in the defense industry."
        ]
    },
    {
        id: "chem-21",
        slug: "kalsiyum-karbonat-kalsit",
        cas_number: "471-34-1",
        formula: "CaCO3",
        category: "general",
        name_tr: "Kalsiyum Karbonat (Kalsit)",
        name_en: "Calcium Carbonate",
        name_fr: "Carbonate de Calcium",
        name_ar: "كربونات الكالسيوم",
        description_tr: "Kalsiyum karbonat, doğada kalker, tebeşir ve mermer olarak bulunan yaygın bir inorganik bileşiktir. Boya, plastik ve kağıt endüstrilerinde devasa hacimlerde dolgu maddesi olarak kullanılır.",
        description_en: "Calcium carbonate is a common inorganic compound found in nature as limestone, chalk, and marble. It is used in massive volumes as a filler in the paint, plastic, and paper industries.",
        description_fr: "Le carbonate de calcium est un composé inorganique commun. Utilisé comme charge dans les industries de la peinture, du plastique et du papier.",
        description_ar: "كربونات الكالسيوم مركب غير عضوي شائع. يستخدم كمادة مالئة في صناعات الطلاء والبلاستيك والورق.",
        usage_areas_tr: ["Boya Endüstrisi", "Plastik ve PVC Üretimi", "Kağıt Dolgusu", "Yapı Malzemeleri"],
        usage_areas_en: ["Paint Industry", "Plastic and PVC Production", "Paper Filler", "Construction Materials"],
        usage_areas_fr: ["Industrie de la peinture", "Plastiques et PVC", "Charge pour papier", "Matériaux de construction"],
        usage_areas_ar: ["صناعة الطلاء", "البلاستيك والـ PVC", "حشو الورق", "مواد البناء"],
        ec_number: "207-439-9",
        molecular_weight: "100.09",
        synonyms_tr: "KALSİYUM KARBONAT=Kalsit=Kireç taşı=Tebeşir=Çöktürülmüş Kalsiyum Karbonat (PCC)",
        synonyms_en: "CALCIUM CARBONATE=Calcite=Limestone=Chalk=Precipitated Calcium Carbonate (PCC)",
        definition_tr: [
            "Kalsiyum karbonat (CaCO3), yeryüzü kabuğunun yaklaşık %4'ünü oluşturan, doğada kalsit, aragonit ve vaterit mineralleri şeklinde bulunan karbonat tuzudur.",
            "Endüstriyel kullanımı için ya madenlerden doğrudan öğütülerek elde edilir (GCC - Öğütülmüş Kalsiyum Karbonat) ya da daha yüksek saflık için kimyasal olarak çöktürülür (PCC).",
            "Suda çözünmez, ancak asidik ortamlarda (örneğin karbondioksitli suda) çözünerek kalsiyum bikarbonata dönüşür."
        ],
        definition_en: [
            "Calcium carbonate (CaCO3) is a carbonate salt that makes up about 4% of the Earth's crust, found in nature as calcite, aragonite, and vaterite minerals.",
            "For industrial use, it is either obtained by direct grinding from mines (GCC - Ground Calcium Carbonate) or chemically precipitated for higher purity (PCC).",
            "It is insoluble in water but dissolves in acidic environments (like carbonated water) to form calcium bicarbonate."
        ],
        uses_benefits_tr: [
            "Plastik ve boyalarda opaklığı artırır, reçine kullanım miktarını azaltarak (dolgu maddesi olarak) maliyeti inanılmaz oranda düşürür.",
            "Yüksek beyazlığı (parlaklığı) nedeniyle kağıt endüstrisinde optik özelliklerin artırılmasını sağlar."
        ],
        applications_tr: [
            "PVC borularda, kablo kılıflarında ve plastik profillerde dayanıklılık artırıcı ana inorganik katkıdır.",
            "Su bazlı iç/dış cephe boyalarında TiO2'nin (Titanyum Dioksit) yerini alan veya destekleyen en önemli mineral dolgudur.",
            "İnşaatta çimento yapımında (kireçtaşı olarak) temel inorganik kaynaktır."
        ],
        uses_benefits_en: [
            "Increases opacity in plastics and paints, and incredibly reduces costs by decreasing the amount of resin required (acting as a filler).",
            "Provides an increase in optical properties in the paper industry due to its high whiteness (brightness)."
        ],
        applications_en: [
            "The main inorganic additive used to increase durability in PVC pipes, cable sheathing, and plastic profiles.",
            "The most important mineral filler supporting or replacing TiO2 (Titanium Dioxide) in water-based interior/exterior paints.",
            "The fundamental inorganic source for cement making (as limestone) in the construction industry."
        ]
    },
    {
        id: "chem-22",
        slug: "aluminyum-sulfat",
        cas_number: "10043-01-3",
        formula: "Al2(SO4)3",
        category: "water-treatment",
        name_tr: "Alüminyum Sülfat",
        name_en: "Aluminum Sulfate",
        name_fr: "Sulfate d'Aluminium",
        name_ar: "كبريتات الألومنيوم",
        description_tr: "Alüminyum sülfat, endüstride içme suyu ve atıksu arıtımında partikülleri çöktürmek (koagülant) için kullanılan, ayrıca kağıt yapımında ve tekstil boyamada mordan olarak tercih edilen beyaz kristal bir bileşiktir.",
        description_en: "Aluminum sulfate is a white crystalline compound used in the industry to precipitate particles (coagulant) in drinking water and wastewater treatment, and is also preferred as a mordant in papermaking and textile dyeing.",
        description_fr: "Le sulfate d'aluminium est utilisé comme coagulant dans le traitement de l'eau et comme mordant dans la fabrication du papier et la teinture textile.",
        description_ar: "كبريتات الألومنيوم تستخدم كمخثر في معالجة المياه ومادة مثبتة للون في صناعة الورق وصباغة المنسوجات.",
        usage_areas_tr: ["Atıksu ve İçme Suyu Arıtma", "Kağıt Endüstrisi", "Tekstil Boyama (Mordan)", "Göl/Havuz Berraklaştırma"],
        usage_areas_en: ["Wastewater and Drinking Water Treatment", "Paper Industry", "Textile Dyeing (Mordant)", "Lake/Pool Clarification"],
        usage_areas_fr: ["Traitement de l'eau", "Industrie du papier", "Teinture textile", "Clarification des piscines"],
        usage_areas_ar: ["معالجة مياه الصرف والشرب", "صناعة الورق", "صباغة المنسوجات", "تنقية المسابح"],
        ec_number: "233-135-0",
        molecular_weight: "342.15",
        synonyms_tr: "ALÜMİNYUM SÜLFAT=Kağıtçı şapı=Şap",
        synonyms_en: "ALUMINUM SULFATE=Papermaker's alum=Alum",
        definition_tr: [
            "Alüminyum sülfat (Al2(SO4)3), alüminyum hidroksitin sülfürik asit ile reaksiyona sokulmasıyla üretilen suda çözünebilir inorganik bir tuzdur.",
            "Piyasada katı (toz/granül) veya sıvı çözelti (%50 civarı) halinde bulunur. Hafif asidik bir yapıya sahiptir.",
            "Endüstride yanlış bir isimlendirme olsa da sıklıkla 'şap' (alum) olarak adlandırılır."
        ],
        definition_en: [
            "Aluminum sulfate (Al2(SO4)3) is a water-soluble inorganic salt produced by reacting aluminum hydroxide with sulfuric acid.",
            "It is available commercially in solid (powder/granule) or liquid solution (around 50%) form. It has a slightly acidic nature.",
            "In the industry, it is frequently (though technically incorrectly) referred to as 'alum'."
        ],
        uses_benefits_tr: [
            "Sudaki negatif yüklü ince partikülleri ve kirleri nötralize edip (koagülasyon), büyük yumaklar (flok) oluşturarak dibe çökmelerini sağlar.",
            "Kağıt yapımında liflere reçine yapışmasını sağlayarak kağıdın suya karşı dayanıklılığını artırır."
        ],
        applications_tr: [
            "Belediyelerin içme suyu arıtma tesislerinde ve endüstriyel atıksu tesislerinde birincil çöktürücü/berraklaştırıcı kimyasaldır.",
            "Tekstilde boyaların kumaş liflerine sıkıca tutunmasını sağlayan mordan maddesi olarak kullanılır.",
            "Asidik doğası nedeniyle bahçıvanlıkta toprağın pH seviyesini düşürerek asit seven bitkilerin (ortanca vb.) büyümesini teşvik eder."
        ],
        uses_benefits_en: [
            "It neutralizes negatively charged fine particles and dirt in water (coagulation), causing them to form large clumps (flocs) and settle to the bottom.",
            "In papermaking, it helps resin adhere to fibers, increasing the water resistance of the paper."
        ],
        applications_en: [
            "The primary precipitating/clarifying chemical in municipal drinking water treatment plants and industrial wastewater facilities.",
            "Used as a mordant in textiles to ensure dyes hold firmly to fabric fibers.",
            "Due to its acidic nature, it is used in gardening to lower soil pH and promote the growth of acid-loving plants (like hydrangeas)."
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
