'use client'

import { motion } from 'framer-motion'
import { CountUp } from '@/components/count-up'
import { DragMarquee } from '@/components/drag-marquee'
import { ShaderCanvas } from '@/components/shader-canvas'
import { useMotionPreference } from '@/hooks/use-motion-preference'

const MARQUEE_ITEMS = Array.from({ length: 5 })

/** `count` entries tick up from 0 the first time the strip is on screen. */
type Stat = {
  label: string
  count?: number
  suffix?: string
  value?: string
}

const STATS: Stat[] = [
  { count: 12, suffix: '+', label: 'Shipped solutions' },
  { count: 5, suffix: '★', label: 'Khamsat rating' },
  { value: 'ESI', label: '5th year SE' },
]

export function Hero() {
  const { shouldReduce } = useMotionPreference()

  return (
    // svh, not vh: mobile browser chrome makes vh overshoot the screen.
    <section className="relative min-h-[90svh] flex flex-col justify-center items-center overflow-hidden border-b-4 border-secondary-fixed">
      <ShaderCanvas className="absolute inset-0 w-full h-full z-0" />

      <div
        className="absolute top-10 left-10 w-[500px] h-[500px] bg-primary-container/50 rounded-full z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-secondary-fixed/50 rotate-12 z-0"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 text-center flex flex-col items-center px-margin-page mt-20 w-full"
        initial="hidden"
        animate={shouldReduce ? 'reduced' : 'visible'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.24 } },
          reduced: {},
        }}
      >
        {/* 1. Name scales + fades in */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, scale: 0.6, rotate: -5 },
            visible: {
              opacity: 1,
              scale: 1,
              rotate: -5,
              transition: { type: 'spring', stiffness: 120, damping: 14 },
            },
            reduced: { opacity: 1, scale: 1, rotate: -5 },
          }}
          className="font-display-2xl text-[13vw] sm:text-[90px] md:text-[150px] lg:text-[220px] leading-[0.85] text-secondary-fixed drop-shadow-[4px_4px_0px_rgba(207,73,0,1)] sm:drop-shadow-[8px_8px_0px_rgba(207,73,0,1)] uppercase mix-blend-difference [-webkit-text-stroke:2px_#ecb2ff] sm:[-webkit-text-stroke:4px_#ecb2ff] pointer-events-none max-w-full"
        >
          NEMAMCHA
          {/* The display type is one word; crawlers and screen readers get the
              full name and role from the same H1. */}
          <span className="sr-only">
            {' '}
            Oussama — Software Engineer &amp; Backend Architect
          </span>
        </motion.h1>

        {/* 2. Marquee slides in */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: '-30%' },
            visible: {
              opacity: 1,
              x: 0,
              rotate: 1,
              transition: { type: 'spring', stiffness: 90, damping: 18 },
            },
            reduced: { opacity: 1, x: 0, rotate: 1 },
          }}
          className="w-full max-w-[100vw] my-8"
        >
          <DragMarquee
            className="w-full overflow-hidden py-4 bg-surface-bright/80 border-y-4 border-primary-fixed transform rotate-1"
            contentClassName="font-body-md text-base sm:text-2xl tracking-widest text-secondary-fixed uppercase flex gap-8"
          >
            {MARQUEE_ITEMS.map((_, index) => (
              <span key={index}>
                BACKEND ARCHITECTURE • SCALABLE SYSTEMS • CLOUD INFRA •
              </span>
            ))}
          </DragMarquee>
        </motion.div>

        {/* 3. Subtitle drops in with a bounce */}
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: -80, rotate: 8 },
            visible: {
              opacity: 1,
              y: 0,
              rotate: 1,
              transition: { type: 'spring', stiffness: 340, damping: 12 },
            },
            reduced: { opacity: 1, y: 0, rotate: 1 },
          }}
          className="font-headline-lg text-[26px] leading-[28px] sm:text-headline-lg-mobile md:text-headline-lg mt-8 text-primary bg-surface-container-high px-4 py-3 sm:px-8 sm:py-4 border-4 border-primary hard-shadow-black max-w-full text-balance"
        >
          Software Engineer &amp; Backend Architect
        </motion.h2>

        {/* 4. Proof strip: the three numbers worth leading with. */}
        <motion.ul
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: 'spring', stiffness: 200, damping: 18 },
            },
            reduced: { opacity: 1, y: 0 },
          }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          {STATS.map((stat) => (
            <li
              key={stat.label}
              className="bg-surface-container-lowest/90 border-4 border-secondary-fixed px-4 py-3 sm:px-6 hard-shadow-black"
            >
              <span className="font-headline-lg text-[30px] sm:text-headline-lg-mobile text-secondary-fixed block leading-none">
                {stat.count === undefined ? (
                  stat.value
                ) : (
                  <CountUp to={stat.count} suffix={stat.suffix} />
                )}
              </span>
              <span className="font-label-bold text-label-bold text-on-surface-variant uppercase">
                {stat.label}
              </span>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  )
}
