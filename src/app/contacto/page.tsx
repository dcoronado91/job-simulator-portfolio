import type { Metadata } from "next"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"

export const metadata: Metadata = {
  title: "Contacto — Derek Coronado",
  description: "Contacta a Derek Coronado para proyectos, oportunidades o colaboraciones.",
}

const contacts = [
  { Icon: Mail,        label: "Email",    value: "derekcoronado9@gmail.com",       href: "mailto:derekcoronado9@gmail.com" },
  { Icon: Phone,       label: "Teléfono", value: "+502 4952-8028",                 href: "tel:+50249528028" },
  { Icon: GithubIcon,  label: "GitHub",   value: "github.com/dcoronado91",         href: "https://github.com/dcoronado91" },
  { Icon: LinkedinIcon,label: "LinkedIn", value: "linkedin.com/in/Derek-Coronado", href: "https://linkedin.com/in/Derek-Coronado" },
  { Icon: MapPin,      label: "Ubicación",value: "Villa Nueva, Guatemala",          href: null },
]

export default function ContactoPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 space-y-12">

      <div className="animate-fade-up delay-0">
        <p className="text-green font-mono text-sm mb-3">/ contacto</p>
        <h1 className="text-4xl font-bold text-text mb-4">Hablemos</h1>
        <p className="text-muted text-lg leading-relaxed">
          ¿Un proyecto, una oportunidad o simplemente quieres conocer más de mi trabajo?
          Escríbeme directamente — respondo rápido.
        </p>
      </div>

      <div className="animate-fade-up delay-100 space-y-3">
        {contacts.map(({ Icon, label, value, href }) => (
          <div key={label} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-green/30 transition-colors group">
            <div className="w-9 h-9 rounded-lg bg-green/10 border border-green/20 flex items-center justify-center shrink-0">
              <Icon size={16} className="text-green" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted mb-0.5">{label}</p>
              {href ? (
                <Link
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm text-text group-hover:text-green transition-colors font-medium truncate block"
                >
                  {value}
                </Link>
              ) : (
                <p className="text-sm text-text font-medium">{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="animate-fade-up delay-200 p-5 rounded-xl border border-border bg-surface text-center">
        <p className="text-muted text-sm leading-relaxed">
          Prefiero el email para temas de trabajo. Para conversaciones rápidas,
          LinkedIn funciona igual de bien.
        </p>
        <Link
          href="mailto:derekcoronado9@gmail.com"
          className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-green text-bg font-semibold text-sm hover:bg-green/90 transition-all hover:shadow-[0_0_20px_rgba(0,255,135,0.3)]"
        >
          <Mail size={16} />
          Enviar email
        </Link>
      </div>

    </div>
  )
}
