import React from "react";

const PrivacyPolicy: React.FC = () => (
  <div className="max-w-2xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-4">Politique de confidentialité</h1>
    <p className="mb-4">
      Votre vie privée est importante pour nous. Cette page explique comment nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez Yummeal.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Collecte des données</h2>
    <p>
      Nous collectons uniquement les informations nécessaires au fonctionnement de l’application, telles que les ingrédients de votre frigo et vos préférences de recettes. Aucune donnée personnelle sensible n’est requise.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Utilisation des données</h2>
    <p>
      Vos données sont utilisées uniquement pour générer votre livre de recettes personnalisé et améliorer votre expérience utilisateur. Nous ne partageons pas vos données avec des tiers.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Sécurité</h2>
    <p>
      Nous mettons en œuvre des mesures de sécurité pour protéger vos informations contre tout accès non autorisé.
    </p>
    <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
    <p>
      Pour toute question concernant la confidentialité, contactez-nous à contact@yummeal.com.
    </p>
  </div>
);

export default PrivacyPolicy;
