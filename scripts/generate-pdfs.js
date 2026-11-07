/**
 * Generates clean, zero-dependency PDF 1.4 documents for Salman Alharbi's two executive tracks:
 * 1. SALMAN-ALHARBI-Resume.pdf (Governance & Decision Intelligence Track)
 * 2. Salman_Alharbi_Data_Science_AI_CV.pdf (Data Science & Technical AI Track)
 */
const fs = require('fs');
const path = require('path');

function buildPdf(track) {
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

  // Header
  const name = 'SALMAN ALHARBI';
  stream.push('0.05 0.05 0.05 rg');
  stream.push(`BT /F2 20 Tf 205.00 ${curY.toFixed(2)} Td (${esc(name)}) Tj ET`);
  curY -= 15;

  const title =
    track === 'governance'
      ? 'Decision Intelligence & Data Governance Specialist (PDPL & NDMO) | Business & IT Advisory'
      : 'Data Science & AI Engineer | ETL Pipelines, Sovereign Local LLMs & Computer Vision';
  const titleX = track === 'governance' ? 88.0 : 105.0;
  stream.push('0.15 0.15 0.15 rg');
  stream.push(`BT /F2 9.5 Tf ${titleX.toFixed(2)} ${curY.toFixed(2)} Td (${esc(title)}) Tj ET`);
  curY -= 13;

  const contact =
    'Riyadh & Jeddah, KSA | +966 590197730 | salman.alharbi.q@gmail.com | github.com/salman-qq | linkedin.com/in/salman-alharbi-data-scientist';
  stream.push('0.35 0.35 0.35 rg');
  stream.push(`BT /F1 7.8 Tf 48.00 ${curY.toFixed(2)} Td (${esc(contact)}) Tj ET`);
  curY -= 14;

  // SUMMARY
  curY = sectionHeader('EXECUTIVE SUMMARY', curY);
  const summaryLines =
    track === 'governance'
      ? [
          'Decision Intelligence & Data Governance Specialist bridging enterprise data architectures with Saudi regulatory compliance',
          '(PDPL & NDMO) and measurable ROI across leading Saudi entities: Tuwaiq Academy (with MoE), Saudi Electricity Regulatory',
          'Authority (SERA), and National Center of Meteorology (NCM). Proven track record compressing decision loops from hours to <5',
          'seconds via sovereign Local LLMs (100% in-Kingdom residency) and translating complex AI systems into executive strategy.'
        ]
      : [
          'Data Scientist & AI Engineer specializing in high-throughput Python/SQL ETL pipelines, Sovereign Local LLMs (Ollama, DeepSeek,',
          'RAG), and Deep Learning Computer Vision (YOLOv8, EfficientNetB0). Delivered production systems across SERA, Tuwaiq Academy,',
          'and NCM—harvesting 500K+ regulatory records in 15 minutes, automating meteorological workflows with Delta Lake & DuckDB,',
          'and authoring a 6-page IEEE research paper on a 3-model insurance claims pipeline trained on 23,874 images.'
        ];
  for (const line of summaryLines) {
    drawText(marginX, curY, line, 'F1', 8.2, [0.15, 0.15, 0.15]);
    curY -= 10;
  }
  curY -= 4;

  // EXPERIENCE
  curY = sectionHeader('PROFESSIONAL EXPERIENCE', curY);

  // Exp 1: Tuwaiq
  drawText(
    marginX,
    curY,
    'Tuwaiq Academy (in partnership with Ministry of Education) - Jeddah, Saudi Arabia',
    'F2',
    8.5,
    [0.0, 0.0, 0.0]
  );
  drawText(width - marginX - 75, curY, '07/2026 - 08/2026', 'F2', 8.5, [0.1, 0.1, 0.1]);
  curY -= 10;
  drawText(
    marginX,
    curY,
    'Lead Technical Instructor (Technical Trainer) | Awarded Executive Leadership Commendation',
    'F3',
    8.2,
    [0.2, 0.2, 0.2]
  );
  curY -= 9.5;

  const exp1Bullets = [
    [
      'Regional Cohort Leadership: ',
      'Led gifted, advanced technologies, and AI tracks at Jeddah hub, serving as primary liaison with academy leadership.'
    ],
    [
      'Technical Translation: ',
      'Delivered university-grade Generative AI, MLOps, and Cybersecurity modules; guided IoT (Arduino) & VR (Unity) prototyping.'
    ],
    [
      'Executive Event Direction: ',
      'Orchestrated final grand tech exhibition and coached student presenters, earning formal leadership commendation.'
    ]
  ];
  for (const [bTitle, bDesc] of exp1Bullets) {
    drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
    drawText(marginX + 14, curY, bTitle, 'F2', 8.0, [0.05, 0.05, 0.05]);
    const tw = bTitle.length * 4.3;
    drawText(marginX + 14 + tw, curY, bDesc, 'F1', 8.0, [0.15, 0.15, 0.15]);
    curY -= 9.5;
  }
  curY -= 3;

  // Exp 2: SERA
  drawText(
    marginX,
    curY,
    'Saudi Electricity Regulatory Authority (SERA via UNIVERSAL STEPS GROUP) - Riyadh, KSA',
    'F2',
    8.5,
    [0.0, 0.0, 0.0]
  );
  drawText(width - marginX - 75, curY, '12/2025 - 06/2026', 'F2', 8.5, [0.1, 0.1, 0.1]);
  curY -= 10;
  drawText(
    marginX,
    curY,
    'Data Science & Decision Intelligence Specialist (Tamheer Certified)',
    'F3',
    8.2,
    [0.2, 0.2, 0.2]
  );
  curY -= 9.5;

  const exp2Bullets = [
    [
      'Big Data Scalability: ',
      'Engineered ETL ingestion pilot harvesting 4-year data backlog (500K+ records) in 15 mins; scaled to 4 additional enterprise clients.'
    ],
    [
      'PDPL Sovereign AI: ',
      'Compressed decision cycle from hours to <5 seconds via Local LLMs, ensuring 100% in-Kingdom residency per PDPL & NDMO.'
    ],
    [
      'Executive Intelligence: ',
      'Automated operational bottlenecks and multi-platform sentiment analytics (5+ channels) into executive oversight dashboards.'
    ]
  ];
  for (const [bTitle, bDesc] of exp2Bullets) {
    drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
    drawText(marginX + 14, curY, bTitle, 'F2', 8.0, [0.05, 0.05, 0.05]);
    const tw = bTitle.length * 4.3;
    drawText(marginX + 14 + tw, curY, bDesc, 'F1', 8.0, [0.15, 0.15, 0.15]);
    curY -= 9.5;
  }
  curY -= 3;

  // Exp 3: NCM
  drawText(
    marginX,
    curY,
    'National Center of Meteorology (NCM) - Jeddah, Saudi Arabia',
    'F2',
    8.5,
    [0.0, 0.0, 0.0]
  );
  drawText(width - marginX - 75, curY, '06/2024 - 08/2024', 'F2', 8.5, [0.1, 0.1, 0.1]);
  curY -= 10;
  drawText(marginX, curY, 'Data Engineer Intern', 'F3', 8.2, [0.2, 0.2, 0.2]);
  curY -= 9.5;

  const exp3Bullets = [
    'Architected automated Python ETL pipelines for hourly weather reports, cutting latency from hours to seconds.',
    'Integrated Delta Lake for transactional reliability and optimized SQL queries in DuckDB using Docker and Git.',
    'Eliminated repetitive manual data entry, freeing operational bandwidth for a 15-member analytics team.'
  ];
  for (const bDesc of exp3Bullets) {
    drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
    drawText(marginX + 14, curY, bDesc, 'F1', 8.0, [0.15, 0.15, 0.15]);
    curY -= 9.5;
  }
  curY -= 4;

  // EDUCATION
  curY = sectionHeader('EDUCATION & ACADEMIC HONORS', curY);
  drawText(marginX, curY, 'Bachelor of Science in Data Science', 'F2', 8.5, [0.0, 0.0, 0.0]);
  drawText(width - marginX - 75, curY, '08/2020 - 01/2025', 'F2', 8.5, [0.1, 0.1, 0.1]);
  curY -= 10;
  drawText(
    marginX,
    curY,
    'College of Computer Science and Engineering | University of Jeddah',
    'F3',
    8.2,
    [0.2, 0.2, 0.2]
  );
  curY -= 9.5;
  drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
  drawText(marginX + 14, curY, 'ABET Honors: ', 'F2', 8.0, [0.05, 0.05, 0.05]);
  drawText(
    marginX + 70,
    curY,
    'Selected by faculty to represent the Data Science cohort in live interviews before the international ABET board.',
    'F1',
    8.0,
    [0.15, 0.15, 0.15]
  );
  curY -= 12;

  // PROJECTS
  curY = sectionHeader('FEATURED PROJECTS & RESEARCH', curY);
  drawText(
    marginX,
    curY,
    'Automated Insurance Decision Support System | Principal Investigator & First Author (6-Page IEEE Paper)',
    'F2',
    8.5,
    [0.0, 0.0, 0.0]
  );
  drawText(width - marginX - 75, curY, '10/2024 - 01/2025', 'F2', 8.5, [0.1, 0.1, 0.1]);
  curY -= 9.5;
  const proj1Bullets = [
    'Engineered 3-model pipeline (YOLOv8 & EfficientNetB0) across 23,874 images: 81% detection, 93% severity, 100% part ID (21 parts).',
    'Built rule-based actuarial SAR cost estimator and Streamlit decision platform exporting audit-ready PDF claims dossiers in <60s.'
  ];
  for (const bDesc of proj1Bullets) {
    drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
    drawText(marginX + 14, curY, bDesc, 'F1', 8.0, [0.15, 0.15, 0.15]);
    curY -= 9.0;
  }
  curY -= 2;

  drawText(
    marginX,
    curY,
    'Saudi Real Estate Investment Valuation Engine | Predictive Analytics',
    'F2',
    8.5,
    [0.0, 0.0, 0.0]
  );
  drawText(width - marginX - 75, curY, '10/2023 - 11/2023', 'F2', 8.5, [0.1, 0.1, 0.1]);
  curY -= 9.5;
  drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
  drawText(
    marginX + 14,
    curY,
    'Achieved R-squared = 0.919 with optimized RandomForest Regressor after benchmarking 7 ML architectures on Saudi regional market data.',
    'F1',
    8.0,
    [0.15, 0.15, 0.15]
  );
  curY -= 12;

  // CERTIFICATIONS
  curY = sectionHeader('CERTIFICATIONS & CREDENTIALS (15)', curY);
  const certs = [
    [
      'Google Cloud Generative AI Leader | Google Cloud',
      '2025',
      'Enterprise GenAI Agents & Applications | Google Cloud',
      '2025'
    ],
    [
      'Fundamentals of Artificial Intelligence | SDAIA',
      '09/2025',
      'Google Data Analytics Professional Cert (8 Courses)',
      '04/2023'
    ],
    [
      'Linear Algebra & Calculus for ML | DeepLearning.AI',
      '11/2023',
      'Python Basics (Michigan) & MS 365 Specialization',
      '07/2025'
    ]
  ];
  for (const [c1, d1, c2, d2] of certs) {
    drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
    drawText(marginX + 14, curY, c1, 'F1', 7.8, [0.15, 0.15, 0.15]);
    drawText(marginX + 225, curY, d1, 'F2', 7.5, [0.3, 0.3, 0.3]);

    drawText(marginX + 275, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
    drawText(marginX + 283, curY, c2, 'F1', 7.8, [0.15, 0.15, 0.15]);
    drawText(width - marginX - 36, curY, d2, 'F2', 7.5, [0.3, 0.3, 0.3]);
    curY -= 9.0;
  }
  curY -= 3;

  // SKILLS
  curY = sectionHeader('CORE COMPETENCIES & TECHNICAL STACK', curY);
  const skills = [
    [
      'Governance & Advisory: ',
      'Saudi PDPL, NDMO Frameworks, Data Sovereignty, Privacy-by-Design, Decision Intelligence, ROI Analysis, Technical Translation.'
    ],
    [
      'AI & Data Engineering: ',
      'Python, SQL, DuckDB, Delta Lake, Local LLMs (Ollama, DeepSeek), RAG, Agentic Workflows, YOLOv8, EfficientNetB0, OpenCV.'
    ],
    [
      'BI, DevOps & Languages: ',
      'Power BI, Tableau, SAP, Streamlit, Pydantic, Docker, Git, R | Languages: Arabic (Native), English (Fluent).'
    ]
  ];
  for (const [sTitle, sDesc] of skills) {
    drawText(marginX + 6, curY, '-', 'F2', 8.5, [0.1, 0.1, 0.1]);
    drawText(marginX + 14, curY, sTitle, 'F2', 8.0, [0.05, 0.05, 0.05]);
    const tw = sTitle.length * 4.3;
    drawText(marginX + 14 + tw, curY, sDesc, 'F1', 7.8, [0.15, 0.15, 0.15]);
    curY -= 9.0;
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
const govPath = path.join(rootDir, 'SALMAN-ALHARBI-Resume.pdf');
const techPath = path.join(rootDir, 'Salman_Alharbi_Data_Science_AI_CV.pdf');

fs.writeFileSync(govPath, buildPdf('governance'));
fs.writeFileSync(techPath, buildPdf('technical'));

console.log('Generated:', govPath, fs.statSync(govPath).size, 'bytes');
console.log('Generated:', techPath, fs.statSync(techPath).size, 'bytes');

