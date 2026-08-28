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
const { render, ingredients, ingredientCategories } = ssr;

const SITE_URL = 'https://yummeal.app';

const staticRoutes = [
  { path: '/', title: "Yummeal - Cuisiner sain avec ce qu'il y a dans votre frigo", description: "Yummeal transforme le contenu de votre frigo en recettes personnalisées : cuisinez sainement, sans gaspiller et sans y penser. Gratuit sur iOS et Android." },
  { path: '/creators', title: 'Yummeal Creators - Programme affiliés & UGC', description: 'Rejoignez le programme Creators Yummeal : contenu UGC rémunéré à la performance.' },
  { path: '/confidentialite', title: 'Politique de confidentialité - Yummeal', description: 'Politique de confidentialité de l\'application Yummeal.' },
  { path: '/cgu', title: 'Conditions générales d\'utilisation - Yummeal', description: 'Conditions générales d\'utilisation de l\'application Yummeal.' },
];

const ingredientRoutes = [
  {
    path: '/ingredients',
    title: 'Que faire avec... | Guides anti-gaspi par ingrédient - Yummeal',
    description:
      "Que faire avec un ingrédient qui traîne ou qui commence à s'abîmer ? Nos guides par catégorie pour ne plus rien jeter.",
  },
  ...ingredientCategories.map((c) => ({
    path: `/ingredients/${c.slug}`,
    title: `Que faire avec des ${c.label.toLowerCase()} ? - Yummeal`,
    description: c.description,
  })),
  ...ingredients.map((i) => ({
    path: `/ingredients/${i.categorySlug}/${i.slug}`,
    title: `Que faire avec : ${i.name} ? - Yummeal`,
    description: i.metaDescription,
  })),
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
    indexTitle: 'Recettes avec... | Idées de recettes selon vos ingrédients - Yummeal',
    indexDescription: "Vous avez des ingrédients précis au frigo et vous cherchez une recette pour les utiliser ? Retrouvez nos recettes complètes classées par ingrédients.",
  },
  {
    segment: 'substitutions',
    dataKey: 'substitutionsArticles',
    indexTitle: 'Par quoi remplacer... | Guides de substitution en cuisine - Yummeal',
    indexDescription: "Plus d'un ingrédient sous la main ? Nos guides vous disent par quoi le remplacer et dans quelles proportions.",
  },
  {
    segment: 'urgencies',
    dataKey: 'urgenciesArticles',
    indexTitle: 'Urgences cuisine | Recettes express quand vous êtes coincé - Yummeal',
    indexDescription: "Rien au frigo, pas de temps, un plat raté ? Nos guides d'urgence cuisine pour trouver une solution concrète en moins de 10 minutes.",
  },
  {
    segment: 'sante',
    dataKey: 'santeArticles',
    indexTitle: 'Santé & alimentation | Sécurité alimentaire et nutrition - Yummeal',
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
  {
    segment: 'scenarios',
    dataKey: 'scenariosArticles',
    indexTitle: "Scénarios d'usage | Pour qui est fait Yummeal - Yummeal",
    indexDescription: "Découvrez les situations concrètes du quotidien auxquelles Yummeal répond, selon votre profil et vos contraintes.",
  },
  {
    segment: 'comparatif',
    dataKey: 'comparatifArticles',
    indexTitle: 'Comparatifs | Yummeal face aux autres applications de cuisine',
    indexDescription: "Des comparaisons factuelles et sourcées entre Yummeal et les autres applications de cuisine, gestion de frigo et anti-gaspillage.",
  },
];

const flatCategoryRoutes = flatCategories.flatMap((cat) => {
  const articles = ssr[cat.dataKey];
  return [
    {
      path: `/${cat.segment}`,
      title: cat.indexTitle,
      description: cat.indexDescription,
    },
    ...articles.map((a) => ({
      path: `/${cat.segment}/${a.slug}`,
      title: `${a.title} - Yummeal`,
      description: a.metaDescription,
    })),
  ];
});

const routes = [...staticRoutes, ...ingredientRoutes, ...flatCategoryRoutes];

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function injectMeta(html, { title, description, path: routePath }) {
  // Netlify sert dist/<route>/index.html et redirige (301) l'URL sans slash
  // final vers la version avec slash : le canonical doit matcher l'URL
  // réellement servie (voir src/hooks/usePageMeta.ts pour la même règle
  // côté client).
  const slashedPath = routePath.endsWith('/') ? routePath : `${routePath}/`;
  const canonical = `${SITE_URL}${slashedPath}`;
  return html
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

console.log(`[prerender] ${count} pages statiques générées dans dist/`);
