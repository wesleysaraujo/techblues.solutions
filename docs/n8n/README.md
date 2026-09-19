# n8n: leads do site → AgentOS (Directus)

Um único webhook recebe tudo o que o site envia e grava no AgentOS (`https://techblues.integratudo.com.br`), nas coleções descritas em `docs/schema-deals-contacts-directus.json`:

- o **formulário de contato/diagnóstico** (todas as páginas);
- o **bot do Typebot** (bloco final do `docs/typebot`);
- a **newsletter**.

```
Webhook → Normalizar → Dados válidos? ─não→ 400
                            │sim
                     Buscar contato (e-mail, ou telefone)
                   existe ┌──────┴──────┐ não existe
     Anotar no contato existente      Criar contato
                          └──────┬──────┘
                       Criar oportunidade?
                      sim ┌──────┴──────┐ não
            Criar oportunidade → 200    200
      (qualquer erro do Directus → 502)
```

| Envio | Contato (`contacts`) | Oportunidade (`os_deals`) |
| --- | --- | --- |
| Formulário do site | encontra ou cria, com nota | **cria**, ligada ao contato |
| Bot: temperatura quente ou morna | encontra ou cria, com nota | **cria**, com próximo contato hoje (quente) ou amanhã (morno) |
| Bot: nutrir ou descartado | encontra ou cria, com nota | não cria |
| Newsletter | encontra ou cria, com nota "inscreveu-se na newsletter" | não cria |

Assim o funil comercial recebe só quem tem chance real de fechar, e ninguém se perde: todo mundo fica como contato, com o histórico nas notas.

| Arquivo | Para quê |
| --- | --- |
| `lead-site-directus.json` | Workflow pronto para importar no n8n |
| `gerar-fluxo-lead.mjs` | Gera o JSON acima (edite aqui e rode de novo) |
| `verificar-permissoes.mjs` | Confere se o token do n8n tem as permissões necessárias (só leitura) |

## Instalação

### 1. Permissões do usuário de integração no Directus

O token do `.env` (`DIRECTUS_KEY`) pertence a um usuário que **ainda não tem nenhuma permissão**. No Directus: *Settings → Access Policies* (ou *Roles*, conforme a versão), abra a política desse usuário e libere:

| Coleção | Ação | Campos | Para quê |
| --- | --- | --- | --- |
| `contacts` | Read | `id`, `email`, `phone`, `contact_notes` | encontrar o contato e receber o id do contato criado |
| `contacts` | Create | `first_name`, `last_name`, `email`, `phone`, `job_title`, `status`, `contact_notes` | criar o contato |
| `contacts` | Update | `contact_notes` | acrescentar a nota em quem já existe |
| `os_deals` | Create | `name`, `description`, `deal_notes`, `next_contact_date`, `deal_stage`, `owner`, `contacts` | criar a oportunidade |
| `os_deal_contacts` | Create | `os_deals_id`, `contacts_id` | ligar a oportunidade ao contato |
| `os_deal_stages` | Read (opcional) | todos | consultar o id da etapa inicial |

Não libere *delete* nem leitura de outras coleções. Depois confira:

```bash
node --env-file=.env docs/n8n/verificar-permissoes.mjs
```

### 2. Configurar o nó Normalizar

No topo do código do nó **Normalizar** (ou em `gerar-fluxo-lead.mjs`, antes de gerar):

- `etapaInicialId`: o id (uuid) da etapa de `os_deal_stages` onde as oportunidades do site devem entrar, ex.: "Lead" ou "Novo". Vazio = sem etapa.
- `responsavelId`: o id do usuário do Directus responsável pelas oportunidades do site. Vazio = sem responsável.
- `semOportunidade`: temperaturas do bot que não viram oportunidade (padrão: `nutrir` e `descartado`).

### 3. Importar no n8n

1. **Workflows → Import from File** → `lead-site-directus.json`.
2. Crie a credencial **Bearer Auth** com o nome `Directus AgentOS` e o valor de `DIRECTUS_KEY`. Selecione-a nos quatro nós HTTP.
3. Ative o workflow e copie a **Production URL** do nó Webhook (termina em `/webhook/techblues-lead`).

### 4. Ligar o site e o bot

- Na Vercel, defina `PUBLIC_LEAD_ENDPOINT` com a Production URL e faça um novo deploy. O site não precisa da `DIRECTUS_KEY`: ela é só do n8n.
- No bot do Typebot, use a mesma URL em `WEBHOOK_URL` (`docs/typebot/bots/diagnostico.mjs`) e gere o JSON de novo.

## O que o fluxo faz com os dados

- **Validação:** lead precisa de nome e de e-mail ou telefone; newsletter precisa de e-mail válido. Envios com o campo-armadilha (`website`) preenchido são recusados como spam.
- **Contato:** o nome é dividido em `first_name` e `last_name`; o papel informado no bot vai para `job_title`. A busca é pelo e-mail; sem e-mail, pelo telefone. Contato que já existe não tem dados sobrescritos, só ganha uma nota nova no fim de `contact_notes`.
- **Oportunidade:** `name` = empresa (ou nome) · frente sugerida pela I.A (ou interesse/segmento); `description` = resumo da I.A ou a mensagem; `deal_notes` = todas as respostas, página, origem e UTMs.
- **Segurança do HTML:** os textos enviados pelo visitante são escapados antes de entrar nas notas (que são HTML no Directus).
- **Respostas:** 200 quando grava, 400 quando o dado é inválido e 502 quando o Directus falha. O site usa isso: se não receber 200, o formulário abre o WhatsApp como plano B.

## Segurança

- **CORS:** o webhook só aceita chamadas do navegador vindas de `techblues.solutions` e de `localhost:4321` (opção *Allowed Origins* do nó Webhook).
- **Permissões mínimas:** o token do n8n só consegue ler contatos, criar contatos e oportunidades e acrescentar notas. Nunca apaga nada.
- **Nenhum segredo no site:** o site só conhece a URL do webhook. O token do Directus fica nas credenciais do n8n (e no `.env` local, que está no `.gitignore`).
- **Oportunidades repetidas:** cada envio do formulário cria uma oportunidade nova. Se a mesma pessoa enviar duas vezes, o comercial vê as duas no mesmo contato e pode mesclar.
