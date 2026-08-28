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
    slug: 'conservation-poulet-cuit',
    tags: ['poulet cuit', 'conservation', 'sécurité alimentaire'],
    title: 'Combien de temps se conserve le poulet cuit au frigo ?',
    metaDescription:
      'Combien de temps garder du poulet cuit au réfrigérateur en toute sécurité, et comment repérer s\'il ne faut plus le manger.',
    intro:
      "Le poulet cuit fait partie des restes les plus courants au frigo, mais aussi de ceux pour lesquels il vaut mieux respecter quelques règles simples de sécurité alimentaire.",
    sections: [
      {
        heading: 'Combien de temps le garder',
        body: [
          "En règle générale, un poulet cuit se conserve autour de 2 à 3 jours au réfrigérateur, dans une boîte hermétique ou bien filmé, à condition d'avoir été mis au frais rapidement après la cuisson (dans les 2 heures qui suivent, pas laissé toute une soirée sur le plan de travail).",
          "Ce délai est une indication générale, pas une règle absolue valable dans tous les cas : la température réelle de votre frigo et la façon dont le poulet a été manipulé jouent aussi un rôle.",
        ],
      },
      {
        heading: 'Et pour le congeler',
        body: [
          "Le poulet cuit se congèle très bien, idéalement en portions, ce qui permet de prolonger sa conservation de plusieurs semaines sans avoir à le consommer dans les jours qui suivent.",
          "Pensez à le refroidir complètement avant de le placer au congélateur, et à le décongeler au réfrigérateur plutôt qu'à température ambiante.",
        ],
      },
      {
        heading: 'Comment savoir s\'il ne faut plus le manger',
        body: [
          "Une odeur inhabituelle, une texture visqueuse ou une couleur qui a changé sont des signaux plus fiables qu'un simple compte de jours. En cas de doute, mieux vaut ne pas consommer le reste.",
          "Cette page donne des repères généraux : elle ne remplace pas votre bon sens ni les recommandations d'un professionnel de santé en cas de doute persistant.",
        ],
      },
    ],
    ctaTitle: 'Ne perdez plus la trace de vos restes',
    ctaText:
      'Yummeal vous aide à organiser votre frigo et à réutiliser vos restes de viande cuite dans une nouvelle recette avant qu\'ils ne traînent trop longtemps.',
  },
  {
    slug: 'manger-yaourt-perime-3-jours',
    tags: ['yaourt', 'date de péremption', 'sécurité alimentaire'],
    title: 'Peut-on manger un yaourt périmé depuis 3 jours ?',
    metaDescription:
      "Un yaourt dont la date est dépassée de 3 jours est-il encore consommable ? Ce qu'il faut savoir sur les dates de durabilité minimale.",
    intro:
      "La date inscrite sur un pot de yaourt prête souvent à confusion, alors qu'elle correspond en général à une date de durabilité minimale (DDM) et non à une limite stricte de sécurité.",
    sections: [
      {
        heading: 'Ce que signifie la date sur le pot',
        body: [
          "Contrairement à la viande fraîche, un produit fermenté comme le yaourt est généralement associé à une date de durabilité minimale (\"à consommer de préférence avant\"), qui indique une qualité optimale plutôt qu'un danger après cette date.",
          "En règle générale, un yaourt encore fermé et resté au frigo peut donc rester consommable plusieurs jours après cette date, sans qu'on puisse fixer un chiffre universel valable pour tous les produits et toutes les marques.",
        ],
      },
      {
        heading: 'Ce qui doit vous alerter',
        body: [
          "La présence de moisissure en surface, un liquide qui a beaucoup plus séparé que d'habitude, une odeur nettement acide ou anormale, ou un pot qui a été ouvert et laissé longtemps hors du frigo sont des signes qui doivent conduire à ne pas consommer le produit.",
          "Un yaourt entamé se comporte différemment d'un yaourt resté fermé : une fois ouvert, mieux vaut le consommer rapidement plutôt que de compter sur la même marge de tolérance.",
        ],
      },
      {
        heading: 'En cas de doute',
        body: [
          "Il n'existe pas de règle unique qui s'applique à tous les cas : fiez-vous d'abord à l'aspect, à l'odeur et à la texture du produit plutôt qu'à la seule date affichée, et jetez-le sans hésiter en cas de doute.",
          "Ces informations sont générales et ne remplacent pas un avis médical si vous avez des doutes sur votre état de santé après consommation d'un produit.",
        ],
      },
    ],
    ctaTitle: 'Gardez un œil sur les dates de votre frigo',
    ctaText:
      "Yummeal vous aide à repérer les produits à consommer en priorité et à les intégrer dans vos recettes avant qu'ils ne traînent trop longtemps.",
  },
  {
    slug: 'index-glycemique-pates-blanches',
    tags: ['pâtes', 'index glycémique', 'nutrition'],
    title: 'Index glycémique des pâtes blanches : ce qui influence vraiment le résultat',
    metaDescription:
      "L'index glycémique des pâtes blanches n'est pas fixe : la cuisson et l'accompagnement du plat le font varier. Explications générales, sans chiffre inventé.",
    intro:
      "L'index glycémique (IG) mesure la vitesse à laquelle un aliment fait augmenter la glycémie après un repas. Pour les pâtes blanches, ce chiffre n'est pas figé : plusieurs facteurs de préparation le font varier.",
    sections: [
      {
        heading: 'La cuisson change la donne',
        body: [
          "C'est un fait largement documenté en nutrition : des pâtes cuites al dente ont généralement un index glycémique plus bas que des pâtes très cuites, car l'amidon est moins transformé par la cuisson.",
          "Ce lien est établi dans les grandes lignes, mais l'ampleur exacte de la différence varie selon le type de pâtes et la méthode de mesure : nous évitons volontairement d'avancer un chiffre précis d'index glycémique, qui dépendrait de trop de paramètres pour être fiable ici.",
        ],
      },
      {
        heading: "Ce qui accompagne les pâtes compte aussi",
        body: [
          "L'index glycémique d'un plat complet dépend aussi de ce qui est associé aux pâtes : des fibres (légumes), des protéines ou des matières grasses ralentissent en général l'absorption des glucides par rapport à des pâtes consommées seules.",
          "Là encore, il s'agit d'une tendance générale reconnue en nutrition, pas d'une formule permettant de calculer un chiffre exact pour un plat donné.",
        ],
      },
      {
        heading: 'Une information générale, pas un conseil personnalisé',
        body: [
          "Ces éléments sont des repères nutritionnels généraux. Ils ne constituent pas un avis médical ou diététique personnalisé : si vous devez surveiller votre glycémie pour des raisons de santé, l'avis d'un professionnel de santé ou d'un diététicien reste la référence adaptée à votre situation.",
        ],
      },
    ],
    ctaTitle: 'Des recettes équilibrées, sans y penser',
    ctaText:
      'Yummeal vous propose des recettes qui associent féculents, légumes et protéines à partir de ce que vous avez déjà dans votre frigo.',
  },
  {
    slug: 'toxicite-pomme-de-terre-germee',
    tags: ['pomme de terre', 'germée', 'solanine', 'sécurité alimentaire'],
    title: 'Pomme de terre germée ou verte : quel est le vrai risque ?',
    metaDescription:
      "Une pomme de terre qui germe ou qui verdit contient plus de solanine. Voici les règles de sécurité alimentaire généralement admises pour l'utiliser sans risque.",
    intro:
      "Une pomme de terre qui germe ou dont la peau devient verte n'est pas automatiquement à jeter, mais elle demande un peu plus d'attention avant d'être cuisinée.",
    sections: [
      {
        heading: "D'où vient le risque",
        body: [
          "La germination et le verdissement sont deux réactions naturelles de la pomme de terre à la lumière et à la chaleur, qui s'accompagnent généralement d'une production plus importante de solanine, une substance que l'on cherche à limiter dans l'alimentation.",
          "La solanine se concentre surtout dans les germes, la peau verte et juste en dessous : ce n'est pas la pomme de terre entière qui en contient le plus, mais ces zones précises.",
        ],
      },
      {
        heading: 'Ce qui est généralement recommandé',
        body: [
          "En règle générale, il est recommandé de retirer les germes avant épluchage et d'éplucher largement toute zone verte plutôt que de la laisser, plutôt que de jeter systématiquement le légume entier.",
          "Une pomme de terre qui est devenue très molle, dont la peau est verte sur une grande partie, ou qui présente de nombreux et longs germes est en revanche plus prudemment écartée, la marge d'erreur devenant plus difficile à évaluer.",
          "Conserver les pommes de terre au sec, à l'abri de la lumière, ralentit ces deux phénomènes et limite le besoin d'y revenir souvent.",
        ],
      },
      {
        heading: 'Le bon sens avant tout',
        body: [
          "Ces règles sont des repères généralement admis, pas une garantie absolue pour chaque pomme de terre : en cas de doute important (goût amer prononcé après cuisson, aspect très dégradé), mieux vaut ne pas consommer le légume plutôt que de forcer la règle.",
          "Cette information est générale et ne remplace pas un avis médical en cas de symptôme après consommation.",
        ],
      },
    ],
    ctaTitle: 'Ne laissez plus vos légumes germer sans y penser',
    ctaText:
      'Yummeal vous rappelle ce qu\'il y a dans votre frigo et vous propose des recettes pour utiliser vos légumes avant qu\'ils ne s\'abîment.',
  },
  {
    slug: 'est-ce-que-le-bacon-se-congele',
    tags: ['bacon', 'congélation', 'conservation'],
    title: 'Est-ce que le bacon se congèle bien ?',
    metaDescription:
      'Le bacon se congèle très bien, à condition de respecter quelques règles simples de conservation. Durées indicatives et bon sens au moment de la décongélation.',
    intro:
      "Le bacon fait partie des charcuteries qui se congèlent le mieux, ce qui en fait une bonne option quand un paquet entamé ne sera pas fini avant la date indiquée.",
    sections: [
      {
        heading: 'Comment le congeler',
        body: [
          "Le bacon se congèle aussi bien cru que déjà cuit. Pour éviter que les tranches ne collent entre elles, il est généralement conseillé de les séparer avec du papier cuisson avant de les placer dans un contenant hermétique ou un sac de congélation.",
          "En règle générale, il se conserve plusieurs semaines au congélateur sans perte notable de qualité, même si le goût peut légèrement s'atténuer avec le temps, comme pour la plupart des produits congelés longtemps.",
        ],
      },
      {
        heading: 'Comment le décongeler',
        body: [
          "Il est généralement recommandé de le décongeler au réfrigérateur plutôt qu'à température ambiante, ce qui limite le temps passé à une température favorable au développement de bactéries.",
          "Une fois décongelé, il est préférable de le cuisiner rapidement plutôt que de le recongeler cru, une fois qu'il a été décongelé.",
        ],
      },
      {
        heading: 'Avant de le consommer',
        body: [
          "Comme pour toute charcuterie sortie du congélateur, fiez-vous à l'aspect et à l'odeur au moment de la cuisson plutôt qu'à un chiffre unique de durée de conservation : c'est le meilleur repère en cas de doute.",
        ],
      },
    ],
    ctaTitle: 'Ne laissez plus un fond de paquet se perdre',
    ctaText:
      "Yummeal vous aide à retrouver ce que vous avez déjà au congélateur et à le réintégrer facilement dans une prochaine recette.",
  },
  {
    slug: 'bienfaits-brocolis-vapeur',
    tags: ['brocoli', 'cuisson vapeur', 'nutrition'],
    title: 'Pourquoi cuire le brocoli à la vapeur plutôt qu\'à l\'eau ?',
    metaDescription:
      "La cuisson vapeur du brocoli est souvent recommandée pour préserver certains nutriments. Ce que dit la nutrition, sans chiffre inventé ni conseil médical personnalisé.",
    intro:
      "Le brocoli est un légume régulièrement cité pour ses qualités nutritionnelles, et la façon dont il est cuit influence en partie ce qu'il apporte dans l'assiette.",
    sections: [
      {
        heading: 'Vapeur ou eau bouillante : une différence connue',
        body: [
          "C'est un fait bien établi en nutrition : la cuisson à la vapeur limite le contact direct du légume avec l'eau, ce qui réduit la perte de certains nutriments sensibles à l'eau (comme la vitamine C ou certains composés hydrosolubles), comparée à une cuisson à l'eau bouillante où ces éléments se dissolvent en partie dans l'eau de cuisson.",
          "Nous n'avançons pas de pourcentage précis de nutriments préservés : ce chiffre varie beaucoup selon la durée de cuisson, la taille des morceaux et la fraîcheur du légume, et une valeur unique serait trompeuse.",
        ],
      },
      {
        heading: 'La durée de cuisson joue aussi un rôle',
        body: [
          "Plus la cuisson est longue, plus la perte de certains nutriments sensibles à la chaleur tend à augmenter, quel que soit le mode de cuisson choisi. Une cuisson vapeur courte, jusqu'à ce que le brocoli reste encore légèrement croquant, est généralement présentée comme un bon compromis entre texture et apport nutritionnel.",
        ],
      },
      {
        heading: 'Une information générale, pas un conseil de santé personnalisé',
        body: [
          "Ces éléments relèvent de repères nutritionnels généraux et non controversés. Ils ne constituent pas un avis médical ou diététique personnalisé, et ne visent aucun objectif de santé individuel (perte de poids, pathologie, etc.) : pour toute question qui vous concerne personnellement, l'avis d'un professionnel de santé reste la référence adaptée.",
        ],
      },
    ],
    ctaTitle: 'Cuisinez vos légumes sans y penser',
    ctaText:
      'Yummeal vous propose des recettes avec les légumes que vous avez déjà, en variant les modes de cuisson pour ne jamais vous lasser.',
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
