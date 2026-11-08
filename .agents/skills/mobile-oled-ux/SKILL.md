---
name: mobile-oled-ux
description: Mobile-First Responsive UI/UX & OLED Dark-Mode Contrast System for Samsung Galaxy Ultra, iOS, and iPad viewports. Prevents Samsung Internet Force-Dark inversion, eliminates pure-black OLED smearing, enforces elevated slate surfaces, and optimizes thumb-zone ergonomics.
---

# Mobile-First Responsive UI/UX & OLED Contrast Skill

## 1. OLED & Samsung Internet Dark-Mode Protection
- **Never use pure black (`#000000` / `#080a0e`)**: On Samsung Dynamic AMOLED 2X and iPhone Super Retina OLED displays, near-black backgrounds paired with low-alpha `rgba()` cards create zero surface separation and look muddy/faded.
- **Elevated Navy-Slate Surface Hierarchy**:
  - Base Canvas: `#0F172A` (Rich Midnight Slate)
  - Elevated Section / Card Level 1: `#1E293B` (Solid Slate-Navy, high contrast against base)
  - Elevated Card Level 2 / Interactive: `#26354D` (Bright Elevated Slate)
  - Borders: `rgba(245, 217, 78, 0.38)` (Warm Gold) and `rgba(255, 255, 255, 0.22)` (Crisp structural edge)
- **Typography Contrast (WCAG AAA on Mobile)**:
  - Primary Text: `#FFFFFF`
  - Secondary / Body Text: `#E2E8F0` (Bright Silver-White, never dark grey)
  - Muted / Meta Text: `#CBD5E1` (High-legibility Cool Grey)
  - Gold Accent: `#FACC15` / `#FDE047` (Luminous Executive Gold)
- **Defeat Samsung Internet Force-Dark SVG Inversion**:
  - Render critical scannable graphics (QR Codes) onto HTML5 `<canvas>` with custom dark-navy modules (`#0F172A`) and warm gold-ivory quiet zones (`#FEFCE8`) framed by a luxury gold border—never use raw white-box `<svg>` images that Samsung Internet inverts into blank white squares.
- **Never use `background-attachment: fixed` or full-screen `mix-blend-mode: overlay` SVG noise filters on mobile GPUs**: They cause severe darkening and washing out on mobile Adreno/Mali GPUs.

## 2. Mobile & Tablet Layout Ergonomics (360px – 1024px)
- **Header Compaction**: Keep top navigation clean on `<640px` screens; move secondary actions into the mobile drawer or thumb-zone FAB.
- **2-Column / Full-Width CTA Grid**: Hero and Contact buttons arrange in a clean grid (`min-height: 48px`) for effortless one-handed thumb tapping.
- **Compact Timeline & Cards on Mobile**: Reduce horizontal card padding (`1.15rem` instead of `2rem`) and remove wasted left-gutter timeline indents on `<640px` viewports so content uses 92%+ of screen width.
- **2x2 Architecture Flow Grid on Mobile**: Convert 4-step horizontal workflow diagrams into a clean 2x2 grid on narrow screens so labels never cramp or overflow.
