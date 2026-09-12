/**
 * Invariants SEO vérifiés sur le HTML réellement généré dans `dist/`.
 *
 * Ces tests verrouillent des régressions qui, toutes, se sont produites sans
 * jamais faire échouer ni le build ni le lint :
 *  - 165 pages portaient le titre de l'accueil dans leurs balises `twitter:*` ;
 *  - 63 pages n'avaient aucun JSON-LD, dont les 47 fiches ingrédient ;
 *  - aucune page n'avait de fil d'Ariane ;
 *  - 24 titles dépassaient la longueur affichable, 17 descriptions aussi ;
 *  - 91 pages sur 166 recevaient moins de 5 liens internes ;
 *  - les données structurées annonçaient un prix de 0 € pour un produit par
 *    abonnement.
 *
 * Un invariant qui ne tient plus doit être corrigé, pas assoupli : le seuil
 * écrit ici est la raison du seuil, pas un réglage.
 */
import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  DIST,
  distBuilt,
  distPages,
  title,
  metaContent,
  canonical,
  h1s,
  jsonLdBlocks,
  internalLinks,
} from './lib/sources.mjs';

const SITE_URL = 'https://yummeal.app';

/** Au-delà, Google tronque le title dans les résultats. */
const TITLE_MAX = 65;
/** Au-delà, la description est coupée. */
const DESCRIPTION_MAX = 160;
/**
 * Seuil de découverte : en dessous, le PageRank interne ne redescend pas et la
 * page reste un cul-de-sac. Deux pages sont au maximum structurel de leur silo
 * (cinq articles voisins), une est une page utilitaire de conformité.
 */
const LIENS_ENTRANTS_MIN = 4;
const TOLERANCE_SOUS_MAILLAGE = 3;

const SANS_BUILD = distBuilt()
  ? false
  : 'dist/ absent — lancer `npm run build` avant ces tests';

let pages = [];
let routes = new Set();
let liensEntrants = new Map();

before(() => {
  if (SANS_BUILD) return;
  pages = distPages();
  routes = new Set(pages.map((p) => p.route));
  liensEntrants = new Map([...routes].map((r) => [r, 0]));
  for (const page of pages) {
    for (const lien of internalLinks(page.html)) {
      if (routes.has(lien) && lien !== page.route) {
        liensEntrants.set(lien, liensEntrants.get(lien) + 1);
      }
    }
  }
});

describe('intégrité du prérendu', { skip: SANS_BUILD }, () => {
  test('un volume de pages plausible a été généré', () => {
    // Garde-fou contre un prerender silencieusement cassé qui n'écrirait que
    // l'accueil : tous les tests suivants passeraient alors à vide.
    assert.ok(
      pages.length > 100,
      `seulement ${pages.length} pages générées : le prerender a probablement échoué`
    );
  });

  test('aucune page profonde ne sert le HTML de l’accueil', () => {
    const accueil = pages.find((p) => p.route === '/');
    assert.ok(accueil, "l'accueil doit être généré");
    const titreAccueil = title(accueil.html);
    const usurpatrices = pages
      .filter((p) => p.route !== '/' && title(p.html) === titreAccueil)
      .map((p) => p.route);
    assert.deepEqual(
      usurpatrices,
      [],
      'ces pages portent le titre de l’accueil : elles servent son HTML, ' +
        `donc elles ne sont pas réellement prérendues :\n  ${usurpatrices.join('\n  ')}`
    );
  });

  test('une vraie page 404 existe, en noindex et sans canonical vers elle-même', () => {
    const f = path.join(DIST, '404.html');
    assert.ok(fs.existsSync(f), 'dist/404.html doit être généré');
    const html = fs.readFileSync(f, 'utf-8');
    assert.match(html, /content="noindex/, 'la 404 doit être en noindex');
    assert.equal(
      canonical(html),
      `${SITE_URL}/`,
      'la 404 ne doit pas se déclarer canonique d’elle-même'
    );
    assert.ok(h1s(html).length === 1, 'la 404 doit avoir un H1 et un seul');
  });

  test('aucune sourcemap n’est servie', () => {
    const assets = path.join(DIST, 'assets');
    const maps = fs.existsSync(assets)
      ? fs.readdirSync(assets).filter((f) => f.endsWith('.map'))
      : [];
    assert.deepEqual(
      maps,
      [],
      'une sourcemap expose tout le code source en clair (remettre sourcemap: false)'
    );
  });
});

describe('balises par page', { skip: SANS_BUILD }, () => {
  test('canonical présent, unique, self-référent et sur le bon domaine', () => {
    const fautifs = [];
    for (const p of pages) {
      const occurrences = (p.html.match(/rel="canonical"/g) ?? []).length;
      const attendu = `${SITE_URL}${p.route}`;
      if (occurrences !== 1) fautifs.push(`${p.route} : ${occurrences} canonical`);
      // Une page peut légitimement pointer ailleurs (alias), mais alors la
      // cible doit exister.
      else if (canonical(p.html) !== attendu && !routes.has(canonical(p.html).replace(SITE_URL, '')))
        fautifs.push(`${p.route} : canonical vers une page inexistante`);
    }
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });

  test('exactement un H1 par page', () => {
    const fautifs = pages
      .filter((p) => h1s(p.html).length !== 1)
      .map((p) => `${p.route} : ${h1s(p.html).length} H1`);
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });

  test('aucun title ne dépasse la longueur affichable', () => {
    const fautifs = pages
      .map((p) => ({ route: p.route, t: title(p.html) }))
      .filter((x) => (x.t?.length ?? 0) > TITLE_MAX)
      .map((x) => `${x.route} : ${x.t.length} caractères — « ${x.t} »`);
    assert.deepEqual(
      fautifs,
      [],
      `title > ${TITLE_MAX} caractères, la fin sera coupée en SERP :\n  ${fautifs.join('\n  ')}`
    );
  });

  test('aucune description ne dépasse la longueur affichable', () => {
    const fautifs = pages
      .map((p) => ({ route: p.route, d: metaContent(p.html, 'name', 'description') }))
      .filter((x) => (x.d?.length ?? 0) > DESCRIPTION_MAX)
      .map((x) => `${x.route} : ${x.d.length} caractères`);
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });

  test('aucun title ni description dupliqué', () => {
    for (const [nom, valeurs] of [
      ['title', pages.map((p) => title(p.html))],
      ['description', pages.map((p) => metaContent(p.html, 'name', 'description'))],
    ]) {
      const vus = new Map();
      for (const v of valeurs) vus.set(v, (vus.get(v) ?? 0) + 1);
      const doublons = [...vus].filter(([, n]) => n > 1).map(([v, n]) => `${n}× « ${v} »`);
      assert.deepEqual(doublons, [], `${nom} dupliqué : ${doublons.join(' | ')}`);
    }
  });

  test('les balises twitter reprennent le title et la description de la page', () => {
    // C'était le défaut le plus répandu : `injectMeta` réécrivait les og:* mais
    // pas les twitter:*, donc toute carte partagée hors Open Graph affichait
    // l'accueil.
    const fautifs = [];
    for (const p of pages) {
      if (metaContent(p.html, 'name', 'twitter:title') !== title(p.html))
        fautifs.push(`${p.route} : twitter:title désynchronisé`);
      if (
        metaContent(p.html, 'name', 'twitter:description') !==
        metaContent(p.html, 'name', 'description')
      )
        fautifs.push(`${p.route} : twitter:description désynchronisée`);
    }
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });

  test('og:type vaut website sur l’accueil et article ailleurs', () => {
    const fautifs = pages
      .filter((p) => {
        const attendu = p.route === '/' ? 'website' : 'article';
        return metaContent(p.html, 'property', 'og:type') !== attendu;
      })
      .map((p) => `${p.route} : ${metaContent(p.html, 'property', 'og:type')}`);
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });

  test('aucune URL non-ASCII (elles se percent-encodent et cassent au partage)', () => {
    const fautifs = pages.filter((p) => /[^\x20-\x7E]/.test(p.route)).map((p) => p.route);
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });
});

describe('données structurées', { skip: SANS_BUILD }, () => {
  test('chaque page porte au moins un bloc JSON-LD valide', () => {
    const fautifs = [];
    for (const p of pages) {
      try {
        if (jsonLdBlocks(p.html).length === 0) fautifs.push(`${p.route} : aucun JSON-LD`);
      } catch (e) {
        fautifs.push(`${p.route} : JSON-LD invalide (${e.message})`);
      }
    }
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });

  test('chaque page hors accueil a un fil d’Ariane', () => {
    const fautifs = pages
      .filter((p) => p.route !== '/')
      .filter((p) => !jsonLdBlocks(p.html).some((b) => b['@type'] === 'BreadcrumbList'))
      .map((p) => p.route);
    assert.deepEqual(
      fautifs,
      [],
      `BreadcrumbList manquant — c'est le rich result le moins cher du site :\n  ${fautifs.join('\n  ')}`
    );
  });

  test('les fils d’Ariane ne pointent que vers des pages existantes', () => {
    const fautifs = [];
    for (const p of pages) {
      for (const bloc of jsonLdBlocks(p.html)) {
        if (bloc['@type'] !== 'BreadcrumbList') continue;
        for (const item of bloc.itemListElement ?? []) {
          const route = String(item.item).replace(SITE_URL, '');
          if (!routes.has(route)) fautifs.push(`${p.route} -> ${item.item}`);
        }
      }
    }
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });

  test('aucune donnée structurée n’annonce un prix nul', () => {
    // Le JSON-LD déclarait `price: '0'` pour une application par abonnement :
    // un signal faux pour les moteurs, et une entorse à la règle « gratuit
    // uniquement scopé au téléchargement ».
    const fautifs = [];
    const chercherPrixNul = (noeud, route) => {
      if (Array.isArray(noeud)) return noeud.forEach((n) => chercherPrixNul(n, route));
      if (!noeud || typeof noeud !== 'object') return;
      if ('price' in noeud && Number(noeud.price) === 0)
        fautifs.push(`${route} : price = ${noeud.price}`);
      Object.values(noeud).forEach((v) => chercherPrixNul(v, route));
    };
    for (const p of pages) jsonLdBlocks(p.html).forEach((b) => chercherPrixNul(b, p.route));
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });

  test('l’Organization est ancrée par @id et nomme l’entité légale', () => {
    const accueil = pages.find((p) => p.route === '/');
    const org = jsonLdBlocks(accueil.html).find((b) => b['@type'] === 'Organization');
    assert.ok(org, "l'accueil doit déclarer une Organization");
    assert.equal(org['@id'], `${SITE_URL}/#organization`);
    assert.equal(
      org.legalName,
      'YIDLA',
      "l'entité légale doit être nommée : l'identité de la marque est disputée " +
        'par des homonymes, et rien ne la réconciliait'
    );
  });
});

describe('maillage interne', { skip: SANS_BUILD }, () => {
  test('aucune page orpheline', () => {
    const orphelines = [...liensEntrants].filter(([, n]) => n === 0).map(([r]) => r);
    assert.deepEqual(orphelines, [], `pages sans aucun lien entrant : ${orphelines.join(', ')}`);
  });

  test('le sous-maillage reste dans la tolérance connue', () => {
    const sous = [...liensEntrants]
      .filter(([, n]) => n < LIENS_ENTRANTS_MIN)
      .map(([r, n]) => `${r} (${n})`);
    assert.ok(
      sous.length <= TOLERANCE_SOUS_MAILLAGE,
      `${sous.length} pages sous ${LIENS_ENTRANTS_MIN} liens entrants, ` +
        `tolérance ${TOLERANCE_SOUS_MAILLAGE} :\n  ${sous.join('\n  ')}\n` +
        'Ajouter un bloc de liens latéraux plutôt que de relever la tolérance.'
    );
  });

  test('aucun lien interne ne pointe vers une page inexistante', () => {
    const casses = [];
    for (const p of pages) {
      for (const lien of internalLinks(p.html)) {
        // On ignore les fichiers servis tels quels (assets, sitemaps, images).
        if (/\.[a-z0-9]{2,4}\/$/i.test(lien) || lien.startsWith('/assets/')) continue;
        if (!routes.has(lien)) casses.push(`${p.route} -> ${lien}`);
      }
    }
    assert.deepEqual(casses, [], `liens internes cassés :\n  ${[...new Set(casses)].join('\n  ')}`);
  });
});
