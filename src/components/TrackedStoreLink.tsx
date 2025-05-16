/**
 * Composant TrackedStoreLink
 * 
 * Lien vers les stores d'applications avec tracking automatique
 */

import { AnchorHTMLAttributes } from 'react';
import { trackDownloadClick } from '../utils/tracking';
import { withUtmParams } from '../utils/utmTracker';

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
 * URLs des stores d'applications
 */
const STORE_URLS = {
  apple: 'https://apps.apple.com/fr/app/yummeal-cuisiner-sain/id6744942441',
  google: 'https://play.google.com/store/apps/details?id=com.yummeal'
};

/**
 * Composant de lien vers les stores avec tracking intégré
 */
export default function TrackedStoreLink({ store, trackingId, ...props }: Props): JSX.Element {
  /**
   * Gère le clic sur le lien et envoie les événements de tracking
   */
  const handleClick = (): void => {
    // Déterminer l'emplacement du bouton pour le tracking
    const buttonLocation = trackingId || props.id || window.location.pathname;
    
    try {
      // Enregistrer l'événement de téléchargement
      trackDownloadClick(store, buttonLocation);
      
      // Construire l'URL avec les paramètres UTM
      const targetUrl = withUtmParams(STORE_URLS[store]);
      
      // Ouvrir l'URL dans un nouvel onglet
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('[TrackedStoreLink] Erreur:', error);
      // Fallback en cas d'erreur - ouvrir quand même l'URL
      window.open(STORE_URLS[store], '_blank', 'noopener,noreferrer');
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
