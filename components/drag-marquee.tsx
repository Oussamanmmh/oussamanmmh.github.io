'use client'

import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

type DragMarqueeProps = {
  children: ReactNode
  /** Classes for the clipping container. */
  className?: string
  /** Classes for the scrolling track. */
  contentClassName?: string
  /** Seconds for one full CSS loop. */
  duration?: number
}

/**
 * Marquee that runs on a pure CSS animation for performance, but can be
 * grabbed and scrubbed with the cursor. While dragging, the CSS animation is
 * paused and a motion value drives the offset instead; on release the CSS
 * loop resumes from wherever it left off.
 */
export function DragMarquee({
  children,
  className = '',
  contentClassName = '',
  duration = 15,
}: DragMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const [reduced, setReduced] = useState(false)
  const dragX = useMotionValue(0)
  const pointerStart = useRef(0)
  const offsetStart = useRef(0)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return

    // Freeze at the current CSS-animated position, then take over manually.
    const matrix = new DOMMatrixReadOnly(getComputedStyle(track).transform)
    offsetStart.current = matrix.m41
    pointerStart.current = event.clientX
    dragX.set(matrix.m41)
    setDragging(true)
    track.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    dragX.set(offsetStart.current + (event.clientX - pointerStart.current))
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    setDragging(false)
    trackRef.current?.releasePointerCapture?.(event.pointerId)
  }

  return (
    <div
      className={`marquee-container ${className}`}
      role="marquee"
      aria-hidden="true"
    >
      <motion.div
        ref={trackRef}
        className={`marquee-content ${contentClassName} ${
          dragging ? 'is-dragging' : ''
        }`}
        style={{
          x: dragging ? dragX : undefined,
          animationDuration: `${duration}s`,
          touchAction: 'pan-y',
        }}
        onPointerDown={reduced ? undefined : onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        data-cursor="hover"
      >
        {children}
      </motion.div>
    </div>
  )
}
