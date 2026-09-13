/**
 * Page de consentement OAuth du connecteur MCP (`/oauth/consent`).
 *
 * Elle est volontairement HORS du site éditorial : ce n'est pas une page à
 * référencer, et elle manipule une session de compte. Ces tests verrouillent
 * les quatre choses qui la rendraient dangereuse ou cassée sans qu'aucun build
 * n'échoue :
 *  - servie par le catch-all 404 (réécriture absente ou placée après) ;
 *  - indexable, ou affichable dans une iframe (détournement de clic sur
 *    « Autoriser ») ;
 *  - chargée avec les pixels publicitaires du site ;
 *  - redirection finale qui suivrait une URL sans garde-fou.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { read, exists, from, DIST, distBuilt, distPages, publicFiles } from './lib/sources.mjs';

const SANS_BUILD = distBuilt() ? false : 'dist/ absent — lancer `npm run build`';

function redirections(toml) {
  return [
    ...toml.matchAll(
      /\[\[redirects\]\]\s*\n\s*from\s*=\s*"([^"]+)"\s*\n\s*to\s*=\s*"([^"]+)"\s*\n\s*status\s*=\s*(\d+)/g
    ),
  ].map((m) => ({ from: m[1], to: m[2], status: Number(m[3]) }));
}

function blocEntetes(toml, pour) {
  const echappe = pour.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
  const m = toml.match(
    new RegExp(`\\[\\[headers\\]\\]\\s*\\n\\s*for\\s*=\\s*"${echappe}"[\\s\\S]*?(?=\\n\\[\\[|$)`)
  );
  return m ? m[0] : null;
}

describe('page de consentement OAuth', () => {
  test('elle a son propre point d’entrée HTML, déclaré à Vite', () => {
    assert.ok(exists('oauth-consent.html'), 'oauth-consent.html doit exister à la racine');
    assert.match(read('vite.config.ts'), /oauth-consent\.html/, 'entrée absente de vite.config.ts');
    assert.match(read('oauth-consent.html'), /src="\.\/src\/oauth\/main\.tsx"/);
  });

  test('/oauth/consent est une réécriture 200 placée AVANT le catch-all', () => {
    const redirs = redirections(read('netlify.toml'));
    const catchAll = redirs.findIndex((r) => r.from === '/*');
    assert.ok(catchAll >= 0, 'catch-all introuvable');
    for (const chemin of ['/oauth/consent', '/oauth/consent/']) {
      const i = redirs.findIndex((r) => r.from === chemin);
      assert.ok(i >= 0, `${chemin} doit être réécrit vers la page de consentement`);
      assert.equal(redirs[i].to, '/oauth-consent.html');
      assert.equal(redirs[i].status, 200, 'une 301 perdrait authorization_id côté client');
      assert.ok(i < catchAll, `${chemin} serait capté par le catch-all 404`);
    }
  });

  test('elle n’est jamais indexable ni affichable dans une iframe', () => {
    assert.match(read('oauth-consent.html'), /<meta name="robots" content="noindex, nofollow"/);
    const toml = read('netlify.toml');
    for (const pour of ['/oauth/*', '/oauth-consent.html']) {
      const bloc = blocEntetes(toml, pour);
      assert.ok(bloc, `en-têtes manquants pour ${pour}`);
      assert.match(bloc, /X-Robots-Tag\s*=\s*"noindex/);
      assert.match(bloc, /X-Frame-Options\s*=\s*"DENY"/);
      assert.match(bloc, /frame-ancestors 'none'/);
      assert.match(bloc, /Cache-Control\s*=\s*"no-store"/);
    }
  });

  test('elle ne charge aucun pixel publicitaire ni SDK d’attribution', () => {
    const fichiers = fs.readdirSync(from('src/oauth')).map((f) => `src/oauth/${f}`);
    for (const rel of ['oauth-consent.html', ...fichiers]) {
      const code = read(rel)
        .split('\n')
        .filter((l) => !/^\s*(\/\/|\*|\/\*|<!--)/.test(l))
        .join('\n');
      assert.doesNotMatch(
        code,
        /appsflyer|facebookPixel|tiktokPixel|fbq\(|ttq\.|utils\/tracking/i,
        `${rel} charge un traceur`
      );
    }
  });

  test('elle n’est ni une route React du site, ni déclarée dans un sitemap', () => {
    assert.doesNotMatch(
      read('src/App.tsx'),
      /path="\/oauth/,
      'une route React /oauth devrait être prérendue et entrerait dans les invariants SEO'
    );
    for (const rel of publicFiles()) {
      assert.doesNotMatch(read(rel), /\/oauth\//, `${rel} mentionne /oauth/`);
    }
  });

  test('la redirection finale passe toujours par le garde-fou d’URL', () => {
    const page = read('src/oauth/ConsentementOAuth.tsx');
    assert.equal(
      (page.match(/skipBrowserRedirect:\s*true/g) ?? []).length,
      2,
      'approve ET deny doivent laisser la page rediriger elle-même'
    );
    assert.doesNotMatch(page, /window\.location\.href\s*=/);
    assert.match(page, /urlDeRetourSure\(/);
    const securite = read('src/oauth/securite.ts');
    for (const schema of ['javascript:', 'data:']) {
      assert.ok(securite.includes(`'${schema}'`), `le schéma ${schema} doit être refusé`);
    }
  });

  test('le build produit la page hors du prérendu SEO', { skip: SANS_BUILD }, () => {
    const html = path.join(DIST, 'oauth-consent.html');
    assert.ok(fs.existsSync(html), 'dist/oauth-consent.html absent');
    assert.ok(
      !distPages().some((p) => p.route.startsWith('/oauth')),
      'la page ne doit pas être générée comme dist/oauth/…/index.html'
    );
    assert.doesNotMatch(fs.readFileSync(html, 'utf-8'), /appsflyer/i);
  });
});
