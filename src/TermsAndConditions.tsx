import React from "react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from './config';

const TermsAndConditions: React.FC = () => (
  <div className="max-w-2xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-2">Conditions Générales d'Utilisation</h1>
    <p className="text-sm text-gray-500 mb-6">Dernière mise à jour : 25 mai 2026</p>

    <h2 className="text-xl font-semibold mt-6 mb-2">1. Objet</h2>
    <p>
      Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») ont
      pour objet de définir les modalités d'utilisation de l'application mobile
      Yummeal (ci-après « l'Application »), éditée par la société Yidla, ainsi
      que les droits et obligations des utilisateurs. L'utilisation de
      l'Application implique l'acceptation pleine et entière des présentes CGU.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">2. Éditeur</h2>
    <ul className="list-disc pl-6 space-y-1">
      <li><strong>Raison sociale :</strong> YIDLA</li>
      <li><strong>Numéro SIREN :</strong> 898271184</li>
      <li><strong>Numéro SIRET :</strong> 89827118400019</li>
      <li><strong>TVA intracommunautaire :</strong> FR13898271184</li>
      <li><strong>Greffe :</strong> RCS Versailles</li>
      <li><strong>Contact :</strong> {CONTACT_EMAIL}</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">3. Création de compte</h2>
    <p>
      L'utilisation complète de l'Application nécessite la création d'un compte.
      L'utilisateur s'engage à fournir des informations exactes et à maintenir
      la confidentialité de ses identifiants. Il est seul responsable de
      l'activité effectuée depuis son compte.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">4. Utilisation de l'application</h2>
    <p>
      L'utilisateur s'engage à utiliser l'Application pour ses besoins
      personnels et non commerciaux, et à ne pas tenter de nuire à son
      fonctionnement, contourner ses mesures de sécurité, l'utiliser à des fins
      illégales, ou en exploiter commercialement les contenus sans autorisation.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">5. Abonnement et paiement</h2>
    <p>
      Certaines fonctionnalités sont accessibles via un abonnement payant. Les
      abonnements sont gérés par les plateformes de distribution (Apple App
      Store et Google Play Store) selon leurs propres conditions. L'utilisateur
      peut gérer ou annuler son abonnement à tout moment depuis les paramètres
      de son compte sur la plateforme correspondante.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">
      6. Suppression du compte et des données
    </h2>
    <p className="mb-2">
      L'utilisateur peut supprimer son compte et l'ensemble de ses données à
      tout moment, selon l'une des méthodes suivantes :
    </p>
    <ul className="list-disc pl-6 space-y-1 mb-2">
      <li>
        <strong>Depuis l'application :</strong> rendez-vous dans <em>Compte</em>{" "}
        → <em>Supprimer mon compte</em>, puis confirmez. Si un abonnement est
        actif, annulez-le préalablement depuis la plateforme de distribution.
      </li>
      <li>
        <strong>Depuis le site web :</strong>{" "}
        <Link to="/supprimer-mon-compte" className="text-blue-600 underline">
          page de suppression de compte
        </Link>{" "}
        — identifiez-vous puis confirmez la suppression.
      </li>
      <li>
        <strong>Par e-mail :</strong> si vous n'avez plus accès à
        l'Application, écrivez à{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Suppression%20de%20compte`}
          className="text-blue-600 underline"
        >
          {CONTACT_EMAIL}
        </a>{" "}
        depuis l'adresse de votre compte. La suppression est effectuée dans un
        délai maximum de 30 jours.
      </li>
    </ul>
    <p>
      La suppression entraîne l'effacement définitif et irréversible de
      l'ensemble des données personnelles, préférences, historique, favoris et
      paramètres associés au compte, sous réserve des obligations légales de
      conservation (notamment comptables et fiscales).
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">7. Propriété intellectuelle</h2>
    <p>
      L'ensemble des contenus de l'Application (textes, images, recettes,
      logos, marques, code source, interfaces) est la propriété exclusive de
      Yidla ou de ses partenaires, et est protégé par les lois sur la propriété
      intellectuelle. Toute reproduction ou exploitation sans autorisation
      écrite préalable est strictement interdite.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">8. Données personnelles</h2>
    <p>
      Le traitement des données personnelles est détaillé dans la{" "}
      <Link to="/confidentialite" className="text-blue-600 underline">
        Politique de Confidentialité
      </Link>
      . L'utilisateur dispose à tout moment d'un droit d'accès, de
      rectification, d'opposition, de portabilité et de suppression de ses
      données, conformément au RGPD.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">9. Responsabilité</h2>
    <p>
      Yummeal met tout en œuvre pour assurer le bon fonctionnement de
      l'Application et l'exactitude des informations qu'elle contient. Yummeal
      ne saurait être tenu responsable des dommages directs ou indirects liés
      à l'utilisation de l'Application, des interruptions de service liées à
      la maintenance ou à un cas de force majeure, ni des conséquences liées à
      la mise en pratique des recettes ou recommandations proposées, qui ne se
      substituent pas à un avis médical ou nutritionnel professionnel.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">10. Modifications</h2>
    <p>
      Yummeal se réserve le droit de modifier à tout moment les présentes CGU.
      Les utilisateurs sont informés des modifications substantielles via
      l'Application ou par e-mail. La poursuite de l'utilisation vaut
      acceptation des nouvelles CGU.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">
      11. Droit applicable et juridiction
    </h2>
    <p>
      Les présentes CGU sont soumises au droit français. À défaut de résolution
      amiable, les tribunaux français seront seuls compétents.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">12. Contact</h2>
    <p>
      Pour toute question, contactez-nous à{" "}
      <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline">
        {CONTACT_EMAIL}
      </a>
      .
    </p>
  </div>
);

export default TermsAndConditions;
