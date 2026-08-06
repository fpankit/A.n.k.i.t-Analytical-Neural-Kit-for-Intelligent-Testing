ting
# Ankit AI Solutions — Landing Page Documentation

Comprehensive technical and user documentation for the **Ankit AI Solutions** landing page — a cyber-futurist, single-page marketing website featuring immersive 3D Spline scenes, glassmorphic UI, an interactive testimonial carousel, FAQ accordion with tabs, and a contact form.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Getting Started](#2-getting-started)
3. [Project Structure](#3-project-structure)
4. [Brand Design System](#4-brand-design-system)
5. [Page Sections](#5-page-sections)
6. [JavaScript Interactions](#6-javascript-interactions)
7. [3D Spline Integration](#7-3d-spline-integration)
8. [Legal Pages](#8-legal-pages)
9. [Responsive Breakpoints](#9-responsive-breakpoints)
10. [Dependencies](#10-dependencies)
11. [Customization Guide](#11-customization-guide)
12. [Deployment](#12-deployment)
13. [Troubleshooting](#13-troubleshooting)

---

## 1. Project Overview

Ankit AI Solutions is a premium AI-agency landing page built with **pure HTML, CSS, and Vanilla JavaScript** (no front-end framework required). The site showcases:

- **Hero section** with an interactive 3D robot scene rendered via Spline, overlaid with bold display typography.
- **About section** detailing AI automation, website design, automation agents, custom AI models, seamless integration, and scale-ready infrastructure — accompanied by a second 3D scene.
- **Testimonials** — a stagger-style 3D carousel showcasing 20 client quotes.
- **FAQs** — a tabbed, accordion-style FAQ with three categories (AI Automation, Web Development, Graphics Design).
- **Contact** — a glassmorphic card with contact info and a fully functional contact form.
- **Footer** — brand info and links to 7 legal policy pages.

### Key Features

| Feature | Description |
|---|---|
| **Immersive 3D** | Two interactive Spline scenes embedded via `<spline-viewer>` |
| **Cyber-Futurist Design** | Obsidian dark background, neon cyan glow accents, glassmorphism |
| **Custom Fonts** | Local WOFF/TTF fonts (`SamsungOne`, `MGN Humble`) + Google Fonts (Outfit, Plus Jakarta Sans, Space Mono) |
| **Interactive Carousel** | Stagger-testimonial carousel with navigation buttons and click-to-center |
| **Tabbed FAQ** | Category tabs + accordion behavior with animated expand/collapse |
| **Responsive** | Mobile-first with breakpoints at 1200px, 1024px, 992px, 900px, 768px, 640px, and 480px |
| **No Build Step** | Open `index.html` directly in a browser to run |

---

## 2. Getting Started

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox, Safari).
- (Optional) [Node.js](https://nodejs.org) & npm for dependency installation — the site only needs npm packages if you plan to use the React reference components in `/components/ui/`.

### Quick Start

Since the landing page is built with plain HTML/CSS/JS, you can run it **without any build step**:

```bash
# Option 1: Open directly in your browser
start index.html

# Option 2: Serve locally with a static server
npx serve .
```

### Installing Dependencies (Optional)

The site's runtime only requires the browser. The npm packages are used by the React reference components located in `components/ui/` (used during the design/translation workflow). If you want to install them anyway:

```bash
npm install
```

This installs:

- `@radix-ui/react-label` — accessible form label primitives
- `@radix-ui/react-slot` — slot composition primitive
- `class-variance-authority` — variant-driven class management
- `framer-motion` — animation library
- `lucide-react` — icon set

> **Note:** These packages are **not** required to run the HTML site. They are reference implementations only.

---

## 3. Project Structure

```
3d website/
│
├── index.html              # Main landing page (all sections)
├── index.css               # Full design system & section styles (~1400 lines)
├── app.js                  # All client-side interactions
├── package.json            # npm metadata (React reference deps)
├── package-lock.json       # npm lockfile
│
├── brand.md                # Brand design & color palette guideline
├── task.md                 # Task checklist used during development
├── docs.md                 # This documentation file
│
├── fonts/                  # Self-hosted fonts
│   ├── MGN-Humble.ttf      # Custom display font (logo)
│   ├── SamsungOne-400.woff # Body/UI font weight 400
│   └── SamsungOne-700.woff # Body/UI font weight 700
│
├── components/             # React reference components (not used by the site)
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── textarea.tsx
│       ├── contact-card.tsx
│       ├── contact-demo.tsx
│       ├── demo.tsx
│       ├── faq-demo.tsx
│       ├── faq-tabs.tsx
│       └── stagger-testimonials.tsx
│
├── privacy.html            # Legal: Privacy Policy
├── terms.html              # Legal: Terms of Service
├── security.html           # Legal: Security Policy
├── cookies.html            # Legal: Cookie Policy
├── refunds.html            # Legal: Refund Policy
├── copyright.html          # Legal: Copyright Notice
├── disclaimer.html         # Legal: Disclaimer
│
└── node_modules/           # Installed npm dependencies (optional)
```

---

## 4. Brand Design System

The complete brand system is defined in [`brand.md`](brand.md) and implemented as CSS custom properties in `index.css` under `:root`.

### 4.1 Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-color` | `#020205` | Obsidian Void — main page background |
| `--bg-card` | `rgba(10, 15, 30, 0.4)` | Glassmorphic fill for cards |
| `--bg-card-border` | `rgba(0, 162, 255, 0.15)` | Card borders (low opacity cyan) |
| `--bg-card-border-hover` | `rgba(0, 162, 255, 0.3)` | Card border on hover |
| `--text-primary` | `#ffffff` | Hyper-white headings & primary text |
| `--text-secondary` | `#8a99ad` | Muted cool grey — body & labels |
| `--text-tertiary` | `#52637a` | Low emphasis text |
| `--accent-cyan-start` | `#00a2ff` | Electric cyan gradient start |
| `--accent-cyan-end` | `#00e5ff` | Electric cyan gradient end |
| `--accent-purple` | `#a855f7` | Secondary purple accent (logo dot) |
| `--banner-bg` | `linear-gradient(90deg, #09091e, #1c0528)` | Top alert banner background |
| `--banner-text` | `#c7d2fe` | Banner text color |

### 4.2 Typography

| Family | Weight | Role |
|---|---|---|
| **MGN Humble** (TTF, local) | Normal | Brand logo wordmark |
| **SamsungOne** (WOFF, local) | 400 / 700 | Site navigation & system UI |
| **Outfit** (Google) | 400 / 600 / 800 / 900 | Headings & display text |
| **Plus Jakarta Sans** (Google) | 400–700 | Body copy |
| **Space Mono** (Google) | 400 / 700 | Mono accents (hero labels) |

Fonts are loaded via `@font-face` declarations (local files in `/fonts/`) plus Google Fonts `<link>` tags in the `<head>`.

### 4.3 Design Principles

- **Deep space aesthetic** — near-black background with subtle blue/violet tint.
- **Luminous neon glow** — cyan gradients, glow-shadows, and spotlight effects.
- **Glassmorphism** — translucent card backgrounds with `backdrop-filter: blur()` and 1px cyan-tinted borders.
- **Bold typography overlay** — massive stroke & solid text overlapping the 3D canvas.
- **Rounded geometry** — pill buttons (`border-radius: 9999px`) and high-radius cards (24–32px).

---

## 5. Page Sections

### 5.1 Top Alert Banner

- **Element:** `.top-banner` (`#banner`)
- **Content:** Announcement for the "Enterprise AI Accelerator program" with a link to the contact section.
- **Behavior:** Sits above the fixed header; the header offsets itself by `40px` to make room.

### 5.2 Header Navigation

- **Element:** `.main-header` (`#header`)
- **Contents:** Logo ("ANKIT" with glowing dot), nav menu (Home, About, Testimonials, FAQs, Contact), and two CTA buttons (**Sign in** — secondary, **Request demo** — primary).
- **Mobile:** A hamburger toggle (`.mobile-nav-toggle`) opens the nav as a full-screen overlay and locks body scroll (via `.no-scroll`).
- **Scroll behavior:** When the user scrolls (`window.scrollY > 20`), the `.scrolled` class removes the banner offset.

### 5.3 Hero Section

- **Element:** `.hero-section` (`#hero`)
- **Backgrounds:** Cybernetic grid overlay (`.grid-overlay`) + radial glow spotlight (`.glow-spotlight`).
- **3D Scene:** `<spline-viewer url="https://prod.spline.design/4IwzGcC1Bo3ZCSX2/scene.splinecode">` — an interactive 3D robot positioned behind the text.
- **Typography:** Stacked rows of massive text:
  - Row 1: `THE` (stroke) + `AI` (solid)
  - Row 2: `SOLUTIONS` (solid)
  - Row 3: `AGENCY` (stroke) + info block (tag + description)
- **Readability:** Dark backing shadows are applied to `.text-solid` and `.text-stroke`; `user-select: none` prevents text highlighting during drag on the 3D scene.

### 5.4 About Section

- **Element:** `.about-section` (`#about`)
- **Contents:**
  - Section header (tag "About Us", title, subtitle).
  - A 6-item feature grid:
    1. AI Automation
    2. Website Design
    3. Automation Agents
    4. Custom AI Models
    5. Seamless Integration
    6. Scale-Ready
  - Each feature has an inline SVG icon, title, and description.
- **3D Scene:** A second `<spline-viewer url="https://prod.spline.design/oHTAwY70E1otKXPg/scene.splinecode">` on the right side (stacks below on ≤992px). The Spline logo watermark is automatically hidden by JS.

### 5.5 Testimonials Section

- **Element:** `.testimonials-section` (`#testimonials`)
- **Design:** Black background, white headers, solid white cards, black card text.
- **Carousel:** A stagger/coverflow-style carousel rendered dynamically by `app.js` from a 20-item data array.
- **Card anatomy:** Diagonal corner line, author avatar image, quote text, author name + role.
- **Navigation:** Previous/next buttons (`.testimonials-nav`). Clicking any card re-centers it.
- **Performance:** Cards positioned beyond `±3` positions are hidden (`opacity: 0`, `visibility: hidden`, `pointer-events: none`) to optimize painting.

### 5.6 FAQs Section

- **Element:** `.faq-section` (`#faqs`)
- **Category tabs:** Three buttons — AI Automation, Web Development, Graphics Design — toggle between three FAQ lists.
- **Accordion items:** Each FAQ question is a button; clicking expands/collapses the answer and closes sibling items.
- **Content:** 14 total questions across the three categories (5 AI Automation, 5 Web Dev, 4 Graphics Design).

### 5.7 Contact Section

- **Element:** `.contact-section` (`#contact`)
- **Contact card:** A glassmorphic container with decorative `+` icons at the four corners.
- **Left side:** Heading, description, and contact info grid:
  - Email: `contact@21st.dev`
  - Phone: `+92 312 1234567`
  - Address: Faisalabad, Pakistan
- **Right side:** Form with fields for Name, Email, Phone, Message, and a Submit button.
- **Submission behavior:** The form is powered by [Formspree](https://formspree.io) (`form ID: xvkpolpb`). On submit, `app.js` sends a JSON `POST` to `https://formspree.io/f/xvkpolpb` via the `fetch` API. The button cycles through states: "Sending…" → "Message Sent!" (green) or error message (red), and auto-resets after 3–4 seconds.

### 5.8 Footer

- **Element:** `.main-footer`
- **Contents:**
  - Brand logo + tagline "Architecting cognitive futures for global scale."
  - **Company** links: Home, About, Testimonials (anchor links).
  - **Legal** links: Privacy, Terms, Security, Cookies, Refunds, Copyright, Disclaimer (separate HTML pages).
  - Bottom bar: © 2026 Ankit AI Solutions. All rights reserved.

---

## 6. JavaScript Interactions

All behavior lives in **`app.js`**, wrapped in a `DOMContentLoaded` listener.

| Feature | Implementation |
|---|---|
| **Sticky header** | `scroll` listener toggles `.scrolled` after 20px of scroll |
| **Mobile nav** | Hamburger toggles `.active` on nav & button; adds `.no-scroll` to body; closes on link click |
| **Card glow (mouse tracker)** | On `.testimonial-card` `mousemove`, sets `--mouse-x` / `--mouse-y` CSS variables |
| **Spline watermark removal** | On each `spline-viewer`, targets the shadow root's logo element (`#logo`, `.logo`, etc.) and hides it; runs on `load` + a fallback interval (40 × 100ms checks) |
| **Stagger testimonial carousel** | Renders 20 cards, computes positions relative to center, applies transforms (`translateX/translateY/rotate`), hides far cards, supports prev/next buttons and card-click centering, and re-renders on resize |
| **Contact form** | Prevents default submit; sends JSON to Formspree (`POST https://formspree.io/f/xvkpolpb`); shows loading, success, or error state on the button |
| **FAQ tabs** | Clicking a tab sets `.active` on the button and shows the matching `.faq-list` by `data-category` / `id` |
| **FAQ accordion** | Clicking a question toggles `.open` on the `.faq-item`; closes sibling items in the same list |

---

## 7. 3D Spline Integration

The site embeds two interactive 3D scenes using the Spline Viewer web component.

### 7.1 Hero Scene (Robot)

```html
<script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.0/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/4IwzGcC1Bo3ZCSX2/scene.splinecode"></spline-viewer>
```

- **Container:** `.hero-3d-container` — positioned behind the hero typography overlay.
- The loader script is included **once** on the page (in the hero section) and is reused by the second viewer.

### 7.2 About Scene

```html
<spline-viewer url="https://prod.spline.design/oHTAwY70E1otKXPg/scene.splinecode"></spline-viewer>
```

- **Container:** `.about-3d-container` — sits beside the feature grid.

### 7.3 Watermark Removal

`app.js` automatically hides the "Built with Spline" logo that renders inside each viewer's **shadow root**:

- It queries for `#logo`, `a[href*="spline.design"]`, `.logo`, or `#spline-logo`.
- Applies `display: none`, `opacity: 0`, `visibility: hidden`, `pointer-events: none`.
- Hooks into the viewer's `load` event, plus a 4-second polling fallback (40 checks × 100ms) in case the logo appears after load.

### 7.4 Styling / Performance Notes

- `.spline-viewer` elements are styled to fill their container.
- Hero text uses `user-select: none` so dragging on the 3D canvas doesn't highlight text.
- Scenes are loaded from Spline's CDN; network access is required for the 3D to appear.

---

## 8. Legal Pages

Seven standalone policy pages share a common template (header, `main.policy-page`, footer) and link back to `index.html`:

| File | Title |
|---|---|
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Service |
| `security.html` | Security Policy |
| `cookies.html` | Cookie Policy |
| `refunds.html` | Refund Policy |
| `copyright.html` | Copyright Notice |
| `disclaimer.html` | Disclaimer |

Each page:
- Uses the same `index.css` stylesheet (policy-specific classes like `.policy-page`, `.policy-header`).
- Is ~116 lines of structured legal content.
- Is linked from the footer's **Legal** column.

---

## 9. Responsive Breakpoints

The design scales across devices using `@media` queries in `index.css`:

| Breakpoint | What Changes |
|---|---|
| `≤1200px` | Reduces hero text size |
| `≤1024px` | Further reduces hero text size |
| `≤992px` | About layout stacks (3D container moves below) |
| `≤900px` | Hero last row compacts; info blocks adjust |
| `≤768px` | Root layout tokens adjust (`--header-height`, paddings); testimonial card size adjusts |
| `≤640px` | Mobile nav becomes available; stagger card size switches to `290px`; about feature grid stacks to single column |
| `≤480px` | Hero text collapses to minimal size |

**Testimonial carousel card sizing** (JS-driven):

```js
let cardSize = window.matchMedia("(min-width: 640px)").matches ? 365 : 290;
```

On window resize, the card size is re-evaluated and the carousel re-renders.

---

## 10. Dependencies

### Runtime (browser only)

- **Spline Viewer** `@splinetool/viewer@1.9.0` — loaded remotely via `unpkg` module script.
- **Google Fonts** — Outfit, Plus Jakarta Sans, Space Mono.
- **Local fonts** — `fonts/MGN-Humble.ttf`, `fonts/SamsungOne-400.woff`, `fonts/SamsungOne-700.woff`.

### npm (dev/reference only)

See `package.json`:

```json
{
  "@radix-ui/react-label": "^2.1.15",
  "@radix-ui/react-slot": "^1.3.3",
  "class-variance-authority": "^0.7.1",
  "framer-motion": "^13.0.0",
  "lucide-react": "^1.28.0"
}
```

These support the React reference components in `components/ui/` and are **not** loaded by the HTML pages.

---

## 11. Customization Guide

### Changing Brand Colors

Edit the CSS custom properties in the `:root` block of `index.css`:

```css
:root {
  --bg-color: #020205;
  --accent-cyan-start: #00a2ff;
  --accent-cyan-end: #00e5ff;
  --text-primary: #ffffff;
  --text-secondary: #8a99ad;
}
```

### Changing the 3D Scene

Replace the `url` attribute on any `<spline-viewer>`:

```html
<spline-viewer url="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"></spline-viewer>
```

### Editing Testimonials

Open `app.js` and modify the `testimonialsData` array:

```js
const testimonialsData = [
  {
    testimonial: "Your quote here",
    by: "Name, Role at Company",
    imgSrc: "https://i.pravatar.cc/150?img=1"
  },
  // ... add or remove items
];
```

The carousel automatically adjusts (`list` is a copy; center index is `length / 2`).

### Editing FAQ Content

Edit the `.faq-item` blocks inside each `.faq-list` in `index.html`. To add a new category:

1. Add a new tab button with a unique `data-category` value.
2. Add a matching `<div class="faq-list" id="faq-list-{category}">…</div>`.

### Editing Contact Info

Update the `.contact-info-item` blocks in the contact section of `index.html` (email `contact@21st.dev`, phone, address).

### Contact Form (Formspree)

The contact form is already wired to **Formspree** (form endpoint: `https://formspree.io/f/xvkpolpb`). The `app.js` handler:

1. Intercepts the submit event (`e.preventDefault()`).
2. Collects fields (`name`, `email`, `phone`, `message`) as JSON.
3. Sends a `POST` request to the Formspree endpoint with `Content-Type: application/json`.
4. On success (`response.ok`): shows "Message Sent!" in green, resets the form.
5. On error: displays the Formspree validation error or a network error message in red.

To use a **different Formspree form**, update the endpoint in both:
- `index.html` — the `<form action="...">` attribute and `<input type="hidden" name="_next" ...>`.
- `app.js` — the `fetch('https://formspree.io/f/NEW_FORM_ID', ...)` call.

To switch to a **custom backend** (e.g., Express, serverless function), replace the `fetch` call with your own API endpoint and adjust the request/response handling.

---

## 12. Deployment

Because the site is fully static, deployment is trivial — host the folder on any static file server or CDN.

### Options

- **GitHub Pages / Netlify / Vercel:** Upload the project root; no build command required.
- **Any web server:** Copy files to the document root (e.g., `htdocs`, `www`, `/var/www/html`).
- **Local preview:** `npx serve .` or double-click `index.html`.

### Pre-deployment checklist

- [ ] Confirm `index.html` references `index.css` and `app.js` with correct relative paths.
- [ ] Confirm the `fonts/` folder is uploaded (custom fonts are self-hosted).
- [ ] Verify legal pages (`privacy.html`, `terms.html`, etc.) are in the same directory as `index.html`.
- [ ] Verify internet access for Spline CDN scenes and Google Fonts (or self-host if offline).
- [ ] If the site must run offline, download the Spline scenes and update `url` attributes accordingly.

---

## 13. Troubleshooting

| Issue | Possible Cause | Fix |
|---|---|---|
| 3D scene doesn't load | No network access to `prod.spline.design` | Check connectivity; ensure the URL is correct |
| "Built with Spline" logo reappears | Timing of shadow DOM render | The JS polling (40 × 100ms) usually catches it; increase checks if needed |
| Custom fonts not rendering | `fonts/` folder missing/misnamed | Verify `fonts/MGN-Humble.ttf` and `SamsungOne-*.woff` exist |
| Mobile nav hamburger does nothing | JS failed to load | Ensure `app.js` is included just before `</body>` and has no syntax errors |
| Testimonial cards overlap | Window resized to a new breakpoint | The resize listener re-computes `cardSize` automatically |
| FAQ accordion stuck open | Multiple `.faq-item.open` classes | Only the clicked item should have `.open`; siblings are auto-closed |
| Legal page lacks styles | Wrong path to CSS | Legal pages reference `index.css` — keep all pages in the same root directory |

---

*Documentation generated for the Ankit AI Solutions landing page project.*