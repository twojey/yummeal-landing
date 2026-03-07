/**
 * Service d'enrichissement des événements de tracking
 * Valide et enrichit les événements avant envoi à l'API
 */

import { getAnonymousId } from './anonymousId';

interface EnrichedEvent {
  name: string;
  properties: Record<string, unknown>;
}

/**
 * Enrichit un événement avec les métadonnées requises
 */
export function enrichEvent(eventName: string, data: Record<string, unknown>): EnrichedEvent {
  const anonId = getAnonymousId();
  const timestamp = new Date().toISOString();

  // Métadonnées de base
  const baseProperties = {
    timestamp,
    source: 'yummeal_website',
    anon_id: anonId,
    url: typeof window !== 'undefined' ? window.location.href : '',
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    language: typeof navigator !== 'undefined' ? navigator.language : 'unknown'
  };

  // Fusionner avec les données fournies (les données fournies ont la priorité)
  const properties = {
    ...baseProperties,
    ...data
  };

  // Valider les champs requis selon le type d'événement
  validateEventProperties(eventName, properties);

  return {
    name: eventName,
    properties
  };
}

/**
 * Valide les propriétés d'un événement selon son type
 */
function validateEventProperties(eventName: string, properties: Record<string, unknown>): void {
  const requiredFields: Record<string, string[]> = {
    page_view: ['url'],
    download_click: ['platform'],
    start_download: ['platform'],
    page_view_event: ['url']
  };

  const required = requiredFields[eventName] || [];

  for (const field of required) {
    if (!properties[field]) {
      console.warn(`[EventEnricher] Événement '${eventName}' manque le champ requis: '${field}'`);
    }
  }
}

/**
 * Nettoie et normalise les données d'un événement
 */
export function normalizeEventData(data: Record<string, unknown>): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    // Ignorer les valeurs nulles ou undefined
    if (value === null || value === undefined) {
      continue;
    }

    // Normaliser les clés (snake_case)
    const normalizedKey = key.toLowerCase().replace(/([A-Z])/g, '_$1').replace(/^_/, '');

    // Normaliser les valeurs
    if (typeof value === 'string') {
      normalized[normalizedKey] = value.trim();
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      normalized[normalizedKey] = value;
    } else if (typeof value === 'object') {
      // Convertir les objets en JSON string
      try {
        normalized[normalizedKey] = JSON.stringify(value);
      } catch {
        console.warn(`[EventEnricher] Impossible de sérialiser la propriété: ${normalizedKey}`);
      }
    } else {
      normalized[normalizedKey] = value;
    }
  }

  return normalized;
}

/**
 * Valide qu'un événement a les données minimales requises
 */
export function isEventValid(eventName: string, properties: Record<string, unknown>): boolean {
  // Tous les événements doivent avoir un timestamp et une source
  if (!properties.timestamp || !properties.source) {
    console.warn(`[EventEnricher] Événement '${eventName}' manque les métadonnées de base`);
    return false;
  }

  // Tous les événements doivent avoir un identifiant anonyme
  if (!properties.anon_id) {
    console.warn(`[EventEnricher] Événement '${eventName}' manque l'identifiant anonyme`);
    return false;
  }

  return true;
}
