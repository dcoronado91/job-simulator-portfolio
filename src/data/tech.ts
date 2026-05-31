export type TechLevel = "avanzado" | "sólido" | "intermedio"

export type TechItem = {
  name: string
  icon: string        // Simple Icons CDN slug → cdn.simpleicons.org/{icon}
  why: string
  level: TechLevel
  usedIn?: string[]
}

export type TechCategory = {
  name: string
  items: TechItem[]
}

export const techCategories: TechCategory[] = [
  {
    name: "Frontend",
    items: [
      {
        name: "Next.js",
        icon: "nextdotjs",
        why: "Mi framework principal. App Router, SSR y generación estática en un mismo proyecto. No elijo React puro cuando Next.js resuelve routing, caching y optimización de imágenes de fábrica.",
        level: "avanzado",
        usedIn: ["UVG Collab", "este portafolio"],
      },
      {
        name: "TypeScript",
        icon: "typescript",
        why: "No arranco un proyecto sin tipos. Detecta errores en compile-time, hace el código autodocumentado y facilita el trabajo en equipo.",
        level: "avanzado",
        usedIn: ["UVG Collab", "NBA Tracker", "este portafolio"],
      },
      {
        name: "Tailwind CSS",
        icon: "tailwindcss",
        why: "Utility-first que me permite iterar rápido. En TripTide UVG definí toda la paleta de colores y design tokens directamente en tailwind.config — consistencia visual garantizada.",
        level: "avanzado",
        usedIn: ["TripTide UVG", "este portafolio"],
      },
      {
        name: "React",
        icon: "react",
        why: "Base de mi stack frontend. Componentes reutilizables y estado declarativo. Lo uso directamente cuando no necesito SSR.",
        level: "avanzado",
        usedIn: ["SeaSOS", "TripTide UVG", "NBA Tracker"],
      },
    ],
  },
  {
    name: "Backend",
    items: [
      {
        name: "NestJS",
        icon: "nestjs",
        why: "Clean Architecture nativa con módulos, providers e inyección de dependencias. Lo elegí para UVG Collab porque el equipo necesitaba límites claros de responsabilidades y escalabilidad.",
        level: "avanzado",
        usedIn: ["UVG Collab"],
      },
      {
        name: "Python",
        icon: "python",
        why: "Lenguaje versátil que uso tanto para scripting como para servicios backend. Su ecosistema es ideal para procesamiento de datos, automatización y APIs rápidas con frameworks como Flask o Django.",
        level: "sólido",
        usedIn: ["proyectos académicos"],
      },
      {
        name: "Go (stdlib)",
        icon: "go",
        why: "Elegí Go para Albums API para demostrar cuánto alcanza la stdlib sin frameworks. Resultado: API REST completa en producción con cero dependencias externas y rendimiento excelente.",
        level: "intermedio",
        usedIn: ["Albums JSON API"],
      },
      {
        name: "Node.js / Express",
        icon: "nodedotjs",
        why: "Sencillo, flexible y suficiente para la mayoría de proyectos web. Buena base para entender I/O asíncrono y el ecosistema JS en el servidor.",
        level: "avanzado",
        usedIn: ["SeaSOS", "TripTide UVG", "NBA Tracker"],
      },
    ],
  },
  {
    name: "Bases de datos",
    items: [
      {
        name: "PostgreSQL",
        icon: "postgresql",
        why: "Mi base de datos relacional preferida. Robusta, con soporte de tipos avanzado y excelente en producción. La uso con Prisma para type-safety en las queries.",
        level: "sólido",
        usedIn: ["UVG Collab", "Sistema de gestión de tiendas"],
      },
      {
        name: "MongoDB",
        icon: "mongodb",
        why: "Flexible para datos no estructurados o esquemas que cambian frecuentemente. Útil cuando el modelo de documentos tiene más sentido que tablas relacionales.",
        level: "intermedio",
        usedIn: ["SeaSOS"],
      },
      {
        name: "Redis",
        icon: "redis",
        why: "Caché de sesiones y datos frecuentes. En UVG Collab redujo la carga sobre PostgreSQL en producción. También útil para rate limiting y pub/sub.",
        level: "intermedio",
        usedIn: ["UVG Collab"],
      },
    ],
  },
  {
    name: "DevOps",
    items: [
      {
        name: "Docker",
        icon: "docker",
        why: "Todo lo que construyo lo dockerizo. Elimina el 'funciona en mi máquina', hace el deploy reproducible en cualquier VPS con un solo comando.",
        level: "sólido",
        usedIn: ["Albums JSON API", "UVG Collab"],
      },
      {
        name: "Git",
        icon: "git",
        why: "Ramas por feature, commits descriptivos, PRs con contexto. Mi flujo de trabajo diario en todos los proyectos académicos y profesionales.",
        level: "avanzado",
        usedIn: ["todos los proyectos"],
      },
    ],
  },
]

export const levelColors: Record<TechLevel, string> = {
  avanzado:   "text-green border-green/30 bg-green/5",
  sólido:     "text-cyan border-cyan/30 bg-cyan/5",
  intermedio: "text-purple border-purple/30 bg-purple/5",
}
