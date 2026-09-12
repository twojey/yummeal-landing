import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "./config";
import { CONTACT_EMAIL } from './config';

const SUPABASE_URL = "https://vqibuydjokujdqslczdu.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxaWJ1eWRqb2t1amRxc2xjemR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMTM5MzMsImV4cCI6MjA2MTg4OTkzM30.5H-XZbkodlKf2c5x1AuMRdExqQt-rW-zoxAj_5LTf3M";

const CONFIRMATION_KEYWORD = "SUPPRIMER";

type Step = "intro" | "auth" | "confirm" | "done";

const DeleteAccount: React.FC = () => {
  const [step, setStep] = useState<Step>("intro");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authedEmail, setAuthedEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetSensitiveState = () => {
    setPassword("");
    setAccessToken(null);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ email: email.trim(), password }),
        }
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.access_token) {
        const msg =
          data?.error_description ||
          data?.msg ||
          data?.error ||
          "Identifiants incorrects.";
        setError(msg);
        return;
      }
      setAccessToken(data.access_token as string);
      setAuthedEmail((data.user?.email as string) ?? email.trim());
      setPassword("");
      setStep("confirm");
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (isSubmitting) return;
    if (confirmText.trim().toUpperCase() !== CONFIRMATION_KEYWORD) {
      setError(`Veuillez taper exactement « ${CONFIRMATION_KEYWORD} » pour confirmer.`);
      return;
    }
    if (!accessToken) {
      setError("Session expirée. Reconnectez-vous.");
      setStep("auth");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/user`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apikey: SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        let serverMsg = "";
        try {
          const data = await res.json();
          serverMsg = data?.error || data?.message || "";
        } catch {
          // ignore
        }
        if (res.status === 401) {
          setError("Session expirée. Reconnectez-vous.");
          resetSensitiveState();
          setStep("auth");
          return;
        }
        if (res.status === 429) {
          setError(
            "Trop de tentatives. Veuillez réessayer dans une heure."
          );
          return;
        }
        setError(
          serverMsg ||
            `La suppression a échoué (code ${res.status}). Contactez ${CONTACT_EMAIL}.`
        );
        return;
      }
      // Best-effort logout to invalidate the refresh token
      fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apikey: SUPABASE_ANON_KEY,
        },
      }).catch(() => undefined);
      resetSensitiveState();
      setStep("done");
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Supprimer mon compte Yummeal</h1>
      <p className="text-sm text-gray-500 mb-8">
        Cette page vous permet de supprimer définitivement votre compte et
        l'ensemble de vos données.
      </p>

      {step === "intro" && (
        <section>
          <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4 mb-6">
            <h2 className="font-semibold mb-2">À lire avant de continuer</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
              <li>
                La suppression est <strong>définitive et irréversible</strong>.
              </li>
              <li>
                Vos recettes favorites, votre frigo, votre historique, vos
                préférences et votre compte d'authentification seront supprimés.
              </li>
              <li>
                <strong>Annulez d'abord votre abonnement</strong> (Apple App
                Store ou Google Play Store) — la facturation continue tant qu'il
                est actif.
              </li>
              <li>
                Délai d'exécution : <strong>immédiat</strong>. Certaines données
                de facturation peuvent être conservées le temps légal.
              </li>
            </ul>
          </div>

          <h2 className="font-semibold mb-2">Deux méthodes au choix</h2>
          <div className="space-y-4 text-sm">
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="font-semibold mb-1">1. Depuis l'application</p>
              <p className="text-gray-700">
                Ouvrez l'app Yummeal → <em>Compte</em> →{" "}
                <em>Supprimer mon compte</em> et confirmez.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="font-semibold mb-1">
                2. Depuis cette page (ci-dessous)
              </p>
              <p className="text-gray-700 mb-3">
                Identifiez-vous avec l'e-mail et le mot de passe de votre compte
                Yummeal. Vos identifiants ne sont jamais stockés sur le site.
              </p>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setStep("auth");
                }}
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md px-4 py-2 transition"
              >
                Continuer la suppression
              </button>
            </div>
            <p className="text-gray-600">
              Vous n'avez plus accès à votre e-mail ou à votre compte ?
              Écrivez-nous à{" "}
              <a
                className="text-blue-600 underline"
                href={`mailto:${CONTACT_EMAIL}?subject=Suppression%20de%20compte`}
              >
                {CONTACT_EMAIL}
              </a>{" "}
              — nous traiterons votre demande sous 30 jours maximum.
            </p>
          </div>
        </section>
      )}

      {step === "auth" && (
        <section>
          <h2 className="font-semibold mb-3">Étape 1/2 — Connexion</h2>
          <p className="text-sm text-gray-700 mb-4">
            Entrez l'e-mail et le mot de passe associés à votre compte Yummeal.
          </p>
          <form onSubmit={handleSignIn} className="space-y-4" autoComplete="off">
            <label className="block">
              <span className="text-sm font-medium">E-mail</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Mot de passe</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </label>
            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  resetSensitiveState();
                  setError(null);
                  setStep("intro");
                }}
                className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium"
              >
                Retour
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold text-sm"
              >
                {isSubmitting ? "Connexion…" : "Se connecter"}
              </button>
            </div>
          </form>
        </section>
      )}

      {step === "confirm" && (
        <section>
          <h2 className="font-semibold mb-3">Étape 2/2 — Confirmation</h2>
          <p className="text-sm text-gray-700 mb-2">
            Compte identifié :{" "}
            <span className="font-mono">{authedEmail ?? "—"}</span>
          </p>
          <div className="rounded-lg border border-red-300 bg-red-50 p-4 my-4">
            <p className="text-sm text-gray-900">
              Toutes vos données vont être supprimées définitivement. Cette
              action est <strong>irréversible</strong>.
            </p>
          </div>
          <label className="block mb-4">
            <span className="text-sm font-medium">
              Pour confirmer, tapez{" "}
              <code className="bg-gray-100 px-1 rounded">
                {CONFIRMATION_KEYWORD}
              </code>{" "}
              ci-dessous :
            </span>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              autoComplete="off"
              autoCapitalize="characters"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </label>
          {error && (
            <p className="text-sm text-red-600 mb-3" role="alert">
              {error}
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                resetSensitiveState();
                setConfirmText("");
                setError(null);
                setStep("intro");
              }}
              className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={
                isSubmitting ||
                confirmText.trim().toUpperCase() !== CONFIRMATION_KEYWORD
              }
              className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold text-sm"
            >
              {isSubmitting
                ? "Suppression en cours…"
                : "Supprimer définitivement mon compte"}
            </button>
          </div>
        </section>
      )}

      {step === "done" && (
        <section>
          <div className="rounded-lg border border-green-300 bg-green-50 p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Compte supprimé</h2>
            <p className="text-sm text-gray-800">
              Votre compte et vos données ont été supprimés. Vous pouvez fermer
              cette page.
            </p>
            <Link
              to="/"
              className="inline-block mt-4 text-blue-600 underline text-sm"
            >
              Retour à l'accueil
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default DeleteAccount;
