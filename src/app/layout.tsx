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
  metadataBase: new URL('https://tikoun-aolam-web-rho.vercel.app'),
  openGraph: {
    type: 'website',
    siteName: 'Tikoun Aolam',
    title: 'Tikoun Aolam | Éditions Breslev',
    description: "Boutique de livres Breslev en français et hébreu — Enseignements de Rabbi Na'hman",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth">
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
