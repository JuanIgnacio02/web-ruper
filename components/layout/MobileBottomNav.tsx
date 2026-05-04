'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/hooks/useCart'

export default function MobileBottomNav() {
  const pathname               = usePathname()
  const { count, open: openCart } = useCart()
  const [visible, setVisible]  = useState(true)
  const [lastY,   setLastY]    = useState(0)

  /* Hide on scroll down, show on scroll up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 80) { setVisible(true); setLastY(y); return }
      setVisible(y < lastY)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  const tabs = [
    { href: '/',          icon: 'fa-home',           label: 'Inicio',    exact: true  },
    { href: '/#productos',icon: 'fa-box-open',        label: 'Productos', exact: false },
    { href: '/nosotros',  icon: 'fa-heart',           label: 'Nosotros',  exact: true  },
    { href: '/contacto',  icon: 'fa-map-marker-alt',  label: 'Contacto',  exact: true  },
  ]

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-[997]"
      style={{
        background:    'rgba(27,27,47,0.98)',
        backdropFilter:'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop:     '1px solid rgba(255,255,255,0.07)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        transform:     visible ? 'translateY(0)' : 'translateY(100%)',
        transition:    'transform 0.35s cubic-bezier(0.32,0.72,0,1)',
      }}
    >
      <div className="flex items-stretch">
        {tabs.map(tab => {
          const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href.split('#')[0]) && pathname !== '/'
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex flex-col items-center justify-center gap-[3px] py-[11px] relative"
              style={{
                color:      active ? 'var(--primary)' : 'rgba(255,255,255,0.42)',
                transition: 'color 0.2s ease',
                minHeight:  52,
              }}
            >
              {/* Active pill */}
              {active && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full"
                  style={{ width: 32, height: 3, background: 'var(--primary)' }}
                />
              )}
              <i
                className={`fas ${tab.icon}`}
                style={{
                  fontSize:  '1.05rem',
                  transform: active ? 'translateY(-1px)' : 'none',
                  transition:'transform 0.2s ease',
                }}
              />
              <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                {tab.label}
              </span>
            </Link>
          )
        })}

        {/* Cart tab */}
        <button
          onClick={openCart}
          className="flex-1 flex flex-col items-center justify-center gap-[3px] py-[11px] relative"
          style={{
            color:     count > 0 ? 'var(--primary)' : 'rgba(255,255,255,0.42)',
            minHeight: 52,
            border:    'none',
            background:'transparent',
            transition:'color 0.2s ease',
          }}
        >
          {count > 0 && (
            <span
              className="absolute top-0 left-1/2 -translate-x-1/2 rounded-b-full"
              style={{ width: 32, height: 3, background: 'var(--primary)' }}
            />
          )}
          <span className="relative">
            <i className="fas fa-shopping-cart" style={{ fontSize: '1.05rem' }} />
            {count > 0 && (
              <span
                className="absolute flex items-center justify-center text-white font-black"
                style={{
                  top: -7, right: -9,
                  background:   'linear-gradient(135deg,var(--primary),var(--primary-dark))',
                  fontSize:     '0.5rem',
                  minWidth:     15,
                  height:       15,
                  borderRadius: 8,
                  paddingInline:3,
                  border:       '1.5px solid rgba(27,27,47,0.98)',
                }}
              >
                {count > 9 ? '9+' : count}
              </span>
            )}
          </span>
          <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
            Pedido
          </span>
        </button>
      </div>
    </nav>
  )
}
