import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { CartProvider } from "@/lib/cart-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { AudioPlayer } from "@/components/AudioPlayer";
import { PWAInstallBanner } from "@/components/PWAInstallBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const viewport: Viewport = {
  themeColor: '#d4af37',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Tikoun Aolam | Éditions Breslev",
    template: "%s | Tikoun Aolam",
  },
  description:
    "Boutique en ligne spécialisée dans la vente de livres religieux juifs (courant Breslev) en français et hébreu. 28 ouvrages d'exception.",
  keywords: [
    "Breslev",
    "Rabbi Nachman",
    "livres juifs",
    "Tikoun Aolam",
    "Likouté Moharan",
    "Torah",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Tikoun Aolam',
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL('https://tikoun-aolam.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'Tikoun Aolam',
    title: 'Tikoun Aolam | Éditions Breslev',
    description: "Boutique de livres Breslev en français et hébreu — Enseignements de Rabbi Na'hman",
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tikoun Aolam | Éditions Breslev',
    description: "Boutique de livres Breslev en français et hébreu — Enseignements de Rabbi Na'hman",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: {
    canonical: 'https://tikoun-aolam.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Éditions Tikoun Aolam",
              url: "https://tikoun-aolam.vercel.app",
              logo: "https://tikoun-aolam.vercel.app/logo-flame.png",
              description:
                "Maison d'édition spécialisée dans les enseignements de Rabbi Na'hman de Breslev traduits en français.",
              sameAs: [
                "https://www.facebook.com/TikounAolam",
                "https://www.instagram.com/tikounaolam",
                "https://www.youtube.com/@TikounAolam",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+972-55-975-9155",
                contactType: "customer service",
                availableLanguage: ["French", "Hebrew"],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${cinzel.variable} antialiased bg-tikoun-black text-tikoun-white selection:bg-tikoun-gold/20 selection:text-tikoun-gold min-h-screen flex flex-col`}
      >
        <CurrencyProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <WhatsAppButton />
            <ChatWidget />
            <AudioPlayer />
            <PWAInstallBanner />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
