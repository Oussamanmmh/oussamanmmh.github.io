export const EMAIL = 'mo_nemamcha@esi.dz'
export const GITHUB = 'https://github.com/oussamanmmh'
export const LINKEDIN = 'https://www.linkedin.com/in/oussama-nemamcha-028447351'

/**
 * Single source of truth for everything the crawlers read: canonical URLs,
 * sitemap entries, JSON-LD and social cards all derive from here.
 *
 * Set NEXT_PUBLIC_SITE_URL to the production origin (no trailing slash) once the
 * domain is live — canonical links and OG URLs are absolute and need it.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oussamanmmh.github.io'
).replace(/\/$/, '')

/**
 * "" at the root, "/<repo-name>" when GitHub Pages serves the site from a
 * project subpath. Next prefixes routes and assets itself, but not the URLs
 * inside the metadata `icons` config — those are prefixed by hand.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(
  /\/$/,
  '',
)

/** Lives in public/. Prefix with BASE_PATH — plain <a> hrefs are not rewritten. */
export const CV_FILE = '/nemamcha-oussama-cv.pdf'

export const PERSON_NAME = 'Nemamcha Oussama'
export const JOB_TITLE = 'Software Engineer'

export const SITE_TITLE = `${PERSON_NAME} — Software Engineer & Backend Architect`

export const SITE_DESCRIPTION =
  'Nemamcha Oussama is a software engineer and ESI student building scalable Node.js, NestJS and Next.js backends. 12+ production web solutions delivered for clients across 7 countries, 5-star rated on Khamsat.'

export const SITE_KEYWORDS = [
  'Nemamcha Oussama',
  'Oussama Nemamcha',
  'software engineer Algeria',
  'freelance backend developer',
  'Node.js developer',
  'NestJS developer',
  'Next.js developer',
  'full-stack developer',
  'ESI Algiers',
  'scalable backend architecture',
  'REST API developer',
  'AWS Docker DevOps',
]

/** Person schema — how search engines connect the name to the profiles. */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: PERSON_NAME,
  alternateName: 'Oussama Nemamcha',
  url: SITE_URL,
  email: `mailto:${EMAIL}`,
  jobTitle: JOB_TITLE,
  description: SITE_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'DZ',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'National Higher School of Computer Science (ESI)',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DZ',
    },
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  knowsLanguage: ['ar', 'en', 'fr'],
  knowsAbout: [
    'Backend development',
    'Node.js',
    'NestJS',
    'Next.js',
    'TypeScript',
    'Go',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Docker',
    'AWS',
    'API security',
  ],
  sameAs: [GITHUB, LINKEDIN],
}

/** WebSite schema, so the site itself is a distinct entity from the person. */
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#person` },
}
