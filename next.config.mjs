/**
 * Static export for GitHub Pages.
 *
 * NEXT_PUBLIC_BASE_PATH is empty for a user site (oussamanmmh.github.io) or a
 * custom domain, and "/<repo-name>" for a project site served from a subpath.
 * The CI workflow sets it; leaving it unset builds for the root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  // Pages serves /path/ as /path/index.html, so emit directory-style routes.
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // No image optimizer on a static host.
    unoptimized: true,
  },
  /*
    The security headers that used to live here are gone: `headers()` requires a
    Next.js server and is unsupported by `output: 'export'`. GitHub Pages does
    not let you set response headers at all — put the site behind Cloudflare (or
    another CDN) if you need HSTS and friends.
  */
}

export default nextConfig
