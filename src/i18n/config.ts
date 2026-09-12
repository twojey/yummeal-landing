/**
 * Socle i18n du site.
 *
 * DÉCISION DE STRUCTURE D'URL : le français reste à la RACINE, les autres
 * langues sont préfixées (`/pl/...`). C'est le seul choix qui ne touche à
 * aucune des 148 URL françaises déjà en ligne, ni aux 40 redirections 301
 * posées ce jour. Un préfixe `/fr/` aurait imposé de rediriger tout le site et
 * de recommencer l'indexation à zéro — pour un gain esthétique nul.
 *
 * PÉRIMÈTRE TRADUIT, ET POURQUOI IL EST PARTIEL. Une langue ne s'ajoute pas
 * page par page au hasard : `hreflang` ne doit relier que des paires de pages
 * qui existent **toutes les deux**, sinon on déclare à Google des équivalences
 * fausses. `estTraduit()` est donc la source de vérité unique : le prerender,
 * le sélecteur de langue et les balises `hreflang` la consultent tous. Ajouter
 * une page à une locale, c'est ajouter son chemin ici — rien d'autre.
 *
 * Les 130 pages d'articles de la longue traîne ne sont PAS traduites : publier
 * 40 000 mots de polonais non relu ferait plus de mal que de bien sur un
 * marché où la marque démarre.
 *
 * PROCHAINE PAGE À AJOUTER : `/a-propos` — c'est elle qu'un moteur génératif
 * cite pour répondre « qu'est-ce que Yummeal », y compris en polonais.
 * Ajouter le chemin ici APRÈS avoir écrit la traduction — les tests vérifient
 * que chaque chemin listé est bien prérendu, et que chaque page traduite ne
 * laisse pas fuiter de français.
 */

export const LOCALE_DEFAUT = 'fr' as const;

export type Locale = 'fr' | 'pl';

export const LOCALES: readonly Locale[] = ['fr', 'pl'] as const;

/** Code `hreflang` et attribut `lang` de chaque locale. */
export const BALISE_LANG: Record<Locale, string> = {
  fr: 'fr-FR',
  pl: 'pl-PL',
};

/** Libellé de la langue, dans la langue elle-même. */
export const NOM_LOCALE: Record<Locale, string> = {
  fr: 'Français',
  pl: 'Polski',
};

/**
 * Chemins traduits, par locale, SANS le préfixe de langue et sans slash final.
 * La racine est `''`.
 *
 * ⚠️ N'ajouter un chemin ici qu'une fois sa traduction réellement écrite. Cette
 * liste pilote les `hreflang` : une entrée sans page derrière déclare à Google
 * une équivalence qui n'existe pas.
 */
const CHEMINS_TRADUITS: Record<Exclude<Locale, 'fr'>, readonly string[]> = {
  pl: [
    '', // accueil — priorité du lancement polonais
    // Les trois pages produit + leur index : les seules pages à intention
    // transactionnelle du site, donc celles qu'une traduction rentabilise.
    '/fonctionnalites',
    '/fonctionnalites/scanner-frigo',
    '/fonctionnalites/import-recette-tiktok',
    '/fonctionnalites/photo-de-plat',
  ],
};

/** Normalise un chemin : slash initial, pas de slash final, racine = ''. */
function normalise(chemin: string): string {
  const c = chemin.replace(/\/+$/, '');
  if (c === '' || c === '/') return '';
  return c.startsWith('/') ? c : `/${c}`;
}

/** Ce chemin existe-t-il dans cette locale ? */
export function estTraduit(chemin: string, locale: Locale): boolean {
  if (locale === LOCALE_DEFAUT) return true;
  return CHEMINS_TRADUITS[locale].includes(normalise(chemin));
}

/** Les locales dans lesquelles ce chemin existe. Toujours au moins `fr`. */
export function localesDisponibles(chemin: string): Locale[] {
  return LOCALES.filter((l) => estTraduit(chemin, l));
}

/**
 * URL d'un chemin dans une locale, avec slash final — Netlify redirige en 301
 * l'URL sans slash vers celle avec, donc le canonical doit porter le slash.
 */
export function cheminLocalise(chemin: string, locale: Locale): string {
  const c = normalise(chemin);
  const prefixe = locale === LOCALE_DEFAUT ? '' : `/${locale}`;
  return `${prefixe}${c}/`;
}

/** Retire le préfixe de langue d'un chemin servi, et rend la locale lue. */
export function decoupeLocale(pathname: string): {
  locale: Locale;
  chemin: string;
} {
  for (const l of LOCALES) {
    if (l === LOCALE_DEFAUT) continue;
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) {
      return { locale: l, chemin: normalise(pathname.slice(l.length + 1)) };
    }
  }
  return { locale: LOCALE_DEFAUT, chemin: normalise(pathname) };
}

/**
 * Balises `hreflang` d'un chemin — réciproques par construction, puisqu'elles
 * sont calculées depuis la même liste pour toutes les locales de la page.
 *
 * `x-default` pointe vers le français : c'est la version servie à qui n'a pas
 * de préférence exprimée, et la seule qui couvre tout le site.
 */
export function alternatives(
  chemin: string,
  siteUrl: string
): { hreflang: string; href: string }[] {
  const dispo = localesDisponibles(chemin);
  const liens = dispo.map((l) => ({
    hreflang: BALISE_LANG[l],
    href: `${siteUrl}${cheminLocalise(chemin, l)}`,
  }));
  // Inutile de déclarer des alternatives quand il n'y en a qu'une.
  if (liens.length < 2) return [];
  return [
    ...liens,
    {
      hreflang: 'x-default',
      href: `${siteUrl}${cheminLocalise(chemin, LOCALE_DEFAUT)}`,
    },
  ];
}

/** Tous les chemins à prérendre pour une locale non par défaut. */
export function cheminsDeLocale(locale: Exclude<Locale, 'fr'>): readonly string[] {
  return CHEMINS_TRADUITS[locale];
}
