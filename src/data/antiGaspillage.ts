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
    slug: 'organiser-frigo-etudiant',
    title: 'Organiser son frigo en studio étudiant',
    metaDescription:
      "Un petit frigo mal rangé, c'est la garantie d'oublier un yaourt au fond ou de racheter ce qu'on a déjà. Voici comment l'organiser simplement en studio.",
    intro:
      "Dans un studio, le frigo est souvent petit, partagé avec peu de rangements, et vite rempli en vrac. Résultat : on oublie ce qu'on a, on rachète en double, et ce qui traîne au fond finit à la poubelle. Une organisation simple change beaucoup de choses.",
    sections: [
      {
        heading: 'Zoner le frigo par type d\'aliment',
        body: [
          "Même dans un petit frigo, garder des zones fixes aide à se souvenir de ce qu'on a. Par exemple : une étagère pour les produits entamés à consommer en priorité, le bac du bas pour les légumes, la porte pour les condiments et sauces qui se conservent longtemps.",
          "L'idée n'est pas d'avoir un frigo parfaitement rangé façon magazine, juste d'avoir toujours le même réflexe pour savoir où chercher (et où reposer) chaque type de produit.",
        ],
      },
      {
        heading: 'Mettre les produits à finir devant, pas derrière',
        body: [
          "Le classique du gaspillage : un produit ouvert repoussé au fond pour faire de la place à un produit neuf devant. Prenez l'habitude inverse : chaque nouvel achat va derrière, ce qui est déjà entamé reste devant, à hauteur des yeux.",
          "Cette règle simple (parfois appelée FIFO, \"premier arrivé, premier sorti\") suffit à elle seule à réduire une grande partie des oublis.",
        ],
      },
      {
        heading: 'Garder une vue d\'ensemble avant de faire les courses',
        body: [
          "Avant d'aller faire des courses, un coup d'œil rapide au frigo évite d'acheter en double ce qui traîne déjà dans un coin. Beaucoup de gaspillage vient simplement du fait de ne plus savoir ce qu'on possède.",
          "Un frigo transparent, avec des boîtes plutôt que des sacs plastiques opaques, aide à repérer d'un coup d'œil ce qui est prêt à être mangé.",
        ],
      },
      {
        heading: 'Adapter l\'organisation à un petit espace',
        body: [
          "En studio, le frigo est souvent un mini-frigo ou un frigo sous plan de travail : moins de bacs, moins de hauteur. Dans ce cas, mieux vaut privilégier des boîtes empilables plutôt que des emballages d'origine encombrants, et vider les restes de gros contenants (bouteille de sauce à moitié vide, par exemple) dans des contenants plus petits pour gagner de la place.",
        ],
      },
    ],
    ctaTitle: 'Un frigo bien rangé, des recettes trouvées automatiquement',
    ctaText:
      "Yummeal identifie ce que vous avez dans votre frigo et vous propose directement des recettes adaptées, pour ne plus laisser un produit oublié devenir un gaspillage.",
    tags: ['frigo', 'organisation', 'étudiant', 'anti-gaspi'],
  },
  {
    slug: 'comprendre-dates-peremption',
    title: 'DLC ou DDM : comprendre les vraies dates de péremption',
    metaDescription:
      "DLC et DDM ne veulent pas dire la même chose. La différence, expliquée simplement, pour éviter de jeter par excès de prudence.",
    intro:
      "Beaucoup de nourriture est jetée non pas parce qu'elle est réellement impropre à la consommation, mais parce qu'on confond deux types de dates très différents imprimés sur les emballages : la DLC et la DDM.",
    sections: [
      {
        heading: 'La DLC : « à consommer jusqu\'au »',
        body: [
          'La DLC (Date Limite de Consommation) concerne les produits frais et périssables : produits laitiers frais, viande, poisson, plats préparés réfrigérés. Elle est indiquée par la formule « à consommer jusqu\'au ».',
          "C'est une date de sécurité : passé ce délai, le produit peut présenter un risque sanitaire réel, même s'il n'a pas d'odeur ou d'aspect suspect. Pour ces produits, la prudence est de mise et il ne faut pas les consommer après la date indiquée.",
        ],
      },
      {
        heading: 'La DDM : « à consommer de préférence avant le »',
        body: [
          "La DDM (Date de Durabilité Minimale, anciennement appelée DLUO) concerne les produits plus stables : pâtes, riz, conserves, biscuits, produits surgelés, certains yaourts, chocolat... Elle est indiquée par la formule « à consommer de préférence avant le » ou une variante comme « à consommer de préférence avant fin ».",
          "Contrairement à la DLC, cette date n'est pas une limite de sécurité mais une indication de qualité optimale. Passé cette date, le produit peut perdre en goût, en texture ou en croquant, mais reste généralement consommable s'il est stocké correctement et que l'emballage n'est pas endommagé.",
        ],
      },
      {
        heading: 'Comment faire la différence en pratique',
        body: [
          "Le réflexe le plus fiable est de lire la formule exacte inscrite sur l'emballage plutôt que de se fier à l'intuition : « à consommer jusqu'au » = DLC = date de sécurité à respecter strictement. « à consommer de préférence avant le » = DDM = date indicative, à évaluer au cas par cas (aspect, odeur, texture).",
          "Cette distinction, encadrée par la réglementation européenne sur l'information des consommateurs, existe justement pour éviter que les deux types de produits soient traités de la même façon.",
        ],
      },
      {
        heading: 'Dans le doute, utiliser ses sens',
        body: [
          "Pour un produit en DDM dépassée, l'observation reste le meilleur guide : aspect, odeur, texture. Un yaourt légèrement passé sa DDM mais dont l'odeur et la texture sont normales ne présente généralement pas de risque particulier.",
          "Pour un produit en DLC, en revanche, ce raisonnement ne s'applique pas : l'absence d'odeur suspecte ne garantit pas l'absence de risque, d'où l'importance de respecter cette date-là.",
        ],
      },
    ],
    ctaTitle: 'Moins de doutes sur les dates, plus de repas anti-gaspi',
    ctaText:
      "Yummeal vous aide à utiliser vos produits avant qu'ils n'approchent de leur date, en proposant des recettes adaptées à ce qui traîne déjà dans votre frigo.",
    tags: ['dlc', 'ddm', 'date de péremption', 'conservation'],
  },
  {
    slug: 'cuisiner-fanes-carottes',
    title: 'Cuisiner les fanes de légumes : la méthode générale',
    metaDescription:
      "Fanes de carottes, radis, céleri, fenouil : comment savoir lesquelles se cuisinent, et de quelle façon, au lieu de les jeter.",
    intro:
      "La plupart des fanes de légumes (carottes, radis, céleri, fenouil, betteraves...) sont jetées par réflexe alors qu'elles sont comestibles et pleines de goût. Plutôt qu'une recette précise, voici une méthode générale pour savoir quoi faire de n'importe quelle fane qui vous passe entre les mains.",
    sections: [
      {
        heading: 'Vérifier que la fane est encore bonne',
        body: [
          "Une fane se juge comme une herbe fraîche : verte, souple, sans jaunissement ni flétrissure marquée. Si elle est molle, visqueuse ou qu'elle sent le moisi, elle part au compost plutôt que dans l'assiette.",
          "Séparez toujours les fanes de la racine ou du bulbe dès l'achat : elles continuent de pomper l'humidité du légume si elles restent attachées, ce qui accélère le flétrissement des deux côtés.",
        ],
      },
      {
        heading: 'Adapter la préparation selon la texture',
        body: [
          "Les fanes fines et tendres (carotte, radis) se mangent crues, ciselées en salade, ou juste saisies quelques secondes. Les fanes plus fibreuses (céleri, fenouil, betterave) gagnent à être cuites un peu plus longtemps, en soupe ou en poêlée, pour attendrir leurs fibres.",
          "Dans le doute, goûtez un petit morceau cru : s'il n'est pas amer ni trop fibreux, la fane se prête à une utilisation crue ; sinon, privilégiez la cuisson.",
        ],
      },
      {
        heading: 'Trois façons de les utiliser, quelle que soit la fane',
        body: [
          "En pesto : fanes mixées avec de l'huile, un peu d'ail, des fruits à coque ou du parmesan. C'est la méthode la plus polyvalente, qui fonctionne avec presque toutes les fanes.",
          "En soupe : ajoutées en fin de cuisson à un bouillon ou une soupe de légumes, elles apportent du goût sans dénaturer la recette de base.",
          "Ciselées crues : en garniture d'une salade ou d'un plat, comme on utiliserait du persil ou de la coriandre.",
        ],
      },
      {
        heading: 'Laver soigneusement avant utilisation',
        body: [
          "Les fanes poussent près de la terre et en retiennent souvent beaucoup à leur base : un lavage à grande eau, voire plusieurs rinçages successifs, est nécessaire avant de les cuisiner, plus encore que pour le reste du légume.",
        ],
      },
    ],
    ctaTitle: 'Ne laissez plus une fane finir à la poubelle',
    ctaText:
      "Yummeal identifie les légumes de votre frigo et vous propose des recettes qui valorisent aussi les parties qu'on jette trop souvent, comme les fanes.",
    tags: ['fanes', 'légumes', 'carottes', 'anti-gaspi'],
  },
  {
    slug: 'astuces-economies-courses-etudiant',
    title: 'Économiser sur ses courses quand on est étudiant',
    metaDescription:
      "Petit budget, petit frigo, emploi du temps irrégulier : des astuces concrètes pour moins gaspiller et économiser sur les courses.",
    intro:
      "Avec un budget serré et un rythme de vie souvent irrégulier, le gaspillage alimentaire pèse plus lourd dans le budget étudiant qu'il n'y paraît : chaque produit jeté est de l'argent dépensé pour rien. Quelques habitudes simples permettent de limiter la casse.",
    sections: [
      {
        heading: 'Faire ses courses en fonction de ce qui reste',
        body: [
          "Avant chaque liste de courses, un rapide inventaire du frigo et des placards évite d'acheter en double ce qui traîne déjà. C'est l'étape la plus simple et la plus souvent négligée.",
          "Prévoyez les repas de la semaine autour de ce qu'il reste avant de compléter avec de nouveaux achats, plutôt que l'inverse.",
        ],
      },
      {
        heading: 'Privilégier les petits formats et le vrac quand c\'est possible',
        body: [
          "Un gros format n'est une économie que si le produit est réellement consommé avant de s'abîmer. Pour un produit consommé rarement ou en petite quantité, un format plus petit ou un rayon vrac limite le risque de perte.",
          "À l'inverse, pour les produits qui se congèlent facilement (pain, viande, légumes), un achat plus important reste avantageux, à condition de congeler dès l'achat.",
        ],
      },
      {
        heading: 'Utiliser les produits « à date courte » en priorité',
        body: [
          "Beaucoup de magasins proposent des produits proches de leur date à prix réduit. Ces produits ne sont pas de moindre qualité, juste à consommer plus rapidement : parfaits pour un repas prévu dans les jours qui suivent.",
        ],
      },
      {
        heading: 'Cuisiner en portions adaptées à un foyer réduit',
        body: [
          "Beaucoup de recettes sont pensées pour 4 personnes par défaut. Divisez les quantités, ou cuisinez la quantité complète et congelez les portions en trop plutôt que de les laisser traîner au frigo jusqu'à ce qu'elles ne soient plus consommables.",
        ],
      },
      {
        heading: 'Garder une trace de ce qui a été jeté',
        body: [
          "Repérer sur quelques semaines ce qui finit régulièrement à la poubelle (un type de légume, un format de pain, un produit acheté par habitude sans être vraiment utilisé) aide à ajuster les prochaines courses en conséquence.",
        ],
      },
    ],
    ctaTitle: 'Moins de gaspillage, plus de budget pour le reste',
    ctaText:
      "Yummeal propose des recettes à partir de ce que vous avez déjà, pour utiliser vos courses jusqu'au bout plutôt que de racheter ce qui traîne déjà chez vous.",
    tags: ['étudiant', 'courses', 'budget', 'anti-gaspi'],
  },
  {
    slug: 'comment-conserver-oignons-coupes',
    title: 'Comment bien conserver un oignon coupé',
    metaDescription:
      "Un oignon entamé qui traîne au frigo : comment le conserver correctement pour qu'il tienne plusieurs jours sans se gâter.",
    intro:
      "Un oignon coupé se conserve moins longtemps qu'un oignon entier, mais largement assez pour ne pas avoir à le jeter après une seule utilisation, à condition de bien le stocker.",
    sections: [
      {
        heading: 'Pourquoi un oignon coupé s\'abîme plus vite',
        body: [
          "Tant qu'il est entier, l'oignon est protégé par sa pelure sèche, qui limite les échanges avec l'air et l'humidité. Une fois coupé, cette protection disparaît sur la face exposée, qui s'oxyde et peut absorber les odeurs environnantes du frigo.",
        ],
      },
      {
        heading: 'Bien l\'emballer dès la découpe',
        body: [
          "Enveloppez la partie coupée serrée dans du film alimentaire, ou placez le reste d'oignon dans une boîte hermétique, face coupée vers le bas si possible. Cela limite à la fois le dessèchement et la transmission d'odeur aux autres aliments du frigo.",
          "Évitez de le laisser simplement posé sur une étagère sans protection : c'est la façon la plus rapide de le voir se dessécher et prendre l'odeur d'autres produits.",
        ],
      },
      {
        heading: 'Combien de temps le garder',
        body: [
          "Un demi-oignon bien emballé au frigo se conserve généralement plusieurs jours (autour d'une semaine). Au-delà, surveillez son aspect : une odeur forte inhabituelle, une texture visqueuse ou des moisissures signalent qu'il faut le jeter.",
          "Une légère oxydation en surface (couleur qui fonce un peu) n'est pas un problème : elle part avec la première fine couche retirée au couteau.",
        ],
      },
      {
        heading: 'Anticiper plutôt que stocker longtemps',
        body: [
          "Si vous savez que vous n'utiliserez pas le reste rapidement, mieux vaut l'émincer et le congeler tout de suite plutôt que d'attendre qu'il se dégrade au frigo. Congelé, il se garde plusieurs mois et s'utilise directement dans une poêlée ou une sauce, sans décongélation préalable.",
        ],
      },
    ],
    ctaTitle: 'Un demi-oignon, une recette trouvée en quelques secondes',
    ctaText:
      "Yummeal repère les restes comme un demi-oignon dans votre frigo et vous suggère directement une recette pour l'utiliser avant qu'il ne se gâte.",
    tags: ['oignon', 'conservation', 'restes'],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
