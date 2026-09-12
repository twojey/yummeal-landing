/**
 * Dictionnaire français — la RÉFÉRENCE. Son type `Dictionnaire` est dérivé de
 * ce fichier, donc toute clé ajoutée ici devient obligatoire dans les autres
 * langues : une traduction incomplète ne compile pas. C'est le seul garde-fou
 * qui tient dans le temps sur un site multilingue.
 *
 * Deux corrections de fond passées au moment de l'extraction, notées ici pour
 * qu'on sache que ce ne sont pas des coquilles :
 *
 * 1. « Yummeal génère instantanément des recettes » → « vous montre les
 *    recettes réalisables ». L'application ne GÉNÈRE pas de recettes : elles
 *    sont écrites par des humains, elle les trie. La formulation d'origine
 *    disait exactement ce que toute notre communication s'interdit, et elle
 *    était sur la page d'accueil.
 *
 * 2. « Rejoignez des milliers d'utilisateurs » → formulation sans chiffre. Le
 *    nombre n'est pas vérifiable publiquement (6 notes sur l'App Store), et
 *    une preuve sociale chiffrée qu'on ne peut pas étayer se retourne contre
 *    le produit. Reformulé plutôt que propagé dans une deuxième langue.
 */

export const fr = {
  langue: {
    choisir: 'Langue',
    // Nom de CETTE langue vu depuis les autres, pour le sélecteur.
    nom: 'Français',
  },

  nav: {
    accueil: 'Accueil',
    fonctionnalites: 'Fonctionnalités',
    aPropos: 'À propos',
    alternatives: 'Alternatives',
    telecharger: 'Télécharger',
    commentCaMarche: 'Comment ça marche ?',
    faq: 'FAQ',
  },

  cta: {
    appStore: "Télécharger sur l'App Store",
    googlePlay: 'Disponible sur Google Play',
  },

  accueil: {
    title: "Yummeal - Cuisiner sain avec ce qu'il y a dans votre frigo",
    description:
      'Yummeal transforme votre frigo en recettes réalisables : cuisinez sainement, sans gaspiller. Téléchargement gratuit sur iOS et Android.',
    h1Ligne1: 'Libérez-vous de la',
    h1Ligne2: 'charge mentale des repas',
    accroche:
      'Transformez votre frigo en inspiration culinaire et retrouvez le plaisir de cuisiner sainement, sans gaspillage ni frustration.',
    // Alternative de l'image du hero. Elle décrit la SCÈNE, pas le produit :
    // c'est ce qu'attend un lecteur d'écran, et ce que lit un moteur.
    altHero:
      'Une femme prépare un panier de courses fraîches et anti-gaspi avec Yummeal',

    atoutsTitre: 'Yummeal : la solution complète pour vos repas',
    atouts: [
      {
        titre: 'Inspiration instantanée et anti-gaspi',
        corps:
          'Scannez votre frigo : Yummeal vous montre les recettes réalisables avec ce que vous avez déjà, et vous dit combien d’ingrédients manquent quand il en manque.',
      },
      {
        titre: 'Nutrition intuitive et équilibrée',
        corps:
          'Mangez sainement sans compter. Yummeal vous guide vers une alimentation équilibrée, adaptée à vos objectifs, sans restriction ni culpabilité.',
      },
      {
        titre: 'Cuisine simple et savoureuse',
        corps:
          'Des recettes rapides, en moins de 30 minutes, et faciles à réaliser même sans être un cordon-bleu. Retrouvez le plaisir de cuisiner.',
      },
      {
        titre: 'Adapté à vos besoins',
        corps:
          'Végétarien, sans gluten, gestion du poids : Yummeal s’adapte à vos préférences et à vos régimes, pour des repas qui vous ressemblent.',
      },
    ],

    parcoursTitre: 'Votre parcours, simplifié',
    parcours: [
      {
        titre: 'Scannez votre frigo',
        corps:
          'Prenez une photo de vos ingrédients, et laissez Yummeal reconnaître ce que vous avez. Vous corrigez la liste en deux secondes.',
      },
      {
        titre: 'Recettes adaptées',
        corps:
          'Vous recevez les recettes faisables avec vos ingrédients et vos préférences — pas un catalogue entier.',
      },
      {
        titre: 'Cuisinez et savourez',
        corps:
          'Suivez les étapes, cuisinez simplement, et régalez-vous sans rien jeter.',
      },
    ],

    finalTitre: 'Prêt à transformer votre quotidien ?',
    finalCorps:
      'Rejoignez celles et ceux qui ont retrouvé la sérénité en cuisine avec Yummeal.',

    faqTitre: 'Questions fréquentes',
    faq: [
      {
        q: "Je n'ai pas beaucoup de temps pour cuisiner, Yummeal est-il vraiment rapide ?",
        a: 'Oui. Nos recettes sont pensées pour être simples et rapides, même pour les emplois du temps chargés. En moins de 30 minutes, un repas sain est prêt.',
      },
      {
        q: "Est-ce que je dois peser mes aliments dans l'application ?",
        a: "Non. Yummeal n'exige ni pesée ni comptage de calories. L'objectif est de retrouver une relation sereine avec la nourriture.",
      },
      {
        q: 'Puis-je utiliser Yummeal si je suis végétarien ou sans gluten ?',
        a: "Oui. Yummeal s'adapte à vos préférences et à vos régimes (végétarien, sans gluten, sans lactose…) et filtre les recettes en conséquence.",
      },
      {
        q: 'Puis-je ajouter mes propres recettes ?',
        a: 'Oui. Vous pouvez importer vos recettes depuis un lien TikTok, Instagram ou YouTube, les modifier, et les retrouver dans votre carnet.',
      },
    ],
  },

  fonctionnalites: {
    // Libellés d'interface des pages produit. Le CONTENU de ces pages vit
    // dans src/data/fonctionnalites{,.pl}.ts : seule l'ossature est ici.
    fil: 'Fonctionnalités',
    indexTitle: 'Fonctionnalités de Yummeal — les trois mécanismes',
    indexDescription:
      'Les trois mécanismes de Yummeal et leurs limites : scanner son frigo, importer une recette TikTok, estimer un plat en photo.',
    indexH1: 'Ce que fait Yummeal, mécanisme par mécanisme',
    indexIntro:
      'Trois fonctions, expliquées avec ce qu’elles font et ce qu’elles ne font pas. Pas de promesse au-delà du réel : c’est plus utile pour décider si l’application vous convient.',
    indexCollection: 'Fonctionnalités',
    indexCta: 'Le plus simple reste de l’essayer',
    commentCaMarche: 'Comment ça marche',
    ceQueCaNeFaitPas: 'Ce que ça ne fait pas',
    limitesIntro:
      'Les limites réelles, pour que vous sachiez à quoi vous attendre.',
    questions: 'Questions fréquentes',
    autres: 'Les autres fonctionnalités',
  },

  pied: {
    guides: 'Guides anti-gaspi',
    application: "L'application",
    cuisine: 'Cuisine pratique',
    enSavoirPlus: 'En savoir plus',
    marque: 'Yummeal',
    droits: 'Yummeal, tous droits réservés',
    legal: 'Informations légales',
    confidentialite: 'Politique de confidentialité',
    cgu: 'Conditions générales d’utilisation',
    // Sert à signaler qu'un lien mène à une page qui n'existe qu'en français.
    // Prévenir avant le clic vaut mieux qu'une page dans la mauvaise langue.
    supprimerCompte: 'Supprimer mon compte',
    enFrancais: 'en français',
  },
};

/**
 * Forme imposée à toute autre langue. Volontairement SANS `as const` : on veut
 * contraindre la structure (les clés), pas les valeurs — sinon le polonais
 * devrait être littéralement identique au français.
 */
export type Dictionnaire = typeof fr;
