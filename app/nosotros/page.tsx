import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title:       'Nosotros — RUPER Alimentos Balanceados',
  description: 'Conocé la historia de RUPER, tu tienda de confianza en Malargüe. Más de 10 años cuidando a las mascotas de la comunidad.',
}

export default function NosotrosPage() {
  return (
    <div className="min-h-screen pt-20">

      {/* Hero */}
      <div className="relative py-24 bg-gradient-to-br from-[var(--dark)] to-[var(--dark-2)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[.06]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1600&q=60&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 max-w-[900px] mx-auto px-7 text-center">
          <div className="inline-flex items-center gap-2 bg-[var(--primary)]/20 text-[var(--primary-light)] border border-[var(--primary)]/20 px-4 py-2 rounded-full text-[.78rem] font-bold tracking-wider uppercase mb-6">
            <i className="fas fa-paw" /> Nuestra Historia
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-5">Somos RUPER</h1>
          <p className="text-white/65 text-[1rem] leading-relaxed max-w-[640px] mx-auto">
            Más de 10 años acompañando a las familias de Malargüe con los mejores alimentos para sus mascotas.
          </p>
        </div>
      </div>

      {/* Historia */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[var(--primary)]/8 text-[var(--primary)] px-[18px] py-2 rounded-full text-[.74rem] font-bold uppercase tracking-[1.5px] mb-5">
              <i className="fas fa-store" /> Quiénes somos
            </div>
            <h2 className="text-3xl font-black text-[var(--dark)] mb-5">Un negocio familiar con pasión por los animales</h2>
            <p className="text-[var(--gray)] leading-relaxed mb-4">
              RUPER nació hace más de 10 años en Malargüe con una misión clara: brindar a cada mascota la mejor nutrición posible. Somos un local familiar que creció junto a la comunidad, ganándose la confianza de cientos de familias.
            </p>
            <p className="text-[var(--gray)] leading-relaxed mb-4">
              Hoy somos el punto de referencia en alimentos balanceados de Malargüe, ofreciendo las mejores marcas del mercado y un servicio personalizado que nos distingue de cualquier otro local.
            </p>
            <p className="text-[var(--gray)] leading-relaxed">
              Creemos que cada mascota merece lo mejor, y eso se refleja en cada producto que elegimos y en el trato que le damos a cada uno de nuestros clientes.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-lg)]">
            <Image
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=450&fit=crop"
              alt="RUPER Alimentos Balanceados"
              width={600} height={450}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[var(--primary)]">
        <div className="max-w-[900px] mx-auto px-7 grid grid-cols-3 gap-8 text-center">
          {[
            { n: '+500', l: 'Clientes felices' },
            { n: '12+',  l: 'Años de experiencia' },
            { n: '14+',  l: 'Marcas líderes' },
          ].map(s => (
            <div key={s.l}>
              <div className="text-[2.4rem] font-black text-white">{s.n}</div>
              <div className="text-white/70 text-[.85rem] font-medium mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--light)] text-center">
        <div className="max-w-[600px] mx-auto px-7">
          <h2 className="text-3xl font-black text-[var(--dark)] mb-4">¿Listo para conocernos?</h2>
          <p className="text-[var(--gray)] mb-8 leading-relaxed">Visitanos en cualquiera de nuestros dos locales o escribinos por WhatsApp.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contacto" className="flex items-center justify-center gap-2 bg-[var(--primary)] text-white font-bold px-8 py-4 rounded-full hover:bg-[var(--primary-dark)] transition-all hover:-translate-y-0.5">
              <i className="fas fa-map-marker-alt" /> Ver locales
            </Link>
            <a href={`https://wa.me/${CONFIG.WA_NUMBER}`} target="_blank" rel="noopener"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-8 py-4 rounded-full hover:bg-[#1ebe5d] transition-all hover:-translate-y-0.5">
              <i className="fab fa-whatsapp" /> Escribinos
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
