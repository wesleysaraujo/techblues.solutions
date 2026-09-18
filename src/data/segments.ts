export type Segment = {
  slug: string;
  icon: string;
  title: string;
  audience: string;
  short: string;
  headline: string;
  intro: string;
  pains: string[];
  solutions: { title: string; text: string; solution: string }[];
  zoho: string[];
  highlight?: { project: string; text: string };
};

export const segments: Segment[] = [
  {
    slug: 'advocacia',
    icon: 'Scale',
    title: 'Escritórios de Advocacia',
    audience: 'Advogados e escritórios',
    short: 'Captação, prazos, documentos e relacionamento com clientes sem depender de planilha e memória.',
    headline: 'Menos tempo com burocracia, mais tempo com o cliente e a tese.',
    intro:
      'O escritório cresce e a operação não acompanha: contatos chegando por vários canais, prazos controlados em planilha, peças repetitivas montadas à mão e clientes perguntando pelo andamento. Organizamos essa rotina com automação, integração e I.A, sempre com revisão humana nas decisões jurídicas.',
    pains: [
      'Leads e consultas chegando por WhatsApp, e-mail e site sem triagem',
      'Prazos e andamentos acompanhados manualmente',
      'Documentos e peças repetitivas montados do zero',
      'Cliente sem visibilidade do andamento do caso',
      'Honorários e cobranças controlados em planilha',
    ],
    solutions: [
      {
        title: 'Triagem inteligente de contatos',
        text: 'Chatbot no WhatsApp que qualifica a demanda, coleta documentos e agenda a consulta no CRM.',
        solution: 'automacoes',
      },
      {
        title: 'Documentos a partir de modelos',
        text: 'Procurações, contratos de honorários e peças-padrão geradas a partir dos dados do cliente.',
        solution: 'automacoes',
      },
      {
        title: 'Alertas de prazo e andamento',
        text: 'Integração com fontes de publicações e alertas automáticos para a equipe e para o cliente.',
        solution: 'integracoes',
      },
      {
        title: 'Portal do cliente',
        text: 'Área segura para o cliente acompanhar o caso, enviar documentos e receber comunicados.',
        solution: 'plataformas-saas',
      },
    ],
    zoho: ['Zoho CRM', 'Zoho Sign', 'Zoho WorkDrive', 'Zoho Bookings'],
  },
  {
    slug: 'sindicos-profissionais',
    icon: 'Building2',
    title: 'Síndicos Profissionais',
    audience: 'Síndicos e administradoras',
    short: 'Contratos, orçamentos, convenção e prestação de contas de vários condomínios sob controle.',
    headline: 'Cada decisão do condomínio justificada, com a fonte na mão.',
    intro:
      'Quem administra vários condomínios vive entre contratos vencendo, orçamentos para comparar, dúvidas sobre a convenção e moradores cobrando respostas. Criamos o SindiOps justamente para essa rotina e integramos o restante da operação: comunicação, financeiro e fornecedores.',
    pains: [
      'Contratos com vencimento, aviso prévio e reajuste perdidos no e-mail',
      'Orçamentos comparados sem critério registrado',
      'Dúvidas sobre convenção e regimento respondidas de memória',
      'Comunicados e cobranças disparados manualmente',
      'Prestação de contas trabalhosa para o conselho',
    ],
    solutions: [
      {
        title: 'SindiOps',
        text: 'Contratos, orçamentos e consulta à convenção com I.A que sempre mostra a fonte.',
        solution: 'plataformas-saas',
      },
      {
        title: 'Comunicação automatizada',
        text: 'Avisos, lembretes de assembleia e respostas frequentes no WhatsApp dos moradores.',
        solution: 'automacoes',
      },
      {
        title: 'Integração com a administradora',
        text: 'Dados financeiros e cadastros sincronizados com o sistema de gestão condominial.',
        solution: 'integracoes',
      },
      {
        title: 'Painel da carteira',
        text: 'Indicadores de todos os condomínios em um único painel para o síndico.',
        solution: 'integracoes',
      },
    ],
    zoho: ['Zoho CRM', 'Zoho Desk', 'Zoho Sign', 'Zoho Forms'],
    highlight: {
      project: 'sindiops',
      text: 'O SindiOps nasceu dentro da Tech Blues para resolver a rotina do síndico profissional.',
    },
  },
  {
    slug: 'contabilidade',
    icon: 'Calculator',
    title: 'Contabilidade',
    audience: 'Escritórios contábeis',
    short: 'Coleta de documentos, conciliação e atendimento automatizados para atender mais clientes.',
    headline: 'Atenda mais clientes sem aumentar a equipe na mesma proporção.',
    intro:
      'Boa parte do mês de um escritório contábil vai para correr atrás de documento, digitar lançamento e responder a mesma pergunta. Automatizamos a coleta, integramos sistemas e bancos e colocamos a I.A para ler e classificar documentos.',
    pains: [
      'Cobrança manual de documentos dos clientes todo mês',
      'Lançamentos e conciliações digitados à mão',
      'Informação espalhada entre sistema contábil, e-mail e planilha',
      'Atendimento repetitivo consumindo a equipe técnica',
      'Onboarding de novos clientes lento',
    ],
    solutions: [
      {
        title: 'Coleta automática de documentos',
        text: 'Lembretes no WhatsApp e e-mail com envio organizado por cliente e competência.',
        solution: 'automacoes',
      },
      {
        title: 'Leitura de documentos com I.A',
        text: 'Notas, boletos e extratos lidos e classificados antes de chegar ao analista.',
        solution: 'automacoes',
      },
      {
        title: 'Integração com sistemas e bancos',
        text: 'Dados fluindo entre sistema contábil, ERP do cliente e extratos bancários.',
        solution: 'integracoes',
      },
      {
        title: 'Central de atendimento',
        text: 'Tickets, SLA e base de respostas para o cliente se resolver sozinho.',
        solution: 'automacoes',
      },
    ],
    zoho: ['Zoho CRM', 'Zoho Desk', 'Zoho WorkDrive', 'Zoho Forms'],
  },
  {
    slug: 'engenharia',
    icon: 'HardHat',
    title: 'Engenharia',
    audience: 'Construtoras e escritórios de engenharia',
    short: 'Obras, medições, orçamentos e documentos técnicos conectados do campo ao escritório.',
    headline: 'Do canteiro ao escritório, a informação chega certa e na hora.',
    intro:
      'Relatórios de obra em papel, fotos no celular de cada um, medições em planilhas diferentes e propostas que demoram para sair. Conectamos o campo ao escritório com aplicativos, integrações e painéis de acompanhamento.',
    pains: [
      'Diário de obra e medições em papel ou planilhas soltas',
      'Fotos e documentos técnicos sem organização',
      'Propostas e orçamentos que demoram para sair',
      'Pouca visibilidade de prazo e custo por obra',
      'Retrabalho entre campo, compras e financeiro',
    ],
    solutions: [
      {
        title: 'App de campo',
        text: 'Diário de obra, checklists e fotos registrados no celular, mesmo com sinal fraco.',
        solution: 'plataformas-saas',
      },
      {
        title: 'Propostas automatizadas',
        text: 'Orçamentos e propostas gerados a partir de modelos e tabelas de composição.',
        solution: 'automacoes',
      },
      {
        title: 'Painel de obras',
        text: 'Avanço físico, custos e pendências de todas as obras em um único lugar.',
        solution: 'integracoes',
      },
      {
        title: 'Documentos na nuvem',
        text: 'Projetos, ARTs e laudos versionados e acessíveis para toda a equipe.',
        solution: 'infraestrutura-cloud',
      },
    ],
    zoho: ['Zoho Projects', 'Zoho Creator', 'Zoho CRM', 'Zoho WorkDrive'],
  },
  {
    slug: 'fornecedores-condominiais',
    icon: 'Wrench',
    title: 'Fornecedores do Mercado Condominial',
    audience: 'Empresas que atendem condomínios',
    short: 'Manutenção, elevadores, limpeza, segurança: contratos, OS e relacionamento com síndicos organizados.',
    headline: 'Venda mais para condomínios e não perca nenhuma renovação.',
    intro:
      'Quem presta serviço para condomínios lida com dezenas de contratos recorrentes, ordens de serviço, reajustes anuais e síndicos que mudam a cada eleição. Estruturamos o comercial, a operação e o pós-venda para você reter e crescer a carteira.',
    pains: [
      'Propostas para síndicos feitas uma a uma',
      'Renovações e reajustes esquecidos',
      'Ordens de serviço controladas por telefone e papel',
      'Troca de síndico sem histórico do relacionamento',
      'Pouca previsibilidade da receita recorrente',
    ],
    solutions: [
      {
        title: 'CRM para o mercado condominial',
        text: 'Funil por condomínio e administradora, com histórico que sobrevive à troca de síndico.',
        solution: 'integracoes',
      },
      {
        title: 'Renovação e reajuste automáticos',
        text: 'Alertas de vencimento e cartas de reajuste com índice oficial calculado.',
        solution: 'automacoes',
      },
      {
        title: 'Ordens de serviço no celular',
        text: 'Técnico recebe, executa e registra a OS com fotos e assinatura do zelador.',
        solution: 'plataformas-saas',
      },
      {
        title: 'Portal do condomínio',
        text: 'Síndico acompanha chamados, relatórios e contratos em uma área exclusiva.',
        solution: 'plataformas-saas',
      },
    ],
    zoho: ['Zoho CRM', 'Zoho FSM', 'Zoho Desk', 'Zoho Sign'],
  },
];

export const getSegment = (slug: string) => segments.find((s) => s.slug === slug);
