import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Scale, Utensils, Heart } from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { trackPageView } from './utils/tracking';

import AppleLogo from './Apple_logo_black.svg';
import PlayStoreLogo from './playstore.svg';
import Image from './babe3.png';
import Logo from './loveshot_logo.png';
import MobileLogo from './fav-loveshot.png';
import MobileImage from './babe3-mobile.png';
import './styles.css';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';

function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
    document.title = 'Yummeal - Cuisine saine';
  }, [location.pathname]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const faqRef = useRef(null);

  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    setIsMobileMenuOpen(false);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-8">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="flex items-center">
                <img 
                  src={Logo} 
                  alt="Yummeal Logo" 
                  className="hidden md:block h-8 w-auto"
                />
                <span className="hidden md:block ml-2 text-2xl font-bold text-[#00C851]">Yummeal</span>
                <img 
                  src={MobileLogo} 
                  alt="Yummeal Logo" 
                  className="md:hidden h-8 w-auto"
                />
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#hero" 
                className="text-gray-600 hover:text-[#00C851] transition-colors cursor-pointer"
                onClick={() => handleScrollTo(heroRef)}
              >
                Accueil
              </a>
              <a 
                href="#features" 
                className="text-gray-600 hover:text-[#00C851] transition-colors cursor-pointer"
                onClick={() => handleScrollTo(featuresRef)}
              >
                Fonctionnalités
              </a>
              <a 
                href="#how-it-works" 
                className="text-gray-600 hover:text-[#00C851] transition-colors cursor-pointer"
                onClick={() => handleScrollTo(howItWorksRef)}
              >
                Comment ça marche ?
              </a>
              <a 
                href="#faq" 
                className="text-gray-600 hover:text-[#00C851] transition-colors cursor-pointer"
                onClick={() => handleScrollTo(faqRef)}
              >
                FAQ
              </a>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-[#00C851]"
              >
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
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
                <a 
                  href="#hero" 
                  className="block px-3 py-2 text-base text-gray-600 hover:text-[#00C851] hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => handleScrollTo(heroRef)}
                >
                  Accueil
                </a>
                <a 
                  href="#features" 
                  className="block px-3 py-2 text-base text-gray-600 hover:text-[#00C851] hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => handleScrollTo(featuresRef)}
                >
                  Fonctionnalités
                </a>
                <a 
                  href="#how-it-works" 
                  className="block px-3 py-2 text-base text-gray-600 hover:text-[#00C851] hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => handleScrollTo(howItWorksRef)}
                >
                  Comment ça marche ?
                </a>
                <a 
                  href="#faq" 
                  className="block px-3 py-2 text-base text-gray-600 hover:text-[#00C851] hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => handleScrollTo(faqRef)}
                >
                  FAQ
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <motion.section 
              id="hero" 
              ref={heroRef}
              className="hero-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="hero-content pt-16 md:pt-0">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                  <div className="hero-grid md:grid-cols-2 gap-8 items-center">
                    <div className="hero-text">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00C851] to-[#008000] text-transparent bg-clip-text">
                        Perdez du poids sans y penser
                      </h1>
                      <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-700">
                        Boostez votre confiance en atteignant vos objectifs grâce à des recettes faciles et adaptées à vos ingrédients.
                      </p>
                      <div className="hero-buttons flex flex-col gap-4 w-full max-w-xs md:max-w-md">
                        <a
                          href="https://apps.apple.com/fr/app/yummeal-cuisiner-sain/id6744942441"
                          className="clay-btn clay-btn--green"
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
                          className="clay-btn clay-btn--white"
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
                        src={Image} 
                        alt="Interface de l'application Yummeal"
                        className="w-full max-w-2xl mx-auto rounded-[1rem]"
                      />
                    </div>
                    <div className="md:hidden mt-8">
                      <img 
                        src={MobileImage} 
                        alt="Interface de l'application Yummeal sur mobile"
                        className="w-full rounded-[1rem]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Features Section */}
            <motion.section 
              id="features" 
              ref={featuresRef}
              className="features-section py-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-6xl mx-auto">
                <div className="clay-container">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simplifiez votre perte de poids</h2>
                  <div className="grid md:grid-cols-4 gap-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="clay-card text-center flex flex-col items-center"
                    >
                      <div className="clay-icon inline-flex items-center justify-center bg-green-500 p-2 rounded-full shadow-lg mb-4" style={{ width: '48px', height: '48px' }}>
                        <ShoppingBag className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Recettes sur mesure</h3>
                      <p className="text-gray-600">Entrez les ingrédients que vous avez à la maison et recevez des recettes personnalisées, simples et rapides.</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="clay-card text-center flex flex-col items-center"
                    >
                      <div className="clay-icon inline-flex items-center justify-center bg-green-500 p-2 rounded-full shadow-lg mb-4" style={{ width: '48px', height: '48px' }}>
                        <Scale className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Suivi des calories automatisé</h3>
                      <p className="text-gray-600">Les calories sont automatiquement suivies pour vous, sans effort ni calculs compliqués.</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="clay-card text-center flex flex-col items-center"
                    >
                      <div className="clay-icon inline-flex items-center justify-center bg-green-500 p-2 rounded-full shadow-lg mb-4" style={{ width: '48px', height: '48px' }}>
                        <Utensils className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Des repas sains et gourmands</h3>
                      <p className="text-gray-600">Des recettes équilibrées qui vous permettent de vous régaler sans sacrifier le goût ou la variété.</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="clay-card text-center flex flex-col items-center"
                    >
                      <div className="clay-icon inline-flex items-center justify-center bg-green-500 p-2 rounded-full shadow-lg mb-4" style={{ width: '48px', height: '48px' }}>
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Mangez ce que vous aimez</h3>
                      <p className="text-gray-600">Pas de restrictions strictes, juste des repas adaptés à vos goûts et à vos objectifs de santé.</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Recipes Download Section */}
            <section className="py-16 bg-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Maîtrisez vos calories</h2>
                <p className="text-lg text-gray-600 mb-8">Accédez à +100 000 recettes optimales pour la perte de poids</p>
                <div className="flex flex-col gap-4 w-full max-w-xs md:max-w-md mx-auto">
                  <a
                    href="https://apps.apple.com/fr/app/yummeal-cuisiner-sain/id6744942441"
                    className="clay-btn clay-btn--green"
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
                    className="clay-btn clay-btn--white"
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
              ref={howItWorksRef}
              className="how-it-works-section py-20 bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="max-w-6xl mx-auto px-4 md:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Comment ça marche ?</h2>
                <div className="grid md:grid-cols-3 gap-10">
                  <div className="clay-card p-8 flex flex-col items-center text-center">
                    <div className="clay-icon bg-[#00C851] text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mb-4">1</div>
                    <h3 className="text-xl font-semibold mb-2">Ajoutez vos ingrédients</h3>
                    <p className="text-gray-600">Sélectionnez dans le magasin tout ce que vous avez dans votre frigo et vos placards.</p>
                  </div>
                  <div className="clay-card p-8 flex flex-col items-center text-center">
                    <div className="clay-icon bg-[#00C851] text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mb-4">2</div>
                    <h3 className="text-xl font-semibold mb-2">Découvrez vos recettes</h3>
                    <p className="text-gray-600">Yummeal génère automatiquement un livre de recettes réalisables avec vos ingrédients.</p>
                  </div>
                  <div className="clay-card p-8 flex flex-col items-center text-center">
                    <div className="clay-icon bg-[#00C851] text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold mb-4">3</div>
                    <h3 className="text-xl font-semibold mb-2">Cuisinez & savourez</h3>
                    <p className="text-gray-600">Suivez les instructions, cuisinez simplement et régalez-vous sans gaspiller !</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* FAQ Section */}
            <motion.section 
              id="faq" 
              ref={faqRef}
              className="faq-section py-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="clay-container">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Questions fréquentes</h2>
                  <div className="space-y-8">
                    {[{
                      q: "Je n'ai pas beaucoup de temps pour cuisiner, Yummeal est-il vraiment rapide?",
                      a: "Oui, toutes nos recettes sont pensées pour être simples et rapides, même pour les emplois du temps les plus chargés."
                    },
                    {
                      q: "Est-ce que je dois peser mes aliments pour l'application?",
                      a: "Non, Yummeal suit automatiquement les calories et les portions sans que vous ayez à peser ou compter quoi que ce soit."
                    },
                    {
                      q: "Puis-je utiliser Yummeal si je suis végétarien ou sans gluten?",
                      a: "Bien sûr ! Vous pouvez filtrer les recettes en fonction de vos préférences alimentaires et besoins spécifiques."
                    },
                    {
                      q: "Puis-je ajouter mes propres recettes?",
                      a: "Absolument ! Vous pouvez enregistrer vos recettes favorites et les ajouter à votre livre de recettes personnalisé."
                    }].map((faq, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="clay-card p-6"
                      >
                        <h3 className="text-xl font-bold mb-4">{faq.q}</h3>
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
                    href="https://apps.apple.com/fr/app/yummeal-cuisiner-sain/id6744942441"
                    className="clay-btn clay-btn--green"
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
                    className="clay-btn clay-btn--white"
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
          </>
        } />
        <Route path="/confidentialite" element={<PrivacyPolicy />} />
        <Route path="/cgu" element={<TermsAndConditions />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <img 
                src={Logo} 
                alt="Yummeal Logo" 
                className="h-8 w-auto"
              />
              <span className="text-gray-600"> 2025 Yummeal, tous droits réservés</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/confidentialite" className="text-gray-600 hover:text-[#00C851]">Politique de confidentialité</Link>
              <Link to="/cgu" className="text-gray-600 hover:text-[#00C851]">CGU</Link>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-600 hover:text-[#00C851]">Facebook</a>
                <a href="#" className="text-gray-600 hover:text-[#00C851]">Instagram</a>
                <a href="#" className="text-gray-600 hover:text-[#00C851]">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
