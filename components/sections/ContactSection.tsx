"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardAnimation, TextAnimation } from "@/components/common/SectionAnimation"

export default function ContactSection() {
  const socialLinks = [
    { name: "GitHub", handle: "@tuusuario" },
    { name: "LinkedIn", handle: "Tu Nombre" },
    { name: "Email", handle: "tu@email.com" },
  ]

  return (
    <section id="contacto" className="py-32">
      <div className="max-w-4xl mx-auto px-6">
        <TextAnimation delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Contacto</h2>
            <p className="text-xl text-muted-foreground">¿Tienes un proyecto en mente? Hablemos</p>
          </div>
        </TextAnimation>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <CardAnimation
            delay={0.4}
            className="glass rounded-[20px] p-8 shadow-card-lg border border-border/50 hover:shadow-primary-lg transition-all duration-500"
          >
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nombre
                </label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  className="rounded-xl glass border-border/50 focus:border-primary focus:glow-blue transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="rounded-xl glass border-border/50 focus:border-primary focus:glow-blue transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows={5}
                  className="rounded-xl glass border-border/50 resize-none focus:border-primary focus:glow-blue transition-all"
                />
              </div>

              <Button className="w-full rounded-xl shadow-card hover:shadow-primary-lg hover:glow-blue transition-all duration-300">
                Enviar mensaje
              </Button>
            </form>
          </CardAnimation>

          {/* CV Download & Info */}
          <div className="space-y-6">
            <CardAnimation
              delay={0.6}
              className="glass rounded-[20px] p-8 shadow-card-lg border border-border/50 hover:shadow-primary-lg transition-all duration-500"
            >
              <h3 className="text-xl font-medium mb-4">Descarga mi CV</h3>
              <p className="text-muted-foreground mb-6">Conoce más sobre mi experiencia y habilidades</p>
              <Button
                variant="outline"
                className="w-full rounded-xl glass bg-transparent hover:border-primary hover:glow-blue transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Descargar CV
              </Button>
            </CardAnimation>

            <CardAnimation
              delay={0.8}
              className="glass rounded-[20px] p-8 shadow-card-lg border border-border/50 space-y-4 hover:shadow-primary-lg transition-all duration-500"
            >
              <h3 className="text-xl font-medium">Encuéntrame en</h3>
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:glow-blue transition-all">
                      <div className="w-5 h-5 rounded-full bg-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{social.name}</div>
                      <div className="text-xs text-muted-foreground">{social.handle}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </CardAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
