import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * Page servie pour toute URL qui ne correspond à aucune route.
 *
 * Elle remplit deux rôles distincts :
 *  - côté client, l'app n'avait AUCUNE route `*` : une URL inconnue rendait un
 *    écran blanc, sans message ni issue ;
 *  - côté prerender, `scripts/prerender.mjs` rend cette route pour produire
 *    `dist/404.html`, que Netlify sert avec un vrai statut 404. Avant, le
 *    catch-all SPA répondait 200 + l'accueil pour l'infini des URL
 *    inexistantes, ce que Google compte comme des soft-404.
 *
 * Le canonical et le `noindex` sont posés par le prerender, pas ici : une page
 * d'erreur ne doit pas se déclarer canonique d'elle-même.
 */
export default function NotFoundPage() {
  usePageMeta({
    title: 'Page introuvable - Yummeal',
    description: "Cette page n'existe pas ou a été déplacée.",
    canonicalPath: '/',
  });

  const pistes: Array<{ to: string; label: string; hint: string }> = [
    {
      to: '/ingredients',
      label: 'Que faire avec... ?',
      hint: "Un ingrédient traîne au frigo et vous ne savez pas quoi en faire",
    },
    {
      to: '/recettes-avec',
      label: 'Recettes avec...',
      hint: 'Vous avez deux ou trois ingrédients précis sous la main',
    },
    {
      to: '/substitutions',
      label: 'Par quoi remplacer...',
      hint: "Il vous manque un ingrédient au milieu d'une recette",
    },
    {
      to: '/anti-gaspillage',
      label: 'Anti-gaspillage',
      hint: 'Conservation, dates de péremption, organisation du frigo',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-[#FF8C42] font-semibold mb-3">
          Erreur 404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          Cette page n'existe pas
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          Le lien est peut-être ancien, ou l'adresse comporte une faute de
          frappe. Voici par où reprendre.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {pistes.map((piste) => (
            <div key={piste.to} className="clay-card p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link
                  to={piste.to}
                  className="hover:text-[#FF8C42] transition-colors"
                >
                  {piste.label}
                </Link>
              </h2>
              <p className="text-gray-600">{piste.hint}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-700">
          Vous pouvez aussi revenir à{' '}
          <Link to="/" className="text-[#FF8C42] underline font-medium">
            l'accueil
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
