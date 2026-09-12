/**
 * Règles éditoriales non négociables, vérifiées sur les sources et sur le HTML
 * généré.
 *
 * Ce ne sont pas des préférences de style : chacune a coûté quelque chose.
 *  - « recettes générées par IA » est factuellement FAUX (les recettes sont
 *    écrites par des humains, l'application les trie) et le dire dégrade le
 *    produit auprès d'un public qui s'en méfie ;
 *  - « gratuit » non scopé au téléchargement est trompeur : l'usage complet est
 *    par abonnement. Trois occurrences avaient déjà passé la relecture, dont
 *    une dans la meta description de l'accueil.
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { read, sourceFiles, publicFiles, distBuilt, distPages } from './lib/sources.mjs';

const SANS_BUILD = distBuilt() ? false : 'dist/ absent — lancer `npm run build`';

/**
 * Formulations interdites. Les motifs sont volontairement larges : on préfère
 * un faux positif à corriger qu'une formulation trompeuse en production.
 */
const INTERDITS = [
  {
    motif: /recettes?\s+(?:g[éeè]n[ée]r[ée]e?s?|cr[ée][ée]e?s?)\s+par\s+(?:une?\s+)?(?:IA|intelligence artificielle)/gi,
    pourquoi:
      "les recettes ne sont PAS générées par IA — elles sont écrites par des humains " +
      "et l'application les trie selon ce que vous avez",
    // La page /a-propos dit « ne sont pas générées par une IA » : c'est une
    // négation, donc légitime. On l'exclut par le contexte, pas par le fichier.
    exception: /ne sont pas g[ée]n[ée]r[ée]es par une? IA/i,
  },
  {
    // « gratuite » et « gratuits » échappaient au motif : deux formulations
    // trompeuses sur trois passaient donc le garde-fou sans être vues.
    motif: /\bgratuit(?:e|s|es)?\b/gi,
    pourquoi:
      "« gratuit » doit être scopé au téléchargement (« téléchargement gratuit »), " +
      "jamais employé pour l'application en général : l'usage complet est par abonnement",
    /**
     * Emplois légitimes : le téléchargement l'est vraiment, et décrire l'offre
     * d'un concurrent comme gratuite est un fait, pas une promesse.
     */
    exception:
      // ⚠️ Ces exceptions doivent rester ANCRÉES sur le mot qu'elles scopent.
      // « gratuit sur iOS » était tolérée et blanchissait « Yummeal est
      // gratuit sur iOS » — l'inverse exact de ce que la règle protège.
      /t[ée]l[ée]chargement (?:est )?gratuit|essai gratuit|offre gratuite|version gratuite d[eu]|audit (?:SEO )?gratuit|recette gratuite|[ée]chantillon-gratuit/i,
  },
];

/** Les fichiers où la formulation compte : contenu et données, pas outillage. */
const fichiersDeContenu = () => [
  ...sourceFiles().filter((f) => f.startsWith('src/data/') || f.startsWith('src/pages/') || f.endsWith('.tsx')),
  ...publicFiles().filter((f) => f.endsWith('.txt')),
  'index.html',
  'scripts/prerender.mjs',
];

/** Une ligne de commentaire énonce souvent la règle elle-même : on l'ignore. */
const estCommentaire = (ligne) => /^\s*(\/\/|\*|\/\*|<!--|#)/.test(ligne);

/** Retourne les lignes fautives, exception appliquée ligne par ligne. */
function infractions(contenu, { motif, exception }) {
  const out = [];
  contenu.split('\n').forEach((ligne, i) => {
    if (estCommentaire(ligne)) return;
    motif.lastIndex = 0;
    if (!motif.test(ligne)) return;
    if (exception && exception.test(ligne)) return;
    out.push(`ligne ${i + 1} : ${ligne.trim().slice(0, 140)}`);
  });
  return out;
}

/**
 * Concurrents nommés dans les comparatifs. Sert à distinguer un FAIT sur un
 * tiers d'une PROMESSE sur nous.
 */
const CONCURRENTS = [
  'SuperCook', 'Frigo Magic', 'Mon Frigo', 'Crumb', 'Samsung Food', 'Jow',
  'Marmiton', 'Yummly', 'Paprika', 'Recipe Keeper', 'BigOven', 'SideChef',
  'Mealime', 'Eat This Much', 'KitchenPal', 'Cooklist', 'PlantJammer',
  'MyFridgeFood', 'Yazio', 'Lifesum', 'Foodvisor', 'Too Good To Go', 'Olio',
];

/**
 * La règle porte sur CE QUE NOUS PROMETTONS, pas sur le mot lui-même.
 *
 * « SuperCook est gratuit, financé par la publicité » est un fait vérifiable
 * sur un tiers : l'interdire reviendrait à s'interdire de décrire le marché,
 * et un comparatif qui masque le prix des concurrents n'est pas honnête.
 * En revanche « Yummeal est gratuit » est faux, puisque l'usage complet est
 * par abonnement.
 *
 * D'où le critère retenu : une valeur est tolérée si elle nomme un concurrent
 * ET ne nous nomme pas. Dès que « Yummeal » apparaît dans la même valeur, la
 * tolérance tombe — c'est ce que vérifie le test de non-régression plus bas,
 * qui échouerait si cette porte s'ouvrait trop.
 */
function parleDUnTiersPasDeNous(valeur) {
  const nousConcerne = /yummeal/i.test(valeur);
  const nommeUnTiers = CONCURRENTS.some((c) =>
    new RegExp(`\\b${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(valeur)
  );
  return nommeUnTiers && !nousConcerne;
}

/**
 * Champs de métadonnées : c'est là que la formulation coûte le plus, parce que
 * c'est ce que Google affiche et ce qu'un moteur génératif reprend.
 */
function valeursDeMetadonnees(contenu) {
  return [
    ...contenu.matchAll(/(?:metaDescription|indexDescription|description|title|indexTitle):\s*\n?\s*["'`]([^"'`]{20,})["'`]/g),
  ].map((m) => m[1]);
}

describe('formulations interdites dans les sources', () => {
  test('nulle part : « recettes générées par IA »', () => {
    // Règle appliquée partout : cette formulation est fausse quel que soit le
    // contexte, y compris à propos d'un concurrent qu'on décrirait mal.
    const regle = INTERDITS[0];
    const fautifs = [];
    for (const rel of fichiersDeContenu()) {
      for (const ligne of infractions(read(rel), regle)) fautifs.push(`${rel} ${ligne}`);
    }
    assert.deepEqual(fautifs, [], `${regle.pourquoi}\n  ${fautifs.join('\n  ')}`);
  });

  test('dans les métadonnées : « gratuit » toujours scopé', () => {
    const regle = INTERDITS[1];
    const fautifs = [];
    for (const rel of fichiersDeContenu()) {
      for (const valeur of valeursDeMetadonnees(read(rel))) {
        regle.motif.lastIndex = 0;
        if (
          regle.motif.test(valeur) &&
          !regle.exception.test(valeur) &&
          !parleDUnTiersPasDeNous(valeur)
        ) {
          fautifs.push(`${rel} : « ${valeur.slice(0, 130)} »`);
        }
      }
    }
    assert.deepEqual(fautifs, [], `${regle.pourquoi}\n  ${fautifs.join('\n  ')}`);
  });

  test('dans le corps de nos propres pages : « gratuit » toujours scopé', () => {
    // Restreint aux pages que NOUS décrivons (a-propos, fonctionnalités,
    // concept), là où « gratuit » porterait sur Yummeal. Les comparatifs sont
    // exclus : ils décrivent des offres tierces.
    const regle = INTERDITS[1];
    const nôtres = [
      'src/pages/AProposPage.tsx',
      'src/data/fonctionnalites.ts',
      'src/data/concept.ts',
      'index.html',
    ];
    const fautifs = [];
    for (const rel of nôtres) {
      for (const ligne of infractions(read(rel), regle)) fautifs.push(`${rel} ${ligne}`);
    }
    assert.deepEqual(fautifs, [], `${regle.pourquoi}\n  ${fautifs.join('\n  ')}`);
  });
});

describe('formulations interdites dans le HTML généré', { skip: SANS_BUILD }, () => {
  test('aucune page ne parle de recettes générées par IA', () => {
    const fautives = distPages()
      .filter((p) => {
        const texte = p.html.replace(/<[^>]+>/g, ' ');
        return INTERDITS[0].motif.test(texte) && !INTERDITS[0].exception.test(texte);
      })
      .map((p) => p.route);
    assert.deepEqual(fautives, [], fautives.join('\n'));
  });

  test('« gratuit » est toujours scopé dans les métadonnées', () => {
    // Les meta description sont ce que Google affiche : c'est là que la
    // formulation trompeuse coûtait le plus.
    const fautives = [];
    for (const p of distPages()) {
      const m = p.html.match(/<meta\s+name="description"\s+content="([^"]*)"/);
      if (!m) continue;
      if (
        /\bgratuit\b/i.test(m[1]) &&
        !INTERDITS[1].exception.test(m[1]) &&
        !parleDUnTiersPasDeNous(m[1])
      ) {
        fautives.push(`${p.route} : « ${m[1]} »`);
      }
    }
    assert.deepEqual(fautives, [], fautives.join('\n'));
  });
});

describe('le garde-fou lui-même', () => {
  // La tolérance « fait sur un tiers » ne doit pas devenir une porte ouverte.
  // Ces cas doivent rester DÉTECTÉS, sinon la règle ne protège plus rien.
  const doitEchouer = [
    'Yummeal est gratuit sur iOS et Android',
    'Une application gratuite pour cuisiner avec son frigo',
    'Yummeal, gratuit et sans abonnement, face à SuperCook',
    'Comparatif gratuit des applications de recettes',
  ];
  const doitPasser = [
    'SuperCook est gratuit, financé par la publicité',
    'Frigo Magic propose une offre gratuite sans compte',
    'Frigo Magic est gratuit et sans compte, mais tout se déclare à la main',
    'Téléchargement gratuit sur iOS et Android',
  ];

  const detecte = (valeur) => {
    const regle = INTERDITS[1];
    regle.motif.lastIndex = 0;
    return (
      regle.motif.test(valeur) &&
      !regle.exception.test(valeur) &&
      !parleDUnTiersPasDeNous(valeur)
    );
  };

  for (const valeur of doitEchouer) {
    test(`détecte « ${valeur.slice(0, 46)}… »`, () => {
      assert.ok(
        detecte(valeur),
        'la règle laisse passer une promesse « gratuit » qui porte sur nous'
      );
    });
  }
  for (const valeur of doitPasser) {
    test(`tolère « ${valeur.slice(0, 46)}… »`, () => {
      assert.equal(detecte(valeur), false, 'faux positif : ce libellé est légitime');
    });
  }
});

describe('honnêteté des données structurées et des chiffres', () => {
  test('aucun AggregateRating n’est déclaré sans note réelle', () => {
    // Inventer une note ou un nombre d'avis est une fausse preuve sociale, et
    // c'est détectable. L'app n'a que quelques notes : tant qu'on ne branche
    // pas la vraie valeur, on n'en déclare pas.
    const fautifs = sourceFiles().filter((rel) => read(rel).includes('AggregateRating'));
    assert.deepEqual(
      fautifs,
      [],
      'AggregateRating déclaré dans ' +
        fautifs.join(', ') +
        " — ne l'ajouter qu'en branchant la vraie note des stores"
    );
  });

  test('les tarifs déclarés correspondent à la grille réelle', () => {
    const schema = read('src/lib/schema.ts');
    for (const prix of ['4.99', '24.99', '19.99', '39.99']) {
      assert.ok(
        schema.includes(prix),
        `le tarif ${prix} € doit figurer dans les données structurées`
      );
    }
    assert.match(
      schema,
      /'AggregateOffer'/,
      "une application par abonnement se décrit avec un AggregateOffer, pas un prix unique"
    );
  });
});
