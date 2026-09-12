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
 * ⚠️ CONSTAT DU 12/09/2026 QUI CONTRAINT LE LANCEMENT POLONAIS, confirmé à la
 * source (`asccli app-availability get --app-id 6744942441`, l'API App Store
 * Connect) : l'application iOS est disponible dans **2 territoires sur 175**,
 * la France et la Côte d'Ivoire. La Pologne est en `CANNOT_SELL`
 * (`isAvailable: false`), et `isAvailableInNewTerritories` vaut `false`.
 *
 * Les signaux publics concordent : `apps.apple.com/pl/app/.../id6744942441`
 * renvoie 404, et `itunes.apple.com/lookup?...&country=pl` renvoie
 * `resultCount: 0` (1 pour `country=fr`).
 *
 * En revanche, les ABONNEMENTS sont déjà disponibles dans les 175 territoires,
 * Pologne incluse, aux prix polonais réels (19,99 PLN/mois, 149,99 PLN/an —
 * vérifiés via `asccli subscription-price-schedule get`). Ouvrir la Pologne est
 * donc un seul interrupteur dans App Store Connect (Pricing and Availability),
 * pas un chantier de tarification. `asccli` ne sait que LIRE cette valeur : le
 * geste est manuel, et le site ne peut pas le contourner.
 *
 * ✅ POLOGNE OUVERTE le 12/09/2026 (`PATCH /v1/territoryAvailabilities`), et
 * la vitrine publique a propagé le soir même : `apps.apple.com/pl/app/…` sert
 * une vraie fiche (HTTP 200, prix en zł). Vérifié à la source avec
 * `asccli app-availability get --app-id 6744942441` → FRA, CIV, POL (3/175).
 * `apple` n'est donc plus `null` en polonais.
 *
 * ⚠️ Piège de mesure, s'il faut revérifier un jour :
 * `itunes.apple.com/lookup?id=…&country=pl` renvoie 0 **en minuscules** et 1
 * en MAJUSCULES, pour la Pologne et pour elle seule (`fr`/`FR` et `ci`/`CI`
 * répondent 1 dans les deux casses). Un 0 en minuscules ne prouve donc RIEN :
 * croiser avec `asccli` et la page produit.
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
    // Slug polonais réel, relevé sur la redirection servie par Apple :
    // `/pl/app/fridge-recipes-yummeal/…`. Le slug est décoratif mais pas
    // omissible (la forme sans slug renvoie 404).
    apple: `https://apps.apple.com/pl/app/fridge-recipes-yummeal/${APP_STORE_ID}`,
    google: `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}&hl=pl`,
  },
};

/** Les URLs de la langue par défaut, pour le code qui n'a pas de locale. */
export const STORE_URLS_DEFAUT = STORES_FR;

/**
 * Adresse de contact publique — SEULE déclaration du site.
 *
 * Elle était recopiée 11 fois dans quatre fichiers (CGU ×5, suppression de
 * compte ×3, à propos ×2, confidentialité ×1), et c'était
 * `contact@yummeal.com`. Or ce domaine **n'appartient pas à la société** :
 *   - `dig NS yummeal.com` → `ns1/ns2.afternic.com`, une place de marché de
 *     noms de domaine ; créé en 2006, chez un autre registrar ;
 *   - `dig MX yummeal.com` → `0 .`, un null MX (RFC 7505) : le domaine déclare
 *     n'accepter aucun courrier ;
 *   - `dig TXT yummeal.com` → `v=spf1 -all` : et n'en émettre aucun.
 *
 * Cette adresse servait de contact RGPD, de contact légal des CGU et de recours
 * en cas d'échec de la suppression de compte — une page exigée par Apple et par
 * Google Play. Aucune de ces demandes n'arrivait, et un catch-all activé par le
 * propriétaire du domaine parqué lui aurait livré des données personnelles.
 *
 * ⚠️ `yummeal.app` est bien le domaine de la société (il porte un `brevo-code:`
 * et deux `google-site-verification`), mais il n'a **pas encore de MX** : le
 * courrier envoyé ici rebondit jusqu'à ce qu'une boîte soit créée. C'est
 * volontaire et c'est mieux que l'état précédent — un rebond est visible,
 * une remise à un tiers ne l'est pas. `tests/api-urls.test.mjs` interdit tout
 * retour en arrière.
 */
export const CONTACT_EMAIL = 'contact@yummeal.app';
