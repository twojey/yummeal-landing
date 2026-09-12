import { Link, Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { articles, getArticle } from '../data/faq';
import DownloadButtons from '../components/DownloadButtons';
import RelatedArticles from '../components/RelatedArticles';
import SiloSiblings from '../components/SiloSiblings';
import { buildArticleJsonLd } from '../lib/schema';

export default function FaqArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  usePageMeta({
    title: article ? `${article.title} - Yummeal` : 'Yummeal',
    description: article?.metaDescription ?? '',
    canonicalPath: `/faq/${slug ?? ''}`,
    jsonLd: article ? buildArticleJsonLd(article, `/faq/${slug ?? ''}`) : undefined,
  });

  if (!article) {
    return <Navigate to="/faq" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/faq" className="text-[#FF8C42] hover:underline">
            FAQ
          </Link>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          {article.title}
        </h1>

        <p className="text-lg text-gray-700 mb-6">{article.intro}</p>

        {article.sections.map((section, i) => (
          <div key={i} className="clay-card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
            <div className="space-y-2">
              {section.body.map((paragraph, j) => (
                <p key={j} className="text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">{article.ctaTitle}</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">{article.ctaText}</p>
          <DownloadButtons />
        </div>

        <SiloSiblings

          segment="faq"

          heading="Les autres questions fréquentes"

          articles={articles}

          currentSlug={article.slug}

        />

        <RelatedArticles category="faq" slug={article.slug} tags={article.tags ?? []}
        title={article.title} />
      </div>
    </div>
  );
}
