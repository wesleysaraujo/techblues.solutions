// Biblioteca para gerar arquivos importáveis no Typebot (formato 6.1) a partir de
// um fluxo escrito em JavaScript. Veja docs/typebot/README.md e, como exemplo,
// docs/typebot/bots/diagnostico.mjs.
//
// O formato foi tirado dos schemas do repositório baptisteArno/typebot.io
// (packages/typebot, packages/blocks/*, packages/forge/blocks/openai) e dos
// templates oficiais em apps/builder/public/templates.
import fs from 'node:fs';
import path from 'node:path';

const alpha = 'abcdefghijklmnopqrstuvwxyz0123456789';

/** Tema padrão da Tech Blues (docs/design-system/tokens.json). */
export const temaTechBlues = (site = 'https://www.techblues.com.br') => ({
  general: {
    font: { type: 'Google', family: 'Open Sans' },
    background: { type: 'Color', content: '#FFFFFF' },
  },
  chat: {
    container: { maxWidth: '100%', backgroundColor: 'transparent' },
    hostAvatar: { isEnabled: true, url: `${site}/img/techblues-mark-colorida.svg` },
    guestAvatar: { isEnabled: false },
    hostBubbles: { backgroundColor: '#F2F2F2', color: '#333333', border: { thickness: 0 } },
    guestBubbles: { backgroundColor: '#307AEF', color: '#FFFFFF', border: { thickness: 0 } },
    buttons: { backgroundColor: '#307AEF', color: '#FFFFFF', border: { thickness: 0 } },
    inputs: { backgroundColor: '#FFFFFF', color: '#333333', placeholderColor: '#808080', border: { thickness: 1, color: '#EAEAEA' } },
    buttonsInput: { layout: 'wrap' },
  },
});

/** Configurações padrão em português. */
export const configuracoesPadrao = ({ title, description, site = 'https://www.techblues.com.br' }) => ({
  general: {
    isBrandingEnabled: false,
    isInputPrefillEnabled: false,
    isHideQueryParamsEnabled: true,
    rememberUser: { isEnabled: false },
    systemMessages: {
      invalidMessage: 'Não entendi. Pode tentar de novo?',
      botClosed: 'Este atendimento está fechado no momento. Fale com a gente pelo WhatsApp 21 98630-4148.',
      networkErrorTitle: 'Falha de conexão',
      networkErrorMessage: 'Não conseguimos enviar sua resposta. Confira a internet e tente de novo.',
    },
  },
  typingEmulation: { enabled: true, speed: 400, maxDelay: 1.2, delayBetweenBubbles: 0 },
  metadata: { title, description, favIconUrl: `${site}/favicon.svg`, allowIndexing: false },
});

/**
 * Cria um bot. `variables` é a lista de nomes; os ids são gerados. Dentro de
 * expressões e textos, use sempre {{nome_da_variavel}}.
 */
export const createBot = ({ name, icon = '🤖', variables: variableNames, theme, settings }) => {
  let seq = 0;
  const id = (prefix = '') => {
    seq += 1;
    let rnd = '';
    for (let i = 0; i < 8; i++) rnd += alpha[Math.floor(Math.random() * alpha.length)];
    return `${prefix}${seq.toString(36).padStart(3, '0')}${rnd}`;
  };

  const variables = [];
  const vars = {};
  for (const nm of variableNames) {
    // ids só com letras/números: dentro de "Set variable" eles viram identificadores JS
    const v = { id: `v${nm.replace(/[^a-z0-9]/gi, '')}${id()}`, name: nm };
    variables.push(v);
    vars[nm] = v.id;
  }
  const varId = (nm) => {
    if (!vars[nm]) throw new Error(`Variável não declarada: ${nm}`);
    return vars[nm];
  };

  const groups = [];
  const edges = [];
  const link = (from, toGroupId) => {
    const e = { id: id('e'), from, to: { groupId: toGroupId } };
    edges.push(e);
    return e.id;
  };

  // ----- texto rico (formato Plate, usado pelo editor do Typebot) -----
  const p = (...children) => ({ type: 'p', children: children.map((c) => (typeof c === 'string' ? { text: c } : c)) });
  const a = (txt, url) => ({ type: 'a', url, children: [{ text: txt }] });
  const bold = (txt) => ({ bold: true, text: txt });

  // ----- blocos -----
  /** Bolha de texto. Cada argumento é um parágrafo: string ou lista de trechos (string, a(), bold()). */
  const text = (...paragraphs) => ({
    id: id('b'),
    type: 'text',
    content: { richText: paragraphs.map((par) => (Array.isArray(par) ? p(...par) : p(par))) },
  });

  const textInput = (variable, { placeholder = 'Digite aqui…', isLong = false } = {}) => ({
    id: id('b'),
    type: 'text input',
    options: { variableId: varId(variable), isLong, labels: { placeholder, button: 'Enviar' } },
  });

  const emailInput = (variable) => ({
    id: id('b'),
    type: 'email input',
    options: {
      variableId: varId(variable),
      labels: { placeholder: 'nome@empresa.com.br', button: 'Enviar' },
      retryMessageContent: 'Esse e-mail não parece válido. Pode conferir?',
    },
  });

  const phoneInput = (variable) => ({
    id: id('b'),
    type: 'phone number input',
    options: {
      variableId: varId(variable),
      defaultCountryCode: 'BR',
      labels: { placeholder: '(21) 99999-9999', button: 'Enviar' },
      retryMessageContent: 'Esse número não parece válido. Pode conferir?',
    },
  });

  /** Botões. Com `multiple`, a variável recebe uma lista. */
  const choice = (variable, labels, { multiple = false } = {}) => ({
    id: id('b'),
    type: 'choice input',
    items: labels.map((content) => ({ id: id('i'), content })),
    options: {
      variableId: varId(variable),
      ...(multiple ? { isMultipleChoice: true, buttonLabel: 'Continuar' } : {}),
    },
  });

  /** Set variable. A expressão é JavaScript; {{var}} vira o valor real (número, string ou lista). */
  const setVar = (variable, expression) => ({
    id: id('b'),
    type: 'Set variable',
    options: { variableId: varId(variable), expressionToEvaluate: expression },
  });

  /** Soma em `score` os pontos da opção escolhida em `variable` (tabela rótulo → pontos). */
  const addPoints = (variable, table, { score = 'score', pts = 'pts' } = {}) => [
    setVar(pts, `(${JSON.stringify(table)})[{{${variable}}}] ?? 0`),
    setVar(score, `{{${score}}} + {{${pts}}}`),
  ];

  /** Comparação para condições. Operadores: "Equal to", "Not equal", "Contains", "Greater than",
   *  "Greater or equal to", "Less than", "Is set", "Is empty", "Starts with", "Matches regex"... */
  const cmp = (variable, comparisonOperator, value) => ({
    id: id('c'),
    variableId: varId(variable),
    comparisonOperator,
    ...(value !== undefined ? { value } : {}),
  });

  /** Condição. Cada item: { comparisons, logicalOperator?, to: grupo }. O "senão" é a saída do grupo. */
  const condition = (items) => {
    const block = { id: id('b'), type: 'Condition', items: [] };
    for (const it of items) {
      const item = {
        id: id('i'),
        content: { comparisons: it.comparisons, ...(it.logicalOperator ? { logicalOperator: it.logicalOperator } : {}) },
      };
      item.outgoingEdgeId = link({ blockId: block.id, itemId: item.id }, it.to.id);
      block.items.push(item);
    }
    return block;
  };

  /** Bloco OpenAI "Create chat completion". Salva a resposta em `saveTo`. */
  const openaiChat = ({ model = 'gpt-4o-mini', temperature, system, user, saveTo }) => ({
    id: id('b'),
    type: 'openai',
    options: {
      action: 'Create chat completion',
      model,
      ...(temperature !== undefined ? { temperature } : {}),
      messages: [
        ...(system ? [{ role: 'system', content: system }] : []),
        { role: 'user', content: user },
      ],
      responseMapping: [{ item: 'Message content', variableId: varId(saveTo) }],
    },
  });

  /**
   * Bloco OpenAI "Generate variables": extrai dados estruturados do prompt.
   * `extract`: [{ variable, type: 'string'|'number'|'boolean'|'array'|'enum', values?, description }]
   */
  const openaiExtract = ({ model = 'gpt-4o-mini', prompt, extract }) => ({
    id: id('b'),
    type: 'openai',
    options: {
      action: 'Generate variables',
      model,
      prompt,
      variablesToExtract: extract.map((e) => ({
        type: e.type,
        variableId: varId(e.variable),
        ...(e.type === 'enum' ? { values: e.values } : {}),
        description: e.description,
        isRequired: e.isRequired ?? true,
      })),
    },
  });

  /** Requisição HTTP (bloco "Webhook" do Typebot). `body` pode ser objeto: vira JSON com {{vars}}. */
  const httpRequest = ({ url, method = 'POST', body, headers = {}, timeout = 20 }) => ({
    id: id('b'),
    type: 'Webhook',
    options: {
      isCustomBody: true,
      isExecutedOnClient: false,
      timeout,
      webhook: {
        method,
        url,
        headers: Object.entries({ 'Content-Type': 'application/json', ...headers }).map(([key, value]) => ({ id: id('h'), key, value })),
        body: typeof body === 'string' ? body : JSON.stringify(body, null, 2),
      },
    },
  });

  // ----- grupos e conexões -----
  const group = (title, x, y, blocks) => {
    const g = { id: id('g'), title, graphCoordinates: { x, y }, blocks };
    groups.push(g);
    return g;
  };

  /** O último bloco do grupo passa a apontar para `toGroup`. */
  const then = (g, toGroup) => {
    const last = g.blocks[g.blocks.length - 1];
    last.outgoingEdgeId = link({ blockId: last.id }, toGroup.id);
    return g;
  };

  /** Um botão pula direto para `toGroup`, ignorando o resto do grupo. */
  const itemTo = (choiceBlock, label, toGroup) => {
    const item = choiceBlock.items.find((i) => i.content === label);
    if (!item) throw new Error(`Botão não encontrado: ${label}`);
    item.outgoingEdgeId = link({ blockId: choiceBlock.id, itemId: item.id }, toGroup.id);
  };

  // ----- montagem e validação -----
  const build = ({ start, finals = [] }) => {
    const startEvent = { id: id('ev'), type: 'start', graphCoordinates: { x: start.graphCoordinates.x - 250, y: start.graphCoordinates.y } };
    startEvent.outgoingEdgeId = link({ eventId: startEvent.id }, start.id);

    const errors = [];
    const groupIds = new Set(groups.map((g) => g.id));
    const blockIds = new Set(groups.flatMap((g) => g.blocks.map((b) => b.id)));
    const edgeIds = new Set(edges.map((e) => e.id));
    const varIds = new Set(variables.map((v) => v.id));
    const varNames = new Set(variables.map((v) => v.name));
    const finalIds = new Set(finals.map((g) => g.id));

    for (const e of edges) {
      if (!groupIds.has(e.to.groupId)) errors.push(`conexão ${e.id} aponta para grupo inexistente`);
      if ('blockId' in e.from && !blockIds.has(e.from.blockId)) errors.push(`conexão ${e.id} parte de bloco inexistente`);
    }
    for (const g of groups) {
      for (const b of g.blocks) {
        if (b.outgoingEdgeId && !edgeIds.has(b.outgoingEdgeId)) errors.push(`bloco ${b.id} referencia conexão inexistente`);
        for (const it of b.items ?? []) {
          if (it.outgoingEdgeId && !edgeIds.has(it.outgoingEdgeId)) errors.push(`item ${it.id} referencia conexão inexistente`);
          for (const c of it.content?.comparisons ?? []) if (!varIds.has(c.variableId)) errors.push(`comparação ${c.id} usa variável inexistente`);
        }
        if (b.options?.variableId && !varIds.has(b.options.variableId)) errors.push(`bloco ${b.id} salva em variável inexistente`);
        for (const m of b.options?.responseMapping ?? []) if (!varIds.has(m.variableId)) errors.push(`mapeamento de resposta usa variável inexistente`);
        for (const v of b.options?.variablesToExtract ?? []) if (!varIds.has(v.variableId)) errors.push(`extração usa variável inexistente`);
      }
      const last = g.blocks[g.blocks.length - 1];
      const hasExit = last?.outgoingEdgeId || last?.items?.some((i) => i.outgoingEdgeId);
      if (!hasExit && !finalIds.has(g.id)) errors.push(`grupo "${g.title}" termina sem saída (se for final, passe-o em finals)`);
    }

    const now = new Date().toISOString();
    const typebot = {
      version: '6.1',
      id: id('tb'),
      name,
      icon,
      events: [startEvent],
      groups,
      edges,
      variables,
      theme: theme ?? temaTechBlues(),
      selectedThemeTemplateId: null,
      settings: settings ?? configuracoesPadrao({ title: name }),
      createdAt: now,
      updatedAt: now,
      folderId: null,
      publicId: null,
      customDomain: null,
      workspaceId: 'workspace',
      resultsTablePreferences: null,
      isArchived: false,
      isClosed: false,
      whatsAppCredentialsId: null,
      riskLevel: null,
      spaceId: null,
    };
    const json = JSON.stringify(typebot, null, 2);
    for (const m of json.matchAll(/\{\{([a-z_]+)\}\}/g)) if (!varNames.has(m[1])) errors.push(`{{${m[1]}}} não está declarada em variables`);
    if (errors.length) throw new Error(`Template inválido:\n- ${[...new Set(errors)].join('\n- ')}`);
    return { typebot, json, stats: { grupos: groups.length, blocos: blockIds.size, conexoes: edges.length, variaveis: variables.length } };
  };

  const write = (outPath, opts) => {
    const { json, stats } = build(opts);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, json + '\n');
    console.log(`ok: ${stats.grupos} grupos, ${stats.blocos} blocos, ${stats.conexoes} conexões, ${stats.variaveis} variáveis → ${path.relative(process.cwd(), outPath)}`);
  };

  return {
    vars, a, bold,
    text, textInput, emailInput, phoneInput, choice, setVar, addPoints, cmp, condition,
    openaiChat, openaiExtract, httpRequest,
    group, then, itemTo, build, write,
  };
};
