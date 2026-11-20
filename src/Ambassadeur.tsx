import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  Clapperboard,
  Wallet,
  Check,
  X,
  Heart,
  MessageCircle,
  Share2,
  Music2,
  Apple,
  Play,
} from 'lucide-react';
import CreatorsHeroImage from './creators-hero.webp';
import CoursesImage from './hero.webp';
import FeatFrigo from './assets-amb/feat-frigo.webp';
import FeatJournal from './assets-amb/feat-journal.webp';
import FeatEnvie from './assets-amb/feat-envie.webp';
import DishFoutou from './assets-amb/dish-foutou.webp';
import DishGratin from './assets-amb/dish-gratin.webp';
import DishFrigo from './assets-amb/dish-frigo.webp';
import RecCuisine from './assets-amb/rec-cuisine.webp';
import RecBatch from './assets-amb/rec-batch.webp';
import RecPlat from './assets-amb/rec-plat.webp';
import RecPartage from './assets-amb/rec-partage.webp';
import RecPrep from './assets-amb/rec-prep.webp';
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
  gratin: "Comment ce gratin m'a rapporté 100€",
  foutou: "Comment mon foutou banane m'a payé mes vacances",
  chakhchoukha: "Comment ma chakhchoukha m'a payé mes vacances",
  restes: 'Tu jettes tes restes ? Moi ils me paient.',
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
      "Tu cuisines déjà tous les jours. Filme ce que tu fais — ton frigo, ta recette, le plat final — c'est exactement ce qui marche.",
  },
  {
    icon: Clapperboard,
    title: 'Brief clair + app offerte',
    description:
      "Tu reçois l'app gratuitement et un brief précis : angles, exemples, ce qu'on attend. Tu n'as plus qu'à cuisiner en filmant.",
  },
  {
    icon: Wallet,
    title: '100€ dès 30 000 vues',
    description:
      'Ta vidéo atteint 30 000 vues → tu touches 100€. + 20% récurrent sur chaque abonné qui rejoint Yummeal grâce à toi.',
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
      "Accès à l'app offert, exemples de vidéos qui cartonnent, et l'angle recette à traiter.",
  },
  {
    title: 'Filme ta recette',
    description:
      '15 à 45 secondes, format vertical : ton frigo, le scan, la recette trouvée, le plat final. Ton vrai quotidien en cuisine.',
  },
  {
    title: 'Publie & encaisse',
    description:
      '30 000 vues → 100€. Sans plafond : 3 vidéos qui passent les 30k = 300€. Et 20% récurrent sur tes parrainages.',
  },
];

const TIKTOK_POSTS = [
  {
    image: DishFoutou,
    handle: '@cuisine.de.toii',
    caption: 'Comment mon foutou banane m\u2019a payé mes vacances 🤯',
    song: 'son original - cuisine.de.toii',
    likes: '24,8K',
    comments: '486',
    shares: '1,9K',
    views: '47K vues',
  },
  {
    image: DishGratin,
    handle: '@les.recettes.de.lea',
    caption: 'Ce gratin maison m\u2019a rapporté 100€ (recette en commentaire)',
    song: 'Cooking Vibes - Kitchen Beats',
    likes: '12,4K',
    comments: '238',
    shares: '890',
    views: '33K vues',
  },
  {
    image: DishFrigo,
    handle: '@frigo.malin',
    caption: 'Ne paye plus tes courses : mon frigo me fait les menus 🥑',
    song: 'son original - frigo.malin',
    likes: '31,2K',
    comments: '612',
    shares: '2,4K',
    views: '58K vues',
  },
];

const RECETTE_ARGS = [
  {
    image: RecCuisine,
    title: 'Tu cuisines déjà tous les jours',
    description:
      "Le contenu existe déjà — il ne manque qu'appuyer sur record. Un téléphone posé sur le plan de travail suffit.",
  },
  {
    image: RecBatch,
    title: 'Du contenu infini',
    description:
      "Une recette par jour = une vidéo par jour. Jamais à court d'idées : l'app te souffle quoi cuisiner avec ce que tu as.",
  },
  {
    image: RecPlat,
    title: 'Un beau plat parle à tout le monde',
    description:
      "Pas besoin de mots ni d'abonnés : un plat appétissant arrête le scroll dans toutes les langues.",
  },
  {
    image: RecPartage,
    title: 'Tout le monde se demande « on mange quoi ? »',
    description:
      "Chaque personne qui a un frigo est une spectatrice potentielle. L'audience est littéralement massive.",
  },
  {
    image: RecPrep,
    title: 'Ton repas du soir peut payer ton resto',
    description:
      "Un dimanche de cuisine = des semaines de contenu. Chaque vidéo à 30 000 vues, c'est 100€ de plus.",
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
  'Vues achetées ou faux comptes — les 30 000 vues doivent être réelles',
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
    hook: '« Comment ce gratin m\u2019a rapporté 100€ »',
    detail: 'Un plat du quotidien + un chiffre précis = le combo qui arrête le scroll.',
  },
  {
    hook: '« Comment cette recette m\u2019a payé mes vacances »',
    detail: 'Une seule recette filmée, un aller-retour au soleil.',
  },
  {
    hook: '« Tu jettes tes restes ? Moi ils me paient. »',
    detail: "L'anti-gaspillage en version provocante — c'est littéralement le cœur de l'app.",
  },
];

const FAQ = [
  {
    q: 'Il faut combien d\u2019abonnés ?',
    a: 'Zéro. Ce sont les vues qui paient, pas les abonnés — TikTok peut pousser une vidéo à 30 000 vues même depuis un compte récent.',
  },
  {
    q: 'Comment et quand suis-je payée ?',
    a: '100€ dès qu\u2019une de tes vidéos validée atteint 30 000 vues. En plus, 20% récurrent sur chaque abonné qui rejoint Yummeal grâce à ton lien. Paiement mensuel.',
  },
  {
    q: 'Combien de vidéos puis-je publier ?',
    a: 'Autant que tu veux — chaque vidéo qui passe les 30 000 vues est payée 100€, sans plafond. Les créateurs réguliers reçoivent des briefs prioritaires.',
  },
  {
    q: 'Comment marchent les 20% récurrents ?',
    a: 'Tu as un lien de parrainage. Chaque personne qui s\u2019abonne à Yummeal via ce lien te reverse 20% de son abonnement, tant qu\u2019elle reste abonnée.',
  },
  {
    q: 'Que devient ma vidéo ?',
    a: 'Tu la publies sur tes réseaux, et les meilleures peuvent être reprises en publicité Yummeal (Meta, TikTok). Ton contenu, tes vues, ta paie.',
  },
  {
    q: 'Je dois payer l\u2019app ?',
    a: 'Non — Yummeal est gratuite à télécharger. Scanne ton frigo, teste les recettes, filme ton vrai avis.',
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

function TikTokPost({ post }: { post: (typeof TIKTOK_POSTS)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-xl bg-black"
    >
      {/* la vidéo du plat */}
      <img
        src={post.image}
        alt={post.caption}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />
      {/* onglet Pour toi */}
      <div className="absolute top-3 left-0 right-0 text-center text-white/90 text-xs font-semibold z-10">
        Suivis&nbsp;&nbsp;<span className="border-b-2 border-white pb-0.5">Pour toi</span>
      </div>
      {/* rail droit façon TikTok */}
      <div className="absolute right-2 bottom-20 z-10 flex flex-col items-center gap-4 text-white">
        <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-lg">
          👩🏿‍🍳
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Heart className="w-6 h-6 fill-white" />
          <span className="text-[10px] font-bold">{post.likes}</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="text-[10px] font-bold">{post.comments}</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Share2 className="w-6 h-6 fill-white" />
          <span className="text-[10px] font-bold">{post.shares}</span>
        </div>
      </div>
      {/* caption bas */}
      <div className="absolute left-3 right-12 bottom-4 z-10 text-white">
        <div className="text-xs font-bold">{post.handle}</div>
        <div className="text-[11px] leading-snug mt-1 [text-shadow:0_1px_6px_rgba(0,0,0,.5)]">
          {post.caption}
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-[10px] opacity-90">
          <Music2 className="w-3 h-3" />
          <span className="truncate">{post.song}</span>
        </div>
      </div>
      {/* badge vues → payée */}
      <div className="absolute top-9 left-2 z-10 bg-[#4CAF50] text-white text-[11px] font-extrabold px-2.5 py-1.5 rounded-xl shadow-lg rotate-[-6deg]">
        {post.views} = 100€
      </div>
      {/* barre de progression */}
      <div className="absolute left-0 bottom-0 h-0.5 w-2/3 bg-white/80 z-10" />
    </motion.div>
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
                🎬 Ambassadeur Yummeal
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
                {title}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Tu fais déjà à manger tous les jours. Filme ta recette avec ton
                smartphone, publie —{' '}
                <b className="text-gray-800">
                  100€ dès 30 000 vues + 20% récurrent sur tes parrainages.
                </b>
              </p>
              <div className="flex flex-col items-start gap-3">
                <ApplyButton className="!mx-0" />
                <p className="text-sm text-gray-500">
                  Candidature gratuite · réponse de l'équipe sous 72h
                </p>
              </div>
            </motion.div>

            {/* Mockup téléphone façon TikTok — vraie image + overlay CSS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div
                className="relative w-[260px] max-w-[78vw] aspect-[9/16] rounded-[28px] border-[6px] border-[#2d1a0e] overflow-visible"
                style={{ boxShadow: '0 24px 60px rgba(255,140,66,.35)' }}
              >
                <img
                  src={CreatorsHeroImage}
                  alt="Créatrice filmant l'application Yummeal dans sa cuisine"
                  className="absolute inset-0 w-full h-full object-cover rounded-[22px]"
                  width={800}
                  height={1400}
                />
                <div className="absolute inset-0 rounded-[22px] bg-gradient-to-t from-black/60 via-transparent to-black/20" />
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
                {/* caption = l'accroche de la variante */}
                <div className="absolute left-3.5 right-3.5 bottom-14 z-10 text-white text-[13px] font-bold [text-shadow:0_2px_8px_rgba(0,0,0,.6)]">
                  « {title} »
                  <span className="block font-normal opacity-80 mt-1">
                    @toii · Yummeal recettes
                  </span>
                </div>
                {/* barre de progression */}
                <div className="absolute left-0 bottom-0 h-1 w-3/5 bg-[#FF8C42] z-10" />
                {/* badge flottant +100€ */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-[84px] -right-4 rotate-[8deg] bg-[#4CAF50] text-white font-extrabold text-xl px-4 py-2.5 rounded-2xl shadow-[0_10px_26px_rgba(76,175,80,.45)] z-20"
                >
                  +100€
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* D'abord : Yummeal, c'est quoi ? */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center order-last md:order-first"
            >
              <img
                src={CoursesImage}
                alt="Créatrice Yummeal avec son panier de courses fraîches"
                className="w-full max-w-xs md:max-w-sm rounded-[1.5rem] hero-image"
                width={800}
                height={1400}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                D'abord — Yummeal, c'est quoi ?
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                L'app qui transforme le contenu de ton frigo en recettes. Tu
                photographies ce que tu as, elle te dit quoi cuisiner — plus de
                « qu'est-ce qu'on mange ce soir ? », moins de gaspillage, moins
                de courses.
              </p>
              <p className="text-gray-600">
                Et le produit se filme tout seul : ouvrir son frigo, scanner,
                trouver une recette, la cuisiner. C'est le quotidien de
                n'importe qui — sauf que toi, tu es payée pour le filmer.
              </p>
            </motion.div>
          </div>

          {/* Visuels produit — les arguments que tes vidéos mettent en scène */}
          <div className="grid sm:grid-cols-3 gap-6 mt-14 max-w-4xl mx-auto">
            {[
              {
                src: FeatFrigo,
                alt: "Trouve les recettes qui matchent ton frigo — vidéos de recettes avec tes ingrédients",
                rotate: 'sm:-rotate-3',
              },
              {
                src: FeatJournal,
                alt: "Organise tes repas facilement — planning de la semaine et suivi des calories",
                rotate: 'sm:translate-y-4',
              },
              {
                src: FeatEnvie,
                alt: "Trouve des recettes qui te font envie — les meilleures recettes du net",
                rotate: 'sm:rotate-3',
              },
            ].map(({ src, alt, rotate }) => (
              <motion.img
                key={alt}
                src={src}
                alt={alt}
                loading="lazy"
                width={576}
                height={1024}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`w-full rounded-2xl shadow-xl ${rotate} transition-transform hover:scale-[1.03]`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-10">
            👆 Ce que tu montres dans tes vidéos : le scan du frigo, le planning
            de la semaine, les recettes qui donnent envie.
          </p>
        </div>
      </section>

      {/* Pourquoi les recettes : on cuisine tous les jours */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
            Tu cuisines déjà tous les jours
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Voilà pourquoi les vidéos recettes sont le format le plus facile à
            produire — et celui qui rapporte.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {RECETTE_ARGS.map(({ image, title: t, description }) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="clay-card !p-0 overflow-hidden flex flex-col"
              >
                <img
                  src={image}
                  alt={t}
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1.5 leading-snug">{t}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 piliers */}
      <section className="py-16 md:py-20">
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
      <section className="py-16 md:py-20 bg-white">
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
                  100€ la vidéo à 30 000 vues
                </div>
                <p className="text-white/90">
                  + 20% récurrent sur chaque abonné parrainé, tant qu'il reste
                  abonné.
                  <br />
                  <br />
                  <b className="text-white">
                    Sans plafond. Sans montage. Sans matériel.
                  </b>
                  <br />
                  Les créateurs réguliers débloquent des briefs prioritaires et
                  des bonus.
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

      {/* Publications payées — mockups TikTok */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
            Les vidéos qui sont payées ressemblent à ça
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Des recettes du quotidien, filmées avec un téléphone. Chaque
            publication qui passe 30 000 vues = 100€ versés.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {TIKTOK_POSTS.map((post) => (
              <TikTokPost key={post.handle} post={post} />
            ))}
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
            Inspire-toi de ces hooks — ou invente le tien autour de tes propres
            recettes.
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
              brief et l'accès à l'app offert.
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

      {/* FAQ */}
      <section className="py-16 md:py-20">
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
