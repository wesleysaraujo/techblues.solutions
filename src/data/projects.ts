export type Project = {
  slug: string;
  name: string;
  logo: string;
  kind: string;
  status: string;
  url: string;
  /** Rótulo do botão que leva ao produto */
  urlLabel: string;
  /** A categoria do sistema, em duas ou três palavras. Aparece como selo e no <title> */
  category: string;
  headline: string;
  summary: string;
  /** Parágrafo de origem, na página do projeto */
  origin: string;
  audience: string[];
  /** Capa. Sem ela, o card e a página usam o painel tipográfico da marca */
  cover?: string;
  seoTitle: string;
  /** Ciclo do produto: as etapas que ele cobre, na ordem */
  flow?: { title: string; text: string; done?: boolean }[];
  flowTitle?: string;
  flowEyebrow?: string;
  flowNote?: string;
  featuresTitle: string;
  featuresEyebrow: string;
  features: { icon: string; title: string; text: string; image?: string }[];
  principlesTitle: string;
  principles: { title: string; text: string }[];
  /** Ressalva abaixo dos princípios */
  note?: string;
  services: string[];
  cta: {
    eyebrow: string;
    title: string;
    source: string;
    segment: string;
    interests: string[];
  };
};

export const projects: Project[] = [
  {
    slug: 'sindiops',
    name: 'SindiOps',
    logo: '/img/sindiops/logo.svg',
    kind: 'Startup incubada pela Tech Blues',
    status: 'Acesso antecipado',
    url: 'https://www.sindiops.com.br',
    urlLabel: 'Quero acesso antecipado',
    category: 'I.A para gestão condominial',
    headline: 'O dinheiro do condomínio sai todo mês. Você consegue justificar cada saída?',
    summary:
      'Plataforma com Inteligência Artificial que ajuda síndicos profissionais a fundamentar cada decisão do condomínio: contratos, orçamentos e consultas à convenção, sempre com a fonte documentada.',
    origin:
      'O SindiOps nasceu dentro da Tech Blues, da convivência com síndicos profissionais que administram vários condomínios e precisam prestar contas de cada decisão. É incubado pela empresa, que cuida de produto, engenharia, I.A e infraestrutura.',
    audience: ['Síndicos profissionais', 'Síndicos moradores', 'Conselhos', 'Administradoras'],
    cover: '/img/sindiops/01-painel.jpg',
    seoTitle: 'SindiOps: I.A para síndicos profissionais',
    featuresEyebrow: 'Funcionalidades',
    featuresTitle: 'Três rotinas do síndico, resolvidas com fonte',
    features: [
      {
        icon: 'FileText',
        title: 'Gestão de contratos',
        text: 'Leitura automática de objeto, valor, vigência, aviso prévio e índice. Alertas 60, 30 e 7 dias antes do vencimento, conferência de reajuste com índices oficiais e carta de não renovação pronta.',
        image: '/img/sindiops/03-contratos.jpg',
      },
      {
        icon: 'ChartColumn',
        title: 'Comparação de orçamentos',
        text: 'Critérios e pesos definidos antes das propostas chegarem, edital em PDF, leitura das propostas com valores rastreáveis e parecer com os prós e contras de cada escolha.',
        image: '/img/sindiops/07-comparativo.jpg',
      },
      {
        icon: 'FileSearch',
        title: 'Consulta à convenção e atas',
        text: 'Pergunte em português e receba a resposta com artigo, parágrafo, página e trecho. Quando o documento não prevê, a resposta é "não encontrei", nunca um palpite.',
        image: '/img/sindiops/02-consulta.jpg',
      },
    ],
    principlesTitle: 'I.A que apoia a decisão, sem inventar',
    principles: [
      { title: 'Sempre com a fonte', text: 'Cada número e cada cláusula citada aponta para o documento de origem.' },
      { title: 'Não inventa', text: 'A I.A recusa preencher lacunas com dados plausíveis.' },
      { title: 'Você confirma', text: 'Nenhuma ação acontece sem a confirmação do síndico.' },
      { title: 'Matemática transparente', text: 'Contas de reajuste e notas que dá para refazer no papel.' },
    ],
    note: 'O SindiOps é apoio à decisão, não parecer jurídico: quando o assunto pede um advogado, a ferramenta sinaliza.',
    services: ['plataformas-saas', 'automacoes', 'infraestrutura-cloud'],
    cta: {
      eyebrow: 'Síndico profissional?',
      title: 'Fale com a gente sobre o SindiOps ou sobre o seu próprio produto',
      source: 'sindiops',
      segment: 'SindiOps',
      interests: ['Quero usar o SindiOps', 'Quero desenvolver uma plataforma SaaS', 'Outro assunto'],
    },
  },
  {
    slug: 'suiteops',
    name: 'SuiteOps',
    logo: '/img/suiteops/logo.svg',
    kind: 'Plataforma incubada pela Tech Blues',
    status: 'Em operação',
    url: 'https://app.suiteops.techblues.com.br',
    urlLabel: 'Acessar o SuiteOps',
    category: 'Plataforma de operação',
    headline: 'O CRM registra a venda. E o que acontece depois que o cliente assina?',
    summary:
      'O SuiteOps é a plataforma que opera o negócio de serviços de ponta a ponta: funil, proposta, contrato, projeto, tarefa e cobrança num fluxo só. Não é mais um CRM ao lado do sistema de projetos e da planilha do financeiro. É o sistema onde a operação inteira acontece.',
    origin:
      'O SuiteOps nasceu da própria operação da Tech Blues: um negócio de serviços que vendia num CRM, entregava numa ferramenta de projetos e cobrava numa planilha, perdendo o fio da meada a cada troca de sistema. É incubado pela empresa, que cuida de produto, engenharia, I.A e infraestrutura.',
    audience: ['Empresas de serviço', 'Agências e consultorias', 'Escritórios técnicos', 'Operações multiunidade'],
    seoTitle: 'SuiteOps: plataforma de operação para negócios de serviço',
    flowEyebrow: 'Além do CRM',
    flowTitle: 'Um ciclo fechado, do primeiro contato ao último pagamento',
    flowNote:
      'Cada etapa entrega a próxima: a proposta aceita abre o projeto, a tarefa concluída alimenta a fatura. É por isso que ninguém precisa redigitar nada entre um sistema e outro.',
    flow: [
      {
        title: 'Funil e relacionamento',
        text: 'Leads, estágios, cadências de contato e linha do tempo de cada pessoa. Mover para uma etapa de perda exige o motivo, então o funil conta a verdade no fim do mês.',
        done: true,
      },
      {
        title: 'Proposta e contrato',
        text: 'Proposta em rascunho versionado, com totais e aceite registrados. O contrato guarda o reajuste com a conta aberta mês a mês e o histórico de cada aplicação.',
        done: true,
      },
      {
        title: 'Projeto e tarefas',
        text: 'A proposta aceita vira projeto a partir de um template, com tarefas, responsáveis, prazos, comentários, arquivos e atualizações de andamento para o cliente.',
        done: true,
      },
      {
        title: 'Financeiro',
        text: 'Faturas com itens e condições de pagamento, recebimentos e despesas ligados ao projeto que os gerou. O resultado por projeto deixa de ser estimativa.',
      },
    ],
    featuresEyebrow: 'O que torna o SuiteOps diferente',
    featuresTitle: 'Não é integração entre sistemas. É um sistema só',
    features: [
      {
        icon: 'Workflow',
        title: 'Automações que você simula antes de ativar',
        text: 'Regras de gatilho, condição e ação montadas por você. Toda automação nasce inativa: primeiro você simula e vê o que ela faria, depois ativa. Cada execução fica registrada.',
      },
      {
        icon: 'FileSearch',
        title: 'Histórico com a fonte de cada afirmação',
        text: 'O resumo de um negócio não é um texto solto: cada fato vem com o trecho que o prova, seja um e-mail, uma anotação ou um registro de contato. O que ninguém disse, o sistema não completa.',
      },
      {
        icon: 'Building2',
        title: 'Multiunidade de verdade',
        text: 'Cada unidade de negócio tem funil, propostas e permissões próprias. A pessoa enxerga só onde trabalha, e a direção enxerga o consolidado.',
      },
      {
        icon: 'Bot',
        title: 'I.A que opera dentro do sistema',
        text: 'A I.A não fica num chat à parte: ela registra lead, move estágio, rascunha proposta e cria tarefa dentro do SuiteOps, com as mesmas permissões de quem pediu. Enviar ao cliente continua sendo ato da pessoa.',
      },
    ],
    principlesTitle: 'Um sistema que você audita',
    principles: [
      { title: 'Sempre com a fonte', text: 'Todo resumo aponta o registro que o sustenta. Sem fonte, o sistema diz que não sabe.' },
      { title: 'Simule antes de ativar', text: 'Automação nasce desligada. Você vê o efeito antes de deixar ela agir sozinha.' },
      { title: 'Você confirma', text: 'Rascunho de proposta não vai sozinho ao cliente. Reajuste só é aplicado com a sua confirmação.' },
      { title: 'Matemática transparente', text: 'Reajuste e totais aparecem com a conta aberta, mês a mês, para você refazer no papel.' },
    ],
    services: ['plataformas-saas', 'automacoes', 'infraestrutura-cloud'],
    cta: {
      eyebrow: 'Sua operação vive em três sistemas?',
      title: 'Fale com a gente sobre o SuiteOps ou sobre a sua própria plataforma',
      source: 'suiteops',
      segment: 'SuiteOps',
      interests: ['Quero usar o SuiteOps', 'Quero desenvolver uma plataforma SaaS', 'Outro assunto'],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
