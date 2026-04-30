'use client'
import Link from 'next/link'
import Image from 'next/image'
import { CONFIG } from '@/lib/config'

interface Props {
  isOpen:  boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-[var(--dark)] z-[1001] flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Image src="/img/logo.svg" alt="RUPER" width={38} height={38} className="rounded-full" />
            <span className="font-[var(--font-fredoka)] text-white text-[1.2rem] tracking-[2px]">ruper</span>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white text-lg transition-colors" aria-label="Cerrar menú">
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col p-4 gap-1">
          {[
            { href: '/#inicio',    icon: 'fa-home',       label: 'Inicio' },
            { href: '/#productos', icon: 'fa-box-open',   label: 'Productos' },
            { href: '/nosotros',   icon: 'fa-users',      label: 'Nosotros' },
            { href: '/contacto',   icon: 'fa-map-marker-alt', label: 'Contacto' },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="flex items-center gap-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all text-[.9rem] font-medium"
            >
              <i className={`fas ${l.icon} w-5 text-[var(--primary)]`} />
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Categorías rápidas */}
        <div className="px-4 pb-4">
          <p className="text-white/40 text-[.72rem] uppercase tracking-widest font-bold mb-3 px-1">Categorías</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { href: '/#categorias', icon: '🐶', label: 'Perros', animal: 'perros' },
              { href: '/#categorias', icon: '🐱', label: 'Gatos',  animal: 'gatos' },
              { href: '/#categorias', icon: '🐄', label: 'Granja', animal: 'granja' },
            ].map(c => (
              <Link
                key={c.animal}
                href={c.href}
                onClick={onClose}
                data-animal={c.animal}
                className="flex flex-col items-center gap-1.5 bg-white/5 hover:bg-white/10 rounded-xl p-3 transition-all text-center"
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="text-white/70 text-[.72rem] font-semibold">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* WA CTA */}
        <a
          href={`https://wa.me/${CONFIG.WA_NUMBER}?text=Hola%20RUPER!%20Quiero%20hacer%20un%20pedido.`}
          target="_blank" rel="noopener"
          className="mx-4 flex items-center justify-center gap-2.5 bg-[#25D366] text-white py-3.5 rounded-xl font-bold text-[.9rem] transition-all hover:bg-[#1ebe5d]"
        >
          <i className="fab fa-whatsapp text-lg" /> Hacer un pedido
        </a>

        {/* Footer */}
        <div className="mt-auto p-5 border-t border-white/10">
          <p className="text-white/40 text-[.75rem] mb-1"><i className="fas fa-map-marker-alt mr-1.5" /> Av. Rufino Ortega 602, Malargüe</p>
          <p className="text-white/40 text-[.75rem] mb-3"><i className="fas fa-clock mr-1.5" /> Lun-Vie 8:30-21:00 · Sáb 9:00-13:00</p>
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
      </aside>
    </>
  )
}
