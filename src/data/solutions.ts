export type Solution = {
  slug: string;
  icon: string;
  image: string;
  title: string;
  short: string;
  headline: string;
  intro: string;
  deliverables: { title: string; text: string }[];
  outcomes: string[];
};

export const solutions: Solution[] = [
  {
    slug: 'automacoes',
    image: '/img/visao-mercado.jpg',
    icon: 'Workflow',
    title: 'Automações com I.A',
    short:
      'Agentes de I.A, chatbots no WhatsApp e fluxos automáticos que tiram da sua equipe o trabalho repetitivo.',
    headline: 'Sua equipe no que importa. O repetitivo, a gente automatiza.',
    intro:
      'Mapeamos a operação, encontramos as tarefas que consomem horas sem gerar valor e as transformamos em fluxos automáticos, com Inteligência Artificial onde ela faz diferença de verdade: ler documentos, classificar solicitações, responder clientes e preparar rascunhos para revisão humana.',
    deliverables: [
      {
        title: 'Agentes de I.A e chatbots',
        text: 'Atendimento no WhatsApp, Instagram e site que tria, responde e encaminha para a pessoa certa, integrado ao seu CRM.',
      },
      {
        title: 'Leitura e extração de documentos',
        text: 'Contratos, notas, boletos e petições lidos por I.A, com os dados estruturados direto no sistema.',
      },
      {
        title: 'Automação de processos (BPA)',
        text: 'Fluxos de aprovação, cobrança, onboarding de clientes, alertas de prazo e relatórios que rodam sozinhos.',
      },
      {
        title: 'Orquestração com n8n',
        text: 'Automação em infraestrutura própria, sem pagar por execução e sem ficar preso a uma única ferramenta.',
      },
    ],
    outcomes: ['Menos retrabalho e erro manual', 'Atendimento 24/7 sem aumentar equipe', 'Prazos e renovações sob controle'],
  },
  {
    slug: 'integracoes',
    image: '/img/sobre-dados.jpg',
    icon: 'Plug',
    title: 'Integrações de sistemas',
    short: 'Seus sistemas conversando entre si: ERP, CRM, bancos, planilhas e plataformas do seu setor.',
    headline: 'O dado digitado uma vez vale para a empresa inteira.',
    intro:
      'Quando cada setor usa um sistema e ninguém conversa com ninguém, sobram planilhas, retrabalho e decisões no escuro. Projetamos e desenvolvemos integrações via API que unificam a informação, com monitoramento e tratamento de falhas.',
    deliverables: [
      {
        title: 'Integração via APIs',
        text: 'Conectores entre ERP, CRM, sistemas jurídicos, contábeis, de gestão condominial e de obras.',
      },
      {
        title: 'Sincronização de dados',
        text: 'Cadastros, financeiro e documentos sincronizados, com trilha de auditoria e reprocessamento de erros.',
      },
      {
        title: 'Migração de dados',
        text: 'Troca de sistema sem perder histórico: extração, limpeza, conversão e validação dos dados.',
      },
      {
        title: 'Dashboards e BI',
        text: 'Indicadores consolidados de várias fontes em um painel único para a gestão.',
      },
    ],
    outcomes: ['Fim da digitação em dobro', 'Informação única e confiável', 'Decisões com base em dados'],
  },
  {
    slug: 'plataformas-saas',
    image: '/img/sindiops/01-painel.jpg',
    icon: 'Layers',
    title: 'Plataformas SaaS',
    short: 'Do MVP ao produto em escala: desenvolvemos plataformas web e mobile para o seu negócio ou para o seu mercado.',
    headline: 'Sua ideia vira produto. Nós já fazemos isso para nós mesmos.',
    intro:
      'Desenvolvemos plataformas SaaS, portais de clientes e aplicativos com arquitetura pensada para crescer: multiempresa, planos e cobrança, permissões, auditoria e I.A embarcada. É a mesma engenharia que usamos no SindiOps, startup incubada pela Tech Blues.',
    deliverables: [
      {
        title: 'Discovery e MVP',
        text: 'Validação do problema, escopo enxuto e primeira versão no ar para clientes reais.',
      },
      {
        title: 'Produto multiempresa',
        text: 'Contas, equipes, planos, assinatura recorrente e painel administrativo.',
      },
      {
        title: 'Portais e aplicativos',
        text: 'Portal do cliente, área do morador, app de campo e sistemas internos sob medida.',
      },
      {
        title: 'I.A embarcada',
        text: 'Busca em documentos, assistentes e geração de conteúdo com fonte rastreável dentro do produto.',
      },
    ],
    outcomes: ['Produto próprio e recorrência', 'Arquitetura pronta para escalar', 'Time técnico sem montar um do zero'],
  },
  {
    slug: 'infraestrutura-cloud',
    image: '/img/page-hero-bg.jpg',
    icon: 'Cloud',
    title: 'Infraestrutura Cloud',
    short: 'Arquitetura, migração e sustentação em nuvem com segurança, backup e custo sob controle.',
    headline: 'Nuvem que gera valor, não fatura surpresa.',
    intro:
      'A pergunta deixou de ser "por que ir para a nuvem?" e passou a ser "como tirar o máximo dela?". Desenhamos, migramos e sustentamos ambientes cloud com foco em disponibilidade, segurança da informação e custo previsível.',
    deliverables: [
      {
        title: 'Arquitetura e migração',
        text: 'Levantamento do ambiente atual e migração planejada para a nuvem, sem parar a operação.',
      },
      {
        title: 'DevOps e deploy contínuo',
        text: 'Esteiras de publicação automatizadas, ambientes de homologação e rollback.',
      },
      {
        title: 'Backup e segurança',
        text: 'Rotinas de backup testadas, certificados, controle de acesso e aderência à LGPD.',
      },
      {
        title: 'Monitoramento e FinOps',
        text: 'Alertas de disponibilidade e revisão de custos para pagar só pelo que se usa.',
      },
    ],
    outcomes: ['Ambiente estável e monitorado', 'Dados protegidos e com backup', 'Custo de nuvem previsível'],
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
