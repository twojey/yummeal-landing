/**
 * Textes de la page de consentement OAuth.
 *
 * Hors du dictionnaire du site (`src/i18n/`) : cette page n'est ni prérendue ni
 * indexée, elle n'a pas de `hreflang`, et la personne qui y arrive vient d'un
 * assistant configuré dans n'importe quelle langue. On suit donc la langue du
 * navigateur, avec l'anglais en repli.
 *
 * ⚠️ Le polonais n'a pas été relu par un natif (même réserve que les pages
 * polonaises du site).
 */

export type LangueConsentement = 'fr' | 'en' | 'pl';

export interface TextesConsentement {
  titrePage: string;
  chargement: string;
  titreErreur: string;
  lienInvalide: string;
  demandeIntrouvable: string;
  erreurReseau: string;
  redirectionBloquee: string;
  connexionTitre: string;
  connexionIntro: string;
  modeLien: string;
  modeMotDePasse: string;
  champEmail: string;
  champMotDePasse: string;
  envoyerLien: string;
  lienEnvoye: string;
  lienConnexionExpire: string;
  seConnecter: string;
  identifiantsIncorrects: string;
  tropDeDemandes: string;
  continuerAvec: (fournisseur: string) => string;
  fournisseurIndisponible: string;
  aideComptesSociaux: string;
  consentementTitre: (application: string) => string;
  applicationSansNom: string;
  nomDeclare: string;
  retourVers: string;
  compte: string;
  siVousAcceptez: string;
  permissionOutils: string;
  avertissement: string;
  autoriser: string;
  refuser: string;
  revocation: string;
  changerCompte: string;
  redirection: string;
  scopes: Record<string, string>;
}

const fr: TextesConsentement = {
  titrePage: 'Yummeal — autoriser un assistant',
  chargement: 'Chargement…',
  titreErreur: 'Autorisation impossible',
  lienInvalide:
    "Ce lien d'autorisation est incomplet. Relancez la connexion du compte Yummeal depuis l'assistant (ChatGPT, Claude…).",
  demandeIntrouvable:
    "Cette demande d'autorisation a expiré ou a déjà été traitée. Relancez la connexion depuis l'assistant.",
  erreurReseau:
    'Impossible de joindre le serveur. Vérifiez votre connexion puis rechargez la page.',
  redirectionBloquee:
    "L'adresse de retour de cette application n'est pas sûre : la redirection a été bloquée.",
  connexionTitre: 'Connectez-vous à Yummeal',
  connexionIntro:
    "Un assistant demande l'accès à votre compte Yummeal. Identifiez-vous d'abord : vous pourrez ensuite accepter ou refuser.",
  modeLien: 'Lien par e-mail',
  modeMotDePasse: 'Mot de passe',
  champEmail: 'Adresse e-mail du compte',
  champMotDePasse: 'Mot de passe',
  envoyerLien: 'Recevoir un lien de connexion',
  lienEnvoye:
    'Si un compte Yummeal existe pour cette adresse, un e-mail de connexion vient de partir. Ouvrez le lien dans ce même navigateur : cette page reprendra automatiquement.',
  lienConnexionExpire:
    'Ce lien de connexion a expiré ou a déjà servi. Demandez-en un nouveau.',
  seConnecter: 'Se connecter',
  identifiantsIncorrects: 'Adresse e-mail ou mot de passe incorrect.',
  tropDeDemandes: 'Trop de tentatives. Patientez quelques minutes avant de réessayer.',
  continuerAvec: (f) => `Continuer avec ${f}`,
  fournisseurIndisponible:
    "Cette méthode de connexion n'est pas disponible pour le moment. Utilisez le lien par e-mail.",
  aideComptesSociaux:
    "Compte créé avec Apple ou Google dans l'application ? Demandez un lien par e-mail à l'adresse de ce compte. Si vous avez masqué votre adresse avec Apple, le lien risque de ne pas arriver : cette connexion n'est pas encore possible pour ces comptes.",
  consentementTitre: (a) => `${a} demande l'accès à votre compte Yummeal`,
  applicationSansNom: 'Une application',
  nomDeclare:
    "Ce nom est déclaré par l'application elle-même. Vérifiez l'adresse de retour ci-dessous.",
  retourVers: 'Adresse de retour',
  compte: 'Compte Yummeal',
  siVousAcceptez: 'Si vous acceptez, cette application pourra :',
  permissionOutils: 'utiliser les outils Yummeal en votre nom depuis la conversation ;',
  avertissement:
    "N'acceptez que si vous venez vous-même de lancer cette connexion depuis ChatGPT, Claude ou un autre assistant.",
  autoriser: 'Autoriser',
  refuser: 'Refuser',
  revocation:
    "Pour retirer cet accès, supprimez le connecteur Yummeal dans les réglages de l'assistant.",
  changerCompte: 'Changer de compte',
  redirection: "Retour vers l'application…",
  scopes: {
    email: 'voir votre adresse e-mail',
    profile: 'voir votre nom et votre photo de profil',
    phone: 'voir votre numéro de téléphone',
    openid: 'confirmer votre identité',
    offline_access: "garder l'accès sans vous redemander votre accord à chaque session",
  },
};

const en: TextesConsentement = {
  titrePage: 'Yummeal — authorize an assistant',
  chargement: 'Loading…',
  titreErreur: 'Authorization failed',
  lienInvalide:
    'This authorization link is incomplete. Start connecting your Yummeal account again from the assistant (ChatGPT, Claude…).',
  demandeIntrouvable:
    'This authorization request has expired or was already handled. Start the connection again from the assistant.',
  erreurReseau: 'Cannot reach the server. Check your connection and reload the page.',
  redirectionBloquee:
    "This application's return address is not safe: the redirect was blocked.",
  connexionTitre: 'Sign in to Yummeal',
  connexionIntro:
    'An assistant is asking to access your Yummeal account. Sign in first: you will then be able to accept or decline.',
  modeLien: 'Email link',
  modeMotDePasse: 'Password',
  champEmail: 'Account email address',
  champMotDePasse: 'Password',
  envoyerLien: 'Email me a sign-in link',
  lienEnvoye:
    'If a Yummeal account exists for this address, a sign-in email is on its way. Open the link in this same browser: this page will resume automatically.',
  lienConnexionExpire: 'This sign-in link has expired or was already used. Request a new one.',
  seConnecter: 'Sign in',
  identifiantsIncorrects: 'Incorrect email address or password.',
  tropDeDemandes: 'Too many attempts. Please wait a few minutes before trying again.',
  continuerAvec: (f) => `Continue with ${f}`,
  fournisseurIndisponible:
    'This sign-in method is not available right now. Use the email link instead.',
  aideComptesSociaux:
    'Created your account with Apple or Google in the app? Request an email link to that account’s address. If you hid your email with Apple, the link may not arrive: this sign-in is not yet possible for those accounts.',
  consentementTitre: (a) => `${a} wants to access your Yummeal account`,
  applicationSansNom: 'An application',
  nomDeclare: 'This name is declared by the application itself. Check the return address below.',
  retourVers: 'Return address',
  compte: 'Yummeal account',
  siVousAcceptez: 'If you accept, this application will be able to:',
  permissionOutils: 'use Yummeal tools on your behalf from the conversation;',
  avertissement:
    'Only accept if you just started this connection yourself from ChatGPT, Claude or another assistant.',
  autoriser: 'Authorize',
  refuser: 'Decline',
  revocation: "To remove this access, delete the Yummeal connector in the assistant's settings.",
  changerCompte: 'Use another account',
  redirection: 'Returning to the application…',
  scopes: {
    email: 'see your email address',
    profile: 'see your name and profile picture',
    phone: 'see your phone number',
    openid: 'confirm your identity',
    offline_access: 'keep access without asking for your consent every session',
  },
};

const pl: TextesConsentement = {
  titrePage: 'Yummeal — autoryzacja asystenta',
  chargement: 'Ładowanie…',
  titreErreur: 'Autoryzacja nie powiodła się',
  lienInvalide:
    'Ten link autoryzacyjny jest niekompletny. Uruchom ponownie łączenie konta Yummeal w asystencie (ChatGPT, Claude…).',
  demandeIntrouvable:
    'Ta prośba o autoryzację wygasła lub została już obsłużona. Uruchom łączenie ponownie w asystencie.',
  erreurReseau: 'Nie można połączyć się z serwerem. Sprawdź połączenie i odśwież stronę.',
  redirectionBloquee:
    'Adres powrotny tej aplikacji nie jest bezpieczny: przekierowanie zostało zablokowane.',
  connexionTitre: 'Zaloguj się do Yummeal',
  connexionIntro:
    'Asystent prosi o dostęp do Twojego konta Yummeal. Najpierw się zaloguj — potem możesz się zgodzić lub odmówić.',
  modeLien: 'Link e-mail',
  modeMotDePasse: 'Hasło',
  champEmail: 'Adres e-mail konta',
  champMotDePasse: 'Hasło',
  envoyerLien: 'Wyślij link do logowania',
  lienEnvoye:
    'Jeśli dla tego adresu istnieje konto Yummeal, właśnie wysłaliśmy e-mail z linkiem. Otwórz go w tej samej przeglądarce — ta strona wznowi się automatycznie.',
  lienConnexionExpire: 'Ten link do logowania wygasł lub został już użyty. Poproś o nowy.',
  seConnecter: 'Zaloguj się',
  identifiantsIncorrects: 'Nieprawidłowy adres e-mail lub hasło.',
  tropDeDemandes: 'Zbyt wiele prób. Odczekaj kilka minut i spróbuj ponownie.',
  continuerAvec: (f) => `Kontynuuj z ${f}`,
  fournisseurIndisponible: 'Ta metoda logowania jest chwilowo niedostępna. Użyj linku e-mail.',
  aideComptesSociaux:
    'Konto założone w aplikacji przez Apple lub Google? Poproś o link e-mail na adres tego konta. Jeśli ukryłeś adres e-mail w Apple, link może nie dotrzeć — dla takich kont to logowanie nie jest jeszcze możliwe.',
  consentementTitre: (a) => `${a} prosi o dostęp do Twojego konta Yummeal`,
  applicationSansNom: 'Aplikacja',
  nomDeclare: 'Tę nazwę podaje sama aplikacja. Sprawdź adres powrotny poniżej.',
  retourVers: 'Adres powrotny',
  compte: 'Konto Yummeal',
  siVousAcceptez: 'Jeśli się zgodzisz, ta aplikacja będzie mogła:',
  permissionOutils: 'korzystać w Twoim imieniu z narzędzi Yummeal w rozmowie;',
  avertissement:
    'Zgódź się tylko wtedy, gdy to Ty przed chwilą rozpocząłeś łączenie w ChatGPT, Claude lub innym asystencie.',
  autoriser: 'Zezwól',
  refuser: 'Odmów',
  revocation: 'Aby cofnąć dostęp, usuń łącznik Yummeal w ustawieniach asystenta.',
  changerCompte: 'Zmień konto',
  redirection: 'Powrót do aplikacji…',
  scopes: {
    email: 'widzieć Twój adres e-mail',
    profile: 'widzieć Twoje imię i zdjęcie profilowe',
    phone: 'widzieć Twój numer telefonu',
    openid: 'potwierdzić Twoją tożsamość',
    offline_access: 'zachować dostęp bez pytania o zgodę przy każdej sesji',
  },
};

export const TEXTES: Record<LangueConsentement, TextesConsentement> = { fr, en, pl };

/** Première langue du navigateur prise en charge ; anglais sinon. */
export function detecterLangue(langues: readonly string[]): LangueConsentement {
  for (const langue of langues) {
    const base = langue.toLowerCase().slice(0, 2);
    if (base === 'fr' || base === 'pl' || base === 'en') return base;
  }
  return 'en';
}

/** Libellé humain d'un scope OAuth ; le scope brut s'il est inconnu. */
export function libelleScope(langue: LangueConsentement, scope: string): string {
  return TEXTES[langue].scopes[scope] ?? scope;
}
