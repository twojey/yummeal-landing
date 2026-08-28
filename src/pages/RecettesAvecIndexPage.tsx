import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles } from '../data/recettesAvec';
import DownloadButtons from '../components/DownloadButtons';

export default function RecettesAvecIndexPage() {
  usePageMeta({
    title: 'Recettes avec... | Idées de recettes selon vos ingrédients - Yummeal',
    description:
      "Vous avez des ingrédients précis au frigo et vous cherchez une recette pour les utiliser ? Retrouvez nos recettes complètes classées par ingrédients.",
    canonicalPath: '/recettes-avec',
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
          Recettes avec...
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
          Vous avez déjà les ingrédients, il ne vous manque que la recette.
          Choisissez la combinaison qui correspond à ce que vous avez au
          frigo.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/recettes-avec/${article.slug}`}
              className="clay-card p-6 block hover:text-[#FF8C42] transition-colors"
            >
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-600">{article.intro}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Envie de ne plus vous demander quoi cuisiner ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Yummeal scanne votre frigo et vous propose directement des
            recettes adaptées à ce que vous avez déjà.
          </p>
          <DownloadButtons />
        </div>
      </div>
    </div>
  );
}
