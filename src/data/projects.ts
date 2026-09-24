export type Project = {
  slug: string;
  name: string;
  logo: string;
  kind: string;
  status: string;
  /** Endereço público do produto. Vazio enquanto não estiver no ar. */
  url?: string;
  headline: string;
  summary: string;
  /** Como o produto nasceu dentro da Tech Blues. */
  story: string;
  /** Ressalva honesta exibida no fim da seção de princípios. */
  note: string;
  audience: string[];
  cover: string;
  features: { icon: string; title: string; text: string; image: string }[];
  principles: { title: string; text: string }[];
  services: string[];
};

export const projects: Project[] = [
  {
    slug: 'sindiops',
    name: 'SindiOps',
    logo: '/img/sindiops/logo.svg',
    kind: 'Startup incubada pela Tech Blues',
    status: 'Acesso antecipado',
    url: 'https://www.sindiops.com.br',
    headline: 'O dinheiro do condomínio sai todo mês. Você consegue justificar cada saída?',
    summary:
      'Plataforma com Inteligência Artificial que ajuda síndicos profissionais a fundamentar cada decisão do condomínio: contratos, orçamentos e consultas à convenção, sempre com a fonte documentada.',
    story:
      'O SindiOps nasceu dentro da Tech Blues, da convivência com síndicos profissionais que administram vários condomínios e precisam prestar contas de cada decisão. É incubado pela empresa, que cuida de produto, engenharia, I.A e infraestrutura.',
    note: 'O SindiOps é apoio à decisão, não parecer jurídico: quando o assunto pede um advogado, a ferramenta sinaliza.',
    audience: ['Síndicos profissionais', 'Síndicos moradores', 'Conselhos', 'Administradoras'],
    cover: '/img/sindiops/01-painel.jpg',
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
    principles: [
      { title: 'Sempre com a fonte', text: 'Cada número e cada cláusula citada aponta para o documento de origem.' },
      { title: 'Não inventa', text: 'A I.A recusa preencher lacunas com dados plausíveis.' },
      { title: 'Você confirma', text: 'Nenhuma ação acontece sem a confirmação do síndico.' },
      { title: 'Matemática transparente', text: 'Contas de reajuste e notas que dá para refazer no papel.' },
    ],
    services: ['plataformas-saas', 'automacoes', 'infraestrutura-cloud'],
  },
  {
    slug: 'suiteops',
    name: 'SuiteOps',
    logo: '/img/suiteops/logo.svg',
    kind: 'Produto incubado pela Tech Blues',
    status: 'Em desenvolvimento',
    headline: 'Venda, entregue e fature sabendo o lucro real de cada projeto.',
    summary:
      'Plataforma de gestão inteligente para a operação de quem vende projeto: funil comercial, propostas, contratos, projetos e horas no mesmo lugar, com cada número rastreável até a origem. Funciona pela tela ou por um agente de I.A conectado ao sistema.',
    story:
      'O SuiteOps nasceu da própria operação da Tech Blues. Playbook comercial em arquivo solto, proposta no editor de texto, escopo vendido que não virava tarefa, hora gasta que não voltava para a margem do contrato: o que faltava não cabia em nenhuma ferramenta de prateleira. Em vez de mais um sistema, construímos o que usamos todo dia, e agora abrimos para quem vive a mesma rotina.',
    note: 'A I.A lê e redige; quem decide é o código e quem age é a pessoa. Nada muda de estado sem confirmação humana.',
    audience: ['Agências de automação', 'Consultorias', 'Software houses', 'Startups em operação'],
    cover: '/img/suiteops/01-funil.jpg',
    features: [
      {
        icon: 'Workflow',
        title: 'Funil que conversa com a entrega',
        text: 'Quadro por etapa, funis separados por unidade de negócio e origem de cada contato registrada, do QR do evento à campanha que trouxe o lead. Proposta aceita vira projeto sem redigitar escopo.',
        image: '/img/suiteops/01-funil.jpg',
      },
      {
        icon: 'Gauge',
        title: 'Painel do que precisa de você hoje',
        text: 'Negócios no funil, tarefas do dia, propostas aguardando aceite e contratos ativos com a receita mensal. Cada linha leva à tela que resolve, em vez de virar relatório para ninguém ler.',
        image: '/img/suiteops/02-painel.jpg',
      },
      {
        icon: 'ClipboardList',
        title: 'Cada negócio com histórico completo',
        text: 'Ficha do contato, tarefas, cadência de follow-up, propostas e a linha do tempo de quem moveu o quê. Comentários internos com @menção avisam só quem tem acesso àquela unidade.',
        image: '/img/suiteops/03-lead.jpg',
      },
      {
        icon: 'Sparkles',
        title: 'Operável por um agente de I.A',
        text: 'Conecte o Claude, o Cursor ou outro agente e peça o que você faria clicando. O agente entra com o seu acesso e as mesmas regras da tela, e cada ação fica registrada com o nome de quem pediu.',
        image: '/img/suiteops/04-agente.jpg',
      },
    ],
    principles: [
      { title: 'Cada número com origem', text: 'Do primeiro toque ao contrato assinado, dá para responder de onde veio e quanto custou.' },
      { title: 'A I.A redige, você decide', text: 'Rascunho de proposta é interno; enviar ao cliente continua sendo um clique seu.' },
      { title: 'Tela e agente, mesmas regras', text: 'As ferramentas do agente chamam o mesmo código dos seus botões, com as mesmas permissões.' },
      { title: 'Acesso por unidade', text: 'Cada pessoa enxerga apenas as unidades de negócio em que foi colocada.' },
    ],
    services: ['plataformas-saas', 'automacoes', 'integracoes'],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
