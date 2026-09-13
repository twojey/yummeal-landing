import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { FOURNISSEURS_WEB, supabase } from './supabaseClient';
import type { FournisseurWeb } from './supabaseClient';
import {
  CHEMIN_CONSENTEMENT,
  destinationLisible,
  lireAuthorizationId,
  urlDeRetourSure,
  urlRetourConnexion,
} from './securite';
import { detecterLangue, libelleScope, TEXTES } from './textes';

/**
 * Page de consentement du serveur OAuth 2.1 de Supabase (connecteur MCP).
 *
 * Parcours (doc Supabase « OAuth 2.1 Server ») : l'assistant envoie la
 * personne sur `/auth/v1/oauth/authorize` ; Supabase valide la demande puis
 * redirige ici avec `?authorization_id=…`. On exige une session, on affiche le
 * client et les scopes, puis `approveAuthorization` / `denyAuthorization`
 * rendent l'URL de retour vers l'assistant.
 */

interface DetailsAutorisation {
  authorization_id: string;
  redirect_uri: string;
  client: { name: string };
  user?: { email: string };
  scope: string;
}

type Etape =
  | { nom: 'chargement' }
  | { nom: 'erreur'; message: string }
  | { nom: 'connexion' }
  | { nom: 'consentement'; details: DetailsAutorisation }
  | { nom: 'redirection' };

const NOM_FOURNISSEUR: Record<FournisseurWeb, string> = { google: 'Google', apple: 'Apple' };

const bouton =
  'w-full rounded-lg px-4 py-3 font-semibold transition-colors disabled:opacity-60';
const boutonPrincipal = `${bouton} bg-[#FF8C42] text-white hover:bg-[#f07a2c]`;
const boutonSecondaire = `${bouton} border border-gray-300 text-gray-800 hover:bg-gray-50`;
const champ =
  'w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]';

export default function ConsentementOAuth() {
  const langue = useMemo(
    () => detecterLangue(navigator.languages?.length ? navigator.languages : [navigator.language]),
    []
  );
  const t = TEXTES[langue];
  const authorizationId = useMemo(() => lireAuthorizationId(window.location.search), []);

  const [etape, setEtape] = useState<Etape>({ nom: 'chargement' });
  const [mode, setMode] = useState<'lien' | 'motDePasse'>('lien');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [occupe, setOccupe] = useState(false);
  // Une décision ne part qu'une fois : un double clic consommerait la demande
  // puis afficherait « expirée » à la personne qui vient d'accepter.
  const decisionEnCours = useRef(false);

  useEffect(() => {
    document.documentElement.lang = langue;
    document.title = t.titrePage;
  }, [langue, t.titrePage]);

  const rediriger = useCallback(
    (brute: string) => {
      const url = urlDeRetourSure(brute);
      if (!url) {
        setEtape({ nom: 'erreur', message: t.redirectionBloquee });
        return;
      }
      setEtape({ nom: 'redirection' });
      window.location.assign(url.toString());
    },
    [t]
  );

  const charger = useCallback(async () => {
    if (!authorizationId) {
      setEtape({ nom: 'erreur', message: t.lienInvalide });
      return;
    }
    if (decisionEnCours.current) return;
    try {
      // `getSession` attend la fin de l'initialisation, donc l'échange du
      // `code` d'un lien magique revenu sur cette page.
      const { data: sessionData } = await supabase.auth.getSession();

      const params = new URLSearchParams(window.location.search);
      if (params.has('error_description')) setMessage(t.lienConnexionExpire);
      if (params.has('code') || params.has('error') || params.has('error_description')) {
        window.history.replaceState(
          null,
          '',
          `${CHEMIN_CONSENTEMENT}?authorization_id=${encodeURIComponent(authorizationId)}`
        );
      }

      if (!sessionData.session) {
        setEtape({ nom: 'connexion' });
        return;
      }

      const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
      if (error || !data) {
        if (error?.status === 401 || error?.status === 403) {
          // Session locale périmée ou révoquée : on la jette et on redemande.
          await supabase.auth.signOut({ scope: 'local' });
          setEtape({ nom: 'connexion' });
          return;
        }
        setEtape({ nom: 'erreur', message: t.demandeIntrouvable });
        return;
      }
      if (!('authorization_id' in data)) {
        // Consentement déjà donné à ce client pour ces scopes.
        rediriger(data.redirect_url);
        return;
      }
      setEtape({ nom: 'consentement', details: data });
    } catch {
      setEtape({ nom: 'erreur', message: t.erreurReseau });
    }
  }, [authorizationId, rediriger, t]);

  useEffect(() => {
    void charger();
    // Le lien magique s'ouvre souvent dans un AUTRE onglet : supabase-js
    // synchronise la session entre onglets, cet onglet-ci reprend donc seul.
    const { data } = supabase.auth.onAuthStateChange((evenement) => {
      if (evenement === 'SIGNED_IN') {
        // Hors du callback : appeler supabase-js depuis le callback bloque.
        setTimeout(() => void charger(), 0);
      } else if (evenement === 'SIGNED_OUT' && !decisionEnCours.current) {
        setEtape({ nom: 'connexion' });
      }
    });
    return () => data.subscription.unsubscribe();
  }, [charger]);

  const envoyerLien = async (e: FormEvent) => {
    e.preventDefault();
    const adresse = email.trim();
    if (occupe || !authorizationId || !adresse) return;
    setOccupe(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: adresse,
        options: {
          emailRedirectTo: urlRetourConnexion(window.location.origin, authorizationId),
          // Pas de création de compte depuis le web : un compte se crée dans
          // l'application (onboarding, consentements, frigo).
          shouldCreateUser: false,
        },
      });
      // Même message que le compte existe ou non : la page ne doit pas servir
      // à tester quelles adresses ont un compte.
      setMessage(error?.status === 429 ? t.tropDeDemandes : t.lienEnvoye);
    } catch {
      setMessage(t.erreurReseau);
    } finally {
      setOccupe(false);
    }
  };

  const connexionMotDePasse = async (e: FormEvent) => {
    e.preventDefault();
    const adresse = email.trim();
    if (occupe || !adresse || !motDePasse) return;
    setOccupe(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: adresse,
        password: motDePasse,
      });
      if (error) setMessage(error.status === 429 ? t.tropDeDemandes : t.identifiantsIncorrects);
      // En cas de succès, l'événement SIGNED_IN relance le chargement.
    } catch {
      setMessage(t.erreurReseau);
    } finally {
      setMotDePasse('');
      setOccupe(false);
    }
  };

  const connexionSociale = async (fournisseur: FournisseurWeb) => {
    if (occupe || !authorizationId) return;
    setOccupe(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: fournisseur,
        options: { redirectTo: urlRetourConnexion(window.location.origin, authorizationId) },
      });
      if (error) setMessage(t.fournisseurIndisponible);
    } catch {
      setMessage(t.fournisseurIndisponible);
    } finally {
      setOccupe(false);
    }
  };

  const changerCompte = async () => {
    // `local` : ferme la session de CE navigateur seulement. `global` (défaut)
    // déconnecterait aussi l'application sur le téléphone.
    await supabase.auth.signOut({ scope: 'local' });
    setEtape({ nom: 'connexion' });
  };

  const decider = async (accepter: boolean) => {
    if (!authorizationId || decisionEnCours.current) return;
    decisionEnCours.current = true;
    setOccupe(true);
    try {
      // `skipBrowserRedirect` : on redirige nous-mêmes, APRÈS le garde-fou
      // d'URL (`urlDeRetourSure`).
      const { data, error } = accepter
        ? await supabase.auth.oauth.approveAuthorization(authorizationId, {
            skipBrowserRedirect: true,
          })
        : await supabase.auth.oauth.denyAuthorization(authorizationId, {
            skipBrowserRedirect: true,
          });
      if (error || !data?.redirect_url) {
        decisionEnCours.current = false;
        setEtape({ nom: 'erreur', message: t.demandeIntrouvable });
        return;
      }
      rediriger(data.redirect_url);
    } catch {
      decisionEnCours.current = false;
      setEtape({ nom: 'erreur', message: t.erreurReseau });
    } finally {
      setOccupe(false);
    }
  };

  let contenu: JSX.Element;
  switch (etape.nom) {
    case 'chargement':
    case 'redirection':
      contenu = (
        <h1 className="text-lg text-gray-700" aria-live="polite">
          {etape.nom === 'chargement' ? t.chargement : t.redirection}
        </h1>
      );
      break;

    case 'erreur':
      contenu = (
        <>
          <h1 className="text-xl font-semibold mb-3">{t.titreErreur}</h1>
          <p className="text-gray-700">{etape.message}</p>
        </>
      );
      break;

    case 'connexion':
      contenu = (
        <>
          <h1 className="text-xl font-semibold mb-2">{t.connexionTitre}</h1>
          <p className="text-sm text-gray-600 mb-5">{t.connexionIntro}</p>

          <div className="flex rounded-lg bg-gray-100 p-1 mb-4" role="tablist">
            {(['lien', 'motDePasse'] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => {
                  setMode(m);
                  setMessage(null);
                }}
                className={`flex-1 rounded-md py-2 text-sm font-medium ${
                  mode === m ? 'bg-white shadow text-gray-900' : 'text-gray-600'
                }`}
              >
                {m === 'lien' ? t.modeLien : t.modeMotDePasse}
              </button>
            ))}
          </div>

          <form
            onSubmit={mode === 'lien' ? envoyerLien : connexionMotDePasse}
            className="space-y-3"
          >
            <label className="block text-sm">
              <span className="text-gray-700">{t.champEmail}</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${champ} mt-1`}
              />
            </label>
            {mode === 'motDePasse' && (
              <label className="block text-sm">
                <span className="text-gray-700">{t.champMotDePasse}</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className={`${champ} mt-1`}
                />
              </label>
            )}
            <button type="submit" disabled={occupe} className={boutonPrincipal}>
              {mode === 'lien' ? t.envoyerLien : t.seConnecter}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-sm text-gray-800 bg-[#FFFAF0] rounded-lg p-3" aria-live="polite">
              {message}
            </p>
          )}

          {FOURNISSEURS_WEB.length > 0 && (
            <div className="mt-5 space-y-2">
              {FOURNISSEURS_WEB.map((f) => (
                <button
                  key={f}
                  type="button"
                  disabled={occupe}
                  onClick={() => void connexionSociale(f)}
                  className={boutonSecondaire}
                >
                  {t.continuerAvec(NOM_FOURNISSEUR[f])}
                </button>
              ))}
            </div>
          )}

          <p className="mt-5 text-xs text-gray-500">{t.aideComptesSociaux}</p>
        </>
      );
      break;

    case 'consentement': {
      const d = etape.details;
      const nom = (d.client?.name ?? '').trim().slice(0, 80) || t.applicationSansNom;
      const scopes = (d.scope ?? '').split(/\s+/).filter(Boolean);
      contenu = (
        <>
          <h1 className="text-xl font-semibold mb-1">{t.consentementTitre(nom)}</h1>
          <p className="text-xs text-gray-500 mb-4">{t.nomDeclare}</p>

          <dl className="text-sm space-y-2 mb-4">
            <div>
              <dt className="text-gray-500">{t.retourVers}</dt>
              <dd className="font-mono break-all text-gray-900">
                {destinationLisible(d.redirect_uri)}
              </dd>
            </div>
            {d.user?.email && (
              <div>
                <dt className="text-gray-500">{t.compte}</dt>
                <dd className="break-all text-gray-900">{d.user.email}</dd>
              </div>
            )}
          </dl>

          <p className="text-sm font-medium mb-1">{t.siVousAcceptez}</p>
          <ul className="list-disc pl-5 text-sm text-gray-700 mb-4 space-y-1">
            <li>{t.permissionOutils}</li>
            {scopes.map((s) => (
              <li key={s}>{libelleScope(langue, s)}</li>
            ))}
          </ul>

          <p className="text-sm bg-[#FFFAF0] border border-[#FF8C42]/40 rounded-lg p-3 mb-5">
            {t.avertissement}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              disabled={occupe}
              onClick={() => void decider(false)}
              className={boutonSecondaire}
            >
              {t.refuser}
            </button>
            <button
              type="button"
              disabled={occupe}
              onClick={() => void decider(true)}
              className={boutonPrincipal}
            >
              {t.autoriser}
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-500">{t.revocation}</p>
          <button
            type="button"
            disabled={occupe}
            onClick={() => void changerCompte()}
            className="mt-2 text-xs text-gray-600 underline"
          >
            {t.changerCompte}
          </button>
        </>
      );
      break;
    }
  }

  return (
    <main className="min-h-screen flex items-start sm:items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <img src="/images/favicon.png" alt="" width={32} height={32} className="h-8 w-8" />
          <span className="text-xl font-bold text-[#FF8C42]">Yummeal</span>
        </div>
        {contenu}
      </div>
    </main>
  );
}
