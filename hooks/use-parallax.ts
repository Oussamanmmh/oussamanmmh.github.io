'use client'

import { useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Scroll-linked vertical parallax for an element.
 *
 * Returns a ref to attach to the tracked element and a `y` MotionValue to spread
 * onto `style`. `distance` is the total travel in px: the element starts
 * `+distance` low when it enters the viewport and ends `-distance` high as it
 * leaves. When the user prefers reduced motion the value is pinned to 0, so the
 * element renders in its natural position with no scroll coupling.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  distance = 60,
) {
  const ref = useRef<T>(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduce ? [0, 0] : [distance, -distance],
  )

  return { ref, y }
}
