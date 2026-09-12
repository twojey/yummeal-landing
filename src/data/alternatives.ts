/**
 * Silo `/alternatives` — pages de comparaison cadrées sur la demande réelle.
 *
 * Pourquoi ce fichier remplace `comparatif.ts`. L'ancien silo comptait 23
 * pages profondes dont 22 intitulées « Yummeal vs X » : un mot-clé qui
 * contient le nom de notre marque, alors qu'elle n'a pas de notoriété de
 * recherche. Personne ne tape « yummeal vs supercook ». La demande se formule
 * sans nous — « alternative à Jow », « supercook alternative », « meilleure
 * application recettes frigo » — et c'est ce que ces pages ciblent.
 *
 * Trois règles tenues ici, et à tenir pour toute page ajoutée :
 *
 * 1. UN VRAI TABLEAU. L'ancien silo n'en avait aucun sur 164 pages. Un
 *    comparatif sans tableau de critères n'est extractible ni par un lecteur
 *    pressé ni par un moteur.
 *
 * 2. DES FAITS DATÉS ET SOURCÉS. Chaque ligne porte sa source et sa date de
 *    vérification. Un tarif ou un mécanisme change ; une affirmation non datée
 *    devient fausse sans prévenir.
 *
 * 3. L'HONNÊTETÉ COMME CONDITION DE SURVIE. Chaque page dit explicitement
 *    QUAND une autre application est le meilleur choix. Ce n'est pas de la
 *    modestie : une expérience contrôlée montre que dans 43 % des réponses
 *    citant une page auto-promotionnelle, le moteur ne mentionne même pas la
 *    marque et recommande un concurrent. Une page qui conclut toujours en sa
 *    faveur ne se fait pas citer, elle se fait ignorer.
 *
 * ⚠️ Ne jamais écrire que les recettes Yummeal sont générées par IA — elles
 * ne le sont pas. Et « gratuit » reste scopé au téléchargement.
 */

export const DATE_VERIFICATION = '12 septembre 2026';

/** Comment l'application sait ce que vous avez. C'est l'axe qui sépare vraiment ce marché. */
export type Mecanisme =
  | 'Photo du frigo'
  | 'Saisie manuelle'
  | 'Inventaire déclaratif'
  | 'Ticket de caisse'
  | 'Aucun (catalogue)'
  | 'Photo du plat';

export interface AppComparee {
  nom: string;
  editeur: string;
  mecanisme: Mecanisme;
  modele: string;
  /** Ce que l'app fait de mieux que les autres. Toujours renseigné. */
  force: string;
  /** D'où viennent les faits de cette ligne. */
  source: string;
  /** true pour Yummeal, afin de la signaler sans la mettre en tête. */
  estYummeal?: boolean;
}

export interface PageAlternatives {
  slug: string;
  /** Title SEO — le suffixe de marque est ajouté par le prerender s'il tient. */
  title: string;
  metaDescription: string
  ;
  h1: string;
  /** Le mot-clé visé, pour mémoire. Ne s'affiche pas. */
  requeteCible: string;
  intro: string;
  /** Le tableau comparatif. Yummeal n'est jamais en première ligne. */
  apps: AppComparee[];
  /** Sections de prose après le tableau. */
  sections: { heading: string; body: string[] }[];
  /** Quand une autre app est le meilleur choix. Obligatoire. */
  quandChoisirAutre: { app: string; raison: string }[];
  ctaTitle: string;
  ctaText: string;
  tags: string[];
}

// ---------------------------------------------------------------------------
// Lignes réutilisées d'une page à l'autre. Un seul endroit à corriger quand un
// tarif ou un mécanisme change.
// ---------------------------------------------------------------------------

const YUMMEAL: AppComparee = {
  nom: 'Yummeal',
  editeur: 'YIDLA (France)',
  mecanisme: 'Photo du frigo',
  modele: 'Téléchargement gratuit, abonnement de 4,99 €/mois à 39,99 €/an',
  force:
    "Ne propose que les recettes réalisables avec ce qui est là, et indique combien d'ingrédients manquent quand il en manque",
  source: 'App Store, fiche éditeur',
  estYummeal: true,
};

const SUPERCOOK: AppComparee = {
  nom: 'SuperCook',
  editeur: 'AMR Systems LLC',
  mecanisme: 'Saisie manuelle',
  modele: 'Gratuit, financé par la publicité',
  force: 'Le plus grand volume de combinaisons d’ingrédients, et sans abonnement',
  source: 'App Store',
};

const FRIGO_MAGIC: AppComparee = {
  nom: 'Frigo Magic',
  editeur: 'Frigo Magic (France)',
  mecanisme: 'Inventaire déclaratif',
  modele: 'Gratuit, sans compte obligatoire',
  force: 'Utilisable immédiatement, sans inscription, et ancré en France depuis 2015',
  source: 'App Store',
};

const MON_FRIGO: AppComparee = {
  nom: 'Mon Frigo',
  editeur: 'Non indiqué sur le site',
  mecanisme: 'Saisie manuelle',
  modele:
    'Cœur gratuit annoncé « et le reste » ; scan photo et assistant réservés aux formules payantes, tarif non publié',
  force: 'Alertes de péremption et planning hebdomadaire dans la partie gratuite',
  source: 'monfrigo.app',
};

const CRUMB: AppComparee = {
  nom: 'Crumb',
  editeur: 'Rodger Studio',
  mecanisme: 'Photo du frigo',
  modele: 'Abonnement de 3,99 €/semaine, 6,99 €/mois ou 39,99 €/an',
  force: 'Saisie vocale des ingrédients en plus de la photo et du texte',
  source: 'App Store, 4,6/5 sur 45 notes',
};

const SAMSUNG_FOOD: AppComparee = {
  nom: 'Samsung Food',
  editeur: 'Samsung (ex-Whisk)',
  mecanisme: 'Photo du frigo',
  modele: 'Gratuit, abonnement Food+ à 6,99 $/mois ou 59,99 $/an',
  force:
    'Plus de 240 000 recettes et intégration aux réfrigérateurs connectés Family Hub',
  source: 'App Store',
};

const JOW: AppComparee = {
  nom: 'Jow',
  editeur: 'JOW SAS (France)',
  mecanisme: 'Aucun (catalogue)',
  modele: 'Gratuit au téléchargement, premium optionnel',
  force: 'Transforme un menu en commande drive ou livraison chez un partenaire',
  source: 'App Store',
};

const MARMITON: AppComparee = {
  nom: 'Marmiton',
  editeur: 'auFeminin',
  mecanisme: 'Saisie manuelle',
  modele: 'Gratuit, aucun abonnement identifié sur sa fiche',
  force: 'Plus de 75 000 recettes et les avis de la plus grosse communauté française',
  source: 'App Store',
};

// ---------------------------------------------------------------------------

export const pagesAlternatives: PageAlternatives[] = [
  {
    slug: 'jow',
    requeteCible: 'alternative à jow',
    title: 'Alternatives à Jow : 5 applications comparées',
    metaDescription:
      "Jow part d'un menu à acheter. Les alternatives qui partent de ce que vous avez déjà, ou qui planifient autrement : mécanisme, tarif, source, comparés.",
    h1: 'Alternatives à Jow',
    intro:
      "Jow fait une chose très bien : transformer un menu en courses livrées. Si vous le quittez, c'est en général pour l'une de deux raisons — vous ne voulez plus acheter avant de cuisiner, ou vous voulez planifier sans passer par un partenaire de livraison. Ces deux besoins ne mènent pas à la même application.",
    apps: [JOW, MARMITON, FRIGO_MAGIC, SUPERCOOK, YUMMEAL],
    sections: [
      {
        heading: 'Pourquoi on cherche une alternative à Jow',
        body: [
          "Jow construit un menu à partir de zéro, puis vous aide à l'acheter. C'est optimal quand on fait ses courses pour la semaine, et frustrant quand le frigo est déjà plein de choses à écouler : l'application ne sait pas ce que vous avez.",
          "L'autre motif de départ est l'ancrage dans l'achat. Jow est gratuit parce que le modèle passe par les enseignes partenaires : si vous voulez juste des idées de repas sans commande, une partie de la valeur de l'app ne vous sert pas.",
        ],
      },
      {
        heading: 'Les deux familles d’alternatives',
        body: [
          "Si votre problème est « j'ai déjà des ingrédients » : Frigo Magic, SuperCook et Yummeal partent de l'existant. Frigo Magic et SuperCook vous demandent de déclarer ce que vous avez ; Yummeal le lit sur une photo.",
          "Si votre problème est « je veux planifier sans acheter chez un partenaire » : Marmiton reste la référence française en volume de recettes, avec un planificateur et un carnet, sans dépendance à une enseigne.",
        ],
      },
    ],
    quandChoisirAutre: [
      {
        app: 'Jow',
        raison:
          "si vous faites vos courses en drive ou en livraison, personne ne fait le lien menu → panier aussi bien. Changer d'app vous ferait perdre cette intégration.",
      },
      {
        app: 'Marmiton',
        raison:
          "si vous cherchez une recette précise par son nom et que vous voulez des avis de cuisiniers, le volume et la communauté comptent plus que le mécanisme d'inventaire.",
      },
    ],
    ctaTitle: 'Partir de ce que vous avez, plutôt que de la liste de courses',
    ctaText:
      "Yummeal photographie votre frigo et ne propose que les recettes réellement réalisables, en indiquant les ingrédients manquants s'il en manque.",
    tags: ['jow', 'alternative', 'planification de repas', 'liste de courses'],
  },

  {
    slug: 'supercook',
    requeteCible: 'supercook alternative',
    title: 'Alternatives à SuperCook : 5 applications comparées',
    metaDescription:
      'SuperCook est gratuit mais demande de cocher chaque ingrédient. Les alternatives qui automatisent cette étape : mécanisme, tarif, source, comparés.',
    h1: 'Alternatives à SuperCook',
    intro:
      "SuperCook a un argument difficile à battre : c'est gratuit, et la base de combinaisons d'ingrédients est énorme. Le prix à payer est la saisie — il faut cocher son garde-manger, puis le tenir à jour. C'est là que les alternatives se différencient.",
    apps: [SUPERCOOK, FRIGO_MAGIC, MON_FRIGO, CRUMB, YUMMEAL],
    sections: [
      {
        heading: 'Ce que SuperCook fait mieux que les autres',
        body: [
          "Autant le dire : sur le rapport entre le nombre de recettes trouvables et le prix, SuperCook est difficile à concurrencer. Gratuit, financé par la publicité, sans abonnement, avec un moteur de combinaisons très large.",
          "Si votre seul reproche est l'interface ou la publicité, changer d'application vous coûtera probablement un abonnement pour un gain fonctionnel limité.",
        ],
      },
      {
        heading: 'Le vrai motif de départ : la saisie',
        body: [
          "Le modèle de SuperCook suppose que vous déclarez votre garde-manger et que vous le maintenez. En pratique, la liste se périme : on oublie d'y retirer ce qu'on a consommé, et les suggestions se décalent du réel.",
          "Les alternatives attaquent cette étape de trois façons. Frigo Magic et Mon Frigo gardent la saisie mais la rendent plus rapide, avec des alertes de péremption. Crumb ajoute la dictée vocale et la photo. Yummeal supprime la déclaration : une photo du frigo, une liste corrigeable, et des recettes filtrées sur ce qui est là.",
        ],
      },
      {
        heading: 'Une différence de nature sur les recettes',
        body: [
          "Un point factuel qui sépare ces applications plus que leur interface : la provenance des recettes. La fiche App Store de Crumb annonce une « génération de recettes personnalisées » « alimentée par l'IA », avec la possibilité de réessayer pour en obtenir d'autres.",
          "SuperCook, Frigo Magic et Yummeal fonctionnent à l'inverse, sur un catalogue de recettes écrites par des humains, que l'application trie et filtre. Ce n'est pas un jugement de valeur — c'est un choix de confiance qui vous appartient, et il n'apparaît pas dans les captures d'écran.",
        ],
      },
    ],
    quandChoisirAutre: [
      {
        app: 'SuperCook',
        raison:
          "si vous avez le temps de tenir votre garde-manger à jour et que vous ne voulez payer aucun abonnement, c'est le meilleur choix du marché. Rien ne le remplace à ce prix.",
      },
      {
        app: 'Mon Frigo',
        raison:
          "si les dates de péremption sont votre problème principal, ses alertes sont dans la partie gratuite annoncée comme durable.",
      },
    ],
    ctaTitle: 'Supprimer l’étape de saisie',
    ctaText:
      "Yummeal lit votre frigo sur une photo. Vous corrigez la liste en deux secondes, et vous voyez les recettes faisables tout de suite.",
    tags: ['supercook', 'alternative', 'recettes par ingrédients'],
  },

  {
    slug: 'frigo-magic',
    requeteCible: 'alternative à frigo magic',
    title: 'Alternatives à Frigo Magic : 5 applications comparées',
    metaDescription:
      'Frigo Magic est gratuit et sans compte, mais tout se déclare à la main. Les alternatives, leur mécanisme et leur tarif, comparés et sourcés.',
    h1: 'Alternatives à Frigo Magic',
    intro:
      "Frigo Magic est l'application française de référence sur « cuisiner avec ce qu'on a » : gratuite, utilisable sans créer de compte, et sur le marché depuis longtemps. On la quitte rarement pour un défaut — plutôt pour un besoin qu'elle n'adresse pas.",
    apps: [FRIGO_MAGIC, MON_FRIGO, SUPERCOOK, SAMSUNG_FOOD, YUMMEAL],
    sections: [
      {
        heading: 'Ce que Frigo Magic fait très bien',
        body: [
          "Aucune inscription, aucun abonnement, et un parcours conçu autour d'un frigo réel plutôt que d'un catalogue. Pour un usage occasionnel, c'est le chemin le plus court entre « j'ai trois trucs » et « je cuisine ».",
          "Son ancrage français compte aussi : les ingrédients, les unités et les plats correspondent à ce qu'on trouve réellement dans une cuisine en France.",
        ],
      },
      {
        heading: 'Les trois besoins qui font chercher ailleurs',
        body: [
          "La saisie. Frigo Magic vous demande de déclarer vos ingrédients. Si vous cuisinez tous les jours, cette étape revient tous les jours. Yummeal et Crumb la remplacent par une photo ; Samsung Food propose la photo à ses abonnés payants.",
          "Le suivi des dates. Si votre problème est moins « quoi cuisiner » que « qu'est-ce qui va périmer », Mon Frigo place les alertes de péremption dans sa partie gratuite.",
          "La récupération de recettes vues ailleurs. Si vous enregistrez des recettes sur TikTok ou Instagram sans jamais les refaire, c'est une fonction d'import qu'il faut chercher, pas un meilleur moteur d'ingrédients.",
        ],
      },
    ],
    quandChoisirAutre: [
      {
        app: 'Frigo Magic',
        raison:
          "si vous voulez zéro compte, zéro abonnement et un usage ponctuel, restez-y. Les alternatives ne vous apporteront rien que vous utiliserez.",
      },
      {
        app: 'Samsung Food',
        raison:
          "si vous avez un réfrigérateur Family Hub, l'intégration à l'écosystème Samsung n'existe nulle part ailleurs.",
      },
    ],
    ctaTitle: 'La même idée, sans la saisie',
    ctaText:
      "Yummeal part aussi de votre frigo réel — mais il le lit sur une photo au lieu de vous demander de le décrire.",
    tags: ['frigo magic', 'alternative', 'anti-gaspillage', 'application française'],
  },

  {
    slug: 'marmiton',
    requeteCible: 'alternative à marmiton',
    title: 'Alternatives à Marmiton : 5 applications comparées',
    metaDescription:
      "Marmiton est un catalogue avec recherche par ingrédients saisis. Les alternatives qui partent de votre frigo réel : mécanisme, tarif, source.",
    h1: 'Alternatives à Marmiton',
    intro:
      "Marmiton est un moteur de recherche de recettes, avec plus de 75 000 entrées et la plus grosse communauté d'avis en France. Chercher une alternative n'a de sens que si votre besoin n'est pas « trouver une recette » mais « savoir quoi faire de ce que j'ai ».",
    apps: [MARMITON, SUPERCOOK, FRIGO_MAGIC, JOW, YUMMEAL],
    sections: [
      {
        heading: 'Ce que Marmiton fait mieux que tout le monde',
        body: [
          "Le volume et les avis. Quand vous cherchez une recette précise par son nom, ou que vous voulez savoir si un plat fonctionne avant de vous lancer, aucune application de gestion de frigo ne rivalise avec des milliers de commentaires de cuisiniers.",
          "Le filtre par ingrédients existe d'ailleurs chez Marmiton. Sa limite est qu'il est déclaratif : vous tapez ce que vous avez, ingrédient par ingrédient, et le moteur cherche dans le catalogue.",
        ],
      },
      {
        heading: 'Quand un catalogue ne suffit plus',
        body: [
          "Un catalogue répond à « comment faire un bœuf bourguignon ». Il répond mal à « il me reste une courgette, un fond de crème et des pâtes, et je n'ai pas envie de sortir ». La différence n'est pas le nombre de recettes, c'est le point de départ.",
          "SuperCook et Frigo Magic partent de vos ingrédients déclarés. Yummeal part d'une photo de votre frigo et ne montre que le réalisable, avec le compte des ingrédients manquants. Jow, à l'inverse, part d'un menu à acheter — c'est l'opposé du besoin anti-gaspi.",
        ],
      },
    ],
    quandChoisirAutre: [
      {
        app: 'Marmiton',
        raison:
          "si vous cuisinez en cherchant des recettes par leur nom, gardez-le. Son volume et ses avis sont son produit, et c'est irremplaçable.",
      },
      {
        app: 'Jow',
        raison:
          "si vous voulez surtout arrêter de réfléchir à vos courses, le lien menu → panier est un service que ni Marmiton ni les apps de frigo ne rendent.",
      },
    ],
    ctaTitle: 'Quand le point de départ est le frigo, pas la recette',
    ctaText:
      "Yummeal inverse la recherche : au lieu de chercher une recette puis les ingrédients, il lit vos ingrédients et ne propose que le faisable.",
    tags: ['marmiton', 'alternative', 'catalogue de recettes'],
  },

  {
    slug: 'applications-scan-frigo',
    requeteCible: 'application qui scanne le frigo en photo',
    title: 'Applications qui scannent le frigo en photo, comparées',
    metaDescription:
      'Quatre applications reconnaissent les ingrédients sur une photo du frigo. Ce qui les sépare vraiment : recettes écrites ou générées, et prix.',
    h1: 'Les applications qui scannent le frigo en photo',
    intro:
      "Photographier son frigo pour obtenir des recettes n'est plus une exclusivité. Quatre applications le proposent, avec des différences qui ne tiennent pas à la qualité de la reconnaissance — sur laquelle aucun éditeur, nous compris, ne publie de chiffre vérifiable — mais à deux choses : la place du scan dans le produit, et la provenance des recettes.",
    apps: [SAMSUNG_FOOD, CRUMB, MON_FRIGO, YUMMEAL],
    sections: [
      {
        heading: 'Différence 1 : le scan est-il le produit ou une option ?',
        body: [
          "Chez Samsung Food, la reconnaissance photo est réservée aux abonnés Food+ et vient compléter un catalogue de plus de 240 000 recettes : c'est une fonctionnalité ajoutée à un gestionnaire de recettes.",
          "Chez Mon Frigo, le site annonce explicitement que le scan photo fait partie des « formules payantes », le cœur gratuit reposant sur la saisie manuelle.",
          "Chez Crumb et chez Yummeal, le scan est le point d'entrée du produit. La conséquence pratique : le reste de l'application est conçu autour de cette liste d'ingrédients plutôt que greffé dessus.",
        ],
      },
      {
        heading: 'Différence 2 : les recettes sont-elles écrites ou générées ?',
        body: [
          "C'est le point le plus important et le moins visible. La fiche App Store de Crumb décrit une « génération de recettes personnalisées » « alimentée par l'IA », avec un bouton pour réessayer et obtenir d'autres propositions.",
          "Yummeal fonctionne à l'inverse : les recettes sont écrites par des humains, importées ou rédigées, et l'application les trie et les filtre selon ce que vous avez. Elle n'en invente aucune.",
          "Aucune des deux approches n'est supérieure dans l'absolu. Une génération produit toujours une proposition, même pour une combinaison improbable ; un catalogue filtré peut ne rien renvoyer, mais ce qu'il renvoie a été cuisiné par quelqu'un. C'est un arbitrage entre couverture et fiabilité, et il vous appartient.",
        ],
      },
      {
        heading: 'Ce qu’aucun éditeur ne publie',
        body: [
          "Personne — Samsung, Crumb, Mon Frigo, ni nous — ne publie de taux de reconnaissance mesuré. Méfiez-vous de toute page qui en annonce un : à notre connaissance, il n'existe aucune source publique pour le vérifier.",
          "Ce qui est vérifiable, en revanche, c'est ce que fait l'application quand elle se trompe. Toutes laissent corriger la liste détectée. C'est le vrai critère : une reconnaissance imparfaite avec une correction facile bat une reconnaissance opaque.",
        ],
      },
    ],
    quandChoisirAutre: [
      {
        app: 'Samsung Food',
        raison:
          "si vous possédez un réfrigérateur Family Hub, ou si vous voulez surtout un très gros catalogue de recettes avec le scan en bonus.",
      },
      {
        app: 'Crumb',
        raison:
          "si vous voulez une proposition dans tous les cas, y compris pour des combinaisons que personne n'a jamais cuisinées, et que la dictée vocale vous parle.",
      },
      {
        app: 'Mon Frigo',
        raison:
          "si vous acceptez la saisie manuelle et que les alertes de péremption gratuites vous suffisent.",
      },
    ],
    ctaTitle: 'Voir ce que donne le scan sur votre frigo',
    ctaText:
      "Une photo, une liste corrigeable, et uniquement les recettes réalisables — avec le nombre d'ingrédients manquants quand il en manque.",
    tags: ['scan frigo', 'photo', 'comparatif', 'reconnaissance ingrédients'],
  },

  {
    slug: 'suivi-calories-photo',
    requeteCible: 'application qui compte les calories avec une photo',
    title: 'Compter les calories avec une photo : 4 apps comparées',
    metaDescription:
      "Yazio, Lifesum, Foodvisor et Yummeal traitent la photo d'un repas différemment. Ce que chacune mesure réellement, et ce qu'aucune ne mesure.",
    h1: 'Compter les calories avec une photo',
    intro:
      "Quatre applications proposent d'estimer un repas à partir d'une photo. Elles ne font pourtant pas la même chose : trois partent du plat déjà préparé, la quatrième part des ingrédients que vous avez cuisinés. La différence change ce que le chiffre vaut.",
    apps: [
      {
        nom: 'Foodvisor',
        editeur: 'Foodvisor',
        mecanisme: 'Photo du plat',
        modele: 'Gratuit avec abonnement premium',
        force: 'La reconnaissance du plat est le cœur du produit, pas une option',
        source: 'App Store',
      },
      {
        nom: 'Yazio',
        editeur: 'YAZIO GmbH',
        mecanisme: 'Photo du plat',
        modele: 'Gratuit avec abonnement premium',
        force: 'Journal alimentaire complet, code-barres, et base nutritionnelle très large',
        source: 'App Store',
      },
      {
        nom: 'Lifesum',
        editeur: 'Lifesum AB',
        mecanisme: 'Photo du plat',
        modele: 'Gratuit avec abonnement premium',
        force: 'Programmes et suivi d’objectifs sur la durée',
        source: 'App Store',
      },
      {
        ...YUMMEAL,
        mecanisme: 'Photo du plat',
        force:
          'Calcule la nutrition depuis les ingrédients réels quand vous cuisinez une de ses recettes, sans saisie séparée',
      },
    ],
    sections: [
      {
        heading: 'Ce qu’une photo de plat peut et ne peut pas dire',
        body: [
          "Une photo ne montre ni la matière grasse de cuisson, ni ce qui est caché sous la surface, ni le poids réel des portions. L'écart avec la réalité peut être important, dans un sens comme dans l'autre — c'est vrai pour les quatre applications.",
          "Aucune de ces estimations ne remplace un avis médical ou diététique, et aucune n'est une mesure. Ce sont des ordres de grandeur, utiles pour suivre une tendance, pas pour piloter un régime au gramme.",
        ],
      },
      {
        heading: 'La différence de point de départ',
        body: [
          "Foodvisor, Yazio et Lifesum sont conçues autour du suivi : vous mangez, vous déclarez, l'application agrège. La photo y est un raccourci de saisie.",
          "Yummeal n'est pas une application de suivi calorique. Quand vous cuisinez une de ses recettes, la nutrition est calculée depuis les ingrédients réels — donc sans estimation visuelle du tout, ce qui est mécaniquement plus fiable qu'une photo. La photo de plat n'y sert que pour ce que vous n'avez pas cuisiné vous-même.",
        ],
      },
    ],
    quandChoisirAutre: [
      {
        app: 'Yazio ou Lifesum',
        raison:
          "si votre objectif est un suivi calorique quotidien et structuré, avec un journal, des objectifs et un historique. C'est leur métier, pas le nôtre.",
      },
      {
        app: 'Foodvisor',
        raison:
          "si vous mangez surtout à l'extérieur ou des plats que vous ne préparez pas : la reconnaissance du plat est son cœur de produit.",
      },
    ],
    ctaTitle: 'Quand vous cuisinez, il n’y a rien à estimer',
    ctaText:
      "Pour une recette faite dans l'application, la nutrition vient des ingrédients réels. La photo ne sert que pour le reste.",
    tags: ['calories', 'photo de plat', 'comparatif', 'suivi nutritionnel'],
  },
];

export function getPageAlternatives(slug: string): PageAlternatives | undefined {
  return pagesAlternatives.find((p) => p.slug === slug);
}

/**
 * Redirections des anciennes URL `/comparatif/*` vers la page `/alternatives/*`
 * qui traite le même sujet.
 *
 * Les 23 pages de l'ancien silo sont remplacées par 6 pages non-marque. Rien
 * n'est perdu : chaque ancienne URL a une cible, et le fichier `netlify.toml`
 * porte les 301 correspondantes. Deux cas notables :
 *  - `yummeal-vs-olio` et `yummeal-vs-toogoodtogo` renvoient vers l'index : ce
 *    ne sont pas des concurrents fonctionnels (la page Olio l'admettait
 *    elle-même en titre de section), donc aucune page de comparaison ne leur
 *    correspond ;
 *  - `meilleure-app-cuisine-frigo` renvoie vers l'index, qui reprend sa thèse
 *    — segmenter le marché par mécanisme plutôt que par liste de
 *    fonctionnalités.
 */
export const REDIRECTIONS_COMPARATIF: Record<string, string> = {
  'yummeal-vs-jow': 'jow',
  'yummeal-vs-jow-vs-marmiton': 'jow',
  'yummeal-vs-mealime': 'jow',
  'yummeal-vs-eat-this-much': 'jow',
  'yummeal-vs-sidechef': 'jow',

  'yummeal-vs-marmiton': 'marmiton',
  'yummeal-vs-yummly': 'marmiton',
  'yummeal-vs-paprika-3': 'marmiton',
  'yummeal-vs-recipe-keeper': 'marmiton',
  'yummeal-vs-bigoven': 'marmiton',

  'yummeal-vs-supercook': 'supercook',
  'yummeal-vs-myfridgefood': 'supercook',
  'yummeal-vs-plantjammer': 'supercook',

  'yummeal-vs-frigo-magic': 'frigo-magic',
  'yummeal-vs-kitchenpal': 'frigo-magic',
  'yummeal-vs-cooklist': 'frigo-magic',

  'yummeal-vs-samsung-food': 'applications-scan-frigo',

  'yummeal-vs-yazio': 'suivi-calories-photo',
  'yummeal-vs-lifesum': 'suivi-calories-photo',
  'yummeal-vs-foodvisor': 'suivi-calories-photo',
};

/** Anciennes URL qui n'ont pas d'équivalent : elles renvoient vers l'index. */
export const REDIRECTIONS_VERS_INDEX = [
  'yummeal-vs-olio',
  'yummeal-vs-toogoodtogo',
  'meilleure-app-cuisine-frigo',
];
