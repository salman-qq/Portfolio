---
name: frontend-design
description: >-
  Executive Frontend Design & Bilingual UI/UX system for Salman Alharbi's Decision Intelligence
  & Data Governance Portfolio. Activate when designing, styling, or updating HTML/CSS/JS UI components,
  RTL/LTR layouts, interactive calculators, or GitHub README visual cards.
---

# Executive Frontend Design Skill (Sovereign Obsidian & Gold)

This skill enforces a distinctive, high-trust executive visual identity tailored for Saudi Decision Intelligence, Data Governance (PDPL & NDMO), and Technical AI leadership.

## 1. Visual Direction & Color Tokens

- **Obsidian Base Palette**:
  - `--bg-base`: `#0a0c10` (Deep obsidian background)
  - `--bg-surface`: `#12151f` (Elevated surface)
  - `--bg-card`: `rgba(18, 22, 33, 0.85)` (Glassmorphic card container)
  - `--bg-card-hover`: `rgba(26, 32, 48, 0.95)`
- **Sovereign Gold Accents**:
  - `--accent`: `#E8D44D` (Primary executive gold)
  - `--accent-muted`: `rgba(232, 212, 77, 0.16)`
  - `--border-accent`: `rgba(232, 212, 77, 0.38)`
- **Typography**:
  - English (`dir="ltr"`): `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
  - Arabic (`dir="rtl"`): `'Cairo', system-ui, sans-serif`
  - Arabic Calligraphy Accent: `'Amiri', 'Cairo', serif`

## 2. Bilingual RTL / LTR Parity Rules

1. **Logical CSS Properties First**:
   - Always use CSS logical properties (`inset-inline-start`, `inset-inline-end`, `padding-inline`, `margin-inline-start`, `border-inline-start`, `text-align: start`) so layouts flip cleanly between English (`ltr`) and Arabic (`rtl`).
2. **Directional Directional Icons**:
   - Flip directional arrows in RTL using `html[dir="rtl"] .arch-arrow svg { transform: scaleX(-1); }`.
3. **Complete `data-i18n` Coverage**:
   - Every user-visible string in `index.html` must have a `data-i18n` key with matching entries in both `translations.en` and `translations.ar` inside `js/i18n-data.js`.

## 3. Component Selector Consistency Checklist

Whenever editing interactive components, verify that HTML classes match CSS selectors:
- **CV Dropdown**: `.cv-dropdown-wrap.open .cv-dropdown-menu` and `.cv-option-item` / `.cv-option-content` / `.cv-option-desc`
- **Lens Switcher**: `.lens-buttons-grid`, `.lens-mode-btn`, `.lens-mode-top`, `.lens-mode-icon`, `.lens-mode-title`, `.lens-mode-tag`, `.lens-mode-desc`, `.lens-status-banner`
- **ROI Simulator**: `.roi-sim-grid`, `.roi-sliders-col`, `.roi-slider-group`, `.roi-slider-label-row`, `.roi-counter-card`, `.roi-counter-number`, `.roi-counter-sub`
- **Architecture Flow**: `.project-arch-flow`, `.arch-flow-title`, `.arch-flow-steps`, `.arch-node`, `.arch-node-icon`, `.arch-node-label`
- **Financial Report Modal**: `.fin-report-card`, `.fin-report-top`, `.fin-report-heading`, `.fin-vehicle-meta`, `.fin-items-table`, `.fin-total-bar`

