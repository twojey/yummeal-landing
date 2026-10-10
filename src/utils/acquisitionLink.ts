export const ACQUISITION_ONELINK = 'https://yummealapp.onelink.me/XKCH/wqtzoj1h';
const TRACKING_KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid','fbc','gclid','ttclid','pid','c','af_adset','af_sub1','deep_link_sub1','deep_link_value','referral_code','code'];
const STORAGE_KEY = 'yummeal_acquisition_v1';
/** First visit evidence survives internal page navigation; expires after seven days. */
export function captureAcquisition(search: string, storage: Storage, now = Date.now()): URLSearchParams {
  let saved: {at:number;query:string}|null=null;
  try { saved=JSON.parse(storage.getItem(STORAGE_KEY) ?? 'null'); } catch { /* blocked storage */ }
  if(saved && now-saved.at<7*86400000) return new URLSearchParams(saved.query);
  const incoming=new URLSearchParams(search); const filtered=new URLSearchParams();
  for(const key of TRACKING_KEYS) { const value=incoming.get(key); if(value) filtered.set(key,value.slice(0,256)); }
  if(filtered.size) { try { storage.setItem(STORAGE_KEY,JSON.stringify({at:now,query:filtered.toString()})); } catch { /* private mode */ } }
  return filtered;
}
export function buildAcquisitionLink(storeUrl: string, platform:'apple'|'google', evidence:URLSearchParams):string {
  // Untagged visits keep the locale-specific store URL and existing SEO output.
  if(!evidence.size) return storeUrl;
  const url=new URL(ACQUISITION_ONELINK);
  for(const key of TRACKING_KEYS) { const value=evidence.get(key); if(value) url.searchParams.set(key,value); }
  url.searchParams.set('pid', evidence.get('pid') ?? 'website');
  url.searchParams.set(platform==='apple'?'af_ios_url':'af_android_url',storeUrl);
  const code=evidence.get('deep_link_sub1') ?? evidence.get('af_sub1') ?? evidence.get('referral_code') ?? evidence.get('code');
  if(code) {
    url.searchParams.set('deep_link_value','invite');
    url.searchParams.set('deep_link_sub1',code); url.searchParams.set('af_sub1',code);
  }
  // Explicit scheme fallback transports the same signals to already installed apps.
  const deepLink=new URL('yummeal://'+(code?'invite':'open'));
  for(const [key,value] of url.searchParams) if(!key.endsWith('_url')) deepLink.searchParams.set(key,value);
  url.searchParams.set('af_dp',deepLink.toString());
  return url.toString();
}

/**
 * Ajoute le contexte propre au site avant de construire un lien OneLink.
 *
 * Les visiteurs qui arrivent directement sur le site n'ont pas d'UTM, mais
 * ils doivent tout de même être distingués des installations qui arrivent
 * depuis une autre surface. Cette fonction est volontairement pure afin que
 * tous les composants de CTA appliquent exactement la même règle.
 */
export function withWebsiteAttribution(
  evidence: URLSearchParams,
  campaign: string,
): URLSearchParams {
  const enriched = new URLSearchParams(evidence);
  if (!enriched.has('pid')) enriched.set('pid', 'website');
  if (!enriched.has('c')) enriched.set('c', campaign || 'website');
  return enriched;
}
