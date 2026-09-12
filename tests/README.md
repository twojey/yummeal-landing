# Tests du site

Aucune dépendance à installer : le runner est celui intégré à Node
(`node --test`). C'est délibéré — un garde-fou ne doit pas pouvoir tomber en
panne à cause d'une mise à jour d'outillage.

## Commandes

| Commande | Ce qu'elle vérifie | Réseau | Build requis |
|---|---|---|---|
| `npm test` | Tout ce qui est statique + les invariants sur `dist/` s'il existe | non | non (les tests `dist/` se sautent explicitement) |
| `npm run test:seo` | Les invariants sur le HTML généré et la parité routes/sitemaps | non | **oui** |
| `npm run build` | Le build **puis** `test:seo` — un invariant qui régresse fait échouer le build | non | — |
| `npm run build:only` | Le build sans le garde-fou. **Échappatoire pour un déploiement urgent**, pas un raccourci quotidien | non | — |
| `npm run smoke` | La production réellement servie (backend + site) | **oui** | non |

## Pourquoi chaque fichier existe

Ces tests ne sont pas de la couverture pour la couverture : chacun verrouille
une panne qui s'est produite **sans faire échouer ni le build ni le lint**.

### `api-urls.test.mjs` — la panne silencieuse

Le backend a migré de `yummeal-server.deno.dev` (sunset de Deno Deploy Classic)
vers `yummeal-server.yumhack.deno.net`. L'URL était **recopiée dans trois
fichiers** ; deux copies n'ont pas suivi. Résultat : la page
`/supprimer-mon-compte` — exigée par Apple et par Google Play — appelait un
domaine qui ne répond plus, et le tracking envoyait ses événements dans le vide.
Le site se déployait vert.

Le correctif structurel est `API_BASE_URL` dans `src/config.ts`, **source
unique**. Le test interdit toute nouvelle copie, et maintient une liste d'hôtes
morts dont la réapparition est un échec.

Il a aussi trouvé, à sa première exécution, **cinq liens App Store portant
l'ancien slug** que la relecture manuelle avait laissés passer.

> **Migration d'hôte** : changer l'URL dans `src/config.ts`, puis ajouter
> l'ancien hôte à `HOTES_MORTS` dans `tests/api-urls.test.mjs`. Ne jamais
> retirer une entrée de cette liste.

### `routes.test.mjs` — les routes fantômes

`/supprimer-mon-compte` et `/delete-account` étaient de vraies routes React mais
absentes de `staticRoutes` dans `scripts/prerender.mjs`. Netlify servait donc le
HTML de l'accueil pour ces URL, canonical vers `/` compris.

Le test vérifie que toute route déclarée est **soit prérendue, soit redirigée en
301**, que les redirections ne pointent pas dans le vide, que les pages de
conformité store existent, et que sitemaps et pages générées se correspondent
exactement dans les deux sens.

### `seo-dist.test.mjs` — les invariants du HTML généré

Il verrouille des régressions déjà survenues à grande échelle : 165 pages
portant le titre de l'accueil dans leurs `twitter:*`, 63 pages sans aucun
JSON-LD, aucun fil d'Ariane sur tout le site, 24 titles tronqués en SERP, 91
pages sur 166 sous le seuil de découverte interne, et un prix de 0 € annoncé en
données structurées pour un produit par abonnement.

> Un invariant qui ne tient plus **se corrige, il ne s'assouplit pas**. Le seuil
> écrit dans le test porte la raison du seuil. La seule tolérance chiffrée
> (`TOLERANCE_SOUS_MAILLAGE = 3`) correspond à deux pages au maximum structurel
> de leur silo et à une page utilitaire — la relever demande une raison écrite.

### `regles-editoriales.test.mjs` — les formulations qui coûtent

Deux règles produit, vérifiées sur les sources **et** sur le HTML généré :

- **« recettes générées par IA » est interdit partout.** C'est factuellement
  faux — les recettes sont écrites par des humains, l'application les trie — et
  le dire dégrade le produit auprès d'un public qui s'en méfie.
- **« gratuit » doit être scopé au téléchargement.** L'usage complet est par
  abonnement. Trois occurrences avaient passé la relecture, dont une dans la
  meta description de l'accueil.

La seconde règle ne s'applique qu'aux **métadonnées** et au **corps de nos
propres pages** : dans un comparatif, écrire que SuperCook est un agrégateur
gratuit financé par la publicité est un fait sur un tiers, pas une promesse sur
Yummeal.

Ce fichier interdit aussi de déclarer un `AggregateRating` sans note réelle
(fausse preuve sociale, et détectable) et vérifie que les tarifs des données
structurées correspondent à la grille réelle.

### `scripts/smoke.mjs` — ce que les tests statiques ne peuvent pas voir

Les tests ci-dessus sont statiques : ils confirment que l'URL configurée est
celle qu'on croit et qu'aucun hôte **connu** comme mort ne réapparaît. Ils ne
peuvent pas dire qu'un hôte encore réputé bon vient de tomber — ce qui est
précisément ce qui s'est passé.

Le smoke test appelle la production : santé du backend, endpoint de suppression
de compte (un **401** est le succès attendu : il prouve que la route existe et
que l'hôte répond), HTML réellement servi sur la page de suppression de compte,
statut 404 sur une URL inexistante, 301 de l'alias anglophone, absence de
sourcemap, sitemaps servis.

Il est **hors du build** : un build ne doit pas dépendre du réseau. À lancer
**après chaque déploiement**, et dès qu'une migration d'hôte est annoncée.

## Ajouter un test

La règle : un test nouveau documente **la panne qu'il empêche**, pas le
comportement qu'il décrit. Si on ne peut pas nommer ce qui a cassé ou ce qui
casserait, le test n'a probablement pas sa place ici.

Et avant de le considérer terminé, **le faire échouer** : injecter la régression,
vérifier que le test la voit, puis la retirer. Un garde-fou qui ne peut pas
échouer ne garde rien.
