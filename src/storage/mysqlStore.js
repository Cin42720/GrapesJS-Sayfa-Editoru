import mysql from 'mysql2/promise';
import { defaultProject, renderDefaultPageHtml } from './defaultPage.js';

const safeSlug = value =>
  String(value || 'anasayfa')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'anasayfa';

export function createMysqlStore(options = {}) {
  const pool = mysql.createPool({
    host: options.host,
    port: options.port,
    database: options.database,
    user: options.user,
    password: options.password,
    waitForConnections: true,
    connectionLimit: 10,
    namedPlaceholders: true
  });

  let initialized = false;

  async function ensureTable() {
    if (initialized) {
      return;
    }

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS pages (
        slug VARCHAR(160) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        project_data JSON NOT NULL,
        html MEDIUMTEXT NOT NULL,
        css MEDIUMTEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);
    initialized = true;
  }

  async function listPages() {
    await ensureTable();
    const [rows] = await pool.execute(
      'SELECT slug, name, updated_at AS updatedAt FROM pages ORDER BY name ASC'
    );

    if (rows.length === 0) {
      return [{ slug: 'anasayfa', name: 'Ana Sayfa', updatedAt: null }];
    }

    return rows;
  }

  async function getPage(slug) {
    await ensureTable();
    const normalizedSlug = safeSlug(slug);
    const [rows] = await pool.execute(
      'SELECT slug, name, project_data AS projectData, html, css, updated_at AS updatedAt FROM pages WHERE slug = ? LIMIT 1',
      [normalizedSlug]
    );

    if (rows[0]) {
      return {
        ...rows[0],
        projectData:
          typeof rows[0].projectData === 'string'
            ? JSON.parse(rows[0].projectData)
            : rows[0].projectData
      };
    }

    const rendered = renderDefaultPageHtml();
    return {
      slug: normalizedSlug,
      name: normalizedSlug === 'anasayfa' ? 'Ana Sayfa' : normalizedSlug,
      projectData: defaultProject,
      html: rendered.html,
      css: rendered.css,
      updatedAt: null
    };
  }

  async function savePage(slug, payload) {
    await ensureTable();
    const normalizedSlug = safeSlug(slug);
    const page = {
      slug: normalizedSlug,
      name: payload.name?.trim() || normalizedSlug,
      projectData: payload.projectData,
      html: payload.html || '',
      css: payload.css || ''
    };

    await pool.execute(
      `INSERT INTO pages (slug, name, project_data, html, css)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         name = VALUES(name),
         project_data = VALUES(project_data),
         html = VALUES(html),
         css = VALUES(css)`,
      [page.slug, page.name, JSON.stringify(page.projectData), page.html, page.css]
    );

    return getPage(page.slug);
  }

  async function deletePage(slug) {
    await ensureTable();
    await pool.execute('DELETE FROM pages WHERE slug = ?', [safeSlug(slug)]);
  }

  return {
    type: 'mysql',
    listPages,
    getPage,
    savePage,
    deletePage
  };
}
