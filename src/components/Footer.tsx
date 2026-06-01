"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { useLang } from "@/context/lang"
import { i18n } from "@/data/i18n"

const LINKEDIN = "https://www.linkedin.com/in/derek-friedhelm-coronado-chilin-12bbb3388/"

export default function Footer() {
  const { lang } = useLang()
  const dict = i18n[lang]

  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted text-sm">
          © 2026{" "}
          <span className="text-text font-medium">Derek Coronado</span>
          {" "}— {dict.footer.made}
        </p>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/dcoronado91" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-green transition-colors" aria-label="GitHub">
            <GithubIcon size={18} />
          </Link>
          <Link href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-green transition-colors" aria-label="LinkedIn">
            <LinkedinIcon size={18} />
          </Link>
          <Link href="mailto:derekcoronado9@gmail.com" className="text-muted hover:text-green transition-colors" aria-label="Email">
            <Mail size={18} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
