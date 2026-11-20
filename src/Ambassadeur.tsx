import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  Clapperboard,
  Wallet,
  Crown,
  Check,
  X,
  Apple,
  Play,
} from 'lucide-react';
import { trackFacebookEvent } from './utils/facebookPixel';
import { trackTikTokEvent } from './utils/tiktokPixel';
import { STORE_URLS_DEFAUT } from './config';

const APPLY_URL = 'https://kroaze-business.vercel.app/candidater/yummeal';

/**
 * Accroches hero en rupture, choisies par `?v=` (message-match avec la pub).
 * Titres nus, à la première personne : la curiosité fait le travail.
 */
const VARIANTS: Record<string, string> = {
  frigo: "Comment mon frigo m'a payé mes vacances",
  courses: 'Ne paye plus tes courses',
  recette: "Comment cette recette m'a payé mes vacances",
  cuisine: 'Comment je suis payée pour faire la cuisine',
  burger: "Comment ce burger m'a rapporté 100€",
  foutou: "Comment mon foutou banane m'a payé mes vacances",
  chakhchoukha: "Comment ma chakhchoukha m'a payé mes vacances",
  restes: 'Tu jettes tes restes ? Moi ils me paient.',
  '500': 'Une vidéo de ton frigo. Jusqu\u2019à 500€.',
};

const DEFAULT_VARIANT = 'frigo';

function heroTitle(): string {
  if (typeof window === 'undefined') return VARIANTS[DEFAULT_VARIANT];
  const v = new URLSearchParams(window.location.search).get('v') ?? '';
  return VARIANTS[v] ?? VARIANTS[DEFAULT_VARIANT];
}

// Propage fbclid/ttclid vers la page Kroaze : les pixels officiels les
// capturent automatiquement au chargement (cookies _fbc / _ttp), ce qui
// boucle l'attribution côté Meta/TikTok sans dépendre des paramètres UTM.
function buildApplyUrl(): string {
  if (typeof window === 'undefined') return APPLY_URL;
  const current = new URLSearchParams(window.location.search);
  const forwarded = new URLSearchParams();
  const fbclid = current.get('fbclid');
  const ttclid = current.get('ttclid');
  if (fbclid) forwarded.set('fbclid', fbclid);
  if (ttclid) forwarded.set('ttclid', ttclid);
  const qs = forwarded.toString();
  return qs ? `${APPLY_URL}?${qs}` : APPLY_URL;
}

const PILLARS = [
  {
    icon: Smartphone,
    title: 'Un smartphone suffit',
    description:
      "On veut du vrai, pas du studio. Ton frigo, ta cuisine, ta recette du soir — c'est exactement ce qui marche.",
  },
  {
    icon: Clapperboard,
    title: 'Brief clair + zéro montage',
    description:
      "Tu reçois un brief précis : angles, exemples, ce qu'on attend. Tu filmes tes rushs, on monte tout — coupes, sous-titres, son.",
  },
  {
    icon: Wallet,
    title: 'Payée sur chaque vidéo',
    description:
      "Avance garantie dès la première vidéo + bonus sur les vues : jusqu'à 500€. Paiement automatisé chaque mois.",
  },
];

const STEPS = [
  {
    title: 'Candidate en 2 minutes',
    description:
      "Remplis le formulaire de candidature. Notre équipe te répond personnellement sous 72h.",
  },
  {
    title: 'Reçois ton brief',
    description:
      "Accès à l'espace créateurs, exemples de vidéos qui cartonnent, et l'angle recette à traiter.",
  },
  {
    title: 'Filme ta recette',
    description:
      "15 à 45 secondes, format vertical : ton frigo, le scan, la recette trouvée, le plat final. On monte tout.",
  },
  {
    title: 'Publie & encaisse',
    description:
      "Vidéo en ligne → avance + bonus vues versés chaque mois. Si ton format cartonne, il devient un modèle (royalties).",
  },
];

const VALIDATED = [
  'Format vertical (9:16), 15 à 45 secondes, lumière correcte',
  'Tu filmes ton vrai frigo, ta vraie cuisine, ta vraie recette',
  "Un angle clair : le frigo qui paie les vacances, le plat qui t'a rapporté 100€, les restes transformés…",
  'Son propre — ta voix ou une musique libre de droits',
];

const REFUSED = [
  "Montage de vidéos volées ou contenu d'un autre créateur",
  "Tu n'as jamais ouvert l'app (ça se sent — et ça se voit)",
  'Image floue, son inaudible, ou lecture d\u2019un script robotique',
  'Plats truqués ou promesses exagérées — on montre des recettes qui marchent, pas des miracles',
];

const ANGLES = [
  {
    hook: '« Comment mon foutou banane m\u2019a payé mes vacances »',
    detail: "Le plat signature ivoirien — personne n'en parle, tout le monde clique.",
  },
  {
    hook: '« Comment ma chakhchoukha m\u2019a payé mes vacances »',
    detail: 'Le plat que les Maghrébins connaissent par cœur et que personne ne filme.',
  },
  {
    hook: '« Ne paye plus tes courses »',
    detail: "L'angle économie direct : ta recette du jour rembourse ton caddie.",
  },
  {
    hook: '« Comment ce burger m\u2019a rapporté 100€ »',
    detail: 'Un plat du quotidien + un chiffre précis = le combo qui arrête le scroll.',
  },
  {
    hook: '« Comment cette recette m\u2019a payé mes vacances »',
    detail: "Une seule recette filmée, un aller-retour au soleil.",
  },
  {
    hook: '« Tu jettes tes restes ? Moi ils me paient. »',
    detail: "L'anti-gaspillage en version provocante — c'est littéralement le cœur de l'app.",
  },
];

const FAQ = [
  {
    q: 'Il faut combien d\u2019abonnés ?',
    a: 'Très peu. Ce qui compte, c\u2019est ta capacité à produire du contenu authentique — une communauté petite mais engagée suffit.',
  },
  {
    q: 'Comment et quand suis-je payée ?',
    a: 'Tu touches une avance garantie sur chaque vidéo, puis un bonus sur les vues qualifiées (jusqu\u2019à 500€ par vidéo). Le paiement est automatisé chaque mois — pas de facture à gérer.',
  },
  {
    q: 'Je dois savoir monter des vidéos ?',
    a: 'Non. Tu envoies tes rushs bruts, notre équipe fait le montage complet : coupes, sous-titres, sound design.',
  },
  {
    q: 'Que devient ma vidéo ?',
    a: 'Elle est publiée sur les réseaux de Yummeal et peut être utilisée en publicité (Meta, TikTok). C\u2019est le principe : ta recette, notre diffusion, tes vues rémunérées.',
  },
  {
    q: 'C\u2019est quoi les royalties ?',
    a: 'Si tu inventes un format qui cartonne et qu\u2019on le fait reproduire par d\u2019autres créateurs, tu touches 2 à 5% sur toutes les vidéos dérivées de ton idée. À vie.',
  },
  {
    q: 'Je dois payer l\u2019app ?',
    a: 'Non — Yummeal est gratuite à télécharger. Scanne ton frigo, découvre les recettes, filme ton vrai avis.',
  },
];

function ApplyButton({ className = '' }: { className?: string }) {
  const handleClick = () => {
    trackFacebookEvent('Lead', { content_name: 'ambassadeur_apply' });
    trackTikTokEvent('ClickButton', { content_name: 'ambassadeur_apply' });
  };
  return (
    <a
      href={buildApplyUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`clay-btn clay-btn--primary ${className}`}
      onClick={handleClick}
    >
      Je candidate →
    </a>
  );
}

const Ambassadeur: React.FC = () => {
  const title = heroTitle();
  return (
    <div>
      {/* Hero — accroche en rupture + mockup vidéo façon TikTok */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block font-heading text-sm font-semibold uppercase tracking-wide text-[#FF8C42] bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm">
                🎬 Créateur UGC Yummeal
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                {title}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Pas besoin d'abonnés, pas besoin de matériel. Tu filmes ta
                recette avec ton smartphone, on monte —{' '}
                <b className="text-gray-800">
                  avance garantie, jusqu'à 500€ la vidéo.
                </b>
              </p>
              <div className="flex flex-col items-start gap-3">
                <ApplyButton className="!mx-0" />
                <p className="text-sm text-gray-500">
                  Candidature gratuite · réponse de l'équipe sous 72h
                </p>
              </div>
            </motion.div>

            {/* Mockup téléphone façon TikTok — 100% CSS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div
                className="relative w-[260px] max-w-[78vw] aspect-[9/16] rounded-[28px] border-[6px] border-[#2d1a0e] overflow-visible"
                style={{
                  background:
                    'radial-gradient(120% 80% at 70% 15%, #ffe3c2 0%, #ffc78f 45%, #ff9e57 100%)',
                  boxShadow: '0 24px 60px rgba(255,140,66,.35)',
                }}
              >
                {/* encoche caméra */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[86px] h-[22px] bg-[#2d1a0e] rounded-xl z-10" />
                {/* badge REC */}
                <div className="absolute top-11 left-4 z-10 flex items-center gap-1.5 bg-black/50 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  REC
                </div>
                {/* timer */}
                <div className="absolute top-11 right-4 z-10 text-white text-xs font-bold bg-black/50 px-2.5 py-1 rounded-full">
                  00:23
                </div>
                {/* la recette filmée */}
                <div className="absolute inset-0 flex items-center justify-center text-[84px]">
                  🍲
                </div>
                {/* caption = l'accroche de la variante */}
                <div className="absolute left-3.5 right-3.5 bottom-14 z-10 text-white text-[13px] font-bold [text-shadow:0_2px_8px_rgba(0,0,0,.6)]">
                  « {title} »
                  <span className="block font-normal opacity-80 mt-1">
                    @toii · Yummeal recettes
                  </span>
                </div>
                {/* barre de progression */}
                <div className="absolute left-0 bottom-0 h-1 w-3/5 bg-[#FF8C42] z-10" />
                {/* badge flottant +500€ */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-[84px] -right-4 rotate-[8deg] bg-[#4CAF50] text-white font-extrabold text-xl px-4 py-2.5 rounded-2xl shadow-[0_10px_26px_rgba(76,175,80,.45)] z-20"
                >
                  +500€
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3 piliers */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {PILLARS.map(({ icon: Icon, title: t, description }) => (
              <motion.div
                key={t}
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
                <h3 className="text-lg font-semibold mb-2">{t}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche + money band */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
                Comment ça marche
              </h2>
              <ol className="space-y-6">
                {STEPS.map((step, index) => (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="clay-icon bg-[#FF8C42] text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold font-heading flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="clay-container bg-gradient-to-br from-[#FF8C42] to-[#FF5733] text-white"
              >
                <div className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
                  Jusqu'à 500€ par vidéo
                </div>
                <p className="text-white/90">
                  + une avance garantie sur chaque vidéo, même sans cartonner.
                  <br />
                  <br />
                  <b className="text-white">
                    Sans montage. Sans matériel. Sans plafond.
                  </b>
                  <br />
                  Les créateurs réguliers débloquent des briefs prioritaires —
                  et un format qui devient un modèle te rapporte des royalties
                  de 2 à 5% à vie.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="clay-card mt-4 text-sm"
              >
                ⚠️ <b>Authenticité obligatoire :</b> nous payons du contenu
                sincère. Télécharge l'app, scanne ton vrai frigo, filme ta vraie
                recette.
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Validé / Refusé */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-12">
            Ce qu'on valide — et ce qu'on refuse
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="clay-card"
            >
              <h3 className="font-semibold text-lg mb-4">
                ✅ Ta vidéo est validée si…
              </h3>
              <ul className="space-y-3">
                {VALIDATED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <Check className="w-5 h-5 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="clay-card"
            >
              <h3 className="font-semibold text-lg mb-4">
                ❌ Elle est refusée si…
              </h3>
              <ul className="space-y-3">
                {REFUSED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <X className="w-5 h-5 text-[#d64545] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Exemples d'angles qui cartonnent */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
            Exemples d'angles qui cartonnent
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Inspire-toi de ces hooks — ou invente le tien. S'il devient un
            format de référence, tu touches des royalties dessus.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ANGLES.map(({ hook, detail }) => (
              <motion.div
                key={hook}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="clay-card"
              >
                <h3 className="font-bold mb-2">{hook}</h3>
                <p className="text-gray-600 text-sm">{detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate maintenant */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="clay-container text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Candidate maintenant
            </h2>
            <p className="text-gray-600 mb-8">
              Inscription gratuite. On te répond par email sous 72h avec ton
              brief et l'accès à l'espace créateurs.
            </p>
            <ApplyButton />
            <p className="text-sm text-gray-500 mt-6">
              🔒 Candidature sans engagement — réponse personnalisée, aucune
              revente de données.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a
                href={STORE_URLS_DEFAUT.apple}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn inline-flex items-center gap-2"
              >
                <Apple className="w-5 h-5" />
                <span className="text-left leading-tight">
                  <small className="block text-xs opacity-70">Télécharge sur</small>
                  <b>App Store</b>
                </span>
              </a>
              <a
                href={STORE_URLS_DEFAUT.google}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn inline-flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                <span className="text-left leading-tight">
                  <small className="block text-xs opacity-70">Disponible sur</small>
                  <b>Google Play</b>
                </span>
              </a>
            </div>
          </motion.div>
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
              Invente une recette de contenu, touche des royalties à vie
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Si ton format devient un carton et qu'on le fait reproduire par
              d'autres créateurs, tu touches{' '}
              <span className="font-semibold text-gray-800">2 à 5% de royalties</span>{' '}
              sur toutes les vidéos dérivées de ton idée. Même en vacances, tant
              que la communauté utilise ton concept, tu es payée.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="clay-card group">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  {q}
                  <span className="text-[#FF8C42] text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-gray-600 text-sm mt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ambassadeur;
