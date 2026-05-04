'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/hooks/useCart'
import MobileMenu from './MobileMenu'

export default function NavbarClient() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, open: openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
        scrolled
          ? 'bg-white/97 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.08)] py-[13px]'
          : 'py-[22px]'
      }`}>
        <div className="max-w-[1300px] mx-auto px-7 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Image src="/img/logo.svg" alt="RUPER logo" width={46} height={46} className="rounded-full flex-shrink-0" />
            <div>
              <div className={`font-[var(--font-fredoka)] tracking-[2px] text-[1.35rem] transition-colors ${scrolled ? 'text-[var(--primary)]' : 'text-white'}`}>ruper</div>
              <div className={`text-[.6rem] tracking-[2.5px] uppercase hidden sm:block transition-colors ${scrolled ? 'text-[var(--gray)]' : 'text-white/55'}`}>Alimentos Balanceados</div>
            </div>
          </Link>

          {/* Links desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {[
              { href: '/#inicio',    label: 'Inicio' },
              { href: '/#productos', label: 'Productos' },
              { href: '/nosotros',   label: 'Nosotros' },
              { href: '/contacto',   label: 'Contacto' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className={`text-[.88rem] font-medium relative transition-colors after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[var(--primary)] after:transition-all hover:after:w-full ${scrolled ? 'text-[var(--dark)]' : 'text-white/88'}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2.5 rounded-[50px] text-[.85rem] font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-[var(--primary-dark)]"
            >
              <i className="fas fa-shopping-cart" />
              <span className="hidden sm:inline">Mi Pedido</span>
              <span className="bg-white text-[var(--primary)] text-[.68rem] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {count}
              </span>
            </button>

            {/* Hamburguesa mobile */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col gap-[5px] p-2"
              aria-label="Abrir menú"
            >
              <span className={`w-6 h-[2px] rounded block transition-colors ${scrolled ? 'bg-[var(--dark)]' : 'bg-white'}`} />
              <span className={`w-6 h-[2px] rounded block transition-colors ${scrolled ? 'bg-[var(--dark)]' : 'bg-white'}`} />
              <span className={`w-6 h-[2px] rounded block transition-colors ${scrolled ? 'bg-[var(--dark)]' : 'bg-white'}`} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
