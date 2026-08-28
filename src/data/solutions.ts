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
    slug: 'repas-famille-charge-mentale',
    title: 'Repas de famille : comment alléger la charge mentale au quotidien',
    metaDescription:
      "Penser aux repas de toute la famille, jour après jour, épuise avant même d'avoir cuisiné. Des pistes concrètes pour alléger cette charge mentale.",
    intro:
      "\"Qu'est-ce qu'on mange ce soir ?\" C'est souvent la question la plus fatigante de la journée, pas la plus difficile. La charge mentale des repas, c'est cette suite ininterrompue de micro-décisions : que reste-t-il au frigo, qui aime quoi, qu'est-ce qui périme bientôt, a-t-on le temps de cuisiner ce soir. Aucune de ces décisions n'est compliquée seule, mais leur accumulation quotidienne, souvent portée par une seule personne du foyer, use plus que la cuisine elle-même.",
    sections: [
      {
        heading: 'Nommer la charge avant de la réduire',
        body: [
          "La première étape n'est pas organisationnelle mais concrète : repérer les tâches invisibles. Décider du menu, vérifier ce qu'il reste, anticiper les courses, tenir compte des goûts de chacun, gérer les imprévus (un enfant malade, une soirée qui s'éternise) : ce sont des décisions qui se prennent souvent en continu, y compris hors des heures de repas.",
          "Une charge mentale reconnue et nommée, même sans solution immédiate, est déjà plus facile à partager avec le reste du foyer. Beaucoup de tensions autour des repas viennent moins de la cuisine elle-même que de l'invisibilité de ce travail de planification.",
        ],
      },
      {
        heading: 'Réduire le nombre de décisions, pas leur qualité',
        body: [
          "Une astuce simple et éprouvée : fixer à l'avance quelques trames de repas récurrentes (par exemple un jour 'pâtes', un jour 'restes', un jour 'improvisation frigo'). Cela ne rend pas les repas moins bons, cela retire simplement une décision à prendre chaque soir.",
          "Cuisiner un peu plus que nécessaire quand on a le temps, pour avoir une base de restes utilisable les jours plus chargés, réduit aussi le nombre de fois où il faut repartir de zéro dans la semaine.",
          "Partir de ce qu'il y a déjà dans le frigo, plutôt que de toujours partir d'une recette qui suppose des courses supplémentaires, évite une bonne partie des allers-retours mentaux entre 'qu'est-ce qu'on a' et 'qu'est-ce qu'il faudrait avoir'.",
        ],
      },
      {
        heading: 'Partager la charge, pas seulement les tâches',
        body: [
          "Répartir qui fait les courses ou qui cuisine ne suffit pas si une seule personne continue de tout anticiper mentalement en amont. Partager la charge mentale, c'est aussi partager la décision : demander à l'autre de proposer le menu du jour, ou de vérifier lui-même ce qu'il reste au frigo, change la dynamique plus qu'un simple partage des tâches manuelles.",
          "Impliquer les enfants, quand c'est possible, dans le choix ou la préparation d'un repas simple, allège aussi la charge sans demander plus de temps de cuisine.",
        ],
      },
    ],
    ctaTitle: 'Un coup de main pour décider quoi cuisiner',
    ctaText:
      "Yummeal scanne ce qu'il y a dans votre frigo et vous propose directement des recettes adaptées, sans avoir à y penser en premier.",
    tags: ['charge mentale', 'famille', 'organisation repas'],
  },
  {
    slug: 'recettes-petit-budget-fin-de-mois',
    title: 'Recettes petit budget : bien manger en fin de mois',
    metaDescription:
      "Des idées concrètes pour cuisiner correctement quand le budget se resserre en fin de mois, sans sacrifier la qualité des repas.",
    intro:
      "En fin de mois, le budget alimentaire est souvent le premier à être resserré. Cela ne veut pas dire manger moins bien : cela veut dire cuisiner différemment, en s'appuyant sur des produits moins chers et sur ce qu'il reste déjà à la maison.",
    sections: [
      {
        heading: 'Partir de ce que vous avez déjà',
        body: [
          "Avant de faire une liste de courses, faites l'inventaire de ce qui traîne déjà au frigo, au congélateur ou dans les placards. Un fond de riz, une boîte de conserve entamée, des légumes un peu fatigués : ce sont souvent des repas complets qui s'ignorent.",
          "Les produits proches de leur date, souvent vendus moins cher en magasin, ne sont pas un problème s'ils sont cuisinés rapidement plutôt que stockés.",
        ],
      },
      {
        heading: 'Miser sur les bases peu chères',
        body: [
          "Légumineuses (lentilles, pois chiches, haricots secs), féculents (riz, pâtes, pommes de terre), œufs et légumes de saison restent parmi les ingrédients les moins chers au kilo, et se déclinent en une grande variété de plats.",
          "Un plat construit autour d'une légumineuse ou d'un féculent, complété par des légumes et une petite quantité de protéine animale, revient nettement moins cher qu'un plat centré sur la viande ou le poisson, sans être moins nourrissant.",
          "Cuisiner en plus grande quantité un jour, pour congeler des portions ou avoir des restes les jours suivants, réduit aussi le coût moyen par repas en limitant le gaspillage.",
        ],
      },
      {
        heading: 'Éviter les pièges qui coûtent cher',
        body: [
          "Les plats préparés et les portions individuelles coûtent presque toujours plus cher au kilo que les mêmes ingrédients achetés bruts et cuisinés soi-même.",
          "Acheter sans liste précise pousse souvent à prendre plus que nécessaire, ou des produits qui finiront par se perdre. Une liste construite à partir de ce qu'il manque réellement limite ce gaspillage, qui est aussi une perte d'argent.",
        ],
      },
    ],
    ctaTitle: "Cuisiner avec ce que vous avez, sans y perdre de temps",
    ctaText:
      "Yummeal identifie les ingrédients de votre frigo et vous propose des recettes qui les utilisent en priorité, pour limiter les courses et le gaspillage.",
    tags: ['petit budget', 'fin de mois', 'économies'],
  },
  {
    slug: 'cuisiner-sans-four-etudiant',
    title: 'Cuisiner sans four : des recettes simples pour étudiants',
    metaDescription:
      "Pas de four dans votre studio étudiant ? Voici comment cuisiner des repas complets avec une plaque, une casserole ou une poêle.",
    intro:
      "Beaucoup de logements étudiants n'ont ni four ni grande cuisine équipée : une plaque de cuisson, une casserole et une poêle suffisent pourtant à préparer des repas complets et variés, sans dépendre de plats préparés au micro-ondes.",
    sections: [
      {
        heading: "Ce qu'une plaque et une casserole permettent déjà",
        body: [
          "La majorité des plats du quotidien (pâtes, riz, légumineuses, œufs, légumes sautés, soupes) se préparent entièrement à la casserole ou à la poêle. Le four sert surtout à gratiner ou à cuire de grandes pièces, ce qui n'est pas la majorité des repas du quotidien.",
          "Une poêle avec couvercle remplace une bonne partie des usages du four : elle permet de faire mijoter, d'étuver des légumes ou de terminer la cuisson d'une viande à couvert, plus doucement qu'à découvert.",
        ],
      },
      {
        heading: 'Des équivalents sans four aux classiques',
        body: [
          "Un gratin peut devenir un risotto ou des légumes fondants à la poêle avec un peu de fromage râpé à la fin, sans passer par la case four.",
          "Une viande ou un poisson qui iraient normalement au four peuvent être cuits à la poêle à feu moyen, à couvert en fin de cuisson pour finir de cuire à cœur sans dessécher.",
          "Les légumes rôtis peuvent être remplacés par des légumes sautés à la poêle avec un peu d'huile, à feu vif puis plus doux pour les attendrir.",
        ],
      },
      {
        heading: 'Un minimum de matériel suffit',
        body: [
          "Une casserole, une poêle avec couvercle, une planche et un couteau correct couvrent la grande majorité des recettes du quotidien. Il n'est pas nécessaire d'investir dans beaucoup d'équipement pour bien manger dans un petit espace.",
          "Cuisiner pour deux ou trois repas d'un coup, quand la plaque est déjà allumée, permet de limiter le temps passé en cuisine sur la semaine, ce qui est souvent la vraie contrainte en études.",
        ],
      },
    ],
    ctaTitle: 'Des recettes adaptées à votre cuisine, four ou pas',
    ctaText:
      'Yummeal propose des recettes à partir de ce que vous avez, en tenant compte de vos moyens de cuisson disponibles.',
    tags: ['sans four', 'étudiant', 'petite cuisine'],
  },
  {
    slug: 're-equilibrage-alimentaire-debutant',
    title: 'Rééquilibrage alimentaire pour débutant : par où commencer',
    metaDescription:
      "Envie de rééquilibrer votre alimentation sans plan strict ni régime ? Quelques principes généraux et non contraignants pour commencer en douceur.",
    intro:
      "Rééquilibrer son alimentation ne veut pas dire suivre un plan chiffré ou s'interdire des aliments. Il s'agit plutôt d'ajuster progressivement quelques habitudes, à son rythme. Ce guide propose des principes généraux et non contraignants : il ne remplace pas l'avis d'un professionnel de santé ou d'un diététicien, en particulier si vous avez un objectif ou une situation de santé particulière.",
    sections: [
      {
        heading: 'Des principes généraux, pas un plan',
        body: [
          "Manger varié reste l'un des repères les plus simples et les plus larges : alterner les sources de protéines, inclure régulièrement des légumes et des féculents, plutôt que de répéter les mêmes plats par manque de temps ou d'idées.",
          "Ne pas sauter de repas est un autre repère souvent utile : un repas sauté mène fréquemment à une faim plus difficile à gérer plus tard dans la journée, et à des choix moins réfléchis sur le moment.",
          "Écouter ses sensations de faim et de rassasiement, plutôt que de manger par habitude ou de finir une assiette par principe, est une piste douce pour ajuster ses quantités sans les compter.",
        ],
      },
      {
        heading: 'Avancer par petits changements',
        body: [
          "Changer une seule habitude à la fois (par exemple, cuisiner un repas de plus par semaine, ou intégrer un légume supplémentaire) est plus tenable dans la durée qu'un changement global du jour au lendemain.",
          "Cuisiner soi-même plus souvent, même simplement, permet de mieux savoir ce que l'on mange, sans que cela suppose de recettes compliquées ou de temps de préparation long.",
          "Il n'y a pas de rythme universel : ce qui compte est la régularité des petits ajustements, plus que leur intensité au départ.",
        ],
      },
      {
        heading: 'Ce que ce guide ne remplace pas',
        body: [
          "Ces repères sont volontairement généraux et ne constituent pas un conseil médical ou diététique personnalisé. Ils ne tiennent pas compte de votre situation individuelle, d'une pathologie, d'une grossesse ou de besoins spécifiques.",
          "En cas de doute, de difficulté avec l'alimentation, ou d'objectif de santé précis, l'avis d'un médecin ou d'un diététicien reste la référence la plus fiable, bien avant tout guide en ligne.",
        ],
      },
    ],
    ctaTitle: 'Cuisiner varié, sans y passer des heures',
    ctaText:
      "Yummeal vous aide à cuisiner avec ce que vous avez, pour varier plus facilement vos repas au quotidien.",
    tags: ['rééquilibrage alimentaire', 'habitudes', 'alimentation variée'],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
