export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  ctaTitle: string;
  ctaText: string;
}

export const articles: Article[] = [
  {
    slug: 'algorithme-anti-gaspi-yummeal-fonctionnement',
    title: "Comment fonctionne l'anti-gaspi de Yummeal ?",
    metaDescription:
      "Scan du frigo, reconnaissance des ingrédients, recettes personnalisées : voici comment Yummeal transforme ce que vous avez déjà en repas, sans gaspillage.",
    intro:
      "Yummeal part d'un principe simple : le gaspillage alimentaire commence souvent par un manque d'inspiration, pas par un manque de bonne volonté. Voici, sans jargon technique, comment l'application transforme le contenu réel de votre frigo en idées de repas concrètes.",
    sections: [
      {
        heading: 'Étape 1 : scanner ce que vous avez déjà',
        body: [
          "Tout part d'une photo de votre frigo, de vos placards ou de vos courses. Pas besoin de saisir une liste d'ingrédients à la main : Yummeal se base sur ce qui est réellement présent chez vous, y compris les restes et les fonds de paquet qu'on oublie facilement.",
          "L'idée est de partir de l'existant plutôt que de vous pousser à acheter de nouveaux produits pour suivre une recette. C'est cette inversion — cuisiner avec ce qu'on a, plutôt que d'acheter ce qu'il faut pour une recette choisie à l'avance — qui limite le gaspillage à la source.",
        ],
      },
      {
        heading: 'Étape 2 : reconnaître les ingrédients',
        body: [
          "À partir de la photo, l'application identifie les ingrédients visibles : légumes, restes cuisinés, produits laitiers, épicerie. Cette reconnaissance sert uniquement à savoir quoi vous proposer ensuite, elle ne remplace pas votre propre jugement sur la fraîcheur d'un aliment.",
          "Vous pouvez toujours ajuster manuellement ce qui a été détecté, par exemple si un ingrédient a été mal identifié ou si vous voulez en ajouter un qui n'apparaît pas clairement sur la photo.",
        ],
      },
      {
        heading: 'Étape 3 : générer des recettes personnalisées',
        body: [
          "Une fois les ingrédients identifiés, Yummeal propose des recettes qui utilisent en priorité ce que vous avez déjà, plutôt que des recettes génériques qui vous obligeraient à racheter la moitié des ingrédients.",
          "Ces suggestions tiennent compte de vos préférences alimentaires (végétarien, sans gluten, etc.) et de vos objectifs, pour rester réalistes au quotidien : des recettes simples, réalisables en moins de 30 minutes dans la plupart des cas.",
          "L'objectif n'est pas de vous imposer une seule solution possible, mais de vous donner un point de départ concret plutôt qu'un frigo qui reste fermé faute d'idée.",
        ],
      },
      {
        heading: "Ce que l'algorithme ne fait pas",
        body: [
          "Yummeal ne remplace pas votre bon sens sur la comestibilité d'un aliment : c'est toujours à vous de juger si un produit est encore bon à consommer. L'application vous aide à trouver quoi en faire, pas à décider s'il faut le jeter ou non.",
          "De la même façon, les suggestions de recettes sont des pistes, pas des règles strictes : vous pouvez toujours les adapter selon ce que vous avez sous la main ou vos envies du moment.",
        ],
      },
    ],
    ctaTitle: 'Essayez le principe sur votre propre frigo',
    ctaText:
      'Le meilleur moyen de comprendre comment ça marche reste de le tester avec vos propres ingrédients.',
  },
  {
    slug: 'vision-zero-dechet-cuisine-2026',
    title: 'Vers une cuisine zéro déchet : notre vision',
    metaDescription:
      "Le gaspillage alimentaire à la maison n'est pas une fatalité : c'est un problème d'organisation et d'inspiration. Voici la vision qui guide Yummeal.",
    intro:
      "Le gaspillage alimentaire à la maison n'est presque jamais un choix délibéré. On achète avec de bonnes intentions, puis la semaine s'accélère, les priorités changent, et ce qui devait devenir un repas finit à la poubelle. Notre vision part de ce constat très concret plutôt que d'un discours moralisateur.",
    sections: [
      {
        heading: 'Un problème d\'organisation, pas de volonté',
        body: [
          "L'ordre de grandeur du gaspillage alimentaire dans les foyers est largement documenté et régulièrement rappelé par les pouvoirs publics et les associations : une part significative de ce qui est acheté finit jetée sans avoir été consommée. Le détail exact varie selon les études et les périmètres retenus, mais le principe général fait consensus.",
          "Ce qui nous intéresse chez Yummeal, ce n'est pas de culpabiliser qui que ce soit sur ce chiffre, mais de s'attaquer à sa cause la plus fréquente : le manque de temps et d'idées au moment de décider quoi cuisiner avec ce qu'on a sous la main.",
        ],
      },
      {
        heading: "L'inspiration avant la contrainte",
        body: [
          "La plupart des solutions anti-gaspi existantes reposent sur la discipline : noter les dates de péremption, planifier ses repas à l'avance, tenir un inventaire précis de son frigo. Ce sont de bonnes pratiques, mais elles demandent un effort régulier que tout le monde n'a pas le temps ou l'énergie de maintenir.",
          "Notre vision est différente : plutôt que d'ajouter une contrainte de plus, donner une inspiration immédiate. Voir un ingrédient qui traîne et savoir tout de suite quoi en faire, sans avoir à chercher une recette qui corresponde exactement à ce qu'on a.",
        ],
      },
      {
        heading: 'Une cuisine plus sereine, pas plus stricte',
        body: [
          "Une cuisine zéro déchet, pour nous, n'est pas une cuisine où tout est calculé au gramme près. C'est une cuisine où on utilise naturellement ce qu'on a, où les restes deviennent le point de départ d'un nouveau repas plutôt qu'un problème à gérer.",
          "C'est aussi une cuisine plus économique, presque par effet de bord : moins on jette, moins on rachète inutilement. Mais l'objectif premier reste le plaisir de cuisiner sans culpabilité et sans charge mentale supplémentaire, pas seulement l'économie réalisée.",
        ],
      },
      {
        heading: 'Où se situe Yummeal dans cette vision',
        body: [
          "Yummeal ne prétend pas résoudre le gaspillage alimentaire à lui seul. C'est un outil qui aide, au quotidien, à faire le pont entre ce qu'on a dans son frigo et ce qu'on pourrait en cuisiner, en s'appuyant sur la reconnaissance des ingrédients et des suggestions de recettes personnalisées.",
          "C'est une pièce du puzzle parmi d'autres bonnes habitudes (mieux planifier ses courses, mieux stocker ses aliments), pas une solution miracle unique.",
        ],
      },
    ],
    ctaTitle: 'Rejoignez une cuisine plus anti-gaspi',
    ctaText:
      'Scannez votre frigo et laissez Yummeal vous proposer des recettes adaptées à ce que vous avez déjà.',
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
