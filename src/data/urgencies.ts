export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  ctaTitle: string;
  ctaText: string;
  tags?: string[];
}

export const articles: Article[] = [
  {
    slug: 'recettes-etudiant-moins-10-min',
    tags: ['étudiant', 'rapide', 'pas cher', 'moins de 10 min'],
    title: 'Recettes étudiant en moins de 10 minutes',
    metaDescription:
      "Affamé, pressé, budget serré : voici 5 recettes d'étudiant prêtes en moins de 10 minutes, avec ce qu'il y a déjà dans le placard.",
    intro:
      "Cours dans 20 minutes, frigo presque vide, pas envie de faire la vaisselle de trois casseroles : ces recettes se préparent en moins de 10 minutes, avec des ingrédients qui traînent dans n'importe quel placard d'étudiant.",
    sections: [
      {
        heading: 'Pâtes à l\'œuf et au fromage (8 min)',
        body: [
          "Faites cuire des pâtes courtes (coquillettes, penne) dans une casserole d'eau bouillante salée.",
          "Pendant la cuisson, battez un œuf avec une grosse poignée de fromage râpé et du poivre.",
          "Égouttez les pâtes en gardant un peu d'eau de cuisson, versez-les chaudes sur l'œuf battu : la chaleur cuit l'œuf sans le figer en omelette. Mélangez vite.",
        ],
      },
      {
        heading: 'Riz sauté express au micro-ondes ou à la poêle (7 min)',
        body: [
          "Avec du riz déjà cuit (même un sachet cuisson rapide passé 2 min au micro-ondes), faites revenir un œuf brouillé rapidement à la poêle avec un filet d'huile.",
          "Ajoutez le riz, une sauce soja si vous en avez, et n'importe quel légume qui traîne (surgelé, en conserve, ou même juste un oignon émincé).",
          "2 minutes de poêle à feu vif suffisent : l'objectif est de réchauffer et de mélanger les saveurs, pas de cuire longuement.",
        ],
      },
      {
        heading: 'Toast garni complet (5 min)',
        body: [
          "Grillez deux tranches de pain (frais ou de mie) au grille-pain ou à la poêle.",
          "Garnissez avec ce que vous avez : fromage, jambon, thon égoutté, tomate en rondelles, œuf au plat.",
          "Repassez 1 minute sous le grill du four ou couvrez à la poêle pour faire fondre le fromage : c'est prêt.",
        ],
      },
      {
        heading: 'Soupe de nouilles instantanée améliorée (6 min)',
        body: [
          "Partez d'un sachet de nouilles instantanées, mais ne mettez que la moitié du sachet d'assaisonnement (souvent trop salé seul).",
          "Cassez un œuf directement dans l'eau bouillante en fin de cuisson pour le pocher en 2 minutes.",
          "Ajoutez un reste de légume ou une poignée d'épinards frais : ils cuisent instantanément dans le bouillon chaud.",
        ],
      },
      {
        heading: 'Wrap ou sandwich improvisé (5 min)',
        body: [
          "Une tortilla ou deux tranches de pain de mie suffisent de base.",
          "Tartinez avec ce que vous avez sous la main (fromage frais, houmous, mayonnaise) puis ajoutez une protéine froide (jambon, thon, restes de viande) et un légume cru.",
          "Roulez serré ou refermez : aucune cuisson n'est nécessaire, c'est la solution la plus rapide de toutes.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner en urgence ?',
    ctaText:
      "Yummeal scanne ce que vous avez déjà et vous propose directement une recette rapide, adaptée à votre temps et à votre frigo.",
  },
  {
    slug: 'diner-express-reste-poulet',
    tags: ['reste de poulet', 'express', 'wrap'],
    title: 'Dîner express avec un reste de poulet',
    metaDescription:
      "Un reste de poulet et 10 minutes chrono avant de manger : 3 recettes express, sans réflexion, prêtes à cuisiner tout de suite.",
    intro:
      "Il est déjà tard, vous avez un reste de poulet cuit au frigo et pas le temps de réfléchir à un plan de repas. Voici 3 recettes précises, chronométrées, à suivre telles quelles.",
    sections: [
      {
        heading: 'Wrap poulet-crudités (4 min, zéro cuisson)',
        body: [
          "Effilochez rapidement le poulet à la main directement sur une tortilla ou une grande tranche de pain plat.",
          "Ajoutez ce qui est cru et prêt à l'emploi : salade, tomate, un trait de sauce (mayonnaise, moutarde, yaourt).",
          "Roulez serré : c'est prêt à manger en 4 minutes montre en main, sans allumer le feu.",
        ],
      },
      {
        heading: 'Poêlée poulet-riz en une seule poêle (8 min)',
        body: [
          "Faites chauffer un filet d'huile dans une poêle à feu vif pendant que vous coupez le poulet en dés.",
          "Ajoutez directement le poulet en dés et du riz déjà cuit (frigo ou sachet cuisson rapide) : tout va dans la même poêle, pas de gestion de plusieurs cuissons.",
          "5 minutes en remuant régulièrement, une sauce soja ou un bouillon cube émietté pour le goût, et c'est servi.",
        ],
      },
      {
        heading: 'Bouillon minute au poulet (7 min)',
        body: [
          "Faites chauffer de l'eau avec un bouillon cube dans une casserole : ça bout en 2-3 minutes.",
          "Ajoutez le poulet effiloché et des pâtes fines ou vermicelles cassés, qui cuisent directement dans le bouillon en 4-5 minutes.",
          "Un reste de légume coupé fin (carotte, poireau) cuit aussi vite dans le même bouillon : tout en une seule casserole.",
        ],
      },
    ],
    ctaTitle: "Plus besoin de deviner quoi faire avec vos restes",
    ctaText:
      "Yummeal reconnaît ce que vous avez au frigo, poulet cuit compris, et vous propose une recette adaptée en quelques secondes.",
  },
  {
    slug: 'que-faire-avec-pain-rassis',
    tags: ['pain rassis', 'pain perdu', 'anti-gaspi'],
    title: 'Que faire avec du pain rassis, tout de suite',
    metaDescription:
      "Du pain dur, faim maintenant, pas le temps d'attendre : 3 recettes précises pour transformer du pain rassis en repas en moins de 10 minutes.",
    intro:
      "Le pain est dur, vous avez faim maintenant et pas 20 minutes devant vous. Voici 3 recettes précises et rapides, pas une liste de conseils généraux : de quoi transformer ce pain en repas complet tout de suite.",
    sections: [
      {
        heading: 'Pain perdu express (8 min)',
        body: [
          "Battez un œuf avec un peu de lait (ou d'eau si vous n'avez pas de lait) dans une assiette creuse.",
          "Trempez chaque tranche de pain rassis 10 secondes de chaque côté : le pain dur absorbe le liquide sans se déliter, contrairement à du pain frais.",
          "Faites-les dorer 2 minutes de chaque côté dans une poêle beurrée à feu moyen. Sucré ou salé selon ce que vous avez sous la main.",
        ],
      },
      {
        heading: 'Croque-monsieur minute au four ou à la poêle (7 min)',
        body: [
          "Le pain rassis tient mieux à la garniture que du pain frais, qui a tendance à ramollir et se déchirer.",
          "Montez un sandwich jambon-fromage classique, puis passez-le 2-3 minutes à la poêle couverte (le couvercle fait fondre le fromage plus vite) ou sous le grill du four.",
          "Servez immédiatement, pendant que le fromage est encore filant.",
        ],
      },
      {
        heading: 'Soupe de pain (panade express, 6 min)',
        body: [
          "Faites chauffer un bouillon (cube + eau chaude, prêt en 2 minutes).",
          "Coupez le pain rassis en morceaux directement dans le bol ou l'assiette.",
          "Versez le bouillon bouillant dessus, couvrez 3 minutes : le pain ramollit et absorbe le bouillon, exactement comme une panade traditionnelle. Ajoutez un œuf poché ou du fromage râpé si vous en avez.",
        ],
      },
      {
        // Repris de l'ancienne fiche ingrédient « pain rassis », fusionnée
        // ici : ces deux usages n'étaient couverts nulle part ailleurs.
        heading: 'Et si vous n’avez pas faim tout de suite : chapelure et croûtons',
        body: [
          "Mixé au robot ou écrasé au rouleau dans un torchon, le pain rassis devient une chapelure maison qui se congèle et se garde des mois. Elle vaut mieux que celle du commerce, et elle est gratuite.",
          "Coupé en dés, arrosé d'un filet d'huile et grillé 5 minutes à la poêle ou au four, il donne des croûtons pour une salade ou une soupe. Salez, poivrez, ajoutez de l'ail en poudre si vous en avez.",
          "Dernier réflexe, si le pain est encore juste un peu sec : quelques secondes sous l'eau puis 5 minutes au four à 180 °C suffisent souvent à lui rendre son moelleux.",
        ],
      },
    ],
    ctaTitle: "Un frigo pas très rempli n'est jamais un problème",
    ctaText:
      "Yummeal transforme ce que vous avez sous la main, pain rassis compris, en idée de repas concrète et rapide.",
  },
  {
    slug: 'repas-fond-de-placard-pates',
    tags: ['pâtes', 'fond de placard', 'repas rapide'],
    title: 'Repas de fond de placard avec des pâtes',
    metaDescription:
      "Plus rien au frigo, juste un paquet de pâtes ? Voici comment composer un vrai repas en 10 minutes avec ce qui reste dans le placard.",
    intro:
      "Le frigo est vide, mais il reste presque toujours un paquet de pâtes et quelques produits de base au placard. Voici comment en faire un vrai repas, pas juste des pâtes nature, en 10 minutes.",
    sections: [
      {
        heading: 'Faites cuire les pâtes en parallèle de tout le reste',
        body: [
          "Mettez l'eau à bouillir en premier : c'est l'étape la plus longue (8-10 minutes), tout le reste se prépare pendant ce temps.",
          "Salez généreusement l'eau de cuisson : c'est souvent la seule source de goût si le placard est vraiment vide.",
          "Gardez toujours un peu d'eau de cuisson avant d'égoutter : elle sert à lier n'importe quelle sauce improvisée.",
        ],
      },
      {
        heading: 'Trois sauces de secours avec presque rien',
        body: [
          "Huile d'olive, ail (frais ou en poudre) et un peu d'eau de cuisson : mélangé aux pâtes chaudes, ça suffit à faire une sauce liée et parfumée.",
          "Une boîte de thon égouttée avec un filet d'huile et un peu de moutarde imite une sauce complète en 1 minute, sans cuisson supplémentaire.",
          "Un fond de sauce tomate, de ketchup ou de coulis dilué avec l'eau de cuisson des pâtes devient une sauce tomate improvisée.",
        ],
      },
      {
        heading: 'Ce qui transforme des pâtes nature en repas',
        body: [
          "Un œuf ajouté cru sur les pâtes très chaudes en fin de cuisson cuit à la chaleur résiduelle et ajoute des protéines immédiatement.",
          "Du fromage râpé, même en petite quantité, apporte du gras et du goût qui manquent le plus dans un plat de dernier recours.",
          "Un reste de légume surgelé (petits pois, épinards, brocolis) se jette directement dans l'eau de cuisson des pâtes 3 minutes avant la fin : une seule casserole, aucun temps perdu.",
        ],
      },
    ],
    ctaTitle: "Ne plus jamais se retrouver sans idée",
    ctaText:
      "Yummeal propose des recettes réalisables avec ce que vous avez réellement, même quand le placard est presque vide.",
  },
  {
    slug: 'sauver-plat-trop-sale',
    tags: ['plat trop salé', 'astuce cuisine', 'rattraper un plat'],
    title: 'Comment sauver un plat trop salé',
    metaDescription:
      "Un plat trop salé au moment de servir ? Voici les techniques culinaires qui fonctionnent vraiment pour rattraper la situation, sans mythe ni recette miracle.",
    intro:
      "Le plat est déjà sur le feu, trop salé, et il n'y a pas le temps de tout recommencer. Voici les techniques qui fonctionnent réellement pour rattraper un plat trop salé, sans mythe culinaire non vérifié.",
    sections: [
      {
        heading: "Diluer avec plus de base non salée",
        body: [
          "La solution la plus fiable : ajoutez une quantité supplémentaire d'ingrédients non salés (eau, bouillon sans sel, crème, lait, légumes crus, riz ou pâtes non salés) pour augmenter le volume total et diminuer la concentration de sel par portion.",
          "Pour une soupe ou une sauce liquide, ajoutez de l'eau ou du bouillon non salé petit à petit en goûtant à chaque ajout.",
          "Pour un plat mijoté, ajoutez des légumes crus supplémentaires (pomme de terre, carotte) qui vont cuire et absorber une partie du liquide salé tout en augmentant le volume total.",
        ],
      },
      {
        heading: "La pomme de terre crue, pour absorber une partie du sel",
        body: [
          "Une pomme de terre crue, épluchée et coupée en gros morceaux, plongée dans un plat liquide ou en sauce, absorbe une partie du sel environnant pendant sa cuisson (15-20 minutes).",
          "Retirez les morceaux de pomme de terre avant de servir : ils ont capté une partie du sel en excès, même si l'effet reste partiel et ne remplace pas la dilution.",
          "Cette technique fonctionne mieux sur les plats en sauce ou mijotés que sur les plats secs (viande grillée, légumes sautés), où il n'y a pas de liquide pour faire circuler le sel.",
        ],
      },
      {
        heading: "Équilibrer avec du sucre ou de l'acide",
        body: [
          "Une pincée de sucre (ou une touche de miel) ne retire pas le sel, mais atténue sa perception en équilibrant les saveurs, en particulier dans une sauce tomate ou un plat mijoté.",
          "Un filet de vinaigre, de jus de citron ou une cuillère de yaourt/crème fraîche apporte de l'acidité ou du gras qui masque une partie de la sensation salée.",
          "Ces ajustements se font en petite quantité, cuillère après cuillère, en goûtant à chaque étape : l'objectif est d'équilibrer le goût, pas de le transformer.",
        ],
      },
      {
        heading: "Quand le plat ne peut vraiment plus être rattrapé",
        body: [
          "Si le plat est extrêmement salé dès le départ (erreur de dosage majeure), aucune de ces techniques ne le ramènera à un niveau normal : mieux vaut le diluer largement dans une nouvelle base (par exemple transformer une sauce trop salée en soupe en ajoutant beaucoup d'eau et de légumes).",
          "Servir en plus petites portions, accompagnées d'un féculent nature (riz, pâtes, pain) non salé, permet aussi de diluer la perception du sel à l'échelle de l'assiette plutôt que du plat entier.",
        ],
      },
    ],
    ctaTitle: "Évitez la panique la prochaine fois",
    ctaText:
      "Yummeal vous guide pas à pas dans vos recettes, avec les bonnes quantités au bon moment, pour limiter ce genre d'accident.",
  },
  {
    slug: 'recette-fond-de-frigo-rapide',
    tags: ['fond de frigo', 'improviser', 'anti-gaspi'],
    title: "Recette express avec le fond de votre frigo",
    metaDescription:
      "Rien de précis au frigo, juste des restes épars et pas de temps ? Voici une méthode en 3 étapes pour improviser un vrai repas en moins de 10 minutes.",
    intro:
      "Vous ouvrez le frigo, il n'y a pas de quoi suivre une vraie recette, juste des restes épars et 10 minutes devant vous. Voici une méthode simple pour transformer n'importe quel fond de frigo en repas, sans réfléchir longtemps.",
    sections: [
      {
        heading: "Étape 1 : choisir une base qui cuit vite",
        body: [
          "Œufs, riz déjà cuit, pâtes déjà cuites ou pain sont les bases les plus rapides : elles ne demandent aucune cuisson longue, contrairement à des féculents crus.",
          "S'il ne reste que des légumes crus, coupez-les en petits morceaux pour accélérer leur cuisson à la poêle (2-3 minutes suffisent en dés fins à feu vif).",
          "En l'absence de féculent, une simple poêlée de légumes et de protéines suffit à faire un repas complet.",
        ],
      },
      {
        heading: "Étape 2 : tout regrouper dans une seule poêle ou casserole",
        body: [
          "Faites chauffer un filet d'huile ou de beurre, puis ajoutez les ingrédients dans l'ordre de leur temps de cuisson : d'abord ce qui est cru et dur (oignon, carotte), puis ce qui est déjà cuit (riz, pâtes, restes de viande).",
          "Ne cherchez pas à faire un plat élaboré : l'objectif est de réchauffer et de mélanger, pas de suivre une recette précise.",
          "Un œuf cassé directement dans la poêle en fin de cuisson lie l'ensemble et ajoute des protéines en 2 minutes.",
        ],
      },
      {
        heading: "Étape 3 : rattraper le goût à la fin",
        body: [
          "Salez, poivrez et ajoutez ce qui donne du goût rapidement : sauce soja, moutarde, un fond de sauce tomate, du fromage râpé ou des herbes séchées.",
          "Un filet de citron ou de vinaigre réveille un plat qui manque de peps, en particulier avec des restes un peu fades.",
          "Goûtez avant de servir : c'est souvent l'assaisonnement de dernière minute qui fait la différence entre un plat improvisé raté et un plat improvisé réussi.",
        ],
      },
    ],
    ctaTitle: "Laissez Yummeal improviser à votre place",
    ctaText:
      "Yummeal identifie ce qu'il reste dans votre frigo et vous propose directement une recette, même quand il ne reste presque rien.",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
