import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Scale, Utensils, Heart } from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { trackPageView } from './utils/tracking';

import AppleLogo from './Apple_logo_black.svg';
import PlayStoreLogo from './playstore.svg';
import HeroImage from './hero.webp';
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
import NotFoundPage from './pages/NotFoundPage';

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

  return (
    <div className="min-h-screen bg-[#FFFAF0] px-4 md:px-8">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
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
              <Link
                to="/#hero"
                className="text-gray-600 hover:text-[#FF8C42] transition-colors cursor-pointer"
              >
                Accueil
              </Link>
              <Link
                to="/#features"
                className="text-gray-600 hover:text-[#FF8C42] transition-colors cursor-pointer"
              >
                Fonctionnalités
              </Link>
              <Link
                to="/#how-it-works"
                className="text-gray-600 hover:text-[#FF8C42] transition-colors cursor-pointer"
              >
                Comment ça marche ?
              </Link>
              <Link
                to="/#faq"
                className="text-gray-600 hover:text-[#FF8C42] transition-colors cursor-pointer"
              >
                FAQ
              </Link>
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
                <Link
                  to="/#hero"
                  className="block px-3 py-2 text-base text-gray-600 hover:text-[#FF8C42] hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link
                  to="/#features"
                  className="block px-3 py-2 text-base text-gray-600 hover:text-[#FF8C42] hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Fonctionnalités
                </Link>
                <Link
                  to="/#how-it-works"
                  className="block px-3 py-2 text-base text-gray-600 hover:text-[#FF8C42] hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Comment ça marche ?
                </Link>
                <Link
                  to="/#faq"
                  className="block px-3 py-2 text-base text-gray-600 hover:text-[#FF8C42] hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <div>
            {/* Hero Section */}
            <motion.section 
              id="hero" 
              className="hero-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="hero-content pt-16 md:pt-0">
                <div className="max-w-6xl mx-auto">
                  <div className="hero-grid">
                    <div className="hero-text">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-[#FF8C42] to-[#FF5733] text-transparent bg-clip-text">
                        Libérez-vous de la<br />charge mentale des repas
                      </h1>
                      <p className="text-lg md:text-xl mb-8 text-gray-700">
                        Transformez votre frigo en inspiration culinaire et retrouvez le plaisir de cuisiner sainement, sans gaspillage ni frustration.
                      </p>
                      <div className="hero-buttons flex flex-col gap-4 w-full max-w-xs md:max-w-md">
                        <a
                          href="https://apps.apple.com/fr/app/recettes-du-frigo-yummeal/id6744942441"
                          className="clay-btn clay-btn--primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img 
                            src={AppleLogo} 
                            alt="Apple Logo" 
                            className="h-6 w-auto filter invert" 
                          />
                          Télécharger sur l'App Store
                        </a>
                        <a
                          href="https://play.google.com/store/apps/details?id=com.yummeal"
                          className="clay-btn clay-btn--secondary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img 
                            src={PlayStoreLogo} 
                            alt="Play Store Logo" 
                            className="h-6 w-6" 
                          />
                          Disponible sur Google Play
                        </a>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <img
                        src={HeroImage}
                        alt="Une femme prépare un panier de courses fraîches et anti-gaspi avec Yummeal"
                        className="w-full max-w-md mx-auto rounded-[1rem]"
                        width={800}
                        height={1400}
                      />
                    </div>
                    <div className="md:hidden mt-8">
                      <img
                        src={HeroImage}
                        alt="Une femme prépare un panier de courses fraîches et anti-gaspi avec Yummeal"
                        className="w-full max-w-xs mx-auto rounded-[1rem]"
                        width={800}
                        height={1400}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Features Section */}
            <motion.section 
              id="features" 
              className="features-section py-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-6xl mx-auto">
                <div className="clay-container">
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">Yummeal : La solution complète pour vos repas</h2>
                  <div className="grid md:grid-cols-4 gap-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="clay-card text-center flex flex-col items-center"
                    >
                      <div className="clay-icon inline-flex items-center justify-center bg-[#4CAF50] p-2 rounded-full shadow-lg mb-4" style={{ width: '48px', height: '48px' }}>
                        <ShoppingBag className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">Inspiration Instantanée & Anti-Gaspi</h3>
                      <p className="text-gray-600">Scannez votre frigo, Yummeal génère instantanément des recettes délicieuses et équilibrées avec ce que vous avez. Fini le gaspillage !</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="clay-card text-center flex flex-col items-center"
                    >
                      <div className="clay-icon inline-flex items-center justify-center bg-[#4CAF50] p-2 rounded-full shadow-lg mb-4" style={{ width: '48px', height: '48px' }}>
                        <Scale className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">Nutrition Intuitive & Équilibrée</h3>
                      <p className="text-gray-600">Mangez sainement sans compter ! Yummeal vous guide vers une alimentation équilibrée, adaptée à vos objectifs, sans restriction ni culpabilité.</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="clay-card text-center flex flex-col items-center"
                    >
                      <div className="clay-icon inline-flex items-center justify-center bg-[#4CAF50] p-2 rounded-full shadow-lg mb-4" style={{ width: '48px', height: '48px' }}>
                        <Utensils className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">Cuisine Simple & Savoureuse</h3>
                      <p className="text-gray-600">Des recettes rapides (moins de 30 min) et faciles à réaliser, même sans être un cordon bleu. Retrouvez le plaisir de cuisiner !</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="clay-card text-center flex flex-col items-center"
                    >
                      <div className="clay-icon inline-flex items-center justify-center bg-[#4CAF50] p-2 rounded-full shadow-lg mb-4" style={{ width: '48px', height: '48px' }}>
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">Adapté à Vos Besoins Spécifiques</h3>
                      <p className="text-gray-600">Végétarien, sans gluten, gestion du poids... Yummeal s'adapte à vos préférences et régimes, pour des repas qui vous ressemblent.</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Recipes Download Section */}
            <section className="py-16 bg-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Prêt à transformer votre quotidien ?</h2>
                <p className="text-lg text-gray-600 mb-8">Rejoignez des milliers d'utilisateurs qui ont retrouvé la sérénité en cuisine avec Yummeal.</p>
                <div className="flex flex-col gap-4 w-full max-w-xs md:max-w-md mx-auto">
                  <a
                    href="https://apps.apple.com/fr/app/recettes-du-frigo-yummeal/id6744942441"
                    className="clay-btn clay-btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={AppleLogo} 
                      alt="Apple Logo" 
                      className="h-6 w-auto filter invert" 
                    />
                    Télécharger sur l'App Store
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.yummeal"
                    className="clay-btn clay-btn--secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={PlayStoreLogo} 
                      alt="Play Store Logo" 
                      className="h-6 w-6" 
                    />
                    Disponible sur Google Play
                  </a>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <motion.section
              id="how-it-works"
              className="how-it-works-section py-20 bg-[#FFFAF0]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="max-w-6xl mx-auto px-4 md:px-8">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-12">Votre Parcours Simplifié avec Yummeal</h2>
                <div className="grid md:grid-cols-3 gap-10">
                  {/* Card 1 */}
                  <div className="clay-card p-8 flex flex-col items-center text-center">
                    <div className="clay-icon bg-[#4CAF50] text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold font-heading mb-4">1</div>
                    <h3 className="text-xl font-semibold mb-2">Scannez votre frigo</h3>
                    <p className="text-gray-600">Prenez une photo de vos ingrédients, et laissez Yummeal faire la magie.</p>
                  </div>
                  {/* Card 2 */}
                  <div className="clay-card p-8 flex flex-col items-center text-center">
                    <div className="clay-icon bg-[#4CAF50] text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold font-heading mb-4">2</div>
                    <h3 className="text-xl font-semibold mb-2">Recettes personnalisées</h3>
                    <p className="text-gray-600">Recevez instantanément des recettes adaptées à vos ingrédients et préférences.</p>
                  </div>
                  {/* Card 3 */}
                  <div className="clay-card p-8 flex flex-col items-center text-center">
                    <div className="clay-icon bg-[#4CAF50] text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold font-heading mb-4">3</div>
                    <h3 className="text-xl font-semibold mb-2">Cuisinez & savourez</h3>
                    <p className="text-gray-600">Suivez les instructions, cuisinez simplement et régalez-vous sans gaspiller !</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* FAQ Section */}
            <motion.section 
              id="faq" 
              className="faq-section py-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="clay-container">
                  <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-12">Questions fréquentes</h2>
                  <div className="space-y-8">
                    {[{
                      q: "Je n'ai pas beaucoup de temps pour cuisiner, Yummeal est-il vraiment rapide?",
                      a: "Oui, toutes nos recettes sont pensées pour être simples et rapides, même pour les emplois du temps les plus chargés. En moins de 30 minutes, un repas sain et délicieux est prêt !"
                    },
                    {
                      q: "Est-ce que je dois peser mes aliments pour l'application?",
                      a: "Non, Yummeal vous encourage à manger intuitivement. Nous ne comptons pas les calories ni ne vous demandons de peser vos aliments. L'objectif est de retrouver une relation saine et sereine avec la nourriture."
                    },
                    {
                      q: "Puis-je utiliser Yummeal si je suis végétarien ou sans gluten?",
                      a: "Absolument ! Yummeal s'adapte à vos préférences et régimes alimentaires (végétarien, sans gluten, sans lactose, etc.) pour vous proposer des recettes qui vous ressemblent."
                    },
                    {
                      q: "Puis-je ajouter mes propres recettes?",
                      a: "Oui, vous pouvez importer et sauvegarder vos recettes préférées, et même les modifier pour les adapter à vos besoins. Yummeal est votre carnet de recettes personnalisé et évolutif."
                    }
                    ].map((faq, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="clay-card p-6"
                      >
                        <h3 className="text-xl font-semibold mb-4">{faq.q}</h3>
                        <p className="text-gray-600">{faq.a}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Download Buttons Section */}
            <section className="pt-0 pb-16 bg-white">
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex flex-col gap-4 w-full max-w-xs md:max-w-md mx-auto">
                  <a
                    href="https://apps.apple.com/fr/app/recettes-du-frigo-yummeal/id6744942441"
                    className="clay-btn clay-btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={AppleLogo} 
                      alt="Apple Logo" 
                      className="h-6 w-auto filter invert" 
                    />
                    Télécharger sur l'App Store
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.yummeal"
                    className="clay-btn clay-btn--secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      src={PlayStoreLogo} 
                      alt="Play Store Logo" 
                      className="h-6 w-6" 
                    />
                    Disponible sur Google Play
                  </a>
                </div>
              </div>
            </section>
          </div>
        } />
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
        {/* Aucune route `*` n'existait : une URL inconnue rendait un écran
            blanc. Elle sert aussi de source à dist/404.html (prerender). */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Guides anti-gaspi</h3>
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
              <h3 className="font-semibold text-gray-800 mb-3">L'application</h3>
              <ul className="space-y-2">
                <li><Link to="/fonctionnalites/scanner-frigo" className="text-gray-600 hover:text-[#FF8C42]">Scanner son frigo</Link></li>
                <li><Link to="/fonctionnalites/import-recette-tiktok" className="text-gray-600 hover:text-[#FF8C42]">Importer une recette TikTok</Link></li>
                <li><Link to="/fonctionnalites/photo-de-plat" className="text-gray-600 hover:text-[#FF8C42]">Estimer un plat en photo</Link></li>
                <li><Link to="/fonctionnalites" className="text-gray-600 hover:text-[#FF8C42]">Toutes les fonctionnalités</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Cuisine pratique</h3>
              <ul className="space-y-2">
                <li><Link to="/sante" className="text-gray-600 hover:text-[#FF8C42]">Santé & alimentation</Link></li>
                <li><Link to="/solutions" className="text-gray-600 hover:text-[#FF8C42]">Solutions du quotidien</Link></li>
                <li><Link to="/astuces" className="text-gray-600 hover:text-[#FF8C42]">Astuces de cuisine</Link></li>
                <li><Link to="/budget" className="text-gray-600 hover:text-[#FF8C42]">Petit budget</Link></li>
                <li><Link to="/regimes" className="text-gray-600 hover:text-[#FF8C42]">Régimes & objectifs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">En savoir plus</h3>
              <ul className="space-y-2">
                <li><Link to="/guides" className="text-gray-600 hover:text-[#FF8C42]">Guides pratiques</Link></li>
                <li><Link to="/faq" className="text-gray-600 hover:text-[#FF8C42]">FAQ sécurité alimentaire</Link></li>
                <li><Link to="/concept" className="text-gray-600 hover:text-[#FF8C42]">Le concept Yummeal</Link></li>
                <li><Link to="/alternatives" className="text-gray-600 hover:text-[#FF8C42]">Alternatives &amp; comparatifs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Yummeal</h3>
              <ul className="space-y-2">
                <li><Link to="/fonctionnalites" className="text-gray-600 hover:text-[#FF8C42]">Fonctionnalités</Link></li>
                <li><Link to="/a-propos" className="text-gray-600 hover:text-[#FF8C42]">À propos</Link></li>
                <li><Link to="/creators" className="text-gray-600 hover:text-[#FF8C42]">Creators</Link></li>
                <li><Link to="/confidentialite" className="text-gray-600 hover:text-[#FF8C42]">Politique de confidentialité</Link></li>
                <li><Link to="/cgu" className="text-gray-600 hover:text-[#FF8C42]">CGU</Link></li>
              </ul>
            </div>
          </div>
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
              <span className="text-gray-600"> 2026 Yummeal, tous droits réservés</span>
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
