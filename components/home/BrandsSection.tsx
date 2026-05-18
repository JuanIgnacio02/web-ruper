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

const CARD_W   = 120
const CARD_GAP = 10
const STEP     = (CARD_W + CARD_GAP) * 4

export default function BrandsSection() {
  const trackRef                = useRef<HTMLDivElement>(null)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(true)

  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.from('.brand-logo', {
        scrollTrigger: { trigger: '.brands-track', start: 'top 90%', once: true },
        opacity: 0, y: 12, duration: 0.35, stagger: 0.04, ease: 'power2.out', clearProps: 'all',
      })
    })
  }, [])

  const syncArrows = () => {
    const el = trackRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'right' ? STEP : -STEP, behavior: 'smooth' })
    setTimeout(syncArrows, 350)
  }

  return (
    <section className="bg-[var(--light)] overflow-hidden" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-[1300px] mx-auto px-7 py-10">

        {/* Header compacto en línea */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[.7rem] font-bold uppercase tracking-[2px] text-[var(--gray)] whitespace-nowrap flex-shrink-0">
            Trabajamos con
          </span>
          <div className="flex-1 h-px bg-[var(--border)]" />
          {/* Flechas pequeñas */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canLeft}
              aria-label="Anterior"
              className="w-7 h-7 rounded-full border flex items-center justify-center transition-[opacity,border-color,color] duration-200 disabled:opacity-20 cursor-pointer"
              style={{ borderColor: 'var(--border)', color: 'var(--gray)', background: 'white' }}
            >
              <i className="fas fa-chevron-left" style={{ fontSize: '.6rem' }} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canRight}
              aria-label="Siguiente"
              className="w-7 h-7 rounded-full border flex items-center justify-center transition-[opacity,border-color,color] duration-200 disabled:opacity-20 cursor-pointer"
              style={{ borderColor: 'var(--border)', color: 'var(--gray)', background: 'white' }}
            >
              <i className="fas fa-chevron-right" style={{ fontSize: '.6rem' }} />
            </button>
          </div>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          onScroll={syncArrows}
          className="brands-track flex gap-[10px] overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {LOGOS.map(logo => (
            <div
              key={logo.alt}
              className="brand-logo group flex-shrink-0 rounded-xl flex items-center justify-center overflow-hidden transition-[opacity,transform] duration-250 p-3"
              style={{
                width: CARD_W, height: 76,
                background: 'white',
                border: '1px solid var(--border)',
              }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120} height={60}
                className="object-contain w-full h-full transition-[filter,transform] duration-300 group-hover:scale-105"
                style={{ filter: 'grayscale(40%) opacity(.65)' }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0%) opacity(1)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(40%) opacity(.65)')}
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
