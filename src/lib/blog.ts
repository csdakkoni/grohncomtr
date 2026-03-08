
export interface BlogPost {
    id: string;
    slug: string;
    category: 'technical' | 'industry' | 'sustainability' | 'guide';
    author: string;
    date: string;
    image_url: string;
    title_tr: string;
    title_en: string;
    title_fr: string;
    title_ar: string;
    excerpt_tr: string;
    excerpt_en: string;
    excerpt_fr: string;
    excerpt_ar: string;
    content_tr: string;
    content_en: string;
    content_fr: string;
    content_ar: string;
    tags_en: string[];
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: "1",
        slug: "reactive-dyeing-ph-control",
        category: "technical",
        author: "Grohn Kimya R&D",
        date: "2025-12-15",
        image_url: "/images/dyeing.png",
        title_en: "The Critical Role of pH Control in Reactive Dyeing",
        title_tr: "Reaktif Boyamada pH Kontrolünün Kritik Rolü",
        title_fr: "Le rôle critique du contrôle du pH dans la teinture réactive",
        title_ar: "الدور الحاسم للتحكم في الرقم الهيدروجيني في الصباغة التفاعلية",
        excerpt_en: "Learn why precise pH management is key to achieving uniform dyeing results and maximum color fastness in reactive dyeing processes.",
        excerpt_tr: "Reaktif boyama proseslerinde düzgün boyama sonuçları ve maksimum renk haslığı için hassas pH yönetiminin neden önemli olduğunu öğrenin.",
        excerpt_fr: "Découvrez pourquoi la gestion précise du pH est essentielle pour des résultats de teinture uniformes.",
        excerpt_ar: "تعرف على أهمية التحكم الدقيق في الرقم الهيدروجيني للحصول على نتائج صباغة موحدة.",
        tags_en: ["reactive dyeing", "pH control", "Grocid", "color fastness"],
        content_en: `## Why pH Matters in Reactive Dyeing

Reactive dyes form a covalent bond with cellulose fibers, making pH one of the most critical parameters in the entire dyeing process. The fixation reaction requires alkaline conditions (pH 10.5–11.5), but excessive alkalinity leads to dye hydrolysis — where the dye reacts with water instead of the fiber.

### The Problem: Dye Hydrolysis

When pH exceeds the optimal range:
- **Up to 30% of dye** can be lost through hydrolysis
- Unfixed dye leads to poor wash fastness
- Shade variations between batches become unpredictable
- Additional washing cycles increase water and energy consumption

### The Solution: Buffering Agents

This is where buffering acids like **Grocid GFY** and **Grocid BFF** become essential. Unlike simple acids that cause sharp pH drops, buffering agents maintain a stable pH throughout the dyeing cycle.

**Key advantages of Grocid buffering systems:**
- Maintain pH within ±0.3 of target value
- Gradual alkali neutralization prevents dye shock
- Compatible with all reactive dye classes (Vinyl Sulfone, MCT, bi-functional)
- Effective across 40–80°C temperature range

### Recommended Protocol

1. **Pre-treatment**: Ensure thorough scouring with Growet ELF wetting agent
2. **Sequestering**: Add Groseq PFF to bind Ca²⁺/Mg²⁺ ions (2–3 g/L)
3. **Dyeing pH**: Use Grocid BFF for controlled alkali addition
4. **Post-dyeing**: Neutralize with Grocid NTR before washing
5. **Soaping**: Final wash with Growash RCT for hydrolyzed dye removal

### Results

Textile mills using our pH buffering protocol report:
- **15–20% improvement** in dye fixation rates
- **40% reduction** in post-dyeing wash cycles
- Consistent shade reproducibility (ΔE < 0.5)

*Contact our technical team for customized pH management solutions for your specific processes.*`,

        content_tr: `## Reaktif Boyamada pH Neden Önemlidir?

Reaktif boyalar selüloz liflerle kovalent bağ oluşturur. Bu nedenle pH, tüm boyama prosesinin en kritik parametrelerinden biridir. Fiksasyon reaksiyonu alkali koşullar (pH 10.5-11.5) gerektirir, ancak aşırı alkalinite boya hidrolizine yol açar — boya lif yerine suyla reaksiyona girer.

### Problem: Boya Hidrolizi

pH optimum aralığı aştığında:
- **Boyanın %30'a kadarı** hidroliz yoluyla kaybedilebilir
- Fikse olmayan boya düşük yıkama haslığına neden olur
- Partiler arasında ton farklılıkları öngörülemez hale gelir
- Ek yıkama döngüleri su ve enerji tüketimini artırır

### Çözüm: Tamponlama Ajanları

İşte burada **Grocid GFY** ve **Grocid BFF** gibi tampon asitler devreye girer. Sert pH düşmeleri yaratan basit asitlerin aksine, tampon ajanlar boyama döngüsü boyunca stabil pH sağlar.

**Grocid tamponlama sistemlerinin temel avantajları:**
- Hedef değerin ±0.3 aralığında pH koruma
- Kademeli alkali nötralizasyonu, boya şokunu önler
- Tüm reaktif boya sınıflarıyla uyumlu
- 40-80°C sıcaklık aralığında etkili

### Önerilen Protokol

1. **Ön İşlem**: Growet ELF ıslatıcı ile kapsamlı kasar
2. **İyon Tutma**: Groseq PFF ile Ca²⁺/Mg²⁺ bağlama (2-3 g/L)
3. **Boyama pH**: Grocid BFF ile kontrollü alkali ilavesi
4. **Boyama Sonrası**: Growash RCT ile hidrolize boya yıkaması
5. **Nötralizasyon**: Grocid NTR ile pH ayarı

### Sonuçlar

pH tamponlama protokolümüzü kullanan boyahaneler:
- Boya fiksasyon oranlarında **%15-20 artış**
- Boyama sonrası yıkama döngülerinde **%40 azalma**
- Tutarlı ton tekrarlanabilirliği (ΔE < 0.5)

*Süreçlerinize özel pH yönetim çözümleri için teknik ekibimizle iletişime geçin.*`,

        content_fr: `## L'importance du pH dans la teinture réactive

Les colorants réactifs forment une liaison covalente avec les fibres cellulosiques. Le pH est donc un paramètre critique. La réaction de fixation nécessite des conditions alcalines (pH 10,5-11,5), mais une alcalinité excessive provoque l'hydrolyse du colorant.

### Le problème : L'hydrolyse du colorant

Lorsque le pH dépasse la plage optimale :
- **Jusqu'à 30% du colorant** peut être perdu par hydrolyse
- Mauvaise solidité au lavage
- Variations de nuance imprévisibles

### La solution : Agents tampons

C'est là que les acides tampons **Grocid GFY** et **Grocid BFF** deviennent essentiels. Contrairement aux acides simples, les agents tampons maintiennent un pH stable.

### Protocole recommandé

1. Prétraitement avec Growet ELF
2. Séquestration avec Groseq PFF (2-3 g/L)
3. Contrôle du pH avec Grocid BFF
4. Lavage post-teinture avec Growash RCT
5. Neutralisation avec Grocid NTR

*Contactez notre équipe technique pour des solutions personnalisées.*`,

        content_ar: `## أهمية التحكم في الرقم الهيدروجيني في الصباغة التفاعلية

تشكل الأصباغ التفاعلية رابطة تساهمية مع ألياف السليلوز. لذلك يعد الرقم الهيدروجيني من أهم المعايير في عملية الصباغة. تتطلب عملية التثبيت ظروفًا قلوية (pH 10.5-11.5).

### المشكلة: التحلل المائي للصبغة

عندما يتجاوز الرقم الهيدروجيني النطاق الأمثل:
- يمكن فقدان **حتى 30%** من الصبغة
- ثبات غسيل ضعيف
- تباينات في الدرجة اللونية

### الحل: عوامل التخزين المؤقت

هنا تصبح أحماض التخزين المؤقت **Grocid GFY** و **Grocid BFF** ضرورية. على عكس الأحماض البسيطة، تحافظ عوامل التخزين المؤقت على درجة حموضة مستقرة.

*اتصل بفريقنا التقني للحصول على حلول مخصصة.*`,
    },

    {
        id: "2",
        slug: "enzyme-desizing-energy-saving",
        category: "sustainability",
        author: "Grohn Kimya R&D",
        date: "2025-11-20",
        image_url: "/images/enzymes.png",
        title_en: "Enzymatic Desizing: Cutting Energy Costs by 40%",
        title_tr: "Enzimatik Haşıl Sökme: Enerji Maliyetini %40 Düşürme",
        title_fr: "Désencollage enzymatique : Réduire les coûts énergétiques de 40%",
        title_ar: "إزالة النشا الإنزيمية: خفض تكاليف الطاقة بنسبة 40%",
        excerpt_en: "How modern enzyme technology enables effective desizing at lower temperatures, reducing both energy consumption and environmental impact.",
        excerpt_tr: "Modern enzim teknolojisinin düşük sıcaklıklarda etkili haşıl sökmeyi nasıl sağladığını ve hem enerji tüketimini hem de çevresel etkiyi nasıl azalttığını keşfedin.",
        excerpt_fr: "Comment la technologie enzymatique moderne permet un désencollage efficace à basse température.",
        excerpt_ar: "كيف تمكن تقنية الإنزيمات الحديثة من إزالة النشا بفعالية في درجات حرارة منخفضة.",
        tags_en: ["enzyme", "desizing", "energy saving", "Grozyme", "sustainability"],
        content_en: `## The Energy Challenge in Textile Pre-Treatment

Traditional desizing processes require temperatures of 80–95°C for extended periods, consuming enormous amounts of energy. With rising energy costs worldwide, textile manufacturers are seeking more efficient alternatives.

### Enzymatic vs. Traditional Desizing

| Parameter | Traditional | Enzymatic (Grozyme AML) |
|-----------|------------|------------------------|
| Temperature | 80-95°C | 50-65°C |
| Duration | 60-90 min | 30-45 min |
| Energy cost | High | **40% lower** |
| Starch removal | 85-90% | **95-98%** |
| Fiber damage | Possible | Minimal |

### How Grozyme AML Works

Grozyme AML is a bacterial alpha-amylase enzyme specifically designed for textile desizing:

1. **Selective action**: Breaks down starch molecules without affecting cellulose fibers
2. **Low-temperature activity**: Optimal performance at 50-65°C
3. **Rapid action**: Complete starch hydrolysis in 30 minutes
4. **Bio-degradable**: Zero residual environmental impact

### Implementation Guide

**Cold pad-batch method (most energy efficient):**
- Grozyme AML: 3-5 g/L
- Growet LFN (low-foam wetting agent): 1-2 g/L
- pH: 6.0-7.0 (natural, no adjustment needed)
- Temperature: 50°C
- Dwell time: 4-8 hours (overnight batch)

**Continuous method:**
- Grozyme AML: 5-8 g/L
- Temperature: 60-65°C
- Contact time: 30-45 minutes

### ROI Calculation

For a mid-size textile mill processing 50 tons/day:
- Energy saving: **€15,000-20,000/year**
- Water saving (fewer rinse cycles): **25%**
- Chemical cost: Comparable to traditional methods

*Request a free trial sample of Grozyme AML for your desizing process.*`,

        content_tr: `## Tekstil Ön İşleminde Enerji Sorunu

Geleneksel haşıl sökme prosesleri uzun süre boyunca 80-95°C sıcaklık gerektirir ve büyük miktarda enerji tüketir.

### Enzimatik vs. Geleneksel Haşıl Sökme

| Parametre | Geleneksel | Enzimatik (Grozyme AML) |
|-----------|------------|------------------------|
| Sıcaklık | 80-95°C | 50-65°C |
| Süre | 60-90 dk | 30-45 dk |
| Enerji maliyeti | Yüksek | **%40 düşük** |
| Nişasta uzaklaştırma | %85-90 | **%95-98** |

### Grozyme AML Nasıl Çalışır?

Grozyme AML, tekstil haşıl sökme için özel olarak tasarlanmış bakteri alfa-amilaz enzimidir:

1. **Seçici etki**: Selüloz liflerine zarar vermeden nişasta moleküllerini parçalar
2. **Düşük sıcaklık aktivitesi**: 50-65°C'de optimum performans
3. **Hızlı etki**: 30 dakikada tam nişasta hidrolizi
4. **Biyolojik olarak parçalanabilir**: Sıfır çevresel etki

### Uygulama Rehberi

**Soğuk pad-batch yöntemi (en enerji verimli):**
- Grozyme AML: 3-5 g/L
- Growet LFN: 1-2 g/L
- pH: 6.0-7.0
- Sıcaklık: 50°C
- Bekleme: 4-8 saat

*Grozyme AML ücretsiz deneme numunenizi talep edin.*`,

        content_fr: `## Le défi énergétique dans le prétraitement textile

Les procédés de désencollage traditionnels nécessitent des températures de 80-95°C, consommant d'énormes quantités d'énergie.

### Désencollage enzymatique vs traditionnel

| Paramètre | Traditionnel | Enzymatique (Grozyme AML) |
|-----------|------------|------------------------|
| Température | 80-95°C | 50-65°C |
| Durée | 60-90 min | 30-45 min |
| Coût énergétique | Élevé | **40% inférieur** |

### Comment fonctionne Grozyme AML

Grozyme AML est une enzyme alpha-amylase conçue pour le désencollage textile. Action sélective à basse température, respectueuse de l'environnement.

*Demandez un échantillon d'essai gratuit de Grozyme AML.*`,

        content_ar: `## تحدي الطاقة في المعالجة المسبقة للنسيج

تتطلب عمليات إزالة النشا التقليدية درجات حرارة 80-95 درجة مئوية، مما يستهلك كميات هائلة من الطاقة.

### إزالة النشا الإنزيمية مقابل التقليدية

| المعيار | التقليدي | الإنزيمي (Grozyme AML) |
|---------|---------|------------------------|
| الحرارة | 80-95°C | 50-65°C |
| التكلفة | مرتفعة | **أقل بنسبة 40%** |

Grozyme AML هو إنزيم ألفا أميليز مصمم خصيصًا لإزالة النشا في المنسوجات.

*اطلب عينة تجريبية مجانية من Grozyme AML.*`,
    },

    {
        id: "3",
        slug: "silicone-softener-selection-guide",
        category: "guide",
        author: "Grohn Kimya R&D",
        date: "2025-10-08",
        image_url: "/images/softeners.png",
        title_en: "How to Choose the Right Silicone Softener for Your Fabric",
        title_tr: "Kumaşınız İçin Doğru Silikon Yumuşatıcıyı Nasıl Seçersiniz?",
        title_fr: "Comment choisir le bon adoucissant silicone pour votre tissu",
        title_ar: "كيف تختار منعم السيليكون المناسب لقماشك",
        excerpt_en: "A practical guide to selecting between micro emulsion, macro emulsion, and hydrophilic silicone softeners based on your fabric type and desired hand feel.",
        excerpt_tr: "Kumaş tipinize ve istediğiniz tuşeye göre mikro emülsiyon, makro emülsiyon ve hidrofilik silikon yumuşatıcılar arasında seçim yapmanız için pratik bir rehber.",
        excerpt_fr: "Guide pratique pour choisir entre micro-émulsion, macro-émulsion et silicones hydrophiles.",
        excerpt_ar: "دليل عملي لاختيار المنعم السيليكوني المناسب حسب نوع القماش.",
        tags_en: ["silicone softener", "softener selection", "Grosil", "hand feel", "textile finishing"],
        content_en: `## Understanding Silicone Softener Types

Choosing the right silicone softener depends on three factors: **fabric type**, **desired hand feel**, and **downstream requirements** (printing, dyeing, water absorption).

### The Grosil Product Family

| Product | Type | Best For | Hand Feel |
|---------|------|----------|-----------|
| **Grosil MKR** | Micro emulsion | Lightweight fabrics | Bright, slippery |
| **Grosil AMN** | Amino macro | Heavy fabrics, terry | Full, lasting softness |
| **Grosil HYD** | Hydrophilic | Sportswear, towels | Soft + water absorbing |
| **Grosil PES** | Polyester-specific | PES & blends | Smooth, no yellowing |

### Decision Matrix

**Want maximum softness?** → Grosil AMN (amino-functional)
- Provides the fullest, most lasting hand feel
- Ideal for towels, bed linen, heavy cotton fabrics
- Note: May slightly affect hydrophilicity

**Want softness + water absorption?** → Grosil HYD (hydrophilic)
- Unique balance of softness and moisture management
- Essential for sportswear and activewear
- Maintains wicking properties after multiple washes

**Want brightness + slipperiness?** → Grosil MKR (micro emulsion)
- Ultra-fine particle size for deep penetration
- Enhances fabric brightness and color vibrancy
- Ideal for lightweight shirts, fashion fabrics

**Working with polyester?** → Grosil PES
- Will not affect sublimation fastness
- No yellowing during heat-setting
- Compatible with PES/cotton blends

### Application Tips

1. Always apply softener as the **last wet process** (after all washing/dyeing)
2. pH should be 5.0-6.0 for optimal absorption
3. Typical dosage: 10-30 g/L depending on desired effect
4. Curing at 150-170°C for 30-60 seconds improves durability

*Need help selecting the right softener? Send us a fabric sample and we'll recommend the optimal solution.*`,

        content_tr: `## Silikon Yumuşatıcı Tiplerini Anlama

Doğru silikon yumuşatıcıyı seçmek üç faktöre bağlıdır: **kumaş tipi**, **istenen tuşe** ve **sonraki işlemler** (baskı, su emicilik vb.).

### Grosil Ürün Ailesi

| Ürün | Tip | En İyi Kullanım | Tuşe |
|------|-----|-----------------|------|
| **Grosil MKR** | Mikro emülsiyon | Hafif kumaşlar | Parlak, kaygan |
| **Grosil AMN** | Amino makro | Ağır kumaşlar, havlu | Dolgun, kalıcı |
| **Grosil HYD** | Hidrofilik | Spor giyim, havlu | Yumuşak + su emici |
| **Grosil PES** | Polyester özel | PES ve karışımlar | Düz, sararma yok |

### Karar Matrisi

**Maksimum yumuşaklık?** → Grosil AMN
**Yumuşaklık + su emicilik?** → Grosil HYD
**Parlaklık + kaygan tuşe?** → Grosil MKR
**Polyester?** → Grosil PES

*Doğru yumuşatıcıyı seçmek için kumaş numunesi gönderin, en uygun çözümü önerelim.*`,

        content_fr: `## Comprendre les types d'adoucissants silicone

Le choix du bon adoucissant dépend du type de tissu, du toucher souhaité et des exigences en aval.

### La famille Grosil

| Produit | Type | Meilleur pour | Toucher |
|---------|------|---------------|---------|
| **Grosil MKR** | Micro-émulsion | Tissus légers | Brillant, glissant |
| **Grosil AMN** | Amino macro | Tissus lourds | Plein, durable |
| **Grosil HYD** | Hydrophile | Sportswear | Doux + absorbant |

*Envoyez-nous un échantillon de tissu pour une recommandation personnalisée.*`,

        content_ar: `## فهم أنواع منعمات السيليكون

يعتمد اختيار منعم السيليكون الصحيح على نوع القماش والملمس المطلوب والمتطلبات اللاحقة.

### عائلة منتجات Grosil

| المنتج | النوع | الأفضل لـ | الملمس |
|--------|-------|-----------|--------|
| **Grosil MKR** | مستحلب دقيق | أقمشة خفيفة | لامع وزلق |
| **Grosil AMN** | أمينو ماكرو | أقمشة ثقيلة | ممتلئ ودائم |
| **Grosil HYD** | محب للماء | الملابس الرياضية | ناعم + ماص |

*أرسل لنا عينة قماش للحصول على توصية مخصصة.*`,
    },
];
