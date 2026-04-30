import type { Metadata } from 'next'
import ContactSection from '@/components/home/ContactSection'

export const metadata: Metadata = {
  title:       'Contacto — RUPER Alimentos Balanceados',
  description: 'Encontranos en nuestros dos locales en Malargüe o escribinos por WhatsApp. Av. Rufino Ortega 602 y Av. Juan Agustín Maza 2249.',
}

export default function ContactoPage() {
  return (
    <div className="pt-20">
      <ContactSection />
    </div>
  )
}
