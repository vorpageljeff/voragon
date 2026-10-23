import {readFile} from 'node:fs/promises';
import {loadSources,render} from './render.mjs';
const root=new URL('../',import.meta.url);
const {data,template}=await loadSources(root);
const html=await readFile(new URL('index.html',root),'utf8');
if(html!==render(data,template)) throw new Error('index.html desatualizado: execute npm run build.');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length) throw new Error('IDs duplicados.');
for(const match of html.matchAll(/href="#([^"]+)"/g)) if(!ids.includes(match[1])) throw new Error(`Âncora inválida: ${match[1]}`);
if((html.match(/<h1\b/g)||[]).length!==1) throw new Error('A página deve ter exatamente um h1.');
for(const tag of html.matchAll(/<img\b[^>]*>/g)) if(!/\balt="[^"]*"/.test(tag[0])) throw new Error('Imagem sem alt.');
for(const tag of html.matchAll(/<a\b[^>]*>/g)) {
 if(/target="_blank"/.test(tag[0])&&!/rel="[^"]*noopener/.test(tag[0])) throw new Error('Link externo sem noopener.');
 if(/href="https:\/\/wa\.me/.test(tag[0])) {
   const url=new URL(tag[0].match(/href="([^"]+)"/)[1].replaceAll('&amp;','&'));
   if(url.pathname!==`/${data.whatsapp}`||!url.searchParams.get('text')?.trim()) throw new Error('Link WhatsApp inválido.');
 }
}
const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const stack=[];
for(const match of html.matchAll(/<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi)) {
 const [tag,name]=match; const lower=name.toLowerCase();
 if(tag.startsWith('</')) {if(stack.pop()!==lower) throw new Error(`HTML desequilibrado em ${tag}`);}
 else if(!voidTags.has(lower)&&!tag.endsWith('/>')) stack.push(lower);
}
if(stack.length) throw new Error(`Tags sem fechamento: ${stack.join(',')}`);
console.log('Lint OK: sintaxe JS, conteúdo gerado, HTML balanceado, IDs, âncoras, imagens e links WhatsApp.');
