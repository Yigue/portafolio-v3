"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { BriefcaseBusiness, GraduationCap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TextAnimation } from "@/components/common/SectionAnimation"
import { Spotlight } from "@/components/ui/spotlight"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { heroBrands, heroHighlights, heroStats } from "@/lib/data/portfolio"

const highlightIcons = [BriefcaseBusiness, GraduationCap, Sparkles]

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  
  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Gradiente de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      {/* Spotlight interactivo que sigue el mouse */}
      <Spotlight className="absolute inset-0 z-0" fill="hsl(var(--primary) / 0.25)" />

      {/* Glow central con parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[800px] h-[800px] rounded-full bg-primary/15 blur-[140px] animate-pulse" 
             style={{ animationDuration: "4s" }} 
        />
      </motion.div>

      {/* Grid de fondo sutil con parallax */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at center, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </motion.div>

      {/* Contenido principal con fade */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="space-y-10 text-center lg:text-left">
            {/* Título principal con Text Generate Effect */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <TextGenerateEffect
                  words="Guillermo Sosa"
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight"
                  duration={0.8}
                  delay={0.5}
                />
                <TextGenerateEffect
                  words="Ingeniería + Diseño de Producto"
                  className="text-3xl md:text-4xl font-light tracking-tight text-primary/80"
                  duration={0.8}
                  delay={1.2}
                />
              </motion.div>

              {/* Badge decorativo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-primary/20 text-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-muted-foreground">
                  Disponible para productos SaaS y consultorías
                </span>
              </motion.div>
            </div>

            {/* Subtítulo */}
            <TextAnimation delay={0.8}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                Construyo plataformas que combinan <span className="text-primary font-medium">experiencias precisas</span> con
                arquitecturas resilientes para empresas como Andreani y startups que necesitan velocidad.
              </p>
            </TextAnimation>

            {/* Botones de acción */}
            <TextAnimation delay={1}>
              <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start items-center gap-4 pt-6">
                <Button
                  size="lg"
                  shimmer={true}
                  glow={true}
                  className="rounded-full px-10 shadow-card hover:shadow-primary-lg transition-all duration-300 group"
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
                  className="rounded-full px-10 glass bg-transparent hover:border-primary/50 hover:shadow-primary transition-all duration-300"
                  onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Agenda una llamada
                </Button>
              </div>
            </TextAnimation>

            {/* Stats */}
            <div className="grid gap-4 pt-8 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl px-4 py-5 border border-white/5 text-left"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.helper}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Perfil / visual */}
          <div className="relative">
            <motion.div
              className="glass rounded-[32px] border border-white/10 p-6 shadow-card backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-[24px] bg-gradient-to-br from-primary/40 via-primary/10 to-background">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `radial-gradient(circle at 20% 20%, hsl(var(--primary)) 2px, transparent 40%)`,
                }} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4),_transparent_55%)]" />
                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-white/70">Focus actual</p>
                    <p className="text-3xl font-semibold text-white">DevOps Engineer</p>
                    <p className="text-white/70 text-sm mt-2">
                      Optimización de flujos logísticos, accesibilidad y performance en entornos de alto tráfico.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {heroHighlights.map((highlight, index) => {
                      const Icon = highlightIcons[index % highlightIcons.length]

                      return (
                        <div
                          key={highlight.title}
                          className="flex items-start gap-3 rounded-2xl bg-white/10 p-3"
                        >
                          <span className="text-primary-foreground">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-white">{highlight.title}</p>
                            <p className="text-xs text-white/70">{highlight.description}</p>
                            <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">{highlight.accent}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 left-1/2 w-full max-w-xs -translate-x-1/2 rounded-2xl border border-white/10 bg-background/90 p-4 text-center shadow-2xl"
            >
              <p className="text-sm text-muted-foreground">Disponible en GMT-3 · Respuesta en 24h</p>
            </motion.div>
          </div>
        </div>

        {/* Marcas */}
        <div className="mt-24 space-y-6">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            <span className="h-px w-10 bg-muted" />
            Confían en mi trabajo
            <span className="h-px w-10 bg-muted" />
          </div>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex items-center gap-10 text-muted-foreground/70 text-sm"
              animate={{ x: [0, -80, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              {[...heroBrands, ...heroBrands].map((brand, index) => (
                <span key={`${brand}-${index}`} className="tracking-[0.3em] uppercase">
                  {brand}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Indicador de scroll con flecha */}
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
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-0"
        >
          <div className="flex flex-col items-center gap-3 text-muted-foreground text-sm">
            <span className="opacity-60 text-xs tracking-wider">SCROLL</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-10 h-10 border border-primary/40 rounded-full flex items-center justify-center group hover:border-primary/60 transition-colors cursor-pointer"
              onClick={() => document.getElementById("sobre-mí")?.scrollIntoView({ behavior: "smooth" })}
            >
              <motion.svg
                className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, 2, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
