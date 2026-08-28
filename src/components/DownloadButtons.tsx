import AppleLogo from '../Apple_logo_black.svg';
import PlayStoreLogo from '../playstore.svg';

export default function DownloadButtons() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs md:max-w-md mx-auto">
      <a
        href="https://apps.apple.com/fr/app/yummeal-cuisiner-sain/id6744942441"
        className="clay-btn clay-btn--primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={AppleLogo} alt="Apple Logo" className="h-6 w-auto filter invert" />
        Télécharger sur l'App Store
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.yummeal"
        className="clay-btn clay-btn--secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={PlayStoreLogo} alt="Play Store Logo" className="h-6 w-6" />
        Disponible sur Google Play
      </a>
    </div>
  );
}
