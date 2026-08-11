'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useMotionPreference } from '@/hooks/use-motion-preference'

const NAV_LINKS = [
  {
    label: 'Work',
    href: '#work',
    hover:
      'hover:bg-secondary-fixed hover:text-on-secondary-fixed hover:rotate-3',
  },
  {
    label: 'About',
    href: '#about',
    hover: 'hover:bg-primary hover:text-on-primary hover:-rotate-3',
  },
  {
    label: 'Skills',
    href: '#skills',
    hover:
      'hover:bg-tertiary-container hover:text-on-tertiary-container hover:rotate-6',
  },
  {
    label: 'Experience',
    href: '#experience',
    hover: 'hover:bg-inverse-primary hover:text-secondary hover:-rotate-6',
  },
  {
    label: 'CV',
    href: '#resume',
    hover: 'hover:bg-secondary-fixed hover:text-on-secondary-fixed hover:-rotate-3',
  },
  {
    label: 'Contact',
    href: '#contact',
    hover: 'hover:bg-primary-container hover:text-on-primary-container hover:rotate-3',
  },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { shouldReduce } = useMotionPreference()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <motion.nav
        initial={shouldReduce ? { opacity: 0 } : { y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={
          shouldReduce
            ? { duration: 0.3 }
            : { type: 'spring', stiffness: 180, damping: 20, delay: 0.1 }
        }
        className="sticky top-0 z-50 flex justify-between items-center gap-3 px-margin-page w-full bg-surface/90 backdrop-blur-sm border-primary dark:border-primary-fixed-dim shadow-[8px_8px_0px_0px_#c3f400] dark:shadow-[8px_8px_0px_0px_#abd600] py-5 sm:py-8 border-b-8"
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <span
            aria-hidden="true"
            className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full border-4 border-primary bg-secondary-fixed text-on-secondary-fixed font-headline-lg text-[18px] sm:text-[22px] flex items-center justify-center"
          >
            ON
          </span>
          <a
            className="font-headline-lg text-[26px] sm:text-headline-lg-mobile md:text-headline-lg text-primary dark:text-primary-fixed-dim uppercase tracking-tighter truncate"
            href="#"
          >
            NEMAMCHA
          </a>
        </div>

        <div className="hidden md:flex gap-4 lg:gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className={`font-label-bold text-label-bold text-on-surface transition-all hover:scale-110 px-4 py-2 border-2 border-on-surface hard-shadow-black ${link.hover}`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          className="hidden md:inline-block font-label-bold text-label-bold bg-primary text-on-primary-fixed px-6 py-3 border-primary-fixed hard-shadow-secondary hover:bg-tertiary-container hover:text-on-tertiary-container transition-transform btn-active border-8 hover:scale-110 hover:-translate-y-2"
          href="#contact"
        >
          Hire Me
        </a>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="md:hidden p-2 text-primary"
        >
          <Menu className="w-8 h-8" strokeWidth={3} aria-hidden="true" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={shouldReduce ? { opacity: 0 } : { x: '100%' }}
            animate={shouldReduce ? { opacity: 1 } : { x: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { x: '100%' }}
            transition={
              shouldReduce
                ? { duration: 0.25 }
                : { type: 'spring', stiffness: 200, damping: 26 }
            }
            className="fixed inset-0 z-[60] bg-surface-container-lowest flex flex-col md:hidden"
          >
            <div className="shrink-0 flex justify-between items-center px-margin-page py-5 border-b-8 border-primary">
              <span className="font-headline-lg text-[30px] text-primary uppercase tracking-tighter">
                MENU
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 text-secondary-fixed border-4 border-secondary-fixed hard-shadow-black"
              >
                <X className="w-7 h-7" strokeWidth={3} aria-hidden="true" />
              </button>
            </div>

            <motion.div
              /*
                Scrollable: five links plus the CTA at display sizes overflow a
                short phone viewport, and the panel would clip them silently.
              */
              className="flex-1 min-h-0 overflow-y-auto flex flex-col justify-center gap-4 px-margin-page py-8"
              initial="hidden"
              animate={shouldReduce ? 'reduced' : 'visible'}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.09, delayChildren: 0.15 },
                },
                reduced: {},
              }}
            >
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: 80, rotate: -4 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      rotate: index % 2 === 0 ? 2 : -2,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      },
                    },
                    reduced: { opacity: 1, x: 0, rotate: 0 },
                  }}
                  className={`font-headline-lg text-[30px] uppercase text-on-surface bg-surface-container px-5 py-4 border-4 border-on-surface hard-shadow-black ${link.hover}`}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                variants={{
                  hidden: { opacity: 0, y: 60, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: 'spring', stiffness: 300, damping: 18 },
                  },
                  reduced: { opacity: 1, y: 0, scale: 1 },
                }}
                className="font-headline-lg text-[30px] uppercase text-center bg-primary text-on-primary-fixed px-5 py-5 border-8 border-primary-fixed hard-shadow-secondary mt-4"
              >
                Hire Me
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
