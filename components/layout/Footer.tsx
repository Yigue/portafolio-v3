import { contactSocialLinks } from "@/lib/data/portfolio"

const quickLinks = [
  { label: "Sobre mí", href: "#sobre-mí" },
  { label: "Trayectoria", href: "#timeline" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
]

export default function Footer() {
  return (
    <footer className="py-16 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div className="space-y-3">
            <p className="text-lg font-semibold text-foreground">Guillermo Sosa</p>
            <p className="text-sm text-muted-foreground">
              DevOps Engineer enfocado en experiencias digitales y plataformas escalables.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Secciones</p>
            <div className="flex flex-wrap gap-3 text-sm">
              {quickLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-muted-foreground hover:text-foreground">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Conecta</p>
            <div className="flex flex-wrap gap-3 text-sm">
              {contactSocialLinks.slice(0, 3).map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Guillermo Sosa. Todos los derechos reservados.</span>
          <span>Construido con Next.js · Deploy en Vercel</span>
        </div>
      </div>
    </footer>
  )
}
