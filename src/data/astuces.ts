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
    slug: 'cuisson-riz-micro-ondes',
    title: 'Cuire du riz au micro-ondes : la méthode simple et sans surveillance',
    metaDescription:
      'Comment cuire du riz au micro-ondes, sans casserole ni surveillance, avec les bonnes proportions eau-riz et le bon temps de cuisson.',
    intro:
      "Cuire du riz au micro-ondes est une technique parfaitement fiable, à condition de respecter les bonnes proportions d'eau et un temps de repos après cuisson.",
    sections: [
      {
        heading: 'Le principe',
        body: [
          "Le riz cuit au micro-ondes de la même façon que sur une plaque : les grains absorbent l'eau chauffée jusqu'à devenir tendres. La différence, c'est que la chaleur vient de partout à la fois, ce qui demande un contenant adapté et un peu plus d'eau qu'à la casserole.",
          "Utilisez un plat large et haut plutôt qu'étroit : le riz gonfle en cuisant et un contenant trop juste déborde.",
        ],
      },
      {
        heading: 'Les proportions et le temps',
        body: [
          "Comptez 1 volume de riz pour 2 volumes d'eau (par exemple 200 ml de riz pour 400 ml d'eau), et couvrez le plat avec une assiette ou un couvercle adapté au micro-ondes en laissant un léger interstice pour la vapeur.",
          "Faites cuire à pleine puissance environ 10 à 12 minutes pour du riz blanc classique, puis laissez reposer 5 minutes à couvert avant d'ouvrir : c'est ce repos qui finit d'absorber l'eau restante et donne des grains bien détachés.",
          "Si le riz est encore un peu ferme à l'ouverture, ajoutez une cuillère à soupe d'eau et repassez 1 à 2 minutes.",
        ],
      },
    ],
    ctaTitle: 'Envie de recettes qui utilisent ce que vous avez déjà ?',
    ctaText:
      "Yummeal scanne votre frigo et vos placards et vous propose des recettes adaptées, sans avoir à deviner les proportions.",
    tags: ['riz', 'micro-ondes', 'cuisson'],
  },
  {
    slug: 'conserver-demi-avocat-sans-noircir',
    title: 'Conserver un demi-avocat sans qu\'il noircisse',
    metaDescription:
      "Comment garder la moitié d'un avocat bien verte au frigo, avec le noyau, du citron et un contact hermétique.",
    intro:
      "Un demi-avocat noircit vite à l'air libre, mais quelques gestes simples ralentissent nettement ce phénomène et gardent la chair présentable plusieurs jours.",
    sections: [
      {
        heading: 'Pourquoi il noircit',
        body: [
          "L'avocat contient une enzyme qui, au contact de l'oxygène de l'air, provoque une réaction d'oxydation similaire à celle d'une pomme coupée. C'est purement esthétique : la chair noircie reste comestible tant qu'elle n'est pas visqueuse ou moisie.",
        ],
      },
      {
        heading: 'Les gestes qui ralentissent l\'oxydation',
        body: [
          "Gardez le noyau dans la moitié non consommée : il ne stoppe pas totalement l'oxydation, mais protège une petite zone de contact avec l'air, en plus de servir de repère visuel.",
          "Badigeonnez la surface exposée de jus de citron ou de citron vert : l'acidité ralentit la réaction d'oxydation.",
          "Enveloppez-le ensuite hermétiquement, au plus près de la chair (film alimentaire collé directement dessus, ou boîte hermétique de la taille de l'avocat pour limiter l'air à l'intérieur), et placez-le au frigo.",
          "S'il a tout de même légèrement bruni en surface au moment de l'utiliser, une fine couche superficielle suffit à retirer pour retrouver une chair verte en dessous.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus jamais gaspiller un reste ?',
    ctaText:
      "Yummeal repère ce qu'il reste dans votre frigo et vous propose une recette pour l'utiliser avant qu'il ne soit trop tard.",
    tags: ['avocat', 'conservation', 'oxydation'],
  },
  {
    slug: 'faire-reverdir-salade-fletrie',
    title: 'Redonner du croquant à une salade flétrie',
    metaDescription:
      "L'astuce pour raviver des feuilles de salade molles ou fripées : un bain d'eau très froide.",
    intro:
      "Des feuilles de salade molles au fond du bac à légumes ne sont pas forcément perdues : un simple bain d'eau glacée leur redonne souvent tout leur croquant.",
    sections: [
      {
        heading: 'Pourquoi ça marche',
        body: [
          "Une feuille de salade flétrit quand elle perd de son eau interne : les cellules se dégonflent et la feuille devient molle. Plongée dans une eau très froide, la feuille réabsorbe de l'eau par ses cellules, ce qui la regonfle et lui redonne de la tenue.",
        ],
      },
      {
        heading: 'La méthode',
        body: [
          "Remplissez un grand saladier d'eau froide et ajoutez quelques glaçons pour la rendre la plus froide possible.",
          "Plongez les feuilles flétries dedans et laissez-les tremper 10 à 15 minutes.",
          "Égouttez-les bien et essorez-les (à l'essoreuse à salade si possible) avant de les servir : des feuilles encore mouillées font une salade détrempée.",
          "Cette technique fonctionne pour retendre la feuille, mais ne rattrape pas des feuilles déjà jaunies, visqueuses ou qui sentent mauvais : dans ce cas, il vaut mieux les jeter.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus jamais vous poser la question ?',
    ctaText:
      "Yummeal scanne votre frigo et vous propose des recettes adaptées à ce que vous avez déjà, avant que ça ne s'abîme.",
    tags: ['salade', 'légumes', 'conservation'],
  },
  {
    slug: 'dessaler-une-soupe-trop-salee',
    title: 'Rattraper une soupe trop salée',
    metaDescription:
      "Comment dessaler une soupe qu'on a trop salée, avec de la pomme de terre crue ou simplement en diluant.",
    intro:
      "Une soupe trop salée se rattrape presque toujours, sans avoir à tout recommencer : deux méthodes simples permettent de rééquilibrer le goût.",
    sections: [
      {
        heading: 'La méthode de la pomme de terre',
        body: [
          "Ajoutez un ou deux morceaux de pomme de terre crue, épluchée et coupée en gros dés, directement dans la soupe en train de mijoter.",
          "Laissez cuire 15 à 20 minutes : la pomme de terre absorbe une partie du sel présent dans le liquide grâce à son amidon.",
          "Retirez les morceaux avant de servir, ou mixez-les avec le reste si la texture de la soupe le permet : dans ce cas, ils épaississent la préparation au passage.",
        ],
      },
      {
        heading: 'La méthode de la dilution',
        body: [
          "Si vous n'avez pas de pomme de terre sous la main, ajoutez simplement de l'eau, du bouillon non salé ou de la crème pour diluer la concentration en sel, puis rectifiez les autres assaisonnements en conséquence.",
          "Cette méthode change le volume et parfois la texture de la soupe : mieux vaut l'anticiper si vous devez servir une quantité précise.",
        ],
      },
    ],
    ctaTitle: 'Envie de recettes qui tombent toujours juste ?',
    ctaText:
      "Yummeal vous propose des recettes avec les bonnes quantités, adaptées à ce que vous avez dans votre frigo.",
    tags: ['soupe', 'sel', 'rattraper un plat'],
  },
  {
    slug: 'rattraper-une-mayonnaise-ratee',
    title: 'Rattraper une mayonnaise qui a tranché',
    metaDescription:
      "La technique classique pour sauver une mayonnaise ratée : repartir d'un jaune d'œuf neuf et incorporer la mayonnaise ratée petit à petit.",
    intro:
      "Une mayonnaise qui tranche (huile et jaune qui se séparent) n'est pas perdue : elle se rattrape presque toujours en repartant d'une nouvelle base.",
    sections: [
      {
        heading: 'Pourquoi une mayonnaise tranche',
        body: [
          "La mayonnaise est une émulsion : le jaune d'œuf retient l'huile en fines gouttelettes grâce à la lécithine qu'il contient. Si l'huile est versée trop vite ou en trop grande quantité par rapport à la capacité du jaune à l'émulsionner, le mélange se sépare et devient liquide ou grumeleux.",
        ],
      },
      {
        heading: 'La méthode pour la rattraper',
        body: [
          "Dans un bol propre, cassez un nouveau jaune d'œuf (ou utilisez une cuillère à café d'eau tiède ou de moutarde, qui fonctionnent aussi comme base d'émulsion).",
          "Fouettez ce nouveau jaune seul quelques secondes, puis incorporez la mayonnaise ratée petit à petit, en un mince filet, tout en fouettant énergiquement sans interruption.",
          "L'émulsion se reforme progressivement autour du nouveau jaune : continuez d'incorporer le reste de mayonnaise ratée jusqu'à ce que tout soit lisse et homogène.",
          "Cette technique fonctionne aussi bien au fouet à la main qu'au mixeur plongeant.",
        ],
      },
    ],
    ctaTitle: 'Envie de recettes qui marchent à tous les coups ?',
    ctaText:
      "Yummeal vous guide pas à pas avec des recettes adaptées à ce que vous avez dans votre frigo.",
    tags: ['mayonnaise', 'sauce', 'rattraper un plat'],
  },
  {
    slug: 'nettoyer-poele-brulee-naturellement',
    title: 'Nettoyer une poêle brûlée sans produit agressif',
    metaDescription:
      "Comment décoller des résidus brûlés au fond d'une poêle avec de l'eau chaude, du bicarbonate et un peu de patience.",
    intro:
      "Une poêle avec des résidus brûlés accrochés au fond se nettoie efficacement avec de l'eau chaude et du bicarbonate de soude, sans avoir besoin de frotter au point d'abîmer le revêtement.",
    sections: [
      {
        heading: 'Pourquoi le bicarbonate fonctionne',
        body: [
          "Le bicarbonate de soude est légèrement abrasif sans être agressif pour la plupart des surfaces, et il réagit avec la chaleur et l'humidité pour aider à décoller les résidus carbonisés collés au métal.",
        ],
      },
      {
        heading: 'La méthode',
        body: [
          "Remplissez la poêle d'eau chaude jusqu'à couvrir les zones brûlées, ajoutez deux à trois cuillères à soupe de bicarbonate de soude, et portez à ébullition quelques minutes sur le feu.",
          "Laissez reposer hors du feu 15 à 30 minutes : les résidus se ramollissent et commencent à se détacher tout seuls.",
          "Videz l'eau puis frottez avec une éponge non abrasive (ou le côté doux d'une éponge grattante pour l'inox) : les dépôts partent beaucoup plus facilement.",
          "Pour une poêle antiadhésive, évitez le côté abrasif d'une éponge et préférez un trempage plus long plutôt que de frotter fort, pour ne pas rayer le revêtement.",
        ],
      },
    ],
    ctaTitle: 'Envie de cuisiner sans y penser ?',
    ctaText:
      "Yummeal vous propose des recettes adaptées à ce que vous avez déjà dans votre frigo, pour cuisiner plus simplement au quotidien.",
    tags: ['poêle', 'nettoyage', 'bicarbonate'],
  },
  {
    slug: 'congelation-herbes-fraiches-huile',
    title: 'Congeler des herbes fraîches dans l\'huile pour ne rien perdre',
    metaDescription:
      "Comment congeler du persil, du basilic ou de la coriandre en cubes d'huile pour garder leurs arômes plusieurs mois.",
    intro:
      "Des herbes fraîches en trop, avant qu'elles ne fanent, se congèlent très bien hachées dans un peu d'huile : une méthode simple qui préserve leurs arômes plusieurs mois.",
    sections: [
      {
        heading: 'Pourquoi congeler dans l\'huile',
        body: [
          "Congelées seules, les herbes fraîches deviennent noires et perdent une partie de leur texture et de leurs arômes volatils une fois décongelées. Congelées dans l'huile, elles sont protégées du contact direct avec l'air du congélateur (qui les dessèche et les oxyde), ce qui préserve mieux leur goût.",
        ],
      },
      {
        heading: 'La méthode',
        body: [
          "Lavez et séchez soigneusement les herbes (basilic, persil, coriandre, ciboulette...), puis hachez-les finement.",
          "Répartissez-les dans un bac à glaçons, en remplissant chaque compartiment aux deux tiers d'herbes hachées.",
          "Recouvrez d'huile d'olive ou d'huile neutre jusqu'à couvrir complètement les herbes, puis placez au congélateur.",
          "Une fois les cubes congelés, démoulez-les et transférez-les dans un sac de congélation pour gagner de la place : ils se conservent ainsi plusieurs mois.",
          "Utilisez-les directement, sans décongélation, dans une poêlée, une sauce ou une soupe en fin de cuisson.",
        ],
      },
    ],
    ctaTitle: 'Envie de ne plus jamais jeter vos herbes fraîches ?',
    ctaText:
      "Yummeal repère ce qu'il vous reste au frigo et vous propose des recettes pour tout utiliser avant que ça ne s'abîme.",
    tags: ['herbes fraîches', 'congélation', 'anti-gaspi'],
  },
  {
    slug: 'cuisiner-sans-sel-mais-avec-goût',
    title: 'Cuisiner avec moins de sel sans perdre en goût',
    metaDescription:
      "Comment relever un plat sans sel grâce à l'acidité, aux herbes et aux épices, pour compenser sans compromis sur le goût.",
    intro:
      "Réduire le sel dans un plat ne veut pas dire sacrifier le goût : d'autres leviers (acidité, herbes, épices, umami) permettent de relever une préparation autrement.",
    sections: [
      {
        heading: "Pourquoi le sel n'est pas la seule option",
        body: [
          "Le sel agit surtout en exhausteur de goût : il rend les saveurs existantes plus perceptibles. Or plusieurs autres ingrédients jouent ce même rôle d'exhausteur sans passer par le sodium, ce qui permet de compenser sa réduction.",
        ],
      },
      {
        heading: 'Les leviers à utiliser',
        body: [
          "L'acidité (jus de citron, vinaigre, tomate) réveille un plat et masque efficacement le manque de sel, en particulier sur les légumes ou le poisson.",
          "Les herbes fraîches et les épices (ail, poivre, cumin, paprika, herbes de Provence) apportent du relief et détournent l'attention du palais du manque de sel.",
          "Les aliments riches en umami (parmesan, champignons, tomates séchées, sauce soja utilisée en petite quantité) donnent une impression de plat plus relevé sans forcément beaucoup de sodium.",
          "Le fait de saler en fin de cuisson plutôt qu'au début permet de percevoir davantage le sel utilisé : il reste en surface au lieu d'être dilué dans tout le plat.",
        ],
      },
    ],
    ctaTitle: 'Envie de manger sainement sans y penser ?',
    ctaText:
      "Yummeal vous propose des recettes équilibrées et savoureuses, adaptées à ce que vous avez dans votre frigo.",
    tags: ['sel', 'assaisonnement', 'épices'],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
