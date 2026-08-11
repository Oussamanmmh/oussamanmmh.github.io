import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Required by `output: 'export'`: reading process.env otherwise makes Next
// treat this metadata route as dynamic, which a static export cannot serve.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
