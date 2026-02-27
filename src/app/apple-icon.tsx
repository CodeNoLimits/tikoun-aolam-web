import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        backgroundImage: 'linear-gradient(135deg, #0a0a0a 0%, #1a1208 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '22%',
      }}
    >
      <div
        style={{
          fontSize: 90,
          color: '#d4af37',
          lineHeight: 1,
          display: 'flex',
          marginBottom: '8px',
        }}
      >
        ✡
      </div>
      <div
        style={{
          fontSize: 22,
          color: '#d4af37',
          letterSpacing: '0.06em',
          fontWeight: 700,
          display: 'flex',
        }}
      >
        TIKOUN
      </div>
    </div>,
    { ...size }
  )
}
