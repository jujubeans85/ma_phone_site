import {cp,mkdir,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
await rm(root+'dist',{recursive:true,force:true});
await mkdir(root+'dist',{recursive:true});
for(const file of ['index.html','app.js','styles.css','config.json','manifest.json','apple-touch-icon.png','icon-180x180.png','icon-192x192.png','icon-512x512.png','assets'])await cp(root+file,root+'dist/'+file,{recursive:true});
console.log('Built dist/ from the source allowlist. No archived launcher is published.');
