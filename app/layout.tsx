import type { Metadata, Viewport } from 'next'
import { Poppins, Fredoka } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets:  ['latin'],
  weight:   ['400', '600', '700', '800'],
  variable: '--font-poppins',
  display:  'swap',
})

const fredoka = Fredoka({
  subsets:  ['latin'],
  weight:   ['400'],
  variable: '--font-fredoka',
  display:  'swap',
})

export const metadata: Metadata = {
  title:       'RUPER — Alimentos Balanceados | Malargüe, Mendoza',
  description: 'Tu tienda de alimentos balanceados para mascotas en Malargüe. Perros, gatos, aves y más. Pedidos por WhatsApp.',
  openGraph: {
    type:        'website',
    url:         'https://web-ruper.vercel.app/',
    title:       'RUPER — Alimentos Balanceados | Malargüe, Mendoza',
    description: 'Tu tienda de alimentos balanceados para mascotas en Malargüe.',
    images:      [{ url: 'https://web-ruper.vercel.app/img/logo.svg' }],
  },
  twitter: { card: 'summary' },
  alternates: { canonical: 'https://web-ruper.vercel.app/' },
}

export const viewport: Viewport = {
  themeColor: '#FF6B35',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable} ${fredoka.variable}`}>
      <head>
        {/* Preconnect: abre la conexión TCP/TLS al CDN antes de que el parser
            llegue al <link> de FA — ahorra ~200-400ms en primera visita */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'PetStore',
          name: 'RUPER Alimentos Balanceados',
          url: 'https://web-ruper.vercel.app/',
          telephone: '+5492604342179',
          address: { '@type': 'PostalAddress', streetAddress: 'Av. Rufino Ortega 602', addressLocality: 'Malargüe', addressRegion: 'Mendoza', addressCountry: 'AR' },
          openingHoursSpecification: [
            { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:30', closes: '21:00' },
            { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
          ],
          sameAs: ['https://www.instagram.com/ruper_malargue/', 'https://www.facebook.com/juan.ruper.5'],
        })}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
