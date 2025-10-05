"use client"

import { useScrollProgress } from "@/components/providers/ScrollProvider"
import BottomGlow from "./BottomGlow"
import TopGlow from "./TopGlow"
import SideGlows from "./SideGlows"


/**
 * BACKGROUND EFFECTS - Componente principal de efectos de fondo
 * 
 * Orquesta todos los efectos de glow y iluminación de fondo
 */
export default function BackgroundEffects() {
  const { progress } = useScrollProgress()

  return (
    <>
      {/* Glow inferior dinámico */}
      <BottomGlow progress={progress} />
      
      {/* Glow superior */}
      <TopGlow progress={progress} />
      
      {/* Glows laterales */}
      <SideGlows progress={progress} />
    </>
  )
}
