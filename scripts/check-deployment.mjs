// Read-only live acceptance gate. Never activates a tel: link or sends a profile.
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
if(!process.argv[2])throw new Error('Usage: node scripts/check-deployment.mjs https://your-permanent-host');
const base=new URL(process.argv[2]);
if(base.protocol!=='https:' || base.username || base.password || base.search || base.hash || base.pathname!=='/')throw new Error('Supply the permanent HTTPS origin only.');
const root=new URL('../dist/',import.meta.url),hash=b=>createHash('sha256').update(b).digest('hex');
for(const file of ['index.html','app.js','styles.css','config.json','manifest.json','robots.txt','apple-touch-icon.png','icon-180x180.png','icon-192x192.png','icon-512x512.png']){
  const url=new URL(file==='index.html' ? './' : file,base);
  const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(15000)});
  if(!response.ok || response.url!==url.href)throw new Error('Unexpected status or redirect: '+file);
  if(hash(Buffer.from(await response.arrayBuffer()))!==hash(await readFile(new URL(file,root))))throw new Error('Live file differs from this reviewed build: '+file);
  for(const [name,value] of [['cache-control','no-store'],['x-robots-tag','noindex'],['referrer-policy','no-referrer'],['x-content-type-options','nosniff'],['x-frame-options','DENY'],['content-security-policy',"script-src 'self'"]])if(!(response.headers.get(name)||'').includes(value))throw new Error('Missing privacy header '+name+' on '+file);
}
for(const file of ['archive/index.original.html','tests/viewport.html','qa/index.html','docs/CONFIGURATION.md','private/ma-phone.private.json','.git/config','.env']){
  const response=await fetch(new URL(file,base),{signal:AbortSignal.timeout(15000)});
  if(response.status!==404)throw new Error('Excluded path must return 404: '+file);
}
console.log('Live HTTPS build bytes, blank config, privacy headers and excluded-path 404s verified. No calls made. Device installation is still a separate check.');
