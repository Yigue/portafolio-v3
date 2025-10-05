// Layout Components
export { default as Header } from './layout/Header'
export { default as Footer } from './layout/Footer'
export { default as ProgressBar } from './layout/ProgressBar'

// Section Components
export { default as HeroSection } from './sections/HeroSection'
export { default as AboutSection } from './sections/AboutSection'
export { default as TimelineSection } from './sections/TimelineSection'
export { default as SkillsSection } from './sections/SkillsSection'
export { default as ProjectsSection } from './sections/ProjectsSection'
export { default as ContactSection } from './sections/ContactSection'

// Common Components - Modular exports
export { default as BackgroundEffects } from './common/BackgroundEffects'
export { default as SmoothScroll } from './common/SmoothScroll'
export { default as LightRails } from './common/LightRails'
export { default as ConnectingLines } from './common/ConnectingLines'
export { default as RailGlow } from './common/RailGlow'
export { default as SectionAnimation } from './common/SectionAnimation'
export { default as PerformanceOptimizer } from './common/PerformanceOptimizer'
export { default as ClientOnly } from './common/ClientOnly'

// Subcomponent exports for advanced usage
export * from './common/LightRails'
export * from './common/ConnectingLines'
export * from './common/BackgroundEffects'
export * from './common/SectionAnimation'
export * from './common/PerformanceOptimizer'
export * from './common/RailGlow'
export * from './common/ScrollController'

// Hooks
export { useScrollSync } from '@/lib/hooks/useScrollSync'

// UI Components - Componentes de interfaz reutilizables
export { default as Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card'
export { Button } from './ui/button'
