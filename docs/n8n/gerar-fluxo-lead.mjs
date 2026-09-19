// Gera docs/n8n/lead-site-directus.json: workflow do n8n que recebe os leads e as
// inscrições de newsletter do site (e do bot do Typebot) e grava no AgentOS
// (Directus), usando as coleções de docs/schema-deals-contacts-directus.json:
//
//   contacts  ← pessoa (encontrada por e-mail/telefone ou criada), com nota do histórico
//   os_deals  ← oportunidade ligada ao contato (m2m os_deal_contacts)
//
// Uso: node docs/n8n/gerar-fluxo-lead.mjs
//
// Formato dos nós conferido no código do n8n (packages/nodes-base): Webhook v2,
// Code v2, If v2.2, HTTP Request v4.2 e Respond to Webhook v1.1.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const DIRECTUS_URL = 'https://techblues.integratudo.com.br';
const WEBHOOK_PATH = 'techblues-lead';
const ORIGENS_PERMITIDAS = 'https://www.techblues.com.br,https://techblues.com.br,http://localhost:4321';
const CREDENCIAL = { httpBearerAuth: { name: 'Directus AgentOS' } };

// ---------- código do nó "Normalizar" (roda dentro do n8n) ----------
const codigoNormalizar = `// ===== CONFIGURAÇÃO =====
const CONFIG = {
  directusUrl: '${DIRECTUS_URL}',
  // id (uuid) da etapa inicial em os_deal_stages, ex.: "Lead" / "Novo". Vazio = sem etapa.
  etapaInicialId: '',
  // id (uuid) do usuário responsável pelas oportunidades do site. Vazio = sem responsável.
  responsavelId: '',
  // temperaturas do diagnóstico que NÃO viram oportunidade (só contato com nota)
  semOportunidade: ['nutrir', 'descartado'],
};
// ===== FIM DA CONFIGURAÇÃO =====

const b = $input.first().json.body ?? {};
const txt = (v, max = 500) => {
  if (v === undefined || v === null) return '';
  const s = Array.isArray(v) ? v.join(', ') : String(v);
  return s.trim().slice(0, max);
};
const html = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const email = txt(b.email, 254).toLowerCase();
const emailValido = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
const telefone = txt(b.telefone || b.whatsapp, 40);
const tipo = b.origem === 'newsletter' ? 'newsletter' : 'lead';
// O bot do Typebot envia pontuação/temperatura; o formulário do site não
const veioDoBot = b.temperatura !== undefined || b.score !== undefined;
const temperatura = txt(b.temperatura, 30);

const erros = [];
if (txt(b.website)) erros.push('spam'); // campo-armadilha: humanos não preenchem
if (tipo === 'newsletter' && !emailValido) erros.push('e-mail inválido');
if (tipo === 'lead') {
  if (!txt(b.nome)) erros.push('nome obrigatório');
  if (!emailValido && !telefone) erros.push('informe e-mail ou telefone');
}

// ----- contato -----
const [primeiroNome, ...resto] = txt(b.nome, 150).split(/\\s+/).filter(Boolean);
const contato = { status: 'active' };
if (primeiroNome) contato.first_name = primeiroNome;
if (resto.length) contato.last_name = resto.join(' ');
if (emailValido) contato.email = email;
if (telefone) contato.phone = telefone;
if (txt(b.papel)) contato.job_title = txt(b.papel, 120);

// Busca o contato existente pelo e-mail; sem e-mail, pelo telefone
const filtroBusca = JSON.stringify(emailValido ? { email: { _eq: email } } : { phone: { _eq: telefone } });

// ----- respostas em formato de tabela para as notas -----
const agora = new Date();
const dataBR = agora.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
const campos = [
  ['Empresa', b.empresa], ['Segmento', b.segmento], ['Interesse', b.interesse], ['Papel', b.papel], ['Porte', b.porte],
  ['Desafios', b.desafio], ['Descrição', b.descricao], ['Mensagem', b.mensagem], ['Prazo', b.prazo],
  ['Investimento', b.investimento], ['Pontuação', b.score], ['Temperatura', temperatura],
  ['Triagem da I.A', b.ia_fit], ['Frente sugerida', b.ia_categoria], ['Resumo da I.A', b.ia_resumo],
  ['E-mail', emailValido ? email : ''], ['Telefone', telefone],
  ['Página', b.pagina], ['Origem', b.origem], ['UTM', [b.utm_source, b.utm_medium, b.utm_campaign].filter((x) => txt(x)).join(' / ')],
].filter(([, v]) => txt(v, 5000));
const tabela = '<ul>' + campos.map(([k, v]) => '<li><strong>' + k + ':</strong> ' + html(txt(v, 5000)) + '</li>').join('') + '</ul>';

const fonte = tipo === 'newsletter' ? 'newsletter do site' : veioDoBot ? 'diagnóstico do site (chatbot)' : 'formulário do site';
const notaContato = tipo === 'newsletter'
  ? '<p><strong>' + dataBR + '</strong> · Inscreveu-se na newsletter (' + html(txt(b.pagina, 300) || 'site') + ').</p>'
  : '<p><strong>' + dataBR + '</strong> · Contato pelo ' + fonte + '.</p>' + tabela;

// ----- oportunidade -----
const criarOportunidade = tipo === 'lead' && !CONFIG.semOportunidade.includes(temperatura);
const assunto = txt(b.ia_categoria) || txt(b.interesse) || txt(b.segmento) || 'Site';
const quem = txt(b.empresa, 120) || txt(b.nome, 120);
const proximoContato = new Date(agora.getTime() + (temperatura === 'quente' ? 0 : 24 * 60 * 60 * 1000));
const oportunidade = {
  name: (quem + ' · ' + assunto).slice(0, 250),
  description: txt(b.ia_resumo || b.descricao || b.mensagem, 1000) || 'Contato pelo ' + fonte + '.',
  deal_notes: '<p><strong>' + dataBR + '</strong> · Oportunidade criada pelo ' + fonte + (temperatura ? ' · temperatura <strong>' + html(temperatura) + '</strong>' : '') + '.</p>' + tabela,
  next_contact_date: proximoContato.toISOString(),
};
if (CONFIG.etapaInicialId) oportunidade.deal_stage = CONFIG.etapaInicialId;
if (CONFIG.responsavelId) oportunidade.owner = CONFIG.responsavelId;

return [{
  json: {
    tipo,
    valido: erros.length === 0,
    erro: erros.join('; '),
    config: CONFIG,
    filtroBusca,
    contato,
    notaContato,
    criarOportunidade,
    oportunidade,
  },
}];`;

// ---------- montagem ----------
const nodes = [];
const connections = {};
const add = (node) => {
  nodes.push({ id: randomUUID(), ...node });
  return node.name;
};
const connect = (from, to, output = 0) => {
  connections[from] ??= { main: [] };
  while (connections[from].main.length <= output) connections[from].main.push([]);
  connections[from].main[output].push({ node: to, type: 'main', index: 0 });
};
const ifNode = (name, x, y, leftValue, operator, rightValue = '') =>
  add({
    name,
    type: 'n8n-nodes-base.if',
    typeVersion: 2.2,
    position: [x, y],
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [{ id: randomUUID(), leftValue, rightValue, operator }],
        combinator: 'and',
      },
      options: {},
    },
  });
const responder = (name, x, y, code, body) =>
  add({
    name,
    type: 'n8n-nodes-base.respondToWebhook',
    typeVersion: 1.1,
    position: [x, y],
    parameters: { respondWith: 'json', responseBody: body, options: { responseCode: code } },
  });
/** Requisição ao Directus. Erros saem pela segunda saída (onError). */
const directus = (name, x, y, { method, url, query, body }) =>
  add({
    name,
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.2,
    position: [x, y],
    onError: 'continueErrorOutput',
    credentials: CREDENCIAL,
    parameters: {
      method,
      url,
      authentication: 'genericCredentialType',
      genericAuthType: 'httpBearerAuth',
      ...(query ? { sendQuery: true, queryParameters: { parameters: query } } : {}),
      ...(body ? { sendBody: true, specifyBody: 'json', jsonBody: body } : {}),
      options: {},
    },
  });

const N = "$('Normalizar').item.json";
const BASE = `{{ ${N}.config.directusUrl }}`;

const webhook = add({
  name: 'Site: lead e newsletter',
  type: 'n8n-nodes-base.webhook',
  typeVersion: 2,
  position: [0, 300],
  webhookId: randomUUID(),
  parameters: {
    httpMethod: 'POST',
    path: WEBHOOK_PATH,
    responseMode: 'responseNode',
    options: { allowedOrigins: ORIGENS_PERMITIDAS },
  },
});
const normalizar = add({
  name: 'Normalizar',
  type: 'n8n-nodes-base.code',
  typeVersion: 2,
  position: [220, 300],
  parameters: { jsCode: codigoNormalizar },
});
const valido = ifNode('Dados válidos?', 440, 300, '={{ $json.valido }}', { type: 'boolean', operation: 'true', singleValue: true });
const invalido = responder('Responder 400', 660, 520, 400, '={{ { "ok": false, "erro": $json.erro } }}');

const buscar = directus('Buscar contato', 660, 300, {
  method: 'GET',
  url: `=${BASE}/items/contacts`,
  query: [
    { name: 'filter', value: '={{ $json.filtroBusca }}' },
    { name: 'fields', value: 'id,contact_notes' },
    { name: 'limit', value: '1' },
  ],
});
const existe = ifNode('Contato existe?', 880, 300, '={{ ($json.data ?? []).length }}', { type: 'number', operation: 'gt' }, 0);

const atualizar = directus('Anotar no contato existente', 1100, 180, {
  method: 'PATCH',
  url: `=${BASE}/items/contacts/{{ $json.data[0].id }}`,
  body: `={{ JSON.stringify({ contact_notes: ($json.data[0].contact_notes || '') + ${N}.notaContato }) }}`,
});
const criarContato = directus('Criar contato', 1100, 420, {
  method: 'POST',
  url: `=${BASE}/items/contacts`,
  body: `={{ JSON.stringify({ ...${N}.contato, contact_notes: ${N}.notaContato }) }}`,
});

const precisaDeal = ifNode('Criar oportunidade?', 1320, 300, `={{ ${N}.criarOportunidade }}`, { type: 'boolean', operation: 'true', singleValue: true });
const criarDeal = directus('Criar oportunidade', 1540, 220, {
  method: 'POST',
  url: `=${BASE}/items/os_deals`,
  // o contato entra pela relação m2m "contacts" (tabela os_deal_contacts)
  body: `={{ JSON.stringify({ ...${N}.oportunidade, contacts: [{ contacts_id: $json.data.id }] }) }}`,
});

const ok = responder('Responder 200', 1760, 300, 200, '{\n  "ok": true\n}');
const falha = responder('Responder 502', 1760, 560, 502, '{\n  "ok": false,\n  "erro": "falha ao salvar no CRM"\n}');

connect(webhook, normalizar);
connect(normalizar, valido);
connect(valido, buscar, 0);
connect(valido, invalido, 1);
connect(buscar, existe, 0);
connect(buscar, falha, 1);
connect(existe, atualizar, 0);
connect(existe, criarContato, 1);
connect(atualizar, precisaDeal, 0);
connect(atualizar, falha, 1);
connect(criarContato, precisaDeal, 0);
connect(criarContato, falha, 1);
connect(precisaDeal, criarDeal, 0);
connect(precisaDeal, ok, 1);
connect(criarDeal, ok, 0);
connect(criarDeal, falha, 1);

const workflow = {
  name: 'Tech Blues: leads do site → AgentOS (Directus)',
  nodes,
  connections,
  active: false,
  settings: { executionOrder: 'v1' },
  pinData: {},
  meta: { templateCredsSetupCompleted: false },
  tags: [],
};

// ---------- validação ----------
const nomes = new Set(nodes.map((n) => n.name));
const erros = [];
for (const [from, { main }] of Object.entries(connections)) {
  if (!nomes.has(from)) erros.push(`conexão parte de nó inexistente: ${from}`);
  for (const out of main) for (const c of out) if (!nomes.has(c.node)) erros.push(`conexão aponta para nó inexistente: ${c.node}`);
}
for (const n of nodes) {
  if (n.type.endsWith('webhook') && n.type !== 'n8n-nodes-base.respondToWebhook') continue;
  const recebe = Object.values(connections).some(({ main }) => main.some((o) => o.some((c) => c.node === n.name)));
  if (!recebe) erros.push(`${n.name} nunca é alcançado`);
}
try {
  new Function('$input', codigoNormalizar);
} catch (e) {
  erros.push(`código do nó Normalizar inválido: ${e.message}`);
}
if (erros.length) {
  console.error(erros.join('\n'));
  process.exit(1);
}

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), 'lead-site-directus.json');
fs.writeFileSync(out, JSON.stringify(workflow, null, 2) + '\n');
console.log(`ok: ${nodes.length} nós → ${path.relative(process.cwd(), out)}`);
