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
    slug: 'manger-pour-2-euros-par-jour',
    title: 'Manger équilibré pour environ 2€ par jour, c\'est possible',
    metaDescription:
      "Manger pour environ 2€ par jour sans sacrifier l'équilibre alimentaire : les principes qui marchent, indépendamment des prix du moment.",
    intro:
      "Un budget très serré ne veut pas dire mal manger. En s'appuyant sur les bonnes familles d'aliments plutôt que sur des produits précis, il est possible de composer des repas complets, nourrissants et variés pour une somme modeste chaque jour.",
    sections: [
      {
        heading: 'Construire le repas autour d\'une base peu chère',
        body: [
          "Les féculents bruts (riz, pâtes, semoule, pommes de terre, légumineuses sèches) sont, kilo pour kilo, parmi les aliments les moins chers du marché et parmi les plus caloriques. Ils constituent la base la plus rentable d'un repas économique.",
          "L'astuce n'est pas de manger uniquement des féculents, mais de leur laisser occuper la moitié de l'assiette, et de réserver le budget restant à ce qui apporte du goût et des nutriments : légumes, une source de protéines, un assaisonnement.",
          "Cuisiner en grande quantité (un plat de lentilles, un curry de pois chiches, une soupe de légumes) coûte structurellement moins cher par portion que de cuisiner petit à petit, car les frais fixes (temps, énergie, base aromatique) se répartissent sur plus de repas.",
        ],
      },
      {
        heading: 'Choisir les bonnes protéines',
        body: [
          "Les œufs et les légumineuses (lentilles, pois chiches, haricots secs) sont, de façon stable dans le temps, parmi les sources de protéines les moins chères au kilo, loin devant la viande fraîche. Ce n'est pas une astuce ponctuelle : c'est une caractéristique structurelle de leur coût de production.",
          "Un œuf apporte une protéine complète pour un coût très faible, et se prépare en quelques minutes sans matériel particulier.",
          "Les légumineuses en conserve, légèrement plus chères que les mêmes légumineuses sèches, restent économiques et évitent le temps de trempage : un bon compromis quand le temps manque autant que l'argent.",
        ],
      },
      {
        heading: 'Ne pas négliger les légumes de saison',
        body: [
          "Un légume de saison est presque toujours moins cher qu'un légume hors saison, parce qu'il n'a pas besoin d'être cultivé sous serre chauffée ou transporté sur de longues distances. Ce principe reste vrai indépendamment du niveau général des prix.",
          "Les légumes surgelés nature (sans sauce ni ajout) sont une alternative fiable toute l'année : ils sont récoltés à pleine maturité et surgelés rapidement, ce qui limite le gaspillage et permet de ne cuisiner que la quantité nécessaire.",
          "Les légumes qui commencent à s'abîmer légèrement (voir nos guides anti-gaspi) se cuisinent tout aussi bien, souvent avec plus de goût, pour un coût proche de zéro puisqu'ils sont déjà achetés.",
        ],
      },
      {
        heading: 'Éviter les pièges qui font grimper la note',
        body: [
          "Les plats préparés, même simples, coûtent presque toujours plus cher au kilo qu'un plat équivalent cuisiné soi-même, car ils intègrent le coût de la transformation industrielle et de l'emballage.",
          "Acheter en trop petite quantité (portions individuelles, formats de dépannage) revient systématiquement plus cher au kilo que les formats familiaux ou en vrac, quand ils peuvent être consommés avant de s'abîmer.",
          "Le gaspillage est souvent le premier poste de perte d'un budget serré : mieux vaut acheter un peu moins et tout utiliser, plutôt que de racheter par prudence et jeter une partie.",
        ],
      },
    ],
    ctaTitle: 'Un frigo à petit budget, ça se gère encore mieux avec Yummeal',
    ctaText:
      "Yummeal identifie ce que vous avez déjà dans votre frigo et vous propose des recettes adaptées, pour ne jamais racheter ce que vous possédez déjà et limiter le gaspillage.",
  },
  {
    slug: 'liste-de-courses-optimisee-30-euros-semaine',
    title: 'Comment construire une liste de courses optimisée pour la semaine',
    metaDescription:
      "La méthode pour organiser une liste de courses hebdomadaire économique, basée sur des principes durables plutôt que sur des prix figés.",
    intro:
      "Plutôt que de viser un montant exact qui dépendra toujours du magasin et de la région, la vraie économie vient de la méthode : une liste construite intelligemment limite les achats inutiles et les doublons, ce qui a plus d'impact sur la facture finale que le choix d'un produit précis.",
    sections: [
      {
        heading: 'Partir du frigo et des placards, pas du rayon',
        body: [
          "La première étape d'une liste de courses économique se passe avant d'entrer dans le magasin : elle consiste à vérifier ce qui reste déjà à la maison. Une grande partie des achats redondants vient simplement d'avoir oublié ce qu'on possédait déjà.",
          "Noter les restes qui doivent être utilisés en priorité (un reste de légume, un fond de paquet) permet de bâtir les repas de la semaine autour d'eux, plutôt que d'acheter du neuf en les laissant s'abîmer.",
        ],
      },
      {
        heading: 'Planifier les repas avant la liste, pas l\'inverse',
        body: [
          "Une liste construite à partir de repas déjà décidés pour la semaine évite l'achat d'ingrédients qui ne serviront finalement à rien, l'un des principaux postes de gaspillage budgétaire.",
          "Réutiliser un même ingrédient de base dans plusieurs repas de la semaine (un légume, une source de protéines) permet d'acheter en quantité plus importante, souvent plus avantageuse au kilo, sans risque qu'il s'abîme avant d'être terminé.",
          "Prévoir un repas « libre » en fin de semaine, construit avec ce qu'il reste, absorbe naturellement les imprévus et les petites quantités qui autrement finiraient à la poubelle.",
        ],
      },
      {
        heading: 'Organiser la liste par rayon',
        body: [
          "Trier sa liste par rayon (féculents, légumes, produits frais, épicerie) avant d'aller faire les courses réduit le temps passé en magasin, et donc l'exposition aux achats d'impulsion qui ne sont jamais prévus et rarement nécessaires.",
          "Fixer un nombre de produits « plaisir » autorisés à l'avance (un seul, par exemple) permet de se faire plaisir sans laisser ce poste grossir de façon incontrôlée d'une semaine à l'autre.",
        ],
      },
      {
        heading: 'Comparer au bon niveau',
        body: [
          "Le prix au kilo ou au litre (souvent affiché en petit sur l'étiquette) est la seule comparaison fiable entre deux formats ou deux marques d'un même produit : le prix affiché en gros ne dit rien du rapport quantité/prix réel.",
          "Les marques de distributeur ou premiers prix sont, sur des produits bruts comme les féculents ou les conserves de légumineuses, très souvent équivalentes en qualité nutritionnelle aux marques plus chères, la différence de prix reflétant surtout le marketing.",
        ],
      },
    ],
    ctaTitle: 'Laissez Yummeal vous aider à planifier',
    ctaText:
      "Yummeal scanne votre frigo et vous propose des recettes adaptées à ce que vous avez déjà, pour construire une liste de courses qui complète vos placards au lieu de les dupliquer.",
  },
  {
    slug: 'proteines-moins-cheres-que-la-viande',
    title: 'Les protéines qui coûtent structurellement moins cher que la viande',
    metaDescription:
      "Légumineuses, œufs, tofu : pourquoi certaines sources de protéines restent durablement moins chères que la viande, indépendamment des prix du moment.",
    intro:
      "Le prix de la viande fraîche varie selon la saison, la région et le morceau, mais un principe reste stable dans le temps : élever un animal jusqu'à l'abattage coûte, en ressources et en temps, bien plus cher que cultiver une plante protéinée ou collecter un œuf. Ce n'est pas une question de prix ponctuel, mais de mode de production.",
    sections: [
      {
        heading: 'Pourquoi les légumineuses sont structurellement avantageuses',
        body: [
          "Une légumineuse (lentille, pois chiche, haricot sec) pousse directement à partir d'une graine, sans étape d'élevage animal intermédiaire. Chaque étape de transformation supplémentaire (nourrir un animal pendant des mois pour produire un kilo de viande) ajoute un coût qui se répercute sur le prix final.",
          "Les légumineuses sèches se conservent plusieurs années sans réfrigération, ce qui réduit les pertes et les coûts de stockage par rapport à une viande fraîche périssable en quelques jours.",
          "Elles peuvent être achetées en grand format, moins cher au kilo, sans le risque de gaspillage qui accompagne l'achat en grande quantité d'une viande fraîche.",
        ],
      },
      {
        heading: 'L\'œuf, une protéine complète et bon marché',
        body: [
          "Une poule pondeuse produit un œuf par jour pendant des mois avec une alimentation modeste, ce qui rend chaque œuf individuellement peu coûteux à produire comparé à l'élevage pour la viande, qui nécessite d'attendre la croissance complète de l'animal.",
          "L'œuf contient une protéine dite complète (tous les acides aminés essentiels), au même titre que la viande, ce qui en fait un substitut nutritionnel pertinent et pas seulement un dépannage.",
        ],
      },
      {
        heading: 'Le tofu et les protéines végétales transformées',
        body: [
          "Le tofu est fabriqué à partir du soja, une graine riche en protéines qui pousse rapidement et abondamment par hectare, ce qui rend son coût de production intrinsèquement plus bas que celui de la viande.",
          "Son prix peut sembler plus élevé en supermarché à cause d'une chaîne de distribution encore moins développée que celle de la viande dans certains pays : ce n'est pas un désavantage structurel, mais un effet de marché qui tend à se réduire.",
        ],
      },
      {
        heading: 'Comment les intégrer sans bouleverser ses habitudes',
        body: [
          "Remplacer la viande dans un seul repas par semaine par des légumineuses ou des œufs permet de réduire la facture protéines sans changement radical d'alimentation.",
          "Mélanger une petite quantité de viande avec des légumineuses dans un même plat (un chili, une bolognaise) conserve le goût familier de la viande tout en réduisant la quantité nécessaire, donc le coût du plat.",
        ],
      },
    ],
    ctaTitle: 'Découvrez des recettes qui varient vos sources de protéines',
    ctaText:
      "Yummeal vous propose des recettes adaptées à ce que vous avez au frigo, œufs et légumineuses compris, pour varier vos protéines sans y penser.",
  },
  {
    slug: 'comparatif-prix-vrac-vs-emballé',
    title: 'Vrac ou emballé : pourquoi le vrac reste généralement moins cher',
    metaDescription:
      "Pourquoi les produits en vrac sont, par principe, moins chers que leur équivalent emballé, sans avoir besoin de comparer des prix précis.",
    intro:
      "Comparer un prix en vrac à un prix emballé change constamment selon le magasin et la période, mais un principe économique sous-jacent reste vrai dans la durée : un produit emballé porte, en plus de sa matière première, le coût de son emballage, de son design et souvent de sa mise en avant marketing.",
    sections: [
      {
        heading: 'Ce que le prix d\'un produit emballé finance réellement',
        body: [
          "L'emballage individuel (sachet, boîte, film plastique) a un coût de fabrication qui s'ajoute à celui du produit, et qui est absent quand on achète le même aliment en vrac dans son propre contenant.",
          "Un produit emballé et marqué d'une marque reconnue finance aussi sa communication (publicité, packaging travaillé), un coût que le vrac, souvent vendu sans marque, n'a pas à supporter.",
          "Le conditionnement en petites portions individuelles (sachets de fruits secs, portions de féculents) ajoute un coût supplémentaire par kilo, comparé à un même produit acheté en grande quantité, vrac ou non.",
        ],
      },
      {
        heading: 'Où le vrac fait vraiment la différence',
        body: [
          "L'écart est généralement le plus net sur les produits secs à faible transformation : légumineuses, céréales, fruits secs, épices. Ce sont des produits pour lesquels l'emballage industriel représente une part importante du coût final.",
          "Sur un produit très transformé (un plat préparé, par exemple), l'écart entre vrac et emballé est moins pertinent, car le coût de transformation dépasse largement celui du simple emballage.",
        ],
      },
      {
        heading: 'Acheter juste la quantité nécessaire',
        body: [
          "Le vrac permet d'ajuster la quantité achetée au plus près du besoin réel, ce qui limite le gaspillage lié à un format fixe trop grand ou trop petit par rapport à l'usage prévu.",
          "Cette flexibilité est particulièrement utile pour tester un nouvel ingrédient (une épice, une céréale peu utilisée) sans s'engager sur un paquet entier qui risque de finir périmé au fond d'un placard.",
        ],
      },
      {
        heading: 'Les limites à connaître',
        body: [
          "Le vrac suppose d'apporter son propre contenant ou d'utiliser les sachets fournis en magasin, et une conservation à la maison parfois moins optimisée qu'un emballage industriel hermétique, en particulier pour les produits sensibles à l'humidité.",
          "Comparer systématiquement le prix au kilo (et non le prix affiché) reste le seul moyen fiable de vérifier que l'avantage du vrac s'applique bien au produit et au magasin concernés, les situations pouvant varier d'un point de vente à l'autre.",
        ],
      },
    ],
    ctaTitle: 'Cuisinez avec ce que vous avez, vrac ou pas',
    ctaText:
      "Que vos ingrédients viennent du vrac ou de l'épicerie classique, Yummeal les identifie dans votre frigo et vous propose des recettes adaptées, sans rien gaspiller.",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
