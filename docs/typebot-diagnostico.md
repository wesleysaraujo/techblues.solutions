# Typebot: diagnóstico do projeto (pré-qualificação)

Roteiro do chatbot que substitui a antiga "consultoria grátis" no site. O objetivo não é captar o maior número de contatos, e sim separar quem tem projeto, decisão e prazo de quem está só pesquisando, para o time comercial gastar tempo onde há fechamento.

- **Duração-alvo:** 2 minutos e no máximo 8 perguntas. Use botões sempre que possível; texto livre só no desafio e nos contatos.
- **Tom:** direto e cordial, primeira pessoa do plural, sem jargão (ver `docs/design-system/README.md`).

## Template pronto

O fluxo abaixo já está montado em `docs/typebot/tech-blues-diagnostico.json`, gerado por `docs/typebot/bots/diagnostico.mjs` (veja `docs/typebot/README.md`). Importe no Typebot, selecione a credencial da OpenAI nos dois blocos de I.A e troque `WEBHOOK_URL` e `AGENDA_URL` no arquivo do bot.

### Onde a I.A entra

1. **Triagem** (bloco "Generate variables", depois da descrição livre): classifica o contato em `ia_fit` (`cliente_potencial`, `fornecedor_vendendo`, `candidato_emprego`, `estudante_curioso`, `sem_sentido`), sugere a frente da Tech Blues em `ia_categoria` e escreve `ia_resumo`, um resumo de uma frase para o vendedor ler antes da reunião. Fornecedor, candidato e texto sem sentido saem pelo desvio "Fora do perfil", sem acionar o comercial.
2. **Recomendação** (bloco "Create chat completion", só para leads quentes): 2 ou 3 frases personalizadas mostrando que entendemos o desafio e qual frente resolve, sem citar preço ou prazo.

Se a OpenAI falhar, as variáveis ficam vazias e o fluxo segue normalmente. Custo estimado com `gpt-4o-mini`: menos de R$ 0,01 por conversa.

## Como ligar ao site

1. No Typebot, publique o bot e copie o **public id** (Share → ID público, ex.: `tech-blues-diagnostico`).
2. Na Vercel (ou no `.env` local), defina `PUBLIC_TYPEBOT_ID` com esse id. Se o Typebot for self-hosted, defina também `PUBLIC_TYPEBOT_API_HOST`.
3. Faça um novo deploy. Enquanto a variável estiver vazia, o site mostra o formulário simples no lugar do bot.

O bot aparece embutido na seção azul "Diagnóstico do projeto" de todas as páginas e na página `/diagnostico`. Os botões "Diagnosticar meu projeto" levam até ele.

**Tema sugerido** (Theme no Typebot): fundo `#FFFFFF`; bolhas do bot em `#F2F2F2` com texto `#333333`; bolhas do usuário e botões em `#307AEF` com texto branco; fontes Open Sans; avatar com o símbolo da Tech Blues (`docs/design-system/assets/logo/techblues-mark-colorida.svg`).

## Variáveis que o site envia

Crie estas variáveis no Typebot com os mesmos nomes. O site já envia os valores preenchidos (`prefilledVariables`):

| Variável | Exemplo | Uso |
| --- | --- | --- |
| `origem` | `segmento-advocacia`, `zoho`, `sindiops`, `diagnostico` | De qual seção o lead veio |
| `segmento` | `Escritórios de Advocacia`, `Parceiro Zoho`, `SindiOps` ou vazio | Pula a pergunta 2 quando já vier preenchida |
| `pagina` | `/segmentos/advocacia` | Página exata da conversão |
| `utm_source`, `utm_medium`, `utm_campaign` | `google`, `cpc`, `sindicos-set26` | Atribuição de campanhas |

## Fluxo

**0. Abertura**

> Oi! Sou o assistente da Tech Blues. Vou te fazer algumas perguntas rápidas para o especialista certo já chegar sabendo do seu contexto. Leva uns 2 minutos. Como posso te chamar?

Guarde a resposta em `nome`.

**1. Segmento** (pule se `segmento` vier preenchido)

> Prazer, {{nome}}! Qual destas opções descreve melhor o seu negócio?

Botões: Escritório de advocacia · Síndico profissional / administradora · Contabilidade · Engenharia / construção · Fornecedor para condomínios · Outro. Guarde em `segmento`.

**2. Papel na decisão** (Authority). Guarde em `papel`.

> E qual é o seu papel na empresa?

| Botão | Pontos |
| --- | --- |
| Sócio / dono / síndico responsável | 3 |
| Gestor da área | 2 |
| Colaborador levantando opções | 1 |
| Estudante / pesquisa | 0 → vai direto para a saída "Nutrir" |

**3. Porte** (Fit). Guarde em `porte`.

> Quantas pessoas trabalham na operação hoje?

Se `segmento` for síndico, pergunte "Quantos condomínios você administra?" com: 1–3 · 4–10 · 11–30 · mais de 30.

| Botão | Pontos |
| --- | --- |
| Só eu | 0 |
| 2 a 10 | 1 |
| 11 a 50 | 2 |
| Mais de 50 | 3 |

**4. Desafio principal** (Need). Botões com múltipla escolha. Guarde em `desafio`.

> O que você mais precisa resolver agora?

- Atendimento e WhatsApp sobrecarregados
- Tarefas manuais e retrabalho
- Sistemas que não conversam entre si
- Criar uma plataforma / produto digital
- Nuvem, servidores e segurança
- Licenças e implantação Zoho
- Usar I.A no dia a dia do negócio

Soma 2 pontos se escolher pelo menos uma opção.

**5. Contexto em uma frase.** Texto livre. Guarde em `descricao`.

> Em uma ou duas frases: o que acontece hoje que você quer mudar?

**6. Prazo** (Timing). Guarde em `prazo`.

> Para quando você precisa disso funcionando?

| Botão | Pontos |
| --- | --- |
| O quanto antes (até 30 dias) | 3 |
| Em 1 a 3 meses | 2 |
| Em 3 a 6 meses | 1 |
| Só estou pesquisando | 0 |

**7. Investimento** (Budget). Guarde em `investimento`.

> Para te indicar o caminho certo: já existe uma faixa de investimento prevista para o projeto?

| Botão | Pontos |
| --- | --- |
| Até R$ 5 mil | 1 |
| R$ 5 mil a R$ 20 mil | 2 |
| R$ 20 mil a R$ 50 mil | 3 |
| Acima de R$ 50 mil | 3 |
| Ainda não sei | 1 |

Se `segmento` contiver "Zoho" (o site envia "Parceiro Zoho" na página `/zoho`), troque por "Quantas pessoas vão usar o Zoho?" (1 a 5 · 6 a 20 · 21 a 50 · mais de 50), com pontuação 1, 2, 3, 3.

**8. Contato.** Guarde em `empresa`, `whatsapp` e `email`.

> Perfeito, {{nome}}. Para o especialista falar com você: qual é o nome da empresa? · Seu WhatsApp: · E o seu e-mail:

Use os blocos de Phone e Email, que validam o formato.

## Pontuação e saída

Some os pontos numa variável `score` (bloco Set variable). O máximo é 14. Grave também `temperatura`.

| Faixa | `temperatura` | O que o bot faz |
| --- | --- | --- |
| 9 ou mais | `quente` | "Seu projeto tem tudo a ver com o que fazemos. Escolha um horário com um especialista:" + link de agendamento (Zoho Bookings) e botão de WhatsApp. |
| 5 a 8 | `morno` | "Obrigado! Um especialista em {{segmento}} vai analisar suas respostas e falar com você pelo WhatsApp." |
| até 4, ou "Estudante / pesquisa", ou prazo "Só estou pesquisando" | `nutrir` | Agradece, envia 2 ou 3 posts do blog ligados ao `desafio` e convida para a newsletter. Não aciona o comercial. |

Os dois atalhos do `nutrir` (estudante e "só pesquisando") valem para qualquer pontuação. A ideia é o comercial não gastar reunião com quem não vai comprar agora.

## Envio para o CRM

No fim de todas as saídas, use um bloco **Webhook** (POST) para um fluxo do n8n, ou direto para o Zoho CRM, com o corpo:

```json
{
  "nome": "{{nome}}",
  "empresa": "{{empresa}}",
  "email": "{{email}}",
  "whatsapp": "{{whatsapp}}",
  "segmento": "{{segmento}}",
  "papel": "{{papel}}",
  "porte": "{{porte}}",
  "desafio": "{{desafio_txt}}",
  "descricao": "{{descricao}}",
  "prazo": "{{prazo}}",
  "investimento": "{{investimento}}",
  "score": "{{score}}",
  "temperatura": "{{temperatura}}",
  "ia_fit": "{{ia_fit}}",
  "ia_categoria": "{{ia_categoria}}",
  "ia_resumo": "{{ia_resumo}}",
  "origem": "{{origem}}",
  "pagina": "{{pagina}}",
  "utm_source": "{{utm_source}}",
  "utm_medium": "{{utm_medium}}",
  "utm_campaign": "{{utm_campaign}}"
}
```

Sugestão de uso no Zoho CRM: criar o Lead com `Lead Source = Site - Diagnóstico`, `Rating = temperatura` e `ia_resumo` na descrição. Leads `quente` também geram uma notificação no WhatsApp do comercial; `nutrir` entra só na lista da newsletter; `descartado` (fora do perfil) só fica registrado.

O formulário simples do site (enquanto o bot não estiver no ar) envia `nome`, `email`, `empresa`, `telefone`, `interesse`, `mensagem`, `origem` e `pagina` para `PUBLIC_LEAD_ENDPOINT`. Dá para usar o mesmo fluxo do n8n.
