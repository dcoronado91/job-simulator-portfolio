export type Lang = "es" | "en"

export interface I18n {
  nav: {
    home: string
    about: string
    projects: string
    tech: string
    contact: string
    downloadCV: string
  }
  hero: {
    available: string
    typewriter: string
    description: string
    downloadCV: string
  }
  about: {
    label: string
    title: string
    p1: string
    p2: string
    p3: string
    stats: Array<{ number: string; label: string; sub: string }>
  }
  projects: {
    label: string
    title: string
    cta: string
  }
  tech: {
    label: string
    title: string
    alsoKnow: string
    categories: Record<string, string>
    levels: Record<string, string>
  }
  contact: {
    label: string
    title: string
    description: string
    emailBtn: string
    downloadCV: string
  }
  footer: {
    made: string
  }
}

const es: I18n = {
  nav: {
    home:       "Inicio",
    about:      "Sobre mí",
    projects:   "Proyectos",
    tech:       "Tecnologías",
    contact:    "Contacto",
    downloadCV: "Descargar CV",
  },
  hero: {
    available:  "Disponible para trabajar",
    typewriter: "Desarrollador Full-Stack · Guatemala",
    description:
      "Construyo productos web con stacks modernos — de la arquitectura a la UI, pasando por la API y el contenedor Docker.",
    downloadCV: "Descargar CV",
  },
  about: {
    label: "/ sobre mí",
    title: "Quién soy",
    p1: "Estudiante de Ingeniería en Ciencias de la Computación en la Universidad del Valle de Guatemala. Me muevo cómodo en todo el stack — desde el diseño de esquemas de base de datos hasta la interfaz de usuario — con foco en back-end y arquitectura de sistemas.",
    p2: "Código correcto antes que rápido. Rápido antes que complejo. Decisiones deliberadas de stack, Docker desde el día uno, y un historial de git que cuenta la historia del proyecto.",
    p3: "Actualmente trabajo como freelance mientras completo mi formación. En el lado académico he colaborado en equipos construyendo plataformas en producción, con responsabilidad sobre módulos completos de extremo a extremo.",
    stats: [
      { number: "3°",   label: "año de CS",  sub: "Univ. del Valle de Guatemala" },
      { number: "8+",   label: "proyectos",  sub: "deployados o con repo público" },
      { number: "5+",   label: "lenguajes",  sub: "JS · Go · Python · Java · C++" },
      { number: "Full", label: "Stack",      sub: "Frontend · Backend · DevOps" },
    ],
  },
  projects: {
    label: "/ proyectos",
    title: "Trabajo reciente",
    cta:   "¿Hablemos de uno?",
  },
  tech: {
    label:    "/ tecnologías",
    title:    "Stack técnico",
    alsoKnow: "también conozco",
    categories: {},
    levels: {
      avanzado:   "avanzado",
      sólido:     "sólido",
      intermedio: "intermedio",
    },
  },
  contact: {
    label:       "/ contacto",
    title:       "¿Hablemos?",
    description: "¿Tienes un proyecto, una oportunidad o simplemente quieres conocer más de mi trabajo? Escríbeme directamente — respondo rápido.",
    emailBtn:   "Enviar email",
    downloadCV: "Descargar CV",
  },
  footer: {
    made: "Hecho con Next.js + Tailwind",
  },
}

const en: I18n = {
  nav: {
    home:       "Home",
    about:      "About",
    projects:   "Projects",
    tech:       "Technologies",
    contact:    "Contact",
    downloadCV: "Download CV",
  },
  hero: {
    available:  "Available for work",
    typewriter: "Full-Stack Developer · Guatemala",
    description:
      "I build web products with modern stacks — from architecture to UI, through the API and the Docker container.",
    downloadCV: "Download CV",
  },
  about: {
    label: "/ about",
    title: "Who am I",
    p1: "Computer Science Engineering student at Universidad del Valle de Guatemala. I work comfortably across the full stack — from database schema design to the user interface — with a focus on back-end and systems architecture.",
    p2: "Correct code before fast. Fast before complex. Deliberate stack decisions, Docker from day one, and a git history that tells the project's story.",
    p3: "Currently working as a freelancer while completing my degree. Academically, I've collaborated in teams building production platforms, with end-to-end ownership of complete modules.",
    stats: [
      { number: "3°",   label: "CS year",   sub: "Univ. del Valle de Guatemala" },
      { number: "8+",   label: "projects",  sub: "deployed or with public repo" },
      { number: "5+",   label: "languages", sub: "JS · Go · Python · Java · C++" },
      { number: "Full", label: "Stack",     sub: "Frontend · Backend · DevOps" },
    ],
  },
  projects: {
    label: "/ projects",
    title: "Recent work",
    cta:   "Let's talk about one?",
  },
  tech: {
    label:    "/ technologies",
    title:    "Tech stack",
    alsoKnow: "also know",
    categories: {
      "Bases de datos": "Databases",
    },
    levels: {
      avanzado:   "advanced",
      sólido:     "proficient",
      intermedio: "intermediate",
    },
  },
  contact: {
    label:       "/ contact",
    title:       "Let's talk?",
    description: "Do you have a project, an opportunity, or just want to know more about my work? Write to me directly — I respond quickly.",
    emailBtn:   "Send email",
    downloadCV: "Download CV",
  },
  footer: {
    made: "Built with Next.js + Tailwind",
  },
}

export const i18n: Record<Lang, I18n> = { es, en }
