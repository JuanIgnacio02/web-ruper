'use client'
import { useEffect } from 'react'
import { useCart } from '@/hooks/useCart'

export default function PromoBanner() {
  const { open } = useCart()

  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.promo-banner', start: 'top 85%', once: true } })
      tl.from('.promo-txt',  { x: -44, opacity: 0, duration: 0.68, ease: 'power3.out', clearProps: 'all' })
        .from('.promo-btn',  { x:  44, opacity: 0, duration: 0.68, ease: 'power3.out', clearProps: 'all' }, '-=0.48')
    })
  }, [])

  return (
    <div className="promo-banner relative py-[70px] overflow-hidden bg-gradient-to-r from-[var(--primary)] via-[var(--primary-dark)] to-[#c44e1e]">
      <div className="absolute inset-0 opacity-[.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E\")" }} />
      <div className="relative z-10 max-w-[1300px] mx-auto px-7 flex items-center justify-between gap-8 flex-wrap">
        <div className="promo-txt">
          <h2 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-black text-white mb-2">🛒 ¡Hacé tu pedido ahora!</h2>
          <p className="text-white/75 text-[.95rem]">Seleccioná tus productos y envialos por WhatsApp. Respondemos al instante.</p>
        </div>
        <button
          onClick={open}
          className="promo-btn bg-white text-[var(--primary)] px-9 py-4 rounded-full text-[.96rem] font-black inline-flex items-center gap-2.5 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,.2)] transition-all whitespace-nowrap"
        >
          <i className="fas fa-shopping-cart" /> Ver mi pedido
        </button>
      </div>
    </div>
  )
}
