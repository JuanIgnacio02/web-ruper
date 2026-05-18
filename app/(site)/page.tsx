export const revalidate = 300

import { getProducts }         from '@/lib/supabase/queries'
import HeroSection             from '@/components/home/HeroSection'
import TrustBar                from '@/components/home/TrustBar'
import HomeClient              from '@/components/home/HomeClient'
import BrandsSection           from '@/components/home/BrandsSection'
import QuienesSomosSection     from '@/components/home/QuienesSomosSection'
import WhyUsSection            from '@/components/home/WhyUsSection'
import PromoBanner             from '@/components/home/PromoBanner'
import ContactSection          from '@/components/home/ContactSection'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <>
      <HeroSection />
      <TrustBar />
      <HomeClient products={products} />
      <BrandsSection />
      <QuienesSomosSection />
      <WhyUsSection />
      <PromoBanner />
      <ContactSection />
    </>
  )
}
