import { Link } from 'react-router-dom';
import { getRelatedArticles } from '../data/contentIndex';

const CATEGORY_LABELS: Record<string, string> = {
  'recettes-avec': 'Recette',
  substitutions: 'Substitution',
  urgencies: 'Urgence cuisine',
  sante: 'Santé & alimentation',
  'anti-gaspillage': 'Anti-gaspillage',
  solutions: 'Solution',
  astuces: 'Astuce',
  budget: 'Budget',
  regimes: 'Régime',
  guides: 'Guide',
  faq: 'FAQ',
  concept: 'Concept',
  scenarios: 'Scénario',
  comparatif: 'Comparatif',
};

interface RelatedArticlesProps {
  category: string;
  slug: string;
  tags: string[];
}

export default function RelatedArticles({ category, slug, tags }: RelatedArticlesProps) {
  const related = getRelatedArticles(category, slug, tags);
  if (related.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-semibold mb-4">À lire aussi</h2>
      <ul className="grid sm:grid-cols-2 gap-3">
        {related.map((a) => (
          <li key={`${a.category}-${a.slug}`}>
            <Link
              to={`/${a.category}/${a.slug}`}
              className="block clay-card p-4 hover:shadow-md transition-shadow"
            >
              <span className="text-xs text-[#FF8C42] font-medium">
                {CATEGORY_LABELS[a.category] ?? a.category}
              </span>
              <p className="text-sm text-gray-800 mt-1">{a.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
