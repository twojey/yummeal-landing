import AppleLogo from '../Apple_logo_black.svg';
import PlayStoreLogo from '../playstore.svg';
import { STORE_URLS } from '../config';
import { useLocale } from '../i18n/useLocale';
import { trackDownloadClick } from '../utils/tracking';
import { generateOneLinkUrl } from '../utils/appsflyerIntegration';

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
 *
 * ⚠️ Suivi web (27/09/2026) : le clic ouvre le lien OneLink AppsFlyer déjà
 * configuré pour le site (`generateOneLinkUrl`, `pid=website&c=<page>`) au
 * lieu du lien store brut — sans ce paramètre, aucune install ne peut être
 * rattachée à une page du site (confirmé : le composant utilisé partout sur
 * le site n'envoyait ni clic ni attribution). Pas de cookie ni de bannière :
 * `href` garde le lien store direct comme repli (clic droit, JS désactivé,
 * crawler), `onClick` fait la vraie navigation attribuée. `trackDownloadClick`
 * envoie l'événement à `/tracking`, relayé côté serveur vers PostHog (déjà
 * reçu pour les `page_view` du site, cf. `posthog_relay_policy.ts` côté API).
 */
function pageCampaign(): string {
  if (typeof window === 'undefined') return 'website';
  const slug = window.location.pathname.replace(/^\/+|\/+$/g, '');
  return slug || 'home';
}

export default function DownloadButtons() {
  const { locale, t } = useLocale();
  const urls = STORE_URLS[locale];

  const handleClick = (platform: 'apple' | 'google') =>
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      trackDownloadClick(platform, `${pageCampaign()}_download_buttons`);

      const oneLinkUrl = generateOneLinkUrl({
        pid: 'website',
        c: pageCampaign(),
        af_sub1: platform
      });

      // Laisser partir l'événement de tracking avant la navigation.
      window.setTimeout(() => {
        window.open(oneLinkUrl, '_blank', 'noopener,noreferrer');
      }, 100);
    };

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs md:max-w-md mx-auto">
      {urls.apple && (
        <a
          href={urls.apple}
          onClick={handleClick('apple')}
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
        onClick={handleClick('google')}
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
