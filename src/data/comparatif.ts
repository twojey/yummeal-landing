export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  ctaTitle: string;
  ctaText: string;
}

const yummealDiffCta = {
  ctaTitle: 'Voir la différence en pratique',
  ctaText:
    "Yummeal scanne en photo ce qu'il y a réellement dans votre frigo et propose directement des recettes adaptées — sans saisie manuelle, sans liste à cocher.",
};

export const articles: Article[] = [
  {
    slug: 'yummeal-vs-jow',
    title: 'Yummeal vs Jow',
    metaDescription:
      'Jow génère un menu de la semaine et une liste de courses. Yummeal part de ce que vous avez déjà. La différence expliquée factuellement.',
    intro:
      "Jow (JOW SAS, France) et Yummeal répondent tous les deux au \"qu'est-ce qu'on mange ce soir\", mais pas au même moment du problème.",
    sections: [
      {
        heading: 'Ce que fait Jow',
        body: [
          "Jow génère des recommandations de recettes personnalisées selon vos préférences et votre foyer, puis transforme le menu choisi en liste de courses envoyée directement à un drive ou une livraison partenaire. L'app est gratuite au téléchargement, avec un abonnement premium optionnel et des achats intégrés.",
          "Le point de départ de Jow est donc un menu créé à partir de zéro : l'app ne sait pas ce que vous avez déjà chez vous, elle vous aide à l'acheter.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Yummeal part de l'inverse : une photo de votre frigo réel, et une reconnaissance des ingrédients déjà présents pour vous proposer une recette sans rien acheter de plus. Les deux approches sont complémentaires plutôt qu'identiques : Jow optimise l'achat, Yummeal optimise ce que vous avez déjà pour éviter le gaspillage.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-marmiton',
    title: 'Yummeal vs Marmiton',
    metaDescription:
      "Marmiton propose une recherche de recettes par ingrédients saisis à la main. Yummeal reconnaît automatiquement ce qu'il y a dans votre frigo en photo.",
    intro:
      "Marmiton (édité par auFeminin) est l'un des plus gros catalogues de recettes en France, avec un filtre de recherche par ingrédients — mais ce filtre fonctionne différemment de Yummeal.",
    sections: [
      {
        heading: 'Ce que fait Marmiton',
        body: [
          "Marmiton est un moteur de recherche de recettes (plus de 75 000 recettes) avec un filtre permettant de taper ou cocher les ingrédients qu'on possède, en plus d'un planificateur de menu et d'un carnet de recettes personnel. L'app est gratuite, sans abonnement identifié sur sa fiche App Store.",
          "La recherche par ingrédients y est déclarative : c'est vous qui indiquez ce que vous avez, ingrédient par ingrédient.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Yummeal remplace cette saisie manuelle par une photo : l'application reconnaît les ingrédients visibles dans votre frigo et construit la recette à partir de ce qu'elle détecte, sans que vous ayez à les lister vous-même.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-jow-vs-marmiton',
    title: 'Yummeal vs Jow vs Marmiton',
    metaDescription:
      "Trois applications françaises de cuisine, trois mécanismes différents : génération de menu (Jow), recherche par ingrédients saisis (Marmiton), scan photo du frigo (Yummeal).",
    intro:
      "Jow, Marmiton et Yummeal sont trois applications françaises de cuisine fréquemment comparées, mais elles répondent à trois besoins différents.",
    sections: [
      {
        heading: 'Jow : générer un menu et l\'acheter',
        body: [
          "Jow crée un menu de la semaine à partir de vos préférences, puis transforme ce menu en liste de courses connectée à un drive ou une livraison. Il part de zéro, pas de votre frigo actuel.",
        ],
      },
      {
        heading: 'Marmiton : chercher dans un catalogue par ingrédients saisis',
        body: [
          "Marmiton est un moteur de recherche de recettes (75 000+) avec un filtre par ingrédients que vous tapez ou cochez vous-même, en plus d'un planificateur de menu.",
        ],
      },
      {
        heading: 'Yummeal : reconnaître ce que vous avez déjà, en photo',
        body: [
          "Yummeal prend le problème par l'autre bout : une photo de votre frigo réel, une reconnaissance automatique des ingrédients présents, et une recette proposée directement à partir de ce que vous avez déjà — sans achat supplémentaire ni saisie manuelle.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'meilleure-app-cuisine-frigo',
    title: 'Quelle est la meilleure application pour cuisiner avec son frigo ?',
    metaDescription:
      "Panorama honnête des applications qui aident à cuisiner avec ce qu'on a déjà : saisie manuelle, scan de code-barres ou reconnaissance photo du frigo réel.",
    intro:
      "Plusieurs applications promettent de vous aider à cuisiner avec ce que vous avez déjà. Elles n'utilisent pas toutes le même mécanisme — voici un panorama factuel pour choisir en connaissance de cause.",
    sections: [
      {
        heading: "Les apps à saisie manuelle d'ingrédients",
        body: [
          "Marmiton, Supercook et Frigo Magic fonctionnent sur le même principe : vous tapez ou cochez dans une liste les ingrédients que vous possédez, et l'app filtre un catalogue de recettes existantes en fonction. Efficace si vous avez le temps de lister, moins pratique si vous voulez aller vite.",
        ],
      },
      {
        heading: 'Les apps à inventaire déclaratif (code-barres, tickets de caisse)',
        body: [
          "KitchenPal (scan de code-barres) et Cooklist (import via cartes de fidélité de supermarchés américains) reconstituent un garde-manger numérique à partir de vos achats, puis suggèrent des recettes. Ça évite la saisie répétée, mais ça ne capture pas les restes, les produits sans code-barres (légumes en vrac, restes de repas) ni ce qui traîne depuis un moment.",
        ],
      },
      {
        heading: "L'approche de Yummeal : la photo du frigo réel",
        body: [
          "Yummeal reconnaît directement, à partir d'une photo, les ingrédients présents dans votre frigo — y compris les restes et les produits en vrac — sans code-barres ni saisie manuelle, pour proposer une recette adaptée à ce que vous avez vraiment, pas seulement à ce que vous avez scanné en caisse.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-supercook',
    title: 'Yummeal vs Supercook',
    metaDescription:
      "Supercook fait correspondre une liste d'ingrédients saisis à la main à une base de 11 millions de recettes web. Yummeal reconnaît vos ingrédients en photo.",
    intro:
      "Supercook (AMR Systems LLC) est un agrégateur de recettes gratuit, financé par la publicité, qui fonctionne par sélection manuelle d'ingrédients.",
    sections: [
      {
        heading: 'Ce que fait Supercook',
        body: [
          "Vous construisez un \"garde-manger\" virtuel en sélectionnant (ou en dictant à la voix) des ingrédients dans une liste de plus de 2000 items, et l'app fait correspondre cette liste à une base annoncée de 11 millions de recettes issues de 18 000 sites. L'app est gratuite, sans abonnement.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Aucun scan photo ou caméra n'existe chez Supercook : tout repose sur la sélection manuelle. Yummeal automatise cette étape en reconnaissant les ingrédients directement depuis une photo de votre frigo, ce qui évite d'avoir à chercher et cocher chaque ingrédient un par un dans une longue liste.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-frigo-magic',
    title: 'Yummeal vs Frigo Magic',
    metaDescription:
      "Frigo Magic propose des recettes anti-gaspi à partir d'ingrédients saisis manuellement. Yummeal les reconnaît automatiquement en photo.",
    intro:
      "Frigo Magic (éditée par Haruni) partage avec Yummeal le positionnement anti-gaspillage, mais pas le même mécanisme de saisie.",
    sections: [
      {
        heading: 'Ce que fait Frigo Magic',
        body: [
          "L'utilisateur saisit manuellement les ingrédients de son frigo et de ses placards, et l'app propose des recettes parmi un catalogue annoncé de plus de 4000 recettes, avec possibilité d'ajuster les quantités et de substituer des ingrédients. L'app est gratuite, sans compte obligatoire.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Aucune fonctionnalité de reconnaissance photo n'a été identifiée dans la documentation publique de Frigo Magic : la saisie reste manuelle. Yummeal remplace cette étape par une photo du frigo, analysée automatiquement pour détecter les ingrédients présents.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-kitchenpal',
    title: 'Yummeal vs KitchenPal',
    metaDescription:
      "KitchenPal gère un garde-manger via scan de code-barres. Yummeal reconnaît directement le contenu réel du frigo en photo, sans code-barres.",
    intro:
      "KitchenPal (iCuisto Pte. Ltd.) est une app de gestion de garde-manger et de listes de courses partagées, avec des suggestions de recettes.",
    sections: [
      {
        heading: 'Ce que fait KitchenPal',
        body: [
          "KitchenPal alimente un inventaire de garde-manger par scan de code-barres (base de plus de 5 millions de produits) et saisie manuelle, avec suivi des dates de péremption, comparaison nutritionnelle et suggestions de recettes à partir du stock déclaré. L'app est freemium, avec un abonnement premium ou un achat unique à vie.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Le stock KitchenPal est déclaratif : il faut scanner le code-barres de chaque produit acheté ou le saisir à la main — une méthode fiable pour les produits emballés, mais qui ne couvre pas les légumes en vrac, les restes de repas ou ce qui n'a pas de code-barres. Yummeal reconnaît directement ces éléments à partir d'une photo du frigo, sans étape de scan produit par produit.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-cooklist',
    title: 'Yummeal vs Cooklist',
    metaDescription:
      "Cooklist importe vos achats via les cartes de fidélité de supermarchés américains. Yummeal reconnaît le contenu réel de votre frigo par photo, sans dépendre d'une enseigne partenaire.",
    intro:
      "Cooklist (Cooklist, Inc.) reconstitue un garde-manger numérique à partir des données d'achat de supermarchés américains partenaires.",
    sections: [
      {
        heading: 'Ce que fait Cooklist',
        body: [
          "En connectant les cartes de fidélité d'enseignes américaines (Kroger, Ralphs, Fred Meyer, King Soopers...), Cooklist importe automatiquement vos achats alimentaires dans un garde-manger numérique, puis les fait correspondre à plus d'un million de recettes, avec génération de liste de courses pour les ingrédients manquants. L'app est freemium.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Le mécanisme de Cooklist dépend d'enseignes partenaires exclusivement américaines, ce qui le rend inutilisable en France. Yummeal ne dépend d'aucun partenariat commerçant : une photo de votre frigo suffit, où que vous fassiez vos courses.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-plantjammer',
    title: 'Yummeal vs PlantJammer',
    metaDescription:
      "PlantJammer a fermé en 2025. Voici ce qui s'est passé et comment Yummeal répond aujourd'hui au même besoin de cuisiner avec ce qu'on a.",
    intro:
      "PlantJammer était une application de génération de recettes végétales à partir d'ingrédients disponibles. Elle n'existe plus.",
    sections: [
      {
        heading: "Ce qui s'est passé",
        body: [
          "L'entreprise derrière PlantJammer est aujourd'hui classée comme cessée d'activité, et l'application a été retirée de Google Play le 27 janvier 2025, sa dernière mise à jour datant de mai 2022. Le nom de domaine officiel a depuis été racheté par un site sans rapport avec la cuisine.",
        ],
      },
      {
        heading: "Si vous cherchiez une alternative",
        body: [
          "Si vous utilisiez PlantJammer pour générer des recettes à partir de vos ingrédients, Yummeal répond à un besoin proche avec un mécanisme différent : une photo de votre frigo réel plutôt qu'une saisie d'ingrédients, avec des recettes personnalisées générées automatiquement.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-yummly',
    title: 'Yummeal vs Yummly',
    metaDescription:
      "Yummly a fermé définitivement en décembre 2024, après le rachat par Whirlpool. Voici ce qui s'est passé et une alternative actuelle.",
    intro:
      "Yummly était l'un des plus gros moteurs de recherche de recettes au monde. Racheté par Whirlpool en 2017, il a fermé fin 2024.",
    sections: [
      {
        heading: "Ce qui s'est passé",
        body: [
          "Whirlpool a licencié l'ensemble de l'équipe Yummly en avril 2024, puis fermé définitivement l'application et le site le 20 décembre 2024. Aucune reprise n'a été annoncée depuis.",
        ],
      },
      {
        heading: "Si vous cherchiez une alternative",
        body: [
          "Yummly proposait une recherche de recettes personnalisée à partir de préférences déclarées, pas une reconnaissance du contenu réel du frigo. Yummeal répond différemment au même besoin de départ (\"qu'est-ce que je cuisine ?\") en partant d'une photo de vos ingrédients disponibles plutôt que d'un profil de préférences.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-recipe-keeper',
    title: 'Yummeal vs Recipe Keeper',
    metaDescription:
      "Recipe Keeper est un carnet de recettes personnel à alimenter soi-même. Yummeal génère des recettes à partir de ce que votre frigo contient.",
    intro:
      "Recipe Keeper (Tudorspan Limited) et Yummeal ne répondent pas au même besoin : l'un organise vos recettes, l'autre en propose de nouvelles à partir de votre frigo.",
    sections: [
      {
        heading: 'Ce que fait Recipe Keeper',
        body: [
          "Recipe Keeper est un organisateur de recettes : import depuis des sites web, scan photo de livres de cuisine, liste de courses par rayon, planificateur de repas. L'app est gratuite avec une mise à niveau Pro en achat unique.",
          "C'est un classeur : les recettes viennent de vous (importées ou saisies), pas générées à partir de vos ingrédients.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Recipe Keeper ne détecte aucun ingrédient réel et ne propose pas de recette à partir de ce que vous avez chez vous. Yummeal fait l'inverse : une photo de votre frigo génère directement une recette adaptée, sans bibliothèque personnelle à constituer au préalable.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-mealime',
    title: 'Yummeal vs Mealime',
    metaDescription:
      "Mealime génère un plan de repas hebdomadaire à partir de vos préférences. Yummeal part de ce qu'il y a déjà dans votre frigo.",
    intro:
      "Mealime (Mealime Meal Plans Inc) et Yummeal se recoupent sur l'objectif (manger simplement, sans y penser) mais pas sur le point de départ.",
    sections: [
      {
        heading: 'Ce que fait Mealime',
        body: [
          "Mealime génère un plan de repas hebdomadaire personnalisé selon vos préférences et régime déclarés, à partir de sa bibliothèque de recettes, puis produit une liste de courses automatique. L'app est gratuite avec un abonnement Pro optionnel à partir de 2,99 $/mois selon sa fiche officielle.",
          "Le flux décrit par l'éditeur est \"planifier → acheter → cuisiner\", sans étape de prise en compte de ce que vous avez déjà.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Yummeal inverse ce flux : il part de ce que vous avez déjà (via une photo du frigo) plutôt que de vous faire acheter selon un plan prédéfini, avec l'objectif explicite de réduire le gaspillage plutôt que d'optimiser l'achat.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-bigoven',
    title: 'Yummeal vs BigOven',
    metaDescription:
      "BigOven est un gestionnaire de recettes où l'on tape soi-même les ingrédients qu'on a. Yummeal les reconnaît automatiquement en photo.",
    intro:
      "BigOven (Aisle Ahead, Inc.) est un organisateur de recettes historique avec une recherche par ingrédients saisis à la main.",
    sections: [
      {
        heading: 'Ce que fait BigOven',
        body: [
          "BigOven combine une base de recettes personnelles, un planificateur de repas et une liste de courses. La recherche par \"ingrédients qu'on a\" se fait par saisie texte. L'app est gratuite, avec un abonnement BigOven Pro à environ 2,99 $/mois ou 24,99 $/an.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Aucune reconnaissance d'image n'a été trouvée chez BigOven pour identifier les ingrédients réels : tout passe par la saisie manuelle. Yummeal automatise cette étape via une photo du frigo.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-sidechef',
    title: 'Yummeal vs SideChef',
    metaDescription:
      "SideChef propose des recettes vidéo guidées et un garde-manger alimenté manuellement ou par code-barres. Yummeal reconnaît directement le frigo en photo.",
    intro:
      "SideChef (SideChef Group Limited) est une plateforme de recettes vidéo pas-à-pas, avec une fonctionnalité de garde-manger nommée \"My Pantry\".",
    sections: [
      {
        heading: 'Ce que fait SideChef',
        body: [
          "SideChef propose plus de 16 000 \"Smart Recipes\" avec instructions vidéo guidées, une planification de repas et des courses en ligne intégrées. Sa fonctionnalité \"My Pantry\", lancée en 2023, permet de lister les ingrédients qu'on possède par recherche manuelle ou scan de code-barres. L'app est gratuite avec un essai, puis un abonnement Premium à partir de 4,99 $/mois.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "My Pantry reste une liste déclarative : recherche manuelle ou code-barres d'un produit emballé, pas une reconnaissance visuelle du contenu réel d'un frigo (légumes en vrac, restes). Yummeal reconnaît directement ces éléments par photo, sans étape de scan produit par produit.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-paprika-3',
    title: 'Yummeal vs Paprika Recipe Manager',
    metaDescription:
      "Paprika est un carnet de recettes numérique, sans génération de recette ni reconnaissance d'ingrédients. Yummeal génère des recettes à partir de votre frigo.",
    intro:
      "Paprika Recipe Manager (Hindsight Labs LLC) est l'application la plus éloignée de Yummeal parmi les outils de cuisine comparés ici.",
    sections: [
      {
        heading: 'Ce que fait Paprika',
        body: [
          "Paprika est un gestionnaire de recettes personnelles : import et organisation de vos propres recettes, listes de courses, planning de repas. C'est un achat unique (4,99 $ sur iOS), sans abonnement, vendu séparément sur chaque plateforme (iOS, Android, Mac, Windows).",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Paprika ne génère aucune recette et ne reconnaît aucun ingrédient : c'est uniquement un carnet numérique pour des recettes que vous apportez vous-même. Yummeal fait l'inverse : la recette est générée automatiquement à partir d'une photo de ce que vous avez dans votre frigo.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-samsung-food',
    title: 'Yummeal vs Samsung Food',
    metaDescription:
      "Samsung Food propose un scan photo du frigo réservé aux abonnés payants, en complément d'un catalogue de recettes. Chez Yummeal, le scan du frigo est le cœur du produit dès l'usage gratuit.",
    intro:
      "Samsung Food (ex-Whisk, racheté par Samsung) a bien une fonctionnalité de reconnaissance photo du frigo — la comparaison la plus nuancée de cette liste.",
    sections: [
      {
        heading: 'Ce que fait Samsung Food',
        body: [
          "Samsung Food est avant tout un gestionnaire de recettes et de planification de repas (plus de 240 000 recettes gratuites), avec liste de courses et intégration à l'écosystème Samsung (dont les réfrigérateurs connectés Family Hub). L'app est gratuite, avec un abonnement Samsung Food+ à 6,99 $/mois ou 59,99 $/an.",
          "Depuis une mise à jour de 2024, les abonnés Food+ disposent d'une fonction \"Search with camera\" qui permet de photographier son frigo avec son téléphone pour détecter des ingrédients et recevoir des suggestions de recettes.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Cette fonctionnalité existe donc chez Samsung Food, mais elle est réservée aux abonnés payants Food+ et reste une fonctionnalité secondaire greffée sur un produit centré sur la gestion de recettes et de menus. Chez Yummeal, la reconnaissance du frigo par photo est le mécanisme central de l'application, accessible dès l'usage gratuit.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-myfridgefood',
    title: 'Yummeal vs MyFridgeFood',
    metaDescription:
      "MyFridgeFood fonctionne par sélection manuelle d'ingrédients dans des listes par catégorie, sans mise à jour récente connue. Yummeal reconnaît vos ingrédients par photo.",
    intro:
      "MyFridgeFood est l'application la plus proche de Yummeal dans l'intention (\"utiliser ce qu'on a déjà\"), mais pas dans le mécanisme.",
    sections: [
      {
        heading: 'Ce que fait MyFridgeFood',
        body: [
          "L'utilisateur coche manuellement, dans des listes organisées par catégories (viandes, légumes...), les ingrédients qu'il possède ; l'app filtre ensuite une base de recettes communautaires correspondantes. Aucune caméra ni IA de reconnaissance. L'app est gratuite. Sa dernière mise à jour connue sur les stores remonte à fin 2022/début 2023.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Là où MyFridgeFood demande de cocher chaque ingrédient dans une liste fixe, Yummeal les reconnaît directement sur une photo de votre frigo, sans étape de sélection manuelle.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-yazio',
    title: 'Yummeal vs Yazio',
    metaDescription:
      "Yazio suit vos calories via une saisie manuelle (journal alimentaire, code-barres, photo du plat). Yummeal calcule automatiquement la nutrition des recettes que vous cuisinez, sans étape de saisie séparée.",
    intro:
      "Yazio (YAZIO GmbH) et Yummeal font tous les deux un suivi nutritionnel, mais pas de la même manière : l'un demande de logger chaque repas, l'autre en déduit l'essentiel de ce que vous cuisinez déjà.",
    sections: [
      {
        heading: 'Ce que fait réellement Yazio',
        body: [
          "Yazio est d'abord un compteur de calories et un suivi nutritionnel : journal alimentaire à remplir, base de données d'aliments, scan de code-barres, suivi des macronutriments et du jeûne intermittent. Une reconnaissance photo IA existe, mais elle sert à identifier un repas déjà préparé pour le loguer — c'est une étape de saisie à part entière, pas un usage secondaire.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Yummeal ne demande pas de tenir un journal alimentaire séparé : quand vous cuisinez une recette proposée par l'app, la nutrition (calories, macros) est calculée automatiquement à partir de cette recette, sans étape de logging manuel supplémentaire. Yazio, à l'inverse, fonctionne indépendamment de ce que vous cuisinez réellement : c'est à vous de renseigner chaque repas pour qu'il soit compté.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-lifesum',
    title: 'Yummeal vs Lifesum',
    metaDescription:
      "Lifesum suit vos calories via une saisie manuelle ou une photo de repas dédiée. Yummeal calcule automatiquement la nutrition des recettes que vous cuisinez, sans étape de logging séparée.",
    intro:
      "Lifesum (Lifesum AB) et Yummeal font tous les deux du suivi nutritionnel, mais Lifesum construit ce suivi indépendamment de ce que vous cuisinez, quand Yummeal le déduit directement de vos recettes.",
    sections: [
      {
        heading: 'Ce que fait réellement Lifesum',
        body: [
          "Lifesum est un suivi nutritionnel et calorique : photo du repas pour estimation nutritionnelle, saisie vocale, scan de code-barres, plans alimentaires et scores de bien-être. Il ne gère ni inventaire de garde-manger ni recettes à partir des restes — c'est un journal alimentaire à remplir, pas un outil de cuisine.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Yummeal calcule la nutrition (calories, macros) automatiquement à partir des recettes que vous cuisinez réellement dans l'app, sans étape de saisie ou de photo de repas séparée. Lifesum, lui, ne sait rien de ce que vous cuisinez tant que vous ne l'avez pas renseigné vous-même.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-toogoodtogo',
    title: 'Yummeal vs Too Good To Go',
    metaDescription:
      "Too Good To Go vend des paniers surprise d'invendus de commerçants. Yummeal aide à cuisiner ce que vous avez déjà chez vous. Deux logiques anti-gaspi différentes.",
    intro:
      "Too Good To Go et Yummeal partagent la finalité \"anti-gaspillage\", mais sur des maillons complètement différents de la chaîne alimentaire.",
    sections: [
      {
        heading: 'Ce que fait Too Good To Go',
        body: [
          "Too Good To Go est une marketplace anti-gaspi entre commerçants (restaurants, boulangeries, supermarchés) et consommateurs : l'app affiche les invendus à proximité sous forme de \"paniers surprise\" vendus à prix réduit, à récupérer sur place à un créneau donné.",
        ],
      },
      {
        heading: "Pourquoi ce n'est pas un concurrent fonctionnel",
        body: [
          "Too Good To Go ne connaît pas le contenu de votre frigo et ne propose aucune recette : c'est un service d'achat d'invendus commerçants, pas une app de cuisine. Yummeal agit sur l'autre bout du problème, une fois les courses faites : éviter que ce qui est déjà chez vous ne finisse à la poubelle.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-olio',
    title: 'Yummeal vs Olio',
    metaDescription:
      "Olio est une plateforme de partage de denrées entre particuliers et commerces. Yummeal aide à cuisiner ce que vous avez déjà chez vous. Deux approches anti-gaspi différentes.",
    intro:
      "Olio (Olio Exchange Limited) et Yummeal sont parfois mis dans la même case \"anti-gaspi\", mais leurs mécanismes n'ont rien en commun.",
    sections: [
      {
        heading: 'Ce que fait Olio',
        body: [
          "Olio est une plateforme d'échange de proximité : particuliers et commerces publient des denrées ou objets excédentaires (photo + localisation), récupérables gratuitement ou via un don libre, avec des bénévoles collectant les invendus de commerces partenaires. L'app est gratuite.",
        ],
      },
      {
        heading: "Pourquoi ce n'est pas un concurrent fonctionnel",
        body: [
          "Olio ne propose ni scan de frigo, ni suggestion de recette : c'est une bourse d'échange entre personnes, pas un outil de cuisine personnel. Yummeal répond à un besoin individuel différent : cuisiner ce que vous avez déjà chez vous plutôt que redistribuer un surplus.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-foodvisor',
    title: 'Yummeal vs Foodvisor',
    metaDescription:
      "Foodvisor scanne un repas déjà préparé pour en compter les calories. Yummeal scanne le frigo pour proposer une recette, et calcule la nutrition automatiquement une fois cuisinée. Deux usages de la reconnaissance photo alimentaire, à ne pas confondre.",
    intro:
      "Foodvisor (Foodvisor SAS, France) et Yummeal utilisent tous les deux la reconnaissance photo d'aliments — mais sur des objets différents, à des moments différents du repas.",
    sections: [
      {
        heading: 'Ce que fait réellement Foodvisor',
        body: [
          "Foodvisor scanne en photo un repas déjà préparé, dans l'assiette, pour en estimer les calories et macronutriments (avec aussi scan de code-barres et saisie vocale). C'est une étape de logging à part entière, à refaire à chaque repas, quelle que soit son origine.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "Yummeal scanne le frigo en amont (ingrédients bruts, non cuisinés) pour proposer une recette, puis calcule automatiquement la nutrition de cette recette une fois cuisinée — sans photo du plat fini ni étape de logging séparée. Foodvisor, à l'inverse, ne sait rien de vos ingrédients de départ : il analyse uniquement le résultat final, photographié après coup.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
  {
    slug: 'yummeal-vs-eat-this-much',
    title: 'Yummeal vs Eat This Much',
    metaDescription:
      "Eat This Much génère un plan de repas à partir d'objectifs nutritionnels déclarés. Yummeal génère une recette à partir de ce qu'il y a réellement dans votre frigo.",
    intro:
      "Eat This Much (Eat This Much Inc.) et Yummeal partent de deux logiques opposées pour arriver à une recette.",
    sections: [
      {
        heading: 'Ce que fait Eat This Much',
        body: [
          "Eat This Much génère des plans de repas à partir d'objectifs macro/caloriques et d'un budget déclarés par l'utilisateur. Une fonction optionnelle de \"virtual pantry\" permet de saisir manuellement ce qu'on possède déjà pour que l'algorithme le priorise dans les suggestions. L'app propose un compte gratuit et un abonnement Premium.",
        ],
      },
      {
        heading: 'La différence avec Yummeal',
        body: [
          "La \"virtual pantry\" d'Eat This Much repose sur une saisie déclarative, pas une reconnaissance automatique par caméra. Yummeal part directement d'une photo de votre frigo réel pour détecter les ingrédients disponibles, sans étape de saisie d'objectifs nutritionnels préalable.",
        ],
      },
    ],
    ...yummealDiffCta,
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
