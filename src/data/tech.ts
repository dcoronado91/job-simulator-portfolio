export type TechLevel = "avanzado" | "sólido" | "intermedio"

export type TechItem = {
  name: string
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
        why: "Mi framework principal. App Router, SSR y generación estática en un mismo proyecto. No elijo React puro cuando Next.js resuelve routing, caching y optimización de imágenes de fábrica.",
        level: "avanzado",
        usedIn: ["UVG Collab", "este portafolio"],
      },
      {
        name: "TypeScript",
        why: "No arranco un proyecto sin tipos. Detecta errores en compile-time, hace el código autodocumentado y facilita el trabajo en equipo.",
        level: "avanzado",
        usedIn: ["UVG Collab", "este portafolio"],
      },
      {
        name: "Tailwind CSS",
        why: "Utility-first que me permite iterar rápido. En TripTide UVG definí toda la paleta de colores y design tokens directamente en tailwind.config — consistencia visual garantizada.",
        level: "avanzado",
        usedIn: ["TripTide UVG", "este portafolio"],
      },
      {
        name: "React",
        why: "Base de mi stack frontend. Componentes reutilizables y estado declarativo. Lo uso directamente cuando no necesito SSR.",
        level: "avanzado",
        usedIn: ["SeaSOS", "TripTide UVG"],
      },
    ],
  },
  {
    name: "Backend",
    items: [
      {
        name: "NestJS",
        why: "Clean Architecture nativa con módulos, providers e inyección de dependencias. Lo elegí para UVG Collab porque el equipo necesitaba límites claros de responsabilidades y escalabilidad.",
        level: "avanzado",
        usedIn: ["UVG Collab"],
      },
      {
        name: "Go (stdlib)",
        why: "Elegí Go para Albums API para demostrar cuánto alcanza la stdlib sin frameworks. Resultado: API REST completa en producción con cero dependencias externas.",
        level: "intermedio",
        usedIn: ["Albums JSON API"],
      },
      {
        name: "Node.js / Express",
        why: "Sencillo, flexible y suficiente para la mayoría de proyectos web. Buena base para entender I/O asíncrono.",
        level: "sólido",
        usedIn: ["SeaSOS", "TripTide UVG"],
      },
    ],
  },
  {
    name: "Bases de datos",
    items: [
      {
        name: "PostgreSQL + Prisma",
        why: "Mi combinación preferida para datos relacionales. Prisma agrega type-safety en las queries. Los uso juntos en UVG Collab con NestJS.",
        level: "sólido",
        usedIn: ["UVG Collab"],
      },
      {
        name: "MongoDB",
        why: "Flexible para datos no estructurados o esquemas que cambian frecuentemente.",
        level: "intermedio",
        usedIn: ["SeaSOS"],
      },
      {
        name: "Redis",
        why: "Caché de sesiones y datos frecuentes. En UVG Collab redujo la carga sobre PostgreSQL en producción.",
        level: "intermedio",
        usedIn: ["UVG Collab"],
      },
    ],
  },
  {
    name: "DevOps",
    items: [
      {
        name: "Docker / Docker Compose",
        why: "Todo lo que construyo lo dockerizo. Elimina el 'funciona en mi máquina', hace el deploy reproducible en cualquier VPS.",
        level: "sólido",
        usedIn: ["Albums JSON API", "UVG Collab"],
      },
      {
        name: "Git / GitHub",
        why: "Ramas por feature, commits descriptivos, PRs con contexto. Mi flujo de trabajo diario en todos los proyectos.",
        level: "avanzado",
        usedIn: ["todos los proyectos"],
      },
    ],
  },
]

export const levelColors: Record<TechLevel, string> = {
  avanzado: "text-green border-green/30 bg-green/5",
  sólido: "text-cyan border-cyan/30 bg-cyan/5",
  intermedio: "text-purple border-purple/30 bg-purple/5",
}
