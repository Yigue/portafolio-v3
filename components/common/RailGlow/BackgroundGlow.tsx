/**
 * BACKGROUND GLOW - Glow de fondo sutil
 * 
 * Efecto de iluminación sutil de fondo para el rail
 */
export default function BackgroundGlow() {
  return (
    <div className="absolute inset-0 w-4 h-96 bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5 rounded-full blur-lg -translate-x-1" />
  )
}
