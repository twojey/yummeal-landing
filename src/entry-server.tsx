import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

/**
 * Rend l'app en HTML statique pour une URL donnée. Utilisé uniquement par
 * scripts/prerender.mjs (build-time), jamais chargé par le navigateur.
 */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

// Réexporté pour que prerender.mjs connaisse la liste des routes à générer
// sans avoir à deviner le nom du chunk SSR qui contient chaque module.
export { ingredients, ingredientCategories } from './data/ingredients';
export { articles as recettesAvecArticles } from './data/recettesAvec';
export { articles as substitutionsArticles } from './data/substitutions';
export { articles as urgenciesArticles } from './data/urgencies';
export { articles as santeArticles } from './data/sante';
export { articles as antiGaspillageArticles } from './data/antiGaspillage';
export { articles as solutionsArticles } from './data/solutions';
export { articles as astucesArticles } from './data/astuces';
export { articles as budgetArticles } from './data/budget';
export { articles as regimesArticles } from './data/regimes';
export { articles as guidesArticles } from './data/guides';
export { articles as faqArticles } from './data/faq';
export { articles as conceptArticles } from './data/concept';
export { fonctionnalites } from './data/fonctionnalites';
export {
  pagesAlternatives,
  REDIRECTIONS_COMPARATIF,
  REDIRECTIONS_VERS_INDEX,
} from './data/alternatives';

export {
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
  jsonLdScriptTags,
} from './lib/schema';
