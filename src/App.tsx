import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { trackPageView } from './utils/tracking';

import Logo from './loveshot_logo.png';
import MobileLogo from './fav-loveshot.png';
import './styles.css';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import DeleteAccount from './DeleteAccount';
import Creators from './Creators';
import IngredientsIndexPage from './pages/IngredientsIndexPage';
import IngredientCategoryPage from './pages/IngredientCategoryPage';
import IngredientDetailPage from './pages/IngredientDetailPage';
import RecettesAvecIndexPage from './pages/RecettesAvecIndexPage';
import RecettesAvecArticlePage from './pages/RecettesAvecArticlePage';
import SubstitutionsIndexPage from './pages/SubstitutionsIndexPage';
import SubstitutionsArticlePage from './pages/SubstitutionsArticlePage';
import UrgenciesIndexPage from './pages/UrgenciesIndexPage';
import UrgenciesArticlePage from './pages/UrgenciesArticlePage';
import SanteIndexPage from './pages/SanteIndexPage';
import SanteArticlePage from './pages/SanteArticlePage';
import AntiGaspillageIndexPage from './pages/AntiGaspillageIndexPage';
import AntiGaspillageArticlePage from './pages/AntiGaspillageArticlePage';
import SolutionsIndexPage from './pages/SolutionsIndexPage';
import SolutionsArticlePage from './pages/SolutionsArticlePage';
import AstucesIndexPage from './pages/AstucesIndexPage';
import AstucesArticlePage from './pages/AstucesArticlePage';
import BudgetIndexPage from './pages/BudgetIndexPage';
import BudgetArticlePage from './pages/BudgetArticlePage';
import RegimesIndexPage from './pages/RegimesIndexPage';
import RegimesArticlePage from './pages/RegimesArticlePage';
import GuidesIndexPage from './pages/GuidesIndexPage';
import GuidesArticlePage from './pages/GuidesArticlePage';
import FaqIndexPage from './pages/FaqIndexPage';
import FaqArticlePage from './pages/FaqArticlePage';
import ConceptIndexPage from './pages/ConceptIndexPage';
import ConceptArticlePage from './pages/ConceptArticlePage';
import AProposPage from './pages/AProposPage';
import FonctionnalitesIndexPage from './pages/FonctionnalitesIndexPage';
import FonctionnalitePage from './pages/FonctionnalitePage';
import AlternativesIndexPage from './pages/AlternativesIndexPage';
import AlternativesArticlePage from './pages/AlternativesArticlePage';
import StatistiquesRecettesPage from './pages/StatistiquesRecettesPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import SelecteurLangue from './components/SelecteurLangue';
import { cheminLocalise } from './i18n/config';
import { useLocale } from './i18n/useLocale';

function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
    // Les pages des catégories de contenu gèrent leur propre <title>/meta
    // (usePageMeta) : cet effet tournant à chaque changement de route les
    // écraserait sinon, car il se déclenche après celui de la page enfant.
    const contentCategories = [
      '/ingredients',
      '/recettes-avec',
      '/substitutions',
      '/urgencies',
      '/sante',
      '/anti-gaspillage',
      '/solutions',
      '/astuces',
      '/budget',
      '/regimes',
      '/guides',
      '/faq',
      '/concept',
      '/alternatives',
      '/fonctionnalites',
      '/a-propos',
      '/statistiques-recettes',
    ];
    if (contentCategories.some((prefix) => location.pathname.startsWith(prefix))) {
      return;
    }
    document.title =
      location.pathname === '/creators'
        ? 'Yummeal Creators - Programme affiliés & UGC'
        : 'Yummeal - Cuisine saine';
  }, [location.pathname]);

  // Scrolle vers la section ciblée par le hash, y compris juste après une
  // navigation depuis une autre page (ex: /creators -> /#faq). Sans hash,
  // react-router ne remonte pas la page automatiquement lors d'une
  // navigation client-side : on force le retour en haut.
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.querySelector(location.hash);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
    }
  }, [location]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { locale, t } = useLocale();
  // Racine de la langue courante : "/" en français, "/pl/" en polonais. Les
  // ancres de la navigation doivent pointer vers l'accueil DE LA LANGUE, sinon
  // un clic sur « Jak to działa » renvoie sur la page française.
  const racine = cheminLocalise('', locale);
  const ancres = [
    { hash: '#hero', label: t.nav.accueil },
    { hash: '#features', label: t.nav.fonctionnalites },
    { hash: '#how-it-works', label: t.nav.commentCaMarche },
    { hash: '#faq', label: t.nav.faq },
  ];
  // Le maillage du pied de page dessert les silos éditoriaux, qui n'existent
  // qu'en français. En polonais on sert un pied réduit et explicite plutôt
  // qu'une grille de liens vers des pages que le visiteur ne peut pas lire.
  const piedComplet = locale === 'fr';

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* Le logo ramène à l'accueil DE LA LANGUE courante : un `/` en
                  dur renvoyait un visiteur polonais sur la page française. */}
              <Link to={racine} className="flex items-center">
                <img
                  src={Logo}
                  alt="Yummeal"
                  width={32}
                  height={32}
                  className="hidden md:block h-8 w-auto"
                />
                <span className="hidden md:block ml-2 text-2xl font-bold font-heading text-[#FF8C42]">Yummeal</span>
                <img
                  src={MobileLogo}
                  alt="Yummeal"
                  width={32}
                  height={32}
                  className="md:hidden h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {ancres.map((ancre) => (
                <Link
                  key={ancre.hash}
                  to={`${racine}${ancre.hash}`}
                  className="text-gray-600 hover:text-[#FF8C42] transition-colors cursor-pointer"
                >
                  {ancre.label}
                </Link>
              ))}
              <SelecteurLangue />
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-[#FF8C42]"
                aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {ancres.map((ancre) => (
                  <Link
                    key={ancre.hash}
                    to={`${racine}${ancre.hash}`}
                    className="block px-3 py-2 text-base text-gray-600 hover:text-[#FF8C42] hover:bg-gray-50 rounded-md cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {ancre.label}
                  </Link>
                ))}
                <SelecteurLangue className="px-3 py-2" />
              </div>
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Accueil polonais. Le français reste à la racine, les autres langues
            sont préfixées — voir la décision d'URL dans src/i18n/config.ts.
            react-router traite `/pl` et `/pl/` comme la même route ; côté
            Netlify c'est `/pl/index.html` qui est servi. */}
        <Route path="/pl" element={<HomePage />} />
        <Route path="/pl/a-propos" element={<AProposPage />} />
        <Route path="/pl/fonctionnalites" element={<FonctionnalitesIndexPage />} />
        <Route
          path="/pl/fonctionnalites/:slug"
          element={<FonctionnalitePage />}
        />
        <Route path="/a-propos" element={<AProposPage />} />
        <Route path="/fonctionnalites" element={<FonctionnalitesIndexPage />} />
        <Route path="/fonctionnalites/:slug" element={<FonctionnalitePage />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/confidentialite" element={<PrivacyPolicy />} />
        <Route path="/cgu" element={<TermsAndConditions />} />
        <Route path="/supprimer-mon-compte" element={<DeleteAccount />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/ingredients" element={<IngredientsIndexPage />} />
        <Route
          path="/ingredients/:category"
          element={<IngredientCategoryPage />}
        />
        <Route
          path="/ingredients/:category/:slug"
          element={<IngredientDetailPage />}
        />
        <Route path="/recettes-avec" element={<RecettesAvecIndexPage />} />
        <Route path="/recettes-avec/:slug" element={<RecettesAvecArticlePage />} />
        <Route path="/substitutions" element={<SubstitutionsIndexPage />} />
        <Route path="/substitutions/:slug" element={<SubstitutionsArticlePage />} />
        <Route path="/urgencies" element={<UrgenciesIndexPage />} />
        <Route path="/urgencies/:slug" element={<UrgenciesArticlePage />} />
        <Route path="/sante" element={<SanteIndexPage />} />
        <Route path="/sante/:slug" element={<SanteArticlePage />} />
        <Route path="/anti-gaspillage" element={<AntiGaspillageIndexPage />} />
        <Route path="/anti-gaspillage/:slug" element={<AntiGaspillageArticlePage />} />
        <Route path="/solutions" element={<SolutionsIndexPage />} />
        <Route path="/solutions/:slug" element={<SolutionsArticlePage />} />
        <Route path="/astuces" element={<AstucesIndexPage />} />
        <Route path="/astuces/:slug" element={<AstucesArticlePage />} />
        <Route path="/budget" element={<BudgetIndexPage />} />
        <Route path="/budget/:slug" element={<BudgetArticlePage />} />
        <Route path="/regimes" element={<RegimesIndexPage />} />
        <Route path="/regimes/:slug" element={<RegimesArticlePage />} />
        <Route path="/guides" element={<GuidesIndexPage />} />
        <Route path="/guides/:slug" element={<GuidesArticlePage />} />
        <Route path="/faq" element={<FaqIndexPage />} />
        <Route path="/faq/:slug" element={<FaqArticlePage />} />
        <Route path="/concept" element={<ConceptIndexPage />} />
        <Route path="/concept/:slug" element={<ConceptArticlePage />} />
        <Route path="/alternatives" element={<AlternativesIndexPage />} />
        <Route path="/alternatives/:slug" element={<AlternativesArticlePage />} />
        <Route path="/statistiques-recettes" element={<StatistiquesRecettesPage />} />
        {/* Aucune route `*` n'existait : une URL inconnue rendait un écran
            blanc. Elle sert aussi de source à dist/404.html (prerender). */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {piedComplet ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10 text-sm">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">{t.pied.guides}</h3>
                <ul className="space-y-2">
                  <li><Link to="/ingredients" className="text-gray-600 hover:text-[#FF8C42]">Que faire avec...</Link></li>
                  <li><Link to="/recettes-avec" className="text-gray-600 hover:text-[#FF8C42]">Recettes avec...</Link></li>
                  <li><Link to="/substitutions" className="text-gray-600 hover:text-[#FF8C42]">Par quoi remplacer...</Link></li>
                  <li><Link to="/urgencies" className="text-gray-600 hover:text-[#FF8C42]">Urgences cuisine</Link></li>
                  <li><Link to="/anti-gaspillage" className="text-gray-600 hover:text-[#FF8C42]">Anti-gaspillage</Link></li>
                </ul>
              </div>
              <div>
                {/* Les trois pages produit sont les seules pages
                    transactionnelles du site : elles méritent une place fixe,
                    pas seulement un lien depuis leur index. */}
                <h3 className="font-semibold text-gray-800 mb-3">{t.pied.application}</h3>
                <ul className="space-y-2">
                  <li><Link to="/fonctionnalites/scanner-frigo" className="text-gray-600 hover:text-[#FF8C42]">Scanner son frigo</Link></li>
                  <li><Link to="/fonctionnalites/import-recette-tiktok" className="text-gray-600 hover:text-[#FF8C42]">Importer une recette TikTok</Link></li>
                  <li><Link to="/fonctionnalites/photo-de-plat" className="text-gray-600 hover:text-[#FF8C42]">Estimer un plat en photo</Link></li>
                  <li><Link to="/fonctionnalites" className="text-gray-600 hover:text-[#FF8C42]">Toutes les fonctionnalités</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">{t.pied.cuisine}</h3>
                <ul className="space-y-2">
                  <li><Link to="/sante" className="text-gray-600 hover:text-[#FF8C42]">Santé & alimentation</Link></li>
                  <li><Link to="/solutions" className="text-gray-600 hover:text-[#FF8C42]">Solutions du quotidien</Link></li>
                  <li><Link to="/astuces" className="text-gray-600 hover:text-[#FF8C42]">Astuces de cuisine</Link></li>
                  <li><Link to="/budget" className="text-gray-600 hover:text-[#FF8C42]">Petit budget</Link></li>
                  <li><Link to="/regimes" className="text-gray-600 hover:text-[#FF8C42]">Régimes & objectifs</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">{t.pied.enSavoirPlus}</h3>
                <ul className="space-y-2">
                  <li><Link to="/guides" className="text-gray-600 hover:text-[#FF8C42]">Guides pratiques</Link></li>
                  <li><Link to="/faq" className="text-gray-600 hover:text-[#FF8C42]">FAQ sécurité alimentaire</Link></li>
                  <li><Link to="/concept" className="text-gray-600 hover:text-[#FF8C42]">Le concept Yummeal</Link></li>
                  <li><Link to="/alternatives" className="text-gray-600 hover:text-[#FF8C42]">Alternatives &amp; comparatifs</Link></li>
                  <li><Link to="/statistiques-recettes" className="text-gray-600 hover:text-[#FF8C42]">Statistiques du catalogue</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">{t.pied.marque}</h3>
                <ul className="space-y-2">
                  <li><Link to="/fonctionnalites" className="text-gray-600 hover:text-[#FF8C42]">Fonctionnalités</Link></li>
                  <li><Link to="/a-propos" className="text-gray-600 hover:text-[#FF8C42]">À propos</Link></li>
                  <li><Link to="/creators" className="text-gray-600 hover:text-[#FF8C42]">Creators</Link></li>
                  <li><Link to="/confidentialite" className="text-gray-600 hover:text-[#FF8C42]">Politique de confidentialité</Link></li>
                  <li><Link to="/cgu" className="text-gray-600 hover:text-[#FF8C42]">CGU</Link></li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="mb-10 text-sm">
              <h3 className="font-semibold text-gray-800 mb-3">{t.pied.legal}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/confidentialite" hrefLang="fr-FR" className="text-gray-600 hover:text-[#FF8C42]">
                    {t.pied.confidentialite}{' '}
                    <span className="text-gray-400">({t.pied.enFrancais})</span>
                  </Link>
                </li>
                <li>
                  <Link to="/cgu" hrefLang="fr-FR" className="text-gray-600 hover:text-[#FF8C42]">
                    {t.pied.cgu} <span className="text-gray-400">({t.pied.enFrancais})</span>
                  </Link>
                </li>
                <li>
                  <Link to="/supprimer-mon-compte" hrefLang="fr-FR" className="text-gray-600 hover:text-[#FF8C42]">
                    {t.pied.supprimerCompte}{' '}
                    <span className="text-gray-400">({t.pied.enFrancais})</span>
                  </Link>
                </li>
              </ul>
              <div className="mt-6">
                <SelecteurLangue />
              </div>
            </div>
          )}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <img
                src={Logo}
                alt="Yummeal"
                width={32}
                height={32}
                loading="lazy"
                className="h-8 w-auto"
              />
              <span className="text-gray-600">© 2026 {t.pied.droits}</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-600 hover:text-[#FF8C42]">Facebook</a>
              <a href="#" className="text-gray-600 hover:text-[#FF8C42]">Instagram</a>
              <a href="#" className="text-gray-600 hover:text-[#FF8C42]">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
