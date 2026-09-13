/**
 * Garde-fous de la page de consentement OAuth.
 *
 * Supabase vérifie déjà que l'adresse de retour correspond EXACTEMENT à celle
 * enregistrée par le client. Mais l'enregistrement dynamique de clients permet
 * à n'importe qui d'enregistrer un client : on ne suit donc jamais aveuglément
 * une URL, même renvoyée par le serveur.
 */

/** Chemin public de la page (doit correspondre à `authorization_url_path`). */
export const CHEMIN_CONSENTEMENT = '/oauth/consent';

const ID_AUTORISATION = /^[A-Za-z0-9_-]{8,128}$/;

/** Schémas capables d'exécuter du code ou de lire un fichier local. */
const SCHEMAS_INTERDITS = new Set([
  'javascript:',
  'data:',
  'vbscript:',
  'file:',
  'blob:',
  'about:',
]);

const HOTES_LOCAUX = new Set(['localhost', '127.0.0.1', '[::1]']);

/** Lit et valide `authorization_id` ; `null` si absent ou mal formé. */
export function lireAuthorizationId(search: string): string | null {
  const valeur = new URLSearchParams(search).get('authorization_id');
  return valeur && ID_AUTORISATION.test(valeur) ? valeur : null;
}

/**
 * Adresse de retour acceptable ?
 *  - `https:` : oui (ChatGPT, Claude) ;
 *  - `http:` : seulement vers la machine locale (clients MCP de bureau) ;
 *  - schéma d'application (`cursor://…`) : oui, sauf les schémas exécutables.
 */
export function urlDeRetourSure(brute: string | null | undefined): URL | null {
  if (!brute) return null;
  let url: URL;
  try {
    url = new URL(brute);
  } catch {
    return null;
  }
  const schema = url.protocol.toLowerCase();
  if (SCHEMAS_INTERDITS.has(schema)) return null;
  if (schema === 'https:') return url;
  if (schema === 'http:') return HOTES_LOCAUX.has(url.hostname) ? url : null;
  return /^[a-z][a-z0-9+.-]*:$/.test(schema) ? url : null;
}

/** Destination affichée à l'utilisateur : le domaine, pas l'URL entière. */
export function destinationLisible(brute: string): string {
  const url = urlDeRetourSure(brute);
  if (!url) return brute;
  if (url.protocol === 'https:' || url.protocol === 'http:') return url.host;
  return `${url.protocol}//${url.host}`;
}

/** URL où revenir après un lien magique ou une connexion sociale. */
export function urlRetourConnexion(origine: string, authorizationId: string): string {
  return `${origine}${CHEMIN_CONSENTEMENT}?authorization_id=${encodeURIComponent(authorizationId)}`;
}
