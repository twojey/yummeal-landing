// Générateurs de JSON-LD (schema.org) partagés entre le rendu client
// (usePageMeta) et le prerender (scripts/prerender.mjs, qui importe ce
// module via le re-export dans src/entry-server.tsx). Aucune dépendance
// React ici pour rester importable des deux côtés.

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

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Yummeal',
    url: SITE_URL,
    logo: `${SITE_URL}/images/yummeal_logo.png`,
    description:
      "Yummeal transforme le contenu de votre frigo en recettes personnalisées : cuisinez sainement, sans gaspiller et sans y penser.",
    sameAs: [
      'https://apps.apple.com/fr/app/yummeal-cuisiner-sain/id6744942441',
      'https://play.google.com/store/apps/details?id=com.yummeal',
    ],
  };
}

export function buildMobileApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Yummeal',
    operatingSystem: 'iOS, Android',
    applicationCategory: 'LifestyleApplication',
    url: SITE_URL,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
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
    author: {
      '@type': 'Organization',
      name: 'Yummeal',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yummeal',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/yummeal_logo.png`,
      },
    },
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

export function jsonLdScriptTags(schemas: Array<Record<string, unknown>>): string {
  return schemas
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    )
    .join('\n');
}
