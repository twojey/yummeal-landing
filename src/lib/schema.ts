// Générateurs de JSON-LD (schema.org) partagés entre le rendu client
// (usePageMeta) et le prerender (scripts/prerender.mjs, qui importe ce
// module via le re-export dans src/entry-server.tsx). Aucune dépendance
// React ici pour rester importable des deux côtés.

import { STORE_URLS_DEFAUT } from '../config';

export const SITE_URL = 'https://yummeal.app';

// Date de dernière revue éditoriale du contenu généré cette session. Pas de
// date par article (fabriquer une fausse précision serait pire que ne rien
// mettre) : tout le corpus a été écrit/vérifié à cette date.
export const CONTENT_REVIEWED_DATE = '2026-08-28';

interface ArticleLike {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

function canonicalFor(path: string): string {
  const slashed = path.endsWith('/') ? path : `${path}/`;
  return `${SITE_URL}${slashed}`;
}

// Identifiants d'ancrage du graphe d'entité. Sans @id stables, chaque page
// republie une Organization anonyme et rien ne se réconcilie : un moteur ne
// peut pas savoir que c'est la même entité d'une page à l'autre.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const APP_ID = `${SITE_URL}/#app`;

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Yummeal',
    legalName: 'YIDLA',
    url: SITE_URL,
    logo: `${SITE_URL}/images/yummeal_logo.png`,
    description:
      "Yummeal transforme le contenu de votre frigo en recettes personnalisées : cuisinez sainement, sans gaspiller et sans y penser.",
    // `sameAs` identifie l'entité, ce n'est pas un bouton : on cite les fiches
    // de la langue par défaut, y compris sur les pages d'une autre langue.
    sameAs: [STORE_URLS_DEFAUT.apple, STORE_URLS_DEFAUT.google],
  };
}

/**
 * `inLanguage` doit décrire la langue DE LA PAGE, pas celle du site : un
 * `fr-FR` codé en dur sur une page polonaise dit à un moteur que le contenu
 * qu'il vient de lire est en français. L'`@id` reste commun — c'est le même
 * site web, servi en deux langues, et c'est exactement ce que les `hreflang`
 * déclarent par ailleurs.
 */
export function buildWebSiteJsonLd(locale: 'fr' | 'pl' = 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Yummeal',
    url: SITE_URL,
    inLanguage: locale === 'pl' ? 'pl-PL' : 'fr-FR',
    publisher: { '@id': ORG_ID },
  };
}

export function buildMobileApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    '@id': APP_ID,
    name: 'Yummeal',
    operatingSystem: 'iOS, Android',
    publisher: { '@id': ORG_ID },
    applicationCategory: 'LifestyleApplication',
    url: SITE_URL,
    // Le téléchargement est gratuit, l'usage complet est par abonnement.
    // Déclarer price: '0' était faux (et contredisait la règle « gratuit
    // uniquement scopé au téléchargement ») : on expose la vraie grille.
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '4.99',
      highPrice: '39.99',
      offerCount: 4,
      offers: [
        { '@type': 'Offer', name: 'Mensuel', price: '4.99', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: '6 mois', price: '24.99', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: 'Annuel', price: '19.99', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: 'Annuel (sans essai)', price: '39.99', priceCurrency: 'EUR' },
      ],
    },
  };
}

export function buildArticleJsonLd(article: ArticleLike, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    url: canonicalFor(path),
    mainEntityOfPage: canonicalFor(path),
    dateModified: CONTENT_REVIEWED_DATE,
    datePublished: CONTENT_REVIEWED_DATE,
    inLanguage: 'fr-FR',
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}

export function buildFaqJsonLd(articles: ArticleLike[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: articles.map((a) => ({
      '@type': 'Question',
      name: a.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a.intro,
      },
    })),
  };
}

// Les recettes de la catégorie "recettes-avec" suivent un patron fixe :
// une section "Ingrédients (...)" (une ligne par ingrédient) et une section
// "Préparation" (une ligne par étape) — voir src/data/recettesAvec.ts.
export function buildRecipeJsonLd(article: ArticleLike, path: string) {
  const ingredientsSection = article.sections.find((s) =>
    /ingr[ée]dients/i.test(s.heading)
  );
  const stepsSection = article.sections.find((s) =>
    /pr[ée]paration/i.test(s.heading)
  );

  if (!ingredientsSection || !stepsSection) {
    return buildArticleJsonLd(article, path);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: article.title,
    description: article.metaDescription,
    url: canonicalFor(path),
    author: {
      '@type': 'Organization',
      name: 'Yummeal',
    },
    recipeIngredient: ingredientsSection.body,
    recipeInstructions: stepsSection.body.map((step) => ({
      '@type': 'HowToStep',
      text: step,
    })),
    dateModified: CONTENT_REVIEWED_DATE,
    datePublished: CONTENT_REVIEWED_DATE,
  };
}

interface AlternativesLike {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  apps: { nom: string }[];
}

/**
 * Page de comparaison d'un segment du marché.
 *
 * `Article` + `ItemList` des applications comparées, et non `Product` ni
 * `Review` : nous ne notons pas des produits concurrents, nous décrivons leurs
 * mécanismes. Déclarer une Review sans note vérifiable serait une fausse
 * preuve, et lui donner une note serait une prétention que rien n'étaye.
 *
 * `dateModified` porte la date de vérification des faits : sur un comparatif,
 * la fraîcheur EST une information, pas une métadonnée.
 */
export function buildAlternativesJsonLd(page: AlternativesLike, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.metaDescription,
    url: canonicalFor(path),
    mainEntityOfPage: canonicalFor(path),
    dateModified: CONTENT_REVIEWED_DATE,
    datePublished: CONTENT_REVIEWED_DATE,
    inLanguage: 'fr-FR',
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
    about: {
      '@type': 'ItemList',
      name: 'Applications comparées',
      numberOfItems: page.apps.length,
      itemListElement: page.apps.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: a.nom,
      })),
    },
  };
}

interface FonctionnaliteLike {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  etapes: { titre: string; corps: string }[];
  faq: { question: string; reponse: string }[];
}

/**
 * Page produit d'une fonctionnalité.
 *
 * `WebPage` + `SoftwareApplication` en entité principale, et non `HowTo` : le
 * rich result HowTo est déprécié, donc ce balisage n'obtiendrait aucun
 * affichage, et ces pages décrivent un produit — pas un tutoriel que le
 * lecteur exécute. Les questions sont exposées en `mainEntity` d'une
 * `QAPage` imbriquée, qui décrit ce que la page contient réellement.
 */
export function buildFonctionnaliteJsonLd(
  f: FonctionnaliteLike,
  path: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: f.h1,
    description: f.metaDescription,
    url: canonicalFor(path),
    inLanguage: 'fr-FR',
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    dateModified: CONTENT_REVIEWED_DATE,
    about: { '@id': APP_ID },
    mainEntity: f.faq.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.reponse },
    })),
  };
}

/**
 * Page d'identité de la marque. `AboutPage` + `mainEntity` vers
 * l'Organization : c'est la déclaration explicite « cette page décrit cette
 * entité », ce qui manquait entièrement au site.
 */
export function buildAboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'À propos de Yummeal',
    url: canonicalFor('/a-propos'),
    inLanguage: 'fr-FR',
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': ORG_ID },
    about: { '@id': ORG_ID },
  };
}

/**
 * Fil d'Ariane. L'arborescence va jusqu'à trois niveaux
 * (/ingredients/<categorie>/<slug>) et aucune page n'exposait de
 * BreadcrumbList : c'est le seul rich result encore servi par Google que ce
 * site pouvait obtenir sans écrire une ligne de contenu.
 *
 * `trail` liste les ancêtres ET la page courante, dans l'ordre.
 */
export function buildBreadcrumbJsonLd(
  trail: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: canonicalFor(step.path),
    })),
  };
}

/**
 * Page d'index de silo : une CollectionPage qui déclare ses enfants. Sans
 * elle, les 21 index du site n'avaient aucun balisage du tout alors qu'ils
 * ne sont QUE des listes.
 */
export function buildCollectionPageJsonLd(
  { name, description, path }: { name: string; description: string; path: string },
  items: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: canonicalFor(path),
    inLanguage: 'fr-FR',
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: canonicalFor(it.path),
      })),
    },
  };
}

interface IngredientLike {
  slug: string;
  categorySlug: string;
  name: string;
  metaDescription: string;
  intro: string;
  why: string;
  tips: string[];
  recipeIdeas: string[];
}

/**
 * Fiche ingrédient. Les 47 pages du plus gros silo du site n'avaient AUCUN
 * JSON-LD.
 *
 * Le type retenu est `Article` et non `HowTo` : le rich result HowTo a été
 * déprécié par Google, donc le balisage ne rapporterait aucun affichage — et
 * une fiche « que faire avec X » est une réponse éditoriale, pas une suite
 * d'étapes à exécuter dans l'ordre. Les conseils sont exposés en
 * `mentions`/ItemList, qui décrit ce que la page contient réellement.
 */
export function buildIngredientJsonLd(ingredient: IngredientLike, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Que faire avec : ${ingredient.name} ?`,
    description: ingredient.metaDescription,
    url: canonicalFor(path),
    mainEntityOfPage: canonicalFor(path),
    about: { '@type': 'Thing', name: ingredient.name },
    dateModified: CONTENT_REVIEWED_DATE,
    datePublished: CONTENT_REVIEWED_DATE,
    inLanguage: 'fr-FR',
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export function jsonLdScriptTags(schemas: Array<Record<string, unknown>>): string {
  return schemas
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    )
    .join('\n');
}
