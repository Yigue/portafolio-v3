export type TimelineType = "education" | "experience"

export interface HeroStat {
  label: string
  value: string
  helper: string
}

export interface HeroHighlight {
  title: string
  description: string
  accent: string
}

export interface TimelineEntry {
  id: string
  period: string
  title: string
  organization: string
  location: string
  type: TimelineType
  impact: string
  stack: string[]
}

export interface PortfolioProject {
  title: string
  description: string
  stack: string[]
  type: "web" | "saas" | "ecommerce" | "analytics" | "mobile" | "api"
  featured?: boolean
  category: string
  href: string
  metrics: { label: string; value: string }[]
}

export interface AboutHighlight {
  title: string
  detail: string
  items: string[]
}

export interface ContactSocialLink {
  name: string
  handle: string
  href: string
  type: "github" | "linkedin" | "email" | "dribbble"
}

export const heroStats: HeroStat[] = [
  {
    label: "Experiencia",
    value: "+5 años",
    helper: "Escalando productos digitales end-to-end",
  },
  {
    label: "Proyectos entregados",
    value: "28+",
    helper: "SaaS, e-commerce y data apps",
  },
  {
    label: "Stack principal",
    value: "React · .NET",
    helper: "TypeScript · AWS · Automatización",
  },
]

export const heroHighlights: HeroHighlight[] = [
  {
    title: "Andreani",
    description: "Plataformas logísticas en producción",
    accent: "Logística inteligente",
  },
  {
    title: "UADE",
    description: "Licenciatura en Sistemas",
    accent: "En curso",
  },
  {
    title: "Cloud + AI",
    description: "Certificaciones AWS y soluciones Augmented Ops",
    accent: "Especialización",
  },
]

export const heroBrands = [
  "Andreani",
  "UADE",
  "AWS",
  "Azure",
  "Next.js",
  "Supabase",
]

export const aboutHighlights: AboutHighlight[] = [
  {
    title: "Impacto en producto",
    detail: "Coordino squads multidisciplinarios para entregar releases cada 2 semanas",
    items: ["Discovery con negocio", "Diseño de experimentos", "KPIs compartidos"],
  },
  {
    title: "Stack favorito",
    detail: "Front con React/Next.js, APIs en .NET + Node y despliegues automatizados en AWS",
    items: ["CI/CD en GitHub Actions", "Infra as Code", "Observabilidad end-to-end"],
  },
]

export const personalDetails = {
  values: ["Diseño centrado en personas", "Mentoría a equipos junior", "Iteraciones rápidas"],
  tools: ["Next.js", "React Native", ".NET", "PostgreSQL", "AWS", "Supabase"],
  hobbies: ["Ciclismo", "Fotografía urbana", "Café de especialidad"],
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: "andreani",
    period: "2023 — Actualidad",
    title: "Lead Full Stack Engineer",
    organization: "Andreani",
    location: "Buenos Aires, Argentina",
    type: "experience",
    impact: "Lidero el frente web y defino arquitecturas de microservicios para optimizar el tracking de envíos y reducir incidentes críticos en un 32%.",
    stack: ["React", ".NET", "AWS", "EventBridge"],
  },
  {
    id: "uade",
    period: "2021 — Actualidad",
    title: "Licenciatura en Sistemas",
    organization: "UADE",
    location: "CABA",
    type: "education",
    impact: "Orientación en ingeniería de software, arquitectura y gestión de proyectos ágiles.",
    stack: ["Arquitectura", "Agile", "Data"],
  },
  {
    id: "freelance",
    period: "2022 — 2024",
    title: "Product Engineer Freelance",
    organization: "Startups SaaS",
    location: "Remoto",
    type: "experience",
    impact: "Diseñé y escalé dashboards multi-tenant con autenticación empresarial, logrando NPS > 60 y onboardings en menos de 24 horas.",
    stack: ["Next.js", "Supabase", "Stripe", "OpenAI"],
  },
  {
    id: "aws",
    period: "2022",
    title: "Certificación Cloud Practitioner",
    organization: "AWS Academy",
    location: "Online",
    type: "education",
    impact: "Profundicé en arquitecturas serverless, automatización con IaC y observabilidad.",
    stack: ["Lambda", "CDK", "CI/CD"],
  },
  {
    id: "startup",
    period: "2021 — 2022",
    title: "Frontend Developer",
    organization: "Startup Tech",
    location: "Remoto",
    type: "experience",
    impact: "Construí librerías de UI accesibles y flujos de compra que aumentaron la conversión en 18%.",
    stack: ["React", "TypeScript", "Storybook"],
  },
]

export const projects: PortfolioProject[] = [
  {
    title: "Andreani Tracking Platform",
    description: "Orquestación logística con geolocalización en tiempo real, tableros para operaciones y SLA automáticos.",
    stack: ["React", ".NET", "AWS", "Kafka"],
    type: "web",
    featured: true,
    category: "enterprise",
    href: "https://www.andreani.com/",
    metrics: [
      { label: "Usuarios activos", value: "12k+" },
      { label: "SLA críticos", value: "-32% incidentes" },
    ],
  },
  {
    title: "Fleex Analytics SaaS",
    description: "Suite multi-tenant para founders con módulos de billing, churn y cohorts con IA explicativa.",
    stack: ["Next.js", "Supabase", "OpenAI"],
    type: "saas",
    featured: true,
    category: "saas",
    href: "https://fleex.so/",
    metrics: [
      { label: "Integraciones", value: "+8" },
      { label: "Retención", value: "92%" },
    ],
  },
  {
    title: "Pulse E-commerce",
    description: "Headless storefront con personalización en tiempo real y orquestación de pagos regionales.",
    stack: ["Remix", "Stripe", "Redis"],
    type: "ecommerce",
    category: "commerce",
    href: "https://pulse.shop/",
    metrics: [
      { label: "Conversión", value: "+18%" },
      { label: "Países", value: "6" },
    ],
  },
  {
    title: "Atlas Insights",
    description: "Dashboard operacional para IoT que consume streams y renderiza insights con WebGL.",
    stack: ["Next.js", "D3", "WebSockets"],
    type: "analytics",
    category: "data",
    href: "https://atlas.app/",
    metrics: [
      { label: "Sensores", value: "40k" },
      { label: "Latencia", value: "<250ms" },
    ],
  },
  {
    title: "Focus Mobile",
    description: "Aplicación híbrida para field teams con sincronización offline-first.",
    stack: ["React Native", "Expo", "SQLite"],
    type: "mobile",
    category: "mobile",
    href: "https://focusmobile.io/",
    metrics: [
      { label: "Equipos", value: "120" },
      { label: "Tickets", value: "-25%" },
    ],
  },
  {
    title: "Nebula API Gateway",
    description: "Arquitectura de microservicios con observabilidad y rate limiting adaptable.",
    stack: [".NET", "Docker", "Kubernetes"],
    type: "api",
    category: "platform",
    href: "https://nebula.dev/",
    metrics: [
      { label: "Requests", value: "75M/mes" },
      { label: "SLA", value: "99.95%" },
    ],
  },
]

export const contactSocialLinks: ContactSocialLink[] = [
  {
    name: "GitHub",
    handle: "@guillermososa",
    href: "https://github.com/guillermososa",
    type: "github",
  },
  {
    name: "LinkedIn",
    handle: "Guillermo Sosa",
    href: "https://www.linkedin.com/in/guillermo-sosa",
    type: "linkedin",
  },
  {
    name: "Email",
    handle: "hola@guillermososa.dev",
    href: "mailto:hola@guillermososa.dev",
    type: "email",
  },
  {
    name: "Dribbble",
    handle: "@guilleux",
    href: "https://dribbble.com/guilleux",
    type: "dribbble",
  },
]

export const availabilityInfo = {
  location: "Buenos Aires, Argentina",
  timezone: "GMT-3",
  slots: ["Freelance part-time", "Productos SaaS", "Mentorías técnicas"],
}
