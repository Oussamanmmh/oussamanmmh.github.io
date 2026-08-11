'use client'

import { motion, type Variants } from 'framer-motion'
import { useMotionPreference } from '@/hooks/use-motion-preference'
import { useParallax } from '@/hooks/use-parallax'
import { headingIn, sectionViewport, slideInFrom } from '@/lib/motion'

const ROLES = [
  {
    year: '2024',
    period: 'JUNE 2024 - PRESENT',
    current: true,
    title: 'Freelance Software Engineer',
    company: 'Remote — international clients',
    copy: 'Delivering production web solutions for clients across the USA, Germany, Saudi Arabia, Syria, Jordan, Sudan and Algeria, with a 5-star rating on Khamsat. Migrating monolithic apps to scalable Node.js / NestJS architectures with Docker.',
    side: 'left' as const,
    rotate: -1.5,
    width: 'md:w-full',
    card: 'bg-surface border-primary hard-shadow-primary',
    badge: 'text-secondary-fixed bg-surface-container border-secondary-fixed',
    heading: 'text-primary',
    companyClass: 'text-on-surface',
    copyClass: 'text-on-surface-variant',
    dot: 'bg-primary',
    rail: 'bg-primary',
    yearClass: 'text-primary/25',
  },
  {
    year: '2025',
    period: '2025',
    current: false,
    title: 'Software Engineering Intern',
    company: 'Algérie Télécom — Full-Stack Developer',
    copy: 'Built a centralized Complaint Management System with NestJS and React, automated the reporting workflows around it and optimized the database schema behind them.',
    side: 'right' as const,
    rotate: 2,
    width: 'md:w-[96%]',
    card: 'bg-surface border-secondary-fixed hard-shadow-secondary',
    badge: 'text-primary bg-surface-container border-primary',
    heading: 'text-secondary-fixed',
    companyClass: 'text-on-surface',
    copyClass: 'text-on-surface-variant',
    dot: 'bg-secondary-fixed',
    rail: 'bg-secondary-fixed',
    yearClass: 'text-secondary-fixed/25',
  },
  {
    year: '2022',
    period: '2022 - PRESENT',
    current: false,
    title: 'Software Engineering Degree',
    company: 'National Higher School of Computer Science (ESI), Algeria',
    copy: 'Fifth year. Arabic (native), English and French (professional).',
    side: 'left' as const,
    rotate: 1.5,
    width: 'md:w-[92%]',
    card: 'bg-tertiary-container border-surface-container-highest hard-shadow-black',
    badge:
      'text-on-tertiary-container bg-surface-container-lowest border-on-tertiary-container',
    heading: 'text-on-tertiary-container',
    companyClass: 'text-on-tertiary-container',
    copyClass: 'text-on-tertiary-container font-bold',
    dot: 'bg-tertiary-container',
    rail: 'bg-tertiary-container',
    yearClass: 'text-tertiary-container/35',
  },
]

type Role = (typeof ROLES)[number]

const dotVariants: Variants = {
  hidden: { scale: 0, rotate: -90 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 600, damping: 11, delay: 0.25 },
  },
  reduced: { scale: 1, rotate: 0, transition: { duration: 0.2 } },
}

const connectorVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { type: 'spring', stiffness: 320, damping: 16, delay: 0.32 },
  },
  reduced: { scaleX: 1, transition: { duration: 0.2 } },
}

/** Year mark that drifts against the scroll to fill the empty half of the row. */
const yearVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 380, damping: 12, delay: 0.15 },
  },
  reduced: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.3 } },
}

function TimelineRow({ role }: { role: Role }) {
  const { inView, shouldReduce } = useMotionPreference()
  const { ref, y } = useParallax<HTMLLIElement>(40)

  return (
    <motion.li
      ref={ref}
      initial="hidden"
      whileInView={inView}
      viewport={sectionViewport}
      className="relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-12 md:items-start"
    >
      {/* Dot: same left offsets as the spine, so it rides the line. */}
      <motion.div
        variants={dotVariants}
        aria-hidden="true"
        className={`absolute top-10 md:top-12 left-4 md:left-1/2 -translate-x-1/2 w-7 h-7 rounded-full border-4 border-surface z-20 ${role.dot}`}
      >
        {role.current && !shouldReduce && (
          <span className="absolute -inset-2 rounded-full border-2 border-primary animate-ping-slow" />
        )}
      </motion.div>

      {/* Connector, mobile: spine -> card, always rightward. */}
      <motion.div
        variants={connectorVariants}
        aria-hidden="true"
        className={`md:hidden absolute top-[3.15rem] left-4 w-10 h-1 origin-left ${role.rail}`}
      />

      {/* Connector, desktop: spine -> card on the card's side. */}
      <motion.div
        variants={connectorVariants}
        aria-hidden="true"
        className={`hidden md:block absolute top-[3.65rem] w-8 h-1 ${role.rail} ${
          role.side === 'left' ? 'right-1/2 origin-right' : 'left-1/2 origin-left'
        }`}
      />

      <motion.div
        variants={slideInFrom(role.side, role.rotate)}
        whileHover={
          shouldReduce ? undefined : { rotate: 0, scale: 1.03, y: -6 }
        }
        className={`p-5 sm:p-8 border-4 w-full ${role.width} ${role.card} ${
          role.side === 'left'
            ? 'md:col-start-1 md:row-start-1 md:ml-auto'
            : 'md:col-start-2 md:row-start-1 md:mr-auto'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`font-label-bold text-label-bold px-4 py-2 inline-block border-2 ${role.badge}`}
          >
            {role.period}
          </span>
          {role.current && (
            <span className="font-label-bold text-label-bold px-3 py-2 bg-primary text-on-primary border-2 border-primary">
              NOW
            </span>
          )}
        </div>
        <h3
          className={`font-headline-lg text-[28px] leading-[30px] sm:text-headline-lg-mobile uppercase text-balance ${role.heading}`}
        >
          {role.title}
        </h3>
        <h4 className={`font-body-md text-body-md mb-4 ${role.companyClass}`}>
          {role.company}
        </h4>
        <p
          className={`font-body-md text-sm leading-relaxed text-pretty ${role.copyClass}`}
        >
          {role.copy}
        </p>
      </motion.div>

      {/*
        Oversized year fills the previously empty half of the row. Hidden from
        assistive tech because the period badge above already states the dates.
      */}
      <div
        aria-hidden="true"
        className={`hidden md:flex md:row-start-1 items-start pt-8 ${
          role.side === 'left'
            ? 'md:col-start-2 justify-start pl-8 lg:pl-14'
            : 'md:col-start-1 justify-end pr-8 lg:pr-14'
        }`}
      >
        <motion.span
          variants={yearVariants}
          style={{ y }}
          className={`font-display-2xl text-[72px] lg:text-[110px] leading-none tracking-tight select-none ${role.yearClass}`}
        >
          {role.year}
        </motion.span>
      </div>
    </motion.li>
  )
}

export function Experience() {
  const { inView } = useMotionPreference()

  return (
    <motion.section
      id="experience"
      initial="hidden"
      whileInView={inView}
      viewport={sectionViewport}
      className="py-20 sm:py-32 px-margin-page bg-surface relative overflow-hidden"
    >
      <div className="max-w-[1000px] mx-auto relative z-10">
        <motion.h2
          variants={headingIn}
          className="font-display-2xl text-[52px] sm:text-[80px] md:text-display-2xl leading-[0.95] text-tertiary-container mb-12 sm:mb-20 text-center"
        >
          HISTORY
          <span className="sr-only"> — work experience and education</span>
        </motion.h2>

        <div className="relative">
          {/*
            Continuous spine. Sits on the left rail on mobile and dead-center on
            desktop; the dots above use the exact same left offsets so they
            always land on it. Segments are stacked flex children (no rotation,
            no margins) so the line never breaks apart.
          */}
          <div
            className="absolute top-0 bottom-0 left-4 md:left-1/2 w-3 -translate-x-1/2 flex flex-col z-0"
            aria-hidden="true"
          >
            <div className="w-full h-3 bg-on-surface" />
            <div className="flex-1 w-full timeline-line-1" />
            <div className="flex-1 w-full timeline-line-2" />
            <div className="flex-1 w-full timeline-line-3" />
            <div className="w-full h-3 bg-on-surface" />
          </div>

          <ol className="relative z-10 flex flex-col gap-10 md:gap-12">
            {ROLES.map((role) => (
              <TimelineRow key={role.title} role={role} />
            ))}
          </ol>
        </div>
      </div>
    </motion.section>
  )
}
