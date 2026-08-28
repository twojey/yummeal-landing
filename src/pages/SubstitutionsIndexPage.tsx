import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles } from '../data/substitutions';
import DownloadButtons from '../components/DownloadButtons';

export default function SubstitutionsIndexPage() {
  usePageMeta({
    title: 'Par quoi remplacer... | Guides de substitution en cuisine - Yummeal',
    description:
      "Plus d'un ingrédient sous la main ? Nos guides vous disent par quoi le remplacer et dans quelles proportions.",
    canonicalPath: '/substitutions',
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
          Par quoi remplacer... ?
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
          Un ingrédient manque au moment de cuisiner ? Nos guides vous
          indiquent les meilleures alternatives, leur usage et les bonnes
          proportions pour ne pas rater votre plat.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {articles.map((article) => (
            <div key={article.slug} className="clay-card p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  to={`/substitutions/${article.slug}`}
                  className="hover:text-[#FF8C42] transition-colors"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{article.metaDescription}</p>
              <Link
                to={`/substitutions/${article.slug}`}
                className="text-sm text-[#FF8C42] hover:underline"
              >
                Voir les alternatives
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Envie de ne plus jamais vous poser la question ?
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
