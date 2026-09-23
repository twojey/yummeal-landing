// Prérend chaque route réelle en HTML statique après le build Vite, pour
// qu'un crawler qui n'exécute pas le JS (bots hors Google, LLMs) voie du
// contenu et pas juste <div id="root"></div>. Netlify sert un fichier
// statique s'il existe avant d'appliquer la réécriture SPA (netlify.toml),
// donc dist/<route>/index.html est prioritaire sur le fallback CSR.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

const ssr = await import(path.join(root, 'dist-ssr', 'entry-server.js'));
const {
  render,
  ingredients,
  ingredientCategories,
  fonctionnalites,
  fonctionnalitesDe,
  pagesAlternatives,
} = ssr;
const {
  locales,
  baliseLang,
  alternatives,
  cheminLocalise,
  cheminsDeLocale,
  decoupeLocale,
  dictionnaire,
} = ssr;
const {
  buildOrganizationJsonLd,
  buildAboutPageJsonLd,
  buildWebSiteJsonLd,
  buildMobileApplicationJsonLd,
  buildArticleJsonLd,
  buildFaqJsonLd,
  buildRecipeJsonLd,
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildIngredientJsonLd,
  buildFonctionnaliteJsonLd,
  buildAlternativesJsonLd,
  buildDatasetJsonLd,
  jsonLdScriptTags,
} = ssr;

const statistiquesRecettes = JSON.parse(
  fs.readFileSync(
    path.join(root, 'src', 'data', 'statistiquesRecettes.json'),
    'utf-8'
  )
);

const SITE_URL = 'https://yummeal.app';

/**
 * Longueur au-delà de laquelle Google tronque le title en SERP. Le suffixe
 * " - Yummeal" est systématiquement ce qui se fait couper : sur les pages
 * longues il consomme 10 caractères pour rien, donc on le retire plutôt que
 * de le laisser tronquer le contenu utile.
 */
const TITLE_MAX = 65;
const TITLE_SUFFIX = ' - Yummeal';

function boundedTitle(base) {
  const withSuffix = `${base}${TITLE_SUFFIX}`;
  return withSuffix.length > TITLE_MAX ? base : withSuffix;
}

const HOME_CRUMB = { name: 'Accueil', path: '/' };

function crumbs(...steps) {
  return buildBreadcrumbJsonLd([HOME_CRUMB, ...steps]);
}

const staticRoutes = [
  // Title et description viennent du dictionnaire, comme le corps de la page :
  // un title recopié ici divergerait du jour où la page est réécrite.
  { path: '/', title: dictionnaire('fr').accueil.title, description: dictionnaire('fr').accueil.description, jsonLd: [buildOrganizationJsonLd(), buildWebSiteJsonLd('fr'), buildMobileApplicationJsonLd()] },
  // Page d'identité de la marque : celle qu'un moteur génératif cite pour
  // répondre « qu'est-ce que Yummeal ». Elle n'existait pas.
  { path: '/a-propos', title: 'À propos de Yummeal — qui édite l\u2019application et ce qu\u2019elle fait', description: "Application mobile éditée par YIDLA (France) : des recettes réalisables avec ce que vous avez déjà. Ce qu'elle fait, et ce qu'elle ne fait pas.", jsonLd: [buildAboutPageJsonLd(), buildOrganizationJsonLd(), buildMobileApplicationJsonLd(), crumbs({ name: 'À propos', path: '/a-propos' })] },
  // Asset « linkable » (cf. discussion GEO/SEO du 23/09) : une page de
  // statistiques agregees sur le catalogue reel, dataset CSV telechargeable,
  // pensee pour etre citee par d'autres sites plutot que pour le trafic direct.
  { path: '/statistiques-recettes', title: 'Statistiques du catalogue de recettes par difficulte - Yummeal', description: `Temps de preparation et calories medians par niveau de difficulte, calcules sur ${statistiquesRecettes._meta.total_recettes_analysees} recettes. Dataset telechargeable en CSV.`, jsonLd: [buildDatasetJsonLd({ path: '/statistiques-recettes', dateGeneration: statistiquesRecettes._meta.genere_le, nombreRecettes: statistiquesRecettes._meta.total_recettes_analysees, csvPath: '/datasets/statistiques-recettes-par-difficulte.csv' }), buildOrganizationJsonLd(), crumbs({ name: 'Statistiques du catalogue de recettes', path: '/statistiques-recettes' })] },
  { path: '/creators', title: 'Yummeal Creators - Programme affiliés & UGC', description: 'Rejoignez le programme Creators Yummeal : contenu UGC rémunéré à la performance.', jsonLd: crumbs({ name: 'Creators', path: '/creators' }) },
  { path: '/confidentialite', title: 'Politique de confidentialité - Yummeal', description: 'Politique de confidentialité de l\'application Yummeal.', jsonLd: crumbs({ name: 'Confidentialité', path: '/confidentialite' }) },
  { path: '/cgu', title: 'Conditions générales d\'utilisation - Yummeal', description: 'Conditions générales d\'utilisation de l\'application Yummeal.', jsonLd: crumbs({ name: 'CGU', path: '/cgu' }) },
  // Page exigée par Apple et par Google Play. Elle n'était pas prérendue :
  // tout bot qui n'exécute pas le JS recevait le HTML de l'accueil, canonical
  // vers "/" inclus — donc une obligation de conformité invisible, et une URL
  // déclarée dans llms.txt qui servait autre chose que ce qu'elle annonce.
  { path: '/supprimer-mon-compte', title: 'Supprimer mon compte Yummeal', description: "Supprimez définitivement votre compte Yummeal et les données associées depuis cette page, après identification.", jsonLd: crumbs({ name: 'Supprimer mon compte', path: '/supprimer-mon-compte' }) },
  // NB : /delete-account n'est PAS prérendue. C'est un alias anglophone de la
  // même page, servi en 301 vers /supprimer-mon-compte/ par netlify.toml —
  // prérendre les deux aurait créé un duplicata avec un H1 français sous un
  // title anglais. La route React reste déclarée pour la navigation interne.
];

const INGREDIENTS_CRUMB = { name: 'Que faire avec...', path: '/ingredients' };
const categoryBySlug = new Map(ingredientCategories.map((c) => [c.slug, c]));

const ingredientsIndexDescription =
  "Que faire avec un ingrédient qui traîne ou qui commence à s'abîmer ? Nos guides par catégorie pour ne plus rien jeter.";

const ingredientRoutes = [
  {
    path: '/ingredients',
    title: 'Que faire avec... | Guides anti-gaspi par ingrédient - Yummeal',
    description: ingredientsIndexDescription,
    jsonLd: [
      buildCollectionPageJsonLd(
        {
          name: 'Que faire avec... ?',
          description: ingredientsIndexDescription,
          path: '/ingredients',
        },
        ingredientCategories.map((c) => ({
          name: c.label,
          path: `/ingredients/${c.slug}`,
        }))
      ),
      crumbs(INGREDIENTS_CRUMB),
    ],
  },
  ...ingredientCategories.map((c) => {
    const children = ingredients.filter((i) => i.categorySlug === c.slug);
    return {
      path: `/ingredients/${c.slug}`,
      title: `Que faire avec des ${c.label.toLowerCase()} ? - Yummeal`,
      description: c.description,
      jsonLd: [
        buildCollectionPageJsonLd(
          { name: c.label, description: c.description, path: `/ingredients/${c.slug}` },
          children.map((i) => ({
            name: i.name,
            path: `/ingredients/${i.categorySlug}/${i.slug}`,
          }))
        ),
        crumbs(INGREDIENTS_CRUMB, { name: c.label, path: `/ingredients/${c.slug}` }),
      ],
    };
  }),
  ...ingredients.map((i) => {
    const path = `/ingredients/${i.categorySlug}/${i.slug}`;
    const cat = categoryBySlug.get(i.categorySlug);
    return {
      path,
      title: boundedTitle(`Que faire avec : ${i.name} ?`),
      description: i.metaDescription,
      jsonLd: [
        buildIngredientJsonLd(i, path),
        crumbs(
          INGREDIENTS_CRUMB,
          ...(cat
            ? [{ name: cat.label, path: `/ingredients/${cat.slug}` }]
            : []),
          { name: i.name, path }
        ),
      ],
    };
  }),
];

// Catégories "plates" (index + /:slug), toutes construites sur le même
// patron (voir src/pages/IngredientDetailPage.tsx et ses dérivés) : title
// index défini à la main (copié depuis le usePageMeta de chaque IndexPage),
// title d'article dérivé de `${article.title} - Yummeal` comme le fait
// chaque ArticlePage à l'exécution.
const flatCategories = [
  {
    segment: 'recettes-avec',
    dataKey: 'recettesAvecArticles',
    indexTitle: 'Recettes avec... | Idées selon vos ingrédients - Yummeal',
    indexDescription: "Vous avez des ingrédients précis au frigo et vous cherchez une recette pour les utiliser ? Retrouvez nos recettes complètes classées par ingrédients.",
  },
  {
    segment: 'substitutions',
    dataKey: 'substitutionsArticles',
    indexTitle: 'Par quoi remplacer... | Substitutions en cuisine - Yummeal',
    indexDescription: "Plus d'un ingrédient sous la main ? Nos guides vous disent par quoi le remplacer et dans quelles proportions.",
  },
  {
    segment: 'urgencies',
    dataKey: 'urgenciesArticles',
    indexTitle: 'Urgences cuisine | Recettes express en 10 minutes - Yummeal',
    indexDescription: "Rien au frigo, pas de temps, un plat raté ? Nos guides d'urgence cuisine pour trouver une solution concrète en moins de 10 minutes.",
  },
  {
    segment: 'sante',
    dataKey: 'santeArticles',
    indexTitle: 'Santé & alimentation | Conservation et nutrition - Yummeal',
    indexDescription: "Conservation des aliments, sécurité alimentaire, repères nutritionnels généraux : nos guides pour cuisiner et manger l'esprit tranquille.",
  },
  {
    segment: 'anti-gaspillage',
    dataKey: 'antiGaspillageArticles',
    indexTitle: 'Anti-gaspillage | Guides pratiques pour moins jeter - Yummeal',
    indexDescription: "Nos guides pratiques anti-gaspillage : organisation du frigo, dates de péremption, économies sur les courses et astuces pour ne plus rien jeter.",
  },
  {
    segment: 'solutions',
    dataKey: 'solutionsArticles',
    indexTitle: 'Solutions cuisine du quotidien | Yummeal',
    indexDescription: "Charge mentale des repas, petit budget, cuisine sans four, rééquilibrage alimentaire : nos guides pratiques pour des problèmes du quotidien.",
  },
  {
    segment: 'astuces',
    dataKey: 'astucesArticles',
    indexTitle: 'Astuces de cuisine | Techniques pratiques et vérifiées - Yummeal',
    indexDescription: 'Des astuces de cuisine simples et réellement utilisables : conservation, rattrapage de plats ratés, nettoyage, techniques du quotidien.',
  },
  {
    segment: 'budget',
    dataKey: 'budgetArticles',
    indexTitle: 'Manger avec un petit budget | Guides Yummeal',
    indexDescription: "Manger équilibré sans se ruiner : nos guides pour composer des repas économiques, choisir les bonnes protéines et optimiser vos courses.",
  },
  {
    segment: 'regimes',
    dataKey: 'regimesArticles',
    indexTitle: 'Régimes et objectifs alimentaires | Guides pratiques - Yummeal',
    indexDescription: "Dîner léger, sans gluten, repas sportif, snacks sains : nos guides pratiques pour composer des repas adaptés à vos besoins du quotidien.",
  },
  {
    segment: 'guides',
    dataKey: 'guidesArticles',
    indexTitle: 'Guides pratiques cuisine & nutrition - Yummeal',
    indexDescription: "Nos guides pratiques pour mieux cuisiner au quotidien : organisation, équipement et lecture des étiquettes nutritionnelles.",
  },
  {
    segment: 'faq',
    dataKey: 'faqArticles',
    indexTitle: 'FAQ sécurité alimentaire | Yummeal',
    indexDescription: "Des réponses claires et prudentes aux questions de sécurité alimentaire les plus courantes : conservation, congélation, recuisson des restes.",
  },
  {
    segment: 'concept',
    dataKey: 'conceptArticles',
    indexTitle: 'Le concept Yummeal | Anti-gaspi & zéro déchet - Yummeal',
    indexDescription: "Comprendre le concept derrière Yummeal : comment fonctionne l'anti-gaspi de l'application et quelle vision de la cuisine zéro déchet elle défend.",
  },
];

/** Nom court du silo, pour le fil d'Ariane (le indexTitle est trop long). */
const SILO_LABELS = {
  'recettes-avec': 'Recettes avec...',
  substitutions: 'Par quoi remplacer...',
  urgencies: 'Urgences cuisine',
  sante: 'Santé & alimentation',
  'anti-gaspillage': 'Anti-gaspillage',
  solutions: 'Solutions cuisine',
  astuces: 'Astuces de cuisine',
  budget: 'Petit budget',
  regimes: 'Régimes & objectifs',
  guides: 'Guides pratiques',
  faq: 'FAQ sécurité alimentaire',
  concept: 'Le concept Yummeal',
};

const flatCategoryRoutes = flatCategories.flatMap((cat) => {
  const articles = ssr[cat.dataKey];
  const siloLabel = SILO_LABELS[cat.segment] ?? cat.segment;
  const siloCrumb = { name: siloLabel, path: `/${cat.segment}` };

  // Un index de silo n'est QUE une liste : une CollectionPage qui déclare ses
  // enfants décrit exactement ce que la page contient. Les 21 index du site
  // n'avaient aucun balisage.
  const indexJsonLd = [
    buildCollectionPageJsonLd(
      {
        name: siloLabel,
        description: cat.indexDescription,
        path: `/${cat.segment}`,
      },
      articles.map((a) => ({ name: a.title, path: `/${cat.segment}/${a.slug}` }))
    ),
    crumbs(siloCrumb),
  ];
  if (cat.segment === 'faq') indexJsonLd.push(buildFaqJsonLd(articles));

  return [
    {
      path: `/${cat.segment}`,
      title: cat.indexTitle,
      description: cat.indexDescription,
      jsonLd: indexJsonLd,
    },
    ...articles.map((a) => {
      const path = `/${cat.segment}/${a.slug}`;
      const core =
        cat.segment === 'recettes-avec'
          ? buildRecipeJsonLd(a, path)
          : buildArticleJsonLd(a, path);
      const jsonLd = [core, crumbs(siloCrumb, { name: a.title, path })];
      return {
        path,
        title: boundedTitle(a.title),
        description: a.metaDescription,
        jsonLd,
      };
    }),
  ];
});

// Pages produit fonctionnelles. Les requêtes « application qui fait Y » sont
// gagnées par des pages produit, pas par des articles de blog — et le site n'en
// avait aucune. Ce sont aussi ses seules pages à intention transactionnelle.
const FONCTIONNALITES_CRUMB = { name: 'Fonctionnalités', path: '/fonctionnalites' };
const fonctionnalitesIndexDescription =
  "Les trois mécanismes de Yummeal et leurs limites : scanner son frigo, importer une recette TikTok, estimer un plat en photo.";

const fonctionnaliteRoutes = [
  {
    path: '/fonctionnalites',
    title: 'Fonctionnalités de Yummeal — les trois mécanismes',
    description: fonctionnalitesIndexDescription,
    jsonLd: [
      buildCollectionPageJsonLd(
        {
          name: 'Fonctionnalités',
          description: fonctionnalitesIndexDescription,
          path: '/fonctionnalites',
        },
        fonctionnalites.map((f) => ({
          name: f.h1,
          path: `/fonctionnalites/${f.slug}`,
        }))
      ),
      crumbs(FONCTIONNALITES_CRUMB),
    ],
  },
  ...fonctionnalites.map((f) => ({
    path: `/fonctionnalites/${f.slug}`,
    title: boundedTitle(f.title),
    description: f.metaDescription,
    jsonLd: [
      buildFonctionnaliteJsonLd(f, `/fonctionnalites/${f.slug}`),
      buildMobileApplicationJsonLd(),
      crumbs(FONCTIONNALITES_CRUMB, {
        name: f.h1,
        path: `/fonctionnalites/${f.slug}`,
      }),
    ],
  })),
];

// Silo `/alternatives` — remplace `/comparatif`, dont 22 des 23 pages
// visaient « Yummeal vs X », un mot-clé qui contient notre marque alors
// qu'elle n'a pas de notoriété de recherche. Les 6 pages ci-dessous visent la
// demande telle qu'elle se formule réellement : « alternative à Jow »,
// « supercook alternative », « application qui scanne le frigo ».
const ALTERNATIVES_CRUMB = { name: 'Alternatives', path: '/alternatives' };
const alternativesIndexDescription =
  "Quatre mécanismes différents se cachent derrière « application de recettes ». Savoir lequel vous convient vaut mieux que comparer des listes de fonctionnalités.";

const alternativesRoutes = [
  {
    path: '/alternatives',
    title: 'Meilleure application pour cuisiner avec son frigo',
    description: alternativesIndexDescription,
    jsonLd: [
      buildCollectionPageJsonLd(
        {
          name: 'Alternatives et comparatifs',
          description: alternativesIndexDescription,
          path: '/alternatives',
        },
        pagesAlternatives.map((p) => ({
          name: p.h1,
          path: `/alternatives/${p.slug}`,
        }))
      ),
      crumbs(ALTERNATIVES_CRUMB),
    ],
  },
  ...pagesAlternatives.map((p) => ({
    path: `/alternatives/${p.slug}`,
    title: boundedTitle(p.title),
    description: p.metaDescription,
    jsonLd: [
      buildAlternativesJsonLd(p, `/alternatives/${p.slug}`),
      buildMobileApplicationJsonLd(),
      crumbs(ALTERNATIVES_CRUMB, { name: p.h1, path: `/alternatives/${p.slug}` }),
    ],
  })),
];

/**
 * Pages des langues autres que le français.
 *
 * Elles sont dérivées de `CHEMINS_TRADUITS` (src/i18n/config.ts), donc la
 * liste des pages prérendues, celle des `hreflang` et celle du sélecteur de
 * langue ne peuvent pas diverger : c'est la même source. Ajouter une page
 * traduite = ajouter son chemin là-bas, et écrire sa traduction.
 *
 * Le title et la description viennent du dictionnaire de la langue. Une page
 * polonaise avec un `<title>` français serait invisible sur les requêtes
 * polonaises, quelle que soit la qualité du corps de page.
 */
const localeRoutes = locales.filter((l) => l !== 'fr').flatMap((locale) => {
  const dico = dictionnaire(locale);
  const chemin = (c) => cheminLocalise(c, locale);
  const filLocal = (...etapes) =>
    buildBreadcrumbJsonLd([
      { name: dico.nav.accueil, path: chemin('') },
      ...etapes,
    ]);

  /**
   * Title, description et JSON-LD de chaque chemin traduit. La clé est le
   * chemin SANS préfixe de langue, exactement comme dans CHEMINS_TRADUITS :
   * c'est ce qui permet de vérifier que les deux listes coïncident plutôt que
   * de l'espérer.
   */
  const entrees = {
    '': () => ({
      title: dico.accueil.title,
      description: dico.accueil.description,
      jsonLd: [
        buildOrganizationJsonLd(),
        buildWebSiteJsonLd(locale),
        buildMobileApplicationJsonLd(),
      ],
    }),
    '/a-propos': () => ({
      title: dico.aPropos.title,
      description: dico.aPropos.description,
      jsonLd: [
        buildAboutPageJsonLd(),
        buildOrganizationJsonLd(),
        buildMobileApplicationJsonLd(),
        filLocal({ name: dico.aPropos.fil, path: chemin('/a-propos') }),
      ],
    }),
    '/fonctionnalites': () => ({
      title: dico.fonctionnalites.indexTitle,
      description: dico.fonctionnalites.indexDescription,
      jsonLd: [
        buildCollectionPageJsonLd(
          {
            name: dico.fonctionnalites.indexCollection,
            description: dico.fonctionnalites.indexDescription,
            path: chemin('/fonctionnalites'),
          },
          fonctionnalitesDe(locale).map((f) => ({
            name: f.h1,
            path: chemin(`/fonctionnalites/${f.slug}`),
          }))
        ),
        filLocal({
          name: dico.fonctionnalites.fil,
          path: chemin('/fonctionnalites'),
        }),
      ],
    }),
    ...Object.fromEntries(
      fonctionnalitesDe(locale).map((f) => [
        `/fonctionnalites/${f.slug}`,
        () => ({
          title: f.title,
          description: f.metaDescription,
          jsonLd: [
            buildFonctionnaliteJsonLd(f, chemin(`/fonctionnalites/${f.slug}`)),
            filLocal(
              {
                name: dico.fonctionnalites.fil,
                path: chemin('/fonctionnalites'),
              },
              { name: f.h1, path: chemin(`/fonctionnalites/${f.slug}`) }
            ),
          ],
        }),
      ])
    ),
  };

  return cheminsDeLocale(locale).map((c) => {
    const entree = entrees[c];
    // On échoue bruyamment : un chemin listé dans CHEMINS_TRADUITS sans
    // métadonnées ici serait prérendu avec le title de l'accueil, et
    // déclarerait un hreflang vers une page qui n'a pas le bon contenu.
    if (!entree) {
      throw new Error(
        `[prerender] chemin traduit « ${c} » (${locale}) déclaré dans ` +
          `CHEMINS_TRADUITS sans title/description. Ajouter son entrée dans ` +
          `localeRoutes avant de le lister.`
      );
    }
    return { path: cheminLocalise(c, locale), ...entree() };
  });
});

const routes = [
  ...staticRoutes,
  ...localeRoutes,
  ...fonctionnaliteRoutes,
  ...alternativesRoutes,
  ...ingredientRoutes,
  ...flatCategoryRoutes,
];

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function injectMeta(
  html,
  { title, description, path: routePath, jsonLd, canonicalOverride, noindex }
) {
  // Netlify sert dist/<route>/index.html et redirige (301) l'URL sans slash
  // final vers la version avec slash : le canonical doit matcher l'URL
  // réellement servie (voir src/hooks/usePageMeta.ts pour la même règle
  // côté client).
  const slashedPath = routePath.endsWith('/') ? routePath : `${routePath}/`;
  const canonical = `${SITE_URL}${canonicalOverride ?? slashedPath}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const ldJsonBlock = schemas.length ? jsonLdScriptTags(schemas) : '';
  // Tout ce qui n'est pas l'accueil est un article ou une page de contenu :
  // laisser og:type="website" partout faisait passer 163 pages pour la home
  // du site auprès de chaque partageur de lien.
  const ogType = routePath === '/' ? 'website' : 'article';

  // Langue de la page et équivalences. `decoupeLocale` lit la locale dans le
  // chemin : le prerender ne peut donc pas étiqueter une page autrement que
  // ce que son URL annonce. Sans `lang` correct, un lecteur d'écran lit du
  // polonais avec une prononciation française, et Google a un signal de
  // langue qui contredit le texte.
  const { locale, chemin } = decoupeLocale(routePath);
  const hreflangBlock = alternatives(chemin, SITE_URL)
    .map(
      ({ hreflang, href }) =>
        `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`
    )
    .join('\n');
  const robotsTag = noindex
    ? '<meta name="robots" content="noindex,follow" />\n'
    : '';
  return html
    .replace('</head>', `${robotsTag}${hreflangBlock}\n${ldJsonBlock}\n</head>`)
    .replace(/<html lang="[^"]*"/, `<html lang="${baliseLang[locale]}"`)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<link rel="canonical" href=".*?" \/>/,
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(
      /<meta property="og:type" content=".*?" \/>/,
      `<meta property="og:type" content="${ogType}" />`
    )
    .replace(
      /<meta property="og:title" content=".*?" \/>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta property="og:url" content=".*?" \/>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    // Les twitter:* n'étaient jamais réécrits : les 163 pages profondes
    // portaient le titre et la description de l'accueil dans toute carte
    // partagée hors Open Graph.
    .replace(
      /<meta name="twitter:title" content=".*?" \/>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content=".*?"\s*\/>/,
      `<meta name="twitter:description" content="${description}" />`
    );
}

let count = 0;
for (const route of routes) {
  const appHtml = render(route.path);
  const finalHtml = injectMeta(
    template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    ),
    route
  );

  const outDir =
    route.path === '/' ? distDir : path.join(distDir, route.path.slice(1));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), finalHtml);
  count++;
}

// Vraie page 404. Sans elle, le catch-all SPA de netlify.toml répondait 200 +
// l'accueil pour l'infini des URL inexistantes : chaque faute de frappe, chaque
// vieux lien externe et chaque scan de crawler créait un duplicata de la home
// avec un code succès. Netlify sert dist/404.html avec le statut 404 pour toute
// URL qu'aucune règle ne capture — la règle catch-all reste en place pour les
// routes SPA légitimes, mais celle-ci est déclarée APRÈS elle (voir
// netlify.toml) et attrape le reste.
const notFoundHtml = injectMeta(
  template.replace(
    '<div id="root"></div>',
    `<div id="root">${render('/404-page-introuvable')}</div>`
  ),
  {
    path: '/404',
    title: 'Page introuvable - Yummeal',
    description: "Cette page n'existe pas ou a été déplacée.",
    canonicalOverride: '/',
    noindex: true,
  }
);
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);

console.log(`[prerender] ${count} pages statiques générées dans dist/ (+ 404.html)`);
