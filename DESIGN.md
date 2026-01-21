# Design Document: Retro Portfolio Landing Page

> **Project:** Personal Portfolio for Juan Manuel Daza  
> **Version:** 1.0  
> **Date:** January 2026  
> **Status:** Approved - Ready for Implementation

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Goals & Requirements](#2-goals--requirements)
3. [Target Audience](#3-target-audience)
4. [Technology Stack](#4-technology-stack)
5. [File Structure](#5-file-structure)
6. [Visual Design](#6-visual-design)
7. [Content Strategy](#7-content-strategy)
8. [Component Breakdown](#8-component-breakdown)
9. [Internationalization (i18n)](#9-internationalization-i18n)
10. [JavaScript Architecture](#10-javascript-architecture)
11. [Responsive Design Strategy](#11-responsive-design-strategy)
12. [Assets Inventory](#12-assets-inventory)
13. [Accessibility Considerations](#13-accessibility-considerations)
14. [Performance Goals](#14-performance-goals)
15. [Open Questions](#15-open-questions)

---

## 1. Project Overview

A responsive, mobile-first, single-page personal portfolio website with a retro **Monkey Island**-inspired aesthetic. The site will serve as a landing page showcasing Juan Manuel Daza's professional profile, projects, and contact information.

### Current State

The existing site (`daza.ar`) uses Terminal.css with a minimalist black/white design featuring:
- Animated profile pictures (5 rotating images with duplication effect)
- Two embedded project iframes (Wallpapers, Pokedex)
- Social links (LinkedIn, GitHub, GitLab, Email)
- English-only content

### Proposed Changes

Complete redesign with:
- Retro Monkey Island visual theme
- Bilingual support (English/Spanish)
- Downloadable CV in both languages
- Three featured projects (adding linkedin2md)
- Simplified, lighter page (no iframes)

---

## 2. Goals & Requirements

### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR1 | Display short biography | Must Have |
| FR2 | Show links to social networks (GitHub, GitLab, LinkedIn, Email) | Must Have |
| FR3 | Download CV button | Must Have |
| FR4 | Toggle between English and Spanish | Must Have |
| FR5 | Separate CV files for each language | Must Have |
| FR6 | Showcase 3 projects with descriptions and links | Must Have |
| FR7 | Responsive design (mobile-first) | Must Have |
| FR8 | Dark/light mode support | Nice to Have |

### Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR1 | Page load time | < 2 seconds on 3G |
| NFR2 | Lighthouse Performance Score | > 90 |
| NFR3 | Accessibility (WCAG) | AA compliance |
| NFR4 | No external runtime dependencies | Vanilla JS only |

---

## 3. Target Audience

- **Recruiters & HR professionals** looking for developer candidates
- **Potential collaborators** interested in open-source projects
- **Fellow developers** exploring portfolio ideas
- **General visitors** curious about the projects

---

## 4. Technology Stack

### Decision: Vanilla Stack

To maximize performance, minimize dependencies, and ensure longevity:

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Structure | HTML5 | Semantic, accessible markup |
| Styling | CSS3 (custom) | Full control over retro aesthetic |
| Interactivity | Vanilla JavaScript (ES6+) | No framework overhead |
| Fonts | Google Fonts (self-hosted option) | Retro typography |
| Icons | SVG (existing assets) | Scalable, styleable |
| Hosting | GitHub Pages | Current setup via CNAME |

### Rejected Alternatives

- **React/Vue/Svelte:** Overkill for a single-page static site
- **Tailwind CSS:** Would conflict with custom retro styling
- **CSS Framework:** Need full control for Monkey Island aesthetic

---

## 5. File Structure

```
/
├── index.html              # Main HTML file
├── CNAME                    # GitHub Pages domain config
├── DESIGN.md               # This document
├── assets/
│   ├── icons/
│   │   ├── envelope.svg
│   │   ├── linkedin.svg
│   │   ├── square-github.svg
│   │   └── square-gitlab.svg
│   ├── pictures/
│   │   ├── profile1.png
│   │   ├── profile2.png
│   │   ├── profile3.png
│   │   ├── profile4.png
│   │   └── profile5.png
│   └── fonts/               # NEW: Self-hosted fonts
│       ├── PressStart2P.woff2
│       └── ...
├── css/
│   └── styles.css          # NEW: All custom styles
├── js/
│   ├── main.js             # NEW: Core logic
│   └── content.js          # NEW: i18n content
├── cv_eng.pdf                  # English CV (existing)
└── cv_es.pdf                   # Spanish CV (existing)
```

---

## 6. Visual Design

### 6.1 The Monkey Island Aesthetic

The Secret of Monkey Island (1990) features:
- **Caribbean pirate theme** with tropical nights
- **Limited color palette** (16-bit era)
- **Pixel art** with dithering effects
- **Hand-painted backgrounds** with layered depth
- **Witty, conversational UI** (dialog trees)

### 6.2 Color Palette

Inspired by Mêlée Island night scenes:

| Name | Hex | Usage |
|------|-----|-------|
| **Deep Sea** | `#0D1B2A` | Primary background |
| **Midnight Blue** | `#1B263B` | Secondary background, cards |
| **Tropical Teal** | `#415A77` | Borders, dividers |
| **Moonlit Sand** | `#E0D8C0` | Primary text |
| **Parchment** | `#F5F0E1` | Headings, highlights |
| **Pirate Gold** | `#FFD700` | Accent, buttons, links |
| **Scumm Bar Green** | `#3CB371` | Success states, hover |
| **Rum Red** | `#8B0000` | Error states (if needed) |

### 6.3 Typography

| Element | Font | Fallback | Size (Mobile) | Size (Desktop) |
|---------|------|----------|---------------|----------------|
| Headings (h1, h2) | Press Start 2P | monospace | 1rem / 0.75rem | 1.5rem / 1rem |
| Body Text | Cormorant Garamond | Georgia, serif | 1rem | 1.125rem |
| Code/Technical | VT323 | monospace | 0.875rem | 1rem |

**Note:** "Press Start 2P" has limited readability at small sizes. Use sparingly for headings only.

### 6.4 Visual Elements

#### Borders
```css
/* Pixel-art style border using box-shadow */
.retro-border {
  border: 3px solid #FFD700;
  box-shadow: 
    3px 3px 0 #415A77,
    6px 6px 0 #1B263B;
}
```

#### Cards/Panels
- Slightly rounded corners (4px) for softer retro feel
- Subtle inner shadow to simulate depth
- Wood/parchment texture overlay (optional, via CSS gradient)

#### Profile Image Treatment
- Reduce to limited color palette (CSS filter or pre-processed)
- Optional: slight pixelation effect
- Circular or rounded-square frame with gold border

### 6.5 Layout Mockup (ASCII Wireframe)

**Mobile (< 768px):**
```
┌─────────────────────────┐
│      [EN] | [ES]        │  <- Language toggle
├─────────────────────────┤
│         ┌───┐           │
│         │ P │           │  <- Profile image
│         └───┘           │
│     Juan Manuel Daza    │
│    Software Developer   │
├─────────────────────────┤
│        About Me         │
│   [Bio text here...]    │
├─────────────────────────┤
│        Projects         │
│ ┌─────────────────────┐ │
│ │ Daza Wallpapers     │ │
│ │ [description]       │ │
│ │ [link]              │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ linkedin2md         │ │
│ │ ...                 │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ Pokedex             │ │
│ │ ...                 │ │
│ └─────────────────────┘ │
├─────────────────────────┤
│     [Download CV]       │  <- CTA Button
├─────────────────────────┤
│   🔗  🔗  🔗  🔗        │  <- Social icons
│ Built with ❤️           │
└─────────────────────────┘
```

**Desktop (>= 768px):**
```
┌────────────────────────────────────────────────────┐
│                                    [EN] | [ES]     │
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌────────┐    Juan Manuel Daza                    │
│  │   P    │    Software Developer                  │
│  └────────┘                                        │
│                                                    │
│  About Me                                          │
│  [Bio text spans across...]                        │
│                                                    │
├────────────────────────────────────────────────────┤
│  Projects                                          │
│  ┌──────────────┐ ┌──────────────┐ ┌────────────┐  │
│  │ Wallpapers   │ │ linkedin2md  │ │ Pokedex    │  │
│  │              │ │              │ │            │  │
│  └──────────────┘ └──────────────┘ └────────────┘  │
├────────────────────────────────────────────────────┤
│                 [Download CV]                       │
│               🔗  🔗  🔗  🔗                        │
│                Built with ❤️                        │
└────────────────────────────────────────────────────┘
```

---

## 7. Content Strategy

### 7.1 Biography

**English Version:**
> I'm not a pirate, but I've been chasing treasure for 6 years—building digital solutions and hunting Agentic AI. I studied words before I learned code. That's why I can make machines speak human.

**Spanish Version:**
> No soy pirata, pero llevo 6 años buscando tesoros—construyendo soluciones digitales y cazando IA Agéntica. Estudié palabras antes que código. Por eso puedo hacer que las máquinas hablen humano.

### 7.2 Projects

| Project | URL | Description (EN) | Description (ES) |
|---------|-----|------------------|------------------|
| **Daza Wallpapers** | wallpapers.daza.ar | Minimalist wallpapers from 35mm analog photography | Fondos de pantalla minimalistas de fotografía analógica 35mm |
| **linkedin2md** | linkedin2md.daza.ar | CLI tool to convert LinkedIn data exports to Markdown for AI analysis | Herramienta CLI para convertir exportaciones de LinkedIn a Markdown para análisis con IA |
| **Pokedex** | roofsonfire.github.io/pokedex | Interactive Pokémon encyclopedia built with Roofs on Fire | Enciclopedia Pokémon interactiva construida con Roofs on Fire |

### 7.3 Social Links

| Platform | URL | Icon |
|----------|-----|------|
| LinkedIn | linkedin.com/in/juanmanueldaza | linkedin.svg |
| GitHub | github.com/juanmanueldaza | square-github.svg |
| GitLab | gitlab.com/juanmanueldaza | square-gitlab.svg |
| PyPI | pypi.org/user/juanmanueldaza | (new icon needed) |
| Email | juanmanueldaza@gmail.com | envelope.svg |

---

## 8. Component Breakdown

### 8.1 Header Component
- Language toggle (EN | ES)
- Optional: subtle animated stars/clouds background (CSS only)

### 8.2 Hero/Profile Section
- Profile image (consider keeping rotation from current site)
- Name heading (h1)
- Title/tagline (subtitle)

### 8.3 About Section
- Biography text (rendered from content.js)
- Optional: "What Drives Me" shortened quote

### 8.4 Projects Section
- Grid of project cards (3 items)
- Each card: title, description, external link
- Hover state: subtle glow or border animation

### 8.5 CTA Section
- Download CV button
- Button changes href based on selected language

### 8.6 Footer
- Social icons row
- Copyright notice
- Optional: "Grog" or Monkey Island easter egg reference

---

## 9. Internationalization (i18n)

### 9.1 Implementation Approach

All translatable content lives in `js/content.js`:

```javascript
const content = {
  en: {
    lang: "en",
    langName: "English",
    title: "Juan Manuel Daza - Portfolio",
    subtitle: "Software Developer",
    aboutTitle: "About Me",
    bio: ["Paragraph 1...", "Paragraph 2..."],
    projectsTitle: "Projects",
    projects: [
      {
        name: "Daza Wallpapers",
        description: "Minimalist wallpapers from 35mm analog photography",
        url: "https://wallpapers.daza.ar",
        github: "https://github.com/juanmanueldaza/wallpapers"
      },
      // ...
    ],
    cvButton: "Download CV",
    cvFile: "cv/JuanManuelDaza_CV_EN.pdf",
    footer: "Built with care"
  },
  es: {
    lang: "es",
    langName: "Español",
    title: "Juan Manuel Daza - Portafolio",
    subtitle: "Desarrollador de Software",
    aboutTitle: "Sobre Mí",
    bio: ["Párrafo 1...", "Párrafo 2..."],
    projectsTitle: "Proyectos",
    projects: [
      {
        name: "Daza Wallpapers",
        description: "Fondos de pantalla minimalistas de fotografía analógica 35mm",
        url: "https://wallpapers.daza.ar",
        github: "https://github.com/juanmanueldaza/wallpapers"
      },
      // ...
    ],
    cvButton: "Descargar CV",
    cvFile: "cv/JuanManuelDaza_CV_ES.pdf",
    footer: "Hecho con cariño"
  }
};

export default content;
```

### 9.2 Language Detection

Priority order:
1. URL parameter (`?lang=es`)
2. localStorage preference
3. Browser language (`navigator.language`)
4. Default: English

### 9.3 Language Persistence

- Save selection to localStorage
- Update `<html lang="...">` attribute
- Update page title

---

## 10. JavaScript Architecture

### 10.1 Module Structure

```javascript
// main.js
import content from './content.js';

const App = {
  currentLang: 'en',
  
  init() {
    this.detectLanguage();
    this.render();
    this.bindEvents();
  },
  
  detectLanguage() {
    // Check URL param, localStorage, navigator.language
  },
  
  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    document.documentElement.lang = lang;
    this.render();
  },
  
  render() {
    const c = content[this.currentLang];
    // Update DOM elements with content
  },
  
  bindEvents() {
    // Language toggle click handlers
    // Optional: keyboard navigation
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
```

### 10.2 DOM Update Strategy

Use `data-i18n` attributes for simple text replacements:

```html
<h2 data-i18n="aboutTitle">About Me</h2>
```

```javascript
document.querySelectorAll('[data-i18n]').forEach(el => {
  const key = el.dataset.i18n;
  el.textContent = content[this.currentLang][key];
});
```

---

## 11. Responsive Design Strategy

### 11.1 Breakpoints

| Name | Width | Target Devices |
|------|-------|----------------|
| Mobile | < 480px | Small phones |
| Mobile Large | 480px - 767px | Large phones, small tablets |
| Tablet | 768px - 1023px | Tablets, small laptops |
| Desktop | >= 1024px | Laptops, desktops |

### 11.2 Mobile-First Approach

Base styles target mobile, then enhance with `min-width` media queries:

```css
/* Base: Mobile */
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 11.3 Touch Considerations

- Minimum touch target: 44x44px
- Adequate spacing between interactive elements
- No hover-only interactions (always provide alternative)

---

## 12. Assets Inventory

### 12.1 Existing Assets (Keep)

| Asset | Path | Status |
|-------|------|--------|
| Profile images (5) | assets/pictures/profile1-5.png | Keep |
| LinkedIn icon | assets/icons/linkedin.svg | Keep |
| GitHub icon | assets/icons/square-github.svg | Keep |
| GitLab icon | assets/icons/square-gitlab.svg | Keep |
| Email icon | assets/icons/envelope.svg | Keep |

### 12.2 New Assets Required

| Asset | Format | Notes |
|-------|--------|-------|
| Press Start 2P font | CDN | Google Fonts CDN |
| Cormorant Garamond font | CDN | Google Fonts CDN |
| Favicon (optional) | ICO/PNG | Retro-styled |

### 12.3 Existing CV Files

| Asset | Path |
|-------|------|
| English CV | cv_eng.pdf |
| Spanish CV | cv_es.pdf |

### 12.4 Assets to Remove

| Asset | Reason |
|-------|--------|
| Terminal.css (CDN) | Replaced by custom styles |
| envelope0.svg | Duplicate/unused |

---

## 13. Accessibility Considerations

### 13.1 Requirements

- Semantic HTML (`<header>`, `<main>`, `<nav>`, `<footer>`, etc.)
- Proper heading hierarchy (single h1, logical h2/h3)
- Alt text for all images
- Focus indicators for keyboard navigation
- Sufficient color contrast (WCAG AA: 4.5:1 for text)
- Skip-to-content link (optional but recommended)
- ARIA labels for icon-only links

### 13.2 Color Contrast Check

| Combination | Ratio | Pass? |
|-------------|-------|-------|
| Parchment (#F5F0E1) on Deep Sea (#0D1B2A) | ~12:1 | Yes |
| Moonlit Sand (#E0D8C0) on Midnight Blue (#1B263B) | ~8:1 | Yes |
| Pirate Gold (#FFD700) on Deep Sea (#0D1B2A) | ~10:1 | Yes |

### 13.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 14. Performance Goals

### 14.1 Targets

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | TBD |
| Largest Contentful Paint | < 2.5s | TBD |
| Total Blocking Time | < 200ms | TBD |
| Cumulative Layout Shift | < 0.1 | TBD |
| Total Page Size | < 500KB | TBD |

### 14.2 Optimization Strategies

- Self-host fonts with `font-display: swap`
- Optimize/compress profile images (WebP with PNG fallback)
- Inline critical CSS
- Defer non-critical JS
- Remove iframes (current site embeds external sites)
- Use system fonts as fallback

---

## 15. Resolved Decisions

| # | Question | Decision |
|---|----------|----------|
| 1 | Keep profile image rotation animation? | **No** - Use static profile image |
| 2 | Host fonts locally or use CDN? | **Google Fonts CDN** |
| 3 | Include dark/light mode toggle? | **No** - Dark theme only (Monkey Island aesthetic) |
| 4 | Add any Monkey Island easter eggs? | **Yes** - Subtle footer reference |
| 5 | Project links: external only or include GitHub? | **User will provide** |
| 6 | What content for the CVs? | **Pending user input** |

---

## Approval

**This design document requires approval before implementation begins.**

- [x] Visual design direction approved
- [x] Color palette approved
- [x] Content (bio text) approved  
- [x] CV files provided (cv_eng.pdf, cv_es.pdf)
- [x] Open questions resolved

---
