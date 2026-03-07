# AppsFlyer - Guide de démarrage rapide

## Installation

AppsFlyer est déjà intégré au système de tracking. Aucune installation supplémentaire n'est nécessaire.

## Utilisation basique

### 1. Tracker une vue de page

```typescript
import { trackPageView } from './utils/tracking';

trackPageView();
// Automatiquement envoyé à AppsFlyer avec source de trafic
```

### 2. Tracker un clic de téléchargement

```typescript
import { trackDownloadClick } from './utils/tracking';

trackDownloadClick('apple', 'hero_apple_button');
// Automatiquement envoyé à AppsFlyer
```

### 3. Tracker un événement personnalisé

```typescript
import { sendEvent } from './utils/tracking';

sendEvent('recipe_viewed', {
  recipe_id: '123',
  recipe_name: 'Pasta Carbonara'
});
// Automatiquement envoyé à AppsFlyer avec source de trafic
```

## Détection automatique de la source de trafic

Le système détecte automatiquement:

- **Paramètres UTM**: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- **Identifiants de clics**: `fbclid` (Facebook), `gclid` (Google), `msclkid` (Microsoft)
- **Referrer**: Analyse du domaine du referrer (Google, Facebook, Instagram, TikTok, LinkedIn, Twitter)
- **Fallback**: `direct` si aucune source détectée

## Récupérer les données d'attribution

```typescript
import { getDetectedTrafficSource, getAttributionData } from './utils/appsflyerIntegration';

// Source de trafic détectée
const source = getDetectedTrafficSource();
console.log(source.source);    // 'google', 'facebook', 'direct', etc.
console.log(source.campaign);  // Campagne UTM

// Données d'attribution AppsFlyer
const attribution = getAttributionData();
if (attribution) {
  console.log(attribution.media_source);
  console.log(attribution.campaign);
}
```

## Générer une URL OneLink

```typescript
import { generateOneLinkUrl } from './utils/appsflyerIntegration';

const oneLinkUrl = generateOneLinkUrl({
  promo_code: 'SUMMER2026'
});

// Utiliser dans un lien
<a href={oneLinkUrl} target="_blank">Télécharger l'app</a>
```

## Vérifier que tout fonctionne

1. **Ouvrir DevTools** → Console
2. **Chercher les logs**:
   ```
   [INIT] Identifiant anonyme initialisé: anon_xxx
   [AppsFlyer] Chargement du SDK initié
   [AppsFlyer] Configuration complétée
   ```
3. **Vérifier la source de trafic**:
   ```javascript
   import { getDetectedTrafficSource } from './utils/appsflyerIntegration';
   console.log(getDetectedTrafficSource());
   ```
4. **Vérifier les données d'attribution**:
   ```javascript
   localStorage.getItem('appsflyer_attribution')
   ```

## Paramètres UTM d'exemple

```
https://yummeal.com?utm_source=google&utm_medium=cpc&utm_campaign=summer_2026&utm_content=banner_top&utm_term=recipe
```

Cela sera détecté comme:
- `source`: 'google'
- `medium`: 'cpc'
- `campaign`: 'summer_2026'
- `content`: 'banner_top'
- `term`: 'recipe'

## OneLink URL

```
https://yummeal.onelink.me/iDjc/web?utm_source=google&utm_campaign=summer_2026
```

Utilisez cette URL pour diriger les utilisateurs vers l'app store avec tracking.

## Événements envoyés à AppsFlyer

Tous les événements suivants sont automatiquement envoyés à AppsFlyer:
- `page_view`: Vue de page
- `download_click`: Clic sur bouton de téléchargement
- `start_download`: Début de téléchargement
- Tous les événements personnalisés via `sendEvent()`

Chaque événement inclut:
- `af_user_id`: Identifiant anonyme persistant
- `traffic_source`: Source de trafic détectée
- `traffic_medium`: Médium de trafic
- `traffic_campaign`: Campagne de trafic

## Troubleshooting

### AppsFlyer ne reçoit pas les événements
1. Vérifier que le SDK est chargé: `window.appsFlyer`
2. Vérifier les logs: `[AppsFlyer] Événement envoyé`
3. Vérifier la console pour les erreurs

### Source de trafic non détectée
1. Vérifier les paramètres UTM dans l'URL
2. Vérifier que le referrer n'est pas bloqué
3. Vérifier les logs: `[AppsFlyer] Erreur lors de la détection`

## Documentation complète

Voir `APPSFLYER_INTEGRATION.md` pour la documentation complète.
