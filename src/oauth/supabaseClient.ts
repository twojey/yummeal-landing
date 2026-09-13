import { createClient } from '@supabase/supabase-js';

/**
 * Client Supabase de la page de consentement OAuth — et d'elle seule.
 *
 * La clé anon est PUBLIQUE par nature : elle est déjà servie par la page de
 * suppression de compte (`src/DeleteAccount.tsx`) et par l'application. Ce qui
 * protège les données, c'est la session de l'utilisateur, pas cette clé.
 *
 * Valeurs par défaut = projet de production. `VITE_SUPABASE_URL` et
 * `VITE_SUPABASE_ANON_KEY` (variables Netlify ou `.env.local`) les surchargent
 * pour une préproduction ou un projet local.
 */
const URL_PROJET = 'https://vqibuydjokujdqslczdu.supabase.co';
const CLE_ANON_PROJET =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxaWJ1eWRqb2t1amRxc2xjemR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMTM5MzMsImV4cCI6MjA2MTg4OTkzM30.5H-XZbkodlKf2c5x1AuMRdExqQt-rW-zoxAj_5LTf3M';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || URL_PROJET;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || CLE_ANON_PROJET;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // PKCE : le lien magique revient avec un `code` échangé dans CE navigateur
    // (le vérificateur est en localStorage). Un lien ouvert sur un autre
    // appareil ne connecte donc personne — voulu.
    flowType: 'pkce',
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // Clé dédiée : aucune collision avec une autre page du domaine.
    storageKey: 'yummeal-oauth-consent',
  },
});

export type FournisseurWeb = 'google' | 'apple';

/**
 * Connexions sociales proposées sur le web. VIDE par défaut : l'application
 * mobile utilise Apple et Google en NATIF (`signInWithIdToken`), ce qui ne
 * prouve pas que le flux web (redirection, secret client Google, Services ID
 * Apple) est configuré dans Supabase. Un bouton qui échoue est pire qu'un
 * bouton absent. Activer avec `VITE_OAUTH_WEB_PROVIDERS=google,apple` une fois
 * le flux web vérifié (procédure : docs/ASSISTANTS_ET_SIRI.md du backend).
 */
export const FOURNISSEURS_WEB: readonly FournisseurWeb[] = (
  import.meta.env.VITE_OAUTH_WEB_PROVIDERS ?? ''
)
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter((s): s is FournisseurWeb => s === 'google' || s === 'apple');
