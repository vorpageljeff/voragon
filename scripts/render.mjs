import { readFile } from 'node:fs/promises';
export const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export function money(value) {
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error('O preço deve ser um inteiro positivo em reais.');
  return `R$ ${new Intl.NumberFormat('pt-BR', {maximumFractionDigits:0}).format(value)}`;
}
export function whatsapp(phone, message) {
  if (!/^\d{12,15}$/.test(phone) || typeof message !== 'string' || !message.trim()) throw new Error('Contato ou mensagem inválidos.');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
export function validate(data) {
  const entries = [...data.start.offers, ...data.evolution.plans];
  const ids = new Set();
  for (const item of entries) {
    if (!/^[a-z][a-z0-9-]*$/.test(item.id) || ids.has(item.id)) throw new Error('Identificador comercial inválido ou duplicado.');
    ids.add(item.id);
    if (!item.name || !item.description || !item.cta || !item.items?.length || item.items.some(x => typeof x !== 'string' || !x.trim())) throw new Error('Oferta incompleta.');
    if (item.price !== null) money(item.price); whatsapp(data.whatsapp, item.message);
  }
  for (const key of ['mentorship', 'diagnostic']) {if (data[key].price !== null) money(data[key].price);whatsapp(data.whatsapp, data[key].message);}
  if (data.evolution.plans.filter(x => x.recommended).length !== 1) throw new Error('Escolha exatamente um plano recomendado.');
}
const e = escapeHTML;
const list = items => `<ul class="commercial-list">${items.map(text => `<li>${e(text)}</li>`).join('')}</ul>`;
export function render(data, template) {
  validate(data);
  const link = (label, message, classes = 'button button-ghost') => `<a class="${classes}" href="/conversar?interesse=${encodeURIComponent(label === 'Quero meu diagnóstico' ? 'Diagnóstico estratégico' : message.includes('plano ') ? message.split('plano ')[1].replace(' da Voragon.','') : 'Ainda não sei qual plano escolher')}">${e(label)}</a>`;
  const heading = (id, eyebrow, title, description) => `<div class="commercial-heading reveal"><div><span class="eyebrow">${e(eyebrow)}</span><h2 id="${id}">${e(title)}</h2></div><p>${e(description)}</p></div>`;
  const h=data.hero, s=data.start, ev=data.evolution, m=data.mentorship, d=data.diagnostic, f=data.faq, c=data.closing;
  const fragments={
    STRUCTURED_DATA:`<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://voragon.com.br/#organization","name":"Voragon","url":"https://voragon.com.br/","logo":"https://voragon.com.br/assets/logo-voragon.png","telephone":"+5545991038233","areaServed":{"@type":"Place","name":"Oeste do Paraná, Brasil"}},{"@type":"Service","name":"Consultoria em tecnologia, educação empresarial, IA e software","provider":{"@id":"https://voragon.com.br/#organization"},"serviceType":["Consultoria em tecnologia","Educação empresarial","Inteligência artificial","Desenvolvimento de software"],"areaServed":[{"@type":"City","name":"Toledo, Paraná"},{"@type":"Place","name":"Oeste do Paraná, Brasil"}]}]}</script>`,
    SEO_TITLE:e(data.seo.title),SEO_DESCRIPTION:e(data.seo.description),
    ENTRY_PATHS:`<section class="section entry-paths" id="seu-proximo-passo" aria-labelledby="entry-title"><div class="commercial-heading"><div><span class="eyebrow">Por onde começar</span><h2 id="entry-title">O que sua empresa precisa agora?</h2></div><p>Escolha a necessidade mais próxima da sua realidade. Vamos entender o desafio antes de propor uma solução.</p></div><div class="entry-grid"><a href="/conversar" class="entry-card" data-interest="Site e presença digital"><span>01 · PRESENÇA DIGITAL</span><h3>Quero apresentar minha empresa</h3><p>Um site que explica seus serviços e facilita o contato.</p><b>Conversar sobre meu site →</b></a><a href="/conversar" class="entry-card" data-interest="Automação e atendimento"><span>02 · ATENDIMENTO</span><h3>Quero automatizar o atendimento</h3><p>Organizar conversas e reduzir tarefas repetitivas.</p><b>Conversar sobre automação →</b></a><a href="/conversar" class="entry-card" data-interest="Sistema e gestão"><span>03 · GESTÃO</span><h3>Quero organizar minha gestão</h3><p>Conectar clientes, projetos e informações da operação.</p><b>Conversar sobre minha gestão →</b></a></div></section>`,
    QUALIFICATION:`<section class="section light intake" id="conversar" aria-labelledby="intake-title"><div><span class="eyebrow">Seu próximo passo</span><h2 id="intake-title">Vamos entender seu momento?</h2><p>Uma conversa guiada para contar de onde você é, o que procura e o que quer alcançar.</p><p>Ao final, você revisa suas respostas e abre uma mensagem pronta no WhatsApp.</p><a class="button button-primary" href="/conversar">Começar minha conversa</a></div></section>`,

    HERO:`<div class="hero-copy reveal"><span class="eyebrow">${e(h.eyebrow)}</span><h1>${e(h.title)}<br><span>${e(h.highlight)}</span></h1><p>${e(h.description)}</p><p class="hero-complement">${e(h.complement)}</p><div class="hero-actions">${link(h.cta,h.message,'button button-primary')}<a class="button button-ghost" href="#comecar">${e(h.secondary)}</a></div><div class="hero-proof" aria-label="Diferenciais">${h.proof.map(x=>`<span>${e(x)}</span>`).join('')}</div></div>`,
    START:`<section class="section starting-points" id="comecar" aria-labelledby="starting-title">${heading('starting-title',s.eyebrow,s.title,s.description)}<div class="starting-grid">${s.offers.map((x,i)=>`<article class="commercial-card reveal" id="oferta-${x.id}"><div class="offer-top"><span class="offer-index">0${i+1}</span><span class="offer-type">PACOTE COM ENTREGA DEFINIDA</span></div><h3>${e(x.name)}</h3><p class="commercial-price"><span>Investimento total</span> <strong>${e(x.price === null ? 'Sob orçamento' : money(x.price))}</strong></p><p class="offer-description">${e(x.description)}</p>${list(x.items)}${link(x.cta,x.message)}</article>`).join('')}</div><p class="commercial-note">${e(s.note)}</p><div class="scope-note reveal"><span class="eyebrow">Um passo de cada vez</span><p>${e(s.flexibility)}</p></div></section>`,
    EVOLUTION:`<section class="section recurring" id="evolucao" aria-labelledby="evolution-title">${heading('evolution-title',ev.eyebrow,ev.title,ev.description)}<div class="recurring-grid">${ev.plans.map(x=>`<article class="commercial-card plan-card${x.recommended?' recommended':''} reveal" id="plano-${x.id}">${x.recommended?`<span class="recommended-badge">${e(ev.badge)}</span>`:''}<span class="offer-type">ACOMPANHAMENTO MENSAL</span><h3>${e(x.name)}</h3><p class="commercial-price"><strong>${e(x.price === null ? 'Sob orçamento' : money(x.price))}</strong><span>/mês</span></p><p class="offer-description">${e(x.description)}</p>${list(x.items)}${link(x.cta,x.message,`button ${x.recommended?'button-primary':'button-ghost'}`)}</article>`).join('')}</div><p class="commercial-note">${e(ev.note)}</p></section>`,
    MENTORSHIP:`<section class="section mentorship commercial-mentorship" id="mentoria" aria-labelledby="mentorship-title"><div class="mentorship-intro reveal"><span class="eyebrow">${e(m.name)}</span><h2 id="mentorship-title">${e(m.title)}</h2><p>${e(m.description)}</p><p class="session-price">${e(money(m.price))}</p>${link(m.cta,m.message,'button button-primary')}<div class="mentor-signature"><img src="/assets/jefferson-vorpagel.jpg" alt="" width="52" height="52" loading="lazy"><div><strong>Com Jefferson Vorpagel</strong><span>Estratégia, negócios e tecnologia</span></div></div></div><div class="mentorship-product reveal"><div class="product-top"><img src="/assets/favicon.svg" width="38" height="38" alt=""><span>${e(m.deliveryLabel)}</span></div><h3>${e(m.deliveryTitle)}</h3>${list(m.items)}<p class="product-footer">${e(m.note)}</p></div></section>`,
    DIAGNOSTIC:`<section class="section diagnostic" id="diagnostico" aria-labelledby="diagnostic-title"><div class="diagnostic-intro reveal"><span class="eyebrow">${e(d.eyebrow)}</span><h2 id="diagnostic-title">${e(d.title)}</h2><p>${e(d.description)}</p>${link(d.cta,d.message,'button button-primary')}</div><article class="commercial-card diagnosis-card reveal"><span class="offer-type">ANÁLISE APROFUNDADA</span><h3>${e(d.name)}</h3><p class="commercial-price"><strong>${e(d.price === null ? 'Sob orçamento' : money(d.price))}</strong></p>${list(d.items)}<p class="commercial-note">${e(d.note)}</p>${link(d.secondary,d.secondaryMessage)}</article></section>`,
    PORTFOLIO_CTA:link(data.portfolio.cta,data.portfolio.message,'button button-primary'),
    FAQ:`<section class="section commercial-faq" id="duvidas" aria-labelledby="faq-title"><div class="section-heading"><span class="eyebrow">${e(f.eyebrow)}</span><h2 id="faq-title">${e(f.title)}</h2></div><div class="faq-list">${f.items.map(x=>`<details><summary>${e(x.question)}<span aria-hidden="true">+</span></summary><p>${e(x.answer)}</p></details>`).join('')}</div></section>`,
    CLOSING:`<section class="cta-section"><div class="cta-content reveal"><span class="eyebrow">${e(c.eyebrow)}</span><h2>${e(c.title)}</h2><p>${e(c.description)}</p>${link(c.cta,c.message,'button button-primary')}<small>(45) 99103-8233</small></div></section>`
  };
  for (const [key,value] of Object.entries(fragments)) {
    if (!template.includes(`{{${key}}}`)) continue;
    template=template.replaceAll(`{{${key}}}`,value);
  }
  if (/\{\{[A-Z_]+\}\}/.test(template)) throw new Error('Marcador de conteúdo não resolvido.');
  return template;
}
export async function loadSources(root) {
  return {data:JSON.parse(await readFile(new URL('content/commercial.json',root),'utf8')),template:await readFile(new URL('templates/index.html',root),'utf8')};
}
