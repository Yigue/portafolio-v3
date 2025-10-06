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
export { BackgroundEffects } from './common/BackgroundEffects'
export { LightRails } from './common/LightRails'
export { PerformanceOptimizer } from './common/PerformanceOptimizer'
export { ClientOnly } from './common/ClientOnly'

// Subcomponent exports for advanced usage
export * from './common/LightRails'

export * from './common/BackgroundEffects'
export * from './common/SectionAnimation'
export * from './common/PerformanceOptimizer'

export * from './common/ScrollController'
export * from './common/ConnectedLines'
export * from './common/ScrollSpotlight'
export * from './common/ScrollBeamOverlay'
export { default as AnimatedSection } from './common/AnimatedSection/AnimatedSection'
export { default as LightPassThrough } from './common/LightPassThrough/LightPassThrough'
export { default as LightCard } from './common/LightCard/LightCard'


// Hooks
export { useScrollSync } from '@/lib/hooks/useScrollSync'
export { useScrollSpotlight, useScrollSpotlightMultiple } from '@/lib/hooks/useScrollSpotlight'

// UI Components - Componentes de interfaz reutilizables
export { default as Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card'
export { Button } from './ui/button'
