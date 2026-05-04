'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-badge',               { y: -22, opacity: 0, duration: 0.5 })
        .from('.hero-title',               { y: 64,  opacity: 0, duration: 0.75, ease: 'power4.out' }, '-=0.22')
        .from('.hero-desc',                { y: 36,  opacity: 0, duration: 0.6 }, '-=0.38')
        .from('.hero-btn',                 { y: 22,  opacity: 0, duration: 0.48, stagger: 0.12 }, '-=0.32')
        .from('.hero-stat',                { y: 18,  opacity: 0, duration: 0.42, stagger: 0.13 }, '-=0.28')
        .from('.hero-visual',              { x: 80,  opacity: 0, duration: 0.85, ease: 'power3.out' }, '-=0.75')
        .from('.hero-card-1',              { x: 36,  opacity: 0, scale: 0.88, duration: 0.52, ease: 'back.out(1.6)' }, '-=0.42')
        .from('.hero-card-2',              { x: -36, opacity: 0, scale: 0.88, duration: 0.52, ease: 'back.out(1.6)' }, '-=0.44')

      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Parallax
      gsap.to('.hero-content', {
        scrollTrigger: { trigger: '#inicio', scrub: 1.2 },
        y: 90, ease: 'none',
      })
      gsap.to('.hero-visual', {
        scrollTrigger: { trigger: '#inicio', scrub: 1.8 },
        y: 55, ease: 'none',
      })
    })
  }, [])

  return (
    <section ref={sectionRef} id="inicio" className="relative min-h-screen flex items-center bg-gradient-to-br from-[var(--dark)] via-[var(--dark-2)] to-[#3d1d0a] overflow-hidden">
      {/* Shapes animadas */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[var(--primary)] rounded-full opacity-[.06] [animation:shapeFloat_12s_ease-in-out_infinite]" />
      <div className="absolute bottom-[-80px] left-[-80px]  w-[380px] h-[380px] bg-[var(--accent)] rounded-full opacity-[.05] [animation:shapeFloat_10s_ease-in-out_infinite_2s]" />
      <div className="absolute top-1/2 left-1/3 w-[250px] h-[250px] bg-[var(--primary-light)] rounded-full opacity-[.04] [animation:shapeFloat_14s_ease-in-out_infinite_4s]" />

      <div className="max-w-[1300px] mx-auto px-7 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-16 py-32">

        {/* Contenido */}
        <div className="hero-content">
          <div className="hero-badge inline-flex items-center gap-2 bg-[var(--primary)]/20 text-[var(--primary-light)] border border-[var(--primary)]/20 px-4 py-2 rounded-full text-[.78rem] font-bold tracking-wider uppercase mb-6">
            <i className="fas fa-map-marker-alt" /> Malargüe, Mendoza
          </div>

          <h1 className="hero-title text-4xl md:text-5xl xl:text-[3.8rem] font-black text-white leading-[1.1] mb-6">
            Lo mejor para<br />
            tu <span className="text-[var(--primary)]">mascota</span><br />
            está aquí
          </h1>

          <p className="hero-desc text-white/65 text-[1rem] leading-relaxed max-w-[480px] mb-8">
            En RUPER encontrás los mejores alimentos balanceados para perros, gatos, aves y más.
            Calidad garantizada, precios accesibles y la atención personalizada que tu mascota merece.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link href="#productos" className="hero-btn flex items-center justify-center gap-2.5 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-lg text-[.96rem]">
              <i className="fas fa-store" /> Ver productos
            </Link>
            <Link href="/nosotros" className="hero-btn flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 border border-white/20 text-[.96rem]">
              <i className="fas fa-info-circle" /> Conocenos
            </Link>
          </div>

          <div className="flex gap-8 flex-wrap">
            {[
              { n: '+500', l: 'Clientes felices' },
              { n: '12+',  l: 'Años de experiencia' },
              { n: '14+',  l: 'Marcas líderes' },
            ].map(s => (
              <div key={s.l} className="hero-stat text-center">
                <div className="text-[1.9rem] font-black text-white">{s.n}</div>
                <div className="text-white/45 text-[.75rem] font-medium mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="hero-visual hidden lg:flex justify-center">
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=480&h=420&fit=crop&auto=format"
              alt="Perro feliz con RUPER Alimentos Balanceados"
              width={480} height={420}
              priority
              className="rounded-3xl object-cover shadow-2xl"
            />
            {/* Mini cards flotantes */}
            <div className="hero-card-1 absolute -right-6 top-8 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 min-w-[170px]">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-xl">🐶</div>
              <div>
                <div className="font-bold text-[.8rem] text-[var(--dark)]">Perros y Gatos</div>
                <div className="text-[.68rem] text-[var(--gray)]">Alimento premium</div>
              </div>
            </div>
            <div className="hero-card-2 absolute -left-6 bottom-12 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 min-w-[175px]">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">✅</div>
              <div>
                <div className="font-bold text-[.8rem] text-[var(--dark)]">Entrega en Malargüe</div>
                <div className="text-[.68rem] text-[var(--gray)]">Pedí por WhatsApp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
