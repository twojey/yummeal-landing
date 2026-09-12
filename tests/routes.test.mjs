/**
 * Parité entre les routes déclarées dans l'app et les pages réellement
 * générées.
 *
 * Pourquoi ce fichier existe. `/supprimer-mon-compte` et `/delete-account`
 * étaient de vraies routes React, mais absentes de `staticRoutes` dans
 * `scripts/prerender.mjs`. Netlify servait donc le HTML de l'accueil pour ces
 * URL — canonical vers « / » compris. Conséquences : une page exigée par Apple
 * et Google invisible pour tout crawler qui n'exécute pas le JS, un lien
 * interne cassé, et une URL annoncée dans `llms.txt` qui servait autre chose
 * que ce qu'elle promettait.
 *
 * Ajouter une route sans la prérendre, ou la prérendre sans l'ajouter au
 * sitemap, fait maintenant échouer les tests.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  read,
  exists,
  publicFiles,
  distBuilt,
  distPages,
  sitemapRoutes,
} from './lib/sources.mjs';

/**
 * Les tests qui inspectent `dist/` ne peuvent rien affirmer avant un build.
 * On les saute explicitement plutôt que de les laisser passer à vide.
 */
const SANS_BUILD = distBuilt()
  ? false
  : 'dist/ absent — lancer `npm run build` avant ces tests';

const SITE_URL = 'https://yummeal.app';

/**
 * Routes déclarées dans App.tsx, hors routes paramétrées (`:slug`) dont la
 * couverture est vérifiée par la parité sitemap/dist, et hors catch-all.
 */
function routesStatiquesDeclarees() {
  const app = read('src/App.tsx');
  return [...app.matchAll(/<Route\s+path="([^"]+)"/g)]
    .map((m) => m[1])
    .filter((p) => p !== '*' && !p.includes(':'))
    .map((p) => (p.endsWith('/') ? p : `${p}/`));
}

/** Redirections déclarées dans netlify.toml : { from, to, status }. */
function redirections() {
  return [...read('netlify.toml').matchAll(
    /\[\[redirects\]\]\s*\n\s*from\s*=\s*"([^"]+)"\s*\n\s*to\s*=\s*"([^"]+)"\s*\n\s*status\s*=\s*(\d+)/g
  )].map((m) => ({ from: m[1], to: m[2], status: Number(m[3]) }));
}

describe('routes de l’application', () => {
  test('au moins une route est déclarée (le parseur ne rend pas une liste vide)', () => {
    // Sans ce garde-fou, un changement de formatage de App.tsx rendrait tous
    // les tests suivants vacuement verts.
    assert.ok(
      routesStatiquesDeclarees().length >= 5,
      'la lecture des <Route> de App.tsx ne renvoie presque rien : le parseur est cassé'
    );
  });

  test('une route catch-all existe (sinon une URL inconnue rend un écran blanc)', () => {
    assert.match(
      read('src/App.tsx'),
      /<Route\s+path="\*"/,
      "App.tsx doit déclarer <Route path=\"*\"> — sans elle, une URL inconnue " +
        'rendait une page entièrement blanche'
    );
  });

  test('chaque route statique est soit prérendue, soit redirigée', { skip: SANS_BUILD }, () => {
    const prerendues = new Set(distPages().map((p) => p.route));
    const redirs = redirections();
    const manquantes = [];

    for (const route of routesStatiquesDeclarees()) {
      if (prerendues.has(route)) continue;
      // Une route peut légitimement ne pas être prérendue si elle est
      // redirigée en 301 vers sa page canonique (cas de /delete-account).
      const sansSlash = route.replace(/\/$/, '');
      const redirigee = redirs.some(
        (r) =>
          r.status === 301 &&
          (r.from === route || r.from === sansSlash || r.from === `${sansSlash}/*`)
      );
      if (!redirigee) manquantes.push(route);
    }

    assert.deepEqual(
      manquantes,
      [],
      'routes déclarées mais ni prérendues ni redirigées — elles servent le HTML ' +
        `de l'accueil :\n  ${manquantes.join('\n  ')}\n` +
        'Ajoutez-les à staticRoutes dans scripts/prerender.mjs.'
    );
  });

  test('les pages légalement obligatoires sont prérendues', { skip: SANS_BUILD }, () => {
    const prerendues = new Set(distPages().map((p) => p.route));
    // Apple et Google Play exigent une page de suppression de compte
    // accessible publiquement, et l'app doit exposer CGU + confidentialité.
    for (const route of ['/supprimer-mon-compte/', '/cgu/', '/confidentialite/']) {
      assert.ok(
        prerendues.has(route),
        `${route} doit être prérendue : c'est une obligation de conformité store`
      );
    }
  });
});

describe('redirections Netlify', () => {
  test('aucune redirection ne pointe vers une cible inexistante', { skip: SANS_BUILD }, () => {
    const prerendues = new Set(distPages().map((p) => p.route));
    const cassees = redirections()
      .filter((r) => r.status === 301)
      .filter((r) => {
        const cible = r.to.endsWith('/') ? r.to : `${r.to}/`;
        return !prerendues.has(cible);
      })
      .map((r) => `${r.from} -> ${r.to}`);
    assert.deepEqual(
      cassees,
      [],
      `redirections 301 vers une page qui n'existe pas :\n  ${cassees.join('\n  ')}`
    );
  });

  test('aucune redirection ne boucle sur elle-même', () => {
    const boucles = redirections()
      .filter((r) => r.from.replace(/\/?\*?$/, '') === r.to.replace(/\/$/, ''))
      .map((r) => `${r.from} -> ${r.to}`);
    assert.deepEqual(boucles, [], `boucle de redirection : ${boucles.join(', ')}`);
  });
});

describe('parité sitemaps / pages générées', () => {
  test('chaque page générée est déclarée dans un sitemap', { skip: SANS_BUILD }, () => {
    const sitemap = sitemapRoutes(SITE_URL);
    // La 404 n'a rien à faire dans un sitemap.
    const manquantes = distPages()
      .map((p) => p.route)
      .filter((r) => !sitemap.has(r));
    assert.deepEqual(
      manquantes,
      [],
      `pages générées absentes des sitemaps :\n  ${manquantes.join('\n  ')}`
    );
  });

  test('aucun sitemap ne déclare une page fantôme', { skip: SANS_BUILD }, () => {
    const prerendues = new Set(distPages().map((p) => p.route));
    const fantomes = [...sitemapRoutes(SITE_URL)].filter((r) => !prerendues.has(r));
    assert.deepEqual(
      fantomes,
      [],
      'URL déclarées dans un sitemap sans page correspondante — Google les ' +
        `signalera en erreur d'exploration :\n  ${fantomes.join('\n  ')}`
    );
  });

  test('robots.txt déclare tous les sitemaps présents sur le disque', () => {
    const robots = read('public/robots.txt');
    const declares = new Set(
      [...robots.matchAll(/^Sitemap:\s*(\S+)/gim)].map((m) =>
        m[1].replace(`${SITE_URL}/`, '')
      )
    );
    const surDisque = publicFiles()
      .map((rel) => rel.split('/').pop())
      .filter((nom) => nom.startsWith('sitemap-'));

    const nonDeclares = surDisque.filter((nom) => !declares.has(nom));
    assert.deepEqual(
      nonDeclares,
      [],
      `sitemaps présents mais non déclarés dans robots.txt : ${nonDeclares.join(', ')}`
    );

    const declaresAbsents = [...declares].filter(
      (nom) => nom.startsWith('sitemap-') && !exists(`public/${nom}`)
    );
    assert.deepEqual(
      declaresAbsents,
      [],
      `sitemaps déclarés dans robots.txt mais absents du disque : ${declaresAbsents.join(', ')}`
    );
  });
});
