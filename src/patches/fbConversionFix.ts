// Configuration pour Facebook
const FB_CONFIG = {
  pixelId: process.env.REACT_APP_FB_PIXEL_ID || '123456789012345',
  accessToken: process.env.REACT_APP_FB_ACCESS_TOKEN || '',
  testEventCode: process.env.REACT_APP_FB_TEST_EVENT_CODE || ''
};

/**
 * Interface pour le payload Facebook Conversion API
 */
interface FacebookEventPayload {
  event_name: string;
  event_time: number;
  action_source: string;
  user_data: {
    client_user_agent?: string;
    client_ip_address?: string;
    [key: string]: unknown;
  };
  custom_data: {
    button_location?: string;
    content_name?: string;
    content_category?: string;
    currency?: string;
    value?: number;
    [key: string]: unknown;
  };
}

/**
 * Mapping des noms d'événements internes vers les noms d'événements standard Facebook
 */
const EVENT_NAME_MAPPING: Record<string, string> = {
  'download_click': 'Lead',
  'start_download': 'Lead',
  'page_view': 'PageView'
};

/**
 * Envoie un événement à Facebook Conversion API avec le format correct
 * @param eventName Nom de l'événement interne
 * @param properties Propriétés de l'événement
 * @param ip Adresse IP optionnelle du client
 * @returns Promise<boolean> Succès de l'envoi
 */
export async function sendFixedFacebookConversion(
  eventName: string,
  properties: Record<string, unknown>,
  ip?: string
): Promise<boolean> {
  // Mapping du nom d'événement
  const fbEventName = EVENT_NAME_MAPPING[eventName] || eventName;
  
  // Construction du payload conforme
  const payload: FacebookEventPayload = {
    event_name: fbEventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    user_data: {
      client_user_agent: String(properties.user_agent || '')
    },
    // Ajout conditionnel de l'IP si présente
    ...(ip ? { user_data: { client_ip_address: ip } } : {}),
    custom_data: {
      // Propriétés custom mappées correctement
      button_location: String(properties.button_location || ''),
      // Ajout conditionnel des propriétés si présentes
      ...(properties.platform ? { content_name: String(properties.platform) } : {}),
      ...(properties.url ? { content_category: String(properties.url) } : {})
    }
  };

  // Ajout de valeur monétaire pour les leads si pertinent
  if (eventName === 'download_click' || eventName === 'start_download') {
    payload.custom_data.currency = 'EUR';
    payload.custom_data.value = 0; // Valeur symbolique
  }

  try {
    // Vérification de la configuration
    if (!FB_CONFIG.pixelId || !FB_CONFIG.accessToken) {
      console.warn('[TRACKING] Configuration Facebook manquante');
      return false;
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${FB_CONFIG.pixelId}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [payload],
          access_token: FB_CONFIG.accessToken,
          ...(FB_CONFIG.testEventCode ? { 
            test_event_code: FB_CONFIG.testEventCode 
          } : {})
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Facebook Conversion API error: ${response.status} - ${errorText}`);
    }
    
    console.log('[TRACKING] Event envoyé à Facebook Conversion API');
    return true;
  } catch (error) {
    console.error('[TRACKING] Erreur Facebook Conversion API:', error);
    return false;
  }
}
