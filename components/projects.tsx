'use client'

import { motion } from 'framer-motion'
import { useMotionPreference } from '@/hooks/use-motion-preference'
import { useParallax } from '@/hooks/use-parallax'
import { headingIn, sectionViewport, seededRotate, springy } from '@/lib/motion'

/** Cards animate in from a random tilt, settling at 0deg. */
function cardVariants(seed: number) {
  const from = seededRotate(seed, 10)
  return {
    hidden: { opacity: 0, y: 100, rotate: from, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: springy,
    },
    reduced: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.3 },
    },
  }
}

type Project = {
  seed: number
  index: string
  title: string
  country: string
  summary: string
  highlights: string[]
  stack: string[]
  span: string
  offset: string
  card: string
  indexClass: string
  titleClass: string
  bodyClass: string
  chip: string
  metricClass: string
  metric: string
}

const PROJECTS: Project[] = [
  {
    seed: 1,
    index: '01',
    title: 'National Repossession Platform',
    country: 'USA',
    summary:
      'Full-stack platform managing vehicles, owners and field agents behind secure REST APIs, with live dispatch and admin dashboards.',
    highlights: [
      'Real-time notifications and messaging over Socket.io',
      'RBAC, JWT and API security best practices end to end',
    ],
    stack: ['Next.js', 'Express', 'MongoDB', 'Socket.io'],
    span: 'md:col-span-8',
    offset: '',
    card: 'bg-surface border-secondary-fixed hard-shadow-secondary',
    indexClass: 'text-secondary-fixed/30',
    titleClass: 'text-on-surface',
    bodyClass: 'text-on-surface-variant',
    chip: 'bg-primary-container text-on-primary-container border-surface-container-lowest',
    metricClass: 'bg-secondary-fixed text-on-secondary-fixed',
    metric: 'REAL-TIME OPS',
  },
  {
    seed: 2,
    index: '02',
    title: 'Party-Time Reservations',
    country: 'Germany',
    summary:
      'Event reservation platform with Stripe and SumUp payments, webhook-driven transaction processing and QR check-in.',
    highlights: [
      'Email + WhatsApp notifications and automated analytics reporting',
      'CI/CD on AWS cut deployments from hours to 10 minutes',
    ],
    stack: ['React', 'Supabase', 'Stripe', 'AWS'],
    span: 'md:col-span-4',
    offset: 'mt-10 md:mt-20',
    card: 'bg-tertiary-container border-surface-container-highest hard-shadow-black',
    indexClass: 'text-surface-container-lowest/40',
    titleClass: 'text-on-tertiary-container',
    bodyClass: 'text-on-tertiary-container font-bold',
    chip: 'bg-surface text-on-surface border-surface',
    metricClass: 'bg-surface-container-lowest text-tertiary',
    metric: 'HOURS → 10 MIN',
  },
  {
    seed: 3,
    index: '03',
    title: 'ATMs Route Optimization',
    country: 'Saudi Arabia',
    summary:
      'Route optimization platform for cash-in-transit fleets, built on a Python + ORS microservice behind a Next.js control panel.',
    highlights: [
      'Custom routing engine cut average route distance by 15%',
      'Dockerised on AWS, holding 99.5% uptime for critical operations',
    ],
    stack: ['Next.js', 'Node.js', 'Python', 'Docker'],
    span: 'md:col-span-7',
    offset: 'mt-10 md:mt-6',
    card: 'bg-surface-container-lowest border-primary hard-shadow-primary',
    indexClass: 'text-primary/30',
    titleClass: 'text-primary',
    bodyClass: 'text-on-surface-variant',
    chip: 'bg-inverse-primary text-secondary border-surface-container-lowest',
    metricClass: 'bg-primary text-on-primary',
    metric: '−15% DISTANCE',
  },
  {
    seed: 4,
    index: '04',
    title: 'Secure File Transfer',
    country: 'Saudi Arabia',
    summary:
      'WeTransfer-style platform streaming 10GB+ transfers with access control, secure storage and usage dashboards.',
    highlights: [
      'Streaming backend built for large-file throughput',
      'Deployed on DigitalOcean VPS under PM2',
    ],
    stack: ['Node.js', 'PostgreSQL', 'DigitalOcean', 'PM2'],
    span: 'md:col-span-5',
    offset: 'mt-10 md:mt-24',
    card: 'bg-surface border-tertiary-container hard-shadow-tertiary',
    indexClass: 'text-tertiary-container/30',
    titleClass: 'text-tertiary',
    bodyClass: 'text-on-surface-variant',
    chip: 'bg-surface-container text-tertiary border-tertiary-container',
    metricClass: 'bg-tertiary-container text-on-tertiary-container',
    metric: '10GB+ FILES',
  },
]

export function Projects() {
  const { inView, shouldReduce } = useMotionPreference()
  const { ref: headingRef, y: headingY } = useParallax<HTMLDivElement>(50)

  const hover = shouldReduce
    ? undefined
    : {
        y: -10,
        scale: 1.02,
        boxShadow: '20px 20px 0px 0px rgba(0,0,0,0.9)',
        transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
      }

  return (
    <motion.section
      id="work"
      initial="hidden"
      whileInView={inView}
      viewport={sectionViewport}
      className="py-20 sm:py-32 px-margin-page bg-surface-container-high overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto">
        {/*
          Parallax lives on the wrapper and the entrance variant on the heading.
          Both animate `y`, so sharing one element would let the scroll-linked
          MotionValue override the entrance animation.
        */}
        <motion.div
          ref={headingRef}
          style={{ y: headingY }}
          className="mb-12 sm:mb-20"
        >
          <motion.h2
            variants={headingIn}
            className="font-display-2xl text-[46px] sm:text-[80px] md:text-display-2xl leading-[0.95] text-primary drop-shadow-[4px_4px_0px_#000]"
          >
            SELECTED WORKS
            <span className="sr-only">
              {' '}
              — full-stack and backend projects
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-gutter">
          {PROJECTS.map((project) => (
            <motion.article
              key={project.title}
              variants={cardVariants(project.seed)}
              whileHover={hover}
              data-cursor="hover"
              className={`${project.span} ${project.offset} group relative p-6 sm:p-8 border-4 flex flex-col ${project.card}`}
            >
              <span
                aria-hidden="true"
                className={`font-display-2xl text-[60px] sm:text-[90px] leading-none select-none ${project.indexClass}`}
              >
                {project.index}
              </span>

              <div className="flex flex-wrap items-center gap-3 mt-4 mb-5">
                <span
                  className={`font-label-bold text-label-bold uppercase px-3 py-2 border-2 border-transparent ${project.metricClass}`}
                >
                  {project.metric}
                </span>
                <span className="font-label-bold text-label-bold uppercase px-3 py-2 border-2 border-current text-on-surface-variant">
                  {project.country}
                </span>
              </div>

              <h3
                className={`font-headline-lg text-[30px] leading-[32px] sm:text-headline-lg-mobile uppercase text-balance mb-4 ${project.titleClass}`}
              >
                {project.title}
              </h3>

              <p
                className={`font-body-md text-body-md text-pretty mb-5 ${project.bodyClass}`}
              >
                {project.summary}
              </p>

              <ul
                className={`font-body-md text-sm leading-relaxed space-y-2 mb-8 ${project.bodyClass}`}
              >
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span aria-hidden="true">▸</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap gap-2 mt-auto">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className={`px-3 py-1 font-label-bold text-[12px] border-2 ${project.chip}`}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
