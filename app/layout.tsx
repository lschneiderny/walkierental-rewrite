import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { QuoteProvider } from '@/contexts/QuoteContext'
import QuoteButton from '@/components/QuoteButton'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://walkierentals.com'),
  title: {
    default: 'WalkieRentals - Production Communication Equipment Rental',
    template: '%s | WalkieRentals'
  },
  description: 'Professional production comms rental for film, TV, and live events. Broadcast-grade Motorola MOTOTRBO radios with 24/7 on-set support. Same-day shipping available.',
  keywords: ['production comms rental', 'film production radios', 'TV production communication', 'event comms rental', 'Motorola MOTOTRBO rental', 'production walkie talkies', 'on-set communication'],
  authors: [{ name: 'WalkieRentals' }],
  creator: 'WalkieRentals',
  publisher: 'WalkieRentals',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://walkierentals.com',
    siteName: 'WalkieRentals',
    title: 'WalkieRentals - Production Communication Equipment Rental',
    description: 'Professional production comms rental for film, TV, and live events. Broadcast-grade Motorola radios with 24/7 on-set support and same-day shipping.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WalkieRentals - Professional Communication Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WalkieRentals - Production Communication Equipment Rental',
    description: 'Professional production comms rental for film, TV, and live events. Broadcast-grade Motorola radios with 24/7 support.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">
        <QuoteProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg">
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
          <QuoteButton />
        </QuoteProvider>
      </body>
    </html>
  )
}