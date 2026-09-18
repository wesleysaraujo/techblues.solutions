# Como usar este design system

Este pacote é uma cópia portátil do design system "Tech Blues" (o mesmo conteúdo do Artifact em claude.ai/code/artifacts) — tokens, guia de marca e specs de componente em Markdown/JSON puro, sem depender do Artifact.

## Em um Projeto do claude.ai

1. Abra (ou crie) o Projeto do techblues.solutions em claude.ai.
2. Em "Project knowledge", adicione os arquivos deste pacote: `README.md`, `tokens.json` e os `README.md` de cada componente em `components/`.
3. A partir daí, qualquer conversa dentro do projeto já enxerga as cores, tipografia, espaçamento e regras de cada componente — não precisa colar isso de novo a cada prompt.

## No Claude Code

1. Copie a pasta `techblues-design-system/` para dentro do repositório do site (ex.: `docs/design-system/`).
2. No `CLAUDE.md` do repositório, adicione uma linha apontando para ela, por exemplo:
   `Antes de estilizar qualquer componente, leia docs/design-system/README.md e docs/design-system/tokens.json — são a fonte da verdade de cor, tipografia e espaçamento da Tech Blues.`
3. `tokens.json` tem os tokens em formato `{"tokens":[{name,value,usage}]}` por categoria (cor, tipografia, espaçamento, raio) — dá pra converter direto para variáveis CSS (`--azul-techblues`, etc.) ou para a config do Tailwind.
4. Os SVGs do logotipo (real, extraído do manual de marca oficial) estão em `assets/logo/` — três variações (colorida, monocromática, branca) × duas composições (horizontal completo e símbolo isolado).

## Se preferir manter tudo no Artifact

O Artifact em si (https://claude.ai/artifact/UVDNUtJFA8xTkMMWALKtM9) continua sendo a versão viva/editável — dá pra reabrir a qualquer momento e pedir pra mim atualizar um token ou componente, e essas mudanças não se propagam automaticamente para este pacote exportado. Se editar o Artifact depois, é só pedir um novo export.
