'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useMotionPreference } from '@/hooks/use-motion-preference'
import { useParallax } from '@/hooks/use-parallax'
import { fadeUp, headingIn, landIn, popIn, sectionViewport } from '@/lib/motion'
import { BASE_PATH, CV_FILE } from '@/lib/site'

const CV_URL = `${BASE_PATH}${CV_FILE}`

const META = ['PDF', '1 PAGE', 'EN', 'UPDATED 2026']

/** Skeleton lines standing in for body copy on the mock sheet. */
const SHEET_BLOCKS = [
  { label: 'Experience', lines: ['92%', '78%', '85%'] },
  { label: 'Projects', lines: ['88%', '70%'] },
  { label: 'Skills', lines: ['95%', '64%'] },
]

export function Resume() {
  const { inView, shouldReduce } = useMotionPreference()
  const { ref: headingRef, y: headingY } = useParallax<HTMLDivElement>(40)
  const [saved, setSaved] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  function handleDownload() {
    setSaved(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setSaved(false), 2600)
  }

  return (
    <motion.section
      id="resume"
      initial="hidden"
      whileInView={inView}
      viewport={sectionViewport}
      className="relative py-20 sm:py-32 px-margin-page bg-surface-container-high border-y-4 border-secondary-fixed overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-gutter items-center">
        {/* Mock sheet — a drawn CV, not a screenshot, so it stays crisp. */}
        <motion.div
          variants={landIn(-4)}
          whileHover={shouldReduce ? undefined : { rotate: 0, scale: 1.03 }}
          data-cursor="hover"
          className="lg:col-span-5 order-2 lg:order-1 relative mx-auto w-full max-w-[320px]"
        >
          <div className="animate-float">
            <div className="relative bg-on-background text-surface border-4 border-surface-container-lowest hard-shadow-primary p-5 sm:p-6 aspect-[1/1.414] flex flex-col">
              <span className="absolute -top-4 -right-4 bg-tertiary-container text-on-tertiary-container font-label-bold text-label-bold uppercase px-3 py-2 border-4 border-surface-container-lowest rotate-6">
                PDF
              </span>

              <span className="font-headline-lg text-[24px] leading-none uppercase tracking-tight">
                Nemamcha
                <br />
                Oussama
              </span>
              <span className="font-label-bold text-[11px] uppercase text-surface/70 mt-2 mb-4">
                Software Engineer
              </span>

              <div className="h-1 w-full bg-surface/80 mb-4" aria-hidden="true" />

              <div className="flex flex-col gap-4" aria-hidden="true">
                {SHEET_BLOCKS.map((block) => (
                  <div key={block.label}>
                    <span className="font-label-bold text-[10px] uppercase text-primary-container block mb-2">
                      {block.label}
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {block.lines.map((width, index) => (
                        <span
                          key={`${block.label}-${index}`}
                          style={{ width }}
                          className="h-1.5 bg-surface/25 block"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copy + actions */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <motion.div ref={headingRef} style={{ y: headingY }}>
            <motion.h2
              variants={headingIn}
              className="font-display-2xl text-[46px] sm:text-[72px] md:text-[92px] leading-[0.95] text-secondary-fixed uppercase drop-shadow-[4px_4px_0px_#000]"
            >
              Take the CV
              <span className="sr-only"> — download my resume as a PDF</span>
            </motion.h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-body-md text-body-md text-on-surface-variant mt-6 max-w-lg text-pretty"
          >
            The full version: every role, every project, the whole stack. One
            page, no signup, straight to your downloads folder.
          </motion.p>

          <motion.ul
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
              reduced: {},
            }}
            className="flex flex-wrap gap-2 sm:gap-3 mt-6"
          >
            {META.map((item, index) => (
              <motion.li
                key={item}
                variants={popIn(0, 0.03 * index)}
                className="font-label-bold text-label-bold uppercase px-3 py-2 border-2 border-outline text-on-surface-variant"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-center gap-4 mt-10"
          >
            <motion.a
              href={CV_URL}
              download="Nemamcha-Oussama-CV.pdf"
              onClick={handleDownload}
              whileHover={shouldReduce ? undefined : { scale: 1.04, y: -4 }}
              whileTap={shouldReduce ? undefined : { scale: 0.97 }}
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-3 font-headline-lg text-[28px] sm:text-headline-lg-mobile uppercase bg-secondary-fixed text-on-secondary-fixed px-6 py-3 sm:px-8 sm:py-4 border-4 border-on-secondary-fixed hard-shadow-black btn-active"
            >
              {saved ? 'Saved ✓' : 'Download CV'}
              <motion.span
                animate={shouldReduce || saved ? undefined : { y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <Download className="w-6 h-6" strokeWidth={3} aria-hidden="true" />
              </motion.span>
            </motion.a>

            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 font-label-bold text-label-bold uppercase text-secondary-fixed px-5 py-4 border-4 border-secondary-fixed hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors"
            >
              View in browser
              <ArrowUpRight className="w-5 h-5" strokeWidth={3} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
