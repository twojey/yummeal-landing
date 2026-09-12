import { motion } from 'framer-motion';
import { ShoppingBag, Scale, Utensils, Heart } from 'lucide-react';
import HeroImage from '../hero.webp';
import DownloadButtons from '../components/DownloadButtons';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLocale } from '../i18n/useLocale';
import { cheminLocalise } from '../i18n/config';
import {
  buildMobileApplicationJsonLd,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from '../lib/schema';

/**
 * Page d'accueil.
 *
 * Elle vivait en 287 lignes de JSX inline dans `App.tsx`, avec chaque phrase
 * en dur et les liens des stores recopiés trois fois. Extraite ici et pilotée
 * par dictionnaire, elle sert les deux langues avec le même code — ce qui est
 * la seule façon d'éviter qu'une correction faite en français ne soit jamais
 * reportée en polonais.
 *
 * Deux formulations ont changé au passage, et ce ne sont pas des retouches de
 * style :
 *
 *  - « Yummeal GÉNÈRE instantanément des recettes » a disparu. Les recettes ne
 *    sont pas générées : elles sont écrites par des humains, l'application les
 *    trie et les filtre. C'était la phrase que toute notre communication
 *    s'interdit, et elle était sur la page la plus vue du site. Le test
 *    `tests/regles-editoriales.test.mjs` ne cherchait que « recettes générées
 *    par IA » : il a été élargi au verbe.
 *  - « Rejoignez des MILLIERS d'utilisateurs » a disparu aussi. Le chiffre
 *    n'est pas étayable publiquement, et on ne recopie pas une preuve sociale
 *    invérifiable dans une deuxième langue.
 *
 * Les icônes des quatre atouts sont volontairement positionnelles (elles
 * décrivent le RÔLE de la carte, pas son texte) : elles restent justes quand
 * la traduction change les mots.
 */
const ICONES_ATOUTS = [ShoppingBag, Scale, Utensils, Heart] as const;

export default function HomePage() {
  const { locale, t } = useLocale();
  const a = t.accueil;

  usePageMeta({
    title: a.title,
    description: a.description,
    canonicalPath: cheminLocalise('', locale),
    jsonLd: [
      buildOrganizationJsonLd(),
      buildWebSiteJsonLd(locale),
      buildMobileApplicationJsonLd(),
    ],
  });

  return (
    <div>
      {/* Hero */}
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
                  {a.h1Ligne1}
                  <br />
                  {a.h1Ligne2}
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-700">
                  {a.accroche}
                </p>
                <div className="hero-buttons">
                  <DownloadButtons />
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src={HeroImage}
                  alt={a.altHero}
                  className="w-full max-w-md mx-auto rounded-[1rem]"
                  width={800}
                  height={1400}
                />
              </div>
              <div className="md:hidden mt-8">
                <img
                  src={HeroImage}
                  alt={a.altHero}
                  className="w-full max-w-xs mx-auto rounded-[1rem]"
                  width={800}
                  height={1400}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Atouts */}
      <motion.section
        id="features"
        className="features-section py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="clay-container">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-4">
              {a.atoutsTitre}
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {a.atouts.map((atout, i) => {
                const Icone = ICONES_ATOUTS[i] ?? ShoppingBag;
                return (
                  <motion.div
                    key={atout.titre}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="clay-card text-center flex flex-col items-center"
                  >
                    <div
                      className="clay-icon inline-flex items-center justify-center bg-[#4CAF50] p-2 rounded-full shadow-lg mb-4"
                      style={{ width: '48px', height: '48px' }}
                    >
                      <Icone className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{atout.titre}</h3>
                    <p className="text-gray-600">{atout.corps}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Téléchargement */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {a.finalTitre}
          </h2>
          <p className="text-lg text-gray-600 mb-8">{a.finalCorps}</p>
          <DownloadButtons />
        </div>
      </section>

      {/* Parcours */}
      <motion.section
        id="how-it-works"
        className="how-it-works-section py-20 bg-[#FFFAF0]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-12">
            {a.parcoursTitre}
          </h2>
          {/* Numérotation conservée : ce sont trois étapes réellement
              séquentielles, l'ordre porte de l'information. */}
          <ol className="grid md:grid-cols-3 gap-10 list-none p-0">
            {a.parcours.map((etape, i) => (
              <li
                key={etape.titre}
                className="clay-card p-8 flex flex-col items-center text-center"
              >
                <div className="clay-icon bg-[#4CAF50] text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold font-heading mb-4">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{etape.titre}</h3>
                <p className="text-gray-600">{etape.corps}</p>
              </li>
            ))}
          </ol>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        id="faq"
        className="faq-section py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="clay-container">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center mb-12">
              {a.faqTitre}
            </h2>
            <div className="space-y-8">
              {a.faq.map((item) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="clay-card p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <section className="pt-0 pb-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <DownloadButtons />
        </div>
      </section>
    </div>
  );
}
