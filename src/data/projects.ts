export type GithubLink = { label: string; url: string }

export type Project = {
  id: string
  title: string
  year: string
  category: "Full-Stack" | "Backend" | "Frontend" | "Móvil"
  description: string
  bullets: string[]
  tech: string[]
  github: string | null
  githubLinks?: GithubLink[]
  live: string | null
  highlight: boolean
}

export const projects: Project[] = [
  {
    id: "uvg-collab",
    title: "UVG Collab",
    year: "2026",
    category: "Full-Stack",
    highlight: true,
    description:
      "Plataforma de gestión de proyectos académicos para asociaciones estudiantiles de la UVG. Equipo de 5 personas, desplegada en producción.",
    bullets: [
      "Endpoint de postulaciones con validaciones integrando Next.js y NestJS (Clean Architecture 4 capas)",
      "Módulo de notificaciones en tiempo real: endpoints REST, triggers automáticos, campana con badge",
      "Panel de filtros del dashboard (tipo, modalidad, organización, habilidades) con resultados en tiempo real",
      "Desplegada en producción en servidor propio",
    ],
    tech: ["NestJS", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "Prisma"],
    github: null,
    live: "http://158.23.57.118",
  },
  {
    id: "nba-tracker",
    title: "NBA Tracker",
    year: "2025",
    category: "Full-Stack",
    highlight: true,
    description:
      "Aplicación web para consultar estadísticas de la NBA en tiempo real. Frontend desplegado en Vercel con backend propio para manejo de datos y caché.",
    bullets: [
      "Consulta de estadísticas de equipos y jugadores consumiendo APIs externas de datos deportivos",
      "Backend independiente para gestión de caché, normalización de datos y endpoints propios",
      "Frontend React desplegado en Vercel con diseño responsivo",
      "Arquitectura desacoplada: frontend y backend en repositorios separados",
    ],
    tech: ["React", "Node.js", "TypeScript", "REST API"],
    github: null,
    githubLinks: [
      { label: "Frontend", url: "https://github.com/dcoronado91/nbatracker-frontend" },
      { label: "Backend",  url: "https://github.com/dcoronado91/nbatracker-backend" },
    ],
    live: "https://nbatracker-frontend.vercel.app/",
  },
  {
    id: "albums-api",
    title: "Albums JSON API",
    year: "2025",
    category: "Backend",
    highlight: true,
    description:
      "API REST completa construida únicamente con la biblioteca estándar de Go. Cero dependencias externas, dockerizada y activa en producción.",
    bullets: [
      "CRUD completo con respuestas de error estructuradas en JSON",
      "GET con filtros combinables por query params, POST, PUT, PATCH, DELETE y health ping",
      "Contenedorizada con Dockerfile y docker-compose personalizados",
      "Activa en producción con dominio público propio",
    ],
    tech: ["Go", "Docker", "Docker Compose", "REST API"],
    github: "https://github.com/dcoronado91/ej4-api-json",
    live: null,
  },
  {
    id: "gestion-tiendas",
    title: "Sistema de Gestión de Tiendas",
    year: "2024",
    category: "Full-Stack",
    highlight: true,
    description:
      "Sistema full-stack de administración de tiendas con base de datos relacional y ORM. Gestión de inventario, ventas y reportes, desplegado en producción.",
    bullets: [
      "Modelo relacional con entidades para tiendas, productos, clientes y transacciones",
      "Operaciones CRUD completas con ORM para queries type-safe",
      "Consultas complejas con joins, agregaciones y filtros sobre datos reales",
      "Frontend desplegado en Netlify y conectado a backend propio",
    ],
    tech: ["Node.js", "PostgreSQL", "Sequelize", "SQL", "React"],
    github: "https://github.com/dcoronado91/proyecto2-db",
    live: "https://tienda-tech-frontend.netlify.app/",
  },
  {
    id: "calculadora-react",
    title: "Calculadora React",
    year: "2024",
    category: "Frontend",
    highlight: true,
    description:
      "Calculadora web construida con React y Vite, con pruebas unitarias implementadas. Demuestra dominio de testing en frontend y flujo de trabajo con bundlers modernos.",
    bullets: [
      "Lógica de operaciones con cobertura de pruebas unitarias",
      "Construida con Vite como bundler — builds rápidos y DX optimizado",
      "Componentes React desacoplados y fácilmente testeables",
    ],
    tech: ["React", "Vite", "JavaScript", "Testing"],
    github: "https://github.com/dcoronado91/calculadora-react",
    live: "https://calculadora-react-teal-mu.vercel.app/",
  },
  {
    id: "snake-react",
    title: "Snake",
    year: "2024",
    category: "Frontend",
    highlight: true,
    description:
      "Juego Snake clásico implementado con React y Vite. Manejo de estado del juego, lógica de colisiones y loop de animación sin librerías externas de juego.",
    bullets: [
      "Game loop con requestAnimationFrame y manejo de estado con hooks",
      "Detección de colisiones, crecimiento de serpiente y lógica de puntuación",
      "Construido con Vite — sin dependencias de motor de juego",
    ],
    tech: ["React", "Vite", "JavaScript"],
    github: "https://github.com/dcoronado91/snake-react",
    live: "https://snake-react-vert.vercel.app/",
  },
  {
    id: "triptide-uvg",
    title: "TripTide UVG",
    year: "2024",
    category: "Frontend",
    highlight: false,
    description:
      "Plataforma de carpool universitaria. Diseñé e implementé la landing page completa y los tokens visuales de toda la UI con React y Tailwind CSS.",
    bullets: [
      "Landing page nueva diseñada e implementada desde cero con React y Tailwind CSS",
      "Definición de paleta de colores y design tokens en Tailwind config, aplicados en toda la app",
      "Consistencia visual entre la landing y los componentes internos de la plataforma",
    ],
    tech: ["React", "Tailwind CSS", "Node.js"],
    github: "https://github.com/PabloVS044/carpool-app-front",
    live: null,
  },
  {
    id: "seasos",
    title: "SeaSOS",
    year: "2024",
    category: "Full-Stack",
    highlight: false,
    description:
      "Aplicación de concientización marítima. Frontend con React y capa de datos con MongoDB.",
    bullets: [
      "Componentes React reutilizables integrados con API REST en Express",
      "Modificaciones directas sobre registros MongoDB para integridad del contenido",
    ],
    tech: ["React", "MongoDB", "Node.js", "Express"],
    github: "https://github.com/Ciencias-de-la-vida/seasos-front",
    live: null,
  },
]
