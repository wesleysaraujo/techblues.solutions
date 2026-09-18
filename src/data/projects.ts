export type Project = {
  slug: string;
  name: string;
  logo: string;
  kind: string;
  status: string;
  url: string;
  headline: string;
  summary: string;
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
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
