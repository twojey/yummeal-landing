/**
 * Type définitions pour le SDK Facebook Pixel
 */
declare global {
  interface Window {
    fbq: {
      (command: string, pixelId: string): void;
      (command: string, eventName: string, params?: Record<string, unknown>): void;
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      push: typeof Array.prototype.push;
      loaded: boolean;
      version: string;
    };
    _fbq?: Window['fbq'];
  }
}

/**
 * ID du pixel Facebook
 */
const FB_PIXEL_ID = '860752789503495';

/**
 * Vérifie si le pixel Facebook est déjà chargé
 */
const isPixelLoaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
};

/**
 * Initialise le SDK Facebook Pixel
 */
export const initFacebookPixel = (): void => {
  // Sécurité pour les environnements non-navigateur
  if (typeof window === 'undefined') {
    return;
  }

  // Éviter la double initialisation
  if (isPixelLoaded()) {
    console.log('[Facebook Pixel] Déjà initialisé');
    return;
  }

  // Création de la fonction fbq
  const fbq = function(command: string, ...args: unknown[]): void {
    if (!fbq.queue) fbq.queue = [] as unknown[][];
    fbq.queue.push([command, ...args]);
  };

  // Initialisation des propriétés
  fbq.queue = [] as unknown[][];
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.push = Array.prototype.push;

  // Assignation à window
  window.fbq = fbq;
  window._fbq = fbq;

  // Création du script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';

  // Insertion du script dans le document
  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }

  // Initialisation avec l'ID de pixel
  fbq('init', FB_PIXEL_ID);
  
  // Premier PageView automatique
  fbq('track', 'PageView');
  
  console.log('[Facebook Pixel] Initialisé avec succès');
};

/**
 * Envoie un événement au Facebook Pixel
 * @param eventName Nom de l'événement à tracker
 * @param data Données supplémentaires pour l'événement
 */
export const trackFacebookEvent = (eventName: string, data?: Record<string, unknown>): void => {
  // Sécurité pour les environnements non-navigateur
  if (typeof window === 'undefined') {
    return;
  }
  
  // Initialisation automatique si nécessaire
  if (!isPixelLoaded()) {
    console.warn('[Facebook Pixel] Tentative de tracking sans initialisation du pixel. Initialisation automatique...');
    initFacebookPixel();
    
    // Attendre un court instant pour que le pixel soit chargé
    setTimeout(() => {
      if (isPixelLoaded()) {
        window.fbq('track', eventName, data);
        console.log(`[Facebook Pixel] Événement tracké après initialisation: ${eventName}`, data);
      } else {
        console.error(`[Facebook Pixel] Échec de l'initialisation du pixel pour l'événement: ${eventName}`);
      }
    }, 500);
    return;
  }
  
  // Envoi de l'événement
  try {
    window.fbq('track', eventName, data);
    console.log(`[Facebook Pixel] Événement tracké: ${eventName}`, data);
  } catch (error) {
    console.error(`[Facebook Pixel] Erreur lors du tracking de l'événement ${eventName}:`, error);
  }
};

/**
 * Vérifie l'état du pixel Facebook
 * @returns État du pixel Facebook
 */
export const checkPixelStatus = (): { loaded: boolean; initialized: boolean; details: string } => {
  const status = {
    loaded: false,
    initialized: false,
    details: ''
  };
  
  if (typeof window === 'undefined') {
    status.details = 'Environnement non-navigateur';
    return status;
  }
  
  status.loaded = typeof window.fbq === 'function';
  
  if (!status.loaded) {
    status.details = 'Le pixel Facebook n\'est pas chargé (window.fbq n\'est pas une fonction)';
    return status;
  }
  
  // Vérifier si le pixel est initialisé avec notre ID
  if (window.fbq.queue) {
    try {
      const queue = window.fbq.queue as unknown[][];
      status.initialized = queue.some(item => 
        Array.isArray(item) && 
        item[0] === 'init' && 
        item[1] === FB_PIXEL_ID
      );
      
      if (status.initialized) {
        status.details = `Pixel Facebook chargé et initialisé avec l'ID ${FB_PIXEL_ID}`;
      } else {
        status.details = `Pixel Facebook chargé mais non initialisé avec l'ID ${FB_PIXEL_ID}`;
      }
    } catch (error) {
      status.details = `Erreur lors de la vérification de l'initialisation: ${error}`;
    }
  } else {
    status.details = 'Pixel Facebook chargé mais la queue n\'est pas disponible';
  }
  
  return status;
}

/**
 * Fonction de débogage pour le pixel Facebook
 * Affiche des informations détaillées dans la console
 */
export const debugFacebookPixel = (): void => {
  console.group('%c Facebook Pixel Débogage', 'color: #4267B2; font-weight: bold; font-size: 14px;');
  
  const status = checkPixelStatus();
  console.log(`%cÉtat: ${status.loaded ? '✅ Chargé' : '❌ Non chargé'}`, 'font-weight: bold');
  console.log(`%cInitialisé: ${status.initialized ? '✅ Oui' : '❌ Non'}`, 'font-weight: bold');
  console.log(`%cDétails: ${status.details}`, 'color: #666');
  
  if (typeof window !== 'undefined') {
    console.log('%cObjet window.fbq:', 'font-weight: bold');
    console.dir(window.fbq);
    
    if (window.fbq && window.fbq.queue) {
      console.log('%cContenu de la queue:', 'font-weight: bold');
      console.table(window.fbq.queue);
    }
    
    console.log('%cScripts Facebook chargés:', 'font-weight: bold');
    const scripts = document.querySelectorAll('script[src*="facebook"]');
    if (scripts.length > 0) {
      scripts.forEach(script => {
        // Cast vers HTMLScriptElement pour accéder à la propriété src
        const scriptElement = script as HTMLScriptElement;
        console.log(scriptElement.src);
      });
    } else {
      console.log('Aucun script Facebook trouvé dans le DOM');
    }
  }
  
  console.groupEnd();
}
