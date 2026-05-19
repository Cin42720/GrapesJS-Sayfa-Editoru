/* ═══════════════════════════════════════════════════════
   GrapesJS Studio – Editor Logic
   ═══════════════════════════════════════════════════════ */

const $ = (sel) => document.querySelector(sel);
const pageSelect = $('#pageSelect');
const newPageSlug = $('#newPageSlug');
const newPageButton = $('#newPageButton');
const saveButton = $('#saveButton');
const previewLink = $('#previewLink');
const storageBadge = $('#storageBadge');
const statusEl = $('#status');
const undoBtn = $('#undoButton');
const redoBtn = $('#redoButton');
const deleteBtn = $('#deletePageButton');
const exportBtn = $('#exportButton');

let currentSlug = new URLSearchParams(location.search).get('page') || 'anasayfa';
let currentName = 'Ana Sayfa';

/* ── Editor Init ── */
const editor = grapesjs.init({
  container: '#gjs',
  height: '100%',
  fromElement: false,
  storageManager: false,
  selectorManager: { componentFirst: true },
  deviceManager: {
    devices: [
      { name: 'Desktop', width: '' },
      { name: 'Tablet', width: '768px', widthMedia: '992px' },
      { name: 'Mobile Portrait', width: '375px', widthMedia: '480px' }
    ]
  },
  i18n: {
    locale: 'tr',
    localeFallback: 'tr',
    detectLocale: false,
    messages: {
      tr: {
        assetManager: {
          addButton: 'Görsel ekle',
          inputPlh: 'https://site.com/gorsel.jpg',
          modalTitle: 'Görsel Seç',
          uploadTitle: 'Dosyaları buraya bırakın veya yüklemek için tıklayın'
        },
        deviceManager: {
          device: 'Cihaz',
          devices: {
            desktop: 'Masaüstü',
            tablet: 'Tablet',
            mobileLandscape: 'Mobil yatay',
            mobilePortrait: 'Mobil dikey'
          }
        },
        panels: {
          buttons: {
            titles: {
              preview: 'Önizleme',
              fullscreen: 'Tam ekran',
              'sw-visibility': 'Bileşen sınırlarını göster',
              'export-template': 'Kodu görüntüle',
              'open-sm': 'Stil yöneticisi',
              'open-tm': 'Ayarlar',
              'open-layers': 'Katmanlar',
              'open-blocks': 'Bloklar'
            }
          }
        },
        selectorManager: {
          label: 'Sınıflar',
          selected: 'Seçili',
          emptyState: '- Durum -',
          states: {
            hover: 'Üzerine gelince',
            active: 'Tıklanınca',
            'nth-of-type(2n)': 'Tek/çift'
          }
        },
        styleManager: {
          empty: 'Stilleri düzenlemek için bir öğe seçin',
          layer: 'Katman',
          fileButton: 'Görseller',
          sectors: {
            general: 'Genel',
            layout: 'Yerleşim',
            typography: 'Yazı',
            decorations: 'Görünüm',
            extra: 'Ek',
            flex: 'Esnek düzen',
            dimension: 'Ölçüler'
          },
          properties: {
            float: 'Yaslama',
            display: 'Görünüm',
            position: 'Konum',
            top: 'Üst',
            right: 'Sağ',
            bottom: 'Alt',
            left: 'Sol',
            width: 'Genişlik',
            height: 'Yükseklik',
            'font-size': 'Yazı boyutu',
            'font-family': 'Yazı tipi',
            'font-weight': 'Yazı kalınlığı',
            color: 'Metin rengi',
            'background-color': 'Arka plan rengi',
            'background-image': 'Arka plan',
            'border-radius': 'Köşe yuvarlaklığı',
            'box-shadow': 'Gölge',
            opacity: 'Opaklık',
            padding: 'İç boşluk',
            margin: 'Dış boşluk'
          }
        },
        traitManager: {
          empty: 'Özellikleri düzenlemek için bir öğe seçin',
          label: 'Bileşen ayarları',
          traits: {
            labels: {
              id: 'Kimlik',
              alt: 'Alternatif metin',
              title: 'Başlık',
              href: 'Bağlantı',
              target: 'Açılış biçimi'
            },
            attributes: {
              id: { placeholder: 'Örn. bolum-adi' },
              alt: { placeholder: 'Örn. Ürün görseli' },
              title: { placeholder: 'Örn. Başlık' },
              href: { placeholder: 'Örn. https://site.com' }
            },
            options: {
              target: {
                false: 'Aynı pencere',
                _blank: 'Yeni pencere'
              }
            }
          }
        },
        storageManager: {
          recover: 'Kaydedilmemiş değişiklikleri geri yüklemek ister misiniz?'
        }
      }
    }
  },
  plugins: [
    'gjs-blocks-basic',
    'grapesjs-plugin-forms',
    'grapesjs-tabs',
    'grapesjs-preset-webpage',
    'grapesjs-component-countdown',
    'grapesjs-tooltip',
    'grapesjs-typed',
    'grapesjs-style-gradient'
  ],
  pluginsOpts: {
    'gjs-blocks-basic': {
      flexGrid: true,
      blocks: ['column1', 'column2', 'column3', 'text', 'link', 'image', 'video', 'map'],
      labelColumn1: '1 Sütun',
      labelColumn2: '2 Sütun',
      labelColumn3: '3 Sütun',
      labelColumn37: '3/7 Sütun',
      labelText: 'Metin',
      labelLink: 'Bağlantı',
      labelImage: 'Görsel',
      labelVideo: 'Video',
      labelMap: 'Harita',
      category: 'Temel'
    },
    'grapesjs-plugin-forms': {
      category: 'Formlar'
    },
    'grapesjs-tabs': {
      tabsLabel: 'Sekmeler',
      category: 'Ek Bileşenler'
    },
    'grapesjs-preset-webpage': {
      blocksBasicOpts: false,
      formsOpts: false,
      block: () => ({ category: 'Hazır İçerikler' }),
      modalImportTitle: 'HTML içe aktar',
      modalImportButton: 'İçe aktar',
      textCleanCanvas: 'Sayfadaki tüm içerik temizlensin mi?'
    },
    'grapesjs-component-countdown': {
      label: 'Geri Sayım',
      labelDays: 'gün',
      labelHours: 'saat',
      labelMinutes: 'dakika',
      labelSeconds: 'saniye',
      endText: 'Süre doldu',
      startTime: '2030-01-01',
      block: { label: 'Geri Sayım', category: 'Ek Bileşenler' }
    },
    'grapesjs-tooltip': {
      labelTooltip: 'İpucu',
      blockTooltip: { label: 'İpucu', category: 'Ek Bileşenler' }
    },
    'grapesjs-typed': {
      block: { label: 'Yazı Animasyonu', category: 'Ek Bileşenler' },
      props: props => ({
        ...props,
        strings: ['Hızlı sayfalar', 'Görsel düzenleme', 'Esnek bloklar'],
        'type-speed': 45,
        'back-speed': 22,
        loop: true
      })
    },
    'grapesjs-style-gradient': {
      builtInType: 'background-image'
    }
  },
  canvas: {
    styles: [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ]
  }
});

/* ── Ensure device commands exist ── */
const cm = editor.Commands;

if (!cm.has('set-device-desktop')) {
  cm.add('set-device-desktop', { run: (ed) => ed.setDevice('Desktop') });
}
if (!cm.has('set-device-tablet')) {
  cm.add('set-device-tablet', { run: (ed) => ed.setDevice('Tablet') });
}
if (!cm.has('set-device-mobile')) {
  cm.add('set-device-mobile', { run: (ed) => ed.setDevice('Mobile Portrait') });
}

/* ── Custom Blocks ── */
const bm = editor.BlockManager;

bm.add('hero-section', {
  label: 'Hero Bölümü',
  category: 'Bölümler',
  content: `<section style="min-height:80vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0b0d14 0%,#1a1e2e 40%,#6c5ce7 100%);padding:60px 8vw;text-align:center;">
    <div style="max-width:700px;">
      <h1 style="margin:0 0 16px;font-family:Inter,sans-serif;font-size:52px;font-weight:800;color:#fff;line-height:1.1;">Başlığınızı Buraya Yazın</h1>
      <p style="margin:0 0 32px;font-size:18px;color:rgba(255,255,255,0.7);line-height:1.6;">Alt açıklama metninizi buraya ekleyin. Kısa ve etkileyici olsun.</p>
      <a href="#" style="display:inline-block;padding:14px 32px;border-radius:8px;background:#6c5ce7;color:#fff;font-weight:700;text-decoration:none;font-size:15px;">Başla</a>
    </div>
  </section>`,
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="6" y1="9" x2="18" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/><rect x="9" y="16" width="6" height="2" rx="1"/></svg>'
});

bm.add('feature-cards', {
  label: 'Özellik Kartları',
  category: 'Bölümler',
  content: `<section style="padding:80px 8vw;background:#f8f9fa;">
    <h2 style="text-align:center;font-family:Inter,sans-serif;font-size:36px;font-weight:700;margin:0 0 48px;color:#1a1e2e;">Özellikler</h2>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
      <div style="padding:32px;border-radius:12px;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,0.06);text-align:center;">
        <div style="width:48px;height:48px;margin:0 auto 16px;border-radius:10px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);"></div>
        <h3 style="margin:0 0 8px;font-size:18px;font-weight:700;color:#1a1e2e;">Özellik Bir</h3>
        <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">Açıklama metni buraya gelecek.</p>
      </div>
      <div style="padding:32px;border-radius:12px;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,0.06);text-align:center;">
        <div style="width:48px;height:48px;margin:0 auto 16px;border-radius:10px;background:linear-gradient(135deg,#00cec9,#55efc4);"></div>
        <h3 style="margin:0 0 8px;font-size:18px;font-weight:700;color:#1a1e2e;">Özellik İki</h3>
        <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">Açıklama metni buraya gelecek.</p>
      </div>
      <div style="padding:32px;border-radius:12px;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,0.06);text-align:center;">
        <div style="width:48px;height:48px;margin:0 auto 16px;border-radius:10px;background:linear-gradient(135deg,#fd79a8,#e84393);"></div>
        <h3 style="margin:0 0 8px;font-size:18px;font-weight:700;color:#1a1e2e;">Özellik Üç</h3>
        <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">Açıklama metni buraya gelecek.</p>
      </div>
    </div>
  </section>`,
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="6" height="16" rx="1"/><rect x="9" y="4" width="6" height="16" rx="1"/><rect x="17" y="4" width="6" height="16" rx="1"/></svg>'
});

bm.add('navbar-block', {
  label: 'Navigasyon',
  category: 'Bölümler',
  content: `<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 8vw;background:#1a1e2e;">
    <a href="#" style="font-family:Inter,sans-serif;font-size:20px;font-weight:800;color:#fff;text-decoration:none;">Logo</a>
    <div style="display:flex;gap:24px;align-items:center;">
      <a href="#" style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:14px;font-weight:500;">Ana Sayfa</a>
      <a href="#" style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:14px;font-weight:500;">Hakkımızda</a>
      <a href="#" style="color:rgba(255,255,255,0.7);text-decoration:none;font-size:14px;font-weight:500;">İletişim</a>
      <a href="#" style="display:inline-block;padding:8px 20px;border-radius:6px;background:#6c5ce7;color:#fff;text-decoration:none;font-size:14px;font-weight:600;">Başla</a>
    </div>
  </nav>`,
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="4" rx="1"/><line x1="6" y1="6" x2="8" y2="6"/><line x1="14" y1="6" x2="16" y2="6"/><line x1="18" y1="6" x2="20" y2="6"/></svg>'
});

bm.add('footer-block', {
  label: 'Alt Bilgi',
  category: 'Bölümler',
  content: `<footer style="padding:48px 8vw 24px;background:#0b0d14;color:#fff;">
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:32px;margin-bottom:32px;">
      <div>
        <h4 style="font-size:18px;font-weight:700;margin:0 0 12px;">Marka Adı</h4>
        <p style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.6;margin:0;">Kısa açıklama metni buraya gelecek.</p>
      </div>
      <div>
        <h5 style="font-size:13px;font-weight:600;margin:0 0 12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.05em;">Ürün</h5>
        <a href="#" style="display:block;color:rgba(255,255,255,0.6);text-decoration:none;font-size:13px;margin-bottom:8px;">Özellikler</a>
        <a href="#" style="display:block;color:rgba(255,255,255,0.6);text-decoration:none;font-size:13px;margin-bottom:8px;">Fiyatlar</a>
      </div>
      <div>
        <h5 style="font-size:13px;font-weight:600;margin:0 0 12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.05em;">Şirket</h5>
        <a href="#" style="display:block;color:rgba(255,255,255,0.6);text-decoration:none;font-size:13px;margin-bottom:8px;">Hakkımızda</a>
        <a href="#" style="display:block;color:rgba(255,255,255,0.6);text-decoration:none;font-size:13px;margin-bottom:8px;">İletişim</a>
      </div>
      <div>
        <h5 style="font-size:13px;font-weight:600;margin:0 0 12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.05em;">Yasal</h5>
        <a href="#" style="display:block;color:rgba(255,255,255,0.6);text-decoration:none;font-size:13px;margin-bottom:8px;">Gizlilik</a>
        <a href="#" style="display:block;color:rgba(255,255,255,0.6);text-decoration:none;font-size:13px;margin-bottom:8px;">Şartlar</a>
      </div>
    </div>
    <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:20px;text-align:center;">
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);">© 2026 Marka Adı. Tüm hakları saklıdır.</p>
    </div>
  </footer>`,
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="16" width="20" height="5" rx="1"/><line x1="6" y1="18.5" x2="10" y2="18.5"/><line x1="14" y1="18.5" x2="18" y2="18.5"/></svg>'
});

bm.add('pricing-section', {
  label: 'Fiyat Tablosu',
  category: 'Bölümler',
  content: `<section style="padding:80px 8vw;background:#fff;">
    <h2 style="text-align:center;font-size:36px;font-weight:700;margin:0 0 48px;color:#1a1e2e;">Fiyatlandırma</h2>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:960px;margin:0 auto;">
      <div style="padding:32px;border-radius:12px;border:1px solid #e9ecef;text-align:center;">
        <h3 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#1a1e2e;">Başlangıç</h3>
        <p style="margin:0 0 20px;font-size:13px;color:#999;">Bireysel kullanım</p>
        <div style="font-size:40px;font-weight:800;color:#1a1e2e;margin-bottom:20px;">₺0<span style="font-size:14px;font-weight:400;color:#999;">/ay</span></div>
        <a href="#" style="display:block;padding:12px;border-radius:8px;border:1px solid #6c5ce7;color:#6c5ce7;text-decoration:none;font-weight:600;">Seç</a>
      </div>
      <div style="padding:32px;border-radius:12px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);text-align:center;transform:scale(1.05);box-shadow:0 12px 40px rgba(108,92,231,0.3);">
        <h3 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#fff;">Profesyonel</h3>
        <p style="margin:0 0 20px;font-size:13px;color:rgba(255,255,255,0.7);">Küçük ekipler</p>
        <div style="font-size:40px;font-weight:800;color:#fff;margin-bottom:20px;">₺99<span style="font-size:14px;font-weight:400;color:rgba(255,255,255,0.7);">/ay</span></div>
        <a href="#" style="display:block;padding:12px;border-radius:8px;background:#fff;color:#6c5ce7;text-decoration:none;font-weight:600;">Seç</a>
      </div>
      <div style="padding:32px;border-radius:12px;border:1px solid #e9ecef;text-align:center;">
        <h3 style="margin:0 0 4px;font-size:20px;font-weight:700;color:#1a1e2e;">Kurumsal</h3>
        <p style="margin:0 0 20px;font-size:13px;color:#999;">Büyük takımlar</p>
        <div style="font-size:40px;font-weight:800;color:#1a1e2e;margin-bottom:20px;">₺249<span style="font-size:14px;font-weight:400;color:#999;">/ay</span></div>
        <a href="#" style="display:block;padding:12px;border-radius:8px;border:1px solid #6c5ce7;color:#6c5ce7;text-decoration:none;font-weight:600;">Seç</a>
      </div>
    </div>
  </section>`,
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/><line x1="15" y1="21" x2="15" y2="9"/></svg>'
});

bm.add('cta-section', {
  label: 'CTA Bölümü',
  category: 'Bölümler',
  content: `<section style="padding:80px 8vw;background:linear-gradient(135deg,#6c5ce7 0%,#00cec9 100%);text-align:center;">
    <h2 style="margin:0 0 16px;font-size:36px;font-weight:800;color:#fff;">Hemen Başlayın</h2>
    <p style="margin:0 0 32px;font-size:16px;color:rgba(255,255,255,0.8);max-width:500px;margin-left:auto;margin-right:auto;">Bugün ücretsiz deneyin. Kredi kartı gerekmez.</p>
    <a href="#" style="display:inline-block;padding:14px 36px;border-radius:8px;background:#fff;color:#6c5ce7;font-weight:700;text-decoration:none;font-size:15px;">Ücretsiz Dene</a>
  </section>`,
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="10" rx="2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>'
});

bm.add('testimonial-block', {
  label: 'Müşteri Yorumu',
  category: 'Bölümler',
  content: `<section style="padding:80px 8vw;background:#f8f9fa;">
    <div style="max-width:640px;margin:0 auto;text-align:center;">
      <div style="width:64px;height:64px;margin:0 auto 20px;border-radius:50%;background:linear-gradient(135deg,#6c5ce7,#a29bfe);"></div>
      <p style="font-size:18px;line-height:1.7;color:#333;font-style:italic;margin:0 0 20px;">"Bu ürün sayesinde iş süreçlerimiz inanılmaz hızlandı. Kesinlikle tavsiye ediyorum."</p>
      <strong style="font-size:14px;color:#1a1e2e;">Ahmet Yılmaz</strong>
      <p style="margin:4px 0 0;font-size:12px;color:#999;">CEO, Örnek Şirket</p>
    </div>
  </section>`,
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'
});

bm.add('stats-strip', {
  label: 'İstatistik Şeridi',
  category: 'Bölümler',
  content: `<section style="padding:34px 8vw;background:#111827;color:#fff;">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;max-width:1120px;margin:0 auto;">
      <div style="padding:20px;border-radius:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);">
        <strong style="display:block;font-size:34px;line-height:1;color:#a29bfe;">48K</strong>
        <span style="display:block;margin-top:8px;color:rgba(255,255,255,0.62);font-size:13px;">Yayınlanan sayfa</span>
      </div>
      <div style="padding:20px;border-radius:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);">
        <strong style="display:block;font-size:34px;line-height:1;color:#00cec9;">120+</strong>
        <span style="display:block;margin-top:8px;color:rgba(255,255,255,0.62);font-size:13px;">Hazır blok</span>
      </div>
      <div style="padding:20px;border-radius:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);">
        <strong style="display:block;font-size:34px;line-height:1;color:#fd79a8;">3 dk</strong>
        <span style="display:block;margin-top:8px;color:rgba(255,255,255,0.62);font-size:13px;">Ortalama kurulum</span>
      </div>
      <div style="padding:20px;border-radius:14px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);">
        <strong style="display:block;font-size:34px;line-height:1;color:#ffe66d;">99%</strong>
        <span style="display:block;margin-top:8px;color:rgba(255,255,255,0.62);font-size:13px;">Memnuniyet</span>
      </div>
    </div>
  </section>`,
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-8"/><path d="M22 19H2"/></svg>'
});

bm.add('process-section', {
  label: 'Süreç Bölümü',
  category: 'Bölümler',
  content: `<section style="padding:90px 8vw;background:#fff;">
    <div style="max-width:1120px;margin:0 auto;">
      <div style="max-width:620px;margin-bottom:42px;">
        <span style="display:inline-block;margin-bottom:12px;color:#6c5ce7;font-weight:700;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Nasıl çalışır?</span>
        <h2 style="margin:0;font-size:40px;line-height:1.1;color:#111827;">Yayına çıkmak üç net adım.</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:22px;">
        <article style="padding:30px;border:1px solid #e9ecef;border-radius:18px;background:#fbfbfd;">
          <span style="display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:#6c5ce7;color:#fff;font-weight:800;margin-bottom:24px;">1</span>
          <h3 style="margin:0 0 10px;font-size:20px;color:#111827;">Blok seç</h3>
          <p style="margin:0;color:#667085;line-height:1.65;">Hero, fiyat, form, referans ve galeri bölümlerini sürükleyip sayfaya bırak.</p>
        </article>
        <article style="padding:30px;border:1px solid #e9ecef;border-radius:18px;background:#fbfbfd;">
          <span style="display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:#00cec9;color:#06201f;font-weight:800;margin-bottom:24px;">2</span>
          <h3 style="margin:0 0 10px;font-size:20px;color:#111827;">İçeriği düzenle</h3>
          <p style="margin:0;color:#667085;line-height:1.65;">Metinleri, renkleri, boşlukları ve responsive görünümü görsel panelden ayarla.</p>
        </article>
        <article style="padding:30px;border:1px solid #e9ecef;border-radius:18px;background:#fbfbfd;">
          <span style="display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:#fd79a8;color:#fff;font-weight:800;margin-bottom:24px;">3</span>
          <h3 style="margin:0 0 10px;font-size:20px;color:#111827;">Kaydet ve yayınla</h3>
          <p style="margin:0;color:#667085;line-height:1.65;">Sayfanı dosyaya veya MySQL'e kaydet, önizle ve HTML olarak dışa aktar.</p>
        </article>
      </div>
    </div>
  </section>`,
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 12h3M14 12h3"/></svg>'
});

bm.add('gallery-section', {
  label: 'Portfolyo Galerisi',
  category: 'Bölümler',
  content: `<section style="padding:90px 8vw;background:#0b0d14;color:#fff;">
    <div style="max-width:1120px;margin:0 auto;">
      <div style="display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:34px;">
        <div>
          <span style="display:inline-block;margin-bottom:12px;color:#00cec9;font-weight:700;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Vitrin</span>
          <h2 style="margin:0;font-size:40px;line-height:1.1;">Öne çıkan çalışmalar</h2>
        </div>
        <a href="#" style="color:#a29bfe;text-decoration:none;font-weight:700;">Tümünü gör →</a>
      </div>
      <div style="display:grid;grid-template-columns:1.2fr 0.8fr 0.8fr;gap:18px;">
        <article style="min-height:360px;border-radius:20px;background:linear-gradient(135deg,#6c5ce7,#00cec9);padding:24px;display:flex;align-items:end;box-shadow:0 24px 70px rgba(0,0,0,0.28);">
          <div><h3 style="margin:0 0 8px;font-size:24px;">SaaS Landing</h3><p style="margin:0;color:rgba(255,255,255,0.72);">Dönüşüm odaklı ürün sayfası.</p></div>
        </article>
        <article style="min-height:360px;border-radius:20px;background:linear-gradient(135deg,#fd79a8,#e84393);padding:24px;display:flex;align-items:end;">
          <div><h3 style="margin:0 0 8px;font-size:22px;">Ajans Sitesi</h3><p style="margin:0;color:rgba(255,255,255,0.72);">Portfolyo ve teklif akışı.</p></div>
        </article>
        <article style="min-height:360px;border-radius:20px;background:linear-gradient(135deg,#ffe66d,#00cec9);padding:24px;display:flex;align-items:end;color:#111827;">
          <div><h3 style="margin:0 0 8px;font-size:22px;">Etkinlik</h3><p style="margin:0;color:rgba(17,24,39,0.68);">Program ve kayıt sayfası.</p></div>
        </article>
      </div>
    </div>
  </section>`,
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="7" height="7" rx="1"/><rect x="14" y="4" width="7" height="7" rx="1"/><rect x="3" y="15" width="18" height="5" rx="1"/></svg>'
});

bm.add('faq-section', {
  label: 'SSS Bölümü',
  category: 'Bölümler',
  content: `<section style="padding:90px 8vw;background:#f8f9fa;">
    <div style="max-width:900px;margin:0 auto;">
      <h2 style="margin:0 0 28px;text-align:center;font-size:38px;color:#111827;">Sık sorulan sorular</h2>
      <div style="display:grid;gap:12px;">
        <details open style="padding:22px 24px;border-radius:14px;background:#fff;border:1px solid #e9ecef;">
          <summary style="cursor:pointer;font-weight:800;color:#111827;">Sayfalar nereye kaydediliyor?</summary>
          <p style="margin:14px 0 0;color:#667085;line-height:1.65;">Varsayılan olarak dosyaya kaydedilir. İsterseniz MySQL sürücüsüyle veritabanına geçebilirsiniz.</p>
        </details>
        <details style="padding:22px 24px;border-radius:14px;background:#fff;border:1px solid #e9ecef;">
          <summary style="cursor:pointer;font-weight:800;color:#111827;">HTML olarak dışa aktarabilir miyim?</summary>
          <p style="margin:14px 0 0;color:#667085;line-height:1.65;">Evet, üst bardaki indirme düğmesi aktif sayfayı tek HTML dosyası olarak indirir.</p>
        </details>
        <details style="padding:22px 24px;border-radius:14px;background:#fff;border:1px solid #e9ecef;">
          <summary style="cursor:pointer;font-weight:800;color:#111827;">Mobil görünümü düzenleyebilir miyim?</summary>
          <p style="margin:14px 0 0;color:#667085;line-height:1.65;">Cihaz seçenekleriyle masaüstü, tablet ve mobil genişliklerde kontrol edebilirsiniz.</p>
        </details>
      </div>
    </div>
  </section>`,
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 9a3 3 0 1 1 5.2 2c-1.5 1.3-2.2 1.8-2.2 3"/><path d="M12 18h.01"/><circle cx="12" cy="12" r="9"/></svg>'
});

bm.add('contact-section', {
  label: 'İletişim Bölümü',
  category: 'Bölümler',
  content: `<section style="padding:90px 8vw;background:#fff;">
    <div style="display:grid;grid-template-columns:0.9fr 1.1fr;gap:34px;max-width:1080px;margin:0 auto;align-items:start;">
      <div>
        <span style="display:inline-block;margin-bottom:12px;color:#6c5ce7;font-weight:700;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">İletişim</span>
        <h2 style="margin:0 0 16px;font-size:40px;line-height:1.1;color:#111827;">Ziyaretçiden hızlıca talep alın.</h2>
        <p style="margin:0;color:#667085;line-height:1.7;">Form bloğunu özelleştirerek lead toplama, randevu veya teklif talebi akışları hazırlayın.</p>
      </div>
      <form style="display:grid;gap:14px;padding:28px;border-radius:20px;background:#f8f9fa;border:1px solid #e9ecef;">
        <input placeholder="Ad Soyad" style="height:46px;border:1px solid #dee2e6;border-radius:10px;padding:0 14px;font:inherit;background:#fff;">
        <input placeholder="E-posta" type="email" style="height:46px;border:1px solid #dee2e6;border-radius:10px;padding:0 14px;font:inherit;background:#fff;">
        <textarea placeholder="Mesajınız" style="min-height:120px;border:1px solid #dee2e6;border-radius:10px;padding:14px;font:inherit;background:#fff;resize:vertical;"></textarea>
        <button type="button" style="height:48px;border:0;border-radius:10px;background:#6c5ce7;color:#fff;font-weight:800;font:inherit;">Gönder</button>
      </form>
    </div>
  </section>`,
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
});

bm.add('divider-block', {
  label: 'Ayırıcı',
  category: 'Temel',
  content: '<hr style="border:none;height:1px;background:linear-gradient(90deg,transparent,rgba(108,92,231,0.3),transparent);margin:40px 8vw;">',
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="2" y1="12" x2="22" y2="12"/></svg>'
});

bm.add('spacer-block', {
  label: 'Boşluk',
  category: 'Temel',
  content: '<div style="height:60px;"></div>',
  media: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="4" x2="12" y2="20"/><polyline points="8 8 12 4 16 8"/><polyline points="8 16 12 20 16 16"/></svg>'
});

/* ── Panel button for save ── */
editor.Panels.addButton('options', {
  id: 'save-page',
  className: 'fa fa-floppy-o',
  command: () => saveCurrentPage(),
  attributes: { title: 'Kaydet' }
});

/* ── Translate ALL block labels & categories to Turkish ── */
const labelMap = {
  // blocks-basic
  '1 column': '1 Sütun',
  '2 columns': '2 Sütun',
  '3 columns': '3 Sütun',
  '2 columns 3/7': '2 Sütun 3/7',
  'text': 'Metin',
  'link': 'Bağlantı',
  'image': 'Görsel',
  'video': 'Video',
  'map': 'Harita',
  'link block': 'Bağlantı Kartı',
  // forms plugin
  'form': 'Form',
  'input': 'Giriş Alanı',
  'textarea': 'Metin Alanı',
  'select': 'Açılır Liste',
  'button': 'Buton',
  'label': 'Etiket',
  'checkbox': 'Onay Kutusu',
  'radio': 'Radyo Düğmesi',
  // tabs plugin
  'tabs': 'Sekmeler',
  'tab': 'Sekme',
  'tab container': 'Sekme Kabı',
  'tab content': 'Sekme İçeriği',
  // preset-webpage extras
  'quote': 'Alıntı',
  'text section': 'Metin Bölümü',
  'footer': 'Alt Bilgi',
  'header': 'Üst Bilgi',
  'navbar': 'Navigasyon',
  // countdown / tooltip
  'countdown': 'Geri Sayım',
  'tooltip': 'İpucu',
  'typed': 'Yazı Animasyonu',
  'typed text': 'Yazı Animasyonu',
  // divider / spacer (our custom blocks - already Turkish but just in case)
  'divider': 'Ayırıcı',
  'spacer': 'Boşluk',
};

const categoryMap = {
  'basic': 'Temel',
  'forms': 'Formlar',
  'extra': 'Ek Bileşenler',
  'extra components': 'Ek Bileşenler',
  'tabs': 'Sekmeler',
  'sections': 'Bölümler',
};

function translateBlocks() {
  if (typeof bm.getCategories === 'function') {
    bm.getCategories().forEach(category => {
      const id = String(category.get('id') || '').toLowerCase().trim();
      const label = String(category.get('label') || '').toLowerCase().trim();
      const translated = categoryMap[id] || categoryMap[label];
      if (translated) {
        category.set('label', translated);
      }
    });
  }

  bm.getAll().forEach(block => {
    // Translate label
    const label = (block.get('label') || '').trim();
    const labelKey = label.toLowerCase();
    if (labelMap[labelKey]) {
      block.set('label', labelMap[labelKey]);
    }

    // Translate category
    const cat = block.get('category');
    if (cat) {
      const catLabel = typeof cat === 'string' ? cat : (cat.label || cat.id || '');
      const catKey = catLabel.toLowerCase().trim();
      if (categoryMap[catKey]) {
        if (typeof cat === 'string') {
          block.set('category', categoryMap[catKey]);
        } else {
          block.set('category', { ...cat, label: categoryMap[catKey] });
        }
      }
    }
  });
}

function translatePanels() {
  const panelTitles = {
    'sw-visibility': 'Bileşen sınırlarını göster',
    preview: 'Önizleme',
    fullscreen: 'Tam ekran',
    'export-template': 'Kodu görüntüle',
    'gjs-open-import-webpage': 'HTML içe aktar',
    undo: 'Geri al',
    redo: 'Yinele',
    'canvas-clear': 'Tuvali temizle',
    'open-sm': 'Stil yöneticisi',
    'open-tm': 'Ayarlar',
    'open-layers': 'Katmanlar',
    'open-blocks': 'Bloklar',
    'save-page': 'Kaydet'
  };

  ['options', 'views'].forEach(panelId => {
    Object.entries(panelTitles).forEach(([id, title]) => {
      const button = editor.Panels.getButton(panelId, id);
      if (button) {
        button.set('attributes', { ...(button.get('attributes') || {}), title });
      }
    });
  });
}

// Run immediately + delayed to catch plugin blocks added asynchronously
translateBlocks();
translatePanels();
setTimeout(translateBlocks, 200);
setTimeout(translateBlocks, 600);
setTimeout(translatePanels, 200);
setTimeout(translatePanels, 600);

/* ── Event Listeners ── */
pageSelect.addEventListener('change', () => loadPage(pageSelect.value).catch(showError));

newPageButton.addEventListener('click', () => {
  const slug = normalizeSlug(newPageSlug.value);
  if (!slug) { toast('Yeni sayfa için adres yazın.', 'info'); return; }
  newPageSlug.value = '';
  loadPage(slug).catch(showError);
});

saveButton.addEventListener('click', () => saveCurrentPage().catch(showError));
exportBtn.addEventListener('click', () => exportCurrentPage());

undoBtn.addEventListener('click', () => editor.UndoManager.undo());
redoBtn.addEventListener('click', () => editor.UndoManager.redo());

deleteBtn.addEventListener('click', () => {
  if (currentSlug === 'anasayfa') { toast('Ana sayfa silinemez.', 'error'); return; }
  showConfirm(
    'Sayfayı Sil',
    `"${currentName}" sayfasını silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
    async () => {
      try {
        const res = await fetch(`/api/pages/${currentSlug}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Silme başarısız.');
        toast('Sayfa silindi.', 'success');
        await loadPage('anasayfa');
        await refreshPages();
      } catch (e) { showError(e); }
    }
  );
});

/* Keyboard shortcuts */
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    saveCurrentPage().catch(showError);
  }
});

/* ── Bootstrap ── */
bootstrap().catch(showError);

async function bootstrap() {
  const cfgRes = await fetch('/api/config');
  const cfg = await cfgRes.json();
  storageBadge.textContent = `${cfg.storage === 'mysql' ? 'MySQL' : 'Dosya'} kaydı`;
  await refreshPages();
  await loadPage(currentSlug);
}

async function refreshPages() {
  const res = await fetch('/api/pages');
  const data = await res.json();
  pageSelect.innerHTML = '';
  for (const p of data.pages) {
    const opt = document.createElement('option');
    opt.value = p.slug;
    opt.textContent = p.name || p.slug;
    pageSelect.append(opt);
  }
  if (!data.pages.some(p => p.slug === currentSlug)) {
    const opt = document.createElement('option');
    opt.value = currentSlug;
    opt.textContent = currentSlug;
    pageSelect.append(opt);
  }
  pageSelect.value = currentSlug;
}

async function loadPage(slug) {
  currentSlug = normalizeSlug(slug) || 'anasayfa';
  setStatus('Yükleniyor…');
  const res = await fetch(`/api/pages/${currentSlug}`);
  if (!res.ok) throw new Error('Sayfa yüklenemedi.');
  const data = await res.json();
  currentName = data.page.name || currentSlug;
  editor.loadProjectData(data.page.projectData);
  syncPageUi();
  setStatus(data.page.updatedAt ? `Son kayıt: ${fmtDate(data.page.updatedAt)}` : 'Kaydedilmedi');
}

async function saveCurrentPage() {
  setStatus('Kaydediliyor…');
  const payload = {
    name: currentName,
    projectData: editor.getProjectData(),
    html: exportHtml(),
    css: editor.getCss()
  };
  const res = await fetch(`/api/pages/${currentSlug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Kayıt başarısız.');
  }
  const data = await res.json();
  currentName = data.page.name;
  await refreshPages();
  syncPageUi();
  setStatus(`Kaydedildi: ${fmtDate(data.page.updatedAt)}`);
  statusEl.classList.add('saved');
  setTimeout(() => statusEl.classList.remove('saved'), 2000);
  toast('Sayfa başarıyla kaydedildi!', 'success');
}

function syncPageUi() {
  pageSelect.value = currentSlug;
  previewLink.href = `/p/${currentSlug}`;
  const url = new URL(location.href);
  url.searchParams.set('page', currentSlug);
  history.replaceState({}, '', url);
}

function setStatus(msg) { statusEl.textContent = msg; }

function showError(err) {
  console.error(err);
  setStatus(err.message || 'Hata oluştu.');
  statusEl.classList.add('error');
  setTimeout(() => statusEl.classList.remove('error'), 3000);
  toast(err.message || 'Hata oluştu.', 'error');
}

function normalizeSlug(v) {
  return String(v || '').trim().toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-').replace(/^-+|-+$/g, '');
}

function exportHtml() {
  const html = editor.getHtml();
  const t = html.trim();
  if (!t.toLowerCase().startsWith('<body')) return html;
  const doc = new DOMParser().parseFromString(t, 'text/html');
  return doc.body.innerHTML;
}

function exportCurrentPage() {
  const fullHtml = `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(currentName)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>${editor.getCss()}</style>
  </head>
  <body>${exportHtml()}</body>
</html>`;
  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${currentSlug || 'sayfa'}.html`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast('HTML dosyası hazırlandı.', 'success');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function fmtDate(v) {
  if (!v) return '';
  return new Intl.DateTimeFormat('tr-TR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(v));
}

/* ── Toast ── */
function toast(msg, type = 'info') {
  const existing = document.querySelectorAll('.toast');
  existing.forEach(t => { t.classList.add('hide'); setTimeout(() => t.remove(), 300); });
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info'}"></i> ${msg}`;
  document.body.append(el);
  setTimeout(() => { el.classList.add('hide'); setTimeout(() => el.remove(), 300); }, 3000);
}

/* ── Confirm Dialog ── */
function showConfirm(title, message, onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'confirm-overlay';
  overlay.innerHTML = `
    <div class="confirm-dialog">
      <h3>${title}</h3>
      <p>${message}</p>
      <div class="confirm-actions">
        <button class="btn btn-ghost cancel-btn">İptal</button>
        <button class="btn btn-danger-solid confirm-btn">Sil</button>
      </div>
    </div>`;
  document.body.append(overlay);
  overlay.querySelector('.cancel-btn').addEventListener('click', () => overlay.remove());
  overlay.querySelector('.confirm-btn').addEventListener('click', () => { overlay.remove(); onConfirm(); });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}
