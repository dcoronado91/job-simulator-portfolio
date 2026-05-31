import Link from "next/link"
import { Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted text-sm">
          © 2026{" "}
          <span className="text-text font-medium">Derek Coronado</span>
          {" "}— Hecho con Next.js + Tailwind
        </p>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/dcoronado91" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-green transition-colors" aria-label="GitHub">
            <GithubIcon size={18} />
          </Link>
          <Link href="https://linkedin.com/in/Derek-Coronado" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-green transition-colors" aria-label="LinkedIn">
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
