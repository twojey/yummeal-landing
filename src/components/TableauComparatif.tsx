import type { AppComparee } from '../data/alternatives';
import { DATE_VERIFICATION } from '../data/alternatives';

/**
 * Tableau de critères d'un comparatif.
 *
 * Le site n'avait AUCUN `<table>` sur ses 164 pages, alors qu'un comparatif
 * sans tableau n'est extractible ni par un lecteur pressé ni par un moteur :
 * les faits restaient noyés dans de la prose.
 *
 * Trois choix tenus ici :
 *  - la colonne « Source » est visible, pas en note de bas de page. Un fait
 *    comparatif sans source n'a pas à être publié ;
 *  - la date de vérification est affichée dans la légende, parce qu'un tarif
 *    ou un mécanisme se périme et qu'une affirmation non datée devient fausse
 *    sans prévenir ;
 *  - Yummeal est signalé mais jamais placé en première ligne — l'ordre est
 *    celui du sujet, pas celui de notre intérêt.
 *
 * Le conteneur défile horizontalement : c'est la seule exception admise à la
 * règle « le corps de page ne défile jamais latéralement ».
 */
export default function TableauComparatif({ apps }: { apps: AppComparee[] }) {
  return (
    <figure className="my-10">
      <div className="overflow-x-auto clay-card p-0">
        <table className="w-full text-sm border-collapse min-w-[42rem]">
          <caption className="sr-only">
            Comparaison des mécanismes, modèles économiques et sources, vérifiée
            le {DATE_VERIFICATION}
          </caption>
          <thead>
            <tr className="bg-[#FFF3E4] text-left">
              <th scope="col" className="p-3 font-semibold">Application</th>
              <th scope="col" className="p-3 font-semibold">Éditeur</th>
              <th scope="col" className="p-3 font-semibold">Comment elle sait ce que vous avez</th>
              <th scope="col" className="p-3 font-semibold">Modèle économique</th>
              <th scope="col" className="p-3 font-semibold">Sa force</th>
              <th scope="col" className="p-3 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr
                key={app.nom}
                className={`border-t border-gray-200 align-top ${
                  app.estYummeal ? 'bg-[#FFFAF0]' : ''
                }`}
              >
                <th scope="row" className="p-3 font-semibold text-left whitespace-nowrap">
                  {app.nom}
                  {app.estYummeal && (
                    <span className="block text-xs font-normal text-[#FF8C42]">
                      c’est nous
                    </span>
                  )}
                </th>
                <td className="p-3 text-gray-700">{app.editeur}</td>
                <td className="p-3 text-gray-700">{app.mecanisme}</td>
                <td className="p-3 text-gray-700">{app.modele}</td>
                <td className="p-3 text-gray-700">{app.force}</td>
                <td className="p-3 text-gray-500 text-xs">{app.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 text-xs text-gray-500">
        Faits relevés sur les fiches éditeurs et les sites officiels, vérifiés le{' '}
        {DATE_VERIFICATION}. Les tarifs et les fonctionnalités changent : si vous
        constatez un écart, écrivez-nous et nous corrigerons la ligne.
      </figcaption>
    </figure>
  );
}
