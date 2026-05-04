'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { formatPrice } from '@/lib/utils'

const BG_MAP: Record<string, string> = {
  'bg-dogs':        'linear-gradient(135deg,#fff3ee,#ffe0d0)',
  'bg-cats':        'linear-gradient(135deg,#f3eeff,#e0d0ff)',
  'bg-farm':        'linear-gradient(135deg,#eefff3,#d0f0d8)',
  'bg-birds':       'linear-gradient(135deg,#fffbee,#fff0c0)',
  'bg-fish':        'linear-gradient(135deg,#eef8ff,#d0e8ff)',
  'bg-accessories': 'linear-gradient(135deg,#fff0fa,#f5d0ff)',
  'bg-small':       'linear-gradient(135deg,#eefff3,#c8f0d8)',
  'bg-acc':         'linear-gradient(135deg,#f5f5f5,#e8e8e8)',
}
const CAT_BG: Record<string, string> = {
  perros: 'linear-gradient(135deg,#fff3ee,#ffe0d0)',
  gatos:  'linear-gradient(135deg,#f3eeff,#e0d0ff)',
  granja: 'linear-gradient(135deg,#eefff3,#d0f0d8)',
  aves:   'linear-gradient(135deg,#fffbee,#fff0c0)',
  peces:  'linear-gradient(135deg,#eef8ff,#d0e8ff)',
  accesorios: 'linear-gradient(135deg,#fff0fa,#f5d0ff)',
}

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
      <div
        className="h-[210px] flex items-center justify-center overflow-hidden"
        style={{ background: BG_MAP[p.bg_class ?? ''] ?? CAT_BG[p.category] ?? 'linear-gradient(135deg,#fff3ee,#ffe0d0)' }}
      >
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
      <div style={{ padding: '18px 20px 20px' }}>
        <div className="prod-cat text-[.68rem] font-bold text-[var(--primary)] uppercase tracking-[1.5px] mb-[6px]">
          {p.subcategory ?? p.category}
        </div>
        <h3 className="prod-name font-bold text-[.97rem] text-[var(--dark)] leading-tight mb-1 line-clamp-2">{p.name}</h3>
        <p className="prod-weight text-[.76rem] text-[var(--gray)] mb-4">
          {p.weight}{p.flavor ? ` · ${p.flavor}` : ''}
        </p>
        <div className="flex items-center justify-between">
          <div className="prod-price font-black text-[1.22rem] text-[var(--dark)]">
            <span className="text-[.7rem] font-semibold mr-0.5">$</span>
            {p.price.toLocaleString('es-AR')}
          </div>
          <button
            onClick={handleAdd}
            aria-label="Agregar al pedido"
            className={`w-[42px] h-[42px] rounded-[12px] flex items-center justify-center text-[1rem] transition-all flex-shrink-0 border-none ${
              added
                ? 'bg-green-500 text-white'
                : 'text-white hover:scale-110 hover:shadow-[0_5px_16px_rgba(255,107,53,.4)]'
            }`}
            style={!added ? { background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))' } : {}}
          >
            <i className={`fas ${added ? 'fa-check' : 'fa-plus'}`} />
          </button>
        </div>
      </div>
    </Link>
  )
}
