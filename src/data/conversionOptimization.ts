import { GENERATED_CONVERSION_CONFIG } from './conversionOptimization.generated';

export type ConversionVariant = {
  id: string;
  headline: string;
  body: string;
  ctaLabel?: string;
};

export type ConversionPageConfig = {
  variants: ConversionVariant[];
  minSampleSize: number;
};

const DEFAULT_VARIANTS: ConversionVariant[] = [
  {
    id: 'direct_value_v1',
    headline: 'Passez de votre frigo à un repas qui tient la route.',
    body: 'Ajoutez ce que vous avez déjà : Yummeal vous aide à trouver quoi cuisiner ensuite.',
    ctaLabel: 'Voir les recettes adaptées',
  },
  {
    id: 'anti_waste_v1',
    headline: 'Utilisez ce qui est déjà dans votre cuisine.',
    body: 'Moins d’hésitation, moins de gaspillage : commencez avec votre frigo actuel.',
    ctaLabel: 'Commencer avec mon frigo',
  },
];

const DEFAULT_CONFIG: ConversionPageConfig = {
  variants: DEFAULT_VARIANTS,
  minSampleSize: 30,
};

const generated = GENERATED_CONVERSION_CONFIG as Record<string, ConversionPageConfig>;

function normalizePath(path: string): string {
  const normalized = path.replace(/^\/+|\/+$/g, '');
  return normalized ? `/${normalized}` : '/';
}

function categoryFor(path: string): string {
  const parts = normalizePath(path).split('/').filter(Boolean);
  return parts[0] ?? 'home';
}

export function getConversionConfig(path: string): ConversionPageConfig {
  const normalized = normalizePath(path);
  return generated[normalized] ?? generated[`category:${categoryFor(normalized)}`] ?? DEFAULT_CONFIG;
}

function stableBucket(value: string): number {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967296;
}

export function selectConversionVariant(path: string, visitorId: string): ConversionVariant {
  const config = getConversionConfig(path);
  const variants = config.variants.length ? config.variants : DEFAULT_VARIANTS;
  return variants[Math.floor(stableBucket(`${normalizePath(path)}:${visitorId}`) * variants.length) % variants.length];
}
