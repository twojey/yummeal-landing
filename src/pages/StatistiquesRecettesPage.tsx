import { usePageMeta } from '../hooks/usePageMeta';
import DownloadButtons from '../components/DownloadButtons';
import { buildDatasetJsonLd, buildBreadcrumbJsonLd, buildOrganizationJsonLd } from '../lib/schema';
import donnees from '../data/statistiquesRecettes.json';

const CSV_PATH = '/datasets/statistiques-recettes-par-difficulte.csv';
const PATH = '/statistiques-recettes';

/**
 * Asset « linkable » : pas une page d'atterrissage produit, une source de
 * données que d'autres sites/journalistes ont une raison de citer (cf. la
 * discussion GEO/SEO du 23/09 — le contenu éditorial rédigé à la main type
 * /recettes-avec n'attire pas de backlink, une page de statistiques
 * agrégées si elle est plus complète que l'existant, si).
 *
 * Chaque chiffre vient de src/data/statistiquesRecettes.json, généré par
 * scripts/build-statistiques-recettes.mjs — jamais recalculé ni arrondi
 * différemment ici, pour que la page et le CSV téléchargeable ne divergent
 * jamais.
 */
export default function StatistiquesRecettesPage() {
  const { _meta, parDifficulte, nonClasse } = donnees;

  usePageMeta({
    title: 'Statistiques du catalogue de recettes par difficulté - Yummeal',
    description: `Temps de préparation et calories médians par niveau de difficulté, calculés sur ${_meta.total_recettes_analysees} recettes. Dataset téléchargeable en CSV.`,
    canonicalPath: PATH,
    jsonLd: [
      buildDatasetJsonLd({
        path: PATH,
        dateGeneration: _meta.genere_le,
        nombreRecettes: _meta.total_recettes_analysees,
        csvPath: CSV_PATH,
      }),
      buildOrganizationJsonLd(),
      buildBreadcrumbJsonLd([
        { name: 'Accueil', path: '/' },
        { name: 'Statistiques du catalogue de recettes', path: PATH },
      ]),
    ],
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
          Statistiques du catalogue de recettes par difficulté
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Temps de préparation et calories médians, calculés directement sur{' '}
          <strong>{_meta.total_recettes_analysees} recettes</strong> du
          catalogue Yummeal — pas une estimation, le résultat réel d'une
          requête sur la base.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Dernier calcul : {_meta.genere_le}.{' '}
          <a
            href={CSV_PATH}
            className="text-[#FF8C42] underline"
            download
          >
            Télécharger le dataset complet (CSV)
          </a>
        </p>

        <div className="clay-card p-6 mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="py-2 pr-4">Difficulté</th>
                <th className="py-2 pr-4">Recettes analysées</th>
                <th className="py-2 pr-4">Temps de préparation médian</th>
                <th className="py-2">Calories médianes / portion</th>
              </tr>
            </thead>
            <tbody>
              {parDifficulte.map((ligne) => (
                <tr key={ligne.difficulte} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-gray-800">
                    {ligne.label}
                  </td>
                  <td className="py-3 pr-4 tabular-nums">{ligne.n}</td>
                  <td className="py-3 pr-4 tabular-nums">
                    {ligne.medianePrepMinutes} min
                  </td>
                  <td className="py-3 tabular-nums">
                    {ligne.medianeCaloriesParPortion} kcal{' '}
                    <span className="text-xs text-gray-400">
                      (n={ligne.nCalories})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="clay-card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Méthodologie</h2>
          <ul className="space-y-2 text-gray-600 text-sm leading-relaxed">
            <li>
              • Source : table des recettes du catalogue Yummeal (Supabase),
              hors recettes marquées comme rejetées en modération.
            </li>
            <li>
              • Les calories sont enregistrées par recette entière, pas par
              portion : on les divise par le nombre de portions déclaré, en
              excluant les ratios hors de la plage 30–3000 kcal/portion
              (fiches condiment comptées comme un plat, ou plats agrégés sur
              une seule portion) — environ 5 % des recettes.
            </li>
            <li>
              • Les valeurs sont des médianes, pas des moyennes : plus
              robustes à la queue longue qui subsiste après ce filtre.
            </li>
            <li>
              • {nonClasse.n} recettes n'ont aucune difficulté renseignée en
              base ({nonClasse.nCalories} avec des calories exploitables) —
              exclues du tableau, pas masquées : elles existent dans le
              catalogue, simplement pas classées.
            </li>
            <li>
              • « Intermédiaire » (n={
                parDifficulte.find((l) => l.difficulte === 'intermediate')?.n
              }) affiche un temps médian plus élevé que « Difficile » (n={
                parDifficulte.find((l) => l.difficulte === 'hard')?.n
              }) : avec ces effectifs, on ne peut pas dire si c'est un vrai
              écart ou du bruit d'échantillon — la page le montre tel quel
              plutôt que de lisser les deux catégories entre elles.
            </li>
          </ul>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Ces chiffres viennent d'une vraie application
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Yummeal trie ce catalogue de recettes selon ce que vous avez déjà
            dans votre frigo.
          </p>
          <DownloadButtons />
        </div>
      </div>
    </div>
  );
}
