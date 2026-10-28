// Publication gate: no personal destinations or media in the public tree.
import {readFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=fileURLToPath(new URL('../',import.meta.url));
let tracked=[];
try{tracked=execFileSync('git',['ls-files','-z'],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).split('\0');}catch(_){/* Sanitised source exports may have no Git metadata. */}
if(tracked.some(path=>/(^|\/)(?:private|\.env[^/]*|\.netlify)(?:\/|$)|\.private\.json$/.test(path)))throw new Error('A private/local file is tracked. Remove it from the public tree before publishing.');
const config=JSON.parse(await readFile(root+'config.json','utf8'));
const {validateProfile}=await import('../app.js').then(m=>m.default);
validateProfile(config);
for(const item of [...config.contacts,...config.screens.flatMap(s=>s.items)]) {
  if(item.phone != null || item.url != null || item.photo != null || item.verified !== false || item.verifiedOn !== null)throw new Error('Public template must have no destinations, media or verification.');
}
const skip=new Set(['.git','.openai','.netlify','node_modules','dist','private']);
async function scan(directory='') {
  for(const entry of await readdir(root+directory,{withFileTypes:true})) {
    if(skip.has(entry.name) || entry.name.startsWith('.env'))continue;
    const path=directory+entry.name;
    if(entry.isSymbolicLink())throw new Error('Symlinks are not allowed in public source: '+path);
    if(entry.isDirectory()){await scan(path+'/');continue;}
    if(/^assets\/.+\.(?:png|jpe?g|webp|gif|svg)$/i.test(path))throw new Error('Do not publish personal media: '+path);
    if(!/\.(?:html|json|js|mjs|cjs|md|txt|yml|yaml|toml|css)$/.test(path))continue;
    const text=await readFile(root+path,'utf8');
    const numbers=text.match(/\+\d{8,15}\b/g)||[];
    if(numbers.some(n=>n!=='+99900000001'))throw new Error('Possible personal phone number in public source: '+path);
  }
}
await scan();
console.log('Public tree gate passed: blank template, no literal phone numbers or asset photographs. This is not a history or image-content audit.');
