import { Link, Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  DATE_VERIFICATION,
  getPageAlternatives,
  pagesAlternatives,
} from '../data/alternatives';
import TableauComparatif from '../components/TableauComparatif';
import DownloadButtons from '../components/DownloadButtons';
import SiloSiblings from '../components/SiloSiblings';
import {
  buildAlternativesJsonLd,
  buildBreadcrumbJsonLd,
  buildMobileApplicationJsonLd,
} from '../lib/schema';

/**
 * Page de comparaison d'un segment du marché.
 *
 * L'ordre des blocs n'est pas décoratif : tableau de faits d'abord, prose
 * ensuite, et la section « quand choisir autre chose » AVANT le bouton de
 * téléchargement. Placer l'aveu après le call to action l'aurait rendu
 * décoratif ; placé avant, il est ce qui rend le reste crédible.
 */
export default function AlternativesArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? getPageAlternatives(slug) : undefined;

  usePageMeta({
    title: page ? page.title : 'Yummeal',
    description: page?.metaDescription ?? '',
    canonicalPath: `/alternatives/${slug ?? ''}`,
    jsonLd: page
      ? [
          buildAlternativesJsonLd(page, `/alternatives/${page.slug}`),
          buildMobileApplicationJsonLd(),
          buildBreadcrumbJsonLd([
            { name: 'Accueil', path: '/' },
            { name: 'Alternatives', path: '/alternatives' },
            { name: page.h1, path: `/alternatives/${page.slug}` },
          ]),
        ]
      : undefined,
  });

  if (!page) return <Navigate to="/alternatives" replace />;

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-gray-500 mb-4">
          <Link to="/alternatives" className="text-[#FF8C42] hover:underline">
            Alternatives
          </Link>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
          {page.h1}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Vérifié le {DATE_VERIFICATION}
        </p>
        <p className="text-lg text-gray-700 mb-2">{page.intro}</p>

        <TableauComparatif apps={page.apps} />

        {page.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
            {section.body.map((paragraphe) => (
              <p key={paragraphe.slice(0, 40)} className="text-gray-700 mb-4">
                {paragraphe}
              </p>
            ))}
          </section>
        ))}

        <section className="mb-12 clay-card p-6 bg-white">
          <h2 className="text-2xl font-bold mb-2">
            Quand une autre application est le bon choix
          </h2>
          <p className="text-gray-600 mb-5 text-sm">
            Aucune de ces applications ne gagne sur tous les critères, la nôtre
            comprise. Voici les cas où nous ne sommes pas la réponse.
          </p>
          <dl className="space-y-4">
            {page.quandChoisirAutre.map((cas) => (
              <div key={cas.app}>
                <dt className="font-semibold text-gray-900">{cas.app}</dt>
                <dd className="text-gray-700">Choisissez-la {cas.raison}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-4">{page.ctaTitle}</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">{page.ctaText}</p>
          <DownloadButtons />
        </div>

        <SiloSiblings
          segment="alternatives"
          heading="Les autres comparatifs"
          articles={pagesAlternatives.map((p) => ({ slug: p.slug, title: p.h1 }))}
          currentSlug={page.slug}
        />
      </div>
    </div>
  );
}
