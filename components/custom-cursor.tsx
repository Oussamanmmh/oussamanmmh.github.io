'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'

/**
 * Thick crosshair cursor with a trailing dot. Swells and turns neon green
 * over interactive elements. Pointer-device only, and fully skipped for
 * users who prefer reduced motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  // Raw pointer position drives the crosshair 1:1...
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // ...while the trailing dot lags behind on a spring.
  const trailX = useSpring(x, { stiffness: 320, damping: 26, mass: 0.4 })
  const trailY = useSpring(y, { stiffness: 320, damping: 26, mass: 0.4 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
    if (!finePointer || reduced) return

    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      const target = event.target as HTMLElement | null
      setHovering(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)))
    }

    const onLeave = () => {
      x.set(-100)
      y.set(-100)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [x, y])

  if (!enabled) return null

  const armColor = hovering ? '#c3f400' : '#ecb2ff'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[10000] hidden md:block"
    >
      {/* Trailing dot */}
      <motion.div
        className="absolute top-0 left-0 rounded-full mix-blend-difference"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: armColor,
        }}
        animate={{
          width: hovering ? 44 : 10,
          height: hovering ? 44 : 10,
          opacity: hovering ? 0.35 : 0.9,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />

      {/* Crosshair */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ rotate: hovering ? 45 : 0, scale: hovering ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          animate={{ width: 24, height: 4, backgroundColor: armColor }}
          transition={{ duration: 0.15 }}
        />
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          animate={{ width: 4, height: 24, backgroundColor: armColor }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </div>
  )
}
