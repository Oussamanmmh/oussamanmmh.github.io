'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useMotionPreference } from '@/hooks/use-motion-preference'
import { useParallax } from '@/hooks/use-parallax'
import { fadeUp, headingIn, landIn, sectionViewport } from '@/lib/motion'
import { EMAIL, GITHUB, LINKEDIN } from '@/lib/site'

/**
 * Optional form backend (Formspree, Web3Forms, a custom handler — anything that
 * accepts a JSON POST). Without it the form composes the message in the
 * visitor's mail client instead, so the page still works on a static host.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT

/* Brand marks: lucide dropped its brand icons, so these ship as local paths. */
type MarkProps = React.SVGProps<SVGSVGElement> & { strokeWidth?: number }

function GithubMark({ strokeWidth: _s, ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

function LinkedinMark({ strokeWidth: _s, ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

const CHANNELS = [
  {
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    Icon: Mail,
    className: 'bg-primary-container text-on-primary-container border-secondary-fixed hard-shadow-secondary',
  },
  {
    label: 'GitHub',
    value: 'oussamanmmh',
    href: GITHUB,
    Icon: GithubMark,
    className: 'bg-surface text-primary border-primary hard-shadow-tertiary',
  },
  {
    label: 'LinkedIn',
    value: 'oussama-nemamcha',
    href: LINKEDIN,
    Icon: LinkedinMark,
    className:
      'bg-tertiary-container text-on-tertiary-container border-surface-container-highest hard-shadow-black',
  },
]

const FIELD_CLASS =
  'w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-4 py-4 border-4 border-on-surface placeholder:text-outline focus:outline-none focus:border-secondary-fixed focus:shadow-[8px_8px_0px_0px_var(--color-secondary-fixed)] transition-shadow'

const LABEL_CLASS =
  'font-label-bold text-label-bold uppercase text-secondary-fixed mb-3 inline-block'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const { inView, shouldReduce } = useMotionPreference()
  const { ref: headingRef, y: headingY } = useParallax<HTMLDivElement>(50)
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    // Honeypot: bots fill every field, humans never see this one.
    if (data.company) return

    if (!ENDPOINT) {
      const body = `${data.message}\n\n— ${data.name} (${data.email})`
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        data.subject || `New message from ${data.name}`,
      )}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView={inView}
      viewport={sectionViewport}
      className="relative py-20 sm:py-32 px-margin-page bg-surface-container-low border-t-4 border-primary overflow-hidden"
    >
      {/* Slow-drifting shapes, echoing the hero, so the section stays alive. */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-primary-container/20 rounded-full animate-drift-spin z-0"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-20 w-[380px] h-[380px] bg-secondary-fixed/15 rotate-12 animate-drift-spin z-0"
        style={{ animationDirection: 'reverse', animationDuration: '46s' }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div
          ref={headingRef}
          style={{ y: headingY }}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={headingIn}
            className="font-display-2xl text-[46px] sm:text-[80px] md:text-display-2xl leading-[0.95] text-secondary-fixed uppercase drop-shadow-[4px_4px_0px_#bd00ff] sm:drop-shadow-[6px_6px_0px_#bd00ff]"
          >
            Get In Touch
          </motion.h2>
          {/* Underline that keeps sweeping under the heading. */}
          <div
            aria-hidden="true"
            className="h-2 w-48 mx-auto mt-4 bg-primary animate-bar-sweep-center"
          />
          <motion.p
            variants={fadeUp}
            className="font-body-md text-body-md text-on-surface-variant mt-6 max-w-xl mx-auto text-pretty"
          >
            Available for freelance backend and full-stack work. Tell me what
            you&apos;re building — I usually reply within a day.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Channels */}
          <motion.ul
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
              reduced: {},
            }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {CHANNELS.map((channel, index) => (
              <motion.li key={channel.label} variants={landIn(index % 2 ? 1.5 : -1.5)}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    channel.href.startsWith('http')
                      ? 'noreferrer noopener'
                      : undefined
                  }
                  data-cursor="hover"
                  className={`flex items-center gap-5 p-5 border-4 transition-transform hover:-translate-y-1 hover:rotate-0 ${channel.className}`}
                >
                  <span
                    className="animate-wiggle shrink-0"
                    style={{ animationDelay: `${index * 0.6}s` }}
                  >
                    <channel.Icon
                      className="w-8 h-8"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="font-label-bold text-label-bold uppercase opacity-70 block">
                      {channel.label}
                    </span>
                    <span className="font-body-md text-body-md break-all">
                      {channel.value}
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}

            <motion.li
              variants={landIn(2, 0.1)}
              className="flex items-center gap-4 p-5 border-4 border-outline-variant bg-surface-container text-on-surface-variant"
            >
              <span className="animate-float shrink-0">
                <MapPin className="w-7 h-7" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="font-body-md text-body-md">
                Algeria — working remotely, worldwide
              </span>
            </motion.li>
          </motion.ul>

          {/* Form */}
          <motion.div
            variants={landIn(-1)}
            className="lg:col-span-7 bg-surface border-4 border-secondary-fixed hard-shadow-secondary p-5 sm:p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate={false}>
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={LABEL_CLASS} htmlFor="contact-name">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label className={LABEL_CLASS} htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={FIELD_CLASS}
                  />
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="contact-subject">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Backend for a booking platform"
                  className={FIELD_CLASS}
                />
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  placeholder="What are we building?"
                  className={`${FIELD_CLASS} resize-y`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={shouldReduce ? undefined : { scale: 1.03, y: -4 }}
                whileTap={shouldReduce ? undefined : { scale: 0.98 }}
                data-cursor="hover"
                className="self-start inline-flex items-center gap-3 font-headline-lg text-[28px] sm:text-headline-lg-mobile uppercase bg-primary text-on-primary-fixed px-6 py-3 sm:px-8 sm:py-4 border-4 border-primary-fixed animate-shadow-pulse btn-active disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending…' : 'Send it'}
                <motion.span
                  animate={
                    shouldReduce || status === 'sending'
                      ? undefined
                      : { x: [0, 8, 0] }
                  }
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <Send className="w-6 h-6" strokeWidth={3} aria-hidden="true" />
                </motion.span>
              </motion.button>

              <p aria-live="polite" className="font-body-md text-body-md">
                {status === 'sent' && (
                  <span className="inline-block bg-secondary-fixed text-on-secondary-fixed px-4 py-3 border-4 border-on-secondary-fixed">
                    {ENDPOINT
                      ? 'Message sent — talk soon.'
                      : 'Your mail app is open with the message ready to send.'}
                  </span>
                )}
                {status === 'error' && (
                  <span className="inline-block bg-error-container text-on-error-container px-4 py-3 border-4 border-error">
                    Something broke on the way out. Email me directly at {EMAIL}.
                  </span>
                )}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
