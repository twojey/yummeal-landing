import { Link, Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { getCategory, getIngredientsByCategory } from '../data/ingredients';
import DownloadButtons from '../components/DownloadButtons';
import RelatedArticles from '../components/RelatedArticles';

export default function IngredientCategoryPage() {
  const { category: categorySlug } = useParams<{ category: string }>();
  const category = categorySlug ? getCategory(categorySlug) : undefined;

  usePageMeta({
    title: category
      ? `Que faire avec des ${category.label.toLowerCase()} ? - Yummeal`
      : 'Yummeal',
    description: category?.description ?? '',
    canonicalPath: `/ingredients/${categorySlug ?? ''}`,
  });

  if (!category) {
    return <Navigate to="/ingredients" replace />;
  }

  const items = getIngredientsByCategory(category.slug);

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <Link to="/ingredients" className="text-sm text-[#FF8C42] hover:underline">
          ← Tous les ingrédients
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mt-4 mb-4">
          {category.label}
        </h1>
        <p className="text-lg text-gray-700 mb-10">{category.description}</p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {items.map((item) => (
            <Link
              key={item.slug}
              to={`/ingredients/${category.slug}/${item.slug}`}
              className="clay-card p-6 block hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 text-sm">{item.intro}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Plus besoin de chercher un guide par ingrédient
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Avec Yummeal, prenez en photo votre frigo : l'application
            reconnaît vos ingrédients et vous propose directement des
            recettes, même pour ceux qui commencent à s'abîmer.
          </p>
          <DownloadButtons />
        </div>
      <RelatedArticles
          category="ingredients"
          slug={`categorie-${category.slug}`}
          tags={[]}
          title={category.label}
        />
      </div>
    </div>
  );
}
