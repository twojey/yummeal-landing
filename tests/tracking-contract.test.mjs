import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { read } from './lib/sources.mjs';

const indexHtml = read('index.html');
const main = read('src/main.tsx');
const appsFlyer = read('src/utils/appsflyerIntegration.ts');
const tracking = read('src/utils/tracking.ts');
const facebook = read('src/utils/facebookPixel.ts');
const withoutComments = (source) => source
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\/\/.*$/gm, '');

describe('contrat AppsFlyer web', () => {
  test('ne charge pas l’ancien SDK mobile avec dev key/app ID', () => {
    assert.doesNotMatch(indexHtml, /appsflyer-web-sdk|cdn-go\.appsflyer\.com\/js|cdn\.appsflyer\.com\/web-sdk/i);
    assert.doesNotMatch(withoutComments(appsFlyer), /APPSFLYER_DEV_KEY|APPSFLYER_APP_ID|initSdk|setAdditionalData|\.start\(/);
  });

  test('OneLink reste la seule attribution AppsFlyer côté site tant qu’un Web SDK ID dédié n’est pas configuré', () => {
    assert.doesNotMatch(main, /initAppsFlyer|appsflyerIntegration/);
    assert.doesNotMatch(tracking, /trackAppsFlyerEvent/);
    assert.match(read('src/utils/acquisitionLink.ts'), /yummealapp\.onelink\.me/);
  });
});

describe('déduplication Meta Pixel/CAPI', () => {
  test('le Pixel n’émet pas un PageView implicite en plus du tracker de route', () => {
    assert.doesNotMatch(facebook, /fbq\('track',\s*'PageView'\)/);
  });

  test('un clic de téléchargement produit un seul événement Meta correspondant au Lead CAPI', () => {
    const downloadClick = tracking.slice(
      tracking.indexOf('export const trackDownloadClick'),
      tracking.indexOf('export const trackConversionVariantExposed'),
    );
    assert.equal((downloadClick.match(/trackFacebookEvent\(/g) ?? []).length, 1);
    assert.match(downloadClick, /trackFacebookEvent\('Lead',[\s\S]*eventId\)/);
    assert.doesNotMatch(downloadClick, /trackFacebookEvent\('download_click'/);
  });
});

describe('unicité des handlers de CTA', () => {
  test('le bootstrap ne branche pas un second tracker DOM sur les boutons React', () => {
    assert.doesNotMatch(main, /setupAutoTracking|addTrackingToSpecificButtons|autoTrackDownloads/);
  });
});
