'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { formatPrice } from '@/lib/utils'

export default function ProductCard({ product: p }: { product: Product }) {
  const { add } = useCart()
  const { showToast } = useToast()
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    add({ name: p.name, price: p.price, emoji: p.emoji, cat: p.subcategory ?? p.category })
    showToast(`${p.emoji} ${p.name.split(' ').slice(0, 3).join(' ')} agregado`, 'ok')
    setAdded(true)
    setTimeout(() => setAdded(false), 900)
  }

  return (
    <Link
      href={`/producto/${p.id}`}
      className="prod-card-anim group relative bg-white rounded-[var(--radius)] overflow-hidden shadow-[var(--shadow)] hover:-translate-y-2 hover:shadow-[var(--shadow-lg)] transition-all duration-300 block"
    >
      {/* Badge */}
      {p.badge && (
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[.68rem] font-black uppercase tracking-wide z-10 ${p.badge_type ?? 'badge-top'}`}>
          {p.badge}
        </div>
      )}

      {/* Imagen */}
      <div className={`${p.bg_class} h-[210px] flex items-center justify-center overflow-hidden`}>
        {p.img ? (
          <Image
            src={p.img}
            alt={p.name}
            width={180} height={180}
            className="w-full h-full object-contain p-3.5 group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <span className="text-[5.5rem]">{p.emoji}</span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="text-[.72rem] font-semibold text-[var(--primary)] uppercase tracking-wide mb-1">
          {p.subcategory ?? p.category}
        </div>
        <h3 className="font-bold text-[.92rem] text-[var(--dark)] leading-tight mb-1 line-clamp-2">{p.name}</h3>
        <p className="text-[.78rem] text-[var(--gray)] mb-3">
          {p.weight}{p.flavor ? ` · ${p.flavor}` : ''}
        </p>
        <div className="flex items-center justify-between">
          <div className="font-black text-[1.1rem] text-[var(--dark)]">
            <span className="text-[.7rem] font-semibold mr-0.5">$</span>
            {p.price.toLocaleString('es-AR')}
          </div>
          <button
            onClick={handleAdd}
            aria-label="Agregar al pedido"
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[.9rem] transition-all ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white'
            }`}
          >
            <i className={`fas ${added ? 'fa-check' : 'fa-plus'}`} />
          </button>
        </div>
      </div>
    </Link>
  )
}
