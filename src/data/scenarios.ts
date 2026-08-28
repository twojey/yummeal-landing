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
    slug: 'mamans-actives',
    title: 'Yummeal pour les mamans actives : reprendre la main sur les repas',
    metaDescription:
      "Entre le travail, les enfants et les courses, la question 'on mange quoi ce soir ?' revient chaque jour. Voici comment Yummeal allège cette charge mentale.",
    intro:
      "Il est 18h30, les enfants réclament le dîner, la journée de travail n'est pas vraiment finie dans votre tête, et la question revient, identique à hier : qu'est-ce qu'on mange ce soir ? Ce scénario, beaucoup de mamans actives le vivent presque tous les jours. Voici comment Yummeal a été pensé pour ce moment précis.",
    sections: [
      {
        heading: 'La charge mentale invisible des repas',
        body: [
          "Décider quoi cuisiner n'est jamais qu'une simple question de recette. C'est anticiper ce qu'il reste dans le frigo, se souvenir de ce qui a été mangé la veille, tenir compte des goûts (souvent différents) de chaque membre de la famille, et faire tout ça vite, parce que le temps entre la sortie du travail et le dîner est compté.",
          "Cette charge est rarement visible de l'extérieur, mais elle pèse, jour après jour, en particulier quand elle repose presque toujours sur la même personne dans le foyer.",
        ],
      },
      {
        heading: 'Partir de ce qu\'il y a déjà, pas d\'une liste de courses de plus',
        body: [
          "Yummeal ne demande pas de planifier des menus une semaine à l'avance ni d'ajouter une liste de courses supplémentaire à gérer. L'application part de ce qui est déjà dans votre frigo : les restes du week-end, les légumes qui commencent à ramollir, le fond de paquet de féculents.",
          "En scannant votre frigo, vous obtenez directement des idées de recettes réalisables avec ce que vous avez, sans devoir vous arrêter en rentrant pour acheter les trois ingrédients qui manquent à une recette trouvée ailleurs.",
        ],
      },
      {
        heading: 'Des recettes pensées pour le vrai quotidien',
        body: [
          "Les suggestions restent simples et rapides, pensées pour être réalisables même après une journée chargée, pas des recettes qui demandent une heure de préparation ou des techniques compliquées.",
          "Elles tiennent aussi compte des préférences ou contraintes de votre famille (un enfant qui ne mange pas de tel légume, un membre du foyer végétarien), pour éviter de devoir préparer deux repas différents chaque soir.",
        ],
      },
      {
        heading: 'Moins de gaspillage, moins de culpabilité',
        body: [
          "Beaucoup de mamans actives ressentent une forme de culpabilité à voir des aliments achetés avec de bonnes intentions finir à la poubelle faute de temps pour les cuisiner à temps. Utiliser en priorité ce qui est déjà là réduit ce gaspillage, sans effort de planification supplémentaire.",
          "L'objectif n'est pas d'ajouter une contrainte de plus à une journée déjà pleine, mais de retirer un point de friction précis : celui de ne pas savoir quoi faire avec ce qu'on a, au moment où on en a le moins l'énergie.",
        ],
      },
    ],
    ctaTitle: 'Reprenez la main sur vos repas du soir',
    ctaText:
      "Scannez votre frigo et laissez Yummeal vous proposer des recettes adaptées à votre famille, avec ce que vous avez déjà.",
    tags: ['mamans actives', 'charge mentale', 'famille', 'anti-gaspillage'],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
