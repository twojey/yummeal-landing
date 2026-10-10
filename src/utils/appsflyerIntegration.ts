/**
 * Attribution AppsFlyer côté site.
 *
 * Le site utilise OneLink pour les clics web -> app. L’ancien module chargé ici
 * était le SDK mobile (devKey/appId, initSdk/start), qui n’est pas le Web SDK
 * AppsFlyer et ne doit pas être exécuté dans un navigateur. Les événements web
 * restent envoyés à l’API Yummeal et au Pixel Meta ; OneLink porte
 * l’attribution de l’installation lors du clic vers le store.
 */

import { ACQUISITION_ONELINK, captureAcquisition } from './acquisitionLink';

export interface TrafficSource {
  source: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer?: string;
  fbclid?: string;
  fbc?: string;
  gclid?: string;
  ttclid?: string;
  msclkid?: string;
}

function getIncomingParameters(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams();

  try {
    const captured = captureAcquisition(window.location.search, window.sessionStorage);
    return captured.size ? captured : new URLSearchParams(window.location.search);
  } catch {
    return new URLSearchParams(window.location.search);
  }
}

/** Détecte l’origine initiale, y compris après une navigation interne. */
function getTrafficSource(): TrafficSource {
  const source: TrafficSource = {
    source: 'direct',
    referrer: typeof document !== 'undefined' ? (document.referrer || 'direct') : 'direct',
  };

  if (typeof window === 'undefined') return source;

  try {
    const params = getIncomingParameters();
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    const utmContent = params.get('utm_content');
    const utmTerm = params.get('utm_term');

    if (utmSource) {
      source.source = utmSource;
      source.medium = utmMedium || undefined;
      source.campaign = utmCampaign || undefined;
      source.content = utmContent || undefined;
      source.term = utmTerm || undefined;
    }

    const fbclid = params.get('fbclid');
    const fbc = params.get('fbc');
    const gclid = params.get('gclid');
    const ttclid = params.get('ttclid');
    const msclkid = params.get('msclkid');

    if (fbclid || fbc) {
      source.source = 'facebook';
      source.fbclid = fbclid || undefined;
      source.fbc = fbc || undefined;
    }
    if (gclid) {
      source.source = 'google';
      source.gclid = gclid;
    }
    if (ttclid) {
      source.source = 'tiktok';
      source.ttclid = ttclid;
    }
    if (msclkid) {
      source.source = 'microsoft';
      source.msclkid = msclkid;
    }

    if (!utmSource && !fbclid && !fbc && !gclid && !ttclid && !msclkid && source.referrer !== 'direct') {
      const referrerUrl = new URL(source.referrer!);
      const referrerDomain = referrerUrl.hostname.toLowerCase();

      if (referrerDomain.includes('google')) source.source = 'google';
      else if (referrerDomain.includes('facebook')) source.source = 'facebook';
      else if (referrerDomain.includes('instagram')) source.source = 'instagram';
      else if (referrerDomain.includes('tiktok')) source.source = 'tiktok';
      else if (referrerDomain.includes('linkedin')) source.source = 'linkedin';
      else if (referrerDomain.includes('twitter') || referrerDomain.includes('x.com')) source.source = 'twitter';
      else source.source = referrerDomain;
    }
  } catch (error) {
    console.error('[AppsFlyer] Erreur lors de la détection de la source de trafic:', error);
  }

  return source;
}

export function getDetectedTrafficSource(): TrafficSource {
  return getTrafficSource();
}

/**
 * Construit un lien OneLink en conservant les signaux de la première visite.
 * OneLink est l’unique chemin AppsFlyer actif côté web tant qu’un Web SDK ID
 * dédié n’est pas fourni par AppsFlyer et configuré séparément.
 */
export function generateOneLinkUrl(additionalParams?: Record<string, string>): string {
  const params = new URLSearchParams();

  if (typeof window !== 'undefined') {
    for (const [key, value] of getIncomingParameters()) params.set(key, value);
  }

  if (additionalParams) {
    for (const [key, value] of Object.entries(additionalParams)) params.set(key, value);
  }

  const queryString = params.toString();
  return queryString ? `${ACQUISITION_ONELINK}?${queryString}` : ACQUISITION_ONELINK;
}
