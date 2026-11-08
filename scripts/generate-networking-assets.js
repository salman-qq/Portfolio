/**
 * Generates Digital Business Card (vCard 3.0), Executive Dark-Gold SVG QR Codes,
 * and compact matrix data for HTML5 <canvas> rendering (immune to Samsung Internet Force-Dark inversion).
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const vcardContent = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Alharbi;Salman;;;',
  'FN:Salman Alharbi | سلمان الحربي',
  'ORG:Decision Intelligence & Sovereign AI',
  'TITLE:Decision Intelligence & Data Governance Specialist (PDPL & NDMO)',
  'TEL;TYPE=CELL,VOICE:+966590197730',
  'EMAIL;TYPE=PREF,INTERNET:salman.alharbi.q@gmail.com',
  'URL:https://salman-qq.github.io/Portfolio/',
  'NOTE:Principal Investigator (IEEE) | Data Science, Computer Vision & Saudi Data Governance (NDMO/PDPL)',
  'END:VCARD'
].join('\r\n');

const qrVcardContent = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Alharbi;Salman',
  'FN:Salman Alharbi',
  'TITLE:Decision Intelligence & Data Governance',
  'TEL:+966590197730',
  'EMAIL:salman.alharbi.q@gmail.com',
  'URL:https://salman-qq.github.io/Portfolio/',
  'END:VCARD'
].join('\n');

const portfolioUrl = 'https://salman-qq.github.io/Portfolio/';
const cvUrl = 'https://salman-qq.github.io/Portfolio/SALMAN-ALHARBI-Resume.pdf';

fs.writeFileSync(path.join(ROOT_DIR, 'Salman_Alharbi.vcf'), vcardContent, 'utf8');

async function buildQrAsset(dataString, outFilename) {
  const encoded = encodeURIComponent(dataString);
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&ecc=M&margin=2&format=svg&data=${encoded}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed QR fetch: ${res.status}`);
  const rawSvg = await res.text();

  // Extract grid size from viewBox="0 0 N N"
  const vbMatch = rawSvg.match(/viewBox="0 0 (\d+) (\d+)"/);
  const size = vbMatch ? parseInt(vbMatch[1], 10) : 57;

  // Extract all module (x,y) coordinates from path "M x,y l 1,0 0,1 -1,0 z"
  const rows = Array.from({ length: size }, () => Array(size).fill(0));
  const coordRegex = /M\s*(\d+),(\d+)\s*l/g;
  let m;
  while ((m = coordRegex.exec(rawSvg)) !== null) {
    const x = parseInt(m[1], 10);
    const y = parseInt(m[2], 10);
    if (y >= 0 && y < size && x >= 0 && x < size) {
      rows[y][x] = 1;
    }
  }

  // Build Executive Dark-Gold SVG (Deep Navy-Slate #0F172A bg + Luminous Gold #FACC15 modules, zero white box!)
  const darkGoldSvg = rawSvg
    .replace(/fill:rgb\(255,\s*255,\s*255\)/g, 'fill:#0F172A')
    .replace(/fill:rgb\(0,\s*0,\s*0\)/g, 'fill:#FACC15');

  fs.writeFileSync(path.join(ASSETS_DIR, outFilename), darkGoldSvg, 'utf8');
  console.log(`Saved dark-gold ${outFilename} (grid: ${size}x${size})`);

  // Return compact bit-rows (each row as a string of '0'/'1') for HTML5 <canvas> rendering
  return {
    size,
    rows: rows.map((r) => r.join(''))
  };
}

async function main() {
  const vcardMatrix = await buildQrAsset(qrVcardContent, 'qr-vcard.svg');
  const cvMatrix = await buildQrAsset(cvUrl, 'qr-cv.svg');
  const portfolioMatrix = await buildQrAsset(portfolioUrl, 'qr-portfolio.svg');

  const matrixFile = path.join(ROOT_DIR, 'scripts', 'qr-matrices.json');
  fs.writeFileSync(
    matrixFile,
    JSON.stringify({ vcard: vcardMatrix, cv: cvMatrix, portfolio: portfolioMatrix }),
    'utf8'
  );
  console.log('Saved compact qr-matrices.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
