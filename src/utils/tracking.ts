const API_URL = 'https://yummeal-server.deno.dev/tracking';

export const sendEvent = async (eventName: string, data: Record<string, unknown> = {}) => {
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

export const trackPageView = () => {
  sendEvent('page_view', {
    page_url: window.location.href,
    page_title: document.title,
    referrer: document.referrer || 'direct',
    screen_width: window.innerWidth,
    user_agent: navigator.userAgent
  });
};

export const trackDownloadStart = (platform: string) => {
  sendEvent('start_download', {
    platform,
    button_location: window.location.pathname,
    device_type: /Mobile|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
  });
};
