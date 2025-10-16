/**
 * GRADIENT UTILITIES
 * Sistema centralizado de gradientes para todo el portafolio
 */

export type TechCategory = 
  | "frontend" 
  | "backend" 
  | "database" 
  | "devops" 
  | "ai" 
  | "design"

export type ProjectType = 
  | "web" 
  | "mobile" 
  | "saas" 
  | "ecommerce" 
  | "analytics" 
  | "api"

/**
 * Gradientes por categoría de tecnología
 */
export const techGradients: Record<TechCategory, string> = {
  frontend: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Azul/Púrpura
  backend: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)", // Verde/Teal
  database: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)", // Violeta/Púrpura oscuro
  devops: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", // Rosa/Rojo
  ai: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", // Rosa/Amarillo
  design: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)", // Cyan/Índigo
}

/**
 * Gradientes mesh (más complejos) por categoría
 */
export const techMeshGradients: Record<TechCategory, string> = {
  frontend: "radial-gradient(at 0% 0%, #667eea 0%, transparent 50%), radial-gradient(at 100% 100%, #764ba2 0%, transparent 50%), radial-gradient(at 100% 0%, #a8c0ff 0%, transparent 50%)",
  backend: "radial-gradient(at 0% 0%, #0ba360 0%, transparent 50%), radial-gradient(at 100% 100%, #3cba92 0%, transparent 50%), radial-gradient(at 50% 50%, #0f9b5c 0%, transparent 50%)",
  database: "radial-gradient(at 0% 0%, #8e2de2 0%, transparent 50%), radial-gradient(at 100% 100%, #4a00e0 0%, transparent 50%), radial-gradient(at 100% 0%, #b06fee 0%, transparent 50%)",
  devops: "radial-gradient(at 0% 0%, #f093fb 0%, transparent 50%), radial-gradient(at 100% 100%, #f5576c 0%, transparent 50%), radial-gradient(at 50% 50%, #ff8ba7 0%, transparent 50%)",
  ai: "radial-gradient(at 0% 0%, #fa709a 0%, transparent 50%), radial-gradient(at 100% 100%, #fee140 0%, transparent 50%), radial-gradient(at 100% 0%, #feca57 0%, transparent 50%)",
  design: "radial-gradient(at 0% 0%, #30cfd0 0%, transparent 50%), radial-gradient(at 100% 100%, #330867 0%, transparent 50%), radial-gradient(at 50% 50%, #5f6fed 0%, transparent 50%)",
}

/**
 * Colores principales por tecnología específica
 */
export const techColors: Record<string, string> = {
  // Frontend
  "React": "#61dafb",
  "Next.js": "#000000",
  "TypeScript": "#3178c6",
  "JavaScript": "#f7df1e",
  "Tailwind CSS": "#06b6d4",
  "Framer Motion": "#ff0055",
  "Vue": "#42b883",
  "Angular": "#dd0031",
  
  // Backend
  ".NET": "#512bd4",
  "Node.js": "#339933",
  "Express": "#000000",
  "Python": "#3776ab",
  "Django": "#092e20",
  "FastAPI": "#009688",
  
  // Database
  "PostgreSQL": "#336791",
  "MongoDB": "#47a248",
  "Redis": "#dc382d",
  "MySQL": "#4479a1",
  "Supabase": "#3ecf8e",
  "Firebase": "#ffca28",
  
  // DevOps & Cloud
  "Docker": "#2496ed",
  "Kubernetes": "#326ce5",
  "AWS": "#ff9900",
  "Vercel": "#000000",
  "Azure": "#0078d4",
  "GCP": "#4285f4",
  
  // AI & ML
  "OpenAI": "#412991",
  "LangChain": "#1c3c3c",
  "TensorFlow": "#ff6f00",
  "PyTorch": "#ee4c2c",
  
  // Tools
  "Git": "#f05032",
  "GitHub": "#181717",
  "Figma": "#f24e1e",
  "Notion": "#000000",
  "Jira": "#0052cc",
  "Linear": "#5e6ad2",
}

/**
 * Gradientes para tipos de proyectos
 */
export const projectGradients: Record<ProjectType, string> = {
  web: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  mobile: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  saas: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  ecommerce: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  analytics: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  api: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
}

/**
 * Obtiene el gradiente según la categoría de tecnología
 */
export function getGradientByTech(category: TechCategory, useMesh = false): string {
  return useMesh ? techMeshGradients[category] : techGradients[category]
}

/**
 * Obtiene el gradiente según el tipo de proyecto
 */
export function getProjectGradient(type: ProjectType): string {
  return projectGradients[type]
}

/**
 * Crea un gradiente mesh personalizado con array de colores
 */
export function getMeshGradient(colors: string[]): string {
  if (colors.length < 2) {
    return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[0]} 100%)`
  }
  
  const positions = [
    "at 0% 0%",
    "at 100% 100%",
    "at 100% 0%",
    "at 0% 100%",
    "at 50% 50%",
  ]
  
  const gradients = colors.map((color, index) => {
    const position = positions[index % positions.length]
    return `radial-gradient(${position}, ${color} 0%, transparent 50%)`
  })
  
  return gradients.join(", ")
}

/**
 * Obtiene el color principal de una tecnología específica
 */
export function getTechColor(tech: string): string {
  return techColors[tech] || "#667eea"
}

/**
 * Genera un gradiente desde un color específico
 */
export function generateGradientFromColor(baseColor: string, variation = 20): string {
  return `linear-gradient(135deg, ${baseColor} 0%, color-mix(in srgb, ${baseColor} 80%, black ${variation}%) 100%)`
}

/**
 * Gradientes animados (para efectos shimmer)
 */
export const animatedGradients = {
  shimmer: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
  pulse: "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.3) 0%, transparent 70%)",
  wave: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
}

/**
 * Obtiene un gradiente aleatorio de la categoría
 */
export function getRandomGradient(type: "tech" | "project" = "tech"): string {
  if (type === "tech") {
    const categories = Object.keys(techGradients) as TechCategory[]
    const random = categories[Math.floor(Math.random() * categories.length)]
    return techGradients[random]
  } else {
    const types = Object.keys(projectGradients) as ProjectType[]
    const random = types[Math.floor(Math.random() * types.length)]
    return projectGradients[random]
  }
}

