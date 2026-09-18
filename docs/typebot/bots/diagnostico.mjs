// Bot "Diagnóstico do projeto": pré-qualificação de leads com pontuação e I.A.
// Roteiro em docs/typebot-diagnostico.md.
//
// Gerar:  node docs/typebot/bots/diagnostico.mjs
// Saída:  docs/typebot/tech-blues-diagnostico.json (importar no Typebot)
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createBot, configuracoesPadrao } from '../lib/typebot-builder.mjs';

const SITE = 'https://www.techblues.solutions';
const WHATSAPP = 'https://wa.me/5521986304148?text=' + encodeURIComponent('Olá! Acabei de fazer o diagnóstico no site da Tech Blues.');
// Substitua pela sua página do Zoho Bookings (ou outro agendador)
const AGENDA_URL = 'https://bookings.zoho.com/SUBSTITUIR-PELO-SEU-LINK';
// Substitua pelo webhook do n8n / Zoho CRM que recebe o lead
const WEBHOOK_URL = 'https://SEU-N8N.exemplo.com/webhook/diagnostico-techblues';
const MODEL = 'gpt-4o-mini';

const bot = createBot({
  name: 'Tech Blues: diagnóstico do projeto',
  icon: '🧭',
  variables: [
    // enviadas pelo site (prefilledVariables)
    'origem', 'segmento', 'pagina', 'utm_source', 'utm_medium', 'utm_campaign',
    // respostas
    'nome', 'papel', 'porte', 'desafio', 'desafio_txt', 'descricao', 'prazo', 'investimento', 'empresa', 'whatsapp', 'email',
    // pontuação
    'score', 'pts', 'temperatura',
    // I.A
    'ia_fit', 'ia_categoria', 'ia_resumo', 'ia_recomendacao',
  ],
  settings: configuracoesPadrao({
    title: 'Diagnóstico do projeto | Tech Blues',
    description: 'Responda algumas perguntas rápidas e fale com um especialista da Tech Blues.',
  }),
});
const { a, bold, text, textInput, emailInput, phoneInput, choice, setVar, addPoints, cmp, condition, openaiChat, openaiExtract, httpRequest, group, then, itemTo } = bot;

// ---------- finais (criados primeiro para poderem ser referenciados) ----------
const gCrm = group('Enviar para o CRM', 4200, 400, [
  httpRequest({
    url: WEBHOOK_URL,
    body: {
      nome: '{{nome}}', empresa: '{{empresa}}', email: '{{email}}', whatsapp: '{{whatsapp}}',
      segmento: '{{segmento}}', papel: '{{papel}}', porte: '{{porte}}', desafio: '{{desafio_txt}}', descricao: '{{descricao}}',
      prazo: '{{prazo}}', investimento: '{{investimento}}', score: '{{score}}', temperatura: '{{temperatura}}',
      ia_fit: '{{ia_fit}}', ia_categoria: '{{ia_categoria}}', ia_resumo: '{{ia_resumo}}',
      origem: '{{origem}}', pagina: '{{pagina}}', utm_source: '{{utm_source}}', utm_medium: '{{utm_medium}}', utm_campaign: '{{utm_campaign}}',
    },
  }),
  text('Obrigado, {{nome}}! Até logo. 👋'),
]);

const gQuenteFim = then(group('Quente: agendar', 3850, 100, [
  text(
    ['Seu projeto tem tudo a ver com o que fazemos. ', bold('Escolha um horário com um especialista:')],
    [a('📅 Agendar conversa', AGENDA_URL)],
    ['Se preferir, chame direto no WhatsApp: ', a('falar com um especialista', WHATSAPP)],
  ),
]), gCrm);

const gQuenteIa = then(group('Quente: recomendação da I.A', 3500, -80, [text('{{ia_recomendacao}}')]), gQuenteFim);

const gQuente = then(group('Quente', 3150, 100, [
  setVar('temperatura', '"quente"'),
  openaiChat({
    model: MODEL,
    temperature: 0.6,
    system: [
      'Você é consultor da Tech Blues, empresa de transformação digital e Inteligência Artificial para escritórios de advocacia, síndicos profissionais, contabilidades, engenharia e fornecedores do mercado condominial. Frentes: automações com I.A, integrações de sistemas, plataformas SaaS, infraestrutura cloud e parceria Zoho. Produto próprio: SindiOps (I.A para síndicos, com contratos, orçamentos e consulta à convenção).',
      'Escreva uma mensagem curta (2 a 3 frases, no máximo 60 palavras) em português do Brasil, tratando a pessoa pelo nome, mostrando que entendeu o desafio e indicando qual frente da Tech Blues resolve isso. Termine dizendo que um especialista vai aprofundar na conversa.',
      'Regras: não cite preços, prazos nem promessas de resultado; não use jargão técnico; não faça perguntas; não use listas nem emojis.',
    ].join('\n\n'),
    user: 'Nome: {{nome}}\nSegmento: {{segmento}}\nPapel: {{papel}}\nPorte: {{porte}}\nDesafios: {{desafio_txt}}\nDescrição do lead: "{{descricao}}"\nCategoria sugerida pela triagem: {{ia_categoria}}',
    saveTo: 'ia_recomendacao',
  }),
  // Se a I.A falhar, a variável fica vazia e o fluxo segue direto para o agendamento
  condition([{ comparisons: [cmp('ia_recomendacao', 'Is set')], to: gQuenteIa }]),
]), gQuenteFim);

const gMorno = then(group('Morno', 3150, 450, [
  setVar('temperatura', '"morno"'),
  text(
    'Obrigado, {{nome}}! Um especialista da Tech Blues em {{segmento}} vai analisar suas respostas e falar com você pelo WhatsApp.',
    ['Enquanto isso, se quiser adiantar a conversa: ', a('chamar no WhatsApp', WHATSAPP)],
  ),
]), gCrm);

const gNutrirFim = then(group('Nutrir: conteúdos', 3850, 800, [
  text(
    'Separei alguns conteúdos que ajudam a organizar as ideias:',
    [a('5 passos para começar a usar I.A generativa no seu negócio', `${SITE}/blog/5-passos-para-comecar-a-usar-a-i-a-generativa-no-seu-negocio`)],
    [a('BPA: automação de processos de negócio e seus benefícios', `${SITE}/blog/bpa-automacao-de-processos-de-negocios`)],
    [a('A importância da integração de dados para sua empresa', `${SITE}/blog/a-importancia-da-integracao-de-dados-para-sua-empresa`)],
    ['Todos os artigos ficam em ', a('techblues.solutions/blog', `${SITE}/blog`), '. Quando o projeto amadurecer, é só voltar aqui.'],
  ),
]), gCrm);

const gNutrirEmail = then(group('Nutrir: pedir e-mail', 3500, 950, [
  text('Se quiser receber nossos conteúdos sobre automação e I.A, deixe seu e-mail:'),
  emailInput('email'),
]), gNutrirFim);

const gNutrir = then(group('Nutrir', 3150, 800, [
  setVar('temperatura', '"nutrir"'),
  text('Sem problema, {{nome}}. Pesquisar antes é o caminho certo.'),
  condition([{ comparisons: [cmp('email', 'Is empty')], to: gNutrirEmail }]),
]), gNutrirFim);

const gDesvio = then(group('Fora do perfil', 2500, 1100, [
  setVar('temperatura', '"descartado"'),
  text(
    'Obrigado pelo contato, {{nome}}! Este canal é para empresas que querem um projeto de tecnologia com a Tech Blues.',
    'Para outros assuntos (parcerias, fornecedores, currículos), escreva para falecom@techblues.solutions.',
  ),
]), gCrm);

// ---------- fluxo principal (de trás para a frente, para cada grupo já conhecer o próximo) ----------
const gClassificacao = then(group('Classificação', 2800, 400, [
  condition([
    { comparisons: [cmp('score', 'Greater or equal to', '9')], to: gQuente },
    { comparisons: [cmp('score', 'Greater or equal to', '5')], to: gMorno },
  ]),
]), gNutrir);

const gContato = then(group('8. Contato', 2450, 400, [
  text('Perfeito, {{nome}}. Para o especialista falar com você: qual é o nome da empresa?'),
  textInput('empresa', { placeholder: 'Nome da empresa' }),
  text('Seu WhatsApp:'),
  phoneInput('whatsapp'),
  text('E o seu e-mail:'),
  emailInput('email'),
]), gClassificacao);

const investTable = { 'Até R$ 5 mil': 1, 'R$ 5 mil a R$ 20 mil': 2, 'R$ 20 mil a R$ 50 mil': 3, 'Acima de R$ 50 mil': 3, 'Ainda não sei': 1 };
const gInvest = then(group('7a. Investimento', 2100, 250, [
  text('Para te indicar o caminho certo: já existe uma faixa de investimento prevista para o projeto?'),
  choice('investimento', Object.keys(investTable)),
  ...addPoints('investimento', investTable),
]), gContato);

const zohoTable = { '1 a 5 usuários': 1, '6 a 20 usuários': 2, '21 a 50 usuários': 3, 'Mais de 50 usuários': 3 };
const gInvestZoho = then(group('7b. Usuários Zoho', 2100, 600, [
  text('Quantas pessoas vão usar o Zoho?'),
  choice('investimento', Object.keys(zohoTable)),
  ...addPoints('investimento', zohoTable),
]), gContato);

const gInvestRota = then(group('7. Investimento (rota)', 1800, 400, [
  condition([{ comparisons: [cmp('segmento', 'Contains', 'Zoho')], to: gInvestZoho }]),
]), gInvest);

const prazoTable = { 'O quanto antes (até 30 dias)': 3, 'Em 1 a 3 meses': 2, 'Em 3 a 6 meses': 1, 'Só estou pesquisando': 0 };
const prazoChoice = choice('prazo', Object.keys(prazoTable));
const gPrazo = then(group('6. Prazo', 1450, 400, [
  text('Para quando você precisa disso funcionando?'),
  prazoChoice,
  ...addPoints('prazo', prazoTable),
]), gInvestRota);
itemTo(prazoChoice, 'Só estou pesquisando', gNutrir);

const gTriagem = then(group('5. Triagem com I.A', 1100, 400, [
  // múltipla escolha vira lista; o texto é mais fácil de usar no prompt e no CRM
  setVar('desafio_txt', 'Array.isArray({{desafio}}) ? {{desafio}}.join(", ") : ({{desafio}} ?? "")'),
  openaiExtract({
    model: MODEL,
    prompt: [
      'Você faz a triagem de contatos do site da Tech Blues, empresa de transformação digital e Inteligência Artificial (automações com I.A, integrações de sistemas, plataformas SaaS, infraestrutura cloud e parceria Zoho) para escritórios de advocacia, síndicos profissionais, contabilidades, engenharia e fornecedores do mercado condominial.',
      'Dados informados pelo contato:',
      'Nome: {{nome}}\nSegmento: {{segmento}}\nPapel na empresa: {{papel}}\nPorte: {{porte}}\nDesafios marcados: {{desafio_txt}}\nDescrição em texto livre: "{{descricao}}"',
      'Classifique o contato e resuma a necessidade. Considere "cliente_potencial" quem descreve um problema de operação ou um projeto de tecnologia para a própria empresa. Considere "fornecedor_vendendo" quem quer vender algo para a Tech Blues, "candidato_emprego" quem procura vaga ou estágio, "estudante_curioso" quem só quer aprender e "sem_sentido" quando o texto for vazio, aleatório ou ofensivo.',
    ].join('\n\n'),
    extract: [
      { variable: 'ia_fit', type: 'enum', values: ['cliente_potencial', 'fornecedor_vendendo', 'candidato_emprego', 'estudante_curioso', 'sem_sentido'], description: 'Tipo de contato' },
      { variable: 'ia_categoria', type: 'enum', values: ['Automações com I.A', 'Integrações de sistemas', 'Plataformas SaaS', 'Infraestrutura Cloud', 'Zoho', 'SindiOps', 'Indefinido'], description: 'Frente da Tech Blues que melhor resolve o desafio descrito' },
      { variable: 'ia_resumo', type: 'string', description: 'Resumo de uma frase, em português do Brasil, do que o contato precisa, escrito para o vendedor ler antes da reunião' },
    ],
  }),
  // Se a I.A falhar, ia_fit fica vazia e o lead segue o fluxo normal
  condition([{
    logicalOperator: 'OR',
    comparisons: [cmp('ia_fit', 'Equal to', 'fornecedor_vendendo'), cmp('ia_fit', 'Equal to', 'candidato_emprego'), cmp('ia_fit', 'Equal to', 'sem_sentido')],
    to: gDesvio,
  }]),
]), gPrazo);

const gDesafio = then(group('4. Desafio', 750, 400, [
  text('O que você mais precisa resolver agora? Pode marcar mais de uma opção.'),
  choice('desafio', [
    'Atendimento e WhatsApp sobrecarregados',
    'Tarefas manuais e retrabalho',
    'Sistemas que não conversam entre si',
    'Criar uma plataforma / produto digital',
    'Nuvem, servidores e segurança',
    'Licenças e implantação Zoho',
    'Usar I.A no dia a dia do negócio',
  ], { multiple: true }),
  setVar('score', '{{score}} + 2'),
  text('Em uma ou duas frases: o que acontece hoje que você quer mudar?'),
  textInput('descricao', { placeholder: 'Ex.: perdemos prazos de renovação de contrato porque tudo está no e-mail…', isLong: true }),
]), gTriagem);

const porteTable = { 'Só eu': 0, '2 a 10': 1, '11 a 50': 2, 'Mais de 50': 3 };
const gPorte = then(group('3a. Porte (pessoas)', 400, 250, [
  text('Quantas pessoas trabalham na operação hoje?'),
  choice('porte', Object.keys(porteTable)),
  ...addPoints('porte', porteTable),
]), gDesafio);

const condTable = { '1 a 3 condomínios': 0, '4 a 10 condomínios': 1, '11 a 30 condomínios': 2, 'Mais de 30 condomínios': 3 };
const gPorteSindico = then(group('3b. Porte (condomínios)', 400, 600, [
  text('Quantos condomínios você administra hoje?'),
  choice('porte', Object.keys(condTable)),
  ...addPoints('porte', condTable),
]), gDesafio);

const gPorteRota = then(group('3. Porte (rota)', 100, 400, [
  // "índico" casa com "Síndico profissional / administradora" (botão) e "Síndicos Profissionais" (site)
  condition([{ comparisons: [cmp('segmento', 'Contains', 'índico')], to: gPorteSindico }]),
]), gPorte);

const papelTable = { 'Sócio / dono / síndico responsável': 3, 'Gestor da área': 2, 'Colaborador levantando opções': 1 };
const papelChoice = choice('papel', [...Object.keys(papelTable), 'Estudante / pesquisa']);
const gPapel = then(group('2. Papel na decisão', -250, 400, [
  text('E qual é o seu papel na empresa?'),
  papelChoice,
  ...addPoints('papel', papelTable),
]), gPorteRota);
itemTo(papelChoice, 'Estudante / pesquisa', gNutrir);

const gSegmento = then(group('1. Segmento', -600, 550, [
  text('Prazer, {{nome}}! Qual destas opções descreve melhor o seu negócio?'),
  choice('segmento', [
    'Escritório de advocacia',
    'Síndico profissional / administradora',
    'Contabilidade',
    'Engenharia / construção',
    'Fornecedor para condomínios',
    'Outro',
  ]),
]), gPapel);

// O site já envia `segmento` nas páginas de segmento: nesse caso a pergunta é pulada
const gSegmentoRota = then(group('1. Segmento (rota)', -950, 400, [
  condition([{ comparisons: [cmp('segmento', 'Is set')], to: gPapel }]),
]), gSegmento);

const gInicio = then(group('0. Boas-vindas', -1300, 400, [
  setVar('score', '0'),
  text(
    'Oi! Sou o assistente da Tech Blues. 👋',
    'Vou te fazer algumas perguntas rápidas para o especialista certo já chegar sabendo do seu contexto. Leva uns 2 minutos.',
    'Como posso te chamar?',
  ),
  textInput('nome', { placeholder: 'Seu nome' }),
]), gSegmentoRota);

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'tech-blues-diagnostico.json');
bot.write(out, { start: gInicio, finals: [gCrm] });
