# Gerador de bots para o Typebot

Escreva o fluxo em JavaScript e gere o arquivo `.json` que o Typebot importa. Vantagens sobre montar no editor: o fluxo fica versionado, dá para revisar textos com busca e substituição e todo bot novo já sai com o tema da Tech Blues.

```
docs/typebot/
├── lib/typebot-builder.mjs      biblioteca (blocos, tema, validação)
├── bots/diagnostico.mjs         fluxo do bot de diagnóstico
└── tech-blues-diagnostico.json  arquivo gerado, pronto para importar
```

## Gerar e importar

```bash
node docs/typebot/bots/diagnostico.mjs
```

1. No Typebot: **Create a typebot → Import a file** e escolha o `.json` gerado.
2. Nos blocos **OpenAI**, selecione (ou crie) a credencial com a chave da OpenAI. O arquivo não carrega credenciais.
3. Substitua os endereços marcados no topo do arquivo do bot (`WEBHOOK_URL`, `AGENDA_URL`).
4. Teste no **Preview**, publique e copie o *public id* para a variável `PUBLIC_TYPEBOT_ID` do site.

Se a importação acusar erro em algum bloco, o Typebot mostra qual. O gerador foi escrito com base nos schemas do repositório oficial (`baptisteArno/typebot.io`, formato 6.1) em setembro de 2026; se o formato mudar, ajuste `lib/typebot-builder.mjs`.

## Criar um bot novo

Copie `bots/diagnostico.mjs`, troque o nome e monte o fluxo com os blocos abaixo. Regras:

- **Declare as variáveis** em `variables`. Use `{{nome}}` nos textos, prompts e expressões. Variável não declarada faz o gerador falhar.
- **Grupos** (`group(titulo, x, y, [blocos])`) são as "telas" do fluxo. `x`/`y` só posicionam no editor.
- **Conexões**: `then(grupo, proximo)` liga o último bloco de um grupo ao próximo. Por isso os grupos são criados de trás para a frente. `itemTo(botoes, 'Rótulo', grupo)` faz um botão pular direto para um grupo.
- **Condições**: `condition([{ comparisons: [cmp('score', 'Greater or equal to', '9')], to: grupo }])`. O "senão" é a saída normal do grupo (`then`). Vários `comparisons` com `logicalOperator: 'OR'`.
- **Pontuação**: `addPoints('papel', { 'Rótulo do botão': 3, ... })` soma em `score` os pontos da opção escolhida (declare `score` e `pts`).
- **Grupos finais** (sem saída) precisam ser passados em `finals` no `write`, senão o gerador acusa "termina sem saída".

Blocos disponíveis: `text`, `textInput`, `emailInput`, `phoneInput`, `choice` (com `{ multiple: true }`), `setVar` (expressão JavaScript: `{{var}}` vira o valor real), `condition`, `openaiChat` (resposta livre), `openaiExtract` (extrai variáveis tipadas de um texto: `string`, `number`, `boolean`, `array`, `enum`) e `httpRequest` (POST para n8n, Zoho, etc.). Links em bolhas: `text(['Veja ', a('o blog', url)])`; negrito: `bold('texto')`.

## Variáveis que o site envia

O componente `DiagnosticoBot.astro` preenche `origem`, `segmento`, `pagina`, `utm_source`, `utm_medium` e `utm_campaign`. Qualquer bot embutido no site pode declará-las e usá-las.
