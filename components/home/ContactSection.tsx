'use client'
import { useEffect } from 'react'
import { CONFIG } from '@/lib/config'

const ITEMS = [
  {
    ico: 'fa-map-marker-alt', fab: false,
    gradient: 'linear-gradient(135deg,var(--primary),var(--primary-dark))',
    title: 'Local 1 — Ortega',
    content: 'Av. Rufino Ortega 602, Malargüe, Mendoza',
    link: { href: 'https://maps.google.com/?q=Av.+Rufino+Ortega+602,+Malargüe,+Mendoza', label: 'Ver en Maps →' },
  },
  {
    ico: 'fa-map-marker-alt', fab: false,
    gradient: 'linear-gradient(135deg,var(--primary),var(--primary-dark))',
    title: 'Local 2 — Maza',
    content: 'Av. Juan Agustín Maza 2249, Malargüe, Mendoza',
    link: { href: 'https://maps.google.com/?q=Av.+Juan+Agustín+Maza+2249,+Malargüe,+Mendoza', label: 'Ver en Maps →' },
  },
  {
    ico: 'fa-whatsapp', fab: true,
    gradient: 'linear-gradient(135deg,#25D366,#128C7E)',
    title: 'WhatsApp',
    content: '+54 9 2604 34-2179 · Pedidos y consultas',
    link: { href: `https://wa.me/${CONFIG.WA_NUMBER}`, label: 'Escribinos →' },
  },
  {
    ico: 'fa-clock', fab: false,
    gradient: 'linear-gradient(135deg,var(--primary),var(--primary-dark))',
    title: 'Horario de atención',
    content: 'Lun–Vie: 8:30–13:00 / 17:00–21:00 · Sáb: 9:00–13:00',
  },
  {
    ico: 'fa-instagram', fab: true,
    gradient: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
    title: 'Instagram',
    content: '@ruper_malargue',
    link: { href: 'https://www.instagram.com/ruper_malargue/', label: 'Seguinos →' },
  },
]

const MAPS = [
  { label: 'Local 1 — Av. Rufino Ortega 602', q: 'Av.+Rufino+Ortega+602,+Malarg%C3%BCe,+Mendoza,+Argentina' },
  { label: 'Local 2 — Av. Juan Agustín Maza 2249', q: 'Av.+Juan+Agust%C3%ADn+Maza+2249,+Malarg%C3%BCe,+Mendoza,+Argentina' },
]

export default function ContactSection() {
  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      /* Columns slide in */
      gsap.from('.ct-left', {
        scrollTrigger: { trigger: '#contacto', start: 'top 78%', once: true },
        x: -60, opacity: 0, duration: 0.85, ease: 'power3.out', clearProps: 'all',
      })
      gsap.from('.ct-right', {
        scrollTrigger: { trigger: '#contacto', start: 'top 78%', once: true },
        x: 60, opacity: 0, duration: 0.85, delay: 0.12, ease: 'power3.out', clearProps: 'all',
      })

      /* Contact items stagger with batch */
      ScrollTrigger.batch('.ct-item', {
        start: 'top 90%',
        once: true,
        onEnter: (els) => gsap.from(els, {
          x: -28, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out', clearProps: 'all',
        }),
      })

      /* Maps fade up */
      ScrollTrigger.batch('.ct-map', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.from(els, {
          y: 36, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', clearProps: 'all',
        }),
      })
    })
  }, [])

  return (
    <section
      id="contacto"
      className="relative overflow-hidden py-28"
      style={{ background: 'var(--dark-2)' }}
    >
      {/* Blurred accent blob */}
      <div style={{
        position: 'absolute', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(255,107,53,.12) 0%,transparent 70%)',
        top: -120, right: -120, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(45,106,79,.1) 0%,transparent 70%)',
        bottom: -80, left: -80, pointerEvents: 'none',
      }} />

      <div className="max-w-[1300px] mx-auto px-7 relative z-10">

        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[.74rem] font-bold uppercase tracking-[1.5px] mb-4"
            style={{ background: 'rgba(255,107,53,.12)', color: 'var(--primary-light)', border: '1px solid rgba(255,107,53,.2)' }}>
            <i className="fas fa-map-marker-alt" /> Encontranos
          </div>
          <h2 className="font-black text-white mb-3" style={{ fontSize: 'clamp(1.8rem,2.8vw,2.6rem)' }}>
            Estamos en el corazón de Malargüe
          </h2>
          <p className="text-[.96rem] max-w-[520px] mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,.55)' }}>
            Visitanos en nuestros locales o contactanos por WhatsApp y redes sociales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Info cards ── */}
          <div className="ct-left flex flex-col gap-4">
            {ITEMS.map(item => (
              <div
                key={item.title}
                className="ct-item group flex items-center gap-4 rounded-[14px] transition-all duration-300 hover:translate-x-1.5"
                style={{
                  background: 'rgba(255,255,255,.05)',
                  border: '1px solid rgba(255,255,255,.09)',
                  padding: '16px 20px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 flex items-center justify-center text-white text-[1.05rem]"
                  style={{ width: 48, height: 48, borderRadius: 14, background: item.gradient, boxShadow: '0 4px 16px rgba(0,0,0,.25)' }}
                >
                  <i className={`${item.fab ? 'fab' : 'fas'} ${item.ico}`} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-[.9rem] mb-0.5">{item.title}</h4>
                  <p className="text-[.83rem] leading-relaxed" style={{ color: 'rgba(255,255,255,.5)' }}>{item.content}</p>
                  {item.link && (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[.76rem] font-semibold inline-flex items-center gap-1 mt-1 transition-all hover:gap-2"
                      style={{ color: 'var(--primary-light)' }}
                    >
                      {item.link.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Maps ── */}
          <div className="ct-right flex flex-col gap-4">
            {MAPS.map(m => (
              <div
                key={m.q}
                className="ct-map rounded-[18px] overflow-hidden"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,.35)', border: '1px solid rgba(255,255,255,.08)' }}
              >
                <div
                  className="px-4 py-2.5 flex items-center gap-2 text-[.74rem] font-bold"
                  style={{ background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.7)' }}
                >
                  <i className="fas fa-map-marker-alt text-[var(--primary)] text-[.7rem]" />
                  {m.label}
                </div>
                <iframe
                  src={`https://maps.google.com/maps?q=${m.q}&output=embed`}
                  width="100%" height="210"
                  style={{ border: 'none', display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={m.label}
                />
              </div>
            ))}

            {/* WhatsApp CTA card */}
            <a
              href={`https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent('Hola RUPER! 🐾 Quiero hacer un pedido.')}`}
              target="_blank" rel="noopener noreferrer"
              className="ct-map group flex items-center gap-4 rounded-[18px] p-5 transition-all hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg,rgba(37,211,102,.15),rgba(18,140,126,.15))',
                border: '1px solid rgba(37,211,102,.25)',
                boxShadow: '0 4px 24px rgba(37,211,102,.12)',
              }}
            >
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-white text-[1.3rem] flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', boxShadow: '0 4px 16px rgba(37,211,102,.35)' }}>
                <i className="fab fa-whatsapp" />
              </div>
              <div>
                <div className="font-bold text-white text-[.92rem]">Hacé tu pedido ahora</div>
                <div className="text-[.8rem]" style={{ color: 'rgba(255,255,255,.55)' }}>Respondemos rápido · Sin turnos</div>
              </div>
              <i className="fas fa-arrow-right ml-auto text-[var(--primary-light)] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
