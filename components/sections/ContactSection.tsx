"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardAnimation, TextAnimation } from "@/components/common/SectionAnimation"

export default function ContactSection() {
  const socialLinks = [
    { 
      name: "GitHub", 
      handle: "@tuusuario",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: "LinkedIn", 
      handle: "Tu Nombre",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    { 
      name: "Email", 
      handle: "tu@email.com",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ]

  return (
    <section id="contacto" className="py-32">
      <div className="max-w-5xl mx-auto px-6">
        <TextAnimation delay={0.2}>
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl md:text-6xl font-light">Hablemos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ¿Tienes un proyecto en mente? Conversemos sobre cómo puedo ayudarte
            </p>
          </div>
        </TextAnimation>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Contact Form - Ocupa más espacio */}
          <CardAnimation
            delay={0.3}
            className="md:col-span-3"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    className="rounded-xl"
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
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows={6}
                  className="rounded-xl resize-none"
                />
              </div>

              <Button className="w-full rounded-xl">
                Enviar mensaje
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </form>
          </CardAnimation>

          {/* Info Cards - Columna lateral */}
          <div className="md:col-span-2 space-y-6">
            {/* CV Download */}
            <CardAnimation delay={0.4}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover/bento:bg-primary/20 transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Descarga mi CV</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conoce más sobre mi experiencia
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    Descargar
                  </Button>
                </div>
              </div>
            </CardAnimation>

            {/* Social Links */}
            <CardAnimation delay={0.5}>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-center mb-4">Conéctate conmigo</h3>
                <div className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                        {social.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{social.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{social.handle}</div>
                      </div>
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </CardAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
