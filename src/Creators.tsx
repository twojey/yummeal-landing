import React from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Repeat2,
  Trophy,
  Crown,
  Scissors,
  Wallet,
  Users,
  CheckCircle2,
} from 'lucide-react';
import CreatorsHeroImage from './creators-hero.webp';

const APPLY_URL = 'https://kroaze-business.vercel.app/candidater/yummeal';

const TIERS = [
  {
    icon: Target,
    title: 'Teste tes idées',
    amount: '5€ / vidéo',
    description:
      "Une avance calculée sur l'ensemble de tes vidéos, pas une par une : si une seule cartonne, elle couvre les autres. Le terrain idéal pour tester un format sans pression.",
  },
  {
    icon: Repeat2,
    title: 'Reproduis un carton',
    amount: '10 à 15€ / vidéo',
    description:
      "Quand on te demande de répliquer un format qui a déjà fait ses preuves, l'avance grimpe. Moins de risque, format déjà validé, mieux payé.",
  },
  {
    icon: Trophy,
    title: 'Vise le jackpot',
    amount: "jusqu'à 500€ / vidéo",
    description:
      'Plus ta vidéo génère de vues qualifiées, plus tu gagnes. Un objectif clair, atteignable, qui récompense les vraies performances.',
  },
];

const FRICTIONLESS = [
  {
    icon: Scissors,
    title: 'Zéro montage',
    description:
      'Tu filmes tes rushs, on monte tout : coupes, sous-titres, sound design. Toi, tu te concentres sur le contenu.',
  },
  {
    icon: Wallet,
    title: 'Paiement simplifié',
    description:
      'Pas de facture à monter toi-même : tu valides en un clic, le paiement est automatisé chaque mois.',
  },
  {
    icon: Users,
    title: 'Une communauté qui progresse ensemble',
    description:
      'Accès à un espace privé où les concepts qui marchent sont partagés en temps réel, pour que tout le monde s\'améliore.',
  },
];

const STEPS = [
  {
    title: 'Postule',
    description: 'Remplis le formulaire de candidature en quelques minutes.',
  },
  {
    title: 'Ton profil est étudié',
    description: "L'équipe Yummeal regarde ta candidature et tes réseaux.",
  },
  {
    title: 'Rejoins les créateurs',
    description: "Une fois accepté·e, tu reçois un code pour accéder à l'espace créateurs Yummeal.",
  },
  {
    title: 'Publie et sois payé·e',
    description: 'Poste ton contenu : avance, gains sur les vues et royalties potentielles te sont versés.',
  },
];

const PROFILE = [
  'Créateurs et créatrices food, lifestyle, bien-être ou organisation du quotidien',
  "Communauté engagée, quelle que soit sa taille — l'authenticité compte plus que le nombre",
  'À l\'aise pour créer du contenu UGC (vidéo, témoignage, avis) sur TikTok et/ou Instagram',
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
                Deviens créateur·rice Yummeal
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                Un revenu stable dès ta première vidéo, des concepts qui ont déjà fait leurs
                preuves à répliquer, et des royalties à vie si tu inventes le prochain carton.
              </p>
              <div className="flex flex-col items-start gap-3">
                <ApplyButton className="!mx-0" />
                <p className="text-sm text-gray-500">
                  Tu seras redirigé·e vers notre formulaire de candidature partenaire.
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

      {/* Rémunération */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
            Comment tu es payé·e
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Trois paliers, du premier essai jusqu'au format qui cartonne.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {TIERS.map(({ icon: Icon, title, amount, description }) => (
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
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="font-heading font-bold text-[#FF8C42] mb-3">{amount}</p>
                <p className="text-gray-600 text-sm">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Royalties */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="clay-container text-center"
          >
            <div
              className="clay-icon inline-flex items-center justify-center bg-[#FF8C42] p-3 rounded-full shadow-lg mb-6"
              style={{ width: '56px', height: '56px' }}
            >
              <Crown className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Invente un format, touche des royalties à vie
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Si l'un de tes formats devient un carton et qu'on le fait reproduire par
              d'autres créateurs de la communauté, tu touches{' '}
              <span className="font-semibold text-gray-800">2 à 5% de royalties</span> sur
              toutes les vidéos copiées à partir de ton idée. Même en vacances, tant que la
              communauté utilise ton concept, tu es payé·e.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Zéro friction */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-12">
            Une expérience sans friction
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {FRICTIONLESS.map(({ icon: Icon, title, description }) => (
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
                <div className="clay-icon bg-[#FF8C42] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold font-heading mb-4">
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
            Prêt·e à rejoindre l'aventure ?
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
