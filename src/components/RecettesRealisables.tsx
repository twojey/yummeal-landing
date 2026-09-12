import donnees from '../data/recettesRealisables.json';
import DownloadButtons from './DownloadButtons';

interface Recette {
  id: string;
  titre: string;
  minutes: number | null;
  manquants: number;
  ingredients: number;
}

const parFiche = donnees as unknown as Record<string, Recette[] | undefined>;

/**
 * Bloc « ce que vous pouvez cuisiner » d'une fiche ingrédient.
 *
 * C'est le seul contenu du site qu'aucun concurrent ni aucun résumé
 * automatique ne peut reproduire : ce ne sont pas des idées de recettes
 * rédigées à la main, c'est le RÉSULTAT du calcul de réalisabilité de
 * l'application, sur le catalogue réel, avec le nombre d'ingrédients
 * manquants par recette.
 *
 * Avant, ces fiches affichaient trois titres de recettes en texte brut, non
 * cliquables et non reliés au catalogue — un gabarit identique sur 89 % des
 * fiches, ce qui les exposait au jugement « scaled content abuse » (dont le
 * critère est la finalité de la page, pas sa longueur).
 *
 * Honnêteté de l'affichage, non négociable :
 *  - le nombre d'ingrédients manquants est écrit, y compris quand il est de 2.
 *    Masquer un manquant pour faire joli transformerait une information en
 *    promesse ;
 *  - le garde-manger supposé est nommé. Sans ça, « réalisable » serait faux ;
 *  - aucun lien vers une page de recette : le site n'en a pas. Inventer un
 *    lien serait pire qu'une liste non cliquable.
 */
export default function RecettesRealisables({
  slug,
  nom,
}: {
  slug: string;
  nom: string;
}) {
  const recettes = parFiche[slug];
  // Toutes les fiches n'ont pas de données : celles dont l'ingrédient de
  // référence ne représente pas le sujet (« riz cuit restant » renvoyait des
  // recettes pour CUIRE du riz) en sont volontairement exclues.
  if (!recettes || recettes.length < 3) return null;

  const sansManquant = recettes.filter((r) => r.manquants === 0).length;

  return (
    <section className="clay-card p-6 mb-6">
      <h2 className="text-xl font-semibold mb-1">
        Ce que vous pouvez cuisiner avec ça
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        {recettes.length} recettes du catalogue Yummeal, calculées sur{' '}
        {nom.toLowerCase()}
        {sansManquant > 0 && (
          <>
            {' '}— dont <strong>{sansManquant}</strong> sans aucun ingrédient à
            acheter
          </>
        )}
        .
      </p>

      <ul className="divide-y divide-gray-200">
        {recettes.map((r) => (
          <li key={r.id} className="py-3 flex flex-wrap items-baseline gap-x-3">
            <span className="text-gray-800 font-medium grow">{r.titre}</span>
            {r.minutes !== null && (
              <span className="text-sm text-gray-500 tabular-nums">
                {r.minutes} min
              </span>
            )}
            <span
              className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                r.manquants === 0
                  ? 'bg-[#E8F5E9] text-[#2E7D32]'
                  : 'bg-[#FFF3E0] text-[#A0660F]'
              }`}
            >
              {r.manquants === 0
                ? 'rien à acheter'
                : `${r.manquants} ingrédient${r.manquants > 1 ? 's' : ''} à acheter`}
            </span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-500 mt-4 leading-relaxed">
        Le calcul suppose présents les basiques du placard — sel, poivre, huile,
        beurre, farine, sucre, épices et condiments courants. Il ne suppose rien
        d’autre : tout le reste est compté comme manquant. Les recettes sont
        écrites par des humains, l’application les trie et les filtre ; elle
        n’en génère aucune.
      </p>

      <div className="mt-5 pt-5 border-t border-gray-200 text-center">
        <p className="text-gray-700 mb-4">
          Dans l’application, la liste se recalcule sur{' '}
          <strong>tout</strong> ce que contient votre frigo, pas sur un seul
          ingrédient.
        </p>
        <DownloadButtons />
      </div>
    </section>
  );
}
