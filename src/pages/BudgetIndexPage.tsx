import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles } from '../data/budget';
import DownloadButtons from '../components/DownloadButtons';

export default function BudgetIndexPage() {
  usePageMeta({
    title: 'Manger avec un petit budget | Guides Yummeal',
    description:
      "Manger équilibré sans se ruiner : nos guides pour composer des repas économiques, choisir les bonnes protéines et optimiser vos courses.",
    canonicalPath: '/budget',
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
          Manger avec un petit budget
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
          Bien manger avec un budget serré est une question de méthode plus
          que de prix précis. Nos guides expliquent les principes qui restent
          vrais dans la durée, pour composer des repas économiques sans
          sacrifier l'équilibre.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {articles.map((article) => (
            <div key={article.slug} className="clay-card p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  to={`/budget/${article.slug}`}
                  className="hover:text-[#FF8C42] transition-colors"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-600">{article.metaDescription}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Envie de manger mieux sans y penser ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Yummeal scanne votre frigo et vous propose directement des
            recettes adaptées à ce que vous avez déjà, pour ne rien gaspiller.
          </p>
          <DownloadButtons />
        </div>
      </div>
    </div>
  );
}
