import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {loadSources,render,money,whatsapp,validate} from '../scripts/render.mjs';
const root=new URL('../',import.meta.url);
const {data,template}=await loadSources(root);
test('Todos os preços e escopos autorizados são preservados na saída estática',()=>{
 assert.deepEqual(data.start.offers.map(x=>x.price),[2900,7900]);
 assert.deepEqual(data.evolution.plans.map(x=>x.price),[590,1290]);
 assert.equal(data.diagnostic.price,null); assert.equal(data.mentorship.price,990);
 const html=render(data,template);
 for(const x of [...data.start.offers,...data.evolution.plans,data.mentorship]) {
   if(x.price !== null) assert(html.includes(money(x.price))); for(const item of x.items) assert(html.includes(item));
 }
 assert(html.includes('Investimento total')); assert(html.includes('Para evoluir'));
});
test('Mensagens de cada contratação preservam acentos e chegam ao número correto',()=>{
 const entries=[...data.start.offers,...data.evolution.plans,data.mentorship];
 assert.equal(new Set(entries.map(x=>x.message)).size,entries.length);
 for(const x of entries) {const url=new URL(whatsapp(data.whatsapp,x.message));assert.equal(url.pathname,'/5545991038233');assert.equal(url.searchParams.get('text'),x.message);}
});
test('Alteração no conteúdo central atualiza preço e escapa HTML sem executar marcação',()=>{
 const altered=structuredClone(data);altered.start.offers[0].price=2500;altered.start.offers[0].name='<script>alert("teste")</script>';
 const html=render(altered,template);assert(html.includes('R$ 2.500'));assert(!html.includes('R$ 1.990'));assert(html.includes('&lt;script&gt;'));assert(!html.includes('<script>alert'));
});
test('Build rejeita preços inválidos, IDs duplicados e recomendações ambíguas',()=>{
 assert.throws(()=>money(-1));assert.throws(()=>money(1.5));assert.throws(()=>whatsapp('abc','teste'));
 const bad=structuredClone(data);bad.start.offers[1].id=bad.start.offers[0].id;assert.throws(()=>validate(bad));
 const ambiguous=structuredClone(data);ambiguous.evolution.plans[0].recommended=true;assert.throws(()=>validate(ambiguous));
});
test('Distribuição contém somente arquivos públicos e preserva as páginas legais',async()=>{
 const files=await readdir(new URL('dist/',root));assert.deepEqual(files.sort(),['assets','conversar.css','conversar.html','conversar.js','demo.css','demo.html','demo.js','exclusao-de-dados.html','index.html','privacidade.html','robots.txt','script.js','sitemap.xml','styles.css']);
 for(const file of ['privacidade.html','exclusao-de-dados.html']) assert.equal(await readFile(new URL(file,root),'utf8'),await readFile(new URL(`dist/${file}`,root),'utf8'));
 const html=await readFile(new URL('dist/index.html',root),'utf8');
 for(const id of ['projeto-innovagro','projeto-sil','projeto-safari','hero-possibilities','solucoes','comecar']) assert(html.includes(`id="${id}"`));
 assert(html.includes('+62%'));assert(html.includes('Resultado informado pela cliente, relacionado ao conjunto de ações'));
});
