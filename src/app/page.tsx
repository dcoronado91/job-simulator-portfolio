"use client"

import { motion, useMotionValue, useInView, useScroll, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, ExternalLink, Mail, MapPin, Download } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { projects } from "@/data/projects"
import { techCategories } from "@/data/tech"
import { useLang } from "@/context/lang"
import { i18n } from "@/data/i18n"

const LINKEDIN = "https://www.linkedin.com/in/derek-friedhelm-coronado-chilin-12bbb3388/"
const CDN = "https://cdn.simpleicons.org"
const featured = projects.filter((p) => p.highlight)

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}
const stagger = (delay = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: delay } },
})
const categoryColors: Record<string, string> = {
  "Full-Stack": "text-green border-green/30 bg-green/5",
  Backend:      "text-cyan border-cyan/30 bg-cyan/5",
  Frontend:     "text-purple border-purple/30 bg-purple/5",
}

// ── Scroll progress bar ────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[200] origin-left pointer-events-none"
      style={{ scaleX, background: "linear-gradient(90deg, #0EA5E9, #14B8A6, #8B5CF6)" }}
    />
  )
}

// ── Custom cursor ring (desktop only) ─────────────────
function CustomCursor() {
  const dotX = useMotionValue(-200)
  const dotY = useMotionValue(-200)
  const ringX = useSpring(dotX, { stiffness: 180, damping: 20 })
  const ringY = useSpring(dotY, { stiffness: 180, damping: 20 })
  const [cursorState, setCursorState] = useState<"default" | "hover" | "click">("default")
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    setShow(true)
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX); dotY.set(e.clientY)
      const el = e.target as HTMLElement
      setCursorState(s => s === "click" ? s : el.closest("a,button,[role=button]") ? "hover" : "default")
    }
    const down = () => setCursorState("click")
    const up   = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setCursorState(el.closest("a,button,[role=button]") ? "hover" : "default")
    }
    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
    }
  }, []) // eslint-disable-line

  if (!show) return null
  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
      style={{ x: ringX, y: ringY, width: 36, height: 36, marginLeft: -18, marginTop: -18, border: "1.5px solid rgba(14,165,233,0.55)" }}
      animate={{ scale: cursorState === "hover" ? 1.6 : cursorState === "click" ? 0.7 : 1, opacity: cursorState === "hover" ? 0.9 : 0.45 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    />
  )
}

// ── Typewriter ─────────────────────────────────────────
function TypeWriter({ text, startDelay = 0.9, speed = 40 }: { text: string; startDelay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState("")
  useEffect(() => {
    setDisplayed("")
    let intervalId: ReturnType<typeof setInterval>
    const timeoutId = setTimeout(() => {
      let i = 0
      intervalId = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(intervalId)
      }, speed)
    }, startDelay * 1000)
    return () => { clearTimeout(timeoutId); clearInterval(intervalId) }
  }, [text, startDelay, speed])
  const done = displayed.length >= text.length
  return <>{displayed}{!done && <span className="typewriter-cursor" />}</>
}

// ── Animated counter ───────────────────────────────────
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState("0")
  const numeric = parseInt(value)
  const isNumeric = !isNaN(numeric)
  const suffix = value.replace(/[0-9]/g, "")
  useEffect(() => {
    if (!isInView) return
    if (!isNumeric) { setDisplayed(value); return }
    const duration = 1400, start = performance.now()
    function tick(now: number) {
      const p = Math.min((now - start) / duration, 1)
      setDisplayed(Math.floor((1 - Math.pow(1 - p, 3)) * numeric) + suffix)
      if (p < 1) requestAnimationFrame(tick)
      else setDisplayed(value)
    }
    requestAnimationFrame(tick)
  }, [isInView]) // eslint-disable-line
  return <span ref={ref}>{displayed}</span>
}

// ── Spotlight + tilt card ──────────────────────────────
function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0), rawY = useMotionValue(0)
  const rotX = useSpring(rawX, { stiffness: 400, damping: 30 })
  const rotY = useSpring(rawY, { stiffness: 400, damping: 30 })
  const [glow, setGlow] = useState({ x: 50, y: 50, show: false })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    rawX.set((ny - 0.5) * -12); rawY.set((nx - 0.5) * 12)
    setGlow({ x: nx * 100, y: ny * 100, show: true })
  }

  return (
    <div style={{ perspective: "800px" }} className={className}>
      <motion.div
        ref={ref}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", height: "100%", position: "relative" }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { rawX.set(0); rawY.set(0); setGlow(g => ({ ...g, show: false })) }}
      >
        {children}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, borderRadius: "0.75rem",
            background: `radial-gradient(200px circle at ${glow.x}% ${glow.y}%, rgba(14,165,233,0.1) 0%, transparent 70%)`,
            opacity: glow.show ? 1 : 0, transition: "opacity 0.25s ease", pointerEvents: "none",
          }}
        />
      </motion.div>
    </div>
  )
}

// ── Particle field ────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const setSize = () => { canvas.width = canvas.offsetWidth || window.innerWidth; canvas.height = canvas.offsetHeight || window.innerHeight }
    setSize()
    window.addEventListener("resize", setSize)
    const N = 55, CONNECT = 130, REPEL = 110
    const PALETTE = ["14,165,233","14,165,233","14,165,233","20,184,166","20,184,166","139,92,246"]
    type Dot = { x: number; y: number; vx: number; vy: number; r: number; c: string }
    const dots: Dot[] = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5 + 0.6, c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    }))
    const mouse = { x: -9999, y: -9999 }
    const onMove = (e: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top }
    window.addEventListener("mousemove", onMove)
    let raf: number
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const d of dots) {
        const mx = d.x - mouse.x, my = d.y - mouse.y, md = Math.hypot(mx, my)
        if (md < REPEL && md > 0) { const f = ((REPEL - md) / REPEL) * 0.07; d.vx += (mx / md) * f; d.vy += (my / md) * f }
        d.vx *= 0.97; d.vy *= 0.97
        d.x = (d.x + d.vx + canvas.width) % canvas.width
        d.y = (d.y + d.vy + canvas.height) % canvas.height
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${d.c},0.65)`; ctx.fill()
      }
      for (let i = 0; i < dots.length - 1; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y)
          if (dist < CONNECT) {
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(14,165,233,${(1 - dist / CONNECT) * 0.2})`; ctx.lineWidth = 0.6; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", setSize); window.removeEventListener("mousemove", onMove) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ── Photo circle ───────────────────────────────────────
function PhotoCircle() {
  return (
    <motion.div
      className="relative mx-auto shrink-0 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "conic-gradient(from 0deg, transparent 30%, rgba(14,165,233,0.9) 52%, rgba(139,92,246,0.8) 70%, transparent 87%)", animation: "spin-ring 7s linear infinite" }}
      />
      <div className="absolute inset-[3px] rounded-full overflow-hidden bg-card">
        <Image src="/foto portafolio.jpg" alt="Derek Coronado" fill className="object-cover object-top" priority />
      </div>
      <div className="absolute -inset-2 rounded-full border border-green/10 pointer-events-none" />
    </motion.div>
  )
}

// ── Magnetic wrap ──────────────────────────────────────
function MagneticWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 500, damping: 25 }), sy = useSpring(y, { stiffness: 500, damping: 25 })
  function onMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  return <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMouseMove} onMouseLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
}

// ── Section wrapper ────────────────────────────────────
function Section({ id, children, className = "", number }: { id: string; children: React.ReactNode; className?: string; number?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <section id={id} className={`py-24 md:py-32 px-6 relative overflow-hidden ${className}`} ref={ref}>
      {number && (
        <motion.span
          className="absolute top-6 right-4 md:right-8 font-mono font-bold select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(72px, 11vw, 150px)", color: "rgba(100,116,139,0.12)" }}
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          {number}
        </motion.span>
      )}
      <div className="max-w-6xl mx-auto relative z-[1]">{children}</div>
    </section>
  )
}

// ── Section heading ────────────────────────────────────
function SectionHead({ label, title }: { label: string; title: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const words = title.split(" ")
  return (
    <div ref={ref}>
      <div className="flex items-center gap-3 mb-3">
        <motion.div className="h-px bg-green shrink-0" initial={{ width: 0 }} animate={isInView ? { width: 24 } : {}} transition={{ duration: 0.5, ease, delay: 0.1 }} />
        <motion.p className="text-green font-mono text-sm tracking-wide" initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, ease, delay: 0.2 }}>
          {label}
        </motion.p>
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text">
        {words.map((word, i) => (
          <motion.span key={i} className="inline-block mr-[0.28em] last:mr-0" initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease, delay: 0.2 + i * 0.1 }}>
            {word}
          </motion.span>
        ))}
      </h2>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────
export default function HomePage() {
  const { lang } = useLang()
  const dict = i18n[lang]
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -80])

  return (
    <>
      <ScrollProgress />
      <CustomCursor />

      {/* ══════════════════════════════ HERO ══ */}
      <section id="inicio" className="relative min-h-screen flex items-center px-6 overflow-hidden dot-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg pointer-events-none" />
        <ParticleField />

        <motion.div className="relative z-10 w-full max-w-6xl mx-auto" style={{ y: heroY }}>
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-12 lg:gap-20">

            {/* Left — text */}
            <motion.div className="flex-1 text-left" variants={stagger(0.1)} initial="hidden" animate="show">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-green/20 bg-green/5 text-green text-sm font-mono mb-5">
                <span className="relative flex items-center justify-center w-3 h-3">
                  <span className="ping-ring absolute w-3 h-3 rounded-full bg-green/40" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green" />
                </span>
                {dict.hero.available}
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.1]">
                <span className="gradient-name">Derek Coronado</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-xl sm:text-2xl text-muted font-light mb-4 min-h-[2rem]">
                <TypeWriter key={lang} text={dict.hero.typewriter} startDelay={0.9} />
              </motion.p>

              <motion.p variants={fadeUp} className="text-muted leading-relaxed mb-6 max-w-lg">
                {dict.hero.description}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-7">
                {["Next.js", "TypeScript", "Go", "NestJS", "Docker", "PostgreSQL"].map((t, i) => (
                  <motion.span
                    key={t}
                    className="font-mono text-xs text-muted border border-border bg-surface px-3 py-1 rounded-full"
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.07, duration: 0.35, ease }}
                    whileHover={{ scale: 1.1, borderColor: "rgba(14,165,233,0.4)", color: "#0EA5E9" }}
                  >
                    {t}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <MagneticWrap>
                  <Link href={LINKEDIN} target="_blank" rel="noopener noreferrer"
                    className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green text-bg font-semibold text-sm hover:bg-green/90 transition-all hover:shadow-[0_0_28px_rgba(14,165,233,0.4)]">
                    <LinkedinIcon size={16} /> LinkedIn
                  </Link>
                </MagneticWrap>
                <MagneticWrap>
                  <Link href="https://github.com/dcoronado91" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-surface text-text text-sm font-medium hover:border-green/40 hover:bg-card transition-all">
                    <GithubIcon size={16} /> GitHub
                  </Link>
                </MagneticWrap>
                <MagneticWrap>
                  <a href="/CV-Derek-Coronado.pdf" download
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-green/30 text-green text-sm font-medium hover:bg-green/10 transition-all">
                    <Download size={16} /> {dict.hero.downloadCV}
                  </a>
                </MagneticWrap>
              </motion.div>
            </motion.div>

            {/* Right — photo */}
            <PhotoCircle />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-muted font-mono tracking-[0.2em] uppercase">scroll</span>
          <motion.div className="w-px h-10 bg-gradient-to-b from-green/40 to-transparent" animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </section>

      {/* ══════════════════════════ SOBRE MÍ ══ */}
      <Section id="sobre-mi" number="01">
        <SectionHead label={dict.about.label} title={dict.about.title} />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mt-8 md:mt-12">
          <motion.div className="space-y-5" variants={stagger()} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.p variants={fadeUp} className="text-muted text-lg leading-relaxed">{dict.about.p1}</motion.p>
            <motion.p variants={fadeUp} className="text-muted text-lg leading-relaxed">{dict.about.p2}</motion.p>
            <motion.p variants={fadeUp} className="text-muted text-lg leading-relaxed">{dict.about.p3}</motion.p>
            <motion.div variants={fadeUp} className="flex items-center gap-5 pt-2 flex-wrap sm:flex-nowrap">
              {[
                { icon: MapPin,       text: "Guatemala" },
                { icon: Mail,         text: "Email",    href: "mailto:derekcoronado9@gmail.com" },
                { icon: GithubIcon,   text: "GitHub",   href: "https://github.com/dcoronado91" },
                { icon: LinkedinIcon, text: "LinkedIn", href: LINKEDIN },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-1.5 text-sm text-muted shrink-0">
                  <Icon size={13} className="text-green shrink-0" />
                  {href
                    ? <Link href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="hover:text-green transition-colors">{text}</Link>
                    : <span>{text}</span>
                  }
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-4" variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            {dict.about.stats.map((s) => (
              <motion.div key={s.number} variants={fadeUp} whileHover={{ y: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                <div className="bg-card border border-border rounded-xl p-5 hover:border-green/30 hover:shadow-[0_4px_24px_rgba(14,165,233,0.12)] transition-all h-full cursor-default">
                  <p className="text-3xl font-bold text-green font-mono"><AnimatedCounter value={s.number} /></p>
                  <p className="text-text font-semibold text-sm mt-1">{s.label}</p>
                  <p className="text-muted text-xs mt-1 leading-relaxed">{s.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ══════════════════════════ PROYECTOS ══ */}
      <Section id="proyectos" number="02">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8 md:mb-12">
          <SectionHead label={dict.projects.label} title={dict.projects.title} />
          <motion.a href="#contacto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 text-sm text-green hover:text-green/80 transition-colors group">
            {dict.projects.cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" variants={stagger()} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
          {featured.map((project) => {
            const hasMultiGit = project.githubLinks && project.githubLinks.length > 0
            const desc = lang === "en" ? (project.descriptionEn ?? project.description) : project.description
            return (
              <motion.div key={project.id} variants={fadeUp} className="h-full">
                <SpotlightCard className="h-full">
                  <article className="group flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden hover:border-green/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.09)]">
                    {project.image && (
                      <div className="relative w-full h-40 overflow-hidden bg-surface shrink-0">
                        <Image src={project.image} alt={project.title} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent pointer-events-none" />
                      </div>
                    )}
                    <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-[11px] font-mono font-medium border px-2 py-0.5 rounded-full ${categoryColors[project.category]}`}>{project.category}</span>
                      <span className="text-[11px] text-muted font-mono">{project.year}</span>
                    </div>
                    <h3 className="font-semibold text-text group-hover:text-green transition-colors mb-2">{project.title}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="font-mono text-[11px] text-muted border border-border px-2 py-0.5 rounded bg-surface">{t}</span>
                      ))}
                      {project.tech.length > 3 && <span className="font-mono text-[11px] text-muted self-center">+{project.tech.length - 3}</span>}
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-border">
                      {hasMultiGit
                        ? project.githubLinks!.slice(0, 2).map((l) => (
                            <Link key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors">
                              <GithubIcon size={13} /> {l.label}
                            </Link>
                          ))
                        : project.github && (
                            <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors">
                              <GithubIcon size={13} /> GitHub
                            </Link>
                          )}
                      {project.live && (
                        <Link href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-green hover:text-green/80 transition-colors ml-auto">
                          <ExternalLink size={13} /> Live
                        </Link>
                      )}
                    </div>
                    </div>
                  </article>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* ══════════════════════ TECNOLOGÍAS ══ */}
      <Section id="tecnologias" number="03">
        <SectionHead label={dict.tech.label} title={dict.tech.title} />
        <div className="mt-12 space-y-10">
          {techCategories.map((cat, ci) => (
            <motion.div key={cat.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: ci * 0.08 }} viewport={{ once: true, margin: "-60px" }}>
              <p className="text-xs font-mono font-semibold text-green uppercase tracking-widest mb-4">
                {dict.tech.categories[cat.name] ?? cat.name}
              </p>
              <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" variants={stagger()} initial="hidden" whileInView="show" viewport={{ once: true }}>
                {cat.items.map((item) => (
                  <motion.div key={item.name} variants={fadeUp} whileHover={{ y: -5, scale: 1.04 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:border-green/30 hover:shadow-[0_4px_20px_rgba(14,165,233,0.1)] transition-all duration-300 group cursor-default">
                      <div className="tech-icon-wrap shrink-0" style={{ width: 32, height: 32, padding: 4 }}>
                        <img src={`${CDN}/${item.icon}`} alt={item.name} width={20} height={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text font-mono truncate group-hover:text-green transition-colors">{item.name}</p>
                        <p className={`text-[10px] font-mono ${item.level === "avanzado" ? "text-green/70" : item.level === "sólido" ? "text-cyan/70" : "text-purple/70"}`}>
                          {dict.tech.levels[item.level] ?? item.level}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-10 p-5 rounded-xl border border-border bg-surface" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
          <p className="text-green font-mono text-xs mb-3">{dict.tech.alsoKnow}</p>
          <div className="flex flex-wrap gap-2">
            {["Java", "C++", "Kotlin", "PHP", "Jetpack Compose", "Neo4j", "MySQL", "SQL Server", "WordPress", "Prisma ORM"].map((t, i) => (
              <motion.span key={t} className="text-xs font-mono text-muted border border-border px-2.5 py-1 rounded-lg bg-card" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: i * 0.04 }} viewport={{ once: true }} whileHover={{ scale: 1.08 }}>
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* ═══════════════════════════ CONTACTO ══ */}
      <Section id="contacto" number="04">
        <motion.div
          className="relative rounded-2xl border border-border overflow-hidden p-8 sm:p-12 md:p-20 text-center"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} viewport={{ once: true, margin: "-80px" }}
        >
          <div className="absolute inset-0 bg-card pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-green/5 via-transparent to-purple/5 pointer-events-none" />
          <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-green/60 to-transparent" initial={{ width: 0 }} whileInView={{ width: "18rem" }} transition={{ duration: 1.2, ease, delay: 0.3 }} viewport={{ once: true }} />

          <div className="relative z-10 space-y-6 max-w-lg mx-auto">
            <motion.div variants={stagger(0.05)} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.p variants={fadeUp} className="text-green font-mono text-sm mb-3 tracking-wide">{dict.contact.label}</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-text mb-4">{dict.contact.title}</motion.h2>
              <motion.p variants={fadeUp} className="text-muted text-lg leading-relaxed">{dict.contact.description}</motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 pt-4">
                <MagneticWrap>
                  <Link href="mailto:derekcoronado9@gmail.com"
                    className="btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green text-bg font-semibold text-sm hover:bg-green/90 transition-all hover:shadow-[0_0_28px_rgba(14,165,233,0.4)]">
                    <Mail size={16} /> {dict.contact.emailBtn}
                  </Link>
                </MagneticWrap>
                <MagneticWrap>
                  <a href="/CV-Derek-Coronado.pdf" download
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-green/30 text-green text-sm font-medium hover:bg-green/10 transition-all">
                    <Download size={16} /> {dict.contact.downloadCV}
                  </a>
                </MagneticWrap>
                <MagneticWrap>
                  <Link href={LINKEDIN} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-surface text-text text-sm font-medium hover:border-green/40 hover:bg-card transition-all">
                    <LinkedinIcon size={16} /> LinkedIn
                  </Link>
                </MagneticWrap>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Section>
    </>
  )
}
