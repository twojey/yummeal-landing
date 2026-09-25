export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  ctaTitle: string;
  ctaText: string;
  tags?: string[];
  // Vidéo YouTube source dont s'inspire la recette, quand une correspondance
  // fiable existe dans le catalogue Supabase (table `recipe`, colonne
  // `video_url`) — voir le matching documenté dans src/lib/schema.ts
  // (buildRecipeJsonLd). Absent = pas de correspondance assez sûre : la page
  // reste en JSON-LD `Article` plutôt que d'afficher un lien approximatif.
  sourceVideo?: {
    youtubeId: string;
    title: string;
    channel: string;
    uploadDate: string;
  };
}

export const articles: Article[] = [
  {
    slug: 'pates-thon-creme',
    tags: ['pâtes', 'thon', 'crème fraîche', 'rapide'],
    sourceVideo: {
      youtubeId: 'k4bF7lAGf8k',
      title: 'Creamy Tuna Pasta',
      channel: 'TheCooknShare',
      uploadDate: '2015-05-27T03:34:18-07:00',
    },
    title: 'Recette avec pâtes, thon et crème fraîche',
    metaDescription:
      "Une boîte de thon et un fond de crème fraîche dans le frigo ? Voici une recette de pâtes au thon et à la crème, prête en 15 minutes, pour 2 personnes.",
    intro:
      "Avec des pâtes, une boîte de thon et un peu de crème fraîche, vous avez déjà tout ce qu'il faut pour un plat complet, sans course supplémentaire.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '200 g de pâtes (penne, fusilli ou spaghetti selon ce que vous avez)',
          '1 boîte de thon au naturel ou à l\'huile (environ 140 g égoutté)',
          '15 cl de crème fraîche (épaisse ou liquide, entière de préférence)',
          '1 oignon (ou 1 échalote), sel, poivre',
          'Optionnel : un peu de parmesan râpé, du persil ou du basilic',
        ],
      },
      {
        heading: 'Préparation',
        body: [
          "1. Faites cuire les pâtes dans un grand volume d'eau salée, selon le temps indiqué sur le paquet (en général 9 à 11 minutes). Réservez une louche d'eau de cuisson avant d'égoutter.",
          "2. Pendant la cuisson, émincez finement l'oignon et faites-le revenir 3 à 4 minutes dans une poêle avec un filet d'huile, à feu moyen, jusqu'à ce qu'il devienne translucide.",
          "3. Égouttez le thon et ajoutez-le dans la poêle avec l'oignon. Émiettez-le à la fourchette et laissez chauffer 2 minutes.",
          "4. Versez la crème fraîche, mélangez et laissez épaissir 2 à 3 minutes à feu doux. Salez, poivrez.",
          "5. Ajoutez les pâtes égouttées directement dans la poêle avec un peu d'eau de cuisson réservée si la sauce est trop épaisse. Mélangez bien pour enrober toutes les pâtes.",
          '6. Servez immédiatement, avec un peu de parmesan ou de persil ciselé si vous en avez.',
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Pas de crème fraîche mais un yaourt nature ou du fromage frais type St Môret ? Ça fonctionne aussi, en l'ajoutant hors du feu pour éviter qu'il ne tranche.",
          "Un reste de légumes (petits pois, brocoli, courgette) se glisse très bien dans cette recette : ajoutez-le en même temps que le thon.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Yummeal scanne ce que vous avez au frigo et vous propose directement des recettes adaptées, sans avoir à chercher pendant 20 minutes.",
  },
  {
    slug: 'poulet-brocoli-riz',
    tags: ['poulet', 'brocoli', 'riz', 'équilibré'],
    sourceVideo: {
      youtubeId: '6ncQPbmVy2Q',
      title: 'Chicken and Broccoli Rice',
      channel: 'TheCooknShare',
      uploadDate: '2024-07-03T07:15:00-07:00',
    },
    title: 'Recette avec poulet, brocoli et riz',
    metaDescription:
      "Du poulet, du brocoli et du riz au frigo : voici une recette complète et équilibrée, prête en 25 minutes pour 2 personnes.",
    intro:
      "Le trio poulet-brocoli-riz est l'un des plus simples à réussir : une cuisson à la poêle, un riz nature, et un repas complet sans effort particulier.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '150 g de riz (blanc ou basmati)',
          '2 blancs de poulet (environ 300 g), coupés en morceaux',
          '1 petit brocoli (ou la moitié d\'un gros), coupé en fleurettes',
          '2 gousses d\'ail, huile, sel, poivre',
          "Optionnel : sauce soja, un peu de gingembre frais ou en poudre",
        ],
      },
      {
        heading: 'Préparation',
        body: [
          "1. Faites cuire le riz dans une casserole d'eau bouillante salée, environ 10 à 12 minutes, puis égouttez.",
          "2. Pendant ce temps, faites cuire les fleurettes de brocoli 4 à 5 minutes à la vapeur ou dans une casserole d'eau bouillante : elles doivent rester légèrement croquantes.",
          "3. Dans une grande poêle, faites chauffer un filet d'huile et faites dorer les morceaux de poulet 6 à 8 minutes à feu moyen-vif, en remuant régulièrement, jusqu'à ce qu'ils soient bien cuits à cœur.",
          "4. Ajoutez l'ail émincé et faites revenir 1 minute, puis ajoutez le brocoli égoutté dans la poêle. Mélangez 2 à 3 minutes pour que tout se réchauffe et se mélange aux sucs de cuisson du poulet.",
          "5. Salez, poivrez, ajoutez un trait de sauce soja si vous en avez pour relever l'ensemble.",
          '6. Servez le poulet et le brocoli sur le riz chaud.',
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Le trognon du brocoli se mange aussi : épluchez-le avec un économe et coupez-le en petits dés, il cuit à la même vitesse que les fleurettes.",
          "Ce plat se prépare très bien en plus grande quantité pour 2 repas : le riz et le poulet se réchauffent bien le lendemain à la poêle.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Yummeal identifie ce que vous avez déjà chez vous et vous propose des recettes adaptées, pour ne plus jamais tourner en rond devant le frigo.",
  },
  {
    slug: 'oeuf-pomme-de-terre-oignon',
    tags: ['œufs', 'pommes de terre', 'oignon', 'tortilla espagnole'],
    sourceVideo: {
      youtubeId: 'JTiBrCQMRLI',
      title: 'Fried Potatoes with Onion and Fried Eggs',
      channel: 'Essen Recipes',
      uploadDate: '2021-08-14T11:23:30-07:00',
    },
    title: 'Recette avec œufs, pommes de terre et oignon',
    metaDescription:
      "Œufs, pommes de terre et oignon au frigo : la base d'une tortilla espagnole maison, simple et généreuse, pour 2 personnes.",
    intro:
      "Avec des œufs, des pommes de terre et un oignon, vous avez tout pour préparer une tortilla à l'espagnole : un plat simple, économique et qui se mange chaud ou froid.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '4 œufs',
          '2 pommes de terre moyennes (environ 300 g), épluchées',
          '1 oignon',
          'Huile d\'olive (assez généreuse, environ 8 cl), sel, poivre',
        ],
      },
      {
        heading: 'Préparation',
        body: [
          "1. Coupez les pommes de terre en tranches fines (2-3 mm) et l'oignon en fines lamelles.",
          "2. Dans une poêle, faites chauffer l'huile d'olive à feu moyen-doux et faites-y cuire les pommes de terre et l'oignon ensemble pendant 15 à 18 minutes, en remuant de temps en temps, jusqu'à ce que les pommes de terre soient tendres (elles doivent fondre, pas dorer).",
          "3. Pendant ce temps, battez les œufs dans un grand bol avec une pincée de sel.",
          "4. Égouttez les pommes de terre et l'oignon (réservez un peu d'huile de côté) et ajoutez-les aux œufs battus. Mélangez bien et laissez reposer 5 minutes.",
          "5. Remettez un peu d'huile dans la poêle à feu moyen, versez le mélange et laissez cuire 4 à 5 minutes jusqu'à ce que les bords soient pris.",
          "6. Posez une assiette sur la poêle, retournez d'un geste sûr, puis faites glisser la tortilla dans la poêle pour cuire l'autre face 3 à 4 minutes.",
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Si retourner la tortilla vous inquiète, terminez-la simplement 5 minutes au four à 180°C plutôt que de la retourner à la poêle.",
          "Elle se mange aussi bien froide le lendemain, en tranches, pour un pique-nique ou un déjeuner rapide.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Yummeal transforme ce que vous avez déjà au frigo en recettes prêtes à suivre, sans avoir à improviser à chaque fois.",
  },
  {
    slug: 'bacon-fromage-pates',
    tags: ['pâtes', 'bacon', 'fromage', 'crémeux'],
    title: 'Recette avec bacon, fromage et pâtes',
    metaDescription:
      "Un fond de paquet de bacon et du fromage à finir : voici une recette de pâtes bacon-fromage crémeuses, prête en 20 minutes pour 2 personnes.",
    intro:
      "Bacon et fromage forment une base de sauce simple et gourmande pour des pâtes, sans avoir besoin de crème si vous n'en avez pas.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '200 g de pâtes courtes (penne, coquillettes...)',
          '100 g de bacon ou de lardons',
          '100 g de fromage râpé (emmental, comté ou un mélange de restes de fromages)',
          '1 petit oignon, sel, poivre',
          "Optionnel : 1 gousse d'ail, un peu de crème fraîche",
        ],
      },
      {
        heading: 'Préparation',
        body: [
          "1. Faites cuire les pâtes dans l'eau bouillante salée selon le temps indiqué sur le paquet. Réservez un peu d'eau de cuisson avant d'égoutter.",
          "2. Pendant ce temps, coupez le bacon en lardons s'il ne l'est pas déjà, et émincez l'oignon.",
          "3. Dans une poêle sans matière grasse ajoutée (le bacon en rend suffisamment), faites cuire le bacon et l'oignon 5 à 6 minutes à feu moyen, jusqu'à ce que le bacon soit légèrement croustillant.",
          "4. Ajoutez les pâtes égouttées directement dans la poêle avec un peu d'eau de cuisson réservée.",
          "5. Hors du feu, ajoutez le fromage râpé et mélangez rapidement pour qu'il fonde en enrobant les pâtes. Ajoutez un peu d'eau de cuisson si le mélange est trop épais.",
          '6. Poivrez généreusement et servez aussitôt.',
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Plusieurs bouts de fromages différents qui traînent (comté, emmental, morceau de parmesan) se combinent très bien ici : râpez-les ensemble pour un mélange homogène.",
          "Pour une version plus crémeuse, ajoutez 10 cl de crème fraîche en même temps que le fromage.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Avec Yummeal, plus besoin de deviner quoi faire avec vos restes : l'app vous propose directement des recettes selon ce que vous avez.",
  },
  {
    slug: 'jambon-fromage-tomate',
    tags: ['jambon', 'fromage', 'tomate', 'gratin'],
    title: 'Recette avec jambon, fromage et tomate',
    metaDescription:
      "Jambon, fromage et tomate au frigo : une recette de gratin ou de tarte salée rapide, pour 2 personnes, sans pâte à préparer.",
    intro:
      "Jambon, fromage et tomate se combinent naturellement, que ce soit en gratin, en tarte ou en poêlée : voici la version gratin, la plus rapide à préparer.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '3-4 tranches de jambon',
          '2 tomates moyennes (ou 3 petites)',
          '100 g de fromage râpé (emmental, comté ou mozzarella)',
          '1 pâte brisée ou feuilletée (optionnel, pour une version tarte)',
          'Sel, poivre, un peu d\'origan ou de basilic séché',
        ],
      },
      {
        heading: 'Préparation',
        body: [
          '1. Préchauffez le four à 200°C.',
          "2. Coupez les tomates en rondelles fines et le jambon en lanières ou en morceaux.",
          "3. Dans un plat à gratin huilé (ou sur la pâte étalée dans un moule si vous faites une tarte), disposez une couche de tomates, une couche de jambon, puis répétez.",
          "4. Salez légèrement (les tomates rendent de l'eau), poivrez, parsemez d'origan.",
          "5. Recouvrez de fromage râpé sur toute la surface.",
          "6. Enfournez 20 à 25 minutes (15 à 20 minutes de plus si vous utilisez une pâte), jusqu'à ce que le fromage soit doré et les tomates fondantes.",
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Si les tomates sont très juteuses, laissez-les dégorger 10 minutes avec une pincée de sel avant de les égoutter : le gratin sera moins liquide.",
          "Des tranches de jambon un peu sèches sur les bords fonctionnent très bien ici, la cuisson masque totalement la texture.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Yummeal repère ce que vous avez au frigo et vous suggère des recettes concrètes, prêtes à suivre, en quelques secondes.",
  },
  {
    slug: 'riz-oeuf-sauce-soja',
    tags: ['riz', 'œuf', 'sauce soja', 'riz sauté'],
    title: 'Recette avec riz, œuf et sauce soja',
    metaDescription:
      "Du riz cuit, des œufs et de la sauce soja : la base d'un riz sauté façon cantine chinoise, prêt en 10 minutes pour 2 personnes.",
    intro:
      "Riz, œuf et sauce soja suffisent à préparer un riz sauté simple et savoureux, particulièrement réussi avec du riz déjà cuit et refroidi.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '300 g de riz cuit (idéalement de la veille, refroidi)',
          '2 œufs',
          '3 cuillères à soupe de sauce soja',
          '1 oignon ou 2 oignons nouveaux, huile',
          "Optionnel : petits pois, maïs, restes de légumes en dés",
        ],
      },
      {
        heading: 'Préparation',
        body: [
          "1. Battez les œufs dans un bol avec une pincée de sel.",
          "2. Dans une grande poêle ou un wok, faites chauffer un filet d'huile à feu vif et versez les œufs battus. Laissez prendre 30 secondes sans remuer, puis brouillez-les grossièrement à la spatule. Réservez-les dans une assiette.",
          "3. Dans la même poêle, ajoutez un peu d'huile et faites revenir l'oignon émincé 2 minutes.",
          "4. Ajoutez le riz cuit en l'émiettant avec les doigts s'il a formé des blocs, et faites-le sauter 3 à 4 minutes à feu vif, en remuant régulièrement pour qu'il ne colle pas.",
          "5. Remettez les œufs brouillés dans la poêle, ajoutez la sauce soja, mélangez bien pendant 1 à 2 minutes pour que tout s'imprègne.",
          '6. Goûtez et rectifiez en sauce soja si besoin, puis servez immédiatement.',
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Un riz cuit puis refroidi au frigo (au moins 2 heures) donne un bien meilleur résultat qu'un riz tout juste cuit, qui a tendance à devenir pâteux à la poêle.",
          "N'importe quel reste de légumes cuits (carottes, petits pois, brocoli) se glisse dans cette recette en même temps que le riz.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Yummeal transforme vos restes de riz et vos fonds de frigo en recettes concrètes, pour ne plus rien jeter.",
  },
  {
    slug: 'oeuf-tomate-oignon',
    tags: ['œuf', 'tomate', 'oignon', 'shakshuka'],
    title: 'Recette avec œuf, tomate et oignon',
    metaDescription:
      "Œuf, tomate et oignon au frigo : une recette de type shakshuka simplifiée, des œufs pochés dans une sauce tomate, pour 2 personnes.",
    intro:
      "Œuf, tomate et oignon forment la base d'un plat mijoté d'inspiration méditerranéenne : des œufs cuits directement dans une sauce tomate à l'oignon.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '3-4 tomates mûres (ou 1 boîte de tomates concassées si vous n\'avez pas de fraîches)',
          '4 œufs',
          '1 oignon',
          '1 gousse d\'ail (optionnel), huile d\'olive, sel, poivre',
          "Optionnel : cumin, paprika, persil",
        ],
      },
      {
        heading: 'Préparation',
        body: [
          "1. Émincez l'oignon et faites-le revenir 4 à 5 minutes dans une poêle avec un filet d'huile d'olive, à feu moyen, jusqu'à ce qu'il devienne translucide.",
          "2. Coupez les tomates en dés (ou utilisez directement la boîte de tomates concassées) et ajoutez-les dans la poêle avec l'ail émincé si vous en utilisez.",
          "3. Laissez mijoter à couvert 12 à 15 minutes à feu doux, en remuant de temps en temps, jusqu'à obtenir une sauce épaissie. Salez, poivrez, ajoutez les épices si vous en avez.",
          "4. Avec le dos d'une cuillère, formez 4 petits creux dans la sauce et cassez un œuf dans chacun.",
          "5. Couvrez et laissez cuire 5 à 8 minutes à feu doux, jusqu'à ce que le blanc soit pris et le jaune encore coulant (ou plus cuit selon votre goût).",
          '6. Servez directement dans la poêle, avec du pain pour saucer.',
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Des tomates trop mûres, presque molles, sont idéales pour cette recette : leur texture ne se remarque pas une fois en sauce.",
          "Cette recette se prépare aussi très bien à l'avance pour la partie sauce tomate-oignon : ne réchauffez qu'au moment de cuire les œufs.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Yummeal repère les ingrédients que vous avez déjà et vous propose des recettes adaptées, pour cuisiner sans réfléchir.",
  },
  {
    slug: 'poulet-creme-champignons',
    tags: ['poulet', 'crème fraîche', 'champignons', 'sauce'],
    sourceVideo: {
      youtubeId: 'mpo0gX1fqaY',
      title: 'One Pan Creamy Mushroom Chicken',
      channel: 'TheCooknShare',
      uploadDate: '2016-03-31T19:22:38-07:00',
    },
    title: 'Recette avec poulet, crème et champignons',
    metaDescription:
      "Poulet, crème fraîche et champignons au frigo : une recette de poulet en sauce crémeuse, prête en 25 minutes pour 2 personnes.",
    intro:
      "Le poulet à la crème et aux champignons est un classique simple à réaliser, qui se marie avec du riz, des pâtes ou une purée selon ce que vous avez sous la main.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '2 blancs de poulet (environ 300 g), coupés en morceaux ou en lanières',
          '200 g de champignons de Paris (frais ou en boîte égouttés)',
          '20 cl de crème fraîche',
          '1 oignon ou 1 échalote, huile, sel, poivre',
          "Optionnel : 1 filet de vin blanc, persil",
        ],
      },
      {
        heading: 'Préparation',
        body: [
          "1. Émincez l'oignon et coupez les champignons en lamelles s'ils sont frais.",
          "2. Dans une poêle, faites chauffer un filet d'huile et faites dorer les morceaux de poulet 6 à 7 minutes à feu moyen-vif, jusqu'à ce qu'ils soient bien cuits à cœur. Réservez-les dans une assiette.",
          "3. Dans la même poêle, faites revenir l'oignon 2 minutes, puis ajoutez les champignons. Faites-les cuire 5 à 6 minutes à feu vif, jusqu'à ce qu'ils rendent leur eau et qu'elle s'évapore.",
          "4. Déglacez avec un filet de vin blanc si vous en avez, laissez réduire 1 minute.",
          "5. Remettez le poulet dans la poêle, versez la crème fraîche, mélangez et laissez mijoter 5 minutes à feu doux pour que la sauce épaississe légèrement.",
          '6. Salez, poivrez, parsemez de persil et servez avec du riz, des pâtes ou une purée.',
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Des champignons légèrement desséchés se rattrapent très bien dans cette recette : la cuisson à la poêle avec la crème leur redonne du moelleux.",
          "Un reste de poulet déjà cuit fonctionne aussi : ajoutez-le en dés directement à l'étape 5, pour juste le réchauffer dans la sauce.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Yummeal scanne votre frigo et vous propose directement des recettes adaptées à ce que vous avez, sans avoir à improviser.",
  },
  {
    slug: 'thon-pates-mais',
    tags: ['thon', 'pâtes', 'maïs', 'salade froide'],
    title: 'Recette avec thon, pâtes et maïs',
    metaDescription:
      "Thon, pâtes et maïs au frigo : une recette de salade de pâtes froide ou tiède, simple et rapide, pour 2 personnes.",
    intro:
      "Thon, pâtes et maïs forment une salade complète, qui se mange aussi bien tiède juste après la cuisson que froide le lendemain.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '200 g de pâtes courtes (coquillettes, fusilli, penne)',
          '1 boîte de thon au naturel ou à l\'huile (environ 140 g égoutté)',
          '1 petite boîte de maïs (environ 150 g égoutté)',
          '2 cuillères à soupe de mayonnaise ou de vinaigrette, sel, poivre',
          "Optionnel : dés de tomate, oignon rouge émincé, persil",
        ],
      },
      {
        heading: 'Préparation',
        body: [
          "1. Faites cuire les pâtes dans l'eau bouillante salée selon le temps indiqué sur le paquet, puis égouttez-les et laissez-les refroidir quelques minutes (passez-les sous l'eau froide pour aller plus vite si vous les voulez froides).",
          "2. Égouttez bien le thon et le maïs.",
          "3. Dans un grand saladier, mélangez les pâtes, le thon émietté et le maïs.",
          "4. Ajoutez la mayonnaise ou la vinaigrette et mélangez pour bien enrober l'ensemble.",
          "5. Salez, poivrez, ajoutez les légumes complémentaires si vous en avez (tomate, oignon rouge).",
          '6. Servez tiède tout de suite, ou réservez au frigo au moins 30 minutes pour la manger froide.',
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Cette salade se garde 2 jours au frigo dans une boîte hermétique : idéale à préparer la veille pour un déjeuner à emporter.",
          "Remplacez la mayonnaise par un mélange citron-huile d'olive pour une version plus légère.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Avec Yummeal, transformez vos fonds de placard et de frigo en repas concrets, sans réfléchir à quoi faire.",
  },
  {
    slug: 'pomme-de-terre-bacon-fromage',
    tags: ['pomme de terre', 'bacon', 'fromage', 'gratin', 'tartiflette'],
    sourceVideo: {
      youtubeId: 'dqyknrRjegw',
      title: 'Baked Potato with Egg, Bacon and Cheese',
      channel: 'Essen Recipes',
      uploadDate: '2021-03-22T13:38:13-07:00',
    },
    title: 'Recette avec pomme de terre, bacon et fromage',
    metaDescription:
      "Pommes de terre, bacon et fromage au frigo : une recette de gratin façon tartiflette express, prête en 40 minutes pour 2 personnes.",
    intro:
      "Pommes de terre, bacon et fromage sont la base d'un gratin réconfortant, une version simplifiée de la tartiflette, sans reblochon obligatoire.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '4 pommes de terre moyennes (environ 500 g), épluchées',
          '120 g de bacon ou de lardons',
          '150 g de fromage râpé ou en tranches (emmental, reblochon, ou un reste de fromage à pâte molle)',
          '1 oignon, 10 cl de crème fraîche (optionnel), sel, poivre',
        ],
      },
      {
        heading: 'Préparation',
        body: [
          "1. Préchauffez le four à 200°C. Coupez les pommes de terre en rondelles fines (3-4 mm) et faites-les précuire 10 minutes dans une casserole d'eau bouillante salée, puis égouttez.",
          "2. Pendant ce temps, faites revenir le bacon et l'oignon émincé 5 minutes dans une poêle, jusqu'à ce que le bacon soit légèrement doré.",
          "3. Dans un plat à gratin huilé, disposez une couche de pommes de terre, une couche de bacon-oignon, salez légèrement, poivrez. Répétez pour utiliser tous les ingrédients.",
          "4. Si vous avez de la crème fraîche, versez-la sur le dessus pour humidifier le gratin.",
          "5. Recouvrez de fromage râpé ou de tranches de fromage sur toute la surface.",
          '6. Enfournez 20 à 25 minutes, jusqu\'à ce que le dessus soit bien doré et gratiné.',
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Des pommes de terre qui ont commencé à germer se rattrapent très bien ici : retirez simplement les germes avant de les éplucher.",
          "Plusieurs bouts de fromages différents (reste de reblochon, comté, emmental) se combinent parfaitement pour ce gratin.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Yummeal identifie ce que vous avez déjà chez vous et vous propose directement des recettes adaptées, pour ne plus rien jeter.",
  },
  {
    slug: 'riz-lentilles-oignon',
    tags: ['riz', 'lentilles', 'oignon', 'mujadara', 'économique'],
    sourceVideo: {
      youtubeId: 'OoXfaDvOba8',
      title: 'Lentils and Rice with Caramelized Onions',
      channel: 'Tasty',
      uploadDate: '2017-04-10T18:00:55-07:00',
    },
    title: 'Recette avec riz, lentilles et oignon',
    metaDescription:
      "Riz, lentilles et oignon au placard : une recette de riz aux lentilles façon mujadara, économique et complète, pour 2 personnes.",
    intro:
      "Riz, lentilles et oignon confit forment à eux seuls un plat complet et nourrissant, inspiré du mujadara, très économique à préparer.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '100 g de riz',
          '100 g de lentilles vertes ou corail',
          '2 gros oignons',
          "3 cuillères à soupe d'huile d'olive, sel, poivre, cumin (optionnel)",
        ],
      },
      {
        heading: 'Préparation',
        body: [
          "1. Rincez les lentilles. Si ce sont des lentilles vertes, faites-les cuire 20 minutes dans une casserole d'eau non salée (elles doivent rester légèrement fermes) ; si ce sont des lentilles corail, comptez seulement 12 à 15 minutes.",
          "2. Pendant ce temps, faites cuire le riz séparément dans une casserole d'eau bouillante salée, environ 10 à 12 minutes, puis égouttez.",
          "3. Émincez finement les oignons en fines demi-rondelles. Faites-les revenir dans une poêle avec l'huile d'olive à feu moyen-doux pendant 15 à 20 minutes, en remuant régulièrement, jusqu'à ce qu'ils soient bien caramélisés et dorés.",
          "4. Une fois les lentilles et le riz cuits et égouttés, mélangez-les ensemble dans une grande poêle ou un saladier.",
          "5. Ajoutez les deux tiers des oignons caramélisés, mélangez, salez, poivrez, ajoutez une pincée de cumin si vous en avez.",
          '6. Servez chaud, garni du reste des oignons caramélisés sur le dessus.',
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Ne salez jamais l'eau de cuisson des lentilles avant qu'elles soient cuites : le sel les empêche de bien ramollir.",
          "Ce plat se mange aussi très bien froid ou tiède, en salade, avec un filet de citron et un peu de yaourt.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Yummeal transforme vos restes de riz, de lentilles et de légumineuses en recettes concrètes et complètes.",
  },
  {
    slug: 'pain-jambon-fromage-chaud',
    tags: ['pain', 'jambon', 'fromage', 'croque-monsieur'],
    sourceVideo: {
      youtubeId: 'Pgm03qs7FHE',
      title: 'Hot Ham and Cheese Sandwich',
      channel: "Michael's Home Cooking",
      uploadDate: '2009-01-01T10:07:09-08:00',
    },
    title: 'Recette avec pain, jambon et fromage (croque-monsieur)',
    metaDescription:
      "Du pain, du jambon et du fromage qui traînent : voici la vraie recette du croque-monsieur maison, avec sa béchamel, pour 2 personnes.",
    intro:
      "Pain, jambon et fromage sont les trois ingrédients de base du croque-monsieur : avec une petite béchamel maison, il n'a rien à envier à celui du café du coin.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '4 tranches de pain de mie (ou de pain rassis, ça fonctionne aussi)',
          '4 tranches de jambon',
          '100 g de fromage râpé (emmental ou comté)',
          "Pour la béchamel : 15 g de beurre, 15 g de farine, 20 cl de lait, sel, poivre, muscade",
        ],
      },
      {
        heading: 'Préparation',
        body: [
          "1. Préparez la béchamel : faites fondre le beurre dans une petite casserole à feu doux, ajoutez la farine et mélangez 1 minute pour former un roux.",
          "2. Versez le lait petit à petit en fouettant sans arrêter, pour éviter les grumeaux. Laissez épaissir 3 à 4 minutes à feu doux. Salez, poivrez, ajoutez une pincée de muscade.",
          "3. Préchauffez le four à 200°C (ou allumez le grill).",
          "4. Étalez un peu de béchamel sur 2 tranches de pain, ajoutez une tranche de jambon et un peu de fromage râpé sur chacune.",
          "5. Refermez avec les 2 autres tranches de pain, étalez le reste de béchamel sur le dessus et recouvrez généreusement de fromage râpé.",
          '6. Enfournez 8 à 10 minutes, jusqu\'à ce que le fromage soit fondu et légèrement doré.',
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Du pain de mie légèrement sec fonctionne très bien pour cette recette : il absorbe mieux la béchamel qu'un pain tout juste sorti du paquet.",
          "Pas de lait pour la béchamel ? Un fond de crème fraîche diluée avec un peu d'eau peut la remplacer en dépannage.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Yummeal repère ce qu'il vous reste au frigo et au placard et vous propose des recettes prêtes à suivre.",
  },
  {
    slug: 'carotte-brocoli-soja',
    tags: ['carotte', 'brocoli', 'sauce soja', 'wok'],
    title: 'Recette avec carotte, brocoli et sauce soja',
    metaDescription:
      "Carotte, brocoli et sauce soja au frigo : un wok de légumes croquants, prêt en 15 minutes pour 2 personnes, en accompagnement ou en plat léger.",
    intro:
      "Carotte et brocoli sautés au wok avec un peu de sauce soja font un accompagnement rapide et croquant, ou un plat léger accompagné de riz.",
    sections: [
      {
        heading: 'Ingrédients (pour 2 personnes)',
        body: [
          '2 carottes, coupées en bâtonnets ou en fines rondelles',
          '1 brocoli moyen, coupé en fleurettes',
          '3 cuillères à soupe de sauce soja',
          '1 gousse d\'ail, huile, sel',
          "Optionnel : gingembre frais râpé, graines de sésame",
        ],
      },
      {
        heading: 'Préparation',
        body: [
          "1. Faites blanchir les fleurettes de brocoli 3 minutes dans une casserole d'eau bouillante, puis égouttez-les et passez-les sous l'eau froide pour stopper la cuisson.",
          "2. Dans une grande poêle ou un wok, faites chauffer un filet d'huile à feu vif.",
          "3. Ajoutez les carottes en premier (elles cuisent plus lentement) et faites-les sauter 4 à 5 minutes en remuant régulièrement.",
          "4. Ajoutez le brocoli blanchi et l'ail émincé (et le gingembre si vous en avez), faites sauter encore 2 à 3 minutes : les légumes doivent rester croquants.",
          "5. Versez la sauce soja, mélangez bien pour enrober tous les légumes, laissez chauffer 1 minute de plus.",
          '6. Parsemez de graines de sésame si vous en avez, et servez tel quel ou sur un riz nature.',
        ],
      },
      {
        heading: 'Astuce',
        body: [
          "Des carottes un peu molles conviennent parfaitement à cette recette : la cuisson rapide au wok efface la différence de texture.",
          "Le trognon du brocoli s'utilise aussi : épluché et coupé en petits dés, il se fait sauter en même temps que les carottes.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus chercher quoi cuisiner ?',
    ctaText:
      "Yummeal scanne votre frigo et vous propose directement des recettes adaptées à ce que vous avez déjà.",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
