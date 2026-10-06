/**
 * Composant TrackedStoreLink
 * 
 * Lien vers les stores d'applications avec tracking automatique
 */

import { AnchorHTMLAttributes } from 'react';
import { trackDownloadClick } from '../utils/tracking';
import { captureAcquisition, buildAcquisitionLink, withWebsiteAttribution } from '../utils/acquisitionLink';
import { STORE_URLS_DEFAUT } from '../config';
import { getAnonymousId } from '../utils/anonymousId';
import { selectConversionVariant } from '../data/conversionOptimization';

/**
 * Propriétés du composant
 */
interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Plateforme ciblée (apple/google) */
  store: 'apple' | 'google';
  /** Identifiant optionnel pour le tracking (sinon utilise le pathname) */
  trackingId?: string;
}

/**
 * URLs des stores — reprises de src/config.ts, seule déclaration du site.
 *
 * Ce composant n'est pas un hook et sert aussi hors contexte de routeur : il
 * prend donc les URL de la langue par défaut. Les boutons de téléchargement
 * visibles passent par `DownloadButtons`, qui suit la langue de la page.
 */
const STORE_URLS = {
  apple: STORE_URLS_DEFAUT.apple,
  google: STORE_URLS_DEFAUT.google
};

/**
 * Composant de lien vers les stores avec tracking intégré
 */
export default function TrackedStoreLink({ store, trackingId, ...props }: Props): JSX.Element {
  /**
   * Gère le clic sur le lien et envoie les événements de tracking
   */
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    console.group('%c[TrackedStoreLink] Clic sur bouton de téléchargement', 'color: #2196F3; font-weight: bold');
    
    // Déterminer l'emplacement du bouton pour le tracking
    const buttonLocation = trackingId || props.id || `${window.location.pathname}_${store}_button`;
    console.log('%cStore:', 'font-weight: bold', store);
    console.log('%cEmplacement:', 'font-weight: bold', buttonLocation);
    console.log('%cURL cible:', 'font-weight: bold', STORE_URLS[store]);
    
    try {
      // Enregistrer l'événement de téléchargement
      console.log('%cDéclenchement du tracking...', 'font-weight: bold');
      const conversionVariant = selectConversionVariant(window.location.pathname, getAnonymousId());
      trackDownloadClick(store, buttonLocation, conversionVariant.id);
      
      // Construire l'URL avec les paramètres UTM
      const evidence = captureAcquisition(window.location.search, window.sessionStorage);
      const targetUrl = buildAcquisitionLink(
        STORE_URLS[store],
        store,
        withWebsiteAttribution(evidence, buttonLocation),
      );
      console.log('%cURL avec paramètres UTM:', 'font-weight: bold', targetUrl);

      // Le navigateur suit le lien dans le geste utilisateur : Safari ne
      // bloque pas la navigation et keepalive conserve l'événement tracking.
      event.currentTarget.href = targetUrl;
      console.groupEnd();
    } catch (error) {
      console.error('%c[TrackedStoreLink] Erreur:', 'color: #F44336; font-weight: bold', error);
      // Fallback en cas d'erreur - ouvrir quand même l'URL
      event.currentTarget.href = STORE_URLS[store];
      console.groupEnd();
    }
  };

  return (
    <a 
      {...props}
      onClick={handleClick}
      style={{ ...props.style, cursor: 'pointer' }}
      role="button"
      aria-label={`Télécharger sur ${store === 'apple' ? 'App Store' : 'Google Play'}`}
    />
  );
}
