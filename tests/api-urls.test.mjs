/**
 * Garde-fous sur les URL de services externes.
 *
 * Pourquoi ce fichier existe. Le backend a migré de `yummeal-server.deno.dev`
 * (Deno Deploy Classic, sunset) vers `yummeal-server.yumhack.deno.net`. L'URL
 * était recopiée dans trois fichiers ; deux copies n'ont pas suivi. Résultat :
 * la page `/supprimer-mon-compte` — exigée par Apple et par Google Play —
 * appelait un domaine qui ne répond plus, et le tracking envoyait ses
 * événements dans le vide. Rien n'échouait au build, rien n'échouait au lint,
 * et le site se déployait vert.
 *
 * Ces tests transforment cette panne silencieuse en échec bruyant.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { read, sourceFiles, publicFiles, exists, distBuilt, distPages } from './lib/sources.mjs';

const SANS_BUILD = distBuilt() ? false : 'dist/ absent — lancer `npm run build`';

/** Hôte du backend en production. À changer ICI en cas de nouvelle migration. */
const BACKEND_HOST = 'yummeal-server.yumhack.deno.net';

/**
 * Hôtes morts : toute réapparition est un bug, pas une coquille. Ajouter un
 * hôte ici à chaque migration, plutôt que de supprimer l'ancien de la liste.
 */
const HOTES_MORTS = [
  'yummeal-server.deno.dev', // sunset Deno Deploy Classic, 20/07/2026
  'twojey.github.io', // GitHub Pages : l'hébergeur réel est Netlify
];

/**
 * `yummeal.com` n'est pas le domaine du site (c'est `yummeal.app`) mais c'est
 * bien le domaine de l'adresse de contact : on ne traque donc que les URL,
 * jamais les adresses e-mail.
 */
const DOMAINE_WEB_ATTENDU = 'yummeal.app';

/**
 * Hôtes tiers qui portent légitimement « yummeal » dans leur nom. À garder
 * court et commenté : chaque entrée est une exception au domaine canonique.
 */
const HOTES_TIERS_LEGITIMES = new Set([
  'yummeal.onelink.me', // OneLink AppsFlyer (attribution des installs)
]);

/** Le fichier autorisé à déclarer une URL de backend. */
const SOURCE_UNIQUE = 'src/config.ts';

describe('URL du backend', () => {
  test('config.ts déclare l’hôte de production attendu', () => {
    const config = read(SOURCE_UNIQUE);
    const m = config.match(/export const API_BASE_URL = '([^']+)'/);
    assert.ok(m, `API_BASE_URL doit être exportée depuis ${SOURCE_UNIQUE}`);
    assert.equal(
      m[1],
      `https://${BACKEND_HOST}`,
      "l'URL du backend ne correspond plus à l'hôte de production"
    );
  });

  test('aucun autre fichier ne déclare une URL de backend en dur', () => {
    const fautifs = [];
    for (const rel of sourceFiles()) {
      if (rel === SOURCE_UNIQUE) continue;
      const contenu = read(rel);
      // Toute URL absolue vers un service `yummeal-server*` ou `*.deno.*`.
      const trouvees = [
        ...contenu.matchAll(/https?:\/\/[^\s'"`)]*(?:yummeal-server|deno\.(?:dev|net))[^\s'"`)]*/g),
      ].map((m) => m[0]);
      if (trouvees.length) fautifs.push({ rel, trouvees });
    }
    assert.deepEqual(
      fautifs,
      [],
      `URL de backend en dur hors de ${SOURCE_UNIQUE} — importez API_BASE_URL ` +
        `plutôt que de recopier l'URL, sinon la prochaine migration en oubliera une :\n` +
        fautifs.map((f) => `  ${f.rel} -> ${f.trouvees.join(', ')}`).join('\n')
    );
  });

  test('les consommateurs de l’API importent API_BASE_URL', () => {
    // Les deux fichiers qui avaient leur propre copie de l'URL.
    for (const rel of ['src/DeleteAccount.tsx', 'src/utils/tracking.ts']) {
      const contenu = read(rel);
      assert.match(
        contenu,
        /import \{ API_BASE_URL \} from ['"][^'"]*config['"]/,
        `${rel} doit importer API_BASE_URL depuis config`
      );
    }
  });
});

describe('hôtes morts', () => {
  for (const hote of HOTES_MORTS) {
    test(`aucune référence à « ${hote} » dans src/ ni public/`, () => {
      const fautifs = [...sourceFiles(), ...publicFiles()].filter((rel) =>
        read(rel).includes(hote)
      );
      assert.deepEqual(
        fautifs,
        [],
        `« ${hote} » ne répond plus : fichiers concernés -> ${fautifs.join(', ')}`
      );
    });
  }

  test(`toute URL du site pointe vers ${DOMAINE_WEB_ATTENDU}`, () => {
    // On lit les URL absolues uniquement (préfixe http), donc `contact@yummeal.com`
    // — l'adresse de contact réelle — n'est pas concernée.
    const fautifs = [];
    for (const rel of [...publicFiles(), ...sourceFiles()]) {
      for (const m of read(rel).matchAll(
        /https?:\/\/([a-z0-9.-]*yummeal[a-z0-9.-]*)/gi
      )) {
        const hote = m[1].toLowerCase();
        // Les URL de backend sont légitimes et couvertes par leurs propres tests.
        if (hote.startsWith('yummeal-server')) continue;
        if (HOTES_TIERS_LEGITIMES.has(hote)) continue;
        if (hote !== DOMAINE_WEB_ATTENDU) fautifs.push(`${rel} -> ${hote}`);
      }
    }
    assert.deepEqual(
      [...new Set(fautifs)],
      [],
      `mauvais domaine web : ${[...new Set(fautifs)].join(', ')}`
    );
  });
});

describe('URL des fiches stores', () => {
  // La fiche iOS a été renommée « Recettes du Frigo - Yummeal » : l'ancien
  // slug redirige encore côté Apple, mais un lien périmé dans le JSON-LD
  // `sameAs` ou dans un bouton de téléchargement brouille l'identité de la
  // marque, qui est déjà disputée par des homonymes.
  //
  // ⚠️ Apple sert UN SLUG PAR VITRINE, pas un slug global : la fiche polonaise
  // (ouverte le 12/09/2026) répond sur `/pl/app/fridge-recipes-yummeal/…`.
  // Ce test acceptait un slug unique tant qu'il n'existait qu'une vitrine ;
  // il liste désormais les slugs valides. Apple redirige d'ailleurs le slug
  // d'une autre langue vers le bon (vérifié), donc ce garde-fou protège
  // l'identité de marque, pas l'accessibilité du lien.
  const SLUGS_IOS = new Set(['recettes-du-frigo-yummeal', 'fridge-recipes-yummeal']);
  const ID_IOS = '6744942441';
  const ID_ANDROID = 'com.yummeal';

  /**
   * Les URL des stores étaient recopiées dans cinq fichiers, comme l'URL du
   * backend avant elle. Elles sont désormais construites dans src/config.ts,
   * donc un test qui cherche des URL littérales dans les sources ne peut plus
   * les voir — il verrait `${APP_STORE_ID}`.
   *
   * Le garde-fou porte donc sur les deux choses qui comptent vraiment :
   *  1. personne ne redéclare une URL de store ailleurs que dans config.ts ;
   *  2. les URL qui sortent réellement dans le HTML prérendu sont correctes.
   * Le second point est le seul qui teste ce que le visiteur reçoit.
   */
  const FICHIERS_AUTORISES = new Set([
    'src/config.ts',
    // llms.txt et les données éditoriales citent les fiches en texte : ce ne
    // sont pas des boutons, mais elles doivent rester à jour elles aussi.
    'public/llms.txt',
  ]);

  test('seul src/config.ts déclare les URL des stores', () => {
    const fautifs = [];
    for (const rel of sourceFiles()) {
      if (FICHIERS_AUTORISES.has(rel)) continue;
      const contenu = read(rel);
      for (const ligne of contenu.split('\n')) {
        // Les commentaires citent les URL pour expliquer la règle.
        const nue = ligne.trim();
        if (nue.startsWith('*') || nue.startsWith('//')) continue;
        if (/https:\/\/(?:apps\.apple\.com|play\.google\.com)/.test(ligne)) {
          fautifs.push(`${rel} -> ${nue.slice(0, 90)}`);
        }
      }
    }
    assert.deepEqual(
      fautifs,
      [],
      'URL de store déclarée hors de src/config.ts — importer STORE_URLS :\n' +
        fautifs.join('\n')
    );
  });

  test('les liens App Store et Play sont corrects dans le HTML servi', { skip: SANS_BUILD }, () => {
    const fautifs = [];
    let vus = 0;
    for (const p of distPages()) {
      for (const m of p.html.matchAll(/https:\/\/apps\.apple\.com\/[^\s'"`)<]+/g)) {
        vus++;
        const url = m[0];
        if (!url.includes(ID_IOS)) fautifs.push(`${p.route} -> id manquant : ${url}`);
        else {
          const slug = url.match(/\/app\/([^/]+)\//);
          if (slug && !SLUGS_IOS.has(slug[1]))
            fautifs.push(`${p.route} -> slug périmé : ${url}`);
        }
      }
      for (const m of p.html.matchAll(/https:\/\/play\.google\.com\/[^\s'"`)<]+/g)) {
        vus++;
        if (!m[0].includes(ID_ANDROID)) fautifs.push(`${p.route} -> ${m[0]}`);
      }
    }
    assert.ok(vus > 100, `seulement ${vus} liens de store trouvés dans dist/ — le test ne teste rien`);
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });

  /**
   * ✅ La Pologne a été OUVERTE le 12/09/2026 : `asccli app-availability get
   * --app-id 6744942441` renvoie FRA, CIV, POL (3/175) et la fiche polonaise
   * est réellement servie (HTTP 200, prix en zł). Ce test protégeait
   * auparavant l'invariant inverse — « aucun lien App Store sur /pl » — et sa
   * prémisse est devenue fausse. Il a donc été RETOURNÉ, pas supprimé.
   *
   * L'invariant qui reste utile : un visiteur polonais ne doit jamais être
   * envoyé sur la vitrine d'un AUTRE pays. Apple sert la fiche du code pays
   * présent dans l'URL ; un lien `/fr/` sur une page polonaise afficherait des
   * prix en euros et une fiche en français. C'est exactement le genre de
   * régression qu'une traduction recopiée introduit sans qu'on la voie.
   */
  test('une page polonaise n’envoie jamais vers la vitrine App Store d’un autre pays', { skip: SANS_BUILD }, () => {
    const pagesPl = distPages().filter((p) => p.route === '/pl' || p.route.startsWith('/pl/'));
    assert.ok(pagesPl.length > 0, 'aucune page polonaise dans dist/ — le test ne teste rien');
    const fautifs = [];
    for (const p of pagesPl) {
      // Liens CLIQUABLES uniquement : le `sameAs` du JSON-LD cite la fiche
      // pour identifier l'entité « Yummeal », pas pour y envoyer quelqu'un.
      for (const m of p.html.matchAll(/href="(https:\/\/apps\.apple\.com[^"]*)"/g)) {
        if (!/^https:\/\/apps\.apple\.com\/pl\//.test(m[1])) {
          fautifs.push(`${p.route} -> ${m[1]}`);
        }
      }
    }
    assert.deepEqual(
      fautifs,
      [],
      `lien App Store hors vitrine polonaise (prix en euros, fiche en français) :\n${fautifs.join('\n')}`
    );
  });
});

describe('adresse de contact', () => {
  /**
   * `contact@yummeal.com` était publié 11 fois (CGU ×5, suppression de compte
   * ×3, à propos ×2, confidentialité ×1) alors que **ce domaine appartient à
   * un tiers** : NS sur `afternic.com` (place de marché de domaines, créé en
   * 2006), `MX = 0 .` (null MX, RFC 7505 : n'accepte aucun courrier) et
   * `TXT = v=spf1 -all` (n'en émet aucun).
   *
   * Ce n'était pas un détail : cette adresse servait de contact RGPD, de
   * contact légal des CGU et de recours en cas d'échec de la suppression de
   * compte — une page exigée par Apple et Google Play. Si le propriétaire du
   * domaine parqué activait un catch-all, il recevrait des demandes de
   * suppression de compte et des demandes RGPD, donc des données personnelles.
   *
   * Ces deux tests existent pour que la substitution ne soit pas défaite par
   * un copier-coller depuis une vieille page.
   */
  const DOMAINE_TIERS = 'yummeal.com';

  test('aucune adresse e-mail ne pointe vers le domaine d’un tiers', () => {
    const fautifs = [];
    for (const rel of [...sourceFiles(), ...publicFiles()]) {
      const contenu = read(rel);
      for (const ligne of contenu.split('\n')) {
        const nue = ligne.trim();
        // Les commentaires énoncent la règle : ils citent l'adresse exprès.
        if (nue.startsWith('*') || nue.startsWith('//')) continue;
        if (new RegExp(`[\\w.+-]+@${DOMAINE_TIERS.replace('.', '\\.')}`).test(ligne)) {
          fautifs.push(`${rel} -> ${nue.slice(0, 80)}`);
        }
      }
    }
    assert.deepEqual(
      fautifs,
      [],
      `adresse sur ${DOMAINE_TIERS}, qui n'est pas notre domaine — importer ` +
        `CONTACT_EMAIL depuis src/config.ts :\n${fautifs.join('\n')}`
    );
  });

  test('seul src/config.ts déclare l’adresse de contact', () => {
    const fautifs = sourceFiles()
      .filter((rel) => rel !== 'src/config.ts')
      .filter((rel) =>
        read(rel)
          .split('\n')
          .some((l) => {
            const nue = l.trim();
            if (nue.startsWith('*') || nue.startsWith('//')) return false;
            return /contact@yummeal\.app/.test(l);
          })
      );
    assert.deepEqual(
      fautifs,
      [],
      `adresse recopiée en dur — importer CONTACT_EMAIL : ${fautifs.join(', ')}`
    );
  });

  test('l’adresse déclarée est bien sur notre domaine', () => {
    const m = read('src/config.ts').match(
      /export const CONTACT_EMAIL = '([^']+)'/
    );
    assert.ok(m, 'CONTACT_EMAIL introuvable dans src/config.ts');
    assert.match(
      m[1],
      /@yummeal\.app$/,
      `CONTACT_EMAIL doit être sur yummeal.app (trouvé : ${m?.[1]})`
    );
  });
});

describe('hygiène de configuration', () => {
  test('la sourcemap est désactivée en production', () => {
    // `sourcemap: true` servait /assets/*.js.map, soit 1,9 Mo de code source
    // en clair accessibles publiquement.
    assert.match(
      read('vite.config.ts'),
      /sourcemap:\s*false/,
      'vite.config.ts doit garder sourcemap: false'
    );
  });

  test('le catch-all Netlify renvoie 404 et reste en dernier, sans force', () => {
    const toml = read('netlify.toml');
    const blocs = [...toml.matchAll(/\[\[redirects\]\][\s\S]*?(?=\n\[\[|\n*$)/g)].map(
      (m) => m[0]
    );
    assert.ok(blocs.length > 0, 'netlify.toml doit déclarer des redirections');

    const dernier = blocs[blocs.length - 1];
    assert.match(dernier, /from\s*=\s*"\/\*"/, 'le catch-all doit être la DERNIÈRE règle');
    assert.match(dernier, /status\s*=\s*404/, 'le catch-all doit renvoyer 404, pas 200');

    // `force = true` ferait passer la redirection AVANT les fichiers statiques :
    // chaque page prérendue renverrait alors la 404.
    assert.doesNotMatch(
      toml,
      /from\s*=\s*"\/\*"[\s\S]*?force\s*=\s*true/,
      'force = true sur le catch-all court-circuiterait tout le prérendu'
    );
  });

  test('aucun script de déploiement mort ne subsiste', () => {
    const pkg = JSON.parse(read('package.json'));
    for (const nom of ['deploy', 'predeploy']) {
      assert.equal(
        pkg.scripts?.[nom],
        undefined,
        `le script « ${nom} » visait GitHub Pages ; l'hébergeur est Netlify`
      );
    }
    assert.equal(exists('public/CNAME'), false, 'public/CNAME est un vestige GitHub Pages');
  });
});
