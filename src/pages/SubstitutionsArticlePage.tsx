import { Link, Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { getArticle } from '../data/substitutions';
import DownloadButtons from '../components/DownloadButtons';
import RelatedArticles from '../components/RelatedArticles';
import { buildArticleJsonLd } from '../lib/schema';

export default function SubstitutionsArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  usePageMeta({
    title: article ? `${article.title} - Yummeal` : 'Yummeal',
    description: article?.metaDescription ?? '',
    canonicalPath: `/substitutions/${slug ?? ''}`,
    jsonLd: article
      ? buildArticleJsonLd(article, `/substitutions/${slug ?? ''}`)
      : undefined,
  });

  if (!article) {
    return <Navigate to="/substitutions" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/substitutions" className="text-[#FF8C42] hover:underline">
            Substitutions
          </Link>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          {article.title}
        </h1>

        <p className="text-lg text-gray-700 mb-6">{article.intro}</p>

        {article.sections.map((section, i) => (
          <div key={i} className="clay-card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
            <ul className="space-y-2">
              {section.body.map((paragraph, j) => (
                <li key={j} className="text-gray-600 flex gap-2">
                  <span className="text-[#4CAF50] font-bold">•</span>
                  <span>{paragraph}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">{article.ctaTitle}</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">{article.ctaText}</p>
          <DownloadButtons />
        </div>

        <RelatedArticles
          category="substitutions"
          slug={article.slug}
          tags={article.tags ?? []}
        />
      </div>
    </div>
  );
}
