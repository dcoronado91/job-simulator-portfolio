import Link from "next/link"
import { ExternalLink, ChevronRight } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import type { Project } from "@/data/projects"

const categoryColors: Record<string, string> = {
  "Full-Stack": "text-green border-green/30 bg-green/5",
  Backend:      "text-cyan border-cyan/30 bg-cyan/5",
  Frontend:     "text-purple border-purple/30 bg-purple/5",
  Móvil:        "text-muted border-border bg-surface",
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col bg-card border border-border rounded-xl p-6 hover:border-green/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,135,0.05)]">
      {project.highlight && (
        <span className="absolute top-4 right-4 text-[10px] font-mono font-semibold text-green bg-green/10 border border-green/20 px-2 py-0.5 rounded-full">
          DESTACADO
        </span>
      )}

      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span className={`text-[11px] font-mono font-medium border px-2 py-0.5 rounded-full ${categoryColors[project.category]}`}>
          {project.category}
        </span>
        <span className="text-[11px] text-muted font-mono">{project.year}</span>
      </div>

      <h3 className="text-lg font-semibold text-text group-hover:text-green transition-colors mb-2">
        {project.title}
      </h3>

      <p className="text-muted text-sm leading-relaxed mb-4">{project.description}</p>

      <ul className="space-y-1.5 mb-5 flex-1">
        {project.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted">
            <ChevronRight size={14} className="mt-0.5 shrink-0 text-green/60" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((t) => (
          <span key={t} className="font-mono text-[11px] text-muted border border-border px-2 py-0.5 rounded bg-surface">
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-muted hover:text-text transition-colors">
          <GithubIcon size={14} />
          GitHub
        </Link>
        {project.live && (
          <Link href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-green hover:text-green/80 transition-colors">
            <ExternalLink size={14} />
            Ver en vivo
          </Link>
        )}
      </div>
    </article>
  )
}
