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
import { ingredients } from './ingredients';

export interface IndexedArticle {
  slug: string;
  /** Segment de premier niveau ("astuces", "faq"...). */
  category: string;
  title: string;
  tags: string[];
  /**
   * Chemin complet quand il ne se déduit pas de `/${category}/${slug}` —
   * c'est le cas des fiches ingrédient, qui vivent sous
   * `/ingredients/<categorie>/<slug>`.
   */
  path?: string;
}

/**
 * Mots vides à ignorer quand on dérive des mots-clés d'un titre. Sans ce
 * filtre, « de », « et », « la » relient tout à tout et le score de parenté
 * ne veut plus rien dire.
 */
const STOP_WORDS = new Set([
  'a', 'au', 'aux', 'avec', 'ce', 'ces', 'dans', 'de', 'des', 'du', 'en', 'est',
  'et', 'il', 'je', 'la', 'le', 'les', 'ne', 'on', 'ou', 'par', 'pas', 'plus',
  'pour', 'quand', 'que', 'quel', 'quelle', 'qui', 'sa', 'san', 'sans', 'se',
  'ses', 'son', 'sur', 'un', 'une', 'vos', 'votre', 'y', 'faire', 'comment',
  'vraiment', 'bien', 'tout', 'toute', 'toutes', 'tous', 'mon', 'ma', 'mes',
]);

/** Normalise un libellé en mots-clés comparables (sans accents, sans pluriel). */
function keywords(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .map((w) => (w.length > 4 && w.endsWith('s') ? w.slice(0, -1) : w))
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
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

/**
 * Les 47 fiches ingrédient étaient absentes de cet index : elles ne
 * recevaient donc AUCUN lien latéral, et 13 d'entre elles n'avaient qu'un
 * seul lien entrant (leur page de catégorie). C'est le plus gros silo du site
 * et celui qui porte le positionnement anti-gaspi — il doit participer au
 * maillage dans les deux sens.
 *
 * Faute de `tags` dans `ingredients.ts`, on en dérive depuis le nom de
 * l'ingrédient : « Fanes de radis » donne les mots-clés `fane` et `radis`,
 * qui relient la fiche aux articles parlant de fanes ou de radis.
 */
const ingredientEntries: IndexedArticle[] = ingredients.map((i) => ({
  slug: i.slug,
  category: 'ingredients',
  title: `Que faire avec : ${i.name} ?`,
  tags: keywords(i.name),
  path: `/ingredients/${i.categorySlug}/${i.slug}`,
}));

export const contentIndex: IndexedArticle[] = [
  ...sources.flatMap((s) =>
    s.articles.map((a) => ({
      slug: a.slug,
      category: s.category,
      title: a.title,
      tags: a.tags ?? [],
    }))
  ),
  ...ingredientEntries,
];

/** Chemin d'une entrée de l'index, quel que soit son silo. */
export function pathOf(a: IndexedArticle): string {
  return a.path ?? `/${a.category}/${a.slug}`;
}

// Retourne jusqu'à `limit` articles liés : priorité au chevauchement de tags,
// complété si besoin par d'autres articles de la même catégorie (jamais
// l'article courant lui-même).
/**
 * Articles liés, du plus proche au plus lointain.
 *
 * Le score combine deux signaux, le second étant celui qui manquait :
 *  - chevauchement de `tags` (déclaré à la main, donc fiable) — poids 3 ;
 *  - entité alimentaire commune entre les titres (dérivée) — poids 1. C'est
 *    ce qui relie « Fanes de radis » à « Cuisiner les fanes de carottes », ou
 *    « Blancs d'œufs seuls » à « Durée de conservation d'un œuf dur », deux
 *    paires qui n'avaient aucun tag en commun et aucun lien entre elles.
 *
 * On complète toujours jusqu'à `limit` (même silo, puis reste de l'index) :
 * une page qui ne reçoit aucun lien latéral est exactement le cas qu'on
 * cherche à supprimer.
 */
export function getRelatedArticles(
  currentCategory: string,
  currentSlug: string,
  currentTags: string[],
  limit = 4,
  currentTitle = ''
): IndexedArticle[] {
  const others = contentIndex.filter(
    (a) => !(a.category === currentCategory && a.slug === currentSlug)
  );
  const ownWords = new Set([
    ...currentTags.flatMap((t) => keywords(t)),
    ...keywords(currentTitle),
  ]);

  const scored = others
    .map((a) => {
      const tagOverlap = a.tags.filter((t) => currentTags.includes(t)).length;
      const entityOverlap = [
        ...new Set([...a.tags.flatMap((t) => keywords(t)), ...keywords(a.title)]),
      ].filter((w) => ownWords.has(w)).length;
      return { article: a, score: tagOverlap * 3 + entityOverlap };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked = scored.map((s) => s.article);
  if (picked.length >= limit) return picked.slice(0, limit);

  // Compléments déterministes : d'abord le même silo, puis le reste, dans
  // l'ordre de l'index (donc stable d'un build à l'autre).
  const chosen = new Set(picked);
  const fill = [
    ...others.filter((a) => a.category === currentCategory && !chosen.has(a)),
    ...others.filter((a) => a.category !== currentCategory && !chosen.has(a)),
  ];
  return [...picked, ...fill].slice(0, limit);
}
