import { trackFacebookEvent } from './facebookPixel';

const API_URL = 'https://yummeal-server.deno.dev/tracking';

interface TrackingEvent {
  platform: 'apple' | 'google';
  location: string;
  ip?: string;
  userAgent?: string;
}

const sendToDeno = async (eventName: string, data: Record<string, unknown>) => {
  const eventData = {
    name: eventName,
    properties: {
      ...data,
      timestamp: new Date().toISOString(),
      source: 'yummeal_website'
    }
  };

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    });
  } catch (error) {
    console.error('Tracking error:', error);
  }
};

export const sendEvent = async (eventName: string, data: Record<string, unknown> = {}) => {
  await sendToDeno(eventName, data);
  trackFacebookEvent(eventName, data);
};

export const trackPageView = () => {
  const data = {
    page_url: window.location.href,
    page_title: document.title,
    referrer: document.referrer || 'direct',
    screen_width: window.innerWidth,
    user_agent: navigator.userAgent
  };
  
  sendEvent('PageView', data);
};

export const trackDownloadStart = (platform: string) => {
  const data = {
    platform,
    button_location: window.location.pathname,
    device_type: /Mobile|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
  };
  
  sendEvent('start_download', data);
  trackFacebookEvent('Lead', data);
};

export const trackDownload = (event: TrackingEvent) => {
  // Payload pour notre API Deno
  const apiPayload = {
    name: 'download_click',
    properties: {
      button_location: event.location,
      platform: event.platform,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      user_agent: navigator.userAgent
    }
  };

  // Envoi à notre API
  fetch('https://yummeal-server.deno.dev/tracking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(apiPayload)
  })
  .then(response => {
    if (!response.ok) throw new Error('API Error');
    console.log('[TRACKING] Event envoyé à notre API');
  })
  .catch(error => {
    console.error('[TRACKING] Erreur API:', error);
    saveFailedEvent(apiPayload);
  });

  // Envoi direct à Facebook Pixel
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'Lead', {
      button_id: event.location,
      content_name: event.platform,
      url: window.location.href
    });
  }
};

function saveFailedEvent(event: unknown) {
  try {
    const failedEvents = JSON.parse(localStorage.getItem('failed_events') || '[]');
    failedEvents.push(event);
    localStorage.setItem('failed_events', JSON.stringify(failedEvents));
  } catch (e) {
    console.error('[TRACKING] Erreur de sauvegarde locale:', e);
  }
}
