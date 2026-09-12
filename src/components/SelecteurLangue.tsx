import { Link } from 'react-router-dom';
import {
  cheminLocalise,
  localesDisponibles,
  NOM_LOCALE,
  BALISE_LANG,
} from '../i18n/config';
import { useLocale } from '../i18n/useLocale';

/**
 * Sélecteur de langue.
 *
 * C'est un LIEN, pas un menu qui change un état : le changement de langue est
 * une navigation vers une autre URL. Un sélecteur qui traduirait la page sur
 * place laisserait deux langues sous la même URL — indexable dans une seule,
 * impossible à partager dans l'autre.
 *
 * Il n'apparaît que sur les pages qui existent réellement dans plusieurs
 * langues. Sur les 147 pages françaises restantes, il n'y a rien à proposer :
 * un lien qui renverrait l'accueil polonais depuis un article français serait
 * une fausse promesse, et Google traite ce motif comme un `hreflang` invalide.
 *
 * `hrefLang` sur chaque lien, et `lang` sur le libellé : le nom d'une langue
 * s'écrit dans cette langue (« Polski », pas « Polonais »), donc il faut le
 * dire au synthétiseur vocal.
 */
export default function SelecteurLangue({ className = '' }: { className?: string }) {
  const { locale, chemin } = useLocale();
  const dispo = localesDisponibles(chemin);

  if (dispo.length < 2) return null;

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      {dispo.map((l) =>
        l === locale ? (
          <span
            key={l}
            lang={BALISE_LANG[l]}
            aria-current="true"
            className="font-semibold text-gray-800"
          >
            {NOM_LOCALE[l]}
          </span>
        ) : (
          <Link
            key={l}
            to={cheminLocalise(chemin, l)}
            hrefLang={BALISE_LANG[l]}
            lang={BALISE_LANG[l]}
            className="text-gray-500 hover:text-[#FF8C42] transition-colors"
          >
            {NOM_LOCALE[l]}
          </Link>
        )
      )}
    </div>
  );
}
