import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

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
