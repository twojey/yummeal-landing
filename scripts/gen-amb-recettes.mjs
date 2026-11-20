// Génère les 5 photos "recettes du quotidien" de la section arguments de /ambassadeur.
// Usage : node scripts/gen-amb-recettes.mjs
import { readFileSync, writeFileSync } from 'fs';

const env = readFileSync('C:/Users/christ/Skare/skare_app/.env', 'utf8');
const key = (env.match(/^GEMINI_API_KEY=(.+)$/m) || env.match(/^GEMINI_API_KEY_BACKUP=(.+)$/m))[1].trim();

const SHOTS = [
  {
    out: 'src/assets-amb/rec-cuisine.png',
    prompt: `Candid vertical smartphone photo: a young woman filming herself cooking in a real home kitchen — a smartphone propped up on the counter recording her while she stirs a pan of pasta, fresh ingredients scattered around, warm home light, authentic content-creator at home vibe, imperfect framing. No text, no watermark.`,
  },
  {
    out: 'src/assets-amb/rec-batch.png',
    prompt: `Amateur smartphone photo, slightly angled top-down: Sunday batch-cooking in a real kitchen — several glass meal-prep containers filled with different homemade dishes on a counter (rice, roasted vegetables, stew, salad in jars), natural daylight, honest meal prep, not staged. No text, no watermark.`,
  },
  {
    out: 'src/assets-amb/rec-plat.png',
    prompt: `Amateur smartphone photo, close-up of a creamy garlic pasta bowl garnished with parmesan shavings and basil, light steam, rustic wooden home table, fork resting beside, appetizing shot taken just before eating, warm evening light. No text, no watermark.`,
  },
  {
    out: 'src/assets-amb/rec-partage.png',
    prompt: `Candid smartphone photo: a generous traditional couscous dish in a large round platter at the center of a family dinner table, several hands reaching in to serve themselves, warm convivial home atmosphere, slightly imperfect framing, real family meal. No text, no watermark.`,
  },
  {
    out: 'src/assets-amb/rec-prep.png',
    prompt: `Amateur smartphone photo on a home kitchen counter: chopped vegetables and herbs on a wooden cutting board in the foreground, a beautiful finished plated dish just behind — the before/after of everyday cooking, natural window light, candid and honest. No text, no watermark.`,
  },
];

for (const { out, prompt } of SHOTS) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ['IMAGE'] },
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) { console.error(out, JSON.stringify(data).slice(0, 500)); continue; }
  const img = (data.candidates?.[0]?.content?.parts || []).find(p => p.inlineData?.data);
  if (!img) { console.error(out, 'no image part'); continue; }
  writeFileSync(out, Buffer.from(img.inlineData.data, 'base64'));
  console.log('saved', out);
}
