/**
 * Generates an exact, clean, professional single-page PDF for Salman Alharbi's unified CV
 * Matching standard PDF 1.4 specifications without external libraries.
 * Fits perfectly on US Letter (612 x 792 pt).
 */
const fs = require('fs');
const path = require('path');

function generateUnifiedPdf() {
  const width = 612;
  const height = 792;
  const marginX = 36;
  let curY = 756;

  const stream = [];

  function esc(text) {
    return String(text).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  }

  function drawText(x, y, text, font = 'F1', size = 9, color = [0.1, 0.1, 0.1]) {
    const [r, g, b] = color;
    stream.push(`${r.toFixed(2)} ${g.toFixed(2)} ${b.toFixed(2)} rg`);
    stream.push(`BT /${font} ${size} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${esc(text)}) Tj ET`);
  }

  function drawLine(x1, y1, x2, y2, color = [0.8, 0.8, 0.8], lineWidth = 0.5) {
    const [r, g, b] = color;
    stream.push(
      `${r.toFixed(2)} ${g.toFixed(2)} ${b.toFixed(2)} RG ${lineWidth.toFixed(2)} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`
    );
  }

  function sectionHeader(title, y) {
    drawText(marginX, y, title, 'F2', 9.5, [0.0, 0.0, 0.0]);
    drawLine(marginX, y - 2, width - marginX, y - 2, [0.2, 0.2, 0.2], 0.75);
    return y - 11;
  }

  // Header: Name Centered
  const name = 'SALMAN ALHARBI';
  stream.push('0.05 0.05 0.05 rg');
  stream.push(`BT /F2 20 Tf 205.00 ${curY.toFixed(2)} Td (${esc(name)}) Tj ET`);
  curY -= 15;

  // Subtitle Centered
  const title = 'Decision Intelligence & Data Governance Specialist | Business & IT Advisory';
  stream.push('0.15 0.15 0.15 rg');
  stream.push(`BT /F2 10 Tf 125.00 ${curY.toFixed(2)} Td (${esc(title)}) Tj ET`);
  curY -= 13;

  // Contact Row Centered
  const contact = '+966 590197730   salman.alharbi.q@gmail.com   Portfolio   Riyadh/Jeddah   linkedin';
  stream.push('0.30 0.30 0.30 rg');
  stream.push(`BT /F1 8.5 Tf 115.00 ${curY.toFixed(2)} Td (${esc(contact)}) Tj ET`);
  curY -= 14;

  // 1. SUMMARY
  curY = sectionHeader('SUMMARY', curY);
  const summaryLines = [
    'Decision Intelligence and Data Governance Specialist (B.S. in Data Science, ABET Accreditation Representative) with proven expertise deploying Local LLMs,',
    'enterprise data automation, and applied AI across SERA, Tuwaiq Academy, and NCM. Expert in Saudi PDPL and NDMO compliance, compressing operational',
    'decision cycles, and translating complex technical architectures into strategic business ROI.'
  ];
  for (const line of summaryLines) {
    drawText(marginX, curY, line, 'F1', 8.1, [0.15, 0.15, 0.15]);
    curY -= 9.5;
  }
  curY -= 3.5;

  // 2. EXPERIENCE
  curY = sectionHeader('EXPERIENCE', curY);

  // Tuwaiq
  drawText(marginX, curY, 'Tuwaiq Academy (in partnership with MoE )', 'F2', 8.5, [0.0, 0.0, 0.0]);
  drawText(width - marginX - 70, curY, '07/2026 – 08/2026', 'F2', 8.5, [0.1, 0.1, 0.1]);
  curY -= 9.5;
  drawText(marginX, curY, 'Lead Technical Instructor · Jeddah, Saudi Arabia', 'F3', 8.2, [0.2, 0.2, 0.2]);
  curY -= 9.0;

  const exp1Bullets = [
    ['Regional Cohort Leadership: ', 'Directed high school tracks at Jeddah Gifted School hub, leading multi-gender cohorts and serving as primary executive liaison.'],
    ['Technical Translation & Mentorship: ', 'Delivered university-grade AI (ML, Generative AI) and Cybersecurity modules, guiding applied IoT (Arduino) & VR (Unity) student prototyping.'],
    ['Executive Event Direction: ', 'Orchestrated final grand technology exhibition and coached student presenters, earning formal commendations from senior academy leadership.']
  ];
  for (const [bTitle, bDesc] of exp1Bullets) {
    drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
    drawText(marginX + 14, curY, bTitle, 'F2', 8.0, [0.05, 0.05, 0.05]);
    const tw = bTitle.length * 4.3;
    drawText(marginX + 14 + tw, curY, bDesc, 'F1', 7.9, [0.15, 0.15, 0.15]);
    curY -= 8.8;
  }
  curY -= 2.5;

  // SERA
  drawText(marginX, curY, 'Saudi Electricity Regulatory Authority (via UNIVERSAL STEPS GROUP)', 'F2', 8.5, [0.0, 0.0, 0.0]);
  drawText(width - marginX - 70, curY, '12/2025 – 06/2026', 'F2', 8.5, [0.1, 0.1, 0.1]);
  curY -= 9.5;
  drawText(marginX, curY, 'Data Science Specialist Tamheer · Riyadh, Saudi Arabia', 'F3', 8.2, [0.2, 0.2, 0.2]);
  curY -= 9.0;

  const exp2Bullets = [
    ['Big Data Pipeline Scalability: ', 'Engineered an automated ETL ingestion pipeline harvesting 500K+ historical records in 15 minutes, scaling the framework to serve 4 additional enterprise clients.'],
    ['Decision Optimization & PDPL Compliance: ', 'Compressed decision cycles from hours to <5 seconds using secure Local LLMs, maintaining 100% data residency per Saudi PDPL & NDMO standards.'],
    ['Executive Decision Intelligence: ', 'Automated operational bottlenecks and analyzed sentiment across 5+ digital platforms for strategic executive risk management and regulatory oversight.']
  ];
  for (const [bTitle, bDesc] of exp2Bullets) {
    drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
    drawText(marginX + 14, curY, bTitle, 'F2', 8.0, [0.05, 0.05, 0.05]);
    const tw = bTitle.length * 4.3;
    drawText(marginX + 14 + tw, curY, bDesc, 'F1', 7.9, [0.15, 0.15, 0.15]);
    curY -= 8.8;
  }
  curY -= 2.5;

  // NCM
  drawText(marginX, curY, 'National Center of Meteorology (NCM)', 'F2', 8.5, [0.0, 0.0, 0.0]);
  drawText(width - marginX - 70, curY, '06/2024 – 08/2024', 'F2', 8.5, [0.1, 0.1, 0.1]);
  curY -= 9.5;
  drawText(marginX, curY, 'Data Engineer Intern · Jeddah, Saudi Arabia', 'F3', 8.2, [0.2, 0.2, 0.2]);
  curY -= 9.0;

  const exp3Bullets = [
    ['Process Automation: ', 'Architected automated Python ETL pipelines for weather data parsing, eliminating manual entry and reducing cycle time from hours to seconds.'],
    ['Data Integrity & DevOps: ', 'Integrated Delta Lake for transactional data reliability and optimized SQL queries in DuckDB using Docker containers and Git version control.'],
    ['Team Productivity Impact: ', 'Streamlined repetitive analytical workflows, enabling 15 team members to reallocate bandwidth toward high-priority meteorology analytics.']
  ];
  for (const [bTitle, bDesc] of exp3Bullets) {
    drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
    drawText(marginX + 14, curY, bTitle, 'F2', 8.0, [0.05, 0.05, 0.05]);
    const tw = bTitle.length * 4.3;
    drawText(marginX + 14 + tw, curY, bDesc, 'F1', 7.9, [0.15, 0.15, 0.15]);
    curY -= 8.8;
  }
  curY -= 3.5;

  // 3. EDUCATION
  curY = sectionHeader('EDUCATION', curY);
  drawText(marginX, curY, 'University of Jeddah', 'F2', 8.5, [0.0, 0.0, 0.0]);
  drawText(width - marginX - 70, curY, '08/2020 – 01/2025', 'F2', 8.5, [0.1, 0.1, 0.1]);
  curY -= 9.5;
  drawText(marginX, curY, 'Bachelor of Data Science · Jeddah', 'F3', 8.2, [0.2, 0.2, 0.2]);
  curY -= 11.5;

  // 4. PROJECTS
  curY = sectionHeader('PROJECTS', curY);

  // Project 1
  drawText(marginX, curY, 'Automated Insurance Decision Support System | Graduation Project', 'F2', 8.5, [0.0, 0.0, 0.0]);
  drawText(width - marginX - 70, curY, '01/2024 – 01/2025', 'F2', 8.5, [0.1, 0.1, 0.1]);
  curY -= 9.0;
  const proj1Bullets = [
    ['Deep Learning Computer Vision: ', 'Built YOLOv8 & EfficientNetB0 models achieving 81% detection, 93% damage severity, and 100% part identification across 21 vehicle components.'],
    ['Big Data Dataset Creation: ', 'Processed 23,000+ vehicle images via OpenCV/Pandas, constructing a unified rule-based damage cost estimator.'],
    ['Executive Web Deployment: ', 'Deployed Streamlit web platform generating automated executive PDF reports to streamline insurance claim decision support.']
  ];
  for (const [bTitle, bDesc] of proj1Bullets) {
    drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
    drawText(marginX + 14, curY, bTitle, 'F2', 8.0, [0.05, 0.05, 0.05]);
    const tw = bTitle.length * 4.3;
    drawText(marginX + 14 + tw, curY, bDesc, 'F1', 7.9, [0.15, 0.15, 0.15]);
    curY -= 8.8;
  }
  curY -= 2.0;

  // Project 2
  drawText(marginX, curY, 'Saudi Real Estate Investment Valuation Engine | Predictive Analytics', 'F2', 8.5, [0.0, 0.0, 0.0]);
  drawText(width - marginX - 70, curY, '10/2023 – 11/2023', 'F2', 8.5, [0.1, 0.1, 0.1]);
  curY -= 9.0;
  const proj2Bullets = [
    ['Predictive Analytics Accuracy: ', 'Built Random Forest ML regressor predicting Saudi land prices with 97.2% accuracy (R2 = 0.919).'],
    ['Automated Feature Engineering: ', 'Engineered end-to-end Machine Learning pipeline benchmarking 7 algorithms for optimal price valuation performance.'],
    ['Market Decision Intelligence: ', 'Identified critical geographic and demographic indicators driving strategic real estate land valuation.']
  ];
  for (const [bTitle, bDesc] of proj2Bullets) {
    drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
    drawText(marginX + 14, curY, bTitle, 'F2', 8.0, [0.05, 0.05, 0.05]);
    const tw = bTitle.length * 4.3;
    drawText(marginX + 14 + tw, curY, bDesc, 'F1', 7.9, [0.15, 0.15, 0.15]);
    curY -= 8.8;
  }
  curY -= 3.5;

  // 5. SKILLS
  curY = sectionHeader('SKILLS', curY);

  const skillsCategories = [
    {
      title: 'Governance & Strategy:',
      desc: 'Saudi PDPL, NDMO Frameworks, Data Governance, Data Sovereignty, Data Ethics, Regulatory Compliance, Data Privacy, Risk Mitigation.'
    },
    {
      title: 'Decision Intelligence:',
      desc: 'ROI Analysis, Decision Support Systems, Process Optimization, Data Storytelling, Market Surveillance, Reputation Analytics, Strategic Alignment.'
    },
    {
      title: 'Technical & AI Stack:',
      desc: 'Python, SQL, R, Local LLMs (Ollama, DeepSeek), YOLOv8, OpenCV, Delta Lake, Docker, Git, Streamlit, Pydantic, Power BI, Tableau, ETL Data Pipelines, Predictive Modeling, Machine Learning, Deep Learning, NLP, Computer Vision, Time-Series Analysis.'
    },
    {
      title: 'Executive & Leadership:',
      desc: 'Technical Translation, Stakeholder Management, Executive Presentation, Cohort Leadership, Problem Solving, Analytical Thinking.'
    }
  ];

  for (const cat of skillsCategories) {
    drawText(marginX, curY, cat.title, 'F2', 8.0, [0.05, 0.05, 0.05]);
    curY -= 8.5;
    drawText(marginX, curY, cat.desc, 'F1', 7.7, [0.15, 0.15, 0.15]);
    curY -= 9.5;
  }

  const contentStr = stream.join('\n');
  const streamBytes = Buffer.from(contentStr, 'latin1');

  const objs = [
    Buffer.from('<< /Type /Catalog /Pages 2 0 R >>', 'ascii'),
    Buffer.from('<< /Type /Pages /Kids [3 0 R] /Count 1 >>', 'ascii'),
    Buffer.from(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>`,
      'ascii'
    ),
    Buffer.concat([
      Buffer.from(`<< /Length ${streamBytes.length} >>\nstream\n`, 'ascii'),
      streamBytes,
      Buffer.from('\nendstream', 'ascii')
    ]),
    Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>', 'ascii'),
    Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>', 'ascii'),
    Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>', 'ascii')
  ];

  const out = [Buffer.from('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n', 'binary')];
  const offsets = [0];
  let currentLen = out[0].length;

  objs.forEach((obj, idx) => {
    offsets.push(currentLen);
    const head = Buffer.from(`${idx + 1} 0 obj\n`, 'ascii');
    const tail = Buffer.from('\nendobj\n', 'ascii');
    out.push(head, obj, tail);
    currentLen += head.length + obj.length + tail.length;
  });

  const xrefOffset = currentLen;
  out.push(Buffer.from(`xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`, 'ascii'));
  for (let i = 1; i < offsets.length; i++) {
    out.push(Buffer.from(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`, 'ascii'));
  }
  out.push(
    Buffer.from(
      `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`,
      'ascii'
    )
  );

  return Buffer.concat(out);
}

const rootDir = path.resolve(__dirname, '..');
const unifiedPdfBuffer = generateUnifiedPdf();

// Write to all CV aliases so any existing link or new link works smoothly
const targetFiles = [
  'SALMAN-ALHARBI-Resume.pdf',
  'Salman_Alharbi_CV.pdf',
  'Salman_Alharbi_Data_Science_AI_CV.pdf'
];

targetFiles.forEach((file) => {
  const filePath = path.join(rootDir, file);
  fs.writeFileSync(filePath, unifiedPdfBuffer);
  console.log(`Generated: ${filePath} (${fs.statSync(filePath).size} bytes)`);
});
