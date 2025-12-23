declare global {
  interface Window {
    ttq?: {
      (command: string, ...args: unknown[]): void;
      track?: (event: string, params?: Record<string, unknown>, options?: Record<string, unknown>) => void;
      page?: (...args: unknown[]) => void;
    };
  }
}

const TIKTOK_PIXEL_ID = 'D52PA73C77U9OKD595VG';

let snippetInjected = false;

const TIKTOK_SNIPPET = `!function (w, d, t) {
  w.TiktokAnalyticsObject = t;
  var ttq = w[t] = w[t] || [];
  ttq.methods = ["page","track","identify","instances","debug","on","off","upload"];
  ttq.setAndDefer = function (t, e) {
    t[e] = function () {
      t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
    };
  };
  for (var i = 0; i < ttq.methods.length; i++) {
    ttq.setAndDefer(ttq, ttq.methods[i]);
  }
  ttq.instance = function (t) {
    var e = ttq._i[t] || [];
    if (!e.initialize) {
      e._u = "https://analytics.tiktok.com/i18n/pixel/events.js";
      e.initialize = true;
      e.page = ttq.page;
      e.track = ttq.track;
    }
    ttq._i[t] = e;
    return e;
  };
  ttq.load = function (t) {
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.async = true;
    e.src = "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" + t + "&lib=" + t;
    var n = document.getElementsByTagName("script")[0];
    n.parentNode.insertBefore(e, n);
  };
  ttq.load("${TIKTOK_PIXEL_ID}");
}(window, document, "ttq");`;

const injectTikTokSnippet = (): void => {
  if (snippetInjected || typeof document === 'undefined') return;

  const existing = document.querySelector('script[data-tiktok-pixel]');
  if (existing) {
    snippetInjected = true;
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('data-tiktok-pixel', 'true');
  script.innerHTML = TIKTOK_SNIPPET;
  document.head.appendChild(script);
  snippetInjected = true;
};

export const initTikTokPixel = (): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  injectTikTokSnippet();

  // Les méthodes page/track existent immédiatement (elles pushent dans la queue)
  window.ttq?.page?.();
  window.ttq?.track?.('PageView');
  console.log('[TikTok Pixel] Initialisé (snippet injecté)');
};

export const trackTikTokEvent = (
  eventName: string,
  properties?: Record<string, unknown>,
  options?: Record<string, unknown>,
): void => {
  if (typeof window === 'undefined' || !window.ttq?.track) {
    console.warn('[TikTok Pixel] Non initialisé, événement ignoré:', eventName);
    return;
  }

  window.ttq.track(eventName, properties || {}, options || {});
  console.log(`[TikTok Pixel] Événement envoyé: ${eventName}`, { properties, options });
};
