export type Project = {
  id: string
  title: string
  year: string
  category: "Full-Stack" | "Backend" | "Frontend" | "Móvil"
  description: string
  bullets: string[]
  tech: string[]
  github: string
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
    github: "https://github.com/dcoronado91",
    live: "http://158.23.57.118",
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
    github: "https://github.com/dcoronado91",
    live: null,
  },
  {
    id: "triptide-uvg",
    title: "TripTide UVG",
    year: "2024",
    category: "Frontend",
    highlight: false,
    description:
      "Plataforma de carpool universitaria. Diseñé e implementé la landing page completa y los tokens visuales de toda la UI.",
    bullets: [
      "Landing page completa desde cero con React y Tailwind CSS",
      "Definición de paleta de colores y design tokens en Tailwind config",
      "Consistencia visual en todos los componentes de la aplicación",
    ],
    tech: ["React", "Tailwind CSS", "Node.js"],
    github: "https://github.com/dcoronado91",
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
    github: "https://github.com/dcoronado91",
    live: null,
  },
]
