import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { fonctionnalitesDe } from '../data/fonctionnalites';
import { useLocale } from '../i18n/useLocale';
import { cheminLocalise } from '../i18n/config';
import DownloadButtons from '../components/DownloadButtons';
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
} from '../lib/schema';

export default function FonctionnalitesIndexPage() {
  const { locale, t } = useLocale();
  const fonctionnalites = fonctionnalitesDe(locale);
  // Les chemins internes portent le préfixe de langue : un lien nu vers
  // /fonctionnalites depuis /pl/ sortirait le visiteur de sa langue sans
  // rien lui dire.
  const cheminIndex = cheminLocalise('/fonctionnalites', locale);
  const cheminDe = (slug: string) =>
    cheminLocalise(`/fonctionnalites/${slug}`, locale);
  const ui = t.fonctionnalites;

  usePageMeta({
    title: ui.indexTitle,
    description: ui.indexDescription,
    canonicalPath: cheminIndex,
    jsonLd: [
      buildCollectionPageJsonLd(
        {
          name: ui.indexCollection,
          description: ui.indexDescription,
          path: cheminIndex,
        },
        fonctionnalites.map((f) => ({
          name: f.h1,
          path: cheminDe(f.slug),
        }))
      ),
      buildBreadcrumbJsonLd([
        { name: t.nav.accueil, path: cheminLocalise('', locale) },
        { name: ui.fil, path: cheminIndex },
      ]),
    ],
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          {ui.indexH1}
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-12">{ui.indexIntro}</p>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {fonctionnalites.map((f) => (
            <div key={f.slug} className="clay-card p-6 flex flex-col">
              <h2 className="text-xl font-semibold mb-3">
                <Link
                  to={cheminDe(f.slug)}
                  className="hover:text-[#FF8C42] transition-colors"
                >
                  {f.h1}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 grow">{f.intro}</p>
              <Link
                to={cheminDe(f.slug)}
                className="text-[#FF8C42] font-medium text-sm hover:underline"
              >
                {ui.commentCaMarche}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            {ui.indexCta}
          </h2>
          <DownloadButtons />
        </div>
      </div>
    </div>
  );
}
