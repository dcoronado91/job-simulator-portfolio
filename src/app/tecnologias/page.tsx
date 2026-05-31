import type { Metadata } from "next"
import { techCategories, levelColors } from "@/data/tech"

export const metadata: Metadata = {
  title: "Tecnologías — Derek Coronado",
  description: "El stack técnico de Derek Coronado: qué usa, por qué lo eligió y cómo lo aplicó.",
}

const CDN = "https://cdn.simpleicons.org"

export default function TecnologiasPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 space-y-16">

      <div className="animate-fade-up delay-0">
        <p className="text-green font-mono text-sm mb-3">/ tecnologias</p>
        <h1 className="text-4xl font-bold text-text mb-4">Mi Stack</h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          No listo herramientas por listarlas. Cada tecnología aquí la usé en un proyecto real
          y puedo defender por qué la elegí frente a las alternativas.
        </p>
      </div>

      {/* Level legend */}
      <div className="animate-fade-up delay-100 flex flex-wrap gap-2 items-center">
        {(["avanzado", "sólido", "intermedio"] as const).map((level) => (
          <span key={level} className={`text-xs font-mono border px-2.5 py-1 rounded-full ${levelColors[level]}`}>
            {level}
          </span>
        ))}
        <span className="text-xs text-muted ml-1">← niveles de dominio</span>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {techCategories.map((cat, i) => (
          <section
            key={cat.name}
            className="animate-fade-up"
            style={{ animationDelay: `${(i + 2) * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-border" />
              <h2 className="text-sm font-mono font-semibold text-green uppercase tracking-widest">
                {cat.name}
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-3">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-card border border-border rounded-xl p-5 hover:border-green/20 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="tech-icon-wrap shrink-0">
                      <img
                        src={`${CDN}/${item.icon}`}
                        alt={item.name}
                        width={24}
                        height={24}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="font-semibold text-text font-mono">{item.name}</h3>
                        <span className={`text-[11px] font-mono border px-2 py-0.5 rounded-full ${levelColors[item.level]}`}>
                          {item.level}
                        </span>
                      </div>
                      <p className="text-muted text-sm leading-relaxed mb-3">{item.why}</p>
                      {item.usedIn && (
                        <div className="flex flex-wrap gap-1.5 items-center">
                          <span className="text-xs text-muted">Usado en:</span>
                          {item.usedIn.map((use) => (
                            <span key={use} className="text-xs font-mono text-green/70 bg-green/5 border border-green/10 px-2 py-0.5 rounded">
                              {use}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Also know */}
      <div className="animate-fade-up bg-surface border border-border rounded-xl p-6" style={{ animationDelay: "700ms" }}>
        <p className="text-green font-mono text-xs mb-3">también conozco</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Java", "C++", "Kotlin", "PHP",
            "Jetpack Compose", "Neo4j", "MySQL",
            "SQL Server", "WordPress", "Prisma ORM",
          ].map((tech) => (
            <span key={tech} className="text-xs font-mono text-muted border border-border px-2.5 py-1 rounded-lg bg-card">
              {tech}
            </span>
          ))}
        </div>
        <p className="text-muted text-xs mt-3 italic">Django y Flask están en mi lista de aprendizaje activo.</p>
      </div>

    </div>
  )
}
