'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  const pawBgRef = useRef<HTMLDivElement>(null)

  /* ── Floating paw background ── */
  useEffect(() => {
    const container = pawBgRef.current
    if (!container) return
    const icons = ['🐾', '🐶', '🐱', '🦜', '🐠']
    for (let i = 0; i < 14; i++) {
      const el = document.createElement('div')
      el.className = 'paw'
      el.textContent = icons[i % icons.length]
      el.style.left             = Math.random() * 100 + 'vw'
      el.style.animationDuration = (14 + Math.random() * 12) + 's'
      el.style.animationDelay   = '-' + (Math.random() * 16) + 's'
      el.style.fontSize         = (1.2 + Math.random() * 1.4) + 'rem'
      container.appendChild(el)
    }
    return () => { container.innerHTML = '' }
  }, [])

  /* ── GSAP animations ── */
  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      /* Hero entrance */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-badge',       { y: -22, opacity: 0, duration: 0.5 })
        .from('.hero-title',       { y: 64,  opacity: 0, duration: 0.75, ease: 'power4.out' }, '-=0.22')
        .from('.hero-desc',        { y: 36,  opacity: 0, duration: 0.6 }, '-=0.38')
        .from('.hero-btn',         { y: 22,  opacity: 0, duration: 0.48, stagger: 0.12 }, '-=0.32')
        .from('.hero-stat',        { y: 18,  opacity: 0, duration: 0.42, stagger: 0.13 }, '-=0.28')
        .from('.hero-visual',      { x: 80,  opacity: 0, duration: 0.85, ease: 'power3.out' }, '-=0.75')
        .from('.hcard1',           { x: 36,  opacity: 0, scale: 0.88, duration: 0.52, ease: 'back.out(1.6)' }, '-=0.42')
        .from('.hcard2',           { x: -36, opacity: 0, scale: 0.88, duration: 0.52, ease: 'back.out(1.6)' }, '-=0.44')

      /* Stat counters */
      document.querySelectorAll<HTMLElement>('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target ?? '0', 10)
        if (!target) return
        const obj = { val: 0 }
        ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target, duration: 1.8, ease: 'power2.out',
              onUpdate() { el.textContent = String(Math.round(obj.val)) },
            })
          },
        })
      })

      /* Parallax */
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
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #111827 0%, #1e2a3a 45%, #162819 100%)' }}
    >
      {/* Floating paw background */}
      <div ref={pawBgRef} className="paw-bg" />

      {/* Blurred shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          background: 'var(--primary)', top: -250, right: -150,
          filter: 'blur(90px)', opacity: .12,
          animation: 'shapeFloat 9s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 450, height: 450, borderRadius: '50%',
          background: 'var(--accent)', bottom: -100, left: 100,
          filter: 'blur(90px)', opacity: .12,
          animation: 'shapeFloat 9s ease-in-out infinite -4s',
        }} />
        <div style={{
          position: 'absolute', width: 350, height: 350, borderRadius: '50%',
          background: '#2D6A4F', top: '30%', left: -80,
          filter: 'blur(90px)', opacity: .12,
          animation: 'shapeFloat 9s ease-in-out infinite -7s',
        }} />
      </div>

      {/* Content */}
      <div className="max-w-[1300px] mx-auto px-7 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-[70px] py-[130px] relative z-[1]">

        {/* Left — hero-content */}
        <div className="hero-content">
          {/* Badge */}
          <div
            className="hero-badge inline-flex items-center gap-2 px-[18px] py-2 rounded-full text-[.76rem] font-bold tracking-[1.5px] uppercase mb-[22px]"
            style={{
              background: 'rgba(255,183,3,.14)',
              border: '1px solid rgba(255,183,3,.28)',
              color: 'var(--accent)',
            }}
          >
            <i className="fas fa-map-marker-alt" /> Malargüe, Mendoza
          </div>

          {/* Title */}
          <h1
            className="hero-title font-black text-white leading-[1.1] mb-[22px]"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}
          >
            Lo mejor para<br />
            tu{' '}
            <span style={{
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              mascota
            </span>
            <br />
            está aquí
          </h1>

          {/* Description */}
          <p
            className="hero-desc mb-[38px]"
            style={{ color: 'rgba(255,255,255,.65)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 520 }}
          >
            En RUPER encontrás los mejores alimentos balanceados para perros, gatos, aves y más.
            Calidad garantizada, precios accesibles y la atención personalizada que tu mascota merece.
          </p>

          {/* Buttons */}
          <div className="flex gap-3.5 flex-wrap mb-[48px]">
            <Link
              href="#productos"
              className="hero-btn inline-flex items-center gap-2.5 font-bold text-[.98rem] text-white px-[34px] py-4 rounded-full transition-all hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                boxShadow: '0 6px 22px rgba(255,107,53,.38)',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,107,53,.5)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 6px 22px rgba(255,107,53,.38)')}
            >
              <i className="fas fa-store" /> Ver productos
            </Link>
            <Link
              href="/nosotros"
              className="hero-btn inline-flex items-center gap-2.5 font-semibold text-[.98rem] text-white px-[34px] py-4 rounded-full transition-all hover:-translate-y-1 hover:bg-white/15"
              style={{
                background: 'rgba(255,255,255,.08)',
                border: '1px solid rgba(255,255,255,.18)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <i className="fas fa-info-circle" /> Conocenos
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex gap-9 flex-wrap"
            style={{ paddingTop: 36, borderTop: '1px solid rgba(255,255,255,.1)' }}
          >
            {[
              { target: 500, prefix: '+', label: 'Clientes felices' },
              { target: 12,  prefix: '',  suffix: '+', label: 'Años de experiencia' },
              { target: 14,  prefix: '',  suffix: '+', label: 'Marcas líderes' },
            ].map(s => (
              <div key={s.label} className="hero-stat flex flex-col gap-1">
                <span className="font-black text-white leading-none" style={{ fontSize: '2.2rem' }}>
                  {s.prefix}
                  <em
                    className="stat-num not-italic"
                    style={{ color: 'var(--primary)' }}
                    data-target={s.target}
                  >
                    {s.target}
                  </em>
                  {s.suffix ?? ''}
                </span>
                <span
                  className="uppercase"
                  style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.5)', letterSpacing: '1.8px' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — hero-visual */}
        <div className="hero-visual hidden lg:flex items-center justify-center">
          <div className="relative w-full max-w-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=480&h=420&fit=crop&auto=format"
              alt="Perro feliz con RUPER Alimentos Balanceados"
              width={480} height={420}
              priority
              className="w-full object-cover rounded-[24px]"
              style={{ height: 420, boxShadow: '0 24px 70px rgba(0,0,0,.35)' }}
            />

            {/* Card 1 — bottom left */}
            <div
              className="hcard1 absolute flex items-center gap-3 rounded-2xl"
              style={{
                bottom: -18, left: -32,
                background: 'rgba(255,255,255,.96)',
                backdropFilter: 'blur(20px)',
                padding: '14px 18px',
                boxShadow: '0 10px 40px rgba(0,0,0,.15)',
                animation: 'floatY 3s ease-in-out infinite',
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(45,106,79,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>✅</div>
              <div>
                <strong style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--dark)', display: 'block' }}>Entrega en Malargüe</strong>
                <span style={{ fontSize: '.7rem', color: 'var(--gray)' }}>Pedí por WhatsApp</span>
              </div>
            </div>

            {/* Card 2 — top right */}
            <div
              className="hcard2 absolute flex items-center gap-3 rounded-2xl"
              style={{
                top: -18, right: -32,
                background: 'rgba(255,255,255,.96)',
                backdropFilter: 'blur(20px)',
                padding: '14px 18px',
                boxShadow: '0 10px 40px rgba(0,0,0,.15)',
                animation: 'floatY 3s ease-in-out infinite -1.5s',
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(255,107,53,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>🐶</div>
              <div>
                <strong style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--dark)', display: 'block' }}>Perros y Gatos</strong>
                <span style={{ fontSize: '.7rem', color: 'var(--gray)' }}>Alimento premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
