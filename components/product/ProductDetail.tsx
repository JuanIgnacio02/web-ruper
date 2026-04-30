'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { formatPrice } from '@/lib/utils'

export default function ProductDetail({ product: p }: { product: Product }) {
  const { add } = useCart()
  const { showToast } = useToast()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.pd-img',   { x: -60, opacity: 0, duration: 0.8 })
        .from('.pd-info',  { x:  60, opacity: 0, duration: 0.8 }, '-=0.6')
    })
  }, [])

  const handleAdd = () => {
    add({ name: p.name, price: p.price, emoji: p.emoji, cat: p.subcategory ?? p.category })
    showToast(`${p.emoji} ${p.name.split(' ').slice(0, 3).join(' ')} agregado`, 'ok')
    setAdded(true)
    setTimeout(() => setAdded(false), 900)
  }

  return (
    <div className="min-h-screen bg-[var(--light)] pt-24 pb-16">
      <div className="max-w-[1100px] mx-auto px-7">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[.8rem] text-[var(--gray)] mb-8">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/#productos" className="hover:text-[var(--primary)] transition-colors">Productos</Link>
          <span>/</span>
          <span className="text-[var(--dark)] font-medium">{p.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-[var(--radius)] shadow-[var(--shadow)] overflow-hidden">

          {/* Imagen */}
          <div className={`pd-img ${p.bg_class} flex items-center justify-center p-12 min-h-[360px]`}>
            {p.img ? (
              <Image
                src={p.img}
                alt={p.name}
                width={340} height={340}
                className="object-contain drop-shadow-xl"
                priority
              />
            ) : (
              <span className="text-[8rem]">{p.emoji}</span>
            )}
          </div>

          {/* Info */}
          <div className="pd-info p-8 flex flex-col justify-center">
            {p.badge && (
              <div className={`inline-flex w-fit px-3 py-1 rounded-full text-[.68rem] font-black uppercase mb-4 ${p.badge_type ?? 'badge-top'}`}>
                {p.badge}
              </div>
            )}

            <div className="text-[.75rem] font-semibold text-[var(--primary)] uppercase tracking-wide mb-2">
              {p.brand}
            </div>
            <h1 className="text-[1.9rem] font-black text-[var(--dark)] leading-tight mb-3">{p.name}</h1>

            {(p.weight || p.flavor) && (
              <p className="text-[var(--gray)] text-[.9rem] mb-4">
                {p.weight}{p.flavor ? ` · ${p.flavor}` : ''}
              </p>
            )}

            {p.description && (
              <p className="text-[var(--gray)] text-[.92rem] leading-relaxed mb-6">{p.description}</p>
            )}

            {p.features && p.features.length > 0 && (
              <ul className="flex flex-col gap-1.5 mb-6">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-[.85rem] text-[var(--dark)]">
                    <i className="fas fa-check-circle text-[var(--primary)] mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center justify-between mb-6">
              <div className="text-[2rem] font-black text-[var(--dark)]">{formatPrice(p.price)}</div>
              <div className={`flex items-center gap-1.5 text-[.8rem] font-semibold ${p.stock ? 'text-green-600' : 'text-red-500'}`}>
                <i className={`fas ${p.stock ? 'fa-check-circle' : 'fa-times-circle'}`} />
                {p.stock ? 'En stock' : 'Sin stock'}
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!p.stock}
              className={`w-full py-4 rounded-[50px] font-bold text-[1rem] flex items-center justify-center gap-2.5 transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : p.stock
                    ? 'bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white hover:-translate-y-0.5 hover:shadow-lg'
                    : 'bg-[var(--border)] text-[var(--gray)] cursor-not-allowed'
              }`}
            >
              <i className={`fas ${added ? 'fa-check' : 'fa-shopping-cart'}`} />
              {added ? '¡Agregado!' : p.stock ? 'Agregar al pedido' : 'Sin stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
