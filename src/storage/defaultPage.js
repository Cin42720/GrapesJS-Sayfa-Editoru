export const defaultProject = {
  pages: [
    {
      id: 'home',
      name: 'Ana Sayfa',
      component: `
        <nav class="site-nav">
          <a class="brand-link" href="#">GrapesJS Studio</a>
          <div class="nav-links">
            <a href="#features">Özellikler</a>
            <a href="#showcase">Vitrin</a>
            <a href="#pricing">Paketler</a>
            <a class="nav-cta" href="#contact">İletişim</a>
          </div>
        </nav>

        <main>
          <section class="hero">
            <div class="hero-copy">
              <span class="eyebrow">Görsel Web Sayfası Düzenleyici</span>
              <h1>Sayfalarını kod yazmadan profesyonelce tasarla.</h1>
              <p>Hazır bölümleri sürükle, içeriği düzenle, farklı cihazlarda kontrol et ve tek tıkla kaydet ya da HTML olarak dışa aktar.</p>
              <div class="hero-actions">
                <a class="primary-link" href="#features">Özellikleri İncele</a>
                <a class="secondary-link" href="#showcase">Örnekleri Gör</a>
              </div>
            </div>
            <div class="hero-preview" aria-label="Sayfa düzenleyici önizlemesi">
              <div class="preview-bar">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="preview-grid">
                <div class="preview-panel large"></div>
                <div class="preview-panel"></div>
                <div class="preview-panel"></div>
                <div class="preview-line"></div>
                <div class="preview-line short"></div>
              </div>
            </div>
          </section>

          <section class="stats">
            <article>
              <strong>48K</strong>
              <span>Yayınlanan sayfa</span>
            </article>
            <article>
              <strong>120+</strong>
              <span>Hazır blok fikri</span>
            </article>
            <article>
              <strong>3 dk</strong>
              <span>Ortalama kurulum</span>
            </article>
            <article>
              <strong>99%</strong>
              <span>Memnuniyet hedefi</span>
            </article>
          </section>

          <section id="features" class="section section-light">
            <div class="section-heading">
              <span class="eyebrow dark">Araçlar</span>
              <h2>Düzenleyicinin içinde beklenen temel iş akışları hazır.</h2>
              <p>GrapesJS çekirdeğini daha kullanışlı hale getiren sayfa yönetimi, form blokları, sekmeler, geri sayım, tooltip, animasyonlu yazı ve dışa aktarma akışları eklendi.</p>
            </div>
            <div class="feature-grid">
              <article>
                <span class="feature-icon violet"></span>
                <h3>Sürükle bırak bloklar</h3>
                <p>Hero, fiyat, galeri, SSS, iletişim, form ve CTA bölümlerini sayfaya sürükleyerek hızlıca kur.</p>
              </article>
              <article>
                <span class="feature-icon cyan"></span>
                <h3>Responsive kontrol</h3>
                <p>Masaüstü, tablet ve mobil görünümü editör içinde hızlıca test et.</p>
              </article>
              <article>
                <span class="feature-icon pink"></span>
                <h3>Kayıt ve dışa aktarma</h3>
                <p>Sayfayı dosya ya da MySQL'e kaydet; gerektiğinde tek HTML dosyası olarak indir.</p>
              </article>
            </div>
          </section>

          <section class="section process-section">
            <div class="section-heading narrow">
              <span class="eyebrow">Akış</span>
              <h2>Bir sayfayı yayına hazırlamak üç adım.</h2>
            </div>
            <div class="process-grid">
              <article>
                <span>1</span>
                <h3>Şablonla başla</h3>
                <p>Hazır ana sayfa yapısını kullan veya boş sayfaya bölüm bloklarını ekle.</p>
              </article>
              <article>
                <span>2</span>
                <h3>İçeriği parlat</h3>
                <p>Metin, renk, görsel, form ve aralıkları görsel panelden düzenle.</p>
              </article>
              <article>
                <span>3</span>
                <h3>Kaydet ve paylaş</h3>
                <p>Önizleme bağlantısını aç, dosyaya/veritabanına kaydet veya HTML indir.</p>
              </article>
            </div>
          </section>

          <section id="showcase" class="section showcase">
            <div class="section-heading">
              <span class="eyebrow dark">Vitrin</span>
              <h2>Farklı sayfa tipleri için kullanılabilir bloklar.</h2>
            </div>
            <div class="showcase-grid">
              <article class="showcase-card wide">
                <h3>SaaS Landing</h3>
                <p>Ürün tanıtımı, fiyatlandırma ve lead toplama akışı.</p>
              </article>
              <article class="showcase-card pink">
                <h3>Ajans Sitesi</h3>
                <p>Portfolyo, referans ve iletişim bölümleri.</p>
              </article>
              <article class="showcase-card yellow">
                <h3>Etkinlik Sayfası</h3>
                <p>Program, konuşmacılar ve kayıt formu.</p>
              </article>
            </div>
          </section>

          <section id="pricing" class="section section-light">
            <div class="section-heading narrow">
              <span class="eyebrow dark">Paketler</span>
              <h2>Fiyat bloğu da düzenlenebilir.</h2>
            </div>
            <div class="pricing-grid">
              <article>
                <h3>Başlangıç</h3>
                <p>Bireysel denemeler</p>
                <strong>₺0</strong>
                <a href="#">Seç</a>
              </article>
              <article class="featured">
                <h3>Profesyonel</h3>
                <p>Küçük ekipler</p>
                <strong>₺99</strong>
                <a href="#">Seç</a>
              </article>
              <article>
                <h3>Kurumsal</h3>
                <p>Büyüyen operasyonlar</p>
                <strong>₺249</strong>
                <a href="#">Seç</a>
              </article>
            </div>
          </section>

          <section class="section faq-section">
            <div class="section-heading narrow">
              <span class="eyebrow">SSS</span>
              <h2>Sık sorulan sorular</h2>
            </div>
            <div class="faq-list">
              <details open>
                <summary>Sayfalar nereye kaydediliyor?</summary>
                <p>Varsayılan olarak dosya sistemine kaydedilir. Ortam değişkeniyle MySQL sürücüsüne geçebilirsiniz.</p>
              </details>
              <details>
                <summary>HTML olarak dışa aktarabilir miyim?</summary>
                <p>Evet. Üst bardaki indirme düğmesi aktif sayfayı bağımsız HTML dosyası olarak hazırlar.</p>
              </details>
              <details>
                <summary>Form ve özel bileşen ekleyebilir miyim?</summary>
                <p>Form, sekme, geri sayım, tooltip ve animasyonlu yazı gibi ek bileşenler blok panelinde hazırdır.</p>
              </details>
            </div>
          </section>

          <section id="contact" class="section contact-section">
            <div>
              <span class="eyebrow dark">İletişim</span>
              <h2>Ziyaretçiden talep topla.</h2>
              <p>Bu bölümdeki form alanlarını düzenleyerek teklif, randevu veya demo talebi akışı oluşturabilirsiniz.</p>
            </div>
            <form class="contact-form">
              <input placeholder="Ad Soyad">
              <input type="email" placeholder="E-posta">
              <textarea placeholder="Mesajınız"></textarea>
              <button type="button">Gönder</button>
            </form>
          </section>
        </main>

        <footer class="site-footer">
          <strong>GrapesJS Studio</strong>
          <span>© 2026. Tüm hakları saklıdır.</span>
        </footer>
      `,
      styles: `
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          color: #111827;
          background: #0b0d14;
          font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .site-nav {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          min-height: 68px;
          padding: 0 8vw;
          color: #ffffff;
          background: rgba(11, 13, 20, 0.84);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(18px);
        }
        .brand-link {
          font-size: 19px;
          font-weight: 900;
          letter-spacing: -0.03em;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 24px;
          color: rgba(255, 255, 255, 0.68);
          font-size: 14px;
        }
        .nav-cta {
          padding: 9px 18px;
          border-radius: 10px;
          color: #ffffff;
          background: #6c5ce7;
          font-weight: 800;
        }
        .hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.86fr);
          gap: 58px;
          align-items: center;
          min-height: 82vh;
          padding: 72px 8vw 90px;
          color: #ffffff;
          background:
            radial-gradient(circle at 82% 18%, rgba(0, 206, 201, 0.28), transparent 28%),
            radial-gradient(circle at 18% 20%, rgba(108, 92, 231, 0.38), transparent 32%),
            linear-gradient(135deg, #0b0d14 0%, #161a2a 48%, #242044 100%);
        }
        .hero-copy {
          max-width: 720px;
        }
        .eyebrow {
          display: inline-block;
          margin-bottom: 14px;
          color: #a29bfe;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }
        .eyebrow.dark {
          color: #6c5ce7;
        }
        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }
        h1 {
          margin-bottom: 24px;
          font-size: 64px;
          line-height: 0.98;
          letter-spacing: -0.04em;
        }
        .hero p {
          max-width: 620px;
          margin-bottom: 34px;
          color: rgba(255, 255, 255, 0.68);
          font-size: 20px;
          line-height: 1.65;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .primary-link,
        .secondary-link,
        .pricing-grid a,
        .contact-form button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 24px;
          border-radius: 11px;
          font-weight: 800;
        }
        .primary-link {
          color: #ffffff;
          background: #6c5ce7;
          box-shadow: 0 14px 38px rgba(108, 92, 231, 0.32);
        }
        .secondary-link {
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.06);
        }
        .hero-preview {
          overflow: hidden;
          border-radius: 26px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 34px 90px rgba(0, 0, 0, 0.34);
        }
        .preview-bar {
          display: flex;
          gap: 7px;
          padding: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .preview-bar span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #a29bfe;
        }
        .preview-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 16px;
          padding: 22px;
        }
        .preview-panel,
        .preview-line {
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(108, 92, 231, 0.82), rgba(0, 206, 201, 0.7));
        }
        .preview-panel {
          min-height: 130px;
        }
        .preview-panel.large {
          grid-row: span 2;
          min-height: 276px;
        }
        .preview-line {
          grid-column: 1 / -1;
          min-height: 18px;
          opacity: 0.55;
        }
        .preview-line.short {
          max-width: 70%;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          padding: 34px 8vw;
          color: #ffffff;
          background: #111827;
        }
        .stats article {
          padding: 22px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .stats strong {
          display: block;
          color: #00cec9;
          font-size: 36px;
          line-height: 1;
        }
        .stats span {
          display: block;
          margin-top: 8px;
          color: rgba(255, 255, 255, 0.62);
          font-size: 13px;
        }
        .section {
          padding: 92px 8vw;
        }
        .section-light {
          background: #f8f9fa;
        }
        .section-heading {
          max-width: 760px;
          margin: 0 auto 44px;
          text-align: center;
        }
        .section-heading.narrow {
          max-width: 620px;
        }
        .section-heading h2,
        .contact-section h2 {
          margin-bottom: 16px;
          font-size: 42px;
          line-height: 1.08;
          letter-spacing: -0.03em;
        }
        .section-heading p,
        .contact-section p {
          color: #667085;
          font-size: 17px;
          line-height: 1.7;
        }
        .feature-grid,
        .process-grid,
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          max-width: 1120px;
          margin: 0 auto;
        }
        .feature-grid article,
        .process-grid article,
        .pricing-grid article {
          padding: 30px;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid #e9ecef;
          box-shadow: 0 12px 38px rgba(17, 24, 39, 0.06);
        }
        .feature-icon {
          display: block;
          width: 46px;
          height: 46px;
          margin-bottom: 18px;
          border-radius: 14px;
        }
        .feature-icon.violet {
          background: linear-gradient(135deg, #6c5ce7, #a29bfe);
        }
        .feature-icon.cyan {
          background: linear-gradient(135deg, #00cec9, #55efc4);
        }
        .feature-icon.pink {
          background: linear-gradient(135deg, #fd79a8, #e84393);
        }
        .process-section,
        .faq-section {
          color: #ffffff;
          background: #0b0d14;
        }
        .process-grid article,
        .faq-list details {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .process-grid span {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          margin-bottom: 22px;
          border-radius: 13px;
          background: #00cec9;
          color: #06201f;
          font-weight: 900;
        }
        .process-grid p,
        .faq-list p {
          color: rgba(255, 255, 255, 0.64);
          line-height: 1.7;
        }
        .showcase {
          background: #ffffff;
        }
        .showcase-grid {
          display: grid;
          grid-template-columns: 1.18fr 0.82fr 0.82fr;
          gap: 18px;
          max-width: 1120px;
          margin: 0 auto;
        }
        .showcase-card {
          min-height: 360px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 28px;
          color: #ffffff;
          border-radius: 24px;
          background: linear-gradient(135deg, #6c5ce7, #00cec9);
          box-shadow: 0 24px 70px rgba(17, 24, 39, 0.16);
        }
        .showcase-card.pink {
          background: linear-gradient(135deg, #fd79a8, #e84393);
        }
        .showcase-card.yellow {
          color: #111827;
          background: linear-gradient(135deg, #ffe66d, #00cec9);
        }
        .pricing-grid article {
          text-align: center;
        }
        .pricing-grid article.featured {
          color: #ffffff;
          background: linear-gradient(135deg, #6c5ce7, #a29bfe);
          transform: translateY(-12px);
        }
        .pricing-grid strong {
          display: block;
          margin: 22px 0;
          font-size: 42px;
          line-height: 1;
        }
        .pricing-grid a {
          color: #6c5ce7;
          border: 1px solid #6c5ce7;
        }
        .pricing-grid .featured a {
          color: #6c5ce7;
          background: #ffffff;
          border-color: #ffffff;
        }
        .faq-list {
          display: grid;
          gap: 12px;
          max-width: 860px;
          margin: 0 auto;
        }
        .faq-list details {
          padding: 22px 24px;
          border-radius: 16px;
        }
        .faq-list summary {
          cursor: pointer;
          font-weight: 800;
        }
        .faq-list p {
          margin: 14px 0 0;
        }
        .contact-section {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 38px;
          align-items: start;
          background: #ffffff;
        }
        .contact-form {
          display: grid;
          gap: 14px;
          padding: 30px;
          border-radius: 22px;
          background: #f8f9fa;
          border: 1px solid #e9ecef;
        }
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          border: 1px solid #dee2e6;
          border-radius: 12px;
          padding: 0 14px;
          color: #111827;
          background: #ffffff;
          font: inherit;
        }
        .contact-form input {
          height: 48px;
        }
        .contact-form textarea {
          min-height: 124px;
          padding-top: 14px;
          resize: vertical;
        }
        .contact-form button {
          border: 0;
          color: #ffffff;
          background: #6c5ce7;
          cursor: pointer;
        }
        .site-footer {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          padding: 30px 8vw;
          color: rgba(255, 255, 255, 0.55);
          background: #0b0d14;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .site-footer strong {
          color: #ffffff;
        }
        @media (max-width: 920px) {
          .site-nav,
          .nav-links,
          .hero-actions,
          .site-footer {
            align-items: flex-start;
            flex-direction: column;
          }
          .hero,
          .contact-section {
            grid-template-columns: 1fr;
          }
          h1 {
            font-size: 44px;
          }
          .stats,
          .feature-grid,
          .process-grid,
          .pricing-grid,
          .showcase-grid {
            grid-template-columns: 1fr;
          }
          .pricing-grid article.featured {
            transform: none;
          }
        }
        @media (max-width: 560px) {
          .section,
          .hero {
            padding-left: 6vw;
            padding-right: 6vw;
          }
          .hero-preview {
            display: none;
          }
          h1 {
            font-size: 38px;
          }
          .section-heading h2,
          .contact-section h2 {
            font-size: 32px;
          }
        }
      `
    }
  ]
};

export function renderDefaultPageHtml() {
  const page = defaultProject.pages[0];
  return {
    html: page.component,
    css: page.styles
  };
}
