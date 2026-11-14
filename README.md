# Adeepa Marambage - Personal Developer Portfolio

A responsive, high-performance developer portfolio website engineered with pure **HTML5**, **CSS3**, and modern **Vanilla JavaScript (ES6+)**. The project is designed with zero server-side runtime dependencies, using a structured JSON data store alongside a private, client-side content management dashboard.

---

## Tech Stack & Architecture

- **Markup:** Semantic HTML5 with accessible landmarks (ARIA, screen-reader friendly).
- **Styling:** Modern CSS3 featuring Flexbox, CSS Grid, custom properties (CSS variables for dark theme tokens), smooth transitions, and glassmorphic UI components.
- **Client Logic:** Pure Vanilla JavaScript (ES6+), asynchronous `fetch()` API, dynamic DOM rendering, interactive filtering, and modal dialog management.
- **Data Layer:** Single source of truth in [`data/portfolio.json`](./data/portfolio.json) with client-side state caching in `localStorage`.
- **Admin Management:** Dedicated client-side editor at [`admin.html`](./admin.html) with passcode authentication, CRUD management, live preview synchronization, and JSON export.
- **Deployment:** Static hosting ready (GitHub Pages, Vercel, Netlify, Cloudflare Pages, Apache, Nginx) with zero build steps required.

---

## Directory Structure

```text
Portfolio/
├── index.html              # Main public developer portfolio webpage
├── admin.html              # Private content management dashboard & editor
├── css/
│   ├── style.css           # Global portfolio stylesheet & responsive design system
│   └── admin.css           # Dedicated styles for admin panel, forms, and auth modal
├── js/
│   ├── app.js              # Public portfolio logic, dynamic rendering, and filtering
│   └── admin.js            # Admin portal CRUD operations, live sync, and JSON exporter
├── data/
│   └── portfolio.json      # Single source of truth for portfolio content & resume data
├── DESIGN_SPEC.md          # Comprehensive UI/UX design architecture and specifications
├── .gitignore              # Version control ignore rules for web development
└── README.md               # Project documentation and deployment guide
```

---

## Running Locally

Because client-side scripts asynchronously fetch [`data/portfolio.json`](./data/portfolio.json), opening `index.html` directly via the browser (`file://`) will be blocked by standard browser CORS/origin security policies. Always run the site through a lightweight local HTTP server:

### Option 1: Python HTTP Server (Recommended)
Open a terminal in the project root directory and execute:

```bash
# Python 3.x
python -m http.server 8000
```
Navigate to: [http://localhost:8000](http://localhost:8000)

### Option 2: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Right-click `index.html` (or `admin.html`) and select **"Open with Live Server"**.

### Option 3: Node / NPX
If Node.js is installed on your system:
```bash
npx serve .
```

---

## How the JSON Data Store Works

All portfolio content is structured and maintained inside [`data/portfolio.json`](./data/portfolio.json).

### Data Flow & Fallback Architecture
1. **Initial Load:** When the user visits `index.html`, `js/app.js` first checks `localStorage` for any saved overrides made via the admin portal.
2. **Fallback:** If `localStorage` has no customized payload, it fetches `data/portfolio.json`.
3. **Hard Fallback:** If both network fetch and `localStorage` fail, an embedded fallback object guarantees the site renders without errors.

### Schema Breakdown
The data schema contains the following top-level objects:
- `profile`: Full name, role title, university/degree details, contact emails, social links, location, bio summary, and typewriter roles.
- `stats`: Key numeric metrics displayed in the hero section (e.g., Projects Completed, Code Quality, Tech Domains).
- `skills`: Categorized skill domains (Frontend, Backend, Database/API, DevOps/Tools) with items and visual accent colors.
- `projects`: Showcase items featuring title, description, category, tags, demo/repo links, highlights, and featured flags.
- `timeline`: Work experience, educational milestones, and academic background.
- `certifications`: Professional certificates, issuing organizations, and credentials.
- `contact`: Contact details and availability status.

---

## Private Admin Editor (`admin.html`)

The repository includes a private content management tool located at [`admin.html`](./admin.html) for updating portfolio information directly from the browser without editing code manually.

### Key Capabilities:
- **Passcode Security Gate:**
  - Protected by a numeric PIN gate before the dashboard loads.
  - **Default PIN:** `2026`
  - PIN can be customized directly in the settings panel and is saved in secure browser storage.
- **Full CRUD Management:**
  - **Profile & Bio:** Edit personal summary, roles, contacts, and status.
  - **Projects:** Add, modify, reorder, or delete projects with live image preview URLs and tag badges.
  - **Skills:** Manage skill sets across categories with instant UI updates.
  - **Timeline:** Add or update education and career milestones.
  - **Stats:** Update metric counters and statistics.
- **Real-Time Synchronization:**
  - Changes save automatically to `localStorage` so they immediately reflect when viewing `index.html` on the same browser.
- **JSON Exporter for Git Version Control:**
  - Click **"Export JSON"** in the top navigation bar to download the updated `portfolio.json`.
  - Replace `data/portfolio.json` with this exported file, stage, and commit to Git to persist changes permanently across all environments.
- **Raw Code Editor:**
  - Includes an in-browser raw JSON editor with syntax validation for quick bulk edits.

---

## Version Control & Git Workflow

- **Repository:** [https://github.com/AdeepaOfficial/Portfolio.git](https://github.com/AdeepaOfficial/Portfolio.git)
- **Active Branch:** `main`
- **Commit Standard:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
- **Assistant Attribution:** All commits authored or co-authored by the AI assistant include:
  ```text
  Co-authored-by: OpenBot <335604065+openbotgit[bot]@users.noreply.github.com>
  ```
