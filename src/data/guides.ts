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
    slug: 'batch-cooking-etudiant-2-heures',
    title: 'Batch cooking étudiant : une semaine de menus en 2 heures',
    metaDescription:
      'Comment préparer une semaine de repas en 2 heures avec un petit budget étudiant : méthode, liste de courses type et organisation.',
    intro:
      "Le batch cooking a mauvaise réputation auprès des étudiants : trop de matériel, trop de temps, trop cher. En réalité, avec une méthode simple et un minimum d'organisation, 2 heures un dimanche suffisent à couvrir 4 à 5 repas.",
    sections: [
      {
        heading: 'Pourquoi 2 heures suffisent',
        body: [
          "Le temps perdu en cuisine ne vient presque jamais de la cuisson elle-même, mais des allers-retours : éplucher, puis chercher une casserole, puis attendre, puis recommencer pour le plat suivant. Le batch cooking consiste à regrouper ces étapes une seule fois pour plusieurs repas.",
          "Concrètement : une seule session d'épluchage pour tous les légumes de la semaine, une seule cuisson de féculent en grande quantité (riz, pâtes ou lentilles), et une seule base protéinée (poulet, œufs ou légumineuses) déclinée différemment chaque jour.",
        ],
      },
      {
        heading: 'La méthode en 3 étapes',
        body: [
          "1. Choisir une base commune : un féculent (riz, pâtes, semoule) cuit en grande quantité et une protéine simple (poulet rôti au four, œufs durs, ou lentilles). Cuire les deux en parallèle, sur le feu et au four en même temps.",
          "2. Préparer les légumes une seule fois : les couper tous à la suite, puis les cuire en une ou deux fournées (four ou poêle), sans se soucier du plat final. Une partie peut rester crue pour une salade du début de semaine.",
          "3. Répartir en portions dans des boîtes hermétiques, en gardant les sauces et assaisonnements à part pour éviter que tout ne ramollisse au frigo. C'est cette étape qui transforme une grande quantité de vrac en repas identifiables et variés.",
        ],
      },
      {
        heading: 'Une liste de courses type pour un budget étudiant',
        body: [
          "Féculent : 500g de riz ou de pâtes (moins de 2€). Protéine : un poulet entier ou des cuisses de poulet, ou à défaut un paquet de lentilles/pois chiches secs, bien moins cher que la viande. Légumes : ce qui est de saison et en promotion, souvent carottes, courgettes, chou ou poireaux selon la période.",
          "Un fond de sauce polyvalent (sauce soja, moutarde, ou simplement huile d'olive et ail) permet de varier le goût d'un même plat de base d'un jour à l'autre, sans multiplier les courses.",
        ],
      },
      {
        heading: 'Conservation : jusqu\'où aller sans risque',
        body: [
          "Un plat cuisiné complet (féculent + protéine + légumes) se conserve 3 à 4 jours au réfrigérateur dans une boîte hermétique. Au-delà, direction le congélateur : la plupart des plats mijotés, riz compris, se congèlent et se réchauffent très bien.",
          "Pour les repas prévus en fin de semaine, mieux vaut congeler dès la préparation plutôt que de laisser une boîte 5 ou 6 jours au frigo en espérant qu'elle tienne.",
        ],
      },
    ],
    ctaTitle: 'Envie d\'un coup de main pour varier vos menus ?',
    ctaText:
      'Yummeal vous propose des recettes adaptées à ce que vous avez déjà au frigo, pour sortir de la routine riz-poulet sans complexifier vos courses.',
    tags: ['batch cooking', 'organisation', 'étudiant', 'petit budget'],
  },
  {
    slug: 'ustensiles-indispensables-petite-cuisine',
    title: 'Les ustensiles vraiment indispensables pour une petite cuisine',
    metaDescription:
      "Studio, colocation, petite kitchenette : voici la liste courte des ustensiles réellement utiles au quotidien, sans matériel superflu.",
    intro:
      "Pas besoin d'un tiroir entier de gadgets pour bien cuisiner dans un petit espace. Une poignée d'ustensiles polyvalents couvre l'immense majorité des recettes du quotidien, et libère de la place dans les placards.",
    sections: [
      {
        heading: 'Les indispensables pour découper et préparer',
        body: [
          "Un couteau de chef correct (pas forcément cher, mais qui coupe net) remplace à lui seul un couteau à pain, un couteau à légumes et un couteau à viande pour un usage quotidien simple.",
          "Une planche à découper unique, si possible facile à laver, suffit largement dans un petit espace : inutile d'en avoir plusieurs tant qu'elle est nettoyée entre deux usages différents (viande crue puis légumes, par exemple).",
          "Une bonne cuillère en bois ou en silicone résiste à la chaleur et ne raye pas les poêles, contrairement au métal.",
        ],
      },
      {
        heading: 'Le duo de cuisson qui couvre presque tout',
        body: [
          "Une poêle antiadhésive de taille moyenne (24-26 cm) permet de cuire des œufs, saisir une viande, faire revenir des légumes ou réchauffer un reste, sans avoir besoin d'une deuxième poêle plus petite.",
          "Une casserole moyenne avec couvercle sert aussi bien pour les pâtes, le riz, une soupe ou une sauce. Le couvercle accélère la cuisson et réduit la consommation d'énergie, un vrai plus en petit budget.",
        ],
      },
      {
        heading: 'Ce qui simplifie vraiment le quotidien',
        body: [
          "Une passoire, pour égoutter pâtes, riz ou légumes : difficile de s'en passer, et elle ne prend que peu de place suspendue ou empilée.",
          "Quelques boîtes hermétiques empilables, utiles à la fois pour conserver les restes et pour le batch cooking : elles remplacent avantageusement le film alimentaire à usage unique.",
          "Une planche ou un torchon supplémentaire n'est pas nécessaire : mieux vaut investir dans la qualité des quelques ustensiles de base que dans la quantité.",
        ],
      },
      {
        heading: 'Ce qu\'on peut repousser à plus tard',
        body: [
          "Robot multifonction, mixeur plongeant, cuiseur vapeur : ces équipements sont utiles mais pas indispensables au démarrage. Ils prennent de la place et un budget que l'on peut consacrer en priorité à un bon couteau et une bonne poêle.",
          "Une balance de cuisine peut attendre elle aussi : la plupart des recettes du quotidien se font très bien au jugé ou avec un simple verre doseur.",
        ],
      },
    ],
    ctaTitle: 'Peu d\'ustensiles, mais des idées de recettes en illimité',
    ctaText:
      'Yummeal propose des recettes réalisables avec un équipement minimal, à partir de ce que vous avez déjà dans le frigo.',
    tags: ['équipement cuisine', 'petit espace', 'organisation'],
  },
  {
    slug: 'lecture-etiquettes-nutritionnelles-pieges',
    title: 'Lire une étiquette nutritionnelle sans se faire piéger',
    metaDescription:
      'Lire un tableau de valeurs nutritionnelles, repérer les pièges de présentation (portion, « sans sucres ajoutés ») et comparer deux produits.',
    intro:
      "Le tableau des valeurs nutritionnelles au dos d'un emballage donne des informations fiables, mais sa présentation peut facilement induire en erreur si l'on ne sait pas où regarder.",
    sections: [
      {
        heading: 'Toujours comparer pour 100g, pas par portion',
        body: [
          "La loi impose l'affichage pour 100g ou 100ml, mais autorise aussi un affichage par portion en complément. Or la taille de la « portion » indiquée par le fabricant n'est pas toujours réaliste : elle peut être plus petite que ce qu'on consomme réellement, ce qui fait paraître les chiffres plus bas qu'ils ne le sont dans les faits.",
          "Pour comparer deux produits entre eux de façon fiable, il faut toujours se baser sur la colonne « pour 100g », identique d'un produit à l'autre, et ignorer la colonne par portion qui varie selon les choix marketing de chaque marque.",
        ],
      },
      {
        heading: 'Les mentions qui ne veulent pas dire ce qu\'on croit',
        body: [
          "« Sans sucres ajoutés » signifie qu'aucun sucre n'a été ajouté lors de la fabrication, mais pas que le produit est pauvre en sucre : un jus de fruit peut afficher cette mention tout en étant naturellement très sucré.",
          "« Allégé » ou « light » signifie seulement que le produit contient moins d'un nutriment (souvent le gras ou le sucre) que la version standard de la même marque, pas qu'il est peu calorique dans l'absolu.",
          "« Source de » ou « riche en » un nutriment sont des mentions encadrées par des seuils réglementaires précis, mais elles ne renseignent que sur ce seul nutriment, pas sur la qualité globale du produit.",
        ],
      },
      {
        heading: 'Ce qu\'il faut regarder en priorité dans le tableau',
        body: [
          "La liste des ingrédients est classée par ordre de poids décroissant : le premier ingrédient est celui présent en plus grande quantité. Un produit où le sucre apparaît en tête de liste en contient donc davantage que les ingrédients qui suivent.",
          "Dans le tableau nutritionnel, les lignes les plus utiles pour se repérer sont les sucres (dans les glucides), les acides gras saturés (dans les lipides) et le sel : ce sont les nutriments dont un apport élevé est identifié comme un point de vigilance par les repères nutritionnels officiels.",
        ],
      },
    ],
    ctaTitle: 'Et si vos ingrédients frais remplaçaient les étiquettes ?',
    ctaText:
      'Yummeal vous aide à cuisiner avec des produits simples que vous avez déjà, sans avoir à décoder un emballage à chaque repas.',
    tags: ['étiquette nutritionnelle', 'nutrition', 'marketing alimentaire'],
  },
  {
    slug: 'comprendre-nutriscore-vs-realite',
    title: 'Nutri-Score : ce qu\'il mesure vraiment, et ce qu\'il ignore',
    metaDescription:
      "Comment est calculé le Nutri-Score, sur quelle base, et quelles sont ses limites documentées : transformation, portion réelle, catégorie de comparaison.",
    intro:
      "Le Nutri-Score est souvent lu comme un jugement global sur un aliment, alors qu'il s'agit d'un calcul précis, portant sur un périmètre défini et volontairement limité. Comprendre son fonctionnement permet de l'utiliser pour ce qu'il est : un outil de comparaison, pas un verdict absolu.",
    sections: [
      {
        heading: 'Comment le score est calculé',
        body: [
          "Le Nutri-Score attribue une note de A à E à partir d'un calcul basé sur les valeurs nutritionnelles pour 100g (ou 100ml) du produit. D'un côté, il compte négativement l'énergie, les sucres, les acides gras saturés et le sel ; de l'autre, il valorise positivement la présence de fibres, de protéines, ainsi que la part de fruits, légumes, légumineuses ou fruits à coque.",
          "Le score final résulte de la différence entre ces points négatifs et positifs, convertie en une lettre. C'est un algorithme nutritionnel : il ne prend en compte que la composition en nutriments telle que déclarée dans le tableau nutritionnel, rien d'autre.",
        ],
      },
      {
        heading: 'Ce qu\'il ne prend pas en compte : le degré de transformation',
        body: [
          "Le calcul du Nutri-Score repose uniquement sur les nutriments présents pour 100g, sans regarder si l'aliment est brut, peu transformé ou ultra-transformé. Un produit ultra-transformé peut afficher un bon score s'il est formulé pour être pauvre en sucre, en gras saturé et en sel, même s'il contient de nombreux additifs ou ingrédients reformulés.",
          "C'est une limite documentée et reconnue par les autorités qui pilotent le dispositif elles-mêmes : le Nutri-Score a été conçu comme un indicateur nutritionnel, pas comme une mesure du degré de transformation industrielle, qui répond à une toute autre logique (classification NOVA notamment).",
        ],
      },
      {
        heading: 'Ce qu\'il ne prend pas en compte : la portion réellement consommée',
        body: [
          "Le score est calculé pour 100g de produit, une base fixe qui permet de comparer des produits entre eux de façon standardisée. Mais elle ne reflète pas forcément la quantité réellement consommée en une fois : certains produits sont mangés en très petites portions (une sauce, un condiment), d'autres en portions bien plus grandes que 100g (un plat principal).",
          "Un produit consommé en petite quantité peut avoir un score défavorable sans que cela pèse beaucoup dans l'alimentation globale, et inversement pour un produit consommé en grande quantité avec un bon score. Le Nutri-Score ne corrige pas cet écart : c'est un indicateur par 100g, pas par ration réelle.",
        ],
      },
      {
        heading: 'À quoi il sert vraiment',
        body: [
          "Le Nutri-Score est pensé pour comparer des produits d'une même catégorie entre eux (deux céréales du petit-déjeuner, deux plats préparés similaires), pas pour classer des aliments de nature différente les uns par rapport aux autres.",
          "Utilisé dans ce cadre précis — comparer des produits comparables — il reste un repère utile et rapide. Utilisé comme jugement absolu sur la qualité globale d'un aliment isolé, il perd une partie de sa pertinence, précisément à cause des angles morts détaillés ci-dessus.",
        ],
      },
    ],
    ctaTitle: 'Cuisiner à partir de vrais ingrédients plutôt que de décoder des scores',
    ctaText:
      'Yummeal vous propose des recettes à partir de produits bruts que vous avez déjà, sans avoir besoin de comparer des étiquettes en rayon.',
    tags: ['nutri-score', 'nutrition', 'transformation alimentaire'],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
