'use client'
import { useEffect } from 'react'

const ITEMS = [
  { icon: 'fa-shield-alt',  text: 'Productos originales garantizados' },
  { icon: 'fa-truck',       text: 'Entrega a domicilio en Malargüe' },
  { icon: 'fa-whatsapp fab',text: 'Pedidos rápidos por WhatsApp' },
  { icon: 'fa-star',        text: '+12 años de experiencia' },
  { icon: 'fa-heart',       text: 'Asesoramiento personalizado' },
]

export default function TrustBar() {
  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.from('.trust-item', {
        scrollTrigger: { trigger: '.trust-bar', start: 'top 92%', once: true },
        x: -28, opacity: 0, duration: 0.48, stagger: 0.09, ease: 'power2.out', clearProps: 'all',
      })
    })
  }, [])

  return (
    <div className="trust-bar bg-[var(--light)] border-b border-[var(--border)] py-[22px]">
      <div className="max-w-[1300px] mx-auto px-7 flex items-center justify-center gap-12 flex-wrap">
        {ITEMS.map(item => (
          <div key={item.text} className="trust-item flex items-center gap-2.5 text-[.84rem] font-medium text-[var(--dark-2)]">
            <i className={`fas ${item.icon} text-[var(--primary)]`} />
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
