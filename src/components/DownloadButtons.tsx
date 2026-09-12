import AppleLogo from '../Apple_logo_black.svg';
import PlayStoreLogo from '../playstore.svg';
import { STORE_URLS } from '../config';
import { useLocale } from '../i18n/useLocale';

/**
 * Boutons de téléchargement.
 *
 * Le libellé ET l'URL suivent la langue de la page : un visiteur d'une page
 * polonaise qui atterrit sur la fiche française de l'App Store, en français et
 * en euros, est un visiteur perdu.
 *
 * Le bouton App Store DISPARAÎT quand l'application n'est pas distribuée dans
 * la boutique de cette langue (cf. `STORE_URLS` dans config.ts : c'est le cas
 * du polonais au 12/09/2026). Afficher un bouton qui mène à une 404 serait
 * pire que n'en afficher qu'un.
 */
export default function DownloadButtons() {
  const { locale, t } = useLocale();
  const urls = STORE_URLS[locale];

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs md:max-w-md mx-auto">
      {urls.apple && (
        <a
          href={urls.apple}
          className="clay-btn clay-btn--primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={AppleLogo}
            alt=""
            width={24}
            height={24}
            className="h-6 w-auto filter invert"
          />
          {t.cta.appStore}
        </a>
      )}
      <a
        href={urls.google}
        className="clay-btn clay-btn--secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={PlayStoreLogo}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6"
        />
        {t.cta.googlePlay}
      </a>
    </div>
  );
}
