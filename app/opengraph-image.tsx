import { ImageResponse } from 'next/og'
import { JOB_TITLE, PERSON_NAME } from '@/lib/site'

/**
 * Social card, generated at build time so it always matches the site: the
 * navbar monogram over the brutalist palette. No external assets — `next/og`
 * only gets the default sans, which is fine at this size.
 */
export const alt = `${PERSON_NAME} — ${JOB_TITLE}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#131313',
          padding: 72,
          border: '16px solid #c3f400',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div
            style={{
              width: 104,
              height: 104,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: '#c3f400',
              border: '8px solid #ecb2ff',
              color: '#283500',
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            ON
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              letterSpacing: 6,
              color: '#d4c0d7',
              textTransform: 'uppercase',
            }}
          >
            oussamanmmh.github.io
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 128,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -4,
              color: '#c3f400',
              textTransform: 'uppercase',
            }}
          >
            {PERSON_NAME}
          </div>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              fontSize: 40,
              fontWeight: 700,
              color: '#320047',
              background: '#ecb2ff',
              padding: '16px 28px',
            }}
          >
            Software Engineer &amp; Backend Architect
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 20,
            fontSize: 26,
            color: '#e5e2e1',
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}
        >
          <span>12+ solutions shipped</span>
          <span style={{ color: '#ffb59a' }}>•</span>
          <span>7 countries</span>
          <span style={{ color: '#ffb59a' }}>•</span>
          <span>5★ on Khamsat</span>
        </div>
      </div>
    ),
    size,
  )
}
