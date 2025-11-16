"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardAnimation, TextAnimation } from "@/components/common/SectionAnimation"
import { contactSocialLinks, availabilityInfo } from "@/lib/data/portfolio"
import { Github, Linkedin, Mail, Dribbble, Download } from "lucide-react"

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  dribbble: Dribbble,
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje")
      }

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

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

        <div className="grid md:grid-cols-2 gap-8">
          <CardAnimation
            delay={0.3}
            className="glass rounded-[20px] p-8 shadow-card border border-border/50 hover:shadow-primary-lg hover:border-primary/30 transition-all duration-500"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nombre
                  </label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    className="rounded-xl"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hola@tuempresa.com"
                    className="rounded-xl"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows={6}
                  className="rounded-xl resize-none"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full rounded-xl"
                  shimmer={true}
                  glow={true}
                  type="submit"
                  loading={status === "loading"}
                >
                  Enviar mensaje
                </Button>
                <p className="text-sm text-center text-muted-foreground" aria-live="polite">
                  {status === "success" && "¡Mensaje enviado! Te responderé dentro de las próximas 24 horas."}
                  {status === "error" && "Ocurrió un error. Intenta nuevamente o escríbeme a hola@guillermososa.dev"}
                </p>
              </div>
            </form>
          </CardAnimation>

          <div className="space-y-6">
            <CardAnimation delay={0.4}>
              <div className="glass rounded-[20px] p-6 shadow-card border border-border/50 hover:shadow-primary-lg hover:border-primary/30 transition-all duration-500 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Download className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground">Descarga mi CV</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conoce más sobre mi experiencia
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    shimmer={true}
                    asChild
                  >
                    <a href="https://drive.google.com" target="_blank" rel="noreferrer">
                      Descargar
                    </a>
                  </Button>
                </div>
              </div>
            </CardAnimation>

            <CardAnimation delay={0.5}>
              <div className="glass rounded-[20px] p-6 shadow-card border border-border/50 hover:shadow-primary-lg hover:border-primary/30 transition-all duration-500 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Disponibilidad</p>
                  <h3 className="text-xl font-semibold text-foreground mt-2">{availabilityInfo.location}</h3>
                  <p className="text-sm text-muted-foreground">Zona horaria {availabilityInfo.timezone}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availabilityInfo.slots.map((slot) => (
                    <span key={slot} className="rounded-full border border-white/10 px-3 py-1 text-xs text-foreground/80">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </CardAnimation>

            <CardAnimation delay={0.6}>
              <div className="glass rounded-[20px] p-6 shadow-card border border-border/50 hover:shadow-primary-lg hover:border-primary/30 transition-all duration-500 space-y-4">
                <h3 className="text-lg font-medium text-center mb-4 text-foreground">Conéctate conmigo</h3>
                <div className="space-y-3">
                  {contactSocialLinks.map((social) => {
                    const Icon = iconMap[social.type] ?? Mail
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground">{social.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{social.handle}</div>
                        </div>
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    )
                  })}
                </div>
              </div>
            </CardAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
