'use client'
import { useEffect } from 'react'
import Image from 'next/image'

const LOGOS = [
  { src: '/img/logos/pro-plan.png',      alt: 'Pro Plan' },
  { src: '/img/logos/dog-chow.png',      alt: 'Dog Chow' },
  { src: '/img/logos/cat-chow.png',      alt: 'Cat Chow' },
  { src: '/img/logos/dog-selection.png', alt: 'Dog Selection' },
  { src: '/img/logos/protemix.jpg',      alt: 'Protemix', fitted: true },
  { src: '/img/logos/pacha.jpg',         alt: 'Pachá' },
  { src: '/img/logos/sabrositos.webp',   alt: 'Sabrositos' },
  { src: '/img/logos/tiernitos.jpg',     alt: 'Tiernitos' },
  { src: '/img/logos/maxxium.png',       alt: 'Maxxium' },
  { src: '/img/logos/eukanuba.png',      alt: 'Eukanuba' },
  { src: '/img/logos/agility.png',       alt: 'Agility' },
  { src: '/img/logos/sieger.png',        alt: 'Sieger' },
  { src: '/img/logos/gooster.png',       alt: 'Gooster' },
  { src: '/img/logos/gran-campeon.webp', alt: 'Gran Campeón', fitted: true },
]

export default function BrandsSection() {
  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.from('.brand-logo', {
        scrollTrigger: { trigger: '.brands-grid', start: 'top 88%', once: true },
        scale: 0.75, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'back.out(1.6)', clearProps: 'all',
      })
    })
  }, [])

  return (
    <section className="bg-white py-[70px]">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--primary)]/8 text-[var(--primary)] px-[18px] py-2 rounded-full text-[.74rem] font-bold uppercase tracking-[1.5px] mb-3.5">
            <i className="fas fa-store" /> Marcas disponibles
          </div>
          <h2 className="text-[clamp(1.8rem,2.8vw,2.7rem)] font-black text-[var(--dark)]">Trabajamos con las mejores marcas</h2>
        </div>

        <div className="brands-grid grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))' }}>
          {LOGOS.map(logo => (
            <div
              key={logo.alt}
              className="brand-logo group bg-white border border-[var(--border)] rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.06)] hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,.13)] hover:border-[var(--primary)] transition-[transform,box-shadow,border-color] duration-300 p-4"
              style={{ height: 110 }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={148} height={78}
                className="object-contain w-full h-full transition-[transform,filter] duration-300 group-hover:scale-[1.06] group-hover:[filter:grayscale(0%)_opacity(1)]"
                style={{ filter: 'grayscale(10%) opacity(.9)' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
