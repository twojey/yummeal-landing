# Yummeal Website

Ce site web est la page de présentation de l'application mobile Yummeal.

## Configuration requise

- Node.js (version recommandée : 18.x)
- npm (version recommandée : 9.x)

## Installation

1. Clonez le repository :
```bash
git clone [URL_DU_REPO]
```

2. Installez les dépendances :
```bash
npm install
```

3. Ajoutez les images nécessaires dans le dossier `public/images` :
- `yummeal_logo.png` (Logo principal)
- `yummeal-canard.png` (Image de témoignage)
- `Apple_logo_black.svg` (Logo App Store)
- `playstore.svg` (Logo Google Play)

## Démarrage du serveur de développement

```bash
npm run dev
```

Le site sera accessible à l'adresse : http://localhost:5173

## Structure du projet

- `/src` : Code source de l'application
  - `App.tsx` : Composant principal
  - `components/` : Composants réutilisables
  - `utils/` : Fonctions utilitaires
- `/public` : Assets statiques
  - `images/` : Images du site
- `/styles` : Styles CSS/Tailwind

## Technologies utilisées

- React
- TypeScript
- Tailwind CSS
- Vite
- Framer Motion (pour les animations)
