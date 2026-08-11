'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  /** Final value to count to. */
  to: number
  /** Rendered after the number, e.g. "+", "★" or "%". */
  suffix?: string
  /** Decimal places to keep, for values like 99.5. */
  decimals?: number
  /** Seconds for the full sweep. */
  duration?: number
  className?: string
}

/**
 * Counts 0 → `to` the first time it scrolls into view. Renders 0 on the server
 * so hydration matches, and jumps straight to the final value when the visitor
 * prefers reduced motion.
 */
export function CountUp({
  to,
  suffix = '',
  decimals = 0,
  duration = 1.6,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return

    if (shouldReduce) {
      setDisplay(to)
      return
    }

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setDisplay,
    })
    return () => controls.stop()
  }, [inView, shouldReduce, to, duration])

  return (
    <span
      ref={ref}
      className={`tabular-nums ${className}`}
      aria-label={`${to.toFixed(decimals)}${suffix}`}
    >
      <span aria-hidden="true">
        {display.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  )
}
