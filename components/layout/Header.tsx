"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"
import { useScrollSync } from "@/lib/hooks/useScrollSync"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollToSection } = useScrollSync()
  const navigationItems = ["Sobre mí", "Trayectoria", "Habilidades", "Proyectos", "Contacto"]

  // Evitar error de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavigation = (item: string) => {
    const elementId = item.toLowerCase().replace(" ", "-")
    scrollToSection(elementId, -80) // Offset para el header fijo
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-sm font-medium tracking-tight">Tu Nombre</div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
        
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
          aria-label="Toggle theme"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )
          ) : (
            <div className="w-5 h-5" /> // Placeholder para evitar hidratación
          )}
        </button>
      </div>
    </motion.header>
  )
}
