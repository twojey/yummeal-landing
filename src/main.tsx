import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { initFacebookPixel } from './utils/facebookPixel';
import { initTikTokPixel } from './utils/tiktokPixel';
import { getAnonymousId } from './utils/anonymousId';

import { captureAcquisition } from './utils/acquisitionLink';

try { captureAcquisition(window.location.search, window.sessionStorage); } catch { /* Storage may be blocked. */ }

// Initialiser l'identifiant anonyme persistant
const anonId = getAnonymousId();
console.log('[INIT] Identifiant anonyme initialisé:', anonId);

// Initialiser les pixels avant le rendu de l'application
initFacebookPixel();
initTikTokPixel();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
