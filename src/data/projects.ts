export type Project = {
  slug: string;
  name: string;
  logo: string;
  /** Logo deitado (lockup horizontal): ocupa uma faixa em vez do quadrado */
  logoWide?: boolean;
  /** Projeto de cliente, não incubado pela casa. Muda o texto de bastidores */
  client?: boolean;
  kind: string;
  status: string;
  url?: string;
  /** Rótulo do botão que leva ao produto */
  urlLabel?: string;
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
    url: 'https://www.suiteops.com.br',
    urlLabel: 'Conhecer o SuiteOps',
    category: 'Plataforma de operação',
    headline: 'O CRM registra a venda. E o que acontece depois que o cliente assina?',
    summary:
      'O SuiteOps é a plataforma que opera o negócio de serviços de ponta a ponta: funil, proposta, contrato, projeto e tarefas num fluxo só. Não é mais um CRM ao lado de ferramentas de projetos e planilhas avulsas. É o sistema onde a operação inteira acontece.',
    origin:
      'O SuiteOps nasceu da própria operação da Tech Blues: um negócio de serviços que vendia num CRM e entregava em ferramentas de projetos à parte, perdendo o fio da meada a cada troca de sistema. É incubado pela empresa, que cuida de produto, engenharia, I.A e infraestrutura.',
    audience: ['Empresas de serviço', 'Agências e consultorias', 'Escritórios técnicos', 'Operações multiunidade'],
    cover: '/img/suiteops/01-painel.jpg',
    seoTitle: 'SuiteOps: plataforma de operação para negócios de serviço',
    flowEyebrow: 'Além do CRM',
    flowTitle: 'Um ciclo fechado, do primeiro contato à entrega do projeto',
    flowNote:
      'Cada etapa entrega a próxima: o lead vira proposta, a proposta aceita abre o projeto e desdobra as tarefas. É por isso que ninguém precisa redigitar nada entre um sistema e outro.',
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
    ],
    featuresEyebrow: 'O que torna o SuiteOps diferente',
    featuresTitle: 'Não é integração entre sistemas. É um sistema só',
    features: [
      {
        icon: 'Workflow',
        title: 'Automações que você simula antes de ativar',
        text: 'Regras de gatilho, condição e ação montadas por você. Toda automação nasce inativa: primeiro você simula e vê o que ela faria, depois ativa. Cada execução fica registrada.',
        image: '/img/suiteops/05-automacoes.jpg',
      },
      {
        icon: 'Kanban',
        title: 'Quadro de tarefas e entregas',
        text: 'Visualização kanban das tarefas da operação por estágio, prazos e responsáveis. As entregas ficam vinculadas ao projeto sem retrabalho de cadastro.',
        image: '/img/suiteops/03-tarefas.jpg',
      },
      {
        icon: 'LayoutDashboard',
        title: 'Cockpit de projeto e consumo de escopo',
        text: 'Horas apontadas versus vendidas, status das entregas e auditoria de margem com comandos MCP integrados para acompanhamento contínuo.',
        image: '/img/suiteops/02-projeto.jpg',
      },
      {
        icon: 'NotebookPen',
        title: 'Notas IA',
        text: 'Notas pessoais inteligentes dentro do próprio sistema: o lugar de registrar o que ainda não virou lead, tarefa ou projeto, com a I.A ajudando a organizar e a reencontrar o que foi escrito.',
        image: '/img/suiteops/06-notas.jpg',
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
      eyebrow: 'Sua operação vive em sistemas separados?',
      title: 'Fale com a gente sobre o SuiteOps ou sobre a sua própria plataforma',
      source: 'suiteops',
      segment: 'SuiteOps',
      interests: ['Quero usar o SuiteOps', 'Quero desenvolver uma plataforma SaaS', 'Outro assunto'],
    },
  },
  {
    slug: 'easysim4u',
    name: 'EasySIM4U',
    logo: '/img/easysim4u/logo.svg',
    logoWide: true,
    client: true,
    kind: 'Plataforma desenvolvida para cliente',
    status: 'Em operação',
    url: 'https://www.easysim4u.com',
    urlLabel: 'Visitar a loja',
    category: 'E-commerce de conectividade',
    headline: 'Vender o eSIM é a parte fácil. O difícil é entregar, cobrar e saber onde cada pedido parou.',
    summary:
      'Loja, checkout e operação de eSIM e chip internacional num sistema só: o viajante compra por destino e período, paga em cartão ou Pix, e a equipe acompanha pagamento, ativação e expedição sem sair do painel.',
    origin:
      'O EasySIM4U é cliente da Tech Blues, não um produto incubado. A empresa vende conectividade para quem viaja e nos procurou para construir a plataforma que sustenta a operação: a loja, o checkout, o painel administrativo e o programa de afiliados. A Tech Blues cuida de engenharia, integrações de pagamento e infraestrutura.',
    audience: ['Viajantes internacionais', 'Agências de viagem', 'Afiliados e parceiros', 'Equipe de operação'],
    cover: '/img/easysim4u/01-loja.jpg',
    seoTitle: 'EasySIM4U: e-commerce de eSIM e chip internacional',
    flowEyebrow: 'Da vitrine à ativação',
    flowTitle: 'Um pedido atravessa o sistema inteiro sem passar por planilha',
    flowNote:
      'Cada etapa alimenta a seguinte: o plano escolhido na loja define o que o checkout cobra, o pagamento confirmado libera a ativação, e a expedição só vê o que é chip físico. É por isso que a equipe não precisa reconciliar sistemas no fim do dia.',
    flow: [
      {
        title: 'Escolha do plano',
        text: 'O viajante seleciona destino, período e variação (só dados, voz e dados, número local). O preço é calculado por dia, com a cotação do dólar sincronizada.',
        done: true,
      },
      {
        title: 'Checkout e pagamento',
        text: 'Cartão via Stripe ou Pix, com cupom, cálculo de frete para chip físico e webhook confirmando o pagamento. O status do pedido muda sozinho quando a cobrança compensa.',
        done: true,
      },
      {
        title: 'Ativação e expedição',
        text: 'eSIM sai digital; chip físico entra na fila de expedição com endereço, etiqueta térmica e prazo. Cada pedido carrega o histórico do que foi feito e por quem.',
        done: true,
      },
      {
        title: 'Pós-venda e recompra',
        text: 'Carrinho abandonado dispara e-mail de recuperação, o cliente acompanha os próprios pedidos e o afiliado que originou a venda recebe a comissão calculada.',
        done: true,
      },
    ],
    featuresEyebrow: 'O que foi construído',
    featuresTitle: 'Uma loja na frente, uma operação inteira atrás',
    features: [
      {
        icon: 'ShoppingCart',
        title: 'Loja e checkout por destino',
        text: 'Página de plano com período, variação e preço por dia calculado na hora. Pagamento em cartão ou Pix, cupom de desconto e frete calculado para quem leva chip físico.',
        image: '/img/easysim4u/02-plano.jpg',
      },
      {
        icon: 'LayoutDashboard',
        title: 'Painel de operação',
        text: 'Pedidos do dia, receita, ticket médio e volume mês a mês na mesma tela. Quatro papéis com permissão granular: quem cuida da expedição não enxerga o financeiro.',
        image: '/img/easysim4u/03-painel.jpg',
      },
      {
        icon: 'Smartphone',
        title: 'Catálogo de planos e fornecedores',
        text: 'Planos de eSIM e chip físico por região, com código, preço base, valor por dia e o fornecedor por trás de cada um — T-Mobile, bics, CMHK. Mudança de preço não exige deploy.',
        image: '/img/easysim4u/04-catalogo.jpg',
      },
      {
        icon: 'Link',
        title: 'Portal de afiliados',
        text: 'O parceiro gera o próprio link com UTM, acompanha cliques, conversão e comissão, e vê o que já foi aprovado ou pago. Do outro lado, o admin define a taxa e audita cada venda.',
        image: '/img/easysim4u/05-afiliados.jpg',
      },
      {
        icon: 'MailCheck',
        title: 'Recuperação de carrinho',
        text: 'Carrinho deixado para trás vira lista de remarketing com receita potencial, e-mail automático de recuperação e taxa de recuperação medida. Venda perdida deixa de ser invisível.',
        image: '/img/easysim4u/06-remarketing.jpg',
      },
    ],
    principlesTitle: 'Engenharia que a operação consegue auditar',
    principles: [
      { title: 'Cada acesso no seu lugar', text: 'Quatro papéis com permissão por recurso, e um registro de atividade que mostra quem alterou o quê.' },
      { title: 'Pagamento rastreável', text: 'Webhook do Stripe move o status do pedido. O que o sistema mostra é o que a operadora de pagamento confirmou.' },
      { title: 'LGPD desde o início', text: 'Consentimento de cookies, base legal mapeada e dado pessoal tratado como dado pessoal, não como coluna de tabela.' },
      { title: 'Preço sem deploy', text: 'Plano, cupom, frete e cotação mudam pelo painel. Ajuste comercial não depende da agenda do time técnico.' },
    ],
    note: 'Os números e nomes que aparecem nas telas deste case foram substituídos por dados fictícios: a operação real do cliente não é exposta aqui.',
    services: ['plataformas-saas', 'integracoes', 'infraestrutura-cloud'],
    cta: {
      eyebrow: 'Vende online e a operação vive em planilha?',
      title: 'Fale com a gente sobre o seu e-commerce ou a sua plataforma',
      source: 'easysim4u',
      segment: 'EasySIM4U',
      interests: ['Quero uma plataforma de e-commerce', 'Quero desenvolver uma plataforma SaaS', 'Outro assunto'],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

