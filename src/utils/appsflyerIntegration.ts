/**
 * Intégration AppsFlyer pour le tracking des utilisateurs
 * Capture la source de trafic et envoie les événements à AppsFlyer
 */

import { getAnonymousId } from './anonymousId';

// Configuration AppsFlyer
const APPSFLYER_DEV_KEY = 'KqkTfhXvWx5Lm9nPqRsT';
const APPSFLYER_APP_ID = 'id6744942441';
const APPSFLYER_WEB_SDK_URL = 'https://cdn-go.appsflyer.com/js/v6.14.3/web_sdk.min.js';
const ONELINK_URL = 'https://yummeal.onelink.me/iDjc/web';

interface TrafficSource {
  source: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer?: string;
  fbclid?: string;
  gclid?: string;
  msclkid?: string;
}

interface AppsFlyerSDK {
  initSdk: (config: AppsFlyerConfig) => void;
  setCustomerUserId: (userId: string) => void;
  setAdditionalData: (data: Record<string, string>) => void;
  start: () => void;
  logEvent: (eventName: string, eventValue?: Record<string, unknown>) => void;
}

interface AppsFlyerConfig {
  devKey: string;
  appId: string;
  isDebug: boolean;
  onConversionDataSuccess: (data: ConversionData) => void;
  onConversionDataFailure: (error: AppsFlyerError) => void;
  onAppOpenAttribution: (data: AttributionData) => void;
  onAttributionFailure: (error: AppsFlyerError) => void;
  timeToWaitForATTUserAuthorization: number;
  manualStart: boolean;
}

interface ConversionData {
  status: string;
  media_source?: string;
  campaign?: string;
  adset?: string;
  ad?: string;
  [key: string]: unknown;
}

interface AttributionData {
  [key: string]: unknown;
}

interface AppsFlyerError {
  message?: string;
  [key: string]: unknown;
}

/**
 * Récupère la source de trafic depuis l'URL et les cookies
 */
function getTrafficSource(): TrafficSource {
  const source: TrafficSource = {
    source: 'direct',
    referrer: typeof document !== 'undefined' ? (document.referrer || 'direct') : 'direct'
  };

  if (typeof window === 'undefined') {
    return source;
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);

    // Paramètres UTM
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    const utmContent = urlParams.get('utm_content');
    const utmTerm = urlParams.get('utm_term');

    if (utmSource) {
      source.source = utmSource;
      source.medium = utmMedium || undefined;
      source.campaign = utmCampaign || undefined;
      source.content = utmContent || undefined;
      source.term = utmTerm || undefined;
    }

    // Identifiants de clics (Facebook, Google, Microsoft)
    const fbclid = urlParams.get('fbclid');
    const gclid = urlParams.get('gclid');
    const msclkid = urlParams.get('msclkid');

    if (fbclid) {
      source.source = 'facebook';
      source.fbclid = fbclid;
    }
    if (gclid) {
      source.source = 'google';
      source.gclid = gclid;
    }
    if (msclkid) {
      source.source = 'microsoft';
      source.msclkid = msclkid;
    }

    // Déterminer la source depuis le referrer si pas d'UTM
    if (!utmSource && source.referrer && source.referrer !== 'direct') {
      const referrerUrl = new URL(source.referrer);
      const referrerDomain = referrerUrl.hostname.toLowerCase();

      if (referrerDomain.includes('google')) {
        source.source = 'google';
      } else if (referrerDomain.includes('facebook')) {
        source.source = 'facebook';
      } else if (referrerDomain.includes('instagram')) {
        source.source = 'instagram';
      } else if (referrerDomain.includes('tiktok')) {
        source.source = 'tiktok';
      } else if (referrerDomain.includes('linkedin')) {
        source.source = 'linkedin';
      } else if (referrerDomain.includes('twitter') || referrerDomain.includes('x.com')) {
        source.source = 'twitter';
      } else {
        source.source = referrerDomain;
      }
    }
  } catch (error) {
    console.error('[AppsFlyer] Erreur lors de la détection de la source de trafic:', error);
  }

  return source;
}

/**
 * Initialise le SDK AppsFlyer
 */
export function initAppsFlyer(): void {
  if (typeof window === 'undefined') {
    console.warn('[AppsFlyer] Environnement non-navigateur, initialisation ignorée');
    return;
  }

  try {
    // Charger le SDK AppsFlyer
    const script = document.createElement('script');
    script.async = true;
    script.src = APPSFLYER_WEB_SDK_URL;

    script.onload = () => {
      configureAppsFlyer();
    };

    script.onerror = () => {
      console.error('[AppsFlyer] Erreur lors du chargement du SDK');
    };

    document.head.appendChild(script);

    console.log('[AppsFlyer] Chargement du SDK initié');
  } catch (error) {
    console.error('[AppsFlyer] Erreur lors de l\'initialisation:', error);
  }
}

/**
 * Configure AppsFlyer après le chargement du SDK
 */
function configureAppsFlyer(): void {
  // Vérifier que le SDK est chargé
  const windowWithAppsFlyer = window as unknown as { appsFlyer?: AppsFlyerSDK };
  if (typeof windowWithAppsFlyer.appsFlyer === 'undefined') {
    console.warn('[AppsFlyer] SDK non disponible après chargement');
    return;
  }

  try {
    const windowWithAppsFlyer = window as unknown as { appsFlyer?: AppsFlyerSDK };
    const appsFlyer = windowWithAppsFlyer.appsFlyer;
    if (!appsFlyer) {
      console.warn('[AppsFlyer] SDK non disponible');
      return;
    }

    const anonId = getAnonymousId();
    const trafficSource = getTrafficSource();

    // Configuration initiale
    appsFlyer.initSdk({
      devKey: APPSFLYER_DEV_KEY,
      appId: APPSFLYER_APP_ID,
      isDebug: false,
      onConversionDataSuccess: handleConversionData,
      onConversionDataFailure: handleConversionDataFailure,
      onAppOpenAttribution: handleAppOpenAttribution,
      onAttributionFailure: handleAttributionFailure,
      timeToWaitForATTUserAuthorization: 10,
      manualStart: true
    });

    // Définir les identifiants utilisateur
    appsFlyer.setCustomerUserId(anonId);
    appsFlyer.setAdditionalData({
      af_channel: trafficSource.source,
      af_campaign: trafficSource.campaign || 'organic',
      af_content: trafficSource.content || '',
      af_term: trafficSource.term || '',
      af_referrer: trafficSource.referrer || 'direct'
    });

    // Démarrer le tracking
    appsFlyer.start();

    console.log('[AppsFlyer] Configuration complétée', {
      userId: anonId,
      source: trafficSource.source,
      campaign: trafficSource.campaign
    });
  } catch (error) {
    console.error('[AppsFlyer] Erreur lors de la configuration:', error);
  }
}

/**
 * Gère les données de conversion AppsFlyer
 */
function handleConversionData(conversionData: ConversionData): void {
  try {
    console.log('[AppsFlyer] Données de conversion reçues:', conversionData);

    if (conversionData.status === 'success') {
      const mediaSource = conversionData.media_source;
      const campaign = conversionData.campaign;
      const adset = conversionData.adset;
      const ad = conversionData.ad;

      console.log('[AppsFlyer] Attribution détectée:', {
        mediaSource,
        campaign,
        adset,
        ad
      });

      // Stocker les données d'attribution en localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('appsflyer_attribution', JSON.stringify({
          mediaSource,
          campaign,
          adset,
          ad,
          timestamp: new Date().toISOString()
        }));
      }
    }
  } catch (error) {
    console.error('[AppsFlyer] Erreur lors du traitement des données de conversion:', error);
  }
}

/**
 * Gère les erreurs de données de conversion
 */
function handleConversionDataFailure(error: AppsFlyerError): void {
  console.warn('[AppsFlyer] Erreur lors de la récupération des données de conversion:', error);
}

/**
 * Gère l'attribution à l'ouverture de l'app
 */
function handleAppOpenAttribution(attributionData: AttributionData): void {
  try {
    console.log('[AppsFlyer] Attribution à l\'ouverture de l\'app:', attributionData);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('appsflyer_app_open_attribution', JSON.stringify({
        ...attributionData,
        timestamp: new Date().toISOString()
      }));
    }
  } catch (error) {
    console.error('[AppsFlyer] Erreur lors du traitement de l\'attribution:', error);
  }
}

/**
 * Gère les erreurs d'attribution
 */
function handleAttributionFailure(error: AppsFlyerError): void {
  console.warn('[AppsFlyer] Erreur lors de l\'attribution:', error);
}

/**
 * Envoie un événement à AppsFlyer
 */
export function trackAppsFlyerEvent(eventName: string, eventValue?: Record<string, unknown>): void {
  const windowWithAppsFlyer = window as unknown as { appsFlyer?: AppsFlyerSDK };
  if (typeof windowWithAppsFlyer.appsFlyer === 'undefined') {
    console.warn('[AppsFlyer] SDK non disponible, événement non envoyé');
    return;
  }

  try {
    const windowWithAppsFlyer = window as unknown as { appsFlyer?: AppsFlyerSDK };
    const appsFlyer = windowWithAppsFlyer.appsFlyer;
    if (!appsFlyer) {
      console.warn('[AppsFlyer] SDK non disponible');
      return;
    }

    const anonId = getAnonymousId();

    const eventData = {
      af_user_id: anonId,
      ...eventValue
    };

    appsFlyer.logEvent(eventName, eventData);

    console.log('[AppsFlyer] Événement envoyé:', {
      eventName,
      eventData
    });
  } catch (error) {
    console.error('[AppsFlyer] Erreur lors de l\'envoi de l\'événement:', error);
  }
}

/**
 * Récupère les données d'attribution stockées
 */
export function getAttributionData(): ConversionData | null {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  try {
    const attributionStr = localStorage.getItem('appsflyer_attribution');
    return attributionStr ? (JSON.parse(attributionStr) as ConversionData) : null;
  } catch (error) {
    console.error('[AppsFlyer] Erreur lors de la récupération des données d\'attribution:', error);
    return null;
  }
}

/**
 * Récupère la source de trafic détectée
 */
export function getDetectedTrafficSource(): TrafficSource {
  return getTrafficSource();
}

/**
 * Génère l'URL OneLink avec les paramètres de tracking
 */
export function generateOneLinkUrl(additionalParams?: Record<string, string>): string {
  const params = new URLSearchParams();

  // Ajouter les paramètres UTM actuels
  if (typeof window !== 'undefined') {
    const currentParams = new URLSearchParams(window.location.search);
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

    utmParams.forEach(param => {
      const value = currentParams.get(param);
      if (value) {
        params.append(param, value);
      }
    });
  }

  // Ajouter les paramètres supplémentaires
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      params.append(key, value);
    });
  }

  const queryString = params.toString();
  return queryString ? `${ONELINK_URL}?${queryString}` : ONELINK_URL;
}
