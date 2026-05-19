import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStore } from './storage/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const app = express();
const store = createStore();
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '25mb' }));
app.use(express.static(path.join(rootDir, 'public')));

/* ── Vendor static routes ── */
const vendorMap = {
  'grapesjs': 'grapesjs/dist',
  'grapesjs-blocks-basic': 'grapesjs-blocks-basic/dist',
  'grapesjs-plugin-forms': 'grapesjs-plugin-forms/dist',
  'grapesjs-tabs': 'grapesjs-tabs/dist',
  'grapesjs-component-countdown': 'grapesjs-component-countdown/dist',
  'grapesjs-tooltip': 'grapesjs-tooltip/dist',
  'grapesjs-typed': 'grapesjs-typed/dist',
  'grapesjs-style-gradient': 'grapesjs-style-gradient/dist',
  'grapesjs-preset-webpage': 'grapesjs-preset-webpage/dist'
};

for (const [alias, modulePath] of Object.entries(vendorMap)) {
  app.use(`/vendor/${alias}`, express.static(path.join(rootDir, 'node_modules', modulePath)));
}

/* ── Routes ── */
app.get('/', (_req, res) => {
  res.redirect('/editor.html?page=anasayfa');
});

app.get('/api/config', (_req, res) => {
  res.json({ storage: store.type });
});

app.get('/api/pages', async (_req, res, next) => {
  try {
    res.json({ pages: await store.listPages() });
  } catch (error) {
    next(error);
  }
});

app.get('/api/pages/:slug', async (req, res, next) => {
  try {
    res.json({ page: await store.getPage(req.params.slug) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/pages/:slug', async (req, res, next) => {
  try {
    if (!req.body.projectData || typeof req.body.projectData !== 'object') {
      res.status(400).json({ error: 'projectData alanı zorunludur.' });
      return;
    }

    const page = await store.savePage(req.params.slug, req.body);
    res.json({ page });
  } catch (error) {
    next(error);
  }
});

/* ── Delete page endpoint ── */
app.delete('/api/pages/:slug', async (req, res, next) => {
  try {
    await store.deletePage(req.params.slug);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

/* ── Premium Preview Page ── */
app.get('/p/:slug', async (req, res, next) => {
  try {
    const page = await store.getPage(req.params.slug);
    res.type('html').send(`<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(page.name)} – Önizleme</title>
    <meta name="description" content="${escapeHtml(page.name)} sayfasının önizlemesi">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>${page.css || ''}</style>
  </head>
  <body>${stripOuterBody(page.html || '')}</body>
</html>`);
  } catch (error) {
    next(error);
  }
});

/* ── Error handler ── */
app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    error: 'Beklenmeyen bir hata oluştu.',
    detail: process.env.NODE_ENV === 'production' ? undefined : error.message
  });
});

app.listen(port, () => {
  console.log(`GrapesJS düzenleyici http://localhost:${port} adresinde çalışıyor.`);
});

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function stripOuterBody(html) {
  const match = String(html).trim().match(/^<body[^>]*>([\s\S]*)<\/body>$/i);
  return match ? match[1] : html;
}
