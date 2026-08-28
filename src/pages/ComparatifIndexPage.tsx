import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles } from '../data/comparatif';
import DownloadButtons from '../components/DownloadButtons';

export default function ComparatifIndexPage() {
  usePageMeta({
    title: 'Comparatifs | Yummeal face aux autres applications de cuisine',
    description:
      "Des comparaisons factuelles et sourcées entre Yummeal et les autres applications de cuisine, gestion de frigo et anti-gaspillage.",
    canonicalPath: '/comparatif',
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
          Comparatifs
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
          Des comparaisons factuelles, basées sur les fiches officielles de
          chaque application — pas de dénigrement, juste les différences de
          mécanisme.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/comparatif/${article.slug}`}
              className="clay-card p-6 block hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm">{article.intro}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Voyez la différence par vous-même
          </h2>
          <DownloadButtons />
        </div>
      </div>
    </div>
  );
}
