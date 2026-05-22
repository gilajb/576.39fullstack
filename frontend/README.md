# 576.39 — Website

> *A systems architecture and cultural intelligence institution designing operational frameworks for Africa's next economic era.*

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Design Philosophy](#2-design-philosophy)
3. [Tech Stack](#3-tech-stack)
4. [Project Structure](#4-project-structure)
5. [Getting Started](#5-getting-started)
6. [Component Reference](#6-component-reference)
7. [Constants & Tokens](#7-constants--tokens)
8. [Custom Hooks](#8-custom-hooks)
9. [Animations & Interactions](#9-animations--interactions)
10. [Responsive Design](#10-responsive-design)
11. [Typography System](#11-typography-system)
12. [Color System](#12-color-system)
13. [Customisation Guide](#13-customisation-guide)
14. [Deployment](#14-deployment)
15. [Extending the Site](#15-extending-the-site)
16. [Brand Guidelines Summary](#16-brand-guidelines-summary)

---

## 1. Project Overview

This is the official website for **576.39**, an African systems architecture and cultural intelligence institution. The site is built as a React single-page application using Vite as the build tool.

### Core Aesthetic
The site communicates **"quiet strategic power"** — it is:
- Precise, cinematic, restrained, and intelligent
- Editorial and institutional in tone
- Rooted in modern African luxury without Pan-African visual clichés
- Designed to feel like **entering an institution**, not a creative agency portfolio

### Sections (in order)
| Section | Component | Description |
|---|---|---|
| Loading screen | `Loader` | Animated counter with gold progress bar |
| Navigation | `Nav` | Fixed top bar, transparent → frosted-glass on scroll |
| Hero | `Hero` | Fullscreen parallax with animated headline + dual CTAs |
| Marquee | `Marquee` | Continuous scrolling ticker strip |
| About | `About` | Two-column editorial manifesto |
| Philosophy | `Philosophy` | Five service pillars on deep cherry background |
| Divisions | `Divisions` | Tabbed three-division layout |
| Gallery | `Gallery` | Masonry image grid with hover overlays |
| Case Studies | `CaseStudy` | Table-style project listings |
| Founder | `Founder` | Portrait + strategic positioning copy |
| Testimonials | `Testimonials` | Rotating quote carousel with dot nav |
| Journal | `Journal` | Three-column editorial card grid |
| Contact | `Contact` | Split inquiry form with success state |
| Footer | `Footer` | Minimal wordmark + nav + copyright |

---

## 2. Design Philosophy

### Visual Language
- **Brutalist luxury**: severe grid structures paired with warm, rich materials
- **Editorial intelligence**: generous whitespace, large serif headlines, restrained body text
- **Cinematic governance**: every section feels like a considered, deliberate frame
- **Archive aesthetics**: numbered items, code-like identifiers, institutional spacing
- **African strategic futurism**: warm earthy palette, zero cliché, globally legible

### What the Site Deliberately Avoids
- Loud Afrofuturism imagery
- Generic tech startup layout patterns
- NGO / charity visual language
- Motivational influencer energy
- Excessive animation or decorative overload
- Startup buzzwords ("empowering", "disrupting", "innovating")

---

## 3. Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18.x | UI component framework |
| Vite | 5.x | Development server & bundler |
| CSS-in-JS (inline styles) | — | Scoped component styling |
| CSS (`global.css`) | — | Resets, animations, responsive breakpoints |
| Google Fonts | — | Cormorant Garamond + Poppins |

No external UI libraries. No CSS framework. No animation library dependency — all animations are pure CSS and React state-driven transitions.

---

## 4. Project Structure

```
576-39-website/
├── public/
│   └── favicon.svg                  # Gold "576" SVG favicon
│
├── src/
│   ├── constants/
│   │   └── palette.js               # Single source of truth for all colours
│   │
│   ├── hooks/
│   │   └── useIntersection.js       # useIntersection + useParallax hooks
│   │
│   ├── components/
│   │   ├── Loader.jsx               # Cinematic loading screen
│   │   ├── Nav.jsx                  # Fixed navigation bar
│   │   ├── Hero.jsx                 # Fullscreen hero section
│   │   ├── Marquee.jsx              # Scrolling ticker strip
│   │   ├── About.jsx                # Two-column about section
│   │   ├── Philosophy.jsx           # Service pillars strip
│   │   ├── Divisions.jsx            # Tabbed divisions layout
│   │   ├── Gallery.jsx              # Masonry image grid
│   │   ├── CaseStudy.jsx            # Case study table
│   │   ├── Founder.jsx              # Founder portrait section
│   │   ├── Testimonials.jsx         # Quote rotator
│   │   ├── Journal.jsx              # Essay card grid
│   │   ├── Contact.jsx              # Inquiry form
│   │   └── Footer.jsx               # Site footer
│   │
│   ├── styles/
│   │   └── global.css               # Global resets, keyframes, responsive rules
│   │
│   ├── App.jsx                      # Root component — assembles all sections
│   └── main.jsx                     # React DOM entry point
│
├── index.html                       # Vite HTML entry point with meta tags
├── vite.config.js                   # Vite configuration
├── package.json                     # Dependencies & scripts
├── .eslintrc.cjs                    # ESLint config
└── .gitignore                       # Git ignore rules
```

---

## 5. Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher (or **pnpm** / **yarn** — adjust commands accordingly)

### Installation

```bash
# 1. Navigate into the project folder
cd 576.39fullstack

# 2. Install dependencies
npm install

# 3. Start the development server (opens at http://localhost:3000)
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with hot-module replacement |
| `npm run build` | Production build → outputs to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all `.js` and `.jsx` files |

---

## 6. Component Reference

### `Loader`
**Props:** `onDone: () => void`

Renders a full-screen loading overlay with the 576.39 wordmark and an animated percentage counter. The progress bar uses a randomised interval to feel organic rather than mechanical. When the counter hits 100, it fades out and calls `onDone`.

---

### `Nav`
**Props:** none

Fixed top navigation. Listens to `window.scrollY` to toggle between the transparent (hero-overlay) state and the frosted-glass (scrolled) state at 60px. On screens ≤768px the desktop link list is hidden and replaced by a hamburger button that opens a fullscreen overlay menu.

---

### `Hero`
**Props:** none

Fullscreen section with:
- Parallax background image (offset calculated from `useParallax`)
- Layered gradient and film-grain overlays for depth
- Animated entrance (opacity + translateY on mount)
- Two CTA anchor links: **Enter Institution** (solid gold) and **Our Divisions** (outlined)
- Animated scroll indicator (vertical text + gold gradient line)

---

### `Marquee`
**Props:** none

A CSS `marquee` keyframe animates a flex row of items at 30 seconds per cycle. Items are tripled in the DOM so the loop is seamless with no flash-to-start.

---

### `About`
**Props:** none

Two-column section. Left column: overline label, large serif headline, two paragraphs, three stat counters. Right column: a portrait image with hover-zoom, a decorative cherry-red accent box (bottom-right), and a corner-frame decoration (top-left).

---

### `Philosophy`
**Props:** none

Five flex-wrap cards on a deep cherry background. Each card darkens slightly on hover and raises its border opacity. Cards stagger in with `transition-delay` multiples of `0.1s`.

---

### `Divisions`
**Props:** none

**State:** `active: number` (0–2) — the currently displayed division.

A two-column layout: left sidebar = clickable division tabs, right panel = detail content + image. The active tab is highlighted with a left gold border. Division data lives in the `DIVISIONS` array at the top of the file — update it there to change content.

---

### `Gallery`
**Props:** none

A 3-column CSS grid where some items span 2 rows. Each image wraps a native `<img>` tag (with `loading="lazy"`) and an absolutely-positioned `.gallery-overlay` div. On hover, the image scales up and the overlay fades in via `onMouseEnter`/`onMouseLeave` handlers that reach into child elements.

---

### `CaseStudy`
**Props:** none

A column of borderless rows using a 5-column CSS grid. Rows slide in from the left. Each row highlights on hover with a subtle left-padding transition. Data is defined in the `CASES` array.

---

### `Founder`
**Props:** none

Two columns: portrait image (with gradient overlay + name caption) on the left, copy + pull-quote on the right. Both columns animate in from opposite horizontal directions.

---

### `Testimonials`
**Props:** none

**State:** `active: number` — current quote index.

Three quotes controlled by pill-shaped dot buttons. The displayed quote transitions via `opacity` change on the quote container.

---

### `Journal`
**Props:** none

Three-column card grid. Cards use `onMouseEnter`/`onMouseLeave` to toggle border and background colours. All card data is defined in the `POSTS` array.

---

### `Contact`
**Props:** none

**State:** `sent: boolean` — toggles between the inquiry form and a success state.

Left column: institutional pitch text + three contact detail rows. Right column: form with name, organisation, email, division selector, message textarea, and submit button. On submit, `setSent(true)` swaps the form for a centred ✦ confirmation message.

> **Note:** The form currently has no backend integration. See [Extending the Site](#15-extending-the-site) for wiring instructions.

---

### `Footer`
**Props:** none

Three-column flex row: wordmark + tagline, navigation links, copyright. A gold gradient `<div>` acts as a decorative horizontal rule below the columns.

---

## 7. Constants & Tokens

### `src/constants/palette.js`

All colours are defined here as a single exported object. **Never hardcode hex values in components** — always import from this file.

```js
import PALETTE from "../constants/palette";

// Usage
style={{ color: PALETTE.gold }}
```

| Token | Hex | Usage |
|---|---|---|
| `obsidian` | `#0A0705` | Primary background |
| `deepCherry` | `#6B0F1A` | Accent sections (Philosophy, Testimonials, Marquee) |
| `burgundy` | `#800020` | Reserve / future use |
| `wine` | `#722F37` | Reserve / future use |
| `crimson` | `#8B0000` | Reserve / future use |
| `gold` | `#C9A84C` | Primary accent, CTAs, borders, labels |
| `champagne` | `#F5E6C8` | Secondary text on dark backgrounds |
| `ivory` | `#FAF5EC` | Primary text on dark backgrounds |
| `cream` | `#F2EAD3` | Light section backgrounds (Case Study) |
| `marble` | `#E8E0D4` | Reserve / future use |
| `graphite` | `#2A2520` | Section backgrounds (Divisions, Journal) |
| `warmBrown` | `#4A3728` | Secondary text on light backgrounds |
| `copper` | `#B87333` | Reserve / future use |
| `ashGray` | `#9B9590` | Muted labels and secondary nav text |

---

## 8. Custom Hooks

### `useIntersection(threshold = 0.15)`

Returns `[ref, isVisible]`. Attach `ref` to a container element. `isVisible` becomes `true` once that element enters the viewport past the threshold — it never returns to `false`. The observer disconnects after the first trigger to avoid unnecessary work.

```jsx
const [ref, visible] = useIntersection(0.1);

return (
  <section ref={ref} style={{ opacity: visible ? 1 : 0, transition: "opacity 1s" }}>
    {/* content */}
  </section>
);
```

### `useParallax()`

Returns the current `window.scrollY` value, updated on every scroll event (passive listener). Used in `Hero.jsx` to offset the background image:

```jsx
const parallax = useParallax();
// ...
style={{ transform: `translateY(${parallax * 0.3}px)` }}
```

---

## 9. Animations & Interactions

All animations are **CSS-only or React-state-driven** — no animation library is required.

### Keyframes (defined in `global.css`)

| Name | Behaviour | Used in |
|---|---|---|
| `pulse` | Opacity 1 → 0.3 → 1 over 2s | Hero scroll indicator |
| `marquee` | translateX(0) → translateX(-50%) over 30s | Marquee strip |
| `fadeInUp` | opacity 0 + translateY(24px) → visible | Available for future use |

### Scroll-triggered entrance animations

Every major section uses `useIntersection` to gate a CSS `transition` on `opacity` and `transform`. The pattern is consistent across all components:

```jsx
const [ref, visible] = useIntersection(0.1);

<div
  ref={ref}
  style={{
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
  }}
>
```

### Staggered children

When multiple children should animate in sequence, each child gets an additional `transition-delay`:

```jsx
transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`
```

### Hover interactions

Hover effects are applied via `onMouseEnter`/`onMouseLeave` with direct `style` mutations for performance (avoids React re-renders). Examples:
- Image zoom: `transform: scale(1.07)`
- Card border brightening: `borderColor` toggle
- CTA padding expansion: right-padding increase on hover

---

## 10. Responsive Design

Breakpoints are handled in `src/styles/global.css` using standard `@media` queries. All layout values use `clamp()` for fluid scaling between breakpoints.

| Breakpoint | Behaviour |
|---|---|
| `≤ 768px` | Desktop nav hidden → hamburger menu. Two-column grids (About, Founder, Contact) collapse to single column. |
| `≤ 900px` | Divisions sidebar + content panel stack vertically. Case study rows reflow to 2 columns. |
| `≤ 600px` | Gallery masonry grid collapses to single column. |

All font sizes, section paddings, and hero text use `clamp(min, preferred, max)` to scale smoothly without breakpoint jumps.

---

## 11. Typography System

Two Google Fonts are loaded via the `@import` in `global.css`:

| Family | Weights | Role |
|---|---|---|
| **Cormorant Garamond** | 300, 400, 500, 600 (+ italic variants) | Headlines, manifestos, body copy, quotes, case study text |
| **Poppins** | 200, 300, 400, 500 | Labels, overlines, navigation, tags, small caps text |

### Usage conventions

| Element | Font | Weight | Notes |
|---|---|---|---|
| Section overlines | Poppins | 400 | `font-size: 10px`, `letter-spacing: 0.4em`, uppercase |
| H1 / hero title | Cormorant Garamond | 300 | Italic accent word in `<em>` |
| H2 section titles | Cormorant Garamond | 300 | Italic accent word in `<em>` |
| Body paragraphs | Cormorant Garamond | 300 | `font-size: 18–20px`, `line-height: 1.7` |
| Navigation links | Poppins | 400 | `font-size: 11px`, uppercase, spaced |
| Pill labels / tags | Poppins | 400 | `font-size: 9–10px`, uppercase, bordered |
| Pull quotes | Cormorant Garamond | 300 | Italic, large |
| Numbers / stats | Cormorant Garamond | 300 | `font-size: 48px` |

---

## 12. Color System

The palette is built around warm-dark editorial luxury. Section backgrounds rotate through four values to create visual rhythm without repetition:

| Background | Sections |
|---|---|
| `obsidian` (`#0A0705`) | Hero, About, Gallery, Founder, Contact, Footer |
| `deepCherry` (`#6B0F1A`) | Marquee, Philosophy, Testimonials |
| `graphite` (`#2A2520`) | Divisions, Journal |
| `cream` (`#F2EAD3`) | Case Studies |

**Gold (`#C9A84C`)** appears consistently as:
- CTA button fill
- Section overline labels
- Numbered item prefixes
- Border accents
- Stat numbers
- Scroll indicator line

---

## 13. Customisation Guide

### Changing brand copy

All content lives **directly in each component file** as a `const` array or inline JSX at the top of the file. There is no CMS or external data source.

| What to change | Where to find it |
|---|---|
| Navigation links | `Nav.jsx` → `NAV_LINKS` array |
| Hero headline + subtext | `Hero.jsx` → JSX inside `<h1>` and `<p>` |
| Marquee items | `Marquee.jsx` → `ITEMS` array |
| About body copy + stats | `About.jsx` → `STATS` array + JSX paragraphs |
| Philosophy pillars | `Philosophy.jsx` → `BELIEFS` array |
| Divisions content | `Divisions.jsx` → `DIVISIONS` array |
| Gallery images | `Gallery.jsx` → `IMAGES` array (swap `src` URLs) |
| Case studies | `CaseStudy.jsx` → `CASES` array |
| Founder name + bio | `Founder.jsx` → JSX directly |
| Testimonials | `Testimonials.jsx` → `QUOTES` array |
| Journal posts | `Journal.jsx` → `POSTS` array |
| Contact details | `Contact.jsx` → `CONTACT_DETAILS` array |
| Footer links | `Footer.jsx` → `FOOTER_LINKS` array |

### Swapping images

All images currently use Unsplash URLs. To use real brand photography:
1. Place images in `public/images/`
2. Reference them as `/images/your-photo.jpg` in the component
3. Or host them on a CDN and update the URL strings in the `IMAGES` / component arrays

### Changing colours

Edit `src/constants/palette.js`. All components import `PALETTE` from this file, so a single change propagates everywhere.

---

## 14. Deployment

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# For production
vercel --prod
```

Vercel auto-detects Vite projects. No configuration needed.

### Netlify

```bash
npm run build
# Deploy the generated dist/ folder via Netlify drag-and-drop
# or connect your Git repo and set:
#   Build command: npm run build
#   Publish directory: dist
```

### Manual / VPS

```bash
npm run build
# Upload the dist/ directory to your server
# Point your web server (nginx / caddy) root to dist/
# Ensure all routes return index.html for client-side routing
```

### Environment variables

This project currently has no environment variables. If you add a backend form endpoint or analytics key, create a `.env` file:

```
VITE_FORM_ENDPOINT=https://your-api.com/inquiries
VITE_GA_ID=G-XXXXXXXXXX
```

Access in code: `import.meta.env.VITE_FORM_ENDPOINT`

---

## 15. Extending the Site

### Wiring the contact form

The `Contact` component currently fakes a submission with `setSent(true)`. To connect it to a real endpoint:

```jsx
// Inside Contact.jsx — replace the button onClick handler:

const handleSubmit = async () => {
  const payload = { name, org, email, division, message };
  await fetch(import.meta.env.VITE_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  setSent(true);
};
```

Recommended services: **Formspree**, **EmailJS**, **Resend**, or a custom Django/FastAPI endpoint.

### Adding a CMS

For a headless CMS approach:
- **Sanity.io** — excellent for editorial/journal content
- **Contentful** — suitable for structured content (divisions, case studies)
- **Notion API** — lightweight option for journal posts

Replace the static `POSTS`, `CASES`, and `DIVISIONS` arrays with `useEffect` + `fetch` calls to your CMS API.

### Adding page transitions

Install `framer-motion`:

```bash
npm install framer-motion
```

Wrap section components with `<motion.div>` and replace the inline `opacity`/`transform` transitions with Framer's `initial`/`animate`/`exit` variants.

### Adding a router

If the journal posts or case studies need individual pages:

```bash
npm install react-router-dom
```

Wrap `App.jsx` in `<BrowserRouter>` and add `<Routes>` with `<Route>` entries for `/journal/:slug` and `/work/:slug`.

---

## 16. Brand Guidelines Summary

*(Extracted from the 576.39 Brand & Website Architecture Framework)*

### The Name
**576.39** must have internal symbolic logic. It should feel like:
- a protocol, a classified file, a system, a sovereign institution

Mystery works only when structure exists underneath. The number must never be arbitrary.

### Tone of Voice
- Intelligent, restrained, sharp, calm, strategic
- Never: startup buzzwords, "empowering Africa" clichés, excessive optimism, saviour language
- The writing should communicate: *"We understand the system deeply enough to redesign parts of it."*

### What 576.39 Is Not
- A creative agency
- A consultancy
- A luxury brand
- An African startup

### What 576.39 Is
An **African institutional intelligence house** that integrates:
- Systems thinking
- Cultural intelligence
- African context
- Operational design
- Narrative infrastructure

### Founder Positioning
Nasambu Kong'ani is positioned as a strategist, systems thinker, institutional architect, and cultural analyst — **not** a motivational personality or social media figure.

---

*Built for 576.39. All systems reserved. © 2026*
