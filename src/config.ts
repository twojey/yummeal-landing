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

/**
 * URLs des stores — SEULE déclaration du site.
 *
 * Elles étaient recopiées dans cinq fichiers (App.tsx ×3, DownloadButtons,
 * TrackedStoreLink, schema.ts, AProposPage), soit exactement la duplication qui
 * avait rendu la page de suppression de compte inopérante côté backend.
 *
 * ⚠️ CONSTAT DU 12/09/2026, VÉRIFIÉ, QUI CONTRAINT LE LANCEMENT POLONAIS :
 * l'application iOS n'est distribuée QUE dans la boutique française.
 *   - `https://apps.apple.com/pl/app/.../id6744942441` renvoie 404 (comme
 *     `/de/`, `/us/`, `/gb/`, `/be/`, `/ch/`, `/ca/`) ;
 *   - `https://itunes.apple.com/lookup?id=6744942441&country=pl` renvoie
 *     `resultCount: 0`, et 1 pour `country=fr`.
 * Deux signaux indépendants concordent : la disponibilité iOS est limitée à la
 * France. C'est une décision à prendre dans App Store Connect (Pricing and
 * Availability), pas quelque chose que le site peut contourner.
 *
 * Conséquence assumée ici : `apple` vaut `null` en polonais, et les composants
 * n'affichent alors que Google Play. Un bouton App Store sur la page de
 * lancement polonaise enverrait le visiteur sur une 404 — c'est le pire
 * endroit possible pour un lien mort. Le jour où la distribution est étendue,
 * il suffit de remplir cette valeur.
 *
 * Apple exige un code pays dans l'URL et sert la fiche de ce pays ; l'`id`
 * numérique identifie l'application, le slug n'est que décoratif (mais pas
 * omissible : la forme sans slug renvoie 404). Google Play choisit la langue
 * depuis le compte du visiteur et accepte `hl=` pour la forcer.
 */
const APP_STORE_ID = 'id6744942441';
const PLAY_PACKAGE = 'com.yummeal';

export interface LiensStores {
  /** `null` quand l'application n'est pas distribuée dans cette boutique. */
  apple: string | null;
  google: string;
}

/**
 * Déclaré à part et SANS annotation de type, pour que TypeScript infère
 * `apple: string` (et non `string | null`) : le code qui ne gère qu'une seule
 * langue n'a alors pas à tester la nullité d'une URL qui existe toujours.
 */
const STORES_FR = {
  apple: `https://apps.apple.com/fr/app/recettes-du-frigo-yummeal/${APP_STORE_ID}`,
  // Volontairement SANS `hl=fr` : c'est l'URL déjà en ligne et déjà suivie
  // côté attribution. On ne la modifie pas pour une raison cosmétique.
  google: `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`,
};

export const STORE_URLS: Record<'fr' | 'pl', LiensStores> = {
  fr: STORES_FR,
  pl: {
    apple: null,
    google: `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}&hl=pl`,
  },
};

/** Les URLs de la langue par défaut, pour le code qui n'a pas de locale. */
export const STORE_URLS_DEFAUT = STORES_FR;
