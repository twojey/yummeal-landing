export interface IngredientCategory {
  slug: string;
  label: string;
  description: string;
}

export interface Ingredient {
  slug: string;
  categorySlug: string;
  name: string;
  metaDescription: string;
  intro: string;
  why: string;
  tips: string[];
  recipeIdeas: string[];
}

export const ingredientCategories: IngredientCategory[] = [
  {
    slug: 'legumes',
    label: 'Légumes',
    description:
      "Les légumes sont les premiers à finir oubliés au fond du bac à légumes. Voici comment les rattraper avant qu'ils ne partent à la poubelle.",
  },
  {
    slug: 'fruits',
    label: 'Fruits',
    description:
      'Trop mûrs, tachés ou fripés : les fruits abîmés se cuisinent presque toujours, même quand ils ne se mangent plus tels quels.',
  },
  {
    slug: 'viandes-poissons',
    label: 'Viandes & poissons',
    description:
      "Restes de viande cuite, poisson en conserve entamé : les protéines déjà cuisinées se réutilisent facilement dans un second plat.",
  },
  {
    slug: 'epicerie-feculents',
    label: 'Épicerie & féculents',
    description:
      'Riz de la veille, pain rassis, fond de pot entamé : ce sont souvent les produits les plus simples à sauver, à condition d\'y penser.',
  },
  {
    slug: 'produits-laitiers',
    label: 'Produits laitiers & œufs',
    description:
      'Crème, fromage, œufs séparés : les produits laitiers ont des usages de cuisine qui dépassent largement leur usage "brut".',
  },
];

export const ingredients: Ingredient[] = [
  // --- Légumes ---
  {
    slug: 'courgettes',
    categorySlug: 'legumes',
    name: 'Courgettes',
    metaDescription:
      "Que faire avec des courgettes qui commencent à ramollir ? Des idées simples pour les cuisiner avant qu'elles ne soient plus bonnes.",
    intro:
      "Une courgette qui ramollit légèrement ou dont la peau se plisse n'est pas perdue : tant qu'elle ne suinte pas et que la chair reste ferme au centre, elle se cuisine normalement.",
    why: "La courgette est composée à plus de 90% d'eau : elle perd sa fermeté en quelques jours au frigo, bien avant de devenir impropre à la consommation.",
    tips: [
      "Coupez les extrémités et goûtez un petit morceau cru : si ce n'est pas amer, elle est bonne.",
      'Râpée, elle se congèle très bien pour une future soupe ou un gratin.',
      "Une courgette qui a perdu son croquant est idéale poêlée ou en soupe, là où la texture importe moins qu'en salade.",
    ],
    recipeIdeas: [
      'Soupe de courgette au fromage frais',
      'Gratin de courgettes râpées',
      'Poêlée courgette-tomate-ail en accompagnement',
    ],
  },
  {
    slug: 'poivrons-restes',
    categorySlug: 'legumes',
    name: 'Restes de poivrons',
    metaDescription:
      "Un demi-poivron entamé au frigo ? Voici comment l'utiliser avant qu'il ne se dessèche.",
    intro:
      "Un demi-poivron oublié se dessèche vite une fois coupé, mais il garde son goût plusieurs jours s'il est bien emballé.",
    why: 'Une fois entamé, le poivron perd sa protection naturelle (la peau intacte) et s\'oxyde au contact de l\'air, d\'où son aspect flétri en surface.',
    tips: [
      'Enveloppez-le bien serré dans un film ou une boîte hermétique dès la découpe.',
      "S'il commence à se rider, coupez-le en lamelles et faites-le revenir : la cuisson masque la texture ramollie.",
      'Il se congèle cru, coupé en dés, pour une future poêlée ou omelette.',
    ],
    recipeIdeas: [
      'Omelette aux restes de poivrons',
      'Poêlée de poivrons et oignons en garniture',
      'Riz sauté aux légumes du frigo',
    ],
  },
  {
    slug: 'brocoli-anti-gaspi',
    categorySlug: 'legumes',
    name: 'Brocoli',
    metaDescription:
      'Brocoli qui jaunit ou trognon de brocoli : comment tout utiliser sans rien jeter.',
    intro:
      "Un brocoli qui jaunit légèrement en surface se cuisine très bien, et le trognon (souvent jeté) se mange aussi.",
    why: "Le jaunissement des fleurettes est un signe de vieillissement naturel, pas de dégradation : le brocoli reste comestible tant qu'il ne devient pas mou et malodorant.",
    tips: [
      'Épluchez le trognon avec un économe : la partie fibreuse externe part, le cœur tendre reste.',
      'Coupez le trognon en petits dés pour qu\'il cuise à la même vitesse que les fleurettes.',
      'Un brocoli légèrement jauni se marie bien avec un assaisonnement relevé (ail, parmesan) qui compense la perte de fraîcheur.',
    ],
    recipeIdeas: [
      'Brocoli entier (trognon compris) rôti au four',
      'Soupe de brocoli au fromage',
      'Riz sauté brocoli-œuf',
    ],
  },
  {
    slug: 'carottes-anti-gaspi',
    categorySlug: 'legumes',
    name: 'Carottes molles',
    metaDescription:
      'Des carottes qui ramollissent au fond du frigo ? Elles se rattrapent facilement, cuites.',
    intro:
      "Une carotte molle n'a rien de dangereux : elle a juste perdu son eau. Cuite, la différence de texture disparaît presque complètement.",
    why: 'Comme la courgette, la carotte est majoritairement composée d\'eau, qui s\'évapore lentement au réfrigérateur, surtout si elle n\'est pas dans un sac fermé.',
    tips: [
      "Pour la retendre avant une utilisation crue, plongez-la 30 minutes dans l'eau froide.",
      'En dés ou en rondelles, elle cuit vite dans une soupe ou un pot-au-feu.',
      "Râpée et cuite à la poêle avec un peu de miel, elle devient un accompagnement sucré-salé simple.",
    ],
    recipeIdeas: [
      'Soupe carotte-gingembre',
      'Carottes glacées au miel',
      "Purée carotte-pomme de terre",
    ],
  },
  {
    slug: 'girolles-champignons',
    categorySlug: 'legumes',
    name: 'Champignons (girolles et autres)',
    metaDescription:
      'Champignons qui se dessèchent ou légèrement visqueux : comment savoir s\'ils sont encore bons et quoi en faire.',
    intro:
      "Un champignon qui se dessèche et se ratatine reste comestible ; un champignon visqueux ou qui sent le moisi doit en revanche être jeté.",
    why: 'Les champignons sont très riches en eau et n\'ont pas de peau protectrice : ils se dessèchent ou, à l\'inverse, deviennent visqueux selon l\'humidité du frigo.',
    tips: [
      'Stockez-les dans un sac en papier plutôt qu\'un sac plastique : ça évite la condensation qui les fait glisser.',
      'S\'ils sont juste desséchés, une cuisson à la poêle avec un peu de beurre leur redonne du moelleux.',
      'Ne les lavez jamais à grande eau : ils l\'absorbent et se gâtent plus vite ensuite.',
    ],
    recipeIdeas: [
      'Poêlée de champignons persillade',
      'Omelette aux champignons',
      'Risotto aux champignons',
    ],
  },
  {
    slug: 'ail-conservation',
    categorySlug: 'legumes',
    name: 'Ail qui germe',
    metaDescription:
      "Une tête d'ail qui a germé n'est pas perdue : voici comment l'utiliser et éviter que le germe rende amer.",
    intro:
      "Une gousse d'ail qui a un germe vert au centre reste comestible : seul le germe est plus amer et un peu plus difficile à digérer.",
    why: "Le germe apparaît quand l'ail commence naturellement à vouloir repousser, généralement après plusieurs semaines de stockage à température ambiante.",
    tips: [
      "Coupez la gousse en deux dans la longueur et retirez le germe vert au centre avec la pointe d'un couteau.",
      "Une fois le germe retiré, la gousse se cuisine exactement comme une gousse fraîche.",
      "Conservez l'ail au sec et à l'abri de la lumière pour ralentir la germination.",
    ],
    recipeIdeas: [
      'Ail confit à l\'huile d\'olive',
      'Sauce tomate maison',
      'Beurre d\'ail pour tartines',
    ],
  },
  {
    slug: 'oignons-conservation',
    categorySlug: 'legumes',
    name: 'Oignons entamés',
    metaDescription:
      "Un oignon coupé en deux, mais pas fini : comment le conserver et ne pas le gaspiller.",
    intro:
      "Un demi-oignon se conserve quelques jours au frigo, bien emballé, même s'il perd un peu de sa fermeté.",
    why: "Une fois coupé, l'oignon perd sa pelure protectrice et s'oxyde à l'air, ce qui le fait légèrement noircir en surface sans le rendre impropre à la consommation.",
    tips: [
      'Enveloppez la face coupée avec du film alimentaire pour limiter le contact avec l\'air.',
      'La partie oxydée en surface part avec les premières couches : le reste est intact.',
      'Émincé et congelé, l\'oignon se garde plusieurs mois pour vos futures cuissons.',
    ],
    recipeIdeas: [
      'Oignons caramélisés',
      'Soupe à l\'oignon',
      'Base pour sauce tomate ou bolognaise',
    ],
  },
  {
    slug: 'pommes-terre-anti-gaspi',
    categorySlug: 'legumes',
    name: 'Pommes de terre qui germent',
    metaDescription:
      "Des pommes de terre qui germent ou verdissent : que faire, et où est la limite avant de les jeter ?",
    intro:
      "Une pomme de terre qui a de petits germes reste utilisable une fois les germes retirés ; en revanche, une peau devenue verte doit être largement épluchée, cette partie étant plus concentrée en solanine.",
    why: "La germination et le verdissement sont deux réactions naturelles à la lumière et à la chaleur, qui poussent la pomme de terre à produire de la solanine, une substance à éviter en trop grande quantité.",
    tips: [
      "Retirez les germes à la main ou au couteau avant épluchage.",
      "Épluchez largement toute zone verte plutôt que de la laisser.",
      "Conservez les pommes de terre au sec, à l'abri de la lumière, idéalement pas au frigo (le froid modifie leur goût).",
    ],
    recipeIdeas: [
      'Purée maison',
      'Gratin dauphinois',
      'Pommes de terre sautées à la poêle',
    ],
  },
  {
    slug: 'tomates-anti-gaspi',
    categorySlug: 'legumes',
    name: 'Tomates trop mûres',
    metaDescription:
      "Des tomates trop mûres ou légèrement molles ? Elles sont parfaites cuisinées, même si elles ne sont plus bonnes crues.",
    intro:
      "Une tomate trop mûre a souvent plus de goût qu'une tomate ferme : c'est le moment idéal pour la cuisiner plutôt que de la manger crue.",
    why: "En mûrissant, la tomate se ramollit et concentre ses sucres, ce qui la rend moins agréable crue mais excellente une fois cuite en sauce.",
    tips: [
      'Ébouillantez-la 30 secondes pour retirer la peau facilement.',
      'Une tomate abîmée sur un seul point : coupez juste cette partie, le reste est intact.',
      'Elle se congèle entière, telle quelle, pour une sauce future.',
    ],
    recipeIdeas: [
      'Sauce tomate maison',
      'Soupe froide type gaspacho',
      'Tomates confites au four',
    ],
  },
  {
    slug: 'carottes-fleuries',
    categorySlug: 'legumes',
    name: 'Fanes et carottes fleuries',
    metaDescription:
      'Les fanes de carottes se mangent : voici comment les utiliser au lieu de les jeter.',
    intro:
      "Les fanes de carottes, souvent coupées et jetées d'office, se cuisinent comme une herbe verte et ont un goût proche du persil.",
    why: "Elles sont rarement vendues en magasin justement parce qu'elles se conservent moins longtemps que la racine, mais rien n'empêche de les manger si elles sont fraîches et vertes.",
    tips: [
      'Séparez-les de la carotte dès l\'achat : elles pompent l\'humidité de la racine si elles restent attachées.',
      'Lavez-les bien, elles retiennent souvent de la terre.',
      'Utilisez-les crues et ciselées comme une herbe, ou mixées en pesto.',
    ],
    recipeIdeas: [
      'Pesto de fanes de carottes',
      'Fanes ciselées dans une soupe',
      'Fanes mixées dans un houmous',
    ],
  },
  {
    slug: 'fanes-de-radis',
    categorySlug: 'legumes',
    name: 'Fanes de radis',
    metaDescription:
      'Les fanes de radis sont comestibles et se cuisinent facilement en soupe ou en pesto.',
    intro:
      'Les fanes de radis, vertes et légèrement piquantes, se mangent comme un légume feuille à part entière.',
    why: "Elles sont jetées par réflexe alors qu'elles n'ont rien de toxique : leur goût piquant rappelle celui de la roquette.",
    tips: [
      'Lavez-les soigneusement, elles ont souvent du sable à la base.',
      'Une cuisson rapide (soupe, poêlée) adoucit leur piquant.',
      'Elles se marient bien avec de la crème ou du fromage frais qui équilibrent le goût.',
    ],
    recipeIdeas: [
      'Soupe de fanes de radis',
      'Pesto fanes-parmesan',
      'Fanes poêlées à l\'ail',
    ],
  },
  {
    slug: 'epinards-frais-qui-ramollissent',
    categorySlug: 'legumes',
    name: 'Épinards frais qui ramollissent',
    metaDescription:
      'Des épinards frais qui commencent à ramollir dans leur sachet : ils se sauvent facilement cuits.',
    intro:
      "Des épinards frais qui perdent leur croquant ne sont pas perdus : cuits, la texture ramollie ne se remarque plus du tout.",
    why: 'Les feuilles fraîches perdent leur eau rapidement une fois lavées ou stockées en sachet fermé, surtout si de la condensation s\'accumule.',
    tips: [
      "Rincez-les et essorez-les avant de les faire tomber à la poêle, même s'ils sont un peu flétris.",
      'Retirez uniquement les feuilles devenues visqueuses ou jaunies, gardez le reste.',
      'Ils se congèlent déjà cuits et essorés, en portions, pour une utilisation future.',
    ],
    recipeIdeas: [
      'Épinards à la crème',
      'Quiche épinards-fromage',
      'Épinards sautés à l\'ail en accompagnement',
    ],
  },

  // --- Viandes & poissons ---
  {
    slug: 'restes-poulet-roti',
    categorySlug: 'viandes-poissons',
    name: 'Restes de poulet rôti',
    metaDescription:
      "Des restes de poulet rôti du dimanche ? Voici plusieurs façons de les transformer en un nouveau repas.",
    intro:
      "Le poulet rôti restant se réutilise facilement dans un plat différent, sans donner l'impression de remanger le même repas.",
    why: 'Une fois cuit, le poulet se conserve 2 à 3 jours au frigo dans une boîte hermétique : largement de quoi préparer un second repas.',
    tips: [
      'Effilochez la viande à la main plutôt que de la recouper, c\'est plus rapide et ça se marie mieux à une sauce.',
      "N'oubliez pas la carcasse : elle fait un excellent bouillon maison.",
      'Le poulet effiloché se congèle très bien pour une utilisation ultérieure.',
    ],
    recipeIdeas: [
      'Curry de poulet rapide',
      'Wrap ou sandwich au poulet effiloché',
      'Bouillon maison avec la carcasse',
    ],
  },
  {
    slug: 'bacon-anti-gaspi',
    categorySlug: 'viandes-poissons',
    name: 'Fond de paquet de bacon',
    metaDescription:
      "Quelques tranches de bacon qui traînent en fond de paquet : comment les utiliser avant la date limite.",
    intro:
      'Un fond de paquet de bacon suffit largement à relever un plat, même en petite quantité.',
    why: "Le bacon étant très salé et fumé, une petite quantité a un fort impact gustatif, ce qui permet de l'utiliser en accompagnement plutôt qu'en plat principal.",
    tips: [
      'Coupez-le en petits lardons pour qu\'il se répartisse dans tout le plat.',
      'Il se congèle très bien, tranche par tranche séparée par du papier cuisson.',
      'Une poêlée rapide de bacon croustillant relève n\'importe quelle salade ou pâtes.',
    ],
    recipeIdeas: [
      'Pâtes carbonara maison',
      'Salade tiède lardons-fromage',
      'Œufs brouillés au bacon',
    ],
  },
  {
    slug: 'poulet-restes',
    categorySlug: 'viandes-poissons',
    name: 'Blanc de poulet cuit restant',
    metaDescription:
      'Un blanc de poulet cuit qui reste : des idées rapides pour ne pas le manger tel quel une deuxième fois.',
    intro:
      "Un blanc de poulet déjà cuit se réchauffe rarement bien seul, mais se réintègre parfaitement dans un plat composé.",
    why: 'Le blanc de poulet recuit tel quel a tendance à sécher ; le réincorporer dans une sauce ou un plat mijoté compense cette perte d\'humidité.',
    tips: [
      'Coupez-le en dés et ajoutez-le en fin de cuisson d\'une sauce pour éviter qu\'il ne se dessèche davantage.',
      "En salade froide, il n'a pas besoin d'être réchauffé du tout.",
      'Il se congèle en dés, prêt à être ajouté directement dans un futur plat.',
    ],
    recipeIdeas: [
      'Salade César au poulet',
      'Riz sauté au poulet et légumes',
      'Poulet en sauce crème-champignons',
    ],
  },
  {
    slug: 'jambon-restes',
    categorySlug: 'viandes-poissons',
    name: 'Restes de jambon',
    metaDescription:
      "Quelques tranches de jambon qui traînent : comment les utiliser avant qu'elles ne sèchent.",
    intro:
      'Des tranches de jambon en fin de paquet se cuisinent facilement, même une fois légèrement sèches sur les bords.',
    why: "Le jambon coupé sèche par les bords au contact de l'air, mais reste comestible et savoureux tant qu'il n'a pas d'odeur ou d'aspect suspect.",
    tips: [
      'Coupez les bords secs si besoin, le reste de la tranche est intact.',
      'En dés, il se marie très bien avec des œufs ou un gratin.',
      'Il se congèle coupé en morceaux pour une utilisation future en cuisine.',
    ],
    recipeIdeas: [
      'Gratin jambon-pâtes',
      'Quiche au jambon',
      'Œufs brouillés au jambon',
    ],
  },
  {
    slug: 'thon-conserve',
    categorySlug: 'viandes-poissons',
    name: 'Reste de boîte de thon',
    metaDescription:
      "Une boîte de thon entamée à finir : voici des idées au-delà de la salade classique.",
    intro:
      'Une boîte de thon entamée se conserve 2 jours maximum au frigo, dans un contenant fermé, et se marie avec beaucoup plus que la salade.',
    why: "Une fois la boîte ouverte, le thon perd sa conservation longue durée et doit être traité comme un produit frais.",
    tips: [
      'Égouttez-le bien avant de le stocker pour éviter qu\'il ne baigne dans son jus au frigo.',
      "Il se mélange très bien à une base de riz ou de pâtes froides.",
      "En dés dans une omelette, il remplace facilement la viande.",
    ],
    recipeIdeas: [
      'Riz froid au thon et maïs',
      'Pâtes au thon et tomates',
      'Omelette au thon',
    ],
  },

  // --- Épicerie & féculents ---
  {
    slug: 'pain-rassis',
    categorySlug: 'epicerie-feculents',
    name: 'Pain rassis',
    metaDescription:
      'Du pain rassis à ne pas jeter : les meilleures façons de lui donner une seconde vie.',
    intro:
      "Le pain rassis n'est pas du pain périmé : il a juste perdu son humidité, ce qui le rend même préférable pour certaines recettes.",
    why: "Le rassissement est un phénomène naturel de l'amidon qui durcit en séchant, sans lien avec une dégradation ou une contamination du pain.",
    tips: [
      "Passez-le quelques secondes sous l'eau puis 5 minutes au four pour lui redonner du moelleux.",
      "Mixé, il devient une chapelure maison à congeler.",
      'Coupé en dés et grillé à la poêle, il devient des croûtons pour salade ou soupe.',
    ],
    recipeIdeas: [
      'Pain perdu',
      'Chapelure maison',
      'Panzanella (salade de pain)',
    ],
  },
  {
    slug: 'farine-pain',
    categorySlug: 'epicerie-feculents',
    name: 'Fond de paquet de farine',
    metaDescription:
      'Un fond de paquet de farine qui traîne : comment l\'utiliser avant d\'en racheter un neuf.',
    intro:
      "Un petit reste de farine suffit largement pour de nombreuses recettes du quotidien, pas besoin d'attendre un paquet plein.",
    why: 'La farine se conserve plusieurs mois dans un contenant hermétique et sec : un fond de paquet garde ses propriétés aussi longtemps qu\'un paquet neuf.',
    tips: [
      'Transférez-la dans une boîte hermétique pour éviter qu\'elle ne prenne l\'humidité ou les odeurs du placard.',
      'Un fond de paquet suffit pour épaissir une sauce ou paner un aliment.',
      "Sentez-la avant utilisation : une odeur de moisi ou de rance signale qu'il faut la jeter.",
    ],
    recipeIdeas: [
      'Crêpes',
      'Sauce béchamel',
      'Pain plat maison',
    ],
  },
  {
    slug: 'ketchup-cuisine',
    categorySlug: 'epicerie-feculents',
    name: 'Fond de bouteille de ketchup',
    metaDescription:
      'Un fond de ketchup difficile à sortir de la bouteille : des idées pour l\'utiliser en cuisine plutôt que de le jeter.',
    intro:
      "Le ketchup en fond de bouteille se retrouve facilement en le diluant dans un peu d'eau chaude, secouée dans la bouteille fermée.",
    why: "Sa texture épaisse le fait coller aux parois : ce n'est pas un problème de qualité, juste de viscosité.",
    tips: [
      'Ajoutez un peu d\'eau chaude, refermez et secouez pour décoller le fond.',
      'Utilisez-le comme base sucrée-salée dans une marinade ou une sauce.',
      'Une fois dilué, il se marie bien dans une sauce pour riz sauté façon "sauce du dimanche".',
    ],
    recipeIdeas: [
      'Marinade sucrée-salée pour poulet',
      'Sauce pour riz sauté',
      'Base de sauce barbecue maison',
    ],
  },
  {
    slug: 'huile-olive',
    categorySlug: 'epicerie-feculents',
    name: 'Fond de bouteille d\'huile d\'olive',
    metaDescription:
      "Un fond de bouteille d'huile d'olive qu'on n'arrive plus à verser : comment le récupérer.",
    intro:
      "Le fond d'une bouteille d'huile se récupère facilement en la retournant quelques heures, ou en ajoutant un peu d'huile neuve pour diluer le reste.",
    why: "L'huile devient difficile à verser en fin de bouteille simplement à cause de l'angle d'inclinaison nécessaire, pas d'une dégradation du produit.",
    tips: [
      'Transvasez-la dans un petit récipient en la laissant reposer goulot vers le bas.',
      "Utilisez-la pour une vinaigrette où quelques millilitres suffisent.",
      'Elle reste utilisable tant qu\'elle ne sent pas le rance (odeur de crayon ou de pâte à modeler).',
    ],
    recipeIdeas: [
      'Vinaigrette maison',
      'Marinade pour légumes rôtis',
      'Filet d\'huile pour finir un plat',
    ],
  },
  {
    slug: 'pates-restes',
    categorySlug: 'epicerie-feculents',
    name: 'Pâtes cuites restantes',
    metaDescription:
      'Des pâtes déjà cuites qui restent de la veille : voici comment les transformer sans qu\'elles collent.',
    intro:
      "Des pâtes cuites en trop ne se resservent pas forcément telles quelles, mais se réutilisent très bien dans un plat différent.",
    why: 'Une fois refroidies, les pâtes perdent leur texture initiale et collent entre elles à cause de l\'amidon qui se fige : les repasser à la poêle avec un peu de matière grasse règle ce problème.',
    tips: [
      'Passez-les à la poêle avec un filet d\'huile plutôt qu\'au micro-ondes, elles retrouvent du moelleux.',
      "Elles se transforment très bien en gratin de pâtes.",
      'En froid, elles font une bonne base de salade de pâtes.',
    ],
    recipeIdeas: [
      'Gratin de pâtes',
      'Pâtes sautées à la poêle avec légumes',
      'Salade de pâtes froide',
    ],
  },
  {
    slug: 'riz-restes',
    categorySlug: 'epicerie-feculents',
    name: 'Riz cuit restant',
    metaDescription:
      'Du riz cuit qui reste ? C\'est l\'ingrédient parfait pour un riz sauté, à condition de bien le conserver.',
    intro:
      'Le riz cuit restant est l\'un des restes les plus faciles à réutiliser, à condition de respecter quelques règles de conservation simples.',
    why: 'Le riz cuit peut développer des bactéries s\'il refroidit trop lentement à température ambiante : le placer au frigo rapidement après cuisson (moins de 2h) le rend sûr pour 1 à 2 jours.',
    tips: [
      'Étalez-le sur une assiette pour qu\'il refroidisse vite avant de le mettre au frigo.',
      'Un riz cuit puis refroidi est en réalité meilleur pour un riz sauté qu\'un riz tout juste cuit (moins collant).',
      'Réchauffez-le toujours bien chaud à cœur avant de le consommer.',
    ],
    recipeIdeas: [
      'Riz sauté aux légumes et à l\'œuf',
      'Galettes de riz à la poêle',
      'Riz en salade froide',
    ],
  },
  {
    slug: 'restes-riz-veille',
    categorySlug: 'epicerie-feculents',
    name: 'Riz de la veille',
    metaDescription:
      'Le riz de la veille, bien conservé, est un excellent point de départ pour un repas rapide le lendemain.',
    intro:
      'Le riz de la veille, correctement refroidi et stocké, est sans danger et même préférable pour certaines préparations.',
    why: 'Le froid fige légèrement l\'amidon du riz, ce qui l\'empêche de devenir pâteux à la recuisson — l\'effet recherché pour un riz sauté réussi.',
    tips: [
      'Vérifiez qu\'il a bien été réfrigéré dans les 2 heures suivant la cuisson initiale.',
      "Réchauffez-le à la poêle avec un peu d'huile plutôt qu'à la vapeur, pour éviter qu'il ne redevienne collant.",
      "S'il dégage une odeur inhabituelle, ne le consommez pas.",
    ],
    recipeIdeas: [
      'Riz sauté façon cantine chinoise',
      'Riz gratiné au four',
      'Riz en soupe avec un bouillon',
    ],
  },
  {
    slug: 'fond-de-pot-pesto',
    categorySlug: 'epicerie-feculents',
    name: 'Fond de pot de pesto',
    metaDescription:
      'Un fond de pot de pesto difficile à racler : une astuce simple pour ne rien perdre.',
    intro:
      "Le fond d'un pot de pesto se récupère facilement en y ajoutant un peu d'huile d'olive chaude ou de l'eau de cuisson des pâtes.",
    why: "Le pesto étant une pâte épaisse à base d'huile, il colle aux parois du pot bien avant d'être terminé.",
    tips: [
      "Ajoutez un peu d'eau de cuisson des pâtes directement dans le pot, refermez et secouez.",
      'Utilisez le pot ainsi "rincé" directement comme base de sauce.',
      'Un reste de pesto se congèle aussi très bien en petits cubes (bac à glaçons).',
    ],
    recipeIdeas: [
      'Pâtes au pesto express',
      'Vinaigrette au pesto',
      'Tartine pesto-tomate',
    ],
  },
  {
    slug: 'pain-de-mie-sec',
    categorySlug: 'epicerie-feculents',
    name: 'Pain de mie sec',
    metaDescription:
      'Du pain de mie devenu sec : plusieurs façons de le réutiliser au lieu de le jeter.',
    intro:
      "Le pain de mie sec, contrairement au pain de mie moisi, se rattrape très bien avec un peu de cuisson ou de liquide.",
    why: "Le pain de mie sèche vite une fois sorti de son emballage à cause de sa faible teneur en croûte protectrice.",
    tips: [
      'Trempé dans un mélange œuf-lait, il redevient moelleux pour un pain perdu.',
      "Il se mixe facilement en chapelure fine.",
      "Toasté, sa sécheresse devient un atout plutôt qu'un défaut.",
    ],
    recipeIdeas: [
      'Pain perdu',
      'Croque-monsieur',
      'Chapelure pour panure',
    ],
  },
  {
    slug: 'jus-de-conserve-pois-chiche',
    categorySlug: 'epicerie-feculents',
    name: 'Jus de conserve de pois chiches (aquafaba)',
    metaDescription:
      'Le jus de la boîte de pois chiches (aquafaba) n\'est pas un déchet : il remplace le blanc d\'œuf dans de nombreuses recettes.',
    intro:
      "Le liquide d'une boîte de pois chiches, appelé aquafaba, a des propriétés proches du blanc d'œuf et se monte en neige.",
    why: 'Sa teneur en protéines et en amidon lui donne une texture capable de retenir l\'air, exactement comme un blanc d\'œuf battu.',
    tips: [
      'Conservez-le au frigo 2-3 jours dans un contenant fermé, ou congelez-le en portions.',
      'Comptez environ 3 cuillères à soupe d\'aquafaba pour remplacer 1 blanc d\'œuf.',
      'Il fonctionne particulièrement bien pour une meringue ou une mousse végétale.',
    ],
    recipeIdeas: [
      'Meringues végétales',
      'Mousse au chocolat sans œuf',
      'Mayonnaise végétale',
    ],
  },
  {
    slug: 'lentilles-corail-fond-de-sac',
    categorySlug: 'epicerie-feculents',
    name: 'Fond de sac de lentilles corail',
    metaDescription:
      'Un petit reste de lentilles corail en fond de sac : ne le laissez pas de côté, il suffit largement pour un plat.',
    intro:
      'Une petite quantité de lentilles corail suffit à préparer un plat complet, cuites en 15 minutes environ sans trempage.',
    why: 'Contrairement aux autres légumineuses, la lentille corail est déjà décortiquée : elle cuit vite et se prête bien à de petites quantités.',
    tips: [
      "Rincez-les avant cuisson pour retirer l'excès d'amidon.",
      'Elles se marient très bien avec des épices comme le curcuma ou le cumin.',
      'Une petite quantité épaissit naturellement une soupe.',
    ],
    recipeIdeas: [
      'Dahl de lentilles corail',
      'Soupe épaissie aux lentilles',
      'Purée de lentilles en accompagnement',
    ],
  },

  // --- Produits laitiers & œufs ---
  {
    slug: 'beurre-cuisine',
    categorySlug: 'produits-laitiers',
    name: 'Fond de plaquette de beurre',
    metaDescription:
      "Un fond de plaquette de beurre qui traîne : ne le laissez pas rancir, voici comment l'utiliser.",
    intro:
      'Un fond de beurre, même entamé depuis un moment, reste utilisable tant qu\'il n\'a pas pris une odeur ou un goût rance.',
    why: "Le beurre s'oxyde progressivement au contact de l'air et de la lumière, ce qui altère son goût avant de le rendre impropre à la consommation.",
    tips: [
      'Enveloppez-le bien serré ou mettez-le dans une boîte hermétique pour ralentir l\'oxydation.',
      'Un beurre légèrement fort en goût passe inaperçu une fois utilisé en cuisson.',
      'Il se congèle très bien, y compris en petite quantité.',
    ],
    recipeIdeas: [
      'Pâte à tarte maison',
      'Sauce beurre blanc',
      'Légumes sautés au beurre',
    ],
  },
  {
    slug: 'fromage-restes',
    categorySlug: 'produits-laitiers',
    name: 'Fonds de fromages divers',
    metaDescription:
      'Plusieurs bouts de fromages différents qui traînent au frigo : l\'astuce pour tous les utiliser ensemble.',
    intro:
      'Des petits bouts de fromages variés se combinent très bien dans un même plat, en particulier gratiné ou fondu.',
    why: 'Mélanger plusieurs fromages plutôt que de les manger séparément permet d\'utiliser de petites quantités qui, seules, ne suffiraient pas pour un repas.',
    tips: [
      'Retirez uniquement les parties de moisissure visibles sur les fromages à pâte dure, le reste est consommable.',
      'Râpez-les ensemble pour un mélange homogène dans un gratin.',
      'Les fromages à pâte dure se congèlent très bien une fois râpés.',
    ],
    recipeIdeas: [
      'Gratin de pâtes trois fromages',
      'Quiche aux restes de fromage',
      'Croque-monsieur généreux',
    ],
  },
  {
    slug: 'creme-fraiche',
    categorySlug: 'produits-laitiers',
    name: 'Fond de pot de crème fraîche',
    metaDescription:
      'Un fond de pot de crème fraîche à finir avant la date : quelques idées simples.',
    intro:
      'Un petit reste de crème fraîche suffit à lier une sauce ou enrichir un plat, pas besoin d\'un pot entier.',
    why: 'La crème fraîche entamée se conserve quelques jours au frigo, mais s\'oxyde et perd en qualité plus vite qu\'un produit encore scellé.',
    tips: [
      "Vérifiez l'odeur avant utilisation : une odeur acide inhabituelle signale qu'il faut la jeter.",
      'Ajoutez-la en fin de cuisson pour éviter qu\'elle ne tranche à trop forte chaleur.',
      'Elle se congèle, bien qu\'elle perde un peu de sa texture lisse à la décongélation (mieux pour les sauces cuites que pour une utilisation froide).',
    ],
    recipeIdeas: [
      'Sauce crème-champignons',
      'Quiche lorraine',
      'Vinaigrette crémeuse',
    ],
  },
  {
    slug: 'oeufs-cuisine',
    categorySlug: 'produits-laitiers',
    name: 'Œufs qui approchent de la date',
    metaDescription:
      'Des œufs qui approchent de leur date de consommation : comment vérifier s\'ils sont bons et comment les utiliser vite.',
    intro:
      "Un œuf proche de sa date reste souvent bon plusieurs jours de plus : un simple test dans l'eau permet de vérifier.",
    why: 'Un œuf frais coule au fond d\'un verre d\'eau ; s\'il flotte, c\'est qu\'il a pris trop d\'air à travers sa coquille en vieillissant et doit être jeté.',
    tips: [
      'Faites le test de l\'eau avant de cuisiner si vous avez un doute.',
      'Une fois cuits durs, les œufs se conservent une semaine de plus au frigo.',
      'Les œufs qui approchent de la date sont en réalité préférables pour les œufs durs (plus faciles à écaler).',
    ],
    recipeIdeas: [
      'Œufs durs mayonnaise',
      'Quiche aux légumes',
      'Omelette garnie',
    ],
  },
  {
    slug: 'lait-anti-gaspi',
    categorySlug: 'produits-laitiers',
    name: 'Fond de brique de lait',
    metaDescription:
      'Un fond de brique de lait qui approche de la date : voici comment ne pas le perdre.',
    intro:
      "Un fond de lait proche de la date se transforme facilement en recette cuite, où la cuisson neutralise tout risque.",
    why: 'Le lait entamé se conserve 3 à 5 jours au frigo une fois ouvert : au-delà, une odeur ou un goût aigre signale qu\'il faut le jeter.',
    tips: [
      'Sentez-le avant utilisation : c\'est le test le plus fiable.',
      'Utilisez-le en priorité dans une recette cuite (béchamel, pâte à crêpes) plutôt que tel quel.',
      'Il se congèle, avec une texture légèrement modifiée à la décongélation (à privilégier pour la cuisine, pas pour boire tel quel).',
    ],
    recipeIdeas: [
      'Crêpes ou pancakes',
      'Béchamel',
      'Riz au lait',
    ],
  },
  {
    slug: 'yaourt-perime',
    categorySlug: 'produits-laitiers',
    name: 'Yaourts proches ou après la date',
    metaDescription:
      "Des yaourts arrivés à leur date de péremption : sont-ils encore bons, et comment les utiliser ?",
    intro:
      'Un yaourt reste souvent consommable plusieurs jours après sa date, celle-ci étant une date de "durabilité minimale" plutôt qu\'une limite stricte.',
    why: "La fermentation naturelle du yaourt lui donne une bonne conservation : tant qu'il n'y a pas de moisissure visible ou d'odeur clairement anormale, il reste consommable.",
    tips: [
      'Vérifiez l\'absence de moisissure en surface et une texture homogène.',
      'Un yaourt un peu plus acide que d\'habitude se prête très bien à la pâtisserie.',
      'Il remplace la crème ou l\'huile dans de nombreux gâteaux, pour une texture plus légère.',
    ],
    recipeIdeas: [
      'Gâteau au yaourt',
      'Sauce type tzatziki',
      'Marinade au yaourt pour viande',
    ],
  },
  {
    slug: 'blancs-d-oeufs-seuls',
    categorySlug: 'produits-laitiers',
    name: 'Blancs d\'œufs seuls',
    metaDescription:
      'Des blancs d\'œufs qui restent après une recette au jaune seul : comment ne pas les jeter.',
    intro:
      "Des blancs d'œufs restants se conservent plusieurs jours au frigo et se congèlent très bien, seuls.",
    why: 'Contrairement au jaune, le blanc d\'œuf se congèle sans perdre ses propriétés, notamment sa capacité à monter en neige.',
    tips: [
      'Conservez-les dans un contenant hermétique jusqu\'à 4 jours au frigo.',
      'Congelez-les en portions d\'un blanc par compartiment de bac à glaçons.',
      "Ils montent en neige plus facilement à température ambiante qu'en sortant du frigo.",
    ],
    recipeIdeas: [
      'Meringues',
      'Blancs en neige pour une mousse',
      'Omelette blanche',
    ],
  },
  {
    slug: 'jaunes-d-oeufs-seuls',
    categorySlug: 'produits-laitiers',
    name: 'Jaunes d\'œufs seuls',
    metaDescription:
      'Des jaunes d\'œufs qui restent après une recette au blanc seul : plusieurs idées pour les utiliser vite.',
    intro:
      "Les jaunes d'œufs se conservent moins longtemps que les blancs et doivent être utilisés dans les 2 jours suivant leur séparation.",
    why: 'Le jaune, riche en matière grasse et exposé à l\'air une fois séparé, s\'assèche et se dégrade plus vite que le blanc.',
    tips: [
      'Couvrez-les d\'un peu d\'eau ou filmez-les au contact pour éviter qu\'ils ne sèchent en surface.',
      'Utilisez-les rapidement plutôt que de les congeler (ils se congèlent mal, contrairement aux blancs).',
      'Ils enrichissent instantanément une sauce ou une pâte.',
    ],
    recipeIdeas: [
      'Crème pâtissière',
      'Mayonnaise maison',
      'Pâtes carbonara',
    ],
  },
  {
    slug: 'croute-de-parmesan',
    categorySlug: 'produits-laitiers',
    name: 'Croûte de parmesan',
    metaDescription:
      'La croûte de parmesan n\'est pas un déchet : elle parfume magnifiquement les soupes et sauces.',
    intro:
      'La croûte de parmesan, trop dure pour être mangée telle quelle, est un exhausteur de goût qu\'on jette trop souvent.',
    why: 'Elle contient les mêmes arômes concentrés que le fromage, simplement dans une texture trop dure pour être râpée ou mangée directement.',
    tips: [
      'Conservez-la au congélateur jusqu\'à utilisation, elle se garde très longtemps ainsi.',
      'Ajoutez-la entière dans une soupe ou une sauce tomate pendant la cuisson, puis retirez-la avant de servir.',
      'Elle infuse tout son goût en 20-30 minutes de mijotage.',
    ],
    recipeIdeas: [
      'Soupe minestrone parfumée à la croûte',
      'Sauce tomate infusée au parmesan',
      'Bouillon de légumes relevé',
    ],
  },

  // --- Fruits ---
  {
    slug: 'avocat-trop-mur',
    categorySlug: 'fruits',
    name: 'Avocat trop mûr',
    metaDescription:
      'Un avocat devenu trop mou ou légèrement brun : voici comment l\'utiliser au lieu de le jeter.',
    intro:
      "Un avocat trop mûr, même avec quelques fibres brunes, reste parfaitement utilisable une fois mixé.",
    why: "L'avocat brunit au contact de l'air (oxydation) : c'est un phénomène esthétique, pas un signe de dégradation, sauf en cas d'odeur ou de moisissure.",
    tips: [
      'Retirez uniquement les parties brunes visibles avant de mixer le reste.',
      'Ajoutez un filet de citron pour ralentir l\'oxydation une fois coupé.',
      "Mixé avec du citron et un peu de sel, il se transforme facilement en sauce ou en base à tartiner.",
    ],
    recipeIdeas: [
      'Guacamole',
      'Sauce avocat pour salade',
      'Toast à l\'avocat écrasé',
    ],
  },
  {
    slug: 'bananes-noires',
    categorySlug: 'fruits',
    name: 'Bananes noircies',
    metaDescription:
      "Des bananes devenues noires ? C'est le moment idéal pour un cake ou des pancakes, pas pour les jeter.",
    intro:
      'Une banane noircie est en réalité plus sucrée et plus facile à écraser qu\'une banane fraîche : idéale pour la pâtisserie.',
    why: "Le noircissement de la peau vient de la maturation des sucres internes : plus la banane est noire, plus elle est sucrée et aromatique à l'intérieur.",
    tips: [
      'Écrasez-la à la fourchette, elle s\'incorpore parfaitement à une pâte.',
      "Elle peut se congeler telle quelle, avec la peau, pour un usage ultérieur en pâtisserie.",
      'Elle remplace une partie du sucre dans une recette grâce à sa concentration naturelle.',
    ],
    recipeIdeas: [
      'Banana bread',
      'Pancakes à la banane',
      'Smoothie banane-lait',
    ],
  },
  {
    slug: 'pommes-fripees',
    categorySlug: 'fruits',
    name: 'Pommes fripées',
    metaDescription:
      'Des pommes dont la peau se ride : elles restent bonnes, en particulier cuites.',
    intro:
      "Une pomme qui se ride en surface a simplement perdu de son eau : sa chair reste comestible, surtout une fois cuite.",
    why: 'Une pomme mal conservée (hors du frigo, à l\'air libre) perd son humidité par la peau, ce qui la fait plisser sans affecter sa comestibilité.',
    tips: [
      'Épluchez-la si la peau est trop ridée, la chair en dessous est intacte.',
      'Elle est parfaite cuite en compote, où la texture ramollie n\'est pas un problème.',
      'Conservez vos pommes au frigo plutôt qu\'à température ambiante pour ralentir ce phénomène.',
    ],
    recipeIdeas: [
      'Compote de pommes maison',
      'Pommes au four à la cannelle',
      'Tarte fine aux pommes',
    ],
  },
  {
    slug: 'citron-entame',
    categorySlug: 'fruits',
    name: 'Citron entamé',
    metaDescription:
      'La moitié d\'un citron qui traîne au frigo : comment l\'utiliser en entier, zeste compris.',
    intro:
      'Une moitié de citron entamée se conserve quelques jours au frigo, et s\'utilise en entier, zeste compris.',
    why: 'Coupé, le citron s\'assèche progressivement en surface mais garde son jus et son acidité plusieurs jours si bien emballé.',
    tips: [
      'Enveloppez-le bien serré dans du film pour limiter le dessèchement.',
      'Le zeste (partie jaune de la peau) se prélève même sur un demi-citron déjà entamé.',
      'Le jus se congèle très bien en bac à glaçons pour un usage ultérieur.',
    ],
    recipeIdeas: [
      'Vinaigrette citronnée',
      'Eau citronnée ou thé glacé maison',
      'Zeste de citron sur un poisson ou des pâtes',
    ],
  },
];

export function getIngredientsByCategory(categorySlug: string): Ingredient[] {
  return ingredients.filter((i) => i.categorySlug === categorySlug);
}

export function getIngredient(
  categorySlug: string,
  slug: string
): Ingredient | undefined {
  return ingredients.find(
    (i) => i.categorySlug === categorySlug && i.slug === slug
  );
}

export function getCategory(slug: string): IngredientCategory | undefined {
  return ingredientCategories.find((c) => c.slug === slug);
}
