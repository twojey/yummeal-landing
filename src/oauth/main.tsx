import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import ConsentementOAuth from './ConsentementOAuth';

// Volontairement AUCUN pixel (Meta, TikTok) ni SDK d'attribution (AppsFlyer),
// contrairement à `src/main.tsx` : cette page manipule une session de compte
// et une demande d'autorisation, rien de tout cela ne doit partir chez un
// tiers. `tests/oauth-consent.test.mjs` y veille.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConsentementOAuth />
  </StrictMode>
);
