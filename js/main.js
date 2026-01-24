// content and socials are loaded as globals from content.js

// GA4 event tracking helper
const track = (eventName, params = {}) => {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, params);
  }
};

// Consent Manager for GDPR compliance
const ConsentManager = {
  STORAGE_KEY: "cookie_consent",

  init() {
    const consent = this.getConsent();
    if (consent === null) {
      this.showBanner();
    } else {
      this.applyConsent(consent);
    }
    this.bindEvents();
  },

  getConsent() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === null) return null;
    return stored === "granted";
  },

  setConsent(granted) {
    localStorage.setItem(this.STORAGE_KEY, granted ? "granted" : "denied");
    this.applyConsent(granted);
    this.hideBanner();
  },

  applyConsent(granted) {
    const consentState = granted ? "granted" : "denied";
    if (typeof gtag !== "undefined") {
      gtag("consent", "update", {
        ad_storage: consentState,
        ad_user_data: consentState,
        ad_personalization: consentState,
        analytics_storage: consentState,
      });
    }
  },

  showBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.hidden = false;
  },

  hideBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.hidden = true;
  },

  bindEvents() {
    document.getElementById("cookie-accept")?.addEventListener("click", () => {
      this.setConsent(true);
      track("cookie_consent", { action: "accept" });
    });

    document.getElementById("cookie-reject")?.addEventListener("click", () => {
      this.setConsent(false);
    });

    document
      .getElementById("cookie-settings")
      ?.addEventListener("click", () => {
        this.showBanner();
      });
  },
};

const App = {
  currentLang: "en",

  init() {
    this.detectLanguage();
    this.renderSocials();
    this.render();
    this.bindEvents();
    ConsentManager.init();
  },

  detectLanguage() {
    // Priority: URL param > localStorage > navigator.language > 'en'
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang");

    if (urlLang && content[urlLang]) {
      this.currentLang = urlLang;
    } else {
      const storedLang = localStorage.getItem("preferredLang");
      if (storedLang && content[storedLang]) {
        this.currentLang = storedLang;
      } else {
        const browserLang = navigator.language.split("-")[0];
        if (content[browserLang]) {
          this.currentLang = browserLang;
        }
      }
    }
  },

  setLanguage(lang) {
    if (!content[lang]) return;

    // Track language switch
    if (lang !== this.currentLang) {
      track("language_switch", { from: this.currentLang, to: lang });
    }

    this.currentLang = lang;
    localStorage.setItem("preferredLang", lang);
    document.documentElement.lang = lang;

    // Update toggle buttons
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive);
    });

    this.render();
  },

  render() {
    const c = content[this.currentLang];

    // Update document
    document.documentElement.lang = c.lang;
    document.title = `${c.title} - Portfolio`;

    // Update all data-i18n elements (including cookie banner)
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (c[key]) {
        el.textContent = c[key];
      }
    });

    // Update CV button href
    const cvButton = document.getElementById("cv-button");
    if (cvButton) {
      cvButton.href = c.cvFile;
    }

    // Update easter egg
    const easterEgg = document.getElementById("easter-egg");
    if (easterEgg) {
      easterEgg.textContent = c.footer;
      easterEgg.dataset.alt = c.footerAlt;
    }

    // Render projects
    this.renderProjects(c.projects);

    // Update active language button
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      const isActive = btn.dataset.lang === this.currentLang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive);
    });
  },

  renderProjects(projects) {
    const container = document.getElementById("projects-container");
    if (!container) return;

    container.innerHTML = projects
      .map(
        (project) => `
      <article class="project-card">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-links">
          <a href="${project.url}" target="_blank" rel="noopener noreferrer"
             onclick="track('project_click', {project: '${project.name}', type: 'visit'})">
            Visit
          </a>
          ${
            project.github
              ? `
            <a href="${project.github}" target="_blank" rel="noopener noreferrer"
               onclick="track('project_click', {project: '${project.name}', type: 'github'})">
              GitHub
            </a>
          `
              : ""
          }
        </div>
      </article>
    `,
      )
      .join("");
  },

  renderSocials() {
    const container = document.getElementById("social-icons");
    if (!container) return;

    container.innerHTML = socials
      .map(
        (social) => `
      <a
        href="${social.url}"
        target="_blank"
        rel="noopener noreferrer"
        title="${social.name}"
        aria-label="${social.name}"
        onclick="track('social_click', {platform: '${social.name.toLowerCase()}'})"
      >
        <img src="${social.icon}" alt="${social.name}" width="28" height="28">
      </a>
    `,
      )
      .join("");
  },

  bindEvents() {
    // Language toggle
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.setLanguage(btn.dataset.lang);
      });
    });

    // CV download tracking
    const cvButton = document.getElementById("cv-button");
    if (cvButton) {
      cvButton.addEventListener("click", () => {
        track("cv_download", { language: this.currentLang });
      });
    }

    // Easter egg toggle
    const easterEgg = document.getElementById("easter-egg");
    if (easterEgg) {
      easterEgg.addEventListener("click", () => {
        track("easter_egg_click");
        const current = easterEgg.textContent;
        const alt = easterEgg.dataset.alt;
        easterEgg.textContent = alt;
        easterEgg.dataset.alt = current;
      });
    }
  },
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => App.init());
