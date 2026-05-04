import type { Metadata } from 'next'
import NosotrosClient from '@/components/nosotros/NosotrosClient'

export const metadata: Metadata = {
  title:       'Nosotros — RUPER Alimentos Balanceados',
  description: 'Conocé la historia de RUPER, tu tienda de confianza en Malargüe. Más de 12 años cuidando a las mascotas de la comunidad.',
}

export default function NosotrosPage() {
  return <NosotrosClient />
}
