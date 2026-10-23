import {cp, mkdir, rm, writeFile} from 'node:fs/promises';
import {loadSources, render} from './render.mjs';
const root=new URL('../',import.meta.url);
const {data,template}=await loadSources(root);
const html=render(data,template);
// Only this allowlist is published. No source data, credentials or internal documents.
await rm(new URL('dist/',root),{recursive:true,force:true});
await mkdir(new URL('dist/',root),{recursive:true});
await writeFile(new URL('index.html',root),html);
await writeFile(new URL('dist/index.html',root),html);
for(const file of ['conversar.html','conversar.css','conversar.js','styles.css','script.js','demo.html','demo.css','demo.js','privacidade.html','exclusao-de-dados.html','robots.txt','sitemap.xml','assets']) {
  await cp(new URL(file,root),new URL(`dist/${file}`,root),{recursive:true});
}
console.log('Build concluído: HTML estático em dist/, sem dependências de produção.');
