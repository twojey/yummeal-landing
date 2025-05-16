/**
 * Système de tracking pour Yummeal
 * 
 * Ce module gère l'envoi d'événements de tracking vers:
 * - Notre API Deno
 * - Facebook Pixel
 */

import { trackFacebookEvent } from './facebookPixel';

// Configuration
const API_URL = 'https://yummeal-server.deno.dev/tracking';

// Types
type Platform = 'apple' | 'google';

/**
 * @deprecated Utiliser les nouveaux types et fonctions
 */
interface TrackingEvent {
  platform: Platform;
  location: string;
  ip?: string;
  userAgent?: string;
}

/**
 * Envoie un événement à notre API Deno
 * @param eventName Nom de l'événement
 * @param data Données associées à l'événement
 * @returns Promise<boolean> Succès de l'envoi
 */
const sendToDeno = async (eventName: string, data: Record<string, unknown>): Promise<boolean> => {
  // Préparer les données avec métadonnées standard
  const eventData = {
    name: eventName,
    properties: {
      ...data,
      timestamp: new Date().toISOString(),
      source: 'yummeal_website'
    }
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('[TRACKING] Erreur d\'envoi à l\'API:', error);
    // Sauvegarder l'événement pour réessayer plus tard
    saveFailedEvent(eventData);
    return false;
  }
};

/**
 * Envoie un événement à toutes les destinations configurées
 * @param eventName Nom de l'événement
 * @param data Données associées à l'événement
 */
export const sendEvent = async (eventName: string, data: Record<string, unknown> = {}): Promise<void> => {
  // Envoi parallèle aux différentes destinations
  await Promise.all([
    sendToDeno(eventName, data),
    Promise.resolve(trackFacebookEvent(eventName, data))
  ]);
};

/**
 * Enregistre une vue de page
 */
export const trackPageView = (): void => {
  // Collecter les données de la page
  const pageData = {
    page_url: window.location.href,
    page_title: document.title,
    referrer: document.referrer || 'direct',
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    user_agent: navigator.userAgent,
    language: navigator.language,
    timestamp: new Date().toISOString()
  };

  // Envoi à l'API Deno
  sendToDeno('page_view', pageData);

  // Envoi à Facebook Pixel
  trackFacebookEvent('PageView', {
    page_path: window.location.pathname
  });
  
  console.log('[TRACKING] Page view:', window.location.pathname);
};

// ===== Fonctions utilitaires pour la collecte de données =====

/**
 * Liste des paramètres UTM à collecter
 */
const UTM_PARAMETERS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term'
];

/**
 * Collecte les identifiants Facebook (fbp, fbc) depuis les cookies et l'URL
 * @returns Objet contenant les identifiants Facebook disponibles
 */
const getFacebookIds = (): { fbp?: string; fbc?: string } => {
  const result: { fbp?: string; fbc?: string } = {};
  
  // Sécurité pour les environnements non-navigateur
  if (typeof document === 'undefined') return result;
  
  try {
    // Récupérer le Facebook Browser ID (fbp) depuis les cookies
    const cookies = document.cookie.split('; ');
    const fbpCookie = cookies.find(cookie => cookie.startsWith('_fbp='));
    if (fbpCookie) {
      result.fbp = fbpCookie.split('=')[1];
    }
    
    // Récupérer le Facebook Click ID (fbc) depuis les cookies ou l'URL
    const fbcCookie = cookies.find(cookie => cookie.startsWith('_fbc='));
    if (fbcCookie) {
      result.fbc = fbcCookie.split('=')[1];
    } else if (typeof window !== 'undefined') {
      // Chercher fbclid dans l'URL
      const urlParams = new URLSearchParams(window.location.search);
      const fbclid = urlParams.get('fbclid');
      if (fbclid) {
        // Format standard pour fbc
        result.fbc = `fb.1.${Date.now()}.${fbclid}`;
      }
    }
  } catch (error) {
    console.error('[TRACKING] Erreur lors de la collecte des identifiants Facebook:', error);
  }
  
  return result;
};

/**
 * Récupère les paramètres UTM depuis l'URL
 * @returns Objet contenant les paramètres UTM présents dans l'URL
 */
const getUtmParameters = (): Record<string, string> => {
  const utmParams: Record<string, string> = {};
  
  // Sécurité pour les environnements non-navigateur
  if (typeof window === 'undefined') return utmParams;
  
  try {
    const urlParams = new URLSearchParams(window.location.search);
    
    UTM_PARAMETERS.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        utmParams[param] = value;
      }
    });
  } catch (error) {
    console.error('[TRACKING] Erreur lors de la collecte des paramètres UTM:', error);
  }
  
  return utmParams;
};

/**
 * Détecte le type d'appareil à partir du user-agent
 * @returns 'mobile' ou 'desktop'
 */
const getDeviceType = (): 'mobile' | 'desktop' => {
  if (typeof navigator === 'undefined') return 'desktop';
  return /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
};

/**
 * Enregistre un événement de début de téléchargement
 * @param platform Plateforme ciblée (ios/android)
 * @param buttonLocation Emplacement du bouton sur la page
 */
export const trackDownloadStart = (platform: string, buttonLocation?: string): void => {
  const data = {
    platform,
    button_location: buttonLocation || window.location.pathname,
    device_type: getDeviceType(),
    timestamp: new Date().toISOString()
  };
  
  // Envoi de l'événement
  sendEvent('start_download', data);
  
  console.log('[TRACKING] Début de téléchargement:', platform);
};

/**
 * Enregistre un événement de clic sur un bouton de téléchargement
 * Format conforme aux exigences de tracking
 * 
 * @param platform Plateforme ciblée (ios/android)
 * @param buttonLocation Emplacement du bouton sur la page
 */
export const trackDownloadClick = (platform: Platform | string, buttonLocation?: string): void => {
  console.group('%c[TRACKING] Événement download_click', 'color: #4CAF50; font-weight: bold; font-size: 12px');
  console.log('%cPlateforme:', 'font-weight: bold', platform);
  console.log('%cEmplacement:', 'font-weight: bold', buttonLocation || window.location.pathname);
  
  // Données de base requises
  const data: Record<string, unknown> = {
    // Champs obligatoires
    platform,
    button_location: buttonLocation || window.location.pathname,
    
    // Données de navigation
    url: typeof window !== 'undefined' ? window.location.href : '',
    referrer: typeof document !== 'undefined' ? (document.referrer || 'direct') : 'direct',
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    
    // Métadonnées
    timestamp: new Date().toISOString(),
    device_type: getDeviceType()
  };
  
  try {
    // Enrichir avec les paramètres UTM
    const utmParams = getUtmParameters();
    Object.assign(data, utmParams);
    console.log('%cParamètres UTM:', 'font-weight: bold', utmParams);
    
    // Enrichir avec les identifiants Facebook
    const fbIds = getFacebookIds();
    if (fbIds.fbp) data.fbp = fbIds.fbp;
    if (fbIds.fbc) data.fbc = fbIds.fbc;
    console.log('%cIdentifiants Facebook:', 'font-weight: bold', fbIds);
    
    // Envoi à l'API Deno
    console.log('%cEnvoi à l\'API Deno', 'font-weight: bold');
    sendToDeno('download_click', data)
      .then(success => {
        console.log(`%cEnvoi à l'API Deno: ${success ? '✅ Succès' : '❌ Échec'}`, 'font-weight: bold');
      })
      .catch(error => {
        console.error('Erreur lors de l\'envoi à l\'API:', error);
      });
    
    // Envoi à Facebook Pixel avec données adaptées
    const fbData = {
      content_name: platform,
      content_category: 'app_download',
      button_location: data.button_location as string,
      ...utmParams
    };
    
    console.log('%cEnvoi à Facebook Pixel (Lead):', 'font-weight: bold', fbData);
    trackFacebookEvent('Lead', fbData);
    
    // Envoi également comme événement personnalisé pour plus de visibilité
    console.log('%cEnvoi à Facebook Pixel (download_click):', 'font-weight: bold', fbData);
    trackFacebookEvent('download_click', fbData);
    
    // Afficher les données complètes
    console.log('%cDonnées complètes de l\'event:', 'font-weight: bold');
    console.table(data);
    
    console.log('%c✅ Tracking de téléchargement terminé', 'color: #4CAF50; font-weight: bold');
  } catch (error) {
    console.error('%c❌ Erreur lors du tracking de téléchargement:', 'color: #F44336; font-weight: bold', error);
  } finally {
    console.groupEnd();
  }
};

/**
 * @deprecated Utiliser trackDownloadClick à la place
 */
export const trackDownload = (event: TrackingEvent): void => {
  console.warn('[TRACKING] La fonction trackDownload est dépréciée. Utilisez trackDownloadClick à la place.');
  
  // Conversion vers le nouveau format
  trackDownloadClick(event.platform, event.location);
};

/**
 * Sauvegarde un événement qui a échoué dans le localStorage pour réessayer plus tard
 * @param event Événement qui a échoué
 */
export function saveFailedEvent(event: unknown): void {
  if (typeof localStorage === 'undefined') return;
  
  try {
    // Récupérer les événements existants
    const failedEvents = JSON.parse(localStorage.getItem('failed_events') || '[]');
    
    // Ajouter le nouvel événement avec horodatage
    const eventWithTimestamp = {
      event,
      timestamp: new Date().toISOString(),
      retryCount: 0
    };
    
    failedEvents.push(eventWithTimestamp);
    
    // Limiter le nombre d'événements stockés (max 50)
    const trimmedEvents = failedEvents.slice(-50);
    
    // Sauvegarder
    localStorage.setItem('failed_events', JSON.stringify(trimmedEvents));
    console.log('[TRACKING] Événement sauvegardé pour réessai ultérieur');
  } catch (error) {
    console.error('[TRACKING] Erreur de sauvegarde locale:', error);
  }
}

/**
 * Tente de renvoyer les événements qui ont échoué précédemment
 * @returns Nombre d'événements réessayés
 */
export async function retryFailedEvents(): Promise<number> {
  if (typeof localStorage === 'undefined') return 0;
  
  try {
    // Récupérer les événements échoués
    const failedEventsString = localStorage.getItem('failed_events');
    if (!failedEventsString) return 0;
    
    const failedEvents = JSON.parse(failedEventsString);
    if (!failedEvents.length) return 0;
    
    console.log(`[TRACKING] Tentative de renvoi de ${failedEvents.length} événements échoués`);
    
    // Filtrer les événements à réessayer (max 10 à la fois)
    const eventsToRetry = failedEvents.slice(0, 10);
    const remainingEvents = failedEvents.slice(10);
    
    // Définir le type pour les événements échoués
    interface FailedEventItem {
      event: {
        name?: string;
        properties?: Record<string, unknown>;
      };
      timestamp: string;
      retryCount: number;
    }
    
    // Réessayer chaque événement
    const results = await Promise.allSettled(
      eventsToRetry.map(async (item: FailedEventItem) => {
        if (item.event?.name && item.event?.properties) {
          return fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item.event)
          });
        }
        return Promise.reject('Format d\'événement invalide');
      })
    );
    
    // Compter les succès et échecs
    const succeeded = results.filter(r => r.status === 'fulfilled').length;
    
    // Mettre à jour le localStorage avec les événements restants
    localStorage.setItem('failed_events', JSON.stringify(remainingEvents));
    
    console.log(`[TRACKING] ${succeeded}/${eventsToRetry.length} événements réenvoyés avec succès`);
    return succeeded;
  } catch (error) {
    console.error('[TRACKING] Erreur lors du réessai des événements:', error);
    return 0;
  }
}
