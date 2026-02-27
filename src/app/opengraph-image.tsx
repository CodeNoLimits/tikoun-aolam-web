import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Tikoun Aolam — Éditions Breslev'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        backgroundImage: 'linear-gradient(135deg, #0a0a0a 0%, #1a1208 55%, #0d0d00 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Georgia, "Times New Roman", serif',
        position: 'relative',
      }}
    >
      {/* Gold top border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          backgroundImage:
            'linear-gradient(90deg, transparent 0%, #b87333 20%, #d4af37 50%, #b87333 80%, transparent 100%)',
          display: 'flex',
        }}
      />

      {/* Gold bottom border */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '5px',
          backgroundImage:
            'linear-gradient(90deg, transparent 0%, #b87333 20%, #d4af37 50%, #b87333 80%, transparent 100%)',
          display: 'flex',
        }}
      />

      {/* Corner ornaments */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: '32px',
          fontSize: 22,
          color: 'rgba(212,175,55,0.4)',
          display: 'flex',
        }}
      >
        ✦
      </div>
      <div
        style={{
          position: 'absolute',
          top: '28px',
          right: '32px',
          fontSize: 22,
          color: 'rgba(212,175,55,0.4)',
          display: 'flex',
        }}
      >
        ✦
      </div>

      {/* Star of David */}
      <div
        style={{
          fontSize: 88,
          color: '#d4af37',
          lineHeight: 1,
          display: 'flex',
          marginBottom: '22px',
        }}
      >
        ✡
      </div>

      {/* Main Title */}
      <div
        style={{
          fontSize: 76,
          fontWeight: 700,
          color: '#d4af37',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          display: 'flex',
        }}
      >
        TIKOUN AOLAM
      </div>

      {/* Decorative separator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '18px',
          marginBottom: '18px',
        }}
      >
        <div
          style={{
            width: '120px',
            height: '1px',
            backgroundImage: 'linear-gradient(90deg, transparent, #b87333)',
            display: 'flex',
          }}
        />
        <div
          style={{
            fontSize: 18,
            color: '#b87333',
            marginLeft: '14px',
            marginRight: '14px',
            display: 'flex',
          }}
        >
          ✦
        </div>
        <div
          style={{
            width: '120px',
            height: '1px',
            backgroundImage: 'linear-gradient(90deg, #b87333, transparent)',
            display: 'flex',
          }}
        />
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 32,
          color: 'rgba(255,255,255,0.72)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          display: 'flex',
        }}
      >
        ÉDITIONS BRESLEV
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 19,
          color: 'rgba(212,175,55,0.45)',
          marginTop: '20px',
          letterSpacing: '0.18em',
          fontStyle: 'italic',
          display: 'flex',
        }}
      >
        Na Nach Nachma Nachman MeUman
      </div>
    </div>,
    { ...size }
  )
}
