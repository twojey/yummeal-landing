import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  canonicalPath: string;
}

const SITE_URL = 'https://yummeal.app';

/**
 * Pas de react-helmet dans ce projet : on manipule directement le <head>.
 * Sert aussi bien au client (hydratation) qu'au prerender (voir
 * scripts/prerender.mjs, qui lit ces mêmes valeurs via un import séparé).
 */
export function usePageMeta({ title, description, canonicalPath }: PageMeta) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        if (attr === 'name') el.setAttribute('name', selector.split('"')[1]);
        else el.setAttribute('property', selector.split('"')[1]);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', description);
    setMeta('meta[property="og:title"]', 'property', title);
    setMeta('meta[property="og:description"]', 'property', description);
    setMeta(
      'meta[property="og:url"]',
      'property',
      `${SITE_URL}${canonicalPath}`
    );

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${SITE_URL}${canonicalPath}`);
  }, [title, description, canonicalPath]);
}
