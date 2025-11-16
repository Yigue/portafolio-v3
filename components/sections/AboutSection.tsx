"use client"

import { CardAnimation, TextAnimation } from "@/components/common/SectionAnimation"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { aboutHighlights, personalDetails } from "@/lib/data/portfolio"
import { BadgeCheck, Compass, Stars } from "lucide-react"

export default function AboutSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  
  // Parallax sutil para efectos de fondo
  const y = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section ref={ref} id="sobre-mí" className="py-24 md:py-32 relative">
      {/* Efecto parallax de fondo */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ y }}
      >
        <div className="absolute top-32 left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-10">
        <div className="text-center space-y-4">
          <TextAnimation delay={0.2}>
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Sobre mí</p>
          </TextAnimation>
          <TextAnimation delay={0.4}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light">Diseño experiencias con ingeniería obsesiva</h2>
          </TextAnimation>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <CardAnimation
            delay={0.3}
            className="glass rounded-[24px] p-6 md:p-10 shadow-card border border-border/50 hover:shadow-primary-lg hover:border-primary/30 transition-all duration-500"
          >
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Soy <span className="text-foreground font-semibold">Lead Full Stack en Andreani</span> y combino research, diseño y código
                para llevar ideas a producción sin perder velocidad. En paralelo estudio <span className="text-foreground font-semibold">Licenciatura en Sistemas en UADE</span>
                para profundizar en arquitectura y gestión de producto.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-background/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Rol actual</p>
                  <p className="text-xl font-semibold">Full Stack · Andreani</p>
                  <p className="text-sm text-muted-foreground">Squads logísticos · Observabilidad</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-background/40 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Ubicación</p>
                  <p className="text-xl font-semibold">Buenos Aires</p>
                  <p className="text-sm text-muted-foreground">Trabajo remoto · GMT-3</p>
                </div>
              </div>

              <div className="space-y-5">
                {aboutHighlights.map((highlight) => (
                  <div key={highlight.title} className="rounded-2xl border border-border/60 bg-background/60 p-5">
                    <div className="flex items-center gap-3">
                      <BadgeCheck className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold text-foreground">{highlight.title}</h3>
                    </div>
                    <p className="mt-3 text-muted-foreground">{highlight.detail}</p>
                    <ul className="mt-4 flex flex-wrap gap-2 text-sm text-muted-foreground">
                      {highlight.items.map((item) => (
                        <li key={item} className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </CardAnimation>

          <div className="space-y-6">
            <CardAnimation delay={0.4}>
              <div className="glass rounded-[24px] p-6 border border-border/40 space-y-5">
                <div className="flex items-center gap-3">
                  <Compass className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Principios</p>
                    <p className="text-xl font-semibold">Cómo trabajo</p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {personalDetails.values.map((value) => (
                    <li key={value} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </CardAnimation>

            <CardAnimation delay={0.5}>
              <div className="glass rounded-[24px] p-6 border border-border/40 space-y-5">
                <div className="flex items-center gap-3">
                  <Stars className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Fuera del código</p>
                    <p className="text-xl font-semibold">Balance creativo</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Herramientas favoritas</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {personalDetails.tools.map((tool) => (
                        <span key={tool} className="rounded-full border border-white/10 px-3 py-1 text-sm text-foreground/80">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Hobbies</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {personalDetails.hobbies.map((hobby) => (
                        <span key={hobby} className="rounded-full bg-primary/5 px-3 py-1 text-sm text-primary">
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
