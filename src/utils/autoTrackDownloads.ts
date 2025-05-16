/**
 * Utilitaire pour ajouter automatiquement le tracking aux liens de téléchargement
 */
import { trackDownloadClick } from './tracking';

/**
 * Ajoute le tracking à tous les liens de téléchargement d'application
 */
export const setupAutoTracking = (): void => {
  if (typeof document === 'undefined') return;

  // Attendre que le DOM soit chargé
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachTrackingToLinks);
  } else {
    attachTrackingToLinks();
  }
};

/**
 * Attache les événements de tracking aux liens
 */
function attachTrackingToLinks(): void {
  console.log('[AutoTracking] Recherche des liens de téléchargement...');
  
  // Sélectionner tous les liens vers les stores
  const appStoreLinks = document.querySelectorAll('a[href*="apps.apple.com"]');
  const googlePlayLinks = document.querySelectorAll('a[href*="play.google.com"]');
  
  console.log(`[AutoTracking] Trouvé ${appStoreLinks.length} liens App Store et ${googlePlayLinks.length} liens Google Play`);
  
  // Ajouter le tracking aux liens App Store
  appStoreLinks.forEach((link, index) => {
    // Cast vers HTMLAnchorElement pour accéder à la propriété href
    const anchor = link as HTMLAnchorElement;
    const buttonLocation = getButtonLocation(link, 'apple', index);
    const href = anchor.href; // Stocker l'URL pour l'utiliser plus tard
    
    link.addEventListener('click', (event) => {
      // Empêcher le comportement par défaut temporairement
      event.preventDefault();
      
      console.log(`[AutoTracking] Clic sur lien App Store (${buttonLocation})`);
      
      // Tracker l'événement
      trackDownloadClick('apple', buttonLocation);
      
      // Ouvrir le lien après un court délai pour laisser le temps au tracking de s'exécuter
      setTimeout(() => {
        window.open(href, '_blank', 'noopener,noreferrer');
      }, 100);
    });
    
    console.log(`[AutoTracking] Tracking ajouté au lien App Store #${index} (${buttonLocation})`);
  });
  
  // Ajouter le tracking aux liens Google Play
  googlePlayLinks.forEach((link, index) => {
    // Cast vers HTMLAnchorElement pour accéder à la propriété href
    const anchor = link as HTMLAnchorElement;
    const buttonLocation = getButtonLocation(link, 'google', index);
    const href = anchor.href; // Stocker l'URL pour l'utiliser plus tard
    
    link.addEventListener('click', (event) => {
      // Empêcher le comportement par défaut temporairement
      event.preventDefault();
      
      console.log(`[AutoTracking] Clic sur lien Google Play (${buttonLocation})`);
      
      // Tracker l'événement
      trackDownloadClick('google', buttonLocation);
      
      // Ouvrir le lien après un court délai pour laisser le temps au tracking de s'exécuter
      setTimeout(() => {
        window.open(href, '_blank', 'noopener,noreferrer');
      }, 100);
    });
    
    console.log(`[AutoTracking] Tracking ajouté au lien Google Play #${index} (${buttonLocation})`);
  });
  
  if (appStoreLinks.length > 0 || googlePlayLinks.length > 0) {
    console.log('[AutoTracking] Configuration terminée avec succès');
  } else {
    console.warn('[AutoTracking] Aucun lien de téléchargement trouvé');
  }
}

/**
 * Détermine l'emplacement du bouton pour le tracking
 */
function getButtonLocation(link: Element, platform: string, index: number): string {
  // Essayer de déterminer l'emplacement du bouton
  
  // 1. Vérifier si le lien a un ID
  if (link.id) {
    return link.id;
  }
  
  // 2. Vérifier si le lien a une classe spécifique
  if (link.classList.contains('clay-btn')) {
    // Déterminer la section de la page
    const section = getSectionName(link);
    return `${section}_${platform}_button`;
  }
  
  // 3. Vérifier le texte du lien
  const linkText = link.textContent?.trim().toLowerCase() || '';
  if (linkText.includes('télécharger') || linkText.includes('download')) {
    return `download_${platform}_button_${index}`;
  }
  
  // 4. Fallback: utiliser la position dans la page
  return `${window.location.pathname}_${platform}_button_${index}`;
}

/**
 * Détermine la section de la page où se trouve le bouton
 */
function getSectionName(element: Element): string {
  // Remonter l'arbre DOM pour trouver la section
  let current: Element | null = element;
  let depth = 0;
  const maxDepth = 5; // Éviter de remonter trop haut
  
  while (current && depth < maxDepth) {
    // Vérifier si l'élément a un ID
    if (current.id) {
      return current.id;
    }
    
    // Vérifier si l'élément a une classe qui pourrait indiquer une section
    const classList = Array.from(current.classList);
    const sectionClasses = classList.filter(cls => 
      cls.includes('section') || 
      cls.includes('hero') || 
      cls.includes('footer') || 
      cls.includes('header') ||
      cls.includes('banner')
    );
    
    if (sectionClasses.length > 0) {
      return sectionClasses[0];
    }
    
    // Remonter au parent
    current = current.parentElement;
    depth++;
  }
  
  // Fallback
  return 'unknown_section';
}
