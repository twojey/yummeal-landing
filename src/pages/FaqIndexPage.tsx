import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles } from '../data/faq';
import DownloadButtons from '../components/DownloadButtons';
import { buildFaqJsonLd } from '../lib/schema';

export default function FaqIndexPage() {
  usePageMeta({
    title: 'FAQ sécurité alimentaire | Yummeal',
    description:
      "Des réponses claires et prudentes aux questions de sécurité alimentaire les plus courantes : conservation, congélation, recuisson des restes.",
    canonicalPath: '/faq',
    jsonLd: buildFaqJsonLd(articles),
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
          Questions fréquentes sur la sécurité alimentaire
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-12">
          Peut-on encore manger ça ? Faut-il le jeter ou peut-il se recuire ?
          Nos réponses, avec prudence, pour vous aider à décider.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {articles.map((article) => (
            <div key={article.slug} className="clay-card p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  to={`/faq/${article.slug}`}
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
