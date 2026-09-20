// Gera o cartão de visitas institucional da Tech Blues (frente e verso) em PDF
// pronto para gráfica, e um PNG de cada lado para conferência.
//
// Uso: node docs/cartao-visitas/gerar-cartao.mjs
//
// Medidas: 90 × 50 mm (padrão brasileiro) + 3 mm de sangria em cada lado
// (página de 96 × 56 mm) e 3 mm de margem de segurança para o conteúdo.
// Cores e tipografia vêm de docs/design-system/tokens.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import qrcode from 'qrcode';
import puppeteer from 'puppeteer-core';
import { PDFDocument } from 'pdf-lib';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '../..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const dados = {
  site: 'techblues.com.br',
  url: 'https://www.techblues.com.br',
  telefone: '21 98630-4148',
  telefone2: '21 97107-6672',
  email: 'falecom@techblues.com.br',
  instagram: '@techbluesautomacoes',
  linkedin: '/company/techbluessolutions',
  slogan: 'Menos tarefa manual.<br />Mais resultado.',
  apoio: 'Automações · I.A · Transformação digital',
  frentes: ['Automações com I.A', 'Integrações de sistemas', 'Plataformas SaaS', 'Infraestrutura Cloud'],
};

const svg = (arquivo) => fs.readFileSync(path.join(RAIZ, 'public/img', arquivo), 'utf8').replace(/<\?xml[^>]*\?>/, '');
const qr = await qrcode.toString(dados.url, { type: 'svg', errorCorrectionLevel: 'H', margin: 0, color: { dark: '#284572', light: '#00000000' } });

const ícone = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const icones = {
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885"/></svg>',
  phone: ícone('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92"/>'),
  mail: ícone('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
  globe: ícone('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>'),
  instagram: ícone('<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37"/><path d="M17.5 6.5h.01"/>'),
  // "in" desenhado como selo: o ícone de traço do LinkedIn fica ilegível a 2,6 mm
  linkedin: '<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="currentColor"/><text x="12" y="17.5" font-family="Open Sans, sans-serif" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">in</text></svg>',
};

const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;900&family=Open+Sans:wght@400;600;700;800&display=swap" />
    <style>
      /* 90 × 50 mm + 3 mm de sangria em cada lado */
      @page { size: 96mm 56mm; margin: 0; }
      * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      body { font-family: 'Open Sans', sans-serif; color: #333; }
      .lado {
        width: 96mm; height: 56mm; position: relative; overflow: hidden;
        page-break-after: always; display: flex; align-items: center;
      }
      /* área segura: 3 mm de sangria + 3 mm de margem */
      .seguro { position: absolute; inset: 6mm; }

      /* ---------- frente ---------- */
      .frente { background: linear-gradient(135deg, #307aef 0%, #1f6ae0 55%, #284572 100%); color: #fff; }
      .frente .logo { width: 40mm; display: block; }
      .frente .slogan {
        font-family: 'Inter', sans-serif; font-weight: 900; font-size: 4.4mm; line-height: 1.12;
        text-transform: uppercase; margin-top: 3.4mm;
      }
      .frente .barra { width: 12mm; height: 1mm; background: #ff9b00; border-radius: 1mm; margin-top: 3mm; }
      .frente .apoio {
        font-weight: 600; font-size: 2.3mm; letter-spacing: 0.06em; text-transform: uppercase;
        margin-top: 2.8mm; opacity: 0.9;
      }
      /* formas do template: quadrados e pontos em laranja */
      .quadrado { position: absolute; background: #ff9b00; }
      .q1 { width: 9mm; height: 9mm; right: -2mm; top: -2mm; }
      .q2 { width: 5mm; height: 5mm; right: 9mm; bottom: 4mm; border-radius: 0 5mm 0 0; }
      .pontos { position: absolute; right: 6mm; top: 12mm; display: grid; grid-template-columns: repeat(6, 0.7mm); gap: 1.1mm; opacity: 0.75; }
      .pontos span { width: 0.7mm; height: 0.7mm; background: #fff; border-radius: 50%; }

      /* ---------- verso ---------- */
      .verso { background: #fff; }
      .verso .seguro { display: flex; gap: 4mm; align-items: center; }
      .col-esq { flex: 1; min-width: 0; }
      .verso .marca { display: flex; align-items: center; gap: 1.6mm; }
      .verso .marca svg { width: 30mm; }
      .frentes { margin-top: 2.6mm; display: flex; flex-wrap: wrap; gap: 0.8mm 1.4mm; }
      .frentes li { list-style: none; font-size: 2.15mm; font-weight: 600; color: #595959; }
      .frentes li::before { content: '•'; color: #ff9b00; margin-right: 1.2mm; font-weight: 800; }
      .contatos { margin-top: 3mm; display: grid; gap: 1.3mm; }
      .contatos div { display: flex; align-items: center; gap: 1.6mm; font-size: 2.5mm; color: #333; }
      .contatos svg { width: 3mm; height: 3mm; flex: none; color: #307aef; }
      .redes { margin-top: 2.6mm; display: flex; gap: 3mm; }
      .redes div { display: flex; align-items: center; gap: 1.2mm; font-size: 2mm; color: #595959; }
      .redes svg { width: 2.6mm; height: 2.6mm; color: #595959; }
      .col-dir { width: 22mm; text-align: center; }
      .qr { width: 20mm; height: 20mm; margin: 0 auto; }
      .qr svg { width: 100%; height: 100%; display: block; }
      .qr-label { margin-top: 1.4mm; font-size: 1.9mm; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #595959; }
      .faixa { position: absolute; left: 0; right: 0; bottom: 0; height: 2.2mm; background: #307aef; }
      .faixa i { display: block; width: 26mm; height: 100%; background: #ff9b00; }
    </style>
  </head>
  <body>
    <section class="lado frente">
      <div class="quadrado q1"></div>
      <div class="quadrado q2"></div>
      <div class="pontos">${'<span></span>'.repeat(24)}</div>
      <div class="seguro" style="display:flex;flex-direction:column;justify-content:center">
        <div class="logo">${svg('techblues-logo-horizontal-branca.svg')}</div>
        <p class="slogan">${dados.slogan}</p>
        <div class="barra"></div>
        <p class="apoio">${dados.apoio}</p>
      </div>
    </section>

    <section class="lado verso">
      <div class="seguro">
        <div class="col-esq">
          <div class="marca">${svg('techblues-logo-horizontal-colorida.svg')}</div>
          <ul class="frentes">${dados.frentes.map((f) => `<li>${f}</li>`).join('')}</ul>
          <div class="contatos">
            <div>${icones.whatsapp}<span><strong>${dados.telefone}</strong></span></div>
            <div>${icones.whatsapp}<span><strong>${dados.telefone2}</strong></span></div>
            <div>${icones.mail}<span>${dados.email}</span></div>
            <div>${icones.globe}<span><strong>${dados.site}</strong></span></div>
          </div>
          <div class="redes">
            <div>${icones.instagram}<span>${dados.instagram}</span></div>
            <div>${icones.linkedin}<span>${dados.linkedin}</span></div>
          </div>
        </div>
        <div class="col-dir">
          <div class="qr">${qr}</div>
          <p class="qr-label">Aponte a câmera</p>
        </div>
      </div>
      <div class="faixa"><i></i></div>
    </section>
  </body>
</html>`;

fs.writeFileSync(path.join(AQUI, 'cartao.html'), html);

const navegador = await puppeteer.launch({ executablePath: CHROME, headless: true });
const pagina = await navegador.newPage();
await pagina.setContent(html, { waitUntil: 'networkidle0' });
await pagina.evaluateHandle('document.fonts.ready');

const arquivoPdf = path.join(AQUI, 'techblues-cartao-visitas.pdf');
await pagina.pdf({
  path: arquivoPdf,
  // em polegadas, para a página sair exata (96 mm e 56 mm)
  width: '3.779528in',
  height: '2.204724in',
  printBackground: true,
  pageRanges: '1-2',
});

// PNGs de conferência (300 dpi ≈ 11.8 px/mm)
await pagina.setViewport({ width: 400, height: 240, deviceScaleFactor: 4 }); // ≈ 380 dpi
for (const [i, nome] of ['frente', 'verso'].entries()) {
  const el = (await pagina.$$('.lado'))[i];
  await el.screenshot({ path: path.join(AQUI, `previa-${nome}.png`) });
}
await navegador.close();

// O Chrome arredonda a página para pixels inteiros. Aqui as caixas ficam exatas:
// MediaBox = 96 × 56 mm (com sangria) e TrimBox = 90 × 50 mm (corte final).
const mm = (v) => (v * 72) / 25.4;
const pdf = await PDFDocument.load(fs.readFileSync(arquivoPdf));
for (const pg of pdf.getPages()) {
  pg.setMediaBox(0, 0, mm(96), mm(56));
  pg.setBleedBox(0, 0, mm(96), mm(56));
  pg.setTrimBox(mm(3), mm(3), mm(90), mm(50));
}
fs.writeFileSync(arquivoPdf, await pdf.save());

console.log('gerado: techblues-cartao-visitas.pdf (2 páginas, 96×56 mm com sangria) + prévias PNG');
