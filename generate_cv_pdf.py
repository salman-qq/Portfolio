#!/usr/bin/env python3
"""
Generates an exact, clean, professional single-page PDF for Salman Alharbi's CV
Matching standard PDF 1.4 specifications without external libraries.
"""

def generate_pdf():
    # Page dimensions: US Letter 612 x 792 pt
    width = 612
    height = 792
    margin_x = 36
    top_y = 756
    
    # We will build content stream commands
    # Fonts: F1 = Helvetica, F2 = Helvetica-Bold, F3 = Helvetica-Oblique
    stream = []
    
    def esc(text):
        return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')
    
    # Text helper
    def draw_text(x, y, text, font="F1", size=9, color=(0.1, 0.1, 0.1)):
        r, g, b = color
        stream.append(f"{r:.2f} {g:.2f} {b:.2f} rg")
        stream.append(f"BT /{font} {size} Tf {x:.2f} {y:.2f} Td ({esc(text)}) Tj ET")
        
    def draw_line(x1, y1, x2, y2, color=(0.8, 0.8, 0.8), width=0.5):
        r, g, b = color
        stream.append(f"{r:.2f} {g:.2f} {b:.2f} RG {width:.2f} w {x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S")

    # Header
    cur_y = top_y
    # Name centered
    name = "SALMAN ALHARBI"
    stream.append("0.05 0.05 0.05 rg")
    stream.append(f"BT /F2 20 Tf 205.00 {cur_y:.2f} Td ({esc(name)}) Tj ET")
    cur_y -= 15
    
    # Title centered
    title = "Decision Intelligence Specialist | Data Science & MLOps"
    stream.append("0.15 0.15 0.15 rg")
    stream.append(f"BT /F2 10 Tf 145.00 {cur_y:.2f} Td ({esc(title)}) Tj ET")
    cur_y -= 13
    
    # Contact Row centered
    contact = "Riyadh | +966 590197730 | salman.alharbi.q@gmail.com | linkedin.com/in/salman-alharbi-data-scientist"
    stream.append("0.35 0.35 0.35 rg")
    stream.append(f"BT /F1 8.5 Tf 95.00 {cur_y:.2f} Td ({esc(contact)}) Tj ET")
    cur_y -= 14
    
    def section_header(title, y):
        draw_text(margin_x, y, title, font="F2", size=9.5, color=(0.0, 0.0, 0.0))
        draw_line(margin_x, y - 2, width - margin_x, y - 2, color=(0.2, 0.2, 0.2), width=0.75)
        return y - 11

    # SUMMARY
    cur_y = section_header("SUMMARY", cur_y)
    summary_lines = [
        "Decision Intelligence & Data Science Specialist with practical experience delivering applied AI solutions, data automation, and",
        "technical training across leading Saudi entities, including Tuwaiq Academy (with MoE), the Saudi Electricity Regulatory Authority",
        "(SERA), and the National Center for Meteorology (NCM). Experienced in deploying Local LLMs to maintain full data privacy,",
        "streamlining large-scale data workflows, and aligning processes with NDMO and Saudi PDPL regulations to support effective",
        "decision-making."
    ]
    for line in summary_lines:
        draw_text(margin_x, cur_y, line, font="F1", size=8.2, color=(0.15, 0.15, 0.15))
        cur_y -= 10
    cur_y -= 4

    # EXPERIENCE
    cur_y = section_header("EXPERIENCE", cur_y)
    
    # Exp 1: Tuwaiq
    draw_text(margin_x, cur_y, "Tuwaiq Academy (in partnership with MoE) - Jeddah, Saudi Arabia", font="F2", size=8.5, color=(0.0, 0.0, 0.0))
    draw_text(width - margin_x - 70, cur_y, "07/2026 - 08/2026", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
    cur_y -= 10
    draw_text(margin_x, cur_y, "Lead Technical Instructor | High School Track (Ages 15-17)", font="F3", size=8.2, color=(0.2, 0.2, 0.2))
    cur_y -= 9.5
    
    exp1_bullets = [
        ("Cohort Leadership: ", "Led high school tracks across male and female cohorts, coordinating daily operations and acting as primary liaison with academy leadership."),
        ("Deep-Tech Delivery: ", "Instructed university-grade modules in Generative AI (Prompt Engineering) and Cybersecurity (adversarial threat simulations)."),
        ("Applied Prototyping: ", "Mentored students in building IoT systems using Arduino sensors and interactive VR environments."),
        ("Event & Talent Direction: ", "Orchestrated final tech exhibition and coached student speakers for stage delivery, earning executive leadership commendations.")
    ]
    for b_title, b_desc in exp1_bullets:
        draw_text(margin_x + 6, cur_y, "-", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
        draw_text(margin_x + 14, cur_y, b_title, font="F2", size=8.0, color=(0.05, 0.05, 0.05))
        # offset for desc
        tw = len(b_title) * 4.3
        draw_text(margin_x + 14 + tw, cur_y, b_desc, font="F1", size=8.0, color=(0.15, 0.15, 0.15))
        cur_y -= 9.5
    cur_y -= 3

    # Exp 2: SERA
    draw_text(margin_x, cur_y, "Saudi Electricity Regulatory Authority (via UNIVERSAL STEPS GROUP) - Riyadh, Saudi Arabia", font="F2", size=8.5, color=(0.0, 0.0, 0.0))
    draw_text(width - margin_x - 70, cur_y, "12/2025 - 06/2026", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
    cur_y -= 10
    draw_text(margin_x, cur_y, "Data Science Specialist Tamheer", font="F3", size=8.2, color=(0.2, 0.2, 0.2))
    cur_y -= 9.5
    
    exp2_bullets = [
        ("Sourcing Innovation: ", "Engineered ingestion pilot harvesting 4-year data backlog (500K+ records) in 15 mins for SERA; scaled framework to 4 additional enterprise clients."),
        ("Process Optimization: ", "Compressed Awareness-to-Analysis decision cycle from hours to <5 seconds using local LLMs to guarantee 100% data residency per PDPL standards."),
        ("Decision Intelligence: ", "Automated operational bottlenecks and transformed multi-source data into executive-ready insights for strategic regulatory oversight."),
        ("Sentiment Analytics: ", "Analyzed 5+ platforms to ensure high-fidelity institutional reputation and responsiveness.")
    ]
    for b_title, b_desc in exp2_bullets:
        draw_text(margin_x + 6, cur_y, "-", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
        draw_text(margin_x + 14, cur_y, b_title, font="F2", size=8.0, color=(0.05, 0.05, 0.05))
        tw = len(b_title) * 4.3
        draw_text(margin_x + 14 + tw, cur_y, b_desc, font="F1", size=8.0, color=(0.15, 0.15, 0.15))
        cur_y -= 9.5
    cur_y -= 3

    # Exp 3: NCM
    draw_text(margin_x, cur_y, "National Center of Meteorology (NCM) - Jeddah, Saudi Arabia", font="F2", size=8.5, color=(0.0, 0.0, 0.0))
    draw_text(width - margin_x - 70, cur_y, "06/2024 - 08/2024", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
    cur_y -= 10
    draw_text(margin_x, cur_y, "Data Engineer Intern", font="F3", size=8.2, color=(0.2, 0.2, 0.2))
    cur_y -= 9.5
    
    exp3_bullets = [
        "Automated hourly weather report processing using Python (Pandas, Regex), eliminating manual entry completely.",
        "Developed ICAO message classification system for flight arrivals via time-series analysis.",
        "Optimized SQL queries in DuckDB, improving database performance.",
        "Refactored legacy code with OOP and modular design for maintainability; implemented Docker containers and Git for consistency."
    ]
    for b_desc in exp3_bullets:
        draw_text(margin_x + 6, cur_y, "-", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
        draw_text(margin_x + 14, cur_y, b_desc, font="F1", size=8.0, color=(0.15, 0.15, 0.15))
        cur_y -= 9.5
    cur_y -= 4

    # EDUCATION
    cur_y = section_header("EDUCATION", cur_y)
    draw_text(margin_x, cur_y, "Bachelor of Data Science", font="F2", size=8.5, color=(0.0, 0.0, 0.0))
    draw_text(width - margin_x - 70, cur_y, "08/2020 - 01/2025", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
    cur_y -= 10
    draw_text(margin_x, cur_y, "College of Computer Science and Engineering | University of Jeddah", font="F3", size=8.2, color=(0.2, 0.2, 0.2))
    cur_y -= 9.5
    draw_text(margin_x + 6, cur_y, "-", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
    draw_text(margin_x + 14, cur_y, "Coursework: ", font="F2", size=8.0, color=(0.05, 0.05, 0.05))
    draw_text(margin_x + 68, cur_y, "Machine Learning, Data Mining, Big Data Analytics, Database Systems, Cloud Computing, NLP.", font="F1", size=8.0, color=(0.15, 0.15, 0.15))
    cur_y -= 13

    # PROJECTS
    cur_y = section_header("PROJECTS", cur_y)
    draw_text(margin_x, cur_y, "Automated Insurance Decision Support System | Graduation Project", font="F2", size=8.5, color=(0.0, 0.0, 0.0))
    draw_text(width - margin_x - 70, cur_y, "10/2024 - 01/2025", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
    cur_y -= 9.5
    proj1_bullets = [
        "Built YOLOv8 & EfficientNetB0 models: 81% detection, 93% severity assessment, 100% part ID across 21 discrete components.",
        "Processed 23,000+ real-world images using OpenCV/Pandas; designed rule-based actuarial cost estimator integrating all outputs.",
        "Deployed Streamlit decision platform generating audit-ready PDF claims dossiers under 60 seconds."
    ]
    for b_desc in proj1_bullets:
        draw_text(margin_x + 6, cur_y, "-", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
        draw_text(margin_x + 14, cur_y, b_desc, font="F1", size=8.0, color=(0.15, 0.15, 0.15))
        cur_y -= 9.0
    cur_y -= 2

    draw_text(margin_x, cur_y, "Saudi Real Estate Investment Valuation Engine | Predictive Analytics", font="F2", size=8.5, color=(0.0, 0.0, 0.0))
    draw_text(width - margin_x - 70, cur_y, "10/2023 - 11/2023", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
    cur_y -= 9.5
    proj2_bullets = [
        "Predicted real estate asset valuations with R-squared 0.919 using optimized RandomForest Regressor.",
        "Built end-to-end ML pipeline with automated spatial and market feature engineering; benchmarked 7 candidate models."
    ]
    for b_desc in proj2_bullets:
        draw_text(margin_x + 6, cur_y, "-", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
        draw_text(margin_x + 14, cur_y, b_desc, font="F1", size=8.0, color=(0.15, 0.15, 0.15))
        cur_y -= 9.0
    cur_y -= 3

    # CERTIFICATIONS
    cur_y = section_header("CERTIFICATIONS", cur_y)
    certs = [
        ("Google Data Analytics Specialization | Google", "04/2023", "Calculus for Machine Learning and Data Science | DeepLearning.AI", "10/2023"),
        ("Linear Algebra for Machine Learning | DeepLearning.AI", "11/2023", "Python Programming | University of Michigan", "05/2025"),
        ("Microsoft 365 Fundamentals Specialization | Microsoft", "07/2025", "Fundamentals of Artificial Intelligence | SDAIA", "09/2025")
    ]
    for c1, d1, c2, d2 in certs:
        draw_text(margin_x + 6, cur_y, "-", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
        draw_text(margin_x + 14, cur_y, c1, font="F1", size=7.8, color=(0.15, 0.15, 0.15))
        draw_text(margin_x + 225, cur_y, d1, font="F2", size=7.5, color=(0.3, 0.3, 0.3))
        
        draw_text(margin_x + 280, cur_y, "-", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
        draw_text(margin_x + 288, cur_y, c2, font="F1", size=7.8, color=(0.15, 0.15, 0.15))
        draw_text(width - margin_x - 36, cur_y, d2, font="F2", size=7.5, color=(0.3, 0.3, 0.3))
        cur_y -= 9.0
    cur_y -= 3

    # SKILLS
    cur_y = section_header("SKILLS & EXPERTISE", cur_y)
    skills = [
        ("Technical Skills: ", "Python, R, SQL, SAP, Power BI, ETL, Data Pipelines, Docker, Git, Tableau, Machine Learning, Deep Learning, NLP, Computer Vision, Predictive Modeling, Time-Series Analysis, Statistical Analysis."),
        ("Soft Skills: ", "Problem Solving, Analytical Thinking, Teamwork, Collaboration, Leadership, Time Management, Adaptability."),
        ("Governance & Ethics: ", "Saudi PDPL, NDMO Frameworks, Data Ethics, Regulatory Compliance."),
        ("Decision Intelligence: ", "ROI Analysis, Data Storytelling, Market Surveillance."),
        ("Languages: ", "Arabic (Native), English.")
    ]
    for s_title, s_desc in skills:
        draw_text(margin_x + 6, cur_y, "-", font="F2", size=8.5, color=(0.1, 0.1, 0.1))
        draw_text(margin_x + 14, cur_y, s_title, font="F2", size=8.0, color=(0.05, 0.05, 0.05))
        tw = len(s_title) * 4.3
        draw_text(margin_x + 14 + tw, cur_y, s_desc, font="F1", size=7.8, color=(0.15, 0.15, 0.15))
        cur_y -= 9.0

    content_str = "\n".join(stream)
    stream_bytes = content_str.encode("latin-1")
    stream_len = len(stream_bytes)

    # PDF Object structure
    objs = []
    # 1: Catalog
    objs.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    # 2: Pages
    objs.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    # 3: Page
    objs.append(f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {width} {height}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>".encode('ascii'))
    # 4: Contents
    objs.append(f"<< /Length {stream_len} >>\nstream\n".encode('ascii') + stream_bytes + b"\nendstream")
    # 5: F1 Helvetica
    objs.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    # 6: F2 Helvetica-Bold
    objs.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    # 7: F3 Helvetica-Oblique
    objs.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>")

    # Assemble PDF with xref
    out = [b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"]
    offsets = [0]
    for i, obj in enumerate(objs, start=1):
        offsets.append(sum(len(chunk) for chunk in out))
        out.append(f"{i} 0 obj\n".encode('ascii'))
        out.append(obj)
        out.append(b"\nendobj\n")

    xref_offset = sum(len(chunk) for chunk in out)
    out.append(f"xref\n0 {len(objs) + 1}\n0000000000 65535 f \n".encode('ascii'))
    for off in offsets[1:]:
        out.append(f"{off:010d} 00000 n \n".encode('ascii'))

    out.append(f"trailer\n<< /Size {len(objs) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode('ascii'))
    
    return b"".join(out)

if __name__ == "__main__":
    pdf_data = generate_pdf()
    
    # Save to multiple convenient locations
    paths = [
        "/Salman_Alharbi_CV.pdf",
        "/salman_alharbi_cv.pdf",
        "/Salman_Alharbi_Resume.pdf"
    ]
    for p in paths:
        with open(p, "wb") as f:
            f.write(pdf_data)
        print(f"Generated {p} ({len(pdf_data)} bytes)")
    
    # Also save base64 string to a file for inline embedding in index.html
    import base64
    b64 = base64.b64encode(pdf_data).decode('ascii')
    with open("/cv_base64.txt", "w") as f:
        f.write(b64)
    print("Saved /cv_base64.txt")
