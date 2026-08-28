export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  ctaTitle: string;
  ctaText: string;
}

export const articles: Article[] = [
  {
    slug: 'peut-on-manger-riz-laisse-hors-du-frigo',
    title: 'Peut-on manger du riz laissé hors du frigo ?',
    metaDescription:
      'Du riz cuit oublié à température ambiante : dans quels cas il vaut mieux le jeter, et comment limiter le risque la prochaine fois.',
    intro:
      "Le riz cuit fait partie des aliments à surveiller de près une fois hors du frigo, car il est concerné par un risque bactérien bien documenté (Bacillus cereus). En règle générale, la prudence est de mise dès qu'il a passé plusieurs heures à température ambiante.",
    sections: [
      {
        heading: 'Pourquoi le riz cuit est particulièrement concerné',
        body: [
          "Le riz cru peut naturellement contenir des spores de la bactérie Bacillus cereus, qui résistent à la cuisson. Si le riz cuit refroidit lentement à température ambiante, ces spores peuvent germer et produire une toxine.",
          "C'est un phénomène connu et documenté par les autorités de sécurité alimentaire, propre au riz (et dans une moindre mesure aux pâtes et autres féculents cuits), pas une légende.",
        ],
      },
      {
        heading: 'La règle générale à retenir',
        body: [
          "Il est recommandé de ne pas laisser du riz cuit plus de 2 heures environ à température ambiante, et de le mettre au frigo rapidement une fois qu'il a un peu refroidi.",
          "Au-delà de ce délai, ou si le riz a passé une nuit entière hors du frigo, mieux vaut ne pas le consommer : la toxine produite par la bactérie n'est pas détruite par une nouvelle cuisson ou un réchauffage.",
          "Une fois correctement réfrigéré dans les temps, le riz se garde en général 1 à 2 jours au frigo et se réchauffe bien chaud avant consommation.",
        ],
      },
      {
        heading: 'En cas de doute',
        body: [
          "Si vous n'êtes pas sûr du temps exact passé hors du frigo, fiez-vous aussi à votre bon sens : une odeur inhabituelle, un aspect collant ou visqueux anormal sont des signaux à ne pas ignorer, même si l'aspect reste souvent normal en cas de contamination à ce type de bactérie.",
        ],
      },
    ],
    ctaTitle: 'Ne perdez plus la trace de vos restes',
    ctaText:
      "Yummeal vous aide à organiser votre frigo et à réutiliser vos restes avant qu'ils ne posent question.",
  },
  {
    slug: 'congelation-creme-fraiche-liquide',
    title: 'Peut-on congeler de la crème fraîche liquide ?',
    metaDescription:
      "La crème fraîche liquide supporte-t-elle la congélation ? Ce qui change en texture et comment bien l'utiliser après décongélation.",
    intro:
      "Il est possible de congeler de la crème fraîche liquide, mais avec une réserve importante : sa texture change en général après décongélation, ce qui la rend surtout adaptée à une utilisation cuite plutôt que crue.",
    sections: [
      {
        heading: 'Ce qui se passe pendant la congélation',
        body: [
          "La crème liquide contient une grande proportion d'eau et de matière grasse en émulsion. En règle générale, la congélation a tendance à déstabiliser cette émulsion : l'eau et la matière grasse se séparent partiellement.",
          "Au dégel, la crème peut donc paraître grumeleuse ou légèrement tranchée, même si elle reste consommable.",
        ],
      },
      {
        heading: 'Comment bien l\'utiliser après décongélation',
        body: [
          "Il est recommandé de réserver la crème décongelée à des préparations cuites (sauces, gratins, soupes) où le mixage ou la chaleur permettent de retrouver une texture homogène.",
          "Pour une utilisation crue (chantilly, sauce froide), la crème décongelée n'est en général pas satisfaisante, car elle monte mal et garde souvent un aspect granuleux.",
          "Décongelez-la de préférence au frigo, doucement, plutôt qu'à température ambiante, et mélangez ou fouettez-la avant de l'incorporer à votre plat.",
        ],
      },
      {
        heading: 'En cas de doute',
        body: [
          "Après décongélation, fiez-vous à l'odeur et à l'aspect avant utilisation : une odeur aigre ou un aspect anormal signalent qu'il vaut mieux ne pas la consommer, congelée ou non.",
        ],
      },
    ],
    ctaTitle: 'Cuisinez vos restes du frigo sans y penser',
    ctaText:
      "Yummeal vous propose des recettes adaptées à ce que vous avez déjà, y compris les fonds de pot à finir.",
  },
  {
    slug: 'duree-conservation-oeuf-dur',
    title: "Combien de temps se conserve un œuf dur ?",
    metaDescription:
      "Un œuf dur cuit se conserve-t-il longtemps au frigo ? Durée générale et conseils pour l'utiliser en toute confiance.",
    intro:
      "Un œuf dur cuit se conserve en général plus longtemps qu'un œuf cru, à condition de le garder au frigo. Il est recommandé de viser une consommation dans la semaine qui suit la cuisson, avec sa coquille si possible.",
    sections: [
      {
        heading: 'Pourquoi l\'œuf dur se garde plutôt bien',
        body: [
          "La cuisson stabilise le blanc et le jaune, ce qui limite le développement de bactéries par rapport à un œuf cru entamé.",
          "En règle générale, un œuf dur conservé au frigo, coquille intacte, reste bon environ une semaine.",
        ],
      },
      {
        heading: 'Comment bien le conserver',
        body: [
          "Il est recommandé de garder les œufs durs avec leur coquille jusqu'au moment de les consommer : une fois écalé, un œuf dur se dessèche et s'altère plus vite.",
          "S'il est déjà écalé, il vaut mieux le placer dans une boîte hermétique et le consommer dans les jours qui suivent plutôt que d'attendre une semaine complète.",
          "Évitez de laisser un œuf dur à température ambiante plusieurs heures, en particulier une fois écalé.",
        ],
      },
      {
        heading: 'En cas de doute',
        body: [
          "Avant de le consommer, fiez-vous aussi à l'odeur : un œuf dur qui sent le soufre de façon inhabituelle ou dont le blanc a une texture visqueuse ne doit pas être mangé, même s'il est resté au frigo.",
        ],
      },
    ],
    ctaTitle: "Une idée pour chaque reste de votre frigo",
    ctaText:
      "Yummeal identifie ce que vous avez sous la main, œufs durs compris, et vous propose une recette adaptée.",
  },
  {
    slug: 'reconnaitre-viande-perimee-odeur',
    title: 'Comment reconnaître une viande périmée à l\'odeur ?',
    metaDescription:
      "Quels signes olfactifs et visuels doivent alerter sur une viande qui a tourné ? Les repères généraux à connaître.",
    intro:
      "L'odeur est l'un des indicateurs les plus fiables pour repérer une viande qui n'est plus consommable, en complément de l'aspect. En règle générale, plusieurs signaux combinés doivent alerter plutôt qu'un seul indice isolé.",
    sections: [
      {
        heading: 'Les signes olfactifs à surveiller',
        body: [
          "Une odeur aigre, ammoniaquée ou clairement putride est un signal fort qu'il ne faut pas ignorer : elle indique une dégradation bactérienne avancée.",
          "Une viande fraîche a en général une odeur neutre ou légèrement métallique ; toute odeur forte et désagréable qui persiste après avoir passé la viande sous l'eau doit inciter à la prudence.",
        ],
      },
      {
        heading: 'Les autres signes à croiser',
        body: [
          "Une texture collante ou visqueuse au toucher, une couleur qui vire au gris-vert (au-delà du brunissement naturel dû à l'oxydation, qui lui reste normal), ou un emballage gonflé sont d'autres signaux à prendre en compte.",
          "Il est recommandé de croiser plusieurs indices plutôt que de se fier à un seul : une viande légèrement plus foncée mais sans odeur ni texture suspecte n'est pas nécessairement à jeter.",
        ],
      },
      {
        heading: 'En cas de doute',
        body: [
          "La règle de sécurité alimentaire la plus simple reste : dans le doute, on s'abstient. Si l'odeur, l'aspect ou la texture vous semblent anormaux, mieux vaut ne pas consommer la viande, même si la date indiquée n'est pas encore dépassée.",
        ],
      },
    ],
    ctaTitle: 'Ne laissez plus vos restes de viande finir à la poubelle',
    ctaText:
      "Yummeal vous aide à repérer ce qu'il y a dans votre frigo et à le cuisiner à temps.",
  },
  {
    slug: 'peut-on-recuire-un-plat-deja-cuit',
    title: "Peut-on recuire un plat déjà cuit ?",
    metaDescription:
      "Réchauffer ou recuire un reste : ce qu'il est recommandé de faire pour manger un plat déjà cuit en toute sécurité.",
    intro:
      "Il est tout à fait possible, et même recommandé dans certains cas, de recuire ou de bien réchauffer un plat déjà cuit. En règle générale, l'essentiel est d'atteindre une température suffisante à cœur pour neutraliser d'éventuelles bactéries apparues pendant la conservation.",
    sections: [
      {
        heading: 'Pourquoi recuire un reste est plutôt une bonne pratique',
        body: [
          "Un plat conservé au frigo peut développer un peu de flore bactérienne au fil du temps, même sans être avarié. Un réchauffage complet, bien chaud à cœur, réduit ce risque pour la plupart des plats.",
          "C'est en général la façon la plus sûre de consommer un reste, plutôt que de le manger froid ou tiède.",
        ],
      },
      {
        heading: 'Comment bien procéder',
        body: [
          "Il est recommandé de réchauffer le plat jusqu'à ce qu'il soit bien chaud dans toute son épaisseur, pas seulement en surface, notamment pour les plats en sauce ou les féculents comme le riz.",
          "Évitez de multiplier les cycles refroidissement/réchauffage sur un même plat : chaque cycle laisse une fenêtre pendant laquelle des bactéries peuvent se développer si le plat n'est pas remis au frigo rapidement.",
          "Un plat déjà réchauffé une fois peut généralement être recuit une seconde fois s'il a été bien reconservé au frigo entre-temps, mais il vaut mieux ne pas prolonger ce cycle indéfiniment.",
        ],
      },
      {
        heading: 'En cas de doute',
        body: [
          "Avant de recuire un plat, vérifiez son odeur et son aspect : si quelque chose semble anormal, la cuisson ne suffit pas toujours à rendre un plat sûr, mieux vaut alors ne pas le consommer.",
        ],
      },
    ],
    ctaTitle: 'Vos restes méritent une seconde vie',
    ctaText:
      "Yummeal vous propose des idées de recettes pour transformer vos plats déjà cuits plutôt que de les jeter.",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
