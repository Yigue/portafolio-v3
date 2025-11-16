"use client"

import { CardAnimation, TextAnimation } from "@/components/common/SectionAnimation"
import { timelineEntries } from "@/lib/data/portfolio"
import { CalendarDays, MapPin } from "lucide-react"

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-24 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <TextAnimation delay={0.2}>
          <div className="text-center mb-16 md:mb-20 space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Trayectoria</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
              Del producto a la plataforma
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Roles técnicos y formaciones que moldean mi manera de construir software
            </p>
          </div>
        </TextAnimation>

        <ol className="relative border-l border-white/10 pl-8 md:pl-12">
          {timelineEntries.map((item, index) => (
            <li key={item.id} className="relative pb-12 last:pb-0">
              <span className="absolute left-[-14px] top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-background text-[10px] uppercase tracking-[0.35em]">
                {item.type === "experience" ? "XP" : "ED"}
              </span>
              <CardAnimation delay={0.2 + index * 0.1}>
                <div className="glass rounded-[28px] border border-border/60 p-6 md:p-8 shadow-card">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" /> {item.period}
                      </p>
                      <h3 className="text-2xl font-semibold text-foreground mt-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.organization}</p>
                    </div>
                    <span className={`rounded-full px-4 py-1 text-xs font-semibold tracking-[0.2em] ${
                      item.type === "experience"
                        ? "bg-primary/10 text-primary"
                        : "bg-blue-500/10 text-blue-300"
                    }`}>
                      {item.type === "experience" ? "Experiencia" : "Formación"}
                    </span>
                  </div>

                  <p className="mt-4 text-base text-foreground/90 leading-relaxed">{item.impact}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                    {item.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardAnimation>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
