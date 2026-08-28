import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles } from '../data/concept';
import DownloadButtons from '../components/DownloadButtons';

export default function ConceptIndexPage() {
  usePageMeta({
    title: 'Le concept Yummeal | Anti-gaspi & zéro déchet - Yummeal',
    description:
      "Comprendre le concept derrière Yummeal : comment fonctionne l'anti-gaspi de l'application et quelle vision de la cuisine zéro déchet elle défend.",
    canonicalPath: '/concept',
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
          Le concept Yummeal
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
          Comment fonctionne réellement l'anti-gaspi de Yummeal, et quelle
          vision de la cuisine il défend. Pas de recette ici : juste le
          principe derrière l'application.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {articles.map((article) => (
            <div key={article.slug} className="clay-card p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  to={`/concept/${article.slug}`}
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
            Envie de voir ce concept en action ?
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
