'use client'

import { motion } from 'framer-motion'
import { CountUp } from '@/components/count-up'
import { useMotionPreference } from '@/hooks/use-motion-preference'
import { useParallax } from '@/hooks/use-parallax'
import { landIn, sectionViewport } from '@/lib/motion'

/**
 * Numbers from the CV, kept as a list so the grid stays easy to re-order. Each
 * one counts up from 0 when the panel scrolls into view.
 */
type Fact = {
  count: number
  label: string
  suffix?: string
  decimals?: number
}

const FACTS: Fact[] = [
  { count: 12, suffix: '+', label: 'Production web solutions delivered' },
  { count: 5, suffix: '★', label: 'Client rating on Khamsat' },
  { count: 7, label: 'Countries served (USA, DE, KSA, SY, JO, SD, DZ)' },
  {
    count: 99.5,
    suffix: '%',
    decimals: 1,
    label: 'Uptime on critical deployments',
  },
]

export function About() {
  const { inView } = useMotionPreference()
  /*
    Differing distances give the overlapping collage real depth as it scrolls:
    the stats panel drifts furthest, the badge counter-moves against it.
  */
  const { ref: introRef, y: introY } = useParallax<HTMLDivElement>(30)
  const { ref: mediaRef, y: mediaY } = useParallax<HTMLDivElement>(70)
  const { ref: badgeRef, y: badgeY } = useParallax<HTMLDivElement>(-45)

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView={inView}
      viewport={sectionViewport}
      className="py-20 sm:py-32 px-margin-page bg-surface-container-low overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <motion.div
          ref={introRef}
          style={{ y: introY }}
          className="md:col-span-5 md:col-start-1 relative z-20 mt-10 md:mt-0"
        >
          <motion.div
            variants={landIn(2)}
            className="bg-primary-container p-6 sm:p-8 border-4 border-secondary-fixed hard-shadow-secondary hover:rotate-0 transition-transform duration-300"
          >
            <h3 className="font-headline-lg text-[38px] leading-[38px] sm:text-headline-lg text-on-primary-container uppercase mb-4">
              Hello World
            </h3>
            <p className="font-body-md text-body-md text-on-primary-container font-bold">
              I&apos;m Oussama — a fifth-year Software Engineering student at ESI
              who ships production systems for international clients. I build
              scalable backend architectures and the cloud infrastructure that
              keeps them fast, secure and online.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          ref={mediaRef}
          style={{ y: mediaY }}
          className="md:col-span-6 md:col-start-6 relative z-10 -mt-12 md:mt-24"
        >
          <motion.div
            variants={landIn(-3, 0.12)}
            className="bg-tertiary-container p-6 sm:p-10 border-4 border-primary hard-shadow-primary hover:rotate-1 transition-transform duration-300"
          >
            <dl className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="border-4 border-surface-container-highest bg-surface-container-lowest p-3 sm:p-4"
                >
                  <dt className="font-display-2xl text-[32px] sm:text-[44px] leading-none text-secondary-fixed">
                    <CountUp
                      to={fact.count}
                      suffix={fact.suffix}
                      decimals={fact.decimals}
                    />
                  </dt>
                  <dd className="font-label-bold text-label-bold text-on-surface-variant uppercase mt-3">
                    {fact.label}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="font-body-md text-body-md text-on-tertiary-container font-bold">
              Node.js · NestJS · Go · PostgreSQL · Redis · Docker · AWS. Trilingual:
              Arabic, English, French.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          ref={badgeRef}
          style={{ y: badgeY }}
          className="md:col-span-4 md:col-start-4 relative z-30 -mt-10 md:-mt-10 ml-2 md:ml-10"
        >
          <motion.div
            variants={landIn(6, 0.24)}
            className="bg-secondary-fixed p-4 sm:p-6 border-4 border-surface-container-highest hard-shadow-black inline-block"
          >
            <span className="font-headline-lg text-[28px] sm:text-headline-lg-mobile text-on-secondary-fixed uppercase">
              ESI ’22 → NOW
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
