/**
 * Test de fumée réseau — à lancer contre la production.
 *
 * Les tests de `tests/` sont statiques : ils vérifient que l'URL configurée est
 * celle qu'on croit, et qu'aucun hôte connu comme mort ne réapparaît. Ils ne
 * peuvent pas dire qu'un hôte ENCORE inconnu vient de tomber. C'est exactement
 * ce qui s'est passé avec le sunset de Deno Deploy Classic : le domaine était
 * cohérent partout, il avait simplement cessé de répondre.
 *
 * Ce script appelle les surfaces réellement critiques et échoue bruyamment.
 * Volontairement HORS du build (le build ne doit pas dépendre du réseau) :
 *
 *   npm run smoke
 *
 * À lancer après chaque déploiement, et quand une migration d'hôte est
 * annoncée.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TIMEOUT_MS = 12_000;

/** L'URL du backend est lue depuis la source unique, jamais recopiée ici. */
function backendUrl() {
  const config = fs.readFileSync(path.join(ROOT, 'src/config.ts'), 'utf-8');
  const m = config.match(/export const API_BASE_URL = '([^']+)'/);
  if (!m) throw new Error('API_BASE_URL introuvable dans src/config.ts');
  return m[1];
}

const SITE = 'https://yummeal.app';
const API = backendUrl();

const resultats = [];

async function verifier(nom, fn, { critique = true } = {}) {
  const debut = Date.now();
  try {
    const detail = await fn();
    resultats.push({ nom, ok: true, detail, ms: Date.now() - debut, critique });
  } catch (e) {
    resultats.push({
      nom,
      ok: false,
      detail: e.message,
      ms: Date.now() - debut,
      critique,
    });
  }
}

async function fetchAvecTimeout(url, options = {}) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: ac.signal, redirect: 'manual' });
  } finally {
    clearTimeout(t);
  }
}

/** Statut attendu, sinon on lève avec ce qu'on a réellement reçu. */
async function attendreStatut(url, attendus, options) {
  const r = await fetchAvecTimeout(url, options);
  const liste = Array.isArray(attendus) ? attendus : [attendus];
  if (!liste.includes(r.status)) {
    throw new Error(`${url} -> ${r.status} (attendu ${liste.join(' ou ')})`);
  }
  return r;
}

// ---------------------------------------------------------------------------
// Backend — la panne qui a cassé la suppression de compte en silence.
// ---------------------------------------------------------------------------

await verifier(`backend joignable (${new URL(API).host})`, async () => {
  const r = await attendreStatut(`${API}/health`, [200]);
  const corps = await r.json().catch(() => ({}));
  return corps.deploymentId
    ? `déploiement ${String(corps.deploymentId).slice(0, 12)}`
    : 'health 200';
});

await verifier("l'endpoint de suppression de compte répond", async () => {
  // Sans jeton, on attend un refus d'authentification — PAS une erreur DNS ni
  // un 404. Un 401/403 prouve que la route existe et que l'hôte répond ; c'est
  // précisément ce que le domaine mort ne faisait plus.
  const r = await attendreStatut(`${API}/user`, [401, 403, 400], { method: 'DELETE' });
  return `refus d'authentification attendu (${r.status})`;
});

await verifier("l'endpoint de tracking accepte une requête", async () => {
  const r = await fetchAvecTimeout(`${API}/tracking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: 'smoke_test', source: 'npm run smoke' }),
  });
  // On ne veut pas polluer les données : tout statut hors 5xx prouve que
  // l'hôte répond, ce qui est le seul point ici.
  if (r.status >= 500) throw new Error(`/tracking -> ${r.status}`);
  return `hôte répond (${r.status})`;
}, { critique: false });

// ---------------------------------------------------------------------------
// Site — le prérendu et les règles Netlify, tels que servis réellement.
// ---------------------------------------------------------------------------

await verifier('la page de suppression de compte sert son propre HTML', async () => {
  const r = await attendreStatut(`${SITE}/supprimer-mon-compte/`, [200]);
  const html = await r.text();
  const titre = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (/Cuisiner sain avec ce qu/.test(titre)) {
    throw new Error(
      "sert le HTML de l'accueil : la route n'est pas prérendue (voir staticRoutes)"
    );
  }
  if (!/Supprimer mon compte/i.test(titre)) {
    throw new Error(`title inattendu : « ${titre} »`);
  }
  return `title « ${titre} »`;
});

await verifier('une URL inexistante renvoie bien 404', async () => {
  // Le catch-all renvoyait 200 + l'accueil pour l'infini des URL : des
  // soft-404 aux yeux de Google.
  const r = await fetchAvecTimeout(`${SITE}/cette-page-nexiste-pas-${Date.now()}/`);
  if (r.status !== 404) throw new Error(`statut ${r.status} au lieu de 404`);
  return '404';
});

await verifier("l'alias anglophone redirige en 301", async () => {
  const r = await attendreStatut(`${SITE}/delete-account`, [301, 308]);
  return `${r.status} -> ${r.headers.get('location')}`;
});

await verifier("aucune sourcemap n'est servie", async () => {
  const index = await (await fetchAvecTimeout(SITE)).text();
  const js = index.match(/\/assets\/index-[^"']+\.js/)?.[0];
  if (!js) throw new Error("bundle introuvable dans le HTML de l'accueil");
  const r = await fetchAvecTimeout(`${SITE}${js}.map`);
  if (r.status === 200) throw new Error(`${js}.map est servi (code source en clair)`);
  return `${js}.map -> ${r.status}`;
});

await verifier('robots.txt et le sitemap index sont servis', async () => {
  await attendreStatut(`${SITE}/robots.txt`, [200]);
  const r = await attendreStatut(`${SITE}/sitemap-index.xml`, [200]);
  const xml = await r.text();
  const n = (xml.match(/<loc>/g) ?? []).length;
  if (n < 10) throw new Error(`sitemap index n'annonce que ${n} sitemaps`);
  return `${n} sitemaps déclarés`;
});

await verifier("le sitemap retiré n'est plus servi", async () => {
  // Il pointait vers yummeal.com, pour des pages inexistantes.
  const r = await fetchAvecTimeout(`${SITE}/sitemap-temoignages.xml`);
  if (r.status === 200) throw new Error('sitemap-temoignages.xml est encore servi');
  return String(r.status);
});

// ---------------------------------------------------------------------------
// Rapport
// ---------------------------------------------------------------------------

const largeur = Math.max(...resultats.map((r) => r.nom.length));
console.log('');
for (const r of resultats) {
  const marque = r.ok ? '✔' : r.critique ? '✖' : '!';
  console.log(
    `  ${marque} ${r.nom.padEnd(largeur)}  ${String(r.ms).padStart(5)} ms  ${r.detail}`
  );
}

const echecs = resultats.filter((r) => !r.ok);
const bloquants = echecs.filter((r) => r.critique);
console.log(
  `\n  ${resultats.length - echecs.length}/${resultats.length} vérifications passées` +
    (echecs.length ? ` — ${bloquants.length} bloquante(s)` : '')
);

if (bloquants.length) {
  console.error(
    "\n  Une vérification bloquante a échoué. Si c'est un problème d'hôte, l'URL\n" +
      '  du backend se change dans src/config.ts (source unique) et les hôtes morts\n' +
      '  se déclarent dans tests/api-urls.test.mjs.\n'
  );
  process.exit(1);
}
