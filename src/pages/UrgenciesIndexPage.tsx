import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles } from '../data/urgencies';
import DownloadButtons from '../components/DownloadButtons';

export default function UrgenciesIndexPage() {
  usePageMeta({
    title: "Urgences cuisine | Recettes express quand vous êtes coincé - Yummeal",
    description:
      "Rien au frigo, pas de temps, un plat raté ? Nos guides d'urgence cuisine pour trouver une solution concrète en moins de 10 minutes.",
    canonicalPath: '/urgencies',
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
          Urgences cuisine
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
          Pas de temps, pas d'idée, ou un plat qui a mal tourné : voici des
          solutions concrètes et rapides pour les moments où il faut manger
          maintenant.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {articles.map((article) => (
            <div key={article.slug} className="clay-card p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  to={`/urgencies/${article.slug}`}
                  className="hover:text-[#FF8C42] transition-colors"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{article.metaDescription}</p>
              <Link
                to={`/urgencies/${article.slug}`}
                className="text-sm text-[#FF8C42] hover:underline"
              >
                Lire le guide
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Envie de ne plus jamais être coincé au moment de cuisiner ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Yummeal scanne votre frigo et vous propose directement des
            recettes adaptées à ce que vous avez déjà, et au temps qu'il vous
            reste.
          </p>
          <DownloadButtons />
        </div>
      </div>
    </div>
  );
}
