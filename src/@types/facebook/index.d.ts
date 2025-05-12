interface FacebookEvent {
  (method: 'init', pixelId: string): void;
  (method: 'track' | 'trackCustom', eventName: string, eventData?: Record<string, unknown>): void;
}

declare global {
  interface Window {
    fbq: FacebookEvent;
  }
}

export {};
