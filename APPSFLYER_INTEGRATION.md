# Attribution web Yummeal

## Décision d’intégration

Le site retient OneLink comme unique chemin AppsFlyer web → app. Aucun SDK
AppsFlyer n’est chargé dans le navigateur tant qu’un Web SDK ID dédié au site
n’a pas été fourni et configuré.

Cette séparation est obligatoire : la documentation AppsFlyer actuelle décrit le
Web SDK avec un `webAppId`/Web SDK ID distinct de la clé mobile, via la file
globale `AF`. L’ancien code utilisait l’interface mobile `devKey` + `appId` et
deux anciens CDN ; il ne correspondait donc pas au contrat Web SDK.

Références officielles :

- [Integrate AppsFlyer Web SDK](https://support.appsflyer.com/hc/en-us/articles/43485611331473-Integrate-AppsFlyer-Web-SDK)
- [PBA Web SDK integration guide](https://support.appsflyer.com/hc/en-us/articles/360001610038-PBA-Web-SDK-integration-guide)
- [OneLink Smart Script V2](https://dev.appsflyer.com/hc/hc/docs/dl_smart_script_v2)

## Flux actif

- `captureAcquisition` conserve pendant sept jours les paramètres de première
  visite : UTM, `fbclid`, `fbc`, `gclid`, `ttclid` et paramètres OneLink utiles.
- Les CTA construisent un OneLink `yummealapp.onelink.me` au moment du clic,
  avec `pid=website`, la campagne de page et l’URL store de la plateforme.
- `page_view`, `download_click` et les événements de conversion sont envoyés à
  l’API Yummeal. Le backend relaie les événements web à Meta CAPI.
- Le Pixel Meta reçoit le même événement de conversion que CAPI avec le même
  identifiant : navigateur `eventID`, serveur `event_id`.
- Un clic de téléchargement émet un seul événement Pixel `Lead`, aligné sur le
  mapping CAPI de `download_click` ; il n’émet plus un second `download_click`
  artificiel.

Le fichier `src/utils/appsflyerIntegration.ts` conserve uniquement la détection
de source et la construction de lien OneLink pour limiter le changement
d’architecture. Il ne configure ni ne charge de SDK.

## Vérifications locales

```bash
npm test -- --test-name-pattern='AppsFlyer|Meta|OneLink|tracking'
npm run build:only
npm run lint
```

## Validation live requise

Après publication, vérifier avec une URL de campagne réelle que le clic ouvre le
OneLink attendu et que l’installation apparaît dans AppsFlyer. Dans Meta Events
Manager, vérifier que le Pixel et CAPI portent le même nom d’événement et le
même identifiant, avec une déduplication effective. Ces contrôles nécessitent
les comptes externes et ne sont pas réalisés par le dépôt.
