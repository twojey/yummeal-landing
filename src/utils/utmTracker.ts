export const getUtmParams = (): string => {
  const params = new URLSearchParams(window.location.search);
  const utmParams = new URLSearchParams();

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    const value = params.get(param);
    if (value) utmParams.set(param, value);
  });

  return utmParams.toString();
};

export const withUtmParams = (url: string): string => {
  const utmParams = getUtmParams();
  if (!utmParams) return url;
  
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${utmParams}`;
};
