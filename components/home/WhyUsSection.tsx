'use client'
import { useEffect } from 'react'

const FEATURES = [
  { icon: 'fa-certificate', title: 'Productos 100% originales',    desc: 'Trabajamos exclusivamente con distribuidores oficiales. Todos nuestros productos cuentan con garantía de autenticidad y fecha de vencimiento vigente.' },
  { icon: 'fa-user-md',     title: 'Asesoramiento especializado',  desc: 'Nuestro equipo te guía para elegir el alimento ideal según la raza, edad, tamaño y necesidades especiales de tu mascota.' },
  { icon: 'fa-truck',       title: 'Entrega a domicilio',          desc: 'Realizamos entregas a domicilio dentro de Malargüe. Pedí por WhatsApp y coordinamos la entrega en el horario que más te convenga.' },
  { icon: 'fa-tags',        title: 'Precios accesibles',           desc: 'Ofrecemos los mejores precios del mercado local, con promos especiales para clientes frecuentes y descuentos por volumen de compra.' },
  { icon: 'fa-boxes',       title: 'Amplia variedad',              desc: 'Contamos con alimentos para perros, gatos, aves, peces, conejos y más. Más de 8 marcas líderes disponibles en stock permanente.' },
  { icon: 'fa-heart',       title: 'Pasión por los animales',      desc: 'Somos una empresa familiar con amor por los animales. Eso se refleja en cada producto que elegimos y en el trato que le damos a cada cliente.' },
]

export default function WhyUsSection() {
  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.from('.feat-card', {
        scrollTrigger: { trigger: '.feat-grid', start: 'top 80%', once: true },
        y: 52, opacity: 0, scale: 0.94, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)', clearProps: 'all',
      })
    })
  }, [])

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[var(--dark)] to-[var(--dark-2)]">
      <div className="absolute -right-48 -top-48 w-[600px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[var(--primary)]/12 text-[var(--primary-light)] px-[18px] py-2 rounded-full text-[.74rem] font-bold uppercase tracking-[1.5px] mb-3.5">
            <i className="fas fa-award" /> Por qué elegirnos
          </div>
          <h2 className="text-[clamp(1.8rem,2.8vw,2.7rem)] font-black text-white mb-3.5">Más de 10 años cuidando a tus mascotas</h2>
          <p className="text-[.96rem] text-white/50 max-w-[580px] mx-auto leading-relaxed">
            RUPER es un local de referencia en Malargüe, reconocido por la comunidad por su calidad, variedad y atención al cliente.
          </p>
        </div>

        <div className="feat-grid grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {FEATURES.map(f => (
            <div key={f.title} className="feat-card relative overflow-hidden bg-white/4 border border-white/7 rounded-[var(--radius)] p-8 hover:bg-white/7 hover:border-[var(--primary)]/30 hover:-translate-y-1 transition-all group after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-gradient-to-r after:from-[var(--primary)] after:to-[var(--accent)] after:transition-all after:duration-500 hover:after:w-full">
              <div style={{
                width: '58px', height: '58px', borderRadius: '16px',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', color: '#fff', marginBottom: '20px',
                boxShadow: '0 6px 20px rgba(255,107,53,.28)',
              }}>
                <i className={`fas ${f.icon}`} />
              </div>
              <h3 className="text-white font-bold text-[1rem] mb-2">{f.title}</h3>
              <p className="text-white/50 text-[.85rem] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
