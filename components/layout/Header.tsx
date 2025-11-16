"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useScrollSync } from "@/lib/hooks/useScrollSync"
import { Button } from "@/components/ui/button"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollToSection } = useScrollSync()
  const navigationItems = [
    { label: "Sobre mí", id: "sobre-mí" },
    { label: "Trayectoria", id: "timeline" },
    { label: "Habilidades", id: "habilidades" },
    { label: "Proyectos", id: "proyectos" },
    { label: "Contacto", id: "contacto" },
  ]

  // Evitar error de hidratación
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavigation = (id: string) => {
    scrollToSection(id, -80)
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div className="text-sm font-medium tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Guillermo Sosa
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="glass"
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => handleNavigation("contacto")}
          >
            Trabajemos juntos
          </Button>

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
              <div className="w-5 h-5" />
            )}
          </button>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/50"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Button variant="default" onClick={() => handleNavigation("contacto")}>
                Agenda una llamada
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
