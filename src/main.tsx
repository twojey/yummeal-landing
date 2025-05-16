import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { initFacebookPixel } from './utils/facebookPixel';
import { setupAutoTracking, addTrackingToSpecificButtons } from './utils/autoTrackDownloads';

// Initialiser le pixel Facebook avant le rendu de l'application
initFacebookPixel();

// Configurer le tracking automatique des liens de téléchargement
setupAutoTracking();

// Ajouter manuellement le tracking aux boutons spécifiques
// Attendre que le DOM soit complètement chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addTrackingToSpecificButtons);
} else {
  setTimeout(addTrackingToSpecificButtons, 500); // Attendre un peu pour s'assurer que tout est chargé
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
