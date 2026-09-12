/**
 * Composant TrackedStoreLink
 * 
 * Lien vers les stores d'applications avec tracking automatique
 */

import { AnchorHTMLAttributes } from 'react';
import { trackDownloadClick } from '../utils/tracking';
import { withUtmParams } from '../utils/utmTracker';
import { STORE_URLS_DEFAUT } from '../config';

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
  const handleClick = (): void => {
    console.group('%c[TrackedStoreLink] Clic sur bouton de téléchargement', 'color: #2196F3; font-weight: bold');
    
    // Déterminer l'emplacement du bouton pour le tracking
    const buttonLocation = trackingId || props.id || `${window.location.pathname}_${store}_button`;
    console.log('%cStore:', 'font-weight: bold', store);
    console.log('%cEmplacement:', 'font-weight: bold', buttonLocation);
    console.log('%cURL cible:', 'font-weight: bold', STORE_URLS[store]);
    
    try {
      // Enregistrer l'événement de téléchargement
      console.log('%cDéclenchement du tracking...', 'font-weight: bold');
      trackDownloadClick(store, buttonLocation);
      
      // Construire l'URL avec les paramètres UTM
      const targetUrl = withUtmParams(STORE_URLS[store]);
      console.log('%cURL avec paramètres UTM:', 'font-weight: bold', targetUrl);
      
      // Ajouter un délai pour laisser le temps au tracking de s'exécuter
      console.log('%cOuverture de l\'URL dans 100ms...', 'font-weight: bold');
      setTimeout(() => {
        // Ouvrir l'URL dans un nouvel onglet
        const newWindow = window.open(targetUrl, '_blank', 'noopener,noreferrer');
        console.log('%cNouvelle fenêtre ouverte:', 'font-weight: bold', !!newWindow);
        console.groupEnd();
      }, 100);
    } catch (error) {
      console.error('%c[TrackedStoreLink] Erreur:', 'color: #F44336; font-weight: bold', error);
      // Fallback en cas d'erreur - ouvrir quand même l'URL
      window.open(STORE_URLS[store], '_blank', 'noopener,noreferrer');
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
