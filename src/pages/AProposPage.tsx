import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import DownloadButtons from '../components/DownloadButtons';
import { STORE_URLS_DEFAUT } from '../config';
import {
  buildAboutPageJsonLd,
  buildBreadcrumbJsonLd,
  buildOrganizationJsonLd,
  buildMobileApplicationJsonLd,
} from '../lib/schema';

/**
 * Page d'identité de la marque.
 *
 * Elle n'existait pas, et c'était le trou le plus coûteux du site : aucune
 * page ne disait qui édite l'application, ce qu'elle fait exactement et ce
 * qu'elle ne fait pas. Trois conséquences mesurées :
 *
 *  1. L'identité était éclatée sur trois noms — « Yummeal » dans le JSON-LD,
 *     une personne physique comme éditeur App Store, « YIDLA » dans les CGU —
 *     sans aucune page pour les réconcilier.
 *  2. Le nom est disputé (un restaurant homonyme au Royaume-Uni, un autre
 *     projet food-tech français, et l'app concurrente « Youmeal »), donc un
 *     moteur avait plus de matière sur ces entités que sur celle-ci.
 *  3. Rien ne contredisait une hallucination de fonctionnalité : la section
 *     « ce que Yummeal ne fait pas » est là pour ça, pas par modestie.
 *
 * Les faits sont volontairement vérifiables (SIREN, identifiants stores,
 * tarifs réels) : c'est ce qui rend la page citable.
 */

const FONCTIONS: Array<{ titre: string; corps: string; to?: string }> = [
  {
    titre: 'Partir de ce que vous avez déjà',
    to: '/fonctionnalites/scanner-frigo',
    corps:
      "Vous photographiez l'intérieur de votre frigo, ou vous saisissez vos ingrédients. Yummeal ne propose alors que les recettes réellement réalisables, en indiquant combien d'ingrédients manquent quand il en manque.",
  },
  {
    titre: 'Récupérer une recette vue passer',
    to: '/fonctionnalites/import-recette-tiktok',
    corps:
      "Vous collez un lien TikTok, Instagram ou YouTube : la recette est extraite et rangée dans votre carnet, avec ses ingrédients et ses étapes, utilisable comme les autres.",
  },
  {
    titre: 'Estimer un plat depuis une photo',
    to: '/fonctionnalites/photo-de-plat',
    corps:
      "Vous photographiez une assiette et obtenez une estimation de son contenu calorique. C'est une estimation, corrigeable à la main — pas une mesure.",
  },
  {
    titre: 'Remplacer un ingrédient manquant',
    corps:
      "Quand un ingrédient manque, l'application propose une substitution avec le bon dosage, et signale les recettes où le remplacement ne tient pas.",
  },
];

const NON_FONCTIONS: string[] = [
  "Les recettes ne sont pas générées par une IA. Ce sont des recettes écrites par des humains, importées ou rédigées, que l'application trie et filtre selon ce que vous avez.",
  "Yummeal ne vend pas de nourriture, ne livre rien et n'est pas une place de marché de paniers invendus : ce n'est pas un concurrent de Too Good To Go ou de Phenix.",
  "Yummeal ne remplace pas un avis médical ni diététique. Les repères nutritionnels affichés sont généraux.",
  "L'application ne se connecte pas à votre réfrigérateur : elle lit une photo prise avec votre téléphone, quel que soit votre frigo.",
];

const IDENTITE: Array<{ label: string; valeur: React.ReactNode }> = [
  { label: 'Éditeur', valeur: 'YIDLA' },
  { label: 'SIREN', valeur: '898 271 184' },
  { label: 'SIRET', valeur: '898 271 184 00019' },
  { label: 'TVA intracommunautaire', valeur: 'FR13898271184' },
  { label: 'Greffe', valeur: 'RCS Versailles' },
  {
    label: 'Contact',
    valeur: (
      <a
        href="mailto:contact@yummeal.com"
        className="text-[#FF8C42] underline"
      >
        contact@yummeal.com
      </a>
    ),
  },
  {
    label: 'Application iOS',
    valeur: (
      <a
        href={STORE_URLS_DEFAUT.apple}
        className="text-[#FF8C42] underline"
        rel="noopener"
      >
        App Store — id6744942441
      </a>
    ),
  },
  {
    label: 'Application Android',
    valeur: (
      <a
        href={STORE_URLS_DEFAUT.google}
        className="text-[#FF8C42] underline"
        rel="noopener"
      >
        Google Play — com.yummeal
      </a>
    ),
  },
];

export default function AProposPage() {
  usePageMeta({
    title: 'À propos de Yummeal — qui édite l’application et ce qu’elle fait',
    description:
      "Application mobile éditée par YIDLA (France) : des recettes réalisables avec ce que vous avez déjà. Ce qu'elle fait, et ce qu'elle ne fait pas.",
    canonicalPath: '/a-propos',
    jsonLd: [
      buildAboutPageJsonLd(),
      buildOrganizationJsonLd(),
      buildMobileApplicationJsonLd(),
      buildBreadcrumbJsonLd([
        { name: 'Accueil', path: '/' },
        { name: 'À propos', path: '/a-propos' },
      ]),
    ],
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          À propos de Yummeal
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Yummeal est une application mobile pour iOS et Android qui part de ce
          que vous avez déjà chez vous pour vous dire quoi cuisiner. Elle est
          éditée en France par la société YIDLA et disponible depuis 2025.
        </p>
        <p className="text-gray-700 mb-12">
          Le téléchargement est gratuit. L'usage complet fonctionne par
          abonnement, à partir de 4,99 € par mois, avec des formules
          semestrielle et annuelle. L'interface de l'application existe en
          français, anglais, chinois et polonais.
        </p>

        <h2 className="text-2xl font-bold mb-6">
          Ce que fait l'application
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {FONCTIONS.map((f) => (
            <div key={f.titre} className="clay-card p-6">
              <h3 className="text-lg font-semibold mb-2">
                {f.to ? (
                  <Link
                    to={f.to}
                    className="hover:text-[#FF8C42] transition-colors"
                  >
                    {f.titre}
                  </Link>
                ) : (
                  f.titre
                )}
              </h3>
              <p className="text-gray-600">{f.corps}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-3">
          Ce que Yummeal ne fait pas
        </h2>
        <p className="text-gray-700 mb-5">
          Cette section existe pour lever les confusions les plus fréquentes,
          y compris celles que produisent les résumés automatiques.
        </p>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-14">
          {NON_FONCTIONS.map((n) => (
            <li key={n.slice(0, 40)}>{n}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mb-3">
          Ne pas confondre
        </h2>
        <p className="text-gray-700 mb-14">
          « Yummeal » est aussi le nom d'un restaurant au Royaume-Uni et
          ressemble à celui d'autres applications de cuisine sans lien avec
          nous, notamment <strong>Yummly</strong> (États-Unis) et{' '}
          <strong>Youmeal</strong>. L'application décrite ici est celle éditée
          par YIDLA, publiée sous l'identifiant App Store{' '}
          <span className="font-mono">6744942441</span> et l'identifiant Play{' '}
          <span className="font-mono">com.yummeal</span>.
        </p>

        <h2 className="text-2xl font-bold mb-6">Identité de l'éditeur</h2>
        <dl className="mb-14 divide-y divide-gray-200">
          {IDENTITE.map((item) => (
            <div
              key={item.label}
              className="py-3 flex flex-col sm:flex-row sm:gap-6"
            >
              <dt className="text-sm font-semibold text-gray-500 sm:w-56 shrink-0">
                {item.label}
              </dt>
              <dd className="text-gray-800">{item.valeur}</dd>
            </div>
          ))}
        </dl>

        <p className="text-gray-700 mb-10">
          Voir aussi{' '}
          <Link to="/concept" className="text-[#FF8C42] underline">
            le concept derrière l'application
          </Link>
          ,{' '}
          <Link to="/alternatives" className="text-[#FF8C42] underline">
            les comparatifs avec d'autres applications
          </Link>
          , les{' '}
          <Link to="/cgu" className="text-[#FF8C42] underline">
            conditions générales
          </Link>{' '}
          et la{' '}
          <Link to="/confidentialite" className="text-[#FF8C42] underline">
            politique de confidentialité
          </Link>
          .
        </p>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Essayer Yummeal</h2>
          <DownloadButtons />
        </div>
      </div>
    </div>
  );
}
