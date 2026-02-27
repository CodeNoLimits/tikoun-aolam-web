import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tikoun Aolam | Éditions Breslev',
    short_name: 'Tikoun Aolam',
    description:
      "Boutique en ligne de livres Breslev en français et hébreu — Enseignements de Rabbi Na'hman de Breslev",
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#d4af37',
    orientation: 'portrait',
    categories: ['shopping', 'books', 'lifestyle', 'religion'],
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [],
  }
}
