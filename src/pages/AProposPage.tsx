import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import DownloadButtons from '../components/DownloadButtons';
import { CONTACT_EMAIL, STORE_URLS } from '../config';
import { useLocale } from '../i18n/useLocale';
import { cheminLocalise } from '../i18n/config';
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

/**
 * Les fiches des fonctionnalités renvoient vers les pages produit. Le lien
 * est positionnel (l'ordre du tableau), pas textuel : il reste juste quand la
 * traduction change les mots. `null` = pas de page dédiée.
 */
const SLUGS_FONCTIONS = [
  'scanner-frigo',
  'import-recette-tiktok',
  'photo-de-plat',
  null,
] as const;

export default function AProposPage() {
  const { locale, t } = useLocale();
  const a = t.aPropos;
  const racine = cheminLocalise('', locale);

  const identite: Array<{ label: string; valeur: React.ReactNode }> = [
    { label: a.labels.editeur, valeur: 'YIDLA' },
    { label: a.labels.siren, valeur: '898 271 184' },
    { label: a.labels.siret, valeur: '898 271 184 00019' },
    { label: a.labels.tva, valeur: 'FR13898271184' },
    { label: a.labels.greffe, valeur: 'RCS Versailles' },
    {
      label: a.labels.contact,
      valeur: (
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#FF8C42] underline">
          {CONTACT_EMAIL}
        </a>
      ),
    },
    {
      // L'identifiant App Store est l'information utile ici — c'est lui qui
      // distingue cette application de ses homonymes. Le LIEN, en revanche,
      // mène à une 404 pour un visiteur polonais : l'application iOS n'est
      // distribuée que dans la boutique française (voir STORE_URLS dans
      // src/config.ts). Dans cette langue on garde donc le fait et on retire
      // le lien, au lieu de proposer un clic qui échoue.
      label: a.labels.appIos,
      valeur: STORE_URLS[locale].apple ? (
        <a
          href={STORE_URLS[locale].apple ?? undefined}
          className="text-[#FF8C42] underline"
          rel="noopener"
        >
          App Store — id6744942441
        </a>
      ) : (
        <span>App Store — id6744942441</span>
      ),
    },
    {
      label: a.labels.appAndroid,
      valeur: (
        <a
          href={STORE_URLS[locale].google}
          className="text-[#FF8C42] underline"
          rel="noopener"
        >
          Google Play — com.yummeal
        </a>
      ),
    },
  ];

  usePageMeta({
    title: a.title,
    description: a.description,
    canonicalPath: cheminLocalise('/a-propos', locale),
    jsonLd: [
      buildAboutPageJsonLd(),
      buildOrganizationJsonLd(),
      buildMobileApplicationJsonLd(),
      buildBreadcrumbJsonLd([
        { name: t.nav.accueil, path: racine },
        { name: a.fil, path: cheminLocalise('/a-propos', locale) },
      ]),
    ],
  });

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          {a.h1}
        </h1>
        <p className="text-lg text-gray-700 mb-4">{a.intro}</p>
        <p className="text-gray-700 mb-12">{a.modele}</p>

        <h2 className="text-2xl font-bold mb-6">{a.ceQueCaFait}</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {a.fonctions.map((f, i) => {
            const slug = SLUGS_FONCTIONS[i];
            return (
              <div key={f.titre} className="clay-card p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {slug ? (
                    <Link
                      to={cheminLocalise(`/fonctionnalites/${slug}`, locale)}
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
            );
          })}
        </div>

        <h2 className="text-2xl font-bold mb-3">{a.ceQueCaNeFaitPas}</h2>
        <p className="text-gray-700 mb-5">{a.neFaitPasIntro}</p>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-14">
          {a.neFaitPas.map((n) => (
            <li key={n.slice(0, 40)}>{n}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold mb-3">{a.confusionTitre}</h2>
        <p className="text-gray-700 mb-14">
          <strong>« Yummeal »</strong> {a.confusionCorps}{' '}
          <span className="font-mono">6744942441</span> {a.confusionEtPlay}{' '}
          <span className="font-mono">com.yummeal</span>.
        </p>

        <h2 className="text-2xl font-bold mb-6">{a.identiteTitre}</h2>
        <dl className="mb-14 divide-y divide-gray-200">
          {identite.map((item) => (
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

        {/* Les silos éditoriaux (/concept, /alternatives) et les pages légales
            n'existent qu'en français. On ne renvoie donc pas un lecteur
            polonais vers eux sans le prévenir : dans sa langue, on lie les
            pages produit traduites, et les pages légales portent la mention
            « po francusku » — voir le pied de page, même règle. */}
        <p className="text-gray-700 mb-10">
          {a.voirAussi}{' '}
          {locale === 'fr' ? (
            <>
              <Link to="/concept" className="text-[#FF8C42] underline">
                le concept derrière l’application
              </Link>
              ,{' '}
              <Link to="/alternatives" className="text-[#FF8C42] underline">
                les comparatifs avec d’autres applications
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
            </>
          ) : (
            <>
              <Link
                to={cheminLocalise('/fonctionnalites', locale)}
                className="text-[#FF8C42] underline"
              >
                {t.fonctionnalites.indexH1}
              </Link>
              {'. '}
              <Link to="/cgu" className="text-[#FF8C42] underline" hrefLang="fr-FR">
                {t.pied.cgu}
              </Link>{' '}
              <span className="text-gray-500">({t.pied.enFrancais})</span>
              {', '}
              <Link
                to="/confidentialite"
                className="text-[#FF8C42] underline"
                hrefLang="fr-FR"
              >
                {t.pied.confidentialite}
              </Link>{' '}
              <span className="text-gray-500">({t.pied.enFrancais})</span>.
            </>
          )}
        </p>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{a.essayer}</h2>
          <DownloadButtons />
        </div>
      </div>
    </div>
  );
}
