import type { Metadata } from "next"
import { projects } from "@/data/projects"
import ProjectCard from "@/components/ProjectCard"

export const metadata: Metadata = {
  title: "Proyectos — Derek Coronado",
  description: "Proyectos full-stack desarrollados por Derek Coronado con Next.js, Go, NestJS y Docker.",
}

export default function ProyectosPage() {
  const highlighted = projects.filter((p) => p.highlight)
  const rest = projects.filter((p) => !p.highlight)

  return (
    <div className="max-w-5xl mx-auto px-6 py-24 space-y-16">

      <div className="animate-fade-up delay-0">
        <p className="text-green font-mono text-sm mb-3">/ proyectos</p>
        <h1 className="text-4xl font-bold text-text mb-4">Proyectos</h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          Proyectos reales, con decisiones reales. Cada uno incluye el contexto técnico
          de por qué se tomaron las decisiones que se tomaron.
        </p>
      </div>

      <div className="animate-fade-up delay-100 space-y-5">
        <h2 className="text-xs font-mono font-semibold text-green uppercase tracking-widest">Destacados</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {highlighted.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>

      {rest.length > 0 && (
        <div className="animate-fade-up delay-200 space-y-5">
          <h2 className="text-xs font-mono font-semibold text-muted uppercase tracking-widest">Otros proyectos</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {rest.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      )}

      <div className="animate-fade-up delay-300 text-center">
        <p className="text-muted text-sm mb-3">Más proyectos y actividad reciente en GitHub</p>
        <a
          href="https://github.com/dcoronado91"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-green hover:text-green/80 underline underline-offset-4 transition-colors"
        >
          github.com/dcoronado91 →
        </a>
      </div>

    </div>
  )
}
