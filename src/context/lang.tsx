"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type Lang = "es" | "en"

type LangCtx = { lang: Lang; toggle: () => void }

const LangContext = createContext<LangCtx>({ lang: "es", toggle: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es")

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null
    if (stored === "es" || stored === "en") setLang(stored)
  }, [])

  const toggle = () =>
    setLang(l => {
      const next = l === "es" ? "en" : "es"
      localStorage.setItem("lang", next)
      return next
    })

  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
