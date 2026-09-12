import { Link } from 'react-router-dom';

interface Sibling {
  slug: string;
  title: string;
}

interface SiloSiblingsProps {
  /** Segment de premier niveau du silo, ex. "comparatif". */
  segment: string;
  /** Intitulé du bloc, ex. "Les autres comparatifs". */
  heading: string;
  /** Toutes les entrées du silo, l'entrée courante incluse. */
  articles: Sibling[];
  /** Slug de la page courante, exclu de la liste. */
  currentSlug: string;
}

/**
 * Navigation entre pages sœurs d'un même silo, en pastilles compactes.
 *
 * Utile au lecteur — qui compare une application à plusieurs autres, ou
 * cherche par quoi remplacer un second ingrédient — et nécessaire au maillage :
 * dans les silos larges, une page d'article ne recevait de lien que depuis son
 * index, soit un seul lien entrant, bien en dessous du seuil où un moteur
 * accorde du crédit à une page.
 *
 * À réserver aux silos larges. Sur un silo de quatre articles, le bloc
 * « À lire aussi » (RelatedArticles) couvre déjà tout le monde et ceci ne
 * ferait que dupliquer les mêmes liens.
 */
export default function SiloSiblings({
  segment,
  heading,
  articles,
  currentSlug,
}: SiloSiblingsProps) {
  const siblings = articles.filter((a) => a.slug !== currentSlug);
  if (siblings.length === 0) return null;

  return (
    <nav
      className="mt-12 pt-8 border-t border-gray-200"
      aria-label={heading}
    >
      <h2 className="text-xl font-semibold mb-4">{heading}</h2>
      <ul className="flex flex-wrap gap-2">
        {siblings.map((a) => (
          <li key={a.slug}>
            <Link
              to={`/${segment}/${a.slug}`}
              className="inline-block text-sm px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-[#FF8C42] hover:text-[#FF8C42] transition-colors"
            >
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
