/**
 * Configuration globale de l'application.
 *
 * ⚠️ `API_BASE_URL` est la SEULE déclaration de l'URL du backend dans tout le
 * site. Elle était auparavant recopiée dans trois fichiers, et quand le
 * backend a migré de `*.deno.dev` (sunset de Deno Deploy Classic) vers
 * `*.yumhack.deno.net`, deux de ces copies n'ont pas suivi : la page de
 * suppression de compte — exigée par Apple et par Google Play — appelait un
 * domaine mort et ne pouvait donc pas fonctionner, sans aucune erreur visible
 * au build.
 *
 * `tests/api-urls.test.mjs` interdit désormais toute nouvelle copie : ajouter
 * une URL de backend ailleurs fait échouer les tests.
 */
export const API_BASE_URL = 'https://yummeal-server.yumhack.deno.net';

export const config = {
  api: {
    baseUrl: API_BASE_URL
  },
  facebook: {
    pixelId: process.env.REACT_APP_FB_PIXEL_ID || '123456789012345',
    accessToken: process.env.REACT_APP_FB_ACCESS_TOKEN || '',
    testEventCode: process.env.REACT_APP_FB_TEST_EVENT_CODE || ''
  },
  tracking: {
    enabled: process.env.NODE_ENV === 'production'
  }
};
