# Atualização comercial — 28/09/2026

Publicação: https://voragon.vercel.app/

## Resultado

Novo posicionamento de tecnologia sob demanda; cinco soluções com investimento inicial; planos Essencial, Evolução e Parceiro; conversa gratuita separada do Diagnóstico Digital; Sessão Direção Digital com duração, entregas e preço; flexibilidade por etapas e FAQ. Todos os CTAs comerciais têm mensagem própria para o WhatsApp já utilizado.

Preservados identidade, marca, tipografia, cores, abertura animada do cabeçalho, conexão animada, marketing, portfólio e páginas legais. Resultado de 62% mantido e atribuído à cliente Sil Sommelier e ao conjunto de ações.

## Arquivos modificados

- `index.html`: HTML gerado com novo conteúdo comercial e SEO.
- `styles.css`: estilos responsivos dos cards, planos, sessão, diagnóstico e FAQ; ajustes discretos de contraste.
- `vercel.json`: build estático e publicação exclusiva de `dist/`.
- `.vercelignore`: exclusões do upload.
- `.gitignore`: exclusões de segredos, dependências e build.
- `README.md`: estrutura atual, comandos, manutenção e validação.
- `PROMPT-MESTRE.md`: posicionamento, CTAs e oferta vigentes.

## Arquivos criados

- `content/commercial.json`: preços e textos comerciais centralizados.
- `templates/index.html`: estrutura existente reaproveitada com marcadores para o conteúdo comercial.
- `scripts/render.mjs`: geração de seções, validação dos dados, formatação de valores e links.
- `scripts/build.mjs`: saída estática limitada a arquivos públicos.
- `scripts/lint.mjs`: verificações estruturais e de links.
- `tests/commercial.test.mjs`: cinco testes automatizados nativos.
- `package.json` e `package-lock.json`: comandos de build/lint/test, sem dependências de produção.
- `ALTERACOES_2026-09-28.md`: este relatório.
- `dist/`: saída gerada para produção, com cópias apenas dos arquivos públicos.

`script.js`, imagens, logotipo, favicon, robots, sitemap e páginas de privacidade/exclusão foram preservados.

## Verificação

`npm run check`: build, lint e 5 testes aprovados. Verificação com Chrome em 360, 390, 768, 1024 e 1440 pixels, mensagens WhatsApp, menu, FAQ por teclado, animações e movimento reduzido. Ofertas acessíveis sem JavaScript. Axe-core com tags WCAG 2 A/AA e 2.1 AA: zero violações detectadas. Isso é uma verificação automatizada, não uma certificação de acessibilidade.

Build remoto concluído e produção verificada com HTTP 200. Páginas legais mantidas; fontes, dados de manutenção e arquivos privados fora da publicação. Nenhuma mensagem enviada pelo WhatsApp.
