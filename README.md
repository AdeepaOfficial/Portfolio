# Developer Portfolio

A responsive personal portfolio website built with pure HTML5, CSS3, and modern Vanilla JavaScript, powered by a structured JSON data store.

---

## Tech Stack

- **Markup:** HTML5 (semantic, accessible structure)
- **Styling:** CSS3 (Flexbox, CSS Grid, CSS Custom Properties for theme tokens, responsive breakpoints)
- **Scripting:** Vanilla JavaScript (ES6+, DOM manipulation, dynamic component rendering, fetch API)
- **Data Store:** Structured JSON (`data/portfolio.json`)
- **Hosting / Runtime:** Static hosting compatible (GitHub Pages, Vercel, Netlify, Apache, Nginx); no backend or build step required.

---

## Directory Structure

```text
Portfolio/
├── index.html              # Main HTML entry point
├── css/
│   └── style.css           # Global stylesheet and responsive styles
├── js/
│   └── app.js              # Data loader and dynamic UI rendering logic
├── data/
│   └── portfolio.json      # Single source of truth for portfolio content
├── assets/
│   ├── images/             # Profile pictures, project thumbnails, etc.
│   └── icons/              # SVG / vector icons
├── .gitignore              # Git ignore rules for web development
└── README.md               # Project documentation
```

---

## Running Locally

Because client-side JavaScript uses the `fetch()` API to asynchronously load `data/portfolio.json`, running the website via direct `file://` URLs will typically trigger browser CORS security restrictions. Run the application through a lightweight local HTTP server:

### Option 1: Python HTTP Server (Recommended)
Open a terminal in the project root directory and run:

```bash
# Python 3
python -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

### Option 2: VS Code Live Server
1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click `index.html` and select **"Open with Live Server"**.

### Option 3: Node / NPX
If Node.js is installed:
```bash
npx serve .
```

---

## Updating Portfolio Content

All personal data, projects, work experience, education, skills, and contact links are managed inside [`data/portfolio.json`](./data/portfolio.json).

### Data Schema Overview

```json
{
  "profile": {
    "name": "Your Name",
    "title": "Your Professional Title",
    "bio": "Brief professional summary...",
    "location": "City, Country",
    "avatar": "assets/images/profile.jpg",
    "resumeUrl": "assets/resume.pdf"
  },
  "contact": {
    "email": "you@example.com",
    "github": "https://github.com/...",
    "linkedin": "https://linkedin.com/in/...",
    "twitter": "https://twitter.com/..."
  },
  "skills": [
    { "category": "Frontend", "items": ["HTML5", "CSS3", "JavaScript"] },
    { "category": "Tools", "items": ["Git", "GitHub", "VS Code"] }
  ],
  "projects": [
    {
      "id": "project-1",
      "title": "Project Name",
      "description": "Short project description.",
      "technologies": ["HTML", "CSS", "JS"],
      "image": "assets/images/project1.png",
      "demoUrl": "https://...",
      "repoUrl": "https://github.com/..."
    }
  ],
  "experience": [
    {
      "role": "Software Engineer",
      "company": "Company Name",
      "period": "2024 - Present",
      "description": "Responsibilities and accomplishments..."
    }
  ],
  "education": [
    {
      "degree": "Degree Title",
      "institution": "University / College",
      "year": "2020 - 2024"
    }
  ]
}
```

Updating fields in `data/portfolio.json` will automatically reflect on the rendered site upon page refresh.

---

## Version Control & Contribution Standards

- **Default Branch:** `main`
- **Commit Messages:** Follow standard conventional commit formats (e.g., `feat:`, `fix:`, `docs:`, `chore:`).
- All automated or assistant commits include the OpenBot co-author attribution trailer.
