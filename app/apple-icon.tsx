import { ImageResponse } from 'next/og'

// iOS home-screen icon: the navbar monogram, rendered to PNG at build time.
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#131313',
        }}
      >
        <div
          style={{
            width: 156,
            height: 156,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: '#c3f400',
            border: '10px solid #ecb2ff',
            color: '#283500',
            fontSize: 66,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          ON
        </div>
      </div>
    ),
    size,
  )
}
