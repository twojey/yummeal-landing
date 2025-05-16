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
    document.addEventListener('DOMContentLoaded', () => setupTrackingWithRetry());
  } else {
    setupTrackingWithRetry();
  }
};

/**
 * Configure le tracking avec plusieurs tentatives
 */
function setupTrackingWithRetry(attempts = 0, maxAttempts = 5): void {
  console.log(`[AutoTracking] Tentative ${attempts + 1}/${maxAttempts}...`);
  
  // Essayer d'attacher les événements de tracking
  const found = attachTrackingToLinks();
  
  // Si aucun lien n'est trouvé et qu'il reste des tentatives, réessayer après un délai
  if (!found && attempts < maxAttempts - 1) {
    console.log(`[AutoTracking] Aucun lien trouvé, nouvelle tentative dans ${(attempts + 1) * 500}ms...`);
    setTimeout(() => {
      setupTrackingWithRetry(attempts + 1, maxAttempts);
    }, (attempts + 1) * 500);
  }
};

/**
 * Ajoute manuellement le tracking aux boutons spécifiques
 */
export const addTrackingToSpecificButtons = (): void => {
  console.log('[AutoTracking] Ajout manuel du tracking aux boutons spécifiques...');
  
  // Cibler spécifiquement les boutons que nous connaissons
  const heroButtons = document.querySelector('.hero-buttons');
  
  if (heroButtons) {
    console.log('[AutoTracking] Section hero-buttons trouvée');
    
    // Trouver les liens dans cette section
    const links = heroButtons.querySelectorAll('a');
    console.log(`[AutoTracking] ${links.length} liens trouvés dans hero-buttons`);
    
    links.forEach((link) => {
      const anchor = link as HTMLAnchorElement;
      const href = anchor.href || '';
      const platform = href.includes('apple') || href.includes('ios') ? 'apple' : 'google';
      
      // Déterminer l'emplacement précis du bouton
      let buttonLocation = '';
      
      // Vérifier si le bouton est dans la section hero
      if (heroButtons.classList.contains('hero-buttons') || 
          heroButtons.closest('.hero') || 
          heroButtons.closest('[class*="hero"]')) {
        buttonLocation = `hero_${platform}_button`;
      } 
      // Vérifier si le bouton est dans le footer
      else if (heroButtons.closest('footer') || heroButtons.closest('[class*="footer"]')) {
        buttonLocation = `footer_${platform}_button`;
      }
      // Vérifier si le bouton est dans le header
      else if (heroButtons.closest('header') || heroButtons.closest('[class*="header"]')) {
        buttonLocation = `header_${platform}_button`;
      }
      // Fallback: utiliser le nom de la classe du conteneur
      else {
        const containerClasses = Array.from(heroButtons.classList);
        if (containerClasses.length > 0) {
          buttonLocation = `${containerClasses[0]}_${platform}_button`;
        } else {
          buttonLocation = `landing_page_${platform}_button`;
        }
      }
      
      console.log(`[AutoTracking] Ajout manuel du tracking au bouton ${platform} (${buttonLocation})`);
      
      // Ajouter l'écouteur d'événement
      link.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(`[AutoTracking] Clic sur bouton ${platform} (${buttonLocation})`);
        
        // Tracker l'événement
        import('./tracking').then(module => {
          module.trackDownloadClick(platform, buttonLocation);
          
          // Ouvrir le lien après un court délai
          setTimeout(() => {
            window.open(href, '_blank', 'noopener,noreferrer');
          }, 100);
        });
      });
      
      // Marquer comme traité
      link.setAttribute('data-tracking-attached', 'true');
    });
  } else {
    console.warn('[AutoTracking] Section hero-buttons non trouvée');
  }
};

/**
 * Attache les événements de tracking aux liens
 * @returns true si des liens ont été trouvés, false sinon
 */
function attachTrackingToLinks(): boolean {
  console.log('[AutoTracking] Recherche des liens de téléchargement...');
  
  // Approche 1: Sélectionner par URL exacte
  let appStoreLinks = document.querySelectorAll('a[href*="apps.apple.com"], a[href*="apple.com/app"]');
  let googlePlayLinks = document.querySelectorAll('a[href*="play.google.com"]');
  
  console.log('[AutoTracking] Recherche par URL exacte:', appStoreLinks.length, googlePlayLinks.length);
  
  // Approche 2: Sélectionner par attributs href plus génériques
  if (appStoreLinks.length === 0) {
    const appleHrefLinks = document.querySelectorAll('a[href*="apple"], a[href*="ios"], a[href*="app-store"]');
    appStoreLinks = Array.from(appleHrefLinks).filter(link => {
      return !link.hasAttribute('data-tracking-attached');
    }) as unknown as NodeListOf<Element>;
  }
  
  if (googlePlayLinks.length === 0) {
    const googleHrefLinks = document.querySelectorAll('a[href*="google"], a[href*="android"], a[href*="play"]');
    googlePlayLinks = Array.from(googleHrefLinks).filter(link => {
      return !link.hasAttribute('data-tracking-attached');
    }) as unknown as NodeListOf<Element>;
  }
  
  console.log('[AutoTracking] Recherche par href générique:', appStoreLinks.length, googlePlayLinks.length);
  
  // Approche 3: Chercher dans les classes et attributs
  if (appStoreLinks.length === 0 && googlePlayLinks.length === 0) {
    // Rechercher tous les liens qui pourraient être des liens de téléchargement
    const allLinks = document.querySelectorAll('a:not([data-tracking-attached])');
    const appLinks: HTMLAnchorElement[] = [];
    const googleLinks: HTMLAnchorElement[] = [];
    
    allLinks.forEach(link => {
      const anchor = link as HTMLAnchorElement;
      const href = anchor.href || '';
      const text = anchor.textContent?.toLowerCase() || '';
      const classes = Array.from(anchor.classList).join(' ').toLowerCase();
      const imgAlt = anchor.querySelector('img')?.getAttribute('alt')?.toLowerCase() || '';
      
      // Vérifier si c'est un lien App Store
      if (
        href.includes('apple') || 
        text.includes('app store') || 
        text.includes('apple') || 
        text.includes('ios') || 
        classes.includes('apple') || 
        classes.includes('ios') || 
        classes.includes('app-store') || 
        imgAlt.includes('apple') || 
        imgAlt.includes('app store')
      ) {
        appLinks.push(anchor);
      }
      
      // Vérifier si c'est un lien Google Play
      if (
        href.includes('google') || 
        href.includes('play') || 
        text.includes('google play') || 
        text.includes('android') || 
        classes.includes('google') || 
        classes.includes('play') || 
        classes.includes('android') || 
        imgAlt.includes('google') || 
        imgAlt.includes('play')
      ) {
        googleLinks.push(anchor);
      }
    });
    
    appStoreLinks = appLinks as unknown as NodeListOf<Element>;
    googlePlayLinks = googleLinks as unknown as NodeListOf<Element>;
  }
  
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
  
  // Marquer les liens comme traités pour éviter les doublons
  const markAsTracked = (link: Element) => {
    link.setAttribute('data-tracking-attached', 'true');
  };
  
  if (appStoreLinks.length > 0 || googlePlayLinks.length > 0) {
    console.log('[AutoTracking] Configuration terminée avec succès');
    
    // Marquer tous les liens comme traités
    appStoreLinks.forEach(markAsTracked);
    googlePlayLinks.forEach(markAsTracked);
    
    return true;
  } else {
    console.warn('[AutoTracking] Aucun lien de téléchargement trouvé');
    return false;
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
  if (linkText.includes('télécharger') || linkText.includes('download') || 
      linkText.includes('app store') || linkText.includes('google play') ||
      linkText.includes('disponible')) {
    // Essayer de déterminer la section
    const section = getSectionName(link);
    return `${section}_${platform}_button`;
  }
  
  // 4. Vérifier les attributs data-*
  for (let i = 0; i < link.attributes.length; i++) {
    const attr = link.attributes[i];
    if (attr.name.startsWith('data-') && 
        (attr.value.includes('download') || attr.value.includes('store'))) {
      return `${attr.value}_${platform}_button`;
    }
  }
  
  // 5. Fallback: utiliser la position dans la page
  return `${window.location.pathname}_${platform}_button_${index}`;
}

/**
 * Détermine la section de la page où se trouve le bouton
 */
function getSectionName(element: Element): string {
  // Remonter l'arbre DOM pour trouver la section
  let current: Element | null = element;
  let depth = 0;
  const maxDepth = 8; // Augmenter la profondeur pour trouver des sections plus éloignées
  
  // Liste des classes et attributs qui pourraient indiquer une section
  const sectionIndicators = [
    'hero', 'header', 'footer', 'banner', 'section', 'main', 'nav',
    'download', 'cta', 'action', 'buttons', 'container'
  ];
  
  // Liste des éléments HTML qui sont généralement des sections
  const sectionElements = ['section', 'header', 'footer', 'main', 'nav', 'article', 'aside'];
  
  while (current && depth < maxDepth) {
    // 1. Vérifier si l'élément a un ID
    if (current.id) {
      return current.id;
    }
    
    // 2. Vérifier si l'élément est un type de section
    if (sectionElements.includes(current.tagName.toLowerCase())) {
      // Si c'est une section avec un ID ou une classe spécifique, l'utiliser
      if (current.id) {
        return current.id;
      } else if (current.classList.length > 0) {
        return Array.from(current.classList)[0];
      } else {
        return current.tagName.toLowerCase();
      }
    }
    
    // 3. Vérifier les attributs data-* qui pourraient indiquer une section
    for (let i = 0; i < current.attributes.length; i++) {
      const attr = current.attributes[i];
      if (attr.name.startsWith('data-section') || 
          attr.name.startsWith('data-area') || 
          attr.name.startsWith('data-location')) {
        return attr.value;
      }
    }
    
    // 4. Vérifier si l'élément a une classe qui pourrait indiquer une section
    if (current.classList.length > 0) {
      const classList = Array.from(current.classList);
      
      // Chercher des classes spécifiques qui indiquent une section
      for (const indicator of sectionIndicators) {
        const matchingClass = classList.find(cls => cls.includes(indicator));
        if (matchingClass) {
          return matchingClass;
        }
      }
      
      // Si aucune classe spécifique n'est trouvée, utiliser la première classe
      if (classList.length > 0 && depth > 2) { // Ne prendre la première classe que si on a déjà remonté un peu
        return classList[0];
      }
    }
    
    // Remonter au parent
    current = current.parentElement;
    depth++;
  }
  
  // Si on est sur la page d'accueil
  if (window.location.pathname === '/' || window.location.pathname === '') {
    return 'homepage';
  }
  
  // Fallback: utiliser le chemin de la page
  const path = window.location.pathname.split('/').filter(p => p).pop();
  return path ? path : 'landing_page';
}
