// Génère les photos "vrais plats" des mockups TikTok de la page /ambassadeur.
// Usage : node scripts/gen-amb-images.mjs   (clé GEMINI_API_KEY lue dans le .env Skare)
import { readFileSync, writeFileSync } from 'fs';

const env = readFileSync('C:/Users/christ/Skare/skare_app/.env', 'utf8');
const key = (env.match(/^GEMINI_API_KEY=(.+)$/m) || env.match(/^GEMINI_API_KEY_BACKUP=(.+)$/m))[1].trim();

const SHOTS = [
  {
    out: 'src/assets-amb/dish-foutou.png',
    prompt: `Candid vertical smartphone photo (9:16) taken in a real African home kitchen: a smiling young black woman proudly holding a plate up toward the camera — the plate is foutou banane (Ivorian pounded plantain dumpling) served with a rich orange palm-nut sauce (sauce graine) with meat chunks.
Aesthetic: amateur food-influencer photo, warm kitchen light, slightly imperfect framing, realistic skin, real home atmosphere, NOT a studio shoot. No text, no watermark.`,
  },
  {
    out: 'src/assets-amb/dish-burger.png',
    prompt: `Amateur vertical smartphone photo (9:16): a juicy homemade burger with melted cheddar dripping, brioche bun, on a wooden cutting board on a real kitchen counter, fries in a small bowl behind, slightly messy, warm evening kitchen light, candid "I just made this" photo, shallow depth of field, NOT professional food photography. No text, no watermark.`,
  },
  {
    out: 'src/assets-amb/dish-frigo.png',
    prompt: `Amateur vertical smartphone photo (9:16): a hand holding a phone photographiing the inside of a real open fridge full of fresh groceries — tomatoes, eggs, yogurt, vegetables, leftovers in tupperware. Honest everyday fridge, not staged, slightly mixed lighting, candid real-life photo. No text, no watermark.`,
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
  if (!res.ok) { console.error(out, JSON.stringify(data).slice(0, 600)); continue; }
  const img = (data.candidates?.[0]?.content?.parts || []).find(p => p.inlineData?.data);
  if (!img) { console.error(out, 'no image part'); continue; }
  writeFileSync(out, Buffer.from(img.inlineData.data, 'base64'));
  console.log('saved', out, img.inlineData.mimeType);
}
