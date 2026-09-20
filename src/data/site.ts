export const site = {
  name: 'Tech Blues',
  legalName: 'Tech Blues Solutions',
  tagline: 'tecnologia corajosamente disruptiva.',
  url: 'https://www.techblues.com.br',
  description:
    'Transformação digital e Inteligência Artificial para escritórios de advocacia, síndicos profissionais, contabilidades, engenharia e fornecedores do mercado condominial. Automações, integrações, plataformas SaaS, infraestrutura cloud e parceiro Zoho.',
  phone: '21 98630-4148',
  phoneE164: '5521986304148',
  phone2: '21 97107-6672',
  phone2E164: '5521971076672',
  email: 'falecom@techblues.com.br',
  // Google Tag Manager (carregado só no build de produção)
  gtmId: 'GTM-5L7CKWGX',
  social: {
    linkedin: 'https://www.linkedin.com/company/techbluessolutions',
    instagram: 'https://www.instagram.com/techbluesautomacoes',
  },
  stats: [
    { value: 'Mais de 200', label: 'Projetos', icon: 'ClipboardList' },
    { value: '18 anos', label: 'de XP', icon: 'BadgeCheck' },
    { value: 'Mais de 50', label: 'Clientes', icon: 'Users' },
  ],
} as const;

// Chamada principal do site: leva ao diagnóstico (chatbot de pré-qualificação)
export const cta = {
  label: 'Diagnosticar meu projeto',
  href: '#diagnostico',
  page: '/diagnostico',
};

export const whatsapp = (text = 'Olá! Vim pelo site da Tech Blues e gostaria de conversar.', numero: string = site.phoneE164) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/solucoes', label: 'Soluções' },
  { href: '/segmentos', label: 'Segmentos' },
  { href: '/projetos', label: 'Projetos' },
  { href: '/zoho', label: 'Zoho' },
  { href: '/blog', label: 'Blog' },
  { href: '/contato', label: 'Contato' },
];
