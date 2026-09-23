/**
 * Régénère src/data/statistiquesRecettes.json et
 * public/datasets/statistiques-recettes-par-difficulte.csv.
 *
 * POURQUOI CE SCRIPT N'EST PAS DANS LE BUILD. Même raison que
 * build-recettes-realisables.mjs : il interroge la base de production, et ce
 * dépôt n'a aucune dépendance de base de données. La requête ci-dessous se
 * lance telle quelle via le MCP Supabase (execute_sql, projet
 * vqibuydjokujdqslczdu) ou psql, et son résultat se recopie à la main dans
 * les deux fichiers — ce qui est aussi le seul moment où l'on peut repérer un
 * chiffre absurde avant qu'il devienne public.
 *
 * CE QUE LA REQUÊTE FAIT, ET POURQUOI
 *
 * - Exclut `moderation_status = 'rejected'` : mêmes recettes que celles
 *   réellement servies dans l'application.
 * - `calories` en base est le total de la RECETTE, pas une valeur par
 *   portion (vérifié en tirant un échantillon aléatoire de 15 recettes avant
 *   d'écrire ce script) : diviser par `servings` est nécessaire, sinon la
 *   page publierait des valeurs 4 à 8 fois trop hautes.
 * - Exclut les ratios calories/portion hors [30, 3000] : sous 30, ce sont des
 *   fiches condiment/garniture comptées comme un plat ; au-dessus de 3000,
 *   des plats visiblement agrégés sur une seule portion (gâteau entier =
 *   « 1 part »). Sans ce filtre, ~5 % des recettes auraient tiré la moyenne
 *   vers des valeurs non plausibles ; la MÉDIANE seule ne suffit pas à s'en
 *   protéger sur un sous-groupe de faible effectif (« hard », n=122).
 * - MÉDIANE plutôt que moyenne partout : plus robuste à la queue longue
 *   encore présente après le filtre ci-dessus.
 * - `difficulty` a 5 valeurs observées en base, pas 4 : 'easy', 'medium',
 *   'intermediate', 'hard', et NULL (~11,7 % des lignes). 'intermediate' et
 *   'hard' se chevauchent dans le temps de préparation médian (150 min vs
 *   120 min) — un effectif de 79 et 122 respectivement ne permet pas de
 *   trancher si c'est un vrai signal ou du bruit d'échantillon ; la page doit
 *   le dire, pas lisser l'inversion.
 */

console.error(
  `Ce script documente la génération de src/data/statistiquesRecettes.json\n` +
    `et de public/datasets/statistiques-recettes-par-difficulte.csv.\n` +
    `\n` +
    `Il lui manque un client Postgres pour s'exécuter (voir la note en tête de\n` +
    `build-recettes-realisables.mjs, même choix). La requête complète est\n` +
    `reproduite ci-dessous ; elle se lance telle quelle via le MCP Supabase.\n`
);

console.log(`-- Requête de régénération
with base as (
  select difficulty, prep_time_minutes,
         case when servings > 0 and calories is not null
              and calories::numeric/servings between 30 and 3000
              then calories::numeric/servings end as cal_serv
  from recipe
  where moderation_status is distinct from 'rejected'
)
select
  coalesce(difficulty,'non renseigné') as difficulty,
  count(*) as n,
  count(*) filter (where prep_time_minutes is not null) as n_prep,
  round(percentile_cont(0.5) within group (order by prep_time_minutes)) as median_prep,
  count(*) filter (where cal_serv is not null) as n_cal,
  round(percentile_cont(0.5) within group (order by cal_serv)) as median_cal_serving
from base
group by difficulty
order by median_prep nulls last;`);
