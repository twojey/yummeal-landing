import { Link, Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  getCategory,
  getIngredient,
  getIngredientsByCategory,
} from '../data/ingredients';
import DownloadButtons from '../components/DownloadButtons';
import RelatedArticles from '../components/RelatedArticles';

export default function IngredientDetailPage() {
  const { category: categorySlug, slug } = useParams<{
    category: string;
    slug: string;
  }>();
  const category = categorySlug ? getCategory(categorySlug) : undefined;
  const ingredient =
    categorySlug && slug ? getIngredient(categorySlug, slug) : undefined;

  usePageMeta({
    title: ingredient ? `Que faire avec : ${ingredient.name} ? - Yummeal` : 'Yummeal',
    description: ingredient?.metaDescription ?? '',
    canonicalPath: `/ingredients/${categorySlug ?? ''}/${slug ?? ''}`,
  });

  if (!category || !ingredient) {
    return <Navigate to="/ingredients" replace />;
  }

  // Navigation entre pages sœurs. Ce n'est pas un artifice de maillage : quand
  // on cherche quoi faire d'un légume qui s'abîme, on en a souvent deux ou
  // trois dans le même état. Accessoirement, c'est ce qui fait redescendre le
  // PageRank interne vers ce silo — chaque fiche n'avait qu'un lien entrant,
  // celui de sa page de catégorie.
  const siblings = getIngredientsByCategory(category.slug).filter(
    (i) => i.slug !== ingredient.slug
  );

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/ingredients" className="text-[#FF8C42] hover:underline">
            Ingrédients
          </Link>
          {' / '}
          <Link
            to={`/ingredients/${category.slug}`}
            className="text-[#FF8C42] hover:underline"
          >
            {category.label}
          </Link>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          Que faire avec : {ingredient.name.toLowerCase()} ?
        </h1>

        <p className="text-lg text-gray-700 mb-6">{ingredient.intro}</p>

        <div className="clay-card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Pourquoi ça arrive</h2>
          <p className="text-gray-600">{ingredient.why}</p>
        </div>

        <div className="clay-card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Nos conseils</h2>
          <ul className="space-y-2">
            {ingredient.tips.map((tip, i) => (
              <li key={i} className="text-gray-600 flex gap-2">
                <span className="text-[#4CAF50] font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="clay-card p-6 mb-12">
          <h2 className="text-xl font-semibold mb-3">Idées de recettes</h2>
          <ul className="space-y-2">
            {ingredient.recipeIdeas.map((idea, i) => (
              <li key={i} className="text-gray-600 flex gap-2">
                <span className="text-[#FF8C42] font-bold">•</span>
                <span>{idea}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Scannez votre frigo, Yummeal fait le reste
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Plus besoin de chercher un guide par ingrédient : Yummeal identifie
            ce que vous avez et vous propose directement une recette adaptée.
          </p>
          <DownloadButtons />
        </div>

        {siblings.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">
              Autres {category.label.toLowerCase()} à sauver
            </h2>
            <ul className="flex flex-wrap gap-2">
              {siblings.map((i) => (
                <li key={i.slug}>
                  <Link
                    to={`/ingredients/${i.categorySlug}/${i.slug}`}
                    className="inline-block text-sm px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-[#FF8C42] hover:text-[#FF8C42] transition-colors"
                  >
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <RelatedArticles
          category="ingredients"
          slug={ingredient.slug}
          tags={[]}
          title={`${ingredient.name} ${category.label}`}
        />
      </div>
    </div>
  );
}
