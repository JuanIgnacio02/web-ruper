'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const LOGOS = [
  { src: '/img/logos/pro-plan.png',      alt: 'Pro Plan' },
  { src: '/img/logos/dog-chow.png',      alt: 'Dog Chow' },
  { src: '/img/logos/cat-chow.png',      alt: 'Cat Chow' },
  { src: '/img/logos/dog-selection.png', alt: 'Dog Selection' },
  { src: '/img/logos/protemix.jpg',      alt: 'Protemix' },
  { src: '/img/logos/pacha.jpg',         alt: 'Pachá' },
  { src: '/img/logos/sabrositos.webp',   alt: 'Sabrositos' },
  { src: '/img/logos/tiernitos.jpg',     alt: 'Tiernitos' },
  { src: '/img/logos/maxxium.png',       alt: 'Maxxium' },
  { src: '/img/logos/eukanuba.png',      alt: 'Eukanuba' },
  { src: '/img/logos/agility.png',       alt: 'Agility' },
  { src: '/img/logos/sieger.png',        alt: 'Sieger' },
  { src: '/img/logos/gooster.png',       alt: 'Gooster' },
  { src: '/img/logos/gran-campeon.webp', alt: 'Gran Campeón' },
]

const CARD_W   = 148
const CARD_GAP = 14
const STEP     = (CARD_W + CARD_GAP) * 3   // avanza 3 cards por click

export default function BrandsSection() {
  const trackRef              = useRef<HTMLDivElement>(null)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(true)

  /* GSAP entrance */
  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.from('.brand-logo', {
        scrollTrigger: { trigger: '.brands-track', start: 'top 88%', once: true },
        scale: 0.75, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'back.out(1.6)', clearProps: 'all',
      })
    })
  }, [])

  /* Actualiza estado de flechas según posición del scroll */
  const syncArrows = () => {
    const el = trackRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? STEP : -STEP, behavior: 'smooth' })
    setTimeout(syncArrows, 350)
  }

  return (
    <section className="bg-white py-[70px] overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-7">

        {/* Header */}
        <div className="flex items-center justify-between mb-10 gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 bg-[var(--primary)]/8 text-[var(--primary)] px-[18px] py-2 rounded-full text-[.74rem] font-bold uppercase tracking-[1.5px] mb-3">
              <i className="fas fa-store" /> Marcas disponibles
            </div>
            <h2 className="text-[clamp(1.6rem,2.4vw,2.4rem)] font-black text-[var(--dark)]">
              Trabajamos con las mejores marcas
            </h2>
          </div>

          {/* Flechas */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canLeft}
              aria-label="Anterior"
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-[background-color,border-color,opacity] duration-200 disabled:opacity-25"
              style={{
                borderColor: canLeft ? 'var(--primary)' : 'var(--border)',
                color:       canLeft ? 'var(--primary)' : 'var(--gray)',
                background:  'white',
              }}
            >
              <i className="fas fa-chevron-left text-[.8rem]" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canRight}
              aria-label="Siguiente"
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-[background-color,border-color,opacity] duration-200 disabled:opacity-25"
              style={{
                borderColor: canRight ? 'var(--primary)' : 'var(--border)',
                color:       canRight ? 'var(--primary)' : 'var(--gray)',
                background:  'white',
              }}
            >
              <i className="fas fa-chevron-right text-[.8rem]" />
            </button>
          </div>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          onScroll={syncArrows}
          className="brands-track flex gap-[14px] overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {LOGOS.map(logo => (
            <div
              key={logo.alt}
              className="brand-logo group flex-shrink-0 bg-white border border-[var(--border)] rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,.06)] hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,0,0,.13)] hover:border-[var(--primary)] transition-[transform,box-shadow,border-color] duration-300 p-4"
              style={{ width: CARD_W, height: 110, flexShrink: 0 }}
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
