"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "@/components/ThemeToggle"

const navLinks = [
  { id: "inicio",       label: "Inicio",       href: "/" },
  { id: "sobre-mi",     label: "Sobre mí",     href: "/sobre-mi" },
  { id: "proyectos",    label: "Proyectos",    href: "/proyectos" },
  { id: "tecnologias",  label: "Tecnologías",  href: "/tecnologias" },
  { id: "contacto",     label: "Contacto",     href: "/contacto" },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")

  // Scroll shadow
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  // Active section detection (home only)
  useEffect(() => {
    if (!isHome) return
    const sections = document.querySelectorAll<HTMLElement>("section[id]")
    if (!sections.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [isHome, pathname])

  useEffect(() => { setOpen(false) }, [pathname])

  const getLinkHref = (link: typeof navLinks[number]) =>
    isHome ? `#${link.id}` : link.href

  const isActive = (link: typeof navLinks[number]) =>
    isHome ? activeSection === link.id : pathname === link.href

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    setOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-bg/90 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href={isHome ? "#inicio" : "/"}
          onClick={(e) => isHome && handleAnchorClick(e, "#inicio")}
          className="flex items-center gap-2 group"
        >
          <span className="w-8 h-8 rounded-lg bg-green/10 border border-green/30 flex items-center justify-center font-mono text-sm font-bold text-green group-hover:bg-green/20 transition-colors">
            DC
          </span>
          <span className="hidden sm:block text-sm font-medium text-muted group-hover:text-text transition-colors">
            Derek Coronado
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={getLinkHref(link)}
                onClick={(e) => handleAnchorClick(e, getLinkHref(link))}
                className={`px-3 py-1.5 rounded-md text-sm transition-all duration-200 cursor-pointer ${
                  isActive(link)
                    ? "text-green bg-green/10"
                    : "text-muted hover:text-text hover:bg-surface"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-muted hover:text-text hover:bg-surface transition-colors"
            aria-label="Abrir menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md overflow-hidden"
          >
            <ul className="max-w-6xl mx-auto px-6 py-3 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <a
                    href={getLinkHref(link)}
                    onClick={(e) => handleAnchorClick(e, getLinkHref(link))}
                    className={`block px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                      isActive(link)
                        ? "text-green bg-green/10"
                        : "text-muted hover:text-text hover:bg-surface"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
