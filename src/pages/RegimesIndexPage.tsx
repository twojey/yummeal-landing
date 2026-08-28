import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles } from '../data/regimes';
import DownloadButtons from '../components/DownloadButtons';

export default function RegimesIndexPage() {
  usePageMeta({
    title: 'Régimes et objectifs alimentaires | Guides pratiques - Yummeal',
    description:
      "Dîner léger, sans gluten, repas sportif, snacks sains : nos guides pratiques pour composer des repas adaptés à vos besoins du quotidien.",
    canonicalPath: '/regimes',
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
          Régimes et objectifs alimentaires
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
          Dîner léger, sans gluten, repas sportif ou petit creux entre deux
          cours : nos guides pratiques pour composer des repas adaptés à
          votre quotidien, sans injonction ni promesse magique.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {articles.map((article) => (
            <div key={article.slug} className="clay-card p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  to={`/regimes/${article.slug}`}
                  className="hover:text-[#FF8C42] transition-colors"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{article.metaDescription}</p>
              <Link
                to={`/regimes/${article.slug}`}
                className="text-sm text-[#FF8C42] hover:underline"
              >
                Lire le guide
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Envie de repas adaptés sans y passer des heures ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Yummeal vous propose des recettes adaptées à ce que vous avez déjà,
            pour manger équilibré sans y penser en permanence.
          </p>
          <DownloadButtons />
        </div>
      </div>
    </div>
  );
}
