# Cartão de visitas institucional

| Arquivo | Para quê |
| --- | --- |
| `techblues-cartao-visitas.pdf` | Arquivo para a gráfica: 2 páginas (pág. 1 = frente, pág. 2 = verso) |
| `previa-frente.png` / `previa-verso.png` | Conferência na tela (≈ 380 dpi; servem como alternativa se a gráfica pedir imagem) |
| `gerar-cartao.mjs` | Gera tudo a partir do HTML; edite aqui para mudar textos ou layout |
| `cartao.html` | HTML intermediário, útil para abrir no navegador e ajustar o visual |

## Especificações

- **Formato final:** 90 × 50 mm (padrão brasileiro), paisagem.
- **Sangria:** 3 mm de cada lado, ou seja, página de 96 × 56 mm. O `MediaBox` do PDF é 96 × 56 mm e o `TrimBox` marca os 90 × 50 mm do corte.
- **Margem de segurança:** 3 mm para dentro da linha de corte. Nenhum texto ou logo entra nessa faixa.
- **Cores:** RGB, com os tokens da marca (`#307AEF`, `#1F6AE0`, `#284572`, `#FF9B00`). Se a gráfica exigir CMYK, peça a conversão com perfil **Coated FOGRA39** ou envie o PDF assim mesmo: a maioria das gráficas online converte.
- **Tipografia:** Inter e Open Sans, com os desenhos das letras embutidos no PDF (fontes Type3 vetoriais). Não é preciso enviar as fontes junto.
- **QR Code:** leva a `https://www.techblues.com.br`, nível de correção H (lê mesmo com 30% da área danificada). Testado com leitor automático a partir da prévia.
- **Sugestão de acabamento:** couché 300 g com laminação fosca. A laminação fosca evita marcas de dedo no azul escuro da frente.

## Regerar

```bash
npm install
node docs/cartao-visitas/gerar-cartao.mjs
```

Para mudar telefone, e-mail, redes ou as frentes de atuação, edite o objeto `dados` no topo do `gerar-cartao.mjs`. O logo vem de `public/img/` (mesmo SVG do site) e o QR é gerado na hora, então basta trocar a URL para apontar para outro destino, como a página `/diagnostico`.
