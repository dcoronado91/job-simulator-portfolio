import type { Metadata } from "next"
import Link from "next/link"
import { GraduationCap, Briefcase, MapPin, Mail, Code2 } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"

export const metadata: Metadata = {
  title: "Sobre mí — Derek Coronado",
  description: "Desarrollador full-stack, estudiante de CS en la UVG, Guatemala.",
}

const LINKEDIN = "https://www.linkedin.com/in/derek-friedhelm-coronado-chilin-12bbb3388/"

export default function SobreMiPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 space-y-16">

      {/* Header */}
      <div className="animate-fade-up delay-0">
        <p className="text-green font-mono text-sm mb-3">/ sobre-mi</p>
        <h1 className="text-4xl font-bold text-text mb-6">Derek Coronado</h1>

        <div className="space-y-4 text-muted text-lg leading-relaxed max-w-2xl">
          <p>
            Soy desarrollador de software y estudiante de Ingeniería en Ciencias de la Computación
            en la Universidad del Valle de Guatemala. Me muevo cómodo a lo largo del stack completo
            — desde el diseño de esquemas de base de datos hasta la interfaz de usuario — aunque
            mi enfoque preferido es el back-end y la arquitectura de sistemas.
          </p>
          <p>
            Lo que me importa al escribir software: que sea correcto antes de que sea rápido, y
            rápido antes de que sea complejo. Eso se traduce en decisiones deliberadas: elegir el
            stack adecuado para el problema, dockerizar desde el día uno, y mantener un historial
            de git que cuente la historia del proyecto.
          </p>
          <p>
            Actualmente trabajo como freelance mientras completo mi formación universitaria. En el
            lado académico he colaborado en equipos construyendo plataformas desplegadas en
            producción, con responsabilidad sobre módulos completos: desde la capa de datos hasta
            el endpoint REST y la UI que lo consume.
          </p>
          <p>
            Me interesan los sistemas bien diseñados, las APIs que otros desarrolladores disfrutan
            consumir, y los proyectos donde la decisión de arquitectura importa desde el inicio.
          </p>
        </div>
      </div>

      {/* Contact chips */}
      <div className="animate-fade-up delay-100 flex flex-wrap gap-3">
        {[
          { Icon: MapPin,       text: "Guatemala",                 href: null },
          { Icon: Mail,         text: "derekcoronado9@gmail.com",  href: "mailto:derekcoronado9@gmail.com" },
          { Icon: GithubIcon,   text: "github.com/dcoronado91",    href: "https://github.com/dcoronado91" },
          { Icon: LinkedinIcon, text: "LinkedIn",                   href: LINKEDIN },
        ].map(({ Icon, text, href }) => (
          <div key={text} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-sm text-muted hover:border-green/30 transition-colors">
            <Icon size={13} className="text-green shrink-0" />
            {href ? (
              <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="hover:text-green transition-colors">
                {text}
              </Link>
            ) : (
              <span>{text}</span>
            )}
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className="animate-fade-up delay-200 space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase size={18} className="text-green" />
          <h2 className="text-xl font-semibold text-text">Experiencia</h2>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-semibold text-text">Desarrollador Web Freelance</h3>
              <p className="text-muted text-sm">Clientes privados — Remoto</p>
            </div>
            <span className="text-xs font-mono text-green bg-green/10 border border-green/20 px-2 py-0.5 rounded-full shrink-0">2026</span>
          </div>
          <ul className="space-y-1.5">
            {[
              "Desarrollo de sitios WordPress personalizados: temas, maquetación y plugins a medida",
              "Ciclo completo de entrega: levantamiento de requerimientos, iteraciones y despliegue",
              "Cliente destacado: AvanSa — landing page, plugins PHP y tienda WooCommerce con pasarela de pago Recurrente",
            ].map((b, i) => (
              <li key={i} className="text-sm text-muted flex items-start gap-2">
                <span className="text-green/60 mt-0.5 shrink-0">›</span>{b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Education */}
      <div className="animate-fade-up delay-300 space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap size={18} className="text-green" />
          <h2 className="text-xl font-semibold text-text">Formación</h2>
        </div>
        <div className="relative pl-4 border-l border-border space-y-6">
          {[
            {
              institution: "Universidad del Valle de Guatemala",
              degree: "Ingeniería en Ciencias de la Computación y Tecnologías de la Información",
              period: "2024 – actualidad",
              note: "Mención Académica 2025 — Consejo Directivo UVG",
            },
            {
              institution: "Liceo Javier",
              degree: "Bachillerato en Ciencias y Letras",
              period: "2011 – 2023",
              note: null,
            },
          ].map((edu) => (
            <div key={edu.institution} className="relative pl-6">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-bg border-2 border-green" />
              <h3 className="font-semibold text-text">{edu.institution}</h3>
              <p className="text-muted text-sm">{edu.degree}</p>
              <p className="text-green text-xs font-mono mt-1">{edu.period}</p>
              {edu.note && <p className="text-muted text-xs mt-1 italic">{edu.note}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Stack snapshot */}
      <div className="animate-fade-up delay-400">
        <div className="flex items-center gap-3 mb-5">
          <Code2 size={18} className="text-green" />
          <h2 className="text-xl font-semibold text-text">Stack principal</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Next.js", "TypeScript", "Go", "NestJS", "Python", "PostgreSQL", "Docker"].map((t) => (
            <span key={t} className="font-mono text-sm text-muted border border-border bg-card px-3 py-1 rounded-lg hover:border-green/30 hover:text-green transition-colors">
              {t}
            </span>
          ))}
        </div>
        <p className="text-muted text-sm mt-3">
          Ver justificación técnica de cada elección →{" "}
          <Link href="/tecnologias" className="text-green hover:text-green/80 underline underline-offset-4 transition-colors">
            Tecnologías
          </Link>
        </p>
      </div>

      {/* Languages */}
      <div className="animate-fade-up delay-500">
        <p className="text-green font-mono text-xs uppercase tracking-widest mb-3">Idiomas</p>
        <div className="flex gap-4">
          {[{ lang: "Español", level: "Nativo" }, { lang: "Inglés", level: "Profesional" }].map(({ lang, level }) => (
            <div key={lang} className="bg-card border border-border rounded-lg px-4 py-3">
              <p className="text-sm font-medium text-text">{lang}</p>
              <p className="text-xs text-muted mt-0.5">{level}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
