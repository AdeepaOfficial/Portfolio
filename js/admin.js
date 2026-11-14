/**
 * Adeepa Marambage - Personal Developer Portfolio
 * Admin Dashboard & Live Content Management Engine
 * 
 * Features:
 * - Passcode Security Gate (Default: 2026, customizable, session-locked)
 * - Full CRUD for Projects, Skills, Profile, Stats & Timeline
 * - Real-Time Synchronization with LocalStorage for Instant Live Updates
 * - One-Click JSON Exporter for Git Version Control
 * - Raw JSON Code Editor with Syntax Validation
 */

// Embedded default fallback data
const DEFAULT_PORTFOLIO_DATA = {
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
  ],
  contactSettings: {
    provider: "web3forms",
    accessKey: "",
    formspreeId: "",
    notificationEmail: "adeepadmarambage@gmail.com"
  }
};

// Global active portfolio data state
let currentData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
let editingProjectId = null;
let editingTimelineIndex = null;

document.addEventListener('DOMContentLoaded', () => {
  initPasscodeSecurity();
  initTabNavigation();
  initGlobalActions();
  loadInitialData();
});

/* ==========================================================================
   1. Passcode Security Gate
   ========================================================================== */
function initPasscodeSecurity() {
  const gateOverlay = document.getElementById('passcode-gate');
  const passcodeInput = document.getElementById('passcode-input');
  const unlockBtn = document.getElementById('unlock-btn');
  const toggleVisibilityBtn = document.getElementById('toggle-visibility-btn');
  const errorMsg = document.getElementById('passcode-error');
  const lockBtn = document.getElementById('lock-btn');
  const keypadBtns = document.querySelectorAll('.keypad-btn');

  // Check if session is already authenticated
  if (sessionStorage.getItem('admin_authenticated') === 'true') {
    gateOverlay.classList.add('hidden');
  }

  function getActivePasscode() {
    return localStorage.getItem('admin_passcode') || '2026';
  }

  function attemptUnlock() {
    const entered = passcodeInput.value.trim();
    const correct = getActivePasscode();

    if (entered === correct) {
      sessionStorage.setItem('admin_authenticated', 'true');
      errorMsg.classList.remove('visible');
      gateOverlay.classList.add('hidden');
      passcodeInput.value = '';
      showToast('🔓 Access Granted. Welcome, Adeepa!');
    } else {
      errorMsg.textContent = 'Invalid Passcode. Please try again.';
      errorMsg.classList.add('visible');
      passcodeInput.classList.add('is-invalid');
      passcodeInput.select();
    }
  }

  if (unlockBtn) unlockBtn.addEventListener('click', attemptUnlock);

  if (passcodeInput) {
    passcodeInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') attemptUnlock();
      errorMsg.classList.remove('visible');
    });
  }

  // Keypad clicks
  keypadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-val');
      if (val === 'clear') {
        passcodeInput.value = '';
      } else if (val === 'enter') {
        attemptUnlock();
      } else if (val) {
        passcodeInput.value += val;
      }
      passcodeInput.focus();
    });
  });

  // Toggle mask / unmask
  if (toggleVisibilityBtn) {
    toggleVisibilityBtn.addEventListener('click', () => {
      const type = passcodeInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passcodeInput.setAttribute('type', type);
    });
  }

  // Lock Admin
  if (lockBtn) {
    lockBtn.addEventListener('click', () => {
      sessionStorage.removeItem('admin_authenticated');
      gateOverlay.classList.remove('hidden');
      showToast('🔒 Admin session locked.');
    });
  }

  // Security Tab: Change Passcode Form
  const changePasscodeForm = document.getElementById('change-passcode-form');
  if (changePasscodeForm) {
    changePasscodeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentPinInput = document.getElementById('current-pin');
      const newPinInput = document.getElementById('new-pin');
      const confirmPinInput = document.getElementById('confirm-pin');

      if (currentPinInput.value.trim() !== getActivePasscode()) {
        showToast('❌ Current passcode is incorrect.');
        return;
      }

      if (!newPinInput.value.trim() || newPinInput.value.trim().length < 4) {
        showToast('❌ New passcode must be at least 4 characters.');
        return;
      }

      if (newPinInput.value.trim() !== confirmPinInput.value.trim()) {
        showToast('❌ New passcodes do not match.');
        return;
      }

      localStorage.setItem('admin_passcode', newPinInput.value.trim());
      showToast('✓ Security PIN successfully updated!');
      changePasscodeForm.reset();
    });
  }
}

/* ==========================================================================
   2. Tab Navigation
   ========================================================================== */
function initTabNavigation() {
  const tabBtns = document.querySelectorAll('.admin-tab-btn');
  const tabPanels = document.querySelectorAll('.admin-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(`tab-${targetTab}`);
      if (panel) panel.classList.add('active');

      if (targetTab === 'raw') {
        syncToRawJsonEditor();
      } else if (targetTab === 'inbox') {
        renderInboxMessages();
      }
    });
  });
}

/* ==========================================================================
   3. Data Loading & Form Population
   ========================================================================== */
async function loadInitialData() {
  const customDataStr = localStorage.getItem('portfolio_custom_data');

  if (customDataStr) {
    try {
      currentData = JSON.parse(customDataStr);
    } catch (e) {
      console.warn('Could not parse localStorage portfolio_custom_data:', e);
    }
  } else {
    try {
      const res = await fetch('data/portfolio.json');
      if (res.ok) {
        currentData = await res.json();
      }
    } catch (err) {
      console.warn('Falling back to default embedded data:', err);
      currentData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
    }
  }

  populateProfileForm();
  populateStatsForm();
  populateContactSettings();
  renderSkillsManager();
  renderProjectsManager();
  renderTimelineManager();
  renderInboxMessages();
  syncToRawJsonEditor();
}

function updateAdminHeaderBranding(monogram, shortName) {
  const adminMonogram = document.getElementById('admin-header-monogram');
  const adminLogoText = document.getElementById('admin-header-logo-text');
  if (adminMonogram && monogram) adminMonogram.textContent = monogram;
  if (adminLogoText && shortName) adminLogoText.textContent = shortName;
}

function updateAdminAvatarPreview(url, monogram) {
  const previewImg = document.getElementById('admin-avatar-preview');
  const fallback = document.getElementById('admin-avatar-fallback');
  if (fallback && monogram) fallback.textContent = monogram;

  if (url && url.trim() !== '') {
    if (previewImg) {
      previewImg.src = url;
      previewImg.style.display = 'block';
    }
    if (fallback) fallback.style.display = 'none';
  } else {
    if (previewImg) {
      previewImg.src = '';
      previewImg.style.display = 'none';
    }
    if (fallback) fallback.style.display = 'flex';
  }
}

function populateProfileForm() {
  const p = currentData.profile || {};
  setValue('profile-name', p.name);
  setValue('profile-shortname', p.shortName);
  setValue('profile-monogram', p.monogram);
  setValue('profile-degree', p.degree);
  setValue('profile-institution', p.institution);
  setValue('profile-location', p.location);
  setValue('profile-email', p.email);
  setValue('profile-github', p.github);
  setValue('profile-linkedin', p.linkedin);
  setValue('profile-status', p.status);
  setValue('profile-bio', p.bioSummary);
  setValue('profile-typewriter', (p.typewriterRoles || []).join('\n'));

  const avatarUrl = p.avatarUrl || p.photoUrl || p.photo || p.profilePhoto || '';
  setValue('profile-photo-url', avatarUrl);
  updateAdminAvatarPreview(avatarUrl, p.monogram || '<ADM />');

  updateAdminHeaderBranding(p.monogram || '<AM />', p.shortName || 'Adeepa');
}

function populateStatsForm() {
  const stats = currentData.stats || [];
  stats.forEach((stat, index) => {
    setValue(`stat-val-${index}`, stat.value);
    setValue(`stat-lbl-${index}`, stat.label);
    setValue(`stat-num-${index}`, stat.numeric !== null ? stat.numeric : '');
  });
}

function renderSkillsManager() {
  const container = document.getElementById('skills-manager-container');
  if (!container || !currentData.skills) return;

  const categories = Object.keys(currentData.skills);
  container.innerHTML = categories.map(catKey => {
    const cat = currentData.skills[catKey];
    return `
      <div class="skill-category-box">
        <h4>${escapeHtml(cat.title)}</h4>
        <div class="skill-tag-list" id="skills-list-${catKey}">
          ${cat.items.map((skill, index) => `
            <span class="skill-tag-chip">
              <span>${escapeHtml(skill)}</span>
              <span class="remove-tag-btn" onclick="removeSkill('${catKey}', ${index})">&times;</span>
            </span>
          `).join('')}
        </div>
        <div class="add-skill-row">
          <input type="text" class="form-control" id="add-skill-input-${catKey}" placeholder="New skill (e.g. Docker)">
          <button type="button" class="btn btn-secondary btn-sm" onclick="addSkill('${catKey}')">+ Add</button>
        </div>
      </div>
    `;
  }).join('');
}

window.removeSkill = function(catKey, index) {
  if (currentData.skills[catKey] && currentData.skills[catKey].items) {
    currentData.skills[catKey].items.splice(index, 1);
    renderSkillsManager();
  }
};

window.addSkill = function(catKey) {
  const input = document.getElementById(`add-skill-input-${catKey}`);
  if (!input) return;
  const val = input.value.trim();
  if (val && currentData.skills[catKey]) {
    currentData.skills[catKey].items.push(val);
    input.value = '';
    renderSkillsManager();
  }
};

/* ==========================================================================
   4. Projects CRUD Manager
   ========================================================================== */
function renderProjectsManager() {
  const listContainer = document.getElementById('projects-list-container');
  if (!listContainer || !Array.isArray(currentData.projects)) return;

  listContainer.innerHTML = currentData.projects.map(proj => `
    <div class="project-item-row">
      <div class="project-item-info">
        <h4>${escapeHtml(proj.title)}</h4>
        <div class="project-item-meta">
          <span>🏷️ ${escapeHtml(proj.categoryLabel || proj.category)}</span>
          <span>•</span>
          <span>${proj.featured ? '⭐ Featured' : 'Normal'}</span>
          <span>•</span>
          <span>${(proj.tags || []).length} Tags</span>
        </div>
      </div>
      <div class="project-item-actions">
        <button type="button" class="btn btn-secondary btn-sm" onclick="openProjectModal('${proj.id}')">✏️ Edit</button>
        <button type="button" class="btn btn-tertiary btn-sm" style="color: var(--error);" onclick="deleteProject('${proj.id}')">🗑️ Delete</button>
      </div>
    </div>
  `).join('');
}

window.openProjectModal = function(projectId) {
  editingProjectId = projectId;
  const modal = document.getElementById('project-modal');
  const titleEl = document.getElementById('project-modal-title');

  if (projectId) {
    const proj = currentData.projects.find(p => p.id === projectId);
    if (!proj) return;
    titleEl.textContent = 'Edit Project';
    setValue('modal-proj-id', proj.id);
    setValue('modal-proj-title', proj.title);
    setValue('modal-proj-category', proj.category);
    setValue('modal-proj-catlabel', proj.categoryLabel);
    setValue('modal-proj-badge', proj.badge || '');
    setValue('modal-proj-desc', proj.description);
    setValue('modal-proj-tags', (proj.tags || []).join(', '));
    setValue('modal-proj-github', proj.github || '');
    setValue('modal-proj-demo', proj.demo || '');
    document.getElementById('modal-proj-featured').checked = !!proj.featured;
  } else {
    titleEl.textContent = 'Add New Project';
    setValue('modal-proj-id', 'project-' + Date.now().toString(36));
    setValue('modal-proj-title', '');
    setValue('modal-proj-category', 'systems');
    setValue('modal-proj-catlabel', 'Systems');
    setValue('modal-proj-badge', 'Engineering');
    setValue('modal-proj-desc', '');
    setValue('modal-proj-tags', 'JavaScript, HTML5, CSS3');
    setValue('modal-proj-github', 'https://github.com/AdeepaOfficial');
    setValue('modal-proj-demo', '');
    document.getElementById('modal-proj-featured').checked = true;
  }

  modal.classList.add('active');
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
  editingProjectId = null;
};

window.deleteProject = function(projectId) {
  if (confirm(`Are you sure you want to delete this project?`)) {
    currentData.projects = currentData.projects.filter(p => p.id !== projectId);
    renderProjectsManager();
    showToast('Project deleted.');
  }
};

// Project Modal Form Submit
document.getElementById('project-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = getValue('modal-proj-title');
  if (!title) {
    alert('Project title is required');
    return;
  }

  const projObj = {
    id: getValue('modal-proj-id') || 'project-' + Date.now().toString(36),
    title: title,
    category: getValue('modal-proj-category'),
    categoryLabel: getValue('modal-proj-catlabel'),
    badge: getValue('modal-proj-badge'),
    description: getValue('modal-proj-desc'),
    tags: getValue('modal-proj-tags').split(',').map(t => t.trim()).filter(Boolean),
    github: getValue('modal-proj-github'),
    demo: getValue('modal-proj-demo'),
    featured: document.getElementById('modal-proj-featured').checked
  };

  if (editingProjectId) {
    const idx = currentData.projects.findIndex(p => p.id === editingProjectId);
    if (idx !== -1) currentData.projects[idx] = projObj;
  } else {
    currentData.projects.push(projObj);
  }

  closeProjectModal();
  renderProjectsManager();
  showToast('✓ Project saved successfully!');
});

/* ==========================================================================
   5. Timeline Manager
   ========================================================================== */
function renderTimelineManager() {
  const container = document.getElementById('timeline-list-container');
  if (!container || !Array.isArray(currentData.timeline)) return;

  container.innerHTML = currentData.timeline.map((item, index) => `
    <div class="project-item-row">
      <div class="project-item-info">
        <h4>${escapeHtml(item.title)}</h4>
        <div class="project-item-meta">
          <span>📅 ${escapeHtml(item.period)}</span>
          <span>•</span>
          <span>🏛️ ${escapeHtml(item.institution)}</span>
        </div>
      </div>
      <div class="project-item-actions">
        <button type="button" class="btn btn-secondary btn-sm" onclick="openTimelineModal(${index})">✏️ Edit</button>
        <button type="button" class="btn btn-tertiary btn-sm" style="color: var(--error);" onclick="deleteTimelineItem(${index})">🗑️ Delete</button>
      </div>
    </div>
  `).join('');
}

window.openTimelineModal = function(index) {
  editingTimelineIndex = index;
  const modal = document.getElementById('timeline-modal');
  const titleEl = document.getElementById('timeline-modal-title');

  if (index !== null && index !== undefined && currentData.timeline[index]) {
    const item = currentData.timeline[index];
    titleEl.textContent = 'Edit Milestone';
    setValue('modal-time-period', item.period);
    setValue('modal-time-title', item.title);
    setValue('modal-time-inst', item.institution);
    setValue('modal-time-desc', item.description);
    setValue('modal-time-type', item.type || 'education');
  } else {
    editingTimelineIndex = null;
    titleEl.textContent = 'Add New Milestone';
    setValue('modal-time-period', '2024 - Present');
    setValue('modal-time-title', '');
    setValue('modal-time-inst', '');
    setValue('modal-time-desc', '');
    setValue('modal-time-type', 'education');
  }

  modal.classList.add('active');
};

window.closeTimelineModal = function() {
  const modal = document.getElementById('timeline-modal');
  if (modal) modal.classList.remove('active');
  editingTimelineIndex = null;
};

window.deleteTimelineItem = function(index) {
  if (confirm('Delete this milestone?')) {
    currentData.timeline.splice(index, 1);
    renderTimelineManager();
    showToast('Milestone deleted.');
  }
};

document.getElementById('timeline-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const itemObj = {
    period: getValue('modal-time-period'),
    title: getValue('modal-time-title'),
    institution: getValue('modal-time-inst'),
    description: getValue('modal-time-desc'),
    type: getValue('modal-time-type')
  };

  if (editingTimelineIndex !== null) {
    currentData.timeline[editingTimelineIndex] = itemObj;
  } else {
    currentData.timeline.push(itemObj);
  }

  closeTimelineModal();
  renderTimelineManager();
  showToast('✓ Milestone saved!');
});

/* ==========================================================================
   6. Global Actions & Live Sync
   ========================================================================== */
function initGlobalActions() {
  const saveBtn = document.getElementById('save-live-btn');
  const exportBtn = document.getElementById('export-json-btn');
  const resetBtn = document.getElementById('reset-defaults-btn');
  const applyRawBtn = document.getElementById('apply-raw-btn');
  const formatRawBtn = document.getElementById('format-raw-btn');

  // Collect form data back into currentData
  function gatherFormData() {
    const rawMonogram = getValue('profile-monogram') || '<AM />';
    const rawShortName = getValue('profile-shortname') || 'Adeepa';
    updateAdminHeaderBranding(rawMonogram, rawShortName);

    const photoUrl = getValue('profile-photo-url') || (currentData.profile && (currentData.profile.avatarUrl || currentData.profile.photoUrl)) || '';

    currentData.profile = {
      name: getValue('profile-name'),
      shortName: rawShortName,
      monogram: rawMonogram,
      avatarUrl: photoUrl,
      role: getValue('profile-degree'),
      degree: getValue('profile-degree'),
      institution: getValue('profile-institution'),
      location: getValue('profile-location'),
      email: getValue('profile-email'),
      github: getValue('profile-github'),
      linkedin: getValue('profile-linkedin'),
      resumeUrl: '#contact',
      status: getValue('profile-status'),
      typewriterRoles: getValue('profile-typewriter').split('\n').map(s => s.trim()).filter(Boolean),
      bioSummary: getValue('profile-bio')
    };

    // Gather Stats
    currentData.stats = [0, 1, 2, 3].map(i => ({
      value: getValue(`stat-val-${i}`),
      label: getValue(`stat-lbl-${i}`),
      numeric: getValue(`stat-num-${i}`) ? parseInt(getValue(`stat-num-${i}`), 10) : null
    }));

    // Gather Contact Form & API Settings
    currentData.contactSettings = {
      provider: getValue('setting-form-provider') || (currentData.contactSettings && currentData.contactSettings.provider) || 'web3forms',
      accessKey: getValue('setting-web3forms-key') || (currentData.contactSettings && currentData.contactSettings.accessKey) || '',
      formspreeId: getValue('setting-formspree-id') || (currentData.contactSettings && currentData.contactSettings.formspreeId) || '',
      notificationEmail: getValue('setting-notification-email') || (currentData.contactSettings && currentData.contactSettings.notificationEmail) || 'adeepadmarambage@gmail.com'
    };
  }

  // Real-time branding input listeners
  const monoInput = document.getElementById('profile-monogram');
  const shortNameInput = document.getElementById('profile-shortname');
  if (monoInput) {
    monoInput.addEventListener('input', (e) => {
      const val = e.target.value || '<AM />';
      updateAdminHeaderBranding(val, getValue('profile-shortname') || 'Adeepa');
      const photoVal = getValue('profile-photo-url');
      if (!photoVal) {
        updateAdminAvatarPreview('', val);
      }
    });
  }
  if (shortNameInput) {
    shortNameInput.addEventListener('input', (e) => {
      updateAdminHeaderBranding(getValue('profile-monogram') || '<AM />', e.target.value || 'Adeepa');
    });
  }

  // Profile Photo Upload & Management Listeners
  const photoFileInput = document.getElementById('profile-photo-file-input');
  const photoUrlInput = document.getElementById('profile-photo-url');
  const removePhotoBtn = document.getElementById('remove-photo-btn');

  if (photoFileInput) {
    photoFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (PNG, JPG, WebP, SVG, etc.).');
        return;
      }

      if (file.size > 3 * 1024 * 1024) {
        alert('Image is larger than 3MB. Please choose a photo under 3MB for smooth browser storage.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result;
        setValue('profile-photo-url', base64Data);
        if (!currentData.profile) currentData.profile = {};
        currentData.profile.avatarUrl = base64Data;
        updateAdminAvatarPreview(base64Data, getValue('profile-monogram') || '<ADM />');
        showToast('📷 Photo loaded! Click "Save & Apply Live" to update portfolio.');
      };
      reader.readAsDataURL(file);
    });
  }

  if (photoUrlInput) {
    photoUrlInput.addEventListener('input', (e) => {
      const url = e.target.value.trim();
      if (!currentData.profile) currentData.profile = {};
      currentData.profile.avatarUrl = url;
      updateAdminAvatarPreview(url, getValue('profile-monogram') || '<ADM />');
    });
  }

  if (removePhotoBtn) {
    removePhotoBtn.addEventListener('click', () => {
      setValue('profile-photo-url', '');
      if (photoFileInput) photoFileInput.value = '';
      if (!currentData.profile) currentData.profile = {};
      currentData.profile.avatarUrl = '';
      updateAdminAvatarPreview('', getValue('profile-monogram') || '<ADM />');
      showToast('Profile photo removed. Monogram badge will be displayed.');
    });
  }

  // Save & Apply Live to localStorage
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      gatherFormData();
      localStorage.setItem('portfolio_custom_data', JSON.stringify(currentData, null, 2));
      syncToRawJsonEditor();
      showToast('🚀 Changes saved and applied live to portfolio!');
    });
  }

  // Export JSON file
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      gatherFormData();
      const jsonStr = JSON.stringify(currentData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('📥 portfolio.json downloaded! Save it into data/portfolio.json to commit.');
    });
  }

  // Reset to Defaults
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all content back to data/portfolio.json default values? Unsaved customizations in localStorage will be cleared.')) {
        localStorage.removeItem('portfolio_custom_data');
        loadInitialData();
        showToast('🔄 Restored default data from portfolio.json!');
      }
    });
  }

  // Raw JSON Editor Handlers
  if (formatRawBtn) {
    formatRawBtn.addEventListener('click', () => {
      const editor = document.getElementById('raw-json-editor');
      try {
        const parsed = JSON.parse(editor.value);
        editor.value = JSON.stringify(parsed, null, 2);
        showToast('JSON Formatted.');
      } catch (err) {
        alert('Invalid JSON: ' + err.message);
      }
    });
  }

  if (applyRawBtn) {
    applyRawBtn.addEventListener('click', () => {
      const editor = document.getElementById('raw-json-editor');
      try {
        const parsed = JSON.parse(editor.value);
        if (parsed.profile && parsed.projects) {
          currentData = parsed;
          localStorage.setItem('portfolio_custom_data', JSON.stringify(currentData, null, 2));
          populateProfileForm();
          populateStatsForm();
          populateContactSettings();
          renderSkillsManager();
          renderProjectsManager();
          renderTimelineManager();
          renderInboxMessages();
          showToast('✓ Raw JSON successfully applied & saved live!');
        } else {
          alert('JSON structure is missing required "profile" or "projects" top-level keys.');
        }
      } catch (err) {
        alert('Invalid JSON syntax: ' + err.message);
      }
    });
  }

  // Contact Form & Email Settings Listener
  const saveContactBtn = document.getElementById('save-contact-settings-btn');
  if (saveContactBtn) {
    saveContactBtn.addEventListener('click', () => {
      gatherFormData();
      localStorage.setItem('portfolio_custom_data', JSON.stringify(currentData, null, 2));
      syncToRawJsonEditor();
      showToast('🚀 Contact & Email settings saved live!');
    });
  }

  // Inbox Toolbar Listeners
  const inboxSearchInput = document.getElementById('inbox-search-input');
  if (inboxSearchInput) {
    inboxSearchInput.addEventListener('input', (e) => {
      renderInboxMessages(e.target.value.trim());
    });
  }

  const exportMessagesBtn = document.getElementById('export-messages-btn');
  if (exportMessagesBtn) {
    exportMessagesBtn.addEventListener('click', exportInboxMessages);
  }

  const clearInboxBtn = document.getElementById('clear-inbox-btn');
  if (clearInboxBtn) {
    clearInboxBtn.addEventListener('click', clearAllInboxMessages);
  }

  // Cross-tab Synchronization for Real-time Inbox Refresh
  window.addEventListener('storage', (e) => {
    if (e.key === 'portfolio_inbox_messages') {
      const searchVal = getValue('inbox-search-input');
      renderInboxMessages(searchVal);
    }
  });
}

function syncToRawJsonEditor() {
  const editor = document.getElementById('raw-json-editor');
  if (editor) {
    editor.value = JSON.stringify(currentData, null, 2);
  }
}

/* ==========================================================================
   6. Messages Inbox & Contact Settings Engine
   ========================================================================== */
function populateContactSettings() {
  const cs = currentData.contactSettings || {};
  setValue('setting-form-provider', cs.provider || 'web3forms');
  setValue('setting-notification-email', cs.notificationEmail || 'adeepadmarambage@gmail.com');
  setValue('setting-web3forms-key', cs.accessKey || '');
  setValue('setting-formspree-id', cs.formspreeId || '');
}

function getStoredMessages() {
  try {
    const raw = localStorage.getItem('portfolio_inbox_messages');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed to parse portfolio_inbox_messages from localStorage:', e);
    return [];
  }
}

function updateInboxBadge(count) {
  const badge = document.getElementById('inbox-count-badge');
  const totalEl = document.getElementById('inbox-total-count');

  if (badge) {
    if (count > 0) {
      badge.textContent = count > 99 ? '99+' : count;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }

  if (totalEl) {
    totalEl.textContent = `${count} Message${count === 1 ? '' : 's'}`;
  }
}

function renderInboxMessages(searchTerm = '') {
  const container = document.getElementById('inbox-messages-container');
  if (!container) return;

  const allMessages = getStoredMessages();
  updateInboxBadge(allMessages.length);

  let messages = allMessages;
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    messages = messages.filter(m => 
      (m.name && m.name.toLowerCase().includes(term)) ||
      (m.email && m.email.toLowerCase().includes(term)) ||
      (m.subject && m.subject.toLowerCase().includes(term)) ||
      (m.message && m.message.toLowerCase().includes(term))
    );
  }

  if (allMessages.length === 0) {
    container.innerHTML = `
      <div class="inbox-empty-state">
        <div class="inbox-empty-icon">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <h4>No Messages Yet</h4>
        <p>When visitors submit inquiries through your live portfolio contact form, they will appear right here and will be forwarded directly to your email.</p>
      </div>
    `;
    return;
  }

  if (messages.length === 0) {
    container.innerHTML = `
      <div class="inbox-empty-state" style="padding: var(--space-8) var(--space-4);">
        <h4>No Matching Messages</h4>
        <p>No messages match your search filter "${escapeHtml(searchTerm)}". Try clearing your search.</p>
      </div>
    `;
    return;
  }

  // Sort newest first
  const sorted = [...messages].sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));

  container.innerHTML = sorted.map(msg => {
    const dateStr = msg.timestamp ? new Date(msg.timestamp).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'Recently';

    const senderInitials = (msg.name || 'Visitor')
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'AM';

    let deliveryBadge = '💾 Stored in Local Inbox';
    if (msg.status === 'delivered_web3forms') {
      deliveryBadge = '⚡ Delivered via Web3Forms';
    } else if (msg.status === 'delivered_formspree') {
      deliveryBadge = '⚡ Delivered via Formspree';
    } else if (msg.status === 'mailto') {
      deliveryBadge = '✉️ Mailto Fallback';
    }

    const replySubject = encodeURIComponent('Re: ' + (msg.subject || 'Portfolio Inquiry'));
    const mailtoLink = `mailto:${encodeURIComponent(msg.email || '')}?subject=${replySubject}`;

    return `
      <article class="inbox-message-card" data-msg-id="${escapeHtml(msg.id)}">
        <div class="inbox-card-top">
          <div class="inbox-sender-group">
            <div class="inbox-sender-avatar">${escapeHtml(senderInitials)}</div>
            <div class="inbox-sender-details">
              <h4>${escapeHtml(msg.name || 'Anonymous Visitor')}</h4>
              <a href="${mailtoLink}" class="inbox-sender-email" title="Click to compose email">${escapeHtml(msg.email || 'No email provided')}</a>
            </div>
          </div>

          <div class="inbox-meta-right">
            <span class="inbox-delivery-tag">${escapeHtml(deliveryBadge)}</span>
            <time datetime="${escapeHtml(msg.timestamp || '')}">${escapeHtml(dateStr)}</time>
          </div>
        </div>

        <div class="inbox-subject-line">
          <strong>Subject:</strong> ${escapeHtml(msg.subject || 'Portfolio Inquiry')}
        </div>

        <div class="inbox-message-content">${escapeHtml(msg.message || '')}</div>

        <div class="inbox-card-actions">
          <button type="button" class="btn btn-secondary btn-sm" onclick="copySenderEmail('${escapeHtml(msg.email || '')}')" title="Copy email address to clipboard">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy Email</span>
          </button>
          <a href="${mailtoLink}" class="btn btn-primary btn-sm" title="Reply to sender via email">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <span>Reply via Email</span>
          </a>
          <button type="button" class="btn btn-tertiary btn-sm" style="color: var(--error);" onclick="deleteInboxMessage('${escapeHtml(msg.id)}')" title="Delete this message">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            <span>Delete</span>
          </button>
        </div>
      </article>
    `;
  }).join('');
}

window.deleteInboxMessage = function(msgId) {
  const msgs = getStoredMessages();
  const updated = msgs.filter(m => m.id !== msgId);
  localStorage.setItem('portfolio_inbox_messages', JSON.stringify(updated));
  const searchVal = getValue('inbox-search-input');
  renderInboxMessages(searchVal);
  showToast('🗑️ Message deleted from inbox.');
};

window.clearAllInboxMessages = function() {
  const msgs = getStoredMessages();
  if (msgs.length === 0) {
    showToast('Inbox is already empty.');
    return;
  }
  if (confirm(`Are you sure you want to delete all ${msgs.length} message(s)? This action cannot be undone.`)) {
    localStorage.removeItem('portfolio_inbox_messages');
    setValue('inbox-search-input', '');
    renderInboxMessages();
    showToast('🗑️ All inbox messages cleared.');
  }
};

window.copySenderEmail = function(email) {
  if (!email) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      showToast(`📋 Copied: ${email}`);
    }).catch(() => {
      showToast(`Email: ${email}`);
    });
  } else {
    showToast(`Email: ${email}`);
  }
};

function exportInboxMessages() {
  const msgs = getStoredMessages();
  if (msgs.length === 0) {
    showToast('No messages to export.');
    return;
  }
  const jsonStr = JSON.stringify(msgs, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateSlug = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `portfolio-messages-${dateSlug}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('📥 Messages exported to JSON file!');
}

/* ==========================================================================
   7. Utilities & Helpers
   ========================================================================== */
function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val !== undefined && val !== null ? val : '';
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(msg) {
  const toast = document.getElementById('admin-toast');
  const msgEl = document.getElementById('admin-toast-msg');
  if (!toast || !msgEl) return;

  msgEl.textContent = msg;
  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 4000);
}
