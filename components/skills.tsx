'use client'

import { motion } from 'framer-motion'
import { DragMarquee } from '@/components/drag-marquee'
import { useMotionPreference } from '@/hooks/use-motion-preference'
import { useParallax } from '@/hooks/use-parallax'
import { fadeUp, headingIn, landIn, popIn, sectionViewport } from '@/lib/motion'

const TICKER_TEXT =
  'TYPESCRIPT • NODE.JS • NESTJS • POSTGRESQL • REDIS • DOCKER • AWS • GO • NEXT.JS • KAFKA •'
const TICKER_ITEMS = Array.from({ length: 3 })

/**
 * The stack, grouped the way the CV groups it. Each group carries its own
 * palette so the wall keeps the clashing-colour energy of the rest of the page.
 */
const GROUPS = [
  {
    title: 'Languages',
    rotate: -1.5,
    card: 'bg-surface border-primary hard-shadow-primary',
    heading: 'text-primary',
    chip: 'bg-primary text-on-primary-fixed border-surface',
    items: ['JavaScript', 'TypeScript', 'Go', 'C', 'Python'],
  },
  {
    title: 'Backend',
    rotate: 2,
    card: 'bg-surface border-secondary-fixed hard-shadow-secondary',
    heading: 'text-secondary-fixed',
    chip: 'bg-secondary-fixed text-on-secondary-fixed border-surface',
    items: [
      'Node.js',
      'Express.js',
      'NestJS',
      'REST APIs',
      'GraphQL',
      'WebSocket',
      'Webhooks',
    ],
  },
  {
    title: 'Frontend',
    rotate: -2,
    card: 'bg-tertiary-container border-surface-container-highest hard-shadow-black',
    heading: 'text-on-tertiary-container',
    chip: 'bg-surface-container-lowest text-tertiary border-on-tertiary-container',
    items: ['React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    title: 'Data & ORMs',
    rotate: 1.5,
    card: 'bg-surface border-tertiary-container hard-shadow-tertiary',
    heading: 'text-tertiary',
    chip: 'bg-surface-container text-tertiary border-tertiary-container',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma', 'TypeORM', 'Supabase', 'Firebase'],
  },
  {
    title: 'Scale & Messaging',
    rotate: 2.5,
    card: 'bg-surface border-primary-fixed hard-shadow-primary',
    heading: 'text-primary-fixed',
    chip: 'bg-inverse-primary text-secondary border-primary-fixed',
    items: ['Redis', 'RabbitMQ', 'Kafka'],
  },
  {
    title: 'Cloud & DevOps',
    rotate: -1,
    card: 'bg-surface-container border-secondary-fixed hard-shadow-secondary',
    heading: 'text-secondary-fixed',
    chip: 'bg-surface-container-lowest text-secondary-fixed border-secondary-fixed',
    items: [
      'AWS',
      'Docker',
      'DigitalOcean',
      'Cloudflare',
      'GitHub Actions',
      'Jenkins',
      'PM2',
    ],
  },
  {
    title: 'Security',
    rotate: 1,
    card: 'bg-surface border-error hard-shadow-black',
    heading: 'text-error',
    chip: 'bg-error-container text-on-error-container border-error',
    items: ['OWASP API Top 10', 'JWT', 'OAuth2', 'RBAC'],
  },
  {
    title: 'Tooling',
    rotate: -2.5,
    card: 'bg-surface-container-lowest border-outline hard-shadow-black',
    heading: 'text-outline',
    chip: 'bg-surface-variant text-on-surface-variant border-outline',
    items: ['Git', 'GitHub', 'Jest', 'Postman', 'Copilot', 'Claude AI'],
  },
]

export function Skills() {
  const { inView, shouldReduce } = useMotionPreference()
  const { ref: headingRef, y: headingY } = useParallax<HTMLDivElement>(50)

  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView={inView}
      viewport={sectionViewport}
      className="py-32 px-margin-page bg-surface border-y-4 border-primary-fixed"
    >
      <motion.div
        ref={headingRef}
        style={{ y: headingY }}
        className="max-w-[1440px] mx-auto text-center mb-16"
      >
        <motion.h2
          variants={headingIn}
          className="font-display-2xl text-[80px] md:text-display-2xl text-on-surface uppercase border-b-4 border-tertiary-container inline-block pb-2"
        >
          Arsenal
          <span className="sr-only"> — technical skills and stack</span>
        </motion.h2>
      </motion.div>

      {/* Always-moving band of the stack, so the section never sits still. */}
      <motion.div variants={fadeUp} className="w-full max-w-[100vw] -mx-margin-page mb-16">
        <DragMarquee
          duration={26}
          className="w-full py-3 bg-surface-container-lowest border-y-4 border-tertiary-container -rotate-1"
          contentClassName="font-body-md text-xl md:text-2xl tracking-widest text-tertiary uppercase flex gap-8"
        >
          {TICKER_ITEMS.map((_, index) => (
            <span key={index}>{TICKER_TEXT}</span>
          ))}
        </DragMarquee>
      </motion.div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {GROUPS.map((group, index) => (
          <motion.article
            key={group.title}
            variants={landIn(group.rotate, 0.05 * index)}
            whileHover={
              shouldReduce ? undefined : { rotate: 0, scale: 1.03, y: -8 }
            }
            data-cursor="hover"
            className={`p-6 border-4 ${group.card}`}
          >
            {/*
              Plain wrapper: the CSS float loop needs its own element so it does
              not fight Framer's inline transform on the card itself.
            */}
            <div
              className="animate-float"
              style={{ animationDelay: `${index * 0.45}s` }}
            >
              <h3
                className={`font-headline-lg text-headline-lg-mobile uppercase mb-5 ${group.heading}`}
              >
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-3">
                {group.items.map((item, itemIndex) => (
                  <motion.li
                    key={item}
                    variants={popIn(0, 0.02 * itemIndex)}
                    whileHover={
                      shouldReduce
                        ? undefined
                        : { scale: 1.12, rotate: itemIndex % 2 ? 3 : -3 }
                    }
                    className={`font-label-bold text-label-bold uppercase px-3 py-2 border-2 cursor-default ${group.chip}`}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}
