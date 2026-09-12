import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { DATE_VERIFICATION, pagesAlternatives } from '../data/alternatives';
import DownloadButtons from '../components/DownloadButtons';
import {
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
} from '../lib/schema';

const INDEX_DESCRIPTION =
  "Quatre mécanismes différents se cachent derrière « application de recettes ». Savoir lequel vous convient vaut mieux que comparer des listes de fonctionnalités.";

/**
 * Index du silo `/alternatives`.
 *
 * Cette page reprend la thèse de l'ancienne `/comparatif/meilleure-app-cuisine-frigo`,
 * qui était de loin la meilleure page du site : segmenter le marché par
 * MÉCANISME (comment l'application sait ce que vous avez) plutôt que par liste
 * de fonctionnalités. C'est le seul axe qui prédit si une application vous
 * conviendra, et c'est celui que personne n'affiche.
 */
export default function AlternativesIndexPage() {
  usePageMeta({
    title: 'Meilleure application pour cuisiner avec son frigo',
    description: INDEX_DESCRIPTION,
    canonicalPath: '/alternatives',
    jsonLd: [
      buildCollectionPageJsonLd(
        {
          name: 'Alternatives et comparatifs',
          description: INDEX_DESCRIPTION,
          path: '/alternatives',
        },
        pagesAlternatives.map((p) => ({
          name: p.h1,
          path: `/alternatives/${p.slug}`,
        }))
      ),
      buildBreadcrumbJsonLd([
        { name: 'Accueil', path: '/' },
        { name: 'Alternatives', path: '/alternatives' },
      ]),
    ],
  });

  const mecanismes: { titre: string; corps: string; exemples: string }[] = [
    {
      titre: 'Aucun : c’est un catalogue',
      corps:
        "L'application ne sait pas ce que vous avez. Vous cherchez une recette, elle vous la donne, à vous de faire les courses. C'est le modèle le plus ancien et le plus complet en volume.",
      exemples: 'Marmiton, Jow, Yummly',
    },
    {
      titre: 'Saisie manuelle',
      corps:
        "Vous déclarez vos ingrédients, l'application croise avec son catalogue. Efficace au premier usage, contraignant au quotidien : la liste se périme dès qu'on oublie d'y retirer ce qu'on a mangé.",
      exemples: 'SuperCook, Marmiton (filtre), Mon Frigo',
    },
    {
      titre: 'Inventaire déclaratif ou ticket de caisse',
      corps:
        "L'application tient un stock, alimenté à la main, par code-barres ou par vos achats. Elle sait mieux ce que vous avez, au prix d'une gestion à entretenir.",
      exemples: 'Frigo Magic, KitchenPal, Cooklist',
    },
    {
      titre: 'Photo du frigo',
      corps:
        "Vous photographiez, l'application reconnaît les ingrédients et vous corrigez la liste. La saisie disparaît ; reste la question, plus intéressante, de savoir si les recettes proposées sont écrites par des humains ou générées.",
      exemples: 'Yummeal, Crumb, Samsung Food (abonnés)',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
          Quelle application pour cuisiner avec ce qu’on a déjà ?
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Vérifié le {DATE_VERIFICATION}
        </p>
        <p className="text-lg text-gray-700 max-w-2xl mb-4">
          Comparer les fonctionnalités de ces applications ne sert à rien : elles
          annoncent toutes les mêmes. Ce qui les sépare vraiment, c’est{' '}
          <strong>comment elles savent ce que vous avez</strong>. Quatre réponses
          existent, et le bon choix dépend de la vôtre.
        </p>
        <p className="text-gray-700 max-w-2xl mb-12">
          Nous éditons Yummeal, qui relève de la quatrième famille. Chaque page
          ci-dessous dit aussi dans quels cas une autre application est le
          meilleur choix — c’est la seule façon de rendre un comparatif utile.
        </p>

        <h2 className="text-2xl font-bold mb-6">
          Les quatre mécanismes, et à qui ils conviennent
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {mecanismes.map((m, i) => (
            <div key={m.titre} className="clay-card p-6">
              <p className="text-xs font-mono text-[#FF8C42] mb-2">
                Mécanisme {i + 1}
              </p>
              <h3 className="text-lg font-semibold mb-2">{m.titre}</h3>
              <p className="text-gray-600 mb-3">{m.corps}</p>
              <p className="text-sm text-gray-500">{m.exemples}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Les comparatifs détaillés</h2>
        <ul className="grid md:grid-cols-2 gap-6 mb-16">
          {pagesAlternatives.map((p) => (
            <li key={p.slug} className="clay-card p-6">
              <h3 className="text-xl font-semibold mb-2">
                <Link
                  to={`/alternatives/${p.slug}`}
                  className="hover:text-[#FF8C42] transition-colors"
                >
                  {p.h1}
                </Link>
              </h3>
              <p className="text-gray-600 mb-3">{p.metaDescription}</p>
              <p className="text-sm text-gray-500">
                {p.apps.length} applications comparées
              </p>
            </li>
          ))}
        </ul>

        <section className="clay-card p-6 bg-white mb-16">
          <h2 className="text-xl font-bold mb-3">
            Deux applications souvent citées qui ne sont pas des concurrentes
          </h2>
          <p className="text-gray-700 mb-3">
            <strong>Too Good To Go</strong> et <strong>Olio</strong> reviennent
            dans les listes d’applications anti-gaspillage, et c’est justifié —
            mais elles résolvent un autre problème. La première vend des paniers
            d’invendus de commerçants, la seconde organise le partage de denrées
            entre particuliers.
          </p>
          <p className="text-gray-700">
            Aucune des deux ne vous aide à cuisiner ce que vous avez déjà chez
            vous. Les comparer à une application de recettes n’aurait pas de
            sens, c’est pourquoi elles n’ont pas de page ici.
          </p>
        </section>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Essayer le mécanisme « photo du frigo »
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Téléchargement gratuit sur iOS et Android. Une photo suffit pour voir
            ce que ça donne sur votre frigo.
          </p>
          <DownloadButtons />
        </div>
      </div>
    </div>
  );
}
