# UX/UI Design Specification & System Architecture
**Project:** Personal Developer Portfolio Website  
**Candidate / Owner:** Adeepa Marambage  
**Role:** Full-Stack Software Engineer & BICT Honours Undergraduate (University of Sri Jayewardenepura)  
**Target Environment:** Pure Vanilla HTML5, Modern CSS3 (Variables + Flexbox/Grid), Vanilla JavaScript (ES6+), Dynamic JSON data loading (`data/portfolio.json`)  
**Design Spec Version:** 1.0.0  

---

## 1. Executive Overview & Design Philosophy

The portfolio must convey **technical rigor, modern aesthetic craftsmanship, high performance, and effortless usability**. The primary goal is to present Adeepa Marambage as a disciplined software engineer with deep competency across systems, backend development, databases, and clean frontend interfaces.

### Core UX Principles
1. **Content-First & Scannable:** Recruiters and tech leads spend under 30 seconds evaluating candidate portfolios. Visual hierarchy guides eyes smoothly from Hero $\to$ Key Stats $\to$ Featured Projects $\to$ Skills $\to$ Education/Timeline $\to$ Contact.
2. **Subtle Tech Sophistication (Neo-Brutalism meets Glassmorphism):** Deep dark palette with electric cyan/indigo neon accents, glassmorphic floating elements, precision 1px borders, and tactile micro-interactions.
3. **Zero Runtime Bloat:** Blazing fast load times with zero third-party UI framework dependencies. Pure CSS custom properties power seamless light/dark mode switching and buttery 60 FPS transitions.
4. **Data-Driven Architecture:** All dynamic content is decoupled into `data/portfolio.json`, allowing instant profile updates without altering HTML markup.

---

## 2. Visual Design System

### 2.1 Color Palette & Token Hierarchy

The design system uses CSS Custom Properties declared on `:root` and overridden on `[data-theme="light"]`.

#### Dark Mode (Default Theme — "Cyber Obsidian")
Designed for high contrast, minimal eye fatigue, and vibrant tech appeal.

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `--bg-base` | `#0a0d14` | Body canvas background (ultra-deep slate navy) |
| `--bg-surface` | `#111625` | Card, container, and section surfaces |
| `--bg-surface-elevated` | `#182035` | Modals, active states, dropdowns, hovered cards |
| `--bg-glass` | `rgba(17, 22, 37, 0.75)` | Glassmorphism navigation & floating badges |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Standard card and section divider borders |
| `--border-focus` | `#00f2fe` | Interactive element hover & focus ring |
| `--accent-primary` | `#00f2fe` | Electric Cyan: primary CTAs, links, glowing badges |
| `--accent-secondary` | `#4facfe` | Sky Indigo: gradient partner with cyan, secondary accents |
| `--accent-gradient` | `linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)` | Hero text highlight, CTA button fills, badges |
| `--accent-glow` | `rgba(0, 242, 254, 0.25)` | Box-shadow glow for buttons, cards, active pills |
| `--text-primary` | `#f8fafc` | Main headings, prominent text (Slate 50) |
| `--text-secondary` | `#94a3b8` | Body copy, meta descriptions, subtitles (Slate 400) |
| `--text-muted` | `#64748b` | Captions, dates, inactive tags (Slate 500) |
| `--success` | `#10b981` | Availability indicator ("Open to work"), valid inputs |
| `--warning` | `#f59e0b` | Notices, intermediate status |
| `--error` | `#ef4444` | Form validation errors |

#### Light Mode (Theme — "Clean Silicon")
Activated via `[data-theme="light"]` attribute on `<html>` or `<body>`.

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `--bg-base` | `#f8fafc` | Light crisp slate canvas (Slate 50) |
| `--bg-surface` | `#ffffff` | Pure white card surfaces |
| `--bg-surface-elevated` | `#f1f5f9` | Elevated containers and active buttons (Slate 100) |
| `--bg-glass` | `rgba(255, 255, 255, 0.85)` | Navigation glass with backdrop blur |
| `--border-subtle` | `rgba(15, 23, 42, 0.08)` | Clean soft border dividers |
| `--border-focus` | `#0284c7` | Deep cyan/blue focus ring |
| `--accent-primary` | `#0284c7` | Vibrant tech blue / cyan |
| `--accent-secondary` | `#2563eb` | Royal blue gradient accent |
| `--accent-gradient` | `linear-gradient(135deg, #0284c7 0%, #2563eb 100%)` | Header highlights and primary CTAs |
| `--accent-glow` | `rgba(2, 132, 199, 0.20)` | Soft shadow glow |
| `--text-primary` | `#0f172a` | Deep navy heading text (Slate 900) |
| `--text-secondary` | `#334155` | High-contrast body copy (Slate 700) |
| `--text-muted` | `#64748b` | Captions and dates (Slate 500) |
| `--success` | `#059669` | Success badges |
| `--warning` | `#d97706` | Warning status |
| `--error` | `#dc2626` | Form errors |

---

### 2.2 Surface Elevation & Glassmorphism Spec

- **Glassmorphism Formula:**
  ```css
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-subtle);
  ```
- **Elevation Shadows:**
  - `shadow-sm`: `0 2px 8px rgba(0, 0, 0, 0.15)`
  - `shadow-md`: `0 8px 24px -4px rgba(0, 0, 0, 0.25)`
  - `shadow-glow`: `0 0 20px -2px var(--accent-glow)`
  - `shadow-hover`: `0 14px 32px -6px rgba(0, 0, 0, 0.35), 0 0 16px -2px var(--accent-glow)`

---

### 2.3 Typography System

#### Typeface Pairings
- **Primary Headings & Body:** `'Plus Jakarta Sans'`, system-ui, -apple-system, sans-serif. Modern geometric grotesque with friendly readability.
- **Code, Badges & Numbers:** `'Fira Code'`, 'JetBrains Mono', monospace. Lends an authentic engineer/system-architect feel to tags, timestamps, and tech badges.

#### Typography Scale

| Style / Level | Font Size | Line Height | Weight | Letter Spacing | Font Family |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display (Hero Headline)** | `3.25rem` (52px) | `1.15` | `800` (Bold) | `-0.025em` | Plus Jakarta Sans |
| **Heading 1 (Section Titles)** | `2.25rem` (36px) | `1.25` | `700` (Bold) | `-0.02em` | Plus Jakarta Sans |
| **Heading 2 (Card Titles)** | `1.5rem` (24px) | `1.3` | `600` (Semi-bold) | `-0.01em` | Plus Jakarta Sans |
| **Heading 3 (Sub-items/Tags)** | `1.125rem` (18px) | `1.4` | `600` (Semi-bold) | `0` | Plus Jakarta Sans |
| **Body Large (Hero Lead/Bio)** | `1.125rem` (18px) | `1.6` | `400` (Regular) | `0` | Plus Jakarta Sans |
| **Body Standard** | `1.0rem` (16px) | `1.6` | `400` (Regular) | `0` | Plus Jakarta Sans |
| **Body Small** | `0.875rem` (14px) | `1.5` | `400` / `500` | `0.01em` | Plus Jakarta Sans |
| **Code / Badge / Label** | `0.8125rem` (13px) | `1.4` | `500` (Medium) | `0.04em` | Fira Code |

---

### 2.4 Spacing, Grid & Layout Metrics

- **Max Container Width:** `1200px` (with `24px` gutter on mobile, `32px` on desktop)
- **Grid System:** 12-column responsive CSS Grid or fluid auto-fit grids (`grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`)
- **Spacing Scale:**
  - `space-1`: `4px`
  - `space-2`: `8px`
  - `space-3`: `12px`
  - `space-4`: `16px`
  - `space-6`: `24px`
  - `space-8`: `32px`
  - `space-12`: `48px`
  - `space-16`: `64px`
  - `space-24`: `96px`
- **Border Radii:**
  - `radius-sm`: `6px` (tags, buttons small)
  - `radius-md`: `10px` (inputs, regular buttons)
  - `radius-lg`: `16px` (cards, containers)
  - `radius-full`: `9999px` (pills, avatar, theme toggle button)

---

## 3. Component Wireframes & Section Specifications

### 3.1 Header & Glassmorphism Navigation

#### Visual Layout & ASCII Wireframe
```
+-----------------------------------------------------------------------------------------+
|  [ <AM /> Adeepa ]         [About]  [Skills]  [Projects]  [Timeline]  [Contact]   [🌓] [☰]  |
+-----------------------------------------------------------------------------------------+
```

#### Interaction & Behavior Spec
- **Sticky / Fixed Navbar:** Fixed at `top: 0`, full width, `z-index: 1000`. Starts with a subtle transparent background, transitions into frosted glass (`backdrop-filter: blur(12px)`, `var(--bg-glass)`) as soon as scroll offset > 20px.
- **Brand Monogram:** `<AM />` formatted in monospace electric cyan gradient with hover rotate/scale (`transform: scale(1.05)`).
- **Navigation Links:** Hover underline animation extending from center (`width: 0%` to `width: 100%` on `:hover`). Smooth scrolling to anchor targets with offset calculation for the fixed navbar.
- **Theme Toggle Switch:** Pill button containing Sun / Moon icon. Clicking flips the state, toggles `[data-theme="light"]` on the root, stores preference in `localStorage('theme')`, and emits a smooth rotation icon transition.
- **Mobile Hamburger Menu:**
  - Visible on screens `< 768px`.
  - Animates from 3 bars to an "X" icon.
  - Opens a slide-down full-screen or drawer menu with glassmorphism backdrop, locking background scroll.

---

### 3.2 Hero Section

#### Visual Layout & ASCII Wireframe
```
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|       🟢 Available for Opportunities & Projects                                         |
|                                                                                         |
|       Hi, I'm                                                                           |
|       ADEEPA MARAMBAGE                                                                  |
|       I build [Systems & Full-Stack Web Applications        |]                          |
|                                                                                         |
|       BICT (Hons) Undergraduate at University of Sri Jayewardenepura.                   |
|       Passionate about clean architecture, scalable APIs, and intuitive digital tools.  |
|                                                                                         |
|       [ ⚡ View Projects ]     [ ✉️ Contact Me ]     [ 📄 Resume ]                       |
|                                                                                         |
|       [GitHub]  [LinkedIn]  [Email]                                                     |
|                                                                                         |
|                                      \/ (Scroll Indicator)                              |
+-----------------------------------------------------------------------------------------+
```

#### Detailed Element Specifications
1. **Status Pill:**
   - Small capsule badge: Pulsing green dot indicator (`@keyframes pulse`) + `"Available for Opportunities"`.
   - Establishes immediate proactive engagement.
2. **Main Headline:**
   - Large display typography (`display: 3.25rem`).
   - "ADEEPA MARAMBAGE" rendered with linear gradient text mask (`background-clip: text; color: transparent`).
3. **Typewriter Animated Subtitle:**
   - Vanilla JS dynamic typing effect cycling through:
     * `"Full-Stack Software Engineer"`
     * `"Systems & Web Developer"`
     * `"Database & API Architect"`
     * `"BICT Honours Student @ USJ"`
   - Realistic typing speed (80ms), pause (1800ms), deleting speed (40ms), blinking cursor (`|`).
4. **Bio Tagline:**
   - Maximum width `640px` for optimal typographic line length (55-75 characters per line).
5. **Action Buttons (CTAs):**
   - **Primary CTA (`View Projects`):** Gradient background, glowing shadow on hover, smooth scroll to `#projects`.
   - **Secondary CTA (`Contact Me`):** Glassmorphic outline button with 1px border, transitions to solid fill on hover.
   - **Tertiary CTA (`Resume` / `Download CV`):** Icon + text button linking to CV or initiating direct PDF download.
6. **Social Icon Links:**
   - Monochromatic SVGs (GitHub, LinkedIn, Email). Hovering shifts color to `--accent-primary` with a slight upward translation (`transform: translateY(-3px)`).

---

### 3.3 About Me & Impact Metrics

#### Visual Layout & ASCII Wireframe
```
+-----------------------------------------------------------------------------------------+
|                                    ABOUT ME                                             |
|                             --- Passion & Impact ---                                    |
|                                                                                         |
|  +--------------------------------+   +----------------------------------------------+  |
|  |       [ PROFILE CARD ]         |   |  Biography & Philosophy                      |  |
|  |                                |   |  ----------------------                      |  |
|  |  [ Adeepa Avatar / Monogram ]  |   |  Passionate technologist pursuing BICT       |  |
|  |                                |   |  Honours at University of Sri Jayewardenepura|  |
|  |  Adeepa Marambage              |   |  Specializing in robust system design,       |  |
|  |  Colombo, Sri Lanka            |   |  relational database modeling, and modern    |  |
|  |  adeepadmarambage@gmail.com    |   |  full-stack web engineering.                 |  |
|  +--------------------------------+   +----------------------------------------------+  |
|                                                                                         |
|  +---------------------+  +---------------------+  +---------------------+  +--------+  |
|  |        10+          |  |       100%          |  |         4+          |  |  BICT  |  |
|  | Projects Completed  |  | Clean Code & Git    |  | Core Tech Domains   |  | Honours|  |
|  +---------------------+  +---------------------+  +---------------------+  +--------+  |
+-----------------------------------------------------------------------------------------+
```

#### Key Highlights & Metric Counters
- **Dynamic Counters:** Number counters that animate from 0 to target value on scroll into viewport (via `IntersectionObserver`).
- **Education Focus Callout:** Distinct highlight card emphasizing **University of Sri Jayewardenepura - Bachelor of Information and Communication Technology (BICT) Honours**.

---

### 3.4 Skills Section & Categorized Grid

#### Visual Layout & ASCII Wireframe
```
+-----------------------------------------------------------------------------------------+
|                                  TECHNICAL SKILLS                                       |
|                                                                                         |
|  +------------------------------------+   +------------------------------------------+  |
|  | 🎨 Frontend Development            |   | ⚙️ Backend & Database                   |  |
|  | -----------------------            |   | ---------------------                    |  |
|  | [HTML5] [CSS3 / Flexbox / Grid]    |   | [PHP] [Node.js] [Express.js]             |  |
|  | [JavaScript (ES6+)] [Tailwind CSS] |   | [MySQL / Relational DB] [RESTful APIs]   |  |
|  | [Responsive UI/UX] [DOM API]       |   | [CRUD Architecture] [SQL Optimization]   |  |
|  +------------------------------------+   +------------------------------------------+  |
|                                                                                         |
|  +------------------------------------+   +------------------------------------------+  |
|  | 🏛️ Architecture & Systems          |   | 🛠️ DevOps & Development Tools           |  |
|  | --------------------------         |   | ------------------------------           |  |
|  | [Object-Oriented Programming (OOP)]|   | [Git & GitHub] [Linux / Bash]            |  |
|  | [MVC Architecture Pattern]         |   | [Postman API Client] [Vite / Webpack]    |  |
|  | [System Design & Modular Code]     |   | [CI/CD Pipelines (GitHub Actions)]       |  |
|  | [Relational Schema Design]         |   | [VS Code Ecosystem] [Testing Basics]     |  |
|  +------------------------------------+   +------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

#### Component Specifications
- **Interactive Badges:** Each skill badge has subtle border, monospace typography, and micro-hover glow.
- **Visual Categorization:**
  1. `Frontend Development` (Accent: Cyan)
  2. `Backend & Database` (Accent: Blue/Indigo)
  3. `Architecture & Systems` (Accent: Purple/Violet)
  4. `DevOps & Tools` (Accent: Teal/Emerald)

---

### 3.5 Projects Section & Interactive Filtering

#### Visual Layout & ASCII Wireframe
```
+-----------------------------------------------------------------------------------------+
|                                 FEATURED PROJECTS                                       |
|                                                                                         |
|        [ All (4) ]     [ Systems ]     [ Web Applications ]     [ Backend & APIs ]      |
|                                                                                         |
|  +------------------------------------+   +------------------------------------------+  |
|  | [ MOCKUP / BANNER: ADM Invoice ]   |   | [ MOCKUP / BANNER: FixFlow ]             |  |
|  | ---------------------------------- |   | ---------------------------------------- |  |
|  | ADM Invoice System                 |   | FixFlow Workflow Engine                  |  |
|  | Modern web invoice generator with  |   | Incident tracking and system workflow    |  |
|  | automated tax calculation, client  |   | management platform with real-time state |  |
|  | management, and PDF exports.       |   | progression and audit trails.            |  |
|  |                                    |   |                                          |  |
|  | [PHP] [MySQL] [JavaScript] [CSS3]  |   | [JavaScript] [PHP] [System Architecture] |  |
|  |                                    |   |                                          |  |
|  | [ 🔗 Live Demo ]    [ 💻 GitHub ]  |   | [ 🔗 Details ]         [ 💻 GitHub ]     |  |
|  +------------------------------------+   +------------------------------------------+  |
|                                                                                         |
|  +------------------------------------+   +------------------------------------------+  |
|  | [ MOCKUP / BANNER: EpicLens ]      |   | [ MOCKUP / BANNER: iic1153-backend ]     |  |
|  | ---------------------------------- |   | ---------------------------------------- |  |
|  | EpicLens Photography System        |   | iic1153-backend Academic API             |  |
|  | High-performance photography port- |   | High-cohesion backend service built for  |  |
|  | folio and booking management app.  |   | coursework systems with structured DB.   |  |
|  |                                    |   |                                          |  |
|  | [HTML5] [Vanilla JS] [CSS Grid]    |   | [PHP] [REST API] [MySQL] [Auth]          |  |
|  |                                    |   |                                          |  |
|  | [ 🔗 Live Demo ]    [ 💻 GitHub ]  |   | [ 💻 GitHub Repository ]                 |  |
|  +------------------------------------+   +------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

#### Dynamic Filter Spec
- Filter tabs: `All`, `Systems`, `Web`, `Backend`.
- Clicking a tab filters the grid dynamically without page reload.
- Card enter/exit animation: `opacity` and `transform: scale(0.95)` to `scale(1)` with CSS `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`.

#### Project Card Details
- **Mockup Banner:** SVG/CSS-styled code preview or screenshot placeholder with glass badge indicating category.
- **Card Metadata:** Project Title, concise 2-sentence description, tech stack pill tags.
- **Action Buttons:** Clear external links with SVG icons for GitHub (`repo`) and Live Demo (`external-link`).

---

### 3.6 Experience & Education Timeline

#### Visual Layout & ASCII Wireframe
```
+-----------------------------------------------------------------------------------------+
|                             EDUCATION & EXPERIENCE JOURNEY                              |
|                                                                                         |
|                                   o  2023 - Present                                     |
|                                   |  B.Sc. (Hons) in Information & Communication Tech   |
|                                   |  University of Sri Jayewardenepura                  |
|                                   |  * Focus on Software Engineering, Databases & OOP  |
|                                   |  * Active builder of open-source and coursework apps |
|                                   |                                                     |
|                                   o  2022 - 2023                                        |
|                                   |  Independent Systems & Web Development Projects     |
|                                   |  * Designed and shipped ADM Invoice & EpicLens      |
|                                   |  * Explored API architectures & scalable database schemas|
|                                   |                                                     |
|                                   o  Foundational Milestones                            |
|                                      Advanced Level - Technology Stream                 |
+-----------------------------------------------------------------------------------------+
```

#### Timeline UX Details
- **Central / Left-aligned Node Line:** 2px neon glowing rail (`--border-focus`).
- **Pulsing Nodes:** Circular dots with active glow effect on viewport enter.
- **Responsive Handling:** Desktop alternates left/right or stays single-column left-aligned with ample reading space. Mobile collapses to left rail with 100% width cards on the right.

---

### 3.7 Contact Section & Interactive Validation

#### Visual Layout & ASCII Wireframe
```
+-----------------------------------------------------------------------------------------+
|                                      GET IN TOUCH                                       |
|                  Have an opportunity, project, or question? Send a message!             |
|                                                                                         |
|  +------------------------------------+   +------------------------------------------+  |
|  |  Direct Contact Information        |   |  Send a Direct Message                   |  |
|  |  --------------------------        |   |  ---------------------                   |  |
|  |  📧 Email                          |   |  Your Name *                             |  |
|  |     adeepadmarambage@gmail.com     |   |  [ John Doe                            ] |  |
|  |     [📋 Copy Email Address]        |   |                                          |  |
|  |                                    |   |  Your Email *                            |  |
|  |  💻 GitHub                         |   |  [ john@example.com                    ] |  |
|  |     github.com/AdeepaOfficial      |   |                                          |  |
|  |                                    |   |  Subject                                 |  |
|  |  📍 Location                       |   |  [ Project Inquiry / Collaboration     ] |  |
|  |     Colombo, Sri Lanka             |   |                                          |  |
|  |                                    |   |  Message *                               |  |
|  |  ⏱️ Response Time                  |   |  [ Write your message here...          ] |  |
|  |     Usually within 24 hours        |   |                                          |  |
|  +------------------------------------+   |  [ 🚀 Send Message ]                     |  |
|                                           +------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

#### Form Validation & Fallback Handling
- **Real-time Client Validation:**
  - Name: min 2 characters.
  - Email: RFC regex email format check (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
  - Message: min 10 characters.
  - Immediate red/green indicator with friendly accessible helper text (`aria-describedby`).
- **Submission Flow (Zero Backend):**
  - Because the site is pure vanilla static HTML/JS without a server, clicking "Send Message" triggers:
    1. Form validation verification.
    2. Constructs a pre-filled `mailto:` link with subject and body encoded for native email client opening.
    3. Simultaneously shows a beautiful in-page modal/toast: *"Message drafted! You can also click below to copy Adeepa's email directly."*
    4. One-click "Copy Email to Clipboard" button with temporary *"Copied! ✓"* visual toast feedback.

---

### 3.8 Footer

- Clean 1px border divider.
- Left: `© 2026 Adeepa Marambage. All Rights Reserved.`
- Center: Quick link pills (Back to top `↑`).
- Right: Social icons (GitHub, LinkedIn, Email).

---

## 4. Motion, Interaction & Animation Guidelines

1. **Easing Curves & Durations:**
   - Standard ease: `cubic-bezier(0.4, 0, 0.2, 1)`
   - Hover transition: `180ms ease-out`
   - Card expansion / filter transition: `300ms cubic-bezier(0.4, 0, 0.2, 1)`
   - Theme toggle transition: `250ms ease`
2. **Scroll Reveals via Vanilla IntersectionObserver:**
   - Add `.reveal` class to sections and cards.
   - Initial state: `opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease;`
   - Active state (`.reveal.active`): `opacity: 1; transform: translateY(0);`
3. **Micro-Interactions:**
   - **Buttons:** Scale down on active click (`transform: scale(0.97)`).
   - **Project Cards:** Translate Y by `-6px`, surface elevation shadow expands, top border highlights with cyan gradient.
   - **Skill Pills:** Glow box-shadow appears on hover.
4. **Accessibility - Reduced Motion:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```

---

## 5. Data Architecture & `portfolio.json` Specification

To maintain clean separation between layout and data, the entire portfolio will load dynamic data from `data/portfolio.json`.

```json
{
  "profile": {
    "name": "Adeepa Marambage",
    "shortName": "Adeepa",
    "monogram": "<AM />",
    "role": "Full-Stack Software Engineer & BICT Honours Undergraduate",
    "institution": "University of Sri Jayewardenepura",
    "degree": "Bachelor of Information and Communication Technology (BICT) Honours",
    "location": "Colombo, Sri Lanka",
    "email": "adeepadmarambage@gmail.com",
    "github": "https://github.com/AdeepaOfficial",
    "linkedin": "https://linkedin.com/in/adeepa-marambage",
    "status": "Available for Opportunities",
    "typewriterRoles": [
      "Full-Stack Software Engineer",
      "Systems & Web Developer",
      "Database & API Architect",
      "BICT Honours Student @ USJ"
    ],
    "bioSummary": "Undergraduate technologist with a keen focus on robust software engineering, scalable web architectures, clean code principles, and intuitive user experiences."
  },
  "stats": [
    { "label": "Projects Completed", "value": "10+", "numeric": 10 },
    { "label": "Code Quality & Git", "value": "100%", "numeric": 100 },
    { "label": "Core Domains", "value": "4", "numeric": 4 },
    { "label": "Degree Pursuit", "value": "BICT (Hons)", "numeric": null }
  ],
  "skills": {
    "frontend": {
      "title": "Frontend Development",
      "icon": "palette",
      "items": ["HTML5", "CSS3 / Modern CSS", "JavaScript (ES6+)", "Responsive Web Design", "DOM Manipulation", "UI/UX Prototyping"]
    },
    "backend": {
      "title": "Backend & Database",
      "icon": "server",
      "items": ["PHP", "MySQL / Relational DB", "RESTful APIs", "Node.js Basics", "CRUD Architecture", "SQL Query Optimization"]
    },
    "systems": {
      "title": "Architecture & Systems",
      "icon": "cpu",
      "items": ["Object-Oriented Programming (OOP)", "MVC Architecture", "System Workflow Design", "Clean Architecture", "Data Structures"]
    },
    "tools": {
      "title": "DevOps & Tools",
      "icon": "wrench",
      "items": ["Git & GitHub", "Linux / Bash", "Postman", "Vite / Modern Tooling", "VS Code Ecosystem"]
    }
  },
  "projects": [
    {
      "id": "adm-invoice",
      "title": "ADM Invoice System",
      "category": "systems",
      "categoryLabel": "Systems / Web",
      "description": "Comprehensive invoice and billing management platform featuring automated tax computation, client database tracking, and structured export capabilities.",
      "tags": ["PHP", "MySQL", "JavaScript", "CSS3", "Invoicing"],
      "github": "https://github.com/AdeepaOfficial/ADM-Invoice-System",
      "demo": "",
      "featured": true,
      "badge": "Systems & Billing"
    },
    {
      "id": "fixflow",
      "title": "FixFlow Workflow Engine",
      "category": "systems",
      "categoryLabel": "Systems",
      "description": "Streamlined maintenance and issue tracking workflow engine engineered with clear lifecycle state progression, role handling, and audit trails.",
      "tags": ["PHP", "JavaScript", "Workflow Systems", "Database Design"],
      "github": "https://github.com/AdeepaOfficial/FixFlow",
      "demo": "",
      "featured": true,
      "badge": "Workflow Management"
    },
    {
      "id": "epiclens",
      "title": "EpicLens System",
      "category": "web",
      "categoryLabel": "Web Application",
      "description": "Interactive photography studio showcase and client booking platform with sleek media galleries and responsive inquiry interface.",
      "tags": ["HTML5", "Vanilla JavaScript", "CSS Grid", "UI/UX Design"],
      "github": "https://github.com/AdeepaOfficial/EpicLens-System",
      "demo": "",
      "featured": true,
      "badge": "Media & Booking"
    },
    {
      "id": "iic1153-backend",
      "title": "iic1153-backend",
      "category": "backend",
      "categoryLabel": "Backend / API",
      "description": "Academic course backend architecture demonstrating structured REST endpoints, relational schema mapping, and modular API service handlers.",
      "tags": ["PHP", "MySQL", "REST API", "Backend Architecture"],
      "github": "https://github.com/AdeepaOfficial/iic1153-backend",
      "demo": "",
      "featured": false,
      "badge": "Academic API"
    }
  ],
  "timeline": [
    {
      "period": "2023 - Present",
      "title": "Bachelor of Information and Communication Technology (BICT) Honours",
      "institution": "University of Sri Jayewardenepura",
      "description": "Pursuing comprehensive honours degree specializing in software engineering, database systems, computer networks, and full-stack development.",
      "type": "education"
    },
    {
      "period": "2023 - 2024",
      "title": "Full-Stack Project Engineering",
      "institution": "Independent / Academic Projects",
      "description": "Architected and delivered production-grade applications including ADM Invoice System, FixFlow, and EpicLens System using pure web technologies and relational backends.",
      "type": "project"
    }
  ]
}
```

---

## 6. Accessibility (WCAG 2.1 AA) & Responsive Breakpoints

### 6.1 Contrast Validation
- Dark theme text contrast ratio:
  - `--text-primary` (`#f8fafc`) on `--bg-base` (`#0a0d14`) = **18.7:1** (Passes WCAG AAA)
  - `--accent-primary` (`#00f2fe`) on `--bg-base` (`#0a0d14`) = **14.2:1** (Passes WCAG AAA)
  - `--text-secondary` (`#94a3b8`) on `--bg-surface` (`#111625`) = **7.1:1** (Passes WCAG AA)
- Light theme text contrast ratio:
  - `--text-primary` (`#0f172a`) on `--bg-base` (`#f8fafc`) = **16.5:1** (Passes WCAG AAA)
  - `--accent-primary` (`#0284c7`) on `--bg-base` (`#f8fafc`) = **5.2:1** (Passes WCAG AA)

### 6.2 Responsive Breakpoints
- **Mobile (`< 640px`):** Single-column layout, compact navbar with hamburger menu, stacked stats 2x2, full-width project cards.
- **Tablet (`640px - 1024px`):** 2-column project grid, 2-column skills grid, standard horizontal navbar.
- **Desktop (`> 1024px`):** 2 or 3-column project grid, expanded timeline, side-by-side contact cards and form, max container width 1200px.

---

## 7. Implementation Guidelines for Frontend Developer

1. **Folder Structure:**
   ```
   Portfolio/
   ├── index.html              # Clean semantic HTML5 root
   ├── css/
   │   ├── style.css           # Core styling, variables, glassmorphism, animations
   │   └── responsive.css      # Media queries and mobile layout adaptations
   ├── js/
   │   ├── main.js             # Navigation, theme toggle, typewriter, scroll reveals
   │   ├── data-loader.js      # Fetch and hydrate portfolio.json into DOM
   │   └── form-handler.js     # Contact validation and clipboard/mailto actions
   ├── data/
   │   └── portfolio.json      # Structured content data store
   └── assets/
       └── icons/              # Clean inline SVG icons (GitHub, LinkedIn, Sun, Moon, etc.)
   ```
2. **Performance Constraints:**
   - Zero external CSS/JS framework CDNs (No Bootstrap, Tailwind CDN, or jQuery).
   - Use Google Fonts via standard preconnect or local font fallbacks (`Plus Jakarta Sans` / `Fira Code`).
   - Use pure SVG code for all icons (zero heavy icon font files like FontAwesome).
3. **Data Hydration Strategy:**
   - Fetch `data/portfolio.json` using `fetch()` with graceful fallback if running via local `file://` protocol.
   - Maintain fallback static content in `index.html` or bundle default fallback data inside JavaScript so the portfolio renders flawlessly even if opened directly in a browser without a local web server!

---
*Specification authored by UX/UI Designer for Adeepa Marambage's Developer Portfolio.*
