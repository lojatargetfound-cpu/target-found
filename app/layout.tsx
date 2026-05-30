import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'TARGET FOUND | Sneakers Premium',
  
  description:
    'Loja premium de sneakers originais. Nike, Jordan, Adidas, Puma e muito mais.',

  keywords: [
    'sneakers',
    'nike',
    'jordan',
    'adidas',
    'puma',
    'air max',
    'tenis',
    'loja sneaker',
  ],

  authors: [
    {
      name: 'TARGET FOUND',
    },
  ],

  creator: 'TARGET FOUND',

  openGraph: {
    title: 'TARGET FOUND | Sneakers Premium',

    description:
      'Sneakers premium e originais com entrega rápida.',

    url: 'https://seudominio.com',

    siteName: 'TARGET FOUND',

    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TARGET FOUND',
      },
    ],

    locale: 'pt_BR',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',

    title: 'TARGET FOUND',

    description:
      'Sneakers premium e originais.',

    images: ['/og-image.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-BR">

      <body>
        {children}
      </body>

    </html>
  )
}