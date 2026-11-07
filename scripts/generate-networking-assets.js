/**
 * Generates Digital Business Card (vCard 3.0) and crisp Vector SVG QR Codes
 * for Salman Alharbi's Portfolio & Conference Networking Hub.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// 1. Standard vCard 3.0 (compatible with iOS Camera, Android Camera, Outlook, Apple Contacts)
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

// Compact vCard specifically optimized for QR density (faster camera scan at distance)
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
console.log('Created Salman_Alharbi.vcf');

async function fetchQrSvg(dataString, outFilename) {
  const encoded = encodeURIComponent(dataString);
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&ecc=M&margin=2&format=svg&data=${encoded}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to generate QR for ${outFilename}: ${res.status}`);
  }
  let svg = await res.text();
  // Ensure responsive viewBox on the SVG so it scales cleanly on Mobile, iPad, and Full-Screen mode
  svg = svg.replace(/<svg([^>]*?)width="(\d+)"\s+height="(\d+)"([^>]*?)>/i, (match, p1, w, h, p4) => {
    if (/viewBox=/i.test(match)) return match;
    return `<svg${p1}viewBox="0 0 ${w} ${h}" width="100%" height="100%"${p4}>`;
  });
  const outPath = path.join(ASSETS_DIR, outFilename);
  fs.writeFileSync(outPath, svg, 'utf8');
  console.log(`Generated ${outFilename} (${svg.length} bytes)`);
  return svg;
}

async function main() {
  const svgVcard = await fetchQrSvg(qrVcardContent, 'qr-vcard.svg');
  const svgPortfolio = await fetchQrSvg(portfolioUrl, 'qr-portfolio.svg');
  const svgCv = await fetchQrSvg(cvUrl, 'qr-cv.svg');

  // Also write a lightweight JS module so inline rendering in modal is 0ms and 100% offline
  const jsModule = `window.PORTFOLIO_QR_SVGS = ${JSON.stringify({
    vcard: svgVcard,
    portfolio: svgPortfolio,
    cv: svgCv
  })};\n`;
  fs.writeFileSync(path.join(ROOT_DIR, 'js', 'qr-data.js'), jsModule, 'utf8');
  console.log('Generated js/qr-data.js for instant offline QR rendering.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
