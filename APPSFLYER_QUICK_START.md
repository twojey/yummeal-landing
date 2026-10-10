# AppsFlyer — démarrage rapide

Le site utilise OneLink pour l’attribution des clics web vers les stores. Le
SDK mobile AppsFlyer n’est pas chargé dans le navigateur. Le Web SDK officiel
ne doit être ajouté qu’avec le Web SDK ID distinct fourni dans AppsFlyer.

## Parcours de téléchargement

Les composants `DownloadButtons` et `TrackedStoreLink` appellent
`trackDownloadClick`, puis réécrivent le `href` dans le même geste utilisateur
avec un lien OneLink. Les paramètres conservés sont les UTM, `fbclid`, `fbc` et
`ttclid`, ainsi que les paramètres de campagne et de deep link déjà présents.

## Événements

- `trackPageView` envoie `page_view` à l’API Yummeal et un seul `PageView` au
  Pixel Meta.
- `trackDownloadClick` envoie `download_click` à l’API et un seul `Lead` au
  Pixel. Le backend mappe `download_click` vers `Lead` CAPI.
- Les deux copies Meta partagent `event_id` côté serveur et `eventID` côté
  navigateur pour la déduplication.

## Test local

```bash
npm test
npm run build:only
npm run lint
```

Pour la procédure et les limites de validation live, voir
[`APPSFLYER_INTEGRATION.md`](./APPSFLYER_INTEGRATION.md).
