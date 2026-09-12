import { CONTENT_REVIEWED_DATE } from '../lib/schema';

/**
 * Mention éditoriale des pages qui touchent à la sécurité alimentaire.
 *
 * Ces onze pages (silos `/sante` et `/faq`) répondent à des questions du type
 * « peut-on encore manger ceci », « combien de temps ça se conserve »,
 * « comment reconnaître une viande avariée ». Elles donnaient des conseils de
 * consommation **sans auteur, sans date de revue et sans source** — ce qui
 * n'est pas un problème de référencement mais de responsabilité : un lecteur
 * qui suit un conseil faux sur la conservation d'un aliment prend un risque
 * réel.
 *
 * Ce que cette mention fait, et ne fait pas :
 *  - elle nomme l'éditeur et la date de revue, pour qu'on sache qui parle et
 *    quand ;
 *  - elle renvoie aux autorités compétentes **par leur nom**, sans fabriquer
 *    de lien profond vers un document précis. Citer une source qu'on n'a pas
 *    vérifiée serait pire que ne pas en citer ;
 *  - elle dit explicitement que ce n'est pas un avis médical, et que le doute
 *    doit se trancher en faveur de la prudence.
 *
 * Elle est volontairement placée en HAUT de page, avant le contenu : une
 * réserve lue après le conseil ne sert à rien.
 */
export default function MentionYmyl() {
  const dateFr = new Date(CONTENT_REVIEWED_DATE).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <aside className="mb-8 border-l-4 border-[#FF8C42] bg-white/70 px-5 py-4 text-sm text-gray-700">
      <p className="mb-2">
        <strong>Sécurité alimentaire — à lire avant.</strong> Cette page est
        rédigée et revue par l’équipe Yummeal (YIDLA), dernière revue le{' '}
        {dateFr}. Elle donne des repères généraux, pas un avis médical ni
        diététique.
      </p>
      <p className="mb-2">
        Pour les règles officielles de conservation et d’étiquetage en France,
        les références sont l’<strong>ANSES</strong> (Agence nationale de
        sécurité sanitaire de l’alimentation) et la{' '}
        <strong>DGCCRF</strong> (Direction générale de la concurrence, de la
        consommation et de la répression des fraudes).
      </p>
      <p className="mb-0">
        <strong>En cas de doute, ne consommez pas.</strong> Un aliment jeté
        coûte moins cher qu’une intoxication — et l’anti-gaspillage n’a jamais
        consisté à prendre des risques.
      </p>
    </aside>
  );
}
