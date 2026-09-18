export type ZohoProduct = { name: string; text: string };
export type ZohoCategory = { title: string; icon: string; products: ZohoProduct[] };

export const zohoCategories: ZohoCategory[] = [
  {
    title: 'Vendas e Marketing',
    icon: 'Target',
    products: [
      { name: 'Zoho CRM', text: 'Funil de vendas, contatos, automações e relatórios comerciais.' },
      { name: 'Zoho Bigin', text: 'CRM simples para pequenas equipes começarem rápido.' },
      { name: 'Zoho Campaigns', text: 'E-mail marketing integrado à base do CRM.' },
      { name: 'Zoho SalesIQ', text: 'Chat e rastreamento de visitantes no seu site.' },
      { name: 'Zoho Forms', text: 'Formulários online conectados ao CRM e a fluxos.' },
      { name: 'Zoho Bookings', text: 'Agendamento online de reuniões e atendimentos.' },
    ],
  },
  {
    title: 'Atendimento e Operação',
    icon: 'Headset',
    products: [
      { name: 'Zoho Desk', text: 'Central de atendimento com tickets, SLA e base de conhecimento.' },
      { name: 'Zoho FSM', text: 'Gestão de serviços em campo: OS, agenda de técnicos e app.' },
      { name: 'Zoho Projects', text: 'Projetos, tarefas, cronogramas e horas trabalhadas.' },
      { name: 'Zoho Sign', text: 'Assinatura eletrônica de contratos e documentos.' },
    ],
  },
  {
    title: 'Plataforma e Dados',
    icon: 'Database',
    products: [
      { name: 'Zoho Creator', text: 'Aplicativos sob medida em low-code, web e mobile.' },
      { name: 'Zoho Analytics', text: 'BI e dashboards com dados do Zoho e de outros sistemas.' },
      { name: 'Zoho Flow', text: 'Integrações e automações entre aplicativos.' },
    ],
  },
  {
    title: 'Colaboração e Suítes',
    icon: 'Users',
    products: [
      { name: 'Zoho Workplace', text: 'E-mail corporativo, documentos, planilhas e chat.' },
      { name: 'Zoho WorkDrive', text: 'Arquivos da equipe na nuvem com controle de acesso.' },
      { name: 'Zoho People', text: 'Gestão de pessoas, ponto, férias e avaliações.' },
      { name: 'Zoho One', text: 'Mais de 45 aplicativos Zoho em uma única assinatura.' },
    ],
  },
];

export const zohoProductNames = zohoCategories.flatMap((c) => c.products.map((p) => p.name));

export const zohoSteps = [
  { title: 'Diagnóstico', text: 'Entendemos seu processo e indicamos os produtos e o plano certos, sem licença sobrando.' },
  { title: 'Licenciamento', text: 'Cuidamos da contratação e da gestão das licenças como parceiro Zoho.' },
  { title: 'Implantação', text: 'Configuração, customização, migração de dados e integração com seus sistemas.' },
  { title: 'Treinamento e suporte', text: 'Equipe treinada e suporte contínuo para a ferramenta ser usada de verdade.' },
];
