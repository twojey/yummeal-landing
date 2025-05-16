/**
 * Type définitions pour le SDK Facebook Pixel
 */
declare global {
  interface Window {
    fbq: {
      (command: 'init', pixelId: string): void;
      (command: 'track', eventName: string, eventData?: Record<string, unknown>): void;
      loaded: boolean;
      version: string;
      push: (args: unknown[]) => void;
      queue: unknown[];
    };
    _fbq?: Window['fbq'];
  }
}

/**
 * ID du pixel Facebook
 */
const FB_PIXEL_ID = '860752789503495';

/**
 * Initialise le SDK Facebook Pixel
 */
export const initFacebookPixel = (): void => {
  // Sécurité pour les environnements non-navigateur
  if (typeof window === 'undefined') return;

  // Éviter la double initialisation
  if (typeof window.fbq === 'function') {
    console.log('[Facebook Pixel] Déjà initialisé');
    return;
  }

  // Création de la fonction fbq avec toutes les propriétés requises
  const fbqFunction = function() {
    // eslint-disable-next-line prefer-rest-params
    fbqFunction.queue.push(arguments);
  };
  
  // Ajout des propriétés requises avec types explicites
  fbqFunction.loaded = true;
  fbqFunction.version = '2.0';
  fbqFunction.queue = [] as unknown[];
  fbqFunction.push = function(args: unknown[]) {
    fbqFunction.queue.push(args);
  };
  
  // Assignation à window.fbq
  window.fbq = fbqFunction;
  
  // Les propriétés sont déjà initialisées dans la définition de fbqFunction
  
  // Création et insertion du script Facebook
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  
  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }

  // Initialisation du pixel avec l'ID
  window.fbq('init', FB_PIXEL_ID);
  
  // Premier PageView automatique
  window.fbq('track', 'PageView');
  
  console.log('[Facebook Pixel] Initialisé avec succès');
};

/**
 * Envoie un événement au Facebook Pixel
 * @param eventName Nom de l'événement à tracker
 * @param data Données supplémentaires pour l'événement
 */
export const trackFacebookEvent = (eventName: string, data?: Record<string, unknown>): void => {
  // Sécurité pour les environnements non-navigateur
  if (typeof window === 'undefined') return;
  
  // Initialisation automatique si nécessaire
  if (typeof window.fbq !== 'function') {
    console.warn('[Facebook Pixel] Tentative de tracking sans initialisation du pixel. Initialisation automatique...');
    initFacebookPixel();
  }
  
  // Envoi de l'événement
  try {
    window.fbq('track', eventName, data);
    console.log(`[Facebook Pixel] Événement tracké: ${eventName}`, data);
  } catch (error) {
    console.error(`[Facebook Pixel] Erreur lors du tracking de l'événement ${eventName}:`, error);
  }
};
