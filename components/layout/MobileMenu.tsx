'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CONFIG } from '@/lib/config'

interface Props {
  isOpen:  boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: Props) {

  /* Lock body scroll & ESC key */
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  const navLinks = [
    { href: '/#inicio',    icon: 'fa-home',           label: 'Inicio' },
    { href: '/#productos', icon: 'fa-box-open',        label: 'Productos' },
    { href: '/nosotros',   icon: 'fa-heart',           label: 'Nosotros' },
    { href: '/contacto',   icon: 'fa-map-marker-alt',  label: 'Contacto' },
  ]

  const cats = [
    { href: '/#categorias', emoji: '🐶', label: 'Perros',   animal: 'perros' },
    { href: '/#categorias', emoji: '🐱', label: 'Gatos',    animal: 'gatos'  },
    { href: '/#categorias', emoji: '🐄', label: 'Granja',   animal: 'granja' },
    { href: '/#categorias', emoji: '🐦', label: 'Aves',     animal: 'aves'   },
    { href: '/#categorias', emoji: '🐟', label: 'Peces',    animal: 'peces'  },
    { href: '/#categorias', emoji: '⭐', label: 'Accesorios',animal: 'accesorios' },
  ]

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-[1000]"
        style={{
          background:  'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity:     isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition:  'opacity 0.3s ease',
        }}
      />

      {/* Drawer — full height, slides from right */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className="fixed top-0 right-0 bottom-0 z-[1001] flex flex-col overflow-y-auto"
        style={{
          width:       'min(340px, 92vw)',
          background:  'linear-gradient(180deg, #1B1B2F 0%, #22223a 100%)',
          transform:   isOpen ? 'translateX(0)' : 'translateX(105%)',
          transition:  'transform 0.38s cubic-bezier(0.32,0.72,0,1)',
          boxShadow:   isOpen ? '-20px 0 60px rgba(0,0,0,0.45)' : 'none',
          paddingBottom: 'calc(72px + env(safe-area-inset-bottom))',
        }}
      >

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3">
            <Image src="/img/logo.svg" alt="RUPER" width={40} height={40} className="rounded-full" />
            <div>
              <div
                className="font-[var(--font-fredoka)] tracking-[2px] text-[1.15rem]"
                style={{ color: 'var(--primary)' }}
              >
                ruper
              </div>
              <div className="text-[0.58rem] uppercase tracking-[2px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Alimentos Balanceados
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-xl transition-colors"
            style={{
              width:      44,
              height:     44,
              background: 'rgba(255,255,255,0.06)',
              color:      'rgba(255,255,255,0.55)',
            }}
            aria-label="Cerrar menú"
          >
            <i className="fas fa-times text-[1rem]" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-3 pt-4 pb-2 gap-1">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-[14px] px-4 font-semibold transition-all"
              style={{
                minHeight:  52,
                color:      'rgba(255,255,255,0.78)',
                fontSize:   '0.95rem',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.78)' }}
            >
              <span
                className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,107,53,0.15)' }}
              >
                <i className={`fas ${l.icon} text-[0.8rem]`} style={{ color: 'var(--primary)' }} />
              </span>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-5 my-2" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* Categorías */}
        <div className="px-5 pb-4">
          <p
            className="uppercase font-bold mb-3 px-1"
            style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)' }}
          >
            Categorías
          </p>
          <div className="grid grid-cols-3 gap-2">
            {cats.map(c => (
              <Link
                key={c.animal}
                href={c.href}
                onClick={onClose}
                data-animal={c.animal}
                className="flex flex-col items-center justify-center gap-1.5 rounded-[14px] transition-all"
                style={{
                  minHeight: 72,
                  background: 'rgba(255,255,255,0.05)',
                  border:     '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,107,53,0.12)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,107,53,0.25)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
              >
                <span className="text-[1.5rem] leading-none">{c.emoji}</span>
                <span
                  className="font-semibold"
                  style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)' }}
                >
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* WA CTA */}
        <div className="px-5 pb-4">
          <a
            href={`https://wa.me/${CONFIG.WA_NUMBER}?text=Hola%20RUPER!%20Quiero%20hacer%20un%20pedido.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-[14px] font-bold transition-all"
            style={{
              height:     52,
              background: 'linear-gradient(135deg,#25D366,#128C7E)',
              color:      '#fff',
              fontSize:   '0.9rem',
              boxShadow:  '0 4px 18px rgba(37,211,102,0.3)',
            }}
          >
            <i className="fab fa-whatsapp text-[1.15rem]" />
            Hacer un pedido
          </a>
        </div>

        {/* Footer info */}
        <div
          className="mt-auto mx-5 pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-start gap-2 mb-2">
            <i className="fas fa-map-marker-alt mt-0.5 flex-shrink-0" style={{ color: 'var(--primary)', fontSize: '0.75rem' }} />
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>Av. Rufino Ortega 602, Malargüe</span>
          </div>
          <div className="flex items-start gap-2 mb-4">
            <i className="fas fa-clock mt-0.5 flex-shrink-0" style={{ color: 'var(--primary)', fontSize: '0.75rem' }} />
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>Lun–Vie 8:30–21:00 · Sáb 9:00–13:00</span>
          </div>

          {/* Social */}
          <div className="flex gap-2.5 pb-2">
            {[
              { href: 'https://www.instagram.com/ruper_malargue/', icon: 'fa-instagram',  label: 'Instagram' },
              { href: 'https://www.facebook.com/juan.ruper.5',     icon: 'fa-facebook-f', label: 'Facebook'  },
              { href: `https://wa.me/${CONFIG.WA_NUMBER}`,         icon: 'fa-whatsapp',   label: 'WhatsApp'  },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center rounded-xl transition-all"
                style={{
                  width:      44,
                  height:     44,
                  background: 'rgba(255,255,255,0.07)',
                  color:      'rgba(255,255,255,0.45)',
                  fontSize:   '0.9rem',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--primary)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)' }}
              >
                <i className={`fab ${s.icon}`} />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
