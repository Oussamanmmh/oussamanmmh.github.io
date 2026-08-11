'use client'

import { useReducedMotion } from 'framer-motion'

/**
 * Returns the variant label to animate to. When the user prefers reduced
 * motion we target the `reduced` variant (simple fades, no transforms).
 */
export function useMotionPreference() {
  const shouldReduce = useReducedMotion()
  return {
    shouldReduce: Boolean(shouldReduce),
    /** Use as `whileInView={inView}` / `animate={inView}`. */
    inView: shouldReduce ? 'reduced' : 'visible',
  }
}
