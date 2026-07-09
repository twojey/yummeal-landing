import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, TrendingUp, Sparkles, Rocket, CheckCircle2 } from 'lucide-react';
import CreatorsHeroImage from './creators-hero.webp';

const APPLY_URL = 'https://kroaze-business.vercel.app/candidater/yummeal';

const BENEFITS = [
  {
    icon: Megaphone,
    title: 'Un produit authentique à recommander',
    description:
      "Yummeal répond à un vrai besoin (moins de charge mentale, moins de gaspillage) : un contenu qui sonne vrai, pas un placement de produit forcé.",
  },
  {
    icon: TrendingUp,
    title: 'Rémunéré sur vos résultats',
    description:
      'Un lien de suivi personnel vous permet de percevoir une commission sur les conversions générées par votre contenu.',
  },
  {
    icon: Sparkles,
    title: 'Liberté créative totale',
    description:
      'Reels, TikTok, avis, unboxing... vous choisissez le format qui vous ressemble et parle à votre communauté.',
  },
  {
    icon: Rocket,
    title: 'Embarquez tôt',
    description:
      'Yummeal est une app française en pleine croissance : vos retours et votre contenu ont un vrai impact sur le produit.',
  },
];

const STEPS = [
  {
    title: 'Postulez',
    description: 'Remplissez le formulaire de candidature en quelques minutes.',
  },
  {
    title: 'Recevez votre lien',
    description: 'Après validation, vous recevez votre lien de suivi personnel.',
  },
  {
    title: 'Créez du contenu',
    description: 'Partagez votre expérience de Yummeal dans le format de votre choix.',
  },
  {
    title: 'Touchez votre commission',
    description: 'Chaque conversion générée via votre lien est suivie et rémunérée.',
  },
];

const PROFILE = [
  'Créateurs food, lifestyle, bien-être ou organisation du quotidien',
  "Communauté engagée, quelle que soit sa taille — l'authenticité compte plus que le nombre",
  'À l\'aise pour créer du contenu UGC (vidéo, témoignage, avis)',
];

function ApplyButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={APPLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`clay-btn clay-btn--primary ${className}`}
    >
      Postuler au programme
    </a>
  );
}

const Creators: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block font-heading text-sm font-semibold uppercase tracking-wide text-[#FF8C42] bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm">
                Programme Creators
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                Devenez créateur Yummeal
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                Partagez votre expérience de l'app avec votre communauté et touchez une
                commission sur chaque conversion générée grâce à votre lien personnel.
              </p>
              <div className="flex flex-col items-start gap-3">
                <ApplyButton className="!mx-0" />
                <p className="text-sm text-gray-500">
                  Vous serez redirigé vers notre formulaire de candidature partenaire.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img
                src={CreatorsHeroImage}
                alt="Créatrice UGC présentant l'application Yummeal sur son téléphone"
                className="w-full max-w-xs md:max-w-sm rounded-[1.5rem] hero-image"
                width={800}
                height={1400}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
            Pourquoi rejoindre le programme ?
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Un partenariat pensé pour les créateurs, pas une simple affiliation.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="clay-card text-center flex flex-col items-center"
              >
                <div
                  className="clay-icon inline-flex items-center justify-center bg-[#FF8C42] p-2 rounded-full shadow-lg mb-4"
                  style={{ width: '48px', height: '48px' }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-12">
            Comment ça marche
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="clay-card p-6 flex flex-col items-center text-center"
              >
                <div className="clay-icon bg-[#4CAF50] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold font-heading mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we're looking for */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="clay-container">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-8">
              Qui recherchons-nous ?
            </h2>
            <ul className="space-y-4 max-w-2xl mx-auto">
              {PROFILE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Prêt à rejoindre l'aventure ?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            La candidature ne prend que quelques minutes.
          </p>
          <ApplyButton />
        </div>
      </section>
    </div>
  );
};

export default Creators;
