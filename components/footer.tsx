'use client'

import { motion } from 'framer-motion'
import { DragMarquee } from '@/components/drag-marquee'
import { EMAIL, GITHUB, LINKEDIN } from '@/lib/site'
import { useMotionPreference } from '@/hooks/use-motion-preference'
import { fadeUp, popIn, sectionViewport } from '@/lib/motion'

const SOCIALS = [
  { label: 'GITHUB', href: GITHUB },
  { label: 'LINKEDIN', href: LINKEDIN },
  { label: 'EMAIL', href: `mailto:${EMAIL}` },
]
const MARQUEE_ITEMS = Array.from({ length: 6 })

export function Footer() {
  const { inView } = useMotionPreference()

  return (
    <motion.footer
      initial="hidden"
      whileInView={inView}
      viewport={sectionViewport}
      className="bg-secondary-fixed dark:bg-secondary-fixed-dim w-full flex flex-col items-center justify-center gap-10 py-20 px-margin-page border-t-4 border-primary dark:border-primary-fixed-dim shadow-[-8px_-8px_0px_0px_#000000] overflow-hidden"
    >
      {/* Marquee Contact Prompt */}
      <motion.div variants={fadeUp} className="w-full my-10">
        <DragMarquee
          className="w-full border-y-8 border-on-secondary-fixed py-4 transform -rotate-2 bg-primary"
          contentClassName="font-display-2xl text-[100px] md:text-[150px] leading-none text-on-secondary-fixed uppercase flex gap-10"
        >
          {MARQUEE_ITEMS.map((_, index) => (
            <span key={index} className="shrink-0 whitespace-nowrap">
              {"LET'S TALK"}
              {index < MARQUEE_ITEMS.length - 1 && (
                <span className="text-secondary-fixed">{' * '}</span>
              )}
            </span>
          ))}
        </DragMarquee>
      </motion.div>

      <motion.div
        variants={popIn(0)}
        className="font-headline-lg text-headline-lg text-on-secondary-fixed mb-8 uppercase text-center"
      >
        Nemamcha Oussama
      </motion.div>

      <motion.div
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
          reduced: {},
        }}
        className="flex flex-wrap justify-center gap-8 md:gap-16"
      >
        {SOCIALS.map((social, index) => (
          <motion.a
            key={social.label}
            variants={popIn(0, 0.04 * index)}
            href={social.href}
            target={social.href.startsWith('http') ? '_blank' : undefined}
            rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
            className="font-headline-lg text-headline-lg-mobile md:text-body-md md:font-body-md text-on-secondary-fixed-variant opacity-80 hover:text-on-secondary-fixed hover:font-bold hover:scale-110 hover:skew-x-6 hover:bg-tertiary transition-all px-4 py-2"
          >
            {social.label}
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="font-headline-lg text-headline-lg-mobile md:text-body-md md:font-body-md text-on-secondary-fixed-variant opacity-80 mt-16 text-center"
      >
        © {new Date().getFullYear()} NEMAMCHA OUSSAMA — SOFTWARE ENGINEER.
      </motion.div>
    </motion.footer>
  )
}
