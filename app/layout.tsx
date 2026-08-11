import type { Metadata, Viewport } from 'next'
import { Anton, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import {
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_TITLE,
  SITE_URL,
  personJsonLd,
  websiteJsonLd,
} from '@/lib/site'
import './globals.css'

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${PERSON_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: PERSON_NAME,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  creator: PERSON_NAME,
  publisher: PERSON_NAME,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'profile',
    url: SITE_URL,
    siteName: PERSON_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
    firstName: 'Oussama',
    lastName: 'Nemamcha',
    username: 'oussamanmmh',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  /*
    No `icons` block on purpose: app/icon.svg and app/apple-icon.tsx are file
    conventions, so Next emits the links itself — and, unlike hand-written URLs,
    it applies the basePath for us.
  */
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#131313',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-surface ${anton.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden selection:bg-secondary-fixed selection:text-on-secondary-fixed">
        {/* Structured data: ties the name, the site and the profiles together. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
        {children}
      </body>
    </html>
  )
}
