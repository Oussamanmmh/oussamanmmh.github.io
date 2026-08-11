import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Same as robots.ts: static export needs this route pinned to build time.
export const dynamic = 'force-static'

/**
 * One page, but the sitemap still gives crawlers a canonical entry point and a
 * lastModified signal to re-crawl on.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
