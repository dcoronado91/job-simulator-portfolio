import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { GithubIcon } from "@/components/icons"

const techPills = ["Next.js", "TypeScript", "Go", "NestJS", "Docker", "PostgreSQL"]

export default function HomePage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden grid-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl text-center space-y-6">
        <div className="animate-fade-up delay-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/20 bg-green/5 text-green text-sm font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
          Disponible para trabajar
        </div>

        <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
          Derek{" "}
          <span className="bg-gradient-to-r from-green via-cyan to-purple bg-clip-text text-transparent">
            Coronado
          </span>
        </h1>

        <p className="animate-fade-up delay-200 text-xl sm:text-2xl text-muted font-light">
          Desarrollador{" "}
          <span className="text-text font-medium">Full-Stack</span>
          {" · "}
          <span className="text-text font-medium">Back-End</span>
          {" · Guatemala"}
        </p>

        <p className="animate-fade-up delay-300 text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          Construyo productos web con stacks modernos. De la arquitectura a la UI,
          pasando por la API y el contenedor Docker.
        </p>

        <div className="animate-fade-up delay-400 flex flex-wrap justify-center gap-2">
          {techPills.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs text-muted border border-border bg-surface px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="animate-fade-up delay-500 flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green text-bg font-semibold text-sm hover:bg-green/90 transition-all hover:shadow-[0_0_20px_rgba(0,255,135,0.3)]"
          >
            Ver proyectos
            <ArrowRight size={16} />
          </Link>
          <Link
            href="https://github.com/dcoronado91"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-surface text-text text-sm font-medium hover:border-green/30 hover:bg-card transition-all"
          >
            <GithubIcon size={16} />
            GitHub
          </Link>
          <Link
            href="/sobre-mi"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-surface text-text text-sm font-medium hover:border-green/30 hover:bg-card transition-all"
          >
            <Download size={16} />
            Sobre mí
          </Link>
        </div>
      </div>

      <div className="animate-fade-up delay-600 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="text-xs text-muted font-mono">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-border to-transparent" />
      </div>
    </section>
  )
}
