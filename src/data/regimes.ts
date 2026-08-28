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
    slug: 'diner-leger-moins-de-300-calories',
    title: 'Idées de dîner léger, sans se prendre la tête',
    metaDescription:
      "Envie d'un dîner léger le soir ? Des principes simples pour composer une assiette légère et des idées de plats, sans promesse de perte de poids.",
    intro:
      "« Dîner léger » ne veut pas dire dîner insuffisant : c'est surtout une question d'équilibre entre les légumes, les protéines et les féculents, plutôt que de viser un chiffre calorique précis. Nous ne calculons pas de calories exactes par recette : c'est une donnée qui varie énormément selon les quantités et la préparation, et l'afficher avec une fausse précision serait trompeur.",
    sections: [
      {
        heading: 'Les principes d\'un dîner léger',
        body: [
          "Le soir, le corps a généralement moins besoin d'un gros apport en féculents qu'au déjeuner, surtout si l'activité physique de la journée est terminée : mieux vaut alléger cette partie de l'assiette plutôt que la supprimer complètement.",
          "Miser sur les légumes en quantité (crus ou cuits) permet de remplir l'assiette et de manger à sa faim sans excès, grâce à leur volume et leur teneur en eau et en fibres.",
          "Une portion de protéines maigres (œufs, poisson blanc, volaille sans peau, tofu, légumineuses) apporte satiété et équilibre sans alourdir la digestion avant le coucher.",
          "Limiter les fritures, les sauces grasses et les fromages en grande quantité rend le repas plus digeste, indépendamment de toute recherche de perte de poids : il s'agit avant tout de confort digestif pour bien dormir.",
          "Un dîner léger reste un repas complet : l'idée n'est pas de se priver, mais de composer une assiette équilibrée et pas trop copieuse pour la fin de journée.",
        ],
      },
      {
        heading: 'Exemples de dîners légers',
        body: [
          "Une grande salade de légumes de saison avec un œuf dur ou du poulet froid effiloché, assaisonnée d'un filet d'huile d'olive.",
          "Une soupe de légumes maison accompagnée d'une tranche de pain et d'un peu de fromage.",
          "Un poisson blanc vapeur ou poêlé avec une poêlée de légumes verts, sans accompagnement féculent ou avec une petite portion seulement.",
          "Une omelette aux légumes (courgette, champignons, épinards) avec une salade verte à côté.",
          "Un bol de légumineuses (lentilles, pois chiches) tièdes avec des crudités et une vinaigrette légère.",
        ],
      },
      {
        heading: 'Une remarque sur les calories',
        body: [
          "Nous n'indiquons volontairement aucun chiffre calorique précis par recette : ce type d'estimation dépend fortement des quantités exactes, des marques utilisées et du mode de cuisson, et une valeur affichée sans ces précisions serait plus trompeuse qu'utile.",
          "Si vous cherchez un ordre de grandeur, un dîner composé sur ces principes (légumes en majorité, une portion de protéine maigre, féculents limités) se situe généralement dans une fourchette modérée, mais cela reste une estimation large et non une valeur garantie.",
          "Cet article ne constitue pas un conseil médical ni une méthode de perte de poids : il propose simplement des repères pour composer un dîner plus léger, à adapter selon votre appétit, votre activité et vos besoins.",
        ],
      },
    ],
    ctaTitle: 'Envie d\'un dîner léger sans y passer la tête ?',
    ctaText:
      "Yummeal vous propose des recettes adaptées à ce que vous avez déjà au frigo, pour composer un repas équilibré en quelques minutes.",
    tags: ['dîner léger', 'équilibre alimentaire', 'digestion', 'idées repas'],
  },
  {
    slug: 'recettes-etudiant-sans-gluten',
    title: 'Recettes étudiantes sans gluten, simples et pas chères',
    metaDescription:
      "Des idées de recettes sans gluten faciles à faire en cité U ou en petit studio, avec des ingrédients simples et naturellement sans gluten.",
    intro:
      "Manger sans gluten avec un petit budget et peu de matériel, c'est possible : il suffit de connaître les ingrédients de base naturellement sans gluten (riz, maïs, pommes de terre, légumineuses) et d'éviter les pièges classiques (blé, orge, seigle, et les sauces ou plats préparés qui en contiennent souvent en discret).",
    sections: [
      {
        heading: 'Les ingrédients de base à privilégier',
        body: [
          "Le riz (blanc, complet, basmati) est naturellement sans gluten et constitue une base d'accompagnement simple et bon marché.",
          "Le maïs (en grains, en semoule/polenta, ou en farine) est également sans gluten et se prête à de nombreuses recettes salées.",
          "Les pommes de terre, sous toutes leurs formes (vapeur, sautées, en purée maison), sont naturellement sans gluten tant qu'elles ne sont pas panées avec de la farine de blé.",
          "Les légumineuses (lentilles, pois chiches, haricots secs ou en conserve) sont sans gluten et très économiques, en plus d'être rassasiantes.",
          "À l'inverse, le blé, l'orge et le seigle contiennent du gluten : cela concerne le pain classique, les pâtes classiques, la semoule de blé (couscous), la plupart des biscuits et beaucoup de sauces industrielles épaissies à la farine de blé — à vérifier sur l'étiquette en cas de doute.",
        ],
      },
      {
        heading: 'Idées de recettes rapides et économiques',
        body: [
          "Riz sauté aux légumes et à l'œuf : une base de riz cuit, des légumes surgelés ou frais, un œuf, une sauce soja sans gluten (vérifier l'étiquette, certaines sauces soja en contiennent).",
          "Poêlée de pommes de terre et légumineuses : pommes de terre sautées avec des pois chiches ou des lentilles, épices au choix.",
          "Galettes de maïs ou polenta poêlée, accompagnées d'une poêlée de légumes ou d'un œuf au plat.",
          "Chili de haricots rouges au riz : haricots rouges en conserve, tomates, épices, servi sur du riz.",
          "Curry de lentilles corail au riz : cuisson rapide, pas de trempage nécessaire, et une base d'épices (curcuma, cumin) qui relève le plat pour trois fois rien.",
          "Pâtes sans gluten (à base de riz ou de maïs, disponibles en supermarché) accompagnées d'une sauce tomate maison.",
        ],
      },
      {
        heading: 'Les pièges à éviter en cité U ou en collectif',
        body: [
          "Attention à la contamination croisée si vous partagez du matériel de cuisine (grille-pain, planche à découper, eau de cuisson des pâtes) avec des personnes qui cuisinent des produits contenant du gluten.",
          "Vérifiez toujours les sauces prêtes à l'emploi, bouillons cubes et plats préparés : la farine de blé y est souvent utilisée comme épaississant sans que ce soit évident au premier regard.",
          "En cas d'intolérance ou de maladie cœliaque diagnostiquée, référez-vous aux recommandations de votre médecin ou d'un diététicien plutôt qu'à un article généraliste comme celui-ci.",
        ],
      },
    ],
    ctaTitle: 'Envie de recettes sans gluten adaptées à ce que vous avez ?',
    ctaText:
      "Yummeal vous aide à cuisiner avec ce qu'il y a déjà dans votre frigo ou vos placards, pour des repas simples et rapides entre deux cours.",
    tags: ['sans gluten', 'étudiant', 'petit budget', 'recettes simples'],
  },
  {
    slug: 'repas-sportif-express-proteine',
    title: 'Repas sportif express et riche en protéines',
    metaDescription:
      'Des idées de repas rapides et riches en protéines pour les jours de sport, faciles à préparer avant ou après une séance.',
    intro:
      "Quand on enchaîne cours, travail et séances de sport, l'idée n'est pas de passer une heure en cuisine mais de trouver un repas qui tienne au corps, avec une bonne portion de protéines et le reste de l'assiette composé simplement.",
    sections: [
      {
        heading: 'Ce qui compte dans un repas sportif rapide',
        body: [
          "Une source de protéines identifiable dans l'assiette (œufs, volaille, poisson, tofu, légumineuses, produits laitiers) plutôt qu'un repas composé uniquement de féculents ou de sauce.",
          "Des féculents pour l'énergie (riz, pâtes, pain, pommes de terre), en quantité adaptée à l'intensité de votre séance : plus la séance est intense ou longue, plus cette portion peut être généreuse.",
          "Des légumes pour l'équilibre général du repas, même en accompagnement rapide (surgelés, en conserve, ou crus).",
          "S'hydrater correctement autour de l'effort compte au moins autant que le contenu de l'assiette : l'eau reste la base, avant tout complément.",
          "Cet article ne remplace pas les conseils d'un nutritionniste du sport : il donne des repères généraux, pas un plan alimentaire personnalisé.",
        ],
      },
      {
        heading: 'Idées de repas express riches en protéines',
        body: [
          "Poulet ou tofu poêlé avec du riz et des légumes surgelés, prêt en 15-20 minutes avec une seule poêle.",
          "Œufs brouillés avec du pain complet et des légumes sautés, une option rapide pour un repas avant ou après une séance.",
          "Bol de riz ou de quinoa avec du thon en conserve, du maïs et une vinaigrette simple : à préparer à l'avance et emporter.",
          "Pâtes avec des lentilles ou des pois chiches, une sauce tomate et un peu de fromage râpé, pour une version végétarienne rapide et protéinée.",
          "Yaourt grec ou fromage blanc avec des fruits et des flocons d'avoine, en option légère après une séance en fin de journée.",
          "Wrap au poulet ou aux œufs avec des crudités, facile à préparer en avance et à emporter entre deux créneaux.",
        ],
      },
      {
        heading: 'Organiser ses repas les jours chargés',
        body: [
          "Préparer une base de céréales (riz, pâtes) et une source de protéines en plus grande quantité un jour de repos permet de composer des repas rapides les jours suivants, sans tout recuisiner à chaque fois.",
          "Les légumineuses en conserve (pois chiches, lentilles, haricots) et le thon en conserve sont des alliés pratiques les jours où le temps manque, sans sacrifier l'apport en protéines.",
          "Un repas simple préparé et mangé régulièrement vaut mieux qu'un repas idéal jamais fait faute de temps : la régularité compte plus que la perfection d'une recette isolée.",
        ],
      },
    ],
    ctaTitle: 'Besoin d\'idées de repas rapides et protéinés au quotidien ?',
    ctaText:
      "Yummeal vous propose des recettes adaptées à votre frigo, pour manger équilibré même les jours de sport les plus chargés.",
    tags: ['protéines', 'sport', 'repas rapide', 'organisation'],
  },
  {
    slug: 'idees-snack-sain-etudiant',
    title: 'Idées de snacks sains et pas chers pour étudiants',
    metaDescription:
      "Des idées de collations simples, économiques et équilibrées pour tenir entre deux cours, sans céder systématiquement au distributeur.",
    intro:
      "Entre deux cours ou avant une séance de révision, un petit creux se comble facilement sans distributeur automatique : quelques idées de snacks simples, peu coûteux et faciles à transporter.",
    sections: [
      {
        heading: 'Ce qui fait un bon snack entre deux cours',
        body: [
          "Un snack qui associe un peu de protéines ou de fibres (fruits, oléagineux, produits laitiers, céréales complètes) tient généralement plus longtemps qu'un snack uniquement sucré.",
          "Privilégier des formats faciles à transporter dans un sac (fruits entiers, portions individuelles, boîtes hermétiques) évite le réflexe du distributeur par manque d'alternative sous la main.",
          "Préparer son snack la veille ou le matin en même temps que le reste des repas évite d'avoir à y penser au dernier moment.",
          "Il ne s'agit pas d'interdire les snacks sucrés occasionnels, mais d'avoir une alternative simple et pas chère à portée de main la plupart du temps.",
        ],
      },
      {
        heading: 'Idées de snacks simples et économiques',
        body: [
          "Un fruit entier (pomme, banane, clémentine selon la saison) : le snack le plus rapide et le moins cher qui existe.",
          "Une poignée d'oléagineux (amandes, noix, noisettes) ou un mélange fruits secs-oléagineux préparé en portions à l'avance.",
          "Un yaourt ou un fromage blanc, éventuellement avec un fruit coupé ou une cuillère de miel.",
          "Des bâtonnets de légumes crus (carotte, concombre) avec un peu de houmous, à préparer en boîte la veille.",
          "Une tranche de pain complet avec du fromage ou du beurre de cacahuète.",
          "Des œufs durs préparés à l'avance, faciles à emporter et rassasiants pour peu de préparation.",
          "Une compote sans sucre ajouté ou un fruit sec (dattes, abricots secs) pour un petit creux sucré rapide.",
        ],
      },
      {
        heading: 'Anticiper pour éviter le réflexe distributeur',
        body: [
          "Garder un petit stock de base dans son sac ou son casier (fruits secs, biscuits sains, compotes) permet d'avoir toujours une alternative sous la main les jours chargés.",
          "Préparer plusieurs portions de snacks le dimanche pour la semaine (fruits secs pesés, légumes coupés en boîte) fait gagner du temps au quotidien.",
          "Un snack maison revient presque toujours moins cher qu'un snack de distributeur, sur la durée d'un semestre.",
        ],
      },
    ],
    ctaTitle: 'Envie de snacks sains sans y penser tous les jours ?',
    ctaText:
      "Yummeal vous aide à organiser vos repas et collations à partir de ce que vous avez déjà, pour éviter le réflexe distributeur.",
    tags: ['snack', 'étudiant', 'petit budget', 'collation'],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
