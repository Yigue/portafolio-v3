"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TextAnimation } from "@/components/common/SectionAnimation"
import { Spotlight } from "@/components/ui/spotlight"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Gradiente de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      {/* Spotlight interactivo que sigue el mouse */}
      <Spotlight className="absolute inset-0 z-0" fill="hsl(var(--primary) / 0.25)" />

      {/* Glow central estático */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[800px] h-[800px] rounded-full bg-primary/15 blur-[140px] animate-pulse" 
             style={{ animationDuration: "4s" }} 
        />
      </motion.div>

      {/* Grid de fondo sutil */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-10">
        {/* Título principal con Text Generate Effect */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TextGenerateEffect
              words="Desarrollador Full Stack"
              className="text-6xl md:text-8xl font-light tracking-tight"
              duration={0.8}
              delay={0.5}
            />
          </motion.div>

          {/* Badge decorativo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-muted-foreground">Disponible para proyectos</span>
          </motion.div>
        </div>

        {/* Subtítulo */}
        <TextAnimation delay={0.8}>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Creando <span className="text-primary font-medium">experiencias digitales excepcionales</span> en Andreani
            y estudiando en UADE
          </p>
        </TextAnimation>

        {/* Botones de acción */}
        <TextAnimation delay={1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button
              size="lg"
              className="rounded-full px-10 shadow-card hover:shadow-primary-lg hover:scale-105 transition-all duration-300 group"
              onClick={() => document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver proyectos
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-10 glass bg-transparent hover:border-primary/50 hover:shadow-primary hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contactar
            </Button>
          </div>
        </TextAnimation>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm">
            <span className="opacity-60">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full p-1"
            >
              <div className="w-1.5 h-3 bg-primary rounded-full mx-auto" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
