// Index plat de tout le contenu du site, utilisé uniquement pour calculer
// des liens "voir aussi" inter-catégories (src/components/RelatedArticles.tsx).
// Ne PAS utiliser pour autre chose que ce calcul : chaque catégorie garde sa
// propre source de vérité (src/data/<categorie>.ts).
import { articles as recettesAvecArticles } from './recettesAvec';
import { articles as substitutionsArticles } from './substitutions';
import { articles as urgenciesArticles } from './urgencies';
import { articles as santeArticles } from './sante';
import { articles as antiGaspillageArticles } from './antiGaspillage';
import { articles as solutionsArticles } from './solutions';
import { articles as astucesArticles } from './astuces';
import { articles as budgetArticles } from './budget';
import { articles as regimesArticles } from './regimes';
import { articles as guidesArticles } from './guides';
import { articles as faqArticles } from './faq';
import { articles as conceptArticles } from './concept';
import { articles as scenariosArticles } from './scenarios';
import { articles as comparatifArticles } from './comparatif';

export interface IndexedArticle {
  slug: string;
  category: string;
  title: string;
  tags: string[];
}

const sources: { category: string; articles: { slug: string; title: string; tags?: string[] }[] }[] = [
  { category: 'recettes-avec', articles: recettesAvecArticles },
  { category: 'substitutions', articles: substitutionsArticles },
  { category: 'urgencies', articles: urgenciesArticles },
  { category: 'sante', articles: santeArticles },
  { category: 'anti-gaspillage', articles: antiGaspillageArticles },
  { category: 'solutions', articles: solutionsArticles },
  { category: 'astuces', articles: astucesArticles },
  { category: 'budget', articles: budgetArticles },
  { category: 'regimes', articles: regimesArticles },
  { category: 'guides', articles: guidesArticles },
  { category: 'faq', articles: faqArticles },
  { category: 'concept', articles: conceptArticles },
  { category: 'scenarios', articles: scenariosArticles },
  { category: 'comparatif', articles: comparatifArticles },
];

export const contentIndex: IndexedArticle[] = sources.flatMap((s) =>
  s.articles.map((a) => ({
    slug: a.slug,
    category: s.category,
    title: a.title,
    tags: a.tags ?? [],
  }))
);

// Retourne jusqu'à `limit` articles liés : priorité au chevauchement de tags,
// complété si besoin par d'autres articles de la même catégorie (jamais
// l'article courant lui-même).
export function getRelatedArticles(
  currentCategory: string,
  currentSlug: string,
  currentTags: string[],
  limit = 4
): IndexedArticle[] {
  const others = contentIndex.filter(
    (a) => !(a.category === currentCategory && a.slug === currentSlug)
  );

  const scored = others
    .map((a) => ({
      article: a,
      score: a.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score);

  const withOverlap = scored.filter((s) => s.score > 0).map((s) => s.article);
  if (withOverlap.length >= limit) return withOverlap.slice(0, limit);

  const sameCategory = others.filter(
    (a) => a.category === currentCategory && !withOverlap.includes(a)
  );

  return [...withOverlap, ...sameCategory].slice(0, limit);
}
