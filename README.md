# Voragon — site institucional

Site estático existente em HTML, CSS e JavaScript, sem framework e sem dependências de produção. Identidade, animações e portfólio preservados na atualização comercial de 28/09/2026.

## Conteúdo e edição

- `content/commercial.json`: fonte única de preços, ofertas, planos, diagnóstico, sessão, FAQ, mensagens de contratação e comunicação principal.
- `templates/index.html`: estrutura original reaproveitada, animações, marketing, método, autoridade, portfólio e marcadores do conteúdo comercial.
- `scripts/render.mjs`: componentes de renderização HTML e validação dos dados; escapa conteúdo e gera URLs do WhatsApp.
- `index.html`: página gerada, mantida na raiz para inspeção. Não editar manualmente: será atualizada pelo build.
- `styles.css`: identidade visual, responsividade e estilos dos novos cards.
- `script.js`: menu, animações e preparação local do formulário de contato.
- `assets/`: logotipo, símbolo, fotos e portfólio originais.
- `privacidade.html` e `exclusao-de-dados.html`: páginas legais preservadas.

Para mudar um valor, editar apenas o JSON e executar o build. A página final contém todas as ofertas no HTML, inclusive quando JavaScript está desativado. O formulário prepara uma mensagem no navegador. O visitante precisa abrir o WhatsApp e confirmar o envio; não há submissão do formulário ao servidor nem envio automático. Os CTAs abrem o WhatsApp com contexto.

## Comandos

Requer Node.js 22 ou superior e npm. Não há bibliotecas para instalar em produção.

```sh
npm ci --ignore-scripts
npm run check
```

`check` executa, nesta ordem:
1. `build`: valida os dados, gera `index.html` e monta `dist/` a partir de uma lista explícita de arquivos públicos.
2. `lint`: verifica sintaxe JavaScript, conteúdo gerado, balanceamento das tags HTML, IDs, âncoras, texto alternativo, links externos e WhatsApp.
3. `test`: cinco testes nativos de Node cobrindo valores/entregas autorizados, mensagens, atualização centralizada, escape HTML, dados inválidos, distribuição pública e preservação do portfólio e páginas legais.

Servidor local para conferir exatamente o artefato de produção:

```sh
python3 -m http.server 8778 --bind 127.0.0.1 --directory dist
```

## Publicação

`vercel.json` configura `npm run build` e `dist` como saída. Nunca publicar sem `npm run check` aprovado. O Vercel também executa o build antes da publicação. A pasta `.vercel` contém o vínculo já existente com o projeto `voragon`; não criar outro projeto.

Arquivos públicos: página inicial, demonstração fictícia (`demo.html`, `demo.css`, `demo.js`), CSS, JavaScript, assets, páginas legais, robots e sitemap. Fontes, testes, dados comerciais de manutenção, documentos internos e `.env*` ficam fora de `dist/`.

O número continua sendo +55 45 99828-7556. Nenhuma mensagem é enviada automaticamente.

## Verificação de 28/09/2026

- Build e lint aprovados; 5 testes aprovados.
- Chrome: cinco ofertas, três planos, preços, mensagens de contratação, menu mobile e FAQ por Enter/Espaço.
- Larguras 360, 390, 768, 1024 e 1440 sem transbordamento dos cards.
- Animações preservadas; preferência por movimento reduzido e conteúdo sem JavaScript verificados.
- Análise automatizada axe-core WCAG 2 A/AA e 2.1 AA: zero violações detectadas após ajustes discretos de contraste. Não substitui uma auditoria integral de acessibilidade.
- Políticas de privacidade/exclusão, logotipo e projetos originais preservados.

## Novas ofertas

Landing page a partir de R$ 1.990; site a partir de R$ 3.900; catálogo a partir de R$ 4.900; automação a partir de R$ 1.900; sistema a partir de R$ 9.900. Valores iniciais sujeitos ao escopo.

Voragon Evolução: Essencial R$ 397/mês, Evolução R$ 897/mês e Parceiro R$ 1.797/mês. Diagnóstico Digital R$ 690. Sessão Direção Digital R$ 490, até 90 minutos, plano de 30 dias e documento final.

A conversa inicial permanece gratuita. Licenças e serviços externos são informados separadamente; condições completas definidas na proposta.

Publicação de 28/09/2026 concluída no projeto original, após validação local e build do Vercel. Endereço público conferido: cinco ofertas, três planos, preços de sessão/diagnóstico, FAQ e páginas legais funcionando. Fontes de build, JSON de manutenção e arquivos privados não são servidos pela publicação.


## Conversão e demonstração — 07/10/2026

Publicação `dpl_2RNKA1rqw8NhTJVQrZHz8gBaPP4m` no projeto original `voragon`. Endereços: https://voragon.vercel.app e https://voragon.vercel.app/demo. Três caminhos de entrada preenchem o interesse; portfólio antecipado; mentoria e diagnóstico descritos com usos distintos, preservando preços e entregas.

A demonstração usa dados fictícios, não acessa o CRM nem exige login; alterações desaparecem ao recarregar. O formulário exige nome, serviço e necessidade; empresa opcional. Editar dados invalida o rascunho anterior. Sem JavaScript, o botão permanece desabilitado para evitar envio de campos pela URL. A política de privacidade acompanha o funcionamento.

Qualificação recebida efetivamente no WhatsApp é registrada pelo backend do CRM, gera resumo e fila humana. O site não confirma recebimento e não chama a API do CRM. Bot e IA continuam pausados. Não foi enviado WhatsApp real nem feita chamada paga de IA nesta entrega.

Validação: build, lint e cinco testes aprovados; navegador conferiu caminhos, ordem do portfólio, rascunho, invalidação, demonstração interativa, recarregamento, JavaScript desativado e largura de 390px sem transbordamento. Preview protegido conferido antes da promoção. Backup original privado: `~/.config/voragon-site/backups/before-funnel-20261007.tar.gz`. Esta pasta não possui repositório Git; não foi criado um remoto fictício.


## Busca regional e Google — 08/10/2026

Produção `dpl_8LrvxewHt4p2MWpy9JEuzd8KgtrN` no projeto original `voragon`, após preview protegido. Título, descrição, introdução, seção de serviços regionais e rodapé apresentam criação de sites, software sob demanda e automações para Toledo/Oeste do Paraná. Dados estruturados Organization e Service, sem endereço residencial, avaliações inventadas ou representação de unidade física. Preços e entregas preservados. Canonical e sitemap permanecem no domínio real ativo https://voragon.vercel.app/ até o registro/conexão de voragon.com.br. Demo continua noindex.

Google Search Console: propriedade de prefixo https://voragon.vercel.app/ verificada pela metatag na conta conectada do titular. Não remover a metatag. Sitemap /sitemap.xml enviado; consulta inicial do Google exibiu falha de busca, embora endpoint público retorne HTTP 200 e XML válido. Teste em tempo real do Google aprovado: URL disponível para o Google e página indexável. Solicitação manual recusada por cota diária excedida, com orientação para tentar amanhã (09/10/2026); nenhum aceite de pedido manual foi confirmado. Sitemap reenviado após o teste ao vivo; processamento ainda pendente. Indexação ainda depende do Google. Cadastro no Perfil da Empresa depende de confirmar atendimento presencial, pois atendimento exclusivamente online não é elegível. Nenhum perfil ou anúncio foi criado.

Build, lint e cinco testes passaram. Navegador público confirmou formulário/demonstração existentes, metadados, schema e layout 390px sem overflow. Arquivo original privado preservado em ~/.config/voragon-site/backups/before-local-seo-20261008.tar.gz. Não há promessa de posição ou prazo de indexação.

Atualização comercial e conversa guiada — 08/10/2026: site de entrada R$ 450 de implantação; mensalidade sob orçamento até definição do titular. Consultoria de tecnologia R$ 1.000, duas reuniões e plano de prioridades; execução e gestão contínua separadas. Demais projetos e planos passam a sob orçamento após assessment. Página /conversar substitui o formulário na homepage por seis etapas (nome/empresa, cidade/estado, interesse, objetivo, situação atual e momento), com revisão e edição. Respostas apenas em memória, sem API ou persistência; o visitante confirma o envio no WhatsApp. Prefixo e campos Nome/Serviço/Necessidade preservados para compatibilidade com CRM. Nenhum bot foi habilitado, nenhuma mensagem foi enviada e nenhuma campanha foi ativada. Publicação READY dpl_6XgZ4p8VmcQAGTD1iCAbQzX8fXoY; npm run check e teste de navegador móvel local e em produção aprovados. CLI recusou autenticação; publicação realizada pelo conector Vercel no projeto original, com fontes públicas e ativos previamente publicados.

Correção de abertura no WhatsApp: titular relatou conversa sem texto. Link usa api.whatsapp.com/send com phone/text codificados; revisão agora oferece texto completo selecionável e botão Copiar mensagem (Clipboard API com seleção manual como fallback). Envio continua confirmado pelo visitante no WhatsApp. Testes locais e em produção validam igualdade da mensagem no link e campo de cópia; envio real pelo aplicativo ainda depende de teste do titular. Produção READY dpl_GJdBMnZEpNTpSvoKqEPK5PyhU3EL.

Entrada direta no CRM — 08/10/2026: conversa passa a sete etapas com e-mail e telefone. Revisão tem autorização de contato e botão explícito Enviar meu interesse à Voragon; endpoint https://crm-api.2.25.189.129.nip.io/api/v1/public/site-leads grava no banco existente, sem autenticação do visitante e sem expor credenciais. Telefone cadastrado no lead; e-mail e respostas no histórico. WhatsApp e cópia continuam opcionais. UTM encaminhado pela homepage e registrado quando presente. Idempotência por UUID da solicitação, deduplicação por telefone e variantes, bot pausado e sem IA/envio. Política de privacidade atualizada. Produção READY dpl_GoNHsRAHARFc73S71ELDtQmZBghQ; backend release 73b32ba. Check do site e teste de navegador na produção com resposta interceptada passaram; PostgreSQL restaurado confirmou persistência e deduplicação. Nenhum cadastro fictício foi inserido na produção. Não alegar teste de cliente real até o visitante enviar uma solicitação.

## WhatsApp empresarial — 09/10/2026

Todos os links públicos, revisão da página conversar, contato visível e telefone estruturado passaram para +55 45 99103-8233. Build/lint e cinco testes aprovados. Produção READY dpl_HmHNnQKQdRMn754xJGqiwzmXybEQ, alias voragon.vercel.app. Backup privado anterior à alteração preservado. Nenhuma mensagem enviada pelo agente.
