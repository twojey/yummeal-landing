import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/utils/acquisitionLink.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const {captureAcquisition, buildAcquisitionLink, withWebsiteAttribution} = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const storage = () => { const map = new Map(); return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v)}; };
test('first tagged arrival survives navigation and expires after seven days',()=>{
  const s=storage();
  captureAcquisition('?utm_medium=cpc&gclid=first&email=private',s,100);
  assert.equal(captureAcquisition('?utm_medium=social',s,200).get('gclid'),'first');
  assert.equal(captureAcquisition('',s,300).has('email'),false);
  assert.equal(captureAcquisition('?utm_medium=social',s,8*86400000).get('utm_medium'),'social');
});
test('paid, organic and affiliate signals survive both store destinations',()=>{
  for (const platform of ['apple','google']) for (const query of ['utm_medium=cpc&gclid=x','utm_medium=social','pid=referral&code=ABCDEF','pid=creator_partners&deep_link_sub1=CHEFCODE']) {
    const evidence=new URLSearchParams(query);
    const link=new URL(buildAcquisitionLink('https://store.example/app',platform,evidence));
    assert.equal(link.hostname,'yummealapp.onelink.me');
    for(const [key,value] of evidence) assert.equal(link.searchParams.get(key),value);
    const scheme=new URL(link.searchParams.get('af_dp'));
    if(evidence.has('code') || evidence.has('deep_link_sub1')) {
      assert.equal(link.searchParams.get('deep_link_value'),'invite');
      assert.equal(scheme.searchParams.get('af_sub1'),link.searchParams.get('deep_link_sub1'));
    }
    assert.equal(link.searchParams.get(platform==='apple'?'af_ios_url':'af_android_url'),'https://store.example/app');
  }
});
test('untagged localized store URLs remain intact',()=>{
  assert.equal(buildAcquisitionLink('https://apps.apple.com/fr/app/x','apple',new URLSearchParams()),'https://apps.apple.com/fr/app/x');
});
test('direct visits receive a stable website attribution context at click time',()=>{
  const evidence=withWebsiteAttribution(new URLSearchParams(),'alternatives_jow_download_buttons');
  const link=new URL(buildAcquisitionLink('https://store.example/app','apple',evidence));
  assert.equal(link.searchParams.get('pid'),'website');
  assert.equal(link.searchParams.get('c'),'alternatives_jow_download_buttons');
  assert.equal(link.searchParams.get('af_ios_url'),'https://store.example/app');
});
test('blocked and corrupt storage still permit immediate attribution',()=>{
  for (const s of [{getItem:()=>'{',setItem:()=>{}},{getItem:()=>{throw Error();},setItem:()=>{throw Error();}}]) {
    assert.equal(captureAcquisition('?code=CHEFCODE',s).get('code'),'CHEFCODE');
  }
});
