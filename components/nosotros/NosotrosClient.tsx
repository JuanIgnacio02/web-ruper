'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CONFIG } from '@/lib/config'

const VALUES = [
  { ico: 'fa-heart',       title: 'Pasión por los animales',   desc: 'Cada producto que ofrecemos lo elegimos pensando en el bienestar de tu mascota, no solo en el precio.' },
  { ico: 'fa-medal',       title: 'Calidad garantizada',       desc: 'Trabajamos solo con las marcas líderes del mercado. Si no lo usaríamos para nuestra mascota, no lo vendemos.' },
  { ico: 'fa-users',       title: 'Atención personalizada',    desc: 'Conocemos a nuestros clientes y sus mascotas por nombre. No sos un número, sos parte de nuestra familia.' },
  { ico: 'fa-map-marker-alt', title: 'Raíces en Malargüe',    desc: 'Somos un negocio local que reinvierte en la comunidad. Tu compra apoya a una familia malargüina.' },
]

const STATS = [
  { target: 500, prefix: '+', label: 'Clientes felices' },
  { target: 12,  suffix: '+', label: 'Años de experiencia' },
  { target: 14,  suffix: '+', label: 'Marcas líderes' },
  { target: 2,              label: 'Locales en Malargüe' },
]

export default function NosotrosClient() {
  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      /* ── Hero entrance ── */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      heroTl
        .from('.nos-badge',  { y: -20, opacity: 0, duration: 0.5 })
        .from('.nos-h1',     { y: 50,  opacity: 0, duration: 0.75, ease: 'power4.out' }, '-=0.25')
        .from('.nos-sub',    { y: 30,  opacity: 0, duration: 0.55 }, '-=0.35')

      /* ── Story section ── */
      gsap.from('.nos-story-img', {
        scrollTrigger: { trigger: '.nos-story', start: 'top 78%', once: true },
        x: -70, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'all',
      })
      gsap.from('.nos-story-text', {
        scrollTrigger: { trigger: '.nos-story', start: 'top 78%', once: true },
        x: 70, opacity: 0, duration: 0.9, delay: 0.12, ease: 'power3.out', clearProps: 'all',
      })
      gsap.from('.nos-story-p', {
        scrollTrigger: { trigger: '.nos-story', start: 'top 72%', once: true },
        y: 24, opacity: 0, duration: 0.5, stagger: 0.13, ease: 'power3.out', clearProps: 'all',
      })

      /* ── Stats counters ── */
      document.querySelectorAll<HTMLElement>('.nos-stat-num').forEach(el => {
        const target = parseInt(el.dataset.target ?? '0', 10)
        if (!target) return
        const obj = { val: 0 }
        ScrollTrigger.create({
          trigger: el, start: 'top 90%', once: true,
          onEnter: () => gsap.to(obj, {
            val: target, duration: 1.8, ease: 'power2.out',
            onUpdate() { el.textContent = String(Math.round(obj.val)) },
          }),
        })
      })

      /* ── Values cards ── */
      ScrollTrigger.batch('.nos-value', {
        start: 'top 88%', once: true,
        onEnter: (els) => gsap.from(els, {
          y: 52, opacity: 0, scale: 0.94, duration: 0.6, stagger: 0.12,
          ease: 'back.out(1.4)', clearProps: 'all',
        }),
      })

      /* ── CTA ── */
      gsap.from('.nos-cta-inner', {
        scrollTrigger: { trigger: '.nos-cta', start: 'top 82%', once: true },
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', clearProps: 'all',
      })
    })
  }, [])

  return (
    <div className="min-h-screen">

      {/* ════════════════ HERO ════════════════ */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          minHeight: 480,
          background: 'linear-gradient(135deg,#111827 0%,#1e2a3a 50%,#162819 100%)',
          paddingTop: 96, paddingBottom: 80,
        }}
      >
        {/* Bg image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1600&q=60&fit=crop"
            alt="bg"
            fill
            className="object-cover opacity-[.08]"
            priority
          />
        </div>
        {/* Blobs */}
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,107,53,.14) 0%,transparent 70%)', top: -200, right: -100, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(45,106,79,.12) 0%,transparent 70%)', bottom: -100, left: -80, pointerEvents: 'none' }} />

        <div className="relative z-10 text-center px-7 max-w-[820px] mx-auto">
          <div
            className="nos-badge inline-flex items-center gap-2 px-5 py-2 rounded-full text-[.76rem] font-bold uppercase tracking-[1.5px] mb-6"
            style={{ background: 'rgba(255,107,53,.18)', color: 'var(--primary-light)', border: '1px solid rgba(255,107,53,.25)' }}
          >
            <i className="fas fa-paw" /> Nuestra Historia
          </div>

          <h1
            className="nos-h1 font-black text-white leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(2.4rem,5vw,3.8rem)' }}
          >
            Somos <span style={{ background: 'linear-gradient(135deg,var(--primary),var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>RUPER</span>
          </h1>

          <p
            className="nos-sub text-[1rem] leading-relaxed max-w-[580px] mx-auto"
            style={{ color: 'rgba(255,255,255,.62)' }}
          >
            Más de 12 años acompañando a las familias de Malargüe con los mejores
            alimentos para sus mascotas. Un negocio que nació del amor por los animales.
          </p>
        </div>
      </div>

      {/* ════════════════ NUESTRA HISTORIA ════════════════ */}
      <section className="nos-story py-24 bg-white">
        <div className="max-w-[1160px] mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="nos-story-img relative">
            <div className="rounded-[24px] overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,.15)]">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=680&h=520&fit=crop"
                alt="RUPER Alimentos Balanceados"
                width={680} height={520}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-5 -right-5 flex items-center gap-3 rounded-[18px] px-5 py-4 shadow-xl"
              style={{ background: 'white', border: '1px solid var(--border)' }}
            >
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-white text-[1.3rem]"
                style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-dark))' }}>
                🐾
              </div>
              <div>
                <div className="font-black text-[var(--dark)] text-[1rem]">+12 años</div>
                <div className="text-[.74rem] text-[var(--gray)]">en Malargüe</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="nos-story-text">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[.74rem] font-bold uppercase tracking-[1.5px] mb-5"
              style={{ background: 'rgba(255,107,53,.08)', color: 'var(--primary)', border: '1px solid rgba(255,107,53,.15)' }}
            >
              <i className="fas fa-store" /> Quiénes somos
            </div>

            <h2 className="font-black text-[var(--dark)] leading-tight mb-6" style={{ fontSize: 'clamp(1.7rem,2.8vw,2.3rem)' }}>
              Un negocio familiar con<br />
              <span style={{ color: 'var(--primary)' }}>pasión por los animales</span>
            </h2>

            <p className="nos-story-p text-[.95rem] leading-relaxed mb-4" style={{ color: 'var(--gray)' }}>
              RUPER nació hace más de 12 años en Malargüe con una misión clara: brindar a cada
              mascota la mejor nutrición posible. Somos un local familiar que creció junto a la
              comunidad, ganándose la confianza de cientos de familias.
            </p>
            <p className="nos-story-p text-[.95rem] leading-relaxed mb-4" style={{ color: 'var(--gray)' }}>
              Hoy somos el punto de referencia en alimentos balanceados de Malargüe, ofreciendo
              las mejores marcas del mercado y un servicio personalizado que nos distingue.
            </p>
            <p className="nos-story-p text-[.95rem] leading-relaxed mb-8" style={{ color: 'var(--gray)' }}>
              Creemos que cada mascota merece lo mejor, y eso se refleja en cada producto
              que elegimos y en el trato que le damos a cada uno de nuestros clientes.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#productos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-[.9rem] transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', boxShadow: '0 6px 22px rgba(255,107,53,.35)' }}
              >
                <i className="fas fa-store" /> Ver productos
              </Link>
              <a
                href={`https://wa.me/${CONFIG.WA_NUMBER}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-[.9rem] transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', boxShadow: '0 6px 20px rgba(37,211,102,.3)' }}
              >
                <i className="fab fa-whatsapp" /> Escribinos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ STATS ════════════════ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,var(--dark) 0%,var(--dark-2) 100%)' }}
      >
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,107,53,.1) 0%,transparent 70%)', right: -150, top: -150, pointerEvents: 'none' }} />
        <div className="max-w-[1000px] mx-auto px-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="font-black leading-none mb-2" style={{ fontSize: '2.8rem', color: '#fff' }}>
                  {s.prefix}
                  <em
                    className="nos-stat-num not-italic"
                    style={{ color: 'var(--primary)' }}
                    data-target={s.target}
                  >
                    {s.target}
                  </em>
                  {s.suffix ?? ''}
                </div>
                <div
                  className="font-medium uppercase tracking-[1.5px]"
                  style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.5)' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ VALORES ════════════════ */}
      <section className="py-24" style={{ background: 'var(--light)' }}>
        <div className="max-w-[1160px] mx-auto px-7">
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[.74rem] font-bold uppercase tracking-[1.5px] mb-4"
              style={{ background: 'rgba(255,107,53,.08)', color: 'var(--primary)', border: '1px solid rgba(255,107,53,.15)' }}
            >
              <i className="fas fa-star" /> Lo que nos mueve
            </div>
            <h2 className="font-black text-[var(--dark)]" style={{ fontSize: 'clamp(1.7rem,2.8vw,2.3rem)' }}>
              Nuestros valores
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(v => (
              <div
                key={v.title}
                className="nos-value group rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                style={{ background: 'white', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}
              >
                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: 'linear-gradient(90deg,var(--primary),var(--accent))' }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-[16px] flex items-center justify-center text-white text-[1.35rem] mb-5"
                  style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', boxShadow: '0 6px 20px rgba(255,107,53,.28)' }}
                >
                  <i className={`fas ${v.ico}`} />
                </div>

                <h3 className="font-bold text-[var(--dark)] text-[.97rem] mb-2.5 leading-snug">{v.title}</h3>
                <p className="text-[.83rem] leading-relaxed" style={{ color: 'var(--gray)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ CTA ════════════════ */}
      <section className="nos-cta py-24 bg-white">
        <div className="max-w-[700px] mx-auto px-7 text-center nos-cta-inner">
          <div className="text-5xl mb-5">🐾</div>
          <h2 className="font-black text-[var(--dark)] mb-4" style={{ fontSize: 'clamp(1.7rem,2.8vw,2.4rem)' }}>
            ¿Listo para conocernos?
          </h2>
          <p className="text-[.97rem] leading-relaxed mb-9" style={{ color: 'var(--gray)' }}>
            Visitanos en cualquiera de nuestros dos locales o escribinos por WhatsApp.
            Estamos para ayudarte a elegir el mejor alimento para tu mascota.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#contacto"
              className="flex items-center justify-center gap-2 font-bold text-white px-8 py-4 rounded-full transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', boxShadow: '0 6px 22px rgba(255,107,53,.35)' }}
            >
              <i className="fas fa-map-marker-alt" /> Ver locales
            </Link>
            <a
              href={`https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent('Hola RUPER! 🐾 Quiero consultar sobre sus productos.')}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 font-bold text-white px-8 py-4 rounded-full transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', boxShadow: '0 6px 20px rgba(37,211,102,.3)' }}
            >
              <i className="fab fa-whatsapp" /> Escribinos
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
