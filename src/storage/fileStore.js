import { mkdir, readFile, readdir, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import { defaultProject, renderDefaultPageHtml } from './defaultPage.js';

const safeSlug = value =>
  String(value || 'anasayfa')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'anasayfa';

export function createFileStore(options = {}) {
  const baseDir = path.resolve(options.directory || 'storage/pages');

  async function ensureDir() {
    await mkdir(baseDir, { recursive: true });
  }

  function filePath(slug) {
    return path.join(baseDir, `${safeSlug(slug)}.json`);
  }

  async function listPages() {
    await ensureDir();
    const files = await readdir(baseDir, { withFileTypes: true });
    const pages = await Promise.all(
      files
        .filter(file => file.isFile() && file.name.endsWith('.json'))
        .map(async file => {
          const raw = await readFile(path.join(baseDir, file.name), 'utf8');
          const page = JSON.parse(raw);
          return {
            slug: page.slug,
            name: page.name,
            updatedAt: page.updatedAt
          };
        })
    );

    if (pages.length === 0) {
      return [{ slug: 'anasayfa', name: 'Ana Sayfa', updatedAt: null }];
    }

    return pages.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
  }

  async function getPage(slug) {
    await ensureDir();
    const normalizedSlug = safeSlug(slug);

    try {
      const raw = await readFile(filePath(normalizedSlug), 'utf8');
      return JSON.parse(raw);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
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
  }

  async function savePage(slug, payload) {
    await ensureDir();
    const normalizedSlug = safeSlug(slug);
    const page = {
      slug: normalizedSlug,
      name: payload.name?.trim() || normalizedSlug,
      projectData: payload.projectData,
      html: payload.html || '',
      css: payload.css || '',
      updatedAt: new Date().toISOString()
    };

    await writeFile(filePath(normalizedSlug), `${JSON.stringify(page, null, 2)}\n`, 'utf8');
    return page;
  }

  async function deletePage(slug) {
    const normalizedSlug = safeSlug(slug);
    try {
      await unlink(filePath(normalizedSlug));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }

  return {
    type: 'file',
    listPages,
    getPage,
    savePage,
    deletePage
  };
}
