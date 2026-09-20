# techblues.com.br

Site institucional da Tech Blues em Astro 5 + Tailwind 4, seguindo o template de `../design/TechBluesSite.pdf` e os tokens de `docs/design-system/`.

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/ estático
```

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Telefone, e-mail, redes, números (200 projetos etc.), menu | `src/data/site.ts` |
| As 4 soluções (Automações, Integrações, SaaS, Cloud) | `src/data/solutions.ts` |
| Os 5 segmentos (dores, soluções, Zoho recomendado) | `src/data/segments.ts` |
| Catálogo e etapas de Parceiro Zoho | `src/data/zoho.ts` |
| Projetos em destaque (SindiOps) | `src/data/projects.ts` |
| Posts do blog (migrados do WordPress) | `src/content/blog/*.md` |

Para um novo segmento, solução ou produto Zoho basta adicionar um item no array: as páginas, o menu do rodapé e os links cruzados são gerados a partir deles.

## Diagnóstico (chatbot) e formulários

A chamada principal do site é **"Diagnosticar meu projeto"** (`cta` em `src/data/site.ts`). Ela leva à seção `#diagnostico`, presente em todas as páginas, e à página `/diagnostico`.

- Com `PUBLIC_TYPEBOT_ID` definido, a seção mostra o chatbot de pré-qualificação do Typebot. O roteiro das perguntas, a pontuação e o envio ao CRM estão em `docs/typebot-diagnostico.md`.
- Sem essa variável, a seção mostra o formulário simples. Ele envia um POST em JSON para `PUBLIC_LEAD_ENDPOINT` ou, se ela também estiver vazia, abre o WhatsApp com a mensagem preenchida.

Os envios vão para um fluxo do n8n que grava no Directus do AgentOS: veja `docs/n8n/README.md`. Veja também `.env.example`.

## Google Tag Manager

O container `GTM-5L7CKWGX` (`gtmId` em `src/data/site.ts`) é carregado em todas as páginas, **só no build de produção**: em `npm run dev` ele fica desligado para não sujar os dados.

O site envia estes eventos para o `dataLayer`, prontos para virar gatilhos (*Custom Event*) no GTM:

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `lead_enviado` | formulário enviado | `origem` (seção/página), `canal`: `formulario` (gravou no CRM) ou `whatsapp` (caiu no plano B) |
| `diagnostico_concluido` | o bot do Typebot chegou ao fim | `origem` |
| `newsletter_inscricao` | inscrição confirmada | `pagina` |
| `whatsapp_clique` | clique em qualquer link de WhatsApp | `pagina`, `local`: `topo`, `rodape`, `botao_flutuante` ou o id da seção |

## Deploy

Pensado para a Vercel (`vercel.json`). O arquivo já traz redirects 301 das URLs do WordPress
(`/sobre-a-techblues`, `/servicos-de-tecnologia`, `/fale-com-a-techblues` e `/<slug-do-post>` → `/blog/<slug>`) para preservar o SEO.
