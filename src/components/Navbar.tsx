"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "@/components/ThemeToggle"
import { useLang } from "@/context/lang"
import { i18n } from "@/data/i18n"

const navLinks = [
  { id: "inicio",      navKey: "home"     as const, href: "/" },
  { id: "sobre-mi",    navKey: "about"    as const, href: "/sobre-mi" },
  { id: "proyectos",   navKey: "projects" as const, href: "/proyectos" },
  { id: "tecnologias", navKey: "tech"     as const, href: "/tecnologias" },
  { id: "contacto",    navKey: "contact"  as const, href: "/contacto" },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const { lang, toggle } = useLang()
  const dict = i18n[lang]

  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    if (!isHome) return
    const sections = document.querySelectorAll<HTMLElement>("section[id]")
    if (!sections.length) return
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) }) },
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
                {dict.nav[link.navKey]}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-0.5 px-2 py-1 rounded-md hover:bg-surface transition-colors font-mono text-xs font-semibold"
            aria-label="Toggle language"
          >
            <span className={lang === "es" ? "text-green" : "text-muted"}>ES</span>
            <span className="text-border px-0.5">/</span>
            <span className={lang === "en" ? "text-green" : "text-muted"}>EN</span>
          </button>

          {/* Download CV — desktop only */}
          <a
            href="/CV-Derek-Coronado.pdf"
            download
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-muted hover:border-green/40 hover:text-green text-xs font-mono transition-colors"
          >
            <Download size={12} />
            {dict.nav.downloadCV}
          </a>

          <ThemeToggle />

          {/* Mobile hamburger */}
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
                    {dict.nav[link.navKey]}
                  </a>
                </motion.li>
              ))}
              {/* CV download in mobile menu */}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
              >
                <a
                  href="/CV-Derek-Coronado.pdf"
                  download
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted hover:text-green hover:bg-surface transition-colors"
                >
                  <Download size={14} />
                  {dict.nav.downloadCV}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
