const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
test('normal build removes QA and private files and publishes a blank template with privacy headers',()=>{
  fs.mkdirSync(path.join(root,'dist/qa'),{recursive:true});fs.writeFileSync(path.join(root,'dist/qa/should-not-publish.txt'),'test');
  execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root});
  assert.deepEqual(fs.readdirSync(path.join(root,'dist')).sort(),['_headers','app.js','apple-touch-icon.png','config.json','icon-180x180.png','icon-192x192.png','icon-512x512.png','index.html','manifest.json','robots.txt','styles.css'].sort());
  const config=JSON.parse(fs.readFileSync(path.join(root,'dist/config.json')));
  for(const item of [...config.contacts,...config.screens.flatMap(s=>s.items)]){assert.equal(item.verified,false);assert.equal(item.phone??null,null);assert.equal(item.url??null,null);assert.equal(item.photo,null);}
  const headers=fs.readFileSync(path.join(root,'dist/_headers'),'utf8');
  for(const expected of ['Cache-Control: no-store','X-Robots-Tag: noindex','Referrer-Policy: no-referrer',"script-src 'self'","connect-src 'self'","frame-ancestors 'none'"])assert.ok(headers.includes(expected));
});
test('public template containing a phone number is rejected before output is built',()=>{
  const temporary=fs.mkdtempSync(path.join(require('node:os').tmpdir(),'ma-publication-'));
  try{
    fs.mkdirSync(path.join(temporary,'scripts'));
    for(const file of ['app.js','scripts/check-public.mjs'])fs.copyFileSync(path.join(root,file),path.join(temporary,file));
    const config=JSON.parse(fs.readFileSync(path.join(root,'config.json')));config.contacts[0].phone='+99900000001';fs.writeFileSync(path.join(temporary,'config.json'),JSON.stringify(config));
    assert.throws(()=>execFileSync(process.execPath,['scripts/check-public.mjs'],{cwd:temporary,stdio:'pipe'}));
  }finally{fs.rmSync(temporary,{recursive:true,force:true});}
});
