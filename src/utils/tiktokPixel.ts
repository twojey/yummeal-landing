declare global {
  interface Window {
    ttq?: {
      (method: string, ...args: unknown[]): void;
      queue?: unknown[][];
      setAndDefer?: (target: Record<string, unknown>, method: string) => void;
      identify?: (...args: unknown[]) => void;
      page?: (...args: unknown[]) => void;
      track?: (...args: unknown[]) => void;
      instance?: (id: string) => void;
      load?: (id: string) => void;
      _i?: Record<string, unknown>;
    };
    TiktokAnalyticsObject?: string;
  }
}

const TIKTOK_PIXEL_ID = "D52PA73C77U9OKD595VG";

const ensureTikTokPixel = (): boolean => {
  if (typeof window === "undefined") return false;

  if (typeof window.ttq === "function") {
    return true;
  }

  (function (w, d, t) {
    w.TiktokAnalyticsObject = t;
    const ttq = (w[t] = w[t] || []) as typeof window.ttq & {
      methods?: string[];
      setAndDefer?: (target: Record<string, unknown>, method: string) => void;
      instance?: (id: string) => void;
      load?: (id: string) => void;
      _i?: Record<string, { load?: boolean }>;
    };

    ttq.methods = [
      "page",
      "track",
      "identify",
      "instances",
      "debug",
      "on",
      "off",
      "upload",
    ];
    ttq.setAndDefer = function (target, method) {
      target[method] = function () {
        (ttq as unknown[]).push([method].concat([].slice.call(arguments, 0)));
      };
    };
    for (let i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(ttq, ttq.methods[i]!);
    }
    ttq.instance = function (id: string) {
      const instance = (ttq._i && ttq._i[id]) || [];
      if (!instance.initialize) {
        instance._u = "https://analytics.tiktok.com/i18n/pixel/events.js";
        instance.initialize = true;
        instance.page = ttq.page;
        instance.track = ttq.track;
      }
      ttq._i = ttq._i || {};
      ttq._i[id] = instance;
      return instance;
    };
    ttq.load = function (id: string) {
      ttq._i = ttq._i || {};
      ttq._i[id] = ttq.instance!(id);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${id}`;
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    };
    ttq.load(TIKTOK_PIXEL_ID);
  })(window, document, "ttq");

  return typeof window.ttq === "function";
};

export const initTikTokPixel = (): void => {
  if (ensureTikTokPixel()) {
    window.ttq!("page");
    window.ttq!("track", "PageView");
    console.log("[TikTok Pixel] Initialisé");
  } else {
    console.warn("[TikTok Pixel] Impossible d'initialiser (window.ttq absent)");
  }
};

export const trackTikTokEvent = (
  eventName: string,
  properties?: Record<string, unknown>,
  options?: Record<string, unknown>,
): void => {
  if (!ensureTikTokPixel()) {
    console.warn("[TikTok Pixel] Non initialisé, tentative de réinitialisation…");
    initTikTokPixel();
    setTimeout(
      () => trackTikTokEvent(eventName, properties, options),
      500,
    );
    return;
  }

  try {
    window.ttq!("track", eventName, properties || {}, options || {});
    console.log(`[TikTok Pixel] Événement envoyé: ${eventName}`, {
      properties,
      options,
    });
  } catch (error) {
    console.error("[TikTok Pixel] Erreur lors de l'envoi d'un événement", error);
  }
};
