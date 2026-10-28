import {cp,readFile,writeFile,mkdir} from 'node:fs/promises';
await import('../scripts/build.mjs');
const root=new URL('../',import.meta.url), qa=new URL('dist/qa/',root);
await mkdir(qa,{recursive:true});
await cp(new URL('tests/viewport.html',root),new URL('index.html',qa));
const config=JSON.parse(await readFile(new URL('config.json',root),'utf8'));
for(const item of config.contacts){item.phone='+99900000001';item.verified=true;item.verifiedOn='2000-01-01';}
for(const screen of config.screens)for(const item of screen.items){item.verified=true;item.verifiedOn='2000-01-01';item.url='https://example.invalid/';}
for(const scenario of ['verified','invalid','missing']){
  const dest=new URL(scenario+'/',qa);await mkdir(dest,{recursive:true});
  for(const file of ['index.html','styles.css','app.js','manifest.json','apple-touch-icon.png'])await cp(new URL(file,root),new URL(file,dest));
  if(scenario!=='missing')await writeFile(new URL('config.json',dest),JSON.stringify(scenario==='invalid'?{}:config));
}
console.log('QA-only fixtures ready at /qa/index.html. Do not activate final call/open links.');
