interface FacebookEvent {
  eventName: string;
  eventData?: Record<string, unknown>;
}

interface FacebookQueue {
  push: (args: [string, string] | [string, string, Record<string, unknown>]) => void;
  loaded: boolean;
  version: string;
  queue: Array<[string, string] | [string, string, Record<string, unknown>]>;
}

declare global {
  interface Window {
    fbq: FacebookQueue & {
      (method: 'init', pixelId: string): void;
      (method: 'track', eventName: string, eventData?: Record<string, unknown>): void;
    };
    _fbq?: FacebookQueue;
  }
}

export const initFacebookPixel = (): void => {
  if (typeof window === 'undefined') return;

  if (window.fbq) return;

  const fbq = function(...args: [string, string] | [string, string, Record<string, unknown>]) {
    window.fbq.queue.push(args);
  } as unknown as Window['fbq'];

  window.fbq = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode?.insertBefore(script, firstScript);

  fbq('init', '860752789503495');
};

export const trackFacebookEvent = (eventName: string, data?: Record<string, unknown>): void => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, data);
  }
};
