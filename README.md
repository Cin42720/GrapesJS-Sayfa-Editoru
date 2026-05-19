# GrapesJS Studio – Görsel Sayfa Düzenleyici

Modern, sürükle-bırak tabanlı web sayfası düzenleyicisi. GrapesJS altyapısı üzerine inşa edilmiş, koyu temalı premium arayüzü ile sayfalarınızı kolayca tasarlayın, kaydedin ve yayınlayın.

## Özellikler

### Düzenleyici
- **Sürükle & Bırak** – Hazır blokları sürükleyerek sayfa oluşturma
- **Canlı Düzenleme** – Metinleri, renkleri ve boyutları doğrudan canvas üzerinde değiştirme
- **Koyu Tema** – Elektrik moru / cyan aksanlı premium karanlık arayüz
- **Responsive Cihaz Görünümü** – Masaüstü, tablet ve mobil önizleme
- **Geri Al / Yinele** – Toolbar butonları ve `Ctrl+S` / `Ctrl+Z` klavye kısayolları
- **Toast Bildirimleri** – Kaydetme, hata ve bilgi durumları için animasyonlu bildirimler
- **Sayfa Yönetimi** – Yeni sayfa oluşturma, sayfa seçme ve silme (onay diyaloğu ile)
- **HTML Dışa Aktarma** – Aktif sayfayı tek HTML dosyası olarak indirme

### Hazır Bloklar
| Kategori | Bloklar |
|----------|---------|
| **Temel** | 1/2/3 Sütun, Metin, Bağlantı, Görsel, Video, Harita, Ayırıcı, Boşluk |
| **Bölümler** | Hero, Navigasyon, Özellik Kartları, İstatistik Şeridi, Süreç, Portfolyo Galerisi, Fiyat Tablosu, SSS, İletişim, CTA, Müşteri Yorumu, Alt Bilgi |
| **Formlar** | Form, Giriş Alanı, Metin Alanı, Açılır Liste, Buton, Onay Kutusu, Radyo Düğmesi |
| **Ek Bileşenler** | Sekmeler, Geri Sayım, İpucu, Yazı Animasyonu, Gradient stil desteği |

### Kayıt Sistemi
- **Dosya Kaydı** – Varsayılan olarak `storage/pages` klasörüne JSON dosyası olarak kaydeder
- **MySQL Kaydı** – Ortam değişkeni ile MySQL veritabanına geçiş yapılabilir
- **Otomatik Tablo Oluşturma** – MySQL modunda `pages` tablosu otomatik oluşturulur

### Önizleme
- `/p/:slug` adresinden kaydedilmiş sayfayı ziyaretçi görünümüyle görüntüleme
- Google Fonts (Inter) entegrasyonu
- SEO meta etiketleri (title, description)

## İstenenleri Karşılama Durumu

| İstek | Durum | Açıklama |
|-------|-------|----------|
| GrapesJS kaynak kodlarını kullanarak siteye gömülü uygulama | Karşılandı | Express uygulaması `/editor.html` içinde GrapesJS editörünü yerel `node_modules` paketlerinden servis ederek çalıştırır. |
| Hazırlanmış web sayfalarını araç üzerinden düzenleme | Karşılandı | Sayfalar GrapesJS canvas üzerinde sürükle-bırak, stil paneli, blok paneli ve cihaz görünümü ile düzenlenir. |
| Düzenlenen sayfayı kaydetme | Karşılandı | `POST /api/pages/:slug` aktif sayfanın `projectData`, HTML ve CSS çıktısını kaydeder. |
| Ziyaretçi/önizleme görünümü | Karşılandı | `GET /p/:slug` kayıtlı sayfayı editör paneli olmadan yayın görünümüyle gösterir. |
| Veritabanı MySQL veya dosya olarak kayıt | Karşılandı | Varsayılan `file` sürücüsü `storage/pages` altına JSON kaydeder; `STORAGE_DRIVER=mysql` ile MySQL sürücüsü kullanılır. |
| Birden fazla sayfa yönetimi | Karşılandı | Sayfa listesi, yeni sayfa oluşturma ve silme API/arayüz üzerinden desteklenir. |

## Kurulum ve Çalıştırma

### Gereksinimler
- [Node.js](https://nodejs.org/) v18 veya üzeri

### Adımlar

```bash
# 1. Bağımlılıkları yükleyin
npm install

# 2. Ortam dosyasını oluşturun (isteğe bağlı)
# Windows PowerShell:
Copy-Item .env.example .env
# Linux / macOS:
# cp .env.example .env

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

Sunucu başlatıldıktan sonra tarayıcınızda açın:

- **Düzenleyici:** `http://localhost:3000`
- **Önizleme:** `http://localhost:3000/p/anasayfa`

## Ortam Değişkenleri

`.env` dosyasını `.env.example` dosyasından kopyalayarak oluşturun ve ihtiyacınıza göre düzenleyin:

| Değişken | Varsayılan | Açıklama |
|----------|-----------|----------|
| `PORT` | `3000` | Sunucunun çalışacağı port |
| `STORAGE_DRIVER` | `file` | Kayıt sürücüsü: `file` veya `mysql` |
| `FILE_STORAGE_DIR` | `storage/pages` | Dosya kaydı için klasör yolu |
| `MYSQL_HOST` | `127.0.0.1` | MySQL sunucu adresi |
| `MYSQL_PORT` | `3306` | MySQL port numarası |
| `MYSQL_DATABASE` | – | MySQL veritabanı adı |
| `MYSQL_USER` | `root` | MySQL kullanıcı adı |
| `MYSQL_PASSWORD` | – | MySQL şifresi |

### MySQL Kullanımı

```env
STORAGE_DRIVER=mysql
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=grapesjs_editor
MYSQL_USER=root
MYSQL_PASSWORD=sifreniz
```

## API Uç Noktaları

| Yöntem | Adres | Açıklama |
|--------|-------|----------|
| `GET` | `/api/config` | Kayıt sürücüsü bilgisini döndürür |
| `GET` | `/api/pages` | Tüm sayfaları listeler |
| `GET` | `/api/pages/:slug` | Belirtilen sayfayı yükler |
| `POST` | `/api/pages/:slug` | Sayfa verisini kaydeder (projectData, HTML, CSS) |
| `DELETE` | `/api/pages/:slug` | Belirtilen sayfayı siler |
| `GET` | `/p/:slug` | Sayfayı ziyaretçi görünümüyle gösterir |

### Örnek Kayıt İsteği

```bash
curl -X POST http://localhost:3000/api/pages/ornek-sayfa \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Örnek Sayfa",
    "projectData": { "pages": [] },
    "html": "<h1>Merhaba</h1>",
    "css": "h1 { color: blue; }"
  }'
```

## Proje Yapısı

```
Grape.js/
├── public/
│   ├── editor.html          # Düzenleyici HTML sayfası
│   └── assets/
│       ├── editor.css        # Premium koyu tema stilleri
│       └── editor.js         # Düzenleyici mantığı ve blok tanımları
├── src/
│   ├── server.js             # Express sunucu ve API rotaları
│   └── storage/
│       ├── index.js          # Kayıt sürücüsü fabrikası
│       ├── fileStore.js      # Dosya tabanlı kayıt modülü
│       ├── mysqlStore.js     # MySQL tabanlı kayıt modülü
│       └── defaultPage.js    # Varsayılan sayfa şablonu
├── storage/pages/            # Kaydedilen sayfalar (dosya modu)
├── .env.example              # Ortam değişkenleri şablonu
├── package.json
└── README.md
```

## Kullanılan Eklentiler

| Eklenti | Açıklama |
|---------|----------|
| `grapesjs` | Ana sürükle-bırak web düzenleyici motoru |
| `grapesjs-blocks-basic` | Temel yapı blokları (sütun, metin, görsel, vb.) |
| `grapesjs-plugin-forms` | Form bileşenleri (input, select, textarea, buton) |
| `grapesjs-tabs` | Sekme bileşeni |
| `grapesjs-preset-webpage` | Web sayfası ön ayarları ve ek stil yöneticisi sektörleri |
| `grapesjs-component-countdown` | Geri sayım bileşeni |
| `grapesjs-tooltip` | İpucu bileşeni |
| `grapesjs-typed` | Yazı animasyonu bileşeni |
| `grapesjs-style-gradient` | Gradient arka plan stil girişi |

## Notlar

- Varsayılan kayıt modu dosyadır; `storage/pages` klasörü çalışma sırasında JSON kayıtları için kullanılır.
- Örnek ana sayfa şablonu uygulama ilk açıldığında hazır gelir ve editör üzerinden değiştirilebilir.
- MySQL modu için `.env` dosyasındaki bağlantı bilgileri doldurulmalıdır.

## Lisans

Bu proje kişisel kullanım amaçlıdır.
