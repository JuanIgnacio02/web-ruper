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

    // Respeta prefers-reduced-motion: si el usuario lo prefiere, no agregamos
    // elementos animados al DOM (evita distracciones + respeta accesibilidad)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // 8 en lugar de 14: suficiente efecto visual, ~43% menos nodos animados en GPU
    const icons = ['🐾', '🐶', '🐱', '🦜', '🐠']
    const count = window.innerWidth < 768 ? 5 : 8 // menos en mobile

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div')
      el.className = 'paw'
      el.textContent = icons[i % icons.length]
      el.style.left              = Math.random() * 100 + 'vw'
      el.style.animationDuration = (14 + Math.random() * 12) + 's'
      el.style.animationDelay    = '-' + (Math.random() * 16) + 's'
      el.style.fontSize          = (1.2 + Math.random() * 1.4) + 'rem'
      container.appendChild(el)
    }
    return () => { container.innerHTML = '' }
  }, [])

  /* ── GSAP animations ── */
  useEffect(() => {
    let ctx: ReturnType<typeof import('gsap')['gsap']['context']> | undefined
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // gsap.matchMedia(): respeta prefers-reduced-motion automáticamente.
        // Si el usuario prefiere sin animaciones, las duraciones se ponen a 0.
        const mm = gsap.matchMedia()
        mm.add(
          {
            reduceMotion: '(prefers-reduced-motion: reduce)',
            isDesktop:    '(min-width: 1024px)',
          },
          (ctx) => {
            const { reduceMotion, isDesktop } = ctx.conditions!
            const d = (n: number) => reduceMotion ? 0 : n

            /* Hero entrance */
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
            tl.from('.hero-badge',  { y: -22, autoAlpha: 0, duration: d(0.5) })
              .from('.hero-title',  { y: 64,  autoAlpha: 0, duration: d(0.75), ease: 'power4.out' }, '-=0.22')
              .from('.hero-desc',   { y: 36,  autoAlpha: 0, duration: d(0.6) }, '-=0.38')
              .from('.hero-btn',    { y: 22,  autoAlpha: 0, duration: d(0.48), stagger: 0.12 }, '-=0.32')
              .from('.hero-stat',   { y: 18,  autoAlpha: 0, duration: d(0.42), stagger: 0.13 }, '-=0.28')
              .from('.hero-visual', { x: 80,  autoAlpha: 0, duration: d(0.85) }, '-=0.75')
              .from('.hcard1',      { x: 36,  autoAlpha: 0, scale: 0.88, duration: d(0.52), ease: 'back.out(1.6)' }, '-=0.42')
              .from('.hcard2',      { x: -36, autoAlpha: 0, scale: 0.88, duration: d(0.52), ease: 'back.out(1.6)' }, '-=0.44')

            /* Stat counters */
            document.querySelectorAll<HTMLElement>('.stat-num').forEach(el => {
              const target = parseInt(el.dataset.target ?? '0', 10)
              if (!target) return
              const obj = { val: 0 }
              ScrollTrigger.create({
                trigger: el, start: 'top 90%', once: true,
                onEnter: () => {
                  gsap.to(obj, {
                    val: target, duration: reduceMotion ? 0 : 1.8, ease: 'power2.out',
                    onUpdate() { el.textContent = String(Math.round(obj.val)) },
                  })
                },
              })
            })

            /* Parallax — solo en desktop para no degradar mobile perf */
            if (isDesktop && !reduceMotion) {
              gsap.to('.hero-content', {
                scrollTrigger: { trigger: '#inicio', scrub: 1.2 },
                y: 90, ease: 'none',
              })
              gsap.to('.hero-visual', {
                scrollTrigger: { trigger: '#inicio', scrub: 1.8 },
                y: 55, ease: 'none',
              })
            }
          }
        )
      })
    })
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #111827 0%, #1e2a3a 45%, #162819 100%)' }}
    >
      {/* Floating paw background */}
      <div ref={pawBgRef} className="paw-bg" />

      {/* Blurred shapes — ocultos en mobile (filter:blur es muy costoso en GPU móvil) */}
      <div className="hero-blur-shapes absolute inset-0 pointer-events-none">
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          background: 'var(--primary)', top: -250, right: -150,
          filter: 'blur(90px)', opacity: .12,
          animation: 'shapeFloat 9s ease-in-out infinite',
          willChange: 'transform',
        }} />
        <div style={{
          position: 'absolute', width: 450, height: 450, borderRadius: '50%',
          background: 'var(--accent)', bottom: -100, left: 100,
          filter: 'blur(90px)', opacity: .12,
          animation: 'shapeFloat 9s ease-in-out infinite -4s',
          willChange: 'transform',
        }} />
        <div style={{
          position: 'absolute', width: 350, height: 350, borderRadius: '50%',
          background: '#2D6A4F', top: '30%', left: -80,
          filter: 'blur(90px)', opacity: .12,
          animation: 'shapeFloat 9s ease-in-out infinite -7s',
          willChange: 'transform',
        }} />
      </div>

      {/* Content */}
      <div className="max-w-[1300px] mx-auto px-7 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-[70px] py-[130px] relative z-[1]">

        {/* Left */}
        <div className="hero-content">
          <div
            className="hero-badge inline-flex items-center gap-2 px-[18px] py-2 rounded-full text-[.76rem] font-bold tracking-[1.5px] uppercase mb-[22px]"
            style={{ background: 'rgba(255,183,3,.14)', border: '1px solid rgba(255,183,3,.28)', color: 'var(--accent)' }}
          >
            <i className="fas fa-map-marker-alt" /> Malargüe, Mendoza
          </div>

          <h1
            className="hero-title font-black text-white leading-[1.1] mb-[22px]"
            style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)' }}
          >
            Lo mejor para<br />
            tu{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              mascota
            </span>
            <br />
            está aquí
          </h1>

          <p
            className="hero-desc mb-[38px]"
            style={{ color: 'rgba(255,255,255,.65)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 520 }}
          >
            En RUPER encontrás los mejores alimentos balanceados para perros, gatos, aves y más.
            Calidad garantizada, precios accesibles y la atención personalizada que tu mascota merece.
          </p>

          <div className="flex gap-3.5 flex-wrap mb-[48px]">
            <Link
              href="#productos"
              className="hero-btn inline-flex items-center gap-2.5 font-bold text-[.98rem] text-white px-[34px] py-4 rounded-full transition-[transform,box-shadow] duration-200 hover:-translate-y-1"
              style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', boxShadow: '0 6px 22px rgba(255,107,53,.38)' }}
            >
              <i className="fas fa-store" /> Ver productos
            </Link>
            <Link
              href="/nosotros"
              className="hero-btn inline-flex items-center gap-2.5 font-semibold text-[.98rem] text-white px-[34px] py-4 rounded-full transition-[background-color,transform] duration-200 hover:-translate-y-1 hover:bg-white/15"
              style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.18)' }}
            >
              <i className="fas fa-info-circle" /> Conocenos
            </Link>
          </div>

          <div className="flex gap-9 flex-wrap" style={{ paddingTop: 36, borderTop: '1px solid rgba(255,255,255,.1)' }}>
            {[
              { target: 500, prefix: '+', label: 'Clientes felices' },
              { target: 12,  prefix: '',  suffix: '+', label: 'Años de experiencia' },
              { target: 14,  prefix: '',  suffix: '+', label: 'Marcas líderes' },
            ].map(s => (
              <div key={s.label} className="hero-stat flex flex-col gap-1">
                <span className="font-black text-white leading-none" style={{ fontSize: '2.2rem' }}>
                  {s.prefix}
                  <em className="stat-num not-italic" style={{ color: 'var(--primary)' }} data-target={s.target}>
                    {s.target}
                  </em>
                  {s.suffix ?? ''}
                </span>
                <span className="uppercase" style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.5)', letterSpacing: '1.8px' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="hero-visual hidden lg:flex items-center justify-center">
          <div className="relative w-full max-w-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=480&h=420&fit=crop&auto=format&q=80"
              alt="Perro feliz con RUPER Alimentos Balanceados"
              width={480} height={420}
              priority
              sizes="(max-width: 1024px) 0px, 480px"
              className="w-full object-cover rounded-[24px]"
              style={{ height: 420, boxShadow: '0 24px 70px rgba(0,0,0,.35)' }}
            />

            <div
              className="hcard1 absolute flex items-center gap-3 rounded-2xl"
              style={{ bottom: -18, left: -32, background: 'rgba(255,255,255,.97)', padding: '14px 18px', boxShadow: '0 10px 40px rgba(0,0,0,.15)', animation: 'floatY 3s ease-in-out infinite', willChange: 'transform' }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(45,106,79,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>✅</div>
              <div>
                <strong style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--dark)', display: 'block' }}>Entrega en Malargüe</strong>
                <span style={{ fontSize: '.7rem', color: 'var(--gray)' }}>Pedí por WhatsApp</span>
              </div>
            </div>

            <div
              className="hcard2 absolute flex items-center gap-3 rounded-2xl"
              style={{ top: -18, right: -32, background: 'rgba(255,255,255,.97)', padding: '14px 18px', boxShadow: '0 10px 40px rgba(0,0,0,.15)', animation: 'floatY 3s ease-in-out infinite -1.5s', willChange: 'transform' }}
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
