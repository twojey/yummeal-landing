import { Link, Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { fonctionnalitesDe, getFonctionnalite } from '../data/fonctionnalites';
import { useLocale } from '../i18n/useLocale';
import { cheminLocalise } from '../i18n/config';
import DownloadButtons from '../components/DownloadButtons';
import {
  buildBreadcrumbJsonLd,
  buildFonctionnaliteJsonLd,
} from '../lib/schema';

/**
 * Page produit d'un mécanisme (scan du frigo, import de recette, photo de plat).
 *
 * Trois choix de structure, chacun pour une raison mesurée :
 *  - la question en titre de section, avec la réponse juste en dessous, est le
 *    patron que les moteurs extraient le plus proprement ;
 *  - la section « ce que ça ne fait pas » est mise au même niveau que le
 *    mécanisme, pas en note de bas de page : c'est ce qui empêche une
 *    description erronée de circuler à notre place ;
 *  - les pages se lient entre elles, faute de quoi elles arriveraient sous le
 *    seuil de découverte comme les 84 pages qu'on vient d'en sortir.
 */
export default function FonctionnalitePage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t } = useLocale();
  const f = slug ? getFonctionnalite(slug, locale) : undefined;
  const ui = t.fonctionnalites;
  const cheminIndex = cheminLocalise('/fonctionnalites', locale);
  const cheminDe = (s: string) =>
    cheminLocalise(`/fonctionnalites/${s}`, locale);

  usePageMeta({
    title: f ? f.title : 'Yummeal',
    description: f?.metaDescription ?? '',
    canonicalPath: cheminDe(slug ?? ''),
    jsonLd: f
      ? [
          buildFonctionnaliteJsonLd(f, cheminDe(f.slug)),
          buildBreadcrumbJsonLd([
            { name: t.nav.accueil, path: cheminLocalise('', locale) },
            { name: ui.fil, path: cheminIndex },
            { name: f.h1, path: cheminDe(f.slug) },
          ]),
        ]
      : undefined,
  });

  // Un slug inconnu renvoie vers l'index DE LA LANGUE courante.
  if (!f) return <Navigate to={cheminIndex} replace />;

  const autres = fonctionnalitesDe(locale).filter((o) => o.slug !== f.slug);

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-gray-500 mb-4">
          <Link to={cheminIndex} className="text-[#FF8C42] hover:underline">
            {ui.fil}
          </Link>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          {f.h1}
        </h1>
        <p className="text-lg text-gray-700 mb-12">{f.intro}</p>

        <h2 className="text-2xl font-bold mb-6">{ui.commentCaMarche}</h2>
        <ol className="space-y-6 mb-14">
          {f.etapes.map((e, i) => (
            <li key={e.titre} className="clay-card p-6">
              <h3 className="text-lg font-semibold mb-2">
                <span className="text-[#FF8C42] mr-2">{i + 1}.</span>
                {e.titre}
              </h3>
              <p className="text-gray-600">{e.corps}</p>
            </li>
          ))}
        </ol>

        <h2 className="text-2xl font-bold mb-3">{ui.ceQueCaNeFaitPas}</h2>
        <p className="text-gray-700 mb-5">{ui.limitesIntro}</p>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-14">
          {f.limites.map((l) => (
            <li key={l.slice(0, 40)}>{l}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mb-6">{ui.questions}</h2>
        <dl className="mb-14 space-y-6">
          {f.faq.map((q) => (
            <div key={q.question}>
              <dt className="font-semibold text-gray-900 mb-1">{q.question}</dt>
              <dd className="text-gray-700">{q.reponse}</dd>
            </div>
          ))}
        </dl>

        <div className="text-center mb-14">
          <h2 className="text-2xl font-bold mb-4">{f.ctaTitle}</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">{f.ctaText}</p>
          <DownloadButtons />
        </div>

        <nav
          className="pt-8 border-t border-gray-200"
          aria-label={ui.autres}
        >
          <h2 className="text-xl font-semibold mb-4">{ui.autres}</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {autres.map((o) => (
              <li key={o.slug}>
                <Link
                  to={cheminDe(o.slug)}
                  className="block clay-card p-4 hover:shadow-md transition-shadow"
                >
                  <p className="text-sm text-gray-800">{o.h1}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
