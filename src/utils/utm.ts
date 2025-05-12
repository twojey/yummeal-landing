export const withUtmParams = (url: string) => {
  // Récupère les UTM actuels depuis l'URL
  const currentUrl = new URL(window.location.href);
  const utmParams = new URLSearchParams(currentUrl.search);
  
  // Filtre seulement les paramètres UTM valides
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const validUtm = new URLSearchParams();
  
  utmKeys.forEach(key => {
    if (utmParams.has(key)) {
      validUtm.set(key, utmParams.get(key)!);
    }
  });

  // Construit la nouvelle URL
  const targetUrl = new URL(url);
  const separator = targetUrl.search ? '&' : '?';
  
  return `${url}${validUtm.toString() ? `${separator}${validUtm}` : ''}`;
};
