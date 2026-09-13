/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Surcharge du projet Supabase (page de consentement OAuth). */
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  /** Connexions sociales web activées : « google,apple ». Vide par défaut. */
  readonly VITE_OAUTH_WEB_PROVIDERS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
