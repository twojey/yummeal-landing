import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { initFacebookPixel } from './utils/facebookPixel';
import { setupAutoTracking } from './utils/autoTrackDownloads';

// Initialiser le pixel Facebook avant le rendu de l'application
initFacebookPixel();

// Configurer le tracking automatique des liens de téléchargement
setupAutoTracking();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
