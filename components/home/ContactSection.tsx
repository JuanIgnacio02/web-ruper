'use client'
import { useEffect } from 'react'
import { CONFIG } from '@/lib/config'

export default function ContactSection() {
  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.from('.contact-left', {
        scrollTrigger: { trigger: '.contact', start: 'top 80%', once: true },
        x: -52, opacity: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all',
      })
      gsap.from('.contact-maps', {
        scrollTrigger: { trigger: '.contact', start: 'top 80%', once: true },
        x: 52, opacity: 0, duration: 0.8, delay: 0.14, ease: 'power3.out', clearProps: 'all',
      })
    })
  }, [])

  const ITEMS = [
    {
      ico: 'fa-map-marker-alt',
      iconStyle: { background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' },
      title: 'Local 1 — Ortega',
      content: 'Av. Rufino Ortega 602, Malargüe, Mendoza',
      link: { href: 'https://maps.google.com/?q=Av.+Rufino+Ortega+602,+Malargüe,+Mendoza', label: '📍 Ver en Google Maps →' },
      isFab: false,
    },
    {
      ico: 'fa-map-marker-alt',
      iconStyle: { background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' },
      title: 'Local 2 — Maza',
      content: 'Av. Juan Agustín Maza 2249, Malargüe, Mendoza',
      link: { href: 'https://maps.google.com/?q=Av.+Juan+Agustín+Maza+2249,+Malargüe,+Mendoza', label: '📍 Ver en Google Maps →' },
      isFab: false,
    },
    {
      ico: 'fa-whatsapp',
      iconStyle: { background: 'linear-gradient(135deg, #25D366, #128C7E)' },
      title: 'WhatsApp',
      content: `+54 9 2604 34-2179 · Pedidos y consultas`,
      link: { href: `https://wa.me/${CONFIG.WA_NUMBER}`, label: 'Escribinos →' },
      isFab: true,
    },
    {
      ico: 'fa-clock',
      iconStyle: { background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' },
      title: 'Horario de atención',
      content: 'Lun–Vie: 8:30 a 13:00 · 17:00 a 21:00 | Sáb: 9:00 a 13:00',
      isFab: false,
    },
    {
      ico: 'fa-instagram',
      iconStyle: { background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' },
      title: 'Instagram',
      content: '@ruper_malargue',
      link: { href: 'https://www.instagram.com/ruper_malargue/', label: 'Seguinos →' },
      isFab: true,
    },
  ]

  return (
    <section id="contacto" className="contact py-24 bg-white">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Info */}
          <div className="contact-left">
            <div className="inline-flex items-center gap-2 bg-[var(--primary)]/8 text-[var(--primary)] px-[18px] py-2 rounded-full text-[.74rem] font-bold uppercase tracking-[1.5px] mb-4">
              <i className="fas fa-map-marker-alt" /> Encontranos
            </div>
            <h2 className="text-[clamp(1.8rem,2.5vw,2.4rem)] font-black text-[var(--dark)] mb-4">Estamos en el corazón de Malargüe</h2>
            <p className="text-[var(--gray)] text-[.96rem] leading-relaxed mb-8">
              Visitanos en nuestro local o contactanos por WhatsApp. Estamos disponibles de lunes a sábado para atenderte.
            </p>

            <div className="flex flex-col gap-4">
              {ITEMS.map(item => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 transition-transform duration-300 hover:translate-x-[5px]"
                  style={{ background: 'var(--light)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center text-white"
                    style={{ width: '46px', height: '46px', borderRadius: '12px', ...item.iconStyle }}
                  >
                    <i className={`${item.isFab ? 'fab' : 'fas'} ${item.ico}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--dark)] text-[.9rem] mb-0.5">{item.title}</h4>
                    <p className="text-[var(--gray)] text-[.85rem]">{item.content}</p>
                    {item.link && (
                      <a href={item.link.href} target="_blank" rel="noopener" className="text-[.78rem] text-[var(--primary)] hover:underline mt-0.5 inline-block">
                        {item.link.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mapas */}
          <div className="contact-maps flex flex-col gap-3">
            {[
              { label: '📍 Local 1 — Av. Rufino Ortega 602', q: 'Av.+Rufino+Ortega+602,+Malarg%C3%BCe,+Mendoza,+Argentina' },
              { label: '📍 Local 2 — Av. Juan Agustín Maza 2249', q: 'Av.+Juan+Agust%C3%ADn+Maza+2249,+Malarg%C3%BCe,+Mendoza,+Argentina' },
            ].map(m => (
              <div key={m.q} className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,.1)]">
                <div className="bg-[var(--light)] px-3.5 py-2 text-[.75rem] font-bold text-[#555]">{m.label}</div>
                <iframe
                  src={`https://maps.google.com/maps?q=${m.q}&output=embed`}
                  width="100%" height="200"
                  style={{ border: 'none', display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={m.label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
