import Link from 'next/link'
import Image from 'next/image'
import { CONFIG } from '@/lib/config'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--dark)] text-white pt-16 pb-8">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4 no-underline">
              <Image src="/img/logo.png" alt="RUPER" width={50} height={50} className="rounded-full" />
              <div>
                <div className="font-[var(--font-fredoka)] text-white tracking-[2px] text-[1.35rem]">ruper</div>
                <div className="text-white/50 text-[.7rem]">Alimentos Balanceados</div>
              </div>
            </Link>
            <p className="text-white/50 text-[.85rem] leading-relaxed mb-5">
              Tu tienda de confianza en Malargüe. Más de 10 años acompañando a las familias y sus mascotas.
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://www.instagram.com/ruper_malargue/', icon: 'fa-instagram', label: 'Instagram' },
                { href: 'https://www.facebook.com/juan.ruper.5',     icon: 'fa-facebook-f', label: 'Facebook' },
                { href: `https://wa.me/${CONFIG.WA_NUMBER}`,         icon: 'fa-whatsapp',   label: 'WhatsApp' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
                  className="w-9 h-9 bg-white/10 hover:bg-[var(--primary)] rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all text-sm">
                  <i className={`fab ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-white font-bold text-[.82rem] uppercase tracking-wider mb-4">Navegación</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: '/',          label: 'Inicio' },
                { href: '/#productos',label: 'Productos' },
                { href: '/nosotros',  label: 'Nosotros' },
                { href: '/contacto',  label: 'Contacto' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-[.85rem] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marcas */}
          <div>
            <h4 className="text-white font-bold text-[.82rem] uppercase tracking-wider mb-4">Marcas</h4>
            <ul className="flex flex-col gap-2.5">
              {['Pro Plan', 'Dog Selection', 'Agility', 'Eukanuba', 'Dog Chow / Cat Chow', 'Gran Campeón'].map(m => (
                <li key={m}><span className="text-white/50 text-[.85rem]">{m}</span></li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-bold text-[.82rem] uppercase tracking-wider mb-4">Contacto</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/contacto" className="text-white/50 hover:text-white text-[.85rem] transition-colors">📍 Av. Rufino Ortega 602, Malargüe</Link></li>
              <li><a href={`https://wa.me/${CONFIG.WA_NUMBER}`} target="_blank" rel="noopener" className="text-white/50 hover:text-white text-[.85rem] transition-colors">📱 WhatsApp</a></li>
              <li><a href="https://www.instagram.com/ruper_malargue/" target="_blank" rel="noopener" className="text-white/50 hover:text-white text-[.85rem] transition-colors">📷 Instagram</a></li>
              <li><span className="text-white/40 text-[.85rem]">🕐 Lun–Vie: 8:30–21:00</span></li>
              <li><span className="text-white/40 text-[.85rem]">🕐 Sáb: 9:00–13:00</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/30 text-[.78rem]">
          <p>© {year} RUPER Alimentos Balanceados · Malargüe, Mendoza · Todos los derechos reservados</p>
          <p>Hecho con ❤️ para las mascotas de Malargüe</p>
        </div>
      </div>
    </footer>
  )
}
