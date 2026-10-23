const steps = [
 {title:'Como podemos chamar você?',fields:[['name','Seu nome','text',100,true],['company','Nome da empresa (opcional)','text',120,false]]},
 {title:'Como podemos entrar em contato?',fields:[['email','Seu e-mail','email',254,true],['phone','Seu telefone com DDD','tel',25,true]]},
 {title:'De onde você é?',fields:[['city','Sua cidade','text',100,true],['state','Estado ou país','text',80,true]]},
 {title:'O que você quer explorar?',key:'service',options:['Direção e Presença','Transformação · Premium','Diagnóstico estratégico','Cuidado','Evolução','Software sob medida','Ainda não sei qual plano escolher']},
 {title:'O que você quer alcançar?',fields:[['need','Conte seu objetivo ou o problema que quer resolver','textarea',1000,true]]},
 {title:'Como está sua empresa hoje?',fields:[['current','Já tem site, Instagram ou alguma ferramenta? (opcional)','textarea',500,false]]},
 {title:'Em que momento você está?',key:'timing',options:['Quero pedir um orçamento e começar em breve','Quero planejar para os próximos meses','Estou conhecendo as possibilidades']}
];
const values={};let index=0;let submissionId=crypto.randomUUID();let saving=false;
const labels={name:'Nome',company:'Empresa',email:'E-mail',phone:'Telefone',city:'Cidade',state:'Estado ou país',service:'Serviço',need:'Necessidade',current:'Situação atual',timing:'Momento'};
const form=document.querySelector('#journey'), question=document.querySelector('#question');
const requested=new URLSearchParams(location.search).get('interesse');
if(steps.find(step=>step.key==='service').options.includes(requested)) values.service=requested;
function render(){
 question.replaceChildren();document.querySelector('#error').textContent='';
 const step=steps[index],heading=document.createElement('h2');heading.textContent=step.title;question.append(heading);
 if(step.fields)for(const [key,label,type,max,required] of step.fields){
  const l=document.createElement('label');l.htmlFor=key;l.textContent=label;
  const input=document.createElement(type==='textarea'?'textarea':'input');if(type!=='textarea')input.type=type;
  input.id=key;input.name=key;input.maxLength=max;input.required=required;input.value=values[key]||'';
  if(key==='email')input.autocomplete='email';if(key==='phone') {input.autocomplete='tel';input.placeholder='(DDD) 99999-9999';input.minLength=10;input.inputMode='tel';}if(key==='name')input.autocomplete='name';if(key==='company')input.autocomplete='organization';if(key==='city')input.autocomplete='address-level2';if(key==='state')input.autocomplete='address-level1';
  question.append(l,input);
 }else{
  const group=document.createElement('div');group.className='choices';
  for(const text of step.options){const l=document.createElement('label');l.className='choice';const input=document.createElement('input');input.type='radio';input.name=step.key;input.value=text;input.required=true;input.checked=values[step.key]===text;const span=document.createElement('span');span.textContent=text;l.append(input,span);group.append(l);}question.append(group);
 }
 document.querySelector('#progress').textContent=`Etapa ${index+1} de ${steps.length}`;document.querySelector('#meter').value=index+1;
 document.querySelector('#back').disabled=index===0;document.querySelector('#next').textContent=index===steps.length-1?'Revisar minha conversa':'Continuar';
 heading.tabIndex=-1;heading.focus();
}
function capture(){for(const [key,value] of new FormData(form))values[key]=String(value).trim();}
form.addEventListener('submit',event=>{event.preventDefault();capture();const step=steps[index];if(step.fields?.some(([key,,,max,required])=>required&&!values[key])){document.querySelector('#error').textContent='Preencha a informação para continuar.';return;}
 if(index<steps.length-1){index++;render();return;}
 const dl=document.querySelector('#answers');dl.replaceChildren();for(const [key,label] of Object.entries(labels))if(values[key]){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=values[key];dl.append(dt,dd);}
 const lines=['Olá! Vim pelo site da Voragon e quero conversar sobre meu projeto.'];for(const [key,label] of Object.entries(labels))if(values[key])lines.push(label+': '+values[key]);
 const message=lines.join('\n');
 document.querySelector('#message-preview').value=message;
 document.querySelector('#whatsapp').href='https://api.whatsapp.com/send?phone=5545991038233&text='+encodeURIComponent(message);
 form.hidden=true;document.querySelector('#review').hidden=false;document.querySelector('#progress').textContent='Respostas prontas para revisão';document.querySelector('#edit').focus();
});
document.querySelector('#back').addEventListener('click',()=>{capture();if(index>0)index--;render();});
document.querySelector('#edit').addEventListener('click',()=>{form.hidden=false;document.querySelector('#review').hidden=true;document.querySelector('#whatsapp').removeAttribute('href');submissionId=crypto.randomUUID();document.querySelector('#send-status').textContent='';document.querySelector('#save').disabled=false;document.querySelector('#save').textContent='Enviar meu interesse à Voragon';index=0;render();});
render();

document.querySelector('#copy').addEventListener('click',async()=>{
 const preview=document.querySelector('#message-preview'), status=document.querySelector('#copy-status');
 try{await navigator.clipboard.writeText(preview.value);status.textContent='Mensagem copiada. Abra o WhatsApp, cole na conversa e toque em enviar.';}catch{preview.focus();preview.select();status.textContent='Selecione e copie o texto acima. Depois cole na conversa do WhatsApp.';}
});

// Explicit submission: save the request in CRM even without WhatsApp delivery.
document.querySelector('#save').addEventListener('click',async()=>{
 const status=document.querySelector('#send-status'),button=document.querySelector('#save');
 if(saving)return;
 if(!document.querySelector('#consent').checked){status.textContent='Autorize o contato para enviar sua solicitação.';document.querySelector('#consent').focus();return;}
 saving=true;button.disabled=true;document.querySelector('#edit').disabled=true;status.textContent='Enviando sua solicitação…';
 const campaign=['utm_source','utm_medium','utm_campaign','utm_content'].map(key=>new URLSearchParams(location.search).get(key)||'').join(' / ').slice(0,200);
 try{
  const response=await fetch('https://crm-api.2.25.189.129.nip.io/api/v1/public/site-leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,submission_id:submissionId,consent:true,website:document.querySelector('#website').value,campaign}),signal:AbortSignal.timeout(20000)});
  if(!response.ok){if(response.status===422)throw new Error('Confira seu telefone com DDD e seu e-mail antes de enviar.');if(response.status===429)throw new Error('Limite de solicitações atingido. Aguarde ou continue pelo WhatsApp.');throw new Error('Não foi possível confirmar o cadastro. Tente novamente ou continue pelo WhatsApp.');}
  const result=await response.json();if(result.received!==true)throw new Error('Não foi possível confirmar o cadastro. Tente novamente.');
  status.textContent='Solicitação recebida pela Voragon! Você também pode continuar a conversa pelo WhatsApp.';button.textContent='Solicitação recebida';
 }catch(error){status.textContent=error.name==='TimeoutError'?'O envio demorou. Tente novamente; o mesmo envio não duplica seu cadastro.':error.message;button.disabled=false;}
 finally{saving=false;document.querySelector('#edit').disabled=false;}
});
