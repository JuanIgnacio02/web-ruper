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
    <section className="qs-section grid grid-cols-1 md:grid-cols-2 min-h-[560px] overflow-hidden">
      {/* Historia */}
      <div
        className="qs-left relative flex items-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&q=80&fit=crop')",
          padding: '80px 60px',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,107,53,.82) 0%, rgba(180,50,10,.70) 100%)' }} />
        <div className="relative z-10">
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
                <div className="text-[1.8rem] font-black text-white">{s.n}</div>
                <div className="text-white/55 text-[.72rem] font-medium">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Valores */}
      <div
        className="qs-right relative flex items-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=900&q=80&fit=crop')",
          padding: '80px 60px',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(27,27,47,.88) 0%, rgba(45,106,79,.75) 100%)' }} />
        <div className="relative z-10 w-full">
          <div className="inline-flex items-center gap-2 bg-[var(--accent)]/25 text-[var(--accent)] border border-[var(--accent)]/20 px-4 py-1.5 rounded-full text-[.72rem] font-bold uppercase tracking-wider mb-4">
            <i className="fas fa-star" /> Nuestra Promesa
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">Por qué<br />elegirnos</h2>
          <div className="flex flex-col gap-3">
            {[
              { icon: 'fa-certificate', title: 'Calidad garantizada',      desc: 'Solo productos originales con distribuidores oficiales' },
              { icon: 'fa-heart',       title: 'Atención personalizada',   desc: 'Te asesoramos para elegir el mejor alimento' },
              { icon: 'fa-truck',       title: 'Entrega en Malargüe',      desc: 'Llevamos tu pedido donde estés en la ciudad' },
              { icon: 'fa-tags',        title: 'Precios accesibles',       desc: 'Los mejores precios sin comprometer la calidad' },
            ].map(v => (
              <div
                key={v.title}
                className="flex items-start gap-3 transition-all duration-300 hover:translate-x-[5px]"
                style={{
                  background: 'rgba(255,255,255,.07)',
                  border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: '14px',
                  padding: '18px 20px',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.12)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.07)')}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center text-white text-sm"
                  style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,255,255,.15)' }}
                >
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
