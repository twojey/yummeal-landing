import { useLocation } from 'react-router-dom';
import { decoupeLocale, type Locale } from './config';
import { fr, type Dictionnaire } from './fr';
import { pl } from './pl';

const DICTIONNAIRES: Record<Locale, Dictionnaire> = { fr, pl };

/**
 * La langue courante se déduit de l'URL, et de rien d'autre.
 *
 * Pas de contexte React, pas de provider, pas de détection `navigator.language`
 * ni de cookie. Trois raisons, dans l'ordre d'importance :
 *
 *  1. Le prerender (SSR) et le client doivent produire le MÊME HTML pour la
 *     même URL. Toute langue issue du navigateur casse l'hydratation et,
 *     surtout, ferait servir aux robots une langue différente de celle du
 *     visiteur.
 *  2. Google demande explicitement qu'une URL serve une seule langue, stable.
 *     Rediriger ou substituer selon `Accept-Language` empêche l'indexation de
 *     la version qui n'est pas celle du crawler.
 *  3. Un utilisateur qui partage un lien partage la langue avec.
 *
 * Le choix de langue se fait donc par un LIEN (le sélecteur), qui navigue.
 */
export function useLocale(): {
  locale: Locale;
  /** Le chemin sans préfixe de langue — la clé d'équivalence entre versions. */
  chemin: string;
  /** Le dictionnaire de la langue courante. */
  t: Dictionnaire;
} {
  const { pathname } = useLocation();
  const { locale, chemin } = decoupeLocale(pathname);
  return { locale, chemin, t: DICTIONNAIRES[locale] };
}

/** Accès hors composant (prerender, génération de sitemap). */
export function dictionnaire(locale: Locale): Dictionnaire {
  return DICTIONNAIRES[locale];
}
