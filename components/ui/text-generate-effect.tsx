"use client"

import { useEffect, useState } from "react"
import { motion, stagger, useAnimate } from "framer-motion"
import { cn } from "@/lib/utils"

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0,
}: {
  words: string
  className?: string
  filter?: boolean
  duration?: number
  delay?: number
}) => {
  const [scope, animate] = useAnimate()
  const [hasAnimated, setHasAnimated] = useState(false)
  const wordsArray = words.split(" ")

  useEffect(() => {
    if (hasAnimated) return
    
    const timeout = setTimeout(() => {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(0.08),
        }
      )
      setHasAnimated(true)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [animate, duration, filter, hasAnimated, delay])

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={cn(
                "opacity-0 inline-block",
                filter && "filter blur-[8px]"
              )}
            >
              {word}{" "}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={cn("font-light", className)}>
      <div className="leading-snug tracking-tight">
        {renderWords()}
      </div>
    </div>
  )
}

