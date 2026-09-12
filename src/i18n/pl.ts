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
    // « na iOS i Androida » depuis le 12/09/2026 : la Pologne a été ouverte
    // côté App Store et la fiche polonaise est réellement servie (voir
    // STORE_URLS dans src/config.ts). Avant cette date on n'annonçait QUE
    // l'Android, parce qu'un clic iOS tombait sur une 404 — et c'est ce texte
    // que Google affiche, donc une promesse démentie au clic s'y voit.
    description:
      'Zrób zdjęcie lodówki, a Yummeal podpowie, co ugotować z tego, co masz — bez marnowania jedzenia. Pobierz Yummeal za darmo na iOS i Androida.',
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

  aPropos: {
    fil: 'O nas',
    title: 'O Yummeal – kto wydaje aplikację i co ona robi',
    description:
      'Aplikacja mobilna wydawana przez YIDLA (Francja): przepisy, które zrobisz z tego, co już masz. Co robi i czego nie robi.',
    h1: 'O Yummeal',
    intro:
      'Yummeal to aplikacja mobilna na iOS i Androida, która wychodzi od tego, co już masz w domu, i podpowiada, co ugotować. Wydaje ją francuska firma YIDLA, a aplikacja jest dostępna od 2025 roku.',
    // Trois faits changent par rapport au français, et ce n'est pas une
    // traduction approximative :
    //  - PLATEFORMES : iOS ET Android depuis l'ouverture de la Pologne le
    //    12/09/2026 (voir STORE_URLS dans src/config.ts). Avant cette date on
    //    n'annonçait que l'Android, la fiche iOS polonaise n'existant pas ;
    //  - PRIX : 19,99 zł/mois et 149,99 zł/an sont les prix polonais réels,
    //    alignés Apple/Play. Traduire « 4,99 € » aurait annoncé un prix que le
    //    visiteur ne verra jamais ;
    //  - le nombre de langues de l'interface est un fait vérifiable, il reste.
    modele:
      'Pobranie jest darmowe. Pełne korzystanie działa w subskrypcji, od 19,99 zł miesięcznie, z planem rocznym za 149,99 zł. Interfejs aplikacji jest dostępny po polsku, francusku, angielsku i chińsku.',
    ceQueCaFait: 'Co robi aplikacja',
    ceQueCaNeFaitPas: 'Czego Yummeal nie robi',
    neFaitPasIntro:
      'Ta sekcja istnieje, żeby rozwiać najczęstsze nieporozumienia — w tym te, które tworzą automatyczne streszczenia.',
    confusionCorps:
      'to także nazwa restauracji w Wielkiej Brytanii i przypomina nazwy innych aplikacji kuchennych, które nie mają z nami nic wspólnego — zwłaszcza Yummly (USA) i Youmeal. Aplikacja opisana tutaj to ta wydawana przez YIDLA, opublikowana pod identyfikatorem App Store',
    confusionEtPlay: 'oraz identyfikatorem Play',
    voirAussi: 'Zobacz też',
    confusionTitre: 'Nie pomyl z innymi',
    identiteTitre: 'Dane wydawcy',
    essayer: 'Wypróbuj Yummeal',
    labels: {
      editeur: 'Wydawca',
      siren: 'SIREN (rejestr francuski)',
      siret: 'SIRET',
      tva: 'Numer VAT UE',
      greffe: 'Sąd rejestrowy',
      contact: 'Kontakt',
      appIos: 'Aplikacja iOS',
      appAndroid: 'Aplikacja Android',
    },
    fonctions: [
      {
        titre: 'Wyjść od tego, co już masz',
        corps:
          'Robisz zdjęcie wnętrza lodówki albo wpisujesz składniki. Yummeal pokazuje wtedy tylko te przepisy, które naprawdę zrobisz, i podaje, ilu składników brakuje, jeśli czegoś brakuje.',
      },
      {
        titre: 'Odzyskać przepis z filmu',
        corps:
          'Wklejasz link z TikToka, Instagrama lub YouTube’a: przepis zostaje wyciągnięty i trafia do Twojego zbioru, ze składnikami i krokami, gotowy do użycia jak pozostałe.',
      },
      {
        titre: 'Oszacować danie ze zdjęcia',
        corps:
          'Robisz zdjęcie talerza i dostajesz szacunek jego kaloryczności. To szacunek, który możesz poprawić ręcznie — nie pomiar.',
      },
      {
        titre: 'Zastąpić brakujący składnik',
        corps:
          'Kiedy brakuje składnika, aplikacja proponuje zamiennik z właściwą ilością i zaznacza przepisy, w których taka zamiana się nie sprawdzi.',
      },
    ],
    neFaitPas: [
      'Przepisy nie są tworzone przez AI. To przepisy napisane przez ludzi — zaimportowane albo zredagowane — które aplikacja sortuje i filtruje według tego, co masz w domu.',
      'Yummeal nie sprzedaje jedzenia, nic nie dowozi i nie jest platformą z niesprzedanymi paczkami: nie konkuruje z Too Good To Go.',
      'Yummeal nie zastępuje porady lekarza ani dietetyka. Pokazywane wartości odżywcze są ogólnym punktem odniesienia.',
      'Aplikacja nie łączy się z Twoją lodówką: czyta zdjęcie zrobione telefonem, niezależnie od tego, jaką masz lodówkę.',
    ],
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
