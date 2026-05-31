import type { Metadata } from "next"
import Link from "next/link"
import { GraduationCap, Award, Briefcase, MapPin, Mail, Phone } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"

export const metadata: Metadata = {
  title: "Sobre mí — Derek Coronado",
  description: "Formación, experiencia y certificaciones de Derek Coronado.",
}

export default function SobreMiPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 space-y-16">

      {/* Header */}
      <div className="animate-fade-up delay-0">
        <p className="text-green font-mono text-sm mb-3">/ sobre-mi</p>
        <h1 className="text-4xl font-bold text-text mb-4">Derek Friedhelm Coronado Chilin</h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          Estudiante de tercer año de Ingeniería en Ciencias de la Computación en la Universidad del
          Valle de Guatemala, becario de la Fundación Juan Bautista Gutiérrez. Construyo productos
          web full-stack con criterio arquitectónico y atención al detalle.
        </p>
      </div>

      {/* Contact info */}
      <div className="animate-fade-up delay-100 grid sm:grid-cols-2 gap-3">
        {[
          { Icon: MapPin,      text: "Villa Nueva, Guatemala",              href: null },
          { Icon: Mail,        text: "derekcoronado9@gmail.com",            href: "mailto:derekcoronado9@gmail.com" },
          { Icon: Phone,       text: "+502 4952-8028",                      href: "tel:+50249528028" },
          { Icon: GithubIcon,  text: "github.com/dcoronado91",              href: "https://github.com/dcoronado91" },
          { Icon: LinkedinIcon,text: "linkedin.com/in/Derek-Coronado",      href: "https://linkedin.com/in/Derek-Coronado" },
        ].map(({ Icon, text, href }) => (
          <div key={text} className="flex items-center gap-3 text-sm text-muted">
            <Icon size={14} className="text-green shrink-0" />
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
              "Diseño y desarrollo de sitios WordPress con temas, maquetación y plugins personalizados",
              "Lógica front-end con PHP según requisitos de UI de cada cliente",
              "Ciclo completo: levantamiento de requerimientos, iteraciones y despliegue",
              "Cliente destacado: AvanSa (nuevefp.com) — landing page, plugins PHP y tienda WooCommerce con pasarela de pago Recurrente",
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
              note: "Becario — Beca Isabel Gutiérrez de Bosch, Fundación Juan Bautista Gutiérrez",
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

      {/* Awards & Certs */}
      <div className="animate-fade-up delay-400 space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Award size={18} className="text-green" />
          <h2 className="text-xl font-semibold text-text">Logros y Certificaciones</h2>
        </div>
        <div className="bg-card border border-green/20 rounded-xl p-5 mb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-text">Mención Académica</h3>
              <p className="text-muted text-sm">Universidad del Valle de Guatemala</p>
              <p className="text-muted text-xs mt-1 leading-relaxed">
                Reconocimiento del Consejo Directivo por alto desempeño académico, participación y
                comportamiento universitario sobresaliente durante el año académico 2025.
              </p>
            </div>
            <span className="text-xs font-mono text-green bg-green/10 border border-green/20 px-2 py-0.5 rounded-full shrink-0">Feb 2026</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { name: "Claude Code in Action", issuer: "Anthropic", date: "Marzo 2026" },
            { name: "Liderazgo con Inteligencia Emocional", issuer: "CMI — Corporación Multi Inversiones", date: "Mayo 2026" },
            { name: "Fundamentos de la Creatividad: De la Idea a la Práctica", issuer: "CMI — Corporación Multi Inversiones", date: "Mayo 2026" },
          ].map((c) => (
            <div key={c.name} className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm font-medium text-text mb-1">{c.name}</p>
              <p className="text-xs text-muted">{c.issuer}</p>
              <p className="text-xs text-green font-mono mt-1">{c.date}</p>
            </div>
          ))}
        </div>
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
