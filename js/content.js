const content = {
  en: {
    lang: "en",
    langName: "EN",
    title: "Juan Manuel Daza",
    subtitle: "Full Stack AI Engineer",
    aboutTitle: "About",
    bio: "I'm not a pirate, but I've been chasing treasure for 6 years—building digital solutions and hunting Agentic AI. I studied words before I learned code. That's why I can make machines speak human.",
    projectsTitle: "Projects",
    projects: [
      {
        name: "Daza Wallpapers",
        description: "Minimalist wallpapers from 35mm analog photography",
        url: "https://wallpapers.daza.ar",
        github: "https://github.com/juanmanueldaza/wallpapers",
      },
      {
        name: "FutureProof",
        description:
          "Career Intelligence System - Aggregate professional data and generate AI-optimized CVs",
        url: "https://github.com/juanmanueldaza/futureproof",
        github: "https://github.com/juanmanueldaza/futureproof",
      },
      {
        name: "linkedin2md",
        description:
          "CLI tool to convert LinkedIn data exports to Markdown for AI analysis",
        url: "https://linkedin2md.daza.ar",
        github: "https://github.com/juanmanueldaza/linkedin2md",
      },
      {
        name: "github2md",
        description:
          "CLI tool to convert GitHub profiles to Markdown for AI analysis",
        url: "https://github2md.daza.ar",
        github: "https://github.com/juanmanueldaza/github2md",
      },
      {
        name: "gitlab2md",
        description:
          "CLI tool to convert GitLab profiles to Markdown for AI analysis",
        url: "https://gitlab2md.daza.ar",
        github: "https://github.com/juanmanueldaza/gitlab2md",
      },
      {
        name: "Pokedex",
        description:
          "Interactive Pokemon encyclopedia built with Roofs on Fire",
        url: "https://roofsonfire.github.io/pokedex/",
        github: "https://github.com/roofsonfire/pokedex",
      },
    ],
    cvButton: "Download CV",
    cvFile: "cv_eng.pdf",
    footer: "You fight like a dairy farmer.",
    footerAlt: "How appropriate. You fight like a cow.",
  },
  es: {
    lang: "es",
    langName: "ES",
    title: "Juan Manuel Daza",
    subtitle: "Full Stack AI Engineer",
    aboutTitle: "Sobre mi",
    bio: "No soy pirata, pero llevo 6 años buscando tesoros—construyendo soluciones digitales y cazando IA Agéntica. Estudié palabras antes que código. Por eso puedo hacer que las máquinas hablen humano.",
    projectsTitle: "Proyectos",
    projects: [
      {
        name: "Daza Wallpapers",
        description:
          "Fondos de pantalla minimalistas de fotografía analógica 35mm",
        url: "https://wallpapers.daza.ar",
        github: "https://github.com/juanmanueldaza/wallpapers",
      },
      {
        name: "FutureProof",
        description:
          "Sistema de Inteligencia de Carrera - Agrega datos profesionales y genera CVs optimizados con IA",
        url: "https://github.com/juanmanueldaza/futureproof",
        github: "https://github.com/juanmanueldaza/futureproof",
      },
      {
        name: "linkedin2md",
        description:
          "Herramienta CLI para convertir exportaciones de LinkedIn a Markdown para análisis con IA",
        url: "https://linkedin2md.daza.ar",
        github: "https://github.com/juanmanueldaza/linkedin2md",
      },
      {
        name: "github2md",
        description:
          "Herramienta CLI para convertir perfiles de GitHub a Markdown para análisis con IA",
        url: "https://github2md.daza.ar",
        github: "https://github.com/juanmanueldaza/github2md",
      },
      {
        name: "gitlab2md",
        description:
          "Herramienta CLI para convertir perfiles de GitLab a Markdown para análisis con IA",
        url: "https://gitlab2md.daza.ar",
        github: "https://github.com/juanmanueldaza/gitlab2md",
      },
      {
        name: "Pokedex",
        description:
          "Enciclopedia Pokemon interactiva construida con Roofs on Fire",
        url: "https://roofsonfire.github.io/pokedex/",
        github: "https://github.com/roofsonfire/pokedex",
      },
    ],
    cvButton: "Descargar CV",
    cvFile: "cv_es.pdf",
    footer: "Peleas como un granjero.",
    footerAlt: "Qué apropiado. Peleas como una vaca.",
  },
};

const socials = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/juanmanueldaza",
    icon: "assets/icons/linkedin.svg",
  },
  {
    name: "GitHub",
    url: "https://github.com/juanmanueldaza",
    icon: "assets/icons/square-github.svg",
  },
  {
    name: "GitLab",
    url: "https://gitlab.com/juanmanueldaza",
    icon: "assets/icons/square-gitlab.svg",
  },
  {
    name: "PyPI",
    url: "https://pypi.org/user/juanmanueldaza/",
    icon: "assets/icons/pypi.svg",
  },
  {
    name: "Email",
    url: "mailto:juanmanueldaza@gmail.com",
    icon: "assets/icons/envelope.svg",
  },
];

// Export for ES modules (when served via HTTP)
// For file:// protocol, these are accessed as globals
if (typeof module !== "undefined" && module.exports) {
  module.exports = { content, socials };
}
