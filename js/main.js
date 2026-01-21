import { content, socials } from './content.js';

const App = {
  currentLang: 'en',

  init() {
    this.detectLanguage();
    this.renderSocials();
    this.render();
    this.bindEvents();
  },

  detectLanguage() {
    // Priority: URL param > localStorage > navigator.language > 'en'
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    if (urlLang && content[urlLang]) {
      this.currentLang = urlLang;
    } else {
      const storedLang = localStorage.getItem('preferredLang');
      if (storedLang && content[storedLang]) {
        this.currentLang = storedLang;
      } else {
        const browserLang = navigator.language.split('-')[0];
        if (content[browserLang]) {
          this.currentLang = browserLang;
        }
      }
    }
  },

  setLanguage(lang) {
    if (!content[lang]) return;

    this.currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    document.documentElement.lang = lang;

    // Update toggle buttons
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });

    this.render();
  },

  render() {
    const c = content[this.currentLang];

    // Update document
    document.documentElement.lang = c.lang;
    document.title = `${c.title} - Portfolio`;

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (c[key]) {
        el.textContent = c[key];
      }
    });

    // Update CV button href
    const cvButton = document.getElementById('cv-button');
    if (cvButton) {
      cvButton.href = c.cvFile;
    }

    // Update easter egg
    const easterEgg = document.getElementById('easter-egg');
    if (easterEgg) {
      easterEgg.textContent = c.footer;
      easterEgg.dataset.alt = c.footerAlt;
    }

    // Render projects
    this.renderProjects(c.projects);

    // Update active language button
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      const isActive = btn.dataset.lang === this.currentLang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  },

  renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = projects.map(project => `
      <article class="project-card">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-links">
          <a href="${project.url}" target="_blank" rel="noopener noreferrer">
            Visit
          </a>
          ${project.github ? `
            <a href="${project.github}" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          ` : ''}
        </div>
      </article>
    `).join('');
  },

  renderSocials() {
    const container = document.getElementById('social-icons');
    if (!container) return;

    container.innerHTML = socials.map(social => `
      <a
        href="${social.url}"
        target="_blank"
        rel="noopener noreferrer"
        title="${social.name}"
        aria-label="${social.name}"
      >
        <img src="${social.icon}" alt="${social.name}" width="28" height="28">
      </a>
    `).join('');
  },

  bindEvents() {
    // Language toggle
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setLanguage(btn.dataset.lang);
      });
    });

    // Easter egg toggle
    const easterEgg = document.getElementById('easter-egg');
    if (easterEgg) {
      easterEgg.addEventListener('click', () => {
        const current = easterEgg.textContent;
        const alt = easterEgg.dataset.alt;
        easterEgg.textContent = alt;
        easterEgg.dataset.alt = current;
      });
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
