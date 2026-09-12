// Helpers partagés par les tests. Aucune dépendance : le runner est celui
// intégré à Node (`node --test`), volontairement, pour qu'un garde-fou ne
// puisse pas tomber en panne à cause d'une mise à jour d'outillage.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '..'
);

export const DIST = path.join(ROOT, 'dist');

/** Chemin absolu depuis la racine du repo. */
export const from = (...parts) => path.join(ROOT, ...parts);

export const read = (rel) => fs.readFileSync(from(rel), 'utf-8');
export const exists = (rel) => fs.existsSync(from(rel));

/** Liste récursive de fichiers sous `rel`, filtrés par extension. */
export function walk(rel, extensions) {
  const base = from(rel);
  if (!fs.existsSync(base)) return [];
  const out = [];
  const stack = [base];
  while (stack.length) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules') continue;
        stack.push(full);
      } else if (extensions.some((e) => entry.name.endsWith(e))) {
        out.push(path.relative(ROOT, full));
      }
    }
  }
  return out.sort();
}

/** Tous les fichiers source de l'app (hors tests et build). */
export const sourceFiles = () =>
  walk('src', ['.ts', '.tsx', '.js', '.mjs']);

/** Les fichiers servis tels quels (robots, sitemaps, llms.txt). */
export const publicFiles = () => walk('public', ['.txt', '.xml', '.json']);

// ---------------------------------------------------------------------------
// dist/ — présent seulement après `npm run build`.
// ---------------------------------------------------------------------------

export const distBuilt = () => fs.existsSync(path.join(DIST, 'index.html'));

/** Pages prérendues : { route, file, html }. */
export function distPages() {
  const out = [];
  const stack = [DIST];
  while (stack.length) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'assets' || entry.name === 'images') continue;
        stack.push(full);
      } else if (entry.name === 'index.html') {
        const rel = path.relative(DIST, dir).split(path.sep).join('/');
        out.push({
          route: rel === '' ? '/' : `/${rel}/`,
          file: path.relative(ROOT, full),
          html: fs.readFileSync(full, 'utf-8'),
        });
      }
    }
  }
  return out.sort((a, b) => a.route.localeCompare(b.route));
}

// ---------------------------------------------------------------------------
// Extraction HTML. Volontairement par expression régulière et non par parseur :
// on vérifie ce que le prerender a RÉELLEMENT écrit dans le fichier, octet pour
// octet, pas ce qu'un parseur tolérant reconstruit.
// ---------------------------------------------------------------------------

export const unescapeHtml = (s) =>
  s
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x2F;/g, '/');

export const title = (html) => {
  const m = html.match(/<title>([\s\S]*?)<\/title>/);
  return m ? unescapeHtml(m[1]) : null;
};

export const metaContent = (html, attr, name) => {
  const m = html.match(
    new RegExp(`<meta\\s+${attr}="${name}"\\s+content="([\\s\\S]*?)"\\s*/?>`)
  );
  return m ? unescapeHtml(m[1]) : null;
};

export const canonical = (html) => {
  const m = html.match(/<link rel="canonical" href="([^"]*)"\s*\/?>/);
  return m ? m[1] : null;
};

export const h1s = (html) =>
  [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
    unescapeHtml(m[1].replace(/<[^>]+>/g, '').trim())
  );

export const jsonLdBlocks = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1])
  );

/** Liens internes sortants d'une page, normalisés avec slash final. */
export function internalLinks(html) {
  const body = html.replace(/<script[\s\S]*?<\/script>/g, '');
  const hrefs = [...body.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]);
  return new Set(hrefs.map((h) => (h.endsWith('/') ? h : `${h}/`)));
}

/** URLs déclarées dans les sitemaps de feuilles (chemins, sans le domaine). */
export function sitemapRoutes(siteUrl) {
  const routes = new Set();
  for (const rel of publicFiles()) {
    const name = path.basename(rel);
    if (!name.startsWith('sitemap-') || name === 'sitemap-index.xml') continue;
    for (const m of read(rel).matchAll(/<loc>([^<]+)<\/loc>/g)) {
      routes.add(m[1].replace(siteUrl, ''));
    }
  }
  return routes;
}
