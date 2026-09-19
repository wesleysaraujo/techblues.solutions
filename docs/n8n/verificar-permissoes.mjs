// Confere se o token usado pelo n8n tem as permissões que o fluxo de leads precisa
// no AgentOS (Directus). Só faz leitura: não grava nada.
//
// Uso (na pasta do site, com DIRECTUS_KEY no .env):
//   node --env-file=.env docs/n8n/verificar-permissoes.mjs
const URL_BASE = (process.env.DIRECTUS_URL || 'https://techblues.integratudo.com.br').replace(/\/$/, '');
const TOKEN = process.env.DIRECTUS_KEY || process.env.DIRECTUS_TOKEN;
if (!TOKEN) {
  console.error('Defina DIRECTUS_KEY no .env (token estático do usuário de integração).');
  process.exit(1);
}

// coleção → ações exigidas (e para quê)
const EXIGIDAS = {
  contacts: {
    read: 'encontrar o contato pelo e-mail/telefone e receber o id do contato criado',
    create: 'criar o contato de quem ainda não está no CRM',
    update: 'acrescentar a nota do novo contato em quem já existe (campo contact_notes)',
  },
  os_deals: { create: 'criar a oportunidade' },
  os_deal_contacts: { create: 'ligar a oportunidade ao contato (relação m2m)' },
};
const OPCIONAIS = {
  os_deal_stages: { read: 'consultar o id da etapa inicial (só para configurar)' },
};

const res = await fetch(`${URL_BASE}/permissions/me`, { headers: { Authorization: `Bearer ${TOKEN}` } });
if (res.status === 401) {
  console.error('Token inválido ou expirado.');
  process.exit(1);
}
const { data = {} } = await res.json();
const tem = (col, acao) => {
  const p = data[col]?.[acao];
  return p && p.access && p.access !== 'none' ? p.access : null;
};

let faltando = 0;
const checar = (grupo, obrigatorio) => {
  for (const [col, acoes] of Object.entries(grupo)) {
    for (const [acao, motivo] of Object.entries(acoes)) {
      const acesso = tem(col, acao);
      if (!acesso && obrigatorio) faltando++;
      const marca = acesso ? '✔' : obrigatorio ? '✘' : '·';
      console.log(`${marca} ${col}.${acao}${acesso && acesso !== 'full' ? ` (${acesso})` : ''}${acesso ? '' : ` → falta: ${motivo}`}`);
    }
  }
};
console.log(`Permissões do token em ${URL_BASE}\n`);
checar(EXIGIDAS, true);
checar(OPCIONAIS, false);
console.log(faltando ? `\n${faltando} permissão(ões) obrigatória(s) faltando. Veja docs/n8n/README.md.` : '\nTudo certo para o fluxo de leads.');
process.exit(faltando ? 1 : 0);
