/**
 * Pages produit fonctionnelles — une par mécanisme.
 *
 * Elles répondent aux requêtes du type « application qui fait Y »
 * (« app pour scanner son frigo », « app pour importer une recette TikTok »),
 * que les résultats de recherche attribuent à des pages produit et non à des
 * articles de blog. Le site n'en avait aucune : ces trois pages sont aussi les
 * seules à intention transactionnelle du dispositif.
 *
 * Règles d'écriture tenues ici, et à tenir pour toute page ajoutée :
 *  - aucune métrique de précision inventée. On décrit le mécanisme et ses
 *    limites, jamais un taux de reconnaissance qu'on n'a pas publié ;
 *  - on dit ce que la fonctionnalité NE fait pas. C'est ce qui rend la page
 *    citable, et c'est le seul contre-feu aux descriptions erronées ;
 *  - jamais « recettes générées par IA » : les recettes ne le sont pas ;
 *  - « gratuit » uniquement scopé au téléchargement.
 */

export interface Fonctionnalite {
  slug: string;
  /** Title SEO, sans le suffixe de marque (ajouté par le prerender si ça tient). */
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  /** Le mécanisme, étape par étape. */
  etapes: { titre: string; corps: string }[];
  /** Ce que ça ne fait pas / les limites réelles. */
  limites: string[];
  /** Questions réellement posées sur cette fonctionnalité. */
  faq: { question: string; reponse: string }[];
  ctaTitle: string;
  ctaText: string;
}

export const fonctionnalites: Fonctionnalite[] = [
  {
    slug: 'scanner-frigo',
    title: 'Scanner son frigo en photo pour trouver une recette',
    metaDescription:
      "Photographiez votre frigo : Yummeal reconnaît les ingrédients et ne propose que les recettes réalisables. Comment ça marche, et ses limites.",
    h1: 'Scanner son frigo en photo',
    intro:
      "Vous ouvrez l'appareil photo dans l'application, vous photographiez l'intérieur de votre frigo, et vous obtenez la liste des ingrédients reconnus — que vous pouvez corriger avant de lancer la recherche de recettes.",
    etapes: [
      {
        titre: 'La photo',
        corps:
          "Une seule photo de l'intérieur du frigo suffit, prise avec le téléphone. Il n'y a rien à connecter : l'application n'a pas besoin d'un réfrigérateur connecté, d'un lecteur de code-barres ou d'une carte de fidélité.",
      },
      {
        titre: 'La reconnaissance, puis la correction',
        corps:
          "Les ingrédients détectés vous sont présentés sous forme de liste. C'est une étape volontairement visible : vous retirez ce qui n'y est pas, vous ajoutez ce que la photo n'a pas vu, et c'est cette liste corrigée qui sert de base. L'application ne décide pas seule de ce que vous avez.",
      },
      {
        titre: 'Les recettes réellement réalisables',
        corps:
          "À partir de cette liste, l'application ne remonte pas un catalogue entier : elle trie les recettes selon ce que vous avez, et indique pour chacune combien d'ingrédients manquent quand il en manque. Une recette qui demande trois courses ne s'affiche pas au même niveau qu'une recette faisable tout de suite.",
      },
      {
        titre: 'Les substitutions',
        corps:
          "Quand un ingrédient manque, l'application propose un remplacement avec son dosage, plutôt que d'écarter la recette. C'est souvent ce qui fait la différence entre « rien à cuisiner » et un repas.",
      },
    ],
    limites: [
      "Un placard n'est pas un frigo : sel, huile, épices et condiments sont supposés présents par défaut, ce qui peut rendre une recette « réalisable » alors qu'il vous manque un basique.",
      "Ce qui est emballé, empilé ou au fond d'un bac peut ne pas être vu. C'est précisément pourquoi la liste détectée est corrigeable avant la recherche.",
      "L'application ne juge pas la fraîcheur ni la comestibilité de ce qu'elle voit. Pour les dates et la conservation, ce sont nos guides qui répondent, pas la photo.",
    ],
    faq: [
      {
        question: 'Faut-il un frigo connecté ?',
        reponse:
          "Non. La photo est prise avec le téléphone, quel que soit le réfrigérateur. Aucun appareil à appairer, aucune enseigne partenaire.",
      },
      {
        question: 'Faut-il tout photographier en une fois ?',
        reponse:
          "Non. Vous pouvez compléter la liste à la main après la photo, ou saisir directement vos ingrédients sans photographier quoi que ce soit.",
      },
      {
        question: 'Les recettes proposées sont-elles générées automatiquement ?',
        reponse:
          "Non. Les recettes sont écrites par des humains. Ce que fait l'application, c'est les trier et les filtrer selon ce que vous avez réellement.",
      },
    ],
    ctaTitle: 'Essayez sur votre frigo',
    ctaText:
      "Une photo, la liste corrigée en deux secondes, et les recettes que vous pouvez faire ce soir.",
  },
  {
    slug: 'import-recette-tiktok',
    title: 'Importer une recette TikTok ou Instagram dans un carnet',
    metaDescription:
      "Collez un lien TikTok, Instagram ou YouTube : Yummeal en extrait les ingrédients et les étapes. Comment ça marche, et ses limites.",
    h1: 'Importer une recette vue sur TikTok ou Instagram',
    intro:
      "Vous enregistrez des recettes en vidéo et vous ne les refaites jamais, parce qu'il faudrait rescruter la vidéo pour retrouver les quantités. L'import transforme un lien en recette structurée, avec ses ingrédients et ses étapes.",
    etapes: [
      {
        titre: 'Le lien',
        corps:
          "Vous collez l'URL d'une vidéo TikTok, d'un post ou d'un reel Instagram, ou d'une vidéo YouTube. Il n'y a rien à retaper.",
      },
      {
        titre: "L'extraction",
        corps:
          "La description et le texte associés à la vidéo sont analysés pour en sortir une liste d'ingrédients avec leurs quantités et une suite d'étapes. La recette devient alors utilisable comme les autres : lisible, modifiable, et prise en compte dans les recherches par ingrédients.",
      },
      {
        titre: 'La relecture',
        corps:
          "Une recette importée passe par une vérification avant d'être rangée, et le résultat vous est présenté pour que vous puissiez corriger une quantité ou une étape. Une extraction n'est jamais parfaite : c'est vous qui validez.",
      },
      {
        titre: 'Le carnet',
        corps:
          "Une fois importée, la recette rejoint vos recettes et entre dans le même calcul que les autres : si vous avez ses ingrédients, elle vous est proposée.",
      },
    ],
    limites: [
      "L'extraction s'appuie sur le texte publié avec la vidéo. Une vidéo dont la recette n'est dite qu'à l'oral, sans description ni texte à l'écran, donne un résultat pauvre — il faudra compléter à la main.",
      "Les quantités sont souvent absentes des publications sociales. Quand c'est le cas, l'import le signale au lieu d'inventer un nombre.",
      "Certaines plateformes restreignent l'accès aux contenus privés ou supprimés : un lien qui ne s'ouvre pas publiquement ne peut pas être importé.",
    ],
    faq: [
      {
        question: 'Est-ce que ça marche avec Instagram et YouTube ?',
        reponse:
          "Oui, en plus de TikTok. Le principe est le même : un lien public, dont le texte associé est analysé.",
      },
      {
        question: 'La recette importée est-elle modifiable ?',
        reponse:
          "Oui. Ingrédients, quantités et étapes sont éditables après import, et c'est recommandé quand la publication d'origine était imprécise.",
      },
      {
        question: "Que se passe-t-il si la vidéo ne donne pas les quantités ?",
        reponse:
          "L'import vous le signale plutôt que de combler le vide. Vous complétez les quantités manquantes, une fois, et la recette est ensuite utilisable telle quelle.",
      },
    ],
    ctaTitle: 'Videz vos recettes enregistrées',
    ctaText:
      "Collez un lien, obtenez une recette structurée, et refaites enfin ce que vous avez sauvegardé.",
  },
  {
    slug: 'photo-de-plat',
    title: "Estimer les calories d'un plat depuis une photo",
    metaDescription:
      "Photographiez une assiette pour obtenir une estimation de son contenu calorique, corrigeable à la main. Ce que cette estimation vaut, et ce qu'elle ne vaut pas.",
    h1: "Estimer un plat depuis une photo",
    intro:
      "Vous photographiez une assiette et vous obtenez une estimation de ce qu'elle contient. Le mot important est estimation : le résultat est modifiable, et c'est ainsi qu'il faut le lire.",
    etapes: [
      {
        titre: 'La photo du plat',
        corps:
          "Une photo de l'assiette suffit. L'analyse identifie les aliments visibles et propose une estimation de portions et d'apport calorique.",
      },
      {
        titre: 'La correction',
        corps:
          "L'estimation vous est présentée pour édition : vous ajustez une portion, corrigez un aliment mal identifié, retirez ce qui n'y est pas. C'est votre correction qui compte, pas la première proposition.",
      },
      {
        titre: 'Le suivi',
        corps:
          "Le plat corrigé rejoint votre journée. L'intérêt n'est pas la précision au gramme, c'est de garder un ordre de grandeur sans ressaisir chaque ingrédient à la main.",
      },
    ],
    limites: [
      "Une photo ne montre ni la matière grasse de cuisson, ni ce qui est caché sous la surface, ni le poids réel des portions. L'écart avec la réalité peut être important, dans un sens comme dans l'autre.",
      "Ce n'est pas un outil médical ni diététique. Les chiffres sont des repères généraux, pas une prescription, et ils ne remplacent pas l'avis d'un professionnel.",
      "Pour un plat que vous cuisinez avec une recette de l'application, le calcul part des ingrédients réels — c'est toujours plus fiable qu'une photo.",
    ],
    faq: [
      {
        question: "L'estimation est-elle précise ?",
        reponse:
          "C'est une estimation, pas une mesure. Elle donne un ordre de grandeur utile pour suivre une tendance, et elle est corrigeable dès qu'elle se trompe.",
      },
      {
        question: 'Peut-on corriger le résultat ?',
        reponse:
          "Oui, et c'est prévu pour : aliments, portions et valeurs sont éditables après l'analyse.",
      },
      {
        question: 'Faut-il photographier chaque repas ?',
        reponse:
          "Non. La photo sert quand vous n'avez pas cuisiné vous-même. Pour un plat fait avec une recette de l'application, le calcul se fait à partir des ingrédients.",
      },
    ],
    ctaTitle: 'Un repas, une photo',
    ctaText:
      "Gardez un ordre de grandeur de ce que vous mangez sans tout ressaisir à la main.",
  },
];

import { fonctionnalitesPl } from './fonctionnalites.pl';
import type { Locale } from '../i18n/config';

/**
 * Les pages produit, dans une langue. Les slugs sont identiques d'une langue
 * à l'autre : c'est ce qui rend l'appariement `hreflang` trivial et
 * vérifiable (voir le commentaire de fonctionnalites.pl.ts).
 */
const PAR_LOCALE: Record<Locale, Fonctionnalite[]> = {
  fr: fonctionnalites,
  pl: fonctionnalitesPl,
};

export function fonctionnalitesDe(locale: Locale): Fonctionnalite[] {
  return PAR_LOCALE[locale];
}

export function getFonctionnalite(
  slug: string,
  locale: Locale = 'fr'
): Fonctionnalite | undefined {
  return PAR_LOCALE[locale].find((f) => f.slug === slug);
}
