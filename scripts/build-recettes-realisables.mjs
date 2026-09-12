/**
 * Régénère src/data/recettesRealisables.json.
 *
 * POURQUOI CE SCRIPT N'EST PAS DANS LE BUILD. Il interroge la base de
 * production. Le mettre dans `npm run build` obligerait à confier des
 * identifiants Supabase à Netlify, et ferait dépendre chaque déploiement de la
 * disponibilité de la base. Le JSON est donc généré à la main, committé, et
 * relu en diff avant mise en ligne — ce qui est aussi le seul moment où l'on
 * peut voir qu'une suggestion est absurde avant qu'elle soit publique.
 *
 *   SUPABASE_DB_URL="postgres://..." node scripts/build-recettes-realisables.mjs
 *
 * CE QUE LE SCRIPT FAIT
 *
 * Pour chaque fiche de `MAPPING`, il appelle le RPC
 * `find_recipes_by_ingredients` avec :
 *  - `p_master_ingredient_ids` = l'ingrédient sujet ;
 *  - `p_pantry_ids` = les 65 ids de
 *    `api-deno/src/constants/pantry_ingredients.ts`, MOINS le sujet. Retirer
 *    le sujet est essentiel : si la page parle de la farine et que la farine
 *    est supposée présente, les recettes rendues ne parlent plus d'elle ;
 *  - `p_max_missing = 2`, `p_min_used = 1` (un seul ingrédient en entrée).
 *
 * DEUX FILTRES, ET POURQUOI ILS EXISTENT
 *
 * 1. Titre en alphabet latin, 6 à 70 caractères. Le catalogue contient des
 *    titres non traduits (japonais, anglais) qui n'ont rien à faire sur une
 *    page française.
 *
 * 2. PERTINENCE : le titre doit mentionner l'ingrédient (`motif`). Sans ce
 *    filtre, environ un résultat sur cinq était hors sujet — « croûte de
 *    parmesan » renvoyait « Oeufs Brouillés Beurre », « avocat trop mûr »
 *    renvoyait « Café Bulletproof ». Le RPC répond correctement à la question
 *    qu'on lui pose (quelles recettes utilisent cet ingrédient), mais une page
 *    « que faire avec X » demande autre chose : des recettes DONT X est le
 *    sujet.
 *
 * LES 9 FICHES VOLONTAIREMENT ABSENTES
 *
 * Un master_ingredient ne peut pas représenter un ÉTAT d'ingrédient. Exclues
 * pour cette raison, après vérification :
 *  - `riz-restes` : le master « rice » renvoie des recettes pour CUIRE du riz
 *    (« Riz Blanc Vapeur »), l'inverse du sujet ;
 *  - `fanes-de-radis` : le master « radish » est la racine, pas les fanes ;
 *  - `girolles-champignons` : « mushroom » renvoyait des steaks de crinière
 *    de lion ;
 *  - `croute-de-parmesan` : le master « parmesan » est le fromage, pas la
 *    croûte ;
 *  - `jus-de-conserve-pois-chiche` : « chickpea water » n'a qu'une recette.
 * Et 4 fiches dont le sujet est un fond de paquet d'un basique DÉJÀ dans le
 * garde-manger (`farine-pain`, `huile-olive`, `beurre-cuisine`,
 * `ketchup-cuisine`) : l'exercice y perd son sens, toutes les recettes en
 * « utilisent ».
 *
 * Résoudre ces cas demande un identifiant plus fin que le master ingredient
 * (un ingrédient + un état), donc une décision produit — pas un filtre de
 * plus dans ce script.
 */

const PANTRY_IDS = [
  10105, 7707, 7787, 11673, 1205, 1120, 6507, 7678, 8057, 1078, 10298, 11528,
  11553, 10319, 1105, 11493, 1209, 1168, 11550, 1083, 1182, 11688, 6847, 11650,
  1198, 988, 10313, 6140, 7745, 6906, 10198, 6516, 1251, 1169, 1237, 11492,
  6354, 6600, 11621, 11529, 10189, 2609, 1171, 1158, 1067, 1165, 1049, 1109,
  994, 1079, 1195, 6003, 2490, 6620, 1267, 1075, 6669, 10037, 3492, 1220, 1059,
  10543, 10457, 6094, 1072,
];

/** slug de la fiche → [master_ingredient_id, motif de pertinence]. */
const MAPPING = {
  courgettes: [6863, 'courgette'],
  'poivrons-restes': [1113, 'poivron'],
  'brocoli-anti-gaspi': [1077, 'brocoli'],
  'carottes-anti-gaspi': [1201, 'carotte'],
  'carottes-fleuries': [1201, 'carotte'],
  'ail-conservation': [1105, "ail|aglio"],
  'pommes-terre-anti-gaspi': [2114, 'pomme de terre|pommes de terre|gnocchi|chips'],
  'tomates-anti-gaspi': [1227, 'tomate'],
  'epinards-frais-qui-ramollissent': [1203, 'épinard'],
  'bacon-anti-gaspi': [6880, 'bacon|lard'],
  'poulet-restes': [7973, 'poulet'],
  'jambon-restes': [6368, 'jambon'],
  'thon-conserve': [6782, 'thon'],
  'pates-restes': [6872, 'pâtes|spaghetti|orzo'],
  'fond-de-pot-pesto': [7755, 'pesto'],
  'pain-de-mie-sec': [6282, 'pain|sandwich|toast|bruschetta'],
  'lentilles-corail-fond-de-sac': [7426, 'lentille'],
  'fromage-restes': [6107, 'fromage'],
  'creme-fraiche': [7690, 'crème|ganache'],
  'oeufs-cuisine': [6247, 'oeuf|œuf'],
  'lait-anti-gaspi': [7675, 'lait|leche'],
  'yaourt-perime': [1907, 'yaourt|lassi|doi'],
  'blancs-d-oeufs-seuls': [11540, 'meringue|blanc|cloud'],
  'jaunes-d-oeufs-seuls': [11566, 'crème pâtissière|flan|glace|jaune'],
  'avocat-trop-mur': [14602, 'avocat|guaca'],
  'bananes-noires': [1214, 'banane'],
  'pommes-fripees': [1241, 'pomme'],
  'citron-entame': [998, 'citron'],
};

/** Nombre minimum de recettes pertinentes pour publier le bloc sur une fiche. */
const MIN_RECETTES = 4;
/** Nombre affiché. */
const MAX_RECETTES = 5;

console.error(
  `Ce script documente la génération de src/data/recettesRealisables.json.\n` +
    `\n` +
    `${Object.keys(MAPPING).length} fiches cartographiées, ${PANTRY_IDS.length} ids de garde-manger.\n` +
    `Seuils : au moins ${MIN_RECETTES} recettes pertinentes, ${MAX_RECETTES} affichées.\n` +
    `\n` +
    `Il lui manque un client Postgres pour s'exécuter : ce dépôt n'a aucune\n` +
    `dépendance de base de données, et en ajouter une pour un script lancé à la\n` +
    `main quelques fois par an serait un mauvais échange. La requête SQL\n` +
    `complète est reproduite ci-dessous ; elle se lance telle quelle via le MCP\n` +
    `Supabase ou psql, et son résultat se colle dans le JSON.\n`
);

console.log(`-- Requête de régénération (paramètres ci-dessus)
WITH pantry AS (SELECT ARRAY[${PANTRY_IDS.join(',')}]::int[] AS ids),
cibles(slug, mid, motif) AS (VALUES
${Object.entries(MAPPING)
  .map(([slug, [id, motif]]) => `  ('${slug}',${id},'${motif.replace(/'/g, "''")}')`)
  .join(',\n')}
),
res AS (
  SELECT c.slug, r.recipe_id, r.title, r.prep_time_minutes, r.missing_count,
         r.total_ingredients_count,
         row_number() OVER (PARTITION BY c.slug
           ORDER BY r.missing_count, r.prep_time_minutes NULLS LAST, r.recipe_id) AS rang
  FROM cibles c CROSS JOIN pantry p
  CROSS JOIN LATERAL find_recipes_by_ingredients(
    ARRAY[c.mid]::int[], ARRAY(SELECT unnest(p.ids) EXCEPT SELECT c.mid)::int[],
    'fr', 2, 1, NULL, '{}'::int[], 40) r
  WHERE r.title ~ '^[A-Za-zÀ-ÿ0-9 ''\\-!?,.:()«»&%/]+$'
    AND length(r.title) BETWEEN 6 AND 70
    AND lower(r.title) ~ lower(c.motif)
)
SELECT jsonb_object_agg(slug, recettes)::text
FROM (
  SELECT slug, jsonb_agg(jsonb_build_object(
           'id', recipe_id, 'titre', title, 'minutes', prep_time_minutes,
           'manquants', missing_count, 'ingredients', total_ingredients_count
         ) ORDER BY rang) AS recettes
  FROM (SELECT *, row_number() OVER (PARTITION BY slug ORDER BY rang) AS k FROM res) z
  WHERE k <= ${MAX_RECETTES} GROUP BY slug HAVING count(*) >= ${MIN_RECETTES}
) x;`);
