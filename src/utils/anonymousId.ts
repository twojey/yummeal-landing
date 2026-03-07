/**
 * Gestion de l'identifiant anonyme persistant pour le tracking
 * Cet identifiant est utilisé pour lier tous les événements d'une session
 */

const ANON_ID_KEY = 'yummeal_anon_id';
const ANON_ID_EXPIRY_KEY = 'yummeal_anon_id_expiry';
const ANON_ID_EXPIRY_DAYS = 365; // Conserver l'ID pendant 1 an

/**
 * Génère un nouvel identifiant anonyme unique
 * Format: timestamp + random UUID
 */
function generateAnonymousId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15) +
                     Math.random().toString(36).substring(2, 15);
  return `anon_${timestamp}_${randomPart}`;
}

/**
 * Récupère ou crée l'identifiant anonyme persistant
 * @returns L'identifiant anonyme unique pour ce navigateur
 */
export function getAnonymousId(): string {
  if (typeof localStorage === 'undefined') {
    // Fallback pour les environnements sans localStorage
    return generateAnonymousId();
  }

  try {
    // Vérifier si un ID existe et n'a pas expiré
    const storedId = localStorage.getItem(ANON_ID_KEY);
    const expiryStr = localStorage.getItem(ANON_ID_EXPIRY_KEY);

    if (storedId && expiryStr) {
      const expiry = parseInt(expiryStr, 10);
      if (Date.now() < expiry) {
        console.log('[AnonymousId] ID existant récupéré:', storedId);
        return storedId;
      }
    }

    // Créer un nouvel ID
    const newId = generateAnonymousId();
    const expiryTime = Date.now() + (ANON_ID_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

    localStorage.setItem(ANON_ID_KEY, newId);
    localStorage.setItem(ANON_ID_EXPIRY_KEY, expiryTime.toString());

    console.log('[AnonymousId] Nouvel ID généré:', newId);
    return newId;
  } catch {
    console.error('[AnonymousId] Erreur lors de la gestion de l\'ID anonyme');
    return generateAnonymousId();
  }
}

/**
 * Réinitialise l'identifiant anonyme (utile pour les tests ou les déconnexions)
 */
export function resetAnonymousId(): void {
  if (typeof localStorage === 'undefined') return;

  try {
    localStorage.removeItem(ANON_ID_KEY);
    localStorage.removeItem(ANON_ID_EXPIRY_KEY);
    console.log('[AnonymousId] ID anonyme réinitialisé');
  } catch {
    console.error('[AnonymousId] Erreur lors de la réinitialisation');
  }
}

/**
 * Vérifie si un ID anonyme existe
 */
export function hasAnonymousId(): boolean {
  if (typeof localStorage === 'undefined') return false;

  try {
    return localStorage.getItem(ANON_ID_KEY) !== null;
  } catch {
    return false;
  }
}
