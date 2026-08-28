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
    slug: 'remplacer-creme-fraiche',
    title: 'Par quoi remplacer la crème fraîche ?',
    metaDescription:
      "Plus de crème fraîche pour une sauce ou un gratin ? Voici les meilleures alternatives et comment les doser.",
    intro:
      "Pas de crème fraîche au frigo au moment de lier une sauce ou d'enrichir un gratin ? Plusieurs produits du quotidien peuvent la remplacer, avec des résultats différents selon la recette.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "Le fromage blanc ou le yaourt nature (de préférence entier) fonctionnent très bien dans une sauce froide, une vinaigrette crémeuse ou pour terminer un plat hors du feu : leur texture est proche, mais ils supportent moins bien une forte chaleur.",
          "Le lait concentré non sucré épaissit une sauce chaude presque comme de la crème, tout en étant plus liquide : idéal pour une béchamel ou une sauce à base de bouillon.",
          "Un mélange de lait et de beurre fondu (environ 3 volumes de lait pour 1 de beurre) remplace la crème dans la plupart des sauces cuites, en apportant à la fois le gras et le liant.",
          "Pour une version végétale, la crème de soja ou d'avoine cuisine se comporte de façon très proche de la crème fraîche, y compris à la cuisson.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "En remplacement direct, comptez la même quantité de fromage blanc, de yaourt ou de crème végétale que de crème fraîche demandée dans la recette.",
          "Pour le mélange lait-beurre, partez d'environ 200 ml de lait pour 60 g de beurre fondu afin de remplacer 200 ml de crème.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "Le yaourt et le fromage blanc peuvent trancher (se séparer visuellement) s'ils sont ajoutés à une sauce en pleine ébullition : incorporez-les hors du feu ou à feu très doux, en fin de cuisson.",
        ],
      },
    ],
    ctaTitle: 'Et si vous n\'aviez plus à improviser une recette ?',
    ctaText:
      "Yummeal scanne ce qu'il y a dans votre frigo et vous propose des recettes adaptées aux ingrédients que vous avez vraiment sous la main.",
  },
  {
    slug: 'alternative-beurre-cuisson',
    title: 'Par quoi remplacer le beurre en cuisson ?',
    metaDescription:
      "Plus de beurre pour cuire ou faire fondre en cuisine ? Voici les alternatives qui fonctionnent vraiment, selon le plat.",
    intro:
      "Le beurre sert autant à faire dorer un aliment qu'à enrichir une pâte ou une sauce. Selon l'usage, plusieurs matières grasses peuvent le remplacer sans dénaturer le plat.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "L'huile d'olive ou de tournesol remplace très bien le beurre pour faire revenir des légumes, saisir une viande ou cuire une omelette : elle supporte la chaleur et n'apporte pas de goût sucré.",
          "L'huile de coco (fondue) est la plus proche du beurre en pâtisserie, car elle est solide à température ambiante et redonne du croustillant à une pâte cuite au four.",
          "La margarine remplace le beurre à quantité égale dans quasiment toutes les recettes, sucrées comme salées, avec un résultat proche mais un goût légèrement moins riche.",
          "Pour une pâte à gâteau moelleuse, la compote de pommes non sucrée peut remplacer une partie du beurre et allège la texture sans la dénaturer complètement.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Pour une cuisson à la poêle, comptez environ 1 cuillère à soupe d'huile pour 15 g de beurre.",
          "En pâtisserie, remplacez le beurre par la même quantité d'huile de coco fondue ou de margarine ; pour la compote de pommes, ne remplacez qu'une moitié du beurre prévu, l'autre moitié en matière grasse solide garde la tenue de la pâte.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "L'huile liquide (olive, tournesol) ne convient pas pour une pâte feuilletée ou sablée : ces pâtes ont besoin d'une matière grasse solide (beurre, margarine ou huile de coco figée) pour former leurs couches ou leur texture friable.",
        ],
      },
    ],
    ctaTitle: 'Envie d\'arrêter de chercher un substitut à chaque recette ?',
    ctaText:
      "Avec Yummeal, indiquez ce que vous avez dans vos placards : l'app vous propose des recettes qui collent à vos ingrédients réels.",
  },
  {
    slug: 'par-quoi-remplacer-oeuf',
    title: 'Par quoi remplacer un œuf en cuisine ?',
    metaDescription:
      "Plus d'œufs à la maison ou recette sans œuf ? Voici les alternatives selon que l'œuf sert à lier, à faire lever ou à humidifier.",
    intro:
      "L'œuf joue plusieurs rôles en cuisine selon la recette : liant, agent levant ou source d'humidité. Le bon substitut dépend donc de ce que l'œuf est censé faire dans votre plat.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "L'aquafaba, le liquide d'une boîte de pois chiches, remplace le blanc d'œuf dans les préparations qui doivent monter en neige (meringue, mousse) : il se bat exactement de la même façon.",
          "Une cuillère à soupe de graines de lin ou de chia mélangée à 3 cuillères à soupe d'eau et laissée reposer 5 minutes forme un gel qui lie très bien une pâte à gâteau ou des cookies.",
          "La compote de pommes non sucrée ou la banane écrasée remplacent l'œuf dans une pâte à gâteau moelleuse, en apportant à la fois liant et humidité.",
          "Le yaourt nature apporte du liant et du moelleux dans un cake ou un muffin, sans le goût sucré de la compote.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Pour un œuf : environ 3 cuillères à soupe d'aquafaba, ou 1 cuillère à soupe de graines de lin/chia + 3 cuillères à soupe d'eau, ou 60 g de compote de pommes ou de banane écrasée, ou 60 g de yaourt nature.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "Ces alternatives fonctionnent bien en pâtisserie ou dans une pâte à gâteau, mais aucune ne remplace correctement l'œuf dans une omelette ou des œufs brouillés, où l'œuf est l'ingrédient principal et non un simple liant.",
        ],
      },
    ],
    ctaTitle: 'Une recette qui colle à ce que vous avez vraiment',
    ctaText:
      "Yummeal identifie les ingrédients de votre frigo et vous suggère des recettes réalisables tout de suite, sans course improvisée.",
  },
  {
    slug: 'alternative-parmesan-pates',
    title: 'Par quoi remplacer le parmesan sur des pâtes ?',
    metaDescription:
      "Plus de parmesan pour vos pâtes ? Ces fromages à pâte dure et alternatives donnent un résultat proche.",
    intro:
      "Le parmesan apporte un goût salé et umami caractéristique aux pâtes. D'autres fromages, et même quelques alternatives sans lactose, peuvent s'en approcher selon ce que vous avez sous la main.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "Le grana padano est le plus proche en goût et en texture : il se râpe et fond de la même façon, avec une saveur un peu plus douce.",
          "Le pecorino romano apporte un goût plus salé et affirmé, à utiliser en quantité légèrement réduite si vous ne voulez pas trop relever le plat.",
          "Un emmental ou un comté bien affiné fonctionnent en dépannage : moins umami que le parmesan, mais ils apportent du fondant et du goût.",
          "Pour une version sans lactose, la levure maltée (levure nutritionnelle) saupoudrée sur les pâtes donne une note fromagère et umami, sans aucun produit laitier.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Remplacez le parmesan à quantité égale par du grana padano ou du comté râpé ; pour le pecorino, réduisez d'un tiers la quantité car il est plus salé.",
          "Pour la levure maltée, commencez par 1 à 2 cuillères à café par portion, elle est plus concentrée en goût que le fromage râpé.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "Le parmesan déjà râpé industriel vendu en sachet longue conservation a un goût et une texture assez éloignés d'un vrai fromage à pâte dure : ce n'est pas un bon substitut si vous cherchez à retrouver le goût du parmesan frais.",
        ],
      },
    ],
    ctaTitle: 'Cuisinez avec ce que vous avez déjà',
    ctaText:
      "Yummeal adapte ses suggestions de recettes aux ingrédients présents dans votre frigo, fromages compris.",
  },
  {
    slug: 'remplacer-vin-blanc-sauce',
    title: 'Par quoi remplacer le vin blanc dans une sauce ?',
    metaDescription:
      "Pas de vin blanc pour déglacer ou parfumer une sauce ? Voici des alternatives, avec ou sans alcool.",
    intro:
      "Le vin blanc sert surtout à déglacer une poêle et à apporter de l'acidité à une sauce. Plusieurs liquides du quotidien peuvent reproduire cet effet, avec ou sans alcool.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "Le bouillon de volaille ou de légumes additionné d'un filet de jus de citron reproduit l'acidité et le déglaçage du vin blanc, sans alcool.",
          "Le jus de pomme non sucré, allongé d'un peu de vinaigre blanc, se rapproche du profil sucré-acide d'un vin blanc sec dans une sauce mijotée.",
          "Le vinaigre de cidre dilué dans de l'eau ou du bouillon (environ 1 cuillère à soupe de vinaigre pour 200 ml de liquide) apporte l'acidité recherchée sans le goût du raisin.",
          "Si l'alcool n'est pas un problème, un vin blanc sec quelconque, même de qualité modeste, fait toujours mieux l'affaire qu'un substitut : c'est avant tout une question de disponibilité.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Remplacez le vin blanc volume pour volume par du bouillon citronné ou du jus de pomme vinaigré.",
          "Pour le déglaçage, versez le liquide chaud directement sur les sucs de cuisson en grattant le fond de la poêle, comme vous le feriez avec du vin.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "Évitez de remplacer le vin blanc par du jus de citron pur non dilué : trop concentré, il rend la sauce beaucoup trop acide par rapport à l'équilibre recherché.",
        ],
      },
    ],
    ctaTitle: 'Une sauce ratée, ça arrive : une idée de recette, jamais',
    ctaText:
      "Avec Yummeal, listez vos ingrédients disponibles et laissez l'app vous proposer une recette réalisable, sans improvisation risquée.",
  },
  {
    slug: 'par-quoi-remplacer-lait-vache',
    title: 'Par quoi remplacer le lait de vache ?',
    metaDescription:
      "Plus de lait, intolérance ou choix végétal : voici les alternatives au lait de vache et où elles fonctionnent le mieux.",
    intro:
      "Que ce soit par manque de lait, par intolérance ou par choix, plusieurs laits végétaux ou animaux peuvent remplacer le lait de vache, avec des résultats différents selon la recette.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "Le lait de soja est le plus proche du lait de vache en texture et en teneur en protéines : il fonctionne bien dans une béchamel, une pâte à crêpes ou un café.",
          "Le lait d'avoine a un goût légèrement sucré et une texture un peu plus épaisse, idéal dans un porridge, un smoothie ou une pâte à gâteau.",
          "Le lait d'amande, plus liquide et peu sucré nature, convient bien pour un usage léger (sauce claire, pâte à crêpes fine), mais apporte moins de corps qu'un lait de vache ou de soja.",
          "Pour une recette cuite qui a besoin de matière grasse (comme une sauce riche), un lait végétal dit \"cuisine\" (soja ou avoine enrichi) se rapproche le plus du résultat obtenu avec du lait entier.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Dans la grande majorité des recettes salées ou sucrées, remplacez le lait de vache volume pour volume par le lait végétal de votre choix.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "Le lait de riz ou le lait de coco parfumé peuvent apporter un goût sucré ou une saveur marquée qui dénature une sauce salée : réservez-les plutôt aux préparations sucrées ou aux plats où ce goût est recherché.",
        ],
      },
    ],
    ctaTitle: 'Peu importe le lait dans votre frigo',
    ctaText:
      "Yummeal reconnaît vos ingrédients, végétaux ou non, et vous propose des recettes qui les utilisent vraiment.",
  },
  {
    slug: 'remplacer-huile-olive',
    title: "Par quoi remplacer l'huile d'olive ?",
    metaDescription:
      "Plus d'huile d'olive pour cuisiner ou assaisonner ? Voici quelles huiles utiliser selon l'usage, cru ou cuit.",
    intro:
      "L'huile d'olive sert aussi bien à assaisonner à froid qu'à cuire à la poêle. Le bon remplaçant dépend surtout de la température à laquelle elle est utilisée.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "Pour la cuisson à la poêle ou au four, l'huile de tournesol ou de colza remplace très bien l'huile d'olive : elles supportent bien la chaleur et ont un goût neutre.",
          "Pour une utilisation à froid (vinaigrette, filet sur un plat), l'huile de colza a elle aussi un goût doux qui se marie facilement avec la plupart des assaisonnements.",
          "L'huile de noix ou de noisette, plus typée, remplace bien l'huile d'olive dans une vinaigrette pour apporter une note différente, mais plus affirmée.",
          "Le beurre fondu peut dépanner en cuisson pour faire dorer un aliment, avec un goût plus riche que l'huile d'olive.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Remplacez l'huile d'olive volume pour volume dans la plupart des usages, qu'il s'agisse de cuisson ou d'assaisonnement.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "Les huiles à goût très marqué comme l'huile de sésame grillé changent complètement le profil aromatique d'un plat méditerranéen : à réserver pour les recettes où ce goût est recherché, pas comme substitut neutre.",
        ],
      },
    ],
    ctaTitle: 'Toujours une recette adaptée, huile ou pas',
    ctaText:
      "Yummeal vous propose des recettes réalisables avec les ingrédients que vous avez réellement chez vous.",
  },
  {
    slug: 'par-quoi-remplacer-oignon',
    title: "Par quoi remplacer l'oignon ?",
    metaDescription:
      "Plus d'oignon dans la cuisine ou intolérance ? Ces alternatives apportent une base aromatique proche.",
    intro:
      "L'oignon sert de base aromatique à de nombreux plats. Selon la recette et la raison de son absence, plusieurs alternatives permettent de retrouver une bonne partie de ce goût.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "L'échalote a un goût très proche de l'oignon, en plus doux et légèrement sucré : elle remplace l'oignon dans la plupart des sauces et des plats mijotés.",
          "Le poireau (partie blanche), émincé et revenu, apporte une base aromatique douce qui remplace bien l'oignon dans une soupe ou un plat mijoté.",
          "La poudre d'oignon (ou d'ail) permet de retrouver le goût sans la texture, utile quand c'est l'oignon frais en morceaux qui pose problème plus que le goût lui-même.",
          "Le fenouil émincé et revenu apporte une base aromatique différente mais efficace, avec une légère note anisée, notamment dans une sauce tomate ou un plat de poisson.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Remplacez l'oignon par la même quantité d'échalote ou de poireau émincé.",
          "Pour la poudre d'oignon, comptez environ 1 cuillère à café pour remplacer un oignon moyen émincé, à ajuster selon le goût recherché.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "Dans les plats où l'oignon est cru et croquant (salade, sandwich), la poudre d'oignon ne peut pas le remplacer : elle apporte le goût mais aucune texture, préférez alors l'échalote finement émincée.",
        ],
      },
    ],
    ctaTitle: 'La bonne recette selon ce que vous avez',
    ctaText:
      "Yummeal s'adapte à votre frigo et à vos placards pour vous proposer des recettes que vous pouvez vraiment cuisiner.",
  },
  {
    slug: 'alternative-ail-frais',
    title: "Par quoi remplacer l'ail frais ?",
    metaDescription:
      "Plus d'ail frais sous la main ? Ces alternatives permettent de garder le goût dans vos plats.",
    intro:
      "L'ail frais apporte un goût puissant et caractéristique à de nombreux plats. En son absence, quelques alternatives permettent d'en approcher le goût, en particulier en cuisson.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "La poudre d'ail (ou ail semoule) remplace efficacement l'ail frais dans les plats cuits, avec un goût un peu moins piquant mais bien présent.",
          "L'ail en semoule ou en flocons déshydratés, réhydraté quelques minutes dans un peu d'eau tiède, se rapproche davantage de la texture de l'ail frais émincé.",
          "L'ail confit ou en pot (à l'huile) donne un goût plus doux et sucré : pratique pour une sauce ou une tartinade, moins pour un plat qui a besoin du piquant de l'ail cru.",
          "L'échalote peut apporter une note aromatique complémentaire dans certains plats, sans reproduire exactement le goût de l'ail mais en renforçant la base aromatique.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Comptez environ 1/8 de cuillère à café de poudre d'ail pour remplacer une gousse d'ail fraîche.",
          "Pour l'ail confit, une gousse confite remplace environ une gousse fraîche, avec un goût plus doux à compenser en ajoutant un peu de poivre ou de piment si besoin.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "Dans une préparation crue comme un aïoli ou une vinaigrette où l'ail doit apporter du piquant, la poudre d'ail donne un résultat plat : privilégiez l'ail confit ou, à défaut, une quantité un peu plus généreuse de poudre.",
        ],
      },
    ],
    ctaTitle: 'Pas d\'ail, pas de problème',
    ctaText:
      "Yummeal identifie vos ingrédients disponibles et vous propose des recettes en conséquence, sans course de dernière minute.",
  },
  {
    slug: 'remplacer-pomme-de-terre-gratins',
    title: 'Par quoi remplacer la pomme de terre dans un gratin ?',
    metaDescription:
      "Plus de pommes de terre pour un gratin ? Ces légumes et féculents donnent un résultat tout aussi gourmand.",
    intro:
      "La pomme de terre est la base classique du gratin, mais d'autres légumes riches en amidon ou fermes à la cuisson peuvent la remplacer avec de très bons résultats.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "Le potimarron ou la courge butternut, coupés en tranches fines, gratinent très bien et apportent un léger goût sucré au plat.",
          "Le panais, à la texture proche de la pomme de terre mais plus parfumé, fonctionne particulièrement bien en gratin, seul ou mélangé à d'autres légumes.",
          "Le céleri-rave en tranches fines donne un gratin plus parfumé, avec une texture fondante proche de celle de la pomme de terre bien cuite.",
          "Le riz déjà cuit, disposé en couche et recouvert de sauce et de fromage, peut remplacer la pomme de terre pour un gratin plus rapide à préparer.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Remplacez la pomme de terre volume pour volume par le légume choisi, coupé en tranches d'épaisseur similaire pour un temps de cuisson comparable.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "Les légumes très riches en eau comme la courgette rendent beaucoup de liquide à la cuisson et détrempent le gratin : si vous les utilisez, faites-les dégorger avec un peu de sel puis épongez-les avant de les disposer dans le plat.",
        ],
      },
    ],
    ctaTitle: 'Un gratin, mille façons de le faire',
    ctaText:
      "Yummeal vous suggère des recettes selon les légumes que vous avez réellement dans votre frigo, gratin ou pas.",
  },
  {
    slug: 'par-quoi-remplacer-farine-ble',
    title: 'Par quoi remplacer la farine de blé ?',
    metaDescription:
      "Plus de farine de blé, ou recette sans gluten ? Voici les alternatives et comment ajuster les quantités.",
    intro:
      "La farine de blé sert à lier, épaissir ou faire lever une préparation. D'autres farines peuvent la remplacer, mais leur comportement à la cuisson varie sensiblement.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "La fécule de maïs (Maïzena) remplace très bien la farine de blé pour épaissir une sauce ou un jus, avec un pouvoir épaississant plus fort à quantité égale.",
          "La farine de riz convient pour une pâte fine (crêpe, tempura) et pour épaissir légèrement, avec un résultat plus croustillant en friture.",
          "Un mélange de farines sans gluten du commerce (souvent riz, maïs et fécule) est la solution la plus fiable pour un gâteau ou un pain sans gluten, car ces mélanges sont déjà équilibrés pour lever et tenir.",
          "La farine de sarrasin remplace bien la farine de blé dans une pâte à galette ou à crêpe salée, avec un goût plus prononcé et légèrement rustique.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Pour épaissir une sauce, utilisez environ deux fois moins de fécule de maïs que de farine de blé prévue dans la recette.",
          "Pour un gâteau ou un pain, remplacez la farine de blé volume pour volume par un mélange sans gluten prêt à l'emploi plutôt que par une seule farine alternative, pour un résultat plus fiable.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "La farine de riz ou la fécule de maïs seules ne font pas lever une pâte à pain ou à gâteau de la même façon que la farine de blé, faute de gluten : sans mélange équilibré ou agent levant adapté, la texture finale est souvent plus dense et friable.",
        ],
      },
    ],
    ctaTitle: 'Cuisinez avec les farines que vous avez',
    ctaText:
      "Yummeal adapte ses recettes à votre garde-manger réel, sans vous forcer à racheter un ingrédient précis.",
  },
  {
    slug: 'alternative-levure-chimique',
    title: 'Par quoi remplacer la levure chimique ?',
    metaDescription:
      "Plus de levure chimique pour un gâteau ? Voici les alternatives qui font vraiment lever la pâte.",
    intro:
      "La levure chimique fait lever les préparations sucrées grâce à une réaction chimique au contact de la chaleur et de l'humidité. Quelques alternatives permettent de reproduire cet effet.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "Le bicarbonate de soude associé à un ingrédient acide (jus de citron, yaourt, vinaigre) déclenche la même réaction que la levure chimique et fait lever la pâte.",
          "Le blanc d'œuf monté en neige et incorporé délicatement en fin de préparation apporte du volume par voie mécanique plutôt que chimique, efficace pour un gâteau léger.",
          "La levure de boulanger (fraîche ou sèche) peut faire lever certaines pâtes sucrées proches de la brioche, mais elle demande un temps de repos que la levure chimique ne nécessite pas.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Pour remplacer 1 sachet de levure chimique (environ 11 g), comptez 1/2 cuillère à café de bicarbonate de soude associée à 1 cuillère à soupe de jus de citron ou de vinaigre, ou à un yaourt déjà prévu dans la recette.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "N'utilisez jamais le bicarbonate de soude seul, sans ingrédient acide : sans cette réaction, il ne fait pas lever la pâte et peut laisser un goût amer et savonneux perceptible.",
        ],
      },
    ],
    ctaTitle: 'Un gâteau réussi, même sans le bon sachet',
    ctaText:
      "Yummeal vous aide à cuisiner avec ce qui est déjà dans vos placards, sans course pour un ingrédient précis.",
  },
  {
    slug: 'remplacer-chapelure-panure',
    title: 'Par quoi remplacer la chapelure pour une panure ?',
    metaDescription:
      "Plus de chapelure pour paner une escalope ou des légumes ? Voici des alternatives tout aussi croustillantes.",
    intro:
      "La chapelure sert à créer une croûte croustillante à la cuisson. D'autres ingrédients secs et émiettés peuvent jouer exactement ce rôle.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "Du pain rassis mixé grossièrement fait une chapelure maison immédiate, avec un résultat souvent plus croustillant que la chapelure industrielle fine.",
          "Des flocons de maïs (corn flakes) nature écrasés donnent une panure particulièrement croustillante, notamment pour une cuisson au four.",
          "Des crackers ou biscuits salés émiettés remplacent bien la chapelure pour paner une viande ou un poisson, avec un goût légèrement plus prononcé selon le biscuit utilisé.",
          "La farine de maïs ou la semoule fine, utilisée seule ou en complément d'un œuf battu, crée elle aussi une croûte croustillante à la cuisson.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Remplacez la chapelure volume pour volume par l'alternative choisie, en veillant à ce que les morceaux soient de taille assez fine pour bien adhérer à l'aliment trempé dans l'œuf.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "Des morceaux trop gros (pain simplement émietté à la main, biscuits en gros éclats) adhèrent mal et brûlent plus vite à la cuisson : mixez toujours l'alternative choisie en miettes fines et régulières avant de paner.",
        ],
      },
    ],
    ctaTitle: 'Croustillant garanti, chapelure ou pas',
    ctaText:
      "Yummeal vous propose des recettes réalisables avec les ingrédients que vous avez réellement sous la main.",
  },
  {
    slug: 'par-quoi-remplacer-moutarde',
    title: 'Par quoi remplacer la moutarde ?',
    metaDescription:
      "Plus de moutarde pour une vinaigrette ou une marinade ? Ces alternatives apportent un goût et un liant proches.",
    intro:
      "La moutarde joue souvent un double rôle : elle relève le goût et sert de liant dans une vinaigrette. Plusieurs ingrédients peuvent reproduire l'un ou l'autre de ces effets.",
    sections: [
      {
        heading: 'Les meilleures alternatives',
        body: [
          "Le raifort ou la crème de raifort apporte un goût piquant proche de la moutarde forte, en particulier pour accompagner une viande.",
          "Le vinaigre associé à une pointe de curcuma ou de paprika reproduit une partie du goût acidulé et de la couleur de la moutarde, sans le piquant.",
          "La mayonnaise, déjà émulsionnée, peut servir de liant dans une vinaigrette à la place de la moutarde, avec un résultat plus onctueux et moins relevé.",
          "Le wasabi, utilisé en toute petite quantité, apporte un piquant similaire à la moutarde forte pour relever une sauce ou une marinade.",
        ],
      },
      {
        heading: 'Comment doser',
        body: [
          "Pour lier une vinaigrette, remplacez la moutarde par la même quantité de mayonnaise.",
          "Pour le piquant, commencez par une quantité de raifort ou de wasabi deux à trois fois plus petite que la quantité de moutarde prévue, puis ajustez selon le goût recherché.",
        ],
      },
      {
        heading: 'À éviter',
        body: [
          "Aucune de ces alternatives ne reproduit exactement le rôle émulsifiant de la moutarde dans une vinaigrette maison : si le liant est essentiel à la recette, la mayonnaise reste la meilleure option de repli.",
        ],
      },
    ],
    ctaTitle: 'La bonne recette même sans le bon pot',
    ctaText:
      "Yummeal s'adapte à vos ingrédients disponibles pour vous proposer des recettes réalisables tout de suite.",
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
