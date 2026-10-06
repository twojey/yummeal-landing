export interface SeoSource {
  label: string;
  url: string;
}

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoRefreshEntry {
  /** Requêtes Search Console regroupées sur une même page canonique. */
  queries: string[];
  quickAnswer: string;
  actions: string[];
  faq: SeoFaq[];
  sources?: SeoSource[];
}

const HYGIENE_RESTES = {
  label: 'Ministère de l’Agriculture — cuisiner et conserver les restes',
  url: 'https://agriculture.gouv.fr/cuisiner-fait-maison-comment-eviter-les-intoxications-alimentaires',
};

const CHAINE_FROID = {
  label: 'Ministère de l’Agriculture — chaîne du froid',
  url: 'https://agriculture.gouv.fr/securite-sanitaire-des-aliments-tout-sur-la-chaine-du-froid',
};

const FRUITS_LEGUMES = {
  label: 'Ministère de l’Agriculture — fruits et légumes « moches »',
  url: 'https://agriculture.gouv.fr/fruits-et-legumes-moches-et-guide-de-conservation-des-legumes',
};

/**
 * Les briefs Search Console sont des variantes, pas des pages à dupliquer.
 * Cette source unique alimente le bloc visible, les FAQ et les liens de preuve
 * des pages déjà indexées.
 */
export const SEO_REFRESH: Record<string, SeoRefreshEntry> = {
  '/anti-gaspillage/comment-conserver-oignons-coupes': {
    queries: [
      'conservation oignon coupé', 'temps de conservation oignon coupé',
      'conserver oignon coupé', 'comment conserver un oignon coupé',
      'oignon coupé conservation frigo', 'comment conserver un demi oignon',
    ],
    quickAnswer: 'Un oignon coupé se garde au réfrigérateur dans une boîte hermétique ou emballé côté coupé, puis se consomme rapidement. S’il devient visqueux, moisi ou dégage une odeur anormale, il faut le jeter.',
    actions: [
      'Placez la moitié restante dans une boîte hermétique, face coupée vers le bas si possible.',
      'Notez la date de découpe et gardez-la dans la zone froide du réfrigérateur.',
      'Utilisez-la dans une poêlée, une sauce ou congelez-la immédiatement si vous ne pensez pas la cuisiner bientôt.',
    ],
    faq: [
      { question: 'Combien de temps garder un oignon coupé au frigo ?', answer: 'Il vaut mieux le consommer rapidement et suivre les conditions réelles de votre réfrigérateur. L’emballage, la température et l’état de l’oignon comptent plus qu’un délai universel : jetez-le dès qu’il devient visqueux, moisi ou anormalement odorant.' },
      { question: 'Peut-on congeler un oignon coupé ?', answer: 'Oui, surtout s’il est destiné à être cuit. Émincez-le, placez-le dans un sachet ou une boîte adaptée et utilisez-le directement dans une poêlée ou une sauce.' },
    ],
    sources: [CHAINE_FROID, HYGIENE_RESTES],
  },
  '/substitutions/remplacer-chapelure-panure': {
    queries: [
      'par quoi remplacer la chapelure', 'comment remplacer la chapelure',
      'remplacer la chapelure par de la semoule', 'par quoi remplacer la chapelure dans une recette',
    ],
    quickAnswer: 'Pour remplacer la chapelure, utilisez du pain rassis mixé, des crackers écrasés, des corn flakes nature ou de la semoule fine. Le meilleur choix dépend du croustillant et du goût recherchés.',
    actions: [
      'Choisissez un ingrédient sec et réduisez-le en miettes fines et régulières.',
      'Utilisez-le volume pour volume avec la chapelure prévue.',
      'Testez une petite quantité avant de paner toute la préparation pour vérifier l’adhérence et la coloration.',
    ],
    faq: [
      { question: 'Peut-on remplacer la chapelure par de la semoule ?', answer: 'Oui. La semoule fine donne une croûte croustillante, surtout pour une cuisson à la poêle ou au four. Elle apporte toutefois une texture plus granuleuse que le pain mixé.' },
      { question: 'Quelle alternative donne le plus de croustillant ?', answer: 'Les corn flakes nature écrasés et les crackers donnent généralement une croûte très croustillante. Le pain rassis mixé est plus neutre et plus proche d’une chapelure classique.' },
    ],
  },
  '/alternatives/jow': {
    queries: ['application comme jow', 'jow alternative', 'alternative jow', 'equivalent jow gratuit', 'application similaire à jow'],
    quickAnswer: 'Jow est surtout adapté à la planification de menus suivie d’une commande. Une alternative est pertinente si vous voulez partir de ce que vous avez déjà dans votre frigo, sans reconstruire une liste de courses.',
    actions: [
      'Choisissez Jow si votre priorité est de transformer un menu en panier drive ou livraison.',
      'Choisissez une application d’inventaire si votre priorité est d’utiliser vos ingrédients existants.',
      'Comparez toujours le mécanisme d’inventaire, le modèle économique et le rôle du catalogue avant de télécharger.',
    ],
    faq: [
      { question: 'Quelle est la meilleure alternative à Jow ?', answer: 'Cela dépend du besoin. Jow reste adapté à la planification et aux courses ; Yummeal vise plutôt le cas où vous voulez photographier votre frigo et trouver des recettes réalisables avec ce qui est déjà là.' },
      { question: 'Yummeal remplace-t-il une application de courses ?', answer: 'Non. Yummeal aide d’abord à décider quoi cuisiner avec l’existant. Il ne remplace pas une enseigne de livraison ni un panier drive.' },
    ],
  },
  '/faq/congelation-creme-fraiche-liquide': {
    queries: ['peut on congeler de la crème fraîche liquide', 'congeler creme liquide', 'peut-on congeler de la crème liquide'],
    quickAnswer: 'La crème fraîche liquide peut être congelée, mais sa texture peut se séparer après décongélation. Réservez-la plutôt aux sauces, soupes et gratins cuits qu’à une chantilly ou une préparation froide.',
    actions: [
      'Congelez-la dans une portion hermétique et identifiée.',
      'Décongelez-la lentement au réfrigérateur, jamais à température ambiante.',
      'Mélangez-la puis utilisez-la dans une préparation cuite si la texture a changé.',
    ],
    faq: [
      { question: 'La crème liquide décongelée est-elle encore utilisable ?', answer: 'Oui si elle a été correctement conservée et ne présente ni odeur ni aspect anormal. Sa texture peut être moins homogène ; la cuisson et le mélange conviennent mieux qu’un usage froid.' },
      { question: 'Peut-on faire une chantilly avec de la crème décongelée ?', answer: 'Ce n’est généralement pas le meilleur usage : la séparation de l’émulsion peut empêcher la crème de monter correctement.' },
    ],
    sources: [CHAINE_FROID, HYGIENE_RESTES],
  },
  '/faq/peut-on-manger-riz-laisse-hors-du-frigo': {
    queries: ['manger du riz cru', 'riz hors du frigo', 'manger du riz non cuit', 'riz en dehors du frigo'],
    quickAnswer: 'Un riz cuit resté plusieurs heures ou toute une nuit à température ambiante doit être écarté par prudence. Le riz correctement refroidi et réfrigéré doit être consommé rapidement et bien réchauffé.',
    actions: [
      'Ne laissez pas un plat chaud plus de deux heures à température ambiante.',
      'Répartissez le riz en portions peu épaisses pour accélérer le refroidissement.',
      'Conservez-le fermé au réfrigérateur et réchauffez-le bien chaud au moment de le manger.',
    ],
    faq: [
      { question: 'Peut-on manger du riz laissé toute la nuit hors du frigo ?', answer: 'Non, il vaut mieux ne pas le consommer. Une nouvelle cuisson ne garantit pas l’élimination de toutes les toxines éventuellement produites pendant le stockage à température ambiante.' },
      { question: 'Combien de temps garder du riz cuit ?', answer: 'Il faut suivre les recommandations de conservation des restes et le consommer rapidement après refroidissement et réfrigération. En cas de doute sur le temps ou la température, il est plus sûr de le jeter.' },
    ],
    sources: [HYGIENE_RESTES],
  },
  '/sante/conservation-poulet-cuit': {
    queries: ['poulet cuit combien de temps au frigo', 'conservation poulet cuit frigo'],
    quickAnswer: 'Le poulet cuit doit être refroidi rapidement, conservé fermé dans la zone froide du réfrigérateur et consommé rapidement. Si le temps passé hors froid est inconnu ou si l’odeur et la texture sont anormales, ne le consommez pas.',
    actions: [
      'Placez le poulet dans une boîte fermée après refroidissement rapide, sans le laisser longtemps sur le plan de travail.',
      'Séparez les portions à consommer et congelez celles prévues plus tard.',
      'Réchauffez la portion immédiatement avant consommation et ne multipliez pas les cycles.',
    ],
    faq: [
      { question: 'Combien de temps garder du poulet cuit au frigo ?', answer: 'La durée dépend de la température, du refroidissement et de la manipulation. Les recommandations officielles insistent sur un refroidissement rapide, une conservation froide et une consommation rapide des restes plutôt que sur un chiffre valable dans tous les cas.' },
      { question: 'Peut-on congeler du poulet déjà cuit ?', answer: 'Oui, en portions hermétiques, idéalement peu après la préparation. Décongelez-le au réfrigérateur et ne recongelez pas un produit déjà décongelé.' },
    ],
    sources: [HYGIENE_RESTES, CHAINE_FROID],
  },
  '/sante/est-ce-que-le-bacon-se-congele': {
    queries: ['congeler bacon'],
    quickAnswer: 'Le bacon peut être congelé en portions bien emballées. Notez la date, décongelez-le au réfrigérateur et ne recongelez pas un produit déjà décongelé.',
    actions: ['Séparez les tranches en petites portions.', 'Emballez-les hermétiquement et étiquetez-les.', 'Décongelez uniquement la portion nécessaire au réfrigérateur.'],
    faq: [{ question: 'Peut-on recongeler du bacon décongelé ?', answer: 'Par prudence, non : les recommandations d’hygiène déconseillent de recongeler un produit décongelé.' }],
    sources: [HYGIENE_RESTES],
  },
  '/guides/batch-cooking-etudiant-2-heures': {
    queries: ['batch cooking pour étudiant'],
    quickAnswer: 'Un batch cooking étudiant efficace tient sur trois bases : un féculent, une protéine et des légumes. Préparez-les en parallèle, répartissez-les en portions et congelez ce qui ne sera pas mangé rapidement.',
    actions: [
      'Commencez par cuire un féculent et une protéine pendant que vous préparez les légumes.',
      'Gardez les sauces à part pour varier les repas et préserver les textures.',
      'Réfrigérez rapidement les portions prévues dans les prochains jours et congelez le reste.',
    ],
    faq: [
      { question: 'Combien de repas préparer pour un étudiant ?', answer: 'Préparez seulement les portions qui seront réellement consommées rapidement. Une base pour quatre à cinq repas peut suffire, à condition de congeler les portions plus éloignées.' },
      { question: 'Le riz du batch cooking se garde-t-il toute la semaine ?', answer: 'Il vaut mieux ne pas conserver du riz cuit plusieurs jours au réfrigérateur. Refroidissez-le rapidement, consommez les premières portions rapidement et congelez le reste.' },
    ],
    sources: [HYGIENE_RESTES],
  },
  '/budget/proteines-moins-cheres-que-la-viande': {
    queries: ['proteine la moins chere'],
    quickAnswer: 'Les lentilles, pois chiches, haricots secs et œufs sont souvent des bases économiques. Le prix réel dépend du format, du magasin et de la saison : comparez au kilo et construisez vos repas autour de ce qui est déjà disponible.',
    actions: ['Comparez le prix au kilo plutôt que le prix du paquet.', 'Associez une protéine économique à un féculent et un légume.', 'Utilisez Yummeal pour trouver une recette à partir des produits déjà présents.'],
    faq: [{ question: 'Quelle est la protéine la moins chère ?', answer: 'Il n’existe pas un prix universel : les lentilles, pois chiches, haricots secs et œufs sont souvent de bons points de départ, mais il faut comparer les prix locaux et les formats.' }],
  },
  '/ingredients/legumes/carottes-anti-gaspi': {
    queries: ['carottes molles', 'carotte molle que faire', 'carotte molle comestible', 'que faire avec des carottes molles'],
    quickAnswer: 'Une carotte molle a surtout perdu de l’eau. Elle reste utilisable si elle ne présente ni moisissure, ni viscosité, ni odeur anormale ; la cuisson est généralement le meilleur moyen de retrouver une texture agréable.',
    actions: ['Plongez-la brièvement dans l’eau froide si vous voulez la raffermir.', 'Écartez toute carotte moisie, visqueuse ou anormalement odorante.', 'Utilisez-la en soupe, purée, poêlée ou carottes rôties.'],
    faq: [{ question: 'Une carotte molle est-elle encore bonne ?', answer: 'Oui si elle est seulement flétrie et qu’elle reste propre, sans moisissure, viscosité ni odeur anormale. Dans le doute, ne la consommez pas.' }, { question: 'Que faire avec des carottes molles ?', answer: 'La cuisson masque la perte de croquant : soupe, purée, poêlée ou carottes rôties sont les usages les plus simples.' }],
    sources: [FRUITS_LEGUMES],
  },
  '/ingredients/legumes/brocoli-anti-gaspi': {
    queries: ['brocoli jauni'],
    quickAnswer: 'Un brocoli légèrement jauni reste généralement utilisable si les fleurettes sont fermes et sans odeur anormale. Retirez les parties trop sèches ou abîmées et privilégiez une cuisson rapide.',
    actions: ['Vérifiez la fermeté, l’odeur et l’absence de moisissure.', 'Retirez les fleurettes très jaunies et épluchez le trognon.', 'Utilisez le brocoli en soupe, poêlée ou rôti avec le trognon.'],
    faq: [{ question: 'Peut-on manger un brocoli qui jaunit ?', answer: 'Oui, s’il est seulement vieillissant et reste ferme, sans moisissure, viscosité ni odeur anormale. En cas de doute, jetez-le.' }],
    sources: [FRUITS_LEGUMES],
  },
  '/ingredients/fruits/pommes-fripees': {
    queries: ['que faire avec des pommes fripées'],
    quickAnswer: 'Une pomme fripée a généralement perdu de l’eau mais reste comestible si sa chair est saine. Retirez les parties abîmées et utilisez-la crue, en compote ou cuite.',
    actions: ['Coupez la pomme et vérifiez l’absence de moisissure ou d’odeur anormale.', 'Retirez les zones abîmées.', 'Transformez-la en compote, pomme au four ou tarte fine.'],
    faq: [{ question: 'Peut-on manger une pomme fripée ?', answer: 'Oui, si sa chair reste saine et qu’elle ne présente pas de moisissure, de fermentation ou d’odeur anormale.' }],
    sources: [FRUITS_LEGUMES],
  },
  '/ingredients/fruits/avocat-trop-mur': {
    queries: ['avocat trop mur'],
    quickAnswer: 'Un avocat trop mûr peut encore être utilisé si sa chair ne présente ni moisissure ni odeur anormale. Retirez les zones brunies et mixez le reste en guacamole, sauce ou tartinade.',
    actions: ['Ouvrez-le pour vérifier la chair plutôt que de juger uniquement la peau.', 'Retirez les parties très brunes ou fibreuses.', 'Ajoutez un peu de citron et consommez-le rapidement après ouverture.'],
    faq: [{ question: 'Un avocat brun est-il encore comestible ?', answer: 'Le brunissement lié à l’oxydation est souvent esthétique. Retirez les zones altérées ; jetez l’avocat en cas de moisissure, de viscosité ou d’odeur anormale.' }],
    sources: [FRUITS_LEGUMES],
  },
  '/substitutions/alternative-ail-frais': {
    queries: ['par quoi remplacer l’ail', 'equivalence ail semoule ail frais'],
    quickAnswer: 'Pour remplacer l’ail frais, utilisez de l’ail semoule, de l’ail en pot ou une base aromatique comme l’échalote selon la recette. Ajustez progressivement : les formes séchées sont plus concentrées.',
    actions: ['Choisissez une forme sèche pour une sauce ou une cuisson longue.', 'Commencez par une petite quantité et goûtez.', 'Utilisez Yummeal pour rechercher une recette compatible avec l’aromate réellement disponible.'],
    faq: [{ question: 'Quelle quantité d’ail semoule remplace une gousse ?', answer: 'La concentration varie selon le produit. Commencez par une petite pincée, mélangez, puis ajustez plutôt que d’appliquer une équivalence rigide.' }],
  },
  '/substitutions/alternative-levure-chimique': {
    queries: ['comment remplacer la levure chimique'],
    quickAnswer: 'Le bicarbonate peut remplacer une partie de la levure chimique s’il est associé à un ingrédient acide comme un yaourt, du citron ou du vinaigre. Utilisé seul, il risque de ne pas faire lever la pâte et de laisser un goût amer.',
    actions: ['Identifiez l’ingrédient acide déjà présent dans la recette.', 'Ajoutez le bicarbonate avec parcimonie.', 'Cuisez rapidement après mélange pour profiter de la réaction.'],
    faq: [{ question: 'Peut-on remplacer la levure chimique par du bicarbonate seul ?', answer: 'Non, pas de façon fiable : le bicarbonate a besoin d’un acide et d’humidité pour produire le gaz qui fait lever la pâte.' }],
  },
  '/substitutions/alternative-parmesan-pates': {
    queries: ['equivalent parmesan'],
    quickAnswer: 'Le grana padano, le pecorino, un comté affiné ou la levure maltée peuvent remplacer le parmesan selon le résultat recherché : fondant, goût salé ou note umami.',
    actions: ['Choisissez un fromage à pâte dure pour une substitution la plus proche.', 'Réduisez la quantité de pecorino s’il est plus salé.', 'Utilisez la levure maltée pour une option sans produit laitier.'],
    faq: [{ question: 'Quel fromage ressemble le plus au parmesan ?', answer: 'Le grana padano est généralement le remplacement le plus proche. Le pecorino est plus salé et plus marqué ; le comté apporte davantage de rondeur.' }],
  },
  '/substitutions/remplacer-huile-olive': {
    queries: ['remplacer huile d’olive'],
    quickAnswer: 'Pour remplacer l’huile d’olive, choisissez une huile neutre pour la cuisson, une huile de colza ou de noix pour une vinaigrette, et du beurre ou une matière grasse solide pour certaines pâtisseries.',
    actions: ['Distinguez l’usage : cuisson, assaisonnement ou pâtisserie.', 'Remplacez généralement volume pour volume.', 'Évitez les huiles très parfumées si vous voulez préserver le goût de la recette.'],
    faq: [{ question: 'Quelle huile remplace l’huile d’olive pour cuire ?', answer: 'L’huile de tournesol ou de colza convient généralement pour une cuisson au goût neutre. Le choix dépend aussi de la température et du goût recherché.' }],
  },
};

export function getSeoRefresh(path: string): SeoRefreshEntry | undefined {
  const normalized = path.replace(/\/$/, '') || '/';
  return SEO_REFRESH[normalized];
}
