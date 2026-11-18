# Yeni talep e-posta bildirimleri

İletişim mesajları ve ürün/kimya sözlüğü sayfalarındaki teklif talepleri,
veritabanına kaydedildikten sonra bildirim e-postası oluşturur. Alıcı adresi müşteri
formundan alınmaz; yalnızca sunucu ayarlarından belirlenir.

E-posta; müşteri, firma, ürün, miktar, ülke, teslim şekli ve mesaj bilgilerini,
kaydın bulunduğu yönetim paneli bölümüne bağlantıyı içerir. Yanıt adresi müşteridir.
Teklif kaydı Mesajlar'a yedeklenmişse aynı talep için tek bildirim gönderilir ve
bağlantı Mesajlar bölümünü açar. Elle eklenen kayıtlar ve eski talepler kapsam dışıdır.

## Canlı ortamda etkinleştirme

1. [Resend](https://resend.com/domains) hesabında gönderici alan adını doğrulayın.
   Örneğin `bildirim.grohn.com.tr` alt alan adını kullanabilirsiniz. Resend'in
   gösterdiği DNS kayıtlarını ekleyin; mevcut e-posta hizmetinin kök alan adı MX
   kayıtlarını değiştirmeyin.
2. Resend'de e-posta gönderme yetkisi olan bir API anahtarı oluşturun.
3. Vercel projesinin **Settings → Environment Variables** bölümüne aşağıdaki
   değişkenleri **Production** ortamı için ekleyin. Anahtarı sohbetlere veya
   GitHub'a yazmayın. Preview ortamına gerçek ayarları eklemek önizleme
   formlarından da gerçek e-posta gönderilmesine neden olur.

| Değişken | Örnek / açıklama |
| --- | --- |
| `RESEND_API_KEY` | Resend gönderim anahtarı |
| `LEAD_NOTIFICATION_FROM` | `Grohn Bildirim <talepler@bildirim.grohn.com.tr>`; doğrulanan alan adıyla eşleşmeli |
| `LEAD_NOTIFICATION_TO` | İsteğe bağlı; varsayılan `grohn@grohn.com.tr`. Birden fazla adres için virgülle ayırın |
| `NEXT_PUBLIC_SITE_URL` | `https://grohn.com.tr`; panel bağlantıları için |

4. Değişikliği birleştirip yeni production deployment oluşturun. Ortam ayarlarını
   mevcut deployment'a eklemek tek başına yeterli değildir.
5. Canlı iletişim formundan ve bir ürünün teklif formundan kontrollü birer talep
   gönderip panel kaydını, e-postayı ve yanıt adresini doğrulayın. Resend'in gönderim
   kayıtlarından kabul/teslim durumunu inceleyin.

## Hata davranışı ve sınırlar

- Bildirim Next.js `after` ile yanıt sonrasında yürütülür; form e-postayı beklemez.
- Ağ hataları, HTTP 429 ve 5xx yanıtlarında bir kez yeniden denenir. İki deneme
  aynı Resend idempotency anahtarını kullanır. Her istek en fazla 5 saniye sürer.
- E-posta hatası kaydedilmiş talebi silmez veya formu başarısız göstermez. Her iki
  deneme de başarısızsa Vercel loglarında hata görülür.
- Ayarlar eksikse e-posta gönderilmez ve sunucu logunda uyarı oluşur.
- Bu sürüm anlık yeni talep bildirimidir; günlük özet, eski taleplere hatırlatma,
  kalıcı gönderim kuyruğu ve daha sonra otomatik tekrar gönderme içermez.

## Kontroller

```sh
node --test tests/lead-notifications.test.cjs
npm run build -- --webpack
```

Testler sağlayıcıyı ve veritabanını taklit eder; gerçek e-posta göndermez.
