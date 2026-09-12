/**
 * Garde-fous de l'internationalisation.
 *
 * Le lancement polonais ajoute une classe de panne entièrement nouvelle, et
 * silencieuse : rien ne plante quand une page polonaise sert un `<title>`
 * français, quand un `hreflang` désigne une page qui n'existe pas, ou quand un
 * bouton renvoie vers une boutique où l'application n'est pas distribuée. Le
 * site se construit, se déploie, s'affiche — et ne se référence pas.
 *
 * C'est exactement le motif qui avait cassé la page de suppression de compte
 * quand le backend a changé de domaine : une valeur devenue fausse quelque
 * part, aucune erreur nulle part.
 *
 * Ces tests lisent le HTML RÉELLEMENT PRODUIT, pas les sources : ce qui
 * compte est ce qu'un crawler reçoit.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { read, distBuilt, distPages } from './lib/sources.mjs';

const SANS_BUILD = distBuilt() ? false : 'dist/ absent — lancer `npm run build`';
const SITE_URL = 'https://yummeal.app';

/**
 * Les langues et leur code `hreflang`. Recopié depuis src/i18n/config.ts —
 * les tests sont en .mjs et ne compilent pas le TypeScript. Une langue
 * ajoutée là-bas sans l'être ici fait échouer le test de couverture
 * ci-dessous, ce qui est le rappel voulu.
 */
const LANGUES = { fr: 'fr-FR', pl: 'pl-PL' };
/** Préfixe d'URL par langue ('' pour la langue servie à la racine). */
const PREFIXE = { fr: '', pl: '/pl' };

const alternatesDe = (html) =>
  [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)" \/>/g)].map(
    (m) => ({ hreflang: m[1], href: m[2] })
  );

const langDe = (html) => (html.match(/<html lang="([^"]*)"/) ?? [])[1];
const canonicalDe = (html) =>
  (html.match(/<link rel="canonical" href="([^"]*)"/) ?? [])[1];

/** La langue qu'une route ANNONCE par son URL. */
function langueDeRoute(route) {
  for (const [code, prefixe] of Object.entries(PREFIXE)) {
    if (prefixe && (route === prefixe || route.startsWith(`${prefixe}/`))) return code;
  }
  return 'fr';
}

describe('langue déclarée', { skip: SANS_BUILD }, () => {
  test('chaque page porte l’attribut lang de la langue de son URL', () => {
    const fautives = [];
    for (const p of distPages()) {
      const attendu = LANGUES[langueDeRoute(p.route)];
      const trouve = langDe(p.html);
      if (trouve !== attendu) {
        fautives.push(`${p.route} : lang="${trouve}" au lieu de "${attendu}"`);
      }
    }
    assert.deepEqual(fautives, [], fautives.join('\n'));
  });

  test('le canonical d’une page traduite reste dans sa langue', () => {
    // Le piège classique : une page /pl/ dont le canonical pointe vers la
    // version française. Google désindexe alors purement et simplement la
    // version polonaise, en considérant que l'éditeur l'a demandé.
    const fautives = [];
    for (const p of distPages()) {
      const langue = langueDeRoute(p.route);
      if (langue === 'fr') continue;
      const canonical = canonicalDe(p.html);
      if (!canonical?.startsWith(`${SITE_URL}${PREFIXE[langue]}/`)) {
        fautives.push(`${p.route} -> ${canonical}`);
      }
    }
    assert.deepEqual(fautives, [], fautives.join('\n'));
  });
});

describe('hreflang', { skip: SANS_BUILD }, () => {
  const pages = distPages();
  const parUrl = new Map(
    pages.map((p) => [`${SITE_URL}${p.route.endsWith('/') ? p.route : `${p.route}/`}`, p])
  );

  test('chaque hreflang désigne une page réellement générée', () => {
    const fautifs = [];
    for (const p of pages) {
      for (const { hreflang, href } of alternatesDe(p.html)) {
        if (!parUrl.has(href)) fautifs.push(`${p.route} -> ${hreflang} : ${href} n'existe pas`);
      }
    }
    assert.deepEqual(
      fautifs,
      [],
      'hreflang vers une page inexistante — Google ignore alors tout le groupe :\n' +
        fautifs.join('\n')
    );
  });

  test('les hreflang sont réciproques', () => {
    // Une déclaration non réciproque est purement et simplement ignorée par
    // Google : A peut dire « ma version polonaise est B », mais si B ne
    // confirme pas, la paire n'existe pas. C'est l'erreur la plus répandue.
    const fautifs = [];
    for (const p of pages) {
      const miennes = alternatesDe(p.html).filter((a) => a.hreflang !== 'x-default');
      if (miennes.length === 0) continue;
      const miennesTriees = miennes.map((a) => `${a.hreflang}=${a.href}`).sort().join(' ');
      for (const { href } of miennes) {
        const cible = parUrl.get(href);
        if (!cible) continue; // déjà signalé par le test précédent
        const siennes = alternatesDe(cible.html)
          .filter((a) => a.hreflang !== 'x-default')
          .map((a) => `${a.hreflang}=${a.href}`)
          .sort()
          .join(' ');
        if (siennes !== miennesTriees) {
          fautifs.push(`${p.route} et ${cible.route} déclarent des groupes différents`);
        }
      }
    }
    assert.deepEqual([...new Set(fautifs)], [], fautifs.join('\n'));
  });

  test('un groupe hreflang déclare toujours x-default vers le français', () => {
    const fautifs = [];
    for (const p of pages) {
      const tous = alternatesDe(p.html);
      if (tous.length === 0) continue;
      const xd = tous.filter((a) => a.hreflang === 'x-default');
      if (xd.length !== 1) {
        fautifs.push(`${p.route} : ${xd.length} x-default`);
        continue;
      }
      // x-default désigne la version servie à qui n'a pas de préférence
      // exprimée : c'est le français, la seule langue qui couvre tout le site.
      const cible = parUrl.get(xd[0].href);
      if (!cible || langueDeRoute(cible.route) !== 'fr') {
        fautifs.push(`${p.route} : x-default -> ${xd[0].href} n'est pas une page française`);
      }
    }
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });

  test('aucune page ne déclare un hreflang toute seule', () => {
    // Un groupe d'une seule langue ne veut rien dire, et fait passer la page
    // pour la traduction d'elle-même.
    const fautifs = distPages()
      .filter((p) => {
        const n = alternatesDe(p.html).filter((a) => a.hreflang !== 'x-default').length;
        return n === 1;
      })
      .map((p) => p.route);
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });
});

describe('couverture des traductions', { skip: SANS_BUILD }, () => {
  test('chaque langue déclarée a au moins son accueil généré', () => {
    const routes = new Set(distPages().map((p) => p.route));
    for (const [code, prefixe] of Object.entries(PREFIXE)) {
      const attendue = prefixe ? `${prefixe}/` : '/';
      assert.ok(
        routes.has(attendue),
        `la langue « ${code} » est déclarée mais ${attendue} n'est pas prérendue`
      );
    }
  });

  test('la page polonaise est annoncée dans un sitemap et dans robots.txt', () => {
    const sitemap = read('public/sitemap-pl.xml');
    assert.match(sitemap, /<loc>https:\/\/yummeal\.app\/pl\/<\/loc>/);
    assert.match(
      read('public/sitemap-index.xml'),
      /sitemap-pl\.xml/,
      'sitemap-pl.xml absent de l’index : Google ne le découvrira pas'
    );
    assert.match(read('public/robots.txt'), /sitemap-pl\.xml/);
  });

  test('aucune page polonaise n’a de texte français résiduel', () => {
    // Un composant oublié ne casse rien : il rend juste du français au milieu
    // du polonais. Ces mots-outils sont fréquents en français et absents du
    // polonais, donc leur présence signale un bloc non traduit.
    //
    // « Français » est attendu : c'est le libellé du sélecteur de langue, et
    // le nom d'une langue s'écrit dans cette langue. On le retire avant.
    const pagesPl = distPages().filter((p) => p.route.startsWith('/pl/'));
    assert.ok(pagesPl.length > 0, 'aucune page polonaise dans dist/');
    const suspects = ['votre', 'vos', 'avec', 'pour', 'recettes', 'frigo', 'gratuit'];
    const fautives = [];
    for (const p of pagesPl) {
      const corps = p.html
        .split('<div id="root">')[1]
        .split('</body>')[0]
        .replace(/<[^>]+>/g, ' ')
        .replace(/Fran[çc]ais/g, ' ');
      const trouves = suspects.filter((mot) =>
        new RegExp(`\\b${mot}\\b`, 'i').test(corps)
      );
      if (trouves.length) fautives.push(`${p.route} : ${trouves.join(', ')}`);
    }
    assert.deepEqual(
      fautives,
      [],
      `mots français dans une page polonaise (bloc non traduit ?) :\n${fautives.join('\n')}`
    );
  });
});
