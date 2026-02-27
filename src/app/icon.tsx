import { ImageResponse } from 'next/og'

export const size = { width: 192, height: 192 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: '#0a0a0a',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '20%',
        position: 'relative',
      }}
    >
      {/* Subtle gold ring */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          bottom: '10px',
          left: '10px',
          borderRadius: '17%',
          border: '2px solid rgba(212,175,55,0.35)',
          display: 'flex',
        }}
      />
      {/* Star of David */}
      <div
        style={{
          fontSize: 108,
          color: '#d4af37',
          lineHeight: 1,
          display: 'flex',
        }}
      >
        ✡
      </div>
    </div>,
    { ...size }
  )
}
