---
name: token-optimizer
description: >-
  Token optimization, context compaction, and Ghost Token elimination skill.
  Activate whenever creating, editing, refactoring, or auditing code in this repository
  to minimize token consumption, prevent context bloat, and maximize agent speed and accuracy.
---

# Token Optimizer & Context Efficiency Skill

Use this skill to keep AI token consumption minimal (90–95% reduction compared to monolithic files) and maintain fast, high-precision edits.

## 1. Ghost Token Elimination Rules

1. **Never Embed Base64 or Binary Payloads in Source Files**:
   - Do not inline Base64 PDFs, large raster images, or font binaries inside `.js`, `.ts`, `.html`, or `.css` files (e.g., avoid `cv-data.js` Base64 blobs).
   - Store binary assets (`.pdf`, `.png`, `.webp`, `.woff2`) as standalone static files and reference them via relative URLs (`./SALMAN-ALHARBI-Resume.pdf`).
2. **Modular File Separation**:
   - Keep concerns strictly separated so each file remains under ~1,200 lines:
     - `index.html`: Semantic markup and structure only (no inline `<style>` or large `<script>` blocks).
     - `css/styles.css`: Styling, layout, responsive rules, and animations.
     - `js/i18n-data.js`: Bilingual translations (`en` / `ar`) and structured project case-study data.
     - `js/app.js`: Interactive controllers (language toggle, lens filter, ROI simulator, modal, and canvas).
3. **Targeted Reads & Edits**:
   - Always check `AGENTS.md` first to locate the exact file and section before reading.
   - Use `StartLine` and `EndLine` when calling `read_file` instead of loading entire files when only a specific section is needed.
   - Never read `.pdf` files or generated assets unless explicitly requested by the user.

## 2. Web & Runtime Performance Rules

1. **Zero Heavy Dependencies**:
   - Use native browser APIs (`IntersectionObserver`, `matchMedia`, CSS custom properties, native `<canvas>`) instead of heavy external JS frameworks for static portfolio pages.
2. **Rendering Performance (`content-visibility`)**:
   - Apply `content-visibility: auto; contain-intrinsic-size: auto 600px;` on below-the-fold sections (`#experience`, `#skills`, `#roi-simulator`, `#projects`, `#education`, `#contact`) so the browser skips layout/paint work for offscreen sections on initial load.
3. **Canvas & Animation Throttling**:
   - Pause `requestAnimationFrame` loops automatically when `document.hidden` is true or when `prefers-reduced-motion: reduce` is enabled.

