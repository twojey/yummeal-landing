import type { SeoRefreshEntry } from '../data/seoRefresh';

interface Props {
  entry?: SeoRefreshEntry;
}

/** Bloc visible et extractible correspondant aux opportunités Search Console. */
export default function SeoRefreshBlock({ entry }: Props) {
  if (!entry) return null;

  return (
    <>
      <section className="clay-card p-6 mb-6 border-l-4 border-[#4CAF50]" aria-labelledby="reponse-rapide">
        <h2 id="reponse-rapide" className="text-xl font-semibold mb-3">Réponse rapide</h2>
        <p className="text-gray-700">{entry.quickAnswer}</p>
      </section>

      <section className="clay-card p-6 mb-6" aria-labelledby="a-faire">
        <h2 id="a-faire" className="text-xl font-semibold mb-3">À faire maintenant</h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          {entry.actions.map((action) => <li key={action}>{action}</li>)}
        </ol>
      </section>

      <section className="mb-10" aria-labelledby="questions-frequentes">
        <h2 id="questions-frequentes" className="text-2xl font-bold mb-4">Questions fréquentes</h2>
        <dl className="space-y-4">
          {entry.faq.map((item) => (
            <div key={item.question} className="rounded-2xl bg-white/70 p-4">
              <dt className="font-semibold text-gray-900">{item.question}</dt>
              <dd className="mt-2 text-gray-700">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {entry.sources && entry.sources.length > 0 && (
        <section className="mb-10 text-sm text-gray-600" aria-labelledby="sources">
          <h2 id="sources" className="text-lg font-semibold mb-2">Sources et repères</h2>
          <ul className="list-disc pl-5 space-y-1">
            {entry.sources.map((source) => (
              <li key={source.url}>
                <a className="text-[#FF8C42] hover:underline" href={source.url} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
