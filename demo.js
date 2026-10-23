const leads = [
 {id:1,name:'Empresa Exemplo A',service:'Site e presença digital',need:'Apresentar serviços e facilitar pedidos de orçamento.',stage:'Novo contato',priority:'Média'},
 {id:2,name:'Empresa Exemplo B',service:'Automação e atendimento',need:'Organizar solicitações e encaminhar dúvidas à equipe.',stage:'Atendimento humano',priority:'Alta'},
 {id:3,name:'Empresa Exemplo C',service:'Sistema e gestão',need:'Reunir clientes, projetos e próximos contatos.',stage:'Proposta',priority:'Alta'},
 {id:4,name:'Empresa Exemplo D',service:'Site e presença digital',need:'Organizar catálogo e informações de contato.',stage:'Novo contato',priority:'Média'}
];
let selected=null;
const stages=['Novo contato','Atendimento humano','Proposta'];
const board=document.querySelector('#board'), details=document.querySelector('#details');
function render(){
 board.replaceChildren();
 stages.forEach(stage=>{
  const col=document.createElement('div');col.className='column';const h=document.createElement('h3');h.textContent=stage+' · '+leads.filter(x=>x.stage===stage).length;col.append(h);
  leads.filter(x=>x.stage===stage).forEach(lead=>{const button=document.createElement('button');button.className='lead';const badge=document.createElement('span');badge.className='priority';badge.textContent=lead.priority;const name=document.createElement('strong');name.textContent=lead.name;const service=document.createElement('small');service.textContent=lead.service;button.append(badge,name,service);button.addEventListener('click',()=>{selected=lead.id;renderDetails();});col.append(button);});board.append(col);
 });document.querySelector('#lead-count').textContent=leads.length;
}
function renderDetails(){const lead=leads.find(x=>x.id===selected);if(!lead)return;details.replaceChildren();const title=document.createElement('h3');title.textContent=lead.name;const summary=document.createElement('p');summary.textContent='Resumo da qualificação: '+lead.need;const context=document.createElement('p');context.textContent='Serviço: '+lead.service+' · Etapa: '+lead.stage;const next=document.createElement('button');next.textContent=lead.stage==='Proposta'?'Voltar ao atendimento':'Avançar etapa';next.addEventListener('click',()=>{lead.stage=stages[(stages.indexOf(lead.stage)+1)%stages.length];render();renderDetails();});const priority=document.createElement('button');priority.textContent='Alterar prioridade';priority.addEventListener('click',()=>{lead.priority=lead.priority==='Alta'?'Média':'Alta';render();renderDetails();});details.append(title,summary,context,next,priority);}
document.querySelectorAll('[data-tab]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-tab]').forEach(x=>x.setAttribute('aria-pressed',String(x===button)));document.querySelectorAll('.module').forEach(x=>x.hidden=x.id!==button.dataset.tab);}));
document.querySelector('#add-lead').addEventListener('click',()=>{const id=leads.length+1;leads.push({id,name:'Empresa Exemplo '+id,service:'Automação e atendimento',need:'Exemplo de interesse coletado pelo atendimento inicial.',stage:'Novo contato',priority:'Média'});selected=id;render();renderDetails();});render();
