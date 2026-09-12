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
import { read, sourceFiles, publicFiles, exists } from './lib/sources.mjs';

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
  const SLUG_IOS = 'recettes-du-frigo-yummeal';
  const ID_IOS = '6744942441';
  const ID_ANDROID = 'com.yummeal';

  test('les liens App Store utilisent le slug et l’id à jour', () => {
    const fautifs = [];
    for (const rel of [...sourceFiles(), ...publicFiles()]) {
      for (const m of read(rel).matchAll(/https:\/\/apps\.apple\.com\/[^\s'"`)]+/g)) {
        const url = m[0];
        if (!url.includes(ID_IOS)) fautifs.push(`${rel} -> id manquant : ${url}`);
        else if (/\/app\/[^/]+\//.test(url) && !url.includes(SLUG_IOS))
          fautifs.push(`${rel} -> slug périmé : ${url}`);
      }
    }
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
  });

  test('les liens Google Play utilisent le bon identifiant', () => {
    const fautifs = [];
    for (const rel of [...sourceFiles(), ...publicFiles()]) {
      for (const m of read(rel).matchAll(/https:\/\/play\.google\.com\/[^\s'"`)]+/g)) {
        if (!m[0].includes(ID_ANDROID)) fautifs.push(`${rel} -> ${m[0]}`);
      }
    }
    assert.deepEqual(fautifs, [], fautifs.join('\n'));
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
