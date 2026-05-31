"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const links = [
  { href: "/", label: "Inicio" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/tecnologias", label: "Tecnologías" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-bg/90 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-green/10 border border-green/30 flex items-center justify-center font-mono text-sm font-bold text-green group-hover:bg-green/20 transition-colors">
            DC
          </span>
          <span className="hidden sm:block text-sm font-medium text-muted group-hover:text-text transition-colors">
            Derek Coronado
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm transition-all duration-200 ${
                  pathname === link.href
                    ? "text-green bg-green/10"
                    : "text-muted hover:text-text hover:bg-surface"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-md text-muted hover:text-text hover:bg-surface transition-colors"
          aria-label="Abrir menú"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md">
          <ul className="max-w-6xl mx-auto px-6 py-3 flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    pathname === link.href
                      ? "text-green bg-green/10"
                      : "text-muted hover:text-text hover:bg-surface"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
