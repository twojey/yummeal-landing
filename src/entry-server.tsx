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

// Socle i18n : le prerender doit générer les pages localisées, leurs
// `hreflang` et l'attribut `lang` depuis la MÊME source que le client,
// sinon les deux divergent sans que rien n'échoue.
// ⚠️ `LOCALES` et `BALISE_LANG` sont aliasés en minuscule : le plugin
// react-refresh considère tout export dont le nom commence par une majuscule
// comme un composant, et se met alors à signaler TOUS les réexports de ce
// fichier (39 avertissements, et `lint` échoue sur --max-warnings 0).
export {
  LOCALES as locales,
  BALISE_LANG as baliseLang,
  alternatives,
  cheminLocalise,
  cheminsDeLocale,
  decoupeLocale,
} from './i18n/config';
export { dictionnaire } from './i18n/useLocale';

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
