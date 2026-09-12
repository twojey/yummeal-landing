import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { fonctionnalites } from '../data/fonctionnalites';
import DownloadButtons from '../components/DownloadButtons';
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
} from '../lib/schema';

const INDEX_DESCRIPTION =
  "Les trois mécanismes de Yummeal et leurs limites : scanner son frigo, importer une recette TikTok, estimer un plat en photo.";

export default function FonctionnalitesIndexPage() {
  usePageMeta({
    title: 'Fonctionnalités de Yummeal — les trois mécanismes',
    description: INDEX_DESCRIPTION,
    canonicalPath: '/fonctionnalites',
    jsonLd: [
      buildCollectionPageJsonLd(
        {
          name: 'Fonctionnalités',
          description: INDEX_DESCRIPTION,
          path: '/fonctionnalites',
        },
        fonctionnalites.map((f) => ({
          name: f.h1,
          path: `/fonctionnalites/${f.slug}`,
        }))
      ),
      buildBreadcrumbJsonLd([
        { name: 'Accueil', path: '/' },
        { name: 'Fonctionnalités', path: '/fonctionnalites' },
      ]),
    ],
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          Ce que fait Yummeal, mécanisme par mécanisme
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-12">
          Trois fonctions, expliquées avec ce qu'elles font et ce qu'elles ne
          font pas. Pas de promesse au-delà du réel : c'est plus utile pour
          décider si l'application vous convient.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {fonctionnalites.map((f) => (
            <div key={f.slug} className="clay-card p-6 flex flex-col">
              <h2 className="text-xl font-semibold mb-3">
                <Link
                  to={`/fonctionnalites/${f.slug}`}
                  className="hover:text-[#FF8C42] transition-colors"
                >
                  {f.h1}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 grow">{f.intro}</p>
              <Link
                to={`/fonctionnalites/${f.slug}`}
                className="text-[#FF8C42] font-medium text-sm hover:underline"
              >
                Comment ça marche
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Le plus simple reste de l'essayer
          </h2>
          <DownloadButtons />
        </div>
      </div>
    </div>
  );
}
