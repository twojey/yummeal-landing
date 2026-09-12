import type { Fonctionnalite } from './fonctionnalites';

/**
 * Pages produit — version polonaise.
 *
 * Mêmes `slug` que le français, volontairement. Traduire les segments d'URL
 * (`/pl/funkcje/skanowanie-lodowki`) serait meilleur de quelques pourcents
 * sur le mot-clé exact, mais imposerait une table de correspondance de
 * chemins entre langues, donc une deuxième source de vérité pour les
 * `hreflang`. Le titre, le H1 et le corps portent la charge sémantique ; le
 * slug est un signal faible. On garde l'architecture vérifiable.
 *
 * Le vocabulaire suit `yummeal_app/lib/l10n/app_pl.arb` et
 * `CUSTOM_LISTINGS_PL.md` : lodówka, przepis, składnik, marnowanie jedzenia,
 * zbiór przepisów, skanowanie lodówki.
 *
 * Les règles d'écriture du fichier français s'appliquent mot pour mot :
 * aucun taux de reconnaissance inventé, on dit ce que la fonctionnalité NE
 * fait pas, jamais de recettes présentées comme générées, et « za darmo »
 * uniquement sur le téléchargement.
 *
 * ⚠️ RELECTURE PAR UN NATIF POLONAIS À FAIRE avant d'envoyer du trafic payant
 * vers ces pages. Le texte est cohérent avec l'application et avec les fiches
 * store validées, ce qui n'est pas la même chose que relu.
 */
export const fonctionnalitesPl: Fonctionnalite[] = [
  {
    slug: 'scanner-frigo',
    title: 'Skanowanie lodówki – znajdź przepis ze zdjęcia',
    metaDescription:
      'Zrób zdjęcie lodówki: Yummeal rozpozna składniki i pokaże tylko te przepisy, które naprawdę zrobisz. Jak to działa i gdzie są granice.',
    h1: 'Skanowanie lodówki ze zdjęcia',
    intro:
      'Otwierasz aparat w aplikacji, robisz zdjęcie wnętrza lodówki i dostajesz listę rozpoznanych składników — którą możesz poprawić, zanim ruszy szukanie przepisów.',
    etapes: [
      {
        titre: 'Zdjęcie',
        corps:
          'Wystarczy jedno zdjęcie wnętrza lodówki, zrobione telefonem. Nie ma czego podłączać: aplikacja nie potrzebuje lodówki z Wi-Fi, czytnika kodów kreskowych ani karty lojalnościowej.',
      },
      {
        titre: 'Rozpoznanie, a potem poprawka',
        corps:
          'Wykryte składniki dostajesz jako listę. Ten krok jest widoczny celowo: usuwasz to, czego nie ma, dodajesz to, czego zdjęcie nie zobaczyło, i dopiero ta poprawiona lista jest podstawą. Aplikacja nie decyduje sama, co masz w domu.',
      },
      {
        titre: 'Przepisy, które naprawdę zrobisz',
        corps:
          'Na podstawie tej listy aplikacja nie wyrzuca całego katalogu: sortuje przepisy według tego, co masz, i przy każdym pokazuje, ilu składników brakuje, jeśli czegoś brakuje. Przepis wymagający trzech zakupów nie stoi na równi z takim, który zrobisz od razu.',
      },
      {
        titre: 'Zamienniki',
        corps:
          'Kiedy brakuje składnika, aplikacja proponuje zamiennik wraz z ilością, zamiast odrzucać przepis. Często to właśnie decyduje o różnicy między „nie ma z czego gotować” a gotowym posiłkiem.',
      },
    ],
    limites: [
      'Szafka to nie lodówka: sól, olej, przyprawy i podstawowe dodatki są domyślnie uznawane za dostępne, więc przepis może być „do zrobienia”, choć brakuje Ci właśnie takiej podstawy.',
      'To, co jest zapakowane, ułożone jedno na drugim albo na dnie szuflady, może nie zostać zauważone. Dokładnie dlatego wykrytą listę można poprawić przed szukaniem.',
      'Aplikacja nie ocenia świeżości ani tego, czy coś jest jeszcze jadalne. Na pytania o daty i przechowywanie odpowiadają nasze poradniki, nie zdjęcie.',
    ],
    faq: [
      {
        question: 'Czy potrzebuję lodówki z Wi-Fi?',
        reponse:
          'Nie. Zdjęcie robisz telefonem, niezależnie od tego, jaką masz lodówkę. Żadnego parowania urządzeń, żadnych sieci partnerskich.',
      },
      {
        question: 'Czy muszę sfotografować wszystko naraz?',
        reponse:
          'Nie. Listę możesz uzupełnić ręcznie po zdjęciu albo wpisać składniki bez robienia zdjęcia.',
      },
      {
        question: 'Czy proponowane przepisy powstają automatycznie?',
        reponse:
          'Nie. Przepisy piszą ludzie. Aplikacja je sortuje i filtruje według tego, co naprawdę masz w domu.',
      },
    ],
    ctaTitle: 'Sprawdź na swojej lodówce',
    ctaText:
      'Jedno zdjęcie, lista poprawiona w dwie sekundy i przepisy, które ugotujesz dziś wieczorem.',
  },
  {
    slug: 'import-recette-tiktok',
    title: 'Import przepisów z TikToka i Instagrama',
    metaDescription:
      'Wklej link z TikToka, Instagrama lub YouTube’a: Yummeal wyciągnie składniki i kroki. Jak to działa i gdzie są granice.',
    h1: 'Import przepisu z TikToka lub Instagrama',
    intro:
      'Zapisujesz przepisy w formie filmów i nigdy ich nie gotujesz, bo trzeba by przeglądać film od nowa, żeby znaleźć ilości. Import zamienia link w uporządkowany przepis, ze składnikami i krokami.',
    etapes: [
      {
        titre: 'Link',
        corps:
          'Wklejasz adres filmu z TikToka, posta lub reelsa z Instagrama albo filmu z YouTube’a. Nie ma nic do przepisywania.',
      },
      {
        titre: 'Wyciąganie treści',
        corps:
          'Opis i tekst dołączone do filmu są analizowane, żeby wyciągnąć z nich listę składników z ilościami i kolejność kroków. Przepis staje się wtedy taki jak inne: czytelny, edytowalny i brany pod uwagę przy szukaniu po składnikach.',
      },
      {
        titre: 'Sprawdzenie',
        corps:
          'Zaimportowany przepis przechodzi weryfikację, zanim trafi do zbioru, a wynik dostajesz do wglądu, żeby poprawić ilość albo krok. Żadne wyciąganie treści nie jest doskonałe: zatwierdzasz Ty.',
      },
      {
        titre: 'Zbiór przepisów',
        corps:
          'Po zaimportowaniu przepis trafia do Twoich przepisów i wchodzi do tego samego rachunku co pozostałe: jeśli masz jego składniki, zostanie Ci zaproponowany.',
      },
    ],
    limites: [
      'Wyciąganie treści opiera się na tekście opublikowanym razem z filmem. Film, w którym przepis jest tylko wypowiedziany, bez opisu i bez tekstu na ekranie, da ubogi wynik — trzeba będzie go uzupełnić ręcznie.',
      'W postach w mediach społecznościowych ilości często się nie pojawiają. Wtedy import to zgłasza, zamiast wymyślać liczbę.',
      'Niektóre platformy blokują dostęp do treści prywatnych lub usuniętych: linku, który nie otwiera się publicznie, nie da się zaimportować.',
    ],
    faq: [
      {
        question: 'Czy działa z Instagramem i YouTube’em?',
        reponse:
          'Tak, poza TikTokiem. Zasada jest ta sama: publiczny link, którego tekst zostaje przeanalizowany.',
      },
      {
        question: 'Czy zaimportowany przepis można edytować?',
        reponse:
          'Tak. Składniki, ilości i kroki można zmienić po imporcie — i warto to zrobić, gdy pierwotny post był nieprecyzyjny.',
      },
      {
        question: 'Co się stanie, jeśli film nie podaje ilości?',
        reponse:
          'Import Ci to zgłosi, zamiast zapełniać luki. Uzupełniasz brakujące ilości raz, a potem przepis jest gotowy do użycia.',
      },
    ],
    ctaTitle: 'Opróżnij zapisane przepisy',
    ctaText:
      'Wklej link, dostań uporządkowany przepis i wreszcie ugotuj to, co zapisałaś.',
  },
  {
    slug: 'photo-de-plat',
    title: 'Szacowanie kalorii dania ze zdjęcia',
    metaDescription:
      'Zrób zdjęcie talerza, żeby oszacować jego kaloryczność — z możliwością ręcznej poprawki. Ile to szacowanie jest warte, a ile nie.',
    h1: 'Szacowanie dania ze zdjęcia',
    intro:
      'Robisz zdjęcie talerza i dostajesz szacunek tego, co się na nim znajduje. Ważne słowo to szacunek: wynik można zmienić i właśnie tak należy go czytać.',
    etapes: [
      {
        titre: 'Zdjęcie dania',
        corps:
          'Wystarczy zdjęcie talerza. Analiza rozpoznaje widoczne produkty i proponuje szacunkowe porcje oraz kaloryczność.',
      },
      {
        titre: 'Poprawka',
        corps:
          'Szacunek dostajesz do edycji: zmieniasz porcję, poprawiasz źle rozpoznany produkt, usuwasz to, czego tam nie ma. Liczy się Twoja poprawka, nie pierwsza propozycja.',
      },
      {
        titre: 'Zapis w dniu',
        corps:
          'Poprawione danie trafia do Twojego dnia. Sens nie polega na dokładności co do grama, ale na utrzymaniu rzędu wielkości bez wpisywania każdego składnika z ręki.',
      },
    ],
    limites: [
      'Zdjęcie nie pokazuje ani tłuszczu użytego do smażenia, ani tego, co jest ukryte pod powierzchnią, ani rzeczywistej wagi porcji. Różnica wobec rzeczywistości może być duża, w obie strony.',
      'To nie jest narzędzie medyczne ani dietetyczne. Liczby są ogólnym punktem odniesienia, nie zaleceniem, i nie zastępują opinii specjalisty.',
      'Dla dania, które gotujesz z przepisu w aplikacji, rachunek wychodzi z prawdziwych składników — to zawsze pewniejsze niż zdjęcie.',
    ],
    faq: [
      {
        question: 'Czy szacowanie jest dokładne?',
        reponse:
          'To szacunek, nie pomiar. Daje rząd wielkości przydatny do śledzenia tendencji i można go poprawić w chwili, gdy się myli.',
      },
      {
        question: 'Czy da się poprawić wynik?',
        reponse:
          'Tak, i tak to zostało zaprojektowane: produkty, porcje i wartości można edytować po analizie.',
      },
      {
        question: 'Czy trzeba fotografować każdy posiłek?',
        reponse:
          'Nie. Zdjęcie przydaje się, gdy nie gotowałaś sama. Dla dania z przepisu w aplikacji rachunek wychodzi ze składników.',
      },
    ],
    ctaTitle: 'Jeden posiłek, jedno zdjęcie',
    ctaText:
      'Trzymaj rząd wielkości tego, co jesz, bez wpisywania wszystkiego z ręki.',
  },
];
