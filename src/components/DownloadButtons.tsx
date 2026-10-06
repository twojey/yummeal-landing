import { useEffect, useState } from 'react';
import { captureAcquisition, buildAcquisitionLink, withWebsiteAttribution } from '../utils/acquisitionLink';
import AppleLogo from '../Apple_logo_black.svg';
import PlayStoreLogo from '../playstore.svg';
import { STORE_URLS } from '../config';
import { useLocale } from '../i18n/useLocale';
import { trackConversionVariantExposed, trackDownloadClick } from '../utils/tracking';
import { getAnonymousId } from '../utils/anonymousId';
import { selectConversionVariant } from '../data/conversionOptimization';

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
 * configuré pour le site (`buildAcquisitionLink`, `pid=website&c=<page>`) au
 * lieu du lien store brut — sans ce paramètre, aucune install ne peut être
 * rattachée à une page du site (confirmé : le composant utilisé partout sur
 * le site n'envoyait ni clic ni attribution). Pas de cookie ni de bannière :
 * `href` garde le lien store direct comme repli (clic droit, JS désactivé,
 * crawler), `onClick` remplace le href par le OneLink attribué juste avant la navigation. `trackDownloadClick`
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
  const [evidence,setEvidence]=useState(new URLSearchParams());
  const [visitorId] = useState(() => typeof window === 'undefined' ? 'ssr' : getAnonymousId());
  const [conversionVariant] = useState(() => selectConversionVariant(
    typeof window === 'undefined' ? '/' : window.location.pathname,
    visitorId,
  ));
  useEffect(()=>{
    try { setEvidence(captureAcquisition(window.location.search,window.sessionStorage)); }
    catch { setEvidence(new URLSearchParams(window.location.search)); }
  },[]);
  useEffect(() => {
    if (locale === 'fr') trackConversionVariantExposed(conversionVariant.id, pageCampaign());
  }, [conversionVariant.id, locale]);

  const handleClick = (platform: 'apple' | 'google') =>
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      trackDownloadClick(
        platform,
        `${pageCampaign()}_download_buttons`,
        locale === 'fr' ? conversionVariant.id : undefined,
      );

      // Pas de preventDefault ni de window.open différé : Safari iOS bloque un
      // window.open lancé hors du geste utilisateur (setTimeout), et le clic ne
      // ferait plus rien. On réécrit le href avant l'action par défaut : le
      // navigateur suit alors le OneLink dans le même geste. L'envoi du
      // tracking survit à la navigation grâce à `keepalive` (utils/tracking.ts).
      const captured = withWebsiteAttribution(evidence, pageCampaign());
      const storeUrl = urls[platform];
      if (storeUrl) event.currentTarget.href = buildAcquisitionLink(storeUrl, platform, captured);
    };

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs md:max-w-md mx-auto">
      {locale === 'fr' && (
        <>
          <p className="font-semibold text-gray-900">{conversionVariant.headline}</p>
          <p className="text-sm text-gray-600">{conversionVariant.body}</p>
        </>
      )}
      {urls.apple && (
        <a
          href={buildAcquisitionLink(urls.apple, 'apple', evidence)}
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
          {locale === 'fr' ? (conversionVariant.ctaLabel ?? t.cta.appStore) : t.cta.appStore}
        </a>
      )}
      <a
        href={buildAcquisitionLink(urls.google, 'google', evidence)}
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
        {locale === 'fr' ? (conversionVariant.ctaLabel ?? t.cta.googlePlay) : t.cta.googlePlay}
      </a>
    </div>
  );
}
