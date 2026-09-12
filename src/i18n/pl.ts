import type { Dictionnaire } from './fr';

/**
 * Dictionnaire polonais.
 *
 * CE N'EST PAS UNE TRADUCTION À NEUF. Le vocabulaire polonais du produit est
 * déjà fixé et relu à deux endroits, et il fait foi ici :
 *  - `yummeal_app/lib/l10n/app_pl.arb` (l'application, 1722 clés) ;
 *  - `documentation/marketing/CUSTOM_LISTINGS_PL.md` (le registre marketing des
 *    fiches Play, écrit le 11/09/2026).
 *
 * Un site qui dirait « chłodnia » quand l'application dit « lodówka » casserait
 * la reconnaissance de marque exactement au moment du lancement. Les termes
 * repris tels quels : lodówka (frigo), przepis (recette), składnik
 * (ingrédient), marnowanie jedzenia (gaspillage alimentaire), zbiór przepisów
 * (le carnet), skanowanie lodówki, posiłek (repas).
 *
 * Tournures reprises mot pour mot des sources validées :
 *  - « Skanuj moją lodówkę » (app, featFridgeScanCta)
 *  - « Zrób zdjęcie lodówki, a Yummeal podpowie, co ugotować z tego, co masz. »
 *    (fiche Play frigo_mange, description courte)
 *  - « Przepisy policzone pod Twoją lodówkę, a nie ogólny katalog. »
 *    (app, paywallSoftSubtitle) — c'est la meilleure phrase du produit dans
 *    cette langue, elle mérite d'être sur l'accueil
 *  - « Pobierz Yummeal za darmo » — et « za darmo » ne porte JAMAIS sur autre
 *    chose que le téléchargement, ici comme en français.
 *  - « Co dziś na obiad? » (idiomatique ; « obiad » = repas principal en
 *    Pologne, plus naturel que « kolacja »)
 *
 * NON REPRIS DÉLIBÉRÉMENT : les chiffres de l'application (« -32,78 %
 * marnowania », « 67,42 € oszczędności »). Ils viennent d'un paywall, pas d'une
 * mesure publiable, et une page web est indexée et citable. On n'annonce pas au
 * marché polonais un chiffre qu'on ne pourrait pas étayer.
 *
 * ⚠️ RELECTURE NATIVE À FAIRE avant de pousser des liens sponsorisés vers ces
 * pages — même réserve que celle déjà écrite dans CUSTOM_LISTINGS_PL.md. Le
 * texte est cohérent avec l'app, ce qui n'est pas la même chose que relu.
 */
export const pl: Dictionnaire = {
  langue: {
    choisir: 'Język',
    nom: 'Polski',
  },

  nav: {
    accueil: 'Strona główna',
    fonctionnalites: 'Funkcje',
    aPropos: 'O nas',
    alternatives: 'Alternatywy',
    telecharger: 'Pobierz',
    commentCaMarche: 'Jak to działa',
    faq: 'FAQ',
  },

  cta: {
    appStore: 'Pobierz w App Store',
    googlePlay: 'Pobierz z Google Play',
  },

  accueil: {
    title: 'Yummeal – gotuj z tego, co masz w lodówce',
    // « na Androida » et PAS « na iOS i Androida » : l'application iOS n'est
    // pas distribuée dans la boutique polonaise (constat vérifié, voir
    // STORE_URLS dans src/config.ts). Annoncer iOS dans la meta description
    // serait une promesse démentie au clic — et c'est le texte que Google
    // affiche. À corriger le jour où la distribution est étendue.
    description:
      'Zrób zdjęcie lodówki, a Yummeal podpowie, co ugotować z tego, co masz — bez marnowania jedzenia. Pobierz Yummeal za darmo na Androida.',
    h1Ligne1: 'Koniec ze stresem',
    h1Ligne2: '„co dziś na obiad?”',
    accroche:
      'Zrób zdjęcie lodówki, a Yummeal podpowie, co ugotować z tego, co masz. Bez zakupów na ostatnią chwilę i bez marnowania jedzenia.',
    altHero:
      'Kobieta przygotowuje kosz ze świeżymi zakupami z Yummeal, bez marnowania jedzenia',

    atoutsTitre: 'Yummeal: wszystko, czego potrzebujesz do swoich posiłków',
    atouts: [
      {
        titre: 'Pomysł od razu, zero marnowania',
        corps:
          'Zeskanuj lodówkę: Yummeal pokaże Ci przepisy, które zrobisz z tego, co już masz, i powie, ilu składników brakuje, jeśli czegoś brakuje.',
      },
      {
        titre: 'Zdrowo, bez liczenia',
        corps:
          'Jedz dobrze, nie licząc kalorii. Yummeal prowadzi Cię do zbilansowanych posiłków dopasowanych do Twoich celów — bez zakazów i bez wyrzutów sumienia.',
      },
      {
        titre: 'Proste przepisy, dobry smak',
        corps:
          'Szybkie przepisy w mniej niż 30 minut, do zrobienia nawet jeśli nie jesteś szefem kuchni. Gotowanie znów może być przyjemnością.',
      },
      {
        titre: 'Dopasowane do Ciebie',
        corps:
          'Dieta wegetariańska, bezglutenowa, pilnowanie wagi: filtruj po diecie, alergenach i preferencjach całego domu.',
      },
    ],

    parcoursTitre: 'Jak to działa',
    parcours: [
      {
        titre: 'Skanuj moją lodówkę',
        corps:
          'Zrób zdjęcie swoich składników, a Yummeal rozpozna, co masz w domu. Listę poprawisz w dwie sekundy.',
      },
      {
        titre: 'Dopasowane przepisy',
        corps:
          'Przepisy policzone pod Twoją lodówkę i Twoje preferencje, a nie ogólny katalog.',
      },
      {
        titre: 'Ugotuj i zjedz',
        corps:
          'Idź krok po kroku, ugotuj bez kombinowania i zjedz to, co i tak leżało w lodówce.',
      },
    ],

    finalTitre: 'Gotowa zmienić swoje wieczory?',
    finalCorps:
      'Dołącz do osób, które odzyskały spokój w kuchni razem z Yummeal.',

    faqTitre: 'Częste pytania',
    faq: [
      {
        q: 'Nie mam dużo czasu na gotowanie — Yummeal naprawdę jest szybki?',
        a: 'Tak. Nasze przepisy są proste i szybkie, także przy napiętym grafiku. W mniej niż 30 minut zdrowy posiłek jest gotowy.',
      },
      {
        q: 'Czy muszę ważyć jedzenie w aplikacji?',
        a: 'Nie. Yummeal nie wymaga ani ważenia, ani liczenia kalorii. Chodzi o to, żeby odzyskać spokojną relację z jedzeniem.',
      },
      {
        q: 'Czy mogę używać Yummeal na diecie wegetariańskiej lub bezglutenowej?',
        a: 'Tak. Filtruj po diecie (wegetariańska, bezglutenowa, bez laktozy i inne), alergenach i preferencjach — Yummeal pokaże tylko pasujące przepisy.',
      },
      {
        q: 'Czy mogę dodać własne przepisy?',
        a: 'Tak. Wklej link z TikToka, Instagrama lub YouTube’a, a zapisany film zamieni się w prawdziwy przepis ze składnikami i krokami, w Twoim zbiorze przepisów.',
      },
    ],
  },

  fonctionnalites: {
    fil: 'Funkcje',
    indexTitle: 'Funkcje Yummeal – trzy mechanizmy',
    indexDescription:
      'Trzy mechanizmy Yummeal i ich granice: skanowanie lodówki, import przepisu z TikToka, szacowanie dania ze zdjęcia.',
    indexH1: 'Co robi Yummeal, mechanizm po mechanizmie',
    indexIntro:
      'Trzy funkcje, opisane razem z tym, czego NIE robią. Bez obietnic ponad to, co jest: łatwiej wtedy zdecydować, czy aplikacja jest dla Ciebie.',
    indexCollection: 'Funkcje',
    indexCta: 'Najprościej po prostu sprawdzić',
    commentCaMarche: 'Jak to działa',
    ceQueCaNeFaitPas: 'Czego to nie robi',
    limitesIntro: 'Prawdziwe granice, żebyś wiedziała, czego się spodziewać.',
    questions: 'Częste pytania',
    autres: 'Pozostałe funkcje',
  },

  pied: {
    guides: 'Jak nie marnować jedzenia',
    application: 'Aplikacja',
    cuisine: 'W kuchni',
    enSavoirPlus: 'Dowiedz się więcej',
    marque: 'Yummeal',
    droits: 'Yummeal, wszelkie prawa zastrzeżone',
    legal: 'Informacje prawne',
    confidentialite: 'Polityka prywatności',
    cgu: 'Regulamin',
    supprimerCompte: 'Usuń moje konto',
    enFrancais: 'po francusku',
  },
};
