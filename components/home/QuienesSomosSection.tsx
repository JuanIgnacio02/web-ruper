'use client'
import { useEffect } from 'react'

export default function QuienesSomosSection() {
  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.from('.qs-left', {
        scrollTrigger: { trigger: '.qs-section', start: 'top 80%', once: true },
        x: -70, opacity: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity',
      })
      gsap.from('.qs-right', {
        scrollTrigger: { trigger: '.qs-section', start: 'top 80%', once: true },
        x: 70, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out', clearProps: 'transform,opacity',
      })

      // Parallax fondos
      ;['.qs-left', '.qs-right'].forEach(sel => {
        gsap.to(sel, {
          scrollTrigger: { trigger: sel, scrub: 1.8 },
          backgroundPositionY: '+=50px',
          ease: 'none',
        })
      })
    })
  }, [])

  return (
    <section className="qs-section flex flex-col md:flex-row min-h-[600px]">
      {/* Historia */}
      <div
        className="qs-left flex-1 relative flex items-end bg-cover bg-center min-h-[360px] md:min-h-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&q=80&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="relative z-10 p-10 md:p-14">
          <div className="inline-flex items-center gap-2 bg-[var(--primary)]/25 text-[var(--primary-light)] border border-[var(--primary)]/20 px-4 py-1.5 rounded-full text-[.72rem] font-bold uppercase tracking-wider mb-4">
            <i className="fas fa-paw" /> Nuestra Historia
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">Quiénes<br />Somos</h2>
          <p className="text-white/70 text-[.92rem] leading-relaxed mb-3 max-w-[420px]">
            RUPER nació hace más de 10 años en Malargüe con una misión clara: brindar a cada mascota la mejor nutrición posible.
          </p>
          <p className="text-white/70 text-[.92rem] leading-relaxed max-w-[420px]">
            Hoy somos el punto de referencia en alimentos balanceados de Malargüe, ofreciendo las mejores marcas y un servicio personalizado que nos distingue.
          </p>
          <div className="flex gap-8 mt-8">
            {[{ n: '+500', l: 'Clientes felices' }, { n: '12+', l: 'Años de exp.' }, { n: '14+', l: 'Marcas líderes' }].map(s => (
              <div key={s.l}>
                <div className="text-[1.8rem] font-black text-[var(--primary)]">{s.n}</div>
                <div className="text-white/55 text-[.72rem] font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Valores */}
      <div
        className="qs-right flex-1 relative flex items-end bg-cover bg-center min-h-[360px] md:min-h-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=900&q=80&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        <div className="relative z-10 p-10 md:p-14 w-full">
          <div className="inline-flex items-center gap-2 bg-[var(--accent)]/25 text-[var(--accent)] border border-[var(--accent)]/20 px-4 py-1.5 rounded-full text-[.72rem] font-bold uppercase tracking-wider mb-4">
            <i className="fas fa-star" /> Nuestra Promesa
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">Por qué<br />elegirnos</h2>
          <div className="flex flex-col gap-4">
            {[
              { icon: 'fa-certificate', title: 'Calidad garantizada',      desc: 'Solo productos originales con distribuidores oficiales' },
              { icon: 'fa-heart',       title: 'Atención personalizada',   desc: 'Te asesoramos para elegir el mejor alimento' },
              { icon: 'fa-truck',       title: 'Entrega en Malargüe',      desc: 'Llevamos tu pedido donde estés en la ciudad' },
              { icon: 'fa-tags',        title: 'Precios accesibles',       desc: 'Los mejores precios sin comprometer la calidad' },
            ].map(v => (
              <div key={v.title} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-[var(--primary)]/20 rounded-lg flex items-center justify-center text-[var(--primary)] flex-shrink-0 text-sm mt-0.5">
                  <i className={`fas ${v.icon}`} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-[.9rem] mb-0.5">{v.title}</h4>
                  <p className="text-white/55 text-[.8rem]">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
