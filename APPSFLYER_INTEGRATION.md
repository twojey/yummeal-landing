# Intégration AppsFlyer - Yummeal Website

## Vue d'ensemble

L'intégration AppsFlyer permet de suivre les utilisateurs du site website et de capturer la source de trafic pour la transmettre à AppsFlyer. Cela facilite l'attribution des conversions et l'analyse du parcours utilisateur.

## Configuration

### Constantes AppsFlyer
```typescript
const APPSFLYER_DEV_KEY = 'KqkTfhXvWx5Lm9nPqRsT';
const APPSFLYER_APP_ID = 'id6744942441';
const APPSFLYER_WEB_SDK_URL = 'https://cdn-go.appsflyer.com/js/v6.14.3/web_sdk.min.js';
const ONELINK_URL = 'https://yummeal.onelink.me/iDjc/web';
```

## Fonctionnalités principales

### 1. Chargement du SDK dans le `<head>`

Le script officiel AppsFlyer est injecté directement dans `index.html` pour garantir son exécution avant le bootstrap React et permettre l'affichage immédiat des Smart Banners.

```html
<!-- index.html -->
<script
  id="appsflyer-web-sdk"
  async
  src="https://cdn-go.appsflyer.com/js/v6.14.3/web_sdk.min.js"
  onload="window.dispatchEvent(new Event('appsflyer:sdk-ready'))"
></script>
```

Le module `initAppsFlyer()` détecte ce script injecté et se contente de configurer le SDK (fallback CDN conservé si le tag n'est pas présent ou échoue).

### 2. Détection automatique de la source de trafic

Le service détecte automatiquement la source de trafic depuis:

**Paramètres UTM** (priorité haute):
- `utm_source`: Source du trafic (google, facebook, etc.)
- `utm_medium`: Médium (cpc, organic, social, etc.)
- `utm_campaign`: Campagne
- `utm_content`: Contenu
- `utm_term`: Terme recherché

**Identifiants de clics** (priorité moyenne):
- `fbclid`: Facebook Click ID → source = 'facebook'
- `gclid`: Google Click ID → source = 'google'
- `msclkid`: Microsoft Click ID → source = 'microsoft'

**Referrer** (priorité basse):
- Analyse le domaine du referrer pour détecter la source
- Supporte: Google, Facebook, Instagram, TikTok, LinkedIn, Twitter

**Fallback**:
- `source = 'direct'` si aucune source détectée

### 2. Initialisation du SDK

```typescript
import { initAppsFlyer } from './utils/appsflyerIntegration';

// Au démarrage de l'application
initAppsFlyer();
```

**Processus d'initialisation**:
1. Chargement du SDK AppsFlyer depuis le CDN
2. Configuration avec les clés API
3. Définition de l'ID utilisateur (anon_id)
4. Enrichissement avec les données de trafic
5. Démarrage du tracking

### 3. Tracking des événements

Tous les événements envoyés via `sendEvent()` sont automatiquement envoyés à AppsFlyer avec:
- `af_user_id`: Identifiant anonyme
- `traffic_source`: Source de trafic détectée
- `traffic_medium`: Médium de trafic
- `traffic_campaign`: Campagne de trafic

```typescript
import { sendEvent } from './utils/tracking';

// Événement automatiquement envoyé à AppsFlyer
sendEvent('custom_event', {
  custom_field: 'value'
});
```

### 4. Événements de téléchargement

Les clics sur les boutons de téléchargement sont automatiquement trackés:

```typescript
import { trackDownloadClick } from './utils/tracking';

trackDownloadClick('apple', 'hero_apple_button');
// Envoyé à AppsFlyer avec source de trafic
```

## Architecture

### Fichier: `src/utils/appsflyerIntegration.ts`

**Interfaces TypeScript**:
- `TrafficSource`: Source de trafic détectée
- `AppsFlyerSDK`: Interface du SDK AppsFlyer
- `AppsFlyerConfig`: Configuration du SDK
- `ConversionData`: Données de conversion
- `AttributionData`: Données d'attribution
- `AppsFlyerError`: Erreurs AppsFlyer

**Fonctions principales**:

#### `initAppsFlyer()`
Initialise le SDK AppsFlyer en chargeant le script depuis le CDN.

#### `getTrafficSource(): TrafficSource`
Détecte et retourne la source de trafic depuis l'URL et les cookies.

**Retour**:
```typescript
{
  source: 'google',        // Source détectée
  medium: 'cpc',          // Médium (optionnel)
  campaign: 'summer_2026', // Campagne (optionnel)
  content: 'banner_top',  // Contenu (optionnel)
  term: 'recipe',         // Terme (optionnel)
  referrer: 'google.com', // Referrer
  fbclid: '...',          // Facebook Click ID (optionnel)
  gclid: '...',           // Google Click ID (optionnel)
  msclkid: '...'          // Microsoft Click ID (optionnel)
}
```

#### `trackAppsFlyerEvent(eventName: string, eventValue?: Record<string, unknown>)`
Envoie un événement à AppsFlyer.

```typescript
trackAppsFlyerEvent('purchase', {
  af_revenue: 29.99,
  af_currency: 'EUR',
  af_content_id: 'recipe_123'
});
```

#### `getAttributionData(): ConversionData | null`
Récupère les données d'attribution stockées en localStorage.

```typescript
const attribution = getAttributionData();
if (attribution) {
  console.log('Media Source:', attribution.media_source);
  console.log('Campaign:', attribution.campaign);
}
```

#### `getDetectedTrafficSource(): TrafficSource`
Récupère la source de trafic détectée.

```typescript
const source = getDetectedTrafficSource();
console.log('Source:', source.source);
console.log('Campaign:', source.campaign);
```

#### `generateOneLinkUrl(additionalParams?: Record<string, string>): string`
Génère une URL OneLink avec les paramètres de tracking.

```typescript
const oneLinkUrl = generateOneLinkUrl({
  custom_param: 'value'
});
// Retourne: https://yummeal.onelink.me/iDjc/web?utm_source=google&utm_campaign=summer_2026&custom_param=value
```

## Flux de données

```
1. Utilisateur arrive sur le site
   ↓
2. initAppsFlyer() charge le SDK
   ↓
3. getTrafficSource() détecte la source
   ↓
4. SDK configuré avec source et anon_id
   ↓
5. Événement déclenché (trackPageView, trackDownloadClick, etc.)
   ↓
6. sendEvent() enrichit avec traffic_source, traffic_medium, traffic_campaign
   ↓
7. Événement envoyé à AppsFlyer avec trackAppsFlyerEvent()
   ↓
8. AppsFlyer reçoit l'événement avec attribution
```

## Stockage des données

### localStorage

**`appsflyer_attribution`**:
```json
{
  "media_source": "google",
  "campaign": "summer_2026",
  "adset": "recipe_ads",
  "ad": "banner_top",
  "timestamp": "2026-03-07T21:17:00.000Z"
}
```

**`appsflyer_app_open_attribution`**:
```json
{
  "is_first_launch": true,
  "af_status": "Organic",
  "timestamp": "2026-03-07T21:17:00.000Z"
}
```

## Exemples d'utilisation

### Exemple 1: Tracker une vue de page avec source de trafic

```typescript
import { trackPageView } from './utils/tracking';

// Automatiquement enrichi avec:
// - traffic_source: 'google'
// - traffic_medium: 'cpc'
// - traffic_campaign: 'summer_2026'
trackPageView();
```

### Exemple 2: Tracker un événement personnalisé

```typescript
import { sendEvent } from './utils/tracking';

sendEvent('recipe_viewed', {
  recipe_id: '123',
  recipe_name: 'Pasta Carbonara'
});
// Automatiquement envoyé à AppsFlyer avec source de trafic
```

### Exemple 3: Tracker un clic de téléchargement

```typescript
import { trackDownloadClick } from './utils/tracking';

trackDownloadClick('apple', 'hero_apple_button');
// Automatiquement envoyé à AppsFlyer avec:
// - af_user_id: anon_id
// - traffic_source: source détectée
// - platform: 'apple'
// - button_location: 'hero_apple_button'
```

### Exemple 4: Récupérer les données d'attribution

```typescript
import { getAttributionData, getDetectedTrafficSource } from './utils/appsflyerIntegration';

const attribution = getAttributionData();
const source = getDetectedTrafficSource();

console.log('Attribution:', attribution);
console.log('Source détectée:', source);
```

### Exemple 5: Générer une URL OneLink

```typescript
import { generateOneLinkUrl } from './utils/appsflyerIntegration';

const oneLinkUrl = generateOneLinkUrl({
  promo_code: 'SUMMER2026'
});

// Utiliser dans un lien
<a href={oneLinkUrl} target="_blank">Télécharger l'app</a>
```

## Événements AppsFlyer standard

AppsFlyer supporte les événements standard suivants:

| Événement | Description |
|-----------|-------------|
| `af_purchase` | Achat effectué |
| `af_add_to_cart` | Ajout au panier |
| `af_view_content` | Affichage de contenu |
| `af_search` | Recherche effectuée |
| `af_rate` | Évaluation donnée |
| `af_tutorial_completion` | Tutoriel complété |
| `af_login` | Connexion utilisateur |
| `af_subscribe` | Abonnement |

## Paramètres d'événement standard

```typescript
{
  af_revenue: 29.99,           // Montant
  af_currency: 'EUR',          // Devise
  af_content_id: 'product_123', // ID du contenu
  af_content_type: 'product',   // Type de contenu
  af_content_name: 'Pasta',     // Nom du contenu
  af_quantity: 1,               // Quantité
  af_user_id: 'anon_xxx'        // ID utilisateur
}
```

## Débogage

### Logs de diagnostic

```javascript
// Console logs
[AppsFlyer] Chargement du SDK initié
[AppsFlyer] Configuration complétée
[AppsFlyer] Données de conversion reçues
[AppsFlyer] Attribution détectée
[AppsFlyer] Événement envoyé
```

### Vérifier la source de trafic détectée

```javascript
// Dans la console du navigateur
import { getDetectedTrafficSource } from './utils/appsflyerIntegration';
console.log(getDetectedTrafficSource());
```

### Vérifier les données d'attribution

```javascript
// Dans la console du navigateur
localStorage.getItem('appsflyer_attribution')
```

## Vérification & QA

1. Installer l'extension Chrome **AppsFlyer Integration Helper**
2. Ouvrir le site (HTTPS) et vérifier:
   - `AF('start')` détecté
   - Smart Banner visible en mode mobile
   - Champ `af_user_id` renseigné
3. Inspecter `localStorage.appsflyer_attribution`
4. Tester différents ensembles d'UTM pour valider la détection de source

## Performance

- **Initialisation**: ~50ms (chargement du SDK)
- **Détection de source**: ~2ms
- **Envoi d'événement**: ~5ms
- **Total par événement**: ~7ms (après initialisation)

## Sécurité

- **Pas de données sensibles**: Seuls les identifiants de clics et paramètres UTM sont capturés
- **localStorage sécurisé**: Pas d'accès cross-domain
- **HTTPS**: Toutes les communications avec AppsFlyer sont chiffrées
- **Consentement**: Respecte les paramètres de consentement du navigateur

## Intégration avec d'autres services

### Avec Facebook Pixel
Les événements sont automatiquement envoyés à Facebook Pixel avec les mêmes données.

### Avec l'API Deno
Les événements incluent la source de trafic dans les propriétés envoyées à l'API.

### Avec TikTok Pixel
Les événements sont automatiquement envoyés à TikTok Pixel avec les mêmes données.

## Vérification & QA

1. Installer l'extension Chrome **AppsFlyer Integration Helper**
2. Ouvrir le site en HTTPS et vérifier:
   - `AF('start')` détecté
   - Smart Banner affichée (mobile)
   - `af_user_id` renseigné
3. Contrôler `localStorage.appsflyer_attribution`
4. Forcer différents paramètres UTM pour valider la détection de source

## Troubleshooting

### AppsFlyer SDK ne se charge pas
- Vérifier la connexion Internet
- Vérifier que le CDN AppsFlyer est accessible
- Vérifier les logs de la console pour les erreurs

### Source de trafic non détectée
- Vérifier que les paramètres UTM sont corrects
- Vérifier que le referrer n'est pas bloqué
- Vérifier les logs: `[AppsFlyer] Erreur lors de la détection de la source de trafic`

### Événements non envoyés à AppsFlyer
- Vérifier que le SDK est chargé: `window.appsFlyer`
- Vérifier les logs: `[AppsFlyer] Événement envoyé`
- Vérifier la console pour les erreurs

## Prochaines étapes

1. **Tester en production**: Vérifier que les événements arrivent dans AppsFlyer
2. **Configurer les conversions**: Définir les événements de conversion dans AppsFlyer
3. **Analyser l'attribution**: Utiliser le dashboard AppsFlyer pour analyser les sources de trafic
4. **Optimiser les campagnes**: Ajuster les campagnes en fonction des données d'attribution
