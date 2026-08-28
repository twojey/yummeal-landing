import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  canonicalPath: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = 'https://yummeal.app';

/**
 * Netlify sert les fichiers statiques prérendus depuis <route>/index.html et
 * redirige (301) l'URL sans slash final vers la version avec slash : le
 * canonical doit donc toujours se terminer par "/" pour matcher l'URL
 * réellement servie, sinon Google indexe une URL qui n'existe qu'après un
 * redirect.
 */
function withTrailingSlash(pathname: string): string {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

/**
 * Pas de react-helmet dans ce projet : on manipule directement le <head>.
 * Sert aussi bien au client (hydratation) qu'au prerender (voir
 * scripts/prerender.mjs, qui lit ces mêmes valeurs via un import séparé et
 * doit appliquer la même normalisation de slash final).
 */
export function usePageMeta({ title, description, canonicalPath, jsonLd }: PageMeta) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${withTrailingSlash(canonicalPath)}`;
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
    setMeta('meta[property="og:url"]', 'property', canonicalUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    document
      .querySelectorAll('script[data-ldjson]')
      .forEach((el) => el.remove());
    const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-ldjson', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonicalPath, JSON.stringify(jsonLd)]);
}
