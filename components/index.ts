// ===== LAYOUT COMPONENTS =====
export { default as Header } from './layout/Header'
export { default as Footer } from './layout/Footer'
export { default as ProgressBar } from './layout/ProgressBar'

// ===== SECTION COMPONENTS =====
export { default as HeroSection } from './sections/HeroSection'
export { default as AboutSection } from './sections/AboutSection'
export { default as TimelineSection } from './sections/TimelineSection'
export { default as SkillsSection } from './sections/SkillsSection'
export { default as ProjectsSection } from './sections/ProjectsSection'
export { default as ContactSection } from './sections/ContactSection'

// ===== COMMON COMPONENTS =====
export { BackgroundEffects } from './common/BackgroundEffects'
export { LightRails } from './common/LightRails'
export { PerformanceOptimizer } from './common/PerformanceOptimizer'
export { ClientOnly } from './common/ClientOnly'
export { GlobalSpotlight } from './common/GlobalSpotlight'
export { CustomCursor } from './common/CustomCursor'
export { TimelineLine } from './common/TimelineLine'
export { AlternatingLayout } from './common/AlternatingLayout'

// Subcomponent exports
export * from './common/LightRails'
export * from './common/BackgroundEffects'
export * from './common/SectionAnimation'
export * from './common/PerformanceOptimizer'
export * from './common/TimelineCard'

// ===== HOOKS =====
export { useScrollSync } from '@/lib/hooks/useScrollSync'

// ===== UI COMPONENTS =====
export { default as Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card'
export { Button } from './ui/button'
export { TracingBeam } from './ui/TracingBeam'
