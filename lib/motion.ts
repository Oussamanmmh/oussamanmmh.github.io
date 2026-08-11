import type { Transition, Variants } from 'framer-motion'

/** Viewport config shared by every scroll-triggered section. */
export const sectionViewport = { once: true, margin: '-100px' } as const

/**
 * Low damping relative to stiffness, so everything overshoots and snaps back
 * instead of easing politely into place.
 */
export const springy: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 12,
  mass: 0.85,
}

export const softSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 14,
}

/** Maximum overshoot, for the loudest elements (section headings, year marks). */
export const punchy: Transition = {
  type: 'spring',
  stiffness: 520,
  damping: 10,
  mass: 0.7,
}

/**
 * Cards / badges "land" into place: fade + slide up with a slight rotation
 * settling into their resting angle.
 */
export function landIn(restRotate = 0, delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: 90, rotate: restRotate + 14, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: restRotate,
      scale: 1,
      transition: { ...springy, delay },
    },
    reduced: {
      opacity: 1,
      y: 0,
      rotate: restRotate,
      scale: 1,
      transition: { duration: 0.3, delay: 0 },
    },
  }
}

/** Scale-from-zero pop with spring bounce, for skill badges. */
export function popIn(restRotate = 0, delay = 0): Variants {
  return {
    hidden: { opacity: 0, scale: 0, rotate: -restRotate - 20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: restRotate,
      transition: { type: 'spring', stiffness: 500, damping: 11, delay },
    },
    reduced: {
      opacity: 1,
      scale: 1,
      rotate: restRotate,
      transition: { duration: 0.25 },
    },
  }
}

/** Slide in from a side, for the alternating timeline blocks. */
export function slideInFrom(
  side: 'left' | 'right',
  restRotate = 0,
  delay = 0,
): Variants {
  const x = side === 'left' ? -180 : 180
  return {
    hidden: {
      opacity: 0,
      x,
      scale: 0.92,
      rotate: restRotate - (side === 'left' ? 12 : -12),
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: restRotate,
      transition: { ...springy, delay },
    },
    reduced: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: restRotate,
      transition: { duration: 0.3 },
    },
  }
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 70, rotate: -3, scale: 0.94 },
  visible: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: springy },
  reduced: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.3 },
  },
}

/**
 * Section headings: skew + overshoot so the title slams in rather than fades.
 */
export const headingIn: Variants = {
  hidden: { opacity: 0, y: 80, skewY: 6, skewX: -8, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    skewX: 0,
    scale: 1,
    transition: punchy,
  },
  reduced: {
    opacity: 1,
    y: 0,
    skewY: 0,
    skewX: 0,
    scale: 1,
    transition: { duration: 0.3 },
  },
}

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  reduced: { transition: { staggerChildren: 0 } },
}

/** Deterministic pseudo-random in [-range, range] so SSR and client agree. */
export function seededRotate(seed: number, range = 5) {
  const n = Math.sin(seed * 12.9898) * 43758.5453123
  return ((n - Math.floor(n)) * 2 - 1) * range
}
