/**
 * Adeepa Marambage - Personal Developer Portfolio
 * Vanilla JavaScript Application Logic (ES6+)
 * 
 * Features:
 * - Dynamic Data Hydration (JSON loader with resilient offline fallback)
 * - Dark / Light Mode with LocalStorage & OS Preference Detection
 * - Accessible Mobile Hamburger Navigation & Scroll Lock
 * - Hero Typewriter Animation
 * - Interactive Project Filtering (All, Systems, Web, Backend)
 * - Animated Number Counters (IntersectionObserver)
 * - Section Scroll Reveals & Active Navigation Tracking
 * - Contact Form Validation, Mailto Generation & Clipboard Toast
 */

// Embedded fallback data for guaranteed rendering in offline / file:// protocol mode
const FALLBACK_PORTFOLIO_DATA = {
  profile: {
    name: "Adeepa Marambage",
    shortName: "Adeepa",
    monogram: "<AM />",
    avatarUrl: "",
    role: "Full-Stack Software Engineer & BICT Honours Undergraduate",
    institution: "University of Sri Jayewardenepura",
    degree: "Bachelor of Information and Communication Technology (BICT) Honours",
    location: "Colombo, Sri Lanka",
    email: "adeepadmarambage@gmail.com",
    github: "https://github.com/AdeepaOfficial",
    linkedin: "https://linkedin.com/in/adeepa-marambage",
    resumeUrl: "#contact",
    status: "Available for Opportunities",
    typewriterRoles: [
      "Full-Stack Software Engineer",
      "Systems & Web Developer",
      "Database & API Architect",
      "BICT Honours Student @ USJ"
    ],
    bioSummary: "Undergraduate technologist with a keen focus on robust software engineering, scalable web architectures, clean code principles, and intuitive user experiences."
  },
  stats: [
    { label: "Projects Completed", value: "10+", numeric: 10 },
    { label: "Code Quality & Git", value: "100%", numeric: 100 },
    { label: "Core Tech Domains", value: "4", numeric: 4 },
    { label: "Degree Pursuit", value: "BICT (Hons)", numeric: null }
  ],
  skills: {
    frontend: {
      title: "Frontend Development",
      icon: "palette",
      accent: "var(--accent-primary)",
      items: ["HTML5", "CSS3 / Flexbox & Grid", "JavaScript (ES6+)", "Responsive Web Design", "DOM API & Animations", "UI/UX Design Systems"]
    },
    backend: {
      title: "Backend & Database",
      icon: "server",
      accent: "var(--accent-secondary)",
      items: ["PHP", "MySQL / Relational DB", "RESTful API Development", "Node.js Basics", "CRUD Architecture", "SQL Query Optimization"]
    },
    systems: {
      title: "Architecture & Systems",
      icon: "cpu",
      accent: "#a855f7",
      items: ["Object-Oriented Programming (OOP)", "MVC Pattern", "System Workflow Design", "Clean Code & Modularity", "Data Modeling"]
    },
    tools: {
      title: "DevOps & Tools",
      icon: "wrench",
      accent: "#10b981",
      items: ["Git & GitHub", "Linux / Bash", "Postman", "Vite & Modern Tooling", "VS Code Ecosystem"]
    }
  },
  projects: [
    {
      id: "adm-invoice",
      title: "ADM Invoice System",
      category: "systems",
      categoryLabel: "Systems / Web",
      description: "Comprehensive invoice and billing management platform featuring automated tax computation, client database tracking, and structured export capabilities.",
      tags: ["PHP", "MySQL", "JavaScript", "CSS3", "Invoicing"],
      github: "https://github.com/AdeepaOfficial/ADM-Invoice-System",
      demo: "",
      featured: true,
      badge: "Systems & Billing"
    },
    {
      id: "fixflow",
      title: "FixFlow Workflow Engine",
      category: "systems",
      categoryLabel: "Systems",
      description: "Streamlined maintenance and issue tracking workflow engine engineered with clear lifecycle state progression, role handling, and audit trails.",
      tags: ["PHP", "JavaScript", "Workflow Systems", "Database Design"],
      github: "https://github.com/AdeepaOfficial/FixFlow",
      demo: "",
      featured: true,
      badge: "Workflow Engine"
    },
    {
      id: "epiclens",
      title: "EpicLens System",
      category: "web",
      categoryLabel: "Web Application",
      description: "Interactive photography studio showcase and client booking platform with sleek media galleries and responsive inquiry interface.",
      tags: ["HTML5", "Vanilla JavaScript", "CSS Grid", "UI/UX Design"],
      github: "https://github.com/AdeepaOfficial/EpicLens-System",
      demo: "",
      featured: true,
      badge: "Media & Booking"
    },
    {
      id: "iic1153-backend",
      title: "iic1153-backend",
      category: "backend",
      categoryLabel: "Backend / API",
      description: "Academic course backend architecture demonstrating structured REST endpoints, relational schema mapping, and modular API service handlers.",
      tags: ["PHP", "MySQL", "REST API", "Backend Architecture"],
      github: "https://github.com/AdeepaOfficial/iic1153-backend",
      demo: "",
      featured: false,
      badge: "Academic API"
    }
  ],
  timeline: [
    {
      period: "2023 - Present",
      title: "Bachelor of Information and Communication Technology (BICT) Honours",
      institution: "University of Sri Jayewardenepura",
      description: "Pursuing comprehensive honours degree specializing in software engineering, relational database systems, network protocols, and full-stack web applications.",
      type: "education"
    },
    {
      period: "2023 - 2024",
      title: "Full-Stack Project Engineering",
      institution: "Independent & Coursework Systems",
      description: "Architected and delivered production-grade applications including ADM Invoice System, FixFlow, and EpicLens System using pure web standards and relational backends.",
      type: "project"
    },
    {
      period: "2020 - 2022",
      title: "G.C.E. Advanced Level - Technology Stream",
      institution: "Foundational Academic Milestones",
      description: "Completed secondary education in the Engineering Technology stream with honors, establishing strong foundations in mathematics, algorithmic logic, and computing principles.",
      type: "education"
    }
  ]
};

// SVG Icon Library for dynamic rendering
const ICONS = {
  palette: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  server: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  wrench: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
};

document.addEventListener('DOMContentLoaded', () => {
  initThemeManager();
  initMobileNavigation();
  initPortfolioData();
  initContactForm();
  initScrollSpy();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initThemeManager() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  // Apply saved theme or fall back to system preference (default dark)
  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isCurrentlyLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // Listen to OS scheme changes if user hasn't explicitly set a preference
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  });
}

/* ==========================================================================
   2. Mobile Hamburger Navigation & Scroll Lock
   ========================================================================== */
function initMobileNavigation() {
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggleBtn.classList.toggle('open');
      navToggleBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggleBtn.classList.remove('open');
        navToggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Frosted glass appearance on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   3. Data Loading & Dynamic DOM Hydration
   ========================================================================== */
async function initPortfolioData() {
  let data = FALLBACK_PORTFOLIO_DATA;

  // 1. Check for live custom data edited via admin.html
  const customDataStr = localStorage.getItem('portfolio_custom_data');
  if (customDataStr) {
    try {
      const parsedData = JSON.parse(customDataStr);
      if (parsedData && parsedData.profile && parsedData.projects) {
        data = parsedData;
        console.log('Loaded custom portfolio data from localStorage.');
      }
    } catch (err) {
      console.warn('Failed to parse portfolio_custom_data, falling back to JSON:', err);
    }
  }

  // 2. If no custom localStorage data, fetch from data/portfolio.json
  if (data === FALLBACK_PORTFOLIO_DATA) {
    try {
      const response = await fetch('data/portfolio.json');
      if (response.ok) {
        const jsonData = await response.json();
        data = jsonData;
      }
    } catch (err) {
      console.warn('Using embedded portfolio fallback data (Offline / file:// mode):', err);
    }
  }

  // Hydrate UI sections
  renderBranding(data.profile);
  renderHero(data.profile);
  renderAbout(data.profile);
  renderContact(data.profile);
  renderStats(data.stats);
  renderSkills(data.skills);
  renderProjects(data.projects);
  renderTimeline(data.timeline);

  // Initialize interactive dynamic features after DOM render
  initTypewriter(data.profile.typewriterRoles || [data.profile.role]);
  initProjectFiltering();
  initIntersectionObservers();
}

/* Render Branding & Monogram */
function renderBranding(profile) {
  if (!profile) return;
  const navMonogram = document.getElementById('nav-monogram');
  const navLogoText = document.getElementById('nav-logo-text');
  const aboutMonogram = document.getElementById('about-monogram');
  const footerCopyright = document.getElementById('footer-copyright');

  // Update all elements with class .monogram
  document.querySelectorAll('.monogram').forEach(el => {
    if (profile.monogram) el.textContent = profile.monogram;
  });

  if (navMonogram && profile.monogram) {
    navMonogram.textContent = profile.monogram;
  }
  if (navLogoText && (profile.shortName || profile.name)) {
    navLogoText.textContent = profile.shortName || profile.name.split(' ')[0];
  }
  if (aboutMonogram && profile.monogram) {
    aboutMonogram.textContent = profile.monogram;
  }
  if (profile.name) {
    document.title = `${profile.name} | ${profile.role || 'Full-Stack Software Engineer'}`;
  }
  if (footerCopyright && profile.name) {
    footerCopyright.innerHTML = `&copy; 2026 ${escapeHtml(profile.name)}. Crafted with clean HTML5, CSS3 &amp; Vanilla JavaScript.`;
  }
}

/* Render Hero Content */
function renderHero(profile) {
  if (!profile) return;
  const greetingEl = document.getElementById('hero-greeting');
  const nameEl = document.getElementById('hero-name');
  const bioEl = document.getElementById('hero-bio');
  const statusEl = document.getElementById('status-text');

  if (greetingEl) greetingEl.textContent = "Hi, I'm";
  if (nameEl) nameEl.textContent = profile.name.toUpperCase();
  if (bioEl) bioEl.textContent = `${profile.degree} at ${profile.institution}. ${profile.bioSummary}`;
  if (statusEl && profile.status) statusEl.textContent = profile.status;
}

/* Render About Card */
function renderAbout(profile) {
  if (!profile) return;
  const nameEl = document.getElementById('about-name');
  const roleEl = document.getElementById('about-role');
  const emailEl = document.getElementById('about-email');
  const locationEl = document.getElementById('about-location');
  const bioSummaryEl = document.getElementById('about-bio-summary');
  const monogramEl = document.getElementById('about-monogram');
  const avatarImg = document.getElementById('about-avatar-img');

  if (nameEl) nameEl.textContent = profile.name;
  if (roleEl) roleEl.textContent = profile.degree;
  if (emailEl) emailEl.textContent = profile.email;
  if (locationEl) locationEl.textContent = profile.location;

  const photo = (profile.avatarUrl || profile.photoUrl || profile.photo || profile.profilePhoto || '').trim();
  if (photo) {
    if (avatarImg) {
      avatarImg.src = photo;
      avatarImg.alt = profile.name || 'Adeepa Marambage';
      avatarImg.style.display = 'block';
    }
    if (monogramEl) {
      monogramEl.style.display = 'none';
    }
  } else {
    if (avatarImg) {
      avatarImg.style.display = 'none';
      avatarImg.src = '';
    }
    if (monogramEl) {
      monogramEl.style.display = 'flex';
      if (profile.monogram) monogramEl.textContent = profile.monogram;
    }
  }

  if (bioSummaryEl) {
    bioSummaryEl.textContent = `A passionate technologist pursuing ${profile.degree} at ${profile.institution}. Dedicated to building production-grade web systems, resilient relational schemas, and responsive user interfaces with zero framework bloat.`;
  }
}

/* Render Contact Details */
function renderContact(profile) {
  if (!profile) return;
  const emailVal = document.getElementById('contact-email-val');
  const heroEmail = document.getElementById('hero-email-link');
  const githubLink = document.getElementById('contact-github-link');
  const locationVal = document.getElementById('contact-location-val');

  if (emailVal && profile.email) emailVal.textContent = profile.email;
  if (heroEmail && profile.email) heroEmail.href = `mailto:${profile.email}`;
  if (githubLink && profile.github) {
    githubLink.href = profile.github;
    githubLink.textContent = profile.github.replace(/^https?:\/\//, '');
  }
  if (locationVal && profile.location) locationVal.textContent = profile.location;
}

/* Render Impact Stats */
function renderStats(stats) {
  const container = document.getElementById('stats-grid');
  if (!container || !Array.isArray(stats)) return;

  container.innerHTML = stats.map(stat => `
    <div class="stat-card reveal">
      <div class="stat-value" data-target="${stat.numeric || 0}" data-final="${escapeHtml(stat.value)}">${stat.value}</div>
      <div class="stat-label">${escapeHtml(stat.label)}</div>
    </div>
  `).join('');
}

/* Render Categorized Skills */
function renderSkills(skills) {
  const container = document.getElementById('skills-grid');
  if (!container || !skills) return;

  const categories = Object.keys(skills);
  container.innerHTML = categories.map(key => {
    const cat = skills[key];
    const iconSvg = ICONS[cat.icon] || ICONS.code;
    return `
      <div class="skill-category-card reveal">
        <div class="skill-category-header">
          <div class="skill-category-icon" style="color: ${cat.accent || 'var(--accent-primary)'}">
            ${iconSvg}
          </div>
          <h3 class="skill-category-title">${escapeHtml(cat.title)}</h3>
        </div>
        <div class="skill-tags-wrapper">
          ${cat.items.map(skill => `
            <span class="skill-badge">${escapeHtml(skill)}</span>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

/* Render Featured Projects */
function renderProjects(projects) {
  const container = document.getElementById('projects-grid');
  if (!container || !Array.isArray(projects)) return;

  container.innerHTML = projects.map(proj => {
    const demoBtn = proj.demo 
      ? `<a href="${escapeHtml(proj.demo)}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Live Demo for ${escapeHtml(proj.title)}">
           ${ICONS.external} <span>Live Demo</span>
         </a>`
      : '';
    
    const githubBtn = proj.github
      ? `<a href="${escapeHtml(proj.github)}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="GitHub Repository for ${escapeHtml(proj.title)}">
           ${ICONS.github} <span>Source Code</span>
         </a>`
      : '';

    return `
      <article class="project-card reveal" data-category="${escapeHtml(proj.category)}">
        <div class="project-mockup-header">
          <span class="project-badge">${escapeHtml(proj.badge || proj.categoryLabel)}</span>
          <div class="mockup-preview-code">
            <div class="dot-bar">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            <code>&lt;project name="${escapeHtml(proj.title)}" status="production" /&gt;</code>
          </div>
        </div>
        <div class="project-body">
          <div class="project-category-label">${escapeHtml(proj.categoryLabel)}</div>
          <h3 class="project-title">${escapeHtml(proj.title)}</h3>
          <p class="project-description">${escapeHtml(proj.description)}</p>
          <div class="project-tags">
            ${proj.tags.map(tag => `<span class="project-tag">${escapeHtml(tag)}</span>`).join('')}
          </div>
          <div class="project-actions">
            ${githubBtn}
            ${demoBtn}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/* Render Experience / Education Timeline */
function renderTimeline(timeline) {
  const container = document.getElementById('timeline-wrapper');
  if (!container || !Array.isArray(timeline)) return;

  container.innerHTML = timeline.map(item => `
    <div class="timeline-item reveal">
      <div class="timeline-dot" aria-hidden="true"></div>
      <div class="timeline-card">
        <div class="timeline-period">${escapeHtml(item.period)}</div>
        <h3 class="timeline-title">${escapeHtml(item.title)}</h3>
        <div class="timeline-institution">${escapeHtml(item.institution)}</div>
        <p class="timeline-desc">${escapeHtml(item.description)}</p>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   4. Hero Typewriter Animation
   ========================================================================== */
function initTypewriter(words) {
  const textEl = document.getElementById('typewriter-text');
  if (!textEl || !words || words.length === 0) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 75;
  const deleteSpeed = 38;
  const pauseTime = 1800;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
      textEl.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      textEl.textContent = currentWord.substring(0, charIndex);
    }

    let nextDelay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      nextDelay = pauseTime;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      nextDelay = 400;
    }

    setTimeout(type, nextDelay);
  }

  type();
}

/* ==========================================================================
   5. Interactive Project Filter Tabs
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          // Re-trigger visual fade
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. Scroll Reveals & Number Counter Observers
   ========================================================================== */
function initIntersectionObservers() {
  // Reveal animation on scroll
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Stat Counter Animation
  const statElements = document.querySelectorAll('.stat-value');
  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNumber = parseInt(el.getAttribute('data-target'), 10);
        if (!isNaN(targetNumber) && targetNumber > 0) {
          animateCounter(el, targetNumber);
        }
        observer.unobserve(el);
      }
    });
  }, {
    root: null,
    threshold: 0.5
  });

  statElements.forEach(el => statObserver.observe(el));
}

function animateCounter(element, target) {
  let count = 0;
  const duration = 1200;
  const stepTime = Math.max(Math.floor(duration / target), 20);
  const finalVal = element.getAttribute('data-final');

  const timer = setInterval(() => {
    count += Math.ceil(target / (duration / stepTime));
    if (count >= target) {
      element.textContent = finalVal || (target === 10 ? '10+' : target === 100 ? '100%' : `${target}`);
      clearInterval(timer);
    } else {
      element.textContent = `${count}`;
    }
  }, stepTime);
}

/* ==========================================================================
   7. Scroll Spy & Active Navigation Tracking
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   8. Contact Form Validation, Mailto Generation & Toast Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3500);
  }

  // Copy email to clipboard button
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'adeepadmarambage@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('✓ Email address copied to clipboard!');
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('✓ Email address copied to clipboard!');
      }
    });
  }

  // Form submission & validation
  if (form) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    // Real-time validation clearance
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('is-invalid');
        });
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate name (min 2 characters)
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      }

      // Validate email (RFC regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      }

      // Validate message (min 10 characters)
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageInput.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) return;

      const recipient = 'adeepadmarambage@gmail.com';
      const subject = encodeURIComponent(subjectInput.value.trim() || `Inquiry from ${nameInput.value.trim()}`);
      const body = encodeURIComponent(
        `Hi Adeepa,\n\nName: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`
      );

      // Trigger mailto intent
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      showToast('🚀 Message drafted! Opening your email client...');
      form.reset();
    });
  }
}

/* Helper to prevent XSS in dynamic rendering */
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* Auto-sync when changes are saved from the admin editor in another tab */
window.addEventListener('storage', (e) => {
  if (e.key === 'portfolio_custom_data') {
    initPortfolioData();
  }
});
