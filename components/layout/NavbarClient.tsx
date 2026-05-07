'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import MobileMenu from './MobileMenu'

export default function NavbarClient() {
  const pathname  = usePathname()
  const isHome    = pathname === '/'
  const [scrolled,  setScrolled]  = useState(!isHome)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const { count, open: openCart } = useCart()

  useEffect(() => {
    if (!isHome) { setScrolled(true); return }
    const check = () => setScrolled(window.scrollY > 50)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [isHome])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
          scrolled
            ? 'bg-white/97 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.08)] py-[10px] md:py-[13px]'
            : 'py-[14px] md:py-[22px]'
        }`}
      >
        <div className="max-w-[1300px] mx-auto px-4 md:px-7 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <Image
              src="/img/logo.png"
              alt="RUPER logo"
              width={40}
              height={40}
              className="rounded-full flex-shrink-0 md:w-[46px] md:h-[46px]"
            />
            <div>
              <div className={`font-[var(--font-fredoka)] tracking-[2px] text-[1.2rem] md:text-[1.35rem] transition-colors ${scrolled ? 'text-[var(--primary)]' : 'text-white'}`}>
                ruper
              </div>
              <div className={`text-[.55rem] tracking-[2px] uppercase hidden sm:block transition-colors ${scrolled ? 'text-[var(--gray)]' : 'text-white/55'}`}>
                Alimentos Balanceados
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {[
              { href: '/#inicio',    label: 'Inicio'    },
              { href: '/#productos', label: 'Productos' },
              { href: '/nosotros',   label: 'Nosotros'  },
              { href: '/contacto',   label: 'Contacto'  },
            ].map(l => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-[.88rem] font-medium relative transition-colors after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[var(--primary)] after:transition-all hover:after:w-full ${scrolled ? 'text-[var(--dark)]' : 'text-white/88'}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Cart button — desktop only (mobile uses bottom nav) */}
            <button
              onClick={openCart}
              className="hidden md:flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2.5 rounded-[50px] text-[.85rem] font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-[var(--primary-dark)]"
            >
              <i className="fas fa-shopping-cart" />
              <span>Mi Pedido</span>
              <span className="bg-white text-[var(--primary)] text-[.68rem] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {count}
              </span>
            </button>

            {/* Cart icon — mobile only (compact) */}
            <button
              onClick={openCart}
              className="md:hidden relative flex items-center justify-center rounded-xl transition-all"
              style={{
                width:      44,
                height:     44,
                background: scrolled ? 'rgba(255,107,53,0.08)' : 'rgba(255,255,255,0.12)',
                color:      scrolled ? 'var(--primary)' : '#fff',
              }}
              aria-label="Ver pedido"
            >
              <i className="fas fa-shopping-cart text-[1rem]" />
              {count > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center text-white font-black"
                  style={{
                    background:   'linear-gradient(135deg,var(--primary),var(--primary-dark))',
                    fontSize:     '0.5rem',
                    minWidth:     15,
                    height:       15,
                    borderRadius: 8,
                    paddingInline:2,
                  }}
                >
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {/* Hamburger — 44×44 touch target */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col items-center justify-center gap-[5px] rounded-xl transition-all"
              style={{
                width:      44,
                height:     44,
                background: scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.12)',
              }}
              aria-label="Abrir menú"
            >
              <span className={`w-[18px] h-[2px] rounded block transition-colors ${scrolled ? 'bg-[var(--dark)]' : 'bg-white'}`} />
              <span className={`w-[18px] h-[2px] rounded block transition-colors ${scrolled ? 'bg-[var(--dark)]' : 'bg-white'}`} />
              <span className={`w-[12px] h-[2px] rounded block self-start ml-[13px] transition-colors ${scrolled ? 'bg-[var(--dark)]' : 'bg-white'}`} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
